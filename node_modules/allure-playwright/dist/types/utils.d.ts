import type { TestStatus } from "@playwright/test";
import type { TestError, TestStep } from "@playwright/test/reporter";
import { Status, type StatusDetails, type StepResult } from "allure-js-commons";
export declare const AFTER_HOOKS_ROOT_STEP_TITLE = "After Hooks";
export declare const BEFORE_HOOKS_ROOT_STEP_TITLE = "Before Hooks";
export declare const getStatusDetails: (error: TestError) => StatusDetails;
export declare const statusToAllureStats: (status: TestStatus, expectedStatus: TestStatus) => Status;
export declare const isDescendantOfStepWithTitle: (step: TestStep, title: string) => boolean;
export declare const isAfterHookStep: (step: TestStep) => boolean;
export declare const isBeforeHookStep: (step: TestStep) => boolean;
export declare const diffEndRegexp: RegExp;
export declare const normalizeHookTitle: (title: string) => string;
export declare const normalizeAttachStepTitle: (title: string) => string;
export declare const getSkipAnnotation: (step: Pick<TestStep, "annotations">) => {
    type: string;
    description?: string;
    location?: import("playwright/test").Location;
} | undefined;
/**
 * Detects an error produced by a Playwright skip modifier and extracts the reason passed to it.
 * Returns `undefined` for any other error, including a genuine failure.
 */
export declare const getSkipModifierError: (error: Pick<TestError, "message">) => {
    reason?: string;
} | undefined;
export declare const getStepStatusData: (step: Pick<TestStep, "annotations" | "error">) => {
    status: Status;
    statusDetails?: StatusDetails;
};
export declare const finalizeStepResult: (stepResult: StepResult, step: Pick<TestStep, "annotations" | "error">) => void;
