/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
import { assert, toString, isFunction } from '@lwc/shared';

import { ComponentInterface } from './component';
import { VM, runWithBoundaryProtection } from './vm';
import { startMeasure, endMeasure } from './performance-timing';

export interface Template {
    create(): void;
    insert(target: Node, anchor?: Node): void;
    update(): void;
}

export interface TemplateFactory {
    (context: ComponentInterface): Template;
}

export const defaultTemplateFactory: TemplateFactory = () => ({
    create() {},
    insert() {},
    update() {},
});

let vmBeingRendered: VM | null = null;
export function getVMBeingRendered(): VM | null {
    return vmBeingRendered;
}
export function setVMBeingRendered(vm: VM | null) {
    vmBeingRendered = vm;
}

export function evaluateTemplate(vm: VM, factory?: TemplateFactory): Template | null {
    let template: Template | null = null;

    if (!factory) {
        return template;
    }

    if (process.env.NODE_ENV !== 'production') {
        assert.isTrue(
            isFunction(factory),
            `evaluateTemplate() second argument must be an imported template instead of ${toString(
                factory
            )}`
        );
    }

    runWithBoundaryProtection(
        vm,
        vm.owner,
        () => {
            // pre
            vmBeingRendered = vm;
            if (process.env.NODE_ENV !== 'production') {
                startMeasure('render', vm);
            }
        },
        () => {
            // job
            const { component, tro } = vm;
            tro.observe(() => {
                template = factory.call(null, component);
            });
        },
        () => {
            if (process.env.NODE_ENV !== 'production') {
                endMeasure('render', vm);
            }
        }
    );

    return template;
}

/**
 * EXPERIMENTAL: This function acts like a hook for Lightning Locker
 * Service and other similar libraries to sanitize vulnerable attributes.
 * This API is subject to change or being removed.
 */
export function sanitizeAttribute(
    tagName: string,
    namespaceUri: string,
    attrName: string,
    attrValue: any
) {
    // locker-service patches this function during runtime to sanitize vulnerable attributes.
    // when ran off-core this function becomes a noop and returns the user authored value.
    return attrValue;
}