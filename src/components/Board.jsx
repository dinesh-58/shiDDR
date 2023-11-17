import Pad from './Pad.jsx'

export default function Board(props) {
    const padElements = [];
    for (let i=0; i<9; i++) {
        padElements.push(<Pad key={i} />);
    }

    return (
        <div id={props.id} className="board grid 
        grid-cols-[repeat(3,minmax(1fr,40px))] grid-rows-[repeat(3,minmax(1fr, 40px))] justify-evenly">
            {padElements}
        </div>
    )
}
