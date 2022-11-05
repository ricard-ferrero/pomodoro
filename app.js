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

const sessions = ['Work - 1', 'Break - 1',
				'Work - 2', 'Break - 2',
				'Work - 3', 'Break - 3',
				'Work - 4', 'Long Break'];

const inputWorkTime = document.querySelector('#working-time');
const inputShortBreak = document.querySelector('#short-break');
const inputLongBreak = document.querySelector('#long-break');
const btnReset = document.querySelector('#reset-button');

const btnChrono = document.querySelector('#chrono-button');
const timeChrono = document.querySelector('#chrono-time');
const sessionText = document.querySelector('#session');

const bell = new Audio('bell.wav');

// CONFIGURE INPUTS

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


// CHRONO

btnChrono.addEventListener('click', e => {
	const clsList = btnChrono.classList;
	sessionText.classList.toggle('d-none');

	if (clsList.contains('waiting')) {
		btnChrono.innerText = 'Stop';
		clsList.replace('waiting', 'working');
		clsList.replace('btn-success', 'btn-danger');
		disableConfigInputs();
		startChrono();
	
	} else if (clsList.contains('working')) {
		btnChrono.innerText = 'Start';
		clsList.replace('working', 'waiting');
		clsList.replace('btn-danger', 'btn-success');
		enableConfigInputs();
		stopChrono();
	}
});

function startChrono() {
	timeChrono.classList.replace('text-muted', 'text-primary')
	let onSession = 0;
	sessionText.innerText = sessions[onSession];

	intervalId = setInterval(()=>{
		if (sec > 0) {
			sec--;
		} else if (min > 0) {
			min--;
			sec = 59;
		} else {
			timeChrono.classList.toggle('text-primary');
			timeChrono.classList.toggle('text-success');
			if (!doingBreak) {
				doingBreak = true;
				if (--rounds > 0) {
					min = shortBreak;
				} else {
					min = longBreak;
				}
			} else {
				doingBreak = false;
				min = workTime;
				if (rounds == 0) rounds = workRounds;
			}

			if (++onSession == sessions.length) onSession = 0;
			sessionText.innerText = sessions[onSession];
			bell.play();
		}
		printClock();
	}, 1000)
}

function stopChrono() {
	timeChrono.classList.remove('text-primary', 'text-success');
	timeChrono.classList.add('text-muted');
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


function enableConfigInputs() {
	inputWorkTime.removeAttribute('disabled', '');
	inputShortBreak.removeAttribute('disabled', '');
	inputLongBreak.removeAttribute('disabled', '');
	//btnReset.removeAttribute('disabled', '');
	btnReset.classList.remove('d-none');
}


function disableConfigInputs() {
	inputWorkTime.setAttribute('disabled', '');
	inputShortBreak.setAttribute('disabled', '');
	inputLongBreak.setAttribute('disabled', '');
	//btnReset.setAttribute('disabled', '');
	btnReset.classList.add('d-none');
}