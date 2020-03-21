import "./MessageError.scss";
import React, {Component} from "react";
import {TiWarningOutline} from "react-icons/ti";
import {IconContext} from "react-icons";
import {observer} from "mobx-react";

@observer
class MessageError extends Component<{message: string, show: boolean}> {

    render () {
        console.log("masfhrofhrofjerij");

        return (
            <div className={this.props.show ? "message-error" : "message-error-none"}>
                <div className="message-error__icon">
                    <IconContext.Provider value={{ className: 'warning-icon' }}>
                        <TiWarningOutline/>
                    </IconContext.Provider>
                </div>

                <div className="message-error__message">
                    Error: Incorrect email or password.
                </div>
            </div>
        )
    }
}

export default MessageError;

