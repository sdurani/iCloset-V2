import { NavLink } from "react-router-dom";


function NavBar() {
    return (
        <nav className="navbar">
            <ul className="nav-tabs">
                <li><NavLink to="/">Add to Closet</NavLink></li>
                <li><NavLink to="/my_closet">My Closet</NavLink></li>
                <li><NavLink to="/outfit_maker">Outfit Maker</NavLink></li>
            </ul>
        </nav>
    );
}

export default NavBar;