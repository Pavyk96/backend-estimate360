import React from "react";
import s from './Navigation.module.css';
import { NavLink } from "react-router-dom";

function Navigation(props) {
  return (
    <nav className={s.navigation}>
      <ul>
        <li className={s.item}>
          <NavLink to="/quiz" className={({ isActive }) => isActive ? s.active : undefined}>Анкеты</NavLink>
        </li>
        <li className={s.item}>
          <NavLink to="/employees" className={({ isActive }) => isActive ? s.active : undefined}>Сотрудники</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation;