import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Подключаем useSelector
import s from './QuizDetails.module.css';

function QuizDetails({ quiz }) {
    const { quizId } = useParams();

    // Получаем answers из состояния через useSelector
    const answers = useSelector(state => state.currentQuiz?.questions?.[0]?.answer || []);

    if (!quiz || !quiz.questions) {
        return <p>Анкета не найдена или не содержит вопросов.</p>;
    }

    return (
        <div className={s.quizDetails}>
            <h1 className={s.quizTitle}>{quiz.title}</h1>
            <p className={s.quizDescription}>{quiz.description}</p>

            <div className={s.answersHeader}>Вопросы и ответы</div>

            {/* Строка с вариантами ответов, которая будет общей для всех вопросов */}
            <div className={s.answersHeaderRow}>
                {answers.map((ans, i) => (
                    <span key={i} className={s.answerHeader}>
                        {ans}
                    </span>
                ))}
            </div>

            <div className={s.questionsContainer}>
                {quiz.questions.map((question, index) => (
                    <React.Fragment key={question.id}>
                        <div className={s.questionRow}>
                            <span>{index + 1}. {question.question}</span>
                        </div>
                        <div className={s.answersContainer}>
                            {question.answer.map((ans, i) => (
                                <label key={i}>
                                    <input
                                        type="checkbox"
                                        className={s.answerCheckbox}
                                        value={ans}
                                        name={`question-${question.id}`}
                                    />
                                    {ans}
                                </label>
                            ))}
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

export default QuizDetails;