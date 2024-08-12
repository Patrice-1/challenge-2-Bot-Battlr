//import { useEffect } from "react";
import React, {useState,useEffect} from "react";
import BotCard from "./BotCard";

function BotCollection() {
  // Your code here
  const [bots,setBots] = useState([]);
  const [ newbot, newset ] = useState([]);

 

  useEffect(()=>{
    fetch("http://localhost:8002/bots")
   .then(response=>response.json())
   .then(data=> setBots(data))
  },[])


  return (
    <div className="ui four column grid">
      <div className="row">
        <h3>Collection of all bots</h3>
        {bots.map((bot) => (
          <BotCard key={bot.id} bot={bot} />
        ))}
      </div>
    </div>
  );
}

export default BotCollection;
