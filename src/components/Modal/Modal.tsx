import './Modal.scss'
import React, {Component} from "react";
import {observer} from "mobx-react";
import {observable} from "mobx";

import {FaPen, FaTrash} from "react-icons/fa";
import {IconContext} from "react-icons"
import SmallButton from "../SmallButton/SmallButton";

@observer
class Modal extends Component<{goodName?: string}> {
    render() {
        return (
            <div className="container">
                <input id={this.props.goodName} className="modal" type="checkbox"/>
                <SmallButton htmlFor={this.props.goodName as string} icon={<FaPen/>}/>

                <label className="modal-background" htmlFor={this.props.goodName}/>

                <div className="modal-content">
                    <label className="modal-close" htmlFor={this.props.goodName}>&#10005;</label>
                    <h2>Modal</h2>
                    <p>
                        Pellentesque habitant morbi
                    </p>
                    <p>
                        {this.props.goodName}
                    </p>
                    {this.props.children}
                    <label className="modal-content-button" htmlFor={this.props.goodName}>OK</label>
                </div>
            </div>
        )
    }
}

export default Modal;