const isInMeeting = () => {
    return window.location.origin == "https://meet.google.com" && window.location.pathname.length == 13
}

const getAllButtons = () => {
    let divs = Array.from(document.getElementsByTagName("div"))
    let buttons = []
    divs.forEach(div => {
        if(div.role == "button"){
            buttons.push(div)
        }
    })
    return buttons
}

let prankMessages = []
const prankMessage = () => {
    let message = document.createElement("div")
    message.style = "top:"+(Math.random()*100)+"vh;left:"+(Math.random()*100)+"vw;color: "+["red","orange","yellow","green","blue","purple"][Math.round(Math.random()*5)]+";"
    message.className = "prankMessage"
    message.innerHTML = ["pranked","lol","hacker skillz","big hackz","woahhh"][Math.round(Math.random()*4)]
    prankMessages.push(message)
    document.body.appendChild(message)
    setTimeout(() => {
        prankMessages[0].remove()
        prankMessages.shift()
    },1750)
    setTimeout(prankMessage,Math.floor(Math.random()*15+25))
}

const isAdmin = async (password) => {
    let request = await fetch("https://8pz81.sse.codesandbox.io/isAdmin",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify({password})
    })
    let response = await request.json()
    return response.admin
}

let ran = false
const run = () => {
    console.log(isAdmin("testing321"))
    console.log(isAdmin("testing123"))
    if(isInMeeting()){
        let buttons = getAllButtons()
        buttons[0].addEventListener("mousedown",() => {
            setTimeout(() => {
                if(!ran){
                    console.log("executing hacker skillz")
                    ran = true
                    buttons = getAllButtons()
                    setTimeout(() => {
                        buttons.forEach(button => {
                            console.log(button.getAttribute("data-tooltip"))
                            if(button.getAttribute("data-tooltip") == "Turn on microphone (⌘ + d)" || button.getAttribute("data-tooltip") == "Turn on camera (⌘ + e)"){
                                button.click()
                            }
                        })
                        prankMessage()
                        ran = false
                    },2000)
                }
            },2000)
        })
    }
}

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        run()
    }
);