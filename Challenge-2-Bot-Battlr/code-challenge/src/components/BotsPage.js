import React, { useState, useEffect } from "react";
import YourBotArmy from "./YourBotArmy";
import BotCollection from "./BotCollection";
import BotSpecs from "./BotSpecs";

function BotsPage() {
  const [bots, setBots] = useState([]);
  const [yourBotArmy, setYourBotArmy] = useState([]);
  const [selectedBot, setSelectedBot] = useState(null);
  const [view, setView] = useState("collection"); 

  useEffect(() => {
    fetch("http://localhost:8002/bots")
      .then(response => response.json())
      .then(data => setBots(data));
  }, []);

  const enlistBot = (bot) => {
    if (!yourBotArmy.find(b => b.id === bot.id)) {
      setYourBotArmy([...yourBotArmy, bot]);
      setView("collection");
    }
  };

  const releaseBot = (bot) => {
    setYourBotArmy(yourBotArmy.filter(b => b.id !== bot.id));
  };

  const dischargeBot = (bot) => {
    fetch(`http://localhost:8002/bots/${bot.id}`, { method: "DELETE" })
      .then(() => {
        setBots(bots.filter(b => b.id !== bot.id));
        setYourBotArmy(yourBotArmy.filter(b => b.id !== bot.id));
      });
  };

  const handleBotClick = (bot) => {
    setSelectedBot(bot);
    setView("specs");
  };

  const goBack = () => {
    setSelectedBot(null);
    setView("collection");
  };

  return (
    <div>
      <YourBotArmy bots={yourBotArmy} releaseBot={releaseBot} dischargeBot={dischargeBot} />
      {view === "collection" ? (
        <BotCollection 
          bots={bots} 
          enlistBot={enlistBot} 
          dischargeBot={dischargeBot}
          handleBotClick={handleBotClick} 
        />
      ) : (
        <BotSpecs bot={selectedBot} goBack={goBack} enlistBot={enlistBot} />
      )}
    </div>
  );
}

export default BotsPage;