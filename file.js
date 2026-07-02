const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "tasks.json");

function loadfile() {
    try {

        //check for if file deosnt exit, create one
        if (!fs.existsSync(filePath)) {
            const initialData = {
                tasks: []
            };

            //initialising the newly created file with data 
            fs.writeFileSync(
                filePath,
                JSON.stringify(initialData, null, 4)
            );
            return [];
        }

        //utf to avoid buffer(raw bytes) solution
        const response = fs.readFileSync(filePath, "utf8");
        //conversion to javascript
        return JSON.parse(response).tasks;
    }
    catch (err) {
        console.log(err)
        return [];
    }


}

function save(tasks) {
    try {

        //convert javascript back to string
        const changedTasks = JSON.stringify({
            tasks
        }, null, 4)
        //save back to file
        fs.writeFileSync(filePath, changedTasks)
    }
    catch (err) {
        console.log(err)
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

function add(id, title, status, createdAt, dueDate) {
    try {
        ///regex/.test(string) 
        if (!/^\d{4}-\d{2}-\d{2}$/.test(dueDate)) {
            console.log("Please enter date in YYYY-MM-DD format");
            process.exit(1);
        }

        let tasks = loadfile();
        const requiredtask = tasks.find(task => task.id == id);
        if (requiredtask == undefined) {
            tasks.push(
                {
                    id, title, status, createdAt, dueDate
                }
            )
            save(tasks)
        }
        else {

            console.log("ID already exists, choose some other ID")
            process.exit(1);
        }
    }
    catch (err) {
        console.log(err)
    }


}

function remove(id) {
    try {
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
            process.exit(1);
        }
    }
    catch (err) {
        console.log(err)
    }


}

//marks task as done
function complete(id) {
    try {
        let tasks = loadfile();
        const requiredTask = tasks.find(task => task.id == id);
        if (requiredTask != undefined) {
            requiredTask.status = "completed"
            save(tasks)
        }
        else {
            console.log("Task with this Id doesnt exist")
            process.exit(1);
        }
    }
    catch (err) {
        console.log(err)
    }


}

function list() {
    try {
        const tasks = loadfile();
        console.log(tasks)
    }
    catch (err) {
        console.log(err)
    }


}

function entry(){
checkDueDate();
const functionname = process.argv[2]
const id = process.argv[3]
const title = process.argv[4]
const status = process.argv[5]
const dueDate = process.argv[6]
const createdAt = new Date().toISOString().split("T")[0];

if (functionname.toLowerCase() == "add") {
    //no missing parameter
    if (!id || !title || !status || !dueDate) {
        console.log('node file.js add <id> "<title>" <status> <YYYY-MM-DD>');
        process.exit(1);
    }
    //if id=abc or any non integer, it returns Nan(not a number)
    if (isNaN(Number(id))) {
        console.log("ID must be a number.");
        process.exit(1);
    }

    //status either pending or completed
    limitedStatus = ['pending', 'completed']
    if (!limitedStatus.includes(status.toLowerCase())) {
        console.log("Status must be either 'pending' or 'completed'.");
        process.exit(1);
    }

    add(Number(id), title, status, createdAt, dueDate);
}

else if (functionname.toLowerCase() == "remove") {

    remove(Number(id));
}
else if (functionname.toLowerCase() == "list") {
    list();
}
else if (functionname.toLowerCase() == "complete") {
    complete(Number(id));
}
else {
    console.log("wrong function name ")
}

}

entry()

