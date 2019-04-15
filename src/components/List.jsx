import React, { Component } from "react";
import style from '../styles/list.less';
import Games from './Games';
import createGame from '../service/createGame';

class List extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        document.getElementById("nickname").value = this.props.nickname;
    }

    create = () => {
        let nick = document.getElementById("nickname").value;
        createGame(nick).catch(err => {
            console.log(err);
        })
    };

    render() {
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