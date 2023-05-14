let addIngredientsBtn = document.getElementById("addIngredientsBtn");
let removeIngredientsBtn = document.getElementById("removeIngredientsBtn");


addIngredientsBtn.addEventListener("click", () => {
    let newIngredeints = ingredeintDiv.cloneNode(true);
    let input = newIngredeints.querySelector("input");
    input.value = "";
    ingredeintsList.appendChild(newIngredeints);
});

removeIngredientsBtn.addEventListener("click", () => {
    if (ingredeintsList.children.length > 1) {
        ingredeintsList.removeChild(ingredeintsList.lastChild);
    }
});


let contactForm = document.querySelector(".contact-form");
let name = document.getElementById("name");
let email = document.getElementById("email");
let subject = document.getElementById("subject");
let message = document.getElementById("message");
let send = document.getElementById("send-btn");

