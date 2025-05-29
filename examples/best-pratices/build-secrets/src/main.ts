import express, { Application } from 'express';

const port = process.env.PORT || 3000;

const app: Application = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
