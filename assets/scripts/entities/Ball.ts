import { _decorator, Component, Node, RigidBody2D, Vec2, BoxCollider2D, Contact2DType, Collider2D, IPhysics2DContact, view, UITransform, Vec3, CCFloat } from 'cc';
import { CollisionPoints } from '../shared/CollisionPoints';
const { ccclass, property } = _decorator;

@ccclass('Ball')
export class Ball extends Component {
    @property(CCFloat)
    readonly speed = 10;

    private rigidbody: RigidBody2D = null;
    private collider: Collider2D = null;

    private startPosition: Vec3 = new Vec3(0, 0, 0);

    private bottomWallContact = false;

    onLoad() {
        this.node.getPosition(this.startPosition);

        this.rigidbody = this.getComponent(RigidBody2D);
        this.collider = this.getComponent(Collider2D);

        this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact.bind(this));
    }

    lateUpdate() {
        if(this.bottomWallContact) {
            this.bottomWallContact = false;
            this.onBottomWallEnter();
        }
    }

    launch() {
        this.rigidbody.linearVelocity = new Vec2(1, 1).normalize().multiplyScalar(this.speed);
    }

    stop() {
        this.rigidbody.linearVelocity = new Vec2(0, 0);
    }

    reset() {
        this.node.setPosition(this.startPosition);
        this.stop();
    }
    
    onBottomWallEnter() {}

    protected onBeginContact(self: Collider2D, other: Collider2D, contact: IPhysics2DContact | null) {
        if(other.node.name === "Bottom") {
            this.bottomWallContact = true;
            return;
        }

        CollisionPoints.instance.clear();
        for(const point of contact.getWorldManifold().points) {
            CollisionPoints.instance.add(point);
        }

        const normal = contact.getWorldManifold().normal;
        let newVelocity = this.rigidbody.linearVelocity;

        if(normal.x != 0) newVelocity.x *= -1 * (Math.random() * 0.5) - 0.5;
        if(normal.y != 0) newVelocity.y *= -1 * (Math.random() * 0.5) - 0.5;

        newVelocity = newVelocity.normalize().multiplyScalar(this.speed);
        
        this.rigidbody.linearVelocity = newVelocity;
    }
}

