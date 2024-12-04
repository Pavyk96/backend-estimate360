import React from "react";
import s from './Employees.module.css';
import search from "../../../img/Search.svg";
import Employee from "./Employee";

function Employees(props) {
  return (
    <div className={s.employees}>
      <p className={s.title}>Сотрудники</p>
      <div className={s.employeesBox}>
        <div className={s.searchBox}>
          <img src={search}></img>
          <div className={s.searchInput}>
            <textarea placeholder="Поиск сотрудника" />
          </div>
        </div>
        <div>
          <Employee />
          <Employee />
          <Employee />
          <Employee />
          <Employee />
          <Employee />
          <Employee />
          <Employee />
        </div>
      </div>
    </div>
  )
}

export default Employees;