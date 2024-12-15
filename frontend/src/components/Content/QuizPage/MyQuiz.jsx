import React, { useEffect, useState } from "react";
import s from './MyQuiz.module.css';
import add from '../../../img/Add.svg';
import AssignQuiz from "./Quiz/AssignQuiz";
import NAssignQuiz from "./Quiz/NAssignQuiz";
import { NavLink } from "react-router-dom";

function MyQuiz(props) {
  const [isTokenFetched, setIsTokenFetched] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    // Проверка уникальности обработанного кода
    if (code) {
      const processedCode = localStorage.getItem('processedCode');
      if (processedCode !== code) {
        props.fetchToken(code)
          .then(() => {
            localStorage.setItem('processedCode', code); // Сохраняем обработанный код
            setIsTokenFetched(true); // Устанавливаем флаг успешной обработки
          })
          .catch((error) => {
            console.error("Ошибка при обработке токена:", error);
            setIsTokenFetched(true); // Даже при ошибке устанавливаем флаг
          });
      } else {
        setIsTokenFetched(true); // Если код уже обработан, просто разрешаем выполнение fetchQuiz
      }
    } else {
      setIsTokenFetched(true); // Если кода нет, разрешаем выполнение fetchQuiz
    }
  }, [props.fetchToken]);

  useEffect(() => {
    if (isTokenFetched) {
      props.fetchQuiz(); // Вызываем fetchQuiz только после обработки токена
    }
  }, [isTokenFetched, props.fetchQuiz]);

  const assignedQuizzes = Object.values(props.quizzes).filter((quiz) => quiz.assigned);
  const notAssignedQuizzes = Object.values(props.quizzes).filter((quiz) => !quiz.assigned);

  return (
    <div className={s.myQuiz}>
      <p className={s.title}>Оценки</p>
      <div className={s.add}>
        <div>
          <p>Создать оценку</p>
          <div >
            <NavLink to="/quiz/add" className={({ isActive }) => isActive ? s.active : undefined}><img src={add} alt="Add Quiz"></img></NavLink>
          </div>
        </div>
      </div>
      <p className={s.notAssignQuizTitle}>Не назначенные оценки</p>
      <div className={s.notAssignQuiz}>
        {notAssignedQuizzes.map((quiz) => (
          <NAssignQuiz key={quiz.id} quiz={quiz} />
        ))}
      </div>
      <p className={s.assignQuizTitle}>Назначенные оценки</p>
      <div className={s.assignQuiz}>
        {assignedQuizzes.map((quiz) => (
          <AssignQuiz key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </div>
  )
}

export default MyQuiz;