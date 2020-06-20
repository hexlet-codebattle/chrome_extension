import React from 'react';
import './App.scss';
import levelToClass from '../config/levelToClass';
import UserName from './UserName';

const renderGameLevelBadge = level => (
  <div>
    <span className={`badge badge-pill badge-${levelToClass[level]} mr-1`}>
      {level}
    </span>
  </div>
);
const dateToHHMM = date => {
  const formatLeadZero = num => ((num < 10) ? `0${num}` : num);
  const hour = formatLeadZero(date.getHours());
  const minute = formatLeadZero(date.getMinutes());
  return `${hour}:${minute}`;
};

export default ({ state }) => {
  console.log('State in popup = ', state);
  const { active_games: activeGames } = state.games;
  const showGameInfo = () => activeGames.map(game => {
    const {
      id, level, players, state: gameState, inserted_at: startedAt,
    } = game;
    const link = `https://codebattle.hexlet.io/games/${id}`;
    const showPlayersInfo = ([first]) => (
      <span className="first">
        <UserName user={first} />
      </span>
    );
    return (
      <tr key={id}>
        <td>{renderGameLevelBadge(level)}</td>
        <td>{gameState}</td>
        <td>{showPlayersInfo(players)}</td>
        <td>{dateToHHMM(new Date(startedAt))}</td>
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
              <th>Time</th>
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
