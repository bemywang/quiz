// get all required elements with class
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
// select inside info_box
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
// option
const option_list = document.querySelector(".option_list")
// 倒數時間
const timeCount = quiz_box.querySelector(".timer .timer_sec")
const timeLine = quiz_box.querySelector("header .time_line")
const timeOff = quiz_box.querySelector("header .time_text")



// click start button
start_btn.onclick = ()=> {
    info_box.classList.add("activeInfo"); //show info box
}

// clikc exit button
exit_btn.onclick = ()=> {
    info_box.classList.remove("activeInfo"); //hide the info box
}

// click continue button ("restart or retry button", not "next button")
continue_btn.onclick = ()=> {
    info_box.classList.remove("activeInfo"); //hide the info box, then↓
    quiz_box.classList.add("activeQuiz"); //show the quiz box
    showQuestions(0); // start with 0
    queCounter(1); // start with 1
    startTimer(30); // timer start with 90s
    startTimerLine(0); // timer line

}

let que_count = 0; // 修改
let que_num = 1
let counter; //time counter for func startTimer
let counterLine;
let timeValue = 30;
let widthValue = 0; // timer line streaming
let userScore = 0;


const next_btn = quiz_box.querySelector(".next_btn");
// result box
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");


// restart agian
restart_quiz.onclick =()=> {
    window.location.reload();
    
}

// quit game
quit_quiz.onclick = ()=> { //顯示本次結果
    // window.location.reload();
}

// click next button
next_btn.onclick = ()=> {
    // //add up question numbers
    // que_count++;
    // showQuestions(que_count);
    if(que_count < questions.length -1) { //********修改成隨機change it later */
        que_count++;
        que_num++;
        showQuestions(que_count);
        queCounter(que_num);
        clearInterval(counter); // click next, clear all time
        startTimer(timeValue); // then, start again from top
        // timerLine ..
        clearInterval(counterLine); // click next, clear all time
        startTimerLine(widthValue); // then, start again from top
        // next btn
        next_btn.style.display = "none"; //還未選擇 所以要先隱藏
        timeOff.textContent = "剩餘時間："


    } else {
        clearInterval(counter); // stop
        clearInterval(counterLine); // stop

        console.log("Questions completed.")
        showResultBox();
    }
    
}


// get questions from Array
function showQuestions(index) {
    // assign const
    const que_text = document.querySelector(".que_text");
    // assign let for html
    let que_tag = '<span>' + (index + 1) +". " + questions[index].question + '</span>'; //get index=0 question and numbers(index + 1)
    let option_tag = '<div class="option"><span>' + questions[index].options[0] + '</span></div>'
    + '<div class="option"><span>' + questions[index].options[1] + '</span></div>'
    + '<div class="option"><span>' + questions[index].options[2] + '</span></div>'
    + '<div class="option"><span>' + questions[index].options[3] + '</span></div>'
    // innerHTML
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    // assign const option_list >> option
    // set onclick attribute to all available options
    const option = option_list.querySelectorAll(".option");
    for(let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)"); 
        //optionSelected(this) > func > click this to change
    }
}
/* 打勾 打叉*/ 
let tickIcon = '<div class="icon tick"><i class="fa-solid fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fa-solid fa-xmark"></i></div>';

 /******修改成挑選隨機 */
function optionSelected(answer){ //answer param here
    clearInterval(counter); // click next, clear all time
    clearInterval(counterLine); // click next, clear all timeLine

    let userAns = answer.textContent.charAt(0); //html內容
    let correctAns = questions[que_count].answer; //目前題號 que_count, answer-js list
    let allOptions = option_list.children.length; //所有選項長度
    // console.log(userAns);
    // console.log(correctAns);
    if(userAns == correctAns) {
        userScore += 1;
        console.log(userScore +"分");
        answer.classList.add("correct");
        console.log("Answer is correct");
        answer.insertAdjacentHTML("beforeend", tickIcon); //beforeend - after last child b4 end
    } else {
        answer.classList.add("incorrect");
        console.log("Wrong!");
        answer.insertAdjacentHTML("beforeend", crossIcon); //beforeend - after last child b4 end

        //  wrong answer -> automatically selecte the correct ans
        for(let i = 0; i < allOptions; i++) {
            if(option_list.children[i].textContent.charAt(0) == correctAns) {
                option_list.children[i].setAttribute("class", "option correct"); //CSS show green
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
        }
    }
    // once user selected disabled all options - 選擇後 不能再修改
    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled"); //CSS pointer event none
    }
    next_btn.style.display = "block"; //選擇答案後出現 next btn

}

function queCounter(index) {
    const bottom_ques_counter = quiz_box.querySelector(".total_que");
    let totalQuesCountTag = '<span><p>'+ index + '</p>/<p>10</p>題</span>'; //共5題
    bottom_ques_counter.innerHTML = totalQuesCountTag;
}


function startTimer(time){
    counter = setInterval(timer, 1000); //timer:local func below
    function timer(){
        timeCount.textContent = time; // param is passed into HTML
        time--;
        if(time < 9) {
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0) {
            clearInterval(counter);
            timeCount.textContent = "00";
            timeOff.textContent = "時間到！"

            let correctAns = questions[que_count].answer; //目前題號 que_count, answer-js list
            let allOptions = option_list.children.length; //所有選項長度

            for(let i = 0; i < allOptions; i++) {
                if(option_list.children[i].textContent.charAt(0) == correctAns) {
                    option_list.children[i].setAttribute("class", "option correct"); //CSS show green
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
                }
            }
                // once user selected disabled all options - 選擇後 不能再修改
            for (let i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled"); //CSS pointer event none
            }
            next_btn.style.display = "block"; //選擇答案後出現 next btn
        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 56) //550步 width:550px for quiz box; 550/90秒
    function timer() {
        time += 1;
        timeLine.style.width = time + "px";
        if(time > 549) { //550px width
            clearInterval(counterLine);
        }
    }
}


function showResultBox() {
    info_box.classList.remove("activeInfo"); //hide the info box, then↓
    quiz_box.classList.remove("activeQuiz"); //hide the quiz box, then↓
    result_box.classList.add("activeResult"); //show the result box
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 9) { //4題 -->  每題*20分
        let scoreTag = '<span>超強的!!你宮劇系!獲得分數<p>' + (userScore*10) + '</p> / <p>100</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if (userScore > 7) { //3題 --> 不錯 每題*20分
        let scoreTag = '<span>還可以拉，再接再厲喔，獲得分數<p>' + (userScore*10) + '</p> / <p>100</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else { //3題 --> 再努力 每題*20分
        let scoreTag = '<span>嘖嘖分數不佳，你還是去補看內容，獲得分數<p>' + (userScore*10) + '</p> / <p>100</p></span>';
        scoreText.innerHTML = scoreTag;
    }

}
