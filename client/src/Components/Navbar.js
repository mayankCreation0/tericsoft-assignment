import React, { useContext, useState } from "react";
import { ReactComponent as CloseMenu } from "../Assets/x.svg";
import { ReactComponent as MenuIcon } from "../Assets/menu.svg";
import { ReactComponent as Logo } from "../Assets/logo.svg";
import "../Styles/Navbar.css";
import { Link } from "react-router-dom";
import { context } from "../Context/Context";

const Navbar = () => {
    const { falseAuthState } = useContext(context)
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    function refreshPage() {
        falseAuthState();
    }
    const closeMobileMenu = () => setClick(false);
    return (
        <div className="header">
            <div className="logo-nav">
                <div className="logo-container">
                    <Link to="/home">
                        <Logo className="logo" />
                    </Link>
                </div>
                <ul className={click ? "nav-options active" : "nav-options"}>
                    <li className="option" onClick={closeMobileMenu}>
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li className="option" onClick={closeMobileMenu}>
                        <Link to="/history">History</Link>
                    </li>
                    <li className="option mobile-option" onClick={closeMobileMenu}>
                        <Link to="" className="sign-up">
                            <button onClick={refreshPage}>Logout</button>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="mobile-menu" onClick={handleClick}>
                {click ? (
                    <CloseMenu className="menu-icon" />
                ) : (
                    <MenuIcon className="menu-icon" />
                )}
            </div>
            <ul className="signin-up">
                <li className="sign-in" onClick={closeMobileMenu}>
                    <Link to="#">
                        <img
                            src="https://png.pngtree.com/png-clipart/20221207/ourmid/pngtree-business-man-avatar-png-image_6514640.png"
                            alt="img"
                            style={{ width: "50px", borderRadius: "50%", backgroundColor: 'lightcoral' }}
                        />
                    </Link>
                </li>
                <li onClick={closeMobileMenu}>
                    <Link to="" className="signup-btn">
                        <button onClick={refreshPage}>Logout</button>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Navbar;