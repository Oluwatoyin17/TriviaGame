$(document).ready(function(){
    
    // A variable that holds an array of questions
    var questionsToAnswer = ["In our solar system, which planet has the shortest day?", "In geometry, how many sides are on a heptagon?","Who was known as The Tramp or The King of Comedy?",
    "Which fictional character lived at 221b Baker Street?","Which two numbers are used in binary code?","In Japanese, what is the word for goodbye?"];


    //A variable that holds an array inside an array (nested arrays) of answer choices
    var answerChoices = [["Mars","Neptune","Jupiter","Saturn"],["Six","Eight","Seven","Nine"],["Charlie Chaplin","Rowan Atkinson","Robin Williams","Bill Cosby"],["Jim Halpert","Sherlock Holmes","Emma Swan",
       "Archie Andrews"],["0 and 1","10 and 11", "2 and 3","8 and 9"],["Konnichiwa","Hisashiburi","Sayonara","Suki desu"]];

    // A variable that holds an array of correct choices
    var correctAnswers = ["C. Jupiter","C. Seven","A. Charlie Chaplin","B. Sherlock Holmes","A. 0 and 1", "C. Sayonara"];

    // A variable that holds an array of images
    var imageArray = ["<img src='./assets/images/jupiter.jpg'>", "<img src='../assets/images/seven.png'>", "<img src='../assets/images/charlie.jpg'>", "<img src='../assets/images/sherlock.jpg'>",
         "<img src='../assets/images/zero.jpg'>", "<img src='../assets/images/sayonara.png'>" ];


    var counter = 20;
    var questionCounter = 0;
    var answersSelected;
    var theClock;
    var correctChoices = 0;
    var incorrectChoices = 0;
    var unansweredChoices = 0;
    var startScreen;
    var newHTML;


    function newScreen(){

        startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg start-button' href='#' role='button'>Start</a></p>";
        $(".mainArea").html(startScreen);

    }
    newScreen();

    function generateHTML() {
        // console.log(answerChoices[questionCounter][0]);
        newHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>20</span></p><p class='text-center'>" + questionsToAnswer[questionCounter] + "</p><p class='first-answer answer'><a class='btn btn outline-primary btn-lg answer-button' href='#' role='button'</a>A. " 
        + answerChoices[questionCounter][0] +
         "</p><p class='answer'>B. "+answerChoices[questionCounter][1]+"</p><p class='answer'>C. "+answerChoices[questionCounter][2]+"</p><p class='answer'>D. "+answerChoices[questionCounter][3]+"</p>";
        $(".mainArea").html(newHTML);
    }

    function delayTime() {
        if (questionCounter < questionsToAnswer.length-1) {
        questionCounter++;
        generateHTML();
        counter = 20;
        timerWrapper();
        }
        else {
            resultScreen();
        }
    }

    function timerWrapper() {
        theClock = setInterval(twentySeconds, 1000);
        function twentySeconds() {
            if (counter === 0) {
                clearInterval(theClock);
                generateLossDueToTimeOut();
            }
            if (counter > 0) {
                counter--;
            }
            $(".timer").html(counter);
        }
    }


    function generateWin() {
        correctChoices++;
        newHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>That's Correct!! The answer is: " 
        + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
        $(".mainArea").html(newHTML);
        setTimeout(delayTime, 2000); 
    }


    function generateLoss() {
        incorrectChoices++;
        newHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Nope! The answer is: "
        + correctAnswers[questionCounter] + "</p>" + "<img src='../assets/images/giphy2.gif'>";
        $(".mainArea").html(newHTML);
        setTimeout(delayTime, 2000); 
    }


    function generateLossDueToTimeOut() {
        unansweredChoices++;
        newHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You are out of time!  The answer is: " 
        + correctAnswers[questionCounter] + "</p>" + "<img src='../assets/images/giphy.gif'>";
        $(".mainArea").html(newHTML);
        setTimeout(delayTime, 2000); 
    }


     
    function resultScreen() {
        newHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Great job!! Here's how you did!" + "</p>" 
        + "<p class='summary-correct'>Correct Answers: " + 
        correctChoices + "</p>" + "<p>Wrong Answers: " + incorrectChoices + "</p>" + "<p>Unanswered: " + unansweredChoices + "</p>"
        + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg reset-button' href='#' role='button'>Reset</a></p>";
        $(".mainArea").html(newHTML);
    }
    
    function resetGame() {
        questionCounter = 0;
        correctChoices = 0;
        incorrectChoices = 0;
        unansweredChoices = 0;
        counter = 20;
        generateHTML();
        timerWrapper();
    }


    $("body").on("click", ".start-button", function(event){
 
        generateHTML();
    
        timerWrapper();
    
    });
    
    $("body").on("click", ".answer", function(event){
        answersSelected = $(this).text();
        if(answersSelected === correctAnswers[questionCounter]) {
    
            clearInterval(theClock);
            generateWin();
        }
        else {
            clearInterval(theClock);
            generateLoss();
        }
    });
    
    $("body").on("click", ".reset-button", function(event){
        resetGame();
    });
});