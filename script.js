let url = "https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple"
let ques = document.querySelector(".question")
let next = document.querySelector("#next")
let options = document.querySelectorAll(".options")
let score=document.querySelector(".score")
let quiz=document.querySelector(".quiz")
let total_questions=document.querySelector(".total-questions")
let total_correct=document.querySelector(".correct")
let total_wrong=document.querySelector(".wrong")
let correct_answer=""
let percentage=document.querySelector(".percentage")
let result=document.querySelector(".status")
let next_quiz=document.querySelector(".next-quiz")
let i=1
let right_ans=0
let wrong_ans=0


const get_questions = async () => {
    let response = await fetch(url)
    let question = await response.json()
    console.log(question)
    let correct = question.results[0].correct_answer
    let wrong = question.results[0].incorrect_answers
    let insert_index = Math.floor(Math.random() * 4)
   wrong= wrong.filter(e=>
        e!==correct   )   
    wrong.splice(insert_index, 0, correct)
    ques.innerHTML = question.results[0].question
    options.forEach((e, index) => {
        e.innerHTML = wrong[index]
        
    })
   
    next.addEventListener("click", () => {
        if(i==question.results.length){
            score.style.display="flex"
            next.style.display="none"
            quiz.style.display="none"
        }

        if(i<question.results.length){
            ques.innerHTML = question.results[i].question
            let correct = question.results[i].correct_answer
            let wrong = question.results[i].incorrect_answers
            let insert_index = Math.floor(Math.random() * 4)
           wrong= wrong.filter(e=>
                e!==correct
            )
            wrong.splice(insert_index, 0, correct)
            options.forEach((e, index) => {
                e.innerHTML = wrong[index]
                e.style.background="none"
                e.style.pointerEvents="auto"
            })
           
            
            total_questions.innerHTML=`Total Questions: ${question.results.length}`
            correct_answer=correct
        }

        total_correct.innerHTML=`Correct Answers: ${right_ans}`
        total_wrong.innerHTML=`Wrong Answers: ${wrong_ans}`
        let per=right_ans/10*100
        percentage.innerHTML=`Percentage: ${per}%`
        if(per<50){
            result.innerHTML=`Status: ${"Fail"}`
        }       
        i++
    })
   correct_answer=correct
}


const select_answer=()=>{   
    options.forEach((opt)=>{
        opt.addEventListener("click",(e)=>{
            checkAnswer(e.target.innerHTML,correct_answer)
            if(e.target.innerHTML === correct_answer){
                e.target.style.background="rgb(100, 178, 99)"            
            }
            else{
                e.target.style.background="rgb(224, 142, 142)"
                
                
                options.forEach((e)=>{
                    if(e.innerHTML===correct_answer){
                        e.style.background="rgb(100, 178, 99)"
                    }
                    e.style.pointerEvents = "none"; 
                })
            }                      
        })  
     
    })   
}



function checkAnswer(selected, correct) {
    if (selected == correct) {
        right_ans++;
        
    } else{
        wrong_ans++;
    }
}
next_quiz.addEventListener("click",()=>{
  window.location.reload()
})
get_questions()
select_answer()


