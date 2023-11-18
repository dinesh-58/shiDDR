import { useState } from 'react'
import Board from './components/Board.jsx'
import './App.css'

export default function App() {
    /* NOTE: 
        * Pad refers to the squares that change color
        * Board refers to the container that stores 9 pads
    */

    function initDefaultBoard() {
        return [ false, false, false, false, false, false, false, false, false ]; 
        // 9 booleans that represent each pad's clicked state
        // using pad index to identify for now. might use obj having id & value later
    }

    const [botBoard, setBotBoard] = useState(initDefaultBoard);
    const [playerBoard, setPlayerBoard] = useState(initDefaultBoard);
    const [botSequence, setBotSequence] = useState([])
    const [sequenceIntervalId, setSequenceIntervalId] = useState(null)

    function togglePad(id) {
        // setterFunction = isPlayerBoard ? setPlayerBoard : setBotBoard;
        // only player board for now? idk
        setPlayerBoard(prevPlayerBoard => {
            return prevPlayerBoard.map((padState, i) => i === id ? !padState : padState)
        })
    }

    function handlePlayerClick(event, id) {
        // event isn't used but is put here because onclick always passes it
            // could use even.target.id later if I decide to store board as array of objects
        togglePad(id);
        // check if clicked pad matches bot generated pad
        
        if(id == botSequence[0]) console.log("correct")
        else console.log("wrong")
        // check state of board as well? i.e. both player and bot are enabled/disabled at clicked spot
        // playerBoard[id] == botBoard
    }


    function generateBotSequence() {
        if(botSequence.length < 9) {   // all pads in board aren't enabled yet
            const randomId = Math.round(Math.random() * 8);
            console.table(randomId, sequenceIntervalId)
            if(botSequence.includes(randomId)) {  
                /*
                    * only use unique ids (pads that haven't been enabled yet)
                    * if non-unique is generated, setInterval in botSequenceLoop will 
                    * only generate another id after 1 more second 
                    * (because it runs every second regardless of generated id)
                    * takes longer for bot to enable new pad as game progresses
                    * so call this function recursively so that a pad might be selected instantly
                */
                generateBotSequence();   
            }
            else {
                setBotSequence(prevBotSequence => [...prevBotSequence, randomId])
                console.log({botSequence})
                setBotBoard(prevBotBoard => {
                    return prevBotBoard.map((padState, i) => botSequence.includes(i) ? true : false)
                });
            }
        } else stopSequenceLoop()
    }

    function stopSequenceLoop() {
        clearInterval(sequenceIntervalId);
        setSequenceIntervalId(null)
    }

    function botSequenceLoop() {
        if(sequenceIntervalId !== null) { // previous loop is running so stop it
            stopSequenceLoop()
        }
        else {
            // generates new sequence every second. 
            // setInterval returns id which is used to stop loop (using clearInteral) in generateBotSequence
            const intervalId = setInterval(generateBotSequence, 1000);  
            console.log({intervalId})
        }
    }

    return (
        <main className="grid 
        grid-cols-2 
        gap-8 justify-evenly">
            <Board boardType="bot" board={botBoard} />
            <Board boardType="player" board={playerBoard} padClick={handlePlayerClick}/>
            <button className="btn btn-primary"
            onClick={botSequenceLoop}
        >
        New game</button>
        </main>
    )
    /* TODO: 
        * create navbar w/ proj title, github link & dark mode
        * set grid rows to 3 w/ small area for nav
    */
}

