import React, { Component } from "react";
import style from '../styles/list.less';
import Games from './Games';
import createGame from '../service/createGame';

class List extends Component {
    constructor(props) {
        super(props);
        this.create = this.create.bind(this);
    }

    create() {
        let nick = document.getElementById("nickname").value;
        let res = createGame(nick);
    }

    render() {
        let nick = this.props.nickname;
        return (
            <div className={style.block}>
                <input id="nickname" className={style.name} placeholder="Enter your nickname"/>
                <Games/>
                <p onClick={this.create} className={style.plus}>+</p>
            </div>
        );
    }
}

export default List;