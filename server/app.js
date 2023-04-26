import express from "express";

const app = express();
app.use("/", (req, res) => {
  res.json({ message: 'server is running..' });
});

const PORT = 5051;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));