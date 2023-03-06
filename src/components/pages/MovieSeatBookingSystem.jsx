import React, { useState, useEffect } from 'react';
import { useStates } from '../../utilities/states';
import {
  get,
  post
} from '../../utilities/backend-talk'
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'
import '../../css/MovieSeatBookingSystem.css';

export default function BookingPage() {
  const [movie, setMovie] = useState('');
  const [time, setTime] = useState('');
  const [ticketType, setTicketType] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [availableSeats, setAvailableSeats] = useState([]);


  const [email, setEmail] = useState('');
  const [numSeats, setNumSeats] = useState('');

  const [bookingInfo, setBookingInfo] = useState('');

  const [bookingData, setBookingData] = useState([]);

  const [bookedSeats, setBookedSeats] = useState([]);

  const [currentAuditorium, setCurrentAuditorium] = useState('Lilla Salongen');


  useEffect(() => {
    (async () => {
      const data = await get('/api/booking');

      setBookingData(data.response);
    })();
  }, []);

  const s = useStates('main');

  // Find the seat info for the audtiorium with matching name
  let name = currentAuditorium;
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
    setTime('');
    setTicketType('');
  };

  const handleTicketTypeChange = (event) => {
    setTicketType(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
    setSelectedSeats([]);

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
    setCurrentAuditorium(event.target.value);
    setTime('');
    setMovie('');
    setTicketType('');
    setSelectedSeats([]);
  };

  const handleSeatSelection = (seatNumber) => {
    setSelectedSeats([...selectedSeats, seatNumber]);
  };

  // function to handle canceling seat selection
  const handleSeatCancel = (seatNumber) => {
    console.log("selectedSeats", selectedSeats);
    console.log("seatToCancel", seatNumber);
    // For some reason we get double calls to handleSeatCanncel
    // TODO: Find why
    // For now: Fix by delaying the actual removal with a setTimeout of 1 ms
    // -> run the removal separately from the actual click
    setTimeout(() => setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber)), 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Namn: ${name}, Email: ${email}, Valda säten: ${selectedSeats}`);
  };

  let typeMultiplier;
  if (ticketType === '1') {
    typeMultiplier = 130;
  } else if (ticketType === '2') {
    typeMultiplier = 110;
  } else if (ticketType === '3') {
    typeMultiplier = 110;
  } else {
    typeMultiplier = 0;
  }

  const bokaNu = async () => {
    if (!movie) return Swal.fire({ title: 'Inmatningsfel', text: 'Välj en film först', icon: 'error', confirmButtonText: 'Bekräfta' });
    if (!time) return Swal.fire({ title: 'Inmatningsfel', text: 'Välj en tid först', icon: 'error', confirmButtonText: 'Bekräfta' });
    if (!ticketType) return Swal.fire({ title: 'Inmatningsfel', text: 'Välj en biljettyp först', icon: 'error', confirmButtonText: 'Bekräfta' });
    if (!email.match(/^\S+@\S+\.\S+$/)) return Swal.fire({ title: 'Inmatningsfel', text: 'Använd en giltig email-adress', icon: 'error', confirmButtonText: 'Bekräfta' });
    if (selectedSeats.length === 0) return Swal.fire({ title: 'Inmatningsfel', text: 'Välj säten först', icon: 'error', confirmButtonText: 'Bekräfta' });

    const toPost = [];
    selectedSeats.map(seat => toPost.push({ seatid: parseInt(seat), screeningid: parseInt(time), tickettype: parseInt(ticketType), email: email }));

    const res = await post('/api/booking', toPost);

    if (res.response === 'Database query failed to execute!') return Swal.fire({ title: 'Serverfel', text: 'Databasen kunde inte skicka in bokningsdatan korrekt', icon: 'error', confirmButtonText: 'Bekräfta' });

    return Swal.fire({ title: 'Bokning genomförd', text: `Bokning gjord, bokningsID: ${res.response}\n\nPris: ${(selectedSeats.length * typeMultiplier).toLocaleString('en-US')}:-`, icon: 'success', confirmButtonText: 'Bekräfta' }).then((result) => {

      setEmail('');
      setTime('');
      setSelectedSeats([]);
      setMovie('');
      setTicketType('');

      //Most simple way of setting email to empty string
      const emailBox = document.getElementById('type-email');
      emailBox.value = '';
      return;
    });
  };

  if (!bookingData.movies) return <></>
  if (!bookingData.screenings) return <></>

  let currentAuditoriumId;
  if (currentAuditorium === 'Lilla Salongen') currentAuditoriumId = 4;
  if (currentAuditorium === 'Stora Salongen') currentAuditoriumId = 3;

  return (
    <div className="booking-page">
      <div className="booking-form">
        <h2>Boka biljetter</h2>
        <div className="form-group">
          <label htmlFor="movie-select">Salong:</label>
          <select id="movie-select" onChange={handleAuditoriumChange}>
            <option value="Lilla Salongen">Lilla Salongen</option>
            <option value="Stora Salongen">Stora Salongen</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="movie-select">Film:</label>
          <select id="movie-select" value={movie} onChange={handleMovieChange}>
            <option value="">Välj en film</option>
            {bookingData.movies.map(movie => <option value={movie.id}>{movie.title}</option>)}
          </select>

        </div>
        <div className="form-group">
          <label htmlFor="time-select">Tid:</label>
          <select id="time-select" value={time} onChange={handleTimeChange}>
            <option value="">Välj en tid</option>
            {bookingData.screenings.filter(screening => screening.movie_id == movie && screening.auditorium_id === currentAuditoriumId).map(screening => <option value={screening.id}>{remakeDate(new Date(screening.time))}</option>)}
          </select>

        </div>
        <div className="form-group">
          <label htmlFor="ticket-type-select">Biljettyp:</label>
          <select id="ticket-type-select" value={ticketType} onChange={handleTicketTypeChange}>
            <option value="">Välj en biljetttyp</option>
            {time === '' ? '' :
              <option value="1">Vuxen</option>
            }
            {time === '' ? '' :
              <option value="2">Barn</option>
            }
            {time === '' ? '' :
              <option value="3">Senior</option>
            }
          </select>

        </div>


        <div className="form-group">
          <label htmlFor="type-email">Email</label>
          <input onChange={handleEmailChange} type="email" id="type-email" />
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
                      onClick={() => !ticketType || !email || !time ? null : bookedSeats.includes(seat) ? null : handleSeatClick(seat)}
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
          <h2>Nuvarande Salong: "{name}"</h2>




          <div className="seat-info">
            <div className="seat sold"></div>
            <span>Upptagna platser</span>
          </div>
        </div>
        <div className="selected-seats">
          <div className="seat-info">
            <div className="seat selected"></div>
            <span>Valda platser: </span>
            <span>{selectedSeats.length}st</span>
          </div>
        </div>
        <div>
          <span>Totalt Pris: {(selectedSeats.length * typeMultiplier).toLocaleString('en-US')}:-</span>
          <form onSubmit={handleSubmit}>
            <br />
            <label>
              Valda platser:
              <ul>
                {selectedSeats.map((seat) => (
                  <li key={seat}>
                    Säte {seat}
                    <button type="button" onClick={() => handleSeatCancel(seat)} className="cancel-button">
                      Ta bort
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

  return `${ADY}-${ADM}-${ADD} ${ADH}:${ADMI}`;
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