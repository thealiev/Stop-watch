import { useState, useEffect } from "react";
import { FaPlay, FaPause, FaRedo, FaTrash, FaPlus } from "react-icons/fa";
// up to date

interface StopwatchProps {
  id: number;
  onDelete: (id: number) => void;
}

const Stopwatch: React.FC<StopwatchProps> = ({ id, onDelete }) => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      timer = setInterval(() => setTime((prev) => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
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
          onClick={() => {
            setIsRunning(false);
            setTime(0);
          }}
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

interface StopwatchItem {
  id: number;
}

const StopwatchApp: React.FC = () => {
  const [stopwatches, setStopwatches] = useState<StopwatchItem[]>(() => {
    const saved = localStorage.getItem("stopwatches");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("stopwatches", JSON.stringify(stopwatches));
  }, [stopwatches]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Multi Stopwatch</h1>
          <button
            onClick={() => setStopwatches([...stopwatches, { id: Date.now() }])}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-md transition-all duration-200 flex items-center cursor-pointer"
          >
            <FaPlus className="mr-2 w-4 h-4" />
            Add Stopwatch
          </button>
        </div>

        <div className="space-y-4">
          {stopwatches.map((sw) => (
            <Stopwatch
              key={sw.id}
              id={sw.id}
              onDelete={(id) =>
                setStopwatches(stopwatches.filter((sw) => sw.id !== id))
              }
            />
          ))}
        </div>

        {stopwatches.length === 0 && (
          <div className="text-center mt-16 text-gray-500">
            <p className="text-lg">
              No stopwatches yet. Click the button to add one!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StopwatchApp;
