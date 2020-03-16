import { renderer } from 'lwc';
const { createElement, addListener, createComponent, insert } = renderer;

import foo_bar__default from 'foo-bar';

export default function template(context) {
    let div;
    let foo_bar;
    return {
        create() {
            div = createElement("div");
            addListener(div, "click", context.handleClick);
            foo_bar = createComponent("foo-bar", foo_bar__default);
            addListener(foo_bar, "click", context.handleClick);
        },
        insert(target, anchor) {
            insert(target, div);
            insert(target, foo_bar);
        },
        update() {
            
        }
    }
}