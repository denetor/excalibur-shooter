import {Game} from './game';
import {ScenesService} from "./services/scenes.service";
import {ServiceTypeEnum} from "./enums/service-type.enum";
import { DevTool } from '@excaliburjs/dev-tools';


const game = new Game();
const scenesService = new ScenesService(game);
game.addService(ServiceTypeEnum.ScenesService, scenesService);
// const devtool = new DevTool(game);
game.start().then(() => {
  scenesService.goTo('mainMenu');
});
