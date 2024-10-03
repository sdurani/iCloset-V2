import NavBar from "./NavBar.jsx";
import React from 'react';


function Header(){
    return (
        <header className="header">
            <h1>iCloset</h1>
            <nav className="nav">
            <NavBar />
            </nav>
        </header>
    )
}

export default Header;