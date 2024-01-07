let boxes = document.querySelectorAll(".box");
let msgContainer = document.querySelector(".msgContainer");
let winMsg = document.querySelector("#winner-msg");
let newGameBtn = document.querySelector("#new-btn");
let resetBtn = document.querySelector("#reset-btn");
let tieContainer = document.querySelector(".tie-container");
let tieBtn = document.querySelector(".new-game")

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
let turnX = true;

for(let box of boxes){
    box.addEventListener("click", () => {
        if(turnX) {
            box.innerText = "X";
            box.style.color = "#b0413e";
            turnX = false;
        } else {
            box.innerText = "O";
            box.style.color = "#556b2f";
            turnX = true;
        }
        box.disabled = true;
        box.style.backgroundColor = "rgba(255, 255, 199, 0.5)";
        winGame();
        tieCondition(); 
    });
}


const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = ""; 
    }
}

const resetGame = () => {
    turnX = true;
    enableBoxes();
    for(let box of boxes) {
        box.style.backgroundColor = "white";
    }
}

const showWinner = (winner) => {
    winMsg.innerText = `Congrtaulations! Winner is ${winner}`
    setTimeout (() => {
        msgContainer.classList.remove("hide")
    }, 500);
    disableBoxes();
}

const tieCondition = () => {
    let winner = winGame();
    let clickBox = 0;
    for(let box of boxes) {
        if(box.disabled) {
            clickBox ++;
        } 
    }
    if(clickBox === 9 && !winner) {
        setTimeout(() => {
            tieContainer.classList.remove("new-hide");
        }, 500);
    }
}

const winGame = () => {
    for(let idx of winPatterns) {
        let pos1 = boxes[idx[0]].innerText;
        let pos2 = boxes[idx[1]].innerText;
        let pos3 = boxes[idx[2]].innerText;
        if(pos1 != "" && pos2 != "" && pos3 != "") {
            if(pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
            }
        }
    }
}

resetBtn.addEventListener("click", () => {
    resetGame();
});

newGameBtn.addEventListener("click", () => {
    msgContainer.classList.add("hide");
    tieContainer.classList.add("new-hide");
    resetGame();   
});

tieBtn.addEventListener("click", () => { 
    tieContainer.classList.add("new-hide");
    resetGame();
})