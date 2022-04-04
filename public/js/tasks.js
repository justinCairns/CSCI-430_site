const protocol = window.location.protocol
const host = window.location.host

let url = 'https://justincairns-rest-api.herokuapp.com/tasks'

const token = localStorage.getItem("token")

data = []
taskPointer = 0

window.onload = function(){
    displayTask(taskPointer)
}

//Display Task
async function displayTask(pointer){
    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    let response = await fetch(url, options)

    if(response.ok){
        if(response.status === 200){
            data = await response.json()
            if(pointer >= data.length){
                taskPointer = 0;
                pointer = taskPointer
            }
            if(data.length == 0){
                pointer = -1
            }
            const taskNumber = document.querySelector("#taskNumber")
            taskNumber.innerHTML = 'Tasks: ' + (pointer+1) + '/' + data.length


            const contentArea = document.querySelector("#contentArea")
            contentArea.innerHTML = `<div class="card mx-auto" style="width: 18rem;">
                                        <div class="card-body text-center">
                                            <h5 id="title" class="card-title text-center">Task: ${data[pointer].title}</h5>
                                            <ul class="list-group list-group-flush text-center">
                                                <li id="description" class="list-group-item">Description: ${data[pointer].description}</li>
                                                <li id="completed" class="list-group-item">Completed: ${data[pointer].completed}</li>
                                            </ul>
                                            <div class="btn btn-primary" data-toggle="modal" data-target="#modifyTaskModal"> Modify</div>
                                            <div class="btn btn-danger" data-toggle="modal" data-target="#deleteTaskModal"> Delete</div>
                                        </div>
                                    </div>
                                    <br>`
           /* if(taskPointer < (data.length-1)){
            taskPointer++;
            }
            else{
                taskPointer = 0
            }*/
      }
    }



}

const nextTask = document.querySelector("#next-btn")
nextTask.addEventListener("click", async(e) =>{
    if(taskPointer < (data.length-1)){
        taskPointer++;
        }
        else{
            taskPointer = 0
        }

    displayTask(taskPointer)
})

//Filter Tasks
const allFilter = document.querySelector("#filter-all-btn")
allFilter.addEventListener("click", async(e) =>{
    e.preventDefault()
    
    let urlAll = 'https://justincairns-rest-api.herokuapp.com/tasks'
    url = urlAll
    displayTask(taskPointer)
})

const uncompletedFilter = document.querySelector("#filter-un-btn")
uncompletedFilter.addEventListener("click", async(e) =>{
    e.preventDefault()
    
    let urlFalse = 'https://justincairns-rest-api.herokuapp.com/tasks?completed=false'
    url = urlFalse
    displayTask(taskPointer)
})

const completedFilter = document.querySelector("#filter-com-btn")
completedFilter.addEventListener("click", async(e) =>{
    e.preventDefault()

    let urlTrue = 'https://justincairns-rest-api.herokuapp.com/tasks?completed=true'
    url = urlTrue
    displayTask(taskPointer)
})

//Sort Tasks
const recentSort = document.querySelector("#sort-rec-btn")
recentSort.addEventListener("click", async(e) =>{
    e.preventDefault()

    let urlRecent = 'https://justincairns-rest-api.herokuapp.com/tasks?sortBy=updatedAt:desc'
    url = urlRecent
    displayTask(taskPointer)
})

const oldSort = document.querySelector("#sort-old-btn")
oldSort.addEventListener("click", async(e) =>{
    e.preventDefault()

    let urlOld = 'https://justincairns-rest-api.herokuapp.com/tasks?sortBy=updatedAt:asc'
    url = urlOld
    displayTask(taskPointer)
})


//Create Task
const createTaskModalSaveButton = document.querySelector("#createTaskModalSaveButton")
createTaskModalSaveButton.addEventListener("click", async(e) => {
    e.preventDefault()

    const titleInput = document.querySelector("#titleInput")
    const descriptionInput = document.querySelector("#descriptionInput")
    const completedInput = document.querySelector("#completed")
   
    const title = titleInput.value
    const description = descriptionInput.value
    const completed = completedInput.checked

    let newTask = {title, description, completed}

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newTask)
    }

    let response = await fetch(url, options)
    newTask = await response.json()

    if (response.status === 400) {
        alert("name left blank")
    } 
    else if (response.status === 201) {
        location.reload()
    }

})

//Modify Task
const modifyTaskModalSaveButton = document.querySelector("#modifyTaskModalSaveButton")
modifyTaskModalSaveButton.addEventListener("click", async(e) => {
    e.preventDefault()

    const titleInput = document.querySelector("#modifyTitleInput")
    const descriptionInput = document.querySelector("#modifyDescriptionInput")
    const completedInput = document.querySelector("#modifyCompleted")

    let  _id = data[taskPointer]._id

    const title = titleInput.value
    const description = descriptionInput.value
    const completed = completedInput.checked

    const requestData = {..._id && { _id }, ...title && { title }, ...description && { description }, ...completed && { completed } }

    const options = {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
    }

    let response = await fetch(url, options)

    if (response.status === 200) {
        alert("task modified successfully")
        location.reload()   
    } else {
        console.log("HTTP-Error: " + response.status)
    }
})
    
//Delete Task
const deleteTaskModalButton = document.querySelector("#deleteTaskModalButton")
deleteTaskModalButton.addEventListener("click", async(e) => {
    e.preventDefault()

    let _id = data[taskPointer]._id
 

    const requestData = {..._id && { _id } }
    console.log(requestData)

    const options = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
    }

    let response = await fetch(url, options)

    if (response.ok) {
        if (response.status === 200) {
            location.reload()
        }
    } else {
        console.log("HTTP-Error: " + response.status)
    }
})