import exampleIconUrl from "./pooclick.png";
import ShrekImg from "./shrek.png";
import "./style.css";

// Simple counter for demonstration
let counter: number = 100;
let clickPower: number = 1;

let burgerCost: number = 10;
let burgerPower: number = 1;

let shrekCost: number = 100;
let shrek: number = 0;
let shrekPower: number = 0;

let lastTime = Date.now();

// Create basic HTML structure
document.body.innerHTML = `
  <h1>Dookie Clicker</h1>
  <p>Counter: <span id="counter">0</span></p>
  <button id="increment"><img src="${exampleIconUrl}" class="icon" /></button>
  
  <p>Cost: <span id="burgerCost">${burgerCost}</span> +<span id="burgerPower">${burgerPower}</span> Dookie/Click<p>
  <button id="burgerUpgrade">Eat a 🍔</button>

  <p>Cost: <span id="shrekCost">${shrekCost}</span> +<span id="shrekPower">${shrekPower}</span> per second <p>
  <button id="shrekUpgrade"> <img src="${ShrekImg}" class="icon" /> </button>

  <p>Shreks Owned: <span id="shrek">${shrek}</span> </p>
`;

// Add click handler
const button = document.getElementById("increment")!;
const burgerUpgrade = document.getElementById("burgerUpgrade") as HTMLButtonElement;
const counterElement = document.getElementById("counter")!;
const burgerCostElement = document.getElementById("burgerCost")!;
const burgerPowerElement = document.getElementById("burgerPower")!;
const shrekUpgrade = document.getElementById("shrekUpgrade") as HTMLButtonElement;
const shrekOwnedElement = document.getElementById("shrek")!;
const shrekCostElement = document.getElementById("shrekCost")!;
const shrekPowerElement = document.getElementById("shrekPower")!;

button.addEventListener("click", () => {
  counter += clickPower;
  counterElement.textContent = `${counter}`;
});

burgerUpgrade.addEventListener("click", () => {
  if (counter >= burgerCost) {
    counter -= burgerCost;
    clickPower += 1;
    burgerPower += 1;
    burgerCost = Math.floor(burgerCost * 1.25);

    counterElement.textContent = `${counter}`;
    burgerCostElement.textContent = `${burgerCost}`;
    burgerPowerElement.textContent = `${burgerPower}`;
  }
});

shrekUpgrade.addEventListener("click", () => {
  if (counter >= shrekCost) {
    counter -= shrekCost;
    shrek += 1;
    shrekPower = shrek * 2;
    shrekCost = Math.floor(shrekCost * 1.5) + 25;

    counterElement.textContent = `${counter}`;
    shrekCostElement.textContent = `${shrekCost}`;
    shrekPowerElement.textContent = `${shrekPower}`;
    shrekOwnedElement.textContent = `${shrek}`;
  }
});

function updateButtonStates() {
  burgerUpgrade.disabled = counter < burgerCost;
  shrekUpgrade.disabled = counter < shrekCost;
}  

function gameloop() {
  const now = Date.now();
  const delta = (now - lastTime) / 1000; // seconds
  lastTime = now;
  if (shrek > 0) {
    counter += shrekPower * delta;
    counterElement.textContent = `${Math.floor(counter)}`;
  }
  lastTime = now;
  requestAnimationFrame(gameloop);
  updateButtonStates();
}

requestAnimationFrame(gameloop);
