import { useState } from 'react'
import Board from './components/Board.jsx'
import './App.css'

export default function App() {
    function initDefaultBoard() {
        return [ false, false, false, false, false, false, false, false, false ]; 
        // 9 booleans that represent each pad's clicked state
        // using pad index to identify for now. might use obj having id & value later
        
        // const defaultBoard = []
    }

    const [botBoard, setBotBoard] = useState(initDefaultBoard);
    const [playerBoard, setPlayerBoard] = useState(initDefaultBoard);

    function togglePad(event, id) {
        // event isn't used but is put here because onclick always passes it
        // setterFunction = isPlayerBoard ? setPlayerBoard : setBotBoard;
        // only player board for now? idk
        setPlayerBoard(playerBoard.map((padState, i) => 
            i === id ? !padState : padState
        ))
    }

    function generateBotSequence() {
        const sequence = [];
        while(sequence.length < 3) {
            const randomId = Math.round(Math.random() * 8);
            if (! sequence.includes(randomId)) sequence.push(randomId)
        }
        setBotBoard(botBoard.map((padState, i) => 
            sequence.includes(i) ? true : false
        ));
    }

    return (
        <main className="grid 
        grid-cols-2 
        gap-8 justify-evenly">
            <Board boardType="bot" board={botBoard} />
            <Board boardType="player" board={playerBoard} padClick={togglePad}/>
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

