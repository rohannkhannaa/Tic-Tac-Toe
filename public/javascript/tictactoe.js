// jQuery
var winArray ;
var currentTurn ;
var button ;
var counter = 0 ;
var x = -1 ;
changeTurn();
function reset(){
    location.reload();
}
function applyResetLayout(){
    for(var i = 1 ; i <= 9 ; i++){
        $(".b"+i).prop('disabled', true) ;
    }
    var mark = arguments[0];
    if(mark == 'X'){
        $("h1").text ("🚩 Player I won");
    }
    if (mark == 'O'){
        $("h1").text ("Player II won 🚩");
    }
    if(mark == 'D'){
        $("h1").text ("🚩 Match is draw 🚩");
    }

    $(".resetButton").on("click", function(){
        reset();
    })    
}
 

function changeTurn(){
    x = checkWinner();
    if(x===2){
        // alert("Draw detected");
        $(".turnDecider").hide();
        $(".resetButton").addClass("activateReset");
        var mark = 'D';
        applyResetLayout(mark);
    }
    else if(x===1){
        // alert("Win detected");
        $(".turnDecider").hide();
        $(".resetButton").addClass("activateReset");
        for(var i = 0 ; i < 3 ; i++){
            $(".b"+winArray[i]).addClass("winnerDecided");
        }
        
        var mark = $(".b"+winArray[0]).text();
        applyResetLayout(mark);
    }
    else{
        counter++;
        if(currentTurn==='X'){
            // alert("Alert X-> O");
            currentTurn='O';
        }else{
            // alert("Alert O-> X");
            currentTurn='X';
        }
    } 
}
function moveTeller(){
    // To again get the currentTurn after an invalid move
    if(currentTurn==='X'){
        $(".turnDecider").text("Player I turn");
    }else{
        $(".turnDecider").text("Player II turn");
    }
}
for(let i = 1 ; i <= 9 ; i++)
{
    $(".b"+i).on("click", function(){
        if(this.innerHTML === ""){
            this.innerHTML = currentTurn;
            changeTurn();
            moveTeller();
        }
        else{
            $(".turnDecider").addClass("invalid");
            $(".invalid").removeClass("turnDecider");
            $(".invalid").text("INVALID MOVE");
            const myTimeout = setTimeout(function(){
                $(".invalid").addClass("turnDecider");
                $(".turnDecider").removeClass("invalid");
                clearTimeout(myTimeout);
                moveTeller();
            }, 1500);
        }
    });
}

function checkWinner(){
    button = [];
    button[0] = 0 ;
    for(var i = 1 ; i <= 9 ; i++){
        if($(".b"+i).text() === "X"){
            button[i] = 1 ;
        }
        else if($(".b"+i).text() === "O"){
            button[i] = 2 ;
        }
        else{
            button[i] = 0 ; // Empty Space
        }
    }
    // ROW CHECK
    for(let i = 1 ; i <= 7 ; i+=3){
        if((button[i]===button[i+1]) && (button[i+1]===button[i+2])  && (button[i]!=0)){
            // Winner Found
            winArray  = [i, i+1, i+2];
            return 1 ;
        }
    }
    // COL CHECK
    for(let i = 1 ; i <= 3 ; i++){
        if((button[i]===button[i+3]) && (button[i+3]===button[i+6]) && (button[i]!=0)){
            // Winner Found
            winArray  = [i, i+3, i+6];
            return 1 ;
        }
    }
    // DIAG CHECK
    if((button[1]!=0) && (button[1] === button[5])&& (button[5]===button[9])){
        winArray = [1,5,9];
        return 1;
    }
    if((button[3]!=0) && (button[3] === button[5])&& (button[5]===button[7])){
        winArray = [3,5,7];
        return 1;
    }
    // Winner not made yet
    if(counter===9){
        return 2 ;
    }
    return 0;
}