const protocol = window.location.protocol
const host = window.location.host



//account info
const displayAccountItem = document.querySelector("#displayAccountItem")
displayAccountItem.addEventListener("click", async(e) => {
    e.preventDefault()

    const token = localStorage.getItem("token")

    //const url = "http://localhost:3001/users/me"
    const url = 'https://justincairns-rest-api.herokuapp.com/users/me'

    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    let response = await fetch(url, options)

    if (response.ok) {
        if (response.status === 200) {
            const data = await response.json()

            const contentArea = document.querySelector("#contentArea")
            contentArea.innerHTML = `Name: ${data.name} <br>Email: ${data.email}`
        }
    } else {
        console.log("HTTP-Error: " + response.status)
    }
})

//modify account
const modifyAccountModalSaveButton = document.querySelector("#modifyAccountModalSaveButton")
modifyAccountModalSaveButton.addEventListener("click", async(e) => {
    e.preventDefault()

    const token = localStorage.getItem("token")

    //const url = "http://localhost:3001/users/me"
    const url = 'https://justincairns-rest-api.herokuapp.com/users/me'

    const nameInput = document.querySelector("#nameInput")
    const passwordInput = document.querySelector("#passwordInput")
    const name = nameInput.value
    const password = passwordInput.value
    const requestData = {...name && { name }, ...password && { password } }
    console.log(requestData)

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
        const contentArea = document.querySelector("#contentArea")
        contentArea.innerHTML = `Saved successful.`
    } else {
        console.log("HTTP-Error: " + response.status)
    }

    ///const modal = document.querySelector("#modifyAccountModal")
    //bootstrap.Modal.getInstance(modal).hide()
    $('#modifyAccountModal').modal('hide')
    const form = document.querySelector("#modifyAccountForm").reset()
})

//delete account
const deleteAccount = document.querySelector("#delete")
deleteAccount.addEventListener("click", async(e) => {
    e.preventDefault()

    const token = localStorage.getItem("token")

    //const url = "http://localhost:3001/users/me"
    const url = 'https://justincairns-rest-api.herokuapp.com/users/me'

    if(confirm("press OK to delete your account.")){
        const options = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

        let response = await fetch(url, options)

        if (response.ok) {
            if (response.status === 200) {

                const newUrl = `${protocol}//${host}`
                window.location.replace(newUrl)
            }
        } else {
            console.log("HTTP-Error: " + response.status)
        }
    }
})

//log out account 
const logOutAccount = document.querySelector("#logOut")
logOutAccount.addEventListener("click", async(e) => {
    e.preventDefault()

    const token = localStorage.getItem("token")

    //const url = "http://localhost:3001/users/me"
    const url = 'https://justincairns-rest-api.herokuapp.com/users/logout'

    const options = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    let response = await fetch(url, options)

    if (response.ok) {
        if (response.status === 200) {

            const newUrl = `${protocol}//${host}`
            window.location.replace(newUrl)
        }
    } else {
        console.log("HTTP-Error: " + response.status)
    }
})

//upload avatar
async function uploadAvatar() {
    const token = localStorage.getItem("token")

    const url = `https://justincairns-rest-api.herokuapp.com/users/me/avatar`
    
    const input = document.querySelector("#avatarInput")
    if(input.files.length == 0 ){
        return
    }
    const formData = new FormData();

    formData.append('avatar', input.files[0]);
    console.log("test")

    const options = {
        method: "POST",
        body: formData,
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    let response = await fetch(url, options)

    if (response.status === 200) {
        console.log("upload successful")
        
    } else {
        console.log("Error uploading avatar: " + response.status)
    }
}

//get avatar
async function loadAvatar() {
    const token = localStorage.getItem("token")

    const url = `https://justincairns-rest-api.herokuapp.com/users/me/avatar`

    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    let response = await fetch(url, options)

    if (response.status === 200) {
        
        const imageBlob = await response.blob()
        const imageObjectURL = URL.createObjectURL(imageBlob);

        const image = document.createElement('img')
        image.src = imageObjectURL
        image.className = 'profile-pic'

        const container = document.getElementById("accountHeader")
        container.prepend(image)
    }
    else {
        console.log("HTTP-Error: " + response.status)
    }
}

loadAvatar()