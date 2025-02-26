let timeLeft;
let timer;
let isRunning = false;
let isBreak = false;

const workInput = document.getElementById("work-time");
const breakInput = document.getElementById("break-time");
const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const setTimerBtn = document.getElementById("set-timer");
const alertSound = document.getElementById("alert-sound");

function updateTimerDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerDisplay.innerText = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timer);
                alertSound.play();
                isRunning = false;

                if (isBreak) {
                    alert("Break over! Time to focus.");
                    isBreak = false;
                    timeLeft = workInput.value * 60;
                } else {
                    alert("Time's up! Take a break.");
                    isBreak = true;
                    timeLeft = breakInput.value * 60;
                }
                updateTimerDisplay();
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    timeLeft = workInput.value * 60;
    updateTimerDisplay();
}

function setTimer() {
    if (!isRunning) {
        timeLeft = workInput.value * 60;
        updateTimerDisplay();
    }
}

// Task Management
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const li = document.createElement("li");
    li.innerHTML = `${taskText} <button onclick="this.parentElement.remove()">❌</button>`;
    taskList.appendChild(li);
    taskInput.value = "";
}
// if (taskInput.value === ) 
//     return alert("Please enter a task.");

addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
});

// Dark Mode Toggle
const darkModeBtn = document.getElementById("dark-mode");
darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// Event Listeners
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
setTimerBtn.addEventListener("click", setTimer);

// Initialize timer
timeLeft = workInput.value * 60;
updateTimerDisplay();
