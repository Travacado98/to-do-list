var myToDoList = []
getSavedListFromLocalStorage();

function getSavedListFromLocalStorage() {
    var savedList = localStorage.getItem("My Giga List");
    
    if (savedList !== null) {
        for (var item of JSON.parse(savedList)) {
            myToDoList.push(item);
            renderListItem(item.text, item.done);
        }
    }
}

function saveList() {
    localStorage.setItem("My Giga List",JSON.stringify(myToDoList));
}

function deleteToDoList(event) {
    event.stopPropagation();

    var deleteThis = this.parentElement

    var position = [...deleteThis.parentElement.children].indexOf(deleteThis);
    myToDoList.splice(position,1);

    this.parentElement.remove();
    saveList();
}

function toggleToDoList() {
    var position = [...this.parentElement.children].indexOf(this);

    if (this.classList.contains("done")) {
        this.classList.remove("done");
        myToDoList[position].done = false;
    } else {
        this.classList.add("done");
        myToDoList[position].done = true;
    }
    
    saveList();
}

function checkEnterPressed(event) {
    if (event.keyCode === 13) {
        addItem();
    }
}

function renderListItem(value, done) {
    var list = document.getElementById('list');
    var toDoItem = document.createElement('div');
    var deleteButton = document.createElement(`button`); 

    toDoItem.innerHTML = `<span>${value}</span>`;
    toDoItem.className = `list-item`

    if (done) {
        toDoItem.classList.add("done");
    }

    deleteButton.innerHTML = "X"
    deleteButton.className = "delete"

    // This adds click events to buttons
    
    deleteButton.addEventListener("click", deleteToDoList);
    toDoItem.addEventListener("click", toggleToDoList);

    toDoItem.appendChild(deleteButton);
    list.appendChild(toDoItem);
}

function addItem() {
    var addItemInput = document.getElementById(`addItemInput`);

    if (addItemInput.value != ``) {
        renderListItem(addItemInput.value);
        myToDoList.push({
            text: addItemInput.value,
            done: false
        });
        addItemInput.value = ``;
        saveList();
    }
}

window.checkEnterPressed = checkEnterPressed;
window.addItem = addItem;