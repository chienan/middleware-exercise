const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')

//calculate the time
const getDuration = start => {
  const NS_PER_SEC = 1e9 //convert to nanoseconds
  const NS_TO_MS = 1e6 //convert to milliseconds
  const diff = process.hrtime(start)
  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS
}

//logging timestamp, request method, url, and duration
app.use(function (req, res, next) {
  let currentDatetime = new Date()
  let method = req.method
  let url = req.url
  let formattedDate =
    currentDatetime.getFullYear() +
    '-' +
    (currentDatetime.getMonth() + 1) +
    '-' +
    currentDatetime.getDate() +
    ' ' +
    currentDatetime.getHours() +
    ':' +
    currentDatetime.getMinutes() +
    ':' +
    currentDatetime.getSeconds()
  const start = process.hrtime()
  const duration = getDuration(start)
  let log = `${formattedDate}｜${method} from ${url}｜total time:${duration.toLocaleString()} ms`

  console.log(log)
  fs.appendFile("request_logs.txt", log + '\n', err => {
    if (err) {
      console.log(err)
    }
  })
  next();
})


app.listen(port, () => {
  console.log(`App running on port ${port}`)
})

app.get('/', (req, res) => {
  res.send('列出全部 Todo')
})

app.get('/new', (req, res) => {
  res.send('新增 Todo 頁面')
})

app.get('/:id', (req, res) => {
  res.send('顯示一筆 Todo')
})

app.post('/', (req, res) => {
  res.send('新增一筆  Todo')
})