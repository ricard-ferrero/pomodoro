const WORKTIME = 25;
const SHORTBREAK = 5;
const LONGBREAK = 20;
const workRounds = 4;

let workTime = WORKTIME;
let shortBreak = SHORTBREAK;
let longBreak = LONGBREAK;

let min = workTime;
let sec = 0;
let rounds = workRounds;
let intervalId;
let doingBreak = false;

const inputWorkTime = document.querySelector('#working-time');
const inputShortBreak = document.querySelector('#short-break');
const inputLongBreak = document.querySelector('#long-break');
const btnReset = document.querySelector('#reset-button');

const btnChrono = document.querySelector('#chrono-button');
const timeChrono = document.querySelector('#chrono-time');

inputWorkTime.addEventListener('input', e => {
	if (e.target.value < 1) e.target.value = 1;
	else if (e.target.value > 60) e.target.value = 60;
	workTime = e.target.value;
	min = workTime;
	printClock();
});

inputShortBreak.addEventListener('input', e => {
	if (e.target.value < 1) e.target.value = 1;
	else if (e.target.value > 60) e.target.value = 60;
	shortBreak = e.target.value;
});

inputLongBreak.addEventListener('input', e => {
	if (e.target.value < 1) e.target.value = 1;
	else if (e.target.value > 60) e.target.value = 60;
	longBreak = e.target.value;
});

btnReset.addEventListener('click', e => {
	inputWorkTime.value = WORKTIME;
	inputShortBreak.value = SHORTBREAK;
	inputLongBreak.value = LONGBREAK;
	
	workTime = WORKTIME;
	shortBreak = SHORTBREAK;
	longBreak = LONGBREAK;
	min = workTime;
	printClock();
});

btnChrono.addEventListener('click', e => {
	clsList = btnChrono.classList;

	if (clsList.contains('waiting')) {
		btnChrono.innerText = 'Stop';
		clsList.replace('waiting', 'working');
		clsList.replace('btn-success', 'btn-danger');
		startChrono();
	
	} else if (clsList.contains('working')) {
		btnChrono.innerText = 'Start';
		clsList.replace('working', 'waiting');
		clsList.replace('btn-danger', 'btn-success');
		stopChrono();
	}
});

let estado = `working ${rounds}`

function startChrono() {
	intervalId = setInterval(()=>{
		if (sec > 0) {
			sec--;
		} else if (min > 0) {
			min--;
			sec = 59;
		} else {
			if (!doingBreak) {
				doingBreak = true;
				if (--rounds > 0) {
					min = shortBreak;
					estado = 'descanso';
				} else {
					min = longBreak;
					estado = 'LOOOOOOOONG break'
				}
			} else {
				doingBreak = false;
				min = workTime;
				if (rounds == 0) rounds = workRounds;
				estado = `working ${rounds}`
			}
		}
		console.log(estado)
		printClock();
	}, 1)
}

function stopChrono() {
	clearInterval(intervalId);
	intervalId = null;

	min = workTime;
	sec = 0;
	rounds = workRounds;

	printClock();
}

function printClock() {
	let strMin, strSec;
	
	if (min < 10) {
		strMin = `0${min}`;
	} else {
		strMin = `${min}`;
	}

	if (sec < 10) {
		strSec = `0${sec}`;
	} else {
		strSec = `${sec}`;
	}

	timeChrono.innerText = `${strMin}:${strSec}`
}