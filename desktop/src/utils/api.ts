const BASE = import.meta.env.VITE_API_URL ?? "http://localhost:5000";
const DEBUG = (import.meta.env.VITE_DEBUG_API ?? "false") === "true";

async function readBodyMaybe(res: Response) {
  const ct = res.headers.get("content-type") || "";
  try {
    if (ct.includes("application/json")) return await res.json();
    return await res.text();
  } catch (e) {
    return undefined;
  }
}

function buildUrl(path: string) {
  return path.startsWith("/") ? `${BASE}${path}` : `${BASE}/${path}`;
}

function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem("token");
  if (!token) {
    DEBUG && console.warn("API Auth: No token found in localStorage");
    return {};
  }
  DEBUG && console.debug("API Auth: Using token:", token.substring(0, 15) + "...");
  if (DEBUG) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.debug("API Auth: Token payload:", {
        sub: payload.sub,
        role: payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
        exp: new Date(payload.exp * 1000).toISOString(),
        userId: payload.userId,
        companyId: payload.companyId
      });
    } catch (e) {
      console.warn("API Auth: Could not decode token payload:", e);
    }
  }
  return { Authorization: `Bearer ${token}` };
}

export async function fetchJson(path: string, opts?: RequestInit) {
  const url = buildUrl(path);
  // Don't add auth headers for login/signup
  const isAuth = !path.includes("/Login") && !path.includes("/Signup");
  
  const headers = new Headers(opts?.headers || {});
  if (isAuth) {
    const authHeaders = getAuthHeaders();
    Object.entries(authHeaders).forEach(([key, value]) => headers.set(key, value));
  }
  
  DEBUG && console.debug("API ▶", opts?.method ?? "GET", url, opts?.body ?? "", Object.fromEntries(headers));
  const res = await fetch(url, { ...opts, headers });
  const body = await readBodyMaybe(res);
  if (!res.ok) {
    DEBUG && console.debug("API ◀ ERR", res.status, res.statusText, body);
    const msg = typeof body === "string" ? body : JSON.stringify(body ?? {});
    throw new Error(`${res.status} ${res.statusText} ${msg}`);
  }
  DEBUG && console.debug("API ◀", res.status, body);
  return body;
}

export async function fetchText(path: string, opts?: RequestInit) {
  const url = buildUrl(path);
  const isAuth = !path.includes("/Login") && !path.includes("/Signup");
  
  const headers = new Headers(opts?.headers || {});
  if (isAuth) {
    const authHeaders = getAuthHeaders();
    Object.entries(authHeaders).forEach(([key, value]) => headers.set(key, value));
  }
  
  DEBUG && console.debug("API ▶", opts?.method ?? "GET", url, opts?.body ?? "", Object.fromEntries(headers));
  const res = await fetch(url, { ...opts, headers });
  const body = await res.text();
  if (!res.ok) {
    DEBUG && console.debug("API ◀ ERR", res.status, res.statusText, body);
    throw new Error(`${res.status} ${res.statusText} ${body}`);
  }
  DEBUG && console.debug("API ◀", res.status, body);
  return body;
}

// delivery list endpoint (plural) exposed by backend
export const fetchDeliveries = () => fetchJson("/Delivery/retrieveDeliveries");
export const fetchOrders = fetchDeliveries; // alias for existing call-sites

// backend expects GET /Delivery/{id} (no additional path segments)
export const fetchOrder = (id: string | number) => {
  if (!id) throw new Error('Delivery ID is required');
  return fetchJson(`/Delivery/${id}`);
};

export default {
  BASE,
  fetchJson,
  fetchText,
  fetchOrders,
  fetchOrder,
};
