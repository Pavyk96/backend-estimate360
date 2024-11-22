import React from "react";
import s from './Person.module.css';

function Person(props) {
  return (
    <div className={s.person}>
      <div className={s.avatar}>
      </div>
      <div className={s.info}>
        <p className={s.name}>Имя Фамилия</p>
        <p className={s.post}>Должность</p>
      </div>
    </div>
  )
}

export default Person;