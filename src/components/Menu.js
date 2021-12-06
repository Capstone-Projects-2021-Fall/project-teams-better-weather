import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import { IconContext } from "react-icons";
import { SideBarData } from "./SidebarData";
import LoginLinks from "./LoginLinks";
import "../style/Menu.css";


/**
 * Function that renders the sidebar Menu
 * @component
 * @param {bool} user - Boolean of if a user is signed in
 * @param {function} onLogout - Handles user logout
 * @returns {JSX.Element} JSX render of Menu
 */
export default function Menu({ user, onLogout }) {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <div className='bottom-navbar'>
      <IconContext.Provider value={{ color: "#fff" }}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            {SideBarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            
          </ul>
          <LoginLinks
              user={user} 
              onLogout={onLogout}
            />
      </IconContext.Provider>
    </div>
  );
}

/* KEEP UNTIL LATER
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
*/
