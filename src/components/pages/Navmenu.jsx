import { useStates } from '../../utilities/states';
import { NavLink } from 'react-router-dom';
import '../../css/style-navbar.css';


export default function Navmenu() {

  // Connect to the main state so we can read the menu
  // (that has been declared in the App component)
  const s = useStates('main');

  return <nav>
    <div className='nav-menu'>
      <h1 id="h2title"><u className="trans">FilmVisarna</u></h1>
      <ul id="main-nav">
              {s.routes.map(({ menuLabel, path }) =>
      menuLabel ? <li><NavLink to={path}>{menuLabel}</NavLink></li>: null
        )}
         </ul>
         <div className='nav_toggler'>
      <div className='line1'></div>
      <div className='line2'></div>
      <div className='line3'></div>
      </div>
     
      
    </div>
    
    {/* Loop through the menu and display menu items */}
   
  </nav>;
}