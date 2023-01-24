import { useEffect } from 'react';
import { useStates } from './utilities/states';
// useful hooks, comment these in, when needed:
// import { useStates } from './utilities/states.js';
// import { useEffect } from 'react';

export default function App() {

  const s = useStates('main', {
    films: []
  });

  useEffect(() => {
    // anonoymous async auto executing arrow function
    (async () => {
      // fetch the data
      console.log("FILMTEST: ", filmInfo[0])
      let fetchedData = await fetch('/json/filmInfo.json');
      // convert it from json to a js data structure
      let dataFromJson = await fetchedData.json();
      console.log("FROMJSON: ", dataFromJson)
      // set a new value for the state variable people
      s.films = dataFromJson;
      // oneliner:
      // s.people = await (await fetch('/json/people.json')).json();
    })();
  }, []);

  console.log("FILMS: ", s.films)
  let film = s.films.find(film => film.id === id);
  console.log(film)
  let { title, description, genre } = film;

  return <>
    {console.log("HERE: ", s.films)}
    <h1>Hello world!</h1>
    <h2> {title} {genre} </h2>
    <p> {description}</p>
  </>;
}