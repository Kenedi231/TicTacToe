import React, { Component } from "react";
import style from "../styles/list.less";
import updateGames from '../service/updateGames';
import joinGame from '../service/joinGame';

class Games extends Component {
    constructor(props) {
        super(props);
        this.state = {
            games: updateGames()
        };
        this.join = this.join.bind(this);
    }

    join(token) {
        let nick = document.getElementById("nickname").value || "Guest";
        joinGame(nick, token);
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({games: updateGames()});
        }, 2000)
    }
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