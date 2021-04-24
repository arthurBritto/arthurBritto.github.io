var id;
var total;
var random = function () {
    id = Math.ceil(Math.random() * total);
}
var createPokemonView = function (response) {
    return `
    <div class="name">${response.name}</div>
    <div> pokemon id: ${response.id}</div>
    <a href='https://www.pokemondb.net/pokedex/${response.name}'
    target="_blank">
    <img class='pokemon-image' src=${response.sprites.front_default}></a>
    <div class = "details">
    <span>Type: ${response.types[0].type.name}</span>
    <span>Starting HP: ${response.stats[0]['base_stat']}</span>
    </div>
    `
}
var getPokemonTotal = function () {
    fetch('https://pokeapi.co/api/v2/pokemon-species/?limit=0')
        .then((data) => data.json())
        .then(function (response) {
            total = response.count;
        }).then(random)
        .then(getPokemonData);
};
var getPokemonData = function () {
    random();
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((data) => data.json())
        .then(function (response) {
            $('#main-box').addClass('pokemon-box').delay(500).queue(function () {
                $('#main-box').removeClass('pokemon-box').dequeue();
            })
            const html = createPokemonView(response);
            const pokemonDiv = document.querySelector('.pokemon')
            pokemonDiv.innerHTML = html
        });
}
var searchPokemon = function () {
    let searchValue = document.getElementById('pokemon-name').value;
    if (searchValue) {
        searchValue = searchValue.toLowerCase();
    }
    fetch(`https://pokeapi.co/api/v2/pokemon/${searchValue}`)
        .then((data) => data.json())
        .then(function (response) {
            $('#main-box').addClass('pokemon-box').delay(500).queue(function () {
                $('#main-box').removeClass('pokemon-box').dequeue();
            })
            const html = createPokemonView(response);
            const pokemonDiv = document.querySelector('.pokemon')
            pokemonDiv.innerHTML = html
            $("#pokemon-name").val("");
        })
};
getPokemonTotal();
document.getElementById('random').addEventListener("click", getPokemonData);
document.getElementById('submit').addEventListener('click', searchPokemon);















