//  Game constants
const MAX_HEALTH = 100;
const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 5;

// Attack types
const ATTACK = "ATTACK";
const STRONG_ATTACK = "STRONG ATTACK";

// varying data
let inputHealth;
let monsterHealth = MAX_HEALTH;
let playerHealth = MAX_HEALTH;
let hasBounusLife = true;

//  init game
const STARTING_HEALTH = inputHealth || MAX_HEALTH;
adjustHealthBars(STARTING_HEALTH);


// core game logic
function addLife() {
  
  if (!hasBounusLife) {
    
    const playerData = document.querySelector("#health-levels h2:nth-of-type(2)");
    const spanElm = document.createElement("span");
    const spanValue = document.createTextNode("1");

    spanElm.appendChild(spanValue);
    spanElm.setAttribute("id", "bonus-life");
    playerData.appendChild(spanElm);

  }

  return
}

function reset() {

  monsterHealth = MAX_HEALTH;
  playerHealth = MAX_HEALTH;
  resetGame(MAX_HEALTH);
  addLife();
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

  if (playerHealth <= 0 && hasBounusLife) {

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
    reset();
  } else if (playerHealth <= 0 && monsterHealth > 0) {
    alert("You LOST!");
    // removeEvents();
    reset();
  } else if (playerHealth <= 0 && monsterHealth <= 0) {
    alert("ITS A DRAW!");
    // removeEvents();
    reset();
  }

  return

}

function attackMonster(attackType) {
  
  let damage;

  if (attackType === ATTACK){
    damage = ATTACK_VALUE;
  } else if (attackType === STRONG_ATTACK) {
    damage = STRONG_ATTACK_VALUE;
  }

  // attack the monster
  const monsterDamage = dealMonsterDamage(damage);
  monsterHealth -= monsterDamage;

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
  endRound();
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healHandler);