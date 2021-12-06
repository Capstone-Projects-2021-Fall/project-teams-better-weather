import React from "react";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SideBarData = [
  {
    title: "",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "",
    path: "/about",
    icon: <AiIcons.AiFillInfoCircle />,
    cName: "nav-text",
  },
  {
    title: "",
    path: "/settings",
    icon: <IoIcons.IoMdSettings />,
    cName: "nav-text",
  },
];

/**
 * {
        title: 'Sign Up',
        path: '/sign-up',
        icon: <IoIcons.IoMdPersonAdd />,
        cName: 'nav-text'
    },
    {
        title: 'Sign In',
        path: '/sign-in',
        cName: 'sign-in-btn'
    }
 */
