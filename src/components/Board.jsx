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
        indexColumn: 0,
      },
      {
        title: "Build UI for search",
        ticketId: 2,
        indexColumn: 1,
      },
      {
        title: "Create template structures",
        ticketId: 3,
        indexColumn: 2,

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
        indexColumn: 0,

      },
      {
        title: "Add account management endpoints",
        ticketId: 5,
        indexColumn: 1,

      },
      {
        title: "Design onboarding flow",
        ticketId: 6,
        indexColumn: 2,

      },
      {
        title: "Add search enpoints",
        ticketId: 7,
        indexColumn: 3,

      },
      {
        title: "Add authentication endpoints",
        ticketId: 8,
        indexColumn: 4,

      },
    ],
  },
];

function Board() {
  const [columns, setColumns] = useState(initialBoard);

  const handleDropTicket = (ticketId, toColumnId) => { //Get the ticket id dropped and its current column
    let newColumns = columns.map((column) => ({  //Creation of a new array based on the inital column array to a projection of the new column 
      ...column,
      tickets: column.tickets.filter((ticket) => ticket.ticketId !== ticketId), //Upate the column without this ticket by filterting
    }));

    const ticket = columns
      .flatMap((column) => column.tickets) //Allow us to get only an array with all tickets, to manage the selection of the ticket without taking into the column
      .find((ticket) => ticket.ticketId === ticketId);

    setColumns(
      newColumns.map((column) => {
        if (column.columnId === toColumnId) { //We compare the inital column array and the newColumns array to change the columns if needed
          return { ...column, tickets: [...column.tickets, ticket] };
        }
        return column; //We return an array with the new positions 
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
  const [, dropRef] = useDrop({ //Hook to allow to drop
    accept: "TICKET", //The type of element accepted to drop 
    drop: (item, monitor) => { //In case of a drop
      if (monitor.isOver()) { //If the ticket is over the column
        onDropTicket(item.id, column.columnId); //Launch the function handleDropTicket to redefine the column of the ticket 
      }
    },
  });

  return (//dropRef link the column to the drop 
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
    type: "TICKET", //Define the type of the element dragable (useful above on the drog side)
    item: () => { //Return the data of the object that we can drag 
      return { id: ticket.ticketId, indexColumn: ticket.indexColumn, columnId };
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(), //Boolean to know if the element is currently draged or not, allow us to impact some css effects
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
