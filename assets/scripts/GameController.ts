import { _decorator, Component, Node, input, Input, KeyCode } from 'cc';
import { Player, PlayerMoveType } from './Player';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    @property(Player)
    private player: Player = null;

    start() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown.bind(this));
        input.on(Input.EventType.KEY_UP, this.onKeyUp.bind(this));
    }

    update(deltaTime: number) {
        
    }

    onKeyDown(event: KeyboardEvent) {
        if(event.keyCode === KeyCode.KEY_D) this.player.move(PlayerMoveType.RIGHT);
        else if(event.keyCode === KeyCode.KEY_A) this.player.move(PlayerMoveType.LEFT);
    }

    onKeyUp(event: KeyboardEvent) {
        if(event.keyCode === KeyCode.KEY_D || event.keyCode === KeyCode.KEY_A) this.player.move(PlayerMoveType.NONE);
    }
}

