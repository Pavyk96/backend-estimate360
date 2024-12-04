import React from "react";
import logo from "../../img/Logo.svg";
import s from './Header.module.css';
import Navigation from "./Navigation/Navigation";
import Person from "./Person/Person";

function Header(props) {
  return (
    <header className={s.header}>
      <img src={logo}></img>
      <Navigation />
      <Person />
    </header>
  )
}

export default Header;