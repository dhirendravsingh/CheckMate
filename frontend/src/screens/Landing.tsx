import { useNavigate } from "react-router-dom"
import Button from "../components/Button"
export default function Landing(){
    const navigate = useNavigate()
    return <div>
        <div className="mt-2">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
                <img src={"/chess.jpg"}/>
            </div>
            <div>
                <h1 className="text-4xl font-bold">Play Chess online on the #2 Site of the world</h1>
                <div className="mt-4">
                   <Button onClick={()=>{navigate("/game")}}>
                    Play Online
                   </Button>
                </div>
            </div>
          </div>
        </div>
    </div>
}