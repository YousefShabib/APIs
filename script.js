function getPokemons() {
  return fetch("https://pokeapi.co/api/v2/pokemon?limit=500&offset=0")
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
  getPokemons()
    .then(pokemons => {
      const grid = document.getElementById("pokemonGrid");

      pokemons.forEach(poke => { // عشان نعرض كل بوكيمون مباشره اول ما يوصل
        getPokemonDetails(poke.url)
          .then(details => { // نعرض يلي جاهز بدون ما استنى الباقي يوصلو
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
              <img src="${details.image}" />
              <h3>${details.name}</h3>
            `;
            grid.appendChild(card); //  هون يعني ضيف البطاقة مباشره بس توصل
          })
          .catch(error => {
            console.error("Failed to load Pokemon details:", error);
          });
      });
    })
    .catch(error => {
      console.error("Error fetching Pokemon list:", error);
    });
}


displayPokemons();
