const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/calculate', (req, res) => {
  const expression = req.body.expression;
  const result = calculateResult(expression);

  res.json({ result });
});

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});