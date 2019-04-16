# TicTacToe
Крестики-Нолики — логическая игра между двумя противниками на квадратном поле 3 на 3 клетки.
#### Версия
* NodeJs v10.15.3 
* npm v6.8.0
* MongoDB v4.0.3
#### Как начать
Клонируйте репозиторий

    $ git clone https://github.com/Kenedi231/TicTacToe.git
        
Зайдите в папку

    $ cd TicTacToe/
    
И выполните:
    
    $ npm i
    
Открываем файл `config/index.js`

```js
    const config = {
        port: 3000,
        url: "mongodb://localhost:27017/games"
    }
```
Здесь мы можем поменять порт, на котором будет слушаться приложение
и url для базы данных.

Перед запуском приложения, запустите MongoDB

    $ mongod

Для запуска приложения в режиме разработки

    $ npm start
 
Для сборки приложения

    $ npm run build
    
Для запуска приложения в режиме production

    $ npm run prod