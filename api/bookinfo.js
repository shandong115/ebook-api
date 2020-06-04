const query = require('../utils/sqldeal')

const info = (req, res) => {
  const id = req.query.id
  query(`select * from book_info where book_id=${id}`, [1], (err, results, fields) => {
    if (err) throw err
    res.send(results)
  })
}
console.log('get book info...')
module.exports = info