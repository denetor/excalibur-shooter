# Space shooter

## Abstract
This project aims to become a classic space shooter game, to learn the Excalibur basics.

The game is based on a main menu scene, with highest scores and 2 levels scenes.

Actor is a single spaceship with a standard cannon.
Can be upgraded with a laser gun, that remains always on while fire button is pressed. Laser gun heats: when overheats causes your ship to lose life.
Can also be upgraded with some smart missiles, searching for the nearest enemy.

Each scene scrolls upwards, has a NASA picture as background and the fixed objects are described in a JSON data.

Enemies are spawned randomly, with more frequency and more power towards the end of each level.
There are some enemy races:
- Asteroid: going randomly but straight. Destroyed when hitting a ship or a fixed object, or being hit several times
- Basic: going straight, firing cannon only downwards
- Medium: slow and armoured, pointing towards the player, firing cannon and occasionally missiles.
- Hard: quick and armoured, firing cannon towards the player and missiles, each one following their leader, mving round and towards the player

Enemies ehnhanchements can be:
- more fire rate
- more life
- more speed
- more quantity

Occasionally a killed enemy may spawn objects capturable by the player:
- Life gem
- Laser gun upgrade
- A smart missile

Fixed objects:
- crate
- piping

Nice to have:
- some particle emissions in some cases (overheating?)




## Get Started

* Using [Node.js](https://nodejs.org/en/) 14 (LTS) and [npm](https://www.npmjs.com/)
* Run the `npm install` to install dependencies
* Run the `npm start` to run the development server to test out changes
   * [Webpack](https://webpack.js.org/) will build the [Typescript](https://www.typescriptlang.org/) into Javascript
   * [Webpack dev server](https://webpack.js.org/configuration/dev-server/) will host the script in a little server on http://localhost:8080/

## Publishing

* Run `npm run build:dev` to produce Javascript bundles for debugging in the `dist/` folder
* Run `npm run build:prod` to produce Javascript bundles for production (minified) in the `dist/` folder

The `dist/` folder can be deployed to a static web host. We recommend [Netlify](https://netlify.com) or [GitHub Pages](https://pages.github.com/) since they are free to use.