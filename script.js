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
      image: data.sprites.front_default,
      images: [
        data.sprites.front_default,
        data.sprites.back_default,
        data.sprites.front_shiny,
        data.sprites.back_shiny
      ].filter(Boolean),
      height: data.height,
      weight: data.weight,
      types: data.types.map(t => t.type.name).join(", ")
    }));
}

function generatePokemonCard(details) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <img src="${details.image}" alt="${details.name}" />
    <h3>${details.name}</h3>
  `;
  return card;
}

function renderPokemonCard(details, grid) {
  const card = generatePokemonCard(details);
  card.addEventListener("click", function () {
    let index = 0;
    const dialog = document.getElementById("pokemonDialog");
    const imgEl = document.getElementById("dialogImage");
    imgEl.src = details.images.length ? details.images[0] : details.image;
    document.getElementById("dialogName").innerText = details.name;
    document.getElementById("dialogHeight").innerText = details.height ?? "-";
    document.getElementById("dialogWeight").innerText = details.weight ?? "-";
    document.getElementById("dialogTypes").innerText = details.types ?? "-";
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    const imgs = details.images.length ? details.images : [details.image];
    prevBtn.onclick = function () {
      index = (index - 1 + imgs.length) % imgs.length;
      imgEl.src = imgs[index];
    };
    nextBtn.onclick = function () {
      index = (index + 1) % imgs.length;
      imgEl.src = imgs[index];
    };
    dialog.showModal();
  });
  grid.appendChild(card);
}

function handlePokemonError(error) {
  console.error("Failed to load Pokemon details:", error);
}

function displayPokemons() {
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

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    const dialog = document.getElementById("pokemonDialog");
    if (dialog.open) dialog.close();
  }
});

document.getElementById("pokemonDialog").addEventListener("click", function (e) {
  const content = document.querySelector(".dialog-content");
  if (!content.contains(e.target)) {
    this.close();
  }
});

document.getElementById("search").addEventListener("input", function (x) {
  const searchValue = x.target.value.toLowerCase();
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    const name = card.querySelector("h3").innerText.toLowerCase();
    card.style.display = name.includes(searchValue) ? "block" : "none";
  });
});
