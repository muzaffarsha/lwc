import { createElement } from 'lwc';

import Test from 'x/test';

function generateTestCases(testElement) {
    const itTitle = testElement.textContent;
    const expectedValue = !!(testElement.dataset.expected || false);
    const expectedAttributeValue = expectedValue ? "" : null;

    it(itTitle, () => {
        expect(testElement.hidden).toBe(expectedValue);
        expect(testElement.getAttribute("hidden")).toBe(expectedAttributeValue);
    });
}

describe('boolean attribute', () => {
    const elm = createElement('x-test', { is: Test });
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
