import React, { useState } from "react";
import toast from "react-hot-toast";
import { LucideMapPin, LucideCalendar } from "lucide-react";

const initialWorkRequests = [
  { id: 1, customer: "John Doe", location: "Downtown, NY", date: "Feb 29, 2024" },
  { id: 2, customer: "Jane Smith", location: "Uptown, NY", date: "Mar 1, 2024" },
  { id: 3, customer: "Alex Johnson", location: "Brooklyn, NY", date: "Mar 2, 2024" },
  { id: 4, customer: "Michael Brown", location: "Queens, NY", date: "Mar 3, 2024" },
  { id: 5, customer: "Emily Davis", location: "Bronx, NY", date: "Mar 4, 2024" },
  { id: 6, customer: "David Miller", location: "Manhattan, NY", date: "Mar 5, 2024" },
];

const WorkList = () => {
  const [jobs, setJobs] = useState(initialWorkRequests);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open the modal and store job details
  const openModal = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  // Handle Accept
  const handleAccept = () => {
    if (selectedJob) {
      toast.success("Work Accepted!", { style: { background: "#4CAF50", color: "#fff" } });
      setJobs(jobs.filter((job) => job.id !== selectedJob.id));
    }
    closeModal();
  };

  // Handle Reject
  const handleReject = () => {
    if (selectedJob) {
      toast.error("Work Rejected", { style: { background: "#D32F2F", color: "#fff" } });
      setJobs(jobs.filter((job) => job.id !== selectedJob.id));
    }
    closeModal();
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-primary mb-6 text-center">New Work Requests</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.length > 0 ? (
          jobs.map((work) => (
            <div key={work.id} className="bg-transparent border border-gray-700 backdrop-blur-lg p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold">{work.customer}</h3>
              <p className="text-gray-400 flex items-center gap-2">
                <LucideMapPin size={18} /> {work.location}
              </p>
              <p className="text-gray-400 flex items-center gap-2">
                <LucideCalendar size={18} /> {work.date}
              </p>

              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => openModal(work)}
                  className="btn border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                >
                  Accept
                </button>
                <button
                  onClick={() => openModal(work)}
                  className="btn border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 col-span-3">No new work requests.</p>
        )}
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1a2332] text-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Are you sure?</h2>
            <p className="text-gray-400 mb-6">
              Do you want to {selectedJob ? "accept or reject" : ""} this job?
            </p>

            <div className="flex justify-between">
              <button
                onClick={handleAccept}
                className="px-5 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
              >
                Accept
              </button>
              <button
                onClick={handleReject}
                className="px-5 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Reject
              </button>
              <button
                onClick={closeModal}
                className="px-5 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkList;
