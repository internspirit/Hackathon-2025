import React, { useState } from 'react';

const DateTime = ({ onDateTimeSelect }) => {
  const [bookingType, setBookingType] = useState("later");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedHour, setSelectedHour] = useState("");
  const [selectedMinute, setSelectedMinute] = useState("00");
  const [selectedAmPm, setSelectedAmPm] = useState("AM");
  
  // Generate hour options (1-12 for AM/PM)
  const generateHourOptions = () => {
    const options = [];
    for (let hour = 1; hour <= 12; hour++) {
      options.push(hour.toString().padStart(2, '0'));
    }
    return options;
  };
  
  const hourOptions = generateHourOptions();
  
  // Handle date and time changes
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    updateParent(e.target.value, selectedHour, selectedMinute, selectedAmPm);
  };
  
  const handleHourChange = (e) => {
    setSelectedHour(e.target.value);
    updateParent(selectedDate, e.target.value, selectedMinute, selectedAmPm);
  };
  
  const handleMinuteChange = (e) => {
    setSelectedMinute(e.target.value);
    updateParent(selectedDate, selectedHour, e.target.value, selectedAmPm);
  };
  
  const handleAmPmChange = (e) => {
    setSelectedAmPm(e.target.value);
    updateParent(selectedDate, selectedHour, selectedMinute, e.target.value);
  };
  
  // Update parent component with selected date, time and booking type
  const updateParent = (date, hour, minute, ampm) => {
    if (date && hour) {
      const timeString = `${hour}:${minute} ${ampm}`;
      onDateTimeSelect({
        date,
        time: timeString,
        bookingType,
        extraCharge: bookingType === "now" ? 40 : 0
      });
    }
  };
  
  // When booking type changes, update parent
  React.useEffect(() => {
    if (selectedDate && selectedHour) {
      updateParent(selectedDate, selectedHour, selectedMinute, selectedAmPm);
    }
  }, [bookingType]);
  
  return (
    <div>
      {/* Booking Options */}
      <div className="card bg-base-200 shadow-xl mb-6">
        <div className="card-body">
          <h3 className="card-title text-lg mb-4">Booking Options</h3>
          
          {/* Radio Button Group */}
          <div className="space-y-4">
            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-3">
                <input
                  type="radio"
                  name="booking-type"
                  className="radio radio-primary"
                  checked={bookingType === "later"}
                  onChange={() => setBookingType("later")}
                />
                <div>
                  <span className="label-text text-base font-medium">Book for Later</span>
                  <p className="text-sm opacity-70">Schedule a service at your preferred time</p>
                </div>
              </label>
            </div>
            
            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-3">
                <input
                  type="radio"
                  name="booking-type"
                  className="radio radio-primary"
                  checked={bookingType === "now"}
                  onChange={() => setBookingType("now")}
                />
                <div>
                  <span className="label-text text-base font-medium">Book Now</span>
                  <p className="text-sm opacity-70">Get service as soon as possible</p>
                  {bookingType === "now" && (
                    <p className="text-error font-medium mt-1">Extra charge of ₹40</p>
                  )}
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      {/* Date and Time Selector */}
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h3 className="card-title text-lg mb-4">Select Date and Time</h3>
          
          {/* Simple Calendar */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Select Date</span>
            </label>
            <input 
              type="date" 
              className="input input-bordered w-full"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>
          
          {/* Time Selection - Split into hour, minute, and AM/PM */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Select Time</span>
            </label>
            <div className="flex space-x-2">
              <div className="flex-1">
                <select 
                  className="select select-bordered w-full"
                  value={selectedHour}
                  onChange={handleHourChange}
                >
                  <option value="" disabled>Hour</option>
                  {hourOptions.map((hour) => (
                    <option key={hour} value={hour}>{hour}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <select 
                  className="select select-bordered w-full"
                  value={selectedMinute}
                  onChange={handleMinuteChange}
                >
                  <option value="00">00</option>
                  <option value="30">30</option>
                </select>
              </div>
              <div className="flex-1">
                <select 
                  className="select select-bordered w-full"
                  value={selectedAmPm}
                  onChange={handleAmPmChange}
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>
            <label className="label">
              <span className="label-text-alt">Business hours: 8:00 AM - 8:00 PM</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateTime;