import BurgerImg from "./burger.png";
import pooImg from "./pooclick.png";
import PortaPottyImg from "./portaPotty.png";
import ShrekImg from "./shrek.png";

import "./style.css";

// Game state
let counter: number = 0;
let clickPower: number = 1;
let DPS: number = 0;
let lastTime = Date.now();

interface Item {
  name: string;
  cost: number;
  power: number;
  quantity: number;
  type: "click" | "auto";
  img: string;
  description: string;
}

const availableItems: Item[] = [
  {
    name: "Burger",
    cost: 10,
    power: 1,
    quantity: 0,
    type: "click",
    img: "BurgerImg",
    description: "Increases Dookie per click by 1 by making them poops bigger",
  },
  {
    name: "Shrek",
    cost: 100,
    power: 2,
    quantity: 0,
    type: "auto",
    img: "ShrekImg",
    description:
      "Increases Dookie per second by 2 by having Shrek be on the toilet for you",
  },
  {
    name: "Port-a-Potty",
    cost: 1000,
    power: 10,
    quantity: 0,
    type: "auto",
    img: "PortaPottyImg",
    description:
      "Increases Dookie per second by 10 by having a your own portable toilet. Perfect for on-the-go pooping!",
  },
  
];

const imageMap: Record<string, string> = {
  pooImg,
  BurgerImg,
  ShrekImg,
  PortaPottyImg,
};

// Step 1: Render main HTML
document.body.innerHTML = `
  <div id="game-container" style="display: flex; height: 100vh; font-family: 'Comic Sans MS', sans-serif; background-color: #f9f9f9; color: #333;">
    <div id="clicker-area" style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; border-right: 3px solid #ccc; padding: 20px;">
      <h1 style="font-size: 3em; margin-bottom: 10px;">💩 Dookie Clicker 💩</h1>
      <p style="font-size: 1.5em;">Dookies: <span id="counter">0</span></p>
      <p style="font-size: 1.2em;">Dookie Per Second: <span id="DPS">${DPS}</span></p>

      <button id="increment" style="background: none; border: none; cursor: pointer; margin-top: 20px;">
        <img src="${pooImg}" id="dookie-img" style="width: 300px; height: 300px; border-radius: 50%; box-shadow: 0 0 20px rgba(0,0,0,0.2);" />
      </button>
    </div>

    <div id="upgrade-area" style="width: 300px; border-left: 3px solid #ccc; padding: 20px; overflow-y: auto;">
      <h2 style="text-align: center; margin-bottom: 20px;">Upgrades</h2>
    </div>

  </div>
`;

// Step 2: Generate upgrade item HTML
const upgradeArea = document.getElementById("upgrade-area")!;
availableItems.forEach((item) => {
  const upgradeHTML = `
    <div class="upgrade-bar">
      <div>
        <h3>${item.name}</h3>
        <p>Cost: <span id="${item.name}Cost">${item.cost}</span></p>
        <p>+<span id="${item.name}Power">${item.power}</span> ${
    item.type === "click" ? "Dookie/Click" : "per second"
  }</p>
        ${
    item.type === "auto"
      ? `<p>Owned: <span id="${item.name}">${item.quantity}</span></p>`
      : ""
  }
      </div>
      <button id="${item.name}Upgrade">
      ${`<img src="${
    imageMap[item.img]
  }" style="width: 60px; height: 60px;" />`}
      </button>
      <p style="font-size:0.95em; color:#555; margin:6px 0 0 0;">${item.description}</p>
    </div>
  `;
  upgradeArea.innerHTML += upgradeHTML;
});

// Step 3: Setup core UI references
const counterElement = document.getElementById("counter")!;
const DPSCounterElement = document.getElementById("DPS")!;
const button = document.getElementById("increment")!;

// Step 4: Add click handler
button.addEventListener("click", () => {
  counter += clickPower;
  counterElement.textContent = `${Math.floor(counter)}`;
});

// Step 5: Add upgrade listeners
availableItems.forEach((item) => {
  const upgradeBtn = document.getElementById(`${item.name}Upgrade`)!;
  const costElement = document.getElementById(`${item.name}Cost`)!;
  const powerElement = document.getElementById(`${item.name}Power`)!;
  const ownedElement = item.type === "auto"
    ? document.getElementById(item.name)!
    : null;

  upgradeBtn.addEventListener("click", () => {
    if (counter >= item.cost) {
      counter -= item.cost;
      item.quantity++;
      item.cost = Math.floor(item.cost * (item.type === "click" ? 1.20 : 1.25));

      if (item.type === "click") {
        clickPower += item.power;
      }

      updateDPS();

      // Update DOM
      counterElement.textContent = `${Math.floor(counter)}`;
      costElement.textContent = `${item.cost}`;
      powerElement.textContent = `${
        item.type === "click" ? clickPower : item.power * item.quantity
      }`;
      if (ownedElement) ownedElement.textContent = `${item.quantity}`;
    }
  });
});

// Step 6: Calculate total DPS
function updateDPS() {
  DPS = 0;
  availableItems.forEach((item) => {
    if (item.type === "auto") {
      DPS += item.power * item.quantity;
    }
  });
  DPSCounterElement.textContent = `${DPS}`;
}

// Step 7: Enable/Disable buttons based on counter
function updateButtonStates() {
  availableItems.forEach((item) => {
    const btn = document.getElementById(`${item.name}Upgrade`)!;
    if (counter >= item.cost) {
      btn.removeAttribute("disabled");
    } else {
      btn.setAttribute("disabled", "true");
    }
  });
}

// Step 8: Game loop (auto-generate from DPS)
function gameloop() {
  const now = Date.now();
  const delta = (now - lastTime) / 1000; // seconds
  lastTime = now;

  counter += DPS * delta;
  counterElement.textContent = `${Math.floor(counter)}`;

  updateButtonStates();

  requestAnimationFrame(gameloop);
}

requestAnimationFrame(gameloop);
