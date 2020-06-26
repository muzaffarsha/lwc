import { LightningElement } from 'lwc';

export default class App extends LightningElement {
    counter = 0;

    connectedCallback() {
        setInterval(() => this.counter++, 100);
    }
}