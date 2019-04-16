import React, { Component } from "react";
import style from '../styles/game.less';
import GameField from './GameField';
import exitGame from '../service/exitGame';
import stateGame from '../service/stateGame';

const delay = 1000;
const owner = "owner";
const opponent = "opponent";
const wait = "wait...";
const back = "back";
const surrender = "surrender";

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        })
    }

    updateState = () => {
        stateGame().then( data => {
            this.setState({
                data: data
            })
        })
    };

    exit = () => {
        exitGame().then(() => {
            clearInterval(this.state.time);
            this.setState({
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
        if (this.state.data.step === owner) {
            ownerStyle = style.turn;
        } else {
            opponentStyle = style.turn;
        }
        if (player === owner) {
            winner = this.state.data.winner === owner ? style.winner: "";
            return `${style.nick} ${style.owner} ${ownerStyle} ${winner}`;
        } else {
            winner = this.state.data.winner === opponent ? style.winner: "";
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
            return back
        } else {
            return surrender
        }
    };

    render() {
        if (this.state.data.field === undefined) {
            return null;
        }
        let secondPlayer = this.state.data.opponent || wait;
        return (
            <div className={this.gameStyle()} id={this.props.token}>
                <div className={style.name_player}>
                    <p className={this.stylePlayer(owner)}>{this.state.data.owner} <span className={style.cross} /></p>
                    <p className={this.stylePlayer(opponent)}><span className={style.round} />{secondPlayer}</p>
                </div>
                <div className={style.game_field}>
                    {
                        this.state.data.field.map((rows, key) => {
                            return rows.split('').map((item, key2) => {
                                console.log(key);
                                return <GameField item={item} key1={key} key2={key2}/>
                            })
                        })
                    }
                </div>
                <p className={style.button} onClick={this.exit}>{this.buttonExit()}</p>
            </div>
        )
    }
}

export default Game;