import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const initialBoard = [
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
        ticketId: 4,
      },
      {
        title: "Add account management endpoints",
        ticketId: 5,
      },
      {
        title: "Design onboarding flow",
        ticketId: 6,
      },
      {
        title: "Add search enpoints",
        ticketId: 7,
      },
      {
        title: "Add authentication endpoints",
        ticketId: 8,
      },
    ],
  },
];

function Board() {
  const [columns, setColumns] = useState(initialBoard);

  const handleDropTicket = (ticketId, toColumnId) => {
    let newColumns = columns.map((column) => ({
      ...column,
      tickets: column.tickets.filter((ticket) => ticket.ticketId !== ticketId),
    }));

    const ticket = columns
      .flatMap((column) => column.tickets)
      .find((ticket) => ticket.ticketId === ticketId);

    setColumns(
      newColumns.map((column) => {
        if (column.columnId === toColumnId) {
          return { ...column, tickets: [...column.tickets, ticket] };
        }
        return column;
      })
    );
  };

  return (
    <div className="board-container">
      {initialBoard.length > 0 ? (
        <>
          {columns.map((column) => (
            <Column
              key={column.columnId}
              column={column}
              onDropTicket={handleDropTicket}
            />
          ))}
          <div className="container-add-new-column">
            <p>+ New column</p>
          </div>
        </>
      ) : (
        <div className="empty-board">
          <p>This board is empty. Create a new column to get started.</p>
          <MainButton text="+ Add New Column" />
        </div>
      )}
    </div>
  );
  
}

function Column({ column, onDropTicket }) {
  const [, dropRef] = useDrop({
    accept: "TICKET",
    drop: (item, monitor) => {
      if (monitor.isOver()) {
        onDropTicket(item.id, column.columnId);
      }
    },
  });

  return (
    <div ref={dropRef} className="column-container">
      <div className="column-label">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 15 15"
        >
          <circle cx="7.5" cy="7.5" r="7.5" fill={column.color} />
        </svg>

        <div className="column-title">{column.name}({column.tickets.length})</div>
      </div>
      <div className="tickets-container">
        {column.tickets.map((ticket, index) => (
          <Ticket key={ticket.ticketId} ticket={ticket} />
        ))}
      </div>
    </div>
  );
}

function Ticket({ ticket, index, onMoveTicket, columnId }) {
  const [{ isDragging }, dragRef, preview] = useDrag({
    type: "TICKET",
    item: () => {
      return { id: ticket.ticketId, index, columnId };
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={dragRef}
      className="ticket"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      
      <p className="ticket-title">#{ticket.ticketId} - {ticket.title}</p>
      <p className="ticket-subtasks">0 of 3 subtasks</p>
    </div>
  );
}

export default Board;
