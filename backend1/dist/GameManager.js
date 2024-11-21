"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
const messages_1 = require("./messages");
const Game_1 = require("./Game");
//it is a class that we have created to manage all of our games
class GameManager {
    //below you have to intialize the games array
    constructor() {
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }
    //below is the code to add both users
    addUser(socket) {
        this.users.push(socket);
        this.addHandler(socket);
    }
    //below is the code to remove user
    removeUser(socket) {
        this.users = this.users.filter(user => user != socket);
        //stop the game because the user has left
    }
    //below is the code to handle message which is kept private hence cannot be called from outside
    addHandler(socket) {
        socket.on('message', (data) => {
            const message = JSON.parse(data.toString());
            if (message.type === messages_1.INIT_GAME) {
                if (this.pendingUser) {
                    //start the game
                    const game = new Game_1.Game(this.pendingUser, socket);
                    this.games.push(game);
                    this.pendingUser = null;
                }
                else {
                    this.pendingUser = socket;
                }
            }
            if (message.type === messages_1.MOVE) {
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                if (game) {
                    game.makeMove(socket, message.payload.move);
                }
            }
        });
    }
}
exports.GameManager = GameManager;
