import "./Pagination.scss";
import React, {Component} from "react";
import {action, observable} from "mobx";
import SmallButton from "../SmallButton/SmallButton";
import {observer} from "mobx-react";

import {FaArrowLeft, FaArrowRight} from "react-icons/fa";

@observer
class Pagination extends Component<{currentPage: number, numberOfPages: number, previousPage, nextPage, setPage }> {
    @observable.shallow array: number[] = [];

    componentDidMount(): void {
        this.createArray();
    }

    @action.bound
    createArray () {
        console.log(this.props.numberOfPages);
        let array = Array.from(Array(this.props.numberOfPages).keys());
        this.array = [0, 1];
        console.log(this.array);
    }

    // @action.bound
    // createArray () {
    //     for (let i = 0; i < this.props.numberOfPages; i++) {
    //         this.array.push(i);
    //     }
    //     console.log(this.array);
    // }

    render () {
        const buttonStyle = {
            fontSize: "16px",
            cursor: "pointer"
        };

        const currentButtonStyle = {
            fontSize: "16px",
            color: "#73c7ce",
            cursor: "pointer"
        };

        const labelStyles = {
          width: "30px",
          height: "30px"
        };

        const currentLabelStyle = {
            width: "30px",
            height: "30px",
            backgroundColor: "#e6e6e6"
        };

        return (
            <div className="pagination">

                <button id="buttonPagePrevious" className="buttonPage buttonPagePrevious" onClick={this.props.previousPage}>previous</button>
                <SmallButton labelStyle={labelStyles} htmlFor="buttonPagePrevious" icon={<FaArrowLeft/>}/>

                <div className="pagination__buttons-page">
                    {
                        this.array.map (num => {
                                let style;
                                let labelStyle;
                                if (num + 1 === this.props.currentPage) {
                                    style = currentButtonStyle;
                                    labelStyle = currentLabelStyle;
                                } else {
                                    labelStyle = labelStyles;
                                    style = buttonStyle;
                                }

                                return <div key={num}>
                                    <button id={"buttonPage" + num} className="buttonPage" onClick={() => this.props.setPage(num + 1)}/>
                                    <SmallButton labelStyle={labelStyle} style={style} htmlFor={"buttonPage" + num} icon={num + 1}/>
                                </div>
                            }
                        )
                    }
                </div>

                <button id="buttonPageNext" className="buttonPage buttonPageNext" onClick={this.props.nextPage}>next</button>
                <SmallButton labelStyle={labelStyles} htmlFor="buttonPageNext" icon={<FaArrowRight/>}/>
            </div>
        );
    }
}

export default Pagination;
