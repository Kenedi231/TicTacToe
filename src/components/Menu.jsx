import React, { Component } from "react";
import style from '../styles/menu.less';

class Menu extends Component {
    render() {
        return (
            <div className={style.block}>
                <input id="nickname" className={style.name} placeholder="Enter your nickname" value="Guest"/>
                <div id="games" className={style.games}>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                </div>
                <p className={style.plus}>+</p>
            </div>
        );
    }
}

export default Menu;