export default function Board(props) {
    // putting here because button hover effects don't work properly if these are put in css file
    const padStyles = "btn h-auto max-h-full max-w-full aspect-square";
    const botPadStyle = props.boardType == "bot" ? " cursor-not-allowed no-animation" : ""
    const padElements = [];

    try {
        
        for (let i=0; i<9; i++) {
            // might get issue for bot boards where padClick hasn't been passed
            const padColor = props.board[i].isEnabled ? " btn-primary" : " btn-neutral" 

            padElements.push(
                <button key={i} id={i} className={padStyles + padColor + botPadStyle}
                onClick={
                    props.boardType == "player" ?
                    (event) => props.padClick(event, i)
                    : undefined
                }>
                </button>
            );
        }
    } catch (error) {
        console.log("custom error:" + error)
        console.log(props)
        //debugger;
    }

    return (
        <div id={props.id} className="Board grid 
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
