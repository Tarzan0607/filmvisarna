import { useEffect } from 'react';
import { useStates } from './utilities/states';
import Navbar from './components/main/Navbar';
import Home from './components/main/Home';
import Error from './components/main/Error';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

export default function App() {

  const s = useStates('main', {
    films: [],
    routes: [
      {path: '*', Component: Error},
      {menuLabel: 'Start', path: '/', Component: Home}
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
      {s.routes.map(({path, Component}) => <Route path={path} element={<Component />} />)}
    </Routes>
  </main>
  <footer>
      FOOTER
  </footer>
  </BrowserRouter>;
}