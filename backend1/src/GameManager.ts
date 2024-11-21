import { WebSocket } from "ws";
import { INIT_GAME, MOVE } from "./messages";
import { Game } from "./Game"
//it is a class that we have created to manage all of our games
export  class GameManager {
    //below is games array, an array of users that are waiting to be connected, an array of currently active users
    private games : Game[];
    private pendingUser : WebSocket | null
    private users : WebSocket[]

    //below you have to intialize the games array
    constructor(){
        this.games = []
        this.pendingUser = null
        this.users = []
    }

    //below is the code to add both users
    addUser(socket: WebSocket){
        this.users.push(socket)
        this.addHandler(socket)
    }

    //below is the code to remove user
    removeUser(socket : WebSocket){
        this.users = this.users.filter(user => user!= socket)
        //stop the game because the user has left
    }

    //below is the code to handle message which is kept private hence cannot be called from outside
    private addHandler(socket : WebSocket) {
        socket.on('message', (data)=>{
            const message = JSON.parse(data.toString())
            if(message.type === INIT_GAME){
                if(this.pendingUser){
                    //start the game
                    const game = new Game(this.pendingUser, socket)
                    this.games.push(game)
                    this.pendingUser = null
                }
                else{
                    this.pendingUser = socket
                }
            }
            if(message.type === MOVE){
                const game = this.games.find(game => game.player1 === socket || game.player2=== socket)
                if(game){
                    game.makeMove(socket, message.payload.move)
                }
            }
        })
    }
}
