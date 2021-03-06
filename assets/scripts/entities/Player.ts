import { _decorator, Component, Node, Vec2, CCFloat, RigidBody2D, BoxCollider2D, Contact2DType, Collider2D, IPhysics2DContact, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

export enum PlayerMoveType {
    LEFT = 0,
    RIGHT = 1,
    NONE = 2
}

@ccclass('Player')
export class Player extends Component {
    @property(CCFloat)
    readonly speed: number = 1.0;

    private rigidbody: RigidBody2D = null;
    private collider: BoxCollider2D = null;

    private startPosition: Vec3 = new Vec3();

    onLoad() {
        this.node.getPosition(this.startPosition);

        this.rigidbody = this.getComponent(RigidBody2D);
        this.collider = this.getComponent(BoxCollider2D);

        this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact.bind(this));
    }

    move(type: PlayerMoveType) {
        switch(type) {
            case PlayerMoveType.LEFT: this.rigidbody.linearVelocity = new Vec2(-this.speed, 0); break;
            case PlayerMoveType.RIGHT: this.rigidbody.linearVelocity = new Vec2(this.speed, 0); break;
            case PlayerMoveType.NONE: this.rigidbody.linearVelocity = new Vec2(0, 0); break;
            default: break;
        }
    }

    reset() {
        this.move(PlayerMoveType.NONE);
        this.node.setPosition(this.startPosition);
    }

    protected onBeginContact(self: Collider2D, other: Collider2D, contact: IPhysics2DContact | null) {
        if(other.node.name !== "Left" && other.node.name !== "Right") return;

        this.move(PlayerMoveType.NONE);
    }
}

