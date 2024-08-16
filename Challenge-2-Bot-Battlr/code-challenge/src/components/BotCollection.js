import BotCard from "./BotCard";

function BotCollection({ bots = [], enlistBot, dischargeBot, handleBotClick }) {
  return (
    <div className="ui four column grid">
      <div className="row">
        {bots.map(bot => (
          <BotCard 
            key={bot.id} 
            bot={bot} 
            enlistBot={enlistBot}
            dischargeBot={dischargeBot}
            handleBotClick={handleBotClick} 
          />
        ))}
      </div>
    </div>
  );
}

export default BotCollection;