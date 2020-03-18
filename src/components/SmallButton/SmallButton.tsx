import "./SmallButton.scss"
import React, {Component} from "react";
import { CSSTransition } from 'react-transition-group';
import {observer} from "mobx-react";
import {observable} from "mobx";

@observer
class SmallButton extends Component<{htmlFor: string, icon: any, style?, labelStyle?}> {
    render() {
        return (
                <label style={this.props.labelStyle} htmlFor={this.props.htmlFor} className="button-label">
                    <span  style={this.props.style}>
                        {this.props.icon}
                    </span>
                </label>
        )
    }
}

export  default SmallButton;