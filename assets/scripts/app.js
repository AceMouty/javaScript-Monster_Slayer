//  Game constants
const MAX_HEALTH = 100;
const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 5;
const INPUT_HEALTH = prompt("Enter the max life for you and the moster");
const STARTING_HEALTH = INPUT_HEALTH ? +INPUT_HEALTH: MAX_HEALTH;

// Attack types
const ATTACK = "ATTACK";
const STRONG_ATTACK = "STRONG ATTACK";

// Log types
const LOG_EVENT_ATTACK = "ATTACK";
const LOG_EVENT_STRONG_ATTACK = "STRONG ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER ATTACK";
const LOG_EVENT_HEAL = "HEAL";
const LOG_EVENT_GAME_OVER = "GAME OVER";
const BATTLE_LOG = []

// varying data
let monsterHealth = STARTING_HEALTH;
let playerHealth = STARTING_HEALTH;
let hasBounusLife = true;

//  init game
adjustHealthBars(STARTING_HEALTH);

// game logger
function writeLog(event, value, monsterHP, playerHP) {

  let logEntry = {
    event,
    value,
    finalMonsterHealth: monsterHP,
    finalPlayerHealth: playerHP,
  };

  if (event === LOG_EVENT_ATTACK || event === LOG_EVENT_STRONG_ATTACK) {

    logEntry.target = "MONSTER";
    logEntry.gameOver = false;

  } else if (event === LOG_EVENT_MONSTER_ATTACK || event === LOG_EVENT_HEAL) {
    
    logEntry.target =  "PLAYER"
    logEntry.gameOver = false;
    
  } else if (event === LOG_EVENT_GAME_OVER) {
    
    logEntry.gameOver = true;

  }

  BATTLE_LOG.push(logEntry);

  return

}

// core game logic
function addLife() {

  const playerData = document.querySelector("#health-levels h2:nth-of-type(2)");
  const spanElm = document.createElement("span");
  const spanValue = document.createTextNode("1");

  spanElm.appendChild(spanValue);
  spanElm.setAttribute("id", "bonus-life");
  playerData.appendChild(spanElm);

  return
}

function reset() {

  monsterHealth = INPUT_HEALTH;
  playerHealth = INPUT_HEALTH;
  resetGame(INPUT_HEALTH);

  if (!hasBounusLife) {
    addLife();
    hasBounusLife = true;
  }

  return
}

function removeEvents() {
  attackBtn.removeEventListener('click', attackHandler);
  strongAttackBtn.removeEventListener('click', strongAttackHandler);
  healBtn.removeEventListener('click', healHandler);
}

function endRound() {
 
  // Attack the player
  const  playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  playerHealth -= playerDamage;

  // create a log
  writeLog(LOG_EVENT_MONSTER_ATTACK, playerDamage, monsterHealth, playerHealth);

  if (playerHealth <= 0 && hasBounusLife && monsterHealth > 0) {

    alert("Using bonus life!");
    
    removeBonusLife();
    hasBounusLife = false;
    playerHealth += 20;
    setPlayerHealth(playerHealth);
  
    return
  }

  if (monsterHealth <= 0 && playerHealth > 0) {
    alert("You WIN!");
    // removeEvents();
    writeLog( LOG_EVENT_GAME_OVER, "PLAYER WINS", monsterHealth, playerHealth);
    reset();
  } else if (playerHealth <= 0 && monsterHealth > 0) {
    alert("You LOST!");
    writeLog( LOG_EVENT_GAME_OVER, "PLAYER LOST", monsterHealth, playerHealth);
    // removeEvents();
    reset();
  } else if (playerHealth <= 0 && monsterHealth <= 0) {
    alert("ITS A DRAW!");
    writeLog( LOG_EVENT_GAME_OVER, "DRAW", monsterHealth, playerHealth);
    // removeEvents();
    reset();
  }

  return

}

function attackMonster(attackType) {
  
  let damage;
  let logEvent;

  if (attackType === ATTACK){
    
    damage = ATTACK_VALUE;
    logEvent = LOG_EVENT_ATTACK

  } else if (attackType === STRONG_ATTACK) {
    
    damage = STRONG_ATTACK_VALUE;
    logEvent = LOG_EVENT_STRONG_ATTACK;

  }

  // attack the monster
  const monsterDamage = dealMonsterDamage(damage);
  monsterHealth -= monsterDamage;

  writeLog(logEvent, damage, monsterHealth, playerHealth);

  endRound();
  return

}

function attackHandler() {

  attackMonster(ATTACK);
  return
}

function strongAttackHandler() {
 
  attackMonster(STRONG_ATTACK);
  return
}

function healHandler() {
  
  let healValue;
  if (playerHealth >= MAX_HEALTH - HEAL_VALUE) {
    alert("MAX HELATH!")
    healValue = MAX_HEALTH - playerHealth;
  } else {
    healValue = HEAL_VALUE;  
  }
  
  increasePlayerHealth(healValue);
  playerHealth += healValue;
  
  writeLog(LOG_EVENT_HEAL, "HEALED", monsterHealth, playerHealth);

  endRound();
}

function logBattleLog() {

 BATTLE_LOG.forEach(log => console.log(log));

}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healHandler);
logBtn.addEventListener('click', logBattleLog);