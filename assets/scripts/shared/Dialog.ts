import { _decorator, Component, Node } from 'cc';
import { DialogManager } from './DialogManager';
const { ccclass, property } = _decorator;

@ccclass('Dialog')
export class Dialog extends Component {
    private _manager: DialogManager = null;

    initialize(manager: DialogManager) {
        this._manager = manager;
    }

    getDialogManager() {
        return this._manager;
    }

    protected onDestroy() {
        this.onDialogDestroy();
    }

    onDialogDestroy() {}
}

