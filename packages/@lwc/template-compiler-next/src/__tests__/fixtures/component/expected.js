import { renderer } from 'lwc';
const { createComponent, insert } = renderer;

import foo_bar__default from 'foo-bar';

export default function template(context) {
    let foo_bar;
    return {
        create() {
            foo_bar = createComponent("foo-bar", foo_bar__default);
        },
        insert(target, anchor) {
            insert(target, foo_bar);
        },
        update() {
            
        }
    }
}