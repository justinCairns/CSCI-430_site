const protocol = window.location.protocol
const host = window.location.host

const url = 'https://justincairns-rest-api.herokuapp.com/tasks'
const token = localStorage.getItem("token")

data = []
taskPointer = 0

window.onload = function(){
    displayTask()
}

//Display Task
async function displayTask(){

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
            
            const taskNumber = document.querySelector("#taskNumber")
            taskNumber.innerHTML = 'Tasks: ' + (taskPointer+1) + '/' + data.length

            const contentArea = document.querySelector("#contentArea")
            contentArea.innerHTML = `<div class="card mx-auto" style="width: 18rem;">
                                        <div class="card-body text-center">
                                            <h5 id="title" class="card-title text-center">Task: ${data[taskPointer].title}</h5>
                                            <ul class="list-group list-group-flush text-center">
                                                <li id="description" class="list-group-item">Description: ${data[taskPointer].description}</li>
                                                <li id="completed" class="list-group-item">Completed: ${data[taskPointer].completed}</li>
                                            </ul>
                                            <div class="btn btn-primary"> Modify</div>
                                            <div class="delete btn btn-danger" onclick="deleteTask(this.id)"> Delete</div>
                                        </div>
                                    </div>
                                    <br>`
            if(taskPointer < (data.length-1)){
            taskPointer++;
            }
            else{
                taskPointer = 0
            }
            console.log(taskPointer)
      }
    }



}

const nextTask = document.querySelector("#next-btn")
nextTask.addEventListener("click", displayTask)

//Modify Task
    
//Delete Task

async function deleteTask(clicked_id){

  /*  if(confirm("press OK to delete this task.")){
        const options = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(requestData),
        }

        let response = await fetch(url, options)

        if (response.ok) {
            if (response.status === 200) {
                console.log("success")
            }
        } else {
            console.log("HTTP-Error: " + response.status)
        }
    }*/

}
//New Task