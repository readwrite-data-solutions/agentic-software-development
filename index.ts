import express from "express";

const app = express();
const port = 3000;
app.use(express.json());

type Note = {
  id: number;
  title: string;
  body: string;
};

const notes: Note[] = [];

app.get("/", (_req, res) => {
  res.send("Hello from TypeScript");
});

app.get("/health", (req, res) => {
  res.json({ status: true, message: "Server is healthy" });
});

app.get("/notes", (req, res) => {
  res.json({ status: true, message: "Notes data", data: notes });
});
app.post("/create-note", (req, res) => {
  const note: Note = req.body;
  notes.push(note);
  return res.json({ status: true, message: "Your note has been saved" });
});

app.patch("/note/:id", (req, res) => {
  const id = Number(req.params.id);
  const findNote = notes.find((note) => note.id === id);
  if (!findNote)
    return res.status(404).json({ status: false, message: "Note not found!" });
  findNote.body = req.body.body || findNote.body;
  findNote.title = req.body.title || findNote.title;
  return res.json({status: true, message: "Note has been updated", data: findNote})
});


app.delete("/note/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = notes.findIndex((note) => note.id === id);
  if (index === -1)
    return res.status(404).json({ status: false, message: "Note not found!" });
  notes.splice(index, 1);
  return res.json({ status: true, message: "Note has been deleted" });
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
