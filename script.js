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

    //Promise.all

    const promises = pokemons.map(poke => getPokemonDetails(poke.url));
    const allDetails = await Promise.all(promises);

    for (let details of allDetails) {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
         <img src="${details.image}" />
        <h2>${details.name}</h2>
      `;
        grid.appendChild(card);
    }
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


