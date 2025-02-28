import React, { useState } from "react";
import { LucidePlay, LucideStopCircle, LucideRotateCcw, LucideX } from "lucide-react";

const Modal = ({ isOpen, onClose, title, message, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-80 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
          >
            <LucideX size={20} />
          </button>
        </div>
        <p className="mb-6 text-gray-600 dark:text-gray-300">{message}</p>
        <p className="mb-6 font-semibold text-red-500">⚠ Please notify the user before proceeding.</p>
        <div className="flex justify-end gap-2">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const WorkTimer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: "",
    message: "",
    action: () => {}
  });

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    const ms = Math.floor((milliseconds % 1000) / 10); 
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}.${ms.toString().padStart(2, "0")}`;
  };

  const showConfirmModal = (title, message, action) => {
    setModalConfig({
      title,
      message,
      action
    });
    setModalOpen(true);
  };

  const startTimer = () => {
    showConfirmModal(
      "Start Timer", 
      "Please notify the user that the timer is starting.", 
      () => {
        if (!isRunning) {
          setIsRunning(true);
          const startTime = Date.now() - time;
          const id = setInterval(() => {
            setTime(Date.now() - startTime);
          }, 10);
          setIntervalId(id);
        }
      }
    );
  };

  const stopTimer = () => {
    showConfirmModal(
      "Stop Timer", 
      "Please notify the user that the timer is stopping.", 
      () => {
        setIsRunning(false);
        clearInterval(intervalId);
      }
    );
  };

  const resetTimer = () => {
    showConfirmModal(
      "Reset Timer", 
      "Please notify the user that the timer is being reset.", 
      () => {
        setIsRunning(false);
        clearInterval(intervalId);
        setTime(0);
      }
    );
  };

  return (
    <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center relative 
                    border-2 border-transparent 
                    hover:border-[oklch(var(--p))]  
                    transition-all duration-300 ease-in-out 
                    hover:shadow-xl hover:shadow-purple-500/20 
                    animate-fadeIn">
      
      {/* Modal for confirmations */}
      <Modal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalConfig.title}
        message={modalConfig.message}
        onConfirm={modalConfig.action}
      />

      <h3 className="text-xl font-semibold text-primary">Job Timer</h3>
      <p className="text-3xl font-mono mt-2">{formatTime(time)}</p>

      <div className="mt-4 flex gap-4">
        <button
          onClick={startTimer}
          className="btn bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition flex items-center gap-2"
          disabled={isRunning}
        >
          <LucidePlay size={20} />
          Start
        </button>
        <button
          onClick={stopTimer}
          className="btn bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition flex items-center gap-2"
          disabled={!isRunning}
        >
          <LucideStopCircle size={20} />
          Stop
        </button>
        <button
          onClick={resetTimer}
          className="btn bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition flex items-center gap-2"
        >
          <LucideRotateCcw size={20} />
          Reset
        </button>
      </div>
    </div>
  );
};

export default WorkTimer;
