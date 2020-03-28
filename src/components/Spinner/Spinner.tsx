import React, { CSSProperties } from 'react';

import style from './style.module.scss';

interface Props {
    className?: string;
    style?: CSSProperties;
    fullscreen?: boolean;
}

const Spinner = (props: Props) => (
    <div className={style.container}>
        <div className={style.spinner}>
            <div className={style.circle}>
                <span className={style.line}></span>
                <span className={style.line}></span>
                <span className={style.line}></span>
                <span className={style.line}></span>
            </div>
        </div>
    </div>

);

export default Spinner;