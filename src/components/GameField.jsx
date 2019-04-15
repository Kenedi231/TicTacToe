import React, { Component } from "react";
import style from '../styles/game.less';
import doStep from "../service/doStep";

class GameField extends Component {
    constructor(props) {
        super(props);
    }

    defineSymbol = (symbol) => {
        let res = "";
        if (symbol === 'x') {
            res = style.cross
        } else if (symbol === 'o') {
            res = style.round
        }
        if (res !== "") {
            return <span className={res}></span>
        } else {
            return ""
        }
    };

    step = (x, y) => {
        doStep(x, y).catch(err => {
            console.log(err);
        })
    };

    render() {
        return (
            this.props.field.map((rows, key) => {
                return rows.split('').map((item, key2) => {
                    let symbol = this.defineSymbol(item);
                    return <div onClick={this.step.bind(this, key, key2)} id={"" + key + key2} key={key + key2} className={style.cell}>
                        {symbol}
                    </div>
                })
            })
        )
    }
}

export default GameField;