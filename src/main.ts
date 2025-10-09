import exampleIconUrl from "./pooclick.png";
import "./style.css";

// Simple counter for demonstration
let counter: number = 0;
let clickPower: number = 1;

let burgerCost: number = 10;
let burgerPower: number = 1;

let shrekCost: number = 100;
let shrek: number = 0;
let shrekPower: number = 0;
// Shrek generates 1 Dookie per second for each Shrek owned

// Every second, add Dookie based on number of Shreks owned
setInterval(() => {
  if (shrek > 0) {
    counter += shrekPower;
    counterElement.textContent = `${counter}`;
  }
}, 1000);

// Create basic HTML structure
document.body.innerHTML = `
  <h1>Dookie Clicker</h1>
  <p>Counter: <span id="counter">0</span></p>
  <button id="increment"><img src="${exampleIconUrl}" class="icon" /></button>
  
  <p>Cost: <span id="burgerCost">${burgerCost}</span> +${burgerPower} Dookie/Click<p>
  <button id="burgerUpgrade">Eat a 🍔</button>

  <p>Cost: <span id="shrekCost">${shrekCost}</span> +${shrek} per second <p>
  <button id="shrekUpgrade"> Shrek </button>

`;

// Add click handler
const button = document.getElementById("increment")!;
const burgerUpgrade = document.getElementById("burgerUpgrade")!;
const counterElement = document.getElementById("counter")!;
const burgerCostElement = document.getElementById("burgerCost")!;
const shrekUpgrade = document.getElementById("shrekUpgrade")!;
const shrekCostElement = document.getElementById("shrekCost")!;
const shrekPowerElement = document.getElementById("shrekPower")!;

button.addEventListener("click", () => {
  counter += clickPower;
  counterElement.textContent = `${counter}`;
});

burgerUpgrade.addEventListener("click", () => {
  if (counter >= burgerCost) {
    counter -= burgerCost;
    clickPower += burgerPower;
    burgerCost = Math.floor(burgerCost * 1.5);

    counterElement.textContent = `${counter}`;
    burgerCostElement.textContent = `${burgerCost}`;
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
  }
});
