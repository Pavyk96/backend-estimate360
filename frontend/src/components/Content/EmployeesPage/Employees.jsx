import React, { useEffect, useState } from "react";
import s from './Employees.module.css';
import search from "../../../img/Search.svg";
import Employee from "./Employee";

function Employees(props) {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    props.fetchAllEmployees();
  }, [props.fetchAllEmployees]);

  const filteredEmployees = Object.values(props.employees).filter(employee => {
    const fullName = `${employee.name} ${employee.surname}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  let employees = filteredEmployees.map(employee => (
    <Employee
      key={employee.id}
      employeeId={employee.id}
      employeeName={employee.name}
      employeeSurname={employee.surname}
      employeeEmail={employee.email}
      employeePost={employee.post}
    />
  ));

  return (
    <div className={s.employees}>
      <p className={s.title}>Сотрудники</p>
      <div className={s.employeesBox}>
        <div className={s.searchBox}>
          <img src={search}></img>
          <div className={s.searchInput}>
            <textarea
              placeholder="Поиск сотрудника"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div>
          {employees.length > 0 ? employees : <p>Сотрудники не найдены</p>}
        </div>
      </div>
    </div>
  )
}

export default Employees;