import { useEffect } from 'react';
import { useStates } from './utilities/states';
import { urlify } from './utilities/urlify';
import React from 'react';
import OmOss from './components/pages/OmOss';
import Footer from './components/pages/Footer';
import Navbar from './components/pages/Navbar';
import Home from './components/pages/Home';
import Error from './components/pages/Error';
import Butik from './components/pages/Butik';
import MoveDetails from './components/pages/MovieDetails';
import MovieSeatBookingSystem from './components/pages/MovieSeatBookingSystem';
import Spelschema from './components/pages/Spelschema';


//import Navmenu  from './components/pages/Navmenu';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

export default function App() {

  const s = useStates('main', {
    films: [],
    spelschema: [],
    auditoriumsAndSeats: [],
    routes: [
      { path: '*', Component: Error },
      { path: '/movie/:MoviePath', Component: MoveDetails },
      { menuLabel: 'Start', path: '/', Component: Home },
      { menuLabel: 'Spelschema', path: '/spelschema', Component: Spelschema },
      { menuLabel: 'Bokning & Biljetter', path: '/MovieSeatBookingSystem', Component: MovieSeatBookingSystem },
      {menuLabel: 'Butik', path: '/butik', Component: Butik },
      {menuLabel: 'Om Oss', path: '/OmOss', Component: OmOss }, 
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
        movie.path = '/movie/' + urlify(movie.title)
      }

      let fetchedData2 = await fetch('/json/spelschema.json');
      // convert it from json to a js data structure
      let dataFromJson2 = await fetchedData2.json();
      s.spelschema = dataFromJson2;

      s.auditoriumsAndSeats = await (await fetch('json/auditoriums-and-seats.json')).json();

      // oneliner:
      // s.people = await (await fetch('/json/people.json')).json();
    })();
  }, []);

  return <BrowserRouter>
		<React.Fragment>
			<Navbar/>
		</React.Fragment>
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