import { _decorator, Component, Node, Collider2D, Contact2DType, IPhysics2DContact } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Brick')
export class Brick extends Component {
    private collider: Collider2D = null;
    private toDestroy = false;

    onLoad() {
        this.collider = this.getComponent(Collider2D);

        this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact.bind(this));
    }

    update(deltaTime: number) {
        
    }

    lateUpdate() {
        if(this.toDestroy) this.node.destroy();
    }

    onBeginContact(self: Collider2D, other: Collider2D, contact: IPhysics2DContact | null) {
        this.toDestroy = true;
    }
}

