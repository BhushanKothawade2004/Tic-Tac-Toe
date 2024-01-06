let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let msgContainer = document.querySelector(".msgContainer");
let newGameBtn = document.querySelector("#new-btn");
let msg = document.querySelector("#winner-msg");
let tieContainer = document.querySelector(".tie-container");

let turnX = true;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
]

let count = 0;

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnX) {
            box.innerText = "X";
            turnX = false;
        } else {
            box.innerText = "O"
            turnX = true;
            box.style.color = "#556b2f"
        }
        box.disabled = true;
        box.style.backgroundColor = "rgba(255, 255, 199, 0.5)";
        checkWinner();
        count++;
    })
})

const resetGame = () => {
    turnX = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    for(box of boxes) {
        box.style.backgroundColor = "white"
    }
}

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations Winner is ${winner}`;
    let a = setTimeout(() => {           
        msgContainer.classList.remove("hide");
    },800);
    disableBoxes();
}

const checkWinner = () => {
    for(pattern of winPatterns){
        pos1 = boxes[pattern[0]].innerText;
        pos2 = boxes[pattern[1]].innerText;
        pos3 = boxes[pattern[2]].innerText;

        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if(pos1 === pos2 && pos2 === pos3) {
                console.log("winer", pos1);
                showWinner(pos1);
            }
        }
    }
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);