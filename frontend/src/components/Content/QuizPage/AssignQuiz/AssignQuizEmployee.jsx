import React from "react";
import s from './AssignQuizEmployee.module.css';

function AssignQuizEmployee(props) {
    const handleChange = (e) => {
        props.onCheckboxChange(props.employeeId, e.target.checked);
    };

    return (
        <div className={s.assignQuizEmployee}>
            <div className={s.employeeInfoBox}>
                <div className={s.nameBox}>
                    <p>{props.employeeName || "Имя"}</p>
                    <p>{props.employeeSurname || "Фамилия"}</p>
                </div>
                <p className={s.position}>{props.employeePost || "Должность"}</p>
            </div>
            <label className={s.questionLabel}>
                <input
                    className={s.roundCheckbox}
                    type="checkbox"
                    checked={props.isSelected}
                    onChange={handleChange}
                />
            </label>
        </div>
    )
}

export default AssignQuizEmployee;