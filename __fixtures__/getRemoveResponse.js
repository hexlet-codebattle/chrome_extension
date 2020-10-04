const getRemoveResponse = gameId => ({
  data: JSON.stringify([null, null, 'lobby', 'game:remove', { id: gameId }]),
});

export default getRemoveResponse;
