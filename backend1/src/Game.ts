import WebSocket from "ws"
import {Chess} from "chess.js"
import { GAME_OVER, INIT_GAME, MOVE } from "./messages"
export class Game{
    public player1 : WebSocket
    public player2 : WebSocket
    public board : Chess
    private moves : string[]
    private startTime : Date
    private moveCount = 0

    constructor(player1 : WebSocket, player2: WebSocket){
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess()
        this.moves = []
        this.startTime = new Date()
        this.player1.send(JSON.stringify({
            type : INIT_GAME,
            payload : {
                color : "white"
            }
        }))
        this.player2.send(JSON.stringify({
            type : INIT_GAME,
            payload : {
                color : "black"
            }
        }))
    }

    makeMove(socket : WebSocket, move : {from : string; to:string}){
        console.log(move)
        //validation here whether it is the users turn or not
        if(this.moveCount % 2 === 0 && socket !== this.player1){return}
        if(this.moveCount % 2 === 1 && socket !== this.player2){return}

        // is it this users move
        // is the move valid
        //validate the type of move
        try {
            this.board.move(move)
        } catch (error) {
            console.log(error)
        }

        //update the board - it has been done by the library
        //push the move

        //check if the game is over
        if(this.board.isGameOver()){
            this.player1.emit(JSON.stringify({ 
                type: GAME_OVER,
                payload : {
                    winner : this.board.turn() === "w" ? "black" : "white"
                }
            }))
            return
        }
        if(this.board.moves.length % 2 ===0){
            this.player2.send(JSON.stringify({
                type: MOVE,
                payload : move
            }))
        }
        else{
            this.player1.send(JSON.stringify({
                type : MOVE,
                payload : move
            }))
        }
        this.moveCount++

        //send the updated board to both the users
    }
}