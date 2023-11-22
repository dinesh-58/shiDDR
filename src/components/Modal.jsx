export default function Modal(props) {
    return (
        <dialog id={props.id} className="modal modal-open">
            <div className="modal-box">
                <div>{props.description}</div>
                <form action="" method="modal" className="modal-action">
                    <button className="btn" onClick={props.btnHandler}>{props.btnText}</button>
                </form>
            </div>
        </dialog>
    )
}
