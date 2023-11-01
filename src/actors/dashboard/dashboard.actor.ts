import * as ex from "excalibur";
import {Actor, Color, Engine, GraphicsGroup, Line, Rectangle, Text} from "excalibur";

export class DashboardActor extends Actor {
    // protected bg = new Rectangle({
    //
    // });
    protected lifeText = new Text({
        text: 'Life:',
        color: Color.White,
    });
    protected lifeBar = new Rectangle({
        width: 100,
        height: 8,
        color: Color.White,
    });
    protected lifeBorder = new Line({
        start: ex.vec(0, 8),
        end: ex.vec(100, 8),
        color: Color.White,
        thickness: 2,
    });
    protected ammoText = new Text({
        text: 'Ammo:',
        color: Color.White,
    });
    protected ammoBar = new Rectangle({
        width: 100,
        height: 8,
        color: Color.White,
    });
    protected ammoBorder = new Line({
        start: ex.vec(0, 8),
        end: ex.vec(100, 8),
        color: Color.White,
        thickness: 2,
    });

    protected graphicsGroup = new GraphicsGroup({
        members: [
            {
                graphic: this.lifeText,
                pos: ex.vec(0,0),
            },
            {
                graphic: this.lifeBar,
                pos: ex.vec(50, 0),
            },
            {
                graphic: this.lifeBorder,
                pos: ex.vec(50, 0),
            },
            {
                graphic: this.ammoText,
                pos: ex.vec(0,20),
            },
            {
                graphic: this.ammoBar,
                pos: ex.vec(50, 20),
            },
            {
                graphic: this.ammoBorder,
                pos: ex.vec(50, 20),
            }
        ],
    })

    onInitialize(engine: Engine) {
        this.graphics.anchor = ex.vec(0,0);
        this.pos = ex.vec(0,0);
        this.graphics.use(this.graphicsGroup);
    }

    public setLife(hp: number): void {
        this.lifeBar.width = hp;
    }

    public setAmmo(ammo: number): void {
        this.ammoBar.width = ammo / 5;
    }
}