
const MAX_HEALTH = 100;
const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;

let inputHealth;
let monsterHealth = MAX_HEALTH;
let playerHealth = MAX_HEALTH;
const STARTING_HEALTH = inputHealth || MAX_HEALTH;

adjustHealthBars(STARTING_HEALTH);

function attackHandler() {

  // attack the monster
  const damage = dealMonsterDamage(ATTACK_VALUE);
  monsterHealth -= damage;

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

attackBtn.addEventListener('click', attackHandler);