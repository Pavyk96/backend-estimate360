import React, { useEffect } from 'react';
import back from "../../../../img/Back.svg";
import s from './QuizDetails.module.css';
import { NavLink, useNavigate } from "react-router-dom";

function QuizDetails(props) {
    const navigate = useNavigate();

    useEffect(() => {
        if (props.quizId) {
            props.fetchQuiz(props.quizId);
        }
    }, [props.quizId, props.fetchQuiz]);

    let editQuiz = () => {
        props.loadQuiz(props.quiz.id);
        navigate("/quiz/edit");
    }

    let assignQuiz = () => {
        navigate(`/assignQuiz/${props.quiz.id}`);
    }
    return (

        <div className={s.quizDetails}>
            <div className={s.back}>
                <img src={back}></img>
                <NavLink to="/quiz" className={({ isActive }) => isActive ? s.active : undefined}>НАЗАД</NavLink>
            </div>
            <p className={s.title}>Просмотр оценки</p>
            <div className={s.buttonBox}>
                <div className={s.edit}>
                    <button onClick={editQuiz}>Редкатировать оценку</button>
                </div>
                <div className={s.assign}>
                    <button onClick={assignQuiz}>Назначить оценку</button>
                </div>
            </div>
            <div className={s.quizTitleBox}>
                <p className={s.quizName}>{props.quiz.name || "Без названия"}</p>
                <p className={s.quizDescription}>{props.quiz.description || "Описание отсутствует"}</p>
            </div>
            <div className={s.questionBox}>
                <div className={s.questionBoxHeader}>
                    <p className={s.assertion}>Утверждение</p>
                    <div className={s.answers}>
                        {Array.isArray(props.quiz.answers) && props.quiz.answers.length > 0
                            ? props.quiz.answers.map(answer => (
                                <p className={s.answerItem} key={answer}>{answer}</p>
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