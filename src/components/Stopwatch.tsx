import { useState, useEffect } from "react";
import { FaPlay, FaPause, FaRedo, FaTrash } from "react-icons/fa";
import { formatTime } from "../shared/helpers/formatters";

interface StopwatchProps {
  id: number;
  onDelete: (id: number) => void;
}

const Stopwatch: React.FC<StopwatchProps> = ({ id, onDelete }) => {
  const [isRunning, setIsRunning] = useState<boolean>(() => {
    const saved = localStorage.getItem(`stopwatch-running-${id}`);
    return saved ? JSON.parse(saved) : false;
  });

  const [time, setTime] = useState<number>(() => {
    const saved = localStorage.getItem(`stopwatch-${id}`);
    return saved ? JSON.parse(saved) : 0;
  });
  
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

 
  useEffect(() => {
    localStorage.setItem(`stopwatch-running-${id}`, JSON.stringify(isRunning));
  }, [isRunning]);
 
  useEffect(() => {
    localStorage.setItem(`stopwatch-${id}`, JSON.stringify(time));
  }, [time]);

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <div className="group relative flex items-center justify-between bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
      <span className="text-3xl font-mono text-gray-800 font-semibold">
        {formatTime(time)}
      </span>
      <div className="flex space-x-3">
        {!isRunning ? (
          <button
            onClick={() => setIsRunning(true)}
            className="p-2 text-green-600 hover:bg-green-100 rounded-full transition-all duration-200"
          >
            <FaPlay className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={() => setIsRunning(false)}
            className="p-2 text-yellow-600 hover:bg-yellow-100 rounded-full transition-all duration-200"
          >
            <FaPause className="w-5 h-5" />
          </button>
        )}
        <button
          onClick={handleReset}
          className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-all duration-200"
        >
          <FaRedo className="w-5 h-5" />
        </button>
        <button
          onClick={() => onDelete(id)}
          className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-all duration-200"
        >
          <FaTrash className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
