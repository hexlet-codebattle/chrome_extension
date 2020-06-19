import React from 'react';
import './App.scss';

export default ({ state }) => {
  console.log('State in popup = ', state);
  const { active_games: activeGames } = state.games;
  const showGameInfo = () => activeGames.map(game => {
    const {
      id, level, players, state: gameState, inserted_at: startedAt,
    } = game;
    const link = `https://codebattle.hexlet.io/games/${id}`;
    const showPlayersInfo = ([first, second]) => (
      <div>
        <div className="first">
          <span>{first.name}</span>
          <span>{first.editor_lang}</span>
          <span>{first.raiting}</span>
        </div>
        {second && (
        <div className="second">
          <span>{second.name}</span>
          <span>{second.editor_lang}</span>
          <span>{second.raiting}</span>
        </div>
        )}
      </div>
    );
    return (
      <tr key={id}>
        <td>{level}</td>
        <td>{gameState}</td>
        <td>{showPlayersInfo(players)}</td>
        <td>{startedAt}</td>
        <td>
          <a href={link} className="btn btn-primary" tabIndex="-1" role="button" aria-disabled="true" target="_ablank">Join</a>
        </td>
      </tr>
    );
  });
  return (
    <>
      <header>
        <a href="https://codebattle.hexlet.io/" target="_ablank">
          <img src="../../assets/icon-48.png" alt="Logo" />
          <h3>Welcome to CodeBattle</h3>
        </a>
      </header>
      <main>
        <table className="table table-sm">
          <thead>
            <tr>
              <th>Level</th>
              <th>Game status</th>
              <th>Players</th>
              <th>Game started at:</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {activeGames && showGameInfo()}
          </tbody>
        </table>
      </main>
      <footer />
    </>
  );
};
