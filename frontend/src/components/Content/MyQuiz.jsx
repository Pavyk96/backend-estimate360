import React from "react";
import s from './MyQuiz.module.css';
import add from './Add.svg';
import AssignQuiz from "./Quiz/AssignQuiz";
import NAssignQuiz from "./Quiz/NAssignQuiz";
import { NavLink } from "react-router-dom";

function MyQuiz(props) {
  const assignedQuizzes = Object.values(props.quizzes).filter((quiz) => quiz.assigned);
  const notAssignedQuizzes = Object.values(props.quizzes).filter((quiz) => !quiz.assigned);

  return (
    <div className={s.myQuiz}>
      <p className={s.title}>Анкеты</p>
      <div className={s.add}>
        <div>
          <p>Создать анкету</p>
          <div >
            <NavLink to="/quiz/add" className={({ isActive }) => isActive ? s.active : undefined}><img src={add} alt="Add Quiz"></img></NavLink>
          </div>
        </div>
      </div>
      <p className={s.notAssignQuizTitle}>Не назначенные анкеты</p>
      <div className={s.notAssignQuiz}>
        {notAssignedQuizzes.map((quiz) => (
          <NAssignQuiz key={quiz.id} quiz={quiz} onAssign={props.onAssignQuiz}/>
        ))}
      </div>
      <p className={s.assignQuizTitle}>Назначенные анкеты</p>
      <div className={s.assignQuiz}>
        {assignedQuizzes.map((quiz) => (
          <AssignQuiz key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </div>
  )
}

export default MyQuiz;