import React, { createContext, useState, useContext } from 'react';
import { useModal } from './ModalContext';


const KanbanContext = createContext();

export function useKanban() {
  return useContext(KanbanContext);
}

export const KanbanProvider = ({ children }) => {
  const [boards, setBoards] = useState([
    // Exemple d'un board avec des colonnes et des tickets
    {
      id: 'board1',
      name: 'Mon Premier Board',
      columns: [
        {
          id: 'column1',
          title: 'À faire',
          tickets: [
            { id: 'ticket1', title: 'Tâche 1', description: 'Faire quelque chose' },
            { id: 'ticket2', title: 'Tâche 2', description: 'Faire autre chose' }
          ]
        },
        {
          id: 'column2',
          title: 'En cours',
          tickets: [
            { id: 'ticket3', title: 'Tâche 3', description: 'Développer une feature' }
          ]
        }
      ]
    }
  ]);
  
  // Fonctions pour manipuler les boards, les colonnes et les tickets
  const addBoard = (newBoard) => {
    setBoards(currentBoards => [...currentBoards, newBoard]);
    console.log("board added")
    handleClose()
  };

  // Fonctions pour ajouter/modifier/supprimer des colonnes et des tickets

  return (
    <KanbanContext.Provider value={{ boards, addBoard }}>
      {children}
    </KanbanContext.Provider>
  );
};
