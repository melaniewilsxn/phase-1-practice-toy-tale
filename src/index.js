let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  getAllToys()
  document.querySelector('.add-toy-form').addEventListener('submit', handleSubmit)
});

function handleSubmit(e){
  e.preventDefault()
  let toyObj = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0
  }
  renderOneToy(toyObj)
  postToy(toyObj)
}

//Get all toys
function getAllToys(){
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(toyData => toyData.forEach(toy => renderOneToy(toy)))
}

function renderOneToy(toy){
  //Build toy
  let card = document.createElement('div')
  card.className = 'card'
  card.innerHTML = `
  <h2>${toy.name}</h2>
  <img src="${toy.image}" class="toy-avatar" />
  <p>${toy.likes} Likes</p>
  <button class="like-btn" id="${toy.id}">Like ❤️</button>
  `

  card.querySelector('.like-btn').addEventListener('click', () => {
    toy.likes += 1
    card.querySelector('p').textContent = `${toy.likes} Likes`
    updateLikes(toy)
  })

  //Add toy card to DOM
  document.querySelector('#toy-collection').appendChild(card)
}

function postToy(toyObj){
  fetch("http://localhost:3000/toys", {
    method: 'POST',
    headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
    },

    body: JSON.stringify(toyObj)
  })
}

function updateLikes(toy){
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
    },

    body: JSON.stringify(toy)
  })
}