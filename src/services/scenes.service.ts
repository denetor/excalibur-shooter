import { Game } from '../game';

export class ScenesService {
    game: Game;

    constructor(game: Game) {
        this.game = game;
    }

    /**
     * Move to another scene
     *
     * @param scene
     */
    public goTo(scene: string): void {
        if (this.game && scene) {
            this.game.goToScene(scene);
        }
    }
}