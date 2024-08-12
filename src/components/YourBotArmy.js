import React, { useState, useEffect } from "react";
import BotCard from "./BotCard";

function YourBotArmy() {
  //your bot army code here...
  const [bots, setBots] = useState([]);
  const [newBot, setNewBot] = useState({name : ""});

  useEffect(() => {
    // fetch your bot army data from your backend API
    fetch("http://localhost:8002/bots").then(
      (response)=> response.json()).then(bots => setBots(bots))}, []);
    
      const botArmy = bots.map((bot, index) => <BotCard key={index} bot={bot} onDelete={()=>handleDelete(bot)} /> );

      const handleDelete = (bot) => {
        // add your code to delete a bot from your bot army
        fetch(`http://localhost:8002/bots/${bot.id}`, { method: 'DELETE' })
       .then(() => setBots(bots.filter(b => b.id!==bot.id)))
      }

      const yourBotArmy = (
        <div className="bot-army" >
          {botArmy}
        </div>      
        );
        
        const handleEnlistBot = () => {
          // add your code to enlist a new bot to your bot army
          fetch("http://localhost:8002/bots", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newBot),
          }).then((response) => response.json()).then((bot) => setBots([...bots, bot]));
          setNewBot({name: ""});
        };

        const botArmyList = (
          <div>
            {yourBotArmy}
            <div className="row">
              <div className="ui panel">
                <h2>Enlist new bot</h2>
                <input type="text" onChange={(e) => setNewBot({name: e.target.value})} />
                <button onClick={()=> handleEnlistBot(newBot)}>Enlist</button>
              </div>
            </div>
          </div>
        )


  return (
    <div className="ui segment inverted olive bot-army">
      <div className="ui five column grid">
        <div className="row bot-army-row">
          Your Bot Army
          {botArmyList }
        </div>
      </div>
    </div>
  );
}

export default YourBotArmy;
