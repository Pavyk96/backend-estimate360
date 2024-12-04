import React from "react";
import s from './Employee.module.css';
import back from "../../../img/Back.svg";
import { NavLink } from "react-router-dom";

function Employee(props) {
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
            <NavLink to="/quiz" className={s.go}>
                <img src={back}></img>
            </NavLink>
        </div>
    )
}

export default Employee;