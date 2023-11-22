import { useState, useRef, useEffect } from 'react'
import Board from './components/Board.jsx'
import Modal from './components/Modal.jsx'
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
    const [botSequenceState, setBotSequenceState] = useState([])
    const [score, setScore] = useState(0)
    const [lives, setLives] = useState(3)
    const [GAME_IDLE, GAME_RUNNING, GAME_OVER] = [0,1,2]
    const [gameState, setGameState] = useState(GAME_IDLE)

    /* ref is used to store latest Board state. 
        * this is because setInterval will use initial value of botBoard and pass that to functions called by it
        * so instead of using playerBoard, use playerBoardRef in those functions
    */

    useEffect(() => {
        console.log("playerBoard change detected: ", playerBoard)
        playerBoardRef.current = [...playerBoard]
    }, [playerBoard]);

    useEffect(() => {
        if (lives <= 0) {
            setGameState(GAME_OVER);
            stopSequenceLoop();
        }
        // TODO: use game over state or create reusable function to stop game
    }, [lives])

    useEffect(() => {
        console.log("botSequenceRef.current changed")
        botSequenceRef.current = [...botSequenceState]
    }, [botSequenceState])

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
            togglePad(id);  // enable pad
            setScore(prevScore => prevScore + 1);
            console.log("correct")
            setTimeout(() => {
                // debugger
                togglePad(id) // disable pad after 200 ms to achieve blink effect
            }, 200)
        }
        else {
            // decrease remaining lives
            console.log("wrong")
            setLives(prevLives => prevLives - 1);
        }
        botSequenceRef.current.shift()
    }


    function generateBotSequence() {
        // TODO: use refs in all functions that are called (directly or indirectly) by setInterval
        if(botSequenceRef.current.length < 5) {   

            // only generate unique ids (pads that haven't been enabled yet & aren't in botSequenceRef)
            const selectablePads = playerBoardRef.current.filter(pad => {
                return !pad.isEnabled && !botSequenceRef.current.includes(pad.padId);
            });
            const randomSelection = Math.floor(Math.random() * selectablePads.length);
            const selectedId = selectablePads[randomSelection].padId;

            botSequenceRef.current.push(selectedId);
            setBotSequenceState([...botSequenceRef.current]) // this is just to cause rerender and show new numbers in DOM
            console.log("botSequenceRef: ", [...botSequenceRef.current])  // TODO: remove this log later.
        } else {
            setGameState(GAME_OVER)
            stopSequenceLoop()
        }
    }

    function stopSequenceLoop() {
        clearInterval(sequenceIntervalId.current);
        sequenceIntervalId.current = null;
    }

    function botSequenceLoop() {
        // manually clear everything? (Board, botSequenceRef & sequenceIntervalId)
        // * couldn't find way to reset other than reloading tab
        setGameState(GAME_RUNNING)
        if(gameState === GAME_OVER) {
            setLives(3)
            setScore(0)
            setPlayerBoard(initDefaultBoard())
            setBotSequenceState([])
        }

        // generates new sequence every second. 
        // setInterval returns id which is used to stop loop (using clearInteral) in generateBotSequence
        const intervalId = setInterval(generateBotSequence, 1500);  
        console.log("intervalId: " + intervalId)
        sequenceIntervalId.current = intervalId
    }

    const botSequenceElements = botSequenceState.map((padId, i) => {
        return (
            <li key={i}>
                {i == (botSequenceState.length - 1) ? padId + 1 : 'X'}
            </li>
        )
    })

    return (
        <div id="App" className="flex max-h-screen flex-col max-w-[80%] sm:max-w-[480px] mx-auto items-center">
            <nav>Placeholder nav</nav>
            <div className="flex justify-between w-full">
                <h3>Score: {score}</h3>
                <h3>Lives: {lives}</h3>
            </div>
            <ul className="flex self-start h-8 w-1/3 gap-4 [&>*]:block">
                <span>Sequence: </span>
                {botSequenceElements}
            </ul>
            <main className="flex flex-col gap-4 justify-evenly">
                <Board boardType="player" board={playerBoard} padClick={handlePlayerClick}/>
            </main>
            {gameState == GAME_IDLE && <Modal id="modal-game-idle" description="hello" btnText="Start" btnHandler={botSequenceLoop} />}
            {gameState == GAME_OVER && <Modal id="modal-game-over" description="Game Over" btnText="Replay" btnHandler={botSequenceLoop} />}
        </div>
    )
    /* TODO: 
        * create navbar w/ proj title, github link & dark mode
        * set grid rows to 3 w/ small area for nav
    */
}

