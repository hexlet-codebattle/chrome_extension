import React from 'react';
import LanguageIcon from './LanguageIcon';

const isValidUserInfo = user => (
  Boolean(user.id === 0 || user.rating)
);

const getName = ({ id, name }) => {
  if (id < 0) {
    return `${name} (bot)`;
  }

  return name;
};

const codebattleUrl = 'https://codebattle.hexlet.io/';

const getUserLink = id => `${codebattleUrl}users/${id}`;

const UserName = ({ user }) => {
  const userInfo = isValidUserInfo(user) ? user : 'errorValidInfo';

  const {
    id, lang, rating,
  } = userInfo;
  return (
    <div
      className="d-inline align-middle"
    >
      <div className="d-flex align-items-center">
        <a
          href={getUserLink(id)}
          target="_ablank"
          key={id}
          className="d-flex align-items-center mr-1 text-truncate"
        >
          <div className="text-truncate">{getName(user)}</div>
        </a>
        <LanguageIcon lang={lang} />
        <small width="100">
          {Number.isFinite(rating) && rating}
        </small>
      </div>
    </div>
  );
};

export default UserName;
