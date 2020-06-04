const query = require('../utils/sqldeal')

const info = (req, res) => {
  query(`select * from book_info where book_id<100`, [1], (err, results, fields) => {
    if (err) throw err
    res.send(results)
  })
}
console.log('get all book info...')
module.exports = info