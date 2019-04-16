import GameField from './GameField';
import React, { Component } from "react";

import style from '../styles/game.less';
import constants from '../constants';

import exitGame from '../service/exitGame';
import stateGame from '../service/stateGame';
import msToTime from '../service/msToTime';

const delay = 1000;

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameDuration: 0,
            data: {},
            time: 0
        };
    }

    componentWillMount() {
        this.updateState();
    }

    componentDidMount() {
        this.setState({
            time: setInterval(() => {
                this.updateState();
            }, delay)
        });
    }

    updateState = () => {
        stateGame().then( data => {
            let duration = data.state === constants.play ? this.state.gameDuration + delay : this.state.gameDuration;
            if (duration < data.gameDuration) {
                duration = data.gameDuration;
            }
            this.setState({
                data: data,
                gameDuration: duration
            })
        })
    };

    exit = () => {
        exitGame().then(() => {
            clearInterval(this.state.time);
            this.setState({
                timer: 0,
                time: 0,
                data: {}
            });
        }).catch(err => {
            alert(err);
        })
    };

    stylePlayer = (player) => {
        let ownerStyle = "";
        let opponentStyle = "";
        let winner = "";
        if (this.state.data.step === constants.owner) {
            ownerStyle = style.turn;
        } else {
            opponentStyle = style.turn;
        }
        if (player === constants.owner) {
            winner = this.state.data.winner === constants.owner ? style.winner: "";
            return `${style.nick} ${style.owner} ${ownerStyle} ${winner}`;
        } else {
            winner = this.state.data.winner === constants.opponent ? style.winner: "";
            return `${style.nick} ${style.opponent} ${opponentStyle} ${winner}`;
        }
    };

    gameStyle = () => {
        if (this.state.data.youViewer) {
            return `${style.block_game} ${style.viewer}`;
        } else {
            return `${style.block_game}`;
        }
    };

    buttonExit = () => {
        const { data: { opponent, winner, youViewer } } = this.state;
        let condition = opponent === "" || winner !== "" || youViewer;
        if (condition) {
            return constants.back
        } else {
            return constants.surrender
        }
    };

    defineTimer = () => {
        return msToTime(this.state.gameDuration)
    };

    render() {
        if (this.state.data.field === undefined) {
            return null;
        }
        let secondPlayer = this.state.data.opponent || constants.wait;
        return (
            <div className={this.gameStyle()} id={this.props.token}>
                <div className={style.name_player}>
                    <p className={this.stylePlayer(constants.owner)}>{this.state.data.owner} <span className={style.cross} /></p>
                    <p className={this.stylePlayer(constants.opponent)}><span className={style.round} />{secondPlayer}</p>
                </div>
                <div className={style.game_field}>
                    {
                        this.state.data.field.map((rows, key) => {
                            return rows.split('').map((item, key2) => {
                                return <GameField item={item} key1={key} key2={key2}/>
                            })
                        })
                    }
                </div>
                <p className={style.timer}>{this.defineTimer()}</p>
                <p className={style.button} onClick={this.exit}>{this.buttonExit()}</p>
            </div>
        )
    }
}

export default Game;