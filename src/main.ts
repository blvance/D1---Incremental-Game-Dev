import pooImg from "./pooclick.png";
import PortaPottyImg from "./portaPotty.png";
import ShrekImg from "./shrek.png";

import "./style.css";

// Simple counter for demonstration
let counter: number = 0;
let clickPower: number = 1;

// dookie per second
let DPS: number = 0;

// burger vars
let burgerCost: number = 10;
let burgerPower: number = 1;

//shrek vars
let shrekCost: number = 100;
let shrek: number = 0;
let shrekPower: number = 0;

// potty vars
let pottyCost: number = 1000;
let potty: number = 0;
let pottyPower: number = 0;

let lastTime = Date.now();

// Set up HTML structure
document.body.innerHTML = `
  <div id="game-container" style="display: flex; height: 100vh; font-family: 'Comic Sans MS', sans-serif; background-color: #f9f9f9; color: #333;">
    
    <!-- LEFT SIDE: Main Clicker -->
    <div id="clicker-area" style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; border-right: 3px solid #ccc; padding: 20px;">
      <h1 style="font-size: 3em; margin-bottom: 10px;">💩 Dookie Clicker 💩</h1>
      <p style="font-size: 1.5em;">Dookies: <span id="counter">0</span></p>
      <p style="font-size: 1.2em;">Dookie Per Second: <span id="DPS">${DPS}</span></p>

      <button id="increment" style="
        background: none;
        border: none;
        cursor: pointer;
        margin-top: 20px;
        transition: transform 0.1s;
      ">
        <img src="${pooImg}" id="dookie-img" style="
          width: 300px;
          height: 300px;
          border-radius: 50%;
          box-shadow: 0 0 20px rgba(0,0,0,0.2);
          transition: transform 0.1s;
        " />
      </button>
    </div>

    <!-- RIGHT SIDE: Upgrades -->
    <div id="upgrade-area" style="width: 400px; overflow-y: auto; background-color: #fff; box-shadow: -3px 0 10px rgba(0,0,0,0.1); padding: 20px;">
      <h2 style="text-align: center; margin-bottom: 20px;">Upgrades</h2>

      <!-- Burger Upgrade -->
      <div class="upgrade-bar" style="display: flex; align-items: center; justify-content: space-between; background-color: #fffae5; border: 2px solid #ffcc00; border-radius: 10px; padding: 10px; margin-bottom: 15px;">
        <div>
          <h3 style="margin: 0;">🍔 Burger Boost</h3>
          <p style="margin: 5px 0;">Cost: <span id="burgerCost">${burgerCost}</span></p>
          <p style="margin: 0;">+<span id="burgerPower">${burgerPower}</span> Dookie/Click</p>
        </div>
        <button id="burgerUpgrade" style="background-color: #ffcc00; border: none; border-radius: 8px; padding: 10px 15px; font-weight: bold; cursor: pointer;">Eat 🍔</button>
      </div>

      <!-- Shrek Upgrade -->
      <div class="upgrade-bar" style="display: flex; align-items: center; justify-content: space-between; background-color: #e8ffe5; border: 2px solid #7ec850; border-radius: 10px; padding: 10px; margin-bottom: 15px;">
        <div>
          <h3 style="margin: 0;">Shrek Farm</h3>
          <p style="margin: 5px 0;">Cost: <span id="shrekCost">${shrekCost}</span></p>
          <p style="margin: 0;">+<span id="shrekPower">${shrekPower}</span> per second</p>
          <p style="margin: 0;">Owned: <span id="shrek">${shrek}</span></p>
        </div>
        <button id="shrekUpgrade" style="background-color: #7ec850; border: none; border-radius: 8px; padding: 10px; cursor: pointer;">
          <img src="${ShrekImg}" style="width: 60px; height: 60px;" />
        </button>
      </div>

      <!-- Porta Potty Upgrade -->
      <div class="upgrade-bar" style="display: flex; align-items: center; justify-content: space-between; background-color: #e5f5ff; border: 2px solid #5ac8fa; border-radius: 10px; padding: 10px; margin-bottom: 15px;">
        <div>
          <h3 style="margin: 0;">🚽 Porta Potty</h3>
          <p style="margin: 5px 0;">Cost: <span id="pottyCost">${pottyCost}</span></p>
          <p style="margin: 0;">+<span id="pottyPower">${pottyPower}</span> per second</p>
          <p style="margin: 0;">Owned: <span id="potty">${potty}</span></p>
        </div>
        <button id="pottyUpgrade" style="background-color: #5ac8fa; border: none; border-radius: 8px; padding: 10px; cursor: pointer;">
          <img src="${PortaPottyImg}" style="width: 60px; height: 60px;" />
        </button>
      </div>

    </div>
  </div>
`;

// Add click handler
const button = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;
const DPSCounterElement = document.getElementById("DPS")!;
// burger elements
const burgerCostElement = document.getElementById("burgerCost")!;
const burgerPowerElement = document.getElementById("burgerPower")!;
const burgerUpgrade = document.getElementById(
  "burgerUpgrade",
) as HTMLButtonElement;
// shrek elements
const shrekUpgrade = document.getElementById(
  "shrekUpgrade",
) as HTMLButtonElement;
const shrekOwnedElement = document.getElementById("shrek")!;
const shrekCostElement = document.getElementById("shrekCost")!;
const shrekPowerElement = document.getElementById("shrekPower")!;
//  Porta Potty Upgrade elements
const pottyUpgrade = document.getElementById(
  "pottyUpgrade",
) as HTMLButtonElement;
const pottyOwnedElement = document.getElementById("potty")!;
const pottyCostElement = document.getElementById("pottyCost")!;
const pottyPowerElement = document.getElementById("pottyPower")!;

button.addEventListener("click", () => {
  counter += clickPower;
  counterElement.textContent = `${counter}`;
});

// ---------------- Upgrade Event Listeners ----------------
// burger upgrade event listener
burgerUpgrade.addEventListener("click", () => {
  if (counter >= burgerCost) {
    counter -= burgerCost;
    clickPower += 1;
    burgerPower += 1;
    burgerCost = Math.floor(burgerCost * 1.25); // increasing the cost of Burgers by a factor of 25%

    counterElement.textContent = `${counter}`;
    burgerCostElement.textContent = `${burgerCost}`;
    burgerPowerElement.textContent = `${burgerPower}`; // this var shows growth rate
  }
});

// shrek upgrade event listener
shrekUpgrade.addEventListener("click", () => {
  if (counter >= shrekCost) {
    counter -= shrekCost;
    shrek += 1;
    shrekPower = shrek * 2;
    shrekCost = Math.floor(shrekCost * 1.4); // increasing the cost of Shreks by a factor of 40%

    counterElement.textContent = `${counter}`;
    shrekCostElement.textContent = `${shrekCost}`;
    shrekPowerElement.textContent = `${shrekPower}`; // this var shows growth rate
    shrekOwnedElement.textContent = `${shrek}`;
  }
});

// Port-a-Potty upgrade event listener
pottyUpgrade.addEventListener("click", () => {
  if (counter >= pottyCost) {
    counter -= pottyCost;
    potty += 1;
    pottyPower = potty * 10;
    pottyCost = Math.floor(pottyCost * 1.5); // increasing the cost of Shreks by a factor of 50%

    counterElement.textContent = `${counter}`;
    pottyCostElement.textContent = `${pottyCost}`;
    pottyPowerElement.textContent = `${pottyPower}`; // this var shows growth rate
    pottyOwnedElement.textContent = `${potty}`;
  }
});
// ---------------------------------------------------------

// funtion to calculate DPS (Dookie per second)
function calculateDPS() {
  DPS = shrekPower + pottyPower;
  DPSCounterElement.textContent = `${DPS}`; // total growth rate
}

// function to update button states
function updateButtonStates() {
  burgerUpgrade.disabled = counter < burgerCost;
  shrekUpgrade.disabled = counter < shrekCost;
  pottyUpgrade.disabled = counter < pottyCost;
}

// Game loop using requestAnimationFrame
function gameloop() {
  const now = Date.now();
  const delta = (now - lastTime) / 1000; // seconds
  lastTime = now;
  if (shrek > 0) {
    counter += shrekPower * delta;
    counterElement.textContent = `${Math.floor(counter)}`;
  }
  if (potty > 0) {
    counter += pottyPower * delta;
    counterElement.textContent = `${Math.floor(counter)}`;
  }

  lastTime = now;
  //execute game loop tasks
  updateButtonStates();
  calculateDPS();

  requestAnimationFrame(gameloop);
}

requestAnimationFrame(gameloop);
