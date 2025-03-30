import { useState, useEffect, useRef, useCallback, memo } from "react";
import { FaPlay, FaPause, FaRedo, FaTrash } from "react-icons/fa";
import { formatTime } from "../shared/helpers/formatters";
import useLocalStorage from "../shared/hooks/useLocalStorage";

interface StopwatchProps {
  id: number;
  onDelete: (id: number) => void;
}

const buttonStyles = "p-2 rounded-full transition-all duration-200";

const Stopwatch: React.FC<StopwatchProps> = memo(({ id, onDelete }) => {
  const [isRunning, setIsRunning] = useLocalStorage<boolean>(
    `stopwatch-running-${id}`,
    false
  );
  const [time, setTime] = useLocalStorage<number>(`stopwatch-${id}`, 0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    setTime(0);
  }, [setIsRunning, setTime]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, setTime]);

  return (
    <div className="group relative flex items-center justify-between bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
      <span className="text-3xl font-mono text-gray-800 font-semibold">
        {formatTime(time)}
      </span>
      <div className="flex space-x-3">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`${buttonStyles} ${
            isRunning
              ? "text-yellow-600 hover:bg-yellow-100"
              : "text-green-600 hover:bg-green-100"
          }`}
        >
          {isRunning ? (
            <FaPause className="w-5 h-5" />
          ) : (
            <FaPlay className="w-5 h-5" />
          )}
        </button>
        <button
          onClick={handleReset}
          className={`${buttonStyles} text-blue-600 hover:bg-blue-100`}
        >
          <FaRedo className="w-5 h-5" />
        </button>
        <button
          onClick={() => onDelete(id)}
          className={`${buttonStyles} text-red-600 hover:bg-red-100`}
        >
          <FaTrash className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
});

export default Stopwatch;
