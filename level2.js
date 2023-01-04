const pokeDiv = document.getElementById("pokeDiv");
const pokecard = document.getElementById("pokeCard");
const searchBar = document.getElementById("searchBar");
const arrayOfUrls = [];
let hpCharacters = [];

//Fetch to api and get response
async function getPokemonData() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
  const data = await response.json();
  const element = data.results;
  const pokemonUrl = element.map((pokemon) => {//map over response and get all urls
    return pokemon.url;
  });
  pushUrlToArray(pokemonUrl);
  fetchFromPokemonData();
}

//loop over pokemon urls and push each url to a new array
function pushUrlToArray(pokemonUrl) {
  pokemonUrl.forEach((element) => {
    arrayOfUrls.push(element);
  });
}
//fetch to every url and get response data
const fetchFromPokemonData = async () => {
  try {
    const response = await Promise.all(
      arrayOfUrls.map((url) => fetch(url).then((res) => res.json()))
    );

    hpCharacters = response;
    renderPokemons(hpCharacters);
  } catch (error) {
    console.log(error);
  }
};

//render pokemon data
function renderPokemons(pokemons) {
  pokecard.innerHTML = "";
  pokemons.forEach((item) => {
    console.log(item);
    pokecard.innerHTML += `
         <div class="card">
         <h2 class="poke-name">${item.name}</h2>
         <img src="${item.sprites.front_default}"</>
         <div class="info">
        <div class="types">
         <h3>Type:</h3> ${item.types
           .map((type) => `<p>${type.type.name}</p>`)
           .join("")}
         </div>
         <div class="abilities">
         <h3> Abilities:</h3> ${item.abilities
           .map((ability) => `<p>${ability.ability.name}</p>`)
           .join("")}
         </div>
          </div>
         </div>
        `;
  });
}

getPokemonData();

//Searchbar filtering
searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  //if seacrh string is H -> h
  //if search string is h -> H
  //convert name to lowercase and then compare
  const filteredPokemons = hpCharacters.filter((pokemon) => { //filter pokemons
    return pokemon.name.toLowerCase().includes(searchString);//return every pokemon name that includes value
  });
  renderPokemons(filteredPokemons);
});
