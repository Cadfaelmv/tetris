/**
 * Created by Админ on 14.01.2017.
 */
//document.body.oncontextmenu = function (e) {return false;}
var m = 35; // Размеры поля
var n = 20; // Размеры поля
var numOfCells = 4;
var time = 0;
var score = 0;
var A = Array(numOfCells);
var B = Array(numOfCells);
var i;
var maxBut;
var max1;
var max;
// Кнопка Новая игра
var appContainer = document.getElementsByClassName('app-container')[0]
var btnRestart = document.createElement('button');
btnRestart.className = 'btnRestart';
btnRestart.innerHTML = "Новая игра";
btnRestart.onclick = function(){
    createField();
    resTimer();
    scores.value = 0;
}
appContainer.appendChild(btnRestart);

// Окно количества сокращенных линий
var scores = document.createElement('input');
scores.type = 'text';
scores.className = 'scores';
scores.disabled = true;
scores.value = 0;
appContainer.appendChild(scores);

// Окно таймера
var timer = document.createElement('input');
timer.type = 'text';
timer.className = 'timer';
timer.disabled = true;
timer.value = 0;
appContainer.appendChild(timer);


// Создание поля
function createField(){
    var flagNum;
    var gameContainer = document.getElementsByClassName('game-container')[0]
    gameContainer.innerHTML = '';
    gameContainer.style.width  = +n*15+"px";
    gameContainer.style.height = +m*15+"px";
    for(var i = 0 ; i < m; i++){
        for(var j = 0; j < n; j++){
            var cell = document.createElement('button');
            cell.setAttribute('x', j);
            cell.setAttribute('y', i);
            cell.setAttribute('physic','empty');
            cell.className = 'cell';
            gameContainer.appendChild(cell);
        }
    }
}

function generateFigure() {
    i = 1;
    var rand;
    var but;
    var previousBut;
    A[0] = getElementByXY(Math.floor(n / 2 - 1), 0);
    A[0].setAttribute('physic', 'dyn');
    maxBut = A[0];
    previousBut = A[0];
    while (i < numOfCells) {
        rand = getRandom(4);
        switch (rand) {
            case 1: {
                but = getElementByXY(+previousBut.getAttribute('x') + 1, +previousBut.getAttribute('y'))
                if (but.getAttribute('physic') != 'dyn') {
                    A[i] = but;
                    previousBut = but;
                    but.setAttribute('physic', 'dyn');
                    i++;
                }
                else {
                    previousBut = but;
                    continue;
                }
                break;
            }
            case 2: {
                but = getElementByXY(+previousBut.getAttribute('x'), +previousBut.getAttribute('y') + 1)
                if (but.getAttribute('physic') != 'dyn') {
                    A[i] = but;
                    previousBut = but;
                    but.setAttribute('physic', 'dyn');
                    i++;
                }
                else {
                    previousBut = but;
                    continue;
                }
                break;
            }
            case 3: {
                but = getElementByXY(+previousBut.getAttribute('x') - 1, +previousBut.getAttribute('y'))
                if (but.getAttribute('physic') != 'dyn') {
                    A[i] = but;
                    previousBut = but;
                    but.setAttribute('physic', 'dyn');
                    i++;
                }
                else {
                    previousBut = but;
                    continue;
                }
                break;
            }
            case 4: {
                but = getElementByXY(+previousBut.getAttribute('x') + 1, +previousBut.getAttribute('y'))
                if (but.getAttribute('physic') != 'dyn') {
                    A[i] = but;
                    previousBut = but;
                    but.setAttribute('physic', 'dyn');
                    i++;
                }
                else {
                    previousBut = but;
                    continue;
                }
                break;
            }
        }
    }
    A.forEach(function (b) {
        b.style.backgroundColor = 'green';
    });
    for (var i = 0; i < numOfCells; i++) {
        B[i] = 0;
    }
    for (var i = 0; i < numOfCells; i++) {
        if (A[i].getAttribute('y') != 0) {
            but = getElementByXY(+A[i].getAttribute('x'), +A[i].getAttribute('y') - 1)
            if (but.getAttribute('physic') == 'dyn') {
                B[i]++;
            }
        }
        but = getElementByXY(+A[i].getAttribute('x'), +A[i].getAttribute('y') + 1)
        if (but.getAttribute('physic') == 'dyn') {
            B[i]++;
        }
        but = getElementByXY(+A[i].getAttribute('x') + 1, +A[i].getAttribute('y'))
        if (but.getAttribute('physic') == 'dyn') {
            B[i]++;
        }
        but = getElementByXY(+A[i].getAttribute('x') - 1, +A[i].getAttribute('y'))
        if (but.getAttribute('physic') == 'dyn') {
            B[i]++;
        }
        but = getElementByXY(+A[i].getAttribute('x') + 1, +A[i].getAttribute('y') + 1)
        if (but.getAttribute('physic') == 'dyn') {
            B[i]++;
        }
        but = getElementByXY(+A[i].getAttribute('x') - 1, +A[i].getAttribute('y') + 1)
        if (but.getAttribute('physic') == 'dyn') {
            B[i]++;
        }
        if (A[i].getAttribute('y') != 0) {
            but = getElementByXY(+A[i].getAttribute('x') - 1, +A[i].getAttribute('y') - 1)
            if (but.getAttribute('physic') == 'dyn') {
                B[i]++;
            }
        }
        if (A[i].getAttribute('y') != 0) {
            but = getElementByXY(+A[i].getAttribute('x') + 1, +A[i].getAttribute('y') - 1)
            if (but.getAttribute('physic') == 'dyn') {
                B[i]++;
            }
        }
    }
    max = B[0];
    max1 = 0;
    for (var i = 0; i < numOfCells; i++) {
        if (B[i] > max) {
            max = B[i];
            max1 = i;
        }
        ;
    }
}
function createCell(right,down) {
    but = getElementByXY(+previousBut.getAttribute('x')+right,+previousBut.getAttribute('y')+down);
    if (but.getAttribute('physic') != 'dyn'){
        A[i] = but;
        if (right == 1) B[i] = 1;
        if (right == -1) B[i] = 3;
        if (down == 1) B[i] = 2;
        if (down == -1) B[i] = 4;
        but.setAttribute('physic','dyn');
        i++;
    }
    else {
        previousBut = but;
        //continue;
    }

}
function push(e) {
    switch (e.keyCode) {
        case 37:
            move('left');
            break;
        case 38:
            spin();
            break;
        case 39:
            move('right');
            break;
        case 40:
            move('down');
            break;
    }
}
addEventListener("keydown",push);

function isPossibleToSpin(){
    var f = true;
    var but;
    for (var i = 0 ; i < numOfCells ; i++){
        var raznX = +A[i].getAttribute('x') - (+maxBut.getAttribute('x'));
        var raznY = +A[i].getAttribute('y') - (+maxBut.getAttribute('y'));
        if(maxBut.getAttribute('x') - raznY < 0 || +maxBut.getAttribute('y') + raznX < 0 ||
            maxBut.getAttribute('x') - raznY > n - 1 || maxBut.getAttribute('x') - raznY > m - 1) {
            f = false;
            break;
        }
        if (f) {
            but = getElementByXY(+maxBut.getAttribute('x') - raznY, +maxBut.getAttribute('y') + raznX);
            if (but.getAttribute('physic') == 'stat') {
                f = false;
                break;
            }
        }
    }
    return f;
}

function isPossibleToMove(direction){
    var but;
    var f = true;
    switch (direction){
        case 'down': {
            for (var i = 0; i < numOfCells; i++) {
                if (A[i].getAttribute('y') == m - 1) {
                    f = false;
                    break;
                }
            }
            if (f) {
                for(var i = 0 ; i < numOfCells ; i++) {
                    but = getElementByXY(A[i].getAttribute('x'), +A[i].getAttribute('y') + 1);
                    if (but.getAttribute('physic') == 'stat') {
                        f = false;
                        break;
                    }
                };
            }
            break;
        }
        case "left":{
            for (var i = 0; i < numOfCells; i++) {
                if (A[i].getAttribute('x') == 0) {
                    f = false;
                    break;
                }
            }
            if (f) {
                for(var i = 0 ; i < numOfCells ; i++) {
                    but = getElementByXY(+A[i].getAttribute('x') - 1, A[i].getAttribute('y'));
                    if (but.getAttribute('physic') == 'stat') {
                        f = false;
                        break;
                    }
                };
            }
            break;
        }
        case "right":{
            for (var i = 0; i < numOfCells; i++) {
                if (A[i].getAttribute('x') == n - 1) {
                    f = false;
                    break;
                }
            }
            if (f) {
                for(var i = 0 ; i < numOfCells ; i++) {
                    but = getElementByXY(+A[i].getAttribute('x') + 1, A[i].getAttribute('y'));
                    if (but.getAttribute('physic') == 'stat') {
                        f = false;
                        break;
                    }
                };
            }
            break;
        }
    }
    return f;
}
function move(direction){
    switch(direction) {
        case 'down': {
            if(isPossibleToMove('down')){
                A.forEach(function (b){
                    b.setAttribute('physic','empty');
                    b.style.backgroundColor = 'lightgrey';
                });
                for(var i = 0 ; i < numOfCells ; i++) {
                    A[i] = getElementByXY(A[i].getAttribute('x'), +A[i].getAttribute('y') + 1);
                }
                maxBut = A[max1];
                A.forEach(function (b) {
                    b.setAttribute('physic', 'dyn');
                    b.style.backgroundColor = 'green';
                });

            }
            else {
                A.forEach(function (b){b.setAttribute('physic','stat')});
                cut();
                generateFigure();
            }
            break;
        }
        case 'left':{
            if(isPossibleToMove('left')){
                A.forEach(function (b){
                    b.setAttribute('physic','empty');
                    b.style.backgroundColor = 'lightgrey';
                });
                for(var i = 0 ; i < numOfCells ; i++) {
                    A[i] = getElementByXY(+A[i].getAttribute('x') - 1, A[i].getAttribute('y'));
                }
                A.forEach(function (b) {
                    b.setAttribute('physic', 'dyn');
                    b.style.backgroundColor = 'green';
                });

            }
            break;
        }
        case 'right':{
            if(isPossibleToMove('right')){
                A.forEach(function (b){
                    b.setAttribute('physic','empty');
                    b.style.backgroundColor = 'lightgrey';
                });
                for(var i = 0 ; i < numOfCells ; i++) {
                    A[i] = getElementByXY(+A[i].getAttribute('x') + 1, A[i].getAttribute('y'));
                }
                A.forEach(function (b) {
                    b.setAttribute('physic', 'dyn');
                    b.style.backgroundColor = 'green';
                });

            }
            break;
        }
    }
}
function spin(){
    A.forEach(function (b) {
        b.style.backgroundColor = 'lightgrey';
        b.setAttribute('physic','empty');
    });
    if (isPossibleToSpin()) {
        for (var i = 0; i < numOfCells; i++) {
            var raznX = +A[i].getAttribute('x') - (+maxBut.getAttribute('x'));
            var raznY = +A[i].getAttribute('y') - (+maxBut.getAttribute('y'));
            A[i] = getElementByXY(+maxBut.getAttribute('x') - raznY, +maxBut.getAttribute('y') + raznX);
        }
    }
    A.forEach(function (b) {
        b.style.backgroundColor = 'green';
        b.setAttribute('physic','dyn');
    });
}

function minY(){
    var min = m - 1;
    A.forEach(function (b) {
        if (+b.getAttribute('y') < min) min = +b.getAttribute('y');
    });
    return min;
}

function maxY(){
    var max = 0;
    A.forEach(function (b) {
        if (+b.getAttribute('y') > max) max = +b.getAttribute('y');
    });
    return max;
}

function cut(){
    for (var i =  minY() ; i <= maxY() ; i++) {
        var f = true;
        var line = getLine(i);
        line.forEach(function (b) {
            if (b.getAttribute('physic') != 'stat'){
                f = false;
            }
        });
        if (f) {
            for (var k = i ; k > 0 ; k--)
            for (var j = 0 ; j < n ; j++) {
                var but = getElementByXY(j,k);
                var nextBut = getElementByXY(j,k - 1);
                but.setAttribute('physic',nextBut.getAttribute('physic'));
                but.style.backgroundColor = nextBut.style.backgroundColor;
            }
            setScore();
        }
    }
}
function setScore(){
    scores.value = ++score;
}
function setTime(){
    timer.value = ++time;
}
function getRandom(max) {
    return Math.floor(Math.random() * max) + 1;
}

function getElementByXY(x,y) {
    return document.querySelector("[x='" + x + "'][y='"+y+"']")
}
function getLine(l) {
    return document.querySelectorAll("[y='" + l + "']");
}
function resTimer() {
    clearInterval(gameTimer);
    time = 0;
    timer.value = 0;
    gameTimer = setInterval("setTime()" , 1000);
}
// Запуск таймера и создание поля
var gameTimer = setInterval("setTime();" , 1000);
var fallTimer = setInterval("move('down');" , 200);
createField();
generateFigure();
