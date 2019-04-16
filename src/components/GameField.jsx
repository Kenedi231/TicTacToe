import React, { Component } from "react";
import style from '../styles/game.less';
import doStep from "../service/doStep";

class GameField extends Component {
    constructor(props) {
        super(props);
    }

    defineSymbol = () => {
        let result = "";
        if (this.props.item === 'x') {
            result = style.cross
        } else if (this.props.item === 'o') {
            result = style.round
        }
        if (result !== "") {
            return <span className={result} />
        } else {
            return result
        }
    };

    step = () => {
        doStep(this.props.key1, this.props.key2).catch(err => {
            console.log(err);
        })
    };

    render() {
        let symbol = this.defineSymbol();
        return (
            <div onClick={this.step} id={`${this.props.key1}${this.props.key2}`} key={this.props.key1 + this.props.key2} className={style.cell}>
                {symbol}
            </div>
)
    }
}

export default GameField;