import { useState } from 'react'
import Board from './components/Board.jsx'
import './App.css'

function App() {
    return (
        <main className="grid 
                        grid-cols-1 lg:grid-cols-2 
                    grid-rows-2 gap-8 justify-evenly">
            <Board id="bot-board"/>
            <Board id="player-board"/>
        </main>
    )
    /* TODO: 
        * create navbar w/ proj title, github link & dark mode
        * set grid rows to 3 w/ small area for nav
    */
}

export default App
