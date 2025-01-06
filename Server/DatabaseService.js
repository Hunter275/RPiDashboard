const sqlite = require('better-sqlite3');
const path = require('path');
const db = new sqlite(path.resolve(__dirname + '/database.db'), {fileMustExist: true});

function query(sql, params) {
  if (!params) {
    return db.prepare(sql).all();
  }
  return db.prepare(sql).all(params);
}

function createLog(title, msg) {
  const sql = `INSERT INTO logs (title, msg) VALUES ('${title}', '${msg}')`
  console.log(sql);
  db.prepare(sql).run()
}

module.exports = {
  query,
  createLog
}
