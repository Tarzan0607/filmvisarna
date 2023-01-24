import { useEffect } from 'react';
import { useStates } from './utilities/states';
import MovieList from './components/movie/movieList';
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
      //console.log("FILMTEST: ", filmInfo[0])
      let fetchedData = await fetch('/json/filmInfo.json');
      // convert it from json to a js data structure
      let dataFromJson = await fetchedData.json();
      // set a new value for the state variable people
      s.films = dataFromJson;
      // oneliner:
      // s.people = await (await fetch('/json/people.json')).json();
    })();
  }, []);

  return <div>
    <h1>All available Films</h1>
    <MovieList />
  </div>;
}