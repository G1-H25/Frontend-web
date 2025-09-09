import { useEffect, useRef } from "react";

interface TempAlarm {
  sändningsnr: string;
  currentTemp: number;
  expectedTempMin: number;
  expectedTempMax: number;
  currentHumidity: number;
  expectedHumidityMin: number;
  expectedHumidityMax: number;
}

const useTempAlarmNotification = (alarms: TempAlarm[]) => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);


  useEffect(() => {
    const originalTitle = document.title;

    const hasAlarm = alarms.some(
  (a) =>
    a.currentTemp < a.expectedTempMin ||
    a.currentTemp > a.expectedTempMax ||
    a.currentHumidity < a.expectedHumidityMin ||
    a.currentHumidity > a.expectedHumidityMax
);

    // Rullande text när larm finns
    const alarmText = "🚨🚨Avvikelse i leveransen!🚨🚨";
    let scrollIndex = 0;

    const startRollingTitle = () => {
      intervalRef.current = setInterval(() => {
        // Ta en slice av texten för att rulla
        const rolling = alarmText.slice(scrollIndex) + alarmText.slice(0, scrollIndex);
        document.title = rolling;
        scrollIndex = (scrollIndex + 1) % alarmText.length;
      }, 300); // ändra hastighet (ms)
    };

    const stopRollingTitle = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      document.title = originalTitle;
    };

    if (hasAlarm) {
      startRollingTitle();

      // Pushnotis
      if (Notification.permission === "granted") {
        new Notification("🚨 Temperaturavvikelse!", {
          body: "En sändning är utanför sitt temperaturintervall!",
        });
      }
    } else {
      stopRollingTitle();
    }

    return () => stopRollingTitle();
  }, [alarms]);
};

export default useTempAlarmNotification;
