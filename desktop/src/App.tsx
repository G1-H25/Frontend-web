import { useEffect } from "react"
import AppRouter from "./router/AppRouter"


function App() {
  
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
