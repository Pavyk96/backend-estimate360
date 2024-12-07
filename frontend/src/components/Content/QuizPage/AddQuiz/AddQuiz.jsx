import React, { useEffect } from "react";
import s from './AddQuiz.module.css';
import { NavLink, useNavigate } from "react-router-dom";
import back from "../../../../img/Back.svg";
import add from "../../../../img/Add.svg";
import Question from "./Question";

function AddQuiz(props) {
  const navigate = useNavigate();

  useEffect(() => {
    if (props.quizId) {
      props.fetchQuiz(props.quizId); 
    }
  }, [props.quizId, props.fetchQuiz]);


  const handleInput = (e) => {
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  let questions = Object.values(props.questions).map(question => (
    <Question
      questionNumber={question.id}
      questionBody={question.question}
      updateQuestionBody={(id, newText) => props.updateQuestionBody(id, newText)}
      saveQuestion={(id, newText) => props.updateQuestionOnServer(id, newText)}
    />
  ));


  let newQuestionText = props.newQuestionText;
  let quizTitle = props.quizTitle;
  let quizDecription = props.quizDecription;

  let addQuestion = () => {
    props.addQuestion(props.quizId, newQuestionText);
  }

  let updateQuestionText = (e) => {
    let text = e.target.value;
    props.updateQuestionText(text);
  }

  let updateQuizTitle = (e) => {
    let text = e.target.value;
    props.updateQuizTitle(text);
  }

  let updateQuizDescription = (e) => {
    let text = e.target.value;
    props.updateQuizDescription(text);
  }

  let finishQuizCreation = () => {
    props.completeQuizCreation();
    navigate("/quiz");
  }

  let saveQuizData = () => {
    const quiz = {
      name: quizTitle,
      description: quizDecription,
      questions: props.questions,
    };
    props.saveQuizOnServer(quiz);
  }


  return (
    <div className={s.addQuiz}>
      <div className={s.back}>
        <img src={back}></img>
        <NavLink to="/quiz" className={({ isActive }) => isActive ? s.active : undefined}>НАЗАД</NavLink>
      </div>
      <p className={s.title}>Создание анкеты</p>
      <div className={s.finish} onClick={finishQuizCreation}>
        <button >Завершить создание анкеты</button>
      </div>
      <div className={s.quizTitleBox}>
        <div className={s.quizName}>
          <textarea onInput={handleInput} onChange={updateQuizTitle} value={quizTitle} placeholder="Новая анкета" />
        </div>
        <div className={s.quizDescription}>
          <textarea onInput={handleInput} onChange={updateQuizDescription} value={quizDecription} placeholder="Описание" />
        </div>
        <div className={s.saveQuizData} onClick={saveQuizData}>
          <button>Сохранить</button>
        </div>
      </div>
      <div>
        {questions}
      </div>
      <div className={s.newQuestion}>
        <div className={s.newQuestionBody}>
          <textarea onInput={handleInput} onChange={updateQuestionText} value={newQuestionText} placeholder="Введите вопрос" />
        </div>
        <div className={s.addNewQuestion}>
          <button onClick={addQuestion}><img src={add}></img></button>
        </div>
      </div>
    </div>
  )
}

export default AddQuiz;