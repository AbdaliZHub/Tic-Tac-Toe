let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#newGame");

let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let startBtn = document.querySelector("#startGame");
let modeSelect = document.querySelector("#mode");
let playerInput = document.querySelector("#playerX");

let turnDisplay = document.querySelector("#turnDisplay");

let scoreX = document.querySelector("#scoreX");
let scoreO = document.querySelector("#scoreO");
let drawDisplay = document.querySelector("#draws");

let playerX = "Player";
let playerO = "Computer";

let xScore = 0;
let oScore = 0;
let draws = 0;

let board = ["","","","","","","","",""];

let turnX = true;
let gameMode = "pvp";

const winPatterns = [
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
];

startBtn.addEventListener("click", () => {

playerX = playerInput.value || "Player";

gameMode = modeSelect.value;

if(gameMode === "pvp"){
playerO = "Player O";
}else{
playerO = "Computer";
}

updateScoreboard();
resetBoard();

});

boxes.forEach((box,index)=>{

box.addEventListener("click",()=>{

if(board[index] !== "") return;

makeMove(index,"X");

if(gameMode==="ai" && !turnX){
aiMove();
}

});

});

function makeMove(index,player){

board[index] = player;

boxes[index].innerText = player;
boxes[index].disabled = true;

if(checkWinner(player)){
showWinner(player);
return;
}

if(checkDraw()){
showDraw();
return;
}

turnX = !turnX;

turnDisplay.innerText = turnX ? `${playerX}'s Turn` : `${playerO}'s Turn`;

}

function aiMove(){

let empty = board
.map((v,i)=> v==="" ? i : null)
.filter(v=>v!==null);

let random = empty[Math.floor(Math.random()*empty.length)];

makeMove(random,"O");

}

function checkWinner(player){

return winPatterns.some(pattern=>{
return pattern.every(index=>board[index]===player);
});

}

function checkDraw(){

return board.every(cell=>cell!=="");

}

function showWinner(player){

let name = player==="X"?playerX:playerO;

msg.innerText = `🏆 ${name} Wins!`;

msgContainer.classList.remove("hide");

if(player==="X") xScore++;
else oScore++;

updateScoreboard();

disableBoard();

}

function showDraw(){

msg.innerText="It's a Draw";

msgContainer.classList.remove("hide");

draws++;

updateScoreboard();

}

function updateScoreboard(){

scoreX.innerText=`${playerX} : ${xScore}`;
scoreO.innerText=`${playerO} : ${oScore}`;
drawDisplay.innerText=`Draws : ${draws}`;

}

function disableBoard(){

boxes.forEach(box=>box.disabled=true);

}

function resetBoard(){

board = ["","","","","","","","",""];

boxes.forEach(box=>{
box.innerText="";
box.disabled=false;
});

msgContainer.classList.add("hide");

turnX = true;

turnDisplay.innerText = `${playerX}'s Turn`;

}

resetBtn.addEventListener("click",resetBoard);
newGameBtn.addEventListener("click",resetBoard);