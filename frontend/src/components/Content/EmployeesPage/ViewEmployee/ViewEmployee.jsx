import React, { useEffect, useState } from "react";
import s from './ViewEmployee.module.css';
import back from "../../../../img/Back.svg";
import { NavLink } from "react-router-dom";

function ViewEmployee(props) {
    const [activeTab, setActiveTab] = useState("info");

    useEffect(() => {
        if (props.employeeId) {
            props.fetchCurrnetEmployee(props.employeeId);
        }
    }, [props.employeeId, props.fetchCurrnetEmployee]);

    const renderContent = () => {
        switch (activeTab) {
            case "info":
                return (
                    <div className={s.employeeInfo}>
                        <p className={s.employeeInfoTitle}>Основная информация</p>
                        <div className={s.nameSurnameBlock}>
                            <div className={s.employeeName}>
                                <p className={s.miniTitle}>Имя</p>
                                <p className={s.employeeNameProps}>{props.employee?.user?.name || "У сотрудника нет имени"}</p>
                            </div>
                            <div className={s.employeeSurname}>
                                <p className={s.miniTitle}>Фамилия</p>
                                <p className={s.employeeSurnameProps}>{props.employee?.user?.surname || "У сотрудника нет фамилии"}</p>
                            </div>
                        </div>
                        <div className={s.employeeEmail}>
                            <p className={s.miniTitle}>Почта</p>
                            <p className={s.employeeEmailProps}>{props.employee?.user?.email || "У сотрудника нет почты"}</p>
                        </div>
                        <div className={s.employeePost}>
                            <p className={s.miniTitle}>Должность</p>
                            <p className={s.employeePostProps}>{props.employee?.user?.post || "У сотрудника нет должности"}</p>
                        </div>
                    </div>
                );
            case "team":
                return (
                    <div className={s.teamInfo}>
                        <p className={s.teamInfoTitle}>Команда</p>
                        <div className={s.employeeChief}>
                            <p className={s.miniTitle}>Начальник</p>
                            <p className={s.employeeChiefProps}>
                                {props.employee?.chief
                                    ? `${props.employee.chief.surname} ${props.employee.chief.name}`
                                    : "Начальник не назначен"}
                            </p>
                        </div>
                        <div className={s.employeeSubordinates}>
                            <p className={s.miniTitle}>Подчинённые</p>
                            {props.employee?.subordinates?.length > 0 ? (
                                <ul className={s.employeeSubordinatesProps}>
                                    {props.employee.subordinates.map((subordinate, index) => (
                                        <li key={index} className={s.subordinateItem}>
                                            {subordinate.surname} {subordinate.name}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className={s.noSubordinates}>Подчинённые не назначены</p>
                            )}
                        </div>
                    </div>
                );
            case "review":
                return (
                    <div className={s.reviewInfo}>
                        <p className={s.reviewInfoTitle}>Просмотреть оценку</p>
                        <p>Информация об оценке сотрудника.</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className={s.viewEmployee}>
            <div className={s.back}>
                <img src={back} alt="Back" />
                <NavLink to="/employees" className={({ isActive }) => (isActive ? s.active : undefined)}>НАЗАД</NavLink>
            </div>
            <p className={s.title}>Сотрудник {props.employee?.user?.name || "Имя"}</p>

            <div className={s.content}>
                <div className={s.navigation}>
                    <p onClick={() => setActiveTab("info")}>Основная информация</p>
                    <p onClick={() => setActiveTab("team")}>Команда</p>
                    <p onClick={() => setActiveTab("review")}>Просмотреть оценку</p>
                </div>
                {renderContent()}
            </div>
        </div>
    );
}

export default ViewEmployee;
