import React from "react";
import NewUser from "./NewUser";
import './App.css';


//import BASE_URL from './config.js';



function App() {


 /*  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    console.log("HERE");
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []); */


  return (
    <div className="App">
      <header className="App-header">
        
        {/* <p>
          {!data }
        </p> */}

        <NewUser></NewUser>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

      </header>

    </div>
  );
}

export default App;
