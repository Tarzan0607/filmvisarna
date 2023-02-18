import React, { useState } from 'react';
import '../../css/MovieSeatBookingSystem.css';

export default function BookingPage() {
  const [movie, setMovie] = useState('');
  const [time, setTime] = useState('');
  const [ticketType, setTicketType] = useState('');

  const handleMovieChange = (e) => {
    setMovie(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleTicketTypeChange = (e) => {
    setTicketType(e.target.value);
  };

  const renderSeats = () => {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
    const seatsPerRow = 12;
    const seats = [];

    for (let i = 0; i < rows.length; i++) {
      for (let j = 1; j <= seatsPerRow; j++) {
        seats.push(
          <div key={`${rows[i]}-${j}`} className="seat">
            {j}
          </div>
        );
      }
    }

    return seats;
  };

  return (
    <div className="booking-page">
      <div className="booking-form">
        <h2>Boka biljetter</h2>
        <div className="form-group">
          <label htmlFor="movie-select">Movie:</label>
          <select id="movie" value={movie} onChange={handleMovieChange}>
            <option value="">Välj en film</option>
            <option value="Dune">Dune</option>
            <option value="John Wick">John Wick</option>
            <option value="Spiderman">Spiderman</option>
            <option value="Call Me By Your Name">Call Me By Your Name</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="time-select">Time:</label>
          <select id="time-select" value={time} onChange={handleTimeChange}>
            <option value="">Välj en tid</option>
            <option value="12:00 pm">14:40 pm</option>
            <option value="3:00 pm">15:00 pm</option>
            <option value="6:00 pm">16:40 pm</option>
            <option value="9:00 pm">19:00 pm</option>
            <option value="9:00 pm">21:00 pm</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="ticket-type-select">Ticket Type:</label>
          <select id="ticket-type-select" value={ticketType} onChange={handleTicketTypeChange}>
            <option value="">Välj en biljetttyp</option>
            <option value="Standard">Vuxen</option>
            <option value="child">Barn</option>
            <option value="Premium">Premium</option>
          </select>
        </div>
        <button className="book-button">Boka nu</button>
      </div>
      <div className='showcase'>
      <div className="booking-seating-plan">
          <div className="screen">SCREEN</div>
          
          <div className="seats">
            <div class="row">
              <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
            </div>

            <div class="row">
              <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
            </div>

            <div class="row">
              <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
            </div>

            <div class="row">
              <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
            </div>

            <div class="row">
              <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
            </div>

            <div class="row">
              <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
            </div>

            <div class="row">
              <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
            </div>

            <div class="row">
              <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
            </div>
            <div class="row">
              <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
            </div>
            <div class="row">
              <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
            </div>
            <div class="row">
              <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
            </div>
            <div class="row">
              <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
            </div>
            <div class="row">
              <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
            </div>
            <div class="row">
              <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
                  <div class="seat"></div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}