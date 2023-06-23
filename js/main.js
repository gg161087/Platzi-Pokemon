let playerAttack = [];
let enemyAttack = [];
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
let attacksPokemonEnemy; 
let playerLifes = 5;
let indexAttackPlayer;
let indexAttackEnemy;
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
                btn.disabled = true;
                btn.style.background = '#392b02';
                btn.style.cursor = 'not-allowed';
            } else if (e.target.textContent === "🔥") {
                playerAttack.push('🔥');            
                btn.disabled = true;
                btn.style.background = '#392b02';
                btn.style.cursor = 'not-allowed';
            } else {
                playerAttack.push('🌱');                
                btn.disabled = true;
                btn.style.background = '#392b02';
                btn.style.cursor = 'not-allowed';
            }
            console.log(playerAttack)
            atkRandomEnemy();
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
    attacksPokemonEnemy = pokemons[pokemonRandom].attacks;
    attackSequence();
}

function atkRandomEnemy(){
    let atkRandom = random(0, attacksPokemonEnemy.length -1);
    if (atkRandom == 0 || atkRandom ==  1){
        enemyAttack.push('🔥');
    } else if (atkRandom == 3 || atkRandom == 4){
        enemyAttack.push('💧');
    } else {
        enemyAttack.push('🌱');
    }
    console.log(enemyAttack);
    startFight()   
}

const startFight = () => {
    if (playerAttack.length === 5) {        
        combat();
    }
}

function createMessage(ganador){     
    let newAtkPlayer = document.createElement('p');
    let newAtkEnemy = document.createElement('p');
    sectionResult.innerHTML = ganador;
    newAtkPlayer.innerHTML = indexAttackPlayer;
    newAtkEnemy.innerHTML = indexAttackEnemy;  
    divAttackOfPlayer.appendChild(newAtkPlayer);
    divAttackOfEnemy.appendChild(newAtkEnemy);
}

const opponentsIndex = (index) => {
    indexAttackPlayer = playerAttack[index];
    indexAttackEnemy = enemyAttack[index];
}

function combat(){
    for (let i = 0; i < playerAttack.length; i++) {
        opponentsIndex(i)
        if(playerAttack[i] == enemyAttack[i]){
            createMessage("E M P A T E!");            
        } else if(playerAttack[i] == '🔥' && enemyAttack[i] == '🌱'){
            enemyLifes--;
            createMessage('Pokemon enemigo pierde una vida');
        } else if(playerAttack[i] == '💧' && enemyAttack[i] == '🔥'){      
            enemyLifes--;
            createMessage('Pokemon enemigo pierde una vida');
        } else if(playerAttack[i] == '🌱' && enemyAttack[i] == '💧'){       
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
    if (playerLifes > enemyLifes) {
        sectionBtnsAttacks.style.display = 'none';       
        createEndMessage("GANASTE!");        
    } else if (playerLifes < enemyLifes){
        sectionBtnsAttacks.style.display = 'none';      
        createEndMessage("PERDISTE!");
    } else {
        createEndMessage("EMPATE");
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