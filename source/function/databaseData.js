

module.exports = {
  getVirtDatabase(userId, db) {

      db.get('SELECT virt FROM currency WHERE id = ?', [userId], (err, row) => {
        return row.virt;

    })
  }
}