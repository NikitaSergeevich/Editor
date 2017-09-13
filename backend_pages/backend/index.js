const path = require('path')
const express = require('express')
const app = express()

app.use(express.static(path.join('public')))
app.listen(3000, error => {
    if(error) console.error(error)
    console.log('listening at port 3000')
})