import { _decorator, Component, Node, Prefab, Vec2, instantiate, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CollisionPoints')
export class CollisionPoints extends Component {
    private static _instance: CollisionPoints = null;

    @property(Prefab)
    private pointPrefab: Prefab = null;

    onLoad() {
        CollisionPoints._instance = this;
    }

    add(worldPosition: Vec2) {
        const node = instantiate(this.pointPrefab);

        node.setParent(this.node);
        node.setWorldPosition(worldPosition.x, worldPosition.y, 0);
    }

    clear() {
        this.node.removeAllChildren();
    }

    static get instance() { return this._instance; }
}

