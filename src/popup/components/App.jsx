import React from 'react';
import './App.scss';
import UserName from './UserName';

const getAction = gameStatus => {
  switch (gameStatus) {
    case 'playing': {
      return 'show';
    }
    case 'waiting_opponent': {
      return 'join';
    }
    default:
      return null;
  }
};

const GameLevelBadge = ({ level }) => (
  <div
    className="text-center"
    data-toggle="tooltip"
    data-placement="right"
    title={level}
  >
    <img width="20px" alt={level} src={`/assets/levels/${level}.svg`} />
  </div>
);

const Players = ({ players }) => {
  if (players.length === 1) {
    return (
      <td className="p-1 align-middle text-nowrap">
        <div className="d-flex align-items-center">
          <UserName user={players[0]} />
        </div>
      </td>
    );
  }
  return (
    <>
      <td className="p-1 align-middle text-nowrap cb-username-td text-truncate">
        <div className="d-flex align-items-center">
          <UserName user={players[0]} />
        </div>
        <div className="pl-3 d-flex">
          VS
        </div>
        <div className="d-flex align-items-center">
          <UserName user={players[1]} />
        </div>
      </td>
    </>
  );
};

const getLink = id => `https://codebattle.hexlet.io/games/${id}`;

const ActiveGames = ({ games }) => (
  <div className="table-responsive">
    <table className="table table-striped cb-border-gray mb-0">
      <thead className="text-center">
        <tr>
          <th className="p-3 border-0">Level</th>
          <th className="p-3 border-0">State</th>
          <th className="p-3 border-0 text-center">
            Players
          </th>
          <th className="p-3 border-0">Actions</th>
        </tr>
      </thead>
      <tbody>
        {games.map(({
          id, level, state, players,
        }) => (
          <tr key={id} className="text-dark game-item">
            <td className="p-1 align-middle text-nowrap">
              <GameLevelBadge level={level} />
            </td>
            <td className="p-1 align-middle text-center text-nowrap">
              <img
                width="20px"
                alt={state}
                src={
                    state === 'playing'
                      ? '/assets/images/playing.svg'
                      : '/assets/images/waitingOpponent.svg'
                  }
                title={state}
              />
            </td>
            <Players gameId={id} players={players} />
            <td className="p-1 align-middle text-center">
              {getAction(state) && (
              <a href={getLink(id)} className="cb-a btn btn-outline-primary btn-sm btn-outline-orange" tabIndex="-1" role="button" aria-disabled="true" target="_ablank">
                {getAction(state)}
              </a>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ({ state }) => {
  const { active_games: activeGames } = state.games;
  return (
    <>
      <header className="cb-a d-flex justify-content-between align-content-center mb-3">
        <a href="https://codebattle.hexlet.io/" target="_ablank">
          <img className="h-auto" src="../../assets/logo.svg" alt="Logo" />
        </a>
        <a href="https://codebattle.hexlet.io/" target="_ablank">
          <div className="cb-a btn  btn-outline-primary btn-outline-orange">Welcome to CodeBattle</div>
        </a>
      </header>
      <main>
        {activeGames.length > 0 ? <ActiveGames games={activeGames} />
          : <div className="cb-border-gray text-center">No games available</div>}
      </main>
      <footer />
    </>
  );
};
