const { error } = require("console");
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ", 
});

console.log("Welcome to Todo CLI!");
console.log("--------------------");

const todoList = [];
const request = "(v) View • ( n ) New • (cX) Complete • (dX) Delete • (s) Save • (q) Quit";

function menu() {
  console.log(request);
  rl.prompt();
}

function view() {
  if (todoList.length <= 0) {
    console.log("List is empty...");
  } else {
    for (let i = 0; i < todoList.length; i++) {
        const entry = todoList[i];
        let status = entry.complete === true ? "✔" : " ";
        console.log(`${i} [${status}] ${entry.title}`);
    }
    // todoList.forEach((entry, index) => {
    //   let status = entry.complete === true ? "✔" : " ";
    //   console.log(`${index} [${status}] ${entry.title}`);
    // });
  }
  menu();
}

function add(entry = "") {
  if (entry === "") {
    console.log("What?");
    rl.prompt();
  } else {
    todoList.push({ complete: false, title: entry });
  }
}

function complete(n) {
  if (n >= 0 && n < todoList.length) {
    todoList[n].complete = true;
    console.log(`Completed "${todoList[n].title}"`);
  }
  menu();
}

function toDelete(n) {
  if (n >= 0 && n < todoList.length) {
    const deleted = todoList.splice(n, 1)[0];
    console.log(`Deleted "${deleted.title}"`);
  }
  menu();
}

//Stretch
function saveList(filename = "") {
  if (filename === "") {
    console.log("Where? (myTodos.json)");
    rl.prompt();
  } else {
    fs.writeFileSync(`./${filename}`, JSON.stringify(todoList));
    console.log(`List saved to "${filename}"`);
    // fs.writeFileSync(`./${filename}`, JSON.stringify(todoList), (err) => {
    //   if (!err) {
    //     console.log(`List saved to "${filename}"`);        
    //   } else {
    //     console.error(err);
    //   }
    // });
  }
}

if (process.argv.length === 3) {
  const inputFile = process.argv[2];
  fs.readFile(inputFile, "utf8", (err, data) => {
    const todos = JSON.parse(data);
    todos.forEach((todo) => {
      todoList.push(todo);
    });
  });
}
menu();

let instruct = "";
rl.on("line", (line) => {
  if (line === "q" && instruct === "") {
    console.log("See you soon! 😄");
    rl.close();
    return;
  } else if (line === "v" && instruct === "") {
    view();
  } else if (line === "n" && instruct === "") {
    instruct = "n";
    add();
  } else if (instruct === "n") {
    add(line);
    instruct = "";
    menu();
  } else if (line[0] === "c") {
    complete(parseInt(line.slice(1)));
  } else if (line[0] === "d") {
    toDelete(parseInt(line.slice(1)));
  } else if (line === "s" && instruct === "") {
    instruct = "s";
    saveList();
  } else if (instruct === "s") {
    if (line === "") {
      line = "myTodos.JSON";
    }
    saveList(line);
    instruct = "";
    menu();
  } else if (instruct === "") {
    menu();
  } 
});