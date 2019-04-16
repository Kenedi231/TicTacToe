import React, { Component } from "react";
import style from "../styles/list.less";
import updateGames from '../service/updateGames';
import GamesElement from './GamesElement';

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

    render() {
        return (
            <div id="games" className={style.games}>
                {
                    this.state.games.map((game, key) => {
                        return <GamesElement game={game} key={key} />
                    })
                }
            </div>
        );
    }
}

export default Games;