"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.statusToAllureStats = exports.normalizeHookTitle = exports.normalizeAttachStepTitle = exports.isDescendantOfStepWithTitle = exports.isBeforeHookStep = exports.isAfterHookStep = exports.getStepStatusData = exports.getStatusDetails = exports.getSkipModifierError = exports.getSkipAnnotation = exports.finalizeStepResult = exports.diffEndRegexp = exports.BEFORE_HOOKS_ROOT_STEP_TITLE = exports.AFTER_HOOKS_ROOT_STEP_TITLE = void 0;
var _allureJsCommons = require("allure-js-commons");
var _sdk = require("allure-js-commons/sdk");
var _syncAnnotations = require("./syncAnnotations.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var AFTER_HOOKS_ROOT_STEP_TITLE = exports.AFTER_HOOKS_ROOT_STEP_TITLE = "After Hooks";
var BEFORE_HOOKS_ROOT_STEP_TITLE = exports.BEFORE_HOOKS_ROOT_STEP_TITLE = "Before Hooks";
var getStatusDetails = exports.getStatusDetails = function getStatusDetails(error) {
  var details = (0, _sdk.getMessageAndTraceFromError)(error);
  if (error.snippet) {
    details.trace = [(0, _sdk.stripAnsi)(error.snippet), details.trace].filter(Boolean).join("\n\n");
  }
  return details;
};
var statusToAllureStats = exports.statusToAllureStats = function statusToAllureStats(status, expectedStatus) {
  if (status === "skipped") {
    return _allureJsCommons.Status.SKIPPED;
  }
  if (status === "timedOut") {
    return _allureJsCommons.Status.BROKEN;
  }
  if (status === expectedStatus) {
    return _allureJsCommons.Status.PASSED;
  }
  return _allureJsCommons.Status.FAILED;
};
var isDescendantOfStepWithTitle = exports.isDescendantOfStepWithTitle = function isDescendantOfStepWithTitle(step, title) {
  var parent = step.parent;
  while (parent) {
    if (parent.title === title) {
      return true;
    }
    parent = parent.parent;
  }
  return false;
};
var isAfterHookStep = exports.isAfterHookStep = function isAfterHookStep(step) {
  return isDescendantOfStepWithTitle(step, AFTER_HOOKS_ROOT_STEP_TITLE);
};
var isBeforeHookStep = exports.isBeforeHookStep = function isBeforeHookStep(step) {
  return isDescendantOfStepWithTitle(step, BEFORE_HOOKS_ROOT_STEP_TITLE);
};
var diffEndRegexp = exports.diffEndRegexp = /-((expected)|(diff)|(actual))\.(png|webp)$/;
var normalizeHookTitle = exports.normalizeHookTitle = function normalizeHookTitle(title) {
  return title.replace(/^[aA]ttach\s"(.+)"$/, "$1");
};
var normalizeAttachStepTitle = exports.normalizeAttachStepTitle = function normalizeAttachStepTitle(title) {
  var match = title.match(/["'`]{1}(.+?)["'`]{1}/);
  if (match !== null && match !== void 0 && match[1]) {
    return match[1];
  }
  return title.replace(/^(test\.)?attach\s*/i, "").trim();
};
var getSkipAnnotation = exports.getSkipAnnotation = function getSkipAnnotation(step) {
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
var getSkipModifierError = exports.getSkipModifierError = function getSkipModifierError(error) {
  var match = error.message ? SKIP_MODIFIER_ERROR_REGEXP.exec(error.message) : null;
  if (!match) {
    return undefined;
  }
  var reason = match[1].trim();
  return reason ? {
    reason: reason
  } : {};
};
var getStepStatusData = exports.getStepStatusData = function getStepStatusData(step) {
  var _step$annotations$fin;
  var annotatedStatus = (_step$annotations$fin = step.annotations.find(function (annotation) {
    return annotation.type === _syncAnnotations.ALLURE_STEP_STATUS_ANNOTATION && (0, _syncAnnotations.isAllureStepStatus)(annotation.description);
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
        status: _allureJsCommons.Status.SKIPPED,
        statusDetails: skipModifierError.reason ? {
          message: skipModifierError.reason
        } : undefined
      };
    }
    return {
      status: _allureJsCommons.Status.FAILED,
      statusDetails: _objectSpread({}, getStatusDetails(step.error))
    };
  }
  var skipAnnotation = getSkipAnnotation(step);
  if (skipAnnotation) {
    return {
      status: _allureJsCommons.Status.SKIPPED,
      statusDetails: skipAnnotation.description ? {
        message: skipAnnotation.description
      } : undefined
    };
  }
  return {
    status: _allureJsCommons.Status.PASSED
  };
};
var finalizeStepResult = exports.finalizeStepResult = function finalizeStepResult(stepResult, step) {
  var _getStepStatusData = getStepStatusData(step),
    nextStatus = _getStepStatusData.status,
    statusDetails = _getStepStatusData.statusDetails;
  stepResult.status = nextStatus;
  stepResult.stage = _allureJsCommons.Stage.FINISHED;
  if (statusDetails) {
    // Preserve any previously collected fields and only overwrite values provided by the current step outcome.
    stepResult.statusDetails = _objectSpread(_objectSpread({}, stepResult.statusDetails), statusDetails);
  }
};
//# sourceMappingURL=utils.js.map