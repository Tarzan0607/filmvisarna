import { useEffect } from 'react';
import { useStates } from './utilities/states';
import { urlify } from './utilities/urlify';
import OmOss from './components/main/OmOss';
import Footer from './components/main/Footer';
import Navbar from './components/main/Navbar';
import Home from './components/main/Home';
import Error from './components/main/Error';
import Butik from './components/main/Butik';
import moveDetails from './components/movieDetails';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import movieList from './components/movie/MovieList';

export default function App() {

  const s = useStates('main', {
    films: [],
    routes: [
      { path: '*', Component: Error },
      { path: '/:moviePath', Component: moveDetails },
      { path: '/OmOss', Component: OmOss },
      { path: '/butik', Component: Butik },
      { menuLabel: 'Start', path: '/', Component: Home }
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
      s.films = films
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