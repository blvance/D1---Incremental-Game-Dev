# CMPM 121 D1 Project

10/8/25
The following app, Dookie Clicker, is a clicker game were the player clicks on a dookie. So far the button and counter have been implemented. Put in an image of a dookie for the clicker.
10/9/25
Implemented step 5 before the others on accident by making the Burger upgrade cost minus from the total number of Dookies. I also implemented the setInterval to make the Shrek autoclicker.

10/10/25
Made a requestAnimationFrame to smoothly animate the counter for the shrek auto clicker instead of setInterval. Added UI detail and pazzaz to give the gane a bit more feeling to the game. Playtested and made sure that numbers scale proportionalitly. Implemented that when the player doesn't have enough dookie the buttons disable. In a seperate commit Added another purchasable upgrade, the Port-a-Potty. This upgrade starts at 1000 dookie and give the player 10 clicks per Port-a-Potty. With the help of a chatbot I formatted the upgrades to the right side and made the clicker into a big circle on the left of the screen. I added colors and fonts to to help bring together the theme of my game. In doing this it also made the visiability of the features much better.

_Joshua Kim-Pearson_ - Added burger upgrade as a crossover from my burger clicker that ups the click power

Features
Click to earn points: Click the main button to increase your counter.
Burger Upgrade: Spend points to increase your click power, making each click more valuable.
Shrek Upgrade: Buy Shreks to generate points automatically over time. The more Shreks you own, the faster your counter grows.
Live UI Updates: All upgrades and counters update in real time.
Smooth Animation: Uses requestAnimationFrame for smooth, frame-rate-independent automatic growth.

I drew inspiration from [Taylor Pearce’s CMPM 121 D1 project](https://github.com/t4ylo/cmpm-121-25-d1-taylorpearce/blob/main/src/style.css). This project was a honey farmer with a bee as the main clicker. Me and my girlfriend call each other bee so that drew my eye to click on the demo. Then when I opened up the demo I clicked the bee and I loved the feedback it gave me when I clicked it. It shook the bee into the honeycomb and also gave me a number pop up so I knew exactly how much I was getting with each click. I liked this so I applied it to my clicker, it is a circle so I thought the best application would be to have it pulse on each click.

I also found inspiration from [Julia Manou’s CMPM 121 D1 project](https://github.com/jellyb3e/cmpm-121-f25-d1-juliamanou). I found inspiration form this project in how its UI actually looked. All of it was very connected and nothing was just blank which added a lot to the feeling of the game. I thought I could apply this to my game by putting the background as a bathroom so it felt like the user was more present witht he game. With that I had to change my game container box to a transparent brown so that the background was visible but not just placed there with no effect.
