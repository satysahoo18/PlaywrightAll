"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseTestPlan = exports.includedInTestPlan = exports.hasSkipLabel = exports.addSkipLabelAsMeta = exports.addSkipLabel = void 0;
var _nodeFs = require("node:fs");
var _utils = require("../utils.js");
var parseTestPlan = exports.parseTestPlan = function parseTestPlan() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var testPlanPath = process.env.ALLURE_TESTPLAN_PATH;
  if (!testPlanPath) {
    return undefined;
  }
  if (!(0, _nodeFs.existsSync)(testPlanPath)) {
    // eslint-disable-next-line no-console
    console.error("Test plan file is missing. Skipping test plan usage:", testPlanPath);
    return undefined;
  }
  try {
    var file = (0, _nodeFs.readFileSync)(testPlanPath, "utf8");
    var testPlan = JSON.parse(file);
    if (testPlan.version !== "1.0") {
      // eslint-disable-next-line no-console
      console.error("Test plan version is unsupported. Skipping test plan usage:", testPlan.version);
      return undefined;
    }
    var hasMutedTests = options.includeMutedTests && Array.isArray(testPlan.mutedTests) && testPlan.mutedTests.length > 0;
    if (hasMutedTests) {
      var _testPlan$tests;
      (_testPlan$tests = testPlan.tests) !== null && _testPlan$tests !== void 0 ? _testPlan$tests : testPlan.tests = [];
    }

    // Execute all tests if test plan is empty
    if (!Array.isArray(testPlan.tests) || testPlan.tests.length === 0 && !hasMutedTests) {
      return undefined;
    }
    return testPlan;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("could not parse test plan ".concat(testPlanPath), e);
    return undefined;
  }
};
var includedInTestPlan = exports.includedInTestPlan = function includedInTestPlan(testPlan, subject) {
  var _ref, _testPlan$mutedTests, _testPlan$mutedTests2;
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var {
    allureId,
    id,
    fullName,
    nativeSelector,
    tags = []
  } = subject;
  var effectiveId = (_ref = allureId !== null && allureId !== void 0 ? allureId : id) !== null && _ref !== void 0 ? _ref : tags.map(tag => {
    var _tag$match;
    return tag === null || tag === void 0 || (_tag$match = tag.match(_utils.allureIdRegexp)) === null || _tag$match === void 0 || (_tag$match = _tag$match.groups) === null || _tag$match === void 0 ? void 0 : _tag$match.id;
  }).find(maybeId => maybeId !== undefined);
  var matchesTest = test => {
    var idMatched = effectiveId !== undefined && test.id !== undefined && String(test.id) === effectiveId;
    var selectorMatched = fullName !== undefined && test.selector === fullName;
    var nativeSelectorMatched = nativeSelector !== undefined && test.selector === nativeSelector;
    return idMatched || selectorMatched || nativeSelectorMatched;
  };
  if (testPlan.tests.length === 0 && ((_testPlan$mutedTests = testPlan.mutedTests) === null || _testPlan$mutedTests === void 0 ? void 0 : _testPlan$mutedTests.length) === 0) return true;
  var selected = testPlan.tests.length === 0 || testPlan.tests.some(matchesTest);
  if (!options.enableMutedTests) return selected;
  return selected && !((_testPlan$mutedTests2 = testPlan.mutedTests) !== null && _testPlan$mutedTests2 !== void 0 && _testPlan$mutedTests2.some(matchesTest));
};
var addSkipLabel = labels => {
  labels.push({
    name: "ALLURE_TESTPLAN_SKIP",
    value: "true"
  });
};
exports.addSkipLabel = addSkipLabel;
var addSkipLabelAsMeta = name => {
  return "".concat(name, " @allure.label.ALLURE_TESTPLAN_SKIP:true");
};
exports.addSkipLabelAsMeta = addSkipLabelAsMeta;
var hasSkipLabel = labels => labels.some(_ref2 => {
  var {
    name
  } = _ref2;
  return name === "ALLURE_TESTPLAN_SKIP";
});
exports.hasSkipLabel = hasSkipLabel;
//# sourceMappingURL=testplan.js.map