import React, { Component } from "react";
import style from "../styles/list.less";
import updateGames from '../service/updateGames';
import joinGame from '../service/joinGame';

const delay = 2000;

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
        let nick = document.getElementById("nickname").value || "Guest";
        joinGame(nick, token).then(() => {
            console.log("OK");
        }).catch(err => {
            console.log(err);
        })
    };

    render() {
        return (
            <div id="games" className={style.games}>
                {
                    this.state.games.map((game, key) => {
                        let classes = style.game;
                        if (game.state === "ready") {
                            classes += " " + style.ready;
                        } else if (game.state === "playing") {
                            classes += " " + style.play;
                        } else {
                            classes += " " + style.done;
                        }
                        return <div onClick={this.join.bind(this, game.gameToken)} id={game.gameToken} key={key} className={classes}>
                            <p>{game.owner}</p>
                            <div className={style.line}>
                            </div>
                            <p>{game.opponent}</p>
                        </div>
                    })
                }
            </div>
        );
    }
}

export default Games;