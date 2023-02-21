import React, { useState, useEffect } from 'react';
import { useStates } from '../../utilities/states';
import {
  get,
  post
} from '../../utilities/backend-talk'

import '../../css/MovieSeatBookingSystem.css';

export default function BookingPage() {
  const [movie, setMovie] = useState('');
  const [time, setTime] = useState('');
  const [ticketType, setTicketType] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [availableSeats, setAvailableSeats] = useState([]);
  const [auditorium, setAuditorium] = useState('');

  
  const [email, setEmail] = useState('');
  const [numSeats, setNumSeats] = useState('');

  const [bookingInfo, setBookingInfo] = useState('');

  const [bookingData, setBookingData] = useState([]);

  const [bookedSeats, setBookedSeats] = useState([]);


  useEffect(() => {
    (async () => {
      const data = await get('/api/booking');
      
      setBookingData(data.response);
    })();
  }, []);

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

  const handleTicketTypeChange = (event) => {
    setTicketType(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);

    (async () => {
      const data = await get('/api/bookedseats?screening=' + event.target.value);

      const occupiedSeats = [];
      data.response.map(seatData => occupiedSeats.push(seatData.seat_id));

      setBookedSeats(occupiedSeats);
    })();
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNumSeatsChange = (event) => {
    setNumSeats(event.target.value);
  };

  const handleBooking = (event) => {
    event.preventDefault();

    const info = `Movie: ${movie}\nTicket Type: ${ticketType}\nTime: ${time}\nEmail: ${email}\nNumber of Seats: ${numSeats}`;
    setBookingInfo(info);
  };

   const handleAuditoriumChange = (event) => {
    setAuditorium(event.target.value);
   };
  
   const handleSeatSelection = (seatNumber) => {
    setSelectedSeats([...selectedSeats, seatNumber]);
  };

  // function to handle canceling seat selection
  const handleSeatCancel = (seatNumber) => {
    setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
  };

   const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Name: ${name}, Email: ${email}, Selected Seats: ${selectedSeats}`);
  };
  const bokaNu = async () => {
    if (!movie) return alert("No movie chosen!");
    if (!time) return alert("No time chosen!");
    if (!ticketType) return alert("No ticket type chosen!");
    if (selectedSeats.length === 0) return alert("No selected seats for booking!");

    const toPost = [];
    selectedSeats.map(seat => toPost.push({seatid: parseInt(seat), screeningid: parseInt(time), tickettype: parseInt(ticketType)}));

    const res = await post('/api/booking', toPost);

    return alert("Booking successfully made!\n\nBooking Numer: " + res.response);
    const auditoriumName = 'Lilla Salongen';
    const { seatsPerRow } = seats.auditoriumsAndSeats.find((x) => x.name === auditoriumName) || {};
    if (!seatsPerRow) {
      return null;
    }
    const selectedSeatsInfo = selectedSeats.map((seatNumber) => {
      const seatIndex = seatNumber - 1;
      const row = Math.floor(seatIndex / seatsPerRow.length) + 1;
      const seatInRow = seatIndex % seatsPerRow.length + 1;
      return `Seat ${seatNumber} - Row ${row}, Seat ${seatInRow}`;
    });
    console.log(selectedSeatsInfo)
    const info = `Auditorium: ${auditoriumName}\nSelected Seats: ${selectedSeatsInfo.join('\n')}\nName: ${name}\nEmail: ${email}`;
    console.log(info);
    alert(`Your booking has been confirmed with the following details:\n\n${info}`);
  };

  if (!bookingData.movies) return <></>
  if (!bookingData.screenings) return <></>

  return (
    <div className="booking-page">
      <div className="booking-form">
        <h2>Boka biljetter</h2>
        <div className="form-group">
        <label htmlFor="movie-select">Movie:</label>
         <select id="movie-select" value={movie} onChange={handleMovieChange}>
            <option value="">Välj en film</option>
            {bookingData.movies.map(movie => <option value={movie.id}>{movie.title}</option>)}
        </select>
        
      </div>
      <div className="form-group">
        <label htmlFor="time-select">Time:</label>
        <select id="time-select" value={time} onChange={handleTimeChange}>
          <option value="">Välj en tid</option>
          {bookingData.screenings.filter(screening => screening.movie_id == movie).map(screening => <option value={screening.id}>{remakeDate(new Date(screening.time))}</option>)}
        </select>
        
      </div>
      <div className="form-group">
        <label htmlFor="ticket-type-select">Ticket Type:</label>
        <select id="ticket-type-select" value={ticketType} onChange={handleTicketTypeChange}>
          <option value="">Välj en biljetttyp</option>
          {time === '' ? '' :
          <option value="1">Vuxen</option>
          }
          {time === '' ? '' :
          <option value="2">Barn</option>
          }
          {time === '' ? '' :
          <option value="3">Pensionär</option>
          }
        </select>
       
      </div>
       
        
       <div className="form-group">
            <label htmlFor="type-email">Email</label>
            <input type="email" id="type-email" />
        </div>
        
       
          
     <div className="showcase">
        <div className="auditorium">
          <div className="screen"></div>
          <div className="rows">
            {rows.map((row, index) => (
              <div className="row" key={index}>
                {row.map((seat) =>
                <div
                className={`seat ${bookedSeats.includes(seat) ? "sold" : selectedSeats.includes(seat) ? "selected" : ""}`}
                key={seat}
                onClick={() => bookedSeats.includes(seat) ? null : handleSeatClick(seat)}
                >
                  {seat}
                </div>
                  //<div
                  //  className={`seat ${selectedSeats.includes(seat) ? "selected" : ""}`}
                  //  key={seat}
                  //  onClick={() => handleSeatClick(seat)}
                  //>
                  //  {seat}
                  //</div>
                )}
              </div>
            ))}
          </div>
        </div>
              
              
        
      </div>
      

        <div>
            <h2>Current Auditorium :- "{name}"</h2>
              
                

           
        <div className="seat-info">
          <div className="seat sold"></div>
          <span>Upptagna platser</span>
        </div>
      </div>
      <div className="selected-seats">
          <div className="seat-info">
              <div className="seat selected"></div>
                <span>Valda platser :-</span>
                <span>{selectedSeats.length}</span>
              </div>
        </div>
         <div>
      <form onSubmit={handleSubmit}>
       <br />
          <label>
             Selected Seats:
               <ul>
                 {selectedSeats.map((seat) => (
                <li key={seat}>
                  Seat {seat}
                   <button type="button" onClick={() => handleSeatCancel(seat)} className="cancel-button">
                  Cancel
                  </button>
                </li>
              ))}
          </ul>
         </label>
       <br />
      </form>
      <button className="book-button" onClick={bokaNu}>Boka nu</button>
    </div>
        

        
        
            
        
      
    </div>
  </div>
);     
}

function remakeDate(date) {
  const AD = date;
  const ADY = AD.getFullYear();
  let ADM = AD.getMonth() + 1;
  let ADD = AD.getDate();
  let ADH = AD.getHours();
  let ADMI = AD.getMinutes();
  let ADS = AD.getSeconds();

  if (ADD < 10) {
      ADD = '0' + AD.getDate();
  }
  if (ADM < 10) {
      ADM = '0' + ADM;
  }
  if (ADH < 10) {
      ADH = '0' + AD.getHours();
  }
  if (ADMI < 10) {
      ADMI = '0' + AD.getMinutes();
  }
  if (ADS < 10) {
      ADS = '0' + AD.getSeconds();
  }

  return `${ADY}-${ADM}-${ADD} ${ADH}:${ADMI}:${ADS}`;
}

/* 
            <option value="Dune">Dune</option>
            <option value="John Wick">John Wick</option>
            <option value="Sagan">Sagan Om Konungens Återkomst</option>
            <option value="Spiderman">Spiderman-Into the spider-verse</option>
            <option value="Call Me By Your Name">Call Me By Your Name</option>

            <option value="12:00 pm">14:40 pm</option>
            <option value="3:00 pm">15:00 pm</option>
            <option value="4:00 pm">16:40 pm</option>
            <option value="7:00 pm">19:00 pm</option>
            <option value="9:00 pm">21:00 pm</option>
*/