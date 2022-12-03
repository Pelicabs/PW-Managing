const express = require("express")

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// req = request, res = response
app.get('/', (req, res) => {
    res.send("hi")
})

app.listen(3000, () => {
    console.log('server started on port 3000')
})
