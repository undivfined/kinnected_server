import app from './server/app'

const PORT = 9090

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})