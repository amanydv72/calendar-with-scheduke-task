'use strict';
//VARIABLES
const addButton = document.querySelector('button');
const todayDiv = document.querySelector('.today');
const calendarDiv = document.querySelector('.calendar');
const month = document.querySelector("input[type=month]");
const header = document.querySelector('h3');
class Task {
  constructor(task, date) {
    this.task = task;
    this.date = date;
  }
};

//*********************************************************set today date by default*******************************************************
const todayDate = new Date();
const setDay = function() {
  if (todayDate.getDate() < 10) {
    return "0" + todayDate.getDate();
  } else {
    return todayDate.getDate();
  }
};
const todayDay = setDay(),
  todayMonth = ("0" + (
  todayDate.getMonth() + 1)).slice(-2),
  todayYear = todayDate.getFullYear(),
  today = todayYear + "-" + todayMonth + "-" + todayDay,
  currMonth = todayYear + "-" + todayMonth;
document.querySelector("input[type=month]").value = currMonth;
//set date for header
header.innerText += ` ${today}`;
//****************************************************************FUNCTIONS**************************************************************
function getDaysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
};
//*************************************************************create calendar***********************************************************
function createCalendar() {
  const month = document.querySelector('input[type=month]').value;
  const choosedMonth = month.slice(5, 7);
  const choosedYear = month.slice(0, 4);
  for (let i = 1; i <= getDaysInMonth(choosedMonth, choosedYear); i++) {
      const div = document.createElement('div');
    div.classList = 'day';
    div.innerHTML = `<div>${i}</div>`;
    calendarDiv.appendChild(div);
  }
};
//**************************************************************clear calendar**********************************************************
function clearCalendar() {
  while (calendarDiv.firstChild) calendarDiv.removeChild(calendarDiv.firstChild);
};
//****************************************************************change month**********************************************************
month.addEventListener('input', function() {
  clearCalendar();
  createCalendar();
  chooseDay();
  showTaskSign();
});
//*******************************************************get month days quantity******************************************************
function getMonthLength() {
  const month = document.querySelector('input[type=month]');
  const monthLength = month.length;
}
//******************************************************show exclamation when add task**************************************************
function addTaskSign(day, date) {
  const daysInCalendar = Array.from(document.querySelectorAll('div.day'));
  const monthYear = document.querySelector('input[type=month]').value;
let dayInCalendar = '';
  for (var i = 0; i < daysInCalendar.length; i++) {
    if (daysInCalendar[i].textContent < 10) {
      dayInCalendar = '-' + '0' + daysInCalendar[i].textContent;
    } else {
      dayInCalendar = '-' + daysInCalendar[i].textContent;
    }
    const calendarDate = monthYear +  dayInCalendar;
    if (date === calendarDate && daysInCalendar[i].childElementCount < 2) {
      daysInCalendar[i].innerHTML += `<div><i class="fas fa-exclamation"></i></div>`;
    }
  }
};
//**********************************************************clear list function********************************************************
function clearList() {
  const list = document.querySelector('ol');
  while (list.firstChild) list.removeChild(list.firstChild);
}
//***********************************************************add task to LS**************************************************************
addButton.addEventListener('click', function() {
  let lsData = JSON.parse(localStorage.getItem('tasks'));
  if (lsData === null) {
    lsData = [];
  }
  const textInput = document.querySelector('input[type=text]').value;
  const dateInput = document.querySelector('input[type=date]').value;
  const task = new Task(textInput, dateInput);
  let day = '';
  if (dateInput.slice(8, 10) < 10) {
    day = dateInput.slice(9, 10);
  } else {
    day = dateInput.slice(8, 10);
  }

  if (textInput === '' || dateInput === '') {
    alert('Please, enter your task!');
  } else {
    lsData.push(task);
    localStorage.setItem('tasks', JSON.stringify(lsData));
  }
  clearInputs();
  clearList();
  showTasks(today);
  addTaskSign(day, dateInput);
});
// ****************************************************clear inputs function************************************************************
function clearInputs() {
  document.querySelector('input[type=text]').value = '';
  document.querySelector('input[type=date]').value = '';
};
//***********************************************************get tasks from LS***********************************************************
function showTasks(date) {
  let lsData = JSON.parse(localStorage.getItem('tasks'));
  if (lsData !== null) {
    const taskList = document.querySelector('ol');
    for (var i = 0; i < lsData.length; i++) {
      if (date == lsData[i].date) {
        const newDiv = document.createElement('div');
        const newListItem = document.createElement('li');
        newListItem.textContent = lsData[i].task;
        newListItem.innerHTML += `<a href=#><i class="fas fa-times"></i></a>`;
        taskList.appendChild(newListItem);
        newDiv.appendChild(taskList);
        todayDiv.appendChild(newDiv);
      }
    }
  }
};
//********************************************show exclamation sign in calendar if there is a task**************************************
function showTaskSign() {
  const monthYear = document.querySelector('input[type=month]').value;
  const lsData = JSON.parse(localStorage.getItem('tasks'));
  const days = calendarDiv.childNodes;
  let arr = [];
  let newArr = [];

  if (lsData === null) {
    lsData = [];
  };
  //****************************************create array from days with tasks in choosed month*****************************************
  for (let i = 0; i < lsData.length; i++) {
    if (monthYear.slice(0, 4) === lsData[i].date.slice(0, 4) && monthYear.slice(5, 7) === lsData[i].date.slice(5, 7)) {
      if (lsData[i].date.slice(8, 10) < 10) {
        arr.push(lsData[i].date.slice(9, 10) - 1);
      } else {
        arr.push(lsData[i].date.slice(8, 10) - 1);
      }
    }
  };
  //**************************************************create array with unique days****************************************************
  for (let i = 0; i < arr.length; i++) {
    if (newArr.indexOf(arr[i]) == -1) {
      newArr.push(arr[i]);
    }
  };
  //***********************************************************put sign to days with tasks*******************************************
  for (let i = 0; i < newArr.length; i++) {
    days[newArr[i]].innerHTML += `<div><i class="fas fa-exclamation"></i></div>`;
  }
};
//************************************************show tasks for choosed day***********************************************************
function chooseDay() {
  const choosedDate = document.querySelector('h3');
  const days = document.querySelectorAll('.day');
  const monthYear = document.querySelector('input[type=month]').value;
  for (var i = 0; i < days.length; i++) {
    let day = '';
    if (days[i].textContent < 10) {
      day = monthYear + "-" + '0' + days[i].textContent;
    } else {
      day = monthYear + "-" + days[i].textContent;
    }
    days[i].addEventListener('click', function() {
      choosedDate.textContent = `Your Tasks For ${day}`;
      clearList();
      showTasks(day);
      deleteTask();
    });
  }
};
// ****************************************************delete task*********************************************************************
function deleteTask() {
  const lsData = JSON.parse(localStorage.getItem('tasks'));
  const selectedDay = header.innerText.slice(15, 25);
  const list = document.querySelector('ol');
  if (list.firstChild !== null) {
    list.addEventListener('click', function(e) {
      if (e.target.parentElement.classList.contains('fa-times')) {
        // from LS
        for (let i = 0; i < lsData.length; i++) {
          if (lsData[i].date === selectedDay && e.target.parentElement.parentElement.parentElement.textContent === lsData[i].task) {
              lsData.splice([i], 1);
          }
        };
        //from list
        e.target.parentElement.parentElement.parentElement.remove();
        //set new array to LS
        localStorage.setItem("tasks", JSON.stringify(lsData));
      }
        deleteSign();
      e.preventDefault();
    });
  }
};
//***************************************delete exclamation when delete all tasks****************************************************
function deleteSign() {
  const days = calendarDiv.childNodes;
  const list = document.querySelector('ol');
  let selectedDay = '';
  if (header.innerText.slice(23, 25) < 10) {
    selectedDay = header.innerText.slice(24, 25);
  } else {
    selectedDay = header.innerText.slice(23, 25);
  }
  if (list.firstChild === null && days[selectedDay - 1].childElementCount > 1) {
    days[selectedDay - 1].removeChild(days[selectedDay - 1].lastChild);
  }
};
//FUNCTIONALITY
createCalendar();
chooseDay();
showTaskSign();
showTasks(today);