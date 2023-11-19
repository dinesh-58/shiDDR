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
    const [botSequence, setBotSequence] = useState([])
    const botBoardRef = useRef([])
    const botSequenceRef = useRef([]);
    const sequenceIntervalId = useRef(null)

    useEffect(() => {
        botSequenceRef.current = botSequence;
        /* ref is used to store latest botSequence state. 
            * this is because setInterval will use initial value of botSequence and pass that to functions called by it
            * so instead of using botSequence, use botSequenceRef in those functions
        */
    }, [botSequence]);


    useEffect(() => {
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
        if(botSequenceRef.current.length < 9) {   // all pads in board aren't enabled yet

            // only generate unique ids (pads that haven't been enabled yet)
                // after implementing, there should be no need to check if botSequence includes randomly generated id
            
            const selectablePads = botBoardRef.current.filter(pad => !pad.isEnabled);
            const randomSelection = Math.round(Math.random() * (selectablePads.length - 1));
            const selectedId = selectablePads[randomSelection].padId;
            // TODO: no need to loop, just enable only for selectedId ?

                    botSequenceRef.current.push(selectedId);
                    setBotSequence(botSequenceRef.current)

                    console.group("loop")
                    console.log("botSequence: ", botSequence)
                    console.log("botSequence: ", botSequenceRef.current)
                    console.groupEnd("loop")
                    botBoardRef.current[selectedId] = {
                        ...botBoardRef.current[selectedId],
                        isEnabled: true
                    }
                    setBotBoard(botBoardRef.current)
        } else stopSequenceLoop()
    }

    function stopSequenceLoop() {
        clearInterval(sequenceIntervalId.current);
        sequenceIntervalId.current = null;
    }

    function botSequenceLoop() {
        props.resetGame();
        if(sequenceIntervalId.current !== null) { // previous loop is running so stop it and reset everything
            stopSequenceLoop()
        }
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
