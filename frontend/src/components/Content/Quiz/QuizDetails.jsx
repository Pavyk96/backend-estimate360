import React from 'react';
import back from "../Back.svg";
import s from './QuizDetails.module.css';
import { NavLink, useNavigate } from "react-router-dom";

function QuizDetails(props) {
    const navigate = useNavigate();

    let editQuiz = () => {
        props.loadQuiz(props.quiz.id);
        navigate("/quiz/add");
    }

    let assignQuiz = () => {
        navigate("/quiz");
    }
    return (
        <div className={s.quizDetails}>
            <div className={s.back}>
                <img src={back}></img>
                <NavLink to="/quiz" className={({ isActive }) => isActive ? s.active : undefined}>НАЗАД</NavLink>
            </div>
            <p className={s.title}>Просмотр анкеты</p>
            <div className={s.buttonBox}>
                <div className={s.edit}>
                    <button onClick={editQuiz}>Редкатировать анкету</button>
                </div>
                <div className={s.assign}>
                    <button onClick={assignQuiz}>Назначить анкету</button>
                </div>
            </div>
            <div className={s.quizTitleBox}>
                <p className={s.quizName}>{props.quiz.title || "Без названия"}</p>
                <p className={s.quizDescription}>{props.quiz.description || "Описание отсутствует"}</p>
            </div>
            <div className={s.questionBox}>
                <div className={s.questionBoxHeader}>
                    <p className={s.assertion}>Утверждение</p>
                    <div className={s.answers}>
                        {props.quiz.answers && props.quiz.answers.length > 0
                            ? props.quiz.answers.map(answer => (
                                <p className={s.answerItem}>{answer}</p>
                            ))
                            : <p>Ответы отсутствуют</p>}
                    </div>
                </div>
                <div className={s.questionBoxBody}>
                    {props.quiz.questions.length > 0 ? (
                        props.quiz.questions.map((question) => (
                            <div className={s.questionItem}>
                                <p className={s.question}>{question.question}</p>
                                <div className={s.answerOptions}>
                                    {Array.from({ length: 6 }).map(() => (
                                        <label className={s.questionLabel}>
                                            <input
                                                type="radio"
                                                name={`question-${question.id}`}
                                            />
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Вопросы отсутствуют</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default QuizDetails;