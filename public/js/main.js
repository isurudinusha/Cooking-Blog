let addIngredientsBtn = document.getElementById("addIngredientsBtn");
let removeIngredientsBtn = document.getElementById("removeIngredientsBtn");
let ingredeintsList = document.querySelector(".ingredeintsList");
let ingredeintDiv = document.querySelectorAll(".ingredeintDiv")[0];

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