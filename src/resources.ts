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
import planet00 from './images/backgrounds/Planets/planet00.png';
import planet01 from './images/backgrounds/Planets/planet01.png';
import planet02 from './images/backgrounds/Planets/planet02.png';
import planet03 from './images/backgrounds/Planets/planet03.png';
import planet04 from './images/backgrounds/Planets/planet04.png';
import planet05 from './images/backgrounds/Planets/planet05.png';
import planet06 from './images/backgrounds/Planets/planet06.png';
import planet07 from './images/backgrounds/Planets/planet07.png';
import planet08 from './images/backgrounds/Planets/planet08.png';
import planet09 from './images/backgrounds/Planets/planet09.png';



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
    Planet00: new ImageSource(planet00),
    Planet01: new ImageSource(planet01),
    Planet02: new ImageSource(planet02),
    Planet03: new ImageSource(planet03),
    Planet04: new ImageSource(planet04),
    Planet05: new ImageSource(planet05),
    Planet06: new ImageSource(planet06),
    Planet07: new ImageSource(planet07),
    Planet08: new ImageSource(planet08),
    Planet09: new ImageSource(planet09),
    Player: new ImageSource(player),
    PlayerLeft: new ImageSource(playerLeft),
    PlayerRight: new ImageSource(playerRight),
    PlayerDamaged: new ImageSource(playerDamaged),
    Saucer: new ImageSource(saucer),
    StarBig: new ImageSource(starBig),
    StarSmall: new ImageSource(starSmall),
}

export { Resources }
