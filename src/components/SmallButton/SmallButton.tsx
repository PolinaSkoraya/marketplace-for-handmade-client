import "./SmallButton.scss"
import React, {Component} from "react";

class SmallButton extends Component<{htmlFor: string, icon: any, style?}> {

    render() {
        return (
            <label htmlFor={this.props.htmlFor} className="button-label">
                <span style={this.props.style}>
                    {this.props.icon}
                </span>
            </label>
        )
    }
}

export  default SmallButton;