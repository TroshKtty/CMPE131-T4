import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (_, res) => {
  res.json({ message: "hello world" });
});

app.listen(port, () => console.log(`Server is up on port ${port}`));
