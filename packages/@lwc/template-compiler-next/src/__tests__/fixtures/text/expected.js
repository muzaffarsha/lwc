import { renderer } from 'lwc';
const { createText, insert } = renderer;

export default function template(context) {
    let text;
    return {
        create() {
            text = createText("Hello world!\n");
        },
        insert(target, anchor) {
            insert(target, text);
        },
        update() {
            
        }
    }
}