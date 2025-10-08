import exampleIconUrl from "./pooclick.png";
import "./style.css";

// Simple counter for demonstration
let counter: number = 0;

// Create basic HTML structure
document.body.innerHTML = `
  <h1>Dookie Clicker</h1>
  <p>Counter: <span id="counter">0</span></p>
  <button id="increment"><img src="${exampleIconUrl}" class="icon" /></button>
  

`;

// Add click handler
const button = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;

button.addEventListener("click", () => {
  counter += 1;
  counterElement.textContent = `${counter}`;
});
