let todoInput; // miejsce, gdzie użytkownik wpisuje treść
let alertInfo; // info o braku zadań / konieczności dodania tekstu
let addBtn; // przycisk ADD - dodaje nowe elementy do listy
let ulList; // nasza lista zadań, tagi <ul></ul>
let newTask; // nowo dodany LI, nowe zadanie
let allTasks; // lista wszystkich dodanych LI
let idNumber = 0; // ID dodawane do każdego nowego zadania
let popup; //pobrany popup
let popupInfo; // alert w popupie, jak się doda pusty tekst
let editedTodo; // edytowany Todo
let popupInput; //tekst wpisywany w inputa w popup'ie
let addPopupBtn; // przycisk "zatwierdź" w popup'ie
let closeTodoBtn; //przycisk od zamykania popup'a

todoInput = document.querySelector('.todo-input');
alertInfo = document.querySelector('.alert-info');
addBtn = document.querySelector('.add-btn');
ulList = document.querySelector('.todo-list ul');
allTasks = document.getElementsByTagName('li');
popup = document.querySelector('.popup');
popupInfo = document.querySelector('.popup-info');
popupInput = document.querySelector('.popup-input');
addPopupBtn = document.querySelector('.accept');
closeTodoBtn = document.querySelector('.cancel');
let todoToEdit

const addNewTask = () => {
	if (todoInput.value !== '') {
		const newTask = document.createElement('li');
		newTask.setAttribute('id', idNumber);
		newTask.innerHTML = `${todoInput.value} <div class="tools">
        <button class="complete"><i class="fas fa-check"></i></button>
        <button class="edit">EDIT</button>
        <button class="delete"><i class="fas fa-times"></i></button>
        </div>`;
		ulList.appendChild(newTask);
		alertInfo.textContent = '';
		todoInput.value = '';
		idNumber++;
	} else {
		alertInfo.textContent = 'Wpisz treść zadania!';
	}
};

const closePopup = () => {
	popup.style.display = 'none';
	popupInfo.textContent = '';
};

//checks which single btn of todo toolbox was clicked
const checkBtn = (e) => {
	if (e.target.matches('.complete')) {console.log('complete');
		e.target.closest('li').classList.toggle('completed');
        e.target.classList.toggle('completed');
	} else if (e.target.matches('.edit')) {
        editTodo(e);
	} else if (e.target.matches('.delete')) {
		ulList.removeChild(e.target.closest('li'));
		if (allTasks.length === 0) {
			alertInfo.textContent = 'Brak zadań na liście';
		}
	}
};

const editTodo = (e) => {
    todoToEdit = e.target.closest('li');
	popupInput.value = todoToEdit.firstChild.textContent;
    changeTodoText();
	popup.style.display = 'flex';
}

const changeTodoText = () => {
    if (popupInput.value !== '') {
        todoToEdit.firstChild.textContent = popupInput.value;
        popup.style.display = 'none';
        popupInfo.textContent = '';
    } else {
        popupInfo.textContent = 'Uzupełnij pole';
    }

}

const enterCheck = e => {
  if (e.key === "Enter" || e.keyCode === "13") {
addNewTask()
  }
}

addBtn.addEventListener('click', addNewTask);
ulList.addEventListener('click', checkBtn);
closeTodoBtn.addEventListener('click', closePopup);
addPopupBtn.addEventListener('click', changeTodoText);
document.addEventListener('keydown', enterCheck)
