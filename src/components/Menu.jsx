import React, { Component } from "react";
import style from '../styles/menu.less';
import updateGames from '../service/updateGames';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            games: updateGames()
        }
    }
    componentDidMount() {
        setInterval(() => {
            this.setState({games: updateGames()});
        }, 2000)
    }
    render() {
        return (
            <div className={style.block}>
                <input id="nickname" className={style.name} placeholder="Enter your nickname" value="Guest"/>
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
                            return <div id={game.gameToken} key={key} className={classes}>
                                <p>{game.owner}</p>
                                <div className={style.line}>
                                </div>
                                <p>{game.opponent}</p>
                            </div>
                        })
                    }
                </div>
                <p className={style.plus}>+</p>
            </div>
        );
    }
}

export default Menu;