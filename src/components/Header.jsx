import React, { Component } from "react";
import style from '../styles/header.less'

class Header extends Component {
    render() {
        return (
            <div className={style.header}>
                <p>Tic Tac Toe</p>
            </div>
        )
    }
}

export default Header;