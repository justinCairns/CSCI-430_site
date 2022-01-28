const protocol = window.location.protocol
const host = window.location.host

const loginForm = document.querySelector('#loginForm')
const emailInput = document.querySelector('#email')
const passwordInput = document.querySelector('#password')

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const email = emailInput.value;
    const password = passwordInput.value;

    const url = `${protocol}//${host}/login?email=${email}&password=${password}`

    let response = await fetch(url)

    if (response.ok) {
        const data = await response.json()

        if (data.status === 401) {
            const message = document.querySelector('#message1')
            message.textContent = "Invalid email or password."
        } 
        else {
            const newUrl = `${protocol}//${host}/main?token=${data.token}`
            window.location.replace(newUrl);
        }

    } else {
        console.log("HTTP-Error: " + response.status);
    }
})
