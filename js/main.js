let playerAttack;
let enemyAttack;
let playerLifes = 3;
let enemyLifes = 3;
const hearts = {
    0: ":(",
    1: "❤",
    2: "❤❤",
    3: "❤❤❤"
}

class Pokemon {
    constructor(nombre, imagen, vida) {
        this.nombre = nombre;
        this.imagen = imagen;
        this.vida = vida;
    };
};

let squirtle = new Pokemon('Squirtle', './assets/squirtle.png', 3);
let charmander = new Pokemon('Charmander', './assets/charmander.png', 3);
let bulbasaur = new Pokemon('Bulbasaur', './assets/bulbasaur.png', 3);

console.log(squirtle);
console.log(charmander);
console.log(bulbasaur);


//Sections
const sectionSelectPokemon = document.getElementById('select-pokemon');
const sectionResult = document.getElementById('result');
const sectionSelectAttack = document.getElementById('select-attack');
const sectionBtnsAttacks = document.getElementById('btns-attacks');
//divs
const divCounterLifes = document.getElementById('counter-lifes');
const divAttackOfPlayer = document.getElementById('attack-of-player');
const divAttackOfEnemy = document.getElementById('attack-of-enemy');
//buttons 
const btnSelect = document.getElementById('btn-select');
const btnAtkFire = document.getElementById('btn-atk-fire');
const btnAtkWater = document.getElementById('btn-atk-water');
const btnAtkPlant = document.getElementById('btn-atk-plant');
const btnReset = document.getElementById('btn-reset');
const btnAtkFuego = document.getElementById('btn-atk-fire');
const btnAtkAgua = document.getElementById('btn-atk-water');
const btnAtkPlanta = document.getElementById('btn-atk-plant');
//inputs
const inputSquirtle = document.getElementById('squirtle');
const inputBulbasaur = document.getElementById('bulbasaur');
const inputCharmander = document.getElementById('charmander');

const imgPlayerPoke = document.getElementById('img-player-poke');
const imgEnemyPoke = document.getElementById('img-enemy-poke');
const pPlayerPokemon = document.getElementById('player-pokemon');
const spanPokemonEnemy = document.getElementById('enemy-pokemon');
const pLifes = document.getElementById('player-lifes');
const eLifes = document.getElementById('enemy-lifes');

function startGame(){
    btnSelect.addEventListener('click', selectPokemon);    
    btnAtkFire.addEventListener('click', atkFire);    
    btnAtkWater.addEventListener('click', atkWater);    
    btnAtkPlant.addEventListener('click', atkPlant);   
    btnReset.addEventListener('click', resetPlay);
    btnReset.style.display = 'none';    
    sectionSelectAttack.style.display = 'none';
    enabledBtns(true);
}

function selectPokemon (){
    if (inputSquirtle.checked) {        
        pPlayerPokemon.innerHTML = "Squirtle";
        imgPlayerPoke.src = "./assets/squirtle.png";
        panelSelection('none');        
    } else if (inputBulbasaur.checked) {
        pPlayerPokemon.innerHTML = "Bulbasaur"; 
        imgPlayerPoke.src = "./assets/bulbasaur.png";
        panelSelection('none');       
    } else if (inputCharmander.checked){
        pPlayerPokemon.innerHTML = "Charmander";
        imgPlayerPoke.src = "./assets/charmander.png";
        panelSelection('none');       
    } else{
        alert("debes seleccionar uno.");
    }    
    sectionSelectAttack.style.display = 'flex';    
    selectPokemonEnemy();
    enabledBtns(false);
}

function panelSelection(valor){    
    sectionSelectPokemon.style.display = valor;
}

function selectPokemonEnemy(){
    let pokemonRandom = random(1, 3);
    if (pokemonRandom == 1) {
        spanPokemonEnemy.innerHTML = 'Squirtle';
        imgEnemyPoke.src = "./assets/squirtle.png"
    } else if(pokemonRandom == 2){
        spanPokemonEnemy.innerHTML = 'Bulbasaur';
        imgEnemyPoke.src = "./assets/bulbasaur.png"
    } else {
        spanPokemonEnemy.innerHTML = 'Charmander';
        imgEnemyPoke.src = "./assets/charmander.png"
    }  
}

function atkFire(){
    playerAttack = 'FUEGO🔥';
    atkRandomEnemy();
}

function atkWater(){
    playerAttack = 'AGUA💧';
    atkRandomEnemy();
}

function atkPlant(){
    playerAttack = 'PLANTA🌱';
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
    btnAtkFuego.disabled = booleano;    
    btnAtkAgua.disabled = booleano; 
    btnAtkPlanta.disabled = booleano;
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