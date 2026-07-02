const fs = require("fs");
const path = require("path");

function loadfile() {
  const filePath = path.join(__dirname, "tasks.json");
  //only string form, without utf buffer (raw bytes) returned instead of string
  const response = fs.readFileSync(filePath, "utf8");
  //conversion to javascript object
  return JSON.parse(response).tasks
}

function save(tasks) {
  //convert javascript back to string
  const changedTasks = JSON.stringify({
    tasks
  }, null, 4)
  //save back to file
  fs.writeFileSync("tasks.json", changedTasks)
}


function add(id, title, status) {
  let tasks = loadfile();
  const checktask = tasks.find(tasks => tasks.id == id)
  if (checktask == undefined) {
    tasks.push(
      {
        id, title, status
      }
    )
    save(tasks)
  }
  
  else {

    console.log("ID already exists, choose some other ID")
  }
}

function remove(id) {
  let tasks = loadfile();
  const index = tasks.findIndex(item => item.id == id)
  //if task exists
  if (index != -1) {
    //remove 1 item at that index
    tasks.splice(index, 1)
    save(tasks)
  }
  else {
    console.log("ID to be deleted not found")
  }
}

//marks task as done
function complete(id) {
  let tasks = loadfile();
  const requiredtask = tasks.find(tasks.id == id)
  if (save(tasks) != undefined) {
    requiredtask.status = "done"
    save(tasks)
  }
  else {
    console.log("Task with this Id doesnt exist")
  }
}

function list() {
  const tasks = loadfile();
  console.log(tasks)
}

const functionname = process.argv[2]
const id = process.argv[3]
const title = process.argv[4]
const status = process.argv[5]

if (functionname == "Add" || functionname == "add") {
  add(Number(id), title, status)
}
else if (functionname == "remove" || functionname == "Remove") {
  loadfile();
  remove(Number(id));
}
else if (functionname == "list" || functionname == "List") {
  list();
}