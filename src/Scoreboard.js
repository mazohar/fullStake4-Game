import React from "react";

const Scoreboard = ({ scores }) => {
  const sortedScores = [...scores].sort(
    (a, b) => a.history.slice(-1)[0].score - b.history.slice(-1)[0].score
  );
  const lowestScores = sortedScores.slice(0, 3);

  return (
    <div className="scores">
      <h2>The winners:</h2>
      <ul>
        {lowestScores.map((player, index) => (
          <li key={index}>
            {player.name}: {player.history.slice(-1)[0].score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Scoreboard;
