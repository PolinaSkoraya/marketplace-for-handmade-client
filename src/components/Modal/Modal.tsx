import style from './style.module.scss'
import React, {Component} from "react";
import {observer} from "mobx-react";
import Button from "../Button/Button";

interface Props {
    goodName?: string,
    handleClose: () => void,
    isShow: boolean
}

@observer
class Modal extends Component<Props> {
    render() {
        return (
            <div className={this.props.isShow ? `${style.modal} ${style.displayBlock}` : `${style.modal} ${style.displayNone}`}>
                <section className={style.modalMain}>
                    {this.props.children}
                    <Button
                        styleType="text"
                        id="btn"
                        onClick={this.props.handleClose}
                    >
                        Close
                    </Button>
                </section>
            </div>
        )
    }
}

export default Modal;
