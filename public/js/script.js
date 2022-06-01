var localStorageKey = "to-do-list"
var myToDoList = []
getSavedListFromLocalStorage();

function getSavedListFromLocalStorage() {
    var savedList = localStorage.getItem(localStorageKey);
    
    if (savedList !== null) {
        for (var item of JSON.parse(savedList)) {
            myToDoList.push(item);
            renderListItem(item.text, item.done);
        }
    }
}

function saveList() {
    localStorage.setItem(localStorageKey, JSON.stringify(myToDoList));
}

function deleteToDoList(event) {
    event.stopPropagation();

    var deleteThis = this.parentElement;

    var position = [...deleteThis.parentElement.children].indexOf(deleteThis);
    myToDoList.splice(position,1);

    this.parentElement.remove();
    saveList();
}

function toggleToDoList() {
    var position = [...this.parentElement.children].indexOf(this);
    var iconElement = this.getElementsByClassName("material-icons")[0];

    if (this.parentElement.classList.contains("done")) {
        iconElement.innerHTML = "check_box_outline_blank";
        this.parentElement.classList.remove("done");
        myToDoList[position].done = false;
    } else {
        iconElement.innerHTML = "check_box";
        this.parentElement.classList.add("done");
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
    var toggleButton = document.createElement(`button`);
    var checkIcon = done ? "check_box" : "check_box_outline_blank"; 

    toDoItem.innerHTML = `<span>${value}</span>`;
    toDoItem.className = `list-item`;

    if (done) {
        toDoItem.classList.add("done");
    }

    deleteButton.innerHTML = `<span class="material-icons">delete_outline</span>`;
    deleteButton.className = "delete";

    toggleButton.innerHTML = `<span class="material-icons">${checkIcon}</span>`;
    toggleButton.className = "toggle";
    

    // This adds click events to buttons
    
    deleteButton.addEventListener("click", deleteToDoList);
    toggleButton.addEventListener("click", toggleToDoList);

    toDoItem.appendChild(deleteButton);
    toDoItem.prepend(toggleButton);
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