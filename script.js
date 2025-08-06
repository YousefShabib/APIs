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
      images: [
        data.sprites.front_default,
        data.sprites.back_default,
        data.sprites.front_shiny,
        data.sprites.back_shiny
      ]
      .filter(Boolean),
      height: data.height,
      weight: data.weight,
      types: data.types.map(t => t.type.name).join(", ")
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
        <img src="${details.images[0]}" />
         <h3>${details.name}</h3>
      `;
  
      card.addEventListener("click", () => {
        let index = 0;
  
        document.getElementById("dialogImage").src = details.images[index];
        document.getElementById("dialogName").innerText = details.name;
        document.getElementById("dialogHeight").innerText = details.height;
        document.getElementById("dialogWeight").innerText = details.weight;
        document.getElementById("dialogTypes").innerText = details.types;
  
        // Carousel buttons
        document.querySelector(".prev").onclick = () => {
          index = (index - 1 + details.images.length) % details.images.length;
          document.getElementById("dialogImage").src = details.images[index];
        };
  
        document.querySelector(".next").onclick = () => {
          index = (index + 1) % details.images.length;
          document.getElementById("dialogImage").src = details.images[index];
        };
  
        document.getElementById("pokemonDialog").showModal();
      });
  
      grid.appendChild(card);
    }
  }
  
  displayPokemons();
  
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.getElementById("pokemonDialog").close();
    }
  });
  
  document.getElementById("pokemonDialog").addEventListener("click", (e) => {
    const dialog = document.getElementById("pokemonDialog");
    const content = document.querySelector(".dialog-content");
  
    if (!content.contains(e.target)) {
      dialog.close();
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
  