import {Game} from './game';
import {ScenesService} from "./services/scenes.service";
import {ServiceTypeEnum} from "./enums/service-type.enum";


const game = new Game();
const scenesService = new ScenesService(game);
game.addService(ServiceTypeEnum.ScenesService, scenesService);
game.start().then(() => {
  scenesService.goTo('mainMenu');
});
