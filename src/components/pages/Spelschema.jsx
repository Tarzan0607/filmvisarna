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

  return <div>
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

  /*return (
      <div>
        <h1>Spelschema</h1>
        <div>
          <h2>Stora Salong</h2>
          <div>
            <p>Movie: Call me by your name</p>
            <p>Poster: <img src="./images/call-me-by-your-name.jpg" alt="Call me by your name poster" /></p>
            <p>Datum: 2022-02-20</p>
            <p>Tid: 14:00</p>
          </div>
          <div>
            <p>Movie: Dune</p>
            <p>Poster: <img src="./images/dune.jpg" alt="Dune poster" /></p>
            <p>Datum: 2022-02-21</p>
            <p>Tid: 16:00</p>
          </div>
  
        </div>
        <div>
          <h2>Lilla Salong</h2>
          <div>
            <p>Movie: Spider-man: Into the Spider-verse</p>
            <p>Poster: <img src=" ./images/into-the-spider---verse.jpg" alt="Spider-man: Into the Spider-verse" /></p>
            <p>Datum: 2022-02-20</p>
            <p>Tid: 12:00</p>
          </div>
          <div>
            <p>Movie: Sagan Om Konungens Återkomst</p>
            <p>Poster: <img src=" ./images/the-return-of-the-king.jpg" alt="Sagan Om Konungens Återkomst" /></p>
            <p>Datum: 2022-02-21</p>
            <p>Tid: 18:00</p>
          </div>
          <div>
            <p>Movie: John Wick</p>
            <p>Poster: <img src=" ./images/john-wick.jpg" alt="John Wick poster" /></p>
            <p>Datum: 2022-02-22</p>
            <p>Tid: 20:00</p>
          </div>
        </div>
      </div>
    );*/
}

export default Spelschema;
