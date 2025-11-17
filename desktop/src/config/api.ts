

export const API_URL =
  import.meta.env.DEV
    ? "/api" // Vite proxy i utveckling
    : "http://trackapp-api-env.eba-cjwxp2te.eu-north-1.elasticbeanstalk.com"; // RIKTIGA API:et i produktion
