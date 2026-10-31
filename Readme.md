# Notes API

A small REST API for creating, reading, updating, and deleting notes, built with Express and TypeScript.

Notes are stored in memory, so they are lost whenever the server restarts.

## Prerequisites

- [Node.js](https://nodejs.org/) (includes npm)
- [Git](https://git-scm.com/)

## Getting started

1. Clone the repository and move into it:

   ```bash
   git clone https://github.com/readwrite-data-solutions/agentic-software-development.git
   cd agentic-software-development
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   The server runs on <http://localhost:3000> and restarts when you save a change.

4. In a second terminal, check that it is working:

   ```bash
   curl http://localhost:3000/health
   ```

   You should see:

   ```json
   { "status": true, "message": "Server is healthy" }
   ```

## Scripts

| Command             | What it does                                   |
| ------------------- | ---------------------------------------------- |
| `npm run dev`       | Starts the server and restarts it on changes   |
| `npm run typecheck` | Checks the TypeScript types without building   |

## API reference

| Method   | Path            | Description                                |
| -------- | --------------- | ------------------------------------------ |
| `GET`    | `/`             | Returns a welcome message                  |
| `GET`    | `/health`       | Checks that the server is running          |
| `GET`    | `/notes`        | Lists all notes                            |
| `POST`   | `/create-note`  | Creates a note                             |
| `PATCH`  | `/note/:id`     | Updates a note's title, body, or both      |
| `DELETE` | `/note/:id`     | Deletes a note                             |

`PATCH` and `DELETE` return a `404` status if no note has the given `id`.

## Usage examples

These commands work in Bash, including Git Bash on Windows. PowerShell handles the quotes differently, so the commands that send JSON may fail there.

### Create a note

The server does not generate ids, so include a unique numeric `id` in the request:

```bash
curl -X POST http://localhost:3000/create-note \
  -H "Content-Type: application/json" \
  -d '{"id": 1, "title": "First note", "body": "Hello"}'
```

### List all notes

```bash
curl http://localhost:3000/notes
```

### Update a note

Send only the fields you want to change:

```bash
curl -X PATCH http://localhost:3000/note/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated title"}'
```

### Delete a note

```bash
curl -X DELETE http://localhost:3000/note/1
```
