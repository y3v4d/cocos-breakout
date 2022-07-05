import { _decorator, Component, Node, resources, Prefab, instantiate } from 'cc';
import { Dialog } from './Dialog';
const { ccclass, property } = _decorator;

export class DialogManager {
    private _container: Node = null;
    private _dialogs: Map<string, Dialog> = new Map();

    constructor(container: Node) {
        this._container = container;
    }

    add(name: string) {
        return new Promise<Dialog>((resolve, reject) => {
            resources.load(`dialogs/${name}`, Prefab, (error, data) => {
                if(error) {
                    reject(error);
                    return;
                }

                const node = instantiate(data);
                const dialog = node.getComponent(Dialog);

                this._dialogs.set(name, dialog);

                dialog.initialize(this);
                node.setParent(this._container);            

                resolve(dialog);
            });
        });
    }

    remove(name: string) {
        const dialog = this._dialogs.get(name);
        if(!dialog) throw new Error(`Couldn't find dialog ${name}`);

        dialog.node.destroy();
        this._dialogs.delete(name);
    }

    removeAll() {
        for(const dialog of this._dialogs) {
            dialog[1].node.destroy();
        }

        this._dialogs.clear();
    }

    get container() { return this._container; }
}

