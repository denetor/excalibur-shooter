import {vec, Vector} from "excalibur";
import {ScrollingLevel} from "../scenes/scrolling.level";

export class GeometryService {


    /**
     * Returns the distance between 2 points
     *
     * @param a
     * @param b
     */
    public static distance(a: Vector, b: Vector): number {
        const x = Math.abs(a.x - b.x);
        const y = Math.abs(a.y - b.y);
        return Math.sqrt(x*x + y*y);
    }


    /**
     * Returns the velocity vector to be applied to an object to go from p1 to p2 at a certain speed.
     *
     * @param p1
     * @param p2
     * @param speed
     */
    public static vectorSpeed(p1: Vector, p2: Vector, speed: number): Vector {
        const d = GeometryService.distance(p1, p2);
        if (d > 0) {
            const vx = speed * (p2.x - p1.x) / d;
            const vy = speed * (p2.y - p1.y) / d;
            return vec(vx, vy);
        } else {
            return vec(0,0);
        }
    }

    /**
     * Returns the angle between 2 points
     *
     * @param a
     * @param b
     */
    public static angle(a: Vector, b: Vector): number {
        const x = a.x - b.x;
        const y = a.y - b.y;
        console.log(Math.atan2(x, y));
        return Math.atan2(x, y);
    }
}