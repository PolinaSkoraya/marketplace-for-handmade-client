import React from "react";

import style from "./style.module.scss";

const Spinner = () => (
  <div className={style.container}>
    <div className={style.spinner}>
      <div className={style.circle}>
        <span className={style.line}/>
        <span className={style.line}/>
        <span className={style.line}/>
        <span className={style.line}/>
      </div>
    </div>
  </div>
);

export default Spinner;
