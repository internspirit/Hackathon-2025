import React, { useState } from 'react';

const WorkDesc = ({ onSave }) => {
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(true);
  const [savedDesc, setSavedDesc] = useState('');

  const handleSubmit = () => {
    setSavedDesc(description);
    setIsEditing(false);
    if (onSave) onSave(description);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="card bg-base-200 shadow-xl mb-6">
      <div className="card-body">
        <h3 className="card-title text-lg mb-2">Work Description</h3>
        
        {isEditing ? (
          <>
            <textarea 
              className="textarea textarea-bordered w-full h-32" 
              placeholder="Describe the work that needs to be done..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <div className="card-actions justify-end mt-2">
              <button 
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="bg-base-300 p-4 rounded-lg min-h-24">
              {savedDesc || "No description provided."}
            </div>
            <div className="card-actions justify-end mt-2">
              <button 
                className="btn btn-outline btn-primary"
                onClick={handleEdit}
              >
                Edit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WorkDesc;