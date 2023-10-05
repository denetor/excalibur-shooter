import { ImageSource } from 'excalibur';
import sword from './images/sword.png';
import levelOneBg from './images/backgrounds/level-one.png';

/**
 * Default global resource dictionary. This gets loaded immediately
 * and holds available assets for the game.
 */
const Resources = {
    Sword: new ImageSource(sword),
    LevelOneBg: new ImageSource(levelOneBg),
}

export { Resources }
