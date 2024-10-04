import NavBar from "./NavBar.jsx";
import React from 'react';
import { Link } from "react-router-dom";


function Header(){
    return (
        <header className="header">
            <h1><Link to={`/`} style={{ textDecoration: 'none', color: 'black', cursor: 'pointer' }}>iCloset</Link></h1>
            <nav className="nav">
            <NavBar />
            </nav>
        </header>
    )
}

export default Header;