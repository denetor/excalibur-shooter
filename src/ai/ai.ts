import {EntityActor} from "../actors/entity.actor";

export abstract class Ai {
    protected actor: EntityActor;


    constructor(actor: EntityActor) {
        this.actor = actor;
    }

    // business logic at update
    abstract update(): void;


    /**
     * Transition the actor to another AI state
     *
     * @param ai
     */
    transitionTo(ai: Ai): void {
        this.actor.setAi(ai);
    }
}