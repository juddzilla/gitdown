import Instance from '../instance/connection';

import {
  keyEqualsOrIn,
  keyEqualsStringArray,
  keyEqualsStringArrayAnd,
  keyInStringArray,
} from '../utils.js';

export default (id) => {
  const DB = Instance();
  const parts = [`
    SELECT
    documents.*,
    document_paths.path as path,
    document_paths.filename as filename,
    group_concat(DISTINCT document_tags.tag) as tags,
    group_concat(DISTINCT document_users.user_id) as users
    FROM documents
    LEFT JOIN    
    document_tags
    ON documents.id = document_tags.document_id
    LEFT JOIN
    document_paths
    ON documents.id = document_paths.document_id
    LEFT JOIN
    document_users
    ON documents.id = document_users.document_id
  `];

  if (id) {
    parts.push(`WHERE documents.id = '${id}'`);
  }

  parts.push('GROUP BY documents.id');

  const statement = parts.join(' ');
  const prepared = DB.prepare(statement);

  try {
    const executed = prepared.all();
    if (!executed.length) {
      return [];
    }
    return executed.map(document => {
      const {
        filename,
        path,
        tags,
        users,
        ...rest
      } = document;
      const response = {
        filepath: `${path}/${filename}`,
        tags: tags ? tags.split(',') : null,
        users: users ? users.split(',') : null,
        ...rest,
      };
      return response;
    });
    // return executed.length ? executed : false;
  } catch (err) {
    return { error: err };
  }
};
//
// const statement = `
//     SELECT
//       games.completed_at,
//       games.duration,
//       games.player_id,
//       games.players,
//       games.id,
//       games.public_hash,
//       games.started_at,
//       games.user_id,
//       JSON_AGG(game_attempts.*) AS attempts
//     FROM
//       games
//     LEFT JOIN
//       game_attempts ON games.id = game_attempts.game_id
//     WHERE
//       (games.user_id = '${userId}' OR games.player_id = '${userId}')
//       AND
//       (games.started_at IS NOT NULL AND games.completed_at IS NOT NULL)
//     AND
//     game_attempts.attempt IS NOT NULL
//       GROUP BY
//       games.id
//      ;
//   `;