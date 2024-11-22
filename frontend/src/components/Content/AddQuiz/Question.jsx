import React from "react";
import s from './Question.module.css';


function Question(props) {
  const handleInput = (e) => {
    const textarea = e.target;
    textarea.style.height = ' ';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const updateQuestionBody = (e) => {
    props.updateQuestionBody(e.target.value);
  };

  return (
    <div>
      <div className={s.questionBox}>
        <div className={s.questionNumber}>
          <p>Вопрос {props.questionNumber}</p>
        </div>
        <div className={s.questionBody}>
          <textarea onInput={handleInput} onChange={updateQuestionBody} value={props.questionBody} placeholder="Введите ваш вопрос" />
        </div>
      </div>
    </div>
  )
}

export default Question;