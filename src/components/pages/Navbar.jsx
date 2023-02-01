import React from 'react';
import { Link } from "react-router-dom";
import '../../css/style-navbar.css';

export default function Navbar() {
  return (
    <div className='nav-manu'>
      <h1 id="h2title"><u className="trans">FilmVisarna</u></h1>
      <ul id="main-nav">
    <li>
      <Link to="/">Home</Link>
      </li>
      <li>
      <Link to="/OmOss">OmOss</Link>
      </li>
    <li>
      <Link to="/Butik">Butik</Link>
    </li>
    <li>
      <Link to="/MovieDetails">MovieDetails</Link>
    </li>
       <li>
      <Link to="/Spelschema">Spelschema</Link>
        </li>
        </ul>
  </div>
  );
}
