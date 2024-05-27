import React, { useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

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
  const [columns, setColumns] = useState(initialBoard); //State to manage the columns of the table

  // Function to manage the drag and drop from one column to another one
  const handleDropTicket = (ticketId, toColumnId, targetIndex) => {
    let ticket;
    const newColumns = columns.map((column) => {
      return {
        ...column,
        tickets: column.tickets.filter((t) => {
          if (t.ticketId === ticketId) {
            ticket = t;
            return false;
          }
          return true;
        }),
      };
    });

    if (ticket) {
      setColumns(
        newColumns.map((column) => {
          if (column.columnId === toColumnId) {
            const newTickets = [...column.tickets];
            newTickets.splice(targetIndex, 0, ticket);
            return {
              ...column,
              tickets: newTickets.map((t, index) => ({
                ...t,
                indexColumn: index,
              })),
            };
          }
          return column;
        })
      );
    }
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
  const dropRef = useRef(null);

  const [{ isOver }, columnDropRef] = useDrop({
    accept: "TICKET",
    drop: (item, monitor) => {
      if (monitor.didDrop()) return; // Ignore si déjà géré par Ticket
      const hoverIndex = column.tickets.length; // Placer à la fin si aucune cible spécifique n'est définie
      onDropTicket(item.ticketId, column.columnId, hoverIndex);

    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });


 

  columnDropRef(dropRef);

  return (
    <div
      ref={dropRef}
      className={`column-container ${isOver ? "drag-over" : ""} ${column.tickets.length == 0 ? "is-empty" : ""}`}
    >
      <div className="column-label">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 15 15"
        >
          <circle cx="7.5" cy="7.5" r="7.5" fill={column.color} />
        </svg>
        <div className="column-title">
          {column.name}({column.tickets.length})
        </div>
      </div>
      <div className="tickets-container">
        {column.tickets.map((ticket, index) => (
          <Ticket
            key={ticket.ticketId}
            ticket={ticket}
            index={index}
            onDropTicket={onDropTicket}
            columnId={column.columnId}
          />
        ))}
      </div>
    </div>
  );
}

function Ticket({ ticket, index, onDropTicket, columnId }) {
  const [{ isDragging }, dragRef] = useDrag({
    //isDragging allow us to know if we are currently dragging (useful to add some css effects) the element and the useDrag allows us to drag this element
    type: "TICKET",
    item: () => {
      //Function to send the data of the object dragged
      return {
        ticketId: ticket.ticketId,
        oldColumnId: columnId, // Renommé pour clarifier
        index,
        newColumnId: columnId,
      };
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const dropRef = useRef(null); //Initialization for the drop, will allow you to ref a DOM element to manage the drag and drop

  const [, ticketDropRef] = useDrop({
    accept: "TICKET",
    hover: (item, monitor) => {
      if (!dropRef.current) return;
      if (item.ticketId === ticket.ticketId) return;

      const hoverBoundingRect = dropRef.current.getBoundingClientRect();
      const clientOffset = monitor.getClientOffset();
      const isDraggingDownwards = item.index < index;
      let hoverClientY = clientOffset.y - hoverBoundingRect.top;
      let hoverMiddleY = (hoverBoundingRect.top - hoverBoundingRect.top) / 1;

      if (!isDraggingDownwards) {
        console.log("dragging down");
        hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 1;
        hoverClientY = clientOffset.y - hoverBoundingRect.top;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (
        (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) ||
        (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)
      ) {
        return;
      }

      onDropTicket(item.ticketId, columnId, hoverIndex);
      item.index = hoverIndex; // Mise à jour de l'index dans l'élément glissé
    },
  });

  ticketDropRef(dropRef);

  return (
    <div
      ref={(node) => dragRef((dropRef.current = node))}
      className={`ticket ${isDragging ? "dragging" : ""}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <p className="ticket-title">
        #{ticket.ticketId} - {ticket.title}
      </p>
      <p className="ticket-subtasks">0 of 3 subtasks</p>
    </div>
  );
}

export default Board;
