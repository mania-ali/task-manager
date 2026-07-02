# Task Manager CLI

A simple command-line Task Manager built using Node.js and JavaScript.

## Features

- Add new tasks
- Remove tasks
- List all tasks
- Mark tasks as completed
- Store tasks in a JSON file
- Automatically remove expired tasks based on due date
- Validate due date format (`YYYY-MM-DD`)

## Technologies Used

- JavaScript
- Node.js
- File System (`fs`)
- Path Module (`path`)
- Git & GitHub

## Installation

Clone the repository:

```bash
git clone https://github.com/<your-username>/<repository-name>.git
```

Install dependencies:

```bash
npm install
```

## Usage

Add a task:

```bash
node file.js add 1 "Practice JavaScript" pending 2026-07-10
```

List all tasks:

```bash
node file.js list
```

Mark a task as completed:

```bash
node file.js complete 1
```

Remove a task:

```bash
node file.js remove 1
```

## Project Structure

```
.
├── file.js
├── tasks.json
├── package.json
├── package-lock.json
└── README.md
```

## Future Improvements

- Edit existing tasks
- Search tasks by title
- Filter tasks by status
- Sort tasks by due date
