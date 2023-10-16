import {Vector} from "excalibur";

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
}