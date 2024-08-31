var ms = 0, s = 0, m = 0, h = 0;
var timer;
var display = document.querySelector(".flip-card-front");
var recordList = document.querySelector(".record-list");

function start() {
    if (!timer) {
        timer = setInterval(run, 10);
    }
}

function run() {
    ms++;
    if (ms == 100) {
        ms = 0;
        s++;
    }
    if (s == 60) {
        s = 0;
        m++;
    }
    if (m == 60) {
        m = 0;
        h++;
    }
    if (h == 13) {
        h = 1;
    }
    updateTimer();
    sessionStorage.setItem("timer", JSON.stringify({ ms, s, m, h }));
}

function updateTimer() {
    display.innerHTML = getTimer();
}

function getTimer() {
    return (h < 10 ? "0" + h : h) + " : " + (m < 10 ? "0" + m : m) + " : " + (s < 10 ? "0" + s : s) + " : " + (ms < 10 ? "0" + ms : ms);
}

function pause() {
    stopTimer();
}

function stopTimer() {
    clearInterval(timer);
    timer = null;
}

function reset() {
    stopTimer();
    ms = 0;
    s = 0;
    m = 0;
    h = 0;
    updateTimer();
    sessionStorage.removeItem("timer");
    resetLap();
}

function restart() {
    if (!timer) {
        reset();
        start();
    }
}

function lap() {
    if (timer) {
        var Li = document.createElement("li");
        Li.innerHTML = getTimer();
        recordList.appendChild(Li);
        saveLapRecords();
    }
}

function resetLap() {
    recordList.innerHTML = "";
    saveLapRecords();
}

function saveLapRecords() {
    var laps = [];
    document.querySelectorAll(".record-list li").forEach(lap => {
        laps.push(lap.innerHTML);
    });
    sessionStorage.setItem("laps", JSON.stringify(laps));
}

function loadFromSession() {
    const storedTimer = JSON.parse(sessionStorage.getItem("timer"));
    if (storedTimer) {
        ms = storedTimer.ms;
        s = storedTimer.s;
        m = storedTimer.m;
        h = storedTimer.h;
        updateTimer();
    }

    // Restore lap records
    const storedLaps = JSON.parse(sessionStorage.getItem("laps"));
    if (storedLaps) {
        storedLaps.forEach(lap => {
            var Li = document.createElement("li");
            Li.innerHTML = lap;
            recordList.appendChild(Li);
        });
    }
}



window.onload = loadFromSession;
