import { useState, useEffect } from "react";
import PersistentDrawerLeft from "./components/PersistentDrawerLeft";
import { ModalProvider } from "./components//ModalContext";
import { KanbanProvider } from "./components//KanbanContext";

import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function App() {
  const [darkTheme, setDarkTheme] = useState(false);

  const handleDarkTheme = () => {
    setDarkTheme(!darkTheme);
    console.log(darkTheme);
  };

  useEffect(() => {
    document.body.classList.toggle("dark");
  }, [darkTheme]);

  return (
    <ModalProvider>
      <KanbanProvider>
        <div className="container">
          <PersistentDrawerLeft
            darkTheme={darkTheme}
            handleDarkTheme={handleDarkTheme}
          />
        </div>
      </KanbanProvider>
    </ModalProvider>
  );
}

export default App;
