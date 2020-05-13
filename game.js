
var randomNumber;
var stars = ['jordan','pippen','rodman', 'phi'];
var gamePattern = [];
var gamePatternCopy = [];


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function nextSequence(){
    randomNumber = Math.floor(Math.random()* 4)
    gamePattern.push(stars[randomNumber])
    //console.log(gamePattern);
    for (const element of gamePattern){
        audio = new Audio("sounds/dribble.mp3");
        audio.play();
        $("#"+element).fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);
        await sleep(2000);
    }

    gamePatternCopy = [...gamePattern];

    $(".btn").on("click", function(e){

        let userInput = this.getAttribute("id");
        this.classList.add("pressed");
        setTimeout( ()=>{this.classList.remove("pressed");}, 200);

        if (gamePatternCopy.length>0){
            let expected = gamePatternCopy.shift();

            if (expected != userInput ){
                audio = new Audio("sounds/wrong.mp3");
                audio.play();
                this.classList.add("game-over");
                setTimeout( ()=>{this.classList.remove("game-over");}, 2000);
                console.log("game over");
                $(".btn").unbind();

                correctLength = gamePattern.length - 1;
                $("#info").html("Game Over! You have remembered " + correctLength + " dances! Press a key to start.");
                $("#info").css("visibility","visible");
                console.log("press any key to start!");
            }
            else{
                console.log("correct!");
                if(gamePatternCopy.length === 0){
                    console.log('All correct');
                    $(".btn").unbind();
                    $("#info").html("All correct!");
                    $("#info").css("visibility","visible");
                    $("#info").fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);
                    askForReady();
                }
            }
        }
    });
}

function askForReady(){
    $("#info").css("visibility","visible");
    setTimeout(function(){
        $("#info").html("Ready? 3...");
        $("#info").fadeOut(500).fadeIn(500);
        setTimeout(function(){
            $("#info").html("2...");
            $("#info").fadeOut(500).fadeIn(500);
            setTimeout(function(){
                $("#info").html("1...");
                $("#info").fadeOut(500).fadeIn(500);
                setTimeout(function(){
                    $("#info").html("Go!");
                    $("#info").fadeOut(500).fadeIn(500);
                    setTimeout(function(){
                        $("#info").css("visibility","hidden");
                        nextSequence();
                    },1000);
                },1000);
            },1000);
        },1000);
    },2000);
}
function initiateGame(){
    gamePattern = [];
    askForReady();
}


$(document).on("keypress", function(e){
    $("#info").html("Ready to start...");
    initiateGame();
})


