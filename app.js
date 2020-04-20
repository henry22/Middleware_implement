const express = require('express')
const app = express()
const port = 3000

const getDurationInMilliseconds = start => {
    const NS_PER_SEC = 1e9
    const NS_TO_MS = 1e6
    const diff = process.hrtime(start)

    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS
}

app.use((req, res, next) => {
    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    }
    const now = new Date().toLocaleDateString('zh-TW', options)
    const method = req.method
    const url = req.url
    const start = process.hrtime()

    res.on('finish', () => {
        const durationInMilliseconds = getDurationInMilliseconds(start)
        console.log(`${now} | ${method} from ${url} | total time: ${durationInMilliseconds.toLocaleString()}ms`)
    })

    next()
})

// 列出全部 Todo
app.get('/', (req, res) => {
    res.send('列出全部 Todo')
})

// 新增一筆 Todo 頁面
app.get('/new', (req, res) => {
    res.send('新增 Todo 頁面')
})

// 顯示一筆 Todo 的詳細內容
app.get('/:id', (req, res) => {
    res.send('顯示一筆 Todo')
})

// 新增一筆  Todo
app.post('/', (req, res) => {
    res.send('新增一筆  Todo')
})

// 刪除一筆 Todo
app.delete('/:id/delete', (req, res) => {
    res.send('刪除 Todo')
})

app.use((req, res, next) => {
    return res.status(404).send('Page not found')
})

app.listen(port, () => console.log(`App running on port ${port}`))