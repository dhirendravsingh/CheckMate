
export default function Button({onClick, children}: {onClick: ()=> void, children : React.ReactNode }){
    return <button className="bg-slate-900 hover:bg-slate-700 text-yellow-200 font-bold py-2 px-4 rounded" onClick={onClick}>
           {children}
            </button>
}