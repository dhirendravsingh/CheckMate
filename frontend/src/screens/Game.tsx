import ChessBoard from "../components/ChessBoard"
import Button from "../components/Button"
import { useSocket } from "../hook/useSocket"
import { useEffect, useState } from "react"
import { Chess } from "chess.js"


export const INIT_GAME = "init_game"
export const MOVE = "move"
export const GAME_OVER = "game_over"



export default function Game(){

    const socket = useSocket()
    const [chess, setChess] = useState(new Chess())
    const [board, setBoard] = useState(chess.board())

    useEffect(()=>{
        if(!socket){
            return
        }
        socket.onmessage= (event)=>{
            const message = JSON.parse(event.data)
            console.log(message)
            switch(message.type){
                case INIT_GAME:
                    setBoard(chess.board())
                    break;

                case MOVE:
                    const move = message.payload;
                    chess.move(move)
                    setBoard(chess.board())
                    break;
                
                case GAME_OVER: 
                    break;
            }
        }
    },[socket])

    if(!socket) return <div>Connection please wait...</div>

    return <div className="justify-center flex">
     <div className="pt-8 max-w-screen-lg w-full">
        <div className="grid grid-cols-6 gap-4 ">
        <div className="col-span-4  w-full flex justify-center">
            <ChessBoard board={board} chess={chess} setBoard={setBoard} socket={socket}/>
        </div>
        <div className="col-span-2 w-full flex justify-center">
            <div className="pt-60">
           <Button onClick={()=>{
            socket.send(JSON.stringify({
                type : INIT_GAME
            }))
           }}>Start the Game</Button>
           </div>
        </div>
        </div>
    </div>

   </div>
}