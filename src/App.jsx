import { useState, useEffect } from 'react'
import PersistentDrawerLeft from "./components/PersistentDrawerLeft"
import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';



function App() {     
  const [count, setCount] = useState(0)
  const [darkTheme, setDarkTheme] = useState(false);

  const handleDarkTheme = () => {
    setDarkTheme(!darkTheme);
    console.log(darkTheme)
  };


  useEffect(() => {
    document.body.style.backgroundColor = darkTheme ? "#2B2C37" : "#FFF)";
    document.body.style.color = darkTheme ? "828FA3" : "black"; 

  }, [darkTheme]); 

  return (
    <div className="container">
      <PersistentDrawerLeft darkTheme={darkTheme} handleDarkTheme={handleDarkTheme}/>
    </div>  
  )
}  

export default App
