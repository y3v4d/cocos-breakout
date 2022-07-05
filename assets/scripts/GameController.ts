import { _decorator, Component, Node, input, Input, KeyCode, Label, Button, resources, EventKeyboard } from 'cc';
import { Ball } from './entities/Ball';
import { Player, PlayerMoveType } from './entities/Player';
import { DialogManager } from './shared/DialogManager';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    @property(Player)
    private player: Player = null;

    @property(Ball)
    private ball: Ball = null;

    @property(Node)
    private bricksContainer: Node = null;

    @property(Button)
    private btnPause: Button = null;

    @property(Label)
    private lbPreStart: Label = null;

    private dialogManager: DialogManager = null;
    private firstInput = false;

    onLoad() {
        resources.preloadDir("dialogs", (error, data) => {
            if(error) throw error;
            
            console.log("Preloaded dialogs dir!");
        });

        this.dialogManager = new DialogManager(this.node.parent);

        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);

        this.ball.onBottomWallEnter = this.reset.bind(this);
    }

    onDestroy() {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    startGame() {
        this.lbPreStart.node.active = false;

        this.ball.launch();
    }

    pause() {
        this.btnPause.interactable = false;

        this.ball.pause();
    }

    resume() {
        this.btnPause.interactable = true;
        this.ball.resume();
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

    async onPauseButtonClicked(event, customEventData) {
        try {
            this.pause();

            const dialog = await this.dialogManager.add("PauseDialog");
            dialog.onDialogDestroy = () => {
                this.resume();
            }
        } catch(error) {
            console.error(error);
        }
    }

    onKeyDown(event: EventKeyboard) {
        if(!this.firstInput) {
            this.startGame();
            
            this.firstInput = true;
        }

        if(event.keyCode === KeyCode.KEY_D) this.player.move(PlayerMoveType.RIGHT);
        else if(event.keyCode === KeyCode.KEY_A) this.player.move(PlayerMoveType.LEFT);
    }

    onKeyUp(event: EventKeyboard) {
        if(event.keyCode === KeyCode.KEY_D || event.keyCode === KeyCode.KEY_A) this.player.move(PlayerMoveType.NONE);
    }
}

