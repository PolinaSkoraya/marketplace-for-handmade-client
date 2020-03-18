import './Modal.scss'
import React, {Component} from "react";
import {observer} from "mobx-react";

@observer
class Modal extends Component<{goodName?: string, show, handleClose}> {
    render() {
        return (
            <div className={this.props.show ? 'modal display-block' : 'modal display-none'}>
                <section className='modal-main'>
                    {this.props.children}
                    <button
                        onClick={this.props.handleClose}
                    >
                        Close
                    </button>
                </section>
            </div>
        )
    }
}

export default Modal;
