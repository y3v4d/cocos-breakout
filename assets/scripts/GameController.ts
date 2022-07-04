import { _decorator, Component, Node, input, Input, KeyCode, Label } from 'cc';
import { Ball } from './entities/Ball';
import { Player, PlayerMoveType } from './entities/Player';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    @property(Player)
    private player: Player = null;

    @property(Ball)
    private ball: Ball = null;

    @property(Node)
    private bricksContainer: Node = null;

    @property(Label)
    private lbPreStart: Label = null;

    private firstInput = false;

    onLoad() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown.bind(this));
        input.on(Input.EventType.KEY_UP, this.onKeyUp.bind(this));

        this.ball.onBottomWallEnter = this.reset.bind(this);
    }

    startGame() {
        this.lbPreStart.node.active = false;

        this.ball.launch();
    }

    reset() {
        this.bricksContainer.children.forEach(node => {
            node.active = true;
        });

        this.player.reset();
        this.ball.reset();

        this.lbPreStart.node.active = true;
        this.firstInput = false;
    }

    onKeyDown(event: KeyboardEvent) {
        if(!this.firstInput) {
            this.startGame();
            
            this.firstInput = true;
        }

        if(event.keyCode === KeyCode.KEY_D) this.player.move(PlayerMoveType.RIGHT);
        else if(event.keyCode === KeyCode.KEY_A) this.player.move(PlayerMoveType.LEFT);
    }

    onKeyUp(event: KeyboardEvent) {
        if(event.keyCode === KeyCode.KEY_D || event.keyCode === KeyCode.KEY_A) this.player.move(PlayerMoveType.NONE);
    }
}

