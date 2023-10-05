import {DisplayMode, Engine, Loader} from 'excalibur';
import {LevelOne} from './scenes/level-one/level-one';
import {Player} from './actors/player/player';
import {Resources} from './resources';
import {MainMenu} from "./scenes/main-menu/main-menu";
import {ScenesService} from "./services/scenes.service";
import {ServiceTypeEnum} from "./enums/service-type.enum";


/**
 * Managed game class
 */
export class Game extends Engine {
  private player: Player;
  private mainMenu: MainMenu;
  private levelOne: LevelOne;
  scenesService: ScenesService;

  constructor() {
    super({
      displayMode: DisplayMode.FillScreen
    });
  }

  /**
   * Add a service to the game
   *
   * @param type
   * @param service
   */
  public addService(type: ServiceTypeEnum, service: any): void {
    if (type === ServiceTypeEnum.ScenesService) {
      this.scenesService = service;
    }
  }

  public start() {
    this.mainMenu = new MainMenu(this.scenesService);
    this.add('mainMenu', this.mainMenu);

    this.levelOne = new LevelOne(this.scenesService);
    // this.player = new Player();
    // this.levelOne.add(this.player);
    this.add('levelOne', this.levelOne);


    // Automatically load all default resources
    // const loader = new Loader(Object.values(Resources));
    //return super.start(loader);
    return super.start();
  }

}
