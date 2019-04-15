import React, { Component } from "react";
import style from '../styles/game.less';
import exitGame from '../service/exitGame';
import stateGame from '../service/stateGame';
import doStep from '../service/doStep';

const delay = 1000;
const owner_text = "owner";
const wait = "wait...";

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

    step = (x, y) => {
        doStep(x, y).catch(err => {
            console.log(err);
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
            console.log(err);
        })
    };

    render() {
        let owner = "";
        let opponent = "";
        if (this.state.data.field === undefined) {
            return null;
        }
        let secondPlayer = this.state.data.opponent || wait;
        if (this.state.data.step === owner_text) {
            owner = style.turn;
        } else {
            opponent = style.turn;
        }
        return (
            <div className={style.block_game} id={this.props.token}>
                <p className={style.nick + " " + style.owner + " " + owner}>{this.state.data.owner} <span className={style.cross}></span></p>
                <p className={style.nick + " " + style.opponent + " " + opponent}><span className={style.round}></span>{secondPlayer}</p>
                <div className="clearfix"></div>
                <div className={style.game_field}>
                    {
                        this.state.data.field.map((rows, key) => {
                            return rows.split('').map((item, key2) => {
                                let symbol = "";
                                if (item === 'x') {
                                    symbol = <span className={style.cross}></span>;
                                } else if (item === 'o') {
                                    symbol = <span className={style.round}></span>;
                                }
                                return <div onClick={this.step.bind(this, key, key2)} id={"" + key + key2} key={key + key2} className={style.cell}>
                                    {symbol}
                                </div>
                            })
                        })
                    }
                </div>
                <p onClick={this.exit}>Exit</p>
            </div>
        )
    }
}

export default Game;