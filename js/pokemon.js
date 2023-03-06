let playerAttack;
let enemyAttack;
let playerLifes = 3;
let enemyLifes = 3;

function iniciarJuego(){      
    let btnSelect = document.getElementById('btn-select');
    btnSelect.addEventListener('click', selectPokemon);
    let btnAtkFire = document.getElementById('btn-atk-fire');
    btnAtkFire.addEventListener('click', atkFire);
    let btnAtkWater = document.getElementById('btn-atk-water');
    btnAtkWater.addEventListener('click', atkWater);
    let btnAtkPlant = document.getElementById('btn-atk-plant');
    btnAtkPlant.addEventListener('click', atkPlant);
    let btnReset = document.getElementById('btn-reset');
    btnReset.addEventListener('click', resetPlay);
    btnReset.style.display = 'none';
    let sectionSelect = document.getElementById('select-attack');
    sectionSelect.style.display = 'none';
    enabledBtns(true);
}
function selectPokemon (){
    let inputHipodoge = document.getElementById('hipodoge');
    let inputCapipepo = document.getElementById('capipepo');
    let inputRatigueya = document.getElementById('ratigueya');

    let pPlayerPokemon = document.getElementById('player-pokemon');
    if (inputHipodoge.checked) {        
        pPlayerPokemon.innerHTML = "Hipodoge";
        panelSelection('none');        
    } else if (inputCapipepo.checked) {
        pPlayerPokemon.innerHTML = "Capipepo"; 
        panelSelection('none');       
    } else if (inputRatigueya.checked){
        pPlayerPokemon.innerHTML = "Ratigueya";
        panelSelection('none');       
    } else{
        alert("debes seleccionar uno.");
    }
    let selectAttack = document.getElementById('select-attack');
    selectAttack.style.display = 'flex';    
    selectPokemonEnemy();
    enabledBtns(false);
}
function panelSelection(valor){
    let selectPokemon = document.getElementById('select-pokemon');
    selectPokemon.style.display = valor;
}

function selectPokemonEnemy(){
    let mokeponAletorio = random(1, 3);
    let spanMokeponEnemigo = document.getElementById('enemy-pokemon');

    if (mokeponAletorio == 1) {
        spanMokeponEnemigo.innerHTML = 'Hipodoge';
    } else if(mokeponAletorio == 2){
        spanMokeponEnemigo.innerHTML = 'Capipepo';
    } else {
        spanMokeponEnemigo.innerHTML = 'Ratigueya';
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
    let sectionResult = document.getElementById('result');
    let attacksOfPlayer = document.getElementById('attack-of-player');
    let attackOfEnemy = document.getElementById('attack-of-enemy');
    
    let newAtkPlayer = document.createElement('p');
    let newAtkEnemy = document.createElement('p');

    sectionResult.innerHTML = ganador;
    newAtkPlayer.innerHTML = playerAttack;
    newAtkEnemy.innerHTML = enemyAttack;  
    
    attacksOfPlayer.appendChild(newAtkPlayer);
    attackOfEnemy.appendChild(newAtkEnemy);
}
function combat(){
    if (playerLifes > 0 && enemyLifes > 0) {
        if(playerAttack == enemyAttack){
            createMessage("E M P A T E!");            
        } else if(playerAttack == 'FUEGO🔥' && enemyAttack == 'PLANTA🌱'){
            enemyLifes--;
            createMessage('tu Pokemon pierde una vida');
        } else if(playerAttack == 'AGUA💧' && enemyAttack == 'FUEGO🔥'){      
            enemyLifes--;
            createMessage('tu Pokemon pierde una vida');
        } else if(playerAttack == 'PLANTA🌱' && enemyAttack == 'AGUA💧'){       
            enemyLifes--;
            createMessage('tu Pokemon pierde una vida');
        } else {                       
            playerLifes--;
            createMessage('el Pokemon del enemigo pierde una vida');
        }        
    }
    counterLifes();       
}
function counterLifes(){
    let pLifes = document.getElementById('player-lifes');
    let eLifes = document.getElementById('enemy-lifes');
    let sectionAttacks = document.getElementsByClassName('attacks')    

    pLifes.innerHTML = hearts(playerLifes);
    eLifes.innerHTML = hearts(enemyLifes);
    

    if (enemyLifes == 0){
        console.log(sectionAttacks);
        sectionAttacks.style.display = 'none';
        createEndMessage("GANASTE!");
    }else if (playerLifes == 0){
        console.log(sectionAttacks);
        sectionAttacks.style.display = 'none';
        createEndMessage("PERDISTE!");
    }    
}
function hearts(number){
    let heart = "";
    switch (number) {
        case 1:
            heart = "❤";
            break;
        case 2:
            heart = "❤❤";
            break;
        case 3:
                heart = "❤❤❤";
                break;        
        default:
            heart = "";
            break;        
    }
    return heart;
}
function enabledBtns(booleano){    
    let btnAtkFuego = document.getElementById('btn-atk-fire');
    btnAtkFuego.disabled = booleano;    
    let btnAtkAgua = document.getElementById('btn-atk-water');
    btnAtkAgua.disabled = booleano;
    let btnAtkPlanta = document.getElementById('btn-atk-plant');
    btnAtkPlanta.disabled = booleano;
}
function createEndMessage(winner){
    let sectionMensajes = document.getElementById('result');    
    sectionMensajes.innerHTML = winner;    
    enabledBtns(true);
    let btnReiniciar = document.getElementById('btn-reset');
    btnReiniciar.addEventListener('click', resetPlay);
    btnReiniciar.style.display = 'block';
}
function resetPlay(){
    window.location.reload();
}
function random (min, max){
    return Math.floor(Math.random()*(max - min + 1)+min);
}

window.addEventListener('load', iniciarJuego);