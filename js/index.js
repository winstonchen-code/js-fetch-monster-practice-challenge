const URL = 'http://localhost:3000/monsters'

let PAGE_NUM = 1

document.addEventListener("DOMContentLoaded", () => {
    fetchMonsters()

    document.getElementById('monster-form').addEventListener('submit', (event) => {
        event.preventDefault()
        addMonster(event)
    })

    document.getElementById("forward").addEventListener('click', () => pageForward())
    document.getElementById("back").addEventListener('click', () => pageBackward())
})

function addMonster(event){
    let newMonster = {
        name: event.target.name.value,
        age: parseInt(event.target.age.value),
        description: event.target.description.value
    }

    let reqPack = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        method: "POST",
        body: JSON.stringify(newMonster)
    }

    fetch(URL, reqPack)
        .then(resp => resp.json())
        .then(monster => renderMonster(monster))
}

function fetchMonsters() {
    document.getElementById('monster-container').innerText = ""
    fetch(`http://localhost:3000/monsters/?_limit=500&_page=${PAGE_NUM}`)
        .then(resp => resp.json())
        .then(monsters => {
            monsters.forEach(monster => renderMonster(monster))
        })
}

function renderMonster(monster) {
    let monsterContainer = document.getElementById('monster-container')
    
    let div = document.createElement('div')

    let header = document.createElement('h2')
        header.innerText = monster.name

    let age = document.createElement('h4')
        age.innerText = `Age: ${monster.age}`
        
    let bio = document.createElement('p')
        bio.innerText = `Bio: ${monster.description}`
    
    div.append(header, age, bio)
    monsterContainer.append(div)

}

function pageForward() {
    PAGE_NUM++
    fetchMonsters()
}

function pageBackward() {
    PAGE_NUM--
    fetchMonsters()
}