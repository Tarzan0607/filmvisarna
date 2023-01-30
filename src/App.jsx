import { useEffect } from 'react';
import { useStates } from './utilities/states';
import { urlify } from './utilities/urlify';
import OmOss from './components/pages/OmOss';
import Footer from './components/pages/Footer';
import Navbar from './components/pages/Navbar';
import Home from './components/pages/Home';
import Error from './components/pages/Error';
import Butik from './components/pages/Butik';
import MoveDetails from './components/pages/MovieDetails';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

export default function App() {

  const s = useStates('main', {
    films: [],
    routes: [
      { path: '*', Component: Error },
      { path: '/movie/:moviePath', Component: MoveDetails },
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