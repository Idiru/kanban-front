import MainButton from "./MainButton";

const board = [
  {
    name: "TODO",
    color: "#49C4E5",
    columnId: 1,
    tickets: [
      {
        title: "Build UI for onboarding flow",
        ticketId: 1,
      },
      {
        title: "Build UI for search",
        ticketId: 2,
      },
      {
        title: "Create template structures",
        ticketId: 3,
      },
    ],
  },
  {
    name: "IN PROGRESS",
    color: "#8471F2",
    columnId: 2,
    tickets: [
      {
        title: "Design settings and search pages",
        ticketId: 1,
      },
      {
        title: "Add account management endpoints",
        ticketId: 2,
      },
      {
        title: "Design onboarding flow",
        ticketId: 3,
      },
      {
        title: "Add search enpoints",
        ticketId: 4,
      },
      {
        title: "Add authentication endpoints",
        ticketId: 5,
      },
    ],
  },
];

export default function Board() {
  return (
    <div className="board-container">
      {board.length > 0 ? (
        board.map((column) => {
          return (
          <div key={column.columnId} className="column-container">
            <div className="column-label">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 15 15"
              >
                <circle cx="7.5" cy="7.5" r="7.5" fill={column.color} />
              </svg>
              <p className="column-title">{column.name} ({column.tickets.length})</p>
            </div>
            <div className="tickets-container">
              {column.tickets.map((ticket) => (
                <div key={ticket.ticketId} className="ticket">
                  <p className="ticket-title">{ticket.title}</p>
                  <p className="ticket-subtasks">0 of 3 subtasks</p>
                </div>
              ))}
            </div>
          </div>
          )
        })
      ) : (
        <div className="empty-board">
          <p> This board is empty. Create a new column to get started.</p>
          <MainButton text={"+ Add New Column"} />
        </div>
      )}
    </div>
  );
}
