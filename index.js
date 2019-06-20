"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SstateConsumer = exports.SstateProvider = void 0;

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var SstateContext = _react["default"].createContext({});

var Provider = SstateContext.Provider,
    Consumer = SstateContext.Consumer;

var SstateConsumer = function SstateConsumer(_ref) {
  var children = _ref.children,
      path = _ref.path;

  var _useState = (0, _react.useState)(),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setStateProp = _useState2[1];

  return _react["default"].createElement(Consumer, null, function (context) {
    var getState = context.getState,
        setState = context.setState,
        subscribe = context.subscribe;
    var subscriptionId = Math.random().toString(36).substr(2, 9);
    subscribe(subscriptionId, path, function (next, previous) {
      return setStateProp({
        next: next,
        previous: previous
      });
    });
    return _react["default"].Children.map(children, function (child) {
      var childProps = {
        getSstate: function getSstate(customPath) {
          return getState.call(context, customPath ? customPath : path);
        },
        setSstate: function setSstate(customPath, newval) {
          return setState.call(context, customPath ? customPath : path, newval ? newval : customPath);
        },
        sstate: state ? state : {
          next: getState(path),
          previous: undefined
        }
      };
      return _react["default"].cloneElement(child, childProps);
    });
  });
};

exports.SstateConsumer = SstateConsumer;

var SstateProvider = function SstateProvider(_ref2) {
  var store = _ref2.store,
      children = _ref2.children;
  return _react["default"].createElement(Provider, {
    value: store
  }, children);
};

exports.SstateProvider = SstateProvider;
