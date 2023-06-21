let playerAttack = [];
let enemyAttack;
let pokemonsOptions;
let inputSquirtle;
let inputBulbasaur; 
let inputCharmander;
let btnAtkFire;
let btnAtkWater;
let btnAtkPlant;
let btns = [];
let pokemonPlayer;
let attacksPokemon; 
let playerLifes = 5;
let enemyLifes = 5;
const hearts = {
    0: ":(",
    1: "❤",
    2: "❤❤",
    3: "❤❤❤",
    4: "❤❤❤❤",
    5: "❤❤❤❤❤",
}
let pokemons = [];

class Pokemon {
    constructor(name, image, life) {
        this.name = name;
        this.image = image;
        this.life = life;
        this.attacks = [];
    };
};

let squirtle = new Pokemon('Squirtle', './assets/squirtle.png', 3);
let charmander = new Pokemon('Charmander', './assets/charmander.png', 3);
let bulbasaur = new Pokemon('Bulbasaur', './assets/bulbasaur.png', 3);

squirtle.attacks.push(
    { nombre: '💧', id: 'btn-atk-water'},
    { nombre: '💧', id: 'btn-atk-water'},
    { nombre: '💧', id: 'btn-atk-water'},
    { nombre: '🔥', id: 'btn-atk-fire'},        
    { nombre: '🌱', id: 'btn-atk-plant'}
)

charmander.attacks.push(
    { nombre: '🔥', id: 'btn-atk-fire'},
    { nombre: '🔥', id: 'btn-atk-fire'},        
    { nombre: '🔥', id: 'btn-atk-fire'},
    { nombre: '💧', id: 'btn-atk-water'},
    { nombre: '🌱', id: 'btn-atk-plant'}
)

bulbasaur.attacks.push(
    { nombre: '🌱', id: 'btn-atk-plant'},
    { nombre: '🌱', id: 'btn-atk-plant'},
    { nombre: '🌱', id: 'btn-atk-plant'},
    { nombre: '💧', id: 'btn-atk-water'},
    { nombre: '🔥', id: 'btn-atk-fire'}        
)

pokemons.push(squirtle, charmander, bulbasaur);

//Sections
const sectionSelectPokemon = document.getElementById('select-pokemon');
const sectionResult = document.getElementById('result');
const sectionSelectAttack = document.getElementById('select-attack');
const sectionBtnsAttacks = document.getElementById('btns-attacks');
//divs
const divCards = document.getElementById('cards');
const divCounterLifes = document.getElementById('counter-lifes');
const divAttackOfPlayer = document.getElementById('attack-of-player');
const divAttackOfEnemy = document.getElementById('attack-of-enemy');
//buttons 
const btnSelect = document.getElementById('btn-select');
const btnReset = document.getElementById('btn-reset');

const imgPlayerPoke = document.getElementById('img-player-poke');
const imgEnemyPoke = document.getElementById('img-enemy-poke');
const pPlayerPokemon = document.getElementById('player-pokemon');
const spanPokemonEnemy = document.getElementById('enemy-pokemon');
const pLifes = document.getElementById('player-lifes');
const eLifes = document.getElementById('enemy-lifes');

function startGame(){
    sectionSelectAttack.style.display = 'none';
    pokemons.forEach((pokemon) => {
        pokemonsOptions = `
            <div class="card">
                <input type="radio" name="pokemon" id="${pokemon.name}" />
                <label id="label-${pokemon.name}" class="pokemon" for="${pokemon.name}">
                    <p>${pokemon.name}${pokemon.attacks[0].nombre}</p>                        
                <img src="${pokemon.image}" alt="${pokemon.name}">
                </label>
            </div>
        `        
        divCards.innerHTML += pokemonsOptions;  
    });

    inputSquirtle = document.getElementById('Squirtle');
    inputBulbasaur = document.getElementById('Bulbasaur');
    inputCharmander = document.getElementById('Charmander');

    btnSelect.addEventListener('click', selectPokemon); 
    btnReset.addEventListener('click', resetPlay);
    btnReset.style.display = 'none';
}

function selectPokemon (){
    if (inputSquirtle.checked) {        
        pPlayerPokemon.innerHTML = inputSquirtle.id;       
        imgPlayerPoke.src = "./assets/squirtle.png";
        pokemonPlayer = inputSquirtle.id;
        panelSelection('none');
        sectionSelectAttack.style.display = 'flex';        
        estractAttack(pokemonPlayer);        
        selectPokemonEnemy();
    } else if (inputBulbasaur.checked) {
        pPlayerPokemon.innerHTML = inputBulbasaur.id; 
        imgPlayerPoke.src = "./assets/bulbasaur.png";
        pokemonPlayer = inputBulbasaur.id;
        panelSelection('none');
        sectionSelectAttack.style.display = 'flex';        
        estractAttack(pokemonPlayer);       
        selectPokemonEnemy();
    } else if (inputCharmander.checked){
        pPlayerPokemon.innerHTML = inputCharmander.id;
        imgPlayerPoke.src = "./assets/charmander.png";
        pokemonPlayer = inputCharmander.id;
        panelSelection('none');
        sectionSelectAttack.style.display = 'flex';        
        estractAttack(pokemonPlayer);       
        selectPokemonEnemy();
    } else{
        alert("debes seleccionar uno.");
    }    
    
}

const estractAttack = (pokemonPlayer) => {
    let attacks;
    for (let i = 0; i < pokemons.length; i++) {
        if (pokemonPlayer === pokemons[i].name) {
            attacks = pokemons[i].attacks;
        }        
    }    
    showAttacks(attacks);
}

const showAttacks = (attacks) => {    
    attacks.forEach((attack) => {        
        attacksPokemon = `
            <button class="btn-attacks btn-attack" id="${attack.id}">${attack.nombre}</button>
        `
        sectionBtnsAttacks.innerHTML += attacksPokemon;  
    })

    btnAtkFire = document.getElementById('btn-atk-fire');
    btnAtkWater = document.getElementById('btn-atk-water');
    btnAtkPlant = document.getElementById('btn-atk-plant');

    btns = document.querySelectorAll('.btn-attack');

    enabledBtns(false);
}

const attackSequence = () => {
    btns.forEach((btn) => {
        btn.addEventListener('click', (e) => {            
            if(e.target.textContent === '💧'){
                playerAttack.push('💧');
                atkWater();
                btn.disabled = true;
                btn.style.background = '#392b02';
            } else if (e.target.textContent === "🔥") {
                playerAttack.push('🔥');
                atkFire();
                btn.disabled = true;
                btn.style.background = '#392b02';
            } else {
                playerAttack.push('🌱');
                atkPlant();
                btn.disabled = true;
                btn.style.background = '#392b02';
            }
        })
    })
}

function panelSelection(valor){    
    sectionSelectPokemon.style.display = valor;
}

function selectPokemonEnemy(){
    let pokemonRandom = random(0, pokemons.length -1);
    pLifes.innerHTML = hearts[playerLifes];
    eLifes.innerHTML = hearts[enemyLifes];
    spanPokemonEnemy.innerHTML = pokemons[pokemonRandom].name;
    imgEnemyPoke.src = pokemons[pokemonRandom].image;
    attackSequence();
}

function atkFire(){    
    atkRandomEnemy();
}

function atkWater(){    
    atkRandomEnemy();
}

function atkPlant(){    
    atkRandomEnemy();
}

function atkRandomEnemy(){
    let atkRandom = random(1, 3);
    if (atkRandom == 1){
        enemyAttack = 'FUEGO🔥';
    } else if (atkRandom == 2){
        enemyAttack = 'AGUA💧';
    } else {
        enemyAttack = 'PLANTA🌱';
    }
    combat();   
}

function createMessage(ganador){     
    let newAtkPlayer = document.createElement('p');
    let newAtkEnemy = document.createElement('p');
    sectionResult.innerHTML = ganador;
    newAtkPlayer.innerHTML = playerAttack;
    newAtkEnemy.innerHTML = enemyAttack;  
    divAttackOfPlayer.appendChild(newAtkPlayer);
    divAttackOfEnemy.appendChild(newAtkEnemy);
}

function combat(){
    if (playerLifes > 0 && enemyLifes > 0) {
        if(playerAttack == enemyAttack){
            createMessage("E M P A T E!");            
        } else if(playerAttack == 'FUEGO🔥' && enemyAttack == 'PLANTA🌱'){
            enemyLifes--;
            createMessage('Pokemon enemigo pierde una vida');
        } else if(playerAttack == 'AGUA💧' && enemyAttack == 'FUEGO🔥'){      
            enemyLifes--;
            createMessage('Pokemon enemigo pierde una vida');
        } else if(playerAttack == 'PLANTA🌱' && enemyAttack == 'AGUA💧'){       
            enemyLifes--;
            createMessage('Pokemon enemigo pierde una vida');
        } else {                       
            playerLifes--;
            createMessage('tu Pokemon pierde una vida');
        }        
    }
    counterLifes();       
}
function counterLifes(){
    pLifes.innerHTML = hearts[playerLifes];
    eLifes.innerHTML = hearts[enemyLifes];    
    if (enemyLifes == 0){ 
        sectionBtnsAttacks.style.display = 'none';       
        createEndMessage("GANASTE!");
    }else if (playerLifes == 0){
        sectionBtnsAttacks.style.display = 'none';      
        createEndMessage("PERDISTE!");
    }    
}

function enabledBtns(booleano){       
    btnAtkFire.disabled = booleano;    
    btnAtkWater.disabled = booleano; 
    btnAtkPlant.disabled = booleano;
}

function createEndMessage(winner){     
    sectionResult.innerHTML = winner;    
    enabledBtns(true);    
    btnReset.addEventListener('click', resetPlay);
    btnReset.style.display = 'block';
}

function resetPlay(){
    window.location.reload();
}

function random (min, max){
    return Math.floor(Math.random()*(max - min + 1)+min);
}

window.addEventListener('load', startGame);