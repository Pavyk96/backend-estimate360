import React from "react";
import s from './Employee.module.css';
import back from "../../../img/Back.svg";
import { NavLink } from "react-router-dom";

function Employee(props) {
    return (
        <div className={s.assignQuizEmployee}>
            <div className={s.employeeInfoBox}>
                <div className={s.nameBox}>
                    <p>{props.employeeName || "Имя"}</p>
                    <p>{props.employeeSurname || "Фамилия"}</p>
                </div>
                <p className={s.position}>{props.employeePost || "Должность"}</p>
            </div>
            <NavLink to="/quiz" className={s.go}>
                <img src={back}></img>
            </NavLink>
        </div>
    )
}

export default Employee;