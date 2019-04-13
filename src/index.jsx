import React, { Component } from "react";
import ReactDOM from "react-dom";
import style from './styles/index..less';
import Header from './components/Header';
import Menu from './components/Menu';

const root = document.getElementById("root");

class App extends Component {
    render() {
        return (
            <div className={style.main}>
                <Header />
                <Menu />
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    root
);