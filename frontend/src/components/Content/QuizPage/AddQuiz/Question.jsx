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

  const updateQuestionType = (e) => {
    props.updateQuestionType(props.questionNumber, e.target.value);
  };

  const handleSave = () => {
      props.saveQuestion(props.questionNumber, props.questionBody, props.questionSelectedType);
  };

  return (
    <div>
      <div className={s.questionBox}>
        <div className={s.questionNumber}>
          <p>Вопрос {props.questionNumber}</p>
        </div>
        <div className={s.questionBody}>
          <select value={props.questionSelectedType} onChange={updateQuestionType}>
            <option value="" disabled>Выберите тип вопроса</option>
            {props.questionTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
          <textarea onInput={handleInput} onChange={updateQuestionBody} value={props.questionBody} placeholder="Введите ваш вопрос" />
        </div>
        <div className={s.saveQuestionChange} onClick={handleSave}>
          <button>Сохранить изменения</button>
        </div>
      </div>
    </div>
  )
}

export default Question;