import React, { Component } from "react";
import style from "../styles/list.less";
import updateGames from '../service/updateGames';
import joinGame from '../service/joinGame';

const delay = 2000;

const ready = "ready";
const play = "playing";

const owner = "owner";
const opponent = "opponent";
const guest = "Guest";

class Games extends Component {
    constructor(props) {
        super(props);
        this.state = {
            games: []
        };
    }

    componentWillMount() {
        this.updateState()
    }

    componentDidMount() {
        setInterval(() => {
            this.updateState()
        }, delay)
    }

    updateState = () => {
        updateGames().then( data => {
            this.setState({
                games: data.games
            })
        }).catch( err => {
            console.log(err);
        })
    };

    join = (token) => {
        let nick = document.getElementById("nickname").value || guest;
        joinGame(nick, token).then(() => {
            console.log("OK");
        }).catch(err => {
            console.log(err);
        })
    };

    gameState = (state) => {
        if (state === ready) {
            return `${style.game} ${style.ready}`;
        } else if (state === play) {
            return `${style.game} ${style.play}`;
        } else {
            return `${style.game} ${style.done}`;
        }
    };

    checkWinner = (game, player) => {
        if (game.gameResult === player) {
            return style.winner;
        }
    };

    render() {
        return (
            <div id="games" className={style.games}>
                {
                    this.state.games.map((game, key) => {
                        let classes = this.gameState(game.state);
                        return <div onClick={this.join.bind(this, game.gameToken)} id={game.gameToken} key={key} className={classes}>
                            <p className={this.checkWinner(game, owner)}>{game.owner}</p>
                            <div className={style.line} />
                            <p className={this.checkWinner(game, opponent)}>{game.opponent}</p>
                        </div>
                    })
                }
            </div>
        );
    }
}

export default Games;