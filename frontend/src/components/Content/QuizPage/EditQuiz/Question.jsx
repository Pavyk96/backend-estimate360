import React from "react";
import s from './Question.module.css';


function Question(props) {
  const handleInput = (e) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const updateQuestionBody = (e) => {
    props.updateQuestionBody(props.questionNumber, e.target.value);
  };

  const handleSave = () => {
    if (props.saveQuestion) {
      props.saveQuestion(props.questionNumber, props.questionBody); 
    } else {
      console.warn("Функция saveQuestion не передана в props");
    }
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
        <div className={s.saveQuestionChange} onClick={handleSave}>
          <button>Сохранить</button>
        </div>
      </div>
    </div>
  )
}

export default Question;