const app = require('express')();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const path = require("path");

const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

http.listen(port, function () {
    console.log('Tic Tac Toe app listening on port http://localhost:' + port + '/\n');
});