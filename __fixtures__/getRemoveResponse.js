const getRemoveResponse = gameId => (JSON.stringify([null, null, 'lobby', 'game:remove', { id: gameId }]));

export default getRemoveResponse;
