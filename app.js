const workTime = 25
const shortBreak = 5;
const longBreak = 20;
const workRounds = 4;

let min = workTime;
let sec = 0;
let rounds = workRounds;
let intervalId;
let doingBreak = false;

const btnChrono = document.querySelector('#chrono-button');
const timeChrono = document.querySelector('#chrono-time');

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
	rounds = workTime;

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