import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WorkStats = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const workDoneData = {
    labels: days,
    datasets: [
      {
        label: "Work Completed",
        data: [2, 3, 1, 4, 2, 5, 3],
        backgroundColor: "rgba(156, 39, 176, 0.7)", // Purple
        borderColor: "rgba(156, 39, 176, 1)",
        borderWidth: 2,
      },
    ],
  };

  const hoursWorkedData = {
    labels: days,
    datasets: [
      {
        label: "Hours Worked",
        data: [5, 6, 3, 7, 4, 8, 6],
        backgroundColor: "rgba(103, 58, 183, 0.7)", // Deep Purple
        borderColor: "rgba(103, 58, 183, 1)",
        borderWidth: 2,
      },
    ],
  };

  const revenueData = {
    labels: days,
    datasets: [
      {
        label: "Daily Revenue (₹)",
        data: [1200, 800, 1500, 950, 1100, 700, 1300], // Revenue in Rupees
        backgroundColor: "rgba(171, 71, 188, 0.7)", // Light Purple
        borderColor: "rgba(171, 71, 188, 1)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="mt-10">
      {/* Your Stats Heading */}
      <h2 className="text-4xl font-bold text-primary text-center mb-8">Your Stats</h2>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {/* Total Jobs Completed */}
        <div className="bg-[#1a2332] bg-opacity-80 backdrop-blur-lg p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-lg font-semibold text-gray-300">Total Jobs</h3>
          <p className="text-3xl font-bold text-primary mt-2">45</p>
        </div>

        {/* Total Earnings in ₹ */}
        <div className="bg-[#1a2332] bg-opacity-80 backdrop-blur-lg p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-lg font-semibold text-gray-300">Earnings (₹)</h3>
          <p className="text-3xl font-bold text-green-400 mt-2">₹12,500</p>
        </div>

        {/* Customer Rating */}
        <div className="bg-[#1a2332] bg-opacity-80 backdrop-blur-lg p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-lg font-semibold text-gray-300">Customer Rating</h3>
          <p className="text-3xl font-bold text-yellow-400 mt-2">4.8 ⭐</p>
        </div>

        {/* Hours Worked */}
        <div className="bg-[#1a2332] bg-opacity-80 backdrop-blur-lg p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-lg font-semibold text-gray-300">Hours Worked</h3>
          <p className="text-3xl font-bold text-blue-400 mt-2">120h</p>
        </div>
      </div>

      {/* Stats Charts */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Work Completed Chart */}
        <div className="bg-[#1a2332] bg-opacity-80 backdrop-blur-lg p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-primary text-center mb-3">Work Completed</h2>
          <div className="h-60">
            <Bar data={workDoneData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Hours Worked Chart */}
        <div className="bg-[#1a2332] bg-opacity-80 backdrop-blur-lg p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-primary text-center mb-3">Hours Worked</h2>
          <div className="h-60">
            <Bar data={hoursWorkedData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Daily Revenue Chart in ₹ */}
        <div className="bg-[#1a2332] bg-opacity-80 backdrop-blur-lg p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-primary text-center mb-3">Daily Revenue (₹)</h2>
          <div className="h-60">
            <Bar data={revenueData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkStats;
