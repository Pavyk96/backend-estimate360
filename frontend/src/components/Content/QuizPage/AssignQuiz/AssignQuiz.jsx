import React, { useEffect, useState } from "react";
import s from './AssignQuiz.module.css';
import back from "../../../../img/Back.svg";
import search from "../../../../img/Search.svg";
import { NavLink, useNavigate } from "react-router-dom";
import AssignQuizEmployee from "./AssignQuizEmployee";

function AssignQuiz(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    props.fetchAllEmployees();
  }, [props.fetchAllEmployees]);

  const filteredEmployees = Object.values(props.employees).filter(employee => {
    const fullName = `${employee.surname} ${employee.name}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  const handleAssignSelected = (e) => {
    e.preventDefault();
    props.submitSelectedUsers(props.quiz.id, props.selectedUsers);
    navigate("/quiz");
  };

  const handleAssignAll = (e) => {
    e.preventDefault();
    props.submitAllUsers(props.quiz.id);
    navigate("/quiz");
  };

  const handleCheckboxChange = (userId, isChecked) => {
    if (isChecked) {
      props.addUserToSelected(userId);
    } else {
      props.removeUserFromSelected(userId);
    }
  };

  let employees = filteredEmployees.map(employee => (
    <AssignQuizEmployee
      key={employee.id}
      employeeId={employee.id}
      employeeName={employee.name}
      employeeSurname={employee.surname}
      employeeEmail={employee.email}
      employeePost={employee.post}
      isSelected={props.selectedUsers.includes(employee.id)}
      onCheckboxChange={handleCheckboxChange}
    />
  ));

  // let assignQuiz = (e) => {
  //   e.preventDefault();
  //   props.onAssignQuiz(props.quiz.id);
  //   navigate("/quiz");
  // }

  // let assignQuizToAll = (e) => {
  //   e.preventDefault();
  //   props.onAssignQuiz(props.quiz.id);
  //   navigate("/quiz");
  // }

  return (
    <div className={s.assignQuiz}>
      <div className={s.back}>
        <img src={back}></img>
        <NavLink to="/quiz" className={({ isActive }) => isActive ? s.active : undefined}>НАЗАД</NavLink>
      </div>
      <p className={s.title}>Назанчить оценку</p>
      <div className={s.assignHeader}>
        <p>Сотрудники</p>
        <div className={s.buttonBox}>
          <div className={s.assign}>
            <button onClick={handleAssignSelected}>Назначить выбранным</button>
          </div>
          <div className={s.assignAll}>
            <button onClick={handleAssignAll}>Назначить оценку всем</button>
          </div>
        </div>
      </div>
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

export default AssignQuiz;