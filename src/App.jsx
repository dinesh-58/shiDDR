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
        const sequence = [];

        const intervalId = setInterval(() => {
            // generate pad id & set state, etc.. accordingly
            if(sequence.length < 9) {
                const randomId = Math.round(Math.random() * 8);
                console.log(randomId)
                if (! sequence.includes(randomId)) {
                    sequence.push(randomId)   // only use unique ids
                    setBotBoard(prevBotBoard => {
                        return prevBotBoard.map((padState, i) => sequence.includes(i) ? true : false)
                    });
                }
                // gonna have to use additional logic later for setting bot sequence based on prev value
                // remember to use callback f'n to get up to date state
                setBotSequence(sequence);
            } else clearInterval(intervalId);
        },1000);
            // bug if new game is started while interval is running
                // idk, maybe set state for interval id & when new game started,  clearInteral as well as set previous id to null 
        
        // this generates 3 unique pad ids
        // while(sequence.length < 3) {
        //     const randomId = Math.round(Math.random() * 8);
        //     if (! sequence.includes(randomId)) sequence.push(randomId)
        // }
    }

    return (
        <main className="grid 
        grid-cols-2 
        gap-8 justify-evenly">
            <Board boardType="bot" board={botBoard} />
            <Board boardType="player" board={playerBoard} padClick={handlePlayerClick}/>
            <button className="btn btn-primary"
            onClick={generateBotSequence}
        >
        New game</button>
        </main>
    )
    /* TODO: 
        * create navbar w/ proj title, github link & dark mode
        * set grid rows to 3 w/ small area for nav
    */
}

