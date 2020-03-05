import './Modal.scss'
import React, {Component} from "react";
import {observer} from "mobx-react";

@observer
class Modal extends Component {

    render() {
        return (
            <div className="container">
                <input id="modal" type="checkbox"/>
                <label className="modal-button" htmlFor="modal">
                    <span>Click</span>
                </label>

                <label className="modal-background" htmlFor="modal"/>

                <div className="modal-content">
                    <label className="modal-close" htmlFor="modal">&#10005;</label>
                    <h2>Sweet Modal</h2>
                    <p>
                        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac
                        turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget
                    </p>
                    {this.props.children}
                    <label className="modal-content-button" htmlFor="modal">OK</label>
                </div>
            </div>
        )
    }
}

export default Modal;