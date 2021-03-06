const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')

app.use(cors())
app.use(express.json())
require('dotenv').config()

app.get('/api/health', (req, res) => {
  res.send('Health check! Up and running')
})

app.post("/api/todos/", async (req, res) => {
  try {
    const { description } = req.body
    const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", [description])
    res.json(newTodo.rows[0])
  } catch (err) {
    console.error(err.message)
  }
})

app.get('/api/todos/', async (req, res) => {
  try {
    const allTodos = await pool.query('Select * from todo')
    res.json(allTodos.rows)
  } catch (err) {
    console.error(err.message)
  }
})

app.get('/api/todos/:id', async (req, res) => {
  try {
    const { id } = req.params
    const todo = await pool.query('SELECT * FROM todo WHERE id = $1', [id])
    res.json(todo.rows[0])
  } catch (err) {
    console.error(err.message)
  }
})

app.put('/api/todos/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { description } = req.body
    const todo = await pool.query('UPDATE todo SET description = $1 WHERE id = $2', [description, id])
    res.json(`${todo.rowCount} record updated`)
  } catch (err) {
    console.error(err.message)
  }
})

app.delete('/api/todos/:id', async (req, res) => {
  try {
    const { id } = req.params
    await pool.query('DELETE FROM todo WHERE id =$1', [id])
    res.json(`Todo with id ${id} was deleted`)
  } catch (err) {
    console.error(err.message)
  }
})

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Up and Running on Port ${port} ...`)
})