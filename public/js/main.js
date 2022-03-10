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
