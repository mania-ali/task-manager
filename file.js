const fs = require("fs");
const path = require("path");

 function loadfile() {
    try {
        const filePath = path.join(__dirname, "tasks.json");
          //only string form, without utf buffer (raw bytes) returned instead of string
          const response = fs.readFileSync(filePath, "utf8");
          //conversion to javascript object
          return JSON.parse(response).tasks
    }
    catch (err) {
        console.log(err)
    }
    finally {
        console.log("loading done")
    }

}

 function save(tasks) {
    try{
        
//convert javascript back to string
    const changedTasks = JSON.stringify({
        tasks
    }, null, 4)
    //save back to file
     fs.writeFileSync("tasks.json", changedTasks)
    }
    catch(err){
console.log(err)
    }
    finally{
console.log("Saved!")
    }
    
}

function checkDueDate() {
    try {
        const today = new Date().toISOString().split("T")[0];

        const tasks = loadfile();

        const filteredTasks = tasks.filter(task => task.dueDate >= today);

        save(filteredTasks);
    }
    catch (err) {
        console.log(err);
    }
}

 function add(id, title, status,createdAt,dueDate) {
    try{
         if (!/^\d{4}-\d{2}-\d{2}$/.test(dueDate)) {
        console.log("Please enter date in YYYY-MM-DD format");
        return;
    }

let tasks =  loadfile();
    const requiredtask = tasks.find(task => task.id == id);
    if (requiredtask == undefined) {
        tasks.push(
            {
                id, title, status,createdAt,dueDate
            }
        )
         save(tasks)
    }
    else {

        console.log("ID already exists, choose some other ID")
    }
    }
    catch(err){
console.log(err)
    }
    finally{
        console.log("Sucessfully added task!!")
    }
    
}

 function remove(id) {
    try{
let tasks =  loadfile();
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
    catch(err){
    console.log(err)
    }
    finally{
        console.log("Sucessfully deleted ID!!")
    }
    
}

//marks task as done
 function complete(id) {
    try{
    let tasks =  loadfile();
    const requiredTask = tasks.find(task => task.id == id);
    if (requiredTask != undefined) {
        requiredTask.status = "done"
         save(tasks)
    }
    else {
        console.log("Task with this Id doesnt exist")
    }
    }
    catch(err){
    console.log(err)
    }
    finally{
        console.log("Completed ID successfully!")
    }

}

 function list() {
    try{
    const tasks =  loadfile();
    console.log(tasks)
    }
    catch(err){
console.log(err)
    }
    finally{
        console.log("Successfully printed list")
    }
   
}


checkDueDate();
const functionname = process.argv[2]
const id = process.argv[3]
const title = process.argv[4]
const status = process.argv[5]
const dueDate=process.argv[6]
const createdAt=new Date().toISOString().split("T")[0];

if (functionname == "add" || functionname == "Add") {
    add(Number(id), title, status,createdAt,dueDate);
}
else if (functionname == "remove" || functionname == "Remove") {

    remove(Number(id));
}
else if (functionname == "list" || functionname == "List") {
    list();
}
else if (functionname == "complete" || functionname == "Complete") {
    complete(id);
}
