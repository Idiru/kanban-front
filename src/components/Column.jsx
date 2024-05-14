import React, { useRef } from "react";
import { useDrop } from "react-dnd";
import Ticket from "./Ticket";

function Column({ column, onDropTicket }) {
  const dropRef = useRef(null);

  const [, columnDropRef] = useDrop({
    accept: "TICKET",
    hover: (item, monitor) => {
      if (!dropRef.current) return;

      const { ticketId, columnId } = item;
      const clientOffset = monitor.getClientOffset();
      const hoverBoundingRect = dropRef.current.getBoundingClientRect();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      const targetIndex = getTargetIndex(column.tickets, hoverClientY, hoverBoundingRect);

      if (column.columnId !== columnId) {
        item.targetColumnId = column.columnId;
        item.targetIndex = targetIndex;
      } else if (item.index !== targetIndex) {
        item.targetIndex = targetIndex;
      }
    },
    drop: (item, monitor) => {
      const { ticketId, targetColumnId, targetIndex } = item;
      onDropTicket(ticketId, targetColumnId || column.columnId, targetIndex);
    },
  });

  columnDropRef(dropRef);

  return (
    <div ref={dropRef} className="column-container">
      <div className="column-label">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15">
          <circle cx="7.5" cy="7.5" r="7.5" fill={column.color} />
        </svg>
        <div className="column-title">
          {column.name} ({column.tickets.length})
        </div>
      </div>
      <div className="tickets-container">
        {column.tickets.map((ticket, index) => (
          <Ticket key={ticket.ticketId} ticket={ticket} index={index} onDropTicket={onDropTicket} columnId={column.columnId} />
        ))}
      </div>
    </div>
  );
}

function getTargetIndex(tickets, hoverClientY, hoverBoundingRect) {
  const ticketHeight = hoverBoundingRect.height / (tickets.length || 1);
  let targetIndex = tickets.length;

  for (let i = 0; i < tickets.length; i++) {
    if (hoverClientY < (i + 0.5) * ticketHeight) {
      targetIndex = i;
      break;
    }
  }

  return targetIndex;
}

export default Column;
