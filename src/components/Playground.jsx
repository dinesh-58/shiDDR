import { useState, useRef, useEffect } from 'react'
import Board from './Board.jsx'

export default function Playground(props) {
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

    const [botBoard, setBotBoard] = useState(initDefaultBoard);
    const [playerBoard, setPlayerBoard] = useState(initDefaultBoard);
    const botBoardRef = useRef([])
    const botSequence = useRef([]);
    const sequenceIntervalId = useRef(null)

    /* ref is used to store latest botBoard state. 
        * this is because setInterval will use initial value of botBoard and pass that to functions called by it
        * so instead of using botBoard, use botBoardRef in those functions
    */

    useEffect(() => {
        console.log("botBoard change detected: ", botBoard)
        botBoardRef.current = [...botBoard]
    }, [botBoard]);

    function togglePad(id) {
        // only player board for now? idk
        // setterFunction = isPlayerBoard ? setPlayerBoard : setBotBoard; // might use something like this later
        setPlayerBoard(prevPlayerBoard => {
            return prevPlayerBoard.map(pad => {
                return pad.padId === id ? { ...pad, isEnabled: !pad.isEnabled } : pad
            })
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
        // TODO: use refs in all functions that are called (directly or indirectly) by setInterval
        if(botSequence.current.length < 9) {   // all pads in board aren't enabled yet

            // only generate unique ids (pads that haven't been enabled yet)
            
            const selectablePads = botBoardRef.current.filter(pad => !pad.isEnabled);
            const randomSelection = Math.round(Math.random() * (selectablePads.length - 1));
            const selectedId = selectablePads[randomSelection].padId;

            botSequence.current.push(selectedId);

            console.groupCollapsed("loop")
            console.log("botSequence: ", [...botSequence.current])
            console.log("botBoard: ", botBoard)
            console.log("botBoardRef: ", [...botBoardRef.current])
            console.groupEnd("loop")

            botBoardRef.current[selectedId] = {
                ...botBoardRef.current[selectedId],
                isEnabled: true
            }
            setBotBoard([...botBoardRef.current])

            /*
            setBotBoard(prevBotBoard => {
                return prevBotBoard.map(pad => {
                    return { 
                        ...pad,
                        isEnabled: botSequence.current.includes(pad.id)
                    }
                })
            });
            */
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
        props.resetGame();  // TODO: manually clear everything? (botBoard, botSequence & sequenceIntervalIdintervalId)

        // generates new sequence every second. 
        // setInterval returns id which is used to stop loop (using clearInteral) in generateBotSequence
        const intervalId = setInterval(generateBotSequence, 1000);  
        console.log("intervalId: " + intervalId)
        sequenceIntervalId.current = intervalId
    }
    return (
        <main className="grid grid-cols-2 gap-8 justify-evenly">
            <Board boardType="bot" board={botBoard} />
            <Board boardType="player" board={playerBoard} padClick={handlePlayerClick}/>
            <button className="btn btn-primary"
                onClick={botSequenceLoop}
            >New game</button>
        </main>
    )
}
