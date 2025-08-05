function getPokemons() {
    return fetch("https://pokeapi.co/api/v2/pokemon?limit=5000&offset=0")
        .then(response => response.json())
        .then(data => data.results);
}

function getPokemonDetails(url) {
    return fetch(url)
        .then(response => response.json())
        .then(data => ({
            name: data.name,
            image: data.sprites.front_default
        }));
}

function displayPokemons() {
    const grid = document.getElementById("pokemonGrid");

    getPokemons().then(pokemons => {
        pokemons.forEach(poke => {
            getPokemonDetails(poke.url).then(details => {
                const card = document.createElement("div");
                card.className = "card";

                card.innerHTML = `
                 <img src="${details.image}" />
                 <h2>${details.name}</h2>
               `;

                grid.appendChild(card);
            });
        });
    });
}

displayPokemons();

document.getElementById("search").addEventListener("input", function (x) {
    const searchValue = x.target.value.toLowerCase(); 
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const name = card.querySelector("h2").innerText.toLowerCase();
        if (name.includes(searchValue)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});
