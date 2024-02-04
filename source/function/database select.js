
module.exports = {
  async selectDatabase(userId, db)  {
    db.run(`INSERT OR IGNORE INTO currency (id) VALUES (?)`, [userId]);
    db.run(`INSERT OR IGNORE INTO users (id) VALUES (?)`, [userId]);
    db.run(`INSERT OR IGNORE INTO message (id) VALUES (?)`, [userId]);
    db.get(`SELECT
              (SELECT message_count FROM message WHERE id = ?) AS message_count,
              (SELECT lvl FROM message WHERE id = ?) AS lvl,
              (SELECT virt FROM currency WHERE id = ?) AS virt,
              (SELECT total_time FROM users WHERE id = ?) AS total_time
           `, [userId, userId, userId, userId], (err, row) => {
      return {
        messageCount: row.message_count,
        virtCount: row.virt,
        totalTime: row.total_time,
        lvl: row.lvl,
      }
    });
    
  }
}