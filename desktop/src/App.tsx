import { useEffect } from "react"
import AppRouter from "./router/AppRouter"
import { useDispatch } from "react-redux"
import { checkTokenValidity } from "./features/login/loginSlice"
import type { AppDispatch } from "./app/store"


function App() {
  
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(checkTokenValidity());
    }, 60000); // kolla varje minut

    return () => clearInterval(interval);
  }, [dispatch]);

  // User grants permission to receive notifications about temperature alarms
  useEffect(() => {
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []); 

  return (
    <AppRouter />
  )
}

export default App
