// Contact form backend (Node.js / Express)
// Run: node backend/server.js

import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body
  console.log('Contact form submission:', { name, email, message })
  res.json({ success: true, message: 'Message received!' })
})

app.listen(3001, () => console.log('Backend running on http://localhost:3001'))
