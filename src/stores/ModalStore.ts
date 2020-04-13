import React from "react";
import {action, observable} from "mobx";

export enum DialogActionType {
    cancel,
    submit,
    close,
}

export interface ModalProps {
    onClose: (operation: DialogActionType, payload?: unknown) => void;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

export class Modal<T> {
    id = getRandomInt(1000000, 9000000);
    // @ts-ignore
    Component: React.ComponentType<T>;
    props?: Omit<T, 'onClose'>;
}

export class ModalStoreModel {
    @observable modalList: Array<Modal<any>> = [];
    @observable isLoading = false;

    private _modalPromises: Array<{
        resolve: (value) => void;
        reject: (value) => void;
    }> = [];

    // constructor() {
    //     AppRouter.browserHistory.listen(() => this.closeAllModal());
    // }

    @action
    showModal<T extends ModalProps, S = any>(
        Component: React.ComponentType<T>,
        props?: Omit<T, 'onClose'>,
    ) {
        console.log("showModal");
        const modal = new Modal<T>();

        modal.Component = Component;
        modal.props = props;

        this.modalList.push(modal);

        return new Promise<{ operation: DialogActionType; payload: S }>(
            (resolve, reject) => this._modalPromises.push({ resolve, reject }),
        );
    }

    @action.bound
    closeModal(operation = DialogActionType.close, payload?) {
        const promise = this._modalPromises.pop();
        const result = { operation, payload };

        if (promise) {
            if (operation === DialogActionType.cancel) {
                promise.reject(result);
            } else if (operation === DialogActionType.submit) {
                promise.resolve(result);
            }
        } else {
            console.log('There are no promises in the list of modals');
        }
        this.modalList.pop();
    }

    @action.bound
    closeAllModal() {
        while (this.modalList.length) {
            this.closeModal();
        }
    }
}

export default new ModalStoreModel();