import { PieceSymbol, Square, Color } from "chess.js"
import { useState } from "react";
import { MOVE } from "../screens/Game";
export default function ChessBoard({board, chess, socket, setBoard} : {
    chess : any;
    setBoard : any;
    board :( {
        square : Square;
        type : PieceSymbol;
        color : Color;
    } | null)[][];
    socket : WebSocket
}){
        const [from, setFrom] = useState<null | Square>(null)

    return <div className="text-white-200">
        {board.map((row,i)=>{
            return <div key={i} className="flex"> 
            {row.map((square,j)=>{
                const squareRepresentation  = String.fromCharCode(97 + (j%8)) + "" + (8 - i) as Square
                console.log(squareRepresentation)
                return <div key={j} onClick={()=>{
                    if(!from){
                        setFrom(squareRepresentation)
                    } else {
                        socket.send(JSON.stringify({
                            type : MOVE,
                            payload : {
                               move : {
                                from : from,
                                to : squareRepresentation
                               }
                            }

                        }))
                        setFrom(null)
                        chess.move({
                            from,
                            to: squareRepresentation
                        })
                        setBoard(chess.board())
                        console.log({
                            from,
                            to : squareRepresentation
                        })
                    }
                }} className={`w-16 h-16 ${(i+j)%2 ===0? 'bg-slate-800' : 'bg-amber-100'}`}>
                    <div className="w-full justify-center flex h-full"> 
                        <div className="h-full justify-center flex flex-col ">
                    {square ? square.type  : ""}
                       </div>
                    </div>
                     </div>
            })}
            </div>
        })}

    </div>
}