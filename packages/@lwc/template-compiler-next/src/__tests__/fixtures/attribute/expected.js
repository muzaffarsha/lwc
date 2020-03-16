import { renderer } from 'lwc';
const { createElement, setAttribute, insert } = renderer;

export default function template(context) {
    let div;
    return {
        create() {
            div = createElement("div");
            setAttribute(div, "class", "foo bar");
            setAttribute(div, "style", "color: red;");
        },
        insert(target, anchor) {
            insert(target, div);
        },
        update() {
            
        }
    }
}