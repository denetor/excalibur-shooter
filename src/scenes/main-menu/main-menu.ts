import * as ex from "excalibur";
import {ScenesService} from "../../services/scenes.service";

/**
 * Main menu scene
 */
export class MainMenu extends ex.Scene {
    scenesService: ScenesService;

    constructor(scenesService: ScenesService) {
        super();
        this.scenesService = scenesService;
    }

    public onInitialize(engine: ex.Engine) {
        // add start button
        const startButton = new ex.Actor({
            name: 'startButton',
            // width: 100,
            // height: 25,
            x: engine.drawWidth / 2,
            y: engine.drawHeight / 2,
            // color: ex.Color.White,
        });
        const startText = new ex.Text({
            text: 'Start',
            color: ex.Color.White,
        });
        startButton.graphics.use(startText);

        engine.input.pointers.primary.on('down', (evt) => {
            this.scenesService.goTo('levelOne');
        });
        engine.currentScene.add(startButton);
    }
    public onActivate() {}
    public onDeactivate() {}
}