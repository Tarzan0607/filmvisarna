import { useStates } from '../../utilities/states';
import "../../css/MovieSeatBookingSystem.css";

const MovieSeatBookingSystem = () => {
  const [seats, setSeats] = useStates(Array(30).fill(false));
  const [numOfSeats, setNumOfSeats] = useStates(0);

  const handleSeatClick = (index) => {
    const newSeats = [...seats];
    newSeats[index] = !newSeats[index];
    setSeats(newSeats);

    if (newSeats[index]) {
      setNumOfSeats(numOfSeats + 1);
    } else {
      setNumOfSeats(numOfSeats - 1);
    }
  };

  const renderSeats = () => {
    return seats.map((isReserved, index) => {
      return (
        <div
          key={index}
          className={`seat ${isReserved ? "reserved" : ""}`}
          onClick={() => handleSeatClick(index)}
        />
      );
    });
  };

  return (
    <div className="container">
      <h2 className="title">Movie Seat Booking System</h2>
      <div className="screen">Screen</div>
      <div className="seats">{renderSeats()}</div>
      <p className="info">You have selected {numOfSeats} seats.</p>
    </div>
  );
};

export default MovieSeatBookingSystem;
