var measurementsTable = {
  "tablespoons": {
    "to_tablespoons": function (val) {
      return val * 1
    },
    "to_teaspoons": function (val) {
      return val * 3
    },
    "to_cups": function (val) {
      return val * 0.0625
    },
    "to_pints": function (val) {
      return val * 0.03125
    },
    "to_quarts": function (val) {
      return val * 0.015625
    },
    "to_gallons": function (val) {
      return val * 0.00390625
    },
    "to_milliliters": function (val) {
      return val * 14.7868
    },
    "to_liters": function (val) {
      return val * 0.0147868
    }
  },
  "teaspoons": {
    "to_tablespoons": function (val) {
      return val * 0.333333
    },
    "to_teaspoons": function (val) {
      return val * 1
    },
    "to_cups": function (val) {
      return val * 0.0208333
    },
    "to_pints": function (val) {
      return val * 0.0104167
    },
    "to_quarts": function (val) {
      return val * 0.00520833
    },
    "to_gallons": function (val) {
      return val * 0.00130208
    },
    "to_milliliters": function (val) {
      return val * 4.92892
    },
    "to_liters": function (val) {
      return val * 0.00492892
    }
  },
  "cups": {
    "to_tablespoons": function (val) {
      return val * 16
    },
    "to_teaspoons": function (val) {
      return val * 48
    },
    "to_cups": function (val) {
      return val * 1
    },
    "to_pints": function (val) {
      return val * 0.5
    },
    "to_quarts": function (val) {
      return val * 0.25
    },
    "to_gallons": function (val) {
      return val * 0.0625
    },
    "to_milliliters": function (val) {
      return val * 236.588
    },
    "to_liters": function (val) {
      return val * 0.236588
    }
  },
  "pints": {
    "to_tablespoons": function (val) {
      return val * 32
    },
    "to_teaspoons": function (val) {
      return val * 96
    },
    "to_cups": function (val) {
      return val * 2
    },
    "to_pints": function (val) {
      return val * 1
    },
    "to_quarts": function (val) {
      return val * 0.5
    },
    "to_gallons": function (val) {
      return val * 0.125
    },
    "to_milliliters": function (val) {
      return val * 473.176
    },
    "to_liters": function (val) {
      return val * 0.473176
    }
  },
  "quarts": {
    "to_tablespoons": function (val) {
      return val * 64
    },
    "to_teaspoons": function (val) {
      return val * 192
    },
    "to_cups": function (val) {
      return val * 4
    },
    "to_pints": function (val) {
      return val * 2
    },
    "to_quarts": function (val) {
      return val * 1
    },
    "to_gallons": function (val) {
      return val * 0.25
    },
    "to_milliliters": function (val) {
      return val * 946.353
    },
    "to_liters": function (val) {
      return val * 0.946353
    }
  },
  "gallons": {
    "to_tablespoons": function (val) {
      return val * 256
    },
    "to_teaspoons": function (val) {
      return val * 768
    },
    "to_cups": function (val) {
      return val * 16
    },
    "to_pints": function (val) {
      return val * 8
    },
    "to_quarts": function (val) {
      return val * 4
    },
    "to_gallons": function (val) {
      return val * 1
    },
    "to_milliliters": function (val) {
      return val * 3785.41
    },
    "to_liters": function (val) {
      return val * 3.78541
    }
  },
  "milliliters": {
    "to_tablespoons": function (val) {
      return val * 0.067628
    },
    "to_teaspoons": function (val) {
      return val * 0.202884
    },
    "to_cups": function (val) {
      return val * 0.00422675
    },
    "to_pints": function (val) {
      return val * 0.00211338
    },
    "to_quarts": function (val) {
      return val * 0.00105669
    },
    "to_gallons": function (val) {
      return val * 0.000264172
    },
    "to_milliliters": function (val) {
      return val * 1
    },
    "to_liters": function (val) {
      return val * 0.001
    }
  },
  "liters": {
    "to_tablespoons": function (val) {
      return val * 67.628
    },
    "to_teaspoons": function (val) {
      return val * 202.884
    },
    "to_cups": function (val) {
      return val * 4.22675
    },
    "to_pints": function (val) {
      return val * 2.11338
    },
    "to_quarts": function (val) {
      return val * 1.05669
    },
    "to_gallons": function (val) {
      return val * 0.264172
    },
    "to_milliliters": function (val) {
      return val * 1000
    },
    "to_liters": function (val) {
      return val * 1
    }
  }
};

var changeAmount = function (event) {
  convertUnits(event.target);
};

var changeUnit = function (event) {
  var input = document.getElementById("cu-input-1");
  convertUnits(input);
};

var convertUnits = function (input) {
  var value = input.value;
  var baseSelect = input.getAttribute("data-unit");
  var fromUnit = document.getElementById(baseSelect).value;
  var targetSelect = input.getAttribute("data-target-select");
  var toUnit = document.getElementById(targetSelect).value;
  var targetInput = input.getAttribute("data-target");

  var answer = measurementsTable[fromUnit]["to_" + toUnit](value);

  document.getElementById(targetInput).value = answer;
};

var populateSelect = function () {
  var select = document.getElementsByClassName("js-cu-units");
  var options = [
    "tablespoons",
    "teaspoons",
    "cups",
    "pints",
    "quarts",
    "gallons",
    "milliliters",
    "liters"
  ];

  for (i = 0; i < select.length; i += 1) {
    for (k = 0; k < options.length; k += 1) {
      var opt = document.createElement("option");
      opt.innerHTML = options[k];
      select[i].appendChild(opt);
    };
  };
};

window.onload = function () {
  populateSelect();
};



function temperatureConverter(valNum) {
  valNum = parseFloat(valNum);
  document.getElementById("outputCelsius").innerHTML = (valNum - 32) / 1.8;
}

function temperatureConverter2(valNum) {
  valNum = parseFloat(valNum);
  document.getElementById("outputFahrenheit").innerHTML = (valNum - 32) / 1.8;
}


// Timer

var start = document.getElementById('start');
var reset = document.getElementById('reset');

var h = document.getElementById("hour");
var m = document.getElementById("minute");
var s = document.getElementById("sec");

//store a reference to the startTimer variable
var startTimer = null;

start.addEventListener('click', function () {
  //initialize the variable
  function startInterval() {
    startTimer = setInterval(function () {
      timer();
    }, 1000);
  }
  startInterval();
})

reset.addEventListener('click', function () {
  h.value = 0;
  m.value = 0;
  s.value = 0;
  //stop the timer after pressing "reset"
  stopInterval()
})

function timer() {
  if (h.value == 0 && m.value == 0 && s.value == 0) {
    h.value = 0;
    m.value = 0;
    s.value = 0;
  } else if (s.value != 0) {
    s.value--;
  } else if (m.value != 0 && s.value == 0) {
    s.value = 59;
    m.value--;
  } else if (h.value != 0 && m.value == 0) {
    m.value = 60;
    h.value--;
  }
  return;
}

//stop the function after pressing the reset button, 
//so the time wont go down when selecting a new time after pressing reset
function stopInterval() {
  clearInterval(startTimer);
}

// Shopping list
// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
//Event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck)
// Functions
// Add items functionality
function addTodo(event) {
  // Prevents form from submitting
  event.preventDefault();
  // Todo Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  // Create li
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);
  // Add todo to local storage
  saveLocalTodos(todoInput.value);
  // Done button
  const doneButton = document.createElement('button');
  doneButton.innerHTML = '<i class="fas fa-check"></i>';
  doneButton.classList.add("done-btn");
  todoDiv.appendChild(doneButton);
  // Delete button
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  deleteButton.classList.add("delete-btn");
  todoDiv.appendChild(deleteButton);
  // Append to list
  todoList.appendChild(todoDiv);
  // Clear input value
  todoInput.value = "";
}
// Delete button functionality 
function deleteCheck(e) {
  const item = e.target;
  // Delete item
  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;
    // Animation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  if (item.classList[0] === "done-btn") {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
}
// Save items to local storage
function saveLocalTodos(todo) {
  // Check for items already in local storage
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
// Removes items from local storage
function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
//Puts itesm saved to local storage back into DOM list items
function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    //Create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create list
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";
    //Create Completed Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("done-btn");
    todoDiv.appendChild(completedButton);
    //Create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("delete-btn");
    todoDiv.appendChild(trashButton);
    //attach final Todo
    todoList.appendChild(todoDiv);
  });
}

$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) { // $(".member-name").text(data.email);
    $("#favorite-link").attr(`href`, `/api/favorite/${data.id}`);
  });
});