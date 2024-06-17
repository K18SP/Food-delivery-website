import React, { useContext, useState } from 'react';
import './Navbar.css';   
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

export const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("home");
    const navigate = useNavigate();

    const { getTotalCartAmount,token,setToken } = useContext(StoreContext);

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        navigate('/');
    }

    const handleAboutClick = () => {
        setMenu("about"); // Set active menu item state
        navigate('/about'); // Navigate to the "/about" page
    };

    const handleMenuClick = () => {
        setMenu("menu"); // Set active menu item state
        // Scroll to the Explore Menu section
        const exploreMenuSection = document.getElementById('explore-menu');
        if (exploreMenuSection) {
            exploreMenuSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleContactClick = () => {
        setMenu("contact"); // Set active menu item state
        // Scroll to the footer section
        const footerSection = document.getElementById('footer');
        if (footerSection) {
            footerSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className='navbar'>
            <Link to='/'> <img src={assets.logo_img} alt="Logo" className="logo" /> </Link>
            <ul className="navbar-menu">
                <Link to='/'><li onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</li> </Link>
                <li onClick={handleMenuClick} className={menu === "menu" ? "active" : ""}>Menu</li>
                <li onClick={handleAboutClick} className={menu === "about" ? "active" : ""}>About</li>  
                <li onClick={handleContactClick} className={menu === "contact" ? "active" : ""}>Contact-Us</li>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} className="searchImage" alt="Search" />
                <div className="navbar-search-icon">
                    <Link to='/cart'><img src={assets.basket_icon} alt="Basket" /> </Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>
                {!token?<button onClick={() => setShowLogin(true)}>SIGN IN</button>
                :<div className='navbar-profile'>
                    <img src={assets.profile_icon} alt="" />
                    <ul className='nav-profile-dropdown'>
                        <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                        <hr />
                        <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                    </ul>                    
                </div>}

            </div>
        </div>
    );
}

export default Navbar;
