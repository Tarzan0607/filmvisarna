import React, { useState } from 'react';
import { useStates } from '../../utilities/states';

import '../../css/MovieSeatBookingSystem.css';

export default function BookingPage() {
  const [movie, setMovie] = useState('');
  const [time, setTime] = useState('');
  const [ticketType, setTicketType] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [availableSeats, setAvailableSeats] = useState([]);

  const s = useStates('main');

  // Find the seat info for the audtiorium with matching name
  let name = 'Lilla Salongen';
  let { seatsPerRow } = s.auditoriumsAndSeats.find(x => x.name === name) || {};
  if (!seatsPerRow) { return null; }

  // Create an array of arrays where each smaller array
  // is a row with each seat number
  let rows = [], counter = 1;
  for (let howMany of seatsPerRow) {
    let row = [];
    for (let i = 0; i < howMany; i++) {
      row.unshift(counter);
      counter++;
    }
    rows.push(row);
  }

  // Update the selected seats and available seats when a seat is clicked
  const handleSeatClick = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
      setAvailableSeats([...availableSeats, seat]);
    } else {
      setSelectedSeats([...selectedSeats, seat]);
      setAvailableSeats(availableSeats.filter(s => s !== seat));
    }
  };

  const handleMovieChange = (event) => {
    setMovie(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleTicketTypeChange = (event) => {
    setTicketType(event.target.value);
  };



  return (
    <div className="booking-page">
      <div className="booking-form">
        <h2>Boka biljetter</h2>
        <div className="form-group">
        <label htmlFor="movie-select">Movie:</label>
         <select id="movie-select" value={movie} onChange={handleMovieChange}>
            <option value="">Välj en film</option>
            <option value="Dune">Dune</option>
            <option value="John Wick">John Wick</option>
            <option value="Sagan">Sagan Om Konungens Återkomst</option>
            <option value="Spiderman">Spiderman-Into the spider-verse</option>
            <option value="Call Me By Your Name">Call Me By Your Name</option>
        </select>
        
      </div>
      <div className="form-group">
        <label htmlFor="time-select">Time:</label>
        <select id="time-select" value={time} onChange={handleTimeChange}>
          <option value="">Välj en tid</option>
            <option value="12:00 pm">14:40 pm</option>
            <option value="3:00 pm">15:00 pm</option>
            <option value="4:00 pm">16:40 pm</option>
            <option value="7:00 pm">19:00 pm</option>
            <option value="9:00 pm">21:00 pm</option>
         
        </select>
        
      </div>
      <div className="form-group">
        <label htmlFor="ticket-type-select">Ticket Type:</label>
        <select id="ticket-type-select" value={ticketType} onChange={handleTicketTypeChange}>
          <option value="">Välj en biljetttyp</option>
          <option value="Standard">Vuxen</option>
          <option value="Premium">Barn</option>
          <option value="">Pensionerad</option>
        </select>
       
      </div>
       
        
       <div className="form-group">
         <label htmlFor="type-email">Email</label>
         <input type="email" id="type-email" />
       </div>
          <button className="book-button">Boka nu</button>
     <div className="showcase">
        <div className="auditorium">
          <div className="screen"></div>
          <div className="rows">
            {rows.map((row, index) => (
              <div className="row" key={index}>
                {row.map((seat) => (
                            <div
                             className={`seat ${selectedSeats.includes(seat) ? "selected" : ""}`}
                              key={seat}
                               onClick={() => handleSeatClick(seat)}
                                >
                              {seat}
                            </div>
                          ))}
                       </div>
                      ))}
                   </div>
                </div>
              <div className="seat-info">
          
       
           </div>

        </div>
            <div className="selected-seats">
            <div className="seat-info">
              <div className="seat selected"></div>
               <span>Valda platser</span>
            </div>
        
        <div className="seat-info">
          <div className="seat sold"></div>
          <span>Upptagna platser</span>
          </div>
          
          
        </div>
        
      
    </div>
  </div>
);

      
      
      
}

