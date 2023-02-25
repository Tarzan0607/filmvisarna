import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../../css/style-nav.css";
import { useStates } from '../../utilities/states';
import { Link } from "react-router-dom";
import {
	del
} from '../../utilities/backend-talk';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'

function Navbar() {
	const s = useStates('main');
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle("responsive_nav");
	};

	async function handleLogout() {
        if (!localStorage.user) return Swal.fire({ title: 'Inte inloggad', text: 'Du är inte inloggad, logga in först', icon: 'error', confirmButtonText: 'Bekräfta' });
        const res = await del('/api/user/login');

        if (res.response === 'Not logged in!') return Swal.fire({ title: 'Inte inloggad', text: 'Du är inte inloggad just nu', icon: 'error', confirmButtonText: 'Bekräfta' });

        localStorage.removeItem('jwtToken');
        localStorage.removeItem('user');
		localStorage.removeItem('admin');
        if (res.response === 'logged out') return Swal.fire({ title: 'Utloggad', text: 'Du är nu utloggad', icon: 'success', confirmButtonText: 'Bekräfta' }).then(() => window.location.href = '/');
    }

	return (
		<header>
			<h2 className="header-home"><Link to="/">Filmvisarna</Link></h2>
			<nav ref={navRef}>

				{s.routes.map(({ menuLabel, path }) =>
					<Link to={path}>{menuLabel}</Link>
				)}

                {
					localStorage.user && localStorage.admin === '1' ? <Link className="pushLogin" to="/admin">Admin</Link> : null
				}
				{
					localStorage.user ? <Link className="pushLogin" onClick={handleLogout}>Logout</Link> : <Link className="pushLogin" to="/login">Login</Link>
				}

				{/* Loop through the menu and display menu items */}

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