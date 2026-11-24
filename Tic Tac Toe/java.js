const cells = document.querySelectorAll(".cells")
const indexcells = Array.from(cells)

const container = document.querySelector(".container")
const result = document.getElementById("result")
const restartBtn = document.getElementById("restart")

const ans = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

const reserve = [0,0,0,0,0,0,0,0,0]

let turnO = true
let turnX = false
function logic(value){
    let winnerFound = false;

    for(const values of ans){
        if(
            reserve[values[0]] === value &&
            reserve[values[1]] === value &&
            reserve[values[2]] === value
        ){
            result.textContent = `${value} is the winner`;
            container.removeEventListener("click", handleClick);
            winnerFound = true;
            break;
        }
    }

    if(!winnerFound && !reserve.includes(0)){
        result.textContent = "It's a Draw!";
        container.removeEventListener("click", handleClick);
    }
}

function handleClick(event){

    if(event.target.classList.contains("cells")){

        const index = indexcells.indexOf(event.target)

        if(reserve[index] === 0){

            if(turnO){

                event.target.textContent = "O"
                reserve[index] = "O"

                logic("O")

                turnO = false
                turnX = true
            }

            else if(turnX){

                event.target.textContent = "X"
                reserve[index] = "X"

                logic("X")

                turnX = false
                turnO = true
            }

        }
    }

}


function resetGame(){

    // clear board UI
    indexcells.forEach(cell => {
        cell.textContent = ""
    })

    // reset board state
    reserve.fill(0)

    // reset turns
    turnO = true
    turnX = false

    // clear winner message
    result.textContent = ""

    // re-enable game
    container.addEventListener("click", handleClick)

}


container.addEventListener("click", handleClick)

restartBtn.addEventListener("click", resetGame)