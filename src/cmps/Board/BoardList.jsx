export function BoardList({ boards, onAddBoard, onRemoveBoard, onUpdateBoard }) {
    console.log('boards from boards list', boards)




    return (
        <section className="board-list">

            {boards.map(board => (
                <div className="board-side-preview">
                    <svg lineHeight="0.1em" width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 4.5H16C16.2761 4.5 16.5 4.72386 16.5 5V15C16.5 15.2761 16.2761 15.5 16 15.5H7.5L7.5 4.5ZM6 4.5H4C3.72386 4.5 3.5 4.72386 3.5 5V15C3.5 15.2761 3.72386 15.5 4 15.5H6L6 4.5ZM2 5C2 3.89543 2.89543 3 4 3H16C17.1046 3 18 3.89543 18 5V15C18 16.1046 17.1046 17 16 17H4C2.89543 17 2 16.1046 2 15V5Z"></path></svg>
                    <div className="board-option-sidebar" key={board._id}>{board.title}</div>
                </div>

            ))}

        </section>
    )
}