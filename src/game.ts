import {DisplayMode, Engine, Loader} from 'excalibur';
import {LevelOne} from './scenes/level-one/level-one';
import {PlayerActor} from './actors/player/player.actor';
import {Resources} from './resources';
import {MainMenu} from "./scenes/main-menu/main-menu";
import {ScenesService} from "./services/scenes.service";
import {ServiceTypeEnum} from "./enums/service-type.enum";
import {ScrollingLevel} from "./scenes/scrolling.level";


/**
 * Managed game class
 */
export class Game extends Engine {
  private player: PlayerActor;
  private mainMenu: MainMenu;
  private levelOne: LevelOne;
  private scrollingLevel: ScrollingLevel;
  scenesService: ScenesService;

  constructor() {
    super({
      width: 800,
      height: 800,
      displayMode: DisplayMode.FitScreen,
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
    this.add('levelOne', this.levelOne);

    this.scrollingLevel = new ScrollingLevel();
    this.add('scrollingLevel', this.scrollingLevel);

    const loader = new Loader(Object.values(Resources));
    return super.start(loader);
  }

}
