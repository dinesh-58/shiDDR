import Pad from './Pad.jsx'

export default function Board(props) {
    const padElements = [];
    for (let i=0; i<9; i++) {
        padElements.push(<Pad key={i} />);
    }

    return (
        <div id={props.id} className="board grid 
        bg-base-300
        aspect-square
        grid-rows-[repeat(3,minmax(30%,150px))] 
        grid-cols-[repeat(3,minmax(30%,150px))] 
        gap-4
        justify-center">
            {padElements}
        </div>
    )
}
