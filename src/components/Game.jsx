import React, { Component } from "react";
import style from '../styles/game.less';
import exitGame from '../service/exitGame';
import stateGame from '../service/stateGame';
import cookieParser from '../service/cookieParser';
import doStep from '../service/doStep';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            time: 0
        };
        this.exit = this.exit.bind(this);
    }


    exit() {
        clearInterval(this.state.time);
        this.setState({time: 0});
        this.setState({data: {}});
        exitGame();
    }

    componentWillMount() {
        this.setState({data: stateGame()});
    }

    componentDidMount() {
        this.setState({
            time: setInterval(() => {
                this.setState({data: stateGame()});
            }, 1000)
        })
    }

    render() {
        let owner = "";
        let opponent = "";
        let cookieAccess = cookieParser().accessToken;
        if (cookieAccess === this.state.data.accessTokenOwner) {
            if (this.state.data.youTurn) {
                owner = style.turn;
            } else {
                opponent = style.turn;
            }
        } else {
            if (this.state.data.youTurn) {
                opponent = style.turn;
            } else {
                owner = style.turn;
            }
        }
        if (this.state.data.field === undefined) {
            return null;
        }
        return (
            <div className={style.block_game} id={this.props.token}>
                <p className={style.nick + " " + style.owner + " " + owner}>{this.state.data.owner} <span className={style.cross}></span></p>
                <p className={style.nick + " " + style.opponent + " " + opponent}><span className={style.round}></span>{this.state.data.opponent || "wait..."}</p>
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
                                return <div onClick={doStep.bind(this, key, key2)} id={"" + key + key2} key={key + key2} className={style.cell}>
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