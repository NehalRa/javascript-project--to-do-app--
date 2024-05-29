const inputbox = document.getElementById("input-box");
const duedate = document.getElementById("due-date");
const listcontainer = document.getElementById("list-container");

function addTask() {
    if (inputbox.value === '') {
        alert("You must write something!");
    }
     else if (duedate.value === '') {
        alert("You must set a due date!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = `${inputbox.value} <span class="due-date">(${new Date(duedate.value).toLocaleString()})</span>`;
        li.dataset.dueDate = duedate.value;
        listcontainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // Cross icon
        li.appendChild(span);

        const timeLeft = new Date(duedate.value).getTime() - new Date().getTime();
        setTimeout(() => {
            if (li.parentElement) {
                li.remove();
                saveData();
            }
        }, timeLeft);

        inputbox.value = "";
        duedate.value = "";
        saveData();
    }
}

listcontainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    const tasks = Array.from(listcontainer.children).map(li => ({
        text: li.childNodes[0].nodeValue.trim(),
        dueDate: li.dataset.dueDate,
        checked: li.classList.contains('checked')
    }));
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showTask() {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    for (const task of tasks) {
        let li = document.createElement("li");
        li.innerHTML = `${task.text} <span class="due-date">(${new Date(task.dueDate).toLocaleString()})</span>`;
        li.dataset.dueDate = task.dueDate;
        if (task.checked) {
            li.classList.add('checked');
        }
        listcontainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // Cross icon
        li.appendChild(span);

        const timeLeft = new Date(task.dueDate).getTime() - new Date().getTime();
        setTimeout(() => {
            if (li.parentElement) {
                li.remove();
                saveData();
            }
        }, timeLeft);
    }
}

showTask();
