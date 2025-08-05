async function getPokemons() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50&offset=0");
    const data = await response.json();
    return data.results;
}

async function getPokemonDetails(url) {
    const response = await fetch(url);
    const data = await response.json();
    return {
        name: data.name,
        image: data.sprites.front_default
    };
}

async function displayPokemons() {
    const pokemons = await getPokemons();
    const grid = document.getElementById("pokemonGrid");

    for (let poke of pokemons) {
        const details = await getPokemonDetails(poke.url);
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
         <img src="${details.image}" />
         <h3>${details.name}</h3>
       `;

        grid.appendChild(card);
    }
}

displayPokemons();

document.getElementById("search").addEventListener("input", function (x) {
    const searchValue = x.target.value.toLowerCase();
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const name = card.querySelector("h3").innerText.toLowerCase();
        if (name.includes(searchValue)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});
