export default function Board(props) {
    // putting here because button hover effects don't work properly if these are put in css file
    const padStyles = "btn btn-primary h-auto max-h-full max-w-full aspect-square";
    const padElements = [];

    for (let i=0; i<9; i++) {
        // might get issue for bot boards where padClick hasn't been passed
        padElements.push(
            <button key={i} id={i} className={padStyles} onClick={props.padClick}>
            </button>
        );
        // padElements.push(<Pad key={i} id={i} />)
    }
    console.log(props.padClick)

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
