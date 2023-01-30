import { useEffect } from 'react';
import { useStates } from './utilities/states';
import { urlify } from './utilities/urlify';
import Footer from './components/main/Footer';
import Navbar from './components/main/Navbar';
import Home from './components/main/Home';
import Error from './components/main/Error';
import moveDetails from './components/movieDetails';
import Spelschema from './components/main/Spelschema';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import movieList from './components/movie/MovieList';

export default function App() {

  const s = useStates('main', {
    films: [],
    spelschema: [],
    routes: [
      { path: '*', Component: Error },
      { path: '/:moviePath', Component: moveDetails },
      { menuLabel: 'Start', path: '/', Component: Home },
      { menuLabel: 'Spelschema', path: '/spelschema', Component: Spelschema }
    ]
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
      for (let movie of s.films) {
        movie.path = '/' + urlify(movie.title)
      }
      // fetch the data
      //console.log("FILMTEST: ", filmInfo[0])
      let fetchedData2 = await fetch('/json/spelschema.json');
      // convert it from json to a js data structure
      let dataFromJson2 = await fetchedData2.json();
      s.spelschema = dataFromJson2;
      // oneliner:
      // s.people = await (await fetch('/json/people.json')).json();
    })();
  }, []);

  return <BrowserRouter>
    <header>
      <Navbar />
    </header>
    <main>
      <Routes>
        {s.routes.map(({ path, Component }) => <Route path={path} element={<Component />} />)}
      </Routes>
    </main>
    <footer>
      <Footer />
    </footer>
  </BrowserRouter>;
}