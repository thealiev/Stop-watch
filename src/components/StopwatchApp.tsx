import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import Stopwatch from "./Stopwatch";

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
