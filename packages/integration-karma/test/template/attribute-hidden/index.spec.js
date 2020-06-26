import { createElement } from 'lwc';

import Test from 'x/test';

function generateTestCases(testElement) {
    const itTitle = testElement.textContent;
    const expectedValue = !!(testElement.dataset.expected || false);

    it(itTitle, () => {
        expect(testElement.hidden).toBe(expectedValue);
    });
}

describe('boolean attribute', () => {
    const elm = createElement('x-static', { is: Test });
    document.body.appendChild(elm);

    describe('used in html element', () => {
        const tests = elm.shadowRoot.querySelectorAll('.test-case');

        tests.forEach(generateTestCases);
    });

    describe('used in custom element', () => {
        const tests = elm.shadowRoot.querySelectorAll('.ce-test-case');

        tests.forEach(generateTestCases);
    });
});
