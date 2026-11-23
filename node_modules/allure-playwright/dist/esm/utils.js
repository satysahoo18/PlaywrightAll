function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { Stage, Status } from "allure-js-commons";
import { getMessageAndTraceFromError, stripAnsi } from "allure-js-commons/sdk";
import { ALLURE_STEP_STATUS_ANNOTATION, isAllureStepStatus } from "./syncAnnotations.js";
export var AFTER_HOOKS_ROOT_STEP_TITLE = "After Hooks";
export var BEFORE_HOOKS_ROOT_STEP_TITLE = "Before Hooks";
export var getStatusDetails = function getStatusDetails(error) {
  var details = getMessageAndTraceFromError(error);
  if (error.snippet) {
    details.trace = [stripAnsi(error.snippet), details.trace].filter(Boolean).join("\n\n");
  }
  return details;
};
export var statusToAllureStats = function statusToAllureStats(status, expectedStatus) {
  if (status === "skipped") {
    return Status.SKIPPED;
  }
  if (status === "timedOut") {
    return Status.BROKEN;
  }
  if (status === expectedStatus) {
    return Status.PASSED;
  }
  return Status.FAILED;
};
export var isDescendantOfStepWithTitle = function isDescendantOfStepWithTitle(step, title) {
  var parent = step.parent;
  while (parent) {
    if (parent.title === title) {
      return true;
    }
    parent = parent.parent;
  }
  return false;
};
export var isAfterHookStep = function isAfterHookStep(step) {
  return isDescendantOfStepWithTitle(step, AFTER_HOOKS_ROOT_STEP_TITLE);
};
export var isBeforeHookStep = function isBeforeHookStep(step) {
  return isDescendantOfStepWithTitle(step, BEFORE_HOOKS_ROOT_STEP_TITLE);
};
export var diffEndRegexp = /-((expected)|(diff)|(actual))\.(png|webp)$/;
export var normalizeHookTitle = function normalizeHookTitle(title) {
  return title.replace(/^[aA]ttach\s"(.+)"$/, "$1");
};
export var normalizeAttachStepTitle = function normalizeAttachStepTitle(title) {
  var match = title.match(/["'`]{1}(.+?)["'`]{1}/);
  if (match !== null && match !== void 0 && match[1]) {
    return match[1];
  }
  return title.replace(/^(test\.)?attach\s*/i, "").trim();
};
export var getSkipAnnotation = function getSkipAnnotation(step) {
  return step.annotations.find(function (annotation) {
    return annotation.type === "skip";
  });
};

// Playwright implements the test.skip() and test.fixme() modifiers by throwing an internal error with
// this message. When a modifier is called from a hook or from inside a step, the error is attached to
// the surrounding step, so a skipped test reaches the reporter with errored steps although nothing failed.
var SKIP_MODIFIER_ERROR_REGEXP = /^(?:\S*Error:\s)?Test is skipped:\s?([\s\S]*)$/;

/**
 * Detects an error produced by a Playwright skip modifier and extracts the reason passed to it.
 * Returns `undefined` for any other error, including a genuine failure.
 */
export var getSkipModifierError = function getSkipModifierError(error) {
  var match = error.message ? SKIP_MODIFIER_ERROR_REGEXP.exec(error.message) : null;
  if (!match) {
    return undefined;
  }
  var reason = match[1].trim();
  return reason ? {
    reason: reason
  } : {};
};
export var getStepStatusData = function getStepStatusData(step) {
  var _step$annotations$fin;
  var annotatedStatus = (_step$annotations$fin = step.annotations.find(function (annotation) {
    return annotation.type === ALLURE_STEP_STATUS_ANNOTATION && isAllureStepStatus(annotation.description);
  })) === null || _step$annotations$fin === void 0 ? void 0 : _step$annotations$fin.description;
  if (annotatedStatus !== undefined) {
    return {
      status: annotatedStatus,
      statusDetails: step.error ? _objectSpread({}, getStatusDetails(step.error)) : undefined
    };
  }
  if (step.error) {
    var skipModifierError = getSkipModifierError(step.error);
    if (skipModifierError) {
      return {
        status: Status.SKIPPED,
        statusDetails: skipModifierError.reason ? {
          message: skipModifierError.reason
        } : undefined
      };
    }
    return {
      status: Status.FAILED,
      statusDetails: _objectSpread({}, getStatusDetails(step.error))
    };
  }
  var skipAnnotation = getSkipAnnotation(step);
  if (skipAnnotation) {
    return {
      status: Status.SKIPPED,
      statusDetails: skipAnnotation.description ? {
        message: skipAnnotation.description
      } : undefined
    };
  }
  return {
    status: Status.PASSED
  };
};
export var finalizeStepResult = function finalizeStepResult(stepResult, step) {
  var _getStepStatusData = getStepStatusData(step),
    nextStatus = _getStepStatusData.status,
    statusDetails = _getStepStatusData.statusDetails;
  stepResult.status = nextStatus;
  stepResult.stage = Stage.FINISHED;
  if (statusDetails) {
    // Preserve any previously collected fields and only overwrite values provided by the current step outcome.
    stepResult.statusDetails = _objectSpread(_objectSpread({}, stepResult.statusDetails), statusDetails);
  }
};
//# sourceMappingURL=utils.js.map