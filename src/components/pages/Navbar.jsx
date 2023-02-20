import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../../css/style-nav.css";
import { useStates } from '../../utilities/states';

function Navbar() {
  const s = useStates('main');
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle("responsive_nav");
  };
   
	return (
		<header>
<<<<<<< HEAD
			<h2 className="header-home">Filmvisarna</h2>
			<nav ref={navRef}>

				{s.routes.map(({ menuLabel, path }) =>
					<a href={path}>{menuLabel}</a>
				)}
				{/* Loop through the menu and display menu items */}

=======
			<h2 className="logo"><Link to="/">Filmvisarna</Link></h2>

			<nav ref={navRef}>   
				
        {s.routes.map(({ menuLabel, path }) =>
          <a href={path}>{ menuLabel}</a>            
        )}
        {/* Loop through the menu and display menu items */}
  
>>>>>>> feature-navbar
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<button className="nav-btn" onClick={showNavbar}>
				<FaBars />
			</button>
		</header>
	);
}

export default Navbar;