import React, { Component } from "react";
import style from '../styles/game.less';
import GameField from './GameField';
import exitGame from '../service/exitGame';
import stateGame from '../service/stateGame';

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
        let game;
        if (this.state.data.field === undefined) {
            return null;
        }
        let secondPlayer = this.state.data.opponent || wait;
        if (this.state.data.step === owner_text) {
            owner = style.turn;
        } else {
            opponent = style.turn;
        }
        if (this.state.data.youViewer) {
            game = `${style.block_game} ${style.viewer}`;
        } else {
            game = `${style.block_game}`;
        }
        owner = `${style.nick} ${style.owner} ${owner}`;
        opponent = `${style.nick} ${style.opponent} ${opponent}`;
        return (
            <div className={game} id={this.props.token}>
                <div className={style.name_player}>
                    <p className={owner}>{this.state.data.owner} <span className={style.cross} /></p>
                    <p className={opponent}><span className={style.round} />{secondPlayer}</p>
                </div>
                <div className={style.game_field}>
                    <GameField field={this.state.data.field} />
                </div>
                <p onClick={this.exit}>Exit</p>
            </div>
        )
    }
}

export default Game;