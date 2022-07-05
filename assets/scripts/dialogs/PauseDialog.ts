import { _decorator, Component, Node, director } from 'cc';
import { Dialog } from '../shared/Dialog';

const { ccclass, property } = _decorator;

@ccclass('PauseDialog')
export class PauseDialog extends Dialog {
    onMenuButtonClicked(event, customEventData) {
        this.node.destroy();
        
        director.loadScene("menu");
    }

    onResumeButtonClicked(event, customEventData) {
        this.node.destroy();
    }
}

