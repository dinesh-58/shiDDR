import { useState, useRef, useEffect } from 'react'
import Board from './components/Board.jsx'
import './App.css'

export default function App() {
    /* NOTE: 
        * Pad refers to the squares that change color
        * Board refers to the container that stores 9 pads
    */

    function initDefaultBoard() {
        const board = [];
        for(let i=0; i<9; i++) {
            board.push({
                padId: i,
                isEnabled: false
            });
        }
        return board;
    }

    const [playerBoard, setPlayerBoard] = useState(initDefaultBoard);
    const playerBoardRef = useRef([])
    const botSequenceRef = useRef([]);
    const sequenceIntervalId = useRef(null)

    /* ref is used to store latest Board state. 
        * this is because setInterval will use initial value of botBoard and pass that to functions called by it
        * so instead of using playerBoard, use playerBoardRef in those functions
    */

    useEffect(() => {
        console.log("playerBoard change detected: ", playerBoard)
        playerBoardRef.current = [...playerBoard]
    }, [playerBoard]);

    function togglePad(id) {
        setPlayerBoard(prevBoard => {
            return prevBoard.map(pad => {
                return pad.padId === id ? { ...pad, isEnabled: !pad.isEnabled } : pad
            })
        })
    }

    function handlePlayerClick(event, id) {
        // event isn't used but is put here because onclick always passes it
            // could use even.target.id later if I decide to store board as array of objects
        // check if clicked pad matches bot generated pad
        
        if(id == botSequenceRef.current[0] && (playerBoardRef.current[id].isEnabled != true)) {
            togglePad(id); 
            console.log("correct")
            setTimeout(() => {
                // debugger
                togglePad(id) // disable after 200 ms
            }, 200)

            // TODO: try changing color by disabling and enabling 1st 
            // then, using dom manipulation if that doesn't work
        }
        else {
            // decrease remaining lives
            console.log("wrong")
        }
        botSequenceRef.current.shift()
    }


    function generateBotSequence() {
        // TODO: use refs in all functions that are called (directly or indirectly) by setInterval
        if(botSequenceRef.current.length < 5) {   
            /* TODO: might cause infinite loop here when all pads are clicked. 
                * botSequenceRef length will decrease as player clicks but pads will not be disabled
                * implement disabling logic later
            */

            // only generate unique ids (pads that haven't been enabled yet)
            
            const selectablePads = playerBoardRef.current.filter(pad => !pad.isEnabled && !botSequenceRef.current.includes(pad.padId));
            const randomSelection = Math.floor(Math.random() * selectablePads.length);
            const selectedId = selectablePads[randomSelection].padId;

            botSequenceRef.current.push(selectedId);
            console.log(botSequenceRef.current.at(-1))

            console.groupCollapsed("loop")
            console.log("botSequenceRef: ", [...botSequenceRef.current])
            console.groupEnd("loop")

            // TODO: display latest botSequence number in DOM

        } else stopSequenceLoop()
    }

    function stopSequenceLoop() {
        clearInterval(sequenceIntervalId.current);
        sequenceIntervalId.current = null;
    }

    function botSequenceLoop() {
        if(sequenceIntervalId.current !== null) { // previous loop is running so stop it and reset everything
            stopSequenceLoop()
        }
        // TODO: manually clear everything? (botBoard, botSequenceRef & sequenceIntervalIdintervalId)

        // generates new sequence every second. 
        // setInterval returns id which is used to stop loop (using clearInteral) in generateBotSequence
        const intervalId = setInterval(generateBotSequence, 1000);  
        console.log("intervalId: " + intervalId)
        sequenceIntervalId.current = intervalId
    }

    const botSequenceElements = botSequenceRef.current.map((padId, i) => {
        // TODO: trigger re-render here. move to above generateBotSequence? or use some sort of state or useEffect. need to think
        return (<li key={i}>
                    {i == (botSequenceRef.current.length - 1) ? padId : 'X'}
                </li>)
    })

    return (
        <div id="App" className="flex max-h-screen flex-col max-w-[80%] mx-auto items-center">
            <nav>Placeholder nav</nav>
            <ul></ul>
            <main className="flex flex-col gap-4 justify-evenly">
                <Board boardType="player" board={playerBoard} padClick={handlePlayerClick}/>
                <button className="btn btn-primary"
                onClick={botSequenceLoop}>New game</button>
            </main>
        </div>
    )
    /* TODO: 
        * create navbar w/ proj title, github link & dark mode
        * set grid rows to 3 w/ small area for nav
    */
}

