import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../CSS/Reservation.css";

export function Reservation() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState("");
  const datepickerRef = useRef(null);

  useEffect(() => {
    datepickerRef.current.setOpen(true);
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handlePaymentChange = (e) => {
    setSelectedPayment(e.target.value);
  };

  const handleBooking = (e) => {
    e.preventDefault();
    if (selectedDate && selectedPayment) {
      // Process the booking logic here using the selectedDate and selectedPayment
      console.log("Booking appointment on", selectedDate);
      console.log("Selected payment method:", selectedPayment);
      // You can make an API call to book the appointment or handle it as per your requirements
    } else {
      // Display an error message or perform other actions
      alert("Please select a date and payment method.");
    }
  };

  return (
    <div className="reservation-container">
      <h1 className="reservation-title">Reservation</h1>
      <form onSubmit={handleBooking}>
        <div className="form-group">
          <label className="form-label">Select a date:</label>
          <DatePicker
            ref={datepickerRef}
            className="date-picker"
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            placeholderText="Select a date"
            open={true}
          />
        </div>
        <div className="form-group">
          {/* <label className="form-label">Select payment method:</label> */}
          <select
            className="payment-select"
            value={selectedPayment}
            onChange={handlePaymentChange}
            required
          >
            <option value="">-- Select payment method --</option>
            <option value="cash">Cash</option>
            <option value="visa">Visa</option>
          </select>
        </div>
        <button className="book-button" type="submit">
          Book Appointment
        </button>
      </form>
    </div>
  );
}
