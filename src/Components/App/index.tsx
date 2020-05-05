import React from 'react';
import PlayBoard from "../PlayBoard";
import "./index.scss";

const App: React.FC = ():JSX.Element =>{
    return (
        <div className="playboard-container" >
            <PlayBoard/>
        </div>
    )
} 


export default App;