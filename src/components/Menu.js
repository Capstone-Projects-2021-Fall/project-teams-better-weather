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
 * @params props
 * @returns {JSX.Element} JSX render of Menu
 */
export default function Menu(props) {
  const { user, onLogout } = props;
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
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
            <LoginLinks
              user={user} 
              onLogout={onLogout}
            />
            {LoginLinks}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}
