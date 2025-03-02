import { SEC_IN_HOUR, SEC_IN_MIN } from "../consts/consts";

export const formatTime = (seconds: number): string => {
  const hrs = Math.floor(seconds / SEC_IN_HOUR);
  const mins = Math.floor((seconds % SEC_IN_HOUR) / SEC_IN_MIN);
  const secs = seconds % SEC_IN_MIN;

  return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(
    2,
    "0"
  )}:${String(secs).padStart(2, "0")}`;
};
