import { useStates } from "../../utilities/states";

const Spelschema = () => {

  let s = useStates("main");

  let filtered = [
    {
      auditorium: 'Lilla Salongen',
      films: s.spelschema.filter(showing => showing.auditorium === 'Lilla Salongen')
    },
    {
      auditorium: 'Stora Salongen',
      films: s.spelschema.filter(showing => showing.auditorium === 'Stora Salongen')
    }
  ];

  return <div className='showingsTitle'>
    <h1>Spelschema</h1>
    {filtered.map(({ auditorium, films }) => <>
      <h2>{auditorium}</h2>
      {films.map(({ film, date, time }) => <div>
        <p>Film: {film}</p>
        <p>Datum: {date}</p>
        <p>Tid: {time}</p>
        <hr />
      </div>)}
    </>)}
  </div>


}

export default Spelschema;
