import React, { Component } from "react";
import cookieParser from '../service/cookieParser';
import List from './List';
import Game from './Game';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cookie: cookieParser()
        }
    }
    componentDidMount() {
        setInterval( () => {
            this.setState({cookie: cookieParser()});
        }, 0)
    }
    render() {
        let out = null;
        if (this.state.cookie.gameToken === "") {
            out = <List nickname={this.state.cookie.userName}/>;
        } else {
            out = <Game token={this.state.cookie.gameToken}/>;
        }
        return (
            <div>
                {out}
            </div>
        )
    }
}

export default Menu;