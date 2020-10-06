const getUpdateResponse = (gameId, state = 'waiting_opponent') => (JSON.stringify([null,
  null,
  'lobby',
  'game:upsert',
  {
    game: {
      id: gameId,
      inserted_at: '2020-10-04T22:38:22',
      is_bot: false,
      level: 'elementary',
      players: [{
        id: 2782,
        name: 'H9ko',
        is_bot: false,
        github_id: 57991929,
        lang: 'js',
        editor_text: 'module.exports = () => {\n\n};',
        editor_lang: 'js',
        creator: true,
        game_result: 'undefined',
        check_result: {
          asserts: [], asserts_count: 0, output: '', result: '{"status": "info"}', status: 'initial', success_count: 0,
        },
        achievements: ['played_ten_games', 'played_fifty_games'],
        rating: 1152,
        rating_diff: 0,
      }],
      state,
      timeout_seconds: 7200,
      type: 'public',
    },
  }]));

export default getUpdateResponse;
