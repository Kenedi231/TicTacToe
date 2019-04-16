import React, { Component } from "react";

import style from "../styles/list.less";
import constants from '../constants';

import joinGame from "../service/joinGame";

class GamesElement extends Component {
    constructor(props) {
        super(props)
    }

    join = () => {
        let nick = document.getElementById("nickname").value || constants.guest;
        joinGame(nick, this.props.game.gameToken).then(() => {
            console.log("OK");
        }).catch(err => {
            console.log(err);
        })
    };

    gameState = () => {
        if (this.props.game.state === constants.ready) {
            return `${style.game} ${style.ready}`;
        } else if (this.props.game.state === constants.play) {
            return `${style.game} ${style.play}`;
        } else {
            return `${style.game} ${style.done}`;
        }
    };

    checkWinner = (player) => {
        if (this.props.game.gameResult === player) {
            return style.winner;
        }
    };

    render() {
        let classes = this.gameState();
        return (
            <div onClick={this.join} id={this.props.game.gameToken} key={this.props.key} className={classes}>
                <p className={this.checkWinner(constants.owner)}>{this.props.game.owner}<span className={style.mark}>&#10004;</span></p>
                <div className={style.line} />
                <p className={this.checkWinner(constants.opponent)}>{this.props.game.opponent}<span className={style.mark}>&#10004;</span></p>
            </div>
        )
    }

}

export default GamesElement;