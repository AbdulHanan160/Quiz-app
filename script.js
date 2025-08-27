let url = "https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple"
let ques = document.querySelector(".question")
let next = document.querySelector("#next")
let options = document.querySelectorAll(".options")
let score=document.querySelector(".score")
let quiz=document.querySelector(".quiz")
let total_questions=document.querySelector(".total-questions")
let total_correct=document.querySelector(".correct")
let total_wrong=document.querySelector(".wrong")
const get_questions = async () => {
    let response = await fetch(url)
    let question = await response.json()
    console.log(question)
    let correct = question.results[0].correct_answer
    let wrong = question.results[0].incorrect_answers
    let insert_index = Math.floor(Math.random() * 4)
    wrong.splice(insert_index, 0, correct)
    ques.innerHTML = question.results[0].question
    options.forEach((e, index) => {
        e.innerHTML = wrong[index]
        
    })
let i=1

    next.addEventListener("click", () => {
        if(i<=question.results.length){
            ques.innerHTML = question.results[i].question
            let correct = question.results[i].correct_answer
            let wrong = question.results[i].incorrect_answers
            let insert_index = Math.floor(Math.random() * 4)
            wrong.splice(insert_index, 0, correct)
            options.forEach((e, index) => {
                e.innerHTML = wrong[index]
                e.style.background="none"
                e.style.pointerEvents="auto"
            })
            i++
            total_questions.innerHTML=`Total Questions: ${question.results.length}`
            select_answer(correct)
        }
        if(i>=question.results.length){
            score.style.display="flex"
            next.style.display="none"
            quiz.style.display="none"
        }
       
        

    })
   select_answer(correct)
}

const select_answer=(correct)=>{
   
    options.forEach((opt)=>{
        opt.addEventListener("click",(e)=>{
            if(e.target.innerHTML === correct){
                e.target.style.background="rgb(100, 178, 99)"
                
                
            }
            else{
                e.target.style.background="rgb(224, 142, 142)"
                
                
                options.forEach((e)=>{
                    if(e.innerHTML===correct){
                        e.style.background="rgb(100, 178, 99)"
                    }
                    e.style.pointerEvents = "none"; 
                })
            }                      
        })  
    
    })   
}

  
get_questions()


