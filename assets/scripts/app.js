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

//  init game
const STARTING_HEALTH = inputHealth || MAX_HEALTH;
adjustHealthBars(STARTING_HEALTH);


// core game logic

function endRound() {
  // Attack the player
  const  playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  playerHealth -= playerDamage;

  if (monsterHealth <= 0 && playerHealth > 0) {
    alert("You win!");
  } else if (playerHealth <= 0 && monsterHealth > 0) {
    alert("You DIED!");
  } else if (playerHealth <= 0 && monsterHealth <= 0) {
    alert("ITS A DRAW!");
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
healBtn.addEventListener('click', healHandler)