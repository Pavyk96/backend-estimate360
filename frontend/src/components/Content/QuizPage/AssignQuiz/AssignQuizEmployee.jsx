import React from "react";
import s from './AssignQuizEmployee.module.css';

function AssignQuizEmployee(props) {
    return (
        <div className={s.assignQuizEmployee}>
            <div className={s.employeeInfoBox}>
                <div className={s.nameBox}>
                    <p>{"Имя" || "Имя"}</p>
                    <p>{"Фамилия" || "Фамилия"}</p>
                    <p>{"Отчество" || "Отчество"}</p>
                </div>
                <p className={s.position}>{"Должность" || "Должность"}</p>
            </div>
            <label className={s.questionLabel}>
                <input
                    type="radio"
                />
            </label>
        </div>
    )
}

export default AssignQuizEmployee;