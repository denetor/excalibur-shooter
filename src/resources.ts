import { ImageSource } from 'excalibur';
import asteroidBig from './images/meteorBig.png';
import asteroidSmall from './images/meteorSmall.png';
import laserGreen from './images/laserGreen.png';
import laserRed from './images/laserRed.png';
import levelOneBg from './images/backgrounds/level-one.png';
import player from './images/player.png';
import playerLeft from './images/playerLeft.png';
import playerRight from './images/playerRight.png';
import playerDamaged from './images/playerDamaged.png';
import starBig from './images/starBig.png';
import starSmall from './images/starSmall.png';
import saucer from './images/enemyUFO.png';
import planet05 from './images/backgrounds/Planets/planet05.png';



/**
 * Default global resource dictionary. This gets loaded immediately
 * and holds available assets for the game.
 */
const Resources = {
    AsteroidBig: new ImageSource(asteroidBig),
    AsteroidSmall: new ImageSource(asteroidSmall),
    LaserGreen: new ImageSource(laserGreen),
    LaserRed: new ImageSource(laserRed),
    LevelOneBg: new ImageSource(levelOneBg),
    Planet05: new ImageSource(planet05),
    Player: new ImageSource(player),
    PlayerLeft: new ImageSource(playerLeft),
    PlayerRight: new ImageSource(playerRight),
    PlayerDamaged: new ImageSource(playerDamaged),
    Saucer: new ImageSource(saucer),
    StarBig: new ImageSource(starBig),
    StarSmall: new ImageSource(starSmall),
}

export { Resources }
