import BurgerImg from "./burger.png";
import pooImg from "./pooclick.png";
import PortaPottyImg from "./portaPotty.png";
import SewagePlant from "./SewagePlant.png";
import ShrekImg from "./shrek.png";
import TacoBellImg from "./tacobell.png";

import "./style.css";

// Item shape
interface Item {
  name: string;
  cost: number;
  power: number;
  quantity: number;
  type: "click" | "auto";
  icon: string;
  description: string;
}

// image key -> imported src
const imageMap: Record<string, string> = {
  pooImg,
  BurgerImg,
  ShrekImg,
  PortaPottyImg,
  TacoBellImg,
  SewagePlant,
};

// Purchasable items (click: adds clickPower, auto: adds DPS)
const availableItems: Item[] = [
  {
    name: "Burger",
    cost: 10,
    power: 1,
    quantity: 0,
    type: "click",
    icon: "BurgerImg",
    description: "Increases Dookie per click by 1 by making them poops bigger",
  },
  {
    name: "Shrek",
    cost: 100,
    power: 2,
    quantity: 0,
    type: "auto",
    icon: "ShrekImg",
    description:
      "help increase Dookie per second by having Shrek sit on the toilet for you",
  },
  {
    name: "Port-a-Potty",
    cost: 1000,
    power: 10,
    quantity: 0,
    type: "auto",
    icon: "PortaPottyImg",
    description:
      "help increases Dookie per second by having a your own portable toilet. Perfect for on-the-go pooping events!",
  },
  {
    name: "TacoBell",
    cost: 5000,
    power: 50,
    quantity: 0,
    type: "auto",
    icon: "TacoBellImg",
    description:
      "Increases Dookie per second by building a Taco Bell, where poop is made fresh daily.",
  },
  {
    name: "Sewage Plant",
    cost: 10000,
    power: 100,
    quantity: 0,
    type: "auto",
    icon: "SewagePlant",
    description:
      "Increases Dookie per second by building a sewage treatment plant. poop = profit",
  },
];

// Game state
let counter: number = 0; // current Dookies (can be fractional)
let clickPower: number = 1; // per-click value
let DPS: number = 0; // total auto Dookies/sec
let lastTime = Date.now(); // for delta timing

// UI: Render game container and core elements
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

// Generate upgrade item HTML
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
    imageMap[item.icon]
  }" style="width: 60px; height: 60px;" />`}
      </button>
      <p style="font-size:0.95em; color:#555; margin:6px 0 0 0;">${item.description}</p>
    </div>
  `;
  upgradeArea.innerHTML += upgradeHTML;
});

// Setup core UI references
const counterElement = document.getElementById("counter")!;
const DPSCounterElement = document.getElementById("DPS")!;
const button = document.getElementById("increment")!;

// Add click handler
button.addEventListener("click", () => {
  counter += clickPower;
  counterElement.textContent = `${Math.floor(counter)}`;
});

// Upgrade listeners
// Cost scaling differs by type: click upgrades are cheaper to balance rapid player interaction,
// while auto upgrades compound over time and thus scale slightly faster.
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

// Calculate total DPS
function updateDPS() {
  DPS = 0;
  // loop through auto items and sum their contributions
  availableItems.forEach((item) => {
    if (item.type === "auto") {
      DPS += item.power * item.quantity;
    }
  });
  DPSCounterElement.textContent = `${DPS}`;
}

// Enable/Disable buttons based on counter
function updateButtonStates() {
  // loop through each item and get button element
  availableItems.forEach((item) => {
    const btn = document.getElementById(`${item.name}Upgrade`)!;
    if (counter >= item.cost) {
      btn.removeAttribute("disabled");
    } else {
      btn.setAttribute("disabled", "true");
    }
  });
}

// Game loop (auto-generate from DPS)
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
