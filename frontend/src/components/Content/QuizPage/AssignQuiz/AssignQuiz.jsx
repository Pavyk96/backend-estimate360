import React from "react";
import s from './AssignQuiz.module.css';
import back from "../../../../img/Back.svg";
import search from "../../../../img/Search.svg";
import { NavLink, useNavigate } from "react-router-dom";
import AssignQuizEmployee from "./AssignQuizEmployee";

function AssignQuiz(props) {
  const navigate = useNavigate();

  let assignQuiz = (e) => {
    e.preventDefault(); 
    props.onAssignQuiz(props.quiz.id);
    navigate("/quiz");
  }

  let assignQuizToAll = (e) => {
    e.preventDefault(); 
    props.onAssignQuiz(props.quiz.id);
    navigate("/quiz");
  }

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
            <button onClick={assignQuiz}>Назначить выбранным</button>
          </div>
          <div className={s.assignAll}>
            <button onClick={assignQuizToAll}>Назначить оценку всем</button>
          </div>
        </div>
      </div>
      <div className={s.employeesBox}>
        <div className={s.searchBox}>
          <img src={search}></img>
          <div className={s.searchInput}>
            <textarea placeholder="Поиск сотрудника" />
          </div>
        </div>
        <div>
          <AssignQuizEmployee />
          <AssignQuizEmployee />
          <AssignQuizEmployee />
          <AssignQuizEmployee />
          <AssignQuizEmployee />
          <AssignQuizEmployee />
          <AssignQuizEmployee />
          <AssignQuizEmployee /> 
        </div>
      </div>
    </div>
  )
}

export default AssignQuiz;