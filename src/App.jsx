import { useState } from 'react'
import Playground from './components/Playground.jsx'
import './App.css'

export default function App() {
    const [appKey, setAppKey] = useState(0);  // used to reset entire app when new game clicked (by setting different key) 
    function resetGame() {
        setAppKey(prevAppKey => prevAppKey + 1)
    }

    return (
        <>
            <nav>Placeholder nav</nav>
            <Playground key={appKey} resetGame={resetGame} />
        </>
    )
    /* TODO: 
        * create navbar w/ proj title, github link & dark mode
        * set grid rows to 3 w/ small area for nav
    */
}

