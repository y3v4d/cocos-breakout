import { _decorator, Component, Node, Collider2D, Contact2DType, IPhysics2DContact } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Brick')
export class Brick extends Component {
    private collider: Collider2D = null;
    private toDeactive = false;

    onLoad() {
        this.collider = this.getComponent(Collider2D);

        this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact.bind(this));
    }

    lateUpdate() {
        if(this.toDeactive) {
            this.node.active = false;
            this.toDeactive = false;
        }
    }

    protected onBeginContact(self: Collider2D, other: Collider2D, contact: IPhysics2DContact | null) {
        this.toDeactive = true;
    }
}

