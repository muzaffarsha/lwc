import { renderer } from 'lwc';
const { createElement, createText, insert } = renderer;

export default function template(context) {
    let span;
    let text;
    return {
        create() {
            span = createElement("span");
            text = createText("test");
        },
        insert(target, anchor) {
            insert(target, span);
            insert(span, text);
        },
        update() {
            
        }
    }
}