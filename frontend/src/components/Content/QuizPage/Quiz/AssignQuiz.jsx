import React from "react";
import s from './AssignQuiz.module.css';
import { NavLink } from "react-router-dom";
import { formatDate } from "../../../../redux/quizReducer";

function AssignQuiz(props) {
  return (
    <div className={s.quiz}>
      <p className={s.date}>{formatDate(props.quiz.createdAt)}</p>
      <p className={s.title}>{props.quiz.name || "Без названия"}</p>
      <p className={s.description}>{props.quiz.description || "Описание отсутствует"}</p>
      <ul className={s.action}>
        <li className={s.item}>
          <NavLink to={`/quizAs/${props.quiz.id}`} className={({ isActive }) => isActive ? s.active : undefined}>ПОСМОТРЕТЬ</NavLink>
        </li>
      </ul>
    </div>
  )
}

export default AssignQuiz;