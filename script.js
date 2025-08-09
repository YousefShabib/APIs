function getPokemons(){
  return fetch("https://pokeapi.co/api/v2/pokemon?limit=500&offset=0")

    .then(response => response.json())
    .then(data => data.results);
}


function getPokemonDetails(url){
  return fetch(url)
    .then(response => response.json())
    .then(data => ({
      name: data.name,
      image: data.sprites.front_default
    }));
}
function generatePokemonCard(details) { // just create card wihout show, single reponsibility and easy for test cases and reuse.
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <img src="${details.image}" />
    <h3>${details.name}</h3>
    `;
  return card;
}

function renderPokemonCard(details, grid){ //this function show card 
  const card = generatePokemonCard(details);
  grid.appendChild(card);
}


function handlePokemonError(error) {
  console.error("Failed to load Pokemon details:", error);
}


function displayPokemons(){
  const grid = document.getElementById("pokemonGrid");


  getPokemons()
    .then(pokemons => {
      pokemons.forEach(poke => {
        getPokemonDetails(poke.url)
          .then(details => renderPokemonCard(details, grid))
          .catch(handlePokemonError);
      });
    })
    .catch(error => {
      console.error("Error fetching Pokemon list:", error);
    });
}

displayPokemons();

