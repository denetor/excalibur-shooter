import * as ex from "excalibur";

export class MainMenu extends ex.Scene {
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
        engine.currentScene.add(startButton);
    }
    public onActivate() {}
    public onDeactivate() {}
}