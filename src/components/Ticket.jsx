import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

function Ticket({ ticket, index, onDropTicket, columnId }) {
  const [{ isDragging }, dragRef] = useDrag({
    type: "TICKET",
    item: { ticketId: ticket.ticketId, columnId, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const dropRef = useRef(null);

  const [, ticketDropRef] = useDrop({
    accept: "TICKET",
    hover: (item, monitor) => {
      if (!dropRef.current) return;

      if (item.ticketId === ticket.ticketId) return;

      const hoverIndex = index;
      const hoverBoundingRect = dropRef.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (item.index < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (item.index > hoverIndex && hoverClientY > hoverMiddleY) return;

      item.targetIndex = hoverIndex;
      item.targetColumnId = columnId;
    },
  });

  ticketDropRef(dropRef);

  return (
    <div ref={(node) => dragRef(ticketDropRef(node))} className="ticket" style={{ opacity: isDragging ? 0.5 : 1 }}>
      <p className="ticket-title">
        #{ticket.ticketId} - {ticket.title}
      </p>
      <p className="ticket-subtasks">0 of 3 subtasks</p>
    </div>
  );
}

export default Ticket;
