import React, { Component } from "react";
import exitGame from '../service/exitGame';
import stateGame from '../service/stateGame';

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
            }, 2000)
        })
    }

    render() {
        return (
            <div id={this.props.token}>
                <p>{this.state.data.owner}</p>
                <p>{this.state.data.opponent}</p>
                <p onClick={this.exit}>Exit</p>
            </div>
        )
    }
}

export default Game;