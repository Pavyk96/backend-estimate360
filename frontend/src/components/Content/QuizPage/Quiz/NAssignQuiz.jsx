import React from "react";
import s from './NAssignQuiz.module.css';
import { NavLink} from "react-router-dom";

function NAssignQuiz(props) {
  return (
    <div className={s.quiz}>
      <p className={s.date}>{props.quiz.date || "Дата не указана"}</p>
      <p className={s.title}>{props.quiz.title || "Без названия"}</p>
      <p className={s.description}>{props.quiz.description || "Описание отсутствует"}</p>
      <div className={s.action}>
        <ul>
          <li className={s.item}>
            <NavLink to={`/assignQuiz/${props.quiz.id}`}>НАЗНАЧИТЬ</NavLink>
          </li>
          <li className={s.item}>
            <NavLink to={`/quiz/${props.quiz.id}`} className={({ isActive }) => isActive ? s.active : undefined}>ПОСМОТРЕТЬ</NavLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default NAssignQuiz;