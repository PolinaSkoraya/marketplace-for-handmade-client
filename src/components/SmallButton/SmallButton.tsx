import "./SmallButton.scss"
import React, {Component} from "react";

class SmallButton extends Component<{htmlFor: string, icon: any}>{

    render() {
        return (
            <label htmlFor={this.props.htmlFor} className="button-label">
                <span>
                    {this.props.icon}
                </span>
            </label>
        )
    }
}

export  default SmallButton;