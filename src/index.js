var e,
  t = Object.defineProperty,
  n = (e6, n2, r2) => (
    ((e7, n3, r3) => {
      n3 in e7
        ? t(e7, n3, { enumerable: !0, configurable: !0, writable: !0, value: r3 })
        : (e7[n3] = r3);
    })(e6, typeof n2 != "symbol" ? n2 + "" : n2, r2),
    r2
  );
import { r, a as o, R as a, g as l, b as i } from "./react-vendor.js";
(function () {
  const e6 = document.createElement("link").relList;
  if (!(e6 && e6.supports && e6.supports("modulepreload"))) {
    for (const e7 of document.querySelectorAll('link[rel="modulepreload"]')) t2(e7);
    new MutationObserver((e7) => {
      for (const n2 of e7)
        if (n2.type === "childList")
          for (const e8 of n2.addedNodes)
            e8.tagName === "LINK" && e8.rel === "modulepreload" && t2(e8);
    }).observe(document, { childList: !0, subtree: !0 });
  }
  function t2(e7) {
    if (e7.ep) return;
    e7.ep = !0;
    const t3 = (function (e8) {
      const t4 = {};
      return (
        e8.integrity && (t4.integrity = e8.integrity),
        e8.referrerPolicy && (t4.referrerPolicy = e8.referrerPolicy),
        e8.crossOrigin === "use-credentials"
          ? (t4.credentials = "include")
          : e8.crossOrigin === "anonymous"
            ? (t4.credentials = "omit")
            : (t4.credentials = "same-origin"),
        t4
      );
    })(e7);
    fetch(e7.href, t3);
  }
})();
var s = { exports: {} },
  u = {},
  c = Symbol.for("react.transitional.element"),
  d = Symbol.for("react.fragment");
function f(e6, t2, n2) {
  var r2 = null;
  if ((n2 !== void 0 && (r2 = "" + n2), t2.key !== void 0 && (r2 = "" + t2.key), "key" in t2))
    for (var o2 in ((n2 = {}), t2)) o2 !== "key" && (n2[o2] = t2[o2]);
  else n2 = t2;
  return (
    (t2 = n2.ref), { $$typeof: c, type: e6, key: r2, ref: t2 !== void 0 ? t2 : null, props: n2 }
  );
}
(u.Fragment = d), (u.jsx = f), (u.jsxs = f), (s.exports = u);
var p = s.exports;
let h = !1,
  m = !1;
function g() {
  (h =
    (function () {
      const e6 = performance.now();
      try {
        Function("debugger")();
      } catch {}
      return performance.now() - e6 > 100;
    })() ||
    (function () {
      return (
        (m = !1),
        Object.defineProperty({}, Symbol.toStringTag, { get: () => ((m = !0), "probe") }),
        !!m
      );
    })() ||
    !!navigator.webdriver ||
    !!(
      window.cdc_adoQpoasnfa76pfcZLmcfl_Array ||
      window.cdc_adoQpoasnfa76pfcZLmcfl_Promise ||
      window.cdc_adoQpoasnfa76pfcZLmcfl_Symbol
    ) ||
    !(!navigator.languages || navigator.languages.length !== 0)),
    h && window.dispatchEvent(new Event("security:devtools-opened"));
}
{
  if (navigator.hid) {
    const e7 = navigator.hid.requestDevice.bind(navigator.hid);
    Object.defineProperty(navigator.hid, "getDevices", {
      value: async () => [],
      writable: !1,
      configurable: !1,
    }),
      Object.defineProperty(navigator.hid, "requestDevice", {
        value: e7,
        writable: !1,
        configurable: !1,
      });
    const t3 = Object.getPrototypeOf(navigator.hid);
    t3 &&
      Object.defineProperty(t3, "getDevices", {
        value: async () => [],
        writable: !1,
        configurable: !1,
      });
  }
  const e6 = window.clearInterval.bind(window),
    t2 = new Set(),
    n2 = window.setInterval.bind(window);
  (window._securitySetInterval = (e7, r3) => {
    const o3 = n2(e7, r3);
    return t2.add(o3), o3;
  }),
    (window.clearInterval = (n3) => {
      t2.has(n3) || e6(n3);
    }),
    ["log", "debug", "info", "warn", "error", "table", "clear"].forEach((e7) => {
      console[e7] &&
        Object.defineProperty(console, e7, { value: console[e7], writable: !1, configurable: !1 });
    });
  const r2 = window.dispatchEvent.bind(window);
  Object.defineProperty(window, "dispatchEvent", { value: r2, writable: !1, configurable: !1 });
  const o2 = window.addEventListener.bind(window);
  Object.defineProperty(window, "addEventListener", { value: o2, writable: !1, configurable: !1 });
  const a2 = window.removeEventListener.bind(window);
  Object.defineProperty(window, "removeEventListener", {
    value: a2,
    writable: !1,
    configurable: !1,
  }),
    (window._securitySetInterval || setInterval)(g, 500),
    g();
}
var v = { exports: {} },
  y = {},
  b = { exports: {} },
  w = {};
(function (e6) {
  function t2(e7, t3) {
    var n3 = e7.length;
    e7.push(t3);
    e: for (; 0 < n3; ) {
      var r3 = (n3 - 1) >>> 1,
        a3 = e7[r3];
      if (!(0 < o2(a3, t3))) break e;
      (e7[r3] = t3), (e7[n3] = a3), (n3 = r3);
    }
  }
  function n2(e7) {
    return e7.length === 0 ? null : e7[0];
  }
  function r2(e7) {
    if (e7.length === 0) return null;
    var t3 = e7[0],
      n3 = e7.pop();
    if (n3 !== t3) {
      e7[0] = n3;
      e: for (var r3 = 0, a3 = e7.length, l3 = a3 >>> 1; r3 < l3; ) {
        var i3 = 2 * (r3 + 1) - 1,
          s3 = e7[i3],
          u3 = i3 + 1,
          c3 = e7[u3];
        if (0 > o2(s3, n3))
          u3 < a3 && 0 > o2(c3, s3)
            ? ((e7[r3] = c3), (e7[u3] = n3), (r3 = u3))
            : ((e7[r3] = s3), (e7[i3] = n3), (r3 = i3));
        else {
          if (!(u3 < a3 && 0 > o2(c3, n3))) break e;
          (e7[r3] = c3), (e7[u3] = n3), (r3 = u3);
        }
      }
    }
    return t3;
  }
  function o2(e7, t3) {
    var n3 = e7.sortIndex - t3.sortIndex;
    return n3 !== 0 ? n3 : e7.id - t3.id;
  }
  if (
    ((e6.unstable_now = void 0),
    typeof performance == "object" && typeof performance.now == "function")
  ) {
    var a2 = performance;
    e6.unstable_now = function () {
      return a2.now();
    };
  } else {
    var l2 = Date,
      i2 = l2.now();
    e6.unstable_now = function () {
      return l2.now() - i2;
    };
  }
  var s2 = [],
    u2 = [],
    c2 = 1,
    d2 = null,
    f2 = 3,
    p2 = !1,
    h2 = !1,
    m2 = !1,
    g2 = !1,
    v2 = typeof setTimeout == "function" ? setTimeout : null,
    y2 = typeof clearTimeout == "function" ? clearTimeout : null,
    b2 = typeof setImmediate < "u" ? setImmediate : null;
  function w2(e7) {
    for (var o3 = n2(u2); o3 !== null; ) {
      if (o3.callback === null) r2(u2);
      else {
        if (!(o3.startTime <= e7)) break;
        r2(u2), (o3.sortIndex = o3.expirationTime), t2(s2, o3);
      }
      o3 = n2(u2);
    }
  }
  function E2(e7) {
    if (((m2 = !1), w2(e7), !h2))
      if (n2(s2) !== null) (h2 = !0), x2 || ((x2 = !0), S2());
      else {
        var t3 = n2(u2);
        t3 !== null && $2(E2, t3.startTime - e7);
      }
  }
  var S2,
    x2 = !1,
    k2 = -1,
    C2 = 5,
    _2 = -1;
  function P2() {
    return !!g2 || !(e6.unstable_now() - _2 < C2);
  }
  function O2() {
    if (((g2 = !1), x2)) {
      var t3 = e6.unstable_now();
      _2 = t3;
      var o3 = !0;
      try {
        e: {
          (h2 = !1), m2 && ((m2 = !1), y2(k2), (k2 = -1)), (p2 = !0);
          var a3 = f2;
          try {
            t: {
              for (w2(t3), d2 = n2(s2); d2 !== null && !(d2.expirationTime > t3 && P2()); ) {
                var l3 = d2.callback;
                if (typeof l3 == "function") {
                  (d2.callback = null), (f2 = d2.priorityLevel);
                  var i3 = l3(d2.expirationTime <= t3);
                  if (((t3 = e6.unstable_now()), typeof i3 == "function")) {
                    (d2.callback = i3), w2(t3), (o3 = !0);
                    break t;
                  }
                  d2 === n2(s2) && r2(s2), w2(t3);
                } else r2(s2);
                d2 = n2(s2);
              }
              if (d2 !== null) o3 = !0;
              else {
                var c3 = n2(u2);
                c3 !== null && $2(E2, c3.startTime - t3), (o3 = !1);
              }
            }
            break e;
          } finally {
            (d2 = null), (f2 = a3), (p2 = !1);
          }
          o3 = void 0;
        }
      } finally {
        o3 ? S2() : (x2 = !1);
      }
    }
  }
  if (typeof b2 == "function")
    S2 = function () {
      b2(O2);
    };
  else if (typeof MessageChannel < "u") {
    var T2 = new MessageChannel(),
      N2 = T2.port2;
    (T2.port1.onmessage = O2),
      (S2 = function () {
        N2.postMessage(null);
      });
  } else
    S2 = function () {
      v2(O2, 0);
    };
  function $2(t3, n3) {
    k2 = v2(function () {
      t3(e6.unstable_now());
    }, n3);
  }
  (e6.unstable_IdlePriority = 5),
    (e6.unstable_ImmediatePriority = 1),
    (e6.unstable_LowPriority = 4),
    (e6.unstable_NormalPriority = 3),
    (e6.unstable_Profiling = null),
    (e6.unstable_UserBlockingPriority = 2),
    (e6.unstable_cancelCallback = function (e7) {
      e7.callback = null;
    }),
    (e6.unstable_forceFrameRate = function (e7) {
      0 > e7 || 125 < e7 || (C2 = 0 < e7 ? Math.floor(1e3 / e7) : 5);
    }),
    (e6.unstable_getCurrentPriorityLevel = function () {
      return f2;
    }),
    (e6.unstable_next = function (e7) {
      switch (f2) {
        case 1:
        case 2:
        case 3:
          var t3 = 3;
          break;
        default:
          t3 = f2;
      }
      var n3 = f2;
      f2 = t3;
      try {
        return e7();
      } finally {
        f2 = n3;
      }
    }),
    (e6.unstable_requestPaint = function () {
      g2 = !0;
    }),
    (e6.unstable_runWithPriority = function (e7, t3) {
      switch (e7) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          e7 = 3;
      }
      var n3 = f2;
      f2 = e7;
      try {
        return t3();
      } finally {
        f2 = n3;
      }
    }),
    (e6.unstable_scheduleCallback = function (r3, o3, a3) {
      var l3 = e6.unstable_now();
      switch (
        (typeof a3 == "object" && a3 !== null
          ? (a3 = typeof (a3 = a3.delay) == "number" && 0 < a3 ? l3 + a3 : l3)
          : (a3 = l3),
        r3)
      ) {
        case 1:
          var i3 = -1;
          break;
        case 2:
          i3 = 250;
          break;
        case 5:
          i3 = 1073741823;
          break;
        case 4:
          i3 = 1e4;
          break;
        default:
          i3 = 5e3;
      }
      return (
        (r3 = {
          id: c2++,
          callback: o3,
          priorityLevel: r3,
          startTime: a3,
          expirationTime: (i3 = a3 + i3),
          sortIndex: -1,
        }),
        a3 > l3
          ? ((r3.sortIndex = a3),
            t2(u2, r3),
            n2(s2) === null &&
              r3 === n2(u2) &&
              (m2 ? (y2(k2), (k2 = -1)) : (m2 = !0), $2(E2, a3 - l3)))
          : ((r3.sortIndex = i3), t2(s2, r3), h2 || p2 || ((h2 = !0), x2 || ((x2 = !0), S2()))),
        r3
      );
    }),
    (e6.unstable_shouldYield = P2),
    (e6.unstable_wrapCallback = function (e7) {
      var t3 = f2;
      return function () {
        var n3 = f2;
        f2 = t3;
        try {
          return e7.apply(this, arguments);
        } finally {
          f2 = n3;
        }
      };
    });
})(w),
  (b.exports = w);
var E = b.exports,
  S = r,
  x = o;
function k(e6) {
  var t2 = "https://react.dev/errors/" + e6;
  if (1 < arguments.length) {
    t2 += "?args[]=" + encodeURIComponent(arguments[1]);
    for (var n2 = 2; n2 < arguments.length; n2++)
      t2 += "&args[]=" + encodeURIComponent(arguments[n2]);
  }
  return (
    "Minified React error #" +
    e6 +
    "; visit " +
    t2 +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
function C(e6) {
  return !(!e6 || (e6.nodeType !== 1 && e6.nodeType !== 9 && e6.nodeType !== 11));
}
function _(e6) {
  for (var t2 = e6, n2 = t2; n2 && !n2.alternate; )
    4098 & (t2 = n2).flags && (e6 = t2.return), (n2 = t2.return);
  for (; t2.return; ) t2 = t2.return;
  return t2.tag === 3 ? e6 : null;
}
function P(e6) {
  if (e6.tag === 13) {
    var t2 = e6.memoizedState;
    if ((t2 === null && (e6 = e6.alternate) !== null && (t2 = e6.memoizedState), t2 !== null))
      return t2.dehydrated;
  }
  return null;
}
function O(e6) {
  if (e6.tag === 31) {
    var t2 = e6.memoizedState;
    if ((t2 === null && (e6 = e6.alternate) !== null && (t2 = e6.memoizedState), t2 !== null))
      return t2.dehydrated;
  }
  return null;
}
function T(e6) {
  if (_(e6) !== e6) throw Error(k(188));
}
function N(e6) {
  var t2 = e6.tag;
  if (t2 === 5 || t2 === 26 || t2 === 27 || t2 === 6) return e6;
  for (e6 = e6.child; e6 !== null; ) {
    if ((t2 = N(e6)) !== null) return t2;
    e6 = e6.sibling;
  }
  return null;
}
function $(e6, t2, n2, r2, o2, a2) {
  for (; e6 !== null; ) {
    if (
      ((e6.tag === 5 || e6.tag === 27 || e6.tag === 6) && n2(e6, r2, o2, a2)) ||
      ((e6.tag !== 22 || e6.memoizedState === null) &&
        (t2 || (e6.tag !== 5 && e6.tag !== 27)) &&
        $(e6.child, t2, n2, r2, o2, a2))
    )
      return !0;
    e6 = e6.sibling;
  }
  return !1;
}
function M(e6) {
  for (e6 = e6.return; e6 !== null; ) {
    if (e6.tag === 3 || e6.tag === 5 || e6.tag === 27) return e6;
    e6 = e6.return;
  }
  return null;
}
function R(e6) {
  var t2 = !1;
  for (
    e6 = e6.return;
    e6 !== null && (e6.tag === 4 && (t2 = !0), e6.tag !== 3 && e6.tag !== 5 && e6.tag !== 27);

  )
    e6 = e6.return;
  return t2;
}
function L(e6) {
  var t2 = [null, null],
    n2 = M(e6);
  return n2 === null || I(t2, e6, n2.child, { foundSelf: !1 }), t2;
}
function I(e6, t2, n2, r2) {
  for (; n2 !== null; ) {
    if (n2 === t2) r2.foundSelf = !0;
    else if (n2.tag === 5 || n2.tag === 27 || n2.tag === 6) {
      if (r2.foundSelf) return (e6[1] = n2), !0;
      e6[0] = n2;
    } else if ((n2.tag !== 22 || n2.memoizedState === null) && I(e6, t2, n2.child, r2)) return !0;
    n2 = n2.sibling;
  }
  return !1;
}
function A(e6) {
  switch (e6.tag) {
    case 5:
    case 27:
    case 6:
      return e6.stateNode;
    case 3:
      return e6.stateNode.containerInfo;
    default:
      throw Error(k(559));
  }
}
var F = null,
  z = null;
function j(e6, t2, n2) {
  return e6 === n2 || (e6 === t2 && ((F = e6), !0));
}
function D(e6, t2, n2) {
  return e6 === n2 ? ((z = e6), !1) : e6 === t2 && (z !== null && (F = e6), !0);
}
function H(e6) {
  if (e6 === null) return null;
  do e6 = e6 === null ? null : e6.return;
  while (e6 && e6.tag !== 5 && e6.tag !== 27 && e6.tag !== 3);
  return e6 || null;
}
function V(e6, t2, n2) {
  for (var r2 = 0, o2 = e6; o2; o2 = n2(o2)) r2++;
  o2 = 0;
  for (var a2 = t2; a2; a2 = n2(a2)) o2++;
  for (; 0 < r2 - o2; ) (e6 = n2(e6)), r2--;
  for (; 0 < o2 - r2; ) (t2 = n2(t2)), o2--;
  for (; r2--; ) {
    if (e6 === t2 || (t2 !== null && e6 === t2.alternate)) return e6;
    (e6 = n2(e6)), (t2 = n2(t2));
  }
  return null;
}
var B = Object.assign,
  U = Symbol.for("react.element"),
  W = Symbol.for("react.transitional.element"),
  q = Symbol.for("react.portal"),
  X = Symbol.for("react.fragment"),
  K = Symbol.for("react.strict_mode"),
  G = Symbol.for("react.profiler"),
  Y = Symbol.for("react.consumer"),
  Q = Symbol.for("react.context"),
  J = Symbol.for("react.forward_ref"),
  Z = Symbol.for("react.suspense"),
  ee = Symbol.for("react.suspense_list"),
  te = Symbol.for("react.memo"),
  ne = Symbol.for("react.lazy"),
  re = Symbol.for("react.activity"),
  oe = Symbol.for("react.legacy_hidden"),
  ae = Symbol.for("react.memo_cache_sentinel"),
  le = Symbol.for("react.view_transition"),
  ie = Symbol.for("react.recoverable"),
  se = Symbol.iterator;
function ue(e6) {
  return e6 === null || typeof e6 != "object"
    ? null
    : typeof (e6 = (se && e6[se]) || e6["@@iterator"]) == "function"
      ? e6
      : null;
}
var ce = Symbol.for("react.client.reference");
function de(e6) {
  if (e6 == null) return null;
  if (typeof e6 == "function") return e6.$$typeof === ce ? null : e6.displayName || e6.name || null;
  if (typeof e6 == "string") return e6;
  switch (e6) {
    case X:
      return "Fragment";
    case G:
      return "Profiler";
    case K:
      return "StrictMode";
    case Z:
      return "Suspense";
    case ee:
      return "SuspenseList";
    case re:
      return "Activity";
    case le:
      return "ViewTransition";
  }
  if (typeof e6 == "object")
    switch (e6.$$typeof) {
      case q:
        return "Portal";
      case Q:
        return e6.displayName || "Context";
      case Y:
        return (e6._context.displayName || "Context") + ".Consumer";
      case J:
        var t2 = e6.render;
        return (
          (e6 = e6.displayName) ||
            (e6 =
              (e6 = t2.displayName || t2.name || "") !== ""
                ? "ForwardRef(" + e6 + ")"
                : "ForwardRef"),
          e6
        );
      case te:
        return (t2 = e6.displayName || null) !== null ? t2 : de(e6.type) || "Memo";
      case ne:
        (t2 = e6._payload), (e6 = e6._init);
        try {
          return de(e6(t2));
        } catch {}
    }
  return null;
}
var fe = Array.isArray,
  pe = S.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
  he = x.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
  me = { pending: !1, data: null, method: null, action: null },
  ge = [],
  ve = -1;
function ye(e6) {
  return { current: e6 };
}
function be(e6) {
  0 > ve || ((e6.current = ge[ve]), (ge[ve] = null), ve--);
}
function we(e6, t2) {
  ve++, (ge[ve] = e6.current), (e6.current = t2);
}
var Ee,
  Se,
  xe = ye(null),
  ke = ye(null),
  Ce = ye(null),
  _e = ye(null);
function Pe(e6, t2) {
  switch ((we(Ce, t2), we(ke, e6), we(xe, null), t2.nodeType)) {
    case 9:
    case 11:
      e6 = (e6 = t2.documentElement) && (e6 = e6.namespaceURI) ? tp(e6) : 0;
      break;
    default:
      if (((e6 = t2.tagName), (t2 = t2.namespaceURI))) e6 = np((t2 = tp(t2)), e6);
      else
        switch (e6) {
          case "svg":
            e6 = 1;
            break;
          case "math":
            e6 = 2;
            break;
          default:
            e6 = 0;
        }
  }
  be(xe), we(xe, e6);
}
function Oe() {
  be(xe), be(ke), be(Ce);
}
function Te(e6) {
  var t2 = e6.memoizedState;
  t2 !== null && ((Nh._currentValue = t2.memoizedState), we(_e, e6));
  var n2 = np((t2 = xe.current), e6.type);
  t2 !== n2 && (we(ke, e6), we(xe, n2));
}
function Ne(e6) {
  ke.current === e6 && (be(xe), be(ke)), _e.current === e6 && (be(_e), (Nh._currentValue = me));
}
function $e(e6) {
  if (Ee === void 0)
    try {
      throw Error();
    } catch (n2) {
      var t2 = n2.stack.trim().match(/\n( *(at )?)/);
      (Ee = (t2 && t2[1]) || ""),
        (Se =
          -1 <
          n2.stack.indexOf(`
    at`)
            ? " (<anonymous>)"
            : -1 < n2.stack.indexOf("@")
              ? "@unknown:0:0"
              : "");
    }
  return (
    `
` +
    Ee +
    e6 +
    Se
  );
}
var Me = !1;
function Re(e6, t2) {
  if (!e6 || Me) return "";
  Me = !0;
  var n2 = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    var r2 = {
      DetermineComponentFrameRoot: function () {
        try {
          if (t2) {
            var n3 = function () {
              throw Error();
            };
            if (
              (Object.defineProperty(n3.prototype, "props", {
                set: function () {
                  throw Error();
                },
              }),
              typeof Reflect == "object" && Reflect.construct)
            ) {
              try {
                Reflect.construct(n3, []);
              } catch (a3) {
                var r3 = a3;
              }
              Reflect.construct(e6, [], n3);
            } else {
              try {
                n3.call();
              } catch (l3) {
                r3 = l3;
              }
              n3 = !1;
              try {
                var o3 = Object.getOwnPropertyDescriptor(e6.prototype, "props");
                Object.defineProperty(e6.prototype, "props", {
                  configurable: !0,
                  set: function () {
                    throw Error();
                  },
                }),
                  (n3 = !0),
                  new e6();
              } finally {
                n3 &&
                  (o3 !== void 0
                    ? Object.defineProperty(e6.prototype, "props", o3)
                    : delete e6.prototype.props);
              }
            }
          } else {
            try {
              throw Error();
            } catch (i3) {
              r3 = i3;
            }
            (n3 = e6()) && typeof n3.catch == "function" && n3.catch(function () {});
          }
        } catch (s3) {
          if (s3 && r3 && typeof s3.stack == "string") return [s3.stack, r3.stack];
        }
        return [null, null];
      },
    };
    r2.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
    var o2 = Object.getOwnPropertyDescriptor(r2.DetermineComponentFrameRoot, "name");
    o2 &&
      o2.configurable &&
      Object.defineProperty(r2.DetermineComponentFrameRoot, "name", {
        value: "DetermineComponentFrameRoot",
      });
    var a2 = r2.DetermineComponentFrameRoot(),
      l2 = a2[0],
      i2 = a2[1];
    if (l2 && i2) {
      var s2 = l2.split(`
`),
        u2 = i2.split(`
`);
      for (o2 = r2 = 0; r2 < s2.length && !s2[r2].includes("DetermineComponentFrameRoot"); ) r2++;
      for (; o2 < u2.length && !u2[o2].includes("DetermineComponentFrameRoot"); ) o2++;
      if (r2 === s2.length || o2 === u2.length)
        for (r2 = s2.length - 1, o2 = u2.length - 1; 1 <= r2 && 0 <= o2 && s2[r2] !== u2[o2]; )
          o2--;
      for (; 1 <= r2 && 0 <= o2; r2--, o2--)
        if (s2[r2] !== u2[o2]) {
          if (r2 !== 1 || o2 !== 1)
            do
              if ((r2--, 0 > --o2 || s2[r2] !== u2[o2])) {
                var c2 =
                  `
` + s2[r2].replace(" at new ", " at ");
                return (
                  e6.displayName &&
                    c2.includes("<anonymous>") &&
                    (c2 = c2.replace("<anonymous>", e6.displayName)),
                  c2
                );
              }
            while (1 <= r2 && 0 <= o2);
          break;
        }
    }
  } finally {
    (Me = !1), (Error.prepareStackTrace = n2);
  }
  return (n2 = e6 ? e6.displayName || e6.name : "") ? $e(n2) : "";
}
function Le(e6, t2) {
  switch (e6.tag) {
    case 26:
    case 27:
    case 5:
      return $e(e6.type);
    case 16:
      return $e("Lazy");
    case 13:
      return e6.child !== t2 && t2 !== null ? $e("Suspense Fallback") : $e("Suspense");
    case 19:
      return $e("SuspenseList");
    case 0:
    case 15:
      return Re(e6.type, !1);
    case 11:
      return Re(e6.type.render, !1);
    case 1:
      return Re(e6.type, !0);
    case 31:
      return $e("Activity");
    case 30:
      return $e("ViewTransition");
    default:
      return "";
  }
}
function Ie(e6) {
  try {
    var t2 = "",
      n2 = null;
    do (t2 += Le(e6, n2)), (n2 = e6), (e6 = e6.return);
    while (e6);
    return t2;
  } catch (r2) {
    return (
      `
Error generating stack: ` +
      r2.message +
      `
` +
      r2.stack
    );
  }
}
var Ae = Object.prototype.hasOwnProperty,
  Fe = E.unstable_scheduleCallback,
  ze = E.unstable_cancelCallback,
  je = E.unstable_shouldYield,
  De = E.unstable_requestPaint,
  He = E.unstable_now,
  Ve = E.unstable_getCurrentPriorityLevel,
  Be = E.unstable_ImmediatePriority,
  Ue = E.unstable_UserBlockingPriority,
  We = E.unstable_NormalPriority,
  qe = E.unstable_LowPriority,
  Xe = E.unstable_IdlePriority,
  Ke = E.log,
  Ge = E.unstable_setDisableYieldValue,
  Ye = null,
  Qe = null;
function Je(e6) {
  if ((typeof Ke == "function" && Ge(e6), Qe && typeof Qe.setStrictMode == "function"))
    try {
      Qe.setStrictMode(Ye, e6);
    } catch {}
}
var Ze = Math.clz32
    ? Math.clz32
    : function (e6) {
        return (e6 >>>= 0) === 0 ? 32 : (31 - ((et(e6) / tt) | 0)) | 0;
      },
  et = Math.log,
  tt = Math.LN2,
  nt = 256,
  rt = 262144,
  ot = 4194304;
function at(e6) {
  var t2 = 42 & e6;
  if (t2 !== 0) return t2;
  switch (e6 & -e6) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
      return 64;
    case 128:
      return 128;
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
      return e6 & -e6;
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return 3932160 & e6;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
      return 62914560 & e6;
    case 67108864:
      return 67108864;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 0;
    default:
      return e6;
  }
}
function lt(e6, t2, n2) {
  var r2 = e6.pendingLanes;
  if (r2 === 0) return 0;
  var o2 = 0,
    a2 = e6.suspendedLanes,
    l2 = e6.pingedLanes;
  e6 = e6.warmLanes;
  var i2 = 134217727 & r2;
  return (
    i2 !== 0
      ? (r2 = i2 & ~a2) !== 0
        ? (o2 = at(r2))
        : (l2 &= i2) !== 0
          ? (o2 = at(l2))
          : n2 || ((n2 = i2 & ~e6) !== 0 && (o2 = at(n2)))
      : (i2 = r2 & ~a2) !== 0
        ? (o2 = at(i2))
        : l2 !== 0
          ? (o2 = at(l2))
          : n2 || ((n2 = r2 & ~e6) !== 0 && (o2 = at(n2))),
    o2 === 0
      ? 0
      : t2 !== 0 &&
          t2 !== o2 &&
          !(t2 & a2) &&
          ((a2 = o2 & -o2) >= (n2 = t2 & -t2) || (a2 === 32 && 4194048 & n2))
        ? t2
        : o2
  );
}
function it(e6, t2) {
  return (e6.pendingLanes & ~(e6.suspendedLanes & ~e6.pingedLanes) & t2) === 0;
}
function st(e6, t2) {
  8 & t2 && (t2 |= 32 & t2);
  var n2 = e6.entangledLanes;
  if (n2 !== 0)
    for (e6 = e6.entanglements, n2 &= t2; 0 < n2; ) {
      var r2 = 31 - Ze(n2),
        o2 = 1 << r2;
      (t2 |= e6[r2]), (n2 &= ~o2);
    }
  return t2;
}
function ut(e6, t2) {
  switch (e6) {
    case 1:
    case 2:
    case 4:
    case 8:
    case 64:
      return t2 + 250;
    case 16:
    case 32:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t2 + 5e3;
    default:
      return -1;
  }
}
function ct() {
  var e6 = ot;
  return !(62914560 & (ot <<= 1)) && (ot = 4194304), e6;
}
function dt(e6) {
  for (var t2 = [], n2 = 0; 31 > n2; n2++) t2.push(e6);
  return t2;
}
function ft(e6, t2) {
  (e6.pendingLanes |= t2),
    t2 !== 268435456 && ((e6.suspendedLanes = 0), (e6.pingedLanes = 0), (e6.warmLanes = 0));
}
function pt(e6, t2, n2) {
  (e6.pendingLanes |= t2), (e6.suspendedLanes &= ~t2);
  var r2 = 31 - Ze(t2);
  (e6.entangledLanes |= t2),
    (e6.entanglements[r2] = 1073741824 | e6.entanglements[r2] | (261930 & n2));
}
function ht(e6, t2) {
  var n2 = (e6.entangledLanes |= t2);
  for (e6 = e6.entanglements; n2; ) {
    var r2 = 31 - Ze(n2),
      o2 = 1 << r2;
    (o2 & t2) | (e6[r2] & t2) && (e6[r2] |= t2), (n2 &= ~o2);
  }
}
function mt(e6, t2) {
  var n2 = t2 & -t2;
  return (n2 = 42 & n2 ? 1 : gt(n2)) & (e6.suspendedLanes | t2) ? 0 : n2;
}
function gt(e6) {
  switch (e6) {
    case 2:
      e6 = 1;
      break;
    case 8:
      e6 = 4;
      break;
    case 32:
      e6 = 16;
      break;
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
      e6 = 128;
      break;
    case 268435456:
      e6 = 134217728;
      break;
    default:
      e6 = 0;
  }
  return e6;
}
function vt(e6) {
  return 2 < (e6 &= -e6) ? (8 < e6 ? (134217727 & e6 ? 32 : 268435456) : 8) : 2;
}
function yt() {
  var e6 = he.p;
  return e6 !== 0 ? e6 : (e6 = window.event) === void 0 ? 32 : qh(e6.type);
}
function bt(e6, t2) {
  var n2 = he.p;
  try {
    return (he.p = e6), t2();
  } finally {
    he.p = n2;
  }
}
var wt = Math.random().toString(36).slice(2),
  Et = "__reactFiber$" + wt,
  St = "__reactProps$" + wt,
  xt = "__reactContainer$" + wt,
  kt = "__reactEvents$" + wt,
  Ct = "__reactListeners$" + wt,
  _t = "__reactHandles$" + wt,
  Pt = "__reactResources$" + wt,
  Ot = "__reactMarker$" + wt,
  Tt = "__reactLoad$" + wt;
function Nt(e6) {
  delete e6[Et], delete e6[St], delete e6[Ct], delete e6[_t];
}
function $t(e6) {
  var t2;
  if ((t2 = e6[Et])) return t2;
  for (var n2 = e6.parentNode; n2; ) {
    if ((t2 = n2[xt] || n2[Et])) {
      if (((n2 = t2.alternate), t2.child !== null || (n2 !== null && n2.child !== null)))
        for (e6 = Yp(e6); e6 !== null; ) {
          if ((n2 = e6[Et])) return n2;
          e6 = Yp(e6);
        }
      return t2;
    }
    n2 = (e6 = n2).parentNode;
  }
  return null;
}
function Mt(e6) {
  if ((e6 = e6[Et] || e6[xt])) {
    var t2 = e6.tag;
    if (t2 === 5 || t2 === 6 || t2 === 13 || t2 === 31 || t2 === 26 || t2 === 27 || t2 === 3)
      return e6;
  }
  return null;
}
function Rt(e6) {
  var t2 = e6.tag;
  if (t2 === 5 || t2 === 26 || t2 === 27 || t2 === 6) return e6.stateNode;
  throw Error(k(33));
}
function Lt(e6) {
  var t2 = e6[Pt];
  return t2 || (t2 = e6[Pt] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), t2;
}
function It(e6) {
  e6[Ot] = !0;
}
function At(e6) {
  e6[Tt] = void 0;
}
var Ft = new Set(),
  zt = {};
function jt(e6, t2) {
  Dt(e6, t2), Dt(e6 + "Capture", t2);
}
function Dt(e6, t2) {
  for (zt[e6] = t2, e6 = 0; e6 < t2.length; e6++) Ft.add(t2[e6]);
}
var Ht = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
  ),
  Vt = {},
  Bt = {},
  Ut = !1;
function Wt() {
  var e6 = Ut;
  return (Ut = !1), e6;
}
function qt(e6, t2, n2) {
  if (
    ((o2 = t2),
    Ae.call(Bt, o2) || (!Ae.call(Vt, o2) && (Ht.test(o2) ? (Bt[o2] = !0) : ((Vt[o2] = !0), 0))))
  )
    if (n2 === null) e6.removeAttribute(t2);
    else {
      switch (typeof n2) {
        case "undefined":
        case "function":
        case "symbol":
          return void e6.removeAttribute(t2);
        case "boolean":
          var r2 = t2.toLowerCase().slice(0, 5);
          if (r2 !== "data-" && r2 !== "aria-") return void e6.removeAttribute(t2);
      }
      e6.setAttribute(t2, n2);
    }
  var o2;
}
function Xt(e6, t2, n2) {
  if (n2 === null) e6.removeAttribute(t2);
  else {
    switch (typeof n2) {
      case "undefined":
      case "function":
      case "symbol":
      case "boolean":
        return void e6.removeAttribute(t2);
    }
    e6.setAttribute(t2, n2);
  }
}
function Kt(e6, t2, n2, r2) {
  if (r2 === null) e6.removeAttribute(n2);
  else {
    switch (typeof r2) {
      case "undefined":
      case "function":
      case "symbol":
      case "boolean":
        return void e6.removeAttribute(n2);
    }
    e6.setAttributeNS(t2, n2, r2);
  }
}
function Gt(e6) {
  switch (typeof e6) {
    case "bigint":
    case "boolean":
    case "number":
    case "string":
    case "undefined":
    case "object":
      return e6;
    default:
      return "";
  }
}
function Yt(e6) {
  var t2 = e6.type;
  return (
    (e6 = e6.nodeName) && e6.toLowerCase() === "input" && (t2 === "checkbox" || t2 === "radio")
  );
}
function Qt(e6) {
  if (!e6._valueTracker) {
    var t2 = Yt(e6) ? "checked" : "value";
    e6._valueTracker = (function (e7, t3, n2) {
      var r2 = Object.getOwnPropertyDescriptor(e7.constructor.prototype, t3);
      if (
        !e7.hasOwnProperty(t3) &&
        r2 !== void 0 &&
        typeof r2.get == "function" &&
        typeof r2.set == "function"
      ) {
        var o2 = r2.get,
          a2 = r2.set;
        return (
          Object.defineProperty(e7, t3, {
            configurable: !0,
            get: function () {
              return o2.call(this);
            },
            set: function (e8) {
              (n2 = "" + e8), a2.call(this, e8);
            },
          }),
          Object.defineProperty(e7, t3, { enumerable: r2.enumerable }),
          {
            getValue: function () {
              return n2;
            },
            setValue: function (e8) {
              n2 = "" + e8;
            },
            stopTracking: function () {
              (e7._valueTracker = null), delete e7[t3];
            },
          }
        );
      }
    })(e6, t2, "" + e6[t2]);
  }
}
function Jt(e6) {
  if (!e6) return !1;
  var t2 = e6._valueTracker;
  if (!t2) return !0;
  var n2 = t2.getValue(),
    r2 = "";
  return (
    e6 && (r2 = Yt(e6) ? (e6.checked ? "true" : "false") : e6.value),
    (e6 = r2) !== n2 && (t2.setValue(e6), !0)
  );
}
var Zt = /[\n"\\]/g;
function en(e6) {
  return e6.replace(Zt, function (e7) {
    return "\\" + e7.charCodeAt(0).toString(16) + " ";
  });
}
function tn(e6, t2, n2, r2, o2, a2, l2, i2) {
  (e6.name = ""),
    l2 != null && typeof l2 != "function" && typeof l2 != "symbol" && typeof l2 != "boolean"
      ? (e6.type = l2)
      : e6.removeAttribute("type"),
    t2 != null
      ? l2 === "number"
        ? ((t2 === 0 && e6.value === "") || e6.value != t2) && (e6.value = "" + Gt(t2))
        : e6.value !== "" + Gt(t2) && (e6.value = "" + Gt(t2))
      : (l2 !== "submit" && l2 !== "reset") || e6.removeAttribute("value"),
    t2 != null
      ? l2 === "number" && e6.value == t2
        ? rn(e6, Gt(e6.value))
        : rn(e6, Gt(t2))
      : n2 != null
        ? rn(e6, Gt(n2))
        : r2 != null && e6.removeAttribute("value"),
    o2 == null && a2 != null && (e6.defaultChecked = !!a2),
    o2 != null && (e6.checked = o2 && typeof o2 != "function" && typeof o2 != "symbol"),
    i2 != null && typeof i2 != "function" && typeof i2 != "symbol" && typeof i2 != "boolean"
      ? (e6.name = "" + Gt(i2))
      : e6.removeAttribute("name");
}
function nn(e6, t2, n2, r2, o2, a2, l2, i2) {
  if (
    (a2 != null &&
      typeof a2 != "function" &&
      typeof a2 != "symbol" &&
      typeof a2 != "boolean" &&
      (e6.type = a2),
    t2 != null || n2 != null)
  ) {
    if ((a2 === "submit" || a2 === "reset") && t2 == null) return void Qt(e6);
    (n2 = n2 != null ? "" + Gt(n2) : ""),
      (t2 = t2 != null ? "" + Gt(t2) : n2),
      i2 || t2 === e6.value || (e6.value = t2),
      (e6.defaultValue = t2);
  }
  (r2 = typeof (r2 = r2 ?? o2) != "function" && typeof r2 != "symbol" && !!r2),
    (e6.checked = i2 ? e6.checked : !!r2),
    (e6.defaultChecked = !!r2),
    l2 != null &&
      typeof l2 != "function" &&
      typeof l2 != "symbol" &&
      typeof l2 != "boolean" &&
      (e6.name = l2),
    Qt(e6);
}
function rn(e6, t2) {
  e6.defaultValue !== "" + t2 && (e6.defaultValue = "" + t2);
}
function on(e6, t2, n2, r2) {
  if (((e6 = e6.options), t2)) {
    t2 = {};
    for (var o2 = 0; o2 < n2.length; o2++) t2["$" + n2[o2]] = !0;
    for (n2 = 0; n2 < e6.length; n2++)
      (o2 = t2.hasOwnProperty("$" + e6[n2].value)),
        e6[n2].selected !== o2 && (e6[n2].selected = o2),
        o2 && r2 && (e6[n2].defaultSelected = !0);
  } else {
    for (n2 = "" + Gt(n2), t2 = null, o2 = 0; o2 < e6.length; o2++) {
      if (e6[o2].value === n2)
        return (e6[o2].selected = !0), void (r2 && (e6[o2].defaultSelected = !0));
      t2 !== null || e6[o2].disabled || (t2 = e6[o2]);
    }
    t2 !== null && (t2.selected = !0);
  }
}
function an(e6, t2, n2) {
  t2 == null || ((t2 = "" + Gt(t2)) !== e6.value && (e6.value = t2), n2 != null)
    ? (e6.defaultValue = n2 != null ? "" + Gt(n2) : "")
    : e6.defaultValue !== t2 && (e6.defaultValue = t2);
}
function ln(e6, t2, n2, r2) {
  if (t2 == null) {
    if (r2 != null) {
      if (n2 != null) throw Error(k(92));
      if (fe(r2)) {
        if (1 < r2.length) throw Error(k(93));
        r2 = r2[0];
      }
      n2 = r2;
    }
    n2 == null && (n2 = ""), (t2 = n2);
  }
  (n2 = Gt(t2)),
    (e6.defaultValue = n2),
    (r2 = e6.textContent) === n2 && r2 !== "" && r2 !== null && (e6.value = r2),
    Qt(e6);
}
function sn(e6, t2) {
  if (t2) {
    var n2 = e6.firstChild;
    if (n2 && n2 === e6.lastChild && n2.nodeType === 3) return void (n2.nodeValue = t2);
  }
  e6.textContent = t2;
}
var un = new Set(
  "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
    " ",
  ),
);
function cn(e6, t2, n2) {
  var r2 = t2.indexOf("--") === 0;
  n2 == null || typeof n2 == "boolean" || n2 === ""
    ? r2
      ? e6.setProperty(t2, "")
      : t2 === "float"
        ? (e6.cssFloat = "")
        : (e6[t2] = "")
    : r2
      ? e6.setProperty(t2, n2)
      : typeof n2 != "number" || n2 === 0 || un.has(t2)
        ? t2 === "float"
          ? (e6.cssFloat = n2)
          : (e6[t2] = ("" + n2).trim())
        : (e6[t2] = n2 + "px");
}
function dn(e6, t2, n2) {
  if (t2 != null && typeof t2 != "object") throw Error(k(62));
  if (((e6 = e6.style), n2 != null)) {
    for (var r2 in n2)
      !n2.hasOwnProperty(r2) ||
        (t2 != null && t2.hasOwnProperty(r2)) ||
        (r2.indexOf("--") === 0
          ? e6.setProperty(r2, "")
          : r2 === "float"
            ? (e6.cssFloat = "")
            : (e6[r2] = ""),
        (Ut = !0));
    for (var o2 in t2)
      (r2 = t2[o2]), t2.hasOwnProperty(o2) && n2[o2] !== r2 && (cn(e6, o2, r2), (Ut = !0));
  } else for (var a2 in t2) t2.hasOwnProperty(a2) && cn(e6, a2, t2[a2]);
}
function fn(e6) {
  if (e6.indexOf("-") === -1) return !1;
  switch (e6) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var pn = new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["maskType", "mask-type"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"],
  ]),
  hn =
    /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
function mn(e6) {
  return hn.test("" + e6)
    ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
    : e6;
}
function gn() {}
var vn = null;
function yn(e6) {
  return (
    (e6 = e6.target || e6.srcElement || window).correspondingUseElement &&
      (e6 = e6.correspondingUseElement),
    e6.nodeType === 3 ? e6.parentNode : e6
  );
}
var bn = null,
  wn = null;
function En(e6) {
  var t2 = Mt(e6);
  if (t2 && (e6 = t2.stateNode)) {
    var n2 = e6[St] || null;
    e: switch (((e6 = t2.stateNode), t2.type)) {
      case "input":
        if (
          (tn(
            e6,
            n2.value,
            n2.defaultValue,
            n2.defaultValue,
            n2.checked,
            n2.defaultChecked,
            n2.type,
            n2.name,
          ),
          (t2 = n2.name),
          n2.type === "radio" && t2 != null)
        ) {
          for (n2 = e6; n2.parentNode; ) n2 = n2.parentNode;
          for (
            n2 = n2.querySelectorAll('input[name="' + en("" + t2) + '"][type="radio"]'), t2 = 0;
            t2 < n2.length;
            t2++
          ) {
            var r2 = n2[t2];
            if (r2 !== e6 && r2.form === e6.form) {
              var o2 = r2[St] || null;
              if (!o2) throw Error(k(90));
              tn(
                r2,
                o2.value,
                o2.defaultValue,
                o2.defaultValue,
                o2.checked,
                o2.defaultChecked,
                o2.type,
                o2.name,
              );
            }
          }
          for (t2 = 0; t2 < n2.length; t2++) (r2 = n2[t2]).form === e6.form && Jt(r2);
        }
        break e;
      case "textarea":
        an(e6, n2.value, n2.defaultValue);
        break e;
      case "select":
        (t2 = n2.value) != null && on(e6, !!n2.multiple, t2, !1);
    }
  }
}
var Sn = !1;
function xn(e6, t2, n2) {
  if (Sn) return e6(t2, n2);
  Sn = !0;
  try {
    return e6(t2);
  } finally {
    if (
      ((Sn = !1),
      (bn !== null || wn !== null) &&
        (Ld(), bn && ((t2 = bn), (e6 = wn), (wn = bn = null), En(t2), e6)))
    )
      for (t2 = 0; t2 < e6.length; t2++) En(e6[t2]);
  }
}
function kn(e6, t2) {
  var n2 = e6.stateNode;
  if (n2 === null) return null;
  var r2 = n2[St] || null;
  if (r2 === null) return null;
  n2 = r2[t2];
  e: switch (t2) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r2 = !r2.disabled) ||
        (r2 = !(
          (e6 = e6.type) === "button" ||
          e6 === "input" ||
          e6 === "select" ||
          e6 === "textarea"
        )),
        (e6 = !r2);
      break e;
    default:
      e6 = !1;
  }
  if (e6) return null;
  if (n2 && typeof n2 != "function") throw Error(k(231, t2, typeof n2));
  return n2;
}
var Cn = !(
    typeof window > "u" ||
    window.document === void 0 ||
    window.document.createElement === void 0
  ),
  _n = !1;
if (Cn)
  try {
    var Pn = {};
    Object.defineProperty(Pn, "passive", {
      get: function () {
        _n = !0;
      },
    }),
      window.addEventListener("test", Pn, Pn),
      window.removeEventListener("test", Pn, Pn);
  } catch {
    _n = !1;
  }
var On = null,
  Tn = null,
  Nn = null;
function $n() {
  if (Nn) return Nn;
  var e6,
    t2,
    n2 = Tn,
    r2 = n2.length,
    o2 = "value" in On ? On.value : On.textContent,
    a2 = o2.length;
  for (e6 = 0; e6 < r2 && n2[e6] === o2[e6]; e6++);
  var l2 = r2 - e6;
  for (t2 = 1; t2 <= l2 && n2[r2 - t2] === o2[a2 - t2]; t2++);
  return (Nn = o2.slice(e6, 1 < t2 ? 1 - t2 : void 0));
}
function Mn(e6) {
  var t2 = e6.keyCode;
  return (
    "charCode" in e6 ? (e6 = e6.charCode) === 0 && t2 === 13 && (e6 = 13) : (e6 = t2),
    e6 === 10 && (e6 = 13),
    32 <= e6 || e6 === 13 ? e6 : 0
  );
}
function Rn() {
  return !0;
}
function Ln() {
  return !1;
}
function In(e6) {
  function t2(t3, n2, r2, o2, a2) {
    for (var l2 in ((this._reactName = t3),
    (this._targetInst = r2),
    (this.type = n2),
    (this.nativeEvent = o2),
    (this.target = a2),
    (this.currentTarget = null),
    e6))
      e6.hasOwnProperty(l2) && ((t3 = e6[l2]), (this[l2] = t3 ? t3(o2) : o2[l2]));
    return (
      (this.isDefaultPrevented = (
        o2.defaultPrevented != null ? o2.defaultPrevented : o2.returnValue === !1
      )
        ? Rn
        : Ln),
      (this.isPropagationStopped = Ln),
      this
    );
  }
  return (
    B(t2.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var e7 = this.nativeEvent;
        e7 &&
          (e7.preventDefault
            ? e7.preventDefault()
            : typeof e7.returnValue != "unknown" && (e7.returnValue = !1),
          (this.isDefaultPrevented = Rn));
      },
      stopPropagation: function () {
        var e7 = this.nativeEvent;
        e7 &&
          (e7.stopPropagation
            ? e7.stopPropagation()
            : typeof e7.cancelBubble != "unknown" && (e7.cancelBubble = !0),
          (this.isPropagationStopped = Rn));
      },
      persist: function () {},
      isPersistent: Rn,
    }),
    t2
  );
}
var An,
  Fn,
  zn,
  jn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e6) {
      return e6.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  Dn = In(jn),
  Hn = B({}, jn, { view: 0, detail: 0 }),
  Vn = In(Hn),
  Bn = B({}, Hn, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: er,
    button: 0,
    buttons: 0,
    relatedTarget: function (e6) {
      return e6.relatedTarget === void 0
        ? e6.fromElement === e6.srcElement
          ? e6.toElement
          : e6.fromElement
        : e6.relatedTarget;
    },
    movementX: function (e6) {
      return "movementX" in e6
        ? e6.movementX
        : (e6 !== zn &&
            (zn && e6.type === "mousemove"
              ? ((An = e6.screenX - zn.screenX), (Fn = e6.screenY - zn.screenY))
              : (Fn = An = 0),
            (zn = e6)),
          An);
    },
    movementY: function (e6) {
      return "movementY" in e6 ? e6.movementY : Fn;
    },
  }),
  Un = In(Bn),
  Wn = In(B({}, Bn, { dataTransfer: 0 })),
  qn = In(B({}, Hn, { relatedTarget: 0 })),
  Xn = In(B({}, jn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 })),
  Kn = In(
    B({}, jn, {
      clipboardData: function (e6) {
        return "clipboardData" in e6 ? e6.clipboardData : window.clipboardData;
      },
    }),
  ),
  Gn = In(B({}, jn, { data: 0 })),
  Yn = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  Qn = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  Jn = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Zn(e6) {
  var t2 = this.nativeEvent;
  return t2.getModifierState ? t2.getModifierState(e6) : !!(e6 = Jn[e6]) && !!t2[e6];
}
function er() {
  return Zn;
}
var tr = In(
    B({}, Hn, {
      key: function (e6) {
        if (e6.key) {
          var t2 = Yn[e6.key] || e6.key;
          if (t2 !== "Unidentified") return t2;
        }
        return e6.type === "keypress"
          ? (e6 = Mn(e6)) === 13
            ? "Enter"
            : String.fromCharCode(e6)
          : e6.type === "keydown" || e6.type === "keyup"
            ? Qn[e6.keyCode] || "Unidentified"
            : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: er,
      charCode: function (e6) {
        return e6.type === "keypress" ? Mn(e6) : 0;
      },
      keyCode: function (e6) {
        return e6.type === "keydown" || e6.type === "keyup" ? e6.keyCode : 0;
      },
      which: function (e6) {
        return e6.type === "keypress"
          ? Mn(e6)
          : e6.type === "keydown" || e6.type === "keyup"
            ? e6.keyCode
            : 0;
      },
    }),
  ),
  nr = In(
    B({}, Bn, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
  ),
  rr = In(B({}, jn, { submitter: 0 })),
  or = In(
    B({}, Hn, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: er,
    }),
  ),
  ar = In(B({}, jn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 })),
  lr = In(
    B({}, Bn, {
      deltaX: function (e6) {
        return "deltaX" in e6 ? e6.deltaX : "wheelDeltaX" in e6 ? -e6.wheelDeltaX : 0;
      },
      deltaY: function (e6) {
        return "deltaY" in e6
          ? e6.deltaY
          : "wheelDeltaY" in e6
            ? -e6.wheelDeltaY
            : "wheelDelta" in e6
              ? -e6.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
  ),
  ir = In(B({}, jn, { newState: 0, oldState: 0, source: 0 })),
  sr = [9, 13, 27, 32],
  ur = Cn && "CompositionEvent" in window,
  cr = null;
Cn && "documentMode" in document && (cr = document.documentMode);
var dr = Cn && "TextEvent" in window && !cr,
  fr = Cn && (!ur || (cr && 8 < cr && 11 >= cr)),
  pr = " ",
  hr = !1;
function mr(e6, t2) {
  switch (e6) {
    case "keyup":
      return sr.indexOf(t2.keyCode) !== -1;
    case "keydown":
      return t2.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function gr(e6) {
  return typeof (e6 = e6.detail) == "object" && "data" in e6 ? e6.data : null;
}
var vr = !1,
  yr = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
function br(e6) {
  var t2 = e6 && e6.nodeName && e6.nodeName.toLowerCase();
  return t2 === "input" ? !!yr[e6.type] : t2 === "textarea";
}
function wr(e6, t2, n2, r2) {
  bn ? (wn ? wn.push(r2) : (wn = [r2])) : (bn = r2),
    0 < (t2 = Df(t2, "onChange")).length &&
      ((n2 = new Dn("onChange", "change", null, n2, r2)), e6.push({ event: n2, listeners: t2 }));
}
var Er = null,
  Sr = null;
function xr(e6) {
  Mf(e6, 0);
}
function kr(e6) {
  if (Jt(Rt(e6))) return e6;
}
function Cr(e6, t2) {
  if (e6 === "change") return t2;
}
var _r = !1;
if (Cn) {
  var Pr;
  if (Cn) {
    var Or = "oninput" in document;
    if (!Or) {
      var Tr = document.createElement("div");
      Tr.setAttribute("oninput", "return;"), (Or = typeof Tr.oninput == "function");
    }
    Pr = Or;
  } else Pr = !1;
  _r = Pr && (!document.documentMode || 9 < document.documentMode);
}
function Nr() {
  Er && (Er.detachEvent("onpropertychange", $r), (Sr = Er = null));
}
function $r(e6) {
  if (e6.propertyName === "value" && kr(Sr)) {
    var t2 = [];
    wr(t2, Sr, e6, yn(e6)), xn(xr, t2);
  }
}
function Mr(e6, t2, n2) {
  e6 === "focusin"
    ? (Nr(), (Sr = n2), (Er = t2).attachEvent("onpropertychange", $r))
    : e6 === "focusout" && Nr();
}
function Rr(e6) {
  if (e6 === "selectionchange" || e6 === "keyup" || e6 === "keydown") return kr(Sr);
}
function Lr(e6, t2) {
  if (e6 === "click") return kr(t2);
}
function Ir(e6, t2) {
  if (e6 === "input" || e6 === "change") return kr(t2);
}
var Ar =
  typeof Object.is == "function"
    ? Object.is
    : function (e6, t2) {
        return (e6 === t2 && (e6 !== 0 || 1 / e6 == 1 / t2)) || (e6 != e6 && t2 != t2);
      };
function Fr(e6, t2) {
  if (Ar(e6, t2)) return !0;
  if (typeof e6 != "object" || e6 === null || typeof t2 != "object" || t2 === null) return !1;
  var n2 = Object.keys(e6),
    r2 = Object.keys(t2);
  if (n2.length !== r2.length) return !1;
  for (r2 = 0; r2 < n2.length; r2++) {
    var o2 = n2[r2];
    if (!Ae.call(t2, o2) || !Ar(e6[o2], t2[o2])) return !1;
  }
  return !0;
}
function zr(e6) {
  if ((e6 = e6 || (typeof document < "u" ? document : void 0)) === void 0) return null;
  try {
    return e6.activeElement || e6.body;
  } catch {
    return e6.body;
  }
}
function jr(e6) {
  for (; e6 && e6.firstChild; ) e6 = e6.firstChild;
  return e6;
}
function Dr(e6, t2) {
  var n2,
    r2 = jr(e6);
  for (e6 = 0; r2; ) {
    if (r2.nodeType === 3) {
      if (((n2 = e6 + r2.textContent.length), e6 <= t2 && n2 >= t2))
        return { node: r2, offset: t2 - e6 };
      e6 = n2;
    }
    e: {
      for (; r2; ) {
        if (r2.nextSibling) {
          r2 = r2.nextSibling;
          break e;
        }
        r2 = r2.parentNode;
      }
      r2 = void 0;
    }
    r2 = jr(r2);
  }
}
function Hr(e6, t2) {
  return (
    !(!e6 || !t2) &&
    (e6 === t2 ||
      ((!e6 || e6.nodeType !== 3) &&
        (t2 && t2.nodeType === 3
          ? Hr(e6, t2.parentNode)
          : "contains" in e6
            ? e6.contains(t2)
            : !!e6.compareDocumentPosition && !!(16 & e6.compareDocumentPosition(t2)))))
  );
}
function Vr(e6) {
  for (
    var t2 = zr(
      (e6 =
        e6 != null && e6.ownerDocument != null && e6.ownerDocument.defaultView != null
          ? e6.ownerDocument.defaultView
          : window).document,
    );
    t2 instanceof e6.HTMLIFrameElement;

  ) {
    try {
      var n2 = typeof t2.contentWindow.location.href == "string";
    } catch {
      n2 = !1;
    }
    if (!n2) break;
    t2 = zr((e6 = t2.contentWindow).document);
  }
  return t2;
}
function Br(e6) {
  var t2 = e6 && e6.nodeName && e6.nodeName.toLowerCase();
  return (
    t2 &&
    ((t2 === "input" &&
      (e6.type === "text" ||
        e6.type === "search" ||
        e6.type === "tel" ||
        e6.type === "url" ||
        e6.type === "password")) ||
      t2 === "textarea" ||
      e6.contentEditable === "true")
  );
}
var Ur = Cn && "documentMode" in document && 11 >= document.documentMode,
  Wr = null,
  qr = null,
  Xr = null,
  Kr = !1;
function Gr(e6, t2, n2) {
  var r2 = n2.window === n2 ? n2.document : n2.nodeType === 9 ? n2 : n2.ownerDocument;
  Kr ||
    Wr == null ||
    Wr !== zr(r2) ||
    ("selectionStart" in (r2 = Wr) && Br(r2)
      ? (r2 = { start: r2.selectionStart, end: r2.selectionEnd })
      : (r2 = {
          anchorNode: (r2 = (
            (r2.ownerDocument && r2.ownerDocument.defaultView) ||
            window
          ).getSelection()).anchorNode,
          anchorOffset: r2.anchorOffset,
          focusNode: r2.focusNode,
          focusOffset: r2.focusOffset,
        }),
    (Xr && Fr(Xr, r2)) ||
      ((Xr = r2),
      0 < (r2 = Df(qr, "onSelect")).length &&
        ((t2 = new Dn("onSelect", "select", null, t2, n2)),
        e6.push({ event: t2, listeners: r2 }),
        (t2.target = Wr))));
}
function Yr(e6, t2) {
  var n2 = {};
  return (
    (n2[e6.toLowerCase()] = t2.toLowerCase()),
    (n2["Webkit" + e6] = "webkit" + t2),
    (n2["Moz" + e6] = "moz" + t2),
    n2
  );
}
var Qr = {
    animationend: Yr("Animation", "AnimationEnd"),
    animationiteration: Yr("Animation", "AnimationIteration"),
    animationstart: Yr("Animation", "AnimationStart"),
    transitionrun: Yr("Transition", "TransitionRun"),
    transitionstart: Yr("Transition", "TransitionStart"),
    transitioncancel: Yr("Transition", "TransitionCancel"),
    transitionend: Yr("Transition", "TransitionEnd"),
  },
  Jr = {},
  Zr = {};
function eo(e6) {
  if (Jr[e6]) return Jr[e6];
  if (!Qr[e6]) return e6;
  var t2,
    n2 = Qr[e6];
  for (t2 in n2) if (n2.hasOwnProperty(t2) && t2 in Zr) return (Jr[e6] = n2[t2]);
  return e6;
}
Cn &&
  ((Zr = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete Qr.animationend.animation,
    delete Qr.animationiteration.animation,
    delete Qr.animationstart.animation),
  "TransitionEvent" in window || delete Qr.transitionend.transition);
var to = eo("animationend"),
  no = eo("animationiteration"),
  ro = eo("animationstart"),
  oo = eo("transitionrun"),
  ao = eo("transitionstart"),
  lo = eo("transitioncancel"),
  io = eo("transitionend"),
  so = new Map(),
  uo =
    "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " ",
    );
function co(e6, t2) {
  so.set(e6, t2), jt(t2, [e6]);
}
uo.push("scrollEnd");
var fo = 0;
function po(e6, t2) {
  return e6.name != null && e6.name !== "auto"
    ? e6.name
    : t2.autoName !== null
      ? t2.autoName
      : ((e6 = "_" + (e6 = md.identifierPrefix) + "t_" + (fo++).toString(32) + "_"),
        (t2.autoName = e6));
}
function ho(e6) {
  if (e6 == null || typeof e6 == "string") return e6;
  var t2 = null,
    n2 = xd;
  if (n2 !== null)
    for (var r2 = 0; r2 < n2.length; r2++) {
      var o2 = e6[n2[r2]];
      if (o2 != null) {
        if (o2 === "none") return "none";
        t2 = t2 == null ? o2 : t2 + " " + o2;
      }
    }
  return t2 ?? e6.default;
}
function mo(e6, t2) {
  return (
    (e6 = ho(e6)), (t2 = ho(t2)) == null ? (e6 === "auto" ? null : e6) : t2 === "auto" ? null : t2
  );
}
var go =
    typeof reportError == "function"
      ? reportError
      : function (e6) {
          if (typeof window == "object" && typeof window.ErrorEvent == "function") {
            var t2 = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof e6 == "object" && e6 !== null && typeof e6.message == "string"
                  ? String(e6.message)
                  : String(e6),
              error: e6,
            });
            if (!window.dispatchEvent(t2)) return;
          } else if (typeof process == "object" && typeof process.emit == "function")
            return void process.emit("uncaughtException", e6);
        },
  vo = [],
  yo = 0,
  bo = 0;
function wo() {
  for (var e6 = yo, t2 = (bo = yo = 0); t2 < e6; ) {
    var n2 = vo[t2];
    vo[t2++] = null;
    var r2 = vo[t2];
    vo[t2++] = null;
    var o2 = vo[t2];
    vo[t2++] = null;
    var a2 = vo[t2];
    if (((vo[t2++] = null), r2 !== null && o2 !== null)) {
      var l2 = r2.pending;
      l2 === null ? (o2.next = o2) : ((o2.next = l2.next), (l2.next = o2)), (r2.pending = o2);
    }
    a2 !== 0 && ko(n2, o2, a2);
  }
}
function Eo(e6, t2, n2, r2) {
  (vo[yo++] = e6),
    (vo[yo++] = t2),
    (vo[yo++] = n2),
    (vo[yo++] = r2),
    (bo |= r2),
    (e6.lanes |= r2),
    (e6 = e6.alternate) !== null && (e6.lanes |= r2);
}
function So(e6, t2, n2, r2) {
  return Eo(e6, t2, n2, r2), Co(e6);
}
function xo(e6, t2) {
  return Eo(e6, null, null, t2), Co(e6);
}
function ko(e6, t2, n2) {
  e6.lanes |= n2;
  var r2 = e6.alternate;
  r2 !== null && (r2.lanes |= n2);
  for (var o2 = !1, a2 = e6.return; a2 !== null; )
    (a2.childLanes |= n2),
      (r2 = a2.alternate) !== null && (r2.childLanes |= n2),
      a2.tag === 22 && ((e6 = a2.stateNode) === null || 1 & e6._visibility || (o2 = !0)),
      (e6 = a2),
      (a2 = a2.return);
  return e6.tag === 3
    ? ((a2 = e6.stateNode),
      o2 &&
        t2 !== null &&
        ((o2 = 31 - Ze(n2)),
        (r2 = (e6 = a2.hiddenUpdates)[o2]) === null ? (e6[o2] = [t2]) : r2.push(t2),
        (t2.lane = 536870912 | n2)),
      a2)
    : null;
}
function Co(e6) {
  if (50 < kd) throw ((kd = 0), (Cd = null), Error(k(185)));
  for (var t2 = e6.return; t2 !== null; ) t2 = (e6 = t2).return;
  return e6.tag === 3 ? e6.stateNode : null;
}
var _o = {};
function Po(e6, t2, n2, r2) {
  (this.tag = e6),
    (this.key = n2),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.refCleanup = this.ref = null),
    (this.pendingProps = t2),
    (this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
    (this.mode = r2),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null);
}
function Oo(e6, t2, n2, r2) {
  return new Po(e6, t2, n2, r2);
}
function To(e6) {
  return !(!(e6 = e6.prototype) || !e6.isReactComponent);
}
function No(e6, t2) {
  var n2 = e6.alternate;
  return (
    n2 === null
      ? (((n2 = Oo(e6.tag, t2, e6.key, e6.mode)).elementType = e6.elementType),
        (n2.type = e6.type),
        (n2.stateNode = e6.stateNode),
        (n2.alternate = e6),
        (e6.alternate = n2))
      : ((n2.pendingProps = t2),
        (n2.type = e6.type),
        (n2.flags = 0),
        (n2.subtreeFlags = 0),
        (n2.deletions = null)),
    (n2.flags = 1206910976 & e6.flags),
    (n2.childLanes = e6.childLanes),
    (n2.lanes = e6.lanes),
    (n2.child = e6.child),
    (n2.memoizedProps = e6.memoizedProps),
    (n2.memoizedState = e6.memoizedState),
    (n2.updateQueue = e6.updateQueue),
    (t2 = e6.dependencies),
    (n2.dependencies = t2 === null ? null : { lanes: t2.lanes, firstContext: t2.firstContext }),
    (n2.sibling = e6.sibling),
    (n2.index = e6.index),
    (n2.ref = e6.ref),
    (n2.refCleanup = e6.refCleanup),
    n2
  );
}
function $o(e6, t2) {
  e6.flags &= 1206910978;
  var n2 = e6.alternate;
  return (
    n2 === null
      ? ((e6.childLanes = 0),
        (e6.lanes = t2),
        (e6.child = null),
        (e6.subtreeFlags = 0),
        (e6.memoizedProps = null),
        (e6.memoizedState = null),
        (e6.updateQueue = null),
        (e6.dependencies = null),
        (e6.stateNode = null))
      : ((e6.childLanes = n2.childLanes),
        (e6.lanes = n2.lanes),
        (e6.child = n2.child),
        (e6.subtreeFlags = 0),
        (e6.deletions = null),
        (e6.memoizedProps = n2.memoizedProps),
        (e6.memoizedState = n2.memoizedState),
        (e6.updateQueue = n2.updateQueue),
        (e6.type = n2.type),
        (t2 = n2.dependencies),
        (e6.dependencies =
          t2 === null ? null : { lanes: t2.lanes, firstContext: t2.firstContext })),
    e6
  );
}
function Mo(e6, t2, n2, r2, o2, a2) {
  var l2 = 0;
  if (typeof (r2 = e6) == "function") To(r2) && (l2 = 1);
  else if (typeof r2 == "string")
    l2 = (function (e7, t3, n3) {
      if (n3 === 1 || t3.itemProp != null) return !1;
      switch (e7) {
        case "meta":
        case "title":
          return !0;
        case "style":
          if (typeof t3.precedence != "string" || typeof t3.href != "string" || t3.href === "")
            break;
          return !0;
        case "link":
          if (
            typeof t3.rel != "string" ||
            typeof t3.href != "string" ||
            t3.href === "" ||
            t3.onLoad ||
            t3.onError
          )
            break;
          return (
            t3.rel !== "stylesheet" ||
            ((e7 = t3.disabled), typeof t3.precedence == "string" && e7 == null)
          );
        case "script":
          if (
            t3.async &&
            typeof t3.async != "function" &&
            typeof t3.async != "symbol" &&
            !t3.onLoad &&
            !t3.onError &&
            t3.src &&
            typeof t3.src == "string"
          )
            return !0;
      }
      return !1;
    })(e6, n2, xe.current)
      ? 26
      : e6 === "html" || e6 === "head" || e6 === "body"
        ? 27
        : 5;
  else
    e: switch (r2) {
      case re:
        return ((e6 = Oo(31, n2, t2, o2)).elementType = re), (e6.lanes = a2), e6;
      case X:
        return Ro(n2.children, o2, a2, t2);
      case K:
        (l2 = 8), (o2 |= 24);
        break;
      case G:
        return ((e6 = Oo(12, n2, t2, 2 | o2)).elementType = G), (e6.lanes = a2), e6;
      case Z:
        return ((e6 = Oo(13, n2, t2, o2)).elementType = Z), (e6.lanes = a2), e6;
      case ee:
        return ((e6 = Oo(19, n2, t2, o2)).elementType = ee), (e6.lanes = a2), e6;
      case oe:
      case le:
        return (
          ((e6 = Oo(30, n2, t2, (e6 = 32 | o2))).elementType = le),
          (e6.lanes = a2),
          (e6.stateNode = { autoName: null, paired: null, clones: null, ref: null }),
          e6
        );
      default:
        if (typeof r2 == "object" && r2 !== null)
          switch (r2.$$typeof) {
            case Q:
              l2 = 10;
              break e;
            case Y:
              l2 = 9;
              break e;
            case J:
              l2 = 11;
              break e;
            case te:
              l2 = 14;
              break e;
            case ne:
              (l2 = 16), (r2 = null);
              break e;
          }
        (l2 = 29), (n2 = Error(k(130, e6 === null ? "null" : typeof e6, ""))), (r2 = null);
    }
  return ((t2 = Oo(l2, n2, t2, o2)).elementType = e6), (t2.type = r2), (t2.lanes = a2), t2;
}
function Ro(e6, t2, n2, r2) {
  return ((e6 = Oo(7, e6, r2, t2)).lanes = n2), e6;
}
function Lo(e6, t2, n2) {
  return ((e6 = Oo(6, e6, null, t2)).lanes = n2), e6;
}
function Io(e6) {
  var t2 = Oo(18, null, null, 0);
  return (t2.stateNode = e6), t2;
}
function Ao(e6, t2, n2) {
  return (
    ((t2 = Oo(4, e6.children !== null ? e6.children : [], e6.key, t2)).lanes = n2),
    (t2.stateNode = {
      containerInfo: e6.containerInfo,
      pendingChildren: null,
      implementation: e6.implementation,
    }),
    t2
  );
}
var Fo = new WeakMap();
function zo(e6, t2) {
  if (typeof e6 == "object" && e6 !== null) {
    var n2 = Fo.get(e6);
    return n2 !== void 0
      ? n2
      : ((t2 = { value: e6, source: t2, stack: Ie(t2) }), Fo.set(e6, t2), t2);
  }
  return { value: e6, source: t2, stack: Ie(t2) };
}
var jo = [],
  Do = 0,
  Ho = null,
  Vo = 0,
  Bo = [],
  Uo = 0,
  Wo = null,
  qo = 1,
  Xo = "";
function Ko(e6, t2) {
  (jo[Do++] = Vo), (jo[Do++] = Ho), (Ho = e6), (Vo = t2);
}
function Go(e6, t2, n2) {
  (Bo[Uo++] = qo), (Bo[Uo++] = Xo), (Bo[Uo++] = Wo), (Wo = e6);
  var r2 = qo;
  e6 = Xo;
  var o2 = 32 - Ze(r2) - 1;
  (r2 &= ~(1 << o2)), (n2 += 1);
  var a2 = 32 - Ze(t2) + o2;
  if (30 < a2) {
    var l2 = o2 - (o2 % 5);
    (a2 = (r2 & ((1 << l2) - 1)).toString(32)),
      (r2 >>= l2),
      (o2 -= l2),
      (qo = (1 << (32 - Ze(t2) + o2)) | (n2 << o2) | r2),
      (Xo = a2 + e6);
  } else (qo = (1 << a2) | (n2 << o2) | r2), (Xo = e6);
}
function Yo(e6) {
  e6.return !== null && (Ko(e6, 1), Go(e6, 1, 0));
}
function Qo(e6) {
  for (; e6 === Ho; ) (Ho = jo[--Do]), (jo[Do] = null), (Vo = jo[--Do]), (jo[Do] = null);
  for (; e6 === Wo; )
    (Wo = Bo[--Uo]),
      (Bo[Uo] = null),
      (Xo = Bo[--Uo]),
      (Bo[Uo] = null),
      (qo = Bo[--Uo]),
      (Bo[Uo] = null);
}
function Jo(e6, t2) {
  (Bo[Uo++] = qo), (Bo[Uo++] = Xo), (Bo[Uo++] = Wo), (qo = t2.id), (Xo = t2.overflow), (Wo = e6);
}
var Zo = null,
  ea = null,
  ta = !1,
  na = null,
  ra = !1,
  oa = Error(k(519));
function aa(e6) {
  throw (
    (da(
      zo(
        Error(
          k(
            418,
            1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
            "",
          ),
        ),
        e6,
      ),
    ),
    oa)
  );
}
function la(e6) {
  var t2 = e6.stateNode,
    n2 = e6.type,
    r2 = e6.memoizedProps;
  switch (((t2[Et] = e6), (t2[St] = r2), n2)) {
    case "dialog":
      Rf("cancel", t2), Rf("close", t2);
      break;
    case "iframe":
    case "object":
    case "embed":
      Rf("load", t2);
      break;
    case "video":
    case "audio":
      for (n2 = 0; n2 < Nf.length; n2++) Rf(Nf[n2], t2);
      break;
    case "source":
      Rf("error", t2);
      break;
    case "img":
    case "image":
    case "link":
      Rf("error", t2), Rf("load", t2);
      break;
    case "details":
      Rf("toggle", t2);
      break;
    case "input":
      Rf("invalid", t2),
        nn(t2, r2.value, r2.defaultValue, r2.checked, r2.defaultChecked, r2.type, r2.name, !0);
      break;
    case "select":
      Rf("invalid", t2);
      break;
    case "textarea":
      Rf("invalid", t2), ln(t2, r2.value, r2.defaultValue, r2.children);
  }
  (typeof (n2 = r2.children) != "string" && typeof n2 != "number" && typeof n2 != "bigint") ||
  t2.textContent === "" + n2 ||
  r2.suppressHydrationWarning === !0 ||
  qf(t2.textContent, n2)
    ? (r2.popover != null && (Rf("beforetoggle", t2), Rf("toggle", t2)),
      r2.onScroll != null && Rf("scroll", t2),
      r2.onScrollEnd != null && Rf("scrollend", t2),
      r2.onClick != null && (t2.onclick = gn),
      (t2 = !0))
    : (t2 = !1),
    t2 || aa(e6, !0);
}
function ia(e6) {
  for (Zo = e6.return; Zo; )
    switch (Zo.tag) {
      case 5:
      case 31:
      case 13:
        return void (ra = !1);
      case 27:
      case 3:
        return void (ra = !0);
      default:
        Zo = Zo.return;
    }
}
function sa(e6) {
  if (e6 !== Zo) return !1;
  if (!ta) return ia(e6), (ta = !0), !1;
  var t2,
    n2 = e6.tag;
  if (
    ((t2 = n2 !== 3 && n2 !== 27) &&
      ((t2 = n2 === 5) &&
        (t2 = !((t2 = e6.type) !== "form" && t2 !== "button") || op(e6.type, e6.memoizedProps)),
      (t2 = !t2)),
    t2 && ea && aa(e6),
    ia(e6),
    n2 === 13)
  ) {
    if (!(e6 = (e6 = e6.memoizedState) !== null ? e6.dehydrated : null)) throw Error(k(317));
    ea = Gp(e6);
  } else if (n2 === 31) {
    if (!(e6 = (e6 = e6.memoizedState) !== null ? e6.dehydrated : null)) throw Error(k(317));
    ea = Gp(e6);
  } else
    n2 === 27
      ? ((n2 = ea), fp(e6.type) ? ((e6 = Kp), (Kp = null), (ea = e6)) : (ea = n2))
      : (ea = Zo ? Xp(e6.stateNode.nextSibling) : null);
  return !0;
}
function ua() {
  (ea = Zo = null), (ta = !1);
}
function ca() {
  var e6 = na;
  return e6 !== null && (id === null ? (id = e6) : id.push.apply(id, e6), (na = null)), e6;
}
function da(e6) {
  na === null ? (na = [e6]) : na.push(e6);
}
var fa = ye(null),
  pa = null,
  ha = null;
function ma(e6, t2, n2) {
  we(fa, t2._currentValue), (t2._currentValue = n2);
}
function ga(e6) {
  (e6._currentValue = fa.current), be(fa);
}
function va(e6, t2, n2) {
  for (; e6 !== null; ) {
    var r2 = e6.alternate;
    if (
      ((e6.childLanes & t2) !== t2
        ? ((e6.childLanes |= t2), r2 !== null && (r2.childLanes |= t2))
        : r2 !== null && (r2.childLanes & t2) !== t2 && (r2.childLanes |= t2),
      e6 === n2)
    )
      break;
    e6 = e6.return;
  }
}
function ya(e6, t2, n2, r2) {
  var o2 = e6.child;
  for (o2 !== null && (o2.return = e6); o2 !== null; ) {
    var a2 = o2.dependencies;
    if (a2 !== null) {
      var l2 = o2.child;
      a2 = a2.firstContext;
      e: for (; a2 !== null; ) {
        var i2 = a2;
        a2 = o2;
        for (var s2 = 0; s2 < t2.length; s2++)
          if (i2.context === t2[s2]) {
            (a2.lanes |= n2),
              (i2 = a2.alternate) !== null && (i2.lanes |= n2),
              va(a2.return, n2, e6),
              r2 || (l2 = null);
            break e;
          }
        a2 = i2.next;
      }
    } else if (o2.tag === 18) {
      if ((l2 = o2.return) === null) throw Error(k(341));
      (l2.lanes |= n2),
        (a2 = l2.alternate) !== null && (a2.lanes |= n2),
        va(l2, n2, e6),
        (l2 = null);
    } else
      o2.tag === 13 && o2.memoizedState !== null && o2.memoizedState.dehydrated === null
        ? ((o2.lanes |= n2),
          (l2 = o2.alternate) !== null && (l2.lanes |= n2),
          va(o2.return, n2, e6),
          (l2 = (l2 = o2.child) !== null ? l2.sibling : null))
        : (l2 = o2.child);
    if (l2 !== null) l2.return = o2;
    else
      for (l2 = o2; l2 !== null; ) {
        if (l2 === e6) {
          l2 = null;
          break;
        }
        if ((o2 = l2.sibling) !== null) {
          (o2.return = l2.return), (l2 = o2);
          break;
        }
        l2 = l2.return;
      }
    o2 = l2;
  }
}
function ba(e6, t2, n2, r2) {
  e6 = null;
  for (var o2 = t2, a2 = !1; o2 !== null; ) {
    if (!a2) {
      if (524288 & o2.flags) a2 = !0;
      else if (262144 & o2.flags) break;
    }
    if (o2.tag === 10) {
      var l2 = o2.alternate;
      if (l2 === null) throw Error(k(387));
      if ((l2 = l2.memoizedProps) !== null) {
        var i2 = o2.type;
        Ar(o2.pendingProps.value, l2.value) || (e6 !== null ? e6.push(i2) : (e6 = [i2]));
      }
    } else if (o2 === _e.current) {
      if ((l2 = o2.alternate) === null) throw Error(k(387));
      l2.memoizedState.memoizedState !== o2.memoizedState.memoizedState &&
        (e6 !== null ? e6.push(Nh) : (e6 = [Nh]));
    }
    o2 = o2.return;
  }
  return e6 !== null && ya(t2, e6, n2, r2), (t2.flags |= 262144), e6 !== null;
}
function wa(e6) {
  for (e6 = e6.firstContext; e6 !== null; ) {
    if (!Ar(e6.context._currentValue, e6.memoizedValue)) return !0;
    e6 = e6.next;
  }
  return !1;
}
function Ea(e6) {
  (pa = e6), (ha = null), (e6 = e6.dependencies) !== null && (e6.firstContext = null);
}
function Sa(e6) {
  return ka(pa, e6);
}
function xa(e6, t2) {
  return pa === null && Ea(e6), ka(e6, t2);
}
function ka(e6, t2) {
  var n2 = t2._currentValue;
  if (((t2 = { context: t2, memoizedValue: n2, next: null }), ha === null)) {
    if (e6 === null) throw Error(k(308));
    (ha = t2), (e6.dependencies = { lanes: 0, firstContext: t2 }), (e6.flags |= 524288);
  } else ha = ha.next = t2;
  return n2;
}
var Ca =
    typeof AbortController < "u"
      ? AbortController
      : function () {
          var e6 = [],
            t2 = (this.signal = {
              aborted: !1,
              addEventListener: function (t3, n2) {
                e6.push(n2);
              },
            });
          this.abort = function () {
            (t2.aborted = !0),
              e6.forEach(function (e7) {
                return e7();
              });
          };
        },
  _a = E.unstable_scheduleCallback,
  Pa = E.unstable_NormalPriority,
  Oa = {
    $$typeof: Q,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0,
  };
function Ta() {
  return { controller: new Ca(), data: new Map(), refCount: 0 };
}
function Na(e6) {
  e6.refCount--,
    e6.refCount === 0 &&
      _a(Pa, function () {
        e6.controller.abort();
      });
}
function $a(e6, t2) {
  if (4194048 & e6.pendingLanes) {
    var n2 = e6.transitionTypes;
    for (n2 === null && (n2 = e6.transitionTypes = []), e6 = 0; e6 < t2.length; e6++) {
      var r2 = t2[e6];
      n2.indexOf(r2) === -1 && n2.push(r2);
    }
  }
}
var Ma = null,
  Ra = null,
  La = 0,
  Ia = 0,
  Aa = null;
function Fa() {
  if (--La === 0 && ((Ma = null), Ra !== null)) {
    Aa !== null && (Aa.status = "fulfilled");
    var e6 = Ra;
    (Ra = null), (Ia = 0), (Aa = null);
    for (var t2 = 0; t2 < e6.length; t2++) (0, e6[t2])();
  }
}
var za = pe.S;
pe.S = function (e6, t2) {
  if (
    ((cd = He()),
    typeof t2 == "object" &&
      t2 !== null &&
      typeof t2.then == "function" &&
      (function (e7, t3) {
        if (Ra === null) {
          var n3 = (Ra = []);
          (La = 0),
            (Ia = _f()),
            (Aa = {
              status: "pending",
              value: void 0,
              then: function (e8) {
                n3.push(e8);
              },
            });
        }
        La++, t3.then(Fa, Fa);
      })(0, t2),
    Ma !== null)
  )
    for (var n2 = pf; n2 !== null; ) $a(n2, Ma), (n2 = n2.next);
  if ((n2 = e6.types) !== null) {
    for (var r2 = pf; r2 !== null; ) $a(r2, n2), (r2 = r2.next);
    if (Ia !== 0) {
      (r2 = Ma) === null && (r2 = Ma = []);
      for (var o2 = 0; o2 < n2.length; o2++) {
        var a2 = n2[o2];
        r2.indexOf(a2) === -1 && r2.push(a2);
      }
    }
  }
  za !== null && za(e6, t2);
};
var ja = ye(null);
function Da() {
  var e6 = ja.current;
  return e6 !== null ? e6 : Wc.pooledCache;
}
function Ha(e6, t2) {
  we(ja, t2 === null ? ja.current : t2.pool);
}
function Va() {
  var e6 = Da();
  return e6 === null ? null : { parent: Oa._currentValue, pool: e6 };
}
var Ba = Error(k(460)),
  Ua = Error(k(474)),
  Wa = Error(k(542)),
  qa = { then: function () {} };
function Xa(e6) {
  return (e6 = e6.status) === "fulfilled" || e6 === "rejected";
}
function Ka(e6, t2, n2) {
  switch (
    ((n2 = e6[n2]) === void 0 ? e6.push(t2) : n2 !== t2 && (t2.then(gn, gn), (t2 = n2)), t2.status)
  ) {
    case "fulfilled":
      return t2.value;
    case "rejected":
      throw (Ja((e6 = t2.reason)), e6 === void 0 && !("reason" in t2) ? Error(k(600)) : e6);
    default:
      if (typeof t2.status == "string") t2.then(gn, gn);
      else {
        if ((e6 = Wc) !== null && 100 < e6.shellSuspendCounter) throw Error(k(482));
        ((e6 = t2).status = "pending"),
          e6.then(
            function (e7) {
              if (t2.status === "pending") {
                var n3 = t2;
                (n3.status = "fulfilled"), (n3.value = e7);
              }
            },
            function (e7) {
              if (t2.status === "pending") {
                var n3 = t2;
                (n3.status = "rejected"), (n3.reason = e7);
              }
            },
          );
      }
      switch (t2.status) {
        case "fulfilled":
          return t2.value;
        case "rejected":
          throw (Ja((e6 = t2.reason)), e6);
      }
      throw ((Ya = t2), Ba);
  }
}
function Ga(e6) {
  try {
    return (0, e6._init)(e6._payload);
  } catch (t2) {
    throw t2 !== null && typeof t2 == "object" && typeof t2.then == "function"
      ? ((Ya = t2), Ba)
      : t2;
  }
}
var Ya = null;
function Qa() {
  if (Ya === null) throw Error(k(459));
  var e6 = Ya;
  return (Ya = null), e6;
}
function Ja(e6) {
  if (e6 === Ba || e6 === Wa) throw Error(k(483));
}
var Za = null,
  el = 0;
function tl(e6) {
  var t2 = el;
  return (el += 1), Za === null && (Za = []), Ka(Za, e6, t2);
}
function nl(e6, t2) {
  (t2 = t2.props.ref), (e6.ref = t2 !== void 0 ? t2 : null);
}
function rl(e6, t2) {
  throw t2.$$typeof === U
    ? Error(k(525))
    : ((e6 = Object.prototype.toString.call(t2)),
      Error(
        k(
          31,
          e6 === "[object Object]" ? "object with keys {" + Object.keys(t2).join(", ") + "}" : e6,
        ),
      ));
}
function ol(e6) {
  function t2(t3, n3) {
    if (e6) {
      var r3 = t3.deletions;
      r3 === null ? ((t3.deletions = [n3]), (t3.flags |= 16)) : r3.push(n3);
    }
  }
  function n2(n3, r3) {
    if (!e6) return null;
    for (; r3 !== null; ) t2(n3, r3), (r3 = r3.sibling);
    return null;
  }
  function r2(e7) {
    for (var t3 = new Map(); e7 !== null; )
      e7.key === null ? t3.set(e7.index, e7) : t3.set(e7.key, e7), (e7 = e7.sibling);
    return t3;
  }
  function o2(e7, t3) {
    return ((e7 = No(e7, t3)).index = 0), (e7.sibling = null), e7;
  }
  function a2(t3, n3, r3) {
    return (
      (t3.index = r3),
      e6
        ? (r3 = t3.alternate) !== null
          ? (r3 = r3.index) < n3
            ? ((t3.flags |= 2), n3)
            : r3
          : ((t3.flags |= 134217730), n3)
        : ((t3.flags |= 1048576), n3)
    );
  }
  function l2(t3) {
    return e6 && t3.alternate === null && (t3.flags |= 134217730), t3;
  }
  function i2(e7, t3, n3, r3) {
    return t3 === null || t3.tag !== 6
      ? (((t3 = Lo(n3, e7.mode, r3)).return = e7), t3)
      : (((t3 = o2(t3, n3)).return = e7), t3);
  }
  function s2(e7, t3, n3, r3) {
    var a3 = n3.type;
    return a3 === X
      ? (nl((e7 = c2(e7, t3, n3.props.children, r3, n3.key)), n3), e7)
      : t3 !== null &&
          (t3.elementType === a3 ||
            (typeof a3 == "object" && a3 !== null && a3.$$typeof === ne && Ga(a3) === t3.type))
        ? (nl((t3 = o2(t3, n3.props)), n3), (t3.return = e7), t3)
        : (nl((t3 = Mo(n3.type, n3.key, n3.props, null, e7.mode, r3)), n3), (t3.return = e7), t3);
  }
  function u2(e7, t3, n3, r3) {
    return t3 === null ||
      t3.tag !== 4 ||
      t3.stateNode.containerInfo !== n3.containerInfo ||
      t3.stateNode.implementation !== n3.implementation
      ? (((t3 = Ao(n3, e7.mode, r3)).return = e7), t3)
      : (((t3 = o2(t3, n3.children || [])).return = e7), t3);
  }
  function c2(e7, t3, n3, r3, a3) {
    return t3 === null || t3.tag !== 7
      ? (((t3 = Ro(n3, e7.mode, r3, a3)).return = e7), t3)
      : (((t3 = o2(t3, n3)).return = e7), t3);
  }
  function d2(e7, t3, n3) {
    if ((typeof t3 == "string" && t3 !== "") || typeof t3 == "number" || typeof t3 == "bigint")
      return ((t3 = Lo("" + t3, e7.mode, n3)).return = e7), t3;
    if (typeof t3 == "object" && t3 !== null) {
      switch (t3.$$typeof) {
        case W:
          return (
            nl((n3 = Mo(t3.type, t3.key, t3.props, null, e7.mode, n3)), t3), (n3.return = e7), n3
          );
        case q:
          return ((t3 = Ao(t3, e7.mode, n3)).return = e7), t3;
        case ne:
          return d2(e7, (t3 = Ga(t3)), n3);
      }
      if (fe(t3) || ue(t3)) return ((t3 = Ro(t3, e7.mode, n3, null)).return = e7), t3;
      if (typeof t3.then == "function") return d2(e7, tl(t3), n3);
      if (t3.$$typeof === Q) return d2(e7, xa(e7, t3), n3);
      rl(e7, t3);
    }
    return null;
  }
  function f2(e7, t3, n3, r3) {
    var o3 = t3 !== null ? t3.key : null;
    if ((typeof n3 == "string" && n3 !== "") || typeof n3 == "number" || typeof n3 == "bigint")
      return o3 !== null ? null : i2(e7, t3, "" + n3, r3);
    if (typeof n3 == "object" && n3 !== null) {
      switch (n3.$$typeof) {
        case W:
          return n3.key === o3 ? s2(e7, t3, n3, r3) : null;
        case q:
          return n3.key === o3 ? u2(e7, t3, n3, r3) : null;
        case ne:
          return f2(e7, t3, (n3 = Ga(n3)), r3);
      }
      if (fe(n3) || ue(n3)) return o3 !== null ? null : c2(e7, t3, n3, r3, null);
      if (typeof n3.then == "function") return f2(e7, t3, tl(n3), r3);
      if (n3.$$typeof === Q) return f2(e7, t3, xa(e7, n3), r3);
      rl(e7, n3);
    }
    return null;
  }
  function p2(e7, t3, n3, r3, o3) {
    if ((typeof r3 == "string" && r3 !== "") || typeof r3 == "number" || typeof r3 == "bigint")
      return i2(t3, (e7 = e7.get(n3) || null), "" + r3, o3);
    if (typeof r3 == "object" && r3 !== null) {
      switch (r3.$$typeof) {
        case W:
          return s2(t3, (e7 = e7.get(r3.key === null ? n3 : r3.key) || null), r3, o3);
        case q:
          return u2(t3, (e7 = e7.get(r3.key === null ? n3 : r3.key) || null), r3, o3);
        case ne:
          return p2(e7, t3, n3, (r3 = Ga(r3)), o3);
      }
      if (fe(r3) || ue(r3)) return c2(t3, (e7 = e7.get(n3) || null), r3, o3, null);
      if (typeof r3.then == "function") return p2(e7, t3, n3, tl(r3), o3);
      if (r3.$$typeof === Q) return p2(e7, t3, n3, xa(t3, r3), o3);
      rl(t3, r3);
    }
    return null;
  }
  function h2(i3, s3, u3, c3) {
    if (
      (typeof u3 == "object" &&
        u3 !== null &&
        u3.type === X &&
        u3.key === null &&
        u3.props.ref === void 0 &&
        (u3 = u3.props.children),
      typeof u3 == "object" && u3 !== null)
    ) {
      switch (u3.$$typeof) {
        case W:
          e: {
            for (var m2 = u3.key; s3 !== null; ) {
              if (s3.key === m2) {
                if ((m2 = u3.type) === X) {
                  if (s3.tag === 7) {
                    n2(i3, s3.sibling),
                      nl((c3 = o2(s3, u3.props.children)), u3),
                      (c3.return = i3),
                      (i3 = c3);
                    break e;
                  }
                } else if (
                  s3.elementType === m2 ||
                  (typeof m2 == "object" && m2 !== null && m2.$$typeof === ne && Ga(m2) === s3.type)
                ) {
                  n2(i3, s3.sibling), nl((c3 = o2(s3, u3.props)), u3), (c3.return = i3), (i3 = c3);
                  break e;
                }
                n2(i3, s3);
                break;
              }
              t2(i3, s3), (s3 = s3.sibling);
            }
            u3.type === X
              ? (nl((c3 = Ro(u3.props.children, i3.mode, c3, u3.key)), u3),
                (c3.return = i3),
                (i3 = c3))
              : (nl((c3 = Mo(u3.type, u3.key, u3.props, null, i3.mode, c3)), u3),
                (c3.return = i3),
                (i3 = c3));
          }
          return l2(i3);
        case q:
          e: {
            for (m2 = u3.key; s3 !== null; ) {
              if (s3.key === m2) {
                if (
                  s3.tag === 4 &&
                  s3.stateNode.containerInfo === u3.containerInfo &&
                  s3.stateNode.implementation === u3.implementation
                ) {
                  n2(i3, s3.sibling), ((c3 = o2(s3, u3.children || [])).return = i3), (i3 = c3);
                  break e;
                }
                n2(i3, s3);
                break;
              }
              t2(i3, s3), (s3 = s3.sibling);
            }
            ((c3 = Ao(u3, i3.mode, c3)).return = i3), (i3 = c3);
          }
          return l2(i3);
        case ne:
          return h2(i3, s3, (u3 = Ga(u3)), c3);
      }
      if (fe(u3))
        return (function (o3, l3, i4, s4) {
          for (
            var u4 = null, c4 = null, h3 = l3, m3 = (l3 = 0), g2 = null;
            h3 !== null && m3 < i4.length;
            m3++
          ) {
            h3.index > m3 ? ((g2 = h3), (h3 = null)) : (g2 = h3.sibling);
            var v2 = f2(o3, h3, i4[m3], s4);
            if (v2 === null) {
              h3 === null && (h3 = g2);
              break;
            }
            e6 && h3 && v2.alternate === null && t2(o3, h3),
              (l3 = a2(v2, l3, m3)),
              c4 === null ? (u4 = v2) : (c4.sibling = v2),
              (c4 = v2),
              (h3 = g2);
          }
          if (m3 === i4.length) return n2(o3, h3), ta && Ko(o3, m3), u4;
          if (h3 === null) {
            for (; m3 < i4.length; m3++)
              (h3 = d2(o3, i4[m3], s4)) !== null &&
                ((l3 = a2(h3, l3, m3)), c4 === null ? (u4 = h3) : (c4.sibling = h3), (c4 = h3));
            return ta && Ko(o3, m3), u4;
          }
          for (h3 = r2(h3); m3 < i4.length; m3++)
            (g2 = p2(h3, o3, m3, i4[m3], s4)) !== null &&
              (e6 && (v2 = g2.alternate) !== null && h3.delete(v2.key === null ? m3 : v2.key),
              (l3 = a2(g2, l3, m3)),
              c4 === null ? (u4 = g2) : (c4.sibling = g2),
              (c4 = g2));
          return (
            e6 &&
              h3.forEach(function (e7) {
                return t2(o3, e7);
              }),
            ta && Ko(o3, m3),
            u4
          );
        })(i3, s3, u3, c3);
      if (ue(u3)) {
        if (typeof (m2 = ue(u3)) != "function") throw Error(k(150));
        return (function (o3, l3, i4, s4) {
          if (i4 == null) throw Error(k(151));
          for (
            var u4 = null, c4 = null, h3 = l3, m3 = (l3 = 0), g2 = null, v2 = i4.next();
            h3 !== null && !v2.done;
            m3++, v2 = i4.next()
          ) {
            h3.index > m3 ? ((g2 = h3), (h3 = null)) : (g2 = h3.sibling);
            var y2 = f2(o3, h3, v2.value, s4);
            if (y2 === null) {
              h3 === null && (h3 = g2);
              break;
            }
            e6 && h3 && y2.alternate === null && t2(o3, h3),
              (l3 = a2(y2, l3, m3)),
              c4 === null ? (u4 = y2) : (c4.sibling = y2),
              (c4 = y2),
              (h3 = g2);
          }
          if (v2.done) return n2(o3, h3), ta && Ko(o3, m3), u4;
          if (h3 === null) {
            for (; !v2.done; m3++, v2 = i4.next())
              (v2 = d2(o3, v2.value, s4)) !== null &&
                ((l3 = a2(v2, l3, m3)), c4 === null ? (u4 = v2) : (c4.sibling = v2), (c4 = v2));
            return ta && Ko(o3, m3), u4;
          }
          for (h3 = r2(h3); !v2.done; m3++, v2 = i4.next())
            (v2 = p2(h3, o3, m3, v2.value, s4)) !== null &&
              (e6 && (g2 = v2.alternate) !== null && h3.delete(g2.key === null ? m3 : g2.key),
              (l3 = a2(v2, l3, m3)),
              c4 === null ? (u4 = v2) : (c4.sibling = v2),
              (c4 = v2));
          return (
            e6 &&
              h3.forEach(function (e7) {
                return t2(o3, e7);
              }),
            ta && Ko(o3, m3),
            u4
          );
        })(i3, s3, (u3 = m2.call(u3)), c3);
      }
      if (typeof u3.then == "function") return h2(i3, s3, tl(u3), c3);
      if (u3.$$typeof === Q) return h2(i3, s3, xa(i3, u3), c3);
      rl(i3, u3);
    }
    return (typeof u3 == "string" && u3 !== "") || typeof u3 == "number" || typeof u3 == "bigint"
      ? ((u3 = "" + u3),
        s3 !== null && s3.tag === 6
          ? (n2(i3, s3.sibling), ((c3 = o2(s3, u3)).return = i3), (i3 = c3))
          : (n2(i3, s3), ((c3 = Lo(u3, i3.mode, c3)).return = i3), (i3 = c3)),
        l2(i3))
      : n2(i3, s3);
  }
  return function (e7, t3, n3, r3) {
    try {
      el = 0;
      var o3 = h2(e7, t3, n3, r3);
      return (Za = null), o3;
    } catch (l3) {
      if (l3 === Ba || l3 === Wa) throw l3;
      var a3 = Oo(29, l3, null, e7.mode);
      return (a3.lanes = r3), (a3.return = e7), a3;
    }
  };
}
var al = ol(!0),
  ll = ol(!1),
  il = !1;
function sl(e6) {
  e6.updateQueue = {
    baseState: e6.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, lanes: 0, hiddenCallbacks: null },
    callbacks: null,
  };
}
function ul(e6, t2) {
  (e6 = e6.updateQueue),
    t2.updateQueue === e6 &&
      (t2.updateQueue = {
        baseState: e6.baseState,
        firstBaseUpdate: e6.firstBaseUpdate,
        lastBaseUpdate: e6.lastBaseUpdate,
        shared: e6.shared,
        callbacks: null,
      });
}
function cl(e6) {
  return { lane: e6, tag: 0, payload: null, callback: null, next: null };
}
function dl(e6, t2, n2) {
  var r2 = e6.updateQueue;
  if (r2 === null) return null;
  if (((r2 = r2.shared), 2 & Uc)) {
    var o2 = r2.pending;
    return (
      o2 === null ? (t2.next = t2) : ((t2.next = o2.next), (o2.next = t2)),
      (r2.pending = t2),
      (t2 = Co(e6)),
      ko(e6, null, n2),
      t2
    );
  }
  return Eo(e6, r2, t2, n2), Co(e6);
}
function fl(e6, t2, n2) {
  if ((t2 = t2.updateQueue) !== null && ((t2 = t2.shared), 4194048 & n2)) {
    var r2 = t2.lanes;
    (n2 |= r2 &= e6.pendingLanes), (t2.lanes = n2), ht(e6, n2);
  }
}
function pl(e6, t2) {
  var n2 = e6.updateQueue,
    r2 = e6.alternate;
  if (r2 !== null && n2 === (r2 = r2.updateQueue)) {
    var o2 = null,
      a2 = null;
    if ((n2 = n2.firstBaseUpdate) !== null) {
      do {
        var l2 = { lane: n2.lane, tag: n2.tag, payload: n2.payload, callback: null, next: null };
        a2 === null ? (o2 = a2 = l2) : (a2 = a2.next = l2), (n2 = n2.next);
      } while (n2 !== null);
      a2 === null ? (o2 = a2 = t2) : (a2 = a2.next = t2);
    } else o2 = a2 = t2;
    return (
      (n2 = {
        baseState: r2.baseState,
        firstBaseUpdate: o2,
        lastBaseUpdate: a2,
        shared: r2.shared,
        callbacks: r2.callbacks,
      }),
      void (e6.updateQueue = n2)
    );
  }
  (e6 = n2.lastBaseUpdate) === null ? (n2.firstBaseUpdate = t2) : (e6.next = t2),
    (n2.lastBaseUpdate = t2);
}
var hl = !1;
function ml() {
  if (hl && Aa !== null) throw Aa;
}
function gl(e6, t2, n2, r2) {
  hl = !1;
  var o2 = e6.updateQueue;
  il = !1;
  var a2 = o2.firstBaseUpdate,
    l2 = o2.lastBaseUpdate,
    i2 = o2.shared.pending;
  if (i2 !== null) {
    o2.shared.pending = null;
    var s2 = i2,
      u2 = s2.next;
    (s2.next = null), l2 === null ? (a2 = u2) : (l2.next = u2), (l2 = s2);
    var c2 = e6.alternate;
    c2 !== null &&
      (i2 = (c2 = c2.updateQueue).lastBaseUpdate) !== l2 &&
      (i2 === null ? (c2.firstBaseUpdate = u2) : (i2.next = u2), (c2.lastBaseUpdate = s2));
  }
  if (a2 !== null) {
    var d2 = o2.baseState;
    for (l2 = 0, c2 = u2 = s2 = null, i2 = a2; ; ) {
      var f2 = -536870913 & i2.lane,
        p2 = f2 !== i2.lane;
      if (p2 ? (Xc & f2) === f2 : (r2 & f2) === f2) {
        f2 !== 0 && f2 === Ia && (hl = !0),
          c2 !== null &&
            (c2 = c2.next =
              { lane: 0, tag: i2.tag, payload: i2.payload, callback: null, next: null });
        e: {
          var h2 = e6,
            m2 = i2;
          f2 = t2;
          var g2 = n2;
          switch (m2.tag) {
            case 1:
              if (typeof (h2 = m2.payload) == "function") {
                d2 = h2.call(g2, d2, f2);
                break e;
              }
              d2 = h2;
              break e;
            case 3:
              h2.flags = (-65537 & h2.flags) | 128;
            case 0:
              if ((f2 = typeof (h2 = m2.payload) == "function" ? h2.call(g2, d2, f2) : h2) == null)
                break e;
              d2 = B({}, d2, f2);
              break e;
            case 2:
              il = !0;
          }
        }
        (f2 = i2.callback) !== null &&
          ((e6.flags |= 64),
          p2 && (e6.flags |= 8192),
          (p2 = o2.callbacks) === null ? (o2.callbacks = [f2]) : p2.push(f2));
      } else
        (p2 = { lane: f2, tag: i2.tag, payload: i2.payload, callback: i2.callback, next: null }),
          c2 === null ? ((u2 = c2 = p2), (s2 = d2)) : (c2 = c2.next = p2),
          (l2 |= f2);
      if ((i2 = i2.next) === null) {
        if ((i2 = o2.shared.pending) === null) break;
        (i2 = (p2 = i2).next),
          (p2.next = null),
          (o2.lastBaseUpdate = p2),
          (o2.shared.pending = null);
      }
    }
    c2 === null && (s2 = d2),
      (o2.baseState = s2),
      (o2.firstBaseUpdate = u2),
      (o2.lastBaseUpdate = c2),
      a2 === null && (o2.shared.lanes = 0),
      (td |= l2),
      (e6.lanes = l2),
      (e6.memoizedState = d2);
  }
}
function vl(e6, t2) {
  if (typeof e6 != "function") throw Error(k(191, e6));
  e6.call(t2);
}
function yl(e6, t2) {
  var n2 = e6.callbacks;
  if (n2 !== null) for (e6.callbacks = null, e6 = 0; e6 < n2.length; e6++) vl(n2[e6], t2);
}
var bl = ye(null),
  wl = ye(0);
function El(e6, t2) {
  we(wl, (e6 = Zc)), we(bl, t2), (Zc = e6 | t2.baseLanes);
}
function Sl() {
  we(wl, Zc), we(bl, bl.current);
}
function xl() {
  (Zc = wl.current), be(bl), be(wl);
}
var kl = ye(null),
  Cl = null;
function _l(e6) {
  var t2 = e6.alternate;
  we($l, 1 & $l.current),
    we(kl, e6),
    Cl === null && (t2 === null || bl.current !== null || t2.memoizedState !== null) && (Cl = e6);
}
function Pl(e6) {
  we($l, $l.current), we(kl, e6), Cl === null && (Cl = e6);
}
function Ol(e6) {
  e6.tag === 22 ? (we($l, $l.current), we(kl, e6), Cl === null && (Cl = e6)) : Tl();
}
function Tl() {
  we($l, $l.current), we(kl, kl.current);
}
function Nl(e6) {
  be(kl), Cl === e6 && (Cl = null), be($l);
}
var $l = ye(0);
function Ml(e6, t2) {
  we(kl, kl.current), we($l, t2);
}
function Rl(e6) {
  be($l), be(kl), Cl === e6 && (Cl = null);
}
function Ll(e6) {
  for (var t2 = e6; t2 !== null; ) {
    if (t2.tag === 13) {
      var n2 = t2.memoizedState;
      if (n2 !== null && ((n2 = n2.dehydrated) === null || Wp(n2) || qp(n2))) return t2;
    } else if (t2.tag === 19 && t2.memoizedProps.revealOrder !== "independent") {
      if (128 & t2.flags) return t2;
    } else if (t2.child !== null) {
      (t2.child.return = t2), (t2 = t2.child);
      continue;
    }
    if (t2 === e6) break;
    for (; t2.sibling === null; ) {
      if (t2.return === null || t2.return === e6) return null;
      t2 = t2.return;
    }
    (t2.sibling.return = t2.return), (t2 = t2.sibling);
  }
  return null;
}
var Il = 0,
  Al = null,
  Fl = null,
  zl = null,
  jl = !1,
  Dl = !1,
  Hl = !1,
  Vl = 0,
  Bl = 0,
  Ul = null,
  Wl = 0;
function ql() {
  throw Error(k(321));
}
function Xl(e6, t2) {
  if (t2 === null) return !1;
  for (var n2 = 0; n2 < t2.length && n2 < e6.length; n2++) if (!Ar(e6[n2], t2[n2])) return !1;
  return !0;
}
function Kl(e6, t2, n2, r2, o2, a2) {
  return (
    (Il = a2),
    (Al = t2),
    (t2.memoizedState = null),
    (t2.updateQueue = null),
    (t2.lanes = 0),
    (pe.H = e6 === null || e6.memoizedState === null ? us : cs),
    (Hl = !1),
    (a2 = n2(r2, o2)),
    (Hl = !1),
    Dl && (a2 = Yl(t2, n2, r2, o2)),
    Gl(e6),
    a2
  );
}
function Gl(e6) {
  pe.H = ss;
  var t2 = Fl !== null && Fl.next !== null;
  if (((Il = 0), (zl = Fl = Al = null), (jl = !1), (Bl = 0), (Ul = null), t2)) throw Error(k(300));
  e6 === null || _s || ((e6 = e6.dependencies) !== null && wa(e6) && (_s = !0));
}
function Yl(e6, t2, n2, r2) {
  Al = e6;
  var o2 = 0;
  do {
    if ((Dl && (Ul = null), (Bl = 0), (Dl = !1), 25 <= o2)) throw Error(k(301));
    if (((o2 += 1), (zl = Fl = null), e6.updateQueue != null)) {
      var a2 = e6.updateQueue;
      (a2.lastEffect = null),
        (a2.events = null),
        (a2.stores = null),
        a2.memoCache != null && (a2.memoCache.index = 0);
    }
    (pe.H = ds), (a2 = t2(n2, r2));
  } while (Dl);
  return a2;
}
function Ql() {
  var e6 = pe.H,
    t2 = e6.useState()[0];
  return (
    (t2 = typeof t2.then == "function" ? ri(t2) : t2),
    (e6 = e6.useState()[0]),
    (Fl !== null ? Fl.memoizedState : null) !== e6 && (Al.flags |= 1024),
    t2
  );
}
function Jl() {
  var e6 = Vl !== 0;
  return (Vl = 0), e6;
}
function Zl(e6, t2, n2) {
  (t2.updateQueue = e6.updateQueue), (t2.flags &= -2053), (e6.lanes &= ~n2);
}
function ei(e6) {
  if (jl) {
    for (e6 = e6.memoizedState; e6 !== null; ) {
      var t2 = e6.queue;
      t2 !== null && (t2.pending = null), (e6 = e6.next);
    }
    jl = !1;
  }
  (Il = 0), (zl = Fl = Al = null), (Dl = !1), (Bl = Vl = 0), (Ul = null);
}
function ti() {
  var e6 = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return zl === null ? (Al.memoizedState = zl = e6) : (zl = zl.next = e6), zl;
}
function ni() {
  if (Fl === null) {
    var e6 = Al.alternate;
    e6 = e6 !== null ? e6.memoizedState : null;
  } else e6 = Fl.next;
  var t2 = zl === null ? Al.memoizedState : zl.next;
  if (t2 !== null) (zl = t2), (Fl = e6);
  else {
    if (e6 === null) throw Al.alternate === null ? Error(k(467)) : Error(k(310));
    (e6 = {
      memoizedState: (Fl = e6).memoizedState,
      baseState: Fl.baseState,
      baseQueue: Fl.baseQueue,
      queue: Fl.queue,
      next: null,
    }),
      zl === null ? (Al.memoizedState = zl = e6) : (zl = zl.next = e6);
  }
  return zl;
}
function ri(e6) {
  var t2 = Bl;
  return (
    (Bl += 1),
    Ul === null && (Ul = []),
    (e6 = Ka(Ul, e6, t2)),
    (t2 = Al),
    (zl === null ? t2.memoizedState : zl.next) === null &&
      ((t2 = t2.alternate), (pe.H = t2 === null || t2.memoizedState === null ? us : cs)),
    e6
  );
}
function oi(e6) {
  if (e6 !== null && typeof e6 == "object") {
    if (typeof e6.then == "function") return ri(e6);
    if (e6.$$typeof === ie) return;
    if (e6.$$typeof === Q) return Sa(e6);
  }
  throw Error(k(438, String(e6)));
}
function ai(e6) {
  var t2 = null,
    n2 = Al.updateQueue;
  if ((n2 !== null && (t2 = n2.memoCache), t2 == null)) {
    var r2 = Al.alternate;
    r2 !== null &&
      (r2 = r2.updateQueue) !== null &&
      (r2 = r2.memoCache) != null &&
      (t2 = {
        data: r2.data.map(function (e7) {
          return e7.slice();
        }),
        index: 0,
      });
  }
  if (
    (t2 == null && (t2 = { data: [], index: 0 }),
    n2 === null &&
      ((n2 = { lastEffect: null, events: null, stores: null, memoCache: null }),
      (Al.updateQueue = n2)),
    (n2.memoCache = t2),
    (n2 = t2.data[t2.index]) === void 0)
  )
    for (n2 = t2.data[t2.index] = Array(e6), r2 = 0; r2 < e6; r2++) n2[r2] = ae;
  return t2.index++, n2;
}
function li(e6, t2) {
  return typeof t2 == "function" ? t2(e6) : t2;
}
function ii(e6) {
  return si(ni(), Fl, e6);
}
function si(e6, t2, n2) {
  var r2 = e6.queue;
  if (r2 === null) throw Error(k(311));
  r2.lastRenderedReducer = n2;
  var o2 = e6.baseQueue,
    a2 = r2.pending;
  if (a2 !== null) {
    if (o2 !== null) {
      var l2 = o2.next;
      (o2.next = a2.next), (a2.next = l2);
    }
    (t2.baseQueue = o2 = a2), (r2.pending = null);
  }
  if (((a2 = e6.baseState), o2 === null)) e6.memoizedState = a2;
  else {
    var i2 = (l2 = null),
      s2 = null,
      u2 = (t2 = o2.next),
      c2 = !1;
    do {
      var d2 = -536870913 & u2.lane;
      if (d2 !== u2.lane ? (Xc & d2) === d2 : (Il & d2) === d2) {
        var f2 = u2.revertLane;
        if (f2 === 0)
          s2 !== null &&
            (s2 = s2.next =
              {
                lane: 0,
                revertLane: 0,
                gesture: null,
                action: u2.action,
                hasEagerState: u2.hasEagerState,
                eagerState: u2.eagerState,
                next: null,
              }),
            d2 === Ia && (c2 = !0);
        else {
          if ((Il & f2) === f2) {
            (u2 = u2.next), f2 === Ia && (c2 = !0);
            continue;
          }
          (d2 = {
            lane: 0,
            revertLane: u2.revertLane,
            gesture: null,
            action: u2.action,
            hasEagerState: u2.hasEagerState,
            eagerState: u2.eagerState,
            next: null,
          }),
            s2 === null ? ((i2 = s2 = d2), (l2 = a2)) : (s2 = s2.next = d2),
            (Al.lanes |= f2),
            (td |= f2);
        }
        (d2 = u2.action), Hl && n2(a2, d2), (a2 = u2.hasEagerState ? u2.eagerState : n2(a2, d2));
      } else
        (f2 = {
          lane: d2,
          revertLane: u2.revertLane,
          gesture: u2.gesture,
          action: u2.action,
          hasEagerState: u2.hasEagerState,
          eagerState: u2.eagerState,
          next: null,
        }),
          s2 === null ? ((i2 = s2 = f2), (l2 = a2)) : (s2 = s2.next = f2),
          (Al.lanes |= d2),
          (td |= d2);
      u2 = u2.next;
    } while (u2 !== null && u2 !== t2);
    if (
      (s2 === null ? (l2 = a2) : (s2.next = i2),
      !Ar(a2, e6.memoizedState) && ((_s = !0), c2 && (n2 = Aa) !== null))
    )
      throw n2;
    (e6.memoizedState = a2), (e6.baseState = l2), (e6.baseQueue = s2), (r2.lastRenderedState = a2);
  }
  return o2 === null && (r2.lanes = 0), [e6.memoizedState, r2.dispatch];
}
function ui(e6) {
  var t2 = ni(),
    n2 = t2.queue;
  if (n2 === null) throw Error(k(311));
  n2.lastRenderedReducer = e6;
  var r2 = n2.dispatch,
    o2 = n2.pending,
    a2 = t2.memoizedState;
  if (o2 !== null) {
    n2.pending = null;
    var l2 = (o2 = o2.next);
    do (a2 = e6(a2, l2.action)), (l2 = l2.next);
    while (l2 !== o2);
    Ar(a2, t2.memoizedState) || (_s = !0),
      (t2.memoizedState = a2),
      t2.baseQueue === null && (t2.baseState = a2),
      (n2.lastRenderedState = a2);
  }
  return [a2, r2];
}
function ci(e6, t2, n2) {
  var r2 = Al,
    o2 = ni(),
    a2 = ta;
  if (a2) {
    if (n2 === void 0) throw Error(k(407));
    n2 = n2();
  } else n2 = t2();
  var l2 = !Ar((Fl || o2).memoizedState, n2);
  if (
    (l2 && ((o2.memoizedState = n2), (_s = !0)),
    (o2 = o2.queue),
    Ii(pi.bind(null, r2, o2, e6), [e6]),
    Ni(
      (e6 = o2.getSnapshot !== t2 || l2 || (zl !== null && !!(1 & zl.memoizedState.tag))) ? 9 : 8,
      { destroy: void 0 },
      fi.bind(null, r2, o2, n2, t2),
      null,
    ),
    e6)
  ) {
    if (((r2.flags |= 2048), Wc === null)) throw Error(k(349));
    a2 || 127 & Il || di(r2, t2, n2);
  }
  return n2;
}
function di(e6, t2, n2) {
  (e6.flags |= 16384),
    (e6 = { getSnapshot: t2, value: n2 }),
    (t2 = Al.updateQueue) === null
      ? ((t2 = { lastEffect: null, events: null, stores: null, memoCache: null }),
        (Al.updateQueue = t2),
        (t2.stores = [e6]))
      : (n2 = t2.stores) === null
        ? (t2.stores = [e6])
        : n2.push(e6);
}
function fi(e6, t2, n2, r2) {
  (t2.value = n2), (t2.getSnapshot = r2), hi(t2) && mi(e6);
}
function pi(e6, t2, n2) {
  return n2(function () {
    hi(t2) && mi(e6);
  });
}
function hi(e6) {
  var t2 = e6.getSnapshot;
  e6 = e6.value;
  try {
    var n2 = t2();
    return !Ar(e6, n2);
  } catch {
    return !0;
  }
}
function mi(e6) {
  var t2 = xo(e6, 2);
  t2 !== null && Td(t2, e6, 2);
}
function gi(e6) {
  var t2 = ti();
  if (typeof e6 == "function") {
    var n2 = e6;
    if (((e6 = n2()), Hl)) {
      Je(!0);
      try {
        n2();
      } finally {
        Je(!1);
      }
    }
  }
  return (
    (t2.memoizedState = t2.baseState = e6),
    (t2.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: li,
      lastRenderedState: e6,
    }),
    t2
  );
}
function vi(e6, t2, n2, r2) {
  return (e6.baseState = n2), si(e6, Fl, typeof r2 == "function" ? r2 : li);
}
function yi(e6, t2, n2, r2, o2) {
  if (as(e6)) throw Error(k(485));
  if ((e6 = t2.action) !== null) {
    var a2 = {
      payload: o2,
      action: e6,
      next: null,
      isTransition: !0,
      status: "pending",
      value: null,
      reason: null,
      listeners: [],
      then: function (e7) {
        a2.listeners.push(e7);
      },
    };
    pe.T !== null ? n2(!0) : (a2.isTransition = !1),
      r2(a2),
      (n2 = t2.pending) === null
        ? ((a2.next = t2.pending = a2), bi(t2, a2))
        : ((a2.next = n2.next), (t2.pending = n2.next = a2));
  }
}
function bi(e6, t2) {
  var n2 = t2.action,
    r2 = t2.payload,
    o2 = e6.state;
  if (t2.isTransition) {
    var a2 = pe.T,
      l2 = {};
    (l2.types = a2 !== null ? a2.types : null), (pe.T = l2);
    try {
      var i2 = n2(o2, r2),
        s2 = pe.S;
      s2 !== null && s2(l2, i2), wi(e6, t2, i2);
    } catch (u2) {
      Si(e6, t2, u2);
    } finally {
      a2 !== null && l2.types !== null && (a2.types = l2.types), (pe.T = a2);
    }
  } else
    try {
      wi(e6, t2, (a2 = n2(o2, r2)));
    } catch (c2) {
      Si(e6, t2, c2);
    }
}
function wi(e6, t2, n2) {
  n2 !== null && typeof n2 == "object" && typeof n2.then == "function"
    ? n2.then(
        function (n3) {
          Ei(e6, t2, n3);
        },
        function (n3) {
          return Si(e6, t2, n3);
        },
      )
    : Ei(e6, t2, n2);
}
function Ei(e6, t2, n2) {
  (t2.status = "fulfilled"),
    (t2.value = n2),
    xi(t2),
    (e6.state = n2),
    (t2 = e6.pending) !== null &&
      ((n2 = t2.next) === t2 ? (e6.pending = null) : ((n2 = n2.next), (t2.next = n2), bi(e6, n2)));
}
function Si(e6, t2, n2) {
  var r2 = e6.pending;
  if (((e6.pending = null), r2 !== null)) {
    r2 = r2.next;
    do (t2.status = "rejected"), (t2.reason = n2), xi(t2), (t2 = t2.next);
    while (t2 !== r2);
  }
  e6.action = null;
}
function xi(e6) {
  e6 = e6.listeners;
  for (var t2 = 0; t2 < e6.length; t2++) (0, e6[t2])();
}
function ki(e6, t2) {
  return t2;
}
function Ci(e6, t2) {
  if (ta) {
    var n2 = Wc.formState;
    if (n2 !== null) {
      e: {
        var r2 = Al;
        if (ta) {
          if (ea) {
            t: {
              for (var o2 = ea, a2 = ra; o2.nodeType !== 8; ) {
                if (!a2) {
                  o2 = null;
                  break t;
                }
                if ((o2 = Xp(o2.nextSibling)) === null) {
                  o2 = null;
                  break t;
                }
              }
              o2 = (a2 = o2.data) === "F!" || a2 === "F" ? o2 : null;
            }
            if (o2) {
              (ea = Xp(o2.nextSibling)), (r2 = o2.data === "F!");
              break e;
            }
          }
          aa(r2);
        }
        r2 = !1;
      }
      r2 && (t2 = n2[0]);
    }
  }
  return (
    ((n2 = ti()).memoizedState = n2.baseState = t2),
    (r2 = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: ki,
      lastRenderedState: t2,
    }),
    (n2.queue = r2),
    (n2 = ns.bind(null, Al, r2)),
    (r2.dispatch = n2),
    (r2 = gi(!1)),
    (a2 = os.bind(null, Al, !1, r2.queue)),
    (o2 = { state: t2, dispatch: null, action: e6, pending: null }),
    ((r2 = ti()).queue = o2),
    (n2 = yi.bind(null, Al, o2, a2, n2)),
    (o2.dispatch = n2),
    (r2.memoizedState = e6),
    [t2, n2, !1]
  );
}
function _i(e6) {
  return Pi(ni(), Fl, e6);
}
function Pi(e6, t2, n2) {
  if (
    ((t2 = si(e6, t2, ki)[0]),
    (e6 = ii(li)[0]),
    typeof t2 == "object" && t2 !== null && typeof t2.then == "function")
  )
    try {
      var r2 = ri(t2);
    } catch (l2) {
      throw l2 === Ba ? Wa : l2;
    }
  else r2 = t2;
  var o2 = (t2 = ni()).queue,
    a2 = o2.dispatch;
  return (
    n2 !== t2.memoizedState &&
      ((Al.flags |= 2048), Ni(9, { destroy: void 0 }, Oi.bind(null, o2, n2), null)),
    [r2, a2, e6]
  );
}
function Oi(e6, t2) {
  e6.action = t2;
}
function Ti(e6) {
  var t2 = ni(),
    n2 = Fl;
  if (n2 !== null) return Pi(t2, n2, e6);
  ni(), (t2 = t2.memoizedState);
  var r2 = (n2 = ni()).queue.dispatch;
  return (n2.memoizedState = e6), [t2, r2, !1];
}
function Ni(e6, t2, n2, r2) {
  return (
    (e6 = { tag: e6, create: n2, deps: r2, inst: t2, next: null }),
    (t2 = Al.updateQueue) === null &&
      ((t2 = { lastEffect: null, events: null, stores: null, memoCache: null }),
      (Al.updateQueue = t2)),
    (n2 = t2.lastEffect) === null
      ? (t2.lastEffect = e6.next = e6)
      : ((r2 = n2.next), (n2.next = e6), (e6.next = r2), (t2.lastEffect = e6)),
    e6
  );
}
function $i() {
  return ni().memoizedState;
}
function Mi(e6, t2, n2, r2) {
  var o2 = ti();
  (Al.flags |= e6),
    (o2.memoizedState = Ni(1 | t2, { destroy: void 0 }, n2, r2 === void 0 ? null : r2));
}
function Ri(e6, t2, n2, r2) {
  var o2 = ni();
  r2 = r2 === void 0 ? null : r2;
  var a2 = o2.memoizedState.inst;
  Fl !== null && r2 !== null && Xl(r2, Fl.memoizedState.deps)
    ? (o2.memoizedState = Ni(t2, a2, n2, r2))
    : ((Al.flags |= e6), (o2.memoizedState = Ni(1 | t2, a2, n2, r2)));
}
function Li(e6, t2) {
  Mi(8390656, 8, e6, t2);
}
function Ii(e6, t2) {
  Ri(2048, 8, e6, t2);
}
function Ai(e6) {
  var t2 = ni().memoizedState;
  return (
    (function (e7) {
      Al.flags |= 4;
      var t3 = Al.updateQueue;
      if (t3 === null)
        (t3 = { lastEffect: null, events: null, stores: null, memoCache: null }),
          (Al.updateQueue = t3),
          (t3.events = [e7]);
      else {
        var n2 = t3.events;
        n2 === null ? (t3.events = [e7]) : n2.push(e7);
      }
    })({ ref: t2, nextImpl: e6 }),
    function () {
      if (2 & Uc) throw Error(k(440));
      return t2.impl.apply(void 0, arguments);
    }
  );
}
function Fi(e6, t2) {
  return Ri(4, 2, e6, t2);
}
function zi(e6, t2) {
  return Ri(4, 4, e6, t2);
}
function ji(e6, t2) {
  if (typeof t2 == "function") {
    e6 = e6();
    var n2 = t2(e6);
    return function () {
      typeof n2 == "function" ? n2() : t2(null);
    };
  }
  if (t2 != null)
    return (
      (e6 = e6()),
      (t2.current = e6),
      function () {
        t2.current = null;
      }
    );
}
function Di(e6, t2, n2) {
  (n2 = n2 != null ? n2.concat([e6]) : null), Ri(4, 4, ji.bind(null, t2, e6), n2);
}
function Hi() {}
function Vi(e6, t2) {
  var n2 = ni();
  t2 = t2 === void 0 ? null : t2;
  var r2 = n2.memoizedState;
  return t2 !== null && Xl(t2, r2[1]) ? r2[0] : ((n2.memoizedState = [e6, t2]), e6);
}
function Bi(e6, t2) {
  var n2 = ni();
  t2 = t2 === void 0 ? null : t2;
  var r2 = n2.memoizedState;
  if (t2 !== null && Xl(t2, r2[1])) return r2[0];
  if (((r2 = e6()), Hl)) {
    Je(!0);
    try {
      e6();
    } finally {
      Je(!1);
    }
  }
  return (n2.memoizedState = [r2, t2]), r2;
}
function Ui(e6, t2, n2) {
  return n2 === void 0 || (1073741824 & Il && !(261930 & Xc))
    ? (e6.memoizedState = t2)
    : ((e6.memoizedState = n2), (e6 = Pd()), (Al.lanes |= e6), (td |= e6), n2);
}
function Wi(e6, t2, n2, r2) {
  return Ar(n2, t2)
    ? n2
    : bl.current !== null
      ? ((e6 = Ui(e6, n2, r2)), Ar(e6, t2) || (_s = !0), e6)
      : 106 & Il && (!(1073741824 & Il) || 261930 & Xc)
        ? ((e6 = Pd()), (Al.lanes |= e6), (td |= e6), t2)
        : ((_s = !0), (e6.memoizedState = n2));
}
function qi(e6, t2, n2, r2, o2) {
  var a2 = he.p;
  he.p = a2 !== 0 && 8 > a2 ? a2 : 8;
  var l2,
    i2,
    s2,
    u2 = pe.T,
    c2 = {};
  (c2.types = u2 !== null ? u2.types : null), (pe.T = c2), os(e6, !1, t2, n2);
  try {
    var d2 = o2(),
      f2 = pe.S;
    f2 !== null && f2(c2, d2),
      d2 !== null && typeof d2 == "object" && typeof d2.then == "function"
        ? rs(
            e6,
            t2,
            ((l2 = r2),
            (i2 = []),
            (s2 = {
              status: "pending",
              value: null,
              reason: null,
              then: function (e7) {
                i2.push(e7);
              },
            }),
            d2.then(
              function () {
                (s2.status = "fulfilled"), (s2.value = l2);
                for (var e7 = 0; e7 < i2.length; e7++) (0, i2[e7])(l2);
              },
              function (e7) {
                for (s2.status = "rejected", s2.reason = e7, e7 = 0; e7 < i2.length; e7++)
                  (0, i2[e7])(void 0);
              },
            ),
            s2),
            _d(),
          )
        : rs(e6, t2, r2, _d());
  } catch (p2) {
    rs(e6, t2, { then: function () {}, status: "rejected", reason: p2 }, _d());
  } finally {
    (he.p = a2), u2 !== null && c2.types !== null && (u2.types = c2.types), (pe.T = u2);
  }
}
function Xi() {}
function Ki(e6, t2, n2, r2) {
  if (e6.tag !== 5) throw Error(k(476));
  var o2 = Gi(e6).queue;
  qi(
    e6,
    o2,
    t2,
    me,
    n2 === null
      ? Xi
      : function () {
          return Yi(e6), n2(r2);
        },
  );
}
function Gi(e6) {
  var t2 = e6.memoizedState;
  if (t2 !== null) return t2;
  var n2 = {};
  return (
    ((t2 = {
      memoizedState: me,
      baseState: me,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: li,
        lastRenderedState: me,
      },
      next: null,
    }).next = {
      memoizedState: n2,
      baseState: n2,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: li,
        lastRenderedState: n2,
      },
      next: null,
    }),
    (e6.memoizedState = t2),
    (e6 = e6.alternate) !== null && (e6.memoizedState = t2),
    t2
  );
}
function Yi(e6) {
  var t2 = Gi(e6);
  t2.next === null && (t2 = e6.alternate.memoizedState), rs(e6, t2.next.queue, {}, _d());
}
function Qi() {
  return Sa(Nh);
}
function Ji() {
  return ni().memoizedState;
}
function Zi() {
  return ni().memoizedState;
}
function es(e6) {
  for (var t2 = e6.return; t2 !== null; ) {
    switch (t2.tag) {
      case 24:
      case 3:
        var n2 = _d(),
          r2 = dl(t2, (e6 = cl(n2)), n2);
        return (
          r2 !== null && (Td(r2, t2, n2), fl(r2, t2, n2)),
          (t2 = { cache: Ta() }),
          void (e6.payload = t2)
        );
    }
    t2 = t2.return;
  }
}
function ts(e6, t2, n2) {
  var r2 = _d();
  (n2 = {
    lane: r2,
    revertLane: 0,
    gesture: null,
    action: n2,
    hasEagerState: !1,
    eagerState: null,
    next: null,
  }),
    as(e6) ? ls(t2, n2) : (n2 = So(e6, t2, n2, r2)) !== null && (Td(n2, e6, r2), is(n2, t2, r2));
}
function ns(e6, t2, n2) {
  rs(e6, t2, n2, _d());
}
function rs(e6, t2, n2, r2) {
  var o2 = {
    lane: r2,
    revertLane: 0,
    gesture: null,
    action: n2,
    hasEagerState: !1,
    eagerState: null,
    next: null,
  };
  if (as(e6)) ls(t2, o2);
  else {
    var a2 = e6.alternate;
    if (e6.lanes === 0 && (a2 === null || a2.lanes === 0) && (a2 = t2.lastRenderedReducer) !== null)
      try {
        var l2 = t2.lastRenderedState,
          i2 = a2(l2, n2);
        if (((o2.hasEagerState = !0), (o2.eagerState = i2), Ar(i2, l2)))
          return Eo(e6, t2, o2, 0), Wc === null && wo(), !1;
      } catch {}
    if ((n2 = So(e6, t2, o2, r2)) !== null) return Td(n2, e6, r2), is(n2, t2, r2), !0;
  }
  return !1;
}
function os(e6, t2, n2, r2) {
  if (
    ((r2 = {
      lane: 2,
      revertLane: _f(),
      gesture: null,
      action: r2,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    as(e6))
  ) {
    if (t2) throw Error(k(479));
  } else (t2 = So(e6, n2, r2, 2)) !== null && Td(t2, e6, 2);
}
function as(e6) {
  var t2 = e6.alternate;
  return e6 === Al || (t2 !== null && t2 === Al);
}
function ls(e6, t2) {
  Dl = jl = !0;
  var n2 = e6.pending;
  n2 === null ? (t2.next = t2) : ((t2.next = n2.next), (n2.next = t2)), (e6.pending = t2);
}
function is(e6, t2, n2) {
  if (4194048 & n2) {
    var r2 = t2.lanes;
    (n2 |= r2 &= e6.pendingLanes), (t2.lanes = n2), ht(e6, n2);
  }
}
var ss = {
    readContext: Sa,
    use: oi,
    useCallback: ql,
    useContext: ql,
    useEffect: ql,
    useImperativeHandle: ql,
    useLayoutEffect: ql,
    useInsertionEffect: ql,
    useMemo: ql,
    useReducer: ql,
    useRef: ql,
    useState: ql,
    useDebugValue: ql,
    useDeferredValue: ql,
    useTransition: ql,
    useSyncExternalStore: ql,
    useId: ql,
    useHostTransitionStatus: ql,
    useFormState: ql,
    useActionState: ql,
    useOptimistic: ql,
    useMemoCache: ql,
    useCacheRefresh: ql,
    useEffectEvent: ql,
  },
  us = {
    readContext: Sa,
    use: oi,
    useCallback: function (e6, t2) {
      return (ti().memoizedState = [e6, t2 === void 0 ? null : t2]), e6;
    },
    useContext: Sa,
    useEffect: Li,
    useImperativeHandle: function (e6, t2, n2) {
      (n2 = n2 != null ? n2.concat([e6]) : null), Mi(4194308, 4, ji.bind(null, t2, e6), n2);
    },
    useLayoutEffect: function (e6, t2) {
      return Mi(4194308, 4, e6, t2);
    },
    useInsertionEffect: function (e6, t2) {
      Mi(4, 2, e6, t2);
    },
    useMemo: function (e6, t2) {
      var n2 = ti();
      t2 = t2 === void 0 ? null : t2;
      var r2 = e6();
      if (Hl) {
        Je(!0);
        try {
          e6();
        } finally {
          Je(!1);
        }
      }
      return (n2.memoizedState = [r2, t2]), r2;
    },
    useReducer: function (e6, t2, n2) {
      var r2 = ti();
      if (n2 !== void 0) {
        var o2 = n2(t2);
        if (Hl) {
          Je(!0);
          try {
            n2(t2);
          } finally {
            Je(!1);
          }
        }
      } else o2 = t2;
      return (
        (r2.memoizedState = r2.baseState = o2),
        (e6 = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e6,
          lastRenderedState: o2,
        }),
        (r2.queue = e6),
        (e6 = e6.dispatch = ts.bind(null, Al, e6)),
        [r2.memoizedState, e6]
      );
    },
    useRef: function (e6) {
      return (e6 = { current: e6 }), (ti().memoizedState = e6);
    },
    useState: function (e6) {
      var t2 = (e6 = gi(e6)).queue,
        n2 = ns.bind(null, Al, t2);
      return (t2.dispatch = n2), [e6.memoizedState, n2];
    },
    useDebugValue: Hi,
    useDeferredValue: function (e6, t2) {
      return Ui(ti(), e6, t2);
    },
    useTransition: function () {
      var e6 = gi(!1);
      return (e6 = qi.bind(null, Al, e6.queue, !0, !1)), (ti().memoizedState = e6), [!1, e6];
    },
    useSyncExternalStore: function (e6, t2, n2) {
      var r2 = Al,
        o2 = ti();
      if (ta) {
        if (n2 === void 0) throw Error(k(407));
        n2 = n2();
      } else {
        if (((n2 = t2()), Wc === null)) throw Error(k(349));
        127 & Xc || di(r2, t2, n2);
      }
      o2.memoizedState = n2;
      var a2 = { value: n2, getSnapshot: t2 };
      return (
        (o2.queue = a2),
        Li(pi.bind(null, r2, a2, e6), [e6]),
        (r2.flags |= 2048),
        Ni(9, { destroy: void 0 }, fi.bind(null, r2, a2, n2, t2), null),
        n2
      );
    },
    useId: function () {
      var e6 = ti(),
        t2 = Wc.identifierPrefix;
      if (ta) {
        var n2 = Xo;
        (t2 = "_" + t2 + "R_" + (n2 = (qo & ~(1 << (32 - Ze(qo) - 1))).toString(32) + n2)),
          0 < (n2 = Vl++) && (t2 += "H" + n2.toString(32)),
          (t2 += "_");
      } else t2 = "_" + t2 + "r_" + (n2 = Wl++).toString(32) + "_";
      return (e6.memoizedState = t2);
    },
    useHostTransitionStatus: Qi,
    useFormState: Ci,
    useActionState: Ci,
    useOptimistic: function (e6) {
      var t2 = ti();
      t2.memoizedState = t2.baseState = e6;
      var n2 = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null,
      };
      return (t2.queue = n2), (t2 = os.bind(null, Al, !0, n2)), (n2.dispatch = t2), [e6, t2];
    },
    useMemoCache: ai,
    useCacheRefresh: function () {
      return (ti().memoizedState = es.bind(null, Al));
    },
    useEffectEvent: function (e6) {
      var t2 = ti(),
        n2 = { impl: e6 };
      return (
        (t2.memoizedState = n2),
        function () {
          if (2 & Uc) throw Error(k(440));
          return n2.impl.apply(void 0, arguments);
        }
      );
    },
  },
  cs = {
    readContext: Sa,
    use: oi,
    useCallback: Vi,
    useContext: Sa,
    useEffect: Ii,
    useImperativeHandle: Di,
    useInsertionEffect: Fi,
    useLayoutEffect: zi,
    useMemo: Bi,
    useReducer: ii,
    useRef: $i,
    useState: function () {
      return ii(li);
    },
    useDebugValue: Hi,
    useDeferredValue: function (e6, t2) {
      return Wi(ni(), Fl.memoizedState, e6, t2);
    },
    useTransition: function () {
      var e6 = ii(li)[0],
        t2 = ni().memoizedState;
      return [typeof e6 == "boolean" ? e6 : ri(e6), t2];
    },
    useSyncExternalStore: ci,
    useId: Ji,
    useHostTransitionStatus: Qi,
    useFormState: _i,
    useActionState: _i,
    useOptimistic: function (e6, t2) {
      return vi(ni(), 0, e6, t2);
    },
    useMemoCache: ai,
    useCacheRefresh: Zi,
    useEffectEvent: Ai,
  },
  ds = {
    readContext: Sa,
    use: oi,
    useCallback: Vi,
    useContext: Sa,
    useEffect: Ii,
    useImperativeHandle: Di,
    useInsertionEffect: Fi,
    useLayoutEffect: zi,
    useMemo: Bi,
    useReducer: ui,
    useRef: $i,
    useState: function () {
      return ui(li);
    },
    useDebugValue: Hi,
    useDeferredValue: function (e6, t2) {
      var n2 = ni();
      return Fl === null ? Ui(n2, e6, t2) : Wi(n2, Fl.memoizedState, e6, t2);
    },
    useTransition: function () {
      var e6 = ui(li)[0],
        t2 = ni().memoizedState;
      return [typeof e6 == "boolean" ? e6 : ri(e6), t2];
    },
    useSyncExternalStore: ci,
    useId: Ji,
    useHostTransitionStatus: Qi,
    useFormState: Ti,
    useActionState: Ti,
    useOptimistic: function (e6, t2) {
      var n2 = ni();
      return Fl !== null ? vi(n2, 0, e6, t2) : ((n2.baseState = e6), [e6, n2.queue.dispatch]);
    },
    useMemoCache: ai,
    useCacheRefresh: Zi,
    useEffectEvent: Ai,
  };
function fs(e6, t2, n2, r2) {
  (n2 = (n2 = n2(r2, (t2 = e6.memoizedState))) == null ? t2 : B({}, t2, n2)),
    (e6.memoizedState = n2),
    e6.lanes === 0 && (e6.updateQueue.baseState = n2);
}
var ps = {
  enqueueSetState: function (e6, t2, n2) {
    e6 = e6._reactInternals;
    var r2 = _d(),
      o2 = cl(r2);
    (o2.payload = t2),
      n2 != null && (o2.callback = n2),
      (t2 = dl(e6, o2, r2)) !== null && (Td(t2, e6, r2), fl(t2, e6, r2));
  },
  enqueueReplaceState: function (e6, t2, n2) {
    e6 = e6._reactInternals;
    var r2 = _d(),
      o2 = cl(r2);
    (o2.tag = 1),
      (o2.payload = t2),
      n2 != null && (o2.callback = n2),
      (t2 = dl(e6, o2, r2)) !== null && (Td(t2, e6, r2), fl(t2, e6, r2));
  },
  enqueueForceUpdate: function (e6, t2) {
    e6 = e6._reactInternals;
    var n2 = _d(),
      r2 = cl(n2);
    (r2.tag = 2),
      t2 != null && (r2.callback = t2),
      (t2 = dl(e6, r2, n2)) !== null && (Td(t2, e6, n2), fl(t2, e6, n2));
  },
};
function hs(e6, t2, n2, r2, o2, a2, l2) {
  return typeof (e6 = e6.stateNode).shouldComponentUpdate == "function"
    ? e6.shouldComponentUpdate(r2, a2, l2)
    : !t2.prototype || !t2.prototype.isPureReactComponent || !Fr(n2, r2) || !Fr(o2, a2);
}
function ms(e6, t2, n2, r2) {
  (e6 = t2.state),
    typeof t2.componentWillReceiveProps == "function" && t2.componentWillReceiveProps(n2, r2),
    typeof t2.UNSAFE_componentWillReceiveProps == "function" &&
      t2.UNSAFE_componentWillReceiveProps(n2, r2),
    t2.state !== e6 && ps.enqueueReplaceState(t2, t2.state, null);
}
function gs(e6, t2) {
  var n2 = t2;
  if ("ref" in t2) for (var r2 in ((n2 = {}), t2)) r2 !== "ref" && (n2[r2] = t2[r2]);
  if ((e6 = e6.defaultProps))
    for (var o2 in (n2 === t2 && (n2 = B({}, n2)), e6)) n2[o2] === void 0 && (n2[o2] = e6[o2]);
  return n2;
}
function vs(e6) {
  go(e6);
}
function ys(e6) {}
function bs(e6) {
  go(e6);
}
function ws(e6, t2) {
  try {
    (0, e6.onUncaughtError)(t2.value, { componentStack: t2.stack });
  } catch (n2) {
    setTimeout(function () {
      throw n2;
    });
  }
}
function Es(e6, t2, n2) {
  try {
    (0, e6.onCaughtError)(n2.value, {
      componentStack: n2.stack,
      errorBoundary: t2.tag === 1 ? t2.stateNode : null,
    });
  } catch (r2) {
    setTimeout(function () {
      throw r2;
    });
  }
}
function Ss(e6, t2, n2) {
  return (
    ((n2 = cl(n2)).tag = 3),
    (n2.payload = { element: null }),
    (n2.callback = function () {
      ws(e6, t2);
    }),
    n2
  );
}
function xs(e6) {
  return ((e6 = cl(e6)).tag = 3), e6;
}
function ks(e6, t2, n2, r2) {
  var o2 = n2.type.getDerivedStateFromError;
  if (typeof o2 == "function") {
    var a2 = r2.value;
    (e6.payload = function () {
      return o2(a2);
    }),
      (e6.callback = function () {
        Es(t2, n2, r2);
      });
  }
  var l2 = n2.stateNode;
  l2 !== null &&
    typeof l2.componentDidCatch == "function" &&
    (e6.callback = function () {
      Es(t2, n2, r2),
        typeof o2 != "function" && (pd === null ? (pd = new Set([this])) : pd.add(this));
      var e7 = r2.stack;
      this.componentDidCatch(r2.value, { componentStack: e7 !== null ? e7 : "" });
    });
}
var Cs = Error(k(461)),
  _s = !1;
function Ps(e6, t2, n2, r2) {
  t2.child = e6 === null ? ll(t2, null, n2, r2) : al(t2, e6.child, n2, r2);
}
function Os(e6, t2, n2, r2, o2) {
  n2 = n2.render;
  var a2 = t2.ref;
  if ("ref" in r2) {
    var l2 = {};
    for (var i2 in r2) i2 !== "ref" && (l2[i2] = r2[i2]);
  } else l2 = r2;
  return (
    Ea(t2),
    (r2 = Kl(e6, t2, n2, l2, a2, o2)),
    (i2 = Jl()),
    e6 === null || _s
      ? (ta && i2 && Yo(t2), (t2.flags |= 1), Ps(e6, t2, r2, o2), t2.child)
      : (Zl(e6, t2, o2), eu(e6, t2, o2))
  );
}
function Ts(e6, t2, n2, r2, o2) {
  if (e6 === null) {
    var a2 = n2.type;
    return typeof a2 != "function" || To(a2) || a2.defaultProps !== void 0 || n2.compare !== null
      ? (((e6 = Mo(n2.type, null, r2, t2, t2.mode, o2)).ref = t2.ref),
        (e6.return = t2),
        (t2.child = e6))
      : ((t2.tag = 15), (t2.type = a2), Ns(e6, t2, a2, r2, o2));
  }
  if (((a2 = e6.child), !tu(e6, o2))) {
    var l2 = a2.memoizedProps;
    if ((n2 = (n2 = n2.compare) !== null ? n2 : Fr)(l2, r2) && e6.ref === t2.ref)
      return eu(e6, t2, o2);
  }
  return (t2.flags |= 1), ((e6 = No(a2, r2)).ref = t2.ref), (e6.return = t2), (t2.child = e6);
}
function Ns(e6, t2, n2, r2, o2) {
  if (e6 !== null) {
    var a2 = e6.memoizedProps;
    if (Fr(a2, r2) && e6.ref === t2.ref) {
      if (((_s = !1), (t2.pendingProps = r2 = a2), !tu(e6, o2)))
        return (t2.lanes = e6.lanes), eu(e6, t2, o2);
      131072 & e6.flags && (_s = !0);
    }
  }
  return Fs(e6, t2, n2, r2, o2);
}
function $s(e6, t2, n2, r2) {
  var o2 = r2.children,
    a2 = e6 !== null ? e6.memoizedState : null;
  if (
    (e6 === null &&
      t2.stateNode === null &&
      (t2.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null,
      }),
    r2.mode === "hidden")
  ) {
    if (128 & t2.flags) {
      if (((a2 = a2 !== null ? a2.baseLanes | n2 : n2), e6 !== null)) {
        for (r2 = t2.child = e6.child, o2 = 0; r2 !== null; )
          (o2 = o2 | r2.lanes | r2.childLanes), (r2 = r2.sibling);
        r2 = o2 & ~a2;
      } else (r2 = 0), (t2.child = null);
      return Rs(e6, t2, a2, n2, r2);
    }
    if (!(536870912 & n2))
      return (r2 = t2.lanes = 536870912), Rs(e6, t2, a2 !== null ? a2.baseLanes | n2 : n2, n2, r2);
    (t2.memoizedState = { baseLanes: 0, cachePool: null }),
      e6 !== null && Ha(0, a2 !== null ? a2.cachePool : null),
      a2 !== null ? El(t2, a2) : Sl(),
      Ol(t2);
  } else
    a2 !== null
      ? (Ha(0, a2.cachePool), El(t2, a2), Tl(), (t2.memoizedState = null))
      : (e6 !== null && Ha(0, null), Sl(), Tl());
  return Ps(e6, t2, o2, n2), t2.child;
}
function Ms(e6, t2) {
  return (
    (e6 !== null && e6.tag === 22) ||
      t2.stateNode !== null ||
      (t2.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null,
      }),
    t2.sibling
  );
}
function Rs(e6, t2, n2, r2, o2) {
  var a2 = Da();
  return (
    (a2 = a2 === null ? null : { parent: Oa._currentValue, pool: a2 }),
    (t2.memoizedState = { baseLanes: n2, cachePool: a2 }),
    e6 !== null && Ha(0, null),
    Sl(),
    Ol(t2),
    e6 !== null && ba(e6, t2, r2, !0),
    (t2.childLanes = o2),
    null
  );
}
function Ls(e6, t2) {
  return (
    ((t2 = qs({ mode: t2.mode, children: t2.children }, e6.mode)).ref = e6.ref),
    (e6.child = t2),
    (t2.return = e6),
    t2
  );
}
function Is(e6, t2, n2) {
  return (
    al(t2, e6.child, null, n2),
    ((e6 = Ls(t2, t2.pendingProps)).flags |= 2),
    Nl(t2),
    (t2.memoizedState = null),
    e6
  );
}
function As(e6, t2) {
  var n2 = t2.ref;
  if (n2 === null) e6 !== null && e6.ref !== null && (t2.flags |= 4194816);
  else {
    if (typeof n2 != "function" && typeof n2 != "object") throw Error(k(284));
    (e6 !== null && e6.ref === n2) || (t2.flags |= 4194816);
  }
}
function Fs(e6, t2, n2, r2, o2) {
  return (
    Ea(t2),
    (n2 = Kl(e6, t2, n2, r2, void 0, o2)),
    (r2 = Jl()),
    e6 === null || _s
      ? (ta && r2 && Yo(t2), (t2.flags |= 1), Ps(e6, t2, n2, o2), t2.child)
      : (Zl(e6, t2, o2), eu(e6, t2, o2))
  );
}
function zs(e6, t2, n2, r2, o2, a2) {
  return (
    Ea(t2),
    (t2.updateQueue = null),
    (n2 = Yl(t2, r2, n2, o2)),
    Gl(e6),
    (r2 = Jl()),
    e6 === null || _s
      ? (ta && r2 && Yo(t2), (t2.flags |= 1), Ps(e6, t2, n2, a2), t2.child)
      : (Zl(e6, t2, a2), eu(e6, t2, a2))
  );
}
function js(e6, t2, n2, r2, o2) {
  if ((Ea(t2), t2.stateNode === null)) {
    var a2 = _o,
      l2 = n2.contextType;
    typeof l2 == "object" && l2 !== null && (a2 = Sa(l2)),
      (a2 = new n2(r2, a2)),
      (t2.memoizedState = a2.state !== null && a2.state !== void 0 ? a2.state : null),
      (a2.updater = ps),
      (t2.stateNode = a2),
      (a2._reactInternals = t2),
      ((a2 = t2.stateNode).props = r2),
      (a2.state = t2.memoizedState),
      (a2.refs = {}),
      sl(t2),
      (l2 = n2.contextType),
      (a2.context = typeof l2 == "object" && l2 !== null ? Sa(l2) : _o),
      (a2.state = t2.memoizedState),
      typeof (l2 = n2.getDerivedStateFromProps) == "function" &&
        (fs(t2, n2, l2, r2), (a2.state = t2.memoizedState)),
      typeof n2.getDerivedStateFromProps == "function" ||
        typeof a2.getSnapshotBeforeUpdate == "function" ||
        (typeof a2.UNSAFE_componentWillMount != "function" &&
          typeof a2.componentWillMount != "function") ||
        ((l2 = a2.state),
        typeof a2.componentWillMount == "function" && a2.componentWillMount(),
        typeof a2.UNSAFE_componentWillMount == "function" && a2.UNSAFE_componentWillMount(),
        l2 !== a2.state && ps.enqueueReplaceState(a2, a2.state, null),
        gl(t2, r2, a2, o2),
        ml(),
        (a2.state = t2.memoizedState)),
      typeof a2.componentDidMount == "function" && (t2.flags |= 4194308),
      (r2 = !0);
  } else if (e6 === null) {
    a2 = t2.stateNode;
    var i2 = t2.memoizedProps,
      s2 = gs(n2, i2);
    a2.props = s2;
    var u2 = a2.context,
      c2 = n2.contextType;
    (l2 = _o), typeof c2 == "object" && c2 !== null && (l2 = Sa(c2));
    var d2 = n2.getDerivedStateFromProps;
    (c2 = typeof d2 == "function" || typeof a2.getSnapshotBeforeUpdate == "function"),
      (i2 = t2.pendingProps !== i2),
      c2 ||
        (typeof a2.UNSAFE_componentWillReceiveProps != "function" &&
          typeof a2.componentWillReceiveProps != "function") ||
        ((i2 || u2 !== l2) && ms(t2, a2, r2, l2)),
      (il = !1);
    var f2 = t2.memoizedState;
    (a2.state = f2),
      gl(t2, r2, a2, o2),
      ml(),
      (u2 = t2.memoizedState),
      i2 || f2 !== u2 || il
        ? (typeof d2 == "function" && (fs(t2, n2, d2, r2), (u2 = t2.memoizedState)),
          (s2 = il || hs(t2, n2, s2, r2, f2, u2, l2))
            ? (c2 ||
                (typeof a2.UNSAFE_componentWillMount != "function" &&
                  typeof a2.componentWillMount != "function") ||
                (typeof a2.componentWillMount == "function" && a2.componentWillMount(),
                typeof a2.UNSAFE_componentWillMount == "function" &&
                  a2.UNSAFE_componentWillMount()),
              typeof a2.componentDidMount == "function" && (t2.flags |= 4194308))
            : (typeof a2.componentDidMount == "function" && (t2.flags |= 4194308),
              (t2.memoizedProps = r2),
              (t2.memoizedState = u2)),
          (a2.props = r2),
          (a2.state = u2),
          (a2.context = l2),
          (r2 = s2))
        : (typeof a2.componentDidMount == "function" && (t2.flags |= 4194308), (r2 = !1));
  } else {
    (a2 = t2.stateNode),
      ul(e6, t2),
      (c2 = gs(n2, (l2 = t2.memoizedProps))),
      (a2.props = c2),
      (d2 = t2.pendingProps),
      (f2 = a2.context),
      (u2 = n2.contextType),
      (s2 = _o),
      typeof u2 == "object" && u2 !== null && (s2 = Sa(u2)),
      (u2 =
        typeof (i2 = n2.getDerivedStateFromProps) == "function" ||
        typeof a2.getSnapshotBeforeUpdate == "function") ||
        (typeof a2.UNSAFE_componentWillReceiveProps != "function" &&
          typeof a2.componentWillReceiveProps != "function") ||
        ((l2 !== d2 || f2 !== s2) && ms(t2, a2, r2, s2)),
      (il = !1),
      (f2 = t2.memoizedState),
      (a2.state = f2),
      gl(t2, r2, a2, o2),
      ml();
    var p2 = t2.memoizedState;
    l2 !== d2 || f2 !== p2 || il || (e6 !== null && e6.dependencies !== null && wa(e6.dependencies))
      ? (typeof i2 == "function" && (fs(t2, n2, i2, r2), (p2 = t2.memoizedState)),
        (c2 =
          il ||
          hs(t2, n2, c2, r2, f2, p2, s2) ||
          (e6 !== null && e6.dependencies !== null && wa(e6.dependencies)))
          ? (u2 ||
              (typeof a2.UNSAFE_componentWillUpdate != "function" &&
                typeof a2.componentWillUpdate != "function") ||
              (typeof a2.componentWillUpdate == "function" && a2.componentWillUpdate(r2, p2, s2),
              typeof a2.UNSAFE_componentWillUpdate == "function" &&
                a2.UNSAFE_componentWillUpdate(r2, p2, s2)),
            typeof a2.componentDidUpdate == "function" && (t2.flags |= 4),
            typeof a2.getSnapshotBeforeUpdate == "function" && (t2.flags |= 1024))
          : (typeof a2.componentDidUpdate != "function" ||
              (l2 === e6.memoizedProps && f2 === e6.memoizedState) ||
              (t2.flags |= 4),
            typeof a2.getSnapshotBeforeUpdate != "function" ||
              (l2 === e6.memoizedProps && f2 === e6.memoizedState) ||
              (t2.flags |= 1024),
            (t2.memoizedProps = r2),
            (t2.memoizedState = p2)),
        (a2.props = r2),
        (a2.state = p2),
        (a2.context = s2),
        (r2 = c2))
      : (typeof a2.componentDidUpdate != "function" ||
          (l2 === e6.memoizedProps && f2 === e6.memoizedState) ||
          (t2.flags |= 4),
        typeof a2.getSnapshotBeforeUpdate != "function" ||
          (l2 === e6.memoizedProps && f2 === e6.memoizedState) ||
          (t2.flags |= 1024),
        (r2 = !1));
  }
  return (
    (a2 = r2),
    As(e6, t2),
    (r2 = !!(128 & t2.flags)),
    a2 || r2
      ? ((a2 = t2.stateNode),
        (n2 = r2 && typeof n2.getDerivedStateFromError != "function" ? null : a2.render()),
        (t2.flags |= 1),
        e6 !== null && r2
          ? ((t2.child = al(t2, e6.child, null, o2)), (t2.child = al(t2, null, n2, o2)))
          : Ps(e6, t2, n2, o2),
        (t2.memoizedState = a2.state),
        (e6 = t2.child))
      : (e6 = eu(e6, t2, o2)),
    e6
  );
}
function Ds(e6, t2, n2, r2) {
  return ua(), (t2.flags |= 256), Ps(e6, t2, n2, r2), t2.child;
}
var Hs = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
function Vs(e6) {
  return { baseLanes: e6, cachePool: Va() };
}
function Bs(e6, t2, n2) {
  return (e6 = e6 !== null ? e6.childLanes & ~n2 : 0), t2 && (e6 |= od), e6;
}
function Us(e6, t2, n2) {
  var r2,
    o2 = t2.pendingProps,
    a2 = !1,
    l2 = !!(128 & t2.flags);
  if (
    ((r2 = l2) || (r2 = (e6 === null || e6.memoizedState !== null) && !!(2 & $l.current)),
    r2 && ((a2 = !0), (t2.flags &= -129)),
    (r2 = !!(32 & t2.flags)),
    (t2.flags &= -33),
    e6 === null)
  ) {
    if (ta) {
      if (
        (a2 ? _l(t2) : Tl(),
        (e6 = ea)
          ? (e6 = (e6 = Up(e6, ra)) !== null && e6.data !== "&" ? e6 : null) !== null &&
            ((t2.memoizedState = {
              dehydrated: e6,
              treeContext: Wo !== null ? { id: qo, overflow: Xo } : null,
              retryLane: 536870912,
              hydrationErrors: null,
            }),
            ((n2 = Io(e6)).return = t2),
            (t2.child = n2),
            (Zo = t2),
            (ea = null))
          : (e6 = null),
        e6 === null)
      )
        throw aa(t2);
      return qp(e6) ? (t2.lanes = 32) : (t2.lanes = 536870912), null;
    }
    return (
      (l2 = o2.children),
      (o2 = o2.fallback),
      a2
        ? (Tl(),
          (l2 = qs({ mode: "hidden", children: l2 }, (a2 = t2.mode))),
          (o2 = Ro(o2, a2, n2, null)),
          (l2.return = t2),
          (o2.return = t2),
          (l2.sibling = o2),
          (t2.child = l2),
          ((o2 = t2.child).memoizedState = Vs(n2)),
          (o2.childLanes = Bs(e6, r2, n2)),
          (t2.memoizedState = Hs),
          Ms(null, o2))
        : (_l(t2), Ws(t2, l2))
    );
  }
  var i2 = e6.memoizedState;
  if (i2 !== null) {
    var s2 = i2.dehydrated;
    if (s2 !== null)
      return (function (e7, t3, n3, r3, o3, a3, l3, i3) {
        if (n3)
          return 256 & t3.flags
            ? (_l(t3), (t3.flags &= -257), Xs(e7, t3, i3))
            : t3.memoizedState !== null
              ? (Tl(), (t3.child = e7.child), (t3.flags |= 128), null)
              : (Tl(),
                (a3 = o3.fallback),
                (l3 = t3.mode),
                (o3 = qs({ mode: "visible", children: o3.children }, l3)),
                ((a3 = Ro(a3, l3, i3, null)).flags |= 2),
                (o3.return = t3),
                (a3.return = t3),
                (o3.sibling = a3),
                (t3.child = o3),
                al(t3, e7.child, null, i3),
                ((o3 = t3.child).memoizedState = Vs(i3)),
                (o3.childLanes = Bs(e7, r3, i3)),
                (t3.memoizedState = Hs),
                Ms(null, o3));
        if ((_l(t3), qp(a3))) {
          if ((r3 = a3.nextSibling && a3.nextSibling.dataset)) var s3 = r3.dgst;
          return (
            (r3 = s3) !== "" &&
              (((o3 = Error(k(419))).stack = ""),
              (o3.digest = r3),
              da({ value: o3, source: null, stack: null })),
            Xs(e7, t3, i3)
          );
        }
        if ((_s || ba(e7, t3, i3, !1), (r3 = (i3 & e7.childLanes) !== 0), _s || r3)) {
          if (bl.current !== null) return Xs(e7, t3, i3);
          if ((r3 = Wc) !== null && (o3 = mt(r3, i3)) !== 0 && o3 !== l3.retryLane)
            throw ((l3.retryLane = o3), xo(e7, o3), Td(r3, e7, o3), Cs);
          return Wp(a3) || Hd(), Xs(e7, t3, i3);
        }
        return Wp(a3)
          ? ((t3.flags |= 192), (t3.child = e7.child), null)
          : ((e7 = l3.treeContext),
            (ea = Xp(a3.nextSibling)),
            (Zo = t3),
            (ta = !0),
            (na = null),
            (ra = !1),
            e7 !== null && Jo(t3, e7),
            (t3 = Ws(t3, o3.children)),
            (t3.flags |= 134221824),
            t3);
      })(e6, t2, l2, r2, o2, s2, i2, n2);
  }
  return a2
    ? (Tl(),
      (a2 = o2.fallback),
      (l2 = t2.mode),
      (s2 = (i2 = e6.child).sibling),
      ((o2 = No(i2, { mode: "hidden", children: o2.children })).subtreeFlags =
        1206910976 & i2.subtreeFlags),
      s2 !== null ? (a2 = No(s2, a2)) : ((a2 = Ro(a2, l2, n2, null)).flags |= 2),
      (a2.return = t2),
      (o2.return = t2),
      (o2.sibling = a2),
      (t2.child = o2),
      Ms(null, o2),
      (o2 = t2.child),
      (a2 = e6.child.memoizedState) === null
        ? (a2 = Vs(n2))
        : ((l2 = a2.cachePool) !== null
            ? ((i2 = Oa._currentValue), (l2 = l2.parent !== i2 ? { parent: i2, pool: i2 } : l2))
            : (l2 = Va()),
          (a2 = { baseLanes: a2.baseLanes | n2, cachePool: l2 })),
      (o2.memoizedState = a2),
      (o2.childLanes = Bs(e6, r2, n2)),
      (t2.memoizedState = Hs),
      Ms(e6.child, o2))
    : (_l(t2),
      (e6 = (n2 = e6.child).sibling),
      ((n2 = No(n2, { mode: "visible", children: o2.children })).return = t2),
      (n2.sibling = null),
      e6 !== null &&
        ((r2 = t2.deletions) === null ? ((t2.deletions = [e6]), (t2.flags |= 16)) : r2.push(e6)),
      (t2.child = n2),
      (t2.memoizedState = null),
      n2);
}
function Ws(e6, t2) {
  return ((t2 = qs({ mode: "visible", children: t2 }, e6.mode)).return = e6), (e6.child = t2);
}
function qs(e6, t2) {
  return ((e6 = Oo(22, e6, null, t2)).lanes = 0), e6;
}
function Xs(e6, t2, n2) {
  return (
    al(t2, e6.child, null, n2),
    ((e6 = Ws(t2, t2.pendingProps.children)).flags |= 2),
    (t2.memoizedState = null),
    e6
  );
}
function Ks(e6, t2, n2) {
  e6.lanes |= t2;
  var r2 = e6.alternate;
  r2 !== null && (r2.lanes |= t2), va(e6.return, t2, n2);
}
function Gs(e6) {
  for (var t2 = null; e6 !== null; ) {
    var n2 = e6.alternate;
    n2 !== null && Ll(n2) === null && (t2 = e6), (e6 = e6.sibling);
  }
  return t2;
}
function Ys(e6, t2, n2, r2, o2, a2) {
  var l2 = e6.memoizedState;
  l2 === null
    ? (e6.memoizedState = {
        isBackwards: t2,
        rendering: null,
        renderingStartTime: 0,
        last: r2,
        tail: n2,
        tailMode: o2,
        treeForkCount: a2,
      })
    : ((l2.isBackwards = t2),
      (l2.rendering = null),
      (l2.renderingStartTime = 0),
      (l2.last = r2),
      (l2.tail = n2),
      (l2.tailMode = o2),
      (l2.treeForkCount = a2));
}
function Qs(e6) {
  var t2 = e6.child;
  for (e6.child = null; t2 !== null; ) {
    var n2 = t2.sibling;
    (t2.sibling = e6.child), (e6.child = t2), (t2 = n2);
  }
}
function Js(e6, t2, n2) {
  var r2 = t2.pendingProps,
    o2 = r2.revealOrder,
    a2 = r2.tail;
  r2 = r2.children;
  var l2 = $l.current;
  if (128 & t2.flags) return Ml(0, l2), null;
  var i2 = !!(2 & l2);
  if (
    (i2 ? ((l2 = (1 & l2) | 2), (t2.flags |= 128)) : (l2 &= 1),
    Ml(0, l2),
    o2 === "backwards" && e6 !== null ? (Qs(e6), Ps(e6, t2, r2, n2), Qs(e6)) : Ps(e6, t2, r2, n2),
    (r2 = ta ? Vo : 0),
    !i2 && e6 !== null && 128 & e6.flags)
  )
    e: for (e6 = t2.child; e6 !== null; ) {
      if (e6.tag === 13) e6.memoizedState !== null && Ks(e6, n2, t2);
      else if (e6.tag === 19) Ks(e6, n2, t2);
      else if (e6.child !== null) {
        (e6.child.return = e6), (e6 = e6.child);
        continue;
      }
      if (e6 === t2) break e;
      for (; e6.sibling === null; ) {
        if (e6.return === null || e6.return === t2) break e;
        e6 = e6.return;
      }
      (e6.sibling.return = e6.return), (e6 = e6.sibling);
    }
  switch (o2) {
    case "backwards":
      (n2 = Gs(t2.child)) === null
        ? ((o2 = t2.child), (t2.child = null))
        : ((o2 = n2.sibling), (n2.sibling = null), Qs(t2)),
        Ys(t2, !0, o2, null, a2, r2);
      break;
    case "unstable_legacy-backwards":
      for (n2 = null, o2 = t2.child, t2.child = null; o2 !== null; ) {
        if ((e6 = o2.alternate) !== null && Ll(e6) === null) {
          t2.child = o2;
          break;
        }
        (e6 = o2.sibling), (o2.sibling = n2), (n2 = o2), (o2 = e6);
      }
      Ys(t2, !0, n2, null, a2, r2);
      break;
    case "together":
      Ys(t2, !1, null, null, void 0, r2);
      break;
    case "independent":
      t2.memoizedState = null;
      break;
    default:
      (n2 = Gs(t2.child)) === null
        ? ((o2 = t2.child), (t2.child = null))
        : ((o2 = n2.sibling), (n2.sibling = null)),
        Ys(t2, !1, o2, n2, a2, r2);
  }
  return t2.child;
}
function Zs(e6, t2, n2) {
  var r2 = t2.pendingProps;
  return ma(0, t2.type, r2.value), Ps(e6, t2, r2.children, n2), t2.child;
}
function eu(e6, t2, n2) {
  if (
    (e6 !== null && (t2.dependencies = e6.dependencies),
    (td |= t2.lanes),
    (n2 & t2.childLanes) === 0 && (e6 === null || (ba(e6, t2, n2, !1), (n2 & t2.childLanes) === 0)))
  )
    return null;
  if (e6 !== null && t2.child !== e6.child) throw Error(k(153));
  if (t2.child !== null) {
    for (
      n2 = No((e6 = t2.child), e6.pendingProps), t2.child = n2, n2.return = t2;
      e6.sibling !== null;

    )
      (e6 = e6.sibling), ((n2 = n2.sibling = No(e6, e6.pendingProps)).return = t2);
    n2.sibling = null;
  }
  return t2.child;
}
function tu(e6, t2) {
  return (e6.lanes & t2) !== 0 || !((e6 = e6.dependencies) === null || !wa(e6));
}
function nu(e6, t2, n2) {
  if (e6 !== null)
    if (e6.memoizedProps !== t2.pendingProps) _s = !0;
    else {
      if (!(tu(e6, n2) || 128 & t2.flags))
        return (
          (_s = !1),
          (function (e7, t3, n3) {
            switch (t3.tag) {
              case 3:
                Pe(t3, t3.stateNode.containerInfo), ma(0, Oa, e7.memoizedState.cache), ua();
                break;
              case 27:
              case 5:
                Te(t3);
                break;
              case 4:
                Pe(t3, t3.stateNode.containerInfo);
                break;
              case 10:
                ma(0, t3.type, t3.memoizedProps.value);
                break;
              case 31:
                if (t3.memoizedState !== null) return (t3.flags |= 128), Pl(t3), null;
                break;
              case 13:
                var r3 = t3.memoizedState;
                if (r3 !== null) {
                  if (r3.dehydrated !== null) return _l(t3), (t3.flags |= 128), null;
                  r3 = ba(e7, t3, n3, !1);
                  var o3 = t3.child.childLanes;
                  return r3 || n3 & o3
                    ? Us(e7, t3, n3)
                    : (_l(t3), (e7 = eu(e7, t3, n3)) !== null ? e7.sibling : null);
                }
                _l(t3);
                break;
              case 19:
                if (128 & t3.flags) return Js(e7, t3, n3);
                if (
                  ((o3 = !!(128 & e7.flags)),
                  (r3 = (n3 & t3.childLanes) !== 0) ||
                    (ba(e7, t3, n3, !1), (r3 = (n3 & t3.childLanes) !== 0)),
                  o3)
                ) {
                  if (r3) return Js(e7, t3, n3);
                  t3.flags |= 128;
                }
                if (
                  ((o3 = t3.memoizedState) !== null &&
                    ((o3.rendering = null), (o3.tail = null), (o3.lastEffect = null)),
                  Ml(0, $l.current),
                  r3)
                )
                  break;
                return null;
              case 22:
                return (t3.lanes = 0), $s(e7, t3, n3, t3.pendingProps);
              case 24:
                ma(0, Oa, e7.memoizedState.cache);
            }
            return eu(e7, t3, n3);
          })(e6, t2, n2)
        );
      _s = !!(131072 & e6.flags);
    }
  else (_s = !1), ta && 1048576 & t2.flags && Go(t2, Vo, t2.index);
  switch (((t2.lanes = 0), t2.tag)) {
    case 16:
      e: {
        var r2 = t2.pendingProps;
        if (((e6 = Ga(t2.elementType)), (t2.type = e6), typeof e6 != "function")) {
          if (e6 != null) {
            var o2 = e6.$$typeof;
            if (o2 === J) {
              (t2.tag = 11), (t2 = Os(null, t2, e6, r2, n2));
              break e;
            }
            if (o2 === te) {
              (t2.tag = 14), (t2 = Ts(null, t2, e6, r2, n2));
              break e;
            }
            if (o2 === Q) {
              (t2.tag = 10), (t2.type = e6), (t2 = Zs(null, t2, n2));
              break e;
            }
          }
          throw ((t2 = de(e6) || e6), Error(k(306, t2, "")));
        }
        To(e6)
          ? ((r2 = gs(e6, r2)), (t2.tag = 1), (t2 = js(null, t2, e6, r2, n2)))
          : ((t2.tag = 0), (t2 = Fs(null, t2, e6, r2, n2)));
      }
      return t2;
    case 0:
      return Fs(e6, t2, t2.type, t2.pendingProps, n2);
    case 1:
      return js(e6, t2, (r2 = t2.type), (o2 = gs(r2, t2.pendingProps)), n2);
    case 3:
      e: {
        if ((Pe(t2, t2.stateNode.containerInfo), e6 === null)) throw Error(k(387));
        r2 = t2.pendingProps;
        var a2 = t2.memoizedState;
        (o2 = a2.element), ul(e6, t2), gl(t2, r2, null, n2);
        var l2 = t2.memoizedState;
        if (
          ((r2 = l2.cache),
          ma(0, Oa, r2),
          r2 !== a2.cache && ya(t2, [Oa], n2, !0),
          ml(),
          (r2 = l2.element),
          a2.isDehydrated)
        ) {
          if (
            ((a2 = { element: r2, isDehydrated: !1, cache: l2.cache }),
            (t2.updateQueue.baseState = a2),
            (t2.memoizedState = a2),
            256 & t2.flags)
          ) {
            t2 = Ds(e6, t2, r2, n2);
            break e;
          }
          if (r2 !== o2) {
            da((o2 = zo(Error(k(424)), t2))), (t2 = Ds(e6, t2, r2, n2));
            break e;
          }
          for (
            (e6 = t2.stateNode.containerInfo).nodeType === 9
              ? (e6 = e6.body)
              : (e6 = e6.nodeName === "HTML" ? e6.ownerDocument.body : e6),
              ea = Xp(e6.firstChild),
              Zo = t2,
              ta = !0,
              na = null,
              ra = !0,
              n2 = ll(t2, null, r2, n2),
              t2.child = n2;
            n2;

          )
            (n2.flags = (-3 & n2.flags) | 134221824), (n2 = n2.sibling);
        } else {
          if ((ua(), r2 === o2)) {
            t2 = eu(e6, t2, n2);
            break e;
          }
          Ps(e6, t2, r2, n2);
        }
        t2 = t2.child;
      }
      return t2;
    case 26:
      return (
        As(e6, t2),
        e6 === null
          ? (n2 = lh(t2.type, null, t2.pendingProps, null))
            ? (t2.memoizedState = n2)
            : ta || (t2.stateNode = rp(t2.type, t2.pendingProps, Ce.current, t2))
          : (t2.memoizedState = lh(t2.type, e6.memoizedProps, t2.pendingProps, e6.memoizedState)),
        null
      );
    case 27:
      return (
        Te(t2),
        e6 === null &&
          ta &&
          ((r2 = t2.stateNode = Qp(t2.type, t2.pendingProps, Ce.current)),
          (Zo = t2),
          (ra = !0),
          (o2 = ea),
          fp(t2.type) ? ((Kp = o2), (ea = Xp(r2.firstChild))) : (ea = o2)),
        Ps(e6, t2, t2.pendingProps.children, n2),
        As(e6, t2),
        e6 === null && (t2.flags |= 4194304),
        t2.child
      );
    case 5:
      return (
        e6 === null &&
          ta &&
          ((o2 = r2 = ea) &&
            ((r2 = (function (e7, t3, n3, r3) {
              for (; e7.nodeType === 1; ) {
                var o3 = n3;
                if (e7.nodeName.toLowerCase() !== t3.toLowerCase()) {
                  if (!r3 && (e7.nodeName !== "INPUT" || e7.type !== "hidden")) break;
                } else if (r3) {
                  if (!e7[Ot])
                    switch (t3) {
                      case "meta":
                        if (!e7.hasAttribute("itemprop")) break;
                        return e7;
                      case "link":
                        if (
                          ((a3 = e7.getAttribute("rel")) === "stylesheet" &&
                            e7.hasAttribute("data-precedence")) ||
                          a3 !== o3.rel ||
                          e7.getAttribute("href") !==
                            (o3.href == null || o3.href === "" ? null : o3.href) ||
                          e7.getAttribute("crossorigin") !==
                            (o3.crossOrigin == null ? null : o3.crossOrigin) ||
                          e7.getAttribute("title") !== (o3.title == null ? null : o3.title)
                        )
                          break;
                        return e7;
                      case "style":
                        if (e7.hasAttribute("data-precedence")) break;
                        return e7;
                      case "script":
                        if (
                          ((a3 = e7.getAttribute("src")) !== (o3.src == null ? null : o3.src) ||
                            e7.getAttribute("type") !== (o3.type == null ? null : o3.type) ||
                            e7.getAttribute("crossorigin") !==
                              (o3.crossOrigin == null ? null : o3.crossOrigin)) &&
                          a3 &&
                          e7.hasAttribute("async") &&
                          !e7.hasAttribute("itemprop")
                        )
                          break;
                        return e7;
                      default:
                        return e7;
                    }
                } else {
                  if (t3 !== "input" || e7.type !== "hidden") return e7;
                  var a3 = o3.name == null ? null : "" + o3.name;
                  if (o3.type === "hidden" && e7.getAttribute("name") === a3) return e7;
                }
                if ((e7 = Xp(e7.nextSibling)) === null) break;
              }
              return null;
            })(r2, t2.type, t2.pendingProps, ra)) !== null
              ? ((t2.stateNode = r2), (Zo = t2), (ea = Xp(r2.firstChild)), (ra = !1), (o2 = !0))
              : (o2 = !1)),
          o2 || aa(t2)),
        Te(t2),
        (o2 = t2.type),
        (a2 = t2.pendingProps),
        (l2 = e6 !== null ? e6.memoizedProps : null),
        (r2 = a2.children),
        op(o2, a2) ? (r2 = null) : l2 !== null && op(o2, l2) && (t2.flags |= 32),
        t2.memoizedState !== null &&
          ((o2 = Kl(e6, t2, Ql, null, null, n2)), (Nh._currentValue = o2)),
        As(e6, t2),
        Ps(e6, t2, r2, n2),
        t2.child
      );
    case 6:
      return (
        e6 === null &&
          ta &&
          ((e6 = n2 = ea) &&
            ((n2 = (function (e7, t3, n3) {
              if (t3 === "") return null;
              for (; e7.nodeType !== 3; )
                if (
                  ((e7.nodeType !== 1 || e7.nodeName !== "INPUT" || e7.type !== "hidden") && !n3) ||
                  (e7 = Xp(e7.nextSibling)) === null
                )
                  return null;
              return e7;
            })(n2, t2.pendingProps, ra)) !== null
              ? ((t2.stateNode = n2), (Zo = t2), (ea = null), (e6 = !0))
              : (e6 = !1)),
          e6 || aa(t2)),
        null
      );
    case 13:
      return Us(e6, t2, n2);
    case 4:
      return (
        Pe(t2, t2.stateNode.containerInfo),
        (r2 = t2.pendingProps),
        e6 === null ? (t2.child = al(t2, null, r2, n2)) : Ps(e6, t2, r2, n2),
        t2.child
      );
    case 11:
      return Os(e6, t2, t2.type, t2.pendingProps, n2);
    case 7:
      return (r2 = t2.pendingProps), As(e6, t2), Ps(e6, t2, r2, n2), t2.child;
    case 8:
    case 12:
      return Ps(e6, t2, t2.pendingProps.children, n2), t2.child;
    case 10:
      return Zs(e6, t2, n2);
    case 9:
      return (
        (o2 = t2.type._context),
        (r2 = t2.pendingProps.children),
        Ea(t2),
        (r2 = r2((o2 = Sa(o2)))),
        (t2.flags |= 1),
        Ps(e6, t2, r2, n2),
        t2.child
      );
    case 14:
      return Ts(e6, t2, t2.type, t2.pendingProps, n2);
    case 15:
      return Ns(e6, t2, t2.type, t2.pendingProps, n2);
    case 19:
      return Js(e6, t2, n2);
    case 31:
      return (function (e7, t3, n3) {
        var r3 = t3.pendingProps,
          o3 = !!(128 & t3.flags);
        if (((t3.flags &= -129), e7 === null)) {
          if (ta) {
            if (r3.mode === "hidden")
              return (
                (e7 = Ls(t3, r3)),
                (t3.lanes = 536870912),
                (e7.memoizedState = { baseLanes: 0, cachePool: null }),
                Ms(null, e7)
              );
            if (
              (Pl(t3),
              (e7 = ea)
                ? (e7 = (e7 = Up(e7, ra)) !== null && e7.data === "&" ? e7 : null) !== null &&
                  ((t3.memoizedState = {
                    dehydrated: e7,
                    treeContext: Wo !== null ? { id: qo, overflow: Xo } : null,
                    retryLane: 536870912,
                    hydrationErrors: null,
                  }),
                  ((n3 = Io(e7)).return = t3),
                  (t3.child = n3),
                  (Zo = t3),
                  (ea = null))
                : (e7 = null),
              e7 === null)
            )
              throw aa(t3);
            return (t3.lanes = 536870912), null;
          }
          return Ls(t3, r3);
        }
        var a3 = e7.memoizedState;
        if (a3 !== null) {
          var l3 = a3.dehydrated;
          if ((Pl(t3), o3))
            if (256 & t3.flags) (t3.flags &= -257), (t3 = Is(e7, t3, n3));
            else {
              if (t3.memoizedState === null) throw Error(k(558));
              (t3.child = e7.child), (t3.flags |= 128), (t3 = null);
            }
          else if ((_s || ba(e7, t3, n3, !1), (o3 = (n3 & e7.childLanes) !== 0), _s || o3)) {
            if (bl.current === null) {
              if ((r3 = Wc) !== null && (l3 = mt(r3, n3)) !== 0 && l3 !== a3.retryLane)
                throw ((a3.retryLane = l3), xo(e7, l3), Td(r3, e7, l3), Cs);
              Hd();
            }
            t3 = Is(e7, t3, n3);
          } else
            (e7 = a3.treeContext),
              (ea = Xp(l3.nextSibling)),
              (Zo = t3),
              (ta = !0),
              (na = null),
              (ra = !1),
              e7 !== null && Jo(t3, e7),
              ((t3 = Ls(t3, r3)).flags |= 134221824);
          return t3;
        }
        return (
          ((e7 = No(e7.child, { mode: r3.mode, children: r3.children })).ref = t3.ref),
          (t3.child = e7),
          (e7.return = t3),
          e7
        );
      })(e6, t2, n2);
    case 22:
      return $s(e6, t2, n2, t2.pendingProps);
    case 24:
      return (
        Ea(t2),
        (r2 = Sa(Oa)),
        e6 === null
          ? ((o2 = Da()) === null &&
              ((o2 = Wc),
              (a2 = Ta()),
              (o2.pooledCache = a2),
              a2.refCount++,
              a2 !== null && (o2.pooledCacheLanes |= n2),
              (o2 = a2)),
            (t2.memoizedState = { parent: r2, cache: o2 }),
            sl(t2),
            ma(0, Oa, o2))
          : (e6.lanes & n2 && (ul(e6, t2), gl(t2, null, null, n2), ml()),
            (o2 = e6.memoizedState),
            (a2 = t2.memoizedState),
            o2.parent !== r2
              ? ((o2 = { parent: r2, cache: r2 }),
                (t2.memoizedState = o2),
                t2.lanes === 0 && (t2.memoizedState = t2.updateQueue.baseState = o2),
                ma(0, Oa, r2))
              : ((r2 = a2.cache), ma(0, Oa, r2), r2 !== o2.cache && ya(t2, [Oa], n2, !0))),
        Ps(e6, t2, t2.pendingProps.children, n2),
        t2.child
      );
    case 30:
      return (
        t2.stateNode === null &&
          (t2.stateNode = { autoName: null, paired: null, clones: null, ref: null }),
        (r2 = t2.pendingProps).name != null && r2.name !== "auto"
          ? (t2.flags |= e6 === null ? 18882560 : 18874368)
          : ta && Yo(t2),
        e6 !== null && e6.memoizedProps.name !== r2.name ? (t2.flags |= 4194816) : As(e6, t2),
        Ps(e6, t2, r2.children, n2),
        t2.child
      );
    case 29:
      throw t2.pendingProps;
  }
  throw Error(k(156, t2.tag));
}
function ru(e6) {
  e6.flags |= 4;
}
function ou(e6, t2, n2, r2, o2) {
  var a2;
  if (
    ((a2 = !!(32 & e6.mode)) &&
      (a2 =
        n2 === null ? bh(t2, r2) : bh(t2, r2) && (r2.src !== n2.src || r2.srcSet !== n2.srcSet)),
    a2)
  ) {
    if (((e6.flags |= 16777216), (335544128 & o2) === o2))
      if (e6.stateNode.complete) e6.flags |= 8192;
      else {
        if (!zd()) throw ((Ya = qa), Ua);
        e6.flags |= 8192;
      }
  } else e6.flags &= -16777217;
}
function au(e6, t2) {
  if (t2.type !== "stylesheet" || 4 & t2.state.loading) e6.flags &= -16777217;
  else if (((e6.flags |= 16777216), !wh(t2))) {
    if (!zd()) throw ((Ya = qa), Ua);
    e6.flags |= 8192;
  }
}
function lu(e6, t2) {
  t2 !== null && (e6.flags |= 4),
    16384 & e6.flags && ((t2 = e6.tag !== 22 ? ct() : 536870912), (e6.lanes |= t2), (ad |= t2));
}
function iu(e6, t2) {
  if (!ta)
    switch (e6.tailMode) {
      case "visible":
        break;
      case "collapsed":
        for (var n2 = e6.tail, r2 = null; n2 !== null; )
          n2.alternate !== null && (r2 = n2), (n2 = n2.sibling);
        r2 === null
          ? t2 || e6.tail === null
            ? (e6.tail = null)
            : (e6.tail.sibling = null)
          : (r2.sibling = null);
        break;
      default:
        for (t2 = e6.tail, n2 = null; t2 !== null; )
          t2.alternate !== null && (n2 = t2), (t2 = t2.sibling);
        n2 === null ? (e6.tail = null) : (n2.sibling = null);
    }
}
function su(e6) {
  var t2 = e6.alternate !== null && e6.alternate.child === e6.child,
    n2 = 0,
    r2 = 0;
  if (t2)
    for (var o2 = e6.child; o2 !== null; )
      (n2 |= o2.lanes | o2.childLanes),
        (r2 |= 1206910976 & o2.subtreeFlags),
        (r2 |= 1206910976 & o2.flags),
        (o2.return = e6),
        (o2 = o2.sibling);
  else
    for (o2 = e6.child; o2 !== null; )
      (n2 |= o2.lanes | o2.childLanes),
        (r2 |= o2.subtreeFlags),
        (r2 |= o2.flags),
        (o2.return = e6),
        (o2 = o2.sibling);
  return (e6.subtreeFlags |= r2), (e6.childLanes = n2), t2;
}
function uu(e6, t2, n2) {
  var r2 = t2.pendingProps;
  switch ((Qo(t2), t2.tag)) {
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
    case 1:
      return su(t2), null;
    case 3:
      return (
        (n2 = t2.stateNode),
        (r2 = null),
        e6 !== null && (r2 = e6.memoizedState.cache),
        t2.memoizedState.cache !== r2 && (t2.flags |= 2048),
        ga(Oa),
        Oe(),
        n2.pendingContext && ((n2.context = n2.pendingContext), (n2.pendingContext = null)),
        (e6 !== null && e6.child !== null) ||
          (sa(t2)
            ? ru(t2)
            : e6 === null ||
              (e6.memoizedState.isDehydrated && !(256 & t2.flags)) ||
              ((t2.flags |= 1024), ca())),
        su(t2),
        null
      );
    case 26:
      var o2 = t2.type,
        a2 = t2.memoizedState;
      return (
        e6 === null
          ? (ru(t2), a2 !== null ? (su(t2), au(t2, a2)) : (su(t2), ou(t2, o2, null, r2, n2)))
          : a2
            ? a2 !== e6.memoizedState
              ? (ru(t2), su(t2), au(t2, a2))
              : (su(t2), (t2.flags &= -16777217))
            : ((e6 = e6.memoizedProps) !== r2 && ru(t2), su(t2), ou(t2, o2, e6, r2, n2)),
        null
      );
    case 27:
      if ((Ne(t2), (n2 = Ce.current), (o2 = t2.type), e6 !== null && t2.stateNode != null))
        e6.memoizedProps !== r2 && ru(t2);
      else {
        if (!r2) {
          if (t2.stateNode === null) throw Error(k(166));
          return su(t2), (t2.subtreeFlags &= -33554433), null;
        }
        (e6 = xe.current), sa(t2) ? la(t2) : ((e6 = Qp(o2, r2, n2)), (t2.stateNode = e6), ru(t2));
      }
      return su(t2), (t2.subtreeFlags &= -33554433), null;
    case 5:
      if ((Ne(t2), (o2 = t2.type), e6 !== null && t2.stateNode != null))
        e6.memoizedProps !== r2 && ru(t2);
      else {
        if (!r2) {
          if (t2.stateNode === null) throw Error(k(166));
          return su(t2), (t2.subtreeFlags &= -33554433), null;
        }
        if (((a2 = xe.current), sa(t2))) la(t2);
        else {
          var l2 = ep(Ce.current);
          switch (a2) {
            case 1:
              a2 = l2.createElementNS("http://www.w3.org/2000/svg", o2);
              break;
            case 2:
              a2 = l2.createElementNS("http://www.w3.org/1998/Math/MathML", o2);
              break;
            default:
              switch (o2) {
                case "svg":
                  a2 = l2.createElementNS("http://www.w3.org/2000/svg", o2);
                  break;
                case "math":
                  a2 = l2.createElementNS("http://www.w3.org/1998/Math/MathML", o2);
                  break;
                case "script":
                  ((a2 = l2.createElement("div")).innerHTML = "<script></script>"),
                    (a2 = a2.removeChild(a2.firstChild));
                  break;
                case "select":
                  (a2 =
                    typeof r2.is == "string"
                      ? l2.createElement("select", { is: r2.is })
                      : l2.createElement("select")),
                    r2.multiple ? (a2.multiple = !0) : r2.size && (a2.size = r2.size);
                  break;
                default:
                  a2 =
                    typeof r2.is == "string"
                      ? l2.createElement(o2, { is: r2.is })
                      : l2.createElement(o2);
              }
          }
          (a2[Et] = t2), (a2[St] = r2);
          e: for (l2 = t2.child; l2 !== null; ) {
            if (l2.tag === 5 || l2.tag === 6) a2.appendChild(l2.stateNode);
            else if (l2.tag !== 4 && l2.tag !== 27 && l2.child !== null) {
              (l2.child.return = l2), (l2 = l2.child);
              continue;
            }
            if (l2 === t2) break e;
            for (; l2.sibling === null; ) {
              if (l2.return === null || l2.return === t2) break e;
              l2 = l2.return;
            }
            (l2.sibling.return = l2.return), (l2 = l2.sibling);
          }
          t2.stateNode = a2;
          e: switch ((Gf(a2, o2, r2), o2)) {
            case "button":
            case "input":
            case "select":
            case "textarea":
              r2 = !!r2.autoFocus;
              break e;
            case "img":
              r2 = !0;
              break e;
            default:
              r2 = !1;
          }
          r2 && ru(t2);
        }
      }
      return (
        su(t2),
        (t2.subtreeFlags &= -33554433),
        ou(t2, t2.type, e6 === null ? null : e6.memoizedProps, t2.pendingProps, n2),
        null
      );
    case 6:
      if (e6 && t2.stateNode != null) e6.memoizedProps !== r2 && ru(t2);
      else {
        if (typeof r2 != "string" && t2.stateNode === null) throw Error(k(166));
        if (((e6 = Ce.current), sa(t2))) {
          if (((e6 = t2.stateNode), (n2 = t2.memoizedProps), (r2 = null), (o2 = Zo) !== null))
            switch (o2.tag) {
              case 27:
              case 5:
                r2 = o2.memoizedProps;
            }
          (e6[Et] = t2),
            (e6 = !!(
              e6.nodeValue === n2 ||
              (r2 !== null && r2.suppressHydrationWarning === !0) ||
              qf(e6.nodeValue, n2)
            )) || aa(t2, !0);
        } else ((e6 = ep(e6).createTextNode(r2))[Et] = t2), (t2.stateNode = e6);
      }
      return su(t2), null;
    case 31:
      if (((n2 = t2.memoizedState), e6 === null || e6.memoizedState !== null)) {
        if (((r2 = sa(t2)), n2 !== null)) {
          if (e6 === null) {
            if (!r2) throw Error(k(318));
            if (!(e6 = (e6 = t2.memoizedState) !== null ? e6.dehydrated : null))
              throw Error(k(557));
            e6[Et] = t2;
          } else ua(), !(128 & t2.flags) && (t2.memoizedState = null), (t2.flags |= 4);
          su(t2), (e6 = !1);
        } else
          (n2 = ca()),
            e6 !== null && e6.memoizedState !== null && (e6.memoizedState.hydrationErrors = n2),
            (e6 = !0);
        if (!e6) return 256 & t2.flags ? (Nl(t2), t2) : (Nl(t2), null);
        if (128 & t2.flags) throw Error(k(558));
      }
      return su(t2), null;
    case 13:
      if (
        ((r2 = t2.memoizedState),
        e6 === null || (e6.memoizedState !== null && e6.memoizedState.dehydrated !== null))
      ) {
        if (((o2 = sa(t2)), r2 !== null && r2.dehydrated !== null)) {
          if (e6 === null) {
            if (!o2) throw Error(k(318));
            if (!(o2 = (o2 = t2.memoizedState) !== null ? o2.dehydrated : null))
              throw Error(k(317));
            o2[Et] = t2;
          } else ua(), !(128 & t2.flags) && (t2.memoizedState = null), (t2.flags |= 4);
          su(t2), (o2 = !1);
        } else
          (o2 = ca()),
            e6 !== null && e6.memoizedState !== null && (e6.memoizedState.hydrationErrors = o2),
            (o2 = !0);
        if (!o2) return 256 & t2.flags ? (Nl(t2), t2) : (Nl(t2), null);
      }
      return (
        Nl(t2),
        128 & t2.flags
          ? ((t2.lanes = n2), t2)
          : ((n2 = r2 !== null),
            (e6 = e6 !== null && e6.memoizedState !== null),
            n2 &&
              ((o2 = null),
              (r2 = t2.child).alternate !== null &&
                r2.alternate.memoizedState !== null &&
                r2.alternate.memoizedState.cachePool !== null &&
                (o2 = r2.alternate.memoizedState.cachePool.pool),
              (a2 = null),
              r2.memoizedState !== null &&
                r2.memoizedState.cachePool !== null &&
                (a2 = r2.memoizedState.cachePool.pool),
              a2 !== o2 && (r2.flags |= 2048)),
            n2 !== e6 && n2 && (t2.child.flags |= 8192),
            lu(t2, t2.updateQueue),
            su(t2),
            null)
      );
    case 4:
      return (
        Oe(), e6 === null && Af(t2.stateNode.containerInfo), (t2.flags |= 67108864), su(t2), null
      );
    case 10:
      return ga(t2.type), su(t2), null;
    case 19:
      if ((Rl(t2), (r2 = t2.memoizedState) === null)) return su(t2), null;
      if (((o2 = !!(128 & t2.flags)), (a2 = r2.rendering) === null))
        if (o2) iu(r2, !1);
        else {
          if (ed !== 0 || (e6 !== null && 128 & e6.flags))
            for (e6 = t2.child; e6 !== null; ) {
              if ((a2 = Ll(e6)) !== null) {
                for (
                  t2.flags |= 128,
                    iu(r2, !1),
                    e6 = a2.updateQueue,
                    t2.updateQueue = e6,
                    lu(t2, e6),
                    t2.subtreeFlags = 0,
                    e6 = n2,
                    n2 = t2.child;
                  n2 !== null;

                )
                  $o(n2, e6), (n2 = n2.sibling);
                return Ml(0, (1 & $l.current) | 2), ta && Ko(t2, r2.treeForkCount), t2.child;
              }
              e6 = e6.sibling;
            }
          r2.tail !== null &&
            He() > dd &&
            ((t2.flags |= 128), (o2 = !0), iu(r2, !1), (t2.lanes = 4194304));
        }
      else {
        if (!o2)
          if ((e6 = Ll(a2)) !== null) {
            if (
              ((t2.flags |= 128),
              (o2 = !0),
              (e6 = e6.updateQueue),
              (t2.updateQueue = e6),
              lu(t2, e6),
              iu(r2, !0),
              r2.tail === null &&
                r2.tailMode !== "collapsed" &&
                r2.tailMode !== "visible" &&
                !a2.alternate &&
                !ta)
            )
              return su(t2), null;
          } else
            2 * He() - r2.renderingStartTime > dd &&
              n2 !== 536870912 &&
              ((t2.flags |= 128), (o2 = !0), iu(r2, !1), (t2.lanes = 4194304));
        r2.isBackwards
          ? ((a2.sibling = t2.child), (t2.child = a2))
          : ((e6 = r2.last) !== null ? (e6.sibling = a2) : (t2.child = a2), (r2.last = a2));
      }
      if (r2.tail !== null) {
        e: {
          for (n2 = e6 = r2.tail; n2 !== null; ) {
            if (n2.alternate !== null) {
              n2 = !1;
              break e;
            }
            n2 = n2.sibling;
          }
          n2 = !0;
        }
        return (
          (r2.rendering = e6),
          (r2.tail = e6.sibling),
          (r2.renderingStartTime = He()),
          (e6.sibling = null),
          (a2 = $l.current),
          (a2 = o2 ? (1 & a2) | 2 : 1 & a2),
          r2.tailMode === "visible" || r2.tailMode === "collapsed" || !n2 || ta
            ? Ml(0, a2)
            : ((n2 = a2), we(kl, t2), we($l, n2), Cl === null && (Cl = t2)),
          ta && Ko(t2, r2.treeForkCount),
          e6
        );
      }
      return su(t2), null;
    case 22:
    case 23:
      return (
        Nl(t2),
        xl(),
        (r2 = t2.memoizedState !== null),
        e6 !== null
          ? (e6.memoizedState !== null) !== r2 && (t2.flags |= 8192)
          : r2 && (t2.flags |= 8192),
        r2
          ? 536870912 & n2 &&
            !(128 & t2.flags) &&
            (su(t2), 6 & t2.subtreeFlags && (t2.flags |= 8192))
          : su(t2),
        (n2 = t2.updateQueue) !== null && lu(t2, n2.retryQueue),
        (n2 = null),
        e6 !== null &&
          e6.memoizedState !== null &&
          e6.memoizedState.cachePool !== null &&
          (n2 = e6.memoizedState.cachePool.pool),
        (r2 = null),
        t2.memoizedState !== null &&
          t2.memoizedState.cachePool !== null &&
          (r2 = t2.memoizedState.cachePool.pool),
        r2 !== n2 && (t2.flags |= 2048),
        e6 !== null && be(ja),
        null
      );
    case 24:
      return (
        (n2 = null),
        e6 !== null && (n2 = e6.memoizedState.cache),
        t2.memoizedState.cache !== n2 && (t2.flags |= 2048),
        ga(Oa),
        su(t2),
        null
      );
    case 25:
      return null;
    case 30:
      return (t2.flags |= 33554432), su(t2), null;
  }
  throw Error(k(156, t2.tag));
}
function cu(e6, t2) {
  switch ((Qo(t2), t2.tag)) {
    case 1:
      return 65536 & (e6 = t2.flags) ? ((t2.flags = (-65537 & e6) | 128), t2) : null;
    case 3:
      return (
        ga(Oa),
        Oe(),
        65536 & (e6 = t2.flags) && !(128 & e6) ? ((t2.flags = (-65537 & e6) | 128), t2) : null
      );
    case 26:
    case 27:
    case 5:
      return Ne(t2), null;
    case 31:
      if (t2.memoizedState !== null) {
        if ((Nl(t2), t2.alternate === null)) throw Error(k(340));
        ua();
      }
      return 65536 & (e6 = t2.flags) ? ((t2.flags = (-65537 & e6) | 128), t2) : null;
    case 13:
      if ((Nl(t2), (e6 = t2.memoizedState) !== null && e6.dehydrated !== null)) {
        if (t2.alternate === null) throw Error(k(340));
        ua();
      }
      return 65536 & (e6 = t2.flags) ? ((t2.flags = (-65537 & e6) | 128), t2) : null;
    case 19:
      return (
        Rl(t2),
        65536 & (e6 = t2.flags)
          ? ((t2.flags = (-65537 & e6) | 128),
            (e6 = t2.memoizedState) !== null && ((e6.rendering = null), (e6.tail = null)),
            (t2.flags |= 4),
            t2)
          : null
      );
    case 4:
      return Oe(), null;
    case 10:
      return ga(t2.type), null;
    case 22:
    case 23:
      return (
        Nl(t2),
        xl(),
        e6 !== null && be(ja),
        65536 & (e6 = t2.flags) ? ((t2.flags = (-65537 & e6) | 128), t2) : null
      );
    case 24:
      return ga(Oa), null;
    default:
      return null;
  }
}
function du(e6, t2) {
  switch ((Qo(t2), t2.tag)) {
    case 3:
      ga(Oa), Oe();
      break;
    case 26:
    case 27:
    case 5:
      Ne(t2);
      break;
    case 4:
      Oe();
      break;
    case 31:
      t2.memoizedState !== null && Nl(t2);
      break;
    case 13:
      Nl(t2);
      break;
    case 19:
      Rl(t2);
      break;
    case 10:
      ga(t2.type);
      break;
    case 22:
    case 23:
      Nl(t2), xl(), e6 !== null && be(ja);
      break;
    case 24:
      ga(Oa);
  }
}
function fu(e6, t2) {
  try {
    var n2 = t2.updateQueue,
      r2 = n2 !== null ? n2.lastEffect : null;
    if (r2 !== null) {
      var o2 = r2.next;
      n2 = o2;
      do {
        if ((n2.tag & e6) === e6) {
          r2 = void 0;
          var a2 = n2.create,
            l2 = n2.inst;
          (r2 = a2()), (l2.destroy = r2);
        }
        n2 = n2.next;
      } while (n2 !== o2);
    }
  } catch (i2) {
    lf(t2, t2.return, i2);
  }
}
function pu(e6, t2, n2) {
  try {
    var r2 = t2.updateQueue,
      o2 = r2 !== null ? r2.lastEffect : null;
    if (o2 !== null) {
      var a2 = o2.next;
      r2 = a2;
      do {
        if ((r2.tag & e6) === e6) {
          var l2 = r2.inst,
            i2 = l2.destroy;
          if (i2 !== void 0) {
            (l2.destroy = void 0), (o2 = t2);
            var s2 = n2,
              u2 = i2;
            try {
              u2();
            } catch (c2) {
              lf(o2, s2, c2);
            }
          }
        }
        r2 = r2.next;
      } while (r2 !== a2);
    }
  } catch (c2) {
    lf(t2, t2.return, c2);
  }
}
function hu(e6) {
  var t2 = e6.updateQueue;
  if (t2 !== null) {
    var n2 = e6.stateNode;
    try {
      yl(t2, n2);
    } catch (r2) {
      lf(e6, e6.return, r2);
    }
  }
}
function mu(e6, t2, n2) {
  (n2.props = gs(e6.type, e6.memoizedProps)), (n2.state = e6.memoizedState);
  try {
    n2.componentWillUnmount();
  } catch (r2) {
    lf(e6, t2, r2);
  }
}
function gu(e6, t2) {
  try {
    var n2 = e6.ref;
    if (n2 !== null) {
      switch (e6.tag) {
        case 26:
        case 27:
        case 5:
          var r2 = e6.stateNode;
          break;
        case 30:
          var o2 = e6.stateNode,
            a2 = po(e6.memoizedProps, o2);
          (o2.ref !== null && o2.ref.name === a2) || (o2.ref = Sp(a2)), (r2 = o2.ref);
          break;
        case 7:
          if (e6.stateNode === null) {
            var l2 = new xp(e6);
            $(e6.child, !1, jp, l2, void 0, void 0), (e6.stateNode = l2);
          }
          r2 = e6.stateNode;
          break;
        default:
          r2 = e6.stateNode;
      }
      typeof n2 == "function" ? (e6.refCleanup = n2(r2)) : (n2.current = r2);
    }
  } catch (i2) {
    lf(e6, t2, i2);
  }
}
function vu(e6, t2) {
  var n2 = e6.ref,
    r2 = e6.refCleanup;
  if (n2 !== null)
    if (typeof r2 == "function")
      try {
        r2();
      } catch (o2) {
        lf(e6, t2, o2);
      } finally {
        (e6.refCleanup = null), (e6 = e6.alternate) != null && (e6.refCleanup = null);
      }
    else if (typeof n2 == "function")
      try {
        n2(null);
      } catch (a2) {
        lf(e6, t2, a2);
      }
    else n2.current = null;
}
function yu(e6, t2) {
  if ((e6.tag === 5 || e6.tag === 27 || e6.tag === 6) && e6.alternate === null && t2 !== null)
    for (var n2 = 0; n2 < t2.length; n2++) Hp(e6.stateNode, t2[n2]);
}
function bu(e6) {
  for (var t2 = e6.return; t2 !== null && (Su(t2) && Hp(e6.stateNode, t2.stateNode), !Eu(t2)); )
    t2 = t2.return;
}
function wu(e6) {
  for (var t2 = e6.return; t2 !== null && (Su(t2) && Vp(e6.stateNode, t2.stateNode), !Eu(t2)); )
    t2 = t2.return;
}
function Eu(e6) {
  return e6.tag === 5 || e6.tag === 3 || e6.tag === 27;
}
function Su(e6) {
  return e6 && e6.tag === 7 && e6.stateNode !== null;
}
function xu(e6) {
  var t2 = e6.type,
    n2 = e6.memoizedProps,
    r2 = e6.stateNode;
  try {
    e: switch (t2) {
      case "button":
      case "input":
      case "select":
      case "textarea":
        n2.autoFocus && r2.focus();
        break e;
      case "img":
        n2.src ? (r2.src = n2.src) : n2.srcSet && (r2.srcset = n2.srcSet);
    }
  } catch (o2) {
    lf(e6, e6.return, o2);
  }
}
function ku(e6, t2, n2) {
  try {
    var r2 = e6.stateNode;
    (function (e7, t3, n3, r3) {
      switch (t3) {
        case "div":
        case "span":
        case "svg":
        case "path":
        case "a":
        case "g":
        case "p":
        case "li":
          break;
        case "input":
          var o2 = null,
            a2 = null,
            l2 = null,
            i2 = null,
            s2 = null,
            u2 = null,
            c2 = null;
          for (p2 in n3) {
            var d2 = n3[p2];
            if (n3.hasOwnProperty(p2) && d2 != null)
              switch (p2) {
                case "checked":
                case "value":
                  break;
                case "defaultValue":
                  s2 = d2;
                default:
                  r3.hasOwnProperty(p2) || Xf(e7, t3, p2, null, r3, d2);
              }
          }
          for (var f2 in r3) {
            var p2 = r3[f2];
            if (((d2 = n3[f2]), r3.hasOwnProperty(f2) && (p2 != null || d2 != null)))
              switch (f2) {
                case "type":
                  p2 !== d2 && (Ut = !0), (a2 = p2);
                  break;
                case "name":
                  p2 !== d2 && (Ut = !0), (o2 = p2);
                  break;
                case "checked":
                  p2 !== d2 && (Ut = !0), (u2 = p2);
                  break;
                case "defaultChecked":
                  p2 !== d2 && (Ut = !0), (c2 = p2);
                  break;
                case "value":
                  p2 !== d2 && (Ut = !0), (l2 = p2);
                  break;
                case "defaultValue":
                  p2 !== d2 && (Ut = !0), (i2 = p2);
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (p2 != null) throw Error(k(137, t3));
                  break;
                default:
                  p2 !== d2 && Xf(e7, t3, f2, p2, r3, d2);
              }
          }
          return void tn(e7, l2, i2, s2, u2, c2, a2, o2);
        case "select":
          for (a2 in ((p2 = l2 = i2 = f2 = null), n3))
            if (((s2 = n3[a2]), n3.hasOwnProperty(a2) && s2 != null))
              switch (a2) {
                case "value":
                  break;
                case "multiple":
                  p2 = s2;
                default:
                  r3.hasOwnProperty(a2) || Xf(e7, t3, a2, null, r3, s2);
              }
          for (o2 in r3)
            if (((a2 = r3[o2]), (s2 = n3[o2]), r3.hasOwnProperty(o2) && (a2 != null || s2 != null)))
              switch (o2) {
                case "value":
                  a2 !== s2 && (Ut = !0), (f2 = a2);
                  break;
                case "defaultValue":
                  a2 !== s2 && (Ut = !0), (i2 = a2);
                  break;
                case "multiple":
                  a2 !== s2 && (Ut = !0), (l2 = a2);
                default:
                  a2 !== s2 && Xf(e7, t3, o2, a2, r3, s2);
              }
          return (
            (t3 = i2),
            (n3 = l2),
            (r3 = p2),
            void (f2 != null
              ? on(e7, !!n3, f2, !1)
              : !!r3 != !!n3 &&
                (t3 != null ? on(e7, !!n3, t3, !0) : on(e7, !!n3, n3 ? [] : "", !1)))
          );
        case "textarea":
          for (i2 in ((p2 = f2 = null), n3))
            if (((o2 = n3[i2]), n3.hasOwnProperty(i2) && o2 != null && !r3.hasOwnProperty(i2)))
              switch (i2) {
                case "value":
                case "children":
                  break;
                default:
                  Xf(e7, t3, i2, null, r3, o2);
              }
          for (l2 in r3)
            if (((o2 = r3[l2]), (a2 = n3[l2]), r3.hasOwnProperty(l2) && (o2 != null || a2 != null)))
              switch (l2) {
                case "value":
                  o2 !== a2 && (Ut = !0), (f2 = o2);
                  break;
                case "defaultValue":
                  o2 !== a2 && (Ut = !0), (p2 = o2);
                  break;
                case "children":
                  break;
                case "dangerouslySetInnerHTML":
                  if (o2 != null) throw Error(k(91));
                  break;
                default:
                  o2 !== a2 && Xf(e7, t3, l2, o2, r3, a2);
              }
          return void an(e7, f2, p2);
        case "option":
          for (var h2 in n3)
            (f2 = n3[h2]),
              n3.hasOwnProperty(h2) &&
                f2 != null &&
                !r3.hasOwnProperty(h2) &&
                (h2 === "selected" ? (e7.selected = !1) : Xf(e7, t3, h2, null, r3, f2));
          for (s2 in r3)
            (f2 = r3[s2]),
              (p2 = n3[s2]),
              r3.hasOwnProperty(s2) &&
                f2 !== p2 &&
                (f2 != null || p2 != null) &&
                (s2 === "selected"
                  ? (f2 !== p2 && (Ut = !0),
                    (e7.selected = f2 && typeof f2 != "function" && typeof f2 != "symbol"))
                  : Xf(e7, t3, s2, f2, r3, p2));
          return;
        case "img":
        case "link":
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "keygen":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
        case "menuitem":
          for (var m2 in n3)
            (f2 = n3[m2]),
              n3.hasOwnProperty(m2) &&
                f2 != null &&
                !r3.hasOwnProperty(m2) &&
                Xf(e7, t3, m2, null, r3, f2);
          for (u2 in r3)
            if (
              ((f2 = r3[u2]),
              (p2 = n3[u2]),
              r3.hasOwnProperty(u2) && f2 !== p2 && (f2 != null || p2 != null))
            )
              switch (u2) {
                case "children":
                case "dangerouslySetInnerHTML":
                  if (f2 != null) throw Error(k(137, t3));
                  break;
                default:
                  Xf(e7, t3, u2, f2, r3, p2);
              }
          return;
        default:
          if (fn(t3)) {
            for (var g2 in n3)
              (f2 = n3[g2]),
                n3.hasOwnProperty(g2) &&
                  f2 !== void 0 &&
                  !r3.hasOwnProperty(g2) &&
                  Kf(e7, t3, g2, void 0, r3, f2);
            for (c2 in r3)
              (f2 = r3[c2]),
                (p2 = n3[c2]),
                !r3.hasOwnProperty(c2) ||
                  f2 === p2 ||
                  (f2 === void 0 && p2 === void 0) ||
                  Kf(e7, t3, c2, f2, r3, p2);
            return;
          }
      }
      for (var v2 in n3)
        (f2 = n3[v2]),
          n3.hasOwnProperty(v2) &&
            f2 != null &&
            !r3.hasOwnProperty(v2) &&
            Xf(e7, t3, v2, null, r3, f2);
      for (d2 in r3)
        (f2 = r3[d2]),
          (p2 = n3[d2]),
          !r3.hasOwnProperty(d2) ||
            f2 === p2 ||
            (f2 == null && p2 == null) ||
            Xf(e7, t3, d2, f2, r3, p2);
    })(r2, e6.type, n2, t2),
      (r2[St] = t2);
  } catch (o2) {
    lf(e6, e6.return, o2);
  }
}
function Cu(e6) {
  return (
    e6.tag === 5 || e6.tag === 3 || e6.tag === 26 || (e6.tag === 27 && fp(e6.type)) || e6.tag === 4
  );
}
function _u(e6) {
  e: for (;;) {
    for (; e6.sibling === null; ) {
      if (e6.return === null || Cu(e6.return)) return null;
      e6 = e6.return;
    }
    for (
      e6.sibling.return = e6.return, e6 = e6.sibling;
      e6.tag !== 5 && e6.tag !== 6 && e6.tag !== 18;

    ) {
      if ((e6.tag === 27 && fp(e6.type)) || 2 & e6.flags || e6.child === null || e6.tag === 4)
        continue e;
      (e6.child.return = e6), (e6 = e6.child);
    }
    if (!(2 & e6.flags)) return e6.stateNode;
  }
}
function Pu(e6, t2, n2, r2) {
  var o2 = e6.tag;
  if (o2 === 5 || o2 === 6)
    (o2 = e6.stateNode),
      t2
        ? (n2.nodeType === 9
            ? n2.body
            : n2.nodeName === "HTML"
              ? n2.ownerDocument.body
              : n2
          ).insertBefore(o2, t2)
        : ((t2 =
            n2.nodeType === 9
              ? n2.body
              : n2.nodeName === "HTML"
                ? n2.ownerDocument.body
                : n2).appendChild(o2),
          (n2 = n2._reactRootContainer) != null || t2.onclick !== null || (t2.onclick = gn)),
      yu(e6, r2),
      (Ut = !0);
  else if (
    o2 !== 4 &&
    (o2 === 27 && (yu(e6, r2), (r2 = null), fp(e6.type) && ((n2 = e6.stateNode), (t2 = null))),
    (e6 = e6.child) !== null)
  )
    for (Pu(e6, t2, n2, r2), e6 = e6.sibling; e6 !== null; ) Pu(e6, t2, n2, r2), (e6 = e6.sibling);
}
function Ou(e6, t2, n2, r2) {
  var o2 = e6.tag;
  if (o2 === 5 || o2 === 6)
    (o2 = e6.stateNode), t2 ? n2.insertBefore(o2, t2) : n2.appendChild(o2), yu(e6, r2), (Ut = !0);
  else if (
    o2 !== 4 &&
    (o2 === 27 && (yu(e6, r2), (r2 = null), fp(e6.type) && (n2 = e6.stateNode)),
    (e6 = e6.child) !== null)
  )
    for (Ou(e6, t2, n2, r2), e6 = e6.sibling; e6 !== null; ) Ou(e6, t2, n2, r2), (e6 = e6.sibling);
}
function Tu(e6) {
  var t2 = e6.stateNode,
    n2 = e6.memoizedProps;
  try {
    for (var r2 = e6.type, o2 = t2.attributes; o2.length; ) t2.removeAttributeNode(o2[0]);
    Gf(t2, r2, n2), (t2[Et] = e6), (t2[St] = n2);
  } catch (a2) {
    lf(e6, e6.return, a2);
  }
}
var Nu = !1,
  $u = null;
function Mu(e6) {
  (e6.tag === 30 || 33554432 & e6.subtreeFlags) && (Nu = !0);
}
var Ru = null;
function Lu() {
  var e6 = Ru;
  return (Ru = null), e6;
}
var Iu = 0;
function Au(e6, t2, n2, r2, o2) {
  return (Iu = 0), Fu(e6.child, t2, n2, r2, o2);
}
function Fu(e6, t2, n2, r2, o2) {
  for (var a2 = !1; e6 !== null; ) {
    if (e6.tag === 5) {
      var l2 = e6.stateNode;
      if (r2 !== null) {
        var i2 = yp(l2);
        r2.push(i2), i2.view && (a2 = !0);
      } else a2 || (yp(l2).view && (a2 = !0));
      (Nu = !0), mp(l2, Iu === 0 ? t2 : t2 + "_" + Iu, n2), Iu++;
    } else
      (e6.tag === 22 && e6.memoizedState !== null) ||
        (e6.tag === 30 && o2) ||
        (Fu(e6.child, t2, n2, r2, o2) && (a2 = !0));
    e6 = e6.sibling;
  }
  return a2;
}
function zu(e6, t2) {
  for (; e6 !== null; )
    e6.tag === 5
      ? gp(e6.stateNode, e6.memoizedProps)
      : (e6.tag === 22 && e6.memoizedState !== null) || (e6.tag === 30 && t2) || zu(e6.child, t2),
      (e6 = e6.sibling);
}
function ju(e6) {
  if (18874368 & e6.subtreeFlags)
    for (e6 = e6.child; e6 !== null; ) {
      if (
        (e6.tag !== 22 || e6.memoizedState === null) &&
        (ju(e6), e6.tag === 30 && 18874368 & e6.flags && e6.stateNode.paired)
      ) {
        var t2 = e6.memoizedProps;
        if (t2.name == null || t2.name === "auto") throw Error(k(544));
        var n2 = t2.name;
        (t2 = mo(t2.default, t2.share)) !== "none" &&
          (Au(e6, n2, t2, null, !1) || zu(e6.child, !1));
      }
      e6 = e6.sibling;
    }
}
function Du(e6, t2) {
  if (e6.tag === 30) {
    var n2 = e6.stateNode,
      r2 = e6.memoizedProps,
      o2 = po(r2, n2),
      a2 = mo(r2.default, n2.paired ? r2.share : r2.enter);
    a2 !== "none"
      ? Au(e6, o2, a2, null, !1)
        ? (ju(e6), n2.paired || t2 || Od(e6, r2.onEnter))
        : zu(e6.child, !1)
      : ju(e6);
  } else if (33554432 & e6.subtreeFlags)
    for (e6 = e6.child; e6 !== null; ) Du(e6, t2), (e6 = e6.sibling);
  else ju(e6);
}
function Hu(e6) {
  if ($u !== null && $u.size !== 0) {
    var t2 = $u;
    if (18874368 & e6.subtreeFlags)
      for (e6 = e6.child; e6 !== null; ) {
        if (e6.tag !== 22 || e6.memoizedState === null) {
          if (e6.tag === 30 && 18874368 & e6.flags) {
            var n2 = e6.memoizedProps,
              r2 = n2.name;
            if (r2 != null && r2 !== "auto") {
              var o2 = t2.get(r2);
              if (o2 !== void 0) {
                var a2 = mo(n2.default, n2.share);
                if (
                  (a2 !== "none" &&
                    (Au(e6, r2, a2, null, !1)
                      ? ((a2 = e6.stateNode),
                        (o2.paired = a2),
                        (a2.paired = o2),
                        Od(e6, n2.onShare))
                      : zu(e6.child, !1)),
                  t2.delete(r2),
                  t2.size === 0)
                )
                  break;
              }
            }
          }
          Hu(e6);
        }
        e6 = e6.sibling;
      }
  }
}
function Vu(e6) {
  if (e6.tag === 30) {
    var t2 = e6.memoizedProps,
      n2 = po(t2, e6.stateNode),
      r2 = $u !== null ? $u.get(n2) : void 0,
      o2 = mo(t2.default, r2 !== void 0 ? t2.share : t2.exit);
    o2 !== "none" &&
      (Au(e6, n2, o2, null, !1)
        ? r2 !== void 0
          ? ((o2 = e6.stateNode),
            (r2.paired = o2),
            (o2.paired = r2),
            $u.delete(n2),
            Od(e6, t2.onShare))
          : Od(e6, t2.onExit)
        : zu(e6.child, !1)),
      $u !== null && Hu(e6);
  } else if (33554432 & e6.subtreeFlags)
    for (e6 = e6.child; e6 !== null; ) Vu(e6), (e6 = e6.sibling);
  else $u !== null && Hu(e6);
}
function Bu(e6) {
  for (e6 = e6.child; e6 !== null; ) {
    if (e6.tag === 30) {
      var t2 = e6.memoizedProps,
        n2 = po(t2, e6.stateNode);
      (t2 = mo(t2.default, t2.update)),
        (e6.flags &= -5),
        t2 !== "none" && Au(e6, n2, t2, (e6.memoizedState = []), !1);
    } else 33554432 & e6.subtreeFlags && Bu(e6);
    e6 = e6.sibling;
  }
}
function Uu(e6) {
  if (18874368 & e6.subtreeFlags)
    for (e6 = e6.child; e6 !== null; ) {
      if (e6.tag !== 22 || e6.memoizedState === null) {
        if (e6.tag === 30 && 18874368 & e6.flags) {
          var t2 = e6.stateNode;
          t2.paired !== null && ((t2.paired = null), zu(e6.child, !1));
        }
        Uu(e6);
      }
      e6 = e6.sibling;
    }
}
function Wu(e6) {
  if (e6.tag === 30) (e6.stateNode.paired = null), zu(e6.child, !1), Uu(e6);
  else if (33554432 & e6.subtreeFlags) for (e6 = e6.child; e6 !== null; ) Wu(e6), (e6 = e6.sibling);
  else Uu(e6);
}
function qu(e6) {
  for (e6 = e6.child; e6 !== null; )
    e6.tag === 30 ? zu(e6.child, !1) : 33554432 & e6.subtreeFlags && qu(e6), (e6 = e6.sibling);
}
function Xu(e6, t2, n2, r2, o2, a2, l2) {
  for (var i2 = !1; t2 !== null; ) {
    if (t2.tag === 5) {
      var s2 = t2.stateNode;
      if (a2 !== null && Iu < a2.length) {
        var u2,
          c2 = a2[Iu],
          d2 = yp(s2);
        if (((c2.view || d2.view) && (i2 = !0), (u2 = !(4 & e6.flags))))
          if (d2.clip) u2 = !0;
          else {
            u2 = c2.rect;
            var f2 = d2.rect;
            u2 = u2.y !== f2.y || u2.x !== f2.x || u2.height !== f2.height || u2.width !== f2.width;
          }
        u2 && (e6.flags |= 4),
          d2.abs
            ? (d2 = !c2.abs)
            : ((c2 = c2.rect),
              (d2 = d2.rect),
              (d2 = c2.height !== d2.height || c2.width !== d2.width)),
          d2 && (e6.flags |= 32);
      } else e6.flags |= 32;
      4 & e6.flags && mp(s2, Iu === 0 ? n2 : n2 + "_" + Iu, o2),
        (i2 && 4 & e6.flags) ||
          (Ru === null && (Ru = []), Ru.push(s2, Iu === 0 ? r2 : r2 + "_" + Iu, t2.memoizedProps)),
        Iu++;
    } else
      (t2.tag === 22 && t2.memoizedState !== null) ||
        (t2.tag === 30 && l2
          ? (e6.flags |= 32 & t2.flags)
          : Xu(e6, t2.child, n2, r2, o2, a2, l2) && (i2 = !0));
    t2 = t2.sibling;
  }
  return i2;
}
function Ku(e6, t2) {
  for (e6 = e6.child; e6 !== null; ) {
    if (e6.tag === 30) {
      var n2 = e6.memoizedProps,
        r2 = e6.stateNode,
        o2 = po(n2, r2),
        a2 = mo(n2.default, n2.update);
      if (t2) var l2 = (r2 = r2.clones) === null ? null : r2.map(bp);
      else (l2 = e6.memoizedState), (e6.memoizedState = null);
      r2 = e6;
      var i2 = e6.child;
      (Iu = 0),
        (o2 = Xu(r2, i2, o2, o2, a2, l2, !1)),
        4 & e6.flags && o2 && (t2 || Od(e6, n2.onUpdate));
    } else 33554432 & e6.subtreeFlags && Ku(e6, t2);
    e6 = e6.sibling;
  }
}
var Gu = !1,
  Yu = !1,
  Qu = !1,
  Ju = !1,
  Zu = typeof WeakSet == "function" ? WeakSet : Set,
  ec = null,
  tc = !1,
  nc = !1,
  rc = !1,
  oc = !1;
function ac(e6) {
  for (; ec !== null; ) {
    var t2 = ec,
      n2 = e6,
      r2 = t2.alternate,
      o2 = t2.flags;
    switch (t2.tag) {
      case 0:
      case 11:
      case 15:
      case 5:
      case 26:
      case 27:
      case 6:
      case 4:
      case 17:
        break;
      case 1:
        if (1024 & o2 && r2 !== null) {
          (n2 = void 0), (o2 = r2.memoizedProps), (r2 = r2.memoizedState);
          var a2 = t2.stateNode;
          try {
            var l2 = gs(t2.type, o2);
            (n2 = a2.getSnapshotBeforeUpdate(l2, r2)),
              (a2.__reactInternalSnapshotBeforeUpdate = n2);
          } catch (i2) {
            lf(t2, t2.return, i2);
          }
        }
        break;
      case 3:
        if (1024 & o2) {
          if ((n2 = (r2 = t2.stateNode.containerInfo).nodeType) === 9) Bp(r2);
          else if (n2 === 1)
            switch (r2.nodeName) {
              case "HEAD":
              case "HTML":
              case "BODY":
                Bp(r2);
                break;
              default:
                r2.textContent = "";
            }
        }
        break;
      case 30:
        n2 &&
          r2 !== null &&
          ((n2 = po(r2.memoizedProps, r2.stateNode)),
          (o2 = mo((o2 = t2.memoizedProps).default, o2.update)) !== "none" &&
            Au(r2, n2, o2, (r2.memoizedState = []), !0));
        break;
      default:
        if (1024 & o2) throw Error(k(163));
    }
    if ((r2 = t2.sibling) !== null) {
      (r2.return = t2.return), (ec = r2);
      break;
    }
    ec = t2.return;
  }
}
function lc(e6, t2, n2) {
  var r2 = n2.flags;
  switch (n2.tag) {
    case 0:
    case 11:
    case 15:
      Cc(e6, n2), 4 & r2 && fu(5, n2);
      break;
    case 1:
      if ((Cc(e6, n2), 4 & r2))
        if (((e6 = n2.stateNode), t2 === null))
          try {
            e6.componentDidMount();
          } catch (l2) {
            lf(n2, n2.return, l2);
          }
        else {
          var o2 = gs(n2.type, t2.memoizedProps);
          t2 = t2.memoizedState;
          try {
            e6.componentDidUpdate(o2, t2, e6.__reactInternalSnapshotBeforeUpdate);
          } catch (i2) {
            lf(n2, n2.return, i2);
          }
        }
      64 & r2 && hu(n2), 512 & r2 && gu(n2, n2.return);
      break;
    case 3:
      if ((Cc(e6, n2), 64 & r2 && (e6 = n2.updateQueue) !== null)) {
        if (((t2 = null), n2.child !== null))
          switch (n2.child.tag) {
            case 27:
            case 5:
            case 1:
              t2 = n2.child.stateNode;
          }
        try {
          yl(e6, t2);
        } catch (l2) {
          lf(n2, n2.return, l2);
        }
      }
      break;
    case 27:
      t2 === null && 4 & r2 && Tu(n2);
    case 26:
    case 5:
      Cc(e6, n2), t2 === null && 4 & r2 && xu(n2), 512 & r2 && gu(n2, n2.return);
      break;
    case 12:
      Cc(e6, n2);
      break;
    case 31:
      Cc(e6, n2), 4 & r2 && mc(e6, n2);
      break;
    case 13:
      Cc(e6, n2),
        4 & r2 && gc(e6, n2),
        64 & r2 &&
          (e6 = n2.memoizedState) !== null &&
          (e6 = e6.dehydrated) !== null &&
          (function (e7, t3) {
            var n3 = e7.ownerDocument;
            if (e7.data === "$~") e7._reactRetry = t3;
            else if (e7.data !== "$?" || n3.readyState !== "loading") t3();
            else {
              var r3 = function () {
                t3(), n3.removeEventListener("DOMContentLoaded", r3);
              };
              n3.addEventListener("DOMContentLoaded", r3), (e7._reactRetry = r3);
            }
          })(e6, (n2 = df.bind(null, n2)));
      break;
    case 22:
      if (!(r2 = n2.memoizedState !== null || Gu)) {
        var a2 = (t2 !== null && t2.memoizedState !== null) || Yu;
        (t2 = Gu),
          (o2 = Yu),
          (Gu = r2),
          (Yu = a2) && !o2
            ? ((r2 = 2), 8772 & n2.subtreeFlags && (r2 |= 1), Pc(e6, n2, r2))
            : Cc(e6, n2),
          (Gu = t2),
          (Yu = o2);
      }
      break;
    case 30:
      Cc(e6, n2), 512 & r2 && gu(n2, n2.return);
      break;
    case 7:
      512 & r2 && gu(n2, n2.return);
    default:
      Cc(e6, n2);
  }
}
function ic(e6, t2) {
  for (e6 = e6.child; e6 !== null; ) sc(e6, t2), (e6 = e6.sibling);
}
function sc(e6, t2) {
  switch (e6.tag) {
    case 5:
    case 26:
      try {
        var n2 = e6.stateNode;
        if (t2) {
          var r2 = n2.style;
          typeof r2.setProperty == "function"
            ? r2.setProperty("display", "none", "important")
            : (r2.display = "none");
        } else {
          var o2 = e6.stateNode,
            a2 = e6.memoizedProps.style,
            l2 = a2 != null && a2.hasOwnProperty("display") ? a2.display : null;
          o2.style.display = l2 == null || typeof l2 == "boolean" ? "" : ("" + l2).trim();
        }
      } catch (s2) {
        lf(e6, e6.return, s2);
      }
      uc(e6, t2);
      break;
    case 6:
      try {
        (e6.stateNode.nodeValue = t2 ? "" : e6.memoizedProps), (Ut = !0);
      } catch (s2) {
        lf(e6, e6.return, s2);
      }
      break;
    case 18:
      try {
        var i2 = e6.stateNode;
        t2 ? hp(i2, !0) : hp(e6.stateNode, !1);
      } catch (s2) {
        lf(e6, e6.return, s2);
      }
      break;
    case 22:
    case 23:
      e6.memoizedState === null && ic(e6, t2);
      break;
    default:
      ic(e6, t2);
  }
}
function uc(e6, t2) {
  if (67108864 & e6.subtreeFlags)
    for (e6 = e6.child; e6 !== null; ) {
      e: {
        var n2 = e6,
          r2 = t2;
        switch (n2.tag) {
          case 4:
            sc(n2, r2);
            break e;
          case 22:
            n2.memoizedState === null && uc(n2, r2);
            break e;
          default:
            uc(n2, r2);
        }
      }
      e6 = e6.sibling;
    }
}
function cc(e6) {
  var t2 = e6.alternate;
  t2 !== null && ((e6.alternate = null), cc(t2)),
    (e6.child = null),
    (e6.deletions = null),
    (e6.sibling = null),
    e6.tag === 5 && (t2 = e6.stateNode) !== null && Nt(t2),
    (e6.stateNode = null),
    (e6.return = null),
    (e6.dependencies = null),
    (e6.memoizedProps = null),
    (e6.memoizedState = null),
    (e6.pendingProps = null),
    (e6.stateNode = null),
    (e6.updateQueue = null);
}
var dc = null,
  fc = !1;
function pc(e6, t2, n2) {
  for (n2 = n2.child; n2 !== null; ) hc(e6, t2, n2), (n2 = n2.sibling);
}
function hc(e6, t2, n2) {
  if (Qe && typeof Qe.onCommitFiberUnmount == "function")
    try {
      Qe.onCommitFiberUnmount(Ye, n2);
    } catch {}
  switch (n2.tag) {
    case 26:
      Yu || vu(n2, t2),
        pc(e6, t2, n2),
        n2.memoizedState
          ? n2.memoizedState.count--
          : n2.stateNode && !Yu && (n2 = n2.stateNode).parentNode.removeChild(n2);
      break;
    case 27:
      Yu || vu(n2, t2), wu(n2);
      var r2 = dc,
        o2 = fc;
      fp(n2.type) && ((dc = n2.stateNode), (fc = !1)),
        pc(e6, t2, n2),
        Jp(n2.stateNode, n2.type, n2.memoizedProps),
        (dc = r2),
        (fc = o2);
      break;
    case 5:
      Yu || vu(n2, t2), wu(n2);
    case 6:
      if (
        (n2.tag === 6 && wu(n2),
        (r2 = dc),
        (o2 = fc),
        (dc = null),
        pc(e6, t2, n2),
        (fc = o2),
        (dc = r2) !== null)
      )
        if (fc)
          try {
            (dc.nodeType === 9
              ? dc.body
              : dc.nodeName === "HTML"
                ? dc.ownerDocument.body
                : dc
            ).removeChild(n2.stateNode),
              (Ut = !0);
          } catch (l2) {
            lf(n2, t2, l2);
          }
        else
          try {
            dc.removeChild(n2.stateNode), (Ut = !0);
          } catch (l2) {
            lf(n2, t2, l2);
          }
      break;
    case 18:
      dc !== null &&
        (fc
          ? (pp(
              (e6 = dc).nodeType === 9
                ? e6.body
                : e6.nodeName === "HTML"
                  ? e6.ownerDocument.body
                  : e6,
              n2.stateNode,
            ),
            cm(e6))
          : pp(dc, n2.stateNode));
      break;
    case 4:
      (r2 = dc),
        (o2 = fc),
        (dc = n2.stateNode.containerInfo),
        (fc = !0),
        pc(e6, t2, n2),
        (dc = r2),
        (fc = o2);
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      pu(2, n2, t2), Yu || pu(4, n2, t2), pc(e6, t2, n2);
      break;
    case 1:
      Yu ||
        (vu(n2, t2),
        typeof (r2 = n2.stateNode).componentWillUnmount == "function" && mu(n2, t2, r2)),
        pc(e6, t2, n2);
      break;
    case 21:
      pc(e6, t2, n2);
      break;
    case 22:
      (Yu = (r2 = Yu) || n2.memoizedState !== null), pc(e6, t2, n2), (Yu = r2);
      break;
    case 30:
      vu(n2, t2), pc(e6, t2, n2);
      break;
    case 7:
      Yu || vu(n2, t2), pc(e6, t2, n2);
      break;
    default:
      pc(e6, t2, n2);
  }
}
function mc(e6, t2) {
  if (
    t2.memoizedState === null &&
    (e6 = t2.alternate) !== null &&
    (e6 = e6.memoizedState) !== null
  ) {
    e6 = e6.dehydrated;
    try {
      cm(e6);
    } catch (n2) {
      lf(t2, t2.return, n2);
    }
  }
}
function gc(e6, t2) {
  if (
    t2.memoizedState === null &&
    (e6 = t2.alternate) !== null &&
    (e6 = e6.memoizedState) !== null &&
    (e6 = e6.dehydrated) !== null
  )
    try {
      cm(e6);
    } catch (n2) {
      lf(t2, t2.return, n2);
    }
}
function vc(e6, t2) {
  var n2 = (function (e7) {
    switch (e7.tag) {
      case 31:
      case 13:
      case 19:
        var t3 = e7.stateNode;
        return t3 === null && (t3 = e7.stateNode = new Zu()), t3;
      case 22:
        return (
          (t3 = (e7 = e7.stateNode)._retryCache) === null && (t3 = e7._retryCache = new Zu()), t3
        );
      default:
        throw Error(k(435, e7.tag));
    }
  })(e6);
  t2.forEach(function (t3) {
    if (!n2.has(t3)) {
      n2.add(t3);
      var r2 = ff.bind(null, e6, t3);
      t3.then(r2, r2);
    }
  });
}
function yc(e6, t2, n2) {
  var r2 = t2.deletions;
  if (r2 !== null)
    for (var o2 = 0; o2 < r2.length; o2++) {
      var a2 = r2[o2],
        l2 = e6,
        i2 = t2,
        s2 = i2;
      e: for (; s2 !== null; ) {
        switch (s2.tag) {
          case 27:
            if (fp(s2.type)) {
              (dc = s2.stateNode), (fc = !1);
              break e;
            }
            break;
          case 5:
            (dc = s2.stateNode), (fc = !1);
            break e;
          case 3:
          case 4:
            (dc = s2.stateNode.containerInfo), (fc = !0);
            break e;
        }
        s2 = s2.return;
      }
      if (dc === null) throw Error(k(160));
      hc(l2, i2, a2),
        (dc = null),
        (fc = !1),
        (l2 = a2.alternate) !== null && (l2.return = null),
        (a2.return = null);
    }
  if (13886 & t2.subtreeFlags) for (t2 = t2.child; t2 !== null; ) wc(t2, e6, n2), (t2 = t2.sibling);
}
var bc = null;
function wc(e6, t2, n2) {
  var r2 = e6.alternate,
    o2 = e6.flags;
  switch (e6.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (4 & o2 && (r2 = (r2 = e6.updateQueue) !== null ? r2.events : null) !== null)
        for (var a2 = 0; a2 < r2.length; a2++) {
          var l2 = r2[a2];
          l2.ref.impl = l2.nextImpl;
        }
      yc(t2, e6, n2), Ec(e6), 4 & o2 && (pu(3, e6, e6.return), fu(3, e6), pu(5, e6, e6.return));
      break;
    case 1:
      yc(t2, e6, n2),
        Ec(e6),
        512 & o2 && (Yu || r2 === null || vu(r2, r2.return)),
        64 & o2 &&
          Gu &&
          (e6 = e6.updateQueue) !== null &&
          (t2 = e6.callbacks) !== null &&
          ((n2 = e6.shared.hiddenCallbacks),
          (e6.shared.hiddenCallbacks = n2 === null ? t2 : n2.concat(t2)));
      break;
    case 26:
      if (
        ((a2 = bc),
        yc(t2, e6, n2),
        Ec(e6),
        512 & o2 && (Yu || r2 === null || vu(r2, r2.return)),
        4 & o2)
      )
        if (((o2 = r2 !== null ? r2.memoizedState : null), (n2 = e6.memoizedState), r2 === null))
          if (n2 === null)
            if (e6.stateNode === null)
              if (Gu) e6.stateNode = rp(e6.type, e6.memoizedProps, t2.containerInfo, e6);
              else {
                e: {
                  (t2 = e6.type), (n2 = e6.memoizedProps), (o2 = a2.ownerDocument || a2);
                  t: switch (t2) {
                    case "title":
                      (!(r2 = o2.getElementsByTagName("title")[0]) ||
                        r2[Ot] ||
                        r2[Et] ||
                        r2.namespaceURI === "http://www.w3.org/2000/svg" ||
                        r2.hasAttribute("itemprop")) &&
                        ((r2 = o2.createElement(t2)),
                        o2.head.insertBefore(r2, o2.querySelector("head > title"))),
                        Gf(r2, t2, n2),
                        (r2[Et] = e6),
                        It(r2),
                        (t2 = r2);
                      break e;
                    case "link":
                      if ((a2 = vh("link", "href", o2).get(t2 + (n2.href || "")))) {
                        for (l2 = 0; l2 < a2.length; l2++)
                          if (
                            (r2 = a2[l2]).getAttribute("href") ===
                              (n2.href == null || n2.href === "" ? null : n2.href) &&
                            r2.getAttribute("rel") === (n2.rel == null ? null : n2.rel) &&
                            r2.getAttribute("title") === (n2.title == null ? null : n2.title) &&
                            r2.getAttribute("crossorigin") ===
                              (n2.crossOrigin == null ? null : n2.crossOrigin)
                          ) {
                            a2.splice(l2, 1);
                            break t;
                          }
                      }
                      Gf((r2 = o2.createElement(t2)), t2, n2), o2.head.appendChild(r2);
                      break;
                    case "meta":
                      if ((a2 = vh("meta", "content", o2).get(t2 + (n2.content || "")))) {
                        for (l2 = 0; l2 < a2.length; l2++)
                          if (
                            (r2 = a2[l2]).getAttribute("content") ===
                              (n2.content == null ? null : "" + n2.content) &&
                            r2.getAttribute("name") === (n2.name == null ? null : n2.name) &&
                            r2.getAttribute("property") ===
                              (n2.property == null ? null : n2.property) &&
                            r2.getAttribute("http-equiv") ===
                              (n2.httpEquiv == null ? null : n2.httpEquiv) &&
                            r2.getAttribute("charset") === (n2.charSet == null ? null : n2.charSet)
                          ) {
                            a2.splice(l2, 1);
                            break t;
                          }
                      }
                      Gf((r2 = o2.createElement(t2)), t2, n2), o2.head.appendChild(r2);
                      break;
                    default:
                      throw Error(k(468, t2));
                  }
                  (r2[Et] = e6), It(r2), (t2 = r2);
                }
                e6.stateNode = t2;
              }
            else Gu || yh(a2, e6.type, e6.stateNode);
          else e6.stateNode = fh(a2, n2, e6.memoizedProps);
        else
          o2 !== n2
            ? (o2 === null
                ? (t2 = r2.stateNode) === null || Yu || t2.parentNode.removeChild(t2)
                : o2.count--,
              n2 === null ? Gu || yh(a2, e6.type, e6.stateNode) : fh(a2, n2, e6.memoizedProps))
            : n2 === null && e6.stateNode !== null && ku(e6, e6.memoizedProps, r2.memoizedProps);
      break;
    case 27:
      yc(t2, e6, n2),
        Ec(e6),
        512 & o2 && (Yu || r2 === null || vu(r2, r2.return)),
        r2 !== null && 4 & o2 && ku(e6, e6.memoizedProps, r2.memoizedProps);
      break;
    case 5:
      if (
        ((a2 = Qu),
        (Qu = !1),
        yc(t2, e6, n2),
        (Qu = a2),
        Ec(e6),
        512 & o2 && (Yu || r2 === null || vu(r2, r2.return)),
        32 & e6.flags)
      ) {
        t2 = e6.stateNode;
        try {
          sn(t2, ""), (Ut = !0);
        } catch (c2) {
          lf(e6, e6.return, c2);
        }
      }
      4 & o2 &&
        e6.stateNode != null &&
        ku(e6, (t2 = e6.memoizedProps), r2 !== null ? r2.memoizedProps : t2),
        1024 & o2 && (Ju = !0);
      break;
    case 6:
      if ((yc(t2, e6, n2), Ec(e6), 4 & o2)) {
        if (e6.stateNode === null) throw Error(k(162));
        (t2 = e6.memoizedProps), (n2 = e6.stateNode);
        try {
          (n2.nodeValue = t2), (Ut = !0);
        } catch (c2) {
          lf(e6, e6.return, c2);
        }
      }
      break;
    case 3:
      if (
        ((Ut = !1),
        (gh = null),
        (a2 = bc),
        (bc = nh(t2.containerInfo)),
        yc(t2, e6, n2),
        (bc = a2),
        Ec(e6),
        4 & o2 && r2 !== null && r2.memoizedState.isDehydrated)
      )
        try {
          cm(t2.containerInfo);
        } catch (c2) {
          lf(e6, e6.return, c2);
        }
      Ju && ((Ju = !1), Sc(e6)), (Ut = !1);
      break;
    case 4:
      (o2 = Qu),
        (Qu = Gu),
        (r2 = Wt()),
        (a2 = bc),
        (bc = nh(e6.stateNode.containerInfo)),
        yc(t2, e6, n2),
        Ec(e6),
        (bc = a2),
        Ut && nc && (rc = !0),
        (Ut = r2),
        (Qu = o2);
      break;
    case 12:
      yc(t2, e6, n2), Ec(e6);
      break;
    case 31:
      yc(t2, e6, n2),
        Ec(e6),
        4 & o2 && (t2 = e6.updateQueue) !== null && ((e6.updateQueue = null), vc(e6, t2));
      break;
    case 13:
      yc(t2, e6, n2),
        Ec(e6),
        8192 & e6.child.flags &&
          (e6.memoizedState !== null) != (r2 !== null && r2.memoizedState !== null) &&
          (ud = He()),
        4 & o2 && (t2 = e6.updateQueue) !== null && ((e6.updateQueue = null), vc(e6, t2));
      break;
    case 22:
      (a2 = e6.memoizedState !== null), (l2 = r2 !== null && r2.memoizedState !== null);
      var i2 = Gu,
        s2 = Yu,
        u2 = Qu;
      (Gu = i2 || a2),
        (Qu = u2 || a2),
        (Yu = s2 || l2),
        yc(t2, e6, n2),
        (Yu = s2),
        (Qu = u2),
        (Gu = i2),
        Ec(e6),
        8192 & o2 &&
          (((t2 = e6.stateNode)._visibility = a2 ? -2 & t2._visibility : 1 | t2._visibility),
          !a2 ||
            r2 === null ||
            l2 ||
            Gu ||
            Yu ||
            ((n2 = Gu),
            (r2 = Yu),
            (Gu = a2 || Gu),
            (Yu = t2 = l2 || Yu),
            _c(e6, 2),
            (Gu = n2),
            (Yu = r2)),
          (!a2 && Qu) || ic(e6, a2)),
        4 & o2 &&
          (t2 = e6.updateQueue) !== null &&
          (n2 = t2.retryQueue) !== null &&
          ((t2.retryQueue = null), vc(e6, n2));
      break;
    case 19:
      yc(t2, e6, n2),
        Ec(e6),
        4 & o2 && (t2 = e6.updateQueue) !== null && ((e6.updateQueue = null), vc(e6, t2));
      break;
    case 30:
      512 & o2 && (Yu || r2 === null || vu(r2, r2.return)),
        (o2 = Wt()),
        (a2 = nc),
        (l2 = (335544064 & n2) === n2),
        (i2 = e6.memoizedProps),
        (nc = l2 && mo(i2.default, i2.update) !== "none"),
        yc(t2, e6, n2),
        Ec(e6),
        l2 && r2 !== null && Ut && (e6.flags |= 4),
        (nc = a2),
        (Ut = o2);
      break;
    case 21:
      break;
    case 7:
      512 & o2 && (Yu || r2 === null || vu(r2, r2.return)),
        r2 && r2.stateNode !== null && (r2.stateNode._fragmentFiber = e6);
    default:
      yc(t2, e6, n2), Ec(e6);
  }
}
function Ec(e6) {
  var t2 = e6.flags;
  if (2 & t2) {
    try {
      for (var n2, r2 = e6.return; r2 !== null; ) {
        if (Cu(r2)) {
          n2 = r2;
          break;
        }
        r2 = r2.return;
      }
      r2 = null;
      for (var o2 = e6.return; o2 !== null; ) {
        if (Su(o2)) {
          var a2 = o2.stateNode;
          r2 === null ? (r2 = [a2]) : r2.push(a2);
        }
        if (Eu(o2)) break;
        o2 = o2.return;
      }
      var l2 = r2;
      if (n2 == null) throw Error(k(160));
      switch (n2.tag) {
        case 27:
          var i2 = n2.stateNode;
          Ou(e6, _u(e6), i2, l2);
          break;
        case 5:
          var s2 = n2.stateNode;
          32 & n2.flags && (sn(s2, ""), (n2.flags &= -33)), Ou(e6, _u(e6), s2, l2);
          break;
        case 3:
        case 4:
          var u2 = n2.stateNode.containerInfo;
          Pu(e6, _u(e6), u2, l2);
          break;
        default:
          throw Error(k(161));
      }
    } catch (c2) {
      lf(e6, e6.return, c2);
    }
    e6.flags &= -3;
  }
  4096 & t2 && (e6.flags &= -4097);
}
function Sc(e6) {
  if (1024 & e6.subtreeFlags)
    for (e6 = e6.child; e6 !== null; ) {
      var t2 = e6;
      Sc(t2),
        t2.tag === 5 && 1024 & t2.flags && ((t2 = t2.stateNode), (jh = !0), t2.reset(), (jh = !1)),
        (e6 = e6.sibling);
    }
}
function xc(e6, t2) {
  if (9270 & t2.subtreeFlags) for (t2 = t2.child; t2 !== null; ) kc(t2, e6), (t2 = t2.sibling);
  else Ku(t2, !1);
}
function kc(e6, t2) {
  var n2 = e6.alternate;
  if (n2 === null) Du(e6, !1);
  else
    switch (e6.tag) {
      case 3:
        if (((oc = tc = !1), Lu(), xc(t2, e6), !tc && !rc)) {
          if ((e6 = Ru) !== null)
            for (var r2 = 0; r2 < e6.length; r2 += 3) {
              n2 = e6[r2];
              var o2 = e6[r2 + 1];
              gp(n2, e6[r2 + 2]),
                (n2 = n2.ownerDocument.documentElement) !== null &&
                  n2.animate(
                    { opacity: [0, 0], pointerEvents: ["none", "none"] },
                    {
                      duration: 0,
                      fill: "forwards",
                      pseudoElement: "::view-transition-group(" + o2 + ")",
                    },
                  );
            }
          (e6 =
            (e6 = t2.containerInfo).nodeType === 9
              ? e6.documentElement
              : e6.ownerDocument.documentElement) !== null &&
            e6.style.viewTransitionName === "" &&
            ((e6.style.viewTransitionName = "none"),
            e6.animate(
              { opacity: [0, 0], pointerEvents: ["none", "none"] },
              { duration: 0, fill: "forwards", pseudoElement: "::view-transition-group(root)" },
            ),
            e6.animate(
              { width: [0, 0], height: [0, 0] },
              { duration: 0, fill: "forwards", pseudoElement: "::view-transition" },
            )),
            (oc = !0);
        }
        Ru = null;
        break;
      case 5:
      default:
        xc(t2, e6);
        break;
      case 4:
        (r2 = tc), (tc = !1), xc(t2, e6), tc && (rc = !0), (tc = r2);
        break;
      case 22:
        e6.memoizedState === null && (n2.memoizedState !== null ? Du(e6, !1) : xc(t2, e6));
        break;
      case 30:
        (r2 = tc), (o2 = Lu()), (tc = !1), xc(t2, e6), tc && (e6.flags |= 4);
        var a2 = e6.memoizedProps,
          l2 = e6.stateNode;
        (t2 = po(a2, l2)), (l2 = po(n2.memoizedProps, l2));
        var i2 = mo(a2.default, a2.update);
        i2 === "none"
          ? (t2 = !1)
          : ((a2 = n2.memoizedState),
            (n2.memoizedState = null),
            (n2 = e6.child),
            (Iu = 0),
            (t2 = Xu(e6, n2, t2, l2, i2, a2, !0)),
            Iu !== (a2 === null ? 0 : a2.length) && (e6.flags |= 32)),
          4 & e6.flags && t2
            ? (Od(e6, e6.memoizedProps.onUpdate), (Ru = o2))
            : o2 !== null && (o2.push.apply(o2, Ru), (Ru = o2)),
          (tc = !!(32 & e6.flags) || r2);
    }
}
function Cc(e6, t2) {
  if (8772 & t2.subtreeFlags)
    for (t2 = t2.child; t2 !== null; ) lc(e6, t2.alternate, t2), (t2 = t2.sibling);
}
function _c(e6, t2) {
  for (e6 = e6.child; e6 !== null; ) {
    var n2 = e6,
      r2 = t2;
    switch (n2.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        pu(4, n2, n2.return), _c(n2, r2);
        break;
      case 1:
        vu(n2, n2.return);
        var o2 = n2.stateNode;
        typeof o2.componentWillUnmount == "function" && mu(n2, n2.return, o2), _c(n2, r2);
        break;
      case 27:
        2 & r2 && Jp(n2.stateNode, n2.type, n2.memoizedProps);
      case 5:
        vu(n2, n2.return), (n2.tag !== 5 && n2.tag !== 27) || wu(n2), _c(n2, r2);
        break;
      case 6:
        wu(n2);
        break;
      case 26:
        vu(n2, n2.return),
          (o2 = n2.stateNode),
          n2.memoizedState !== null || o2 === null || Yu || o2.parentNode.removeChild(o2),
          _c(n2, r2);
        break;
      case 22:
        n2.memoizedState === null && _c(n2, r2);
        break;
      case 30:
        vu(n2, n2.return), _c(n2, r2);
        break;
      case 7:
        vu(n2, n2.return);
      default:
        _c(n2, r2);
    }
    e6 = e6.sibling;
  }
}
function Pc(e6, t2, n2) {
  for (n2 = 8772 & t2.subtreeFlags ? n2 : -2 & n2, t2 = t2.child; t2 !== null; ) {
    var r2 = t2.alternate,
      o2 = e6,
      a2 = t2,
      l2 = a2.flags,
      i2 = !!(1 & n2);
    switch (a2.tag) {
      case 0:
      case 11:
      case 15:
        Pc(o2, a2, n2), fu(4, a2);
        break;
      case 1:
        if ((Pc(o2, a2, n2), typeof (o2 = (r2 = a2).stateNode).componentDidMount == "function"))
          try {
            o2.componentDidMount();
          } catch (c2) {
            lf(r2, r2.return, c2);
          }
        if ((o2 = (r2 = a2).updateQueue) !== null) {
          var s2 = r2.stateNode;
          try {
            var u2 = o2.shared.hiddenCallbacks;
            if (u2 !== null)
              for (o2.shared.hiddenCallbacks = null, o2 = 0; o2 < u2.length; o2++) vl(u2[o2], s2);
          } catch (c2) {
            lf(r2, r2.return, c2);
          }
        }
        i2 && 64 & l2 && hu(a2), gu(a2, a2.return);
        break;
      case 27:
        2 & n2 && Tu(a2);
      case 5:
        (a2.tag !== 5 && a2.tag !== 27) || bu(a2),
          Pc(o2, a2, n2),
          i2 && r2 === null && 4 & l2 && xu(a2),
          gu(a2, a2.return);
        break;
      case 6:
        bu(a2);
        break;
      case 26:
        (s2 = a2.stateNode),
          a2.memoizedState !== null || s2 === null || Gu || yh(nh(s2.ownerDocument), a2.type, s2),
          Pc(o2, a2, n2),
          i2 && r2 === null && 4 & l2 && xu(a2),
          gu(a2, a2.return);
        break;
      case 12:
        Pc(o2, a2, n2);
        break;
      case 31:
        Pc(o2, a2, n2), i2 && 4 & l2 && mc(o2, a2);
        break;
      case 13:
        Pc(o2, a2, n2), i2 && 4 & l2 && gc(o2, a2);
        break;
      case 22:
        a2.memoizedState === null && Pc(o2, a2, n2), gu(a2, a2.return);
        break;
      case 30:
        Pc(o2, a2, n2), gu(a2, a2.return);
        break;
      case 7:
        gu(a2, a2.return);
      default:
        Pc(o2, a2, n2);
    }
    t2 = t2.sibling;
  }
}
function Oc(e6, t2) {
  var n2 = null;
  e6 !== null &&
    e6.memoizedState !== null &&
    e6.memoizedState.cachePool !== null &&
    (n2 = e6.memoizedState.cachePool.pool),
    (e6 = null),
    t2.memoizedState !== null &&
      t2.memoizedState.cachePool !== null &&
      (e6 = t2.memoizedState.cachePool.pool),
    e6 !== n2 && (e6 != null && e6.refCount++, n2 != null && Na(n2));
}
function Tc(e6, t2) {
  (e6 = null),
    t2.alternate !== null && (e6 = t2.alternate.memoizedState.cache),
    (t2 = t2.memoizedState.cache) !== e6 && (t2.refCount++, e6 != null && Na(e6));
}
function Nc(e6, t2, n2, r2) {
  var o2 = (335544064 & n2) === n2;
  if (t2.subtreeFlags & (o2 ? 10262 : 10256))
    for (t2 = t2.child; t2 !== null; ) $c(e6, t2, n2, r2), (t2 = t2.sibling);
  else o2 && qu(t2);
}
function $c(e6, t2, n2, r2) {
  var o2 = (335544064 & n2) === n2;
  o2 && t2.alternate === null && t2.return !== null && t2.return.alternate !== null && Wu(t2);
  var a2 = t2.flags;
  switch (t2.tag) {
    case 0:
    case 11:
    case 15:
      Nc(e6, t2, n2, r2), 2048 & a2 && fu(9, t2);
      break;
    case 1:
    case 31:
    case 13:
    default:
      Nc(e6, t2, n2, r2);
      break;
    case 3:
      Nc(e6, t2, n2, r2),
        o2 &&
          oc &&
          ((e6 =
            (e6 = e6.containerInfo).nodeType === 9
              ? e6.body
              : e6.nodeName === "HTML"
                ? e6.ownerDocument.body
                : e6).style.viewTransitionName === "root" && (e6.style.viewTransitionName = ""),
          (e6 = e6.ownerDocument.documentElement) !== null &&
            e6.style.viewTransitionName === "none" &&
            (e6.style.viewTransitionName = "")),
        2048 & a2 &&
          ((a2 = null),
          t2.alternate !== null && (a2 = t2.alternate.memoizedState.cache),
          (t2 = t2.memoizedState.cache) !== a2 && (t2.refCount++, a2 != null && Na(a2)));
      break;
    case 12:
      if (2048 & a2) {
        Nc(e6, t2, n2, r2), (a2 = t2.stateNode);
        try {
          var l2 = t2.memoizedProps,
            i2 = l2.id,
            s2 = l2.onPostCommit;
          typeof s2 == "function" &&
            s2(i2, t2.alternate === null ? "mount" : "update", a2.passiveEffectDuration, -0);
        } catch (u2) {
          lf(t2, t2.return, u2);
        }
      } else Nc(e6, t2, n2, r2);
      break;
    case 23:
      break;
    case 22:
      (l2 = t2.stateNode),
        (i2 = t2.alternate),
        t2.memoizedState !== null
          ? (o2 && i2 !== null && i2.memoizedState === null && Wu(i2),
            2 & l2._visibility ? Nc(e6, t2, n2, r2) : Rc(e6, t2))
          : (o2 && i2 !== null && i2.memoizedState !== null && Wu(t2),
            2 & l2._visibility
              ? Nc(e6, t2, n2, r2)
              : ((l2._visibility |= 2), Mc(e6, t2, n2, r2, !!(10256 & t2.subtreeFlags) || !1))),
        2048 & a2 && Oc(i2, t2);
      break;
    case 24:
      Nc(e6, t2, n2, r2), 2048 & a2 && Tc(t2.alternate, t2);
      break;
    case 30:
      o2 && (a2 = t2.alternate) !== null && (zu(a2.child, !0), zu(t2.child, !0)),
        Nc(e6, t2, n2, r2);
  }
}
function Mc(e6, t2, n2, r2, o2) {
  for (o2 = o2 && (!!(10256 & t2.subtreeFlags) || !1), t2 = t2.child; t2 !== null; ) {
    var a2 = e6,
      l2 = t2,
      i2 = n2,
      s2 = r2,
      u2 = l2.flags;
    switch (l2.tag) {
      case 0:
      case 11:
      case 15:
        Mc(a2, l2, i2, s2, o2), fu(8, l2);
        break;
      case 23:
        break;
      case 22:
        var c2 = l2.stateNode;
        l2.memoizedState !== null
          ? 2 & c2._visibility
            ? Mc(a2, l2, i2, s2, o2)
            : Rc(a2, l2)
          : ((c2._visibility |= 2), Mc(a2, l2, i2, s2, o2)),
          o2 && 2048 & u2 && Oc(l2.alternate, l2);
        break;
      case 24:
        Mc(a2, l2, i2, s2, o2), o2 && 2048 & u2 && Tc(l2.alternate, l2);
        break;
      default:
        Mc(a2, l2, i2, s2, o2);
    }
    t2 = t2.sibling;
  }
}
function Rc(e6, t2) {
  if (10256 & t2.subtreeFlags)
    for (t2 = t2.child; t2 !== null; ) {
      var n2 = e6,
        r2 = t2,
        o2 = r2.flags;
      switch (r2.tag) {
        case 22:
          Rc(n2, r2), 2048 & o2 && Oc(r2.alternate, r2);
          break;
        case 24:
          Rc(n2, r2), 2048 & o2 && Tc(r2.alternate, r2);
          break;
        default:
          Rc(n2, r2);
      }
      t2 = t2.sibling;
    }
}
var Lc = 8192;
function Ic(e6, t2, n2) {
  if (e6.subtreeFlags & Lc) for (e6 = e6.child; e6 !== null; ) Ac(e6, t2, n2), (e6 = e6.sibling);
}
function Ac(e6, t2, n2) {
  switch (e6.tag) {
    case 26:
      Ic(e6, t2, n2),
        e6.flags & Lc &&
          (e6.memoizedState !== null
            ? (function (e7, t3, n3, r3) {
                if (
                  !(
                    n3.type !== "stylesheet" ||
                    (typeof r3.media == "string" && matchMedia(r3.media).matches === !1) ||
                    4 & n3.state.loading
                  )
                ) {
                  if (n3.instance === null) {
                    var o3 = ih(r3.href),
                      a2 = t3.querySelector(sh(o3));
                    if (a2)
                      return (
                        (t3 = a2._p) !== null &&
                          typeof t3 == "object" &&
                          typeof t3.then == "function" &&
                          (e7.count++, (e7 = Ch.bind(e7)), t3.then(e7, e7)),
                        (n3.state.loading |= 4),
                        (n3.instance = a2),
                        void It(a2)
                      );
                    (a2 = t3.ownerDocument || t3),
                      (r3 = uh(r3)),
                      (o3 = eh.get(o3)) && hh(r3, o3),
                      It((a2 = a2.createElement("link")));
                    var l2 = a2;
                    (l2._p = new Promise(function (e8, t4) {
                      (l2.onload = e8), (l2.onerror = t4);
                    })),
                      Gf(a2, "link", r3),
                      (n3.instance = a2);
                  }
                  e7.stylesheets === null && (e7.stylesheets = new Map()),
                    e7.stylesheets.set(n3, t3),
                    (t3 = n3.state.preload) &&
                      !(3 & n3.state.loading) &&
                      (e7.count++,
                      (n3 = Ch.bind(e7)),
                      t3.addEventListener("load", n3),
                      t3.addEventListener("error", n3));
                }
              })(n2, bc, e6.memoizedState, e6.memoizedProps)
            : ((e6 = e6.stateNode), (335544128 & t2) === t2 && Sh(n2, e6)));
      break;
    case 5:
      Ic(e6, t2, n2), e6.flags & Lc && ((e6 = e6.stateNode), (335544128 & t2) === t2 && Sh(n2, e6));
      break;
    case 3:
    case 4:
      var r2 = bc;
      (bc = nh(e6.stateNode.containerInfo)), Ic(e6, t2, n2), (bc = r2);
      break;
    case 22:
      e6.memoizedState === null &&
        ((r2 = e6.alternate) !== null && r2.memoizedState !== null
          ? ((r2 = Lc), (Lc = 16777216), Ic(e6, t2, n2), (Lc = r2))
          : Ic(e6, t2, n2));
      break;
    case 30:
      if (e6.flags & Lc && (r2 = e6.memoizedProps.name) != null && r2 !== "auto") {
        var o2 = e6.stateNode;
        (o2.paired = null), $u === null && ($u = new Map()), $u.set(r2, o2);
      }
      Ic(e6, t2, n2);
      break;
    default:
      Ic(e6, t2, n2);
  }
}
function Fc(e6) {
  var t2 = e6.alternate;
  if (t2 !== null && (e6 = t2.child) !== null) {
    t2.child = null;
    do (t2 = e6.sibling), (e6.sibling = null), (e6 = t2);
    while (e6 !== null);
  }
}
function zc(e6) {
  var t2 = e6.deletions;
  if (16 & e6.flags) {
    if (t2 !== null)
      for (var n2 = 0; n2 < t2.length; n2++) {
        var r2 = t2[n2];
        (ec = r2), Hc(r2, e6);
      }
    Fc(e6);
  }
  if (10256 & e6.subtreeFlags) for (e6 = e6.child; e6 !== null; ) jc(e6), (e6 = e6.sibling);
}
function jc(e6) {
  switch (e6.tag) {
    case 0:
    case 11:
    case 15:
      zc(e6), 2048 & e6.flags && pu(9, e6, e6.return);
      break;
    case 3:
    case 12:
    default:
      zc(e6);
      break;
    case 22:
      var t2 = e6.stateNode;
      e6.memoizedState !== null &&
      2 & t2._visibility &&
      (e6.return === null || e6.return.tag !== 13)
        ? ((t2._visibility &= -3), Dc(e6))
        : zc(e6);
  }
}
function Dc(e6) {
  var t2 = e6.deletions;
  if (16 & e6.flags) {
    if (t2 !== null)
      for (var n2 = 0; n2 < t2.length; n2++) {
        var r2 = t2[n2];
        (ec = r2), Hc(r2, e6);
      }
    Fc(e6);
  }
  for (e6 = e6.child; e6 !== null; ) {
    switch ((t2 = e6).tag) {
      case 0:
      case 11:
      case 15:
        pu(8, t2, t2.return), Dc(t2);
        break;
      case 22:
        2 & (n2 = t2.stateNode)._visibility && ((n2._visibility &= -3), Dc(t2));
        break;
      default:
        Dc(t2);
    }
    e6 = e6.sibling;
  }
}
function Hc(e6, t2) {
  for (; ec !== null; ) {
    var n2 = ec;
    switch (n2.tag) {
      case 0:
      case 11:
      case 15:
        pu(8, n2, t2);
        break;
      case 23:
      case 22:
        if (n2.memoizedState !== null && n2.memoizedState.cachePool !== null) {
          var r2 = n2.memoizedState.cachePool.pool;
          r2 != null && r2.refCount++;
        }
        break;
      case 24:
        Na(n2.memoizedState.cache);
    }
    if ((r2 = n2.child) !== null) (r2.return = n2), (ec = r2);
    else
      e: for (n2 = e6; ec !== null; ) {
        var o2 = (r2 = ec).sibling,
          a2 = r2.return;
        if ((cc(r2), r2 === n2)) {
          ec = null;
          break e;
        }
        if (o2 !== null) {
          (o2.return = a2), (ec = o2);
          break e;
        }
        ec = a2;
      }
  }
}
var Vc = {
    getCacheForType: function (e6) {
      var t2 = Sa(Oa),
        n2 = t2.data.get(e6);
      return n2 === void 0 && ((n2 = e6()), t2.data.set(e6, n2)), n2;
    },
    cacheSignal: function () {
      return Sa(Oa).controller.signal;
    },
  },
  Bc = typeof WeakMap == "function" ? WeakMap : Map,
  Uc = 0,
  Wc = null,
  qc = null,
  Xc = 0,
  Kc = 0,
  Gc = null,
  Yc = !1,
  Qc = !1,
  Jc = !1,
  Zc = 0,
  ed = 0,
  td = 0,
  nd = 0,
  rd = 0,
  od = 0,
  ad = 0,
  ld = null,
  id = null,
  sd = !1,
  ud = 0,
  cd = 0,
  dd = 1 / 0,
  fd = null,
  pd = null,
  hd = 0,
  md = null,
  gd = null,
  vd = 0,
  yd = 0,
  bd = null,
  wd = null,
  Ed = null,
  Sd = null,
  xd = null,
  kd = 0,
  Cd = null;
function _d() {
  return 2 & Uc && Xc !== 0 ? Xc & -Xc : pe.T !== null ? _f() : yt();
}
function Pd() {
  if (od === 0)
    if (536870912 & Xc && !ta) od = 536870912;
    else {
      var e6 = rt;
      !(3932160 & (rt <<= 1)) && (rt = 262144), (od = e6);
    }
  return (e6 = kl.current) !== null && (e6.flags |= 32), od;
}
function Od(e6, t2) {
  if (t2 != null) {
    var n2 = e6.stateNode,
      r2 = n2.ref;
    r2 === null && (r2 = n2.ref = Sp(po(e6.memoizedProps, n2))),
      Sd === null && (Sd = []),
      Sd.push(t2.bind(null, r2));
  }
}
function Td(e6, t2, n2) {
  ((e6 !== Wc || (Kc !== 2 && Kc !== 9)) && e6.cancelPendingCommit === null) ||
    (Ad(e6, 0), Rd(e6, Xc, od, !1)),
    ft(e6, n2),
    (2 & Uc && e6 === Wc) ||
      (e6 === Wc && (!(2 & Uc) && (nd |= n2), ed === 4 && Rd(e6, Xc, od, !1)), bf(e6));
}
function Nd(e6, t2, n2) {
  if (6 & Uc) throw Error(k(327));
  for (
    var r2 = (!n2 && !(127 & t2) && (t2 & e6.expiredLanes) === 0) || it(e6, t2),
      o2 = r2
        ? (function (e7, t3) {
            var n3 = Uc;
            Uc |= 2;
            var r3 = jd(),
              o3 = Dd();
            Wc !== e7 || Xc !== t3
              ? ((fd = null), (dd = He() + 500), Ad(e7, t3))
              : (Qc = it(e7, t3));
            e: for (;;)
              try {
                if (Kc !== 0 && qc !== null) {
                  t3 = qc;
                  var a3 = Gc;
                  t: switch (Kc) {
                    case 1:
                      (Kc = 0), (Gc = null), Xd(e7, t3, a3, 1);
                      break;
                    case 2:
                    case 9:
                      if (Xa(a3)) {
                        (Kc = 0), (Gc = null), qd(t3);
                        break;
                      }
                      (t3 = function () {
                        (Kc !== 2 && Kc !== 9) || Wc !== e7 || (Kc = 7), bf(e7);
                      }),
                        a3.then(t3, t3);
                      break e;
                    case 3:
                      Kc = 7;
                      break e;
                    case 4:
                      Kc = 5;
                      break e;
                    case 7:
                      Xa(a3)
                        ? ((Kc = 0), (Gc = null), qd(t3))
                        : ((Kc = 0), (Gc = null), Xd(e7, t3, a3, 7));
                      break;
                    case 5:
                      var l3 = null;
                      switch (qc.tag) {
                        case 26:
                          l3 = qc.memoizedState;
                        case 5:
                        case 27:
                          var i3 = qc;
                          if (l3 ? wh(l3) : i3.stateNode.complete) {
                            (Kc = 0), (Gc = null);
                            var s3 = i3.sibling;
                            if (s3 !== null) qc = s3;
                            else {
                              var u2 = i3.return;
                              u2 !== null ? ((qc = u2), Kd(u2)) : (qc = null);
                            }
                            break t;
                          }
                      }
                      (Kc = 0), (Gc = null), Xd(e7, t3, a3, 5);
                      break;
                    case 6:
                      (Kc = 0), (Gc = null), Xd(e7, t3, a3, 6);
                      break;
                    case 8:
                      Id(), (ed = 6);
                      break e;
                    default:
                      throw Error(k(462));
                  }
                }
                Ud();
                break;
              } catch (c2) {
                Fd(e7, c2);
              }
            return (
              (ha = pa = null),
              (pe.H = r3),
              (pe.A = o3),
              (Uc = n3),
              qc !== null ? 0 : ((Wc = null), (Xc = 0), wo(), ed)
            );
          })(e6, t2)
        : Vd(e6, t2, !0),
      a2 = r2;
    ;

  ) {
    if (o2 === 0) {
      Qc && !r2 && Rd(e6, t2, 0, !1);
      break;
    }
    if (((n2 = e6.current.alternate), !a2 || Md(n2))) {
      if (o2 === 2) {
        if (((a2 = t2), e6.errorRecoveryDisabledLanes & a2)) var l2 = 0;
        else l2 = (l2 = -536870913 & e6.pendingLanes) !== 0 ? l2 : 536870912 & l2 ? 536870912 : 0;
        if (l2 !== 0) {
          t2 = l2;
          e: {
            var i2 = e6;
            o2 = ld;
            var s2 = i2.current.memoizedState.isDehydrated;
            if ((s2 && (Ad(i2, l2).flags |= 256), (l2 = Vd(i2, l2, !1)) !== 2 && l2 !== 6)) {
              if (Jc && !s2) {
                (i2.errorRecoveryDisabledLanes |= a2), (nd |= a2), (o2 = 4);
                break e;
              }
              (a2 = id),
                (id = o2),
                a2 !== null && (id === null ? (id = a2) : id.push.apply(id, a2));
            }
            o2 = l2;
          }
          if (((a2 = !1), o2 !== 2)) continue;
        }
      }
      if (o2 === 1) {
        Ad(e6, 0), Rd(e6, t2, 0, !0);
        break;
      }
      e: {
        switch (((r2 = e6), (a2 = o2))) {
          case 0:
          case 1:
            throw Error(k(345));
          case 4:
            if ((4194048 & t2) !== t2 && (62914560 & t2) !== t2) break;
          case 6:
            Rd(r2, t2, od, !Yc);
            break e;
          case 2:
            id = null;
            break;
          case 3:
          case 5:
            break;
          default:
            throw Error(k(329));
        }
        if ((62914560 & t2) === t2 && 10 < (o2 = ud + 300 - He())) {
          if ((Rd(r2, t2, od, !Yc), lt(r2, 0, !0) !== 0)) break e;
          (vd = t2),
            (r2.timeoutHandle = lp(
              $d.bind(null, r2, n2, id, fd, sd, t2, od, nd, ad, Yc, a2, "Throttled", -0, 0),
              o2,
            ));
        } else $d(r2, n2, id, fd, sd, t2, od, nd, ad, Yc, a2, null, -0, 0);
      }
      break;
    }
    (o2 = Vd(e6, t2, !1)), (a2 = !1);
  }
  bf(e6);
}
function $d(e6, t2, n2, r2, o2, a2, l2, i2, s2, u2, c2, d2, f2, p2) {
  e6.timeoutHandle = -1;
  var h2,
    m2,
    g2 = t2.subtreeFlags,
    v2 = (335544064 & a2) === a2;
  if (
    ((d2 = null),
    (v2 || 8192 & g2 || !(16785408 & ~g2)) &&
      (($u = null),
      Ac(
        t2,
        a2,
        (d2 = {
          stylesheets: null,
          count: 0,
          imgCount: 0,
          imgBytes: 0,
          suspenseyImages: [],
          waitingForImages: !0,
          waitingForViewTransition: !1,
          unsuspend: gn,
        }),
      ),
      v2 &&
        ((g2 = d2),
        (v2 = ((v2 = e6.containerInfo).nodeType === 9 ? v2 : v2.ownerDocument)
          .__reactViewTransition) != null &&
          (g2.count++,
          (g2.waitingForViewTransition = !0),
          (g2 = Ch.bind(g2)),
          v2.finished.then(g2, g2))),
      (g2 = (62914560 & a2) === a2 ? ud - He() : (4194048 & a2) === a2 ? cd - He() : 0),
      (m2 = g2),
      (h2 = d2).stylesheets && h2.count === 0 && Oh(h2, h2.stylesheets),
      (g2 =
        0 < h2.count || 0 < h2.imgCount
          ? function (e7) {
              var t3 = setTimeout(function () {
                if ((h2.stylesheets && Oh(h2, h2.stylesheets), h2.unsuspend)) {
                  var e8 = h2.unsuspend;
                  (h2.unsuspend = null), e8();
                }
              }, 6e4 + m2);
              0 < h2.imgBytes &&
                xh === 0 &&
                (xh =
                  62500 *
                  (function () {
                    if (typeof performance.getEntriesByType == "function") {
                      for (
                        var e8 = 0, t4 = 0, n4 = performance.getEntriesByType("resource"), r3 = 0;
                        r3 < n4.length;
                        r3++
                      ) {
                        var o3 = n4[r3],
                          a3 = o3.transferSize,
                          l3 = o3.initiatorType,
                          i3 = o3.duration;
                        if (a3 && i3 && Qf(l3)) {
                          for (l3 = 0, i3 = o3.responseEnd, r3 += 1; r3 < n4.length; r3++) {
                            var s3 = n4[r3],
                              u3 = s3.startTime;
                            if (u3 > i3) break;
                            var c3 = s3.transferSize,
                              d3 = s3.initiatorType;
                            c3 &&
                              Qf(d3) &&
                              (l3 += c3 * ((s3 = s3.responseEnd) < i3 ? 1 : (i3 - u3) / (s3 - u3)));
                          }
                          if ((--r3, (t4 += (8 * (a3 + l3)) / (o3.duration / 1e3)), 10 < ++e8))
                            break;
                        }
                      }
                      if (0 < e8) return t4 / e8 / 1e6;
                    }
                    return navigator.connection &&
                      typeof (e8 = navigator.connection.downlink) == "number"
                      ? e8
                      : 5;
                  })());
              var n3 = setTimeout(
                function () {
                  if (
                    ((h2.waitingForImages = !1),
                    h2.count === 0 && (h2.stylesheets && Oh(h2, h2.stylesheets), h2.unsuspend))
                  ) {
                    var e8 = h2.unsuspend;
                    (h2.unsuspend = null), e8();
                  }
                },
                (h2.imgBytes > xh ? 50 : 800) + m2,
              );
              return (
                (h2.unsuspend = e7),
                function () {
                  (h2.unsuspend = null), clearTimeout(t3), clearTimeout(n3);
                }
              );
            }
          : null) !== null))
  )
    return (
      (vd = a2),
      (e6.cancelPendingCommit = g2(
        Yd.bind(null, e6, t2, a2, n2, r2, o2, l2, i2, s2, u2, c2, d2, null, f2, p2),
      )),
      void Rd(e6, a2, l2, !u2)
    );
  Yd(e6, t2, a2, n2, r2, o2, l2, i2, s2, u2, c2, d2);
}
function Md(e6) {
  for (var t2 = e6; ; ) {
    var n2 = t2.tag;
    if (
      (n2 === 0 || n2 === 11 || n2 === 15) &&
      16384 & t2.flags &&
      (n2 = t2.updateQueue) !== null &&
      (n2 = n2.stores) !== null
    )
      for (var r2 = 0; r2 < n2.length; r2++) {
        var o2 = n2[r2],
          a2 = o2.getSnapshot;
        o2 = o2.value;
        try {
          if (!Ar(a2(), o2)) return !1;
        } catch {
          return !1;
        }
      }
    if (((n2 = t2.child), 16384 & t2.subtreeFlags && n2 !== null)) (n2.return = t2), (t2 = n2);
    else {
      if (t2 === e6) break;
      for (; t2.sibling === null; ) {
        if (t2.return === null || t2.return === e6) return !0;
        t2 = t2.return;
      }
      (t2.sibling.return = t2.return), (t2 = t2.sibling);
    }
  }
  return !0;
}
function Rd(e6, t2, n2, r2) {
  (t2 = st(e6, t2)),
    (t2 &= ~rd),
    (t2 &= ~nd),
    (e6.suspendedLanes |= t2),
    (e6.pingedLanes &= ~t2),
    r2 && (e6.warmLanes |= t2),
    (r2 = e6.expirationTimes);
  for (var o2 = t2; 0 < o2; ) {
    var a2 = 31 - Ze(o2),
      l2 = 1 << a2;
    (r2[a2] = -1), (o2 &= ~l2);
  }
  n2 !== 0 && pt(e6, n2, t2);
}
function Ld() {
  return !!(6 & Uc) || (wf(0, !1), !1);
}
function Id() {
  if (qc !== null) {
    if (Kc === 0) var e6 = qc.return;
    else (ha = pa = null), ei((e6 = qc)), (Za = null), (el = 0), (e6 = qc);
    for (; e6 !== null; ) du(e6.alternate, e6), (e6 = e6.return);
    qc = null;
  }
}
function Ad(e6, t2) {
  var n2 = e6.timeoutHandle;
  return (
    n2 !== -1 && ((e6.timeoutHandle = -1), ip(n2)),
    (n2 = e6.cancelPendingCommit) !== null && ((e6.cancelPendingCommit = null), n2()),
    (vd = 0),
    Id(),
    (Wc = e6),
    (qc = n2 = No(e6.current, null)),
    (Xc = t2),
    (Kc = 0),
    (Gc = null),
    (Yc = !1),
    (Qc = it(e6, t2)),
    (Jc = !1),
    (ad = od = rd = nd = td = ed = 0),
    (id = ld = null),
    (sd = !1),
    (Zc = st(e6, t2)),
    wo(),
    n2
  );
}
function Fd(e6, t2) {
  (Al = null),
    (pe.H = ss),
    t2 === Ba || t2 === Wa
      ? ((t2 = Qa()), (Kc = 3))
      : t2 === Ua
        ? ((t2 = Qa()), (Kc = 4))
        : (Kc =
            t2 === Cs
              ? 8
              : t2 !== null && typeof t2 == "object" && typeof t2.then == "function"
                ? 6
                : 1),
    (Gc = t2),
    qc === null && ((ed = 1), ws(e6, zo(t2, e6.current)));
}
function zd() {
  var e6 = kl.current;
  return (
    e6 === null ||
    ((4194048 & Xc) === Xc
      ? Cl === null
      : !!((62914560 & Xc) === Xc || 536870912 & Xc) && e6 === Cl)
  );
}
function jd() {
  var e6 = pe.H;
  return (pe.H = ss), e6 === null ? ss : e6;
}
function Dd() {
  var e6 = pe.A;
  return (pe.A = Vc), e6;
}
function Hd() {
  (ed = 4),
    Yc || ((4194048 & Xc) !== Xc && kl.current !== null) || (Qc = !0),
    (!(134217727 & td) && !(134217727 & nd)) || Wc === null || Rd(Wc, Xc, od, !1);
}
function Vd(e6, t2, n2) {
  var r2 = Uc;
  Uc |= 2;
  var o2 = jd(),
    a2 = Dd();
  (Wc === e6 && Xc === t2) || ((fd = null), Ad(e6, t2)), (t2 = !1);
  var l2 = ed;
  e: for (;;)
    try {
      if (Kc !== 0 && qc !== null) {
        var i2 = qc,
          s2 = Gc;
        switch (Kc) {
          case 8:
            Id(), (l2 = 6);
            break e;
          case 3:
          case 2:
          case 9:
          case 6:
            kl.current === null && (t2 = !0);
            var u2 = Kc;
            if (((Kc = 0), (Gc = null), Xd(e6, i2, s2, u2), n2 && Qc)) {
              l2 = 0;
              break e;
            }
            break;
          default:
            (u2 = Kc), (Kc = 0), (Gc = null), Xd(e6, i2, s2, u2);
        }
      }
      Bd(), (l2 = ed);
      break;
    } catch (c2) {
      Fd(e6, c2);
    }
  return (
    t2 && e6.shellSuspendCounter++,
    (ha = pa = null),
    (Uc = r2),
    (pe.H = o2),
    (pe.A = a2),
    qc === null && ((Wc = null), (Xc = 0), wo()),
    l2
  );
}
function Bd() {
  for (; qc !== null; ) Wd(qc);
}
function Ud() {
  for (; qc !== null && !je(); ) Wd(qc);
}
function Wd(e6) {
  var t2 = nu(e6.alternate, e6, Zc);
  (e6.memoizedProps = e6.pendingProps), t2 === null ? Kd(e6) : (qc = t2);
}
function qd(e6) {
  var t2 = e6,
    n2 = t2.alternate;
  switch (t2.tag) {
    case 15:
    case 0:
      t2 = zs(n2, t2, t2.pendingProps, t2.type, void 0, Xc);
      break;
    case 11:
      t2 = zs(n2, t2, t2.pendingProps, t2.type.render, t2.ref, Xc);
      break;
    case 5:
      ei(t2);
      var r2 = t2;
      r2 === Zo &&
        (ta
          ? (ia(r2), r2.tag === 5 && r2.stateNode != null && (ea = r2.stateNode))
          : (ia(r2), (ta = !0)));
    default:
      du(n2, t2), (t2 = nu(n2, (t2 = qc = $o(t2, Zc)), Zc));
  }
  (e6.memoizedProps = e6.pendingProps), t2 === null ? Kd(e6) : (qc = t2);
}
function Xd(e6, t2, n2, r2) {
  (ha = pa = null), ei(t2), (Za = null), (el = 0);
  var o2 = t2.return;
  try {
    if (
      (function (e7, t3, n3, r3, o3) {
        if (
          ((n3.flags |= 32768),
          r3 !== null && typeof r3 == "object" && typeof r3.then == "function")
        ) {
          if (((t3 = n3.alternate) !== null && ba(t3, n3, o3, !0), (n3 = kl.current) !== null)) {
            switch (n3.tag) {
              case 31:
              case 13:
              case 19:
                return (
                  Cl === null ? Hd() : n3.alternate === null && ed === 0 && (ed = 3),
                  (n3.flags &= -257),
                  (n3.flags |= 65536),
                  (n3.lanes = o3),
                  r3 === qa
                    ? (n3.flags |= 16384)
                    : ((t3 = n3.updateQueue) === null
                        ? (n3.updateQueue = new Set([r3]))
                        : t3.add(r3),
                      sf(e7, r3, o3)),
                  !1
                );
              case 22:
                return (
                  (n3.flags |= 65536),
                  r3 === qa
                    ? (n3.flags |= 16384)
                    : ((t3 = n3.updateQueue) === null
                        ? ((t3 = {
                            transitions: null,
                            markerInstances: null,
                            retryQueue: new Set([r3]),
                          }),
                          (n3.updateQueue = t3))
                        : (n3 = t3.retryQueue) === null
                          ? (t3.retryQueue = new Set([r3]))
                          : n3.add(r3),
                      sf(e7, r3, o3)),
                  !1
                );
            }
            throw Error(k(435, n3.tag));
          }
          return sf(e7, r3, o3), Hd(), !1;
        }
        if (ta)
          return (
            (t3 = kl.current) !== null
              ? (!(65536 & t3.flags) && (t3.flags |= 256),
                (t3.flags |= 65536),
                (t3.lanes = o3),
                r3 !== oa && da(zo((e7 = Error(k(422), { cause: r3 })), n3)))
              : (r3 !== oa && da(zo((t3 = Error(k(423), { cause: r3 })), n3)),
                ((e7 = e7.current.alternate).flags |= 65536),
                (o3 &= -o3),
                (e7.lanes |= o3),
                (r3 = zo(r3, n3)),
                pl(e7, (o3 = Ss(e7.stateNode, r3, o3))),
                ed !== 4 && (ed = 2)),
            !1
          );
        var a2 = Error(k(520), { cause: r3 });
        if (
          ((a2 = zo(a2, n3)),
          ld === null ? (ld = [a2]) : ld.push(a2),
          ed !== 4 && (ed = 2),
          t3 === null)
        )
          return !0;
        (r3 = zo(r3, n3)), (n3 = t3);
        do {
          switch (n3.tag) {
            case 3:
              return (
                (n3.flags |= 65536),
                (e7 = o3 & -o3),
                (n3.lanes |= e7),
                pl(n3, (e7 = Ss(n3.stateNode, r3, e7))),
                !1
              );
            case 1:
              if (
                ((t3 = n3.type),
                (a2 = n3.stateNode),
                !(
                  128 & n3.flags ||
                  (typeof t3.getDerivedStateFromError != "function" &&
                    (a2 === null ||
                      typeof a2.componentDidCatch != "function" ||
                      (pd !== null && pd.has(a2))))
                ))
              )
                return (
                  (n3.flags |= 65536),
                  (o3 &= -o3),
                  (n3.lanes |= o3),
                  ks((o3 = xs(o3)), e7, n3, r3),
                  pl(n3, o3),
                  !1
                );
              break;
            case 22:
              if (n3.memoizedState !== null) return (n3.flags |= 65536), !1;
          }
          n3 = n3.return;
        } while (n3 !== null);
        return !1;
      })(e6, o2, t2, n2, Xc)
    )
      return (ed = 1), ws(e6, zo(n2, e6.current)), void (qc = null);
  } catch (a2) {
    if (o2 !== null) throw ((qc = o2), a2);
    return (ed = 1), ws(e6, zo(n2, e6.current)), void (qc = null);
  }
  32768 & t2.flags
    ? (ta || r2 === 1
        ? (e6 = !0)
        : Qc || 536870912 & Xc
          ? (e6 = !1)
          : ((Yc = e6 = !0),
            (r2 === 2 || r2 === 9 || r2 === 3 || r2 === 6) &&
              (r2 = kl.current) !== null &&
              r2.tag === 13 &&
              (r2.flags |= 16384)),
      Gd(t2, e6))
    : Kd(t2);
}
function Kd(e6) {
  var t2 = e6;
  do {
    if (32768 & t2.flags) return void Gd(t2, Yc);
    e6 = t2.return;
    var n2 = uu(t2.alternate, t2, Zc);
    if (n2 !== null) return void (qc = n2);
    if ((t2 = t2.sibling) !== null) return void (qc = t2);
    qc = t2 = e6;
  } while (t2 !== null);
  ed === 0 && (ed = 5);
}
function Gd(e6, t2) {
  do {
    var n2 = cu(e6.alternate, e6);
    if (n2 !== null) return (n2.flags &= 32767), void (qc = n2);
    if (
      ((n2 = e6.return) !== null &&
        ((n2.flags |= 32768), (n2.subtreeFlags = 0), (n2.deletions = null)),
      !t2 && (e6 = e6.sibling) !== null)
    )
      return void (qc = e6);
    qc = e6 = n2;
  } while (e6 !== null);
  (ed = 6), (qc = null);
}
function Yd(e6, t2, n2, r2, o2, a2, l2, i2, s2, u2, c2, d2) {
  e6.cancelPendingCommit = null;
  do rf();
  while (hd !== 0);
  if (6 & Uc) throw Error(k(327));
  if (t2 !== null) {
    if (t2 === e6.current) throw Error(k(177));
    e6 === Wc && ((qc = Wc = null), (Xc = 0)),
      (gd = t2),
      (md = e6),
      (vd = n2),
      (bd = o2),
      (wd = r2),
      (function (e7, t3, n3, r3, o3, a3, l3) {
        var i3 = t3.lanes | t3.childLanes;
        if (
          ((yd = i3),
          (function (e8, t4, n4, r4, o4, a4) {
            var l4 = e8.pendingLanes;
            (e8.pendingLanes = n4),
              (e8.suspendedLanes = 0),
              (e8.pingedLanes = 0),
              (e8.warmLanes = 0),
              (e8.expiredLanes &= n4),
              (e8.entangledLanes &= n4),
              (e8.errorRecoveryDisabledLanes &= n4),
              (e8.shellSuspendCounter = 0);
            var i4 = e8.entanglements,
              s3 = e8.expirationTimes,
              u3 = e8.hiddenUpdates;
            for (n4 = l4 & ~n4; 0 < n4; ) {
              var c3 = 31 - Ze(n4),
                d3 = 1 << c3;
              (i4[c3] = 0), (s3[c3] = -1);
              var f2 = u3[c3];
              if (f2 !== null)
                for (u3[c3] = null, c3 = 0; c3 < f2.length; c3++) {
                  var p2 = f2[c3];
                  p2 !== null && (p2.lane &= -536870913);
                }
              n4 &= ~d3;
            }
            r4 !== 0 && pt(e8, r4, 0),
              a4 !== 0 && o4 === 0 && e8.tag !== 0 && (e8.suspendedLanes |= a4 & ~(l4 & ~t4));
          })(e7, n3, (i3 |= bo), r3, o3, a3),
          (Sd = null),
          (335544064 & n3) === n3
            ? ((xd = (function (e8) {
                var t4 = e8.transitionTypes;
                return (e8.transitionTypes = null), t4;
              })(e7)),
              (r3 = 10262))
            : ((xd = null), (r3 = 10256)),
          t3.subtreeFlags & r3 || t3.flags & r3
            ? ((e7.callbackNode = null),
              (e7.callbackPriority = 0),
              (function (e8, t4) {
                Fe(e8, t4);
              })(We, function () {
                return of(), null;
              }))
            : ((e7.callbackNode = null), (e7.callbackPriority = 0)),
          (Nu = !1),
          (r3 = !!(13878 & t3.flags)),
          !!(13878 & t3.subtreeFlags) || r3)
        ) {
          (r3 = pe.T), (pe.T = null), (o3 = he.p), (he.p = 2), (a3 = Uc), (Uc |= 4);
          try {
            (function (e8, t4, n4) {
              if (((e8 = e8.containerInfo), (Jf = jh), Br((e8 = Vr(e8))))) {
                if ("selectionStart" in e8)
                  var r4 = { start: e8.selectionStart, end: e8.selectionEnd };
                else
                  e: {
                    var o4 =
                      (r4 = ((r4 = e8.ownerDocument) && r4.defaultView) || window).getSelection &&
                      r4.getSelection();
                    if (o4 && o4.rangeCount !== 0) {
                      r4 = o4.anchorNode;
                      var a4 = o4.anchorOffset,
                        l4 = o4.focusNode;
                      o4 = o4.focusOffset;
                      try {
                        r4.nodeType, l4.nodeType;
                      } catch {
                        r4 = null;
                        break e;
                      }
                      var i4 = 0,
                        s3 = -1,
                        u3 = -1,
                        c3 = 0,
                        d3 = 0,
                        f2 = e8,
                        p2 = null;
                      t: for (;;) {
                        for (
                          var h2;
                          f2 !== r4 || (a4 !== 0 && f2.nodeType !== 3) || (s3 = i4 + a4),
                            f2 !== l4 || (o4 !== 0 && f2.nodeType !== 3) || (u3 = i4 + o4),
                            f2.nodeType === 3 && (i4 += f2.nodeValue.length),
                            (h2 = f2.firstChild) !== null;

                        )
                          (p2 = f2), (f2 = h2);
                        for (;;) {
                          if (f2 === e8) break t;
                          if (
                            (p2 === r4 && ++c3 === a4 && (s3 = i4),
                            p2 === l4 && ++d3 === o4 && (u3 = i4),
                            (h2 = f2.nextSibling) !== null)
                          )
                            break;
                          p2 = (f2 = p2).parentNode;
                        }
                        f2 = h2;
                      }
                      r4 = s3 === -1 || u3 === -1 ? null : { start: s3, end: u3 };
                    } else r4 = null;
                  }
                r4 = r4 || { start: 0, end: 0 };
              } else r4 = null;
              for (
                Zf = { focusedElem: e8, selectionRange: r4 },
                  jh = !1,
                  ec = t4,
                  t4 = (n4 = (335544064 & n4) === n4) ? 9270 : 1024;
                ec !== null;

              ) {
                if (((e8 = ec), n4 && (r4 = e8.deletions) !== null))
                  for (a4 = 0; a4 < r4.length; a4++) n4 && Vu(r4[a4]);
                if (e8.alternate === null && 2 & e8.flags) n4 && Mu(e8), ac(n4);
                else {
                  if (e8.tag === 22) {
                    if (((r4 = e8.alternate), e8.memoizedState !== null)) {
                      r4 !== null && r4.memoizedState === null && n4 && Vu(r4), ac(n4);
                      continue;
                    }
                    if (r4 !== null && r4.memoizedState !== null) {
                      n4 && Mu(e8), ac(n4);
                      continue;
                    }
                  }
                  (r4 = e8.child),
                    e8.subtreeFlags & t4 && r4 !== null
                      ? ((r4.return = e8), (ec = r4))
                      : (n4 && Bu(e8), ac(n4));
                }
              }
              $u = null;
            })(e7, t3, n3);
          } finally {
            (Uc = a3), (he.p = o3), (pe.T = r3);
          }
        }
        (hd = 1),
          Nu
            ? (Ed = (function (e8, t4, n4, r4, o4, a4, l4, i4, s3) {
                var u3 = t4.nodeType === 9 ? t4 : t4.ownerDocument;
                try {
                  var c3 = u3.startViewTransition({
                    update: function () {
                      var t5 = u3.defaultView,
                        n5 = t5.navigation && t5.navigation.transition,
                        l5 = u3.fonts.status;
                      r4();
                      var i5 = [];
                      if (
                        (l5 === "loaded" &&
                          ((function (e9) {
                            e9.documentElement.clientHeight;
                          })(u3),
                          u3.fonts.status === "loading" && i5.push(u3.fonts.ready)),
                        (l5 = i5.length),
                        e8 !== null)
                      )
                        for (var s4 = e8.suspenseyImages, c4 = 0, d4 = 0; d4 < s4.length; d4++) {
                          var f2 = s4[d4];
                          if (!f2.complete) {
                            var p2 = f2.getBoundingClientRect();
                            if (
                              0 < p2.bottom &&
                              0 < p2.right &&
                              p2.top < t5.innerHeight &&
                              p2.left < t5.innerWidth
                            ) {
                              if ((c4 += Eh(f2)) > xh) {
                                i5.length = l5;
                                break;
                              }
                              (f2 = new Promise(wp.bind(f2))), i5.push(f2);
                            }
                          }
                        }
                      return 0 < i5.length
                        ? ((t5 = Promise.race([
                            Promise.all(i5),
                            new Promise(function (e9) {
                              return setTimeout(e9, 500);
                            }),
                          ]).then(o4, o4)),
                          (n5 ? Promise.allSettled([n5.finished, t5]) : t5).then(a4, a4))
                        : (o4(), n5 ? n5.finished.then(a4, a4) : void a4());
                    },
                    types: n4,
                  });
                  u3.__reactViewTransition = c3;
                  var d3 = [];
                  return (
                    c3.ready.then(
                      function () {
                        for (
                          var e9 = u3.documentElement.getAnimations({ subtree: !0 }), t5 = 0;
                          t5 < e9.length;
                          t5++
                        ) {
                          var n5 = e9[t5],
                            r5 = n5.effect,
                            o5 = r5.pseudoElement;
                          if (o5 != null && o5.startsWith("::view-transition")) {
                            d3.push(n5), (n5 = r5.getKeyframes());
                            for (var a5 = (o5 = void 0), i5 = !0, s4 = 0; s4 < n5.length; s4++) {
                              var c4 = n5[s4],
                                f2 = c4.width;
                              if (o5 === void 0) o5 = f2;
                              else if (o5 !== f2) {
                                i5 = !1;
                                break;
                              }
                              if (((f2 = c4.height), a5 === void 0)) a5 = f2;
                              else if (a5 !== f2) {
                                i5 = !1;
                                break;
                              }
                              delete c4.width,
                                delete c4.height,
                                c4.transform === "none" && delete c4.transform;
                            }
                            i5 &&
                              o5 !== void 0 &&
                              a5 !== void 0 &&
                              (r5.setKeyframes(n5),
                              (i5 = getComputedStyle(r5.target, r5.pseudoElement)).width !== o5 ||
                                i5.height !== a5) &&
                              (((i5 = n5[0]).width = o5),
                              (i5.height = a5),
                              ((i5 = n5[n5.length - 1]).width = o5),
                              (i5.height = a5),
                              r5.setKeyframes(n5));
                          }
                        }
                        l4();
                      },
                      function (e9) {
                        u3.__reactViewTransition === c3 && (u3.__reactViewTransition = null);
                        try {
                          typeof e9 == "object" &&
                            e9 !== null &&
                            e9.name === "InvalidStateError" &&
                            ((e9.message !==
                              "View transition was skipped because document visibility state is hidden." &&
                              e9.message !==
                                "Skipping view transition because document visibility state has become hidden." &&
                              e9.message !==
                                "Skipping view transition because viewport size changed." &&
                              e9.message !== "Transition was aborted because of invalid state") ||
                              (e9 = null)),
                            e9 !== null && s3(e9);
                        } finally {
                          r4(), o4(), l4();
                        }
                      },
                    ),
                    c3.finished.finally(function () {
                      for (var e9 = 0; e9 < d3.length; e9++) d3[e9].cancel();
                      u3.__reactViewTransition === c3 && (u3.__reactViewTransition = null), i4();
                    }),
                    c3
                  );
                } catch {
                  return r4(), o4(), l4(), null;
                }
              })(l3, e7.containerInfo, xd, Zd, ef, Jd, tf, of, Qd))
            : (Zd(), ef(), tf());
      })(e6, t2, n2, l2, i2, s2, d2);
  }
}
function Qd(e6) {
  hd !== 0 && (0, md.onRecoverableError)(e6, { componentStack: null });
}
function Jd() {
  hd === 3 && ((hd = 0), kc(gd, md), (hd = 4));
}
function Zd() {
  if (hd === 1) {
    hd = 0;
    var e6 = md,
      t2 = gd,
      n2 = vd,
      r2 = !!(13878 & t2.flags);
    if (13878 & t2.subtreeFlags || r2) {
      (r2 = pe.T), (pe.T = null);
      var o2 = he.p;
      he.p = 2;
      var a2 = Uc;
      Uc |= 4;
      try {
        (nc = rc = !1), wc(t2, e6, n2), (n2 = Zf);
        var l2 = Vr(e6.containerInfo),
          i2 = n2.focusedElem,
          s2 = n2.selectionRange;
        if (l2 !== i2 && i2 && i2.ownerDocument && Hr(i2.ownerDocument.documentElement, i2)) {
          if (s2 !== null && Br(i2)) {
            var u2 = s2.start,
              c2 = s2.end;
            if ((c2 === void 0 && (c2 = u2), "selectionStart" in i2))
              (i2.selectionStart = u2), (i2.selectionEnd = Math.min(c2, i2.value.length));
            else {
              var d2 = i2.ownerDocument || document,
                f2 = (d2 && d2.defaultView) || window;
              if (f2.getSelection) {
                var p2 = f2.getSelection(),
                  h2 = i2.textContent.length,
                  m2 = Math.min(s2.start, h2),
                  g2 = s2.end === void 0 ? m2 : Math.min(s2.end, h2);
                !p2.extend && m2 > g2 && ((l2 = g2), (g2 = m2), (m2 = l2));
                var v2 = Dr(i2, m2),
                  y2 = Dr(i2, g2);
                if (
                  v2 &&
                  y2 &&
                  (p2.rangeCount !== 1 ||
                    p2.anchorNode !== v2.node ||
                    p2.anchorOffset !== v2.offset ||
                    p2.focusNode !== y2.node ||
                    p2.focusOffset !== y2.offset)
                ) {
                  var b2 = d2.createRange();
                  b2.setStart(v2.node, v2.offset),
                    p2.removeAllRanges(),
                    m2 > g2
                      ? (p2.addRange(b2), p2.extend(y2.node, y2.offset))
                      : (b2.setEnd(y2.node, y2.offset), p2.addRange(b2));
                }
              }
            }
          }
          for (d2 = [], p2 = i2; (p2 = p2.parentNode); )
            p2.nodeType === 1 && d2.push({ element: p2, left: p2.scrollLeft, top: p2.scrollTop });
          for (typeof i2.focus == "function" && i2.focus(), i2 = 0; i2 < d2.length; i2++) {
            var w2 = d2[i2];
            (w2.element.scrollLeft = w2.left), (w2.element.scrollTop = w2.top);
          }
        }
        (jh = !!Jf), (Zf = Jf = null);
      } finally {
        (Uc = a2), (he.p = o2), (pe.T = r2);
      }
    }
    (e6.current = t2), (hd = 2);
  }
}
function ef() {
  if (hd === 2) {
    hd = 0;
    var e6 = md,
      t2 = gd,
      n2 = !!(8772 & t2.flags);
    if (8772 & t2.subtreeFlags || n2) {
      (n2 = pe.T), (pe.T = null);
      var r2 = he.p;
      he.p = 2;
      var o2 = Uc;
      Uc |= 4;
      try {
        lc(e6, t2.alternate, t2);
      } finally {
        (Uc = o2), (he.p = r2), (pe.T = n2);
      }
    }
    hd = 3;
  }
}
function tf() {
  if (hd === 4 || hd === 3) {
    hd = 0;
    var e6 = Ed;
    (Ed = null), De();
    var t2 = md,
      n2 = gd,
      r2 = vd,
      o2 = wd,
      a2 = (335544064 & r2) === r2 ? 10262 : 10256;
    if (
      (n2.subtreeFlags & a2 || n2.flags & a2
        ? (hd = 5)
        : ((hd = 0), (gd = md = null), nf(t2, t2.pendingLanes)),
      (a2 = t2.pendingLanes) === 0 && (pd = null),
      vt(r2),
      (n2 = n2.stateNode),
      Qe && typeof Qe.onCommitFiberRoot == "function")
    )
      try {
        Qe.onCommitFiberRoot(Ye, n2, void 0, !(128 & ~n2.current.flags));
      } catch {}
    if (o2 !== null) {
      (n2 = pe.T), (a2 = he.p), (he.p = 2), (pe.T = null);
      try {
        for (var l2 = t2.onRecoverableError, i2 = 0; i2 < o2.length; i2++) {
          var s2 = o2[i2];
          l2(s2.value, { componentStack: s2.stack });
        }
      } finally {
        (pe.T = n2), (he.p = a2);
      }
    }
    if (
      ((l2 = xd),
      (xd = null),
      (o2 = Sd) !== null && ((Sd = null), l2 === null && (l2 = []), e6 !== null))
    )
      for (s2 = 0; s2 < o2.length; s2++)
        (n2 = (0, o2[s2])(l2)) !== void 0 && e6.finished.finally(n2);
    3 & vd && rf(),
      bf(t2),
      (a2 = t2.pendingLanes),
      261930 & r2 && 42 & a2 ? (t2 === Cd ? kd++ : ((kd = 0), (Cd = t2))) : ((kd = 0), (Cd = null)),
      wf(0, !1);
  }
}
function nf(e6, t2) {
  (e6.pooledCacheLanes &= t2) === 0 &&
    (t2 = e6.pooledCache) != null &&
    ((e6.pooledCache = null), Na(t2));
}
function rf() {
  return Ed !== null && (Ed.skipTransition(), (Ed = null)), Zd(), ef(), tf(), of();
}
function of() {
  if (hd !== 5) return !1;
  var e6 = md,
    t2 = yd;
  yd = 0;
  var n2 = vt(vd),
    r2 = pe.T,
    o2 = he.p;
  try {
    (he.p = 32 > n2 ? 32 : n2), (pe.T = null), (n2 = bd), (bd = null);
    var a2 = md,
      l2 = vd;
    if (((hd = 0), (gd = md = null), (vd = 0), 6 & Uc)) throw Error(k(331));
    var i2 = Uc;
    if (
      ((Uc |= 4),
      jc(a2.current),
      $c(a2, a2.current, l2, n2),
      (Uc = i2),
      wf(0, !1),
      Qe && typeof Qe.onPostCommitFiberRoot == "function")
    )
      try {
        Qe.onPostCommitFiberRoot(Ye, a2);
      } catch {}
    return !0;
  } finally {
    (he.p = o2), (pe.T = r2), nf(e6, t2);
  }
}
function af(e6, t2, n2) {
  (t2 = zo(n2, t2)),
    (e6 = dl(e6, (t2 = Ss(e6.stateNode, t2, 2)), 2)) !== null && (ft(e6, 2), bf(e6));
}
function lf(e6, t2, n2) {
  if (e6.tag === 3) af(e6, e6, n2);
  else
    for (; t2 !== null; ) {
      if (t2.tag === 3) {
        af(t2, e6, n2);
        break;
      }
      if (t2.tag === 1) {
        var r2 = t2.stateNode;
        if (
          typeof t2.type.getDerivedStateFromError == "function" ||
          (typeof r2.componentDidCatch == "function" && (pd === null || !pd.has(r2)))
        ) {
          (e6 = zo(n2, e6)),
            (r2 = dl(t2, (n2 = xs(2)), 2)) !== null && (ks(n2, r2, t2, e6), ft(r2, 2), bf(r2));
          break;
        }
      }
      t2 = t2.return;
    }
}
function sf(e6, t2, n2) {
  var r2 = e6.pingCache;
  if (r2 === null) {
    r2 = e6.pingCache = new Bc();
    var o2 = new Set();
    r2.set(t2, o2);
  } else (o2 = r2.get(t2)) === void 0 && ((o2 = new Set()), r2.set(t2, o2));
  o2.has(n2) || ((Jc = !0), o2.add(n2), (e6 = uf.bind(null, e6, t2, n2)), t2.then(e6, e6));
}
function uf(e6, t2, n2) {
  var r2 = e6.pingCache;
  r2 !== null && r2.delete(t2),
    (e6.pingedLanes |= e6.suspendedLanes & n2),
    (e6.warmLanes &= ~n2),
    Wc === e6 &&
      (Xc & n2) === n2 &&
      (ed === 4 || (ed === 3 && (62914560 & Xc) === Xc && 300 > He() - ud)
        ? 2 & Uc
          ? (rd |= n2)
          : Ad(e6, 0)
        : (rd |= n2),
      ad === Xc && (ad = 0)),
    bf(e6);
}
function cf(e6, t2) {
  t2 === 0 && (t2 = ct()), (e6 = xo(e6, t2)) !== null && (ft(e6, t2), bf(e6));
}
function df(e6) {
  var t2 = e6.memoizedState,
    n2 = 0;
  t2 !== null && (n2 = t2.retryLane), cf(e6, n2);
}
function ff(e6, t2) {
  var n2 = 0;
  switch (e6.tag) {
    case 31:
    case 13:
      var r2 = e6.stateNode,
        o2 = e6.memoizedState;
      o2 !== null && (n2 = o2.retryLane);
      break;
    case 19:
      r2 = e6.stateNode;
      break;
    case 22:
      r2 = e6.stateNode._retryCache;
      break;
    default:
      throw Error(k(314));
  }
  r2 !== null && r2.delete(t2), cf(e6, n2);
}
var pf = null,
  hf = null,
  mf = !1,
  gf = !1,
  vf = !1,
  yf = 0;
function bf(e6) {
  e6 !== hf && e6.next === null && (hf === null ? (pf = hf = e6) : (hf = hf.next = e6)),
    (gf = !0),
    mf ||
      ((mf = !0),
      cp(function () {
        6 & Uc ? Fe(Be, Ef) : Sf();
      }));
}
function wf(e6, t2) {
  if (!vf && gf) {
    vf = !0;
    do
      for (var n2 = !1, r2 = pf; r2 !== null; ) {
        if (!t2)
          if (e6 !== 0) {
            var o2 = r2.pendingLanes;
            if (o2 === 0) var a2 = 0;
            else {
              var l2 = r2.suspendedLanes,
                i2 = r2.pingedLanes;
              (a2 = (1 << (31 - Ze(42 | e6) + 1)) - 1),
                (a2 =
                  201326741 & (a2 &= o2 & ~(l2 & ~i2)) ? (201326741 & a2) | 1 : a2 ? 2 | a2 : 0);
            }
            a2 !== 0 && ((n2 = !0), Cf(r2, a2));
          } else
            (a2 = Xc),
              !(
                3 &
                (a2 = lt(
                  r2,
                  r2 === Wc ? a2 : 0,
                  r2.cancelPendingCommit !== null || r2.timeoutHandle !== -1,
                ))
              ) ||
                it(r2, a2) ||
                ((n2 = !0), Cf(r2, a2));
        r2 = r2.next;
      }
    while (n2);
    vf = !1;
  }
}
function Ef() {
  Sf();
}
function Sf() {
  gf = mf = !1;
  var e6 = 0;
  yf !== 0 &&
    (function () {
      var e7 = window.event;
      return e7 && e7.type === "popstate" ? e7 !== ap && ((ap = e7), !0) : ((ap = null), !1);
    })() &&
    (e6 = yf);
  for (var t2 = He(), n2 = null, r2 = pf; r2 !== null; ) {
    var o2 = r2.next,
      a2 = xf(r2, t2);
    a2 === 0
      ? ((r2.next = null), n2 === null ? (pf = o2) : (n2.next = o2), o2 === null && (hf = n2))
      : ((n2 = r2), (e6 !== 0 || 3 & a2) && (gf = !0)),
      (r2 = o2);
  }
  (hd !== 0 && hd !== 5) || wf(e6, !1), yf !== 0 && (yf = 0);
}
function xf(e6, t2) {
  for (
    var n2 = e6.suspendedLanes,
      r2 = e6.pingedLanes,
      o2 = e6.expirationTimes,
      a2 = -62914561 & e6.pendingLanes;
    0 < a2;

  ) {
    var l2 = 31 - Ze(a2),
      i2 = 1 << l2,
      s2 = o2[l2];
    s2 === -1
      ? (i2 & n2 && !(i2 & r2)) || (o2[l2] = ut(i2, t2))
      : s2 <= t2 && (e6.expiredLanes |= i2),
      (a2 &= ~i2);
  }
  if (
    ((n2 = Xc),
    (n2 = lt(
      e6,
      e6 === (t2 = Wc) ? n2 : 0,
      e6.cancelPendingCommit !== null || e6.timeoutHandle !== -1,
    )),
    (r2 = e6.callbackNode),
    n2 === 0 || (e6 === t2 && (Kc === 2 || Kc === 9)) || e6.cancelPendingCommit !== null)
  )
    return (
      r2 !== null && r2 !== null && ze(r2), (e6.callbackNode = null), (e6.callbackPriority = 0)
    );
  if (!(3 & n2) || it(e6, n2)) {
    if ((t2 = n2 & -n2) === e6.callbackPriority) return t2;
    switch ((r2 !== null && ze(r2), vt(n2))) {
      case 2:
      case 8:
        n2 = Ue;
        break;
      case 32:
      default:
        n2 = We;
        break;
      case 268435456:
        n2 = Xe;
    }
    return (
      (r2 = kf.bind(null, e6)),
      (n2 = Fe(n2, r2)),
      (e6.callbackPriority = t2),
      (e6.callbackNode = n2),
      t2
    );
  }
  return (
    r2 !== null && r2 !== null && ze(r2), (e6.callbackPriority = 2), (e6.callbackNode = null), 2
  );
}
function kf(e6, t2) {
  if (hd !== 0 && hd !== 5) return (e6.callbackNode = null), (e6.callbackPriority = 0), null;
  var n2 = e6.callbackNode;
  if (rf() && e6.callbackNode !== n2) return null;
  var r2 = Xc;
  return (r2 = lt(
    e6,
    e6 === Wc ? r2 : 0,
    e6.cancelPendingCommit !== null || e6.timeoutHandle !== -1,
  )) === 0
    ? null
    : (Nd(e6, r2, t2),
      xf(e6, He()),
      e6.callbackNode != null && e6.callbackNode === n2 ? kf.bind(null, e6) : null);
}
function Cf(e6, t2) {
  if (rf()) return null;
  Nd(e6, t2, !0);
}
function _f() {
  if (yf === 0) {
    var e6 = Ia;
    e6 === 0 && ((e6 = nt), !(261888 & (nt <<= 1)) && (nt = 256)), (yf = e6);
  }
  return yf;
}
function Pf(e6) {
  return e6 == null || typeof e6 == "symbol" || typeof e6 == "boolean"
    ? null
    : typeof e6 == "function"
      ? e6
      : mn(e6);
}
for (var Of = 0; Of < uo.length; Of++) {
  var Tf = uo[Of];
  co(Tf.toLowerCase(), "on" + (Tf[0].toUpperCase() + Tf.slice(1)));
}
co(to, "onAnimationEnd"),
  co(no, "onAnimationIteration"),
  co(ro, "onAnimationStart"),
  co("dblclick", "onDoubleClick"),
  co("focusin", "onFocus"),
  co("focusout", "onBlur"),
  co(oo, "onTransitionRun"),
  co(ao, "onTransitionStart"),
  co(lo, "onTransitionCancel"),
  co(io, "onTransitionEnd"),
  Dt("onMouseEnter", ["mouseout", "mouseover"]),
  Dt("onMouseLeave", ["mouseout", "mouseover"]),
  Dt("onPointerEnter", ["pointerout", "pointerover"]),
  Dt("onPointerLeave", ["pointerout", "pointerover"]),
  jt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")),
  jt(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " ",
    ),
  ),
  jt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
  jt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")),
  jt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")),
  jt(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
  );
var Nf =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " ",
    ),
  $f = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Nf),
  );
function Mf(e6, t2) {
  t2 = !!(4 & t2);
  for (var n2 = 0; n2 < e6.length; n2++) {
    var r2 = e6[n2],
      o2 = r2.event;
    r2 = r2.listeners;
    e: {
      var a2 = void 0;
      if (t2)
        for (var l2 = r2.length - 1; 0 <= l2; l2--) {
          var i2 = r2[l2],
            s2 = i2.instance,
            u2 = i2.currentTarget;
          if (((i2 = i2.listener), s2 !== a2 && o2.isPropagationStopped())) break e;
          (a2 = i2), (o2.currentTarget = u2);
          try {
            a2(o2);
          } catch (c2) {
            go(c2);
          }
          (o2.currentTarget = null), (a2 = s2);
        }
      else
        for (l2 = 0; l2 < r2.length; l2++) {
          if (
            ((s2 = (i2 = r2[l2]).instance),
            (u2 = i2.currentTarget),
            (i2 = i2.listener),
            s2 !== a2 && o2.isPropagationStopped())
          )
            break e;
          (a2 = i2), (o2.currentTarget = u2);
          try {
            a2(o2);
          } catch (c2) {
            go(c2);
          }
          (o2.currentTarget = null), (a2 = s2);
        }
    }
  }
}
function Rf(e6, t2) {
  var n2 = t2[kt];
  n2 === void 0 && (n2 = t2[kt] = new Set());
  var r2 = e6 + "__bubble";
  n2.has(r2) || (Ff(t2, e6, 2, !1), n2.add(r2));
}
function Lf(e6, t2, n2) {
  var r2 = 0;
  t2 && (r2 |= 4), Ff(n2, e6, r2, t2);
}
var If = "_reactListening" + Math.random().toString(36).slice(2);
function Af(e6) {
  if (!e6[If]) {
    (e6[If] = !0),
      Ft.forEach(function (t3) {
        t3 !== "selectionchange" && ($f.has(t3) || Lf(t3, !1, e6), Lf(t3, !0, e6));
      });
    var t2 = e6.nodeType === 9 ? e6 : e6.ownerDocument;
    t2 === null || t2[If] || ((t2[If] = !0), Lf("selectionchange", !1, t2));
  }
}
function Ff(e6, t2, n2, r2) {
  switch (qh(t2)) {
    case 2:
      var o2 = Dh;
      break;
    case 8:
      o2 = Hh;
      break;
    default:
      o2 = Vh;
  }
  (n2 = o2.bind(null, t2, n2, e6)),
    (o2 = void 0),
    !_n || (t2 !== "touchstart" && t2 !== "touchmove" && t2 !== "wheel") || (o2 = !0),
    r2
      ? o2 !== void 0
        ? e6.addEventListener(t2, n2, { capture: !0, passive: o2 })
        : e6.addEventListener(t2, n2, !0)
      : o2 !== void 0
        ? e6.addEventListener(t2, n2, { passive: o2 })
        : e6.addEventListener(t2, n2, !1);
}
function zf(e6, t2, n2, r2, o2) {
  var a2 = r2;
  if (!(1 & t2 || 2 & t2 || r2 === null))
    e: for (;;) {
      if (r2 === null) return;
      var l2 = r2.tag;
      if (l2 === 3 || l2 === 4) {
        var i2 = r2.stateNode.containerInfo;
        if (i2 === o2) break;
        if (l2 === 4)
          for (l2 = r2.return; l2 !== null; ) {
            var s2 = l2.tag;
            if ((s2 === 3 || s2 === 4) && l2.stateNode.containerInfo === o2) return;
            l2 = l2.return;
          }
        for (; i2 !== null; ) {
          if ((l2 = $t(i2)) === null) return;
          if ((s2 = l2.tag) === 5 || s2 === 6 || s2 === 26 || s2 === 27) {
            r2 = a2 = l2;
            continue e;
          }
          i2 = i2.parentNode;
        }
      }
      r2 = r2.return;
    }
  xn(function () {
    var r3 = a2,
      o3 = yn(n2),
      l3 = [];
    e: {
      var i3 = so.get(e6);
      if (i3 !== void 0) {
        var s3 = Dn,
          u2 = e6;
        switch (e6) {
          case "keypress":
            if (Mn(n2) === 0) break e;
          case "keydown":
          case "keyup":
            s3 = tr;
            break;
          case "focusin":
            (u2 = "focus"), (s3 = qn);
            break;
          case "focusout":
            (u2 = "blur"), (s3 = qn);
            break;
          case "beforeblur":
          case "afterblur":
            s3 = qn;
            break;
          case "click":
            if (n2.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            s3 = Un;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            s3 = Wn;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            s3 = or;
            break;
          case to:
          case no:
          case ro:
            s3 = Xn;
            break;
          case io:
            s3 = ar;
            break;
          case "scroll":
          case "scrollend":
            s3 = Vn;
            break;
          case "wheel":
            s3 = lr;
            break;
          case "copy":
          case "cut":
          case "paste":
            s3 = Kn;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            s3 = nr;
            break;
          case "submit":
            s3 = rr;
            break;
          case "toggle":
          case "beforetoggle":
            s3 = ir;
        }
        var c2 = !!(4 & t2),
          d2 = !c2 && (e6 === "scroll" || e6 === "scrollend"),
          f2 = c2 ? (i3 !== null ? i3 + "Capture" : null) : i3;
        c2 = [];
        for (var p2, h2 = r3; h2 !== null; ) {
          var m2 = h2;
          if (
            ((p2 = m2.stateNode),
            ((m2 = m2.tag) !== 5 && m2 !== 26 && m2 !== 27) ||
              p2 === null ||
              f2 === null ||
              ((m2 = kn(h2, f2)) != null && c2.push(jf(h2, m2, p2))),
            d2)
          )
            break;
          h2 = h2.return;
        }
        0 < c2.length &&
          ((i3 = new s3(i3, u2, null, n2, o3)), l3.push({ event: i3, listeners: c2 }));
      }
    }
    if (!(7 & t2)) {
      if (
        ((i3 = e6 === "mouseout" || e6 === "pointerout"),
        ((s3 = e6 === "mouseover" || e6 === "pointerover") &&
          n2 !== vn &&
          (u2 = n2.relatedTarget || n2.fromElement) &&
          ($t(u2) || u2[xt])) ||
          ((i3 || s3) &&
            ((u2 =
              o3.window === o3
                ? o3
                : (s3 = o3.ownerDocument)
                  ? s3.defaultView || s3.parentWindow
                  : window),
            i3
              ? ((i3 = r3),
                (s3 = (s3 = n2.relatedTarget || n2.toElement) ? $t(s3) : null) !== null &&
                  ((d2 = _(s3)), (c2 = s3.tag), s3 !== d2 || (c2 !== 5 && c2 !== 27 && c2 !== 6)) &&
                  (s3 = null))
              : ((i3 = null), (s3 = r3)),
            i3 !== s3 &&
              ((c2 = Un),
              (m2 = "onMouseLeave"),
              (f2 = "onMouseEnter"),
              (h2 = "mouse"),
              (e6 !== "pointerout" && e6 !== "pointerover") ||
                ((c2 = nr), (m2 = "onPointerLeave"), (f2 = "onPointerEnter"), (h2 = "pointer")),
              (d2 = i3 == null ? u2 : Rt(i3)),
              (p2 = s3 == null ? u2 : Rt(s3)),
              ((u2 = new c2(m2, h2 + "leave", i3, n2, o3)).target = d2),
              (u2.relatedTarget = p2),
              (m2 = null),
              $t(o3) === r3 &&
                (((c2 = new c2(f2, h2 + "enter", s3, n2, o3)).target = p2),
                (c2.relatedTarget = d2),
                (m2 = c2)),
              (d2 = m2),
              (c2 = i3 && s3 ? V(i3, s3, Hf) : null),
              i3 !== null && Vf(l3, u2, i3, c2, !1),
              s3 !== null && d2 !== null && Vf(l3, d2, s3, c2, !0)))),
        (s3 = (i3 = r3 ? Rt(r3) : window).nodeName && i3.nodeName.toLowerCase()) === "select" ||
          (s3 === "input" && i3.type === "file"))
      )
        var g2 = Cr;
      else if (br(i3))
        if (_r) g2 = Ir;
        else {
          g2 = Rr;
          var v2 = Mr;
        }
      else
        !(s3 = i3.nodeName) ||
        s3.toLowerCase() !== "input" ||
        (i3.type !== "checkbox" && i3.type !== "radio")
          ? r3 && fn(r3.elementType) && (g2 = Cr)
          : (g2 = Lr);
      switch (
        (g2 && (g2 = g2(e6, r3)) ? wr(l3, g2, n2, o3) : v2 && v2(e6, i3, r3),
        (v2 = r3 ? Rt(r3) : window),
        e6)
      ) {
        case "focusin":
          (br(v2) || v2.contentEditable === "true") && ((Wr = v2), (qr = r3), (Xr = null));
          break;
        case "focusout":
          Xr = qr = Wr = null;
          break;
        case "mousedown":
          Kr = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          (Kr = !1), Gr(l3, n2, o3);
          break;
        case "selectionchange":
          if (Ur) break;
        case "keydown":
        case "keyup":
          Gr(l3, n2, o3);
      }
      var y2;
      if (ur)
        e: {
          switch (e6) {
            case "compositionstart":
              var b2 = "onCompositionStart";
              break e;
            case "compositionend":
              b2 = "onCompositionEnd";
              break e;
            case "compositionupdate":
              b2 = "onCompositionUpdate";
              break e;
          }
          b2 = void 0;
        }
      else
        vr
          ? mr(e6, n2) && (b2 = "onCompositionEnd")
          : e6 === "keydown" && n2.keyCode === 229 && (b2 = "onCompositionStart");
      b2 &&
        (fr &&
          n2.locale !== "ko" &&
          (vr || b2 !== "onCompositionStart"
            ? b2 === "onCompositionEnd" && vr && (y2 = $n())
            : ((Tn = "value" in (On = o3) ? On.value : On.textContent), (vr = !0))),
        0 < (v2 = Df(r3, b2)).length &&
          ((b2 = new Gn(b2, e6, null, n2, o3)),
          l3.push({ event: b2, listeners: v2 }),
          (y2 || (y2 = gr(n2)) !== null) && (b2.data = y2))),
        (y2 = dr
          ? (function (e7, t3) {
              switch (e7) {
                case "compositionend":
                  return gr(t3);
                case "keypress":
                  return t3.which !== 32 ? null : ((hr = !0), pr);
                case "textInput":
                  return (e7 = t3.data) === pr && hr ? null : e7;
                default:
                  return null;
              }
            })(e6, n2)
          : (function (e7, t3) {
              if (vr)
                return e7 === "compositionend" || (!ur && mr(e7, t3))
                  ? ((e7 = $n()), (Nn = Tn = On = null), (vr = !1), e7)
                  : null;
              switch (e7) {
                case "paste":
                default:
                  return null;
                case "keypress":
                  if (!(t3.ctrlKey || t3.altKey || t3.metaKey) || (t3.ctrlKey && t3.altKey)) {
                    if (t3.char && 1 < t3.char.length) return t3.char;
                    if (t3.which) return String.fromCharCode(t3.which);
                  }
                  return null;
                case "compositionend":
                  return fr && t3.locale !== "ko" ? null : t3.data;
              }
            })(e6, n2)) &&
          0 < (b2 = Df(r3, "onBeforeInput")).length &&
          ((v2 = new Gn("onBeforeInput", "beforeinput", null, n2, o3)),
          l3.push({ event: v2, listeners: b2 }),
          (v2.data = y2)),
        (function (e7, t3, n3, r4, o4) {
          if (t3 === "submit" && n3 && n3.stateNode === o4) {
            var a3 = Pf((o4[St] || null).action),
              l4 = r4.submitter;
            l4 &&
              (t3 = (t3 = l4[St] || null) ? Pf(t3.formAction) : l4.getAttribute("formAction")) !==
                null &&
              ((a3 = t3), (l4 = null));
            var i4 = new Dn("action", "action", null, r4, o4);
            e7.push({
              event: i4,
              listeners: [
                {
                  instance: null,
                  listener: function () {
                    if (r4.defaultPrevented) {
                      if (yf !== 0) {
                        var e8 = new FormData(o4, l4);
                        Ki(n3, { pending: !0, data: e8, method: o4.method, action: a3 }, null, e8);
                      }
                    } else
                      typeof a3 == "function" &&
                        (i4.preventDefault(),
                        (e8 = new FormData(o4, l4)),
                        Ki(n3, { pending: !0, data: e8, method: o4.method, action: a3 }, a3, e8));
                  },
                  currentTarget: o4,
                },
              ],
            });
          }
        })(l3, e6, r3, n2, o3);
    }
    Mf(l3, t2);
  });
}
function jf(e6, t2, n2) {
  return { instance: e6, listener: t2, currentTarget: n2 };
}
function Df(e6, t2) {
  for (var n2 = t2 + "Capture", r2 = []; e6 !== null; ) {
    var o2 = e6,
      a2 = o2.stateNode;
    if (
      (((o2 = o2.tag) !== 5 && o2 !== 26 && o2 !== 27) ||
        a2 === null ||
        ((o2 = kn(e6, n2)) != null && r2.unshift(jf(e6, o2, a2)),
        (o2 = kn(e6, t2)) != null && r2.push(jf(e6, o2, a2))),
      e6.tag === 3)
    )
      return r2;
    e6 = e6.return;
  }
  return [];
}
function Hf(e6) {
  if (e6 === null) return null;
  do e6 = e6.return;
  while (e6 && e6.tag !== 5 && e6.tag !== 27);
  return e6 || null;
}
function Vf(e6, t2, n2, r2, o2) {
  for (var a2 = t2._reactName, l2 = []; n2 !== null && n2 !== r2; ) {
    var i2 = n2,
      s2 = i2.alternate,
      u2 = i2.stateNode;
    if (((i2 = i2.tag), s2 !== null && s2 === r2)) break;
    (i2 !== 5 && i2 !== 26 && i2 !== 27) ||
      u2 === null ||
      ((s2 = u2),
      o2
        ? (u2 = kn(n2, a2)) != null && l2.unshift(jf(n2, u2, s2))
        : o2 || ((u2 = kn(n2, a2)) != null && l2.push(jf(n2, u2, s2)))),
      (n2 = n2.return);
  }
  l2.length !== 0 && e6.push({ event: t2, listeners: l2 });
}
var Bf = /\r\n?/g,
  Uf = /\u0000|\uFFFD/g;
function Wf(e6) {
  return (typeof e6 == "string" ? e6 : "" + e6)
    .replace(
      Bf,
      `
`,
    )
    .replace(Uf, "");
}
function qf(e6, t2) {
  return (t2 = Wf(t2)), Wf(e6) === t2;
}
function Xf(e6, t2, n2, r2, o2, a2) {
  switch (n2) {
    case "children":
      if (typeof r2 == "string") t2 === "body" || (t2 === "textarea" && r2 === "") || sn(e6, r2);
      else {
        if (typeof r2 != "number" && typeof r2 != "bigint") return;
        t2 !== "body" && sn(e6, "" + r2);
      }
      break;
    case "className":
      Xt(e6, "class", r2);
      break;
    case "tabIndex":
      Xt(e6, "tabindex", r2);
      break;
    case "dir":
    case "role":
    case "viewBox":
    case "width":
    case "height":
      Xt(e6, n2, r2);
      break;
    case "style":
      return void dn(e6, r2, a2);
    case "data":
      if (t2 !== "object") {
        Xt(e6, "data", r2);
        break;
      }
    case "src":
    case "href":
      if (r2 === "" && (t2 !== "a" || n2 !== "href")) {
        e6.removeAttribute(n2);
        break;
      }
      if (
        r2 == null ||
        typeof r2 == "function" ||
        typeof r2 == "symbol" ||
        typeof r2 == "boolean"
      ) {
        e6.removeAttribute(n2);
        break;
      }
      (r2 = mn(r2)), e6.setAttribute(n2, r2);
      break;
    case "action":
    case "formAction":
      if (typeof r2 == "function") {
        e6.setAttribute(
          n2,
          "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')",
        );
        break;
      }
      if (
        (typeof a2 == "function" &&
          (n2 === "formAction"
            ? (t2 !== "input" && Xf(e6, t2, "name", o2.name, o2, null),
              Xf(e6, t2, "formEncType", o2.formEncType, o2, null),
              Xf(e6, t2, "formMethod", o2.formMethod, o2, null),
              Xf(e6, t2, "formTarget", o2.formTarget, o2, null))
            : (Xf(e6, t2, "encType", o2.encType, o2, null),
              Xf(e6, t2, "method", o2.method, o2, null),
              Xf(e6, t2, "target", o2.target, o2, null))),
        r2 == null || typeof r2 == "symbol" || typeof r2 == "boolean")
      ) {
        e6.removeAttribute(n2);
        break;
      }
      (r2 = mn(r2)), e6.setAttribute(n2, r2);
      break;
    case "onClick":
      return void (r2 != null && (e6.onclick = gn));
    case "onScroll":
      return void (r2 != null && Rf("scroll", e6));
    case "onScrollEnd":
      return void (r2 != null && Rf("scrollend", e6));
    case "dangerouslySetInnerHTML":
      if (r2 != null) {
        if (typeof r2 != "object" || !("__html" in r2)) throw Error(k(61));
        if ((n2 = r2.__html) != null) {
          if (o2.children != null) throw Error(k(60));
          a2?.__html !== n2 && (e6.innerHTML = n2);
        }
      }
      break;
    case "multiple":
      e6.multiple = r2 && typeof r2 != "function" && typeof r2 != "symbol";
      break;
    case "muted":
      e6.muted = r2 && typeof r2 != "function" && typeof r2 != "symbol";
      break;
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
    case "defaultValue":
    case "defaultChecked":
    case "innerHTML":
    case "ref":
    case "autoFocus":
      break;
    case "xlinkHref":
      if (
        r2 == null ||
        typeof r2 == "function" ||
        typeof r2 == "boolean" ||
        typeof r2 == "symbol"
      ) {
        e6.removeAttribute("xlink:href");
        break;
      }
      (n2 = mn(r2)), e6.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n2);
      break;
    case "contentEditable":
    case "spellCheck":
    case "draggable":
    case "value":
    case "autoReverse":
    case "externalResourcesRequired":
    case "focusable":
    case "preserveAlpha":
      r2 != null && typeof r2 != "function" && typeof r2 != "symbol"
        ? e6.setAttribute(n2, r2)
        : e6.removeAttribute(n2);
      break;
    case "inert":
    case "allowFullScreen":
    case "async":
    case "autoPlay":
    case "controls":
    case "credentialless":
    case "default":
    case "defer":
    case "disabled":
    case "disablePictureInPicture":
    case "disableRemotePlayback":
    case "formNoValidate":
    case "hidden":
    case "loop":
    case "noModule":
    case "noValidate":
    case "open":
    case "playsInline":
    case "readOnly":
    case "required":
    case "reversed":
    case "scoped":
    case "seamless":
    case "itemScope":
      r2 && typeof r2 != "function" && typeof r2 != "symbol"
        ? e6.setAttribute(n2, "")
        : e6.removeAttribute(n2);
      break;
    case "capture":
    case "download":
      r2 === !0
        ? e6.setAttribute(n2, "")
        : r2 !== !1 && r2 != null && typeof r2 != "function" && typeof r2 != "symbol"
          ? e6.setAttribute(n2, r2)
          : e6.removeAttribute(n2);
      break;
    case "cols":
    case "rows":
    case "size":
    case "span":
      r2 != null && typeof r2 != "function" && typeof r2 != "symbol" && !isNaN(r2) && 1 <= r2
        ? e6.setAttribute(n2, r2)
        : e6.removeAttribute(n2);
      break;
    case "rowSpan":
    case "start":
      r2 == null || typeof r2 == "function" || typeof r2 == "symbol" || isNaN(r2)
        ? e6.removeAttribute(n2)
        : e6.setAttribute(n2, r2);
      break;
    case "popover":
      Rf("beforetoggle", e6), Rf("toggle", e6), qt(e6, "popover", r2);
      break;
    case "xlinkActuate":
      Kt(e6, "http://www.w3.org/1999/xlink", "xlink:actuate", r2);
      break;
    case "xlinkArcrole":
      Kt(e6, "http://www.w3.org/1999/xlink", "xlink:arcrole", r2);
      break;
    case "xlinkRole":
      Kt(e6, "http://www.w3.org/1999/xlink", "xlink:role", r2);
      break;
    case "xlinkShow":
      Kt(e6, "http://www.w3.org/1999/xlink", "xlink:show", r2);
      break;
    case "xlinkTitle":
      Kt(e6, "http://www.w3.org/1999/xlink", "xlink:title", r2);
      break;
    case "xlinkType":
      Kt(e6, "http://www.w3.org/1999/xlink", "xlink:type", r2);
      break;
    case "xmlBase":
      Kt(e6, "http://www.w3.org/XML/1998/namespace", "xml:base", r2);
      break;
    case "xmlLang":
      Kt(e6, "http://www.w3.org/XML/1998/namespace", "xml:lang", r2);
      break;
    case "xmlSpace":
      Kt(e6, "http://www.w3.org/XML/1998/namespace", "xml:space", r2);
      break;
    case "is":
      qt(e6, "is", r2);
      break;
    case "innerText":
    case "textContent":
      return;
    default:
      if (2 < n2.length && (n2[0] === "o" || n2[0] === "O") && (n2[1] === "n" || n2[1] === "N"))
        return;
      qt(e6, (n2 = pn.get(n2) || n2), r2);
  }
  Ut = !0;
}
function Kf(e6, t2, n2, r2, o2, a2) {
  switch (n2) {
    case "style":
      return void dn(e6, r2, a2);
    case "dangerouslySetInnerHTML":
      if (r2 != null) {
        if (typeof r2 != "object" || !("__html" in r2)) throw Error(k(61));
        if ((n2 = r2.__html) != null) {
          if (o2.children != null) throw Error(k(60));
          a2?.__html !== n2 && (e6.innerHTML = n2);
        }
      }
      break;
    case "children":
      if (typeof r2 == "string") sn(e6, r2);
      else {
        if (typeof r2 != "number" && typeof r2 != "bigint") return;
        sn(e6, "" + r2);
      }
      break;
    case "onScroll":
      return void (r2 != null && Rf("scroll", e6));
    case "onScrollEnd":
      return void (r2 != null && Rf("scrollend", e6));
    case "onClick":
      return void (r2 != null && (e6.onclick = gn));
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
    case "innerHTML":
    case "ref":
    case "innerText":
    case "textContent":
      return;
    default:
      return void (
        zt.hasOwnProperty(n2) ||
        (n2[0] !== "o" ||
        n2[1] !== "n" ||
        ((o2 = n2.endsWith("Capture")),
        (a2 = n2.slice(2, o2 ? n2.length - 7 : void 0)),
        typeof (t2 = (t2 = e6[St] || null) != null ? t2[n2] : null) == "function" &&
          e6.removeEventListener(a2, t2, o2),
        typeof r2 != "function")
          ? ((Ut = !0),
            n2 in e6 ? (e6[n2] = r2) : r2 === !0 ? e6.setAttribute(n2, "") : qt(e6, n2, r2))
          : (typeof t2 != "function" &&
              t2 !== null &&
              (n2 in e6 ? (e6[n2] = null) : e6.hasAttribute(n2) && e6.removeAttribute(n2)),
            e6.addEventListener(a2, r2, o2)))
      );
  }
  Ut = !0;
}
function Gf(e6, t2, n2) {
  switch (t2) {
    case "div":
    case "span":
    case "svg":
    case "path":
    case "a":
    case "g":
    case "p":
    case "li":
      break;
    case "img":
      Rf("error", e6), Rf("load", e6);
      var r2,
        o2 = !1,
        a2 = !1;
      for (r2 in n2)
        if (n2.hasOwnProperty(r2)) {
          var l2 = n2[r2];
          if (l2 != null)
            switch (r2) {
              case "src":
                o2 = !0;
                break;
              case "srcSet":
                a2 = !0;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(k(137, t2));
              default:
                Xf(e6, t2, r2, l2, n2, null);
            }
        }
      return (
        a2 && Xf(e6, t2, "srcSet", n2.srcSet, n2, null),
        void (o2 && Xf(e6, t2, "src", n2.src, n2, null))
      );
    case "input":
      Rf("invalid", e6);
      var i2 = (r2 = l2 = a2 = null),
        s2 = null,
        u2 = null;
      for (o2 in n2)
        if (n2.hasOwnProperty(o2)) {
          var c2 = n2[o2];
          if (c2 != null)
            switch (o2) {
              case "name":
                a2 = c2;
                break;
              case "type":
                l2 = c2;
                break;
              case "checked":
                s2 = c2;
                break;
              case "defaultChecked":
                u2 = c2;
                break;
              case "value":
                r2 = c2;
                break;
              case "defaultValue":
                i2 = c2;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (c2 != null) throw Error(k(137, t2));
                break;
              default:
                Xf(e6, t2, o2, c2, n2, null);
            }
        }
      return void nn(e6, r2, i2, s2, u2, l2, a2, !1);
    case "select":
      for (a2 in (Rf("invalid", e6), (o2 = l2 = r2 = null), n2))
        if (n2.hasOwnProperty(a2) && (i2 = n2[a2]) != null)
          switch (a2) {
            case "value":
              r2 = i2;
              break;
            case "defaultValue":
              l2 = i2;
              break;
            case "multiple":
              o2 = i2;
            default:
              Xf(e6, t2, a2, i2, n2, null);
          }
      return (
        (t2 = r2),
        (n2 = l2),
        (e6.multiple = !!o2),
        void (t2 != null ? on(e6, !!o2, t2, !1) : n2 != null && on(e6, !!o2, n2, !0))
      );
    case "textarea":
      for (l2 in (Rf("invalid", e6), (r2 = a2 = o2 = null), n2))
        if (n2.hasOwnProperty(l2) && (i2 = n2[l2]) != null)
          switch (l2) {
            case "value":
              o2 = i2;
              break;
            case "defaultValue":
              a2 = i2;
              break;
            case "children":
              r2 = i2;
              break;
            case "dangerouslySetInnerHTML":
              if (i2 != null) throw Error(k(91));
              break;
            default:
              Xf(e6, t2, l2, i2, n2, null);
          }
      return void ln(e6, o2, a2, r2);
    case "option":
      for (s2 in n2)
        n2.hasOwnProperty(s2) &&
          (o2 = n2[s2]) != null &&
          (s2 === "selected"
            ? (e6.selected = o2 && typeof o2 != "function" && typeof o2 != "symbol")
            : Xf(e6, t2, s2, o2, n2, null));
      return;
    case "dialog":
      Rf("beforetoggle", e6), Rf("toggle", e6), Rf("cancel", e6), Rf("close", e6);
      break;
    case "iframe":
    case "object":
      Rf("load", e6);
      break;
    case "video":
    case "audio":
      for (o2 = 0; o2 < Nf.length; o2++) Rf(Nf[o2], e6);
      break;
    case "image":
      Rf("error", e6), Rf("load", e6);
      break;
    case "details":
      Rf("toggle", e6);
      break;
    case "embed":
    case "source":
    case "link":
      Rf("error", e6), Rf("load", e6);
    case "area":
    case "base":
    case "br":
    case "col":
    case "hr":
    case "keygen":
    case "meta":
    case "param":
    case "track":
    case "wbr":
    case "menuitem":
      for (u2 in n2)
        if (n2.hasOwnProperty(u2) && (o2 = n2[u2]) != null)
          switch (u2) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(k(137, t2));
            default:
              Xf(e6, t2, u2, o2, n2, null);
          }
      return;
    default:
      if (fn(t2)) {
        for (c2 in n2)
          n2.hasOwnProperty(c2) && (o2 = n2[c2]) !== void 0 && Kf(e6, t2, c2, o2, n2, void 0);
        return;
      }
  }
  for (i2 in n2) n2.hasOwnProperty(i2) && (o2 = n2[i2]) != null && Xf(e6, t2, i2, o2, n2, null);
}
var Yf = {};
function Qf(e6) {
  switch (e6) {
    case "css":
    case "script":
    case "font":
    case "img":
    case "image":
    case "input":
    case "link":
      return !0;
    default:
      return !1;
  }
}
var Jf = null,
  Zf = null;
function ep(e6) {
  return e6.nodeType === 9 ? e6 : e6.ownerDocument;
}
function tp(e6) {
  switch (e6) {
    case "http://www.w3.org/2000/svg":
      return 1;
    case "http://www.w3.org/1998/Math/MathML":
      return 2;
    default:
      return 0;
  }
}
function np(e6, t2) {
  if (e6 === 0)
    switch (t2) {
      case "svg":
        return 1;
      case "math":
        return 2;
      default:
        return 0;
    }
  return e6 === 1 && t2 === "foreignObject" ? 0 : e6;
}
function rp(e6, t2, n2, r2) {
  return ((n2 = ep(n2).createElement(e6))[Et] = r2), (n2[St] = t2), Gf(n2, e6, t2), It(n2), n2;
}
function op(e6, t2) {
  return (
    e6 === "textarea" ||
    e6 === "noscript" ||
    typeof t2.children == "string" ||
    typeof t2.children == "number" ||
    typeof t2.children == "bigint" ||
    (typeof t2.dangerouslySetInnerHTML == "object" &&
      t2.dangerouslySetInnerHTML !== null &&
      t2.dangerouslySetInnerHTML.__html != null)
  );
}
var ap = null,
  lp = typeof setTimeout == "function" ? setTimeout : void 0,
  ip = typeof clearTimeout == "function" ? clearTimeout : void 0,
  sp = typeof Promise == "function" ? Promise : void 0,
  up = typeof requestAnimationFrame == "function" ? requestAnimationFrame : lp,
  cp =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : sp !== void 0
        ? function (e6) {
            return sp.resolve(null).then(e6).catch(dp);
          }
        : lp;
function dp(e6) {
  setTimeout(function () {
    throw e6;
  });
}
function fp(e6) {
  return e6 === "head";
}
function pp(e6, t2) {
  var n2 = t2,
    r2 = 0;
  do {
    var o2 = n2.nextSibling;
    if ((e6.removeChild(n2), o2 && o2.nodeType === 8))
      if ((n2 = o2.data) === "/$" || n2 === "/&") {
        if (r2 === 0) return e6.removeChild(o2), void cm(t2);
        r2--;
      } else if (n2 === "$" || n2 === "$?" || n2 === "$~" || n2 === "$!" || n2 === "&") r2++;
      else if (n2 === "html") Zp(e6.ownerDocument.documentElement);
      else if (n2 === "head") {
        Zp((n2 = e6.ownerDocument.head));
        for (var a2 = n2.firstChild; a2; ) {
          var l2 = a2.nextSibling,
            i2 = a2.nodeName;
          a2[Ot] ||
            i2 === "SCRIPT" ||
            i2 === "STYLE" ||
            (i2 === "LINK" && a2.rel.toLowerCase() === "stylesheet") ||
            n2.removeChild(a2),
            (a2 = l2);
        }
      } else n2 === "body" && Zp(e6.ownerDocument.body);
    n2 = o2;
  } while (n2);
  cm(t2);
}
function hp(e6, t2) {
  var n2 = e6;
  e6 = 0;
  do {
    var r2 = n2.nextSibling;
    if (
      (n2.nodeType === 1
        ? t2
          ? ((n2._stashedDisplay = n2.style.display), (n2.style.display = "none"))
          : ((n2.style.display = n2._stashedDisplay || ""),
            n2.getAttribute("style") === "" && n2.removeAttribute("style"))
        : n2.nodeType === 3 &&
          (t2
            ? ((n2._stashedText = n2.nodeValue), (n2.nodeValue = ""))
            : (n2.nodeValue = n2._stashedText || "")),
      r2 && r2.nodeType === 8)
    )
      if ((n2 = r2.data) === "/$") {
        if (e6 === 0) break;
        e6--;
      } else (n2 !== "$" && n2 !== "$?" && n2 !== "$~" && n2 !== "$!") || e6++;
    n2 = r2;
  } while (n2);
}
function mp(e6, t2, n2) {
  if (
    ((t2 = CSS.escape(t2) !== t2 ? "r-" + btoa(t2).replace(/=/g, "") : t2),
    (e6.style.viewTransitionName = t2),
    n2 != null && (e6.style.viewTransitionClass = n2),
    (n2 = getComputedStyle(e6)).display === "inline")
  ) {
    if ((t2 = e6.getClientRects()).length === 1) var r2 = 1;
    else
      for (var o2 = (r2 = 0); o2 < t2.length; o2++) {
        var a2 = t2[o2];
        0 < a2.width && 0 < a2.height && r2++;
      }
    r2 === 1 &&
      (((e6 = e6.style).display = t2.length === 1 ? "inline-block" : "block"),
      (e6.marginTop = "-" + n2.paddingTop),
      (e6.marginBottom = "-" + n2.paddingBottom));
  }
}
function gp(e6, t2) {
  e6 = e6.style;
  var n2 =
    (t2 = t2.style) != null
      ? t2.hasOwnProperty("viewTransitionName")
        ? t2.viewTransitionName
        : t2.hasOwnProperty("view-transition-name")
          ? t2["view-transition-name"]
          : null
      : null;
  (e6.viewTransitionName = n2 == null || typeof n2 == "boolean" ? "" : ("" + n2).trim()),
    (n2 =
      t2 != null
        ? t2.hasOwnProperty("viewTransitionClass")
          ? t2.viewTransitionClass
          : t2.hasOwnProperty("view-transition-class")
            ? t2["view-transition-class"]
            : null
        : null),
    (e6.viewTransitionClass = n2 == null || typeof n2 == "boolean" ? "" : ("" + n2).trim()),
    e6.display === "inline-block" &&
      (t2 == null
        ? (e6.display = e6.margin = "")
        : ((n2 = t2.display),
          (e6.display = n2 == null || typeof n2 == "boolean" ? "" : n2),
          (n2 = t2.margin) != null
            ? (e6.margin = n2)
            : ((n2 = t2.hasOwnProperty("marginTop") ? t2.marginTop : t2["margin-top"]),
              (e6.marginTop = n2 == null || typeof n2 == "boolean" ? "" : n2),
              (t2 = t2.hasOwnProperty("marginBottom") ? t2.marginBottom : t2["margin-bottom"]),
              (e6.marginBottom = t2 == null || typeof t2 == "boolean" ? "" : t2))));
}
function vp(e6, t2, n2) {
  return (
    (n2 = n2.ownerDocument.defaultView),
    {
      rect: e6,
      abs: t2.position === "absolute" || t2.position === "fixed",
      clip:
        t2.clipPath !== "none" ||
        t2.overflow !== "visible" ||
        t2.filter !== "none" ||
        t2.mask !== "none" ||
        t2.mask !== "none" ||
        t2.borderRadius !== "0px",
      view: 0 <= e6.bottom && 0 <= e6.right && e6.top <= n2.innerHeight && e6.left <= n2.innerWidth,
    }
  );
}
function yp(e6) {
  return vp(e6.getBoundingClientRect(), getComputedStyle(e6), e6);
}
function bp(e6) {
  var t2 = e6.getBoundingClientRect();
  return vp(
    (t2 = new DOMRect(t2.x + 2e4, t2.y + 2e4, t2.width, t2.height)),
    getComputedStyle(e6),
    e6,
  );
}
function wp(e6) {
  this.addEventListener("load", e6), this.addEventListener("error", e6);
}
function Ep(e6, t2) {
  (this._scope = document.documentElement),
    (this._selector = "::view-transition-" + e6 + "(" + t2 + ")");
}
function Sp(e6) {
  return {
    name: e6,
    group: new Ep("group", e6),
    imagePair: new Ep("image-pair", e6),
    old: new Ep("old", e6),
    new: new Ep("new", e6),
  };
}
function xp(e6) {
  (this._fragmentFiber = e6), (this._observers = this._eventListeners = null);
}
function kp(e6, t2, n2, r2) {
  return A(e6).addEventListener(t2, n2, r2), !1;
}
function Cp(e6, t2, n2, r2) {
  return A(e6).removeEventListener(t2, n2, r2), !1;
}
function _p(e6) {
  return e6 != null &&
    typeof e6 != "boolean" &&
    (e6.once === !0 || e6.signal instanceof AbortSignal)
    ? { capture: e6.capture, passive: e6.passive }
    : e6;
}
function Pp(e6) {
  return e6 == null
    ? "c=0"
    : typeof e6 == "boolean"
      ? "c=" + (e6 ? "1" : "0")
      : "c=" + (e6.capture ? "1" : "0");
}
function Op(e6, t2, n2, r2) {
  if (e6.length === 0) return -1;
  r2 = Pp(r2);
  for (var o2 = 0; o2 < e6.length; o2++) {
    var a2 = e6[o2];
    if (a2.type === t2 && a2.listener === n2 && Pp(a2.optionsOrUseCapture) === r2) return o2;
  }
  return -1;
}
function Tp(e6, t2) {
  return (
    e6.tag !== 6 &&
    (function (e7, t3) {
      function n2() {
        r2 = !0;
      }
      if (e7.ownerDocument.activeElement === e7) return !0;
      var r2 = !1;
      try {
        e7.ownerDocument.addEventListener("focus", n2, !0),
          (e7.focus || HTMLElement.prototype.focus).call(e7, t3);
      } finally {
        e7.ownerDocument.removeEventListener("focus", n2, !0);
      }
      return r2;
    })((e6 = A(e6)), t2)
  );
}
function Np(e6, t2) {
  return t2.push(e6), !1;
}
function $p(e6, t2) {
  return e6.tag !== 6 && !((e6 = A(e6)) !== t2 && !e6.contains(t2)) && (t2.blur(), !0);
}
function Mp(e6, t2) {
  return e6.tag === 6 || ((e6 = A(e6)), t2.observe(e6)), !1;
}
function Rp(e6, t2) {
  return e6.tag === 6 || ((e6 = A(e6)), t2.unobserve(e6)), !1;
}
(Ep.prototype.animate = function (e6, t2) {
  return (
    ((t2 = typeof t2 == "number" ? { duration: t2 } : B({}, t2)).pseudoElement = this._selector),
    this._scope.animate(e6, t2)
  );
}),
  (Ep.prototype.getAnimations = function () {
    for (
      var e6 = this._scope,
        t2 = this._selector,
        n2 = e6.getAnimations({ subtree: !0 }),
        r2 = [],
        o2 = 0;
      o2 < n2.length;
      o2++
    ) {
      var a2 = n2[o2].effect;
      a2 !== null && a2.target === e6 && a2.pseudoElement === t2 && r2.push(n2[o2]);
    }
    return r2;
  }),
  (Ep.prototype.getComputedStyle = function () {
    return getComputedStyle(this._scope, this._selector);
  }),
  (xp.prototype.addEventListener = function (e6, t2, n2) {
    var r2 = null,
      o2 = null;
    if (n2 == null || typeof n2 == "boolean" || (r2 = n2.signal || null) === null || !r2.aborted) {
      this._eventListeners === null && (this._eventListeners = []);
      var a2 = this._eventListeners;
      if (Op(a2, e6, t2, n2) === -1) {
        var l2 = this,
          i2 = t2;
        n2 != null &&
          typeof n2 != "boolean" &&
          n2.once === !0 &&
          (i2 = function (r3) {
            l2.removeEventListener(e6, t2, n2),
              typeof t2 == "function" ? t2.call(this, r3) : t2.handleEvent(r3);
          }),
          r2 !== null &&
            ((o2 = l2.removeEventListener.bind(l2, e6, t2, n2)),
            r2.addEventListener("abort", o2, { once: !0 }),
            (o2 = r2.removeEventListener.bind(r2, "abort", o2))),
          (r2 = _p(n2)),
          a2.push({
            type: e6,
            listener: t2,
            optionsOrUseCapture: n2,
            attachedListener: i2,
            cleanup: o2,
          }),
          $(this._fragmentFiber.child, !1, kp, e6, i2, r2);
      }
      this._eventListeners = a2;
    }
  }),
  (xp.prototype.removeEventListener = function (e6, t2, n2) {
    var r2 = this._eventListeners;
    if (r2 !== null && (t2 = Op(r2, e6, t2, n2)) !== -1) {
      var o2 = r2[t2];
      n2 = o2.attachedListener;
      var a2 = o2.cleanup;
      (o2 = _p(o2.optionsOrUseCapture)),
        $(this._fragmentFiber.child, !1, Cp, e6, n2, o2),
        r2.splice(t2, 1),
        a2 !== null && a2();
    }
  }),
  (xp.prototype.dispatchEvent = function (e6) {
    var t2 = M(this._fragmentFiber);
    if (t2 === null) return !0;
    t2 = A(t2);
    var n2 = this._eventListeners;
    if ((n2 !== null && 0 < n2.length) || !e6.bubbles) {
      var r2 = t2.nodeType === 9 ? t2.createComment("") : document.createTextNode("");
      if (n2)
        for (var o2 = 0; o2 < n2.length; o2++) {
          var a2 = n2[o2];
          r2.addEventListener(a2.type, a2.attachedListener, _p(a2.optionsOrUseCapture));
        }
      if ((t2.appendChild(r2), (e6 = r2.dispatchEvent(e6)), n2))
        for (o2 = 0; o2 < n2.length; o2++)
          (a2 = n2[o2]),
            r2.removeEventListener(a2.type, a2.attachedListener, _p(a2.optionsOrUseCapture));
      return t2.removeChild(r2), e6;
    }
    return t2.dispatchEvent(e6);
  }),
  (xp.prototype.focus = function (e6) {
    $(this._fragmentFiber.child, !0, Tp, e6, void 0, void 0);
  }),
  (xp.prototype.focusLast = function (e6) {
    var t2 = [];
    $(this._fragmentFiber.child, !0, Np, t2, void 0, void 0);
    for (var n2 = t2.length - 1; 0 <= n2 && !Tp(t2[n2], e6); n2--);
  }),
  (xp.prototype.blur = function () {
    var e6 = M(this._fragmentFiber);
    e6 !== null &&
      (e6 = ep((e6 = A(e6))).activeElement) !== null &&
      $(this._fragmentFiber.child, !1, $p, e6, void 0, void 0);
  }),
  (xp.prototype.observeUsing = function (e6) {
    this._observers === null && (this._observers = new Set()),
      this._observers.add(e6),
      $(this._fragmentFiber.child, !1, Mp, e6, void 0, void 0);
  }),
  (xp.prototype.unobserveUsing = function (e6) {
    var t2 = this._observers;
    if (t2 !== null && t2.has(e6)) {
      t2.delete(e6), $(this._fragmentFiber.child, !1, Rp, e6, void 0, void 0);
      for (var n2 = (t2 = 0); n2 < Lp.length; n2++) {
        var r2 = Lp[n2];
        r2.fragmentInstance === this && r2.observer === e6
          ? e6.unobserve(r2.instance)
          : (Lp[t2++] = r2);
      }
      Lp.length = t2;
    }
  });
var Lp = [],
  Ip = !1;
function Ap(e6, t2, n2) {
  var r2;
  Lp.push({ fragmentInstance: e6, observer: t2, instance: n2 }),
    Ip ||
      ((Ip = !0),
      (r2 = function () {
        Ip = !1;
        var e7 = Lp;
        Lp = [];
        for (var t3 = 0; t3 < e7.length; t3++) {
          var n3 = e7[t3];
          n3.observer.unobserve(n3.instance);
        }
      }),
      up(function () {
        up(function (e7) {
          return r2(e7);
        });
      }));
}
function Fp(e6, t2) {
  if (e6.tag === 6) {
    var n2 = (e6 = e6.stateNode).ownerDocument.createRange();
    n2.selectNodeContents(e6), t2.push.apply(t2, n2.getClientRects());
  } else (e6 = A(e6)), t2.push.apply(t2, e6.getClientRects());
  return !1;
}
function zp(e6, t2) {
  var n2 = e6.ownerDocument.createRange();
  n2.selectNodeContents(e6),
    (e6 = n2.getBoundingClientRect()),
    window.scrollTo(
      window.scrollX + e6.left,
      t2 ? window.scrollY + e6.top : window.scrollY + e6.bottom - window.innerHeight,
    );
}
function jp(e6, t2) {
  return Dp((e6 = A(e6)), t2), !1;
}
function Dp(e6, t2) {
  e6.reactFragments == null && (e6.reactFragments = new Set()), e6.reactFragments.add(t2);
}
function Hp(e6, t2) {
  var n2 = t2._eventListeners;
  if (n2 !== null)
    for (var r2 = 0; r2 < n2.length; r2++) {
      var o2 = n2[r2];
      e6.addEventListener(o2.type, o2.attachedListener, _p(o2.optionsOrUseCapture));
    }
  e6.nodeType !== 3 &&
    ((n2 = t2._observers) !== null &&
      n2.forEach(function (n3) {
        for (var r3 = 0, o3 = 0; o3 < Lp.length; o3++) {
          var a2 = Lp[o3];
          (a2.fragmentInstance === t2 && a2.observer === n3 && a2.instance === e6) ||
            (Lp[r3++] = a2);
        }
        (Lp.length = r3), n3.observe(e6);
      }),
    Dp(e6, t2));
}
function Vp(e6, t2) {
  var n2 = t2._eventListeners;
  if (n2 !== null)
    for (var r2 = 0; r2 < n2.length; r2++) {
      var o2 = n2[r2];
      e6.removeEventListener(o2.type, o2.attachedListener, _p(o2.optionsOrUseCapture));
    }
  e6.nodeType !== 3 &&
    ((n2 = t2._observers) !== null &&
      n2.forEach(function (n3) {
        typeof n3.rootMargin == "string" ? Ap(t2, n3, e6) : n3.unobserve(e6);
      }),
    e6.reactFragments != null && e6.reactFragments.delete(t2));
}
function Bp(e6) {
  var t2 = e6.firstChild;
  for (t2 && t2.nodeType === 10 && (t2 = t2.nextSibling); t2; ) {
    var n2 = t2;
    switch (((t2 = t2.nextSibling), n2.nodeName)) {
      case "HTML":
      case "HEAD":
      case "BODY":
        Bp(n2), Nt(n2);
        continue;
      case "SCRIPT":
      case "STYLE":
        continue;
      case "LINK":
        if (n2.rel.toLowerCase() === "stylesheet") continue;
    }
    e6.removeChild(n2);
  }
}
function Up(e6, t2) {
  for (; e6.nodeType !== 8; )
    if (
      ((e6.nodeType !== 1 || e6.nodeName !== "INPUT" || e6.type !== "hidden") && !t2) ||
      (e6 = Xp(e6.nextSibling)) === null
    )
      return null;
  return e6;
}
function Wp(e6) {
  return e6.data === "$?" || e6.data === "$~";
}
function qp(e6) {
  return e6.data === "$!" || (e6.data === "$?" && e6.ownerDocument.readyState !== "loading");
}
function Xp(e6) {
  for (; e6 != null; e6 = e6.nextSibling) {
    var t2 = e6.nodeType;
    if (t2 === 1 || t2 === 3) break;
    if (t2 === 8) {
      if (
        (t2 = e6.data) === "$" ||
        t2 === "$!" ||
        t2 === "$?" ||
        t2 === "$~" ||
        t2 === "&" ||
        t2 === "F!" ||
        t2 === "F"
      )
        break;
      if (t2 === "/$" || t2 === "/&") return null;
    }
  }
  return e6;
}
(xp.prototype.getClientRects = function () {
  var e6 = [];
  return $(this._fragmentFiber.child, !1, Fp, e6, void 0, void 0), e6;
}),
  (xp.prototype.getRootNode = function (e6) {
    var t2 = M(this._fragmentFiber);
    return t2 === null ? this : A(t2).getRootNode(e6);
  }),
  (xp.prototype.compareDocumentPosition = function (e6) {
    var t2 = M(this._fragmentFiber);
    if (t2 === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
    var n2 = [];
    $(this._fragmentFiber.child, !1, Np, n2, void 0, void 0);
    var r2 = A(t2);
    if (n2.length === 0) {
      if (((n2 = r2), R(this._fragmentFiber))) {
        e: {
          for (t2 = this._fragmentFiber.return; t2 !== null; ) {
            if (t2.tag === 4) {
              t2 = t2.stateNode.containerInfo;
              break e;
            }
            if (t2.tag === 3 || t2.tag === 5 || t2.tag === 27) break;
            t2 = t2.return;
          }
          t2 = null;
        }
        t2 != null && (n2 = t2);
      }
      t2 = this._fragmentFiber;
      var o2 = (r2 = n2.compareDocumentPosition(e6));
      return (
        n2 === e6
          ? (o2 = Node.DOCUMENT_POSITION_CONTAINS)
          : r2 & Node.DOCUMENT_POSITION_CONTAINED_BY &&
            ((n2 = L(t2)[1]) === null
              ? (o2 = Node.DOCUMENT_POSITION_PRECEDING)
              : (o2 =
                  (e6 = A(n2).compareDocumentPosition(e6)) === 0 ||
                  e6 & Node.DOCUMENT_POSITION_FOLLOWING
                    ? Node.DOCUMENT_POSITION_FOLLOWING
                    : Node.DOCUMENT_POSITION_PRECEDING)),
        o2 | Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC
      );
    }
    (t2 = A(n2[0])), (o2 = A(n2[n2.length - 1]));
    var a2 = R(this._fragmentFiber) ? t2.parentElement : r2;
    if (a2 == null) return Node.DOCUMENT_POSITION_DISCONNECTED;
    (r2 = a2.compareDocumentPosition(t2) & Node.DOCUMENT_POSITION_CONTAINED_BY),
      (a2 = a2.compareDocumentPosition(o2) & Node.DOCUMENT_POSITION_CONTAINED_BY);
    var l2 = t2.compareDocumentPosition(e6),
      i2 = o2.compareDocumentPosition(e6),
      s2 = l2 & Node.DOCUMENT_POSITION_CONTAINED_BY || i2 & Node.DOCUMENT_POSITION_CONTAINED_BY;
    return (
      (i2 =
        r2 && a2 && l2 & Node.DOCUMENT_POSITION_FOLLOWING && i2 & Node.DOCUMENT_POSITION_PRECEDING),
      (t2 =
        (r2 && t2 === e6) || (a2 && o2 === e6) || s2 || i2
          ? Node.DOCUMENT_POSITION_CONTAINED_BY
          : (!r2 && t2 === e6) || (!a2 && o2 === e6)
            ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC
            : l2) & Node.DOCUMENT_POSITION_DISCONNECTED ||
      t2 & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC ||
      (function (e7, t3, n3, r3, o3) {
        var a3 = $t(o3);
        if (e7 & Node.DOCUMENT_POSITION_CONTAINED_BY) {
          if ((n3 = !!a3))
            e: {
              for (; a3 !== null; ) {
                if (a3.tag === 7 && (a3 === t3 || a3.alternate === t3)) {
                  n3 = !0;
                  break e;
                }
                a3 = a3.return;
              }
              n3 = !1;
            }
          return n3;
        }
        if (e7 & Node.DOCUMENT_POSITION_CONTAINS) {
          if (a3 === null)
            return o3 === (a3 = o3.ownerDocument) || o3 === a3.documentElement || o3 === a3.body;
          e: {
            for (a3 = t3, t3 = M(t3); a3 !== null; ) {
              if (
                !(
                  (a3.tag !== 5 && a3.tag !== 3 && a3.tag !== 27) ||
                  (a3 !== t3 && a3.alternate !== t3)
                )
              ) {
                a3 = !0;
                break e;
              }
              a3 = a3.return;
            }
            a3 = !1;
          }
          return a3;
        }
        return e7 & Node.DOCUMENT_POSITION_PRECEDING
          ? ((t3 = !!a3) &&
              !(t3 = a3 === n3) &&
              ((t3 = V(n3, a3, H)) === null
                ? (t3 = !1)
                : ($(t3, !0, j, a3, n3), (a3 = F), (F = null), (t3 = a3 !== null))),
            t3)
          : !!(e7 & Node.DOCUMENT_POSITION_FOLLOWING) &&
              ((t3 = !!a3) &&
                !(t3 = a3 === r3) &&
                ((t3 = V(r3, a3, H)) === null
                  ? (t3 = !1)
                  : ($(t3, !0, D, a3, r3), (a3 = F), (z = F = null), (t3 = a3 !== null))),
              t3);
      })(t2, this._fragmentFiber, n2[0], n2[n2.length - 1], e6)
        ? t2
        : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC
    );
  }),
  (xp.prototype.scrollIntoView = function (e6) {
    if (typeof e6 == "object") throw Error(k(566));
    var t2 = [];
    $(this._fragmentFiber.child, !1, Np, t2, void 0, void 0);
    var n2 = e6 !== !1;
    if (t2.length === 0) {
      var r2 = L(this._fragmentFiber);
      if ((r2 = n2 ? r2[1] || r2[0] || M(this._fragmentFiber) : r2[0] || r2[1]) === null) return;
      if (r2.tag === 6) return void zp((e6 = A(r2)), n2);
      if ((r2 = A(r2)).nodeType !== 9) {
        if (r2.nodeType === 11)
          return void ((n2 = "host" in r2 ? r2.host : null) !== null && n2.scrollIntoView(e6));
        r2.scrollIntoView(e6);
      }
    }
    for (r2 = n2 ? t2.length - 1 : 0; r2 !== (n2 ? -1 : t2.length); ) {
      var o2 = t2[r2];
      o2.tag === 6 ? zp((o2 = A(o2)), n2) : A(o2).scrollIntoView(e6), (r2 += n2 ? -1 : 1);
    }
  });
var Kp = null;
function Gp(e6) {
  e6 = e6.nextSibling;
  for (var t2 = 0; e6; ) {
    if (e6.nodeType === 8) {
      var n2 = e6.data;
      if (n2 === "/$" || n2 === "/&") {
        if (t2 === 0) return Xp(e6.nextSibling);
        t2--;
      } else (n2 !== "$" && n2 !== "$!" && n2 !== "$?" && n2 !== "$~" && n2 !== "&") || t2++;
    }
    e6 = e6.nextSibling;
  }
  return null;
}
function Yp(e6) {
  e6 = e6.previousSibling;
  for (var t2 = 0; e6; ) {
    if (e6.nodeType === 8) {
      var n2 = e6.data;
      if (n2 === "$" || n2 === "$!" || n2 === "$?" || n2 === "$~" || n2 === "&") {
        if (t2 === 0) return e6;
        t2--;
      } else (n2 !== "/$" && n2 !== "/&") || t2++;
    }
    e6 = e6.previousSibling;
  }
  return null;
}
function Qp(e6, t2, n2) {
  switch (((t2 = ep(n2)), e6)) {
    case "html":
      if (!(e6 = t2.documentElement)) throw Error(k(452));
      return e6;
    case "head":
      if (!(e6 = t2.head)) throw Error(k(453));
      return e6;
    case "body":
      if (!(e6 = t2.body)) throw Error(k(454));
      return e6;
    default:
      throw Error(k(451));
  }
}
function Jp(e6, t2, n2) {
  for (var r2 in n2) {
    var o2 = n2[r2];
    n2.hasOwnProperty(r2) && o2 != null && Xf(e6, t2, r2, null, Yf, o2);
  }
  n2.dangerouslySetInnerHTML != null && (e6.textContent = ""),
    e6.onclick === gn && (e6.onclick = null),
    Nt(e6);
}
function Zp(e6) {
  for (var t2 = e6.attributes; t2.length; ) e6.removeAttributeNode(t2[0]);
  Nt(e6);
}
var eh = new Map(),
  th = new Set();
function nh(e6) {
  if (typeof e6.getRootNode == "function") {
    var t2 = e6.getRootNode();
    if (t2.nodeType === 9 || t2.nodeType === 11) return t2;
  }
  return e6.nodeType === 9 ? e6 : e6.ownerDocument;
}
var rh = he.d;
he.d = {
  f: function () {
    var e6 = rh.f(),
      t2 = Ld();
    return e6 || t2;
  },
  r: function (e6) {
    var t2 = Mt(e6);
    t2 !== null && t2.tag === 5 && t2.type === "form" ? Yi(t2) : rh.r(e6);
  },
  D: function (e6) {
    rh.D(e6), ah("dns-prefetch", e6, null);
  },
  C: function (e6, t2) {
    rh.C(e6, t2), ah("preconnect", e6, t2);
  },
  L: function (e6, t2, n2) {
    rh.L(e6, t2, n2);
    var r2 = oh;
    if (r2 && e6 && t2) {
      var o2 = 'link[rel="preload"][as="' + en(t2) + '"]';
      t2 === "image" && n2 && n2.imageSrcSet
        ? ((o2 += '[imagesrcset="' + en(n2.imageSrcSet) + '"]'),
          typeof n2.imageSizes == "string" && (o2 += '[imagesizes="' + en(n2.imageSizes) + '"]'))
        : (o2 += '[href="' + en(e6) + '"]');
      var a2 = o2;
      switch (t2) {
        case "style":
          a2 = ih(e6);
          break;
        case "script":
          a2 = ch(e6);
      }
      if (
        !(
          eh.has(a2) ||
          ((e6 = B(
            { rel: "preload", href: t2 === "image" && n2 && n2.imageSrcSet ? void 0 : e6, as: t2 },
            n2,
          )),
          eh.set(a2, e6),
          r2.querySelector(o2) !== null ||
            (t2 === "style" && r2.querySelector(sh(a2))) ||
            (t2 === "script" && r2.querySelector(dh(a2))))
        )
      ) {
        var l2 = r2.createElement("link");
        Gf(l2, "link", e6),
          t2 === "style" &&
            ((l2[Tt] = !0),
            (l2.onload = l2.onerror =
              function () {
                At(l2);
              })),
          It(l2),
          r2.head.appendChild(l2);
      }
    }
  },
  m: function (e6, t2) {
    rh.m(e6, t2);
    var n2 = oh;
    if (n2 && e6) {
      var r2 = t2 && typeof t2.as == "string" ? t2.as : "script",
        o2 = 'link[rel="modulepreload"][as="' + en(r2) + '"][href="' + en(e6) + '"]',
        a2 = o2;
      switch (r2) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          a2 = ch(e6);
      }
      if (
        !eh.has(a2) &&
        ((e6 = B({ rel: "modulepreload", href: e6 }, t2)),
        eh.set(a2, e6),
        n2.querySelector(o2) === null)
      ) {
        switch (r2) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (n2.querySelector(dh(a2))) return;
        }
        Gf((r2 = n2.createElement("link")), "link", e6), It(r2), n2.head.appendChild(r2);
      }
    }
  },
  X: function (e6, t2) {
    rh.X(e6, t2);
    var n2 = oh;
    if (n2 && e6) {
      var r2 = Lt(n2).hoistableScripts,
        o2 = ch(e6),
        a2 = r2.get(o2);
      a2 ||
        ((a2 = n2.querySelector(dh(o2))) ||
          ((e6 = B({ src: e6, async: !0 }, t2)),
          (t2 = eh.get(o2)) && mh(e6, t2),
          It((a2 = n2.createElement("script"))),
          Gf(a2, "link", e6),
          n2.head.appendChild(a2)),
        (a2 = { type: "script", instance: a2, count: 1, state: null }),
        r2.set(o2, a2));
    }
  },
  S: function (e6, t2, n2) {
    rh.S(e6, t2, n2);
    var r2 = oh;
    if (r2 && e6) {
      var o2 = Lt(r2).hoistableStyles,
        a2 = ih(e6);
      t2 = t2 || "default";
      var l2 = o2.get(a2);
      if (!l2) {
        var i2 = { loading: 0, preload: null };
        if ((l2 = r2.querySelector(sh(a2)))) i2.loading = 5;
        else {
          (e6 = B({ rel: "stylesheet", href: e6, "data-precedence": t2 }, n2)),
            (n2 = eh.get(a2)) && hh(e6, n2);
          var s2 = (l2 = r2.createElement("link"));
          It(s2),
            Gf(s2, "link", e6),
            (s2._p = new Promise(function (e7, t3) {
              (s2.onload = e7), (s2.onerror = t3);
            })),
            s2.addEventListener("load", function () {
              i2.loading |= 1;
            }),
            s2.addEventListener("error", function () {
              i2.loading |= 2;
            }),
            (i2.loading |= 4),
            ph(l2, t2, r2);
        }
        (l2 = { type: "stylesheet", instance: l2, count: 1, state: i2 }), o2.set(a2, l2);
      }
    }
  },
  M: function (e6, t2) {
    rh.M(e6, t2);
    var n2 = oh;
    if (n2 && e6) {
      var r2 = Lt(n2).hoistableScripts,
        o2 = ch(e6),
        a2 = r2.get(o2);
      a2 ||
        ((a2 = n2.querySelector(dh(o2))) ||
          ((e6 = B({ src: e6, async: !0, type: "module" }, t2)),
          (t2 = eh.get(o2)) && mh(e6, t2),
          It((a2 = n2.createElement("script"))),
          Gf(a2, "link", e6),
          n2.head.appendChild(a2)),
        (a2 = { type: "script", instance: a2, count: 1, state: null }),
        r2.set(o2, a2));
    }
  },
};
var oh = typeof document > "u" ? null : document;
function ah(e6, t2, n2) {
  var r2 = oh;
  if (r2 && typeof t2 == "string" && t2) {
    var o2 = en(t2);
    (o2 = 'link[rel="' + e6 + '"][href="' + o2 + '"]'),
      typeof n2 == "string" && (o2 += '[crossorigin="' + n2 + '"]'),
      th.has(o2) ||
        (th.add(o2),
        (e6 = { rel: e6, crossOrigin: n2, href: t2 }),
        r2.querySelector(o2) === null &&
          (Gf((t2 = r2.createElement("link")), "link", e6), It(t2), r2.head.appendChild(t2)));
  }
}
function lh(e6, t2, n2, r2) {
  var o2 = (o2 = Ce.current) ? nh(o2) : null;
  if (!o2) throw Error(k(446));
  switch (e6) {
    case "meta":
    case "title":
      return null;
    case "style":
      return typeof n2.precedence == "string" && typeof n2.href == "string"
        ? ((n2 = ih(n2.href)),
          (r2 = (t2 = Lt(o2).hoistableStyles).get(n2)) ||
            ((r2 = { type: "style", instance: null, count: 0, state: null }), t2.set(n2, r2)),
          r2)
        : { type: "void", instance: null, count: 0, state: null };
    case "link":
      if (
        n2.rel === "stylesheet" &&
        typeof n2.href == "string" &&
        typeof n2.precedence == "string"
      ) {
        e6 = ih(n2.href);
        var a2 = Lt(o2).hoistableStyles,
          l2 = a2.get(e6);
        if (
          (l2 ||
            ((o2 = o2.ownerDocument || o2),
            (l2 = {
              type: "stylesheet",
              instance: null,
              count: 0,
              state: { loading: 0, preload: null },
            }),
            a2.set(e6, l2),
            (a2 = o2.querySelector(sh(e6)))
              ? a2._p || ((l2.instance = a2), (l2.state.loading = 5))
              : ((a2 = eh.get(e6)) ||
                  ((a2 = {
                    rel: "preload",
                    as: "style",
                    href: n2.href,
                    crossOrigin: n2.crossOrigin,
                    integrity: n2.integrity,
                    media: n2.media,
                    hrefLang: n2.hrefLang,
                    referrerPolicy: n2.referrerPolicy,
                  }),
                  eh.set(e6, a2)),
                (function (e7, t3, n3, r3) {
                  if ((t3 = e7.querySelector('link[rel="preload"][as="style"][' + t3 + "]"))) {
                    if (t3[Tt] !== !0) return void (r3.loading = 1);
                  } else
                    ((t3 = e7.createElement("link"))[Tt] = !0),
                      (t3.onload = t3.onerror = At.bind(null, t3)),
                      Gf(t3, "link", n3),
                      It(t3),
                      e7.head.appendChild(t3);
                  (r3.preload = t3),
                    t3.addEventListener("load", function () {
                      return (r3.loading |= 1);
                    }),
                    t3.addEventListener("error", function () {
                      return (r3.loading |= 2);
                    });
                })(o2, e6, a2, l2.state))),
          t2 && r2 === null)
        )
          throw Error(k(528, ""));
        return l2;
      }
      if (t2 && r2 !== null) throw Error(k(529, ""));
      return null;
    case "script":
      return (
        (t2 = n2.async),
        typeof (n2 = n2.src) == "string" && t2 && typeof t2 != "function" && typeof t2 != "symbol"
          ? ((n2 = ch(n2)),
            (r2 = (t2 = Lt(o2).hoistableScripts).get(n2)) ||
              ((r2 = { type: "script", instance: null, count: 0, state: null }), t2.set(n2, r2)),
            r2)
          : { type: "void", instance: null, count: 0, state: null }
      );
    default:
      throw Error(k(444, e6));
  }
}
function ih(e6) {
  return 'href="' + en(e6) + '"';
}
function sh(e6) {
  return 'link[rel="stylesheet"][' + e6 + "]";
}
function uh(e6) {
  return B({}, e6, { "data-precedence": e6.precedence, precedence: null });
}
function ch(e6) {
  return '[src="' + en(e6) + '"]';
}
function dh(e6) {
  return "script[async]" + e6;
}
function fh(e6, t2, n2) {
  if ((t2.count++, t2.instance === null))
    switch (t2.type) {
      case "style":
        var r2 = e6.querySelector('style[data-href~="' + en(n2.href) + '"]');
        if (r2) return (t2.instance = r2), It(r2), r2;
        var o2 = B({}, n2, {
          "data-href": n2.href,
          "data-precedence": n2.precedence,
          href: null,
          precedence: null,
        });
        return (
          It((r2 = (e6.ownerDocument || e6).createElement("style"))),
          Gf(r2, "style", o2),
          ph(r2, n2.precedence, e6),
          (t2.instance = r2)
        );
      case "stylesheet":
        o2 = ih(n2.href);
        var a2 = e6.querySelector(sh(o2));
        if (a2) return (t2.state.loading |= 4), (t2.instance = a2), It(a2), a2;
        (r2 = uh(n2)),
          (o2 = eh.get(o2)) && hh(r2, o2),
          It((a2 = (e6.ownerDocument || e6).createElement("link")));
        var l2 = a2;
        return (
          (l2._p = new Promise(function (e7, t3) {
            (l2.onload = e7), (l2.onerror = t3);
          })),
          Gf(a2, "link", r2),
          (t2.state.loading |= 4),
          ph(a2, n2.precedence, e6),
          (t2.instance = a2)
        );
      case "script":
        return (
          (a2 = ch(n2.src)),
          (o2 = e6.querySelector(dh(a2)))
            ? ((t2.instance = o2), It(o2), o2)
            : ((r2 = n2),
              (o2 = eh.get(a2)) && mh((r2 = B({}, n2)), o2),
              It((o2 = (e6 = e6.ownerDocument || e6).createElement("script"))),
              Gf(o2, "link", r2),
              e6.head.appendChild(o2),
              (t2.instance = o2))
        );
      case "void":
        return null;
      default:
        throw Error(k(443, t2.type));
    }
  else
    t2.type === "stylesheet" &&
      !(4 & t2.state.loading) &&
      ((r2 = t2.instance), (t2.state.loading |= 4), ph(r2, n2.precedence, e6));
  return t2.instance;
}
function ph(e6, t2, n2) {
  for (
    var r2 = n2.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),
      o2 = r2.length ? r2[r2.length - 1] : null,
      a2 = o2,
      l2 = 0;
    l2 < r2.length;
    l2++
  ) {
    var i2 = r2[l2];
    if (i2.dataset.precedence === t2) a2 = i2;
    else if (a2 !== o2) break;
  }
  a2
    ? a2.parentNode.insertBefore(e6, a2.nextSibling)
    : (t2 = n2.nodeType === 9 ? n2.head : n2).insertBefore(e6, t2.firstChild);
}
function hh(e6, t2) {
  e6.crossOrigin == null && (e6.crossOrigin = t2.crossOrigin),
    e6.referrerPolicy == null && (e6.referrerPolicy = t2.referrerPolicy),
    e6.title == null && (e6.title = t2.title);
}
function mh(e6, t2) {
  e6.crossOrigin == null && (e6.crossOrigin = t2.crossOrigin),
    e6.referrerPolicy == null && (e6.referrerPolicy = t2.referrerPolicy),
    e6.integrity == null && (e6.integrity = t2.integrity);
}
var gh = null;
function vh(e6, t2, n2) {
  if (gh === null) {
    var r2 = new Map(),
      o2 = (gh = new Map());
    o2.set(n2, r2);
  } else (r2 = (o2 = gh).get(n2)) || ((r2 = new Map()), o2.set(n2, r2));
  if (r2.has(e6)) return r2;
  for (r2.set(e6, null), n2 = n2.getElementsByTagName(e6), o2 = 0; o2 < n2.length; o2++) {
    var a2 = n2[o2];
    if (
      !(a2[Ot] || a2[Et] || (e6 === "link" && a2.getAttribute("rel") === "stylesheet")) &&
      a2.namespaceURI !== "http://www.w3.org/2000/svg"
    ) {
      var l2 = a2.getAttribute(t2) || "";
      l2 = e6 + l2;
      var i2 = r2.get(l2);
      i2 ? i2.push(a2) : r2.set(l2, [a2]);
    }
  }
  return r2;
}
function yh(e6, t2, n2) {
  (e6 = e6.ownerDocument || e6).head.insertBefore(
    n2,
    t2 === "title" ? e6.querySelector("head > title") : null,
  );
}
function bh(e6, t2) {
  return (
    e6 === "img" && t2.src != null && t2.src !== "" && t2.onLoad == null && t2.loading !== "lazy"
  );
}
function wh(e6) {
  return !!(e6.type !== "stylesheet" || 3 & e6.state.loading);
}
function Eh(e6) {
  return (
    (e6.width || 100) *
    (e6.height || 100) *
    (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) *
    0.25
  );
}
function Sh(e6, t2) {
  typeof t2.decode == "function" &&
    (e6.imgCount++,
    t2.complete || ((e6.imgBytes += Eh(t2)), e6.suspenseyImages.push(t2)),
    (e6 = _h.bind(e6)),
    t2.decode().then(e6, e6));
}
var xh = 0;
function kh(e6) {
  if (e6.count === 0 && (e6.imgCount === 0 || !e6.waitingForImages)) {
    if (e6.stylesheets) Oh(e6, e6.stylesheets);
    else if (e6.unsuspend) {
      var t2 = e6.unsuspend;
      (e6.unsuspend = null), t2();
    }
  }
}
function Ch() {
  this.count--, kh(this);
}
function _h() {
  this.imgCount--, kh(this);
}
var Ph = null;
function Oh(e6, t2) {
  (e6.stylesheets = null),
    e6.unsuspend !== null &&
      (e6.count++, (Ph = new Map()), t2.forEach(Th, e6), (Ph = null), Ch.call(e6));
}
function Th(e6, t2) {
  if (!(4 & t2.state.loading)) {
    var n2 = Ph.get(e6);
    if (n2) var r2 = n2.get(null);
    else {
      (n2 = new Map()), Ph.set(e6, n2);
      for (
        var o2 = e6.querySelectorAll("link[data-precedence],style[data-precedence]"), a2 = 0;
        a2 < o2.length;
        a2++
      ) {
        var l2 = o2[a2];
        (l2.nodeName !== "LINK" && l2.getAttribute("media") === "not all") ||
          (n2.set(l2.dataset.precedence, l2), (r2 = l2));
      }
      r2 && n2.set(null, r2);
    }
    (l2 = (o2 = t2.instance).getAttribute("data-precedence")),
      (a2 = n2.get(l2) || r2) === r2 && n2.set(null, o2),
      n2.set(l2, o2),
      this.count++,
      (r2 = Ch.bind(this)),
      o2.addEventListener("load", r2),
      o2.addEventListener("error", r2),
      a2
        ? a2.parentNode.insertBefore(o2, a2.nextSibling)
        : (e6 = e6.nodeType === 9 ? e6.head : e6).insertBefore(o2, e6.firstChild),
      (t2.state.loading |= 4);
  }
}
var Nh = {
  $$typeof: Q,
  Provider: null,
  Consumer: null,
  _currentValue: me,
  _currentValue2: me,
  _threadCount: 0,
};
function $h(e6, t2, n2, r2, o2, a2, l2, i2, s2) {
  (this.tag = 1),
    (this.containerInfo = e6),
    (this.pingCache = this.current = this.pendingChildren = null),
    (this.timeoutHandle = -1),
    (this.callbackNode =
      this.next =
      this.pendingContext =
      this.context =
      this.cancelPendingCommit =
        null),
    (this.callbackPriority = 0),
    (this.expirationTimes = dt(-1)),
    (this.entangledLanes =
      this.shellSuspendCounter =
      this.errorRecoveryDisabledLanes =
      this.expiredLanes =
      this.warmLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = dt(0)),
    (this.hiddenUpdates = dt(null)),
    (this.identifierPrefix = r2),
    (this.onUncaughtError = o2),
    (this.onCaughtError = a2),
    (this.onRecoverableError = l2),
    (this.pooledCache = null),
    (this.pooledCacheLanes = 0),
    (this.formState = s2),
    (this.transitionTypes = null),
    (this.incompleteTransitions = new Map());
}
function Mh(e6, t2, n2, r2, o2, a2, l2, i2, s2, u2, c2, d2) {
  return (
    (e6 = new $h(e6, t2, n2, l2, s2, u2, c2, d2, i2)),
    (t2 = 1),
    a2 === !0 && (t2 |= 24),
    (a2 = Oo(3, null, null, t2)),
    (e6.current = a2),
    (a2.stateNode = e6),
    (t2 = Ta()).refCount++,
    (e6.pooledCache = t2),
    t2.refCount++,
    (a2.memoizedState = { element: r2, isDehydrated: n2, cache: t2 }),
    sl(a2),
    e6
  );
}
function Rh(e6) {
  return e6 ? (e6 = _o) : _o;
}
function Lh(e6, t2, n2, r2, o2, a2) {
  (o2 = Rh(o2)),
    r2.context === null ? (r2.context = o2) : (r2.pendingContext = o2),
    ((r2 = cl(t2)).payload = { element: n2 }),
    (a2 = a2 === void 0 ? null : a2) !== null && (r2.callback = a2),
    (n2 = dl(e6, r2, t2)) !== null && (Td(n2, 0, t2), fl(n2, e6, t2));
}
function Ih(e6, t2) {
  if ((e6 = e6.memoizedState) !== null && e6.dehydrated !== null) {
    var n2 = e6.retryLane;
    e6.retryLane = n2 !== 0 && n2 < t2 ? n2 : t2;
  }
}
function Ah(e6, t2) {
  Ih(e6, t2), (e6 = e6.alternate) && Ih(e6, t2);
}
function Fh(e6) {
  if (e6.tag === 13 || e6.tag === 31) {
    var t2 = xo(e6, 67108864);
    t2 !== null && Td(t2, 0, 67108864), Ah(e6, 67108864);
  }
}
function zh(e6) {
  if (e6.tag === 13 || e6.tag === 31) {
    var t2 = _d(),
      n2 = xo(e6, (t2 = gt(t2)));
    n2 !== null && Td(n2, 0, t2), Ah(e6, t2);
  }
}
var jh = !0;
function Dh(e6, t2, n2, r2) {
  var o2 = pe.T;
  pe.T = null;
  var a2 = he.p;
  try {
    (he.p = 2), Vh(e6, t2, n2, r2);
  } finally {
    (he.p = a2), (pe.T = o2);
  }
}
function Hh(e6, t2, n2, r2) {
  var o2 = pe.T;
  pe.T = null;
  var a2 = he.p;
  try {
    (he.p = 8), Vh(e6, t2, n2, r2);
  } finally {
    (he.p = a2), (pe.T = o2);
  }
}
function Vh(e6, t2, n2, r2) {
  if (jh) {
    var o2 = Bh(r2);
    if (o2 === null) zf(e6, t2, r2, Uh, n2), tm(e6, r2);
    else if (
      (function (e7, t3, n3, r3, o3) {
        switch (t3) {
          case "focusin":
            return (Kh = nm(Kh, e7, t3, n3, r3, o3)), !0;
          case "dragenter":
            return (Gh = nm(Gh, e7, t3, n3, r3, o3)), !0;
          case "mouseover":
            return (Yh = nm(Yh, e7, t3, n3, r3, o3)), !0;
          case "pointerover":
            var a3 = o3.pointerId;
            return Qh.set(a3, nm(Qh.get(a3) || null, e7, t3, n3, r3, o3)), !0;
          case "gotpointercapture":
            return (a3 = o3.pointerId), Jh.set(a3, nm(Jh.get(a3) || null, e7, t3, n3, r3, o3)), !0;
        }
        return !1;
      })(o2, e6, t2, n2, r2)
    )
      r2.stopPropagation();
    else if ((tm(e6, r2), 4 & t2 && -1 < em.indexOf(e6))) {
      for (; o2 !== null; ) {
        var a2 = Mt(o2);
        if (a2 !== null)
          switch (a2.tag) {
            case 3:
              if ((a2 = a2.stateNode).current.memoizedState.isDehydrated) {
                var l2 = at(a2.pendingLanes);
                if (l2 !== 0) {
                  var i2 = a2;
                  for (i2.pendingLanes |= 2, i2.entangledLanes |= 2; l2; ) {
                    var s2 = 1 << (31 - Ze(l2));
                    (i2.entanglements[1] |= s2), (l2 &= ~s2);
                  }
                  bf(a2), !(6 & Uc) && ((dd = He() + 500), wf(0, !1));
                }
              }
              break;
            case 31:
            case 13:
              (i2 = xo(a2, 2)) !== null && Td(i2, 0, 2), Ld(), Ah(a2, 2);
          }
        if (((a2 = Bh(r2)) === null && zf(e6, t2, r2, Uh, n2), a2 === o2)) break;
        o2 = a2;
      }
      o2 !== null && r2.stopPropagation();
    } else zf(e6, t2, r2, null, n2);
  }
}
function Bh(e6) {
  return Wh((e6 = yn(e6)));
}
var Uh = null;
function Wh(e6) {
  if (((Uh = null), (e6 = $t(e6)) !== null)) {
    var t2 = _(e6);
    if (t2 === null) e6 = null;
    else {
      var n2 = t2.tag;
      if (n2 === 13) {
        if ((e6 = P(t2)) !== null) return e6;
        e6 = null;
      } else if (n2 === 31) {
        if ((e6 = O(t2)) !== null) return e6;
        e6 = null;
      } else if (n2 === 3) {
        if (t2.stateNode.current.memoizedState.isDehydrated)
          return t2.tag === 3 ? t2.stateNode.containerInfo : null;
        e6 = null;
      } else t2 !== e6 && (e6 = null);
    }
  }
  return (Uh = e6), null;
}
function qh(e6) {
  switch (e6) {
    case "beforetoggle":
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "seeked":
    case "submit":
    case "toggle":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "fullscreenerror":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 2;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "resize":
    case "scroll":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 8;
    case "message":
      switch (Ve()) {
        case Be:
          return 2;
        case Ue:
          return 8;
        case We:
        case qe:
          return 32;
        case Xe:
          return 268435456;
        default:
          return 32;
      }
    default:
      return 32;
  }
}
var Xh = !1,
  Kh = null,
  Gh = null,
  Yh = null,
  Qh = new Map(),
  Jh = new Map(),
  Zh = [],
  em =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
      " ",
    );
function tm(e6, t2) {
  switch (e6) {
    case "focusin":
    case "focusout":
      Kh = null;
      break;
    case "dragenter":
    case "dragleave":
      Gh = null;
      break;
    case "mouseover":
    case "mouseout":
      Yh = null;
      break;
    case "pointerover":
    case "pointerout":
      Qh.delete(t2.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Jh.delete(t2.pointerId);
  }
}
function nm(e6, t2, n2, r2, o2, a2) {
  return e6 === null || e6.nativeEvent !== a2
    ? ((e6 = {
        blockedOn: t2,
        domEventName: n2,
        eventSystemFlags: r2,
        nativeEvent: a2,
        targetContainers: [o2],
      }),
      t2 !== null && (t2 = Mt(t2)) !== null && Fh(t2),
      e6)
    : ((e6.eventSystemFlags |= r2),
      (t2 = e6.targetContainers),
      o2 !== null && t2.indexOf(o2) === -1 && t2.push(o2),
      e6);
}
function rm(e6) {
  var t2 = $t(e6.target);
  if (t2 !== null) {
    var n2 = _(t2);
    if (n2 !== null) {
      if ((t2 = n2.tag) === 13) {
        if ((t2 = P(n2)) !== null)
          return (
            (e6.blockedOn = t2),
            void bt(e6.priority, function () {
              zh(n2);
            })
          );
      } else if (t2 === 31) {
        if ((t2 = O(n2)) !== null)
          return (
            (e6.blockedOn = t2),
            void bt(e6.priority, function () {
              zh(n2);
            })
          );
      } else if (t2 === 3 && n2.stateNode.current.memoizedState.isDehydrated)
        return void (e6.blockedOn = n2.tag === 3 ? n2.stateNode.containerInfo : null);
    }
  }
  e6.blockedOn = null;
}
function om(e6) {
  if (e6.blockedOn !== null) return !1;
  for (var t2 = e6.targetContainers; 0 < t2.length; ) {
    var n2 = Bh(e6.nativeEvent);
    if (n2 !== null) return (t2 = Mt(n2)) !== null && Fh(t2), (e6.blockedOn = n2), !1;
    var r2 = new (n2 = e6.nativeEvent).constructor(n2.type, n2);
    (vn = r2), n2.target.dispatchEvent(r2), (vn = null), t2.shift();
  }
  return !0;
}
function am(e6, t2, n2) {
  om(e6) && n2.delete(t2);
}
function lm() {
  (Xh = !1),
    Kh !== null && om(Kh) && (Kh = null),
    Gh !== null && om(Gh) && (Gh = null),
    Yh !== null && om(Yh) && (Yh = null),
    Qh.forEach(am),
    Jh.forEach(am);
}
function im(e6, t2) {
  e6.blockedOn === t2 &&
    ((e6.blockedOn = null),
    Xh || ((Xh = !0), E.unstable_scheduleCallback(E.unstable_NormalPriority, lm)));
}
var sm = null;
function um(e6) {
  sm !== e6 &&
    ((sm = e6),
    E.unstable_scheduleCallback(E.unstable_NormalPriority, function () {
      sm === e6 && (sm = null);
      for (var t2 = 0; t2 < e6.length; t2 += 3) {
        var n2 = e6[t2],
          r2 = e6[t2 + 1],
          o2 = e6[t2 + 2];
        if (typeof r2 != "function") {
          if (Wh(r2 || n2) === null) continue;
          break;
        }
        var a2 = Mt(n2);
        a2 !== null &&
          (e6.splice(t2, 3),
          (t2 -= 3),
          Ki(a2, { pending: !0, data: o2, method: n2.method, action: r2 }, r2, o2));
      }
    }));
}
function cm(e6) {
  function t2(t3) {
    return im(t3, e6);
  }
  Kh !== null && im(Kh, e6),
    Gh !== null && im(Gh, e6),
    Yh !== null && im(Yh, e6),
    Qh.forEach(t2),
    Jh.forEach(t2);
  for (var n2 = 0; n2 < Zh.length; n2++) {
    var r2 = Zh[n2];
    r2.blockedOn === e6 && (r2.blockedOn = null);
  }
  for (; 0 < Zh.length && (n2 = Zh[0]).blockedOn === null; )
    rm(n2), n2.blockedOn === null && Zh.shift();
  if ((n2 = (e6.ownerDocument || e6).$$reactFormReplay) != null)
    for (r2 = 0; r2 < n2.length; r2 += 3) {
      var o2 = n2[r2],
        a2 = n2[r2 + 1],
        l2 = o2[St] || null;
      if (typeof a2 == "function") l2 || um(n2);
      else if (l2) {
        var i2 = null;
        if (a2 && a2.hasAttribute("formAction")) {
          if (((o2 = a2), (l2 = a2[St] || null))) i2 = l2.formAction;
          else if (Wh(o2) !== null) continue;
        } else i2 = l2.action;
        typeof i2 == "function" ? (n2[r2 + 1] = i2) : (n2.splice(r2, 3), (r2 -= 3)), um(n2);
      }
    }
}
function dm() {
  function e6(e7) {
    e7.canIntercept &&
      e7.info === "react-transition" &&
      e7.intercept({
        handler: function () {
          return new Promise(function (e8) {
            return (o2 = e8);
          });
        },
        focusReset: "manual",
        scroll: "manual",
      });
  }
  function t2() {
    o2 !== null && (o2(), (o2 = null)), r2 || setTimeout(n2, 20);
  }
  function n2() {
    if (!r2 && !navigation.transition) {
      var e7 = navigation.currentEntry;
      e7 &&
        e7.url != null &&
        navigation.navigate(e7.url, {
          state: e7.getState(),
          info: "react-transition",
          history: "replace",
        });
    }
  }
  if (typeof navigation == "object") {
    var r2 = !1,
      o2 = null;
    return (
      navigation.addEventListener("navigate", e6),
      navigation.addEventListener("navigatesuccess", t2),
      navigation.addEventListener("navigateerror", t2),
      setTimeout(n2, 100),
      function () {
        (r2 = !0),
          navigation.removeEventListener("navigate", e6),
          navigation.removeEventListener("navigatesuccess", t2),
          navigation.removeEventListener("navigateerror", t2),
          o2 !== null && (o2(), (o2 = null));
      }
    );
  }
}
function fm(e6) {
  this._internalRoot = e6;
}
function pm(e6) {
  this._internalRoot = e6;
}
(pm.prototype.render = fm.prototype.render =
  function (e6) {
    var t2 = this._internalRoot;
    if (t2 === null) throw Error(k(409));
    Lh(t2.current, _d(), e6, t2, null, null);
  }),
  (pm.prototype.unmount = fm.prototype.unmount =
    function () {
      var e6 = this._internalRoot;
      if (e6 !== null) {
        this._internalRoot = null;
        var t2 = e6.containerInfo;
        Lh(e6.current, 2, null, e6, null, null), Ld(), (t2[xt] = null);
      }
    }),
  (pm.prototype.unstable_scheduleHydration = function (e6) {
    if (e6) {
      var t2 = yt();
      e6 = { blockedOn: null, target: e6, priority: t2 };
      for (var n2 = 0; n2 < Zh.length && t2 !== 0 && t2 < Zh[n2].priority; n2++);
      Zh.splice(n2, 0, e6), n2 === 0 && rm(e6);
    }
  });
var hm = S.version;
if (hm !== "19.3.1") throw Error(k(527, hm, "19.3.1"));
he.findDOMNode = function (e6) {
  var t2 = e6._reactInternals;
  if (t2 === void 0)
    throw typeof e6.render == "function"
      ? Error(k(188))
      : ((e6 = Object.keys(e6).join(",")), Error(k(268, e6)));
  return (
    (e6 = (function (e7) {
      var t3 = e7.alternate;
      if (!t3) {
        if ((t3 = _(e7)) === null) throw Error(k(188));
        return t3 !== e7 ? null : e7;
      }
      for (var n2 = e7, r2 = t3; ; ) {
        var o2 = n2.return;
        if (o2 === null) break;
        var a2 = o2.alternate;
        if (a2 === null) {
          if ((r2 = o2.return) !== null) {
            n2 = r2;
            continue;
          }
          break;
        }
        if (o2.child === a2.child) {
          for (a2 = o2.child; a2; ) {
            if (a2 === n2) return T(o2), e7;
            if (a2 === r2) return T(o2), t3;
            a2 = a2.sibling;
          }
          throw Error(k(188));
        }
        if (n2.return !== r2.return) (n2 = o2), (r2 = a2);
        else {
          for (var l2 = !1, i2 = o2.child; i2; ) {
            if (i2 === n2) {
              (l2 = !0), (n2 = o2), (r2 = a2);
              break;
            }
            if (i2 === r2) {
              (l2 = !0), (r2 = o2), (n2 = a2);
              break;
            }
            i2 = i2.sibling;
          }
          if (!l2) {
            for (i2 = a2.child; i2; ) {
              if (i2 === n2) {
                (l2 = !0), (n2 = a2), (r2 = o2);
                break;
              }
              if (i2 === r2) {
                (l2 = !0), (r2 = a2), (n2 = o2);
                break;
              }
              i2 = i2.sibling;
            }
            if (!l2) throw Error(k(189));
          }
        }
        if (n2.alternate !== r2) throw Error(k(190));
      }
      if (n2.tag !== 3) throw Error(k(188));
      return n2.stateNode.current === n2 ? e7 : t3;
    })(t2)),
    (e6 = (e6 = e6 !== null ? N(e6) : null) === null ? null : e6.stateNode)
  );
};
var mm = {
  bundleType: 0,
  version: "19.3.1",
  rendererPackageName: "react-dom",
  currentDispatcherRef: pe,
  reconcilerVersion: "19.3.1",
};
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var gm = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!gm.isDisabled && gm.supportsFiber)
    try {
      (Ye = gm.inject(mm)), (Qe = gm);
    } catch {}
}
(y.createRoot = function (e6, t2) {
  if (!C(e6)) throw Error(k(299));
  var n2 = !1,
    r2 = "",
    o2 = vs,
    a2 = ys,
    l2 = bs;
  return (
    t2 != null &&
      (t2.unstable_strictMode === !0 && (n2 = !0),
      t2.identifierPrefix !== void 0 && (r2 = t2.identifierPrefix),
      t2.onUncaughtError !== void 0 && (o2 = t2.onUncaughtError),
      t2.onCaughtError !== void 0 && (a2 = t2.onCaughtError),
      t2.onRecoverableError !== void 0 && (l2 = t2.onRecoverableError)),
    (t2 = Mh(e6, 1, !1, null, 0, n2, r2, null, o2, a2, l2, dm)),
    (e6[xt] = t2.current),
    Af(e6),
    new fm(t2)
  );
}),
  (y.hydrateRoot = function (e6, t2, n2) {
    if (!C(e6)) throw Error(k(299));
    var r2 = !1,
      o2 = "",
      a2 = vs,
      l2 = ys,
      i2 = bs,
      s2 = null;
    return (
      n2 != null &&
        (n2.unstable_strictMode === !0 && (r2 = !0),
        n2.identifierPrefix !== void 0 && (o2 = n2.identifierPrefix),
        n2.onUncaughtError !== void 0 && (a2 = n2.onUncaughtError),
        n2.onCaughtError !== void 0 && (l2 = n2.onCaughtError),
        n2.onRecoverableError !== void 0 && (i2 = n2.onRecoverableError),
        n2.formState !== void 0 && (s2 = n2.formState)),
      ((t2 = Mh(e6, 1, !0, t2, 0, r2, o2, s2, a2, l2, i2, dm)).context = Rh(null)),
      (n2 = t2.current),
      ((o2 = cl((r2 = gt((r2 = _d()))))).callback = null),
      dl(n2, o2, r2),
      (n2 = r2),
      (t2.current.lanes = n2),
      ft(t2, n2),
      bf(t2),
      (e6[xt] = t2.current),
      Af(e6),
      new pm(t2)
    );
  }),
  (y.version = "19.3.1"),
  (function e2() {
    if (
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" &&
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE == "function"
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e2);
      } catch {}
  })(),
  (v.exports = y);
var vm = v.exports;
const ym = {},
  bm = function (e6, t2, n2) {
    if (!t2 || t2.length === 0) return e6();
    const r2 = document.getElementsByTagName("link");
    return Promise.all(
      t2.map((e7) => {
        if (
          (e7 = (function (e8) {
            return "/eco--usb-device-web/static/" + e8;
          })(e7)) in ym
        )
          return;
        ym[e7] = !0;
        const t3 = e7.endsWith(".css"),
          o2 = t3 ? '[rel="stylesheet"]' : "";
        if (n2)
          for (let n3 = r2.length - 1; n3 >= 0; n3--) {
            const o3 = r2[n3];
            if (o3.href === e7 && (!t3 || o3.rel === "stylesheet")) return;
          }
        else if (document.querySelector(`link[href="${e7}"]${o2}`)) return;
        const a2 = document.createElement("link");
        return (
          (a2.rel = t3 ? "stylesheet" : "modulepreload"),
          t3 || ((a2.as = "script"), (a2.crossOrigin = "")),
          (a2.href = e7),
          document.head.appendChild(a2),
          t3
            ? new Promise((t4, n3) => {
                a2.addEventListener("load", t4),
                  a2.addEventListener("error", () =>
                    n3(new Error(`Unable to preload CSS for ${e7}`)),
                  );
              })
            : void 0
        );
      }),
    )
      .then(() => e6())
      .catch((e7) => {
        const t3 = new Event("vite:preloadError", { cancelable: !0 });
        if (((t3.payload = e7), window.dispatchEvent(t3), !t3.defaultPrevented)) throw e7;
      });
  };
var wm = /^(?:[a-z][a-z0-9+.-]*:|[\\/]{2})/i,
  Em = /^[\\/]{2}/,
  Sm = "popstate";
function xm(e6) {
  return (
    typeof e6 == "object" &&
    e6 != null &&
    "pathname" in e6 &&
    "search" in e6 &&
    "hash" in e6 &&
    "state" in e6 &&
    "key" in e6
  );
}
function km(e6 = {}) {
  return (function (e7, t2, n2, r2 = {}) {
    let { window: o2 = document.defaultView, v5Compat: a2 = !1 } = r2,
      l2 = o2.history,
      i2 = "POP",
      s2 = null,
      u2 = c2();
    u2 == null && ((u2 = 0), l2.replaceState({ ...l2.state, idx: u2 }, ""));
    function c2() {
      return (l2.state || { idx: null }).idx;
    }
    function d2() {
      i2 = "POP";
      let e8 = c2(),
        t3 = e8 == null ? null : e8 - u2;
      (u2 = e8), s2 && s2({ action: i2, location: m2.location, delta: t3 });
    }
    function f2(e8, t3) {
      i2 = "PUSH";
      let r3 = xm(e8) ? e8 : Om(m2.location, e8, t3);
      n2 && n2(r3, e8), (u2 = c2() + 1);
      let d3 = Pm(r3, u2),
        f3 = m2.createHref(r3.mask || r3);
      try {
        l2.pushState(d3, "", f3);
      } catch (p3) {
        if (p3 instanceof DOMException && p3.name === "DataCloneError") throw p3;
        o2.location.assign(f3);
      }
      a2 && s2 && s2({ action: i2, location: m2.location, delta: 1 });
    }
    function p2(e8, t3) {
      i2 = "REPLACE";
      let r3 = xm(e8) ? e8 : Om(m2.location, e8, t3);
      n2 && n2(r3, e8), (u2 = c2());
      let o3 = Pm(r3, u2),
        d3 = m2.createHref(r3.mask || r3);
      l2.replaceState(o3, "", d3), a2 && s2 && s2({ action: i2, location: m2.location, delta: 0 });
    }
    function h2(e8) {
      return (function (e9, t3, n3 = !1) {
        let r3 = "http://localhost";
        e9 && (r3 = e9.location.origin !== "null" ? e9.location.origin : e9.location.href),
          Cm(r3, "No window.location.(origin|href) available to create URL");
        let o3 = typeof t3 == "string" ? t3 : Tm(t3);
        return (
          (o3 = o3.replace(/ $/, "%20")), !n3 && Em.test(o3) && (o3 = r3 + o3), new URL(o3, r3)
        );
      })(o2, e8);
    }
    let m2 = {
      get action() {
        return i2;
      },
      get location() {
        return e7(o2, l2);
      },
      listen(e8) {
        if (s2) throw new Error("A history only accepts one active listener");
        return (
          o2.addEventListener(Sm, d2),
          (s2 = e8),
          () => {
            o2.removeEventListener(Sm, d2), (s2 = null);
          }
        );
      },
      createHref: (e8) => t2(o2, e8),
      createURL: h2,
      encodeLocation(e8) {
        let t3 = h2(e8);
        return { pathname: t3.pathname, search: t3.search, hash: t3.hash };
      },
      push: f2,
      replace: p2,
      go: (e8) => l2.go(e8),
    };
    return m2;
  })(
    function (e7, t2) {
      var n2;
      let r2 = (n2 = t2.state) == null ? void 0 : n2.masked,
        { pathname: o2, search: a2, hash: l2 } = r2 || e7.location;
      return Om(
        "",
        { pathname: o2, search: a2, hash: l2 },
        (t2.state && t2.state.usr) || null,
        (t2.state && t2.state.key) || "default",
        r2
          ? { pathname: e7.location.pathname, search: e7.location.search, hash: e7.location.hash }
          : void 0,
      );
    },
    function (e7, t2) {
      return typeof t2 == "string" ? t2 : Tm(t2);
    },
    null,
    e6,
  );
}
function Cm(e6, t2) {
  if (e6 === !1 || e6 == null) throw new Error(t2);
}
function _m(e6, t2) {
  if (!e6)
    try {
      throw new Error(t2);
    } catch {}
}
function Pm(e6, t2) {
  return {
    usr: e6.state,
    key: e6.key,
    idx: t2,
    masked: e6.mask ? { pathname: e6.pathname, search: e6.search, hash: e6.hash } : void 0,
  };
}
function Om(e6, t2, n2 = null, r2, o2) {
  return {
    pathname: typeof e6 == "string" ? e6 : e6.pathname,
    search: "",
    hash: "",
    ...(typeof t2 == "string" ? Nm(t2) : t2),
    state: n2,
    key: (t2 && t2.key) || r2 || Math.random().toString(36).substring(2, 10),
    mask: o2,
  };
}
function Tm({ pathname: e6 = "/", search: t2 = "", hash: n2 = "" }) {
  return (
    t2 && t2 !== "?" && (e6 += t2.charAt(0) === "?" ? t2 : "?" + t2),
    n2 && n2 !== "#" && (e6 += n2.charAt(0) === "#" ? n2 : "#" + n2),
    e6
  );
}
function Nm(e6) {
  let t2 = {};
  if (e6) {
    let n2 = e6.indexOf("#");
    n2 >= 0 && ((t2.hash = e6.substring(n2)), (e6 = e6.substring(0, n2)));
    let r2 = e6.indexOf("?");
    r2 >= 0 && ((t2.search = e6.substring(r2)), (e6 = e6.substring(0, r2))),
      e6 && (t2.pathname = e6);
  }
  return t2;
}
function $m(e6, t2, n2 = "/") {
  return (function (e7, t3, n3, r2, o2) {
    let a2 = typeof t3 == "string" ? Nm(t3) : t3,
      l2 = qm(a2.pathname || "/", n3);
    if (l2 == null) return null;
    let i2 =
        o2 ??
        (function (e8) {
          let t4 = Mm(e8);
          return (
            (function (e9) {
              e9.sort((e10, t5) =>
                e10.score !== t5.score
                  ? t5.score - e10.score
                  : (function (e11, t6) {
                      return e11.length === t6.length &&
                        e11.slice(0, -1).every((e12, n5) => e12 === t6[n5])
                        ? e11[e11.length - 1] - t6[t6.length - 1]
                        : 0;
                    })(
                      e10.routesMeta.map((e11) => e11.childrenIndex),
                      t5.routesMeta.map((e11) => e11.childrenIndex),
                    ),
              );
            })(t4),
            t4
          );
        })(e7),
      s2 = null,
      u2 = (function (e8) {
        try {
          return e8
            .split("/")
            .map((e9) => decodeURIComponent(e9).replace(/\//g, "%2F"))
            .join("/");
        } catch (t4) {
          return (
            _m(
              !1,
              `The URL path "${e8}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t4}).`,
            ),
            e8
          );
        }
      })(l2);
    for (let c2 = 0; s2 == null && c2 < i2.length; ++c2) s2 = Vm(i2[c2], u2, r2);
    return s2;
  })(e6, t2, n2, !1);
}
function Mm(e6, t2 = [], n2 = [], r2 = "", o2 = !1) {
  let a2 = (e7, a3, l2 = o2, i2) => {
    let s2 = {
      relativePath: i2 === void 0 ? e7.path || "" : i2,
      caseSensitive: e7.caseSensitive === !0,
      childrenIndex: a3,
      route: e7,
    };
    if (s2.relativePath.startsWith("/")) {
      if (!s2.relativePath.startsWith(r2) && l2) return;
      Cm(
        s2.relativePath.startsWith(r2),
        `Absolute route path "${s2.relativePath}" nested under path "${r2}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`,
      ),
        (s2.relativePath = s2.relativePath.slice(r2.length));
    }
    let u2 = Jm([r2, s2.relativePath]),
      c2 = n2.concat(s2);
    e7.children &&
      e7.children.length > 0 &&
      (Cm(
        e7.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${u2}".`,
      ),
      Mm(e7.children, t2, c2, u2, l2)),
      (e7.path != null || e7.index) &&
        t2.push({
          path: u2,
          score: Hm(u2, e7.index),
          routesMeta: c2.map((e8, t3) => {
            let [n3, r3] = Wm(e8.relativePath, e8.caseSensitive, t3 === c2.length - 1);
            return { ...e8, matcher: n3, compiledParams: r3 };
          }),
        });
  };
  return (
    e6.forEach((e7, t3) => {
      var n3;
      if (e7.path !== "" && (n3 = e7.path) != null && n3.includes("?"))
        for (let r3 of Rm(e7.path)) a2(e7, t3, !0, r3);
      else a2(e7, t3);
    }),
    t2
  );
}
function Rm(e6) {
  let t2 = e6.split("/");
  if (t2.length === 0) return [];
  let [n2, ...r2] = t2,
    o2 = n2.endsWith("?"),
    a2 = n2.replace(/\?$/, "");
  if (r2.length === 0) return o2 ? [a2, ""] : [a2];
  let l2 = Rm(r2.join("/")),
    i2 = [];
  return (
    i2.push(...l2.map((e7) => (e7 === "" ? a2 : [a2, e7].join("/")))),
    o2 && i2.push(...l2),
    i2.map((t3) => (e6.startsWith("/") && t3 === "" ? "/" : t3))
  );
}
var Lm = /^:[\w-]+$/,
  Im = 3,
  Am = 2,
  Fm = 1,
  zm = 10,
  jm = -2,
  Dm = (e6) => e6 === "*";
function Hm(e6, t2) {
  let n2 = e6.split("/"),
    r2 = n2.length;
  return (
    n2.some(Dm) && (r2 += jm),
    t2 && (r2 += Am),
    n2.filter((e7) => !Dm(e7)).reduce((e7, t3) => e7 + (Lm.test(t3) ? Im : t3 === "" ? Fm : zm), r2)
  );
}
function Vm(e6, t2, n2 = !1) {
  let { routesMeta: r2 } = e6,
    o2 = {},
    a2 = "/",
    l2 = [];
  for (let i2 = 0; i2 < r2.length; ++i2) {
    let e7 = r2[i2],
      s2 = i2 === r2.length - 1,
      u2 = a2 === "/" ? t2 : t2.slice(a2.length) || "/",
      c2 = { path: e7.relativePath, caseSensitive: e7.caseSensitive, end: s2 },
      d2 = e7.matcher && e7.compiledParams ? Um(c2, u2, e7.matcher, e7.compiledParams) : Bm(c2, u2),
      f2 = e7.route;
    if (
      (!d2 &&
        s2 &&
        n2 &&
        !r2[r2.length - 1].route.index &&
        (d2 = Bm({ path: e7.relativePath, caseSensitive: e7.caseSensitive, end: !1 }, u2)),
      !d2)
    )
      return null;
    Object.assign(o2, d2.params),
      l2.push({
        params: o2,
        pathname: Jm([a2, d2.pathname]),
        pathnameBase: eg(Jm([a2, d2.pathnameBase])),
        route: f2,
      }),
      d2.pathnameBase !== "/" && (a2 = Jm([a2, d2.pathnameBase]));
  }
  return l2;
}
function Bm(e6, t2) {
  typeof e6 == "string" && (e6 = { path: e6, caseSensitive: !1, end: !0 });
  let [n2, r2] = Wm(e6.path, e6.caseSensitive, e6.end);
  return Um(e6, t2, n2, r2);
}
function Um(e6, t2, n2, r2) {
  let o2 = t2.match(n2);
  if (!o2) return null;
  let a2 = o2[0],
    l2 = Zm(a2, 1),
    i2 = o2.slice(1);
  return {
    params: r2.reduce((e7, { paramName: t3, isOptional: n3 }, r3) => {
      if (t3 === "*") {
        let e8 = i2[r3] || "";
        l2 = Zm(a2.slice(0, a2.length - e8.length), 1);
      }
      const o3 = i2[r3];
      return (e7[t3] = n3 && !o3 ? void 0 : (o3 || "").replace(/%2F/g, "/")), e7;
    }, {}),
    pathname: a2,
    pathnameBase: l2,
    pattern: e6,
  };
}
function Wm(e6, t2 = !1, n2 = !0) {
  _m(
    e6 === "*" || !e6.endsWith("*") || e6.endsWith("/*"),
    `Route path "${e6}" will be treated as if it were "${e6.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e6.replace(/\*$/, "/*")}".`,
  );
  let r2 = [],
    o2 =
      "^" +
      e6
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(/\/:([\w-]+)(\?)?/g, (e7, t3, n3, o3, a2) => {
          if ((r2.push({ paramName: t3, isOptional: n3 != null }), n3)) {
            let t4 = a2.charAt(o3 + e7.length);
            return t4 && t4 !== "/" ? "/([^\\/]*)" : "(?:/([^\\/]*))?";
          }
          return "/([^\\/]+)";
        })
        .replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return (
    e6.endsWith("*")
      ? (r2.push({ paramName: "*" }),
        (o2 += e6 === "*" || e6 === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : n2
        ? (o2 += "\\/*$")
        : e6 !== "" && e6 !== "/" && (o2 += "(?:(?=\\/|$))"),
    [new RegExp(o2, t2 ? void 0 : "i"), r2]
  );
}
function qm(e6, t2) {
  if (t2 === "/") return e6;
  if (!e6.toLowerCase().startsWith(t2.toLowerCase())) return null;
  let n2 = t2.endsWith("/") ? t2.length - 1 : t2.length,
    r2 = e6.charAt(n2);
  return r2 && r2 !== "/" ? null : e6.slice(n2) || "/";
}
function Xm(e6, t2) {
  let n2 = Zm(t2).split("/");
  return (
    e6.split("/").forEach((e7) => {
      e7 === ".." ? n2.length > 1 && n2.pop() : e7 !== "." && n2.push(e7);
    }),
    n2.length > 1 ? n2.join("/") : "/"
  );
}
function Km(e6, t2, n2, r2) {
  return `Cannot include a '${e6}' character in a manually specified \`to.${t2}\` field [${JSON.stringify(r2)}].  Please separate it out to the \`to.${n2}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Gm(e6) {
  let t2 = (function (e7) {
    return e7.filter((e8, t3) => t3 === 0 || (e8.route.path && e8.route.path.length > 0));
  })(e6);
  return t2.map((e7, n2) => (n2 === t2.length - 1 ? e7.pathname : e7.pathnameBase));
}
function Ym(e6, t2, n2, r2 = !1) {
  let o2;
  typeof e6 == "string"
    ? (o2 = Nm(e6))
    : ((o2 = { ...e6 }),
      Cm(!o2.pathname || !o2.pathname.includes("?"), Km("?", "pathname", "search", o2)),
      Cm(!o2.pathname || !o2.pathname.includes("#"), Km("#", "pathname", "hash", o2)),
      Cm(!o2.search || !o2.search.includes("#"), Km("#", "search", "hash", o2)));
  let a2,
    l2 = e6 === "" || o2.pathname === "",
    i2 = l2 ? "/" : o2.pathname;
  if (i2 == null) a2 = n2;
  else {
    let e7 = t2.length - 1;
    if (!r2 && i2.startsWith("..")) {
      let t3 = i2.split("/");
      for (; t3[0] === ".."; ) t3.shift(), (e7 -= 1);
      o2.pathname = t3.join("/");
    }
    a2 = e7 >= 0 ? t2[e7] : "/";
  }
  let s2 = (function (e7, t3 = "/") {
      let n3,
        { pathname: r3, search: o3 = "", hash: a3 = "" } = typeof e7 == "string" ? Nm(e7) : e7;
      return (
        r3
          ? ((r3 = Qm(r3)),
            (n3 =
              r3.startsWith("/") || r3.startsWith("\\") ? Xm(r3.substring(1), "/") : Xm(r3, t3)))
          : (n3 = t3),
        { pathname: n3, search: tg(o3), hash: ng(a3) }
      );
    })(o2, a2),
    u2 = i2 && i2 !== "/" && i2.endsWith("/"),
    c2 = (l2 || i2 === ".") && n2.endsWith("/");
  return s2.pathname.endsWith("/") || (!u2 && !c2) || (s2.pathname += "/"), s2;
}
var Qm = (e6) => e6.replace(/[\\/]{2,}/g, "/"),
  Jm = (e6) => Qm(e6.join("/"));
function Zm(e6, t2 = 0) {
  let n2 = e6.length;
  for (; n2 > t2 && e6.charCodeAt(n2 - 1) === 47; ) n2--;
  return n2 === e6.length ? e6 : e6.slice(0, n2);
}
var eg = (e6) => Zm(e6).replace(/^\/*/, "/"),
  tg = (e6) => (e6 && e6 !== "?" ? (e6.startsWith("?") ? e6 : "?" + e6) : ""),
  ng = (e6) => (e6 && e6 !== "#" ? (e6.startsWith("#") ? e6 : "#" + e6) : ""),
  rg = class {
    constructor(e6, t2, n2, r2 = !1) {
      (this.status = e6),
        (this.statusText = t2 || ""),
        (this.internal = r2),
        n2 instanceof Error ? ((this.data = n2.toString()), (this.error = n2)) : (this.data = n2);
    }
  };
function og(e6) {
  let t2 = e6.map((e7) => e7.route.path).filter(Boolean);
  return Jm(t2) || "/";
}
var ag =
  typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0;
function lg(e6, t2) {
  let n2 = e6;
  if (typeof n2 != "string" || !wm.test(n2)) return { absoluteURL: void 0, isExternal: !1, to: n2 };
  let r2 = n2,
    o2 = !1;
  if (ag)
    try {
      let e7 = new URL(window.location.href),
        r3 = Em.test(n2) ? new URL(((a2 = n2), e7.protocol + a2.replace(/\\/g, "/"))) : new URL(n2),
        l2 = qm(r3.pathname, t2);
      r3.origin === e7.origin && l2 != null ? (n2 = l2 + r3.search + r3.hash) : (o2 = !0);
    } catch {
      _m(
        !1,
        `<Link to="${n2}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`,
      );
    }
  var a2;
  return { absoluteURL: r2, isExternal: o2, to: n2 };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
var ig = new URL("http://localhost");
function sg(e6) {
  if (e6.createURL) return e6.createURL("/");
  try {
    return new URL(e6.createHref("/"), ig);
  } catch {
    return ig;
  }
}
function ug(e6, t2) {
  return (
    e6.origin === t2.origin &&
    (e6.origin !== "null" || (e6.protocol === t2.protocol && e6.host === t2.host))
  );
}
function cg(e6, t2, n2, r2) {
  let o2 = null;
  try {
    o2 = e6 == null ? null : new URL(e6, n2);
  } catch {}
  let a2 = new URL(t2, n2),
    l2 = o2 != null && !ug(o2, n2),
    i2 = !ug(a2, n2);
  if (r2 === "reject") {
    if (l2 || i2) throw new Error("External navigation is not allowed");
  } else if (
    i2 &&
    (o2 == null ||
      !(function (e7, t3) {
        if (e7.startsWith("//")) return !0;
        let n3 = t3.protocol.toLowerCase();
        return (
          !!e7.toLowerCase().startsWith(n3) &&
          (t3.host === "" || e7.slice(n3.length).startsWith("//"))
        );
      })(e6, o2) ||
      !ug(o2, a2))
  )
    throw new Error("External navigation is not allowed");
}
var dg = ["POST", "PUT", "PATCH", "DELETE"];
new Set(dg);
var fg = ["GET", ...dg];
new Set(fg);
var pg = [
    "about:",
    "blob:",
    "chrome:",
    "chrome-untrusted:",
    "content:",
    "data:",
    "devtools:",
    "file:",
    "filesystem:",
    "javascript:",
  ],
  hg = r.createContext(null);
hg.displayName = "DataRouter";
var mg = r.createContext(null);
mg.displayName = "DataRouterState";
var gg = r.createContext(!1),
  vg = r.createContext({ isTransitioning: !1 });
(vg.displayName = "ViewTransition"),
  (r.createContext(new Map()).displayName = "Fetchers"),
  (r.createContext(null).displayName = "Await");
var yg = r.createContext(null);
yg.displayName = "Navigation";
var bg = r.createContext(null);
bg.displayName = "Location";
var wg = r.createContext({ outlet: null, matches: [], isDataRoute: !1 });
wg.displayName = "Route";
var Eg = r.createContext(null);
Eg.displayName = "RouteError";
var Sg = "REACT_ROUTER_ERROR";
function xg() {
  return r.useContext(bg) != null;
}
function kg() {
  return (
    Cm(xg(), "useLocation() may be used only in the context of a <Router> component."),
    r.useContext(bg).location
  );
}
var Cg =
  "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function _g(e6) {
  r.useContext(yg).static || r.useLayoutEffect(e6);
}
function Pg() {
  let { isDataRoute: e6 } = r.useContext(wg);
  return e6
    ? (function () {
        let { router: e7 } = (function (e8) {
            let t3 = r.useContext(hg);
            return Cm(t3, Ag(e8)), t3;
          })("useNavigate"),
          t2 = Fg("useNavigate"),
          n2 = r.useRef(!1);
        return (
          _g(() => {
            n2.current = !0;
          }),
          r.useCallback(
            async (r2, o3 = {}) => {
              _m(n2.current, Cg),
                n2.current &&
                  (typeof r2 == "number"
                    ? await e7.navigate(r2)
                    : await e7.navigate(r2, { fromRouteId: t2, ...o3 }));
            },
            [e7, t2],
          )
        );
      })()
    : (function () {
        Cm(xg(), "useNavigate() may be used only in the context of a <Router> component.");
        let e7 = r.useContext(hg),
          { basename: t2, navigator: n2 } = r.useContext(yg),
          { matches: o2 } = r.useContext(wg),
          { pathname: a2 } = kg(),
          l2 = JSON.stringify(Gm(o2)),
          i2 = r.useRef(!1);
        return (
          _g(() => {
            i2.current = !0;
          }),
          r.useCallback(
            (r2, o3 = {}) => {
              if ((_m(i2.current, Cg), !i2.current)) return;
              if (typeof r2 == "number") return void n2.go(r2);
              let s3 = Ym(r2, JSON.parse(l2), a2, o3.relative === "path");
              e7 == null &&
                t2 !== "/" &&
                (s3.pathname = s3.pathname === "/" ? t2 : Jm([t2, s3.pathname])),
                cg(typeof r2 == "string" ? r2 : Tm(r2), n2.createHref(s3), sg(n2), "reject"),
                (o3.replace ? n2.replace : n2.push)(s3, o3.state, o3);
            },
            [t2, n2, l2, a2, e7],
          )
        );
      })();
}
function Og(e6, { relative: t2 } = {}) {
  let { matches: n2 } = r.useContext(wg),
    { pathname: o2 } = kg(),
    a2 = JSON.stringify(Gm(n2));
  return r.useMemo(() => Ym(e6, JSON.parse(a2), o2, t2 === "path"), [e6, a2, o2, t2]);
}
function Tg(e6, t2, n2) {
  var o2;
  Cm(xg(), "useRoutes() may be used only in the context of a <Router> component.");
  let { navigator: a2 } = r.useContext(yg),
    { matches: l2 } = r.useContext(wg),
    i2 = l2[l2.length - 1],
    s2 = i2 ? i2.params : {},
    u2 = i2 ? i2.pathname : "/",
    c2 = i2 ? i2.pathnameBase : "/",
    d2 = i2 && i2.route;
  {
    let e7 = (d2 && d2.path) || "";
    jg(
      u2,
      !d2 || e7.endsWith("*") || e7.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${u2}" (under <Route path="${e7}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${e7}"> to <Route path="${e7 === "/" ? "*" : `${e7}/*`}">.`,
    );
  }
  let f2,
    p2 = kg();
  if (t2) {
    let e7 = typeof t2 == "string" ? Nm(t2) : t2;
    Cm(
      c2 === "/" || ((o2 = e7.pathname) == null ? void 0 : o2.startsWith(c2)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${c2}" but pathname "${e7.pathname}" was given in the \`location\` prop.`,
    ),
      (f2 = e7);
  } else f2 = p2;
  let h2 = f2.pathname || "/",
    m2 = h2;
  if (c2 !== "/") {
    let e7 = c2.replace(/^\//, "").split("/");
    m2 = "/" + h2.replace(/^\//, "").split("/").slice(e7.length).join("/");
  }
  let g2 =
    n2 && n2.state.matches.length
      ? n2.state.matches.map((e7) =>
          Object.assign(e7, { route: n2.manifest[e7.route.id] || e7.route }),
        )
      : $m(e6, { pathname: m2 });
  _m(d2 || g2 != null, `No routes matched location "${f2.pathname}${f2.search}${f2.hash}" `),
    _m(
      g2 == null ||
        g2[g2.length - 1].route.element !== void 0 ||
        g2[g2.length - 1].route.Component !== void 0 ||
        g2[g2.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${f2.pathname}${f2.search}${f2.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`,
    );
  let v2 = (function (e7, t3 = [], n3) {
    let o3 = n3?.state;
    if (e7 == null) {
      if (!o3) return null;
      if (o3.errors) e7 = o3.matches;
      else {
        if (t3.length !== 0 || o3.initialized || !(o3.matches.length > 0)) return null;
        e7 = o3.matches;
      }
    }
    let a3 = e7,
      l3 = o3?.errors;
    if (l3 != null) {
      let e8 = a3.findIndex((e9) => e9.route.id && l3?.[e9.route.id] !== void 0);
      Cm(
        e8 >= 0,
        `Could not find a matching route for errors on route IDs: ${Object.keys(l3).join(",")}`,
      ),
        (a3 = a3.slice(0, Math.min(a3.length, e8 + 1)));
    }
    let i3 = !1,
      s3 = -1;
    if (n3 && o3) {
      i3 = o3.renderFallback;
      for (let e8 = 0; e8 < a3.length; e8++) {
        let t4 = a3[e8];
        if (
          ((t4.route.HydrateFallback || t4.route.hydrateFallbackElement) && (s3 = e8), t4.route.id)
        ) {
          let { loaderData: e9, errors: r2 } = o3,
            l4 =
              t4.route.loader &&
              !e9.hasOwnProperty(t4.route.id) &&
              (!r2 || r2[t4.route.id] === void 0);
          if (t4.route.lazy || l4) {
            n3.isStatic && (i3 = !0), (a3 = s3 >= 0 ? a3.slice(0, s3 + 1) : [a3[0]]);
            break;
          }
        }
      }
    }
    let u3 = n3?.onError,
      c3 =
        o3 && u3
          ? (e8, t4) => {
              var n4, r2;
              u3(e8, {
                location: o3.location,
                params:
                  ((r2 = (n4 = o3.matches) == null ? void 0 : n4[0]) == null
                    ? void 0
                    : r2.params) ?? {},
                pattern: og(o3.matches),
                errorInfo: t4,
              });
            }
          : void 0;
    return a3.reduceRight((e8, n4, u4) => {
      let d3,
        f3 = !1,
        p3 = null,
        h3 = null;
      o3 &&
        ((d3 = l3 && n4.route.id ? l3[n4.route.id] : void 0),
        (p3 = n4.route.errorElement || $g),
        i3 &&
          (s3 < 0 && u4 === 0
            ? (jg(
                "route-fallback",
                !1,
                "No `HydrateFallback` element provided to render during initial hydration",
              ),
              (f3 = !0),
              (h3 = null))
            : s3 === u4 && ((f3 = !0), (h3 = n4.route.hydrateFallbackElement || null))));
      let m3 = t3.concat(a3.slice(0, u4 + 1)),
        g3 = () => {
          let t4;
          return (
            (t4 = d3
              ? p3
              : f3
                ? h3
                : n4.route.Component
                  ? r.createElement(n4.route.Component, null)
                  : n4.route.element
                    ? n4.route.element
                    : e8),
            r.createElement(Ig, {
              match: n4,
              routeContext: { outlet: e8, matches: m3, isDataRoute: o3 != null },
              children: t4,
            })
          );
        };
      return o3 && (n4.route.ErrorBoundary || n4.route.errorElement || u4 === 0)
        ? r.createElement(Mg, {
            location: o3.location,
            revalidation: o3.revalidation,
            component: p3,
            error: d3,
            children: g3(),
            routeContext: { outlet: null, matches: m3, isDataRoute: !0 },
            onError: c3,
          })
        : g3();
    }, null);
  })(
    g2 &&
      g2.map((e7) =>
        Object.assign({}, e7, {
          params: Object.assign({}, s2, e7.params),
          pathname: Jm([
            c2,
            a2.encodeLocation
              ? a2.encodeLocation(
                  e7.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23"),
                ).pathname
              : e7.pathname,
          ]),
          pathnameBase:
            e7.pathnameBase === "/"
              ? c2
              : Jm([
                  c2,
                  a2.encodeLocation
                    ? a2.encodeLocation(
                        e7.pathnameBase
                          .replace(/%/g, "%25")
                          .replace(/\?/g, "%3F")
                          .replace(/#/g, "%23"),
                      ).pathname
                    : e7.pathnameBase,
                ]),
        }),
      ),
    l2,
    n2,
  );
  return t2 && v2
    ? r.createElement(
        bg.Provider,
        {
          value: {
            location: {
              pathname: "/",
              search: "",
              hash: "",
              state: null,
              key: "default",
              mask: void 0,
              ...f2,
            },
            navigationType: "POP",
          },
        },
        v2,
      )
    : v2;
}
function Ng() {
  let e6 = (function () {
      var e7;
      let t3 = r.useContext(Eg),
        n3 = (function (e8) {
          let t4 = r.useContext(mg);
          return Cm(t4, Ag(e8)), t4;
        })("useRouteError"),
        o3 = Fg("useRouteError");
      return t3 !== void 0 ? t3 : (e7 = n3.errors) == null ? void 0 : e7[o3];
    })(),
    t2 = (function (e7) {
      return (
        e7 != null &&
        typeof e7.status == "number" &&
        typeof e7.statusText == "string" &&
        typeof e7.internal == "boolean" &&
        "data" in e7
      );
    })(e6)
      ? `${e6.status} ${e6.statusText}`
      : e6 instanceof Error
        ? e6.message
        : JSON.stringify(e6),
    n2 = e6 instanceof Error ? e6.stack : null,
    o2 = "rgba(200,200,200, 0.5)",
    a2 = { padding: "0.5rem", backgroundColor: o2 },
    l2 = { padding: "2px 4px", backgroundColor: o2 },
    i2 = null;
  return (
    (i2 = r.createElement(
      r.Fragment,
      null,
      r.createElement("p", null, "\u{1F4BF} Hey developer \u{1F44B}"),
      r.createElement(
        "p",
        null,
        "You can provide a way better UX than this when your app throws errors by providing your own ",
        r.createElement("code", { style: l2 }, "ErrorBoundary"),
        " or",
        " ",
        r.createElement("code", { style: l2 }, "errorElement"),
        " prop on your route.",
      ),
    )),
    r.createElement(
      r.Fragment,
      null,
      r.createElement("h2", null, "Unexpected Application Error!"),
      r.createElement("h3", { style: { fontStyle: "italic" } }, t2),
      n2 ? r.createElement("pre", { style: a2 }, n2) : null,
      i2,
    )
  );
}
r.createContext(null);
var $g = r.createElement(Ng, null),
  Mg = class extends r.Component {
    constructor(e6) {
      super(e6),
        (this.state = { location: e6.location, revalidation: e6.revalidation, error: e6.error });
    }
    static getDerivedStateFromError(e6) {
      return { error: e6 };
    }
    static getDerivedStateFromProps(e6, t2) {
      return t2.location !== e6.location ||
        (t2.revalidation !== "idle" && e6.revalidation === "idle")
        ? { error: e6.error, location: e6.location, revalidation: e6.revalidation }
        : {
            error: e6.error !== void 0 ? e6.error : t2.error,
            location: t2.location,
            revalidation: e6.revalidation || t2.revalidation,
          };
    }
    componentDidCatch(e6, t2) {
      this.props.onError && this.props.onError(e6, t2);
    }
    render() {
      let e6 = this.state.error;
      if (
        this.context &&
        typeof e6 == "object" &&
        e6 &&
        "digest" in e6 &&
        typeof e6.digest == "string"
      ) {
        const t3 = (function (e7) {
          if (e7.startsWith(`${Sg}:ROUTE_ERROR_RESPONSE:{`))
            try {
              let t4 = JSON.parse(e7.slice(40));
              if (
                typeof t4 == "object" &&
                t4 &&
                typeof t4.status == "number" &&
                typeof t4.statusText == "string"
              )
                return new rg(t4.status, t4.statusText, t4.data);
            } catch {}
        })(e6.digest);
        t3 && (e6 = t3);
      }
      let t2 =
        e6 !== void 0
          ? r.createElement(
              wg.Provider,
              { value: this.props.routeContext },
              r.createElement(Eg.Provider, { value: e6, children: this.props.component }),
            )
          : this.props.children;
      return this.context ? r.createElement(Lg, { error: e6 }, t2) : t2;
    }
  };
Mg.contextType = gg;
var Rg = new WeakMap();
function Lg({ children: e6, error: t2 }) {
  let { basename: n2, navigator: o2 } = r.useContext(yg);
  if (typeof t2 == "object" && t2 && "digest" in t2 && typeof t2.digest == "string") {
    let e7 = (function (e8) {
      if (e8.startsWith(`${Sg}:REDIRECT:{`))
        try {
          let t3 = JSON.parse(e8.slice(28));
          if (
            typeof t3 == "object" &&
            t3 &&
            typeof t3.status == "number" &&
            typeof t3.statusText == "string" &&
            typeof t3.location == "string" &&
            typeof t3.reloadDocument == "boolean" &&
            typeof t3.replace == "boolean"
          )
            return t3;
        } catch {}
    })(t2.digest);
    if (e7) {
      let a2 = Rg.get(t2);
      if (a2) throw a2;
      let l2 = lg(e7.location, n2),
        i2 = l2.absoluteURL || l2.to;
      if (
        (cg(e7.location, i2, sg(o2), "allow-explicit"),
        (function (e8) {
          try {
            return pg.includes(new URL(e8).protocol);
          } catch {
            return !1;
          }
        })(i2))
      )
        throw new Error("Invalid redirect location");
      if (ag && !Rg.get(t2)) {
        if (!l2.isExternal && !e7.reloadDocument) {
          const n3 = Promise.resolve().then(() =>
            window.__reactRouterDataRouter.navigate(l2.to, { replace: e7.replace }),
          );
          throw (Rg.set(t2, n3), n3);
        }
        window.location.href = i2;
      }
      return r.createElement("meta", { httpEquiv: "refresh", content: `0;url=${i2}` });
    }
  }
  return e6;
}
function Ig({ routeContext: e6, match: t2, children: n2 }) {
  let o2 = r.useContext(hg);
  return (
    o2 &&
      o2.static &&
      o2.staticContext &&
      (t2.route.errorElement || t2.route.ErrorBoundary) &&
      (o2.staticContext._deepestRenderedBoundaryId = t2.route.id),
    r.createElement(wg.Provider, { value: e6 }, n2)
  );
}
function Ag(e6) {
  return `${e6} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Fg(e6) {
  let t2 = (function (e7) {
      let t3 = r.useContext(wg);
      return Cm(t3, Ag(e7)), t3;
    })(e6),
    n2 = t2.matches[t2.matches.length - 1];
  return (
    Cm(n2.route.id, `${e6} can only be used on routes that contain a unique "id"`), n2.route.id
  );
}
var zg = {};
function jg(e6, t2, n2) {
  t2 || zg[e6] || ((zg[e6] = !0), _m(!1, n2));
}
function Dg(e6) {
  Cm(
    !1,
    "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.",
  );
}
function Hg({
  basename: e6 = "/",
  children: t2 = null,
  location: n2,
  navigationType: o2 = "POP",
  navigator: a2,
  static: l2 = !1,
  useTransitions: i2,
}) {
  Cm(
    !xg(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.",
  );
  let s2 = e6.replace(/^\/*/, "/"),
    u2 = r.useMemo(
      () => ({ basename: s2, navigator: a2, static: l2, useTransitions: i2, future: {} }),
      [s2, a2, l2, i2],
    );
  typeof n2 == "string" && (n2 = Nm(n2));
  let {
      pathname: c2 = "/",
      search: d2 = "",
      hash: f2 = "",
      state: p2 = null,
      key: h2 = "default",
      mask: m2,
    } = n2,
    g2 = r.useMemo(() => {
      let e7 = qm(c2, s2);
      return e7 == null
        ? null
        : {
            location: { pathname: e7, search: d2, hash: f2, state: p2, key: h2, mask: m2 },
            navigationType: o2,
          };
    }, [s2, c2, d2, f2, p2, h2, o2, m2]);
  return (
    _m(
      g2 != null,
      `<Router basename="${s2}"> is not able to match the URL "${c2}${d2}${f2}" because it does not start with the basename, so the <Router> won't render anything.`,
    ),
    g2 == null
      ? null
      : r.createElement(
          yg.Provider,
          { value: u2 },
          r.createElement(bg.Provider, { children: t2, value: g2 }),
        )
  );
}
function Vg({ children: e6, location: t2 }) {
  return Tg(Bg(e6), t2);
}
function Bg(e6, t2 = []) {
  let n2 = [];
  return (
    r.Children.forEach(e6, (e7, o2) => {
      if (!r.isValidElement(e7)) return;
      let a2 = [...t2, o2];
      if (e7.type === r.Fragment) return void n2.push.apply(n2, Bg(e7.props.children, a2));
      Cm(
        e7.type === Dg,
        `[${typeof e7.type == "string" ? e7.type : e7.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`,
      ),
        Cm(!e7.props.index || !e7.props.children, "An index route cannot have child routes.");
      let l2 = {
        id: e7.props.id || a2.join("-"),
        caseSensitive: e7.props.caseSensitive,
        element: e7.props.element,
        Component: e7.props.Component,
        index: e7.props.index,
        path: e7.props.path,
        middleware: e7.props.middleware,
        loader: e7.props.loader,
        action: e7.props.action,
        hydrateFallbackElement: e7.props.hydrateFallbackElement,
        HydrateFallback: e7.props.HydrateFallback,
        errorElement: e7.props.errorElement,
        ErrorBoundary: e7.props.ErrorBoundary,
        hasErrorBoundary:
          e7.props.hasErrorBoundary === !0 ||
          e7.props.ErrorBoundary != null ||
          e7.props.errorElement != null,
        shouldRevalidate: e7.props.shouldRevalidate,
        handle: e7.props.handle,
        lazy: e7.props.lazy,
      };
      e7.props.children && (l2.children = Bg(e7.props.children, a2)), n2.push(l2);
    }),
    n2
  );
}
r.memo(function ({ routes: e6, manifest: t2, future: n2, state: r2, isStatic: o2, onError: a2 }) {
  return Tg(e6, void 0, { manifest: t2, state: r2, isStatic: o2, onError: a2, future: n2 });
});
var Ug = "get",
  Wg = "application/x-www-form-urlencoded";
function qg(e6) {
  return typeof HTMLElement < "u" && e6 instanceof HTMLElement;
}
function Xg(e6 = "") {
  return new URLSearchParams(
    typeof e6 == "string" || Array.isArray(e6) || e6 instanceof URLSearchParams
      ? e6
      : Object.keys(e6).reduce((t2, n2) => {
          let r2 = e6[n2];
          return t2.concat(Array.isArray(r2) ? r2.map((e7) => [n2, e7]) : [[n2, r2]]);
        }, []),
  );
}
var Kg = null,
  Gg = new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
function Yg(e6) {
  return e6 == null || Gg.has(e6)
    ? e6
    : (_m(
        !1,
        `"${e6}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Wg}"`,
      ),
      null);
}
function Qg(e6, t2) {
  let n2, r2, o2, a2, l2;
  if (qg((i2 = e6)) && i2.tagName.toLowerCase() === "form") {
    let l3 = e6.getAttribute("action");
    (r2 = l3 ? qm(l3, t2) : null),
      (n2 = e6.getAttribute("method") || Ug),
      (o2 = Yg(e6.getAttribute("enctype")) || Wg),
      (a2 = new FormData(e6));
  } else if (
    (function (e7) {
      return qg(e7) && e7.tagName.toLowerCase() === "button";
    })(e6) ||
    ((function (e7) {
      return qg(e7) && e7.tagName.toLowerCase() === "input";
    })(e6) &&
      (e6.type === "submit" || e6.type === "image"))
  ) {
    let l3 = e6.form;
    if (l3 == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let i3 = e6.getAttribute("formaction") || l3.getAttribute("action");
    if (
      ((r2 = i3 ? qm(i3, t2) : null),
      (n2 = e6.getAttribute("formmethod") || l3.getAttribute("method") || Ug),
      (o2 = Yg(e6.getAttribute("formenctype")) || Yg(l3.getAttribute("enctype")) || Wg),
      (a2 = new FormData(l3, e6)),
      !(function () {
        if (Kg === null)
          try {
            new FormData(document.createElement("form"), 0), (Kg = !1);
          } catch {
            Kg = !0;
          }
        return Kg;
      })())
    ) {
      let { name: t3, type: n3, value: r3 } = e6;
      if (n3 === "image") {
        let e7 = t3 ? `${t3}.` : "";
        a2.append(`${e7}x`, "0"), a2.append(`${e7}y`, "0");
      } else t3 && a2.append(t3, r3);
    }
  } else {
    if (qg(e6))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">',
      );
    (n2 = Ug), (r2 = null), (o2 = Wg), (l2 = e6);
  }
  var i2;
  return (
    a2 && o2 === "text/plain" && ((l2 = a2), (a2 = void 0)),
    { action: r2, method: n2.toLowerCase(), encType: o2, formData: a2, body: l2 }
  );
}
function Jg(e6, t2) {
  if (e6 === !1 || e6 == null) throw new Error(t2);
}
function Zg(e6, t2, n2, r2) {
  let o2 =
    typeof e6 == "string"
      ? new URL(e6, typeof window > "u" ? "server://singlefetch/" : window.location.origin)
      : e6;
  return (
    n2
      ? o2.pathname.endsWith("/")
        ? (o2.pathname = `${o2.pathname}_.${r2}`)
        : (o2.pathname = `${o2.pathname}.${r2}`)
      : o2.pathname === "/"
        ? (o2.pathname = `_root.${r2}`)
        : t2 && qm(o2.pathname, t2) === "/"
          ? (o2.pathname = `${Zm(t2)}/_root.${r2}`)
          : (o2.pathname = `${Zm(o2.pathname)}.${r2}`),
    o2
  );
}
function ev(e6) {
  return (
    e6 != null &&
    (e6.href == null
      ? e6.rel === "preload" &&
        typeof e6.imageSrcSet == "string" &&
        typeof e6.imageSizes == "string"
      : typeof e6.rel == "string" && typeof e6.href == "string")
  );
}
async function tv(e6, t2, n2) {
  return (function (e7, t3) {
    let n3 = new Set(),
      r2 = new Set(t3);
    return e7.reduce((e8, o2) => {
      var a2;
      if (
        t3 &&
        !((a2 = o2) != null && typeof a2.page == "string") &&
        o2.as === "script" &&
        o2.href &&
        r2.has(o2.href)
      )
        return e8;
      let l2 = JSON.stringify(
        (function (e9) {
          let t4 = {},
            n4 = Object.keys(e9).sort();
          for (let r3 of n4) t4[r3] = e9[r3];
          return t4;
        })(o2),
      );
      return n3.has(l2) || (n3.add(l2), e8.push({ key: l2, link: o2 })), e8;
    }, []);
  })(
    (
      await Promise.all(
        e6.map(async (e7) => {
          let r2 = t2.routes[e7.route.id];
          if (r2) {
            let e8 = await (async function (e9, t3) {
              if (e9.id in t3) return t3[e9.id];
              try {
                let n3 = await bm(() => import(e9.module), []);
                return (t3[e9.id] = n3), n3;
              } catch {
                return (
                  window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
                  window.location.reload(),
                  new Promise(() => {})
                );
              }
            })(r2, n2);
            return e8.links ? e8.links() : [];
          }
          return [];
        }),
      )
    )
      .flat(1)
      .filter(ev)
      .filter((e7) => e7.rel === "stylesheet" || e7.rel === "preload")
      .map((e7) =>
        e7.rel === "stylesheet"
          ? { ...e7, rel: "prefetch", as: "style" }
          : { ...e7, rel: "prefetch" },
      ),
  );
}
function nv(e6, t2, n2, r2, o2, a2) {
  let l2 = (e7, t3) => !n2[t3] || e7.route.id !== n2[t3].route.id,
    i2 = (e7, t3) => {
      var r3;
      return (
        n2[t3].pathname !== e7.pathname ||
        (((r3 = n2[t3].route.path) == null ? void 0 : r3.endsWith("*")) &&
          n2[t3].params["*"] !== e7.params["*"])
      );
    };
  return a2 === "assets"
    ? t2.filter((e7, t3) => l2(e7, t3) || i2(e7, t3))
    : a2 === "data"
      ? t2.filter((t3, a3) => {
          var s2;
          let u2 = r2.routes[t3.route.id];
          if (!u2 || !u2.hasLoader) return !1;
          if (l2(t3, a3) || i2(t3, a3)) return !0;
          if (t3.route.shouldRevalidate) {
            let r3 = t3.route.shouldRevalidate({
              currentUrl: new URL(o2.pathname + o2.search + o2.hash, window.origin),
              currentParams: ((s2 = n2[0]) == null ? void 0 : s2.params) || {},
              nextUrl: new URL(e6, window.origin),
              nextParams: t3.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof r3 == "boolean") return r3;
          }
          return !0;
        })
      : [];
}
function rv(e6, t2, { includeHydrateFallback: n2 } = {}) {
  return (
    (r2 = e6
      .map((e7) => {
        let r3 = t2.routes[e7.route.id];
        if (!r3) return [];
        let o2 = [r3.module];
        return (
          r3.clientActionModule && (o2 = o2.concat(r3.clientActionModule)),
          r3.clientLoaderModule && (o2 = o2.concat(r3.clientLoaderModule)),
          n2 && r3.hydrateFallbackModule && (o2 = o2.concat(r3.hydrateFallbackModule)),
          r3.imports && (o2 = o2.concat(r3.imports)),
          o2
        );
      })
      .flat(1)),
    [...new Set(r2)]
  );
  var r2;
}
function ov() {
  let e6 = r.useContext(hg);
  return Jg(e6, "You must render this element inside a <DataRouterContext.Provider> element"), e6;
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
var av = r.createContext(void 0);
function lv() {
  let e6 = r.useContext(av);
  return Jg(e6, "You must render this element inside a <HydratedRouter> element"), e6;
}
function iv(e6, t2) {
  return (n2) => {
    e6 && e6(n2), n2.defaultPrevented || t2(n2);
  };
}
function sv({ page: e6, ...t2 }) {
  let n2 = r.useContext(gg),
    { nonce: o2 } = lv(),
    { router: a2 } = ov(),
    l2 = r.useMemo(() => $m(a2.routes, e6, a2.basename), [a2.routes, e6, a2.basename]);
  return l2
    ? (t2.nonce == null && o2 && (t2 = { ...t2, nonce: o2 }),
      n2
        ? r.createElement(uv, { page: e6, matches: l2, ...t2 })
        : r.createElement(cv, { page: e6, matches: l2, ...t2 }))
    : null;
}
function uv({ page: e6, matches: t2, ...n2 }) {
  let o2 = kg(),
    { future: a2 } = lv(),
    { basename: l2 } = ov(),
    i2 = r.useMemo(() => {
      if (e6 === o2.pathname + o2.search + o2.hash) return [];
      let n3 = Zg(e6, l2, a2.v8_trailingSlashAwareDataRequests, "rsc"),
        r2 = !1,
        i3 = [];
      for (let e7 of t2)
        typeof e7.route.shouldRevalidate == "function" ? (r2 = !0) : i3.push(e7.route.id);
      return (
        r2 && i3.length > 0 && n3.searchParams.set("_routes", i3.join(",")),
        [n3.pathname + n3.search]
      );
    }, [l2, a2.v8_trailingSlashAwareDataRequests, e6, o2, t2]);
  return r.createElement(
    r.Fragment,
    null,
    i2.map((e7) =>
      r.createElement("link", { key: e7, rel: "prefetch", as: "fetch", href: e7, ...n2 }),
    ),
  );
}
function cv({ page: e6, matches: t2, ...n2 }) {
  let o2 = kg(),
    { future: a2, manifest: l2, routeModules: i2 } = lv(),
    { basename: s2 } = ov(),
    { loaderData: u2, matches: c2 } = (function () {
      let e7 = r.useContext(mg);
      return (
        Jg(e7, "You must render this element inside a <DataRouterStateContext.Provider> element"),
        e7
      );
    })(),
    d2 = r.useMemo(() => nv(e6, t2, c2, l2, o2, "data"), [e6, t2, c2, l2, o2]),
    f2 = r.useMemo(() => nv(e6, t2, c2, l2, o2, "assets"), [e6, t2, c2, l2, o2]),
    p2 = r.useMemo(() => {
      if (e6 === o2.pathname + o2.search + o2.hash) return [];
      let n3 = new Set(),
        r2 = !1;
      if (
        (t2.forEach((e7) => {
          var t3;
          let o3 = l2.routes[e7.route.id];
          o3 &&
            o3.hasLoader &&
            ((!d2.some((t4) => t4.route.id === e7.route.id) &&
              e7.route.id in u2 &&
              (t3 = i2[e7.route.id]) != null &&
              t3.shouldRevalidate) ||
            o3.hasClientLoader
              ? (r2 = !0)
              : n3.add(e7.route.id));
        }),
        n3.size === 0)
      )
        return [];
      let c3 = Zg(e6, s2, a2.v8_trailingSlashAwareDataRequests, "data");
      return (
        r2 &&
          n3.size > 0 &&
          c3.searchParams.set(
            "_routes",
            t2
              .filter((e7) => n3.has(e7.route.id))
              .map((e7) => e7.route.id)
              .join(","),
          ),
        [c3.pathname + c3.search]
      );
    }, [s2, a2.v8_trailingSlashAwareDataRequests, u2, o2, l2, d2, t2, e6, i2]),
    h2 = r.useMemo(() => rv(f2, l2), [f2, l2]),
    m2 = (function (e7) {
      let { manifest: t3, routeModules: n3 } = lv(),
        [o3, a3] = r.useState([]);
      return (
        r.useEffect(() => {
          let r2 = !1;
          return (
            tv(e7, t3, n3).then((e8) => {
              r2 || a3(e8);
            }),
            () => {
              r2 = !0;
            }
          );
        }, [e7, t3, n3]),
        o3
      );
    })(f2);
  return r.createElement(
    r.Fragment,
    null,
    p2.map((e7) =>
      r.createElement("link", { key: e7, rel: "prefetch", as: "fetch", href: e7, ...n2 }),
    ),
    h2.map((e7) => r.createElement("link", { key: e7, rel: "modulepreload", href: e7, ...n2 })),
    m2.map(({ key: e7, link: t3 }) =>
      r.createElement("link", {
        key: e7,
        nonce: n2.nonce,
        ...t3,
        crossOrigin: t3.crossOrigin ?? n2.crossOrigin,
      }),
    ),
  );
}
function dv(...e6) {
  return (t2) => {
    e6.forEach((e7) => {
      typeof e7 == "function" ? e7(t2) : e7 != null && (e7.current = t2);
    });
  };
}
av.displayName = "FrameworkContext";
var fv =
  typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0;
try {
  fv && (window.__reactRouterVersion = "7.18.4");
} catch {}
function pv({ basename: e6, children: t2, useTransitions: n2, window: o2 }) {
  let a2 = r.useRef();
  a2.current == null && (a2.current = km({ window: o2, v5Compat: !0 }));
  let l2 = a2.current,
    [i2, s2] = r.useState({ action: l2.action, location: l2.location }),
    u2 = r.useCallback(
      (e7) => {
        n2 === !1 ? s2(e7) : r.startTransition(() => s2(e7));
      },
      [n2],
    );
  return (
    r.useLayoutEffect(() => l2.listen(u2), [l2, u2]),
    r.createElement(Hg, {
      basename: e6,
      children: t2,
      location: i2.location,
      navigationType: i2.action,
      navigator: l2,
      useTransitions: n2,
    })
  );
}
var hv = r.forwardRef(function (
  {
    onClick: e6,
    discover: t2 = "render",
    prefetch: n2 = "none",
    relative: o2,
    reloadDocument: a2,
    replace: l2,
    mask: i2,
    state: s2,
    target: u2,
    to: c2,
    preventScrollReset: d2,
    viewTransition: f2,
    defaultShouldRevalidate: p2,
    ...h2
  },
  m2,
) {
  let { basename: g2, navigator: v2, useTransitions: y2 } = r.useContext(yg),
    b2 = typeof c2 == "string" && wm.test(c2),
    w2 = lg(c2, g2),
    E2 = (function (e7, { relative: t3 } = {}) {
      Cm(xg(), "useHref() may be used only in the context of a <Router> component.");
      let { basename: n3, navigator: o3 } = r.useContext(yg),
        { hash: a3, pathname: l3, search: i3 } = Og(e7, { relative: t3 }),
        s3 = l3;
      return (
        n3 !== "/" && (s3 = l3 === "/" ? n3 : Jm([n3, l3])),
        o3.createHref({ pathname: s3, search: i3, hash: a3 })
      );
    })((c2 = w2.to), { relative: o2 }),
    S2 = kg(),
    x2 = null;
  if (i2) {
    let e7 = Ym(i2, [], S2.mask ? S2.mask.pathname : "/", !0);
    g2 !== "/" && (e7.pathname = e7.pathname === "/" ? g2 : Jm([g2, e7.pathname])),
      (x2 = v2.createHref(e7));
  }
  let [k2, C2, _2] = (function (e7, t3) {
      let n3 = r.useContext(av),
        [o3, a3] = r.useState(!1),
        [l3, i3] = r.useState(!1),
        { onFocus: s3, onBlur: u3, onMouseEnter: c3, onMouseLeave: d3, onTouchStart: f3 } = t3,
        p3 = r.useRef(null);
      r.useEffect(() => {
        if ((e7 === "render" && i3(!0), e7 === "viewport")) {
          let e8 = new IntersectionObserver(
            (e9) => {
              e9.forEach((e10) => {
                i3(e10.isIntersecting);
              });
            },
            { threshold: 0.5 },
          );
          return (
            p3.current && e8.observe(p3.current),
            () => {
              e8.disconnect();
            }
          );
        }
      }, [e7]),
        r.useEffect(() => {
          if (o3) {
            let e8 = setTimeout(() => {
              i3(!0);
            }, 100);
            return () => {
              clearTimeout(e8);
            };
          }
        }, [o3]);
      let h3 = () => {
          a3(!0);
        },
        m3 = () => {
          a3(!1), i3(!1);
        };
      return n3
        ? e7 !== "intent"
          ? [l3, p3, {}]
          : [
              l3,
              p3,
              {
                onFocus: iv(s3, h3),
                onBlur: iv(u3, m3),
                onMouseEnter: iv(c3, h3),
                onMouseLeave: iv(d3, m3),
                onTouchStart: iv(f3, h3),
              },
            ]
        : [!1, p3, {}];
    })(n2, h2),
    P2 = (function (
      e7,
      {
        target: t3,
        replace: n3,
        mask: o3,
        state: a3,
        preventScrollReset: l3,
        relative: i3,
        viewTransition: s3,
        defaultShouldRevalidate: u3,
        useTransitions: c3,
      } = {},
    ) {
      let d3 = Pg(),
        f3 = kg(),
        p3 = Og(e7, { relative: i3 });
      return r.useCallback(
        (h3) => {
          if (
            (function (e8, t4) {
              return !(
                e8.button !== 0 ||
                (t4 && t4 !== "_self") ||
                (function (e9) {
                  return !!(e9.metaKey || e9.altKey || e9.ctrlKey || e9.shiftKey);
                })(e8)
              );
            })(h3, t3)
          ) {
            h3.preventDefault();
            let t4 = n3 !== void 0 ? n3 : Tm(f3) === Tm(p3),
              m3 = () =>
                d3(e7, {
                  replace: t4,
                  mask: o3,
                  state: a3,
                  preventScrollReset: l3,
                  relative: i3,
                  viewTransition: s3,
                  defaultShouldRevalidate: u3,
                });
            c3 ? r.startTransition(() => m3()) : m3();
          }
        },
        [f3, d3, p3, n3, o3, a3, t3, e7, l3, i3, s3, u3, c3],
      );
    })(c2, {
      replace: l2,
      mask: i2,
      state: s2,
      target: u2,
      preventScrollReset: d2,
      relative: o2,
      viewTransition: f2,
      defaultShouldRevalidate: p2,
      useTransitions: y2,
    }),
    O2 = !(w2.isExternal || a2),
    T2 = r.createElement("a", {
      ...h2,
      ..._2,
      href: (O2 ? x2 : void 0) || w2.absoluteURL || E2,
      onClick: O2
        ? function (t3) {
            e6 && e6(t3), t3.defaultPrevented || P2(t3);
          }
        : e6,
      ref: dv(m2, C2),
      target: u2,
      "data-discover": b2 || t2 !== "render" ? void 0 : "true",
    });
  return k2 && !b2 ? r.createElement(r.Fragment, null, T2, r.createElement(sv, { page: E2 })) : T2;
});
(hv.displayName = "Link"),
  (r.forwardRef(function (
    {
      "aria-current": e6 = "page",
      caseSensitive: t2 = !1,
      className: n2 = "",
      end: o2 = !1,
      style: a2,
      to: l2,
      viewTransition: i2,
      children: s2,
      ...u2
    },
    c2,
  ) {
    let d2 = Og(l2, { relative: u2.relative }),
      f2 = kg(),
      p2 = r.useContext(mg),
      { navigator: h2, basename: m2 } = r.useContext(yg),
      g2 =
        p2 != null &&
        (function (e7, { relative: t3 } = {}) {
          let n3 = r.useContext(vg);
          Cm(
            n3 != null,
            "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?",
          );
          let { basename: o3 } = gv("useViewTransitionState"),
            a3 = Og(e7, { relative: t3 });
          if (!n3.isTransitioning) return !1;
          let l3 = qm(n3.currentLocation.pathname, o3) || n3.currentLocation.pathname,
            i3 = qm(n3.nextLocation.pathname, o3) || n3.nextLocation.pathname;
          return Bm(a3.pathname, i3) != null || Bm(a3.pathname, l3) != null;
        })(d2) &&
        i2 === !0,
      v2 = h2.encodeLocation ? h2.encodeLocation(d2).pathname : d2.pathname,
      y2 = f2.pathname,
      b2 = p2 && p2.navigation && p2.navigation.location ? p2.navigation.location.pathname : null;
    t2 || ((y2 = y2.toLowerCase()), (b2 = b2 ? b2.toLowerCase() : null), (v2 = v2.toLowerCase())),
      b2 && m2 && (b2 = qm(b2, m2) || b2);
    const w2 = v2 !== "/" && v2.endsWith("/") ? v2.length - 1 : v2.length;
    let E2,
      S2 = y2 === v2 || (!o2 && y2.startsWith(v2) && y2.charAt(w2) === "/"),
      x2 = b2 != null && (b2 === v2 || (!o2 && b2.startsWith(v2) && b2.charAt(v2.length) === "/")),
      k2 = { isActive: S2, isPending: x2, isTransitioning: g2 },
      C2 = S2 ? e6 : void 0;
    E2 =
      typeof n2 == "function"
        ? n2(k2)
        : [n2, S2 ? "active" : null, x2 ? "pending" : null, g2 ? "transitioning" : null]
            .filter(Boolean)
            .join(" ");
    let _2 = typeof a2 == "function" ? a2(k2) : a2;
    return r.createElement(
      hv,
      { ...u2, "aria-current": C2, className: E2, ref: c2, style: _2, to: l2, viewTransition: i2 },
      typeof s2 == "function" ? s2(k2) : s2,
    );
  }).displayName = "NavLink");
var mv = r.forwardRef(
  (
    {
      discover: e6 = "render",
      fetcherKey: t2,
      navigate: n2,
      reloadDocument: o2,
      replace: a2,
      state: l2,
      method: i2 = Ug,
      action: s2,
      onSubmit: u2,
      relative: c2,
      preventScrollReset: d2,
      viewTransition: f2,
      defaultShouldRevalidate: p2,
      ...h2
    },
    m2,
  ) => {
    let { useTransitions: g2 } = r.useContext(yg),
      v2 = (function () {
        let { router: e7 } = gv("useSubmit"),
          { basename: t3 } = r.useContext(yg),
          n3 = Fg("useRouteId"),
          o3 = e7.fetch,
          a3 = e7.navigate;
        return r.useCallback(
          async (e8, r2 = {}) => {
            let { action: l3, method: i3, encType: s3, formData: u3, body: c3 } = Qg(e8, t3);
            if (r2.navigate === !1) {
              let e9 = r2.fetcherKey || bv();
              await o3(e9, n3, r2.action || l3, {
                defaultShouldRevalidate: r2.defaultShouldRevalidate,
                preventScrollReset: r2.preventScrollReset,
                formData: u3,
                body: c3,
                formMethod: r2.method || i3,
                formEncType: r2.encType || s3,
                flushSync: r2.flushSync,
              });
            } else
              await a3(r2.action || l3, {
                defaultShouldRevalidate: r2.defaultShouldRevalidate,
                preventScrollReset: r2.preventScrollReset,
                formData: u3,
                body: c3,
                formMethod: r2.method || i3,
                formEncType: r2.encType || s3,
                replace: r2.replace,
                state: r2.state,
                fromRouteId: n3,
                flushSync: r2.flushSync,
                viewTransition: r2.viewTransition,
              });
          },
          [o3, a3, t3, n3],
        );
      })(),
      y2 = (function (e7, { relative: t3 } = {}) {
        let { basename: n3 } = r.useContext(yg),
          o3 = r.useContext(wg);
        Cm(o3, "useFormAction must be used inside a RouteContext");
        let [a3] = o3.matches.slice(-1),
          l3 = { ...Og(e7 || ".", { relative: t3 }) },
          i3 = kg();
        if (e7 == null) {
          l3.search = i3.search;
          let e8 = new URLSearchParams(l3.search),
            t4 = e8.getAll("index");
          if (t4.some((e9) => e9 === "")) {
            e8.delete("index"), t4.filter((e9) => e9).forEach((t5) => e8.append("index", t5));
            let n4 = e8.toString();
            l3.search = n4 ? `?${n4}` : "";
          }
        }
        return (
          (e7 && e7 !== ".") ||
            !a3.route.index ||
            (l3.search = l3.search ? l3.search.replace(/^\?/, "?index&") : "?index"),
          n3 !== "/" && (l3.pathname = l3.pathname === "/" ? n3 : Jm([n3, l3.pathname])),
          Tm(l3)
        );
      })(s2, { relative: c2 }),
      b2 = i2.toLowerCase() === "get" ? "get" : "post",
      w2 = typeof s2 == "string" && wm.test(s2);
    return r.createElement("form", {
      ref: m2,
      method: b2,
      action: y2,
      onSubmit: o2
        ? u2
        : (e7) => {
            if ((u2 && u2(e7), e7.defaultPrevented)) return;
            e7.preventDefault();
            let o3 = e7.nativeEvent.submitter,
              s3 = o3?.getAttribute("formmethod") || i2,
              h3 = () =>
                v2(o3 || e7.currentTarget, {
                  fetcherKey: t2,
                  method: s3,
                  navigate: n2,
                  replace: a2,
                  state: l2,
                  relative: c2,
                  preventScrollReset: d2,
                  viewTransition: f2,
                  defaultShouldRevalidate: p2,
                });
            g2 && n2 !== !1 ? r.startTransition(() => h3()) : h3();
          },
      ...h2,
      "data-discover": w2 || e6 !== "render" ? void 0 : "true",
    });
  },
);
function gv(e6) {
  let t2 = r.useContext(hg);
  return (
    Cm(
      t2,
      (function (e7) {
        return `${e7} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
      })(e6),
    ),
    t2
  );
}
function vv(e6) {
  _m(
    typeof URLSearchParams < "u",
    "You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params.",
  );
  let t2 = r.useRef(Xg(e6)),
    n2 = r.useRef(!1),
    o2 = kg(),
    a2 = r.useMemo(
      () =>
        (function (e7, t3) {
          let n3 = Xg(e7);
          return (
            t3 &&
              t3.forEach((e8, r2) => {
                n3.has(r2) ||
                  t3.getAll(r2).forEach((e9) => {
                    n3.append(r2, e9);
                  });
              }),
            n3
          );
        })(o2.search, n2.current ? null : t2.current),
      [o2.search],
    ),
    l2 = Pg(),
    i2 = r.useCallback(
      (e7, t3) => {
        const r2 = Xg(typeof e7 == "function" ? e7(new URLSearchParams(a2)) : e7);
        (n2.current = !0), l2("?" + r2, t3);
      },
      [l2, a2],
    );
  return [a2, i2];
}
mv.displayName = "Form";
var yv = 0,
  bv = () => `__${String(++yv)}__`;
const wv = (e6) => {
  const t2 = r.useRef(e6);
  return (
    (t2.current = e6),
    r.useCallback((...e7) => {
      var n2;
      return (n2 = t2.current) == null ? void 0 : n2.call(t2, ...e7);
    }, [])
  );
};
function Ev() {
  return !(typeof window > "u" || !window.document || !window.document.createElement);
}
const Sv = Ev() ? r.useLayoutEffect : r.useEffect,
  xv = (e6, t2) => {
    const n2 = r.useRef(!0);
    Sv(() => e6(n2.current), t2),
      Sv(
        () => (
          (n2.current = !1),
          () => {
            n2.current = !0;
          }
        ),
        [],
      );
  },
  kv = (e6, t2) => {
    xv((t3) => {
      if (!t3) return e6();
    }, t2);
  },
  Cv = (e6) => {
    const t2 = r.useRef(!1),
      [n2, o2] = r.useState(e6);
    return (
      r.useEffect(
        () => (
          (t2.current = !1),
          () => {
            t2.current = !0;
          }
        ),
        [],
      ),
      [
        n2,
        function (e7, n3) {
          (n3 && t2.current) || o2(e7);
        },
      ]
    );
  };
function _v(e6, t2) {
  const [n2, o2] = r.useState(e6),
    a2 = t2 !== void 0 ? t2 : n2;
  return (
    xv(
      (e7) => {
        e7 || o2(t2);
      },
      [t2],
    ),
    [a2, o2]
  );
}
let Pv = (e6) => +setTimeout(e6, 16),
  Ov = (e6) => clearTimeout(e6);
typeof window < "u" &&
  "requestAnimationFrame" in window &&
  ((Pv = (e6) => window.requestAnimationFrame(e6)), (Ov = (e6) => window.cancelAnimationFrame(e6)));
let Tv = 0;
const Nv = new Map();
function $v(e6) {
  Nv.delete(e6);
}
const Mv = (e6, t2 = 1) => {
  Tv += 1;
  const n2 = Tv;
  return (
    (function t3(r2) {
      if (r2 === 0) $v(n2), e6();
      else {
        const e7 = Pv(() => {
          t3(r2 - 1);
        });
        Nv.set(n2, e7);
      }
    })(t2),
    n2
  );
};
Mv.cancel = (e6) => {
  const t2 = Nv.get(e6);
  return $v(e6), Ov(t2);
};
let Rv = 0;
function Lv(e6, t2) {
  return `${e6}-${String(t2).replace(/[^a-zA-Z0-9_.:-]/g, "-")}`;
}
const Iv = { ...a }.useId,
  Av = Iv
    ? function (e6) {
        const t2 = Iv();
        return e6 || t2;
      }
    : function (e6) {
        const [t2, n2] = r.useState("ssr-id");
        return (
          r.useEffect(() => {
            const e7 = Rv;
            (Rv += 1), n2(`rc_unique_${e7}`);
          }, []),
          e6 || t2
        );
      };
function Fv(e6, t2, n2) {
  const o2 = r.useRef({});
  return (
    ("value" in o2.current && !n2(o2.current.condition, t2)) ||
      ((o2.current.value = e6()), (o2.current.condition = t2)),
    o2.current.value
  );
}
var zv = { exports: {} },
  jv = {},
  Dv = Symbol.for("react.transitional.element"),
  Hv = Symbol.for("react.portal"),
  Vv = Symbol.for("react.fragment"),
  Bv = Symbol.for("react.strict_mode"),
  Uv = Symbol.for("react.profiler"),
  Wv = Symbol.for("react.consumer"),
  qv = Symbol.for("react.context"),
  Xv = Symbol.for("react.forward_ref"),
  Kv = Symbol.for("react.suspense"),
  Gv = Symbol.for("react.suspense_list"),
  Yv = Symbol.for("react.memo"),
  Qv = Symbol.for("react.lazy"),
  Jv = Symbol.for("react.view_transition"),
  Zv = Symbol.for("react.client.reference");
function ey(e6) {
  if (typeof e6 == "object" && e6 !== null) {
    var t2 = e6.$$typeof;
    switch (t2) {
      case Dv:
        switch ((e6 = e6.type)) {
          case Vv:
          case Uv:
          case Bv:
          case Kv:
          case Gv:
          case Jv:
            return e6;
          default:
            switch ((e6 = e6 && e6.$$typeof)) {
              case qv:
              case Xv:
              case Qv:
              case Yv:
              case Wv:
                return e6;
              default:
                return t2;
            }
        }
      case Hv:
        return t2;
    }
  }
}
(jv.ContextConsumer = Wv),
  (jv.ContextProvider = qv),
  (jv.Element = Dv),
  (jv.ForwardRef = Xv),
  (jv.Fragment = Vv),
  (jv.Lazy = Qv),
  (jv.Memo = Yv),
  (jv.Portal = Hv),
  (jv.Profiler = Uv),
  (jv.StrictMode = Bv),
  (jv.Suspense = Kv),
  (jv.SuspenseList = Gv),
  (jv.isContextConsumer = function (e6) {
    return ey(e6) === Wv;
  }),
  (jv.isContextProvider = function (e6) {
    return ey(e6) === qv;
  }),
  (jv.isElement = function (e6) {
    return typeof e6 == "object" && e6 !== null && e6.$$typeof === Dv;
  }),
  (jv.isForwardRef = function (e6) {
    return ey(e6) === Xv;
  }),
  (jv.isFragment = function (e6) {
    return ey(e6) === Vv;
  }),
  (jv.isLazy = function (e6) {
    return ey(e6) === Qv;
  }),
  (jv.isMemo = function (e6) {
    return ey(e6) === Yv;
  }),
  (jv.isPortal = function (e6) {
    return ey(e6) === Hv;
  }),
  (jv.isProfiler = function (e6) {
    return ey(e6) === Uv;
  }),
  (jv.isStrictMode = function (e6) {
    return ey(e6) === Bv;
  }),
  (jv.isSuspense = function (e6) {
    return ey(e6) === Kv;
  }),
  (jv.isSuspenseList = function (e6) {
    return ey(e6) === Gv;
  }),
  (jv.isValidElementType = function (e6) {
    return (
      typeof e6 == "string" ||
      typeof e6 == "function" ||
      e6 === Vv ||
      e6 === Uv ||
      e6 === Bv ||
      e6 === Kv ||
      e6 === Gv ||
      e6 === Jv ||
      (typeof e6 == "object" &&
        e6 !== null &&
        (e6.$$typeof === Qv ||
          e6.$$typeof === Yv ||
          e6.$$typeof === qv ||
          e6.$$typeof === Wv ||
          e6.$$typeof === Xv ||
          e6.$$typeof === Zv ||
          e6.getModuleId !== void 0))
    );
  }),
  (jv.typeOf = ey),
  (zv.exports = jv);
var ty = zv.exports;
const ny = Symbol.for("react.element"),
  ry = Symbol.for("react.transitional.element"),
  oy = Symbol.for("react.fragment");
function ay(e6) {
  return (
    e6 && typeof e6 == "object" && (e6.$$typeof === ny || e6.$$typeof === ry) && e6.type === oy
  );
}
const ly = Number((e = r.version) == null ? void 0 : e.split(".")[0]),
  iy = (e6, t2) => {
    typeof e6 == "function"
      ? e6(t2)
      : typeof e6 == "object" && e6 && "current" in e6 && (e6.current = t2);
  },
  sy = (...e6) => {
    const t2 = e6.filter(Boolean);
    return t2.length <= 1
      ? t2[0]
      : (t3) => {
          e6.forEach((e7) => {
            iy(e7, t3);
          });
        };
  },
  uy = (...e6) =>
    Fv(
      () => sy(...e6),
      e6,
      (e7, t2) => e7.length !== t2.length || e7.every((e8, n2) => e8 !== t2[n2]),
    ),
  cy = (e6) => {
    var t2, n2;
    if (!e6) return !1;
    if (dy(e6) && ly >= 19) return !0;
    const r2 = ty.isMemo(e6) ? e6.type.type : e6.type;
    return (
      !(
        typeof r2 == "function" &&
        !((t2 = r2.prototype) != null && t2.render) &&
        r2.$$typeof !== ty.ForwardRef
      ) &&
      !(
        typeof e6 == "function" &&
        !((n2 = e6.prototype) != null && n2.render) &&
        e6.$$typeof !== ty.ForwardRef
      )
    );
  };
function dy(e6) {
  return r.isValidElement(e6) && !ay(e6);
}
const fy = (e6) => dy(e6) && cy(e6),
  py = (e6) => {
    if (e6 && dy(e6)) {
      const t2 = e6;
      return t2.props.propertyIsEnumerable("ref") ? t2.props.ref : t2.ref;
    }
    return null;
  };
function hy(e6, t2) {
  if (!e6) return !1;
  if (e6.contains) return e6.contains(t2);
  let n2 = t2;
  for (; n2; ) {
    if (n2 === e6) return !0;
    n2 = n2.parentNode;
  }
  return !1;
}
const my = "data-rc-order",
  gy = "data-rc-priority",
  vy = new Map();
function yy({ mark: e6 } = {}) {
  return e6 ? (e6.startsWith("data-") ? e6 : `data-${e6}`) : "rc-util-key";
}
function by(e6) {
  return e6.attachTo ? e6.attachTo : document.querySelector("head") || document.body;
}
function wy(e6) {
  return e6 ? Array.from((vy.get(e6) || e6).children).filter((e7) => e7.tagName === "STYLE") : [];
}
function Ey(e6, t2 = {}) {
  if (!Ev()) return null;
  const { csp: n2, prepend: r2, priority: o2 = 0 } = t2,
    a2 = (function (e7) {
      return e7 === "queue" ? "prependQueue" : e7 ? "prepend" : "append";
    })(r2),
    l2 = a2 === "prependQueue",
    i2 = document.createElement("style");
  i2.setAttribute(my, a2),
    l2 && o2 && i2.setAttribute(gy, `${o2}`),
    n2?.nonce && (i2.nonce = n2?.nonce),
    (i2.innerHTML = e6);
  const s2 = by(t2);
  if (!s2) return null;
  const { firstChild: u2 } = s2;
  if (r2) {
    if (l2) {
      const e7 = (t2.styles || wy(s2)).filter((e8) => {
        if (!["prepend", "prependQueue"].includes(e8.getAttribute(my))) return !1;
        const t3 = Number(e8.getAttribute(gy) || 0);
        return o2 >= t3;
      });
      if (e7.length) return s2.insertBefore(i2, e7[e7.length - 1].nextSibling), i2;
    }
    s2.insertBefore(i2, u2);
  } else s2.appendChild(i2);
  return i2;
}
function Sy(e6, t2 = {}) {
  let { styles: n2 } = t2;
  return n2 || (n2 = wy(by(t2))), n2.find((n3) => n3.getAttribute(yy(t2)) === e6);
}
function xy(e6, t2 = {}) {
  const n2 = Sy(e6, t2);
  if (n2) {
    const e7 = by(t2);
    e7?.removeChild(n2);
  }
}
function ky(e6, t2, n2 = {}) {
  var r2, o2, a2;
  const l2 = by(n2);
  if (!l2) return null;
  const i2 = wy(l2),
    s2 = { ...n2, styles: i2 };
  (function (e7, t3) {
    const n3 = vy.get(e7);
    if (!n3 || !hy(document, n3)) {
      const n4 = Ey("", t3);
      if (!n4) return;
      const { parentNode: r3 } = n4;
      vy.set(e7, r3), e7.removeChild(n4);
    }
  })(l2, s2);
  const u2 = Sy(t2, s2);
  if (u2)
    return (
      (r2 = s2.csp) != null &&
        r2.nonce &&
        u2.nonce !== ((o2 = s2.csp) == null ? void 0 : o2.nonce) &&
        (u2.nonce = (a2 = s2.csp) == null ? void 0 : a2.nonce),
      u2.innerHTML !== e6 && (u2.innerHTML = e6),
      u2
    );
  const c2 = Ey(e6, s2);
  return c2 ? (c2.setAttribute(yy(s2), t2), c2) : null;
}
function Cy(e6) {
  return e6 instanceof HTMLElement || e6 instanceof SVGElement;
}
function _y(e6) {
  return e6 && typeof e6 == "object" && Cy(e6.nativeElement)
    ? e6.nativeElement
    : Cy(e6)
      ? e6
      : null;
}
const Py = (e6) => {
  if (!e6) return !1;
  if (e6 instanceof Element) {
    if (e6.offsetParent) return !0;
    if (e6.getBBox) {
      const { width: t2, height: n2 } = e6.getBBox();
      if (t2 || n2) return !0;
    }
    if (e6.getBoundingClientRect) {
      const { width: t2, height: n2 } = e6.getBoundingClientRect();
      if (t2 || n2) return !0;
    }
  }
  return !1;
};
function Oy(e6) {
  var t2;
  return (t2 = e6?.getRootNode) == null ? void 0 : t2.call(e6);
}
function Ty(e6) {
  return (function (e7) {
    return Oy(e7) instanceof ShadowRoot;
  })(e6)
    ? Oy(e6)
    : null;
}
const Ny = {
  MAC_ENTER: 3,
  BACKSPACE: 8,
  TAB: 9,
  NUM_CENTER: 12,
  ENTER: 13,
  SHIFT: 16,
  CTRL: 17,
  ALT: 18,
  PAUSE: 19,
  CAPS_LOCK: 20,
  ESC: 27,
  SPACE: 32,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  END: 35,
  HOME: 36,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  PRINT_SCREEN: 44,
  INSERT: 45,
  DELETE: 46,
  ZERO: 48,
  ONE: 49,
  TWO: 50,
  THREE: 51,
  FOUR: 52,
  FIVE: 53,
  SIX: 54,
  SEVEN: 55,
  EIGHT: 56,
  NINE: 57,
  QUESTION_MARK: 63,
  A: 65,
  B: 66,
  C: 67,
  D: 68,
  E: 69,
  F: 70,
  G: 71,
  H: 72,
  I: 73,
  J: 74,
  K: 75,
  L: 76,
  M: 77,
  N: 78,
  O: 79,
  P: 80,
  Q: 81,
  R: 82,
  S: 83,
  T: 84,
  U: 85,
  V: 86,
  W: 87,
  X: 88,
  Y: 89,
  Z: 90,
  META: 91,
  WIN_KEY_RIGHT: 92,
  CONTEXT_MENU: 93,
  NUM_ZERO: 96,
  NUM_ONE: 97,
  NUM_TWO: 98,
  NUM_THREE: 99,
  NUM_FOUR: 100,
  NUM_FIVE: 101,
  NUM_SIX: 102,
  NUM_SEVEN: 103,
  NUM_EIGHT: 104,
  NUM_NINE: 105,
  NUM_MULTIPLY: 106,
  NUM_PLUS: 107,
  NUM_MINUS: 109,
  NUM_PERIOD: 110,
  NUM_DIVISION: 111,
  F1: 112,
  F2: 113,
  F3: 114,
  F4: 115,
  F5: 116,
  F6: 117,
  F7: 118,
  F8: 119,
  F9: 120,
  F10: 121,
  F11: 122,
  F12: 123,
  NUMLOCK: 144,
  SEMICOLON: 186,
  DASH: 189,
  EQUALS: 187,
  COMMA: 188,
  PERIOD: 190,
  SLASH: 191,
  APOSTROPHE: 192,
  SINGLE_QUOTE: 222,
  OPEN_SQUARE_BRACKET: 219,
  BACKSLASH: 220,
  CLOSE_SQUARE_BRACKET: 221,
  WIN_KEY: 224,
  MAC_FF_META: 224,
  WIN_IME: 229,
  isTextModifyingKeyEvent: function (e6) {
    const { keyCode: t2 } = e6;
    if ((e6.altKey && !e6.ctrlKey) || e6.metaKey || (t2 >= Ny.F1 && t2 <= Ny.F12)) return !1;
    switch (t2) {
      case Ny.ALT:
      case Ny.CAPS_LOCK:
      case Ny.CONTEXT_MENU:
      case Ny.CTRL:
      case Ny.DOWN:
      case Ny.END:
      case Ny.ESC:
      case Ny.HOME:
      case Ny.INSERT:
      case Ny.LEFT:
      case Ny.MAC_FF_META:
      case Ny.META:
      case Ny.NUMLOCK:
      case Ny.NUM_CENTER:
      case Ny.PAGE_DOWN:
      case Ny.PAGE_UP:
      case Ny.PAUSE:
      case Ny.PRINT_SCREEN:
      case Ny.RIGHT:
      case Ny.SHIFT:
      case Ny.UP:
      case Ny.WIN_KEY:
      case Ny.WIN_KEY_RIGHT:
        return !1;
      default:
        return !0;
    }
  },
  isCharacterKey: function (e6) {
    if (
      (e6 >= Ny.ZERO && e6 <= Ny.NINE) ||
      (e6 >= Ny.NUM_ZERO && e6 <= Ny.NUM_MULTIPLY) ||
      (e6 >= Ny.A && e6 <= Ny.Z) ||
      (window.navigator.userAgent.indexOf("WebKit") !== -1 && e6 === 0)
    )
      return !0;
    switch (e6) {
      case Ny.SPACE:
      case Ny.QUESTION_MARK:
      case Ny.NUM_PLUS:
      case Ny.NUM_MINUS:
      case Ny.NUM_PERIOD:
      case Ny.NUM_DIVISION:
      case Ny.SEMICOLON:
      case Ny.DASH:
      case Ny.EQUALS:
      case Ny.COMMA:
      case Ny.PERIOD:
      case Ny.SLASH:
      case Ny.APOSTROPHE:
      case Ny.SINGLE_QUOTE:
      case Ny.OPEN_SQUARE_BRACKET:
      case Ny.BACKSLASH:
      case Ny.CLOSE_SQUARE_BRACKET:
        return !0;
      default:
        return !1;
    }
  },
  isEditableTarget: function (e6) {
    const t2 = e6.target;
    if (!(t2 instanceof HTMLElement)) return !1;
    const n2 = t2.tagName;
    return !(n2 !== "INPUT" && n2 !== "TEXTAREA" && n2 !== "SELECT" && !t2.isContentEditable);
  },
};
let $y;
function My(e6) {
  const t2 = `rc-scrollbar-measure-${Math.random().toString(36).substring(7)}`,
    n2 = document.createElement("div");
  n2.id = t2;
  const r2 = n2.style;
  let o2, a2;
  if (
    ((r2.position = "absolute"),
    (r2.left = "0"),
    (r2.top = "0"),
    (r2.width = "100px"),
    (r2.height = "100px"),
    (r2.overflow = "scroll"),
    e6)
  ) {
    const n3 = getComputedStyle(e6);
    (r2.scrollbarColor = n3.scrollbarColor), (r2.scrollbarWidth = n3.scrollbarWidth);
    const l3 = getComputedStyle(e6, "::-webkit-scrollbar"),
      i3 = parseInt(l3.width, 10),
      s2 = parseInt(l3.height, 10);
    try {
      const e7 = i3 ? `width: ${l3.width};` : "";
      ky(
        `
#${t2}::-webkit-scrollbar {
${e7}
${s2 ? `height: ${l3.height};` : ""}
}`,
        t2,
      );
    } catch {
      (o2 = i3), (a2 = s2);
    }
  }
  document.body.appendChild(n2);
  const l2 = e6 && o2 && !Number.isNaN(o2) ? o2 : n2.offsetWidth - n2.clientWidth,
    i2 = e6 && a2 && !Number.isNaN(a2) ? a2 : n2.offsetHeight - n2.clientHeight;
  return document.body.removeChild(n2), xy(t2), { width: l2, height: i2 };
}
function Ry(e6) {
  return typeof document > "u" ? 0 : ((e6 || $y === void 0) && ($y = My()), $y.width);
}
function Ly(e6) {
  return typeof document < "u" && e6 && e6 instanceof Element ? My(e6) : { width: 0, height: 0 };
}
let Iy = {};
function Ay(e6, t2) {}
function Fy(e6, t2) {}
function zy(e6, t2, n2) {
  t2 || Iy[n2] || (e6(!1, n2), (Iy[n2] = !0));
}
function jy(e6, t2) {
  zy(Ay, e6, t2);
}
function Dy(e6, t2, n2 = !1) {
  const r2 = new Set();
  return (function e7(t3, o2, a2 = 1) {
    const l2 = r2.has(t3);
    if ((jy(!l2, "Warning: There may be circular references"), l2)) return !1;
    if (t3 === o2) return !0;
    if (n2 && a2 > 1) return !1;
    r2.add(t3);
    const i2 = a2 + 1;
    if (Array.isArray(t3)) {
      if (!Array.isArray(o2) || t3.length !== o2.length) return !1;
      for (let n3 = 0; n3 < t3.length; n3++) if (!e7(t3[n3], o2[n3], i2)) return !1;
      return !0;
    }
    if (t3 && o2 && typeof t3 == "object" && typeof o2 == "object") {
      const n3 = Object.keys(t3);
      return n3.length === Object.keys(o2).length && n3.every((n4) => e7(t3[n4], o2[n4], i2));
    }
    return !1;
  })(e6, t2);
}
function Hy(e6) {
  return e6 != null;
}
function Vy(e6) {
  return Hy(e6) && e6 !== !1 && e6 !== "";
}
(jy.preMessage = (e6) => {}),
  (jy.resetWarned = function () {
    Iy = {};
  }),
  (jy.noteOnce = function (e6, t2) {
    zy(Fy, e6, t2);
  });
var By = { exports: {} };
(By.exports = Xy), (By.exports.isMobile = Xy), (By.exports.default = Xy);
const Uy =
    /(android|bb\d+|meego).+mobile|armv7l|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|redmi|series[46]0|samsungbrowser.*mobile|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i,
  Wy = /CrOS/,
  qy = /android|ipad|playbook|silk/i;
function Xy(e6) {
  e6 || (e6 = {});
  let t2 = e6.ua;
  if (
    (t2 || typeof navigator > "u" || (t2 = navigator.userAgent),
    t2 &&
      t2.headers &&
      typeof t2.headers["user-agent"] == "string" &&
      (t2 = t2.headers["user-agent"]),
    typeof t2 != "string")
  )
    return !1;
  let n2 = (Uy.test(t2) && !Wy.test(t2)) || (!!e6.tablet && qy.test(t2));
  return (
    !n2 &&
      e6.tablet &&
      e6.featureDetect &&
      navigator &&
      navigator.maxTouchPoints > 1 &&
      t2.indexOf("Macintosh") !== -1 &&
      t2.indexOf("Safari") !== -1 &&
      (n2 = !0),
    n2
  );
}
const Ky = l(By.exports);
function Gy(e6, t2) {
  const n2 = Object.assign({}, e6);
  return (
    Array.isArray(t2) &&
      t2.forEach((e7) => {
        delete n2[e7];
      }),
    n2
  );
}
const Yy = `accept acceptCharset accessKey action allowFullScreen allowTransparency
    alt async autoComplete autoFocus autoPlay capture cellPadding cellSpacing challenge
    charSet checked classID className colSpan cols content contentEditable contextMenu
    controls coords crossOrigin data dateTime default defer dir disabled download draggable
    encType form formAction formEncType formMethod formNoValidate formTarget frameBorder
    headers height hidden high href hrefLang htmlFor httpEquiv icon id inputMode integrity
    is keyParams keyType kind label lang list loop low manifest marginHeight marginWidth max maxLength media
    mediaGroup method min minLength multiple muted name noValidate nonce open
    optimum pattern placeholder poster preload radioGroup readOnly rel required
    reversed role rowSpan rows sandbox scope scoped scrolling seamless selected
    shape size sizes span spellCheck src srcDoc srcLang srcSet start step style
    summary tabIndex target title type useMap value width wmode wrap onCopy onCut onPaste onCompositionEnd onCompositionStart onCompositionUpdate onKeyDown
    onKeyPress onKeyUp onFocus onBlur onChange onInput onSubmit onClick onContextMenu onDoubleClick
    onDrag onDragEnd onDragEnter onDragExit onDragLeave onDragOver onDragStart onDrop onMouseDown
    onMouseEnter onMouseLeave onMouseMove onMouseOut onMouseOver onMouseUp onSelect onTouchCancel
    onTouchEnd onTouchMove onTouchStart onScroll onWheel onAbort onCanPlay onCanPlayThrough
    onDurationChange onEmptied onEncrypted onEnded onError onLoadedData onLoadedMetadata
    onLoadStart onPause onPlay onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend onTimeUpdate onVolumeChange onWaiting onLoad
    onPointerDown onPointerMove onPointerUp onPointerCancel onPointerEnter onPointerLeave onPointerOver onPointerOut onGotPointerCapture onLostPointerCapture
    onAnimationStart onAnimationEnd onAnimationIteration
    onTransitionEnd onTransitionRun onTransitionStart onTransitionCancel
    onBeforeInput onReset onInvalid
    onAuxClick onToggle onBeforeToggle onCancel onClose onResize onScrollEnd`.split(/[\s\n]+/);
function Qy(e6, t2) {
  return e6.indexOf(t2) === 0;
}
function Jy(e6, t2 = !1) {
  let n2;
  n2 = t2 === !1 ? { aria: !0, data: !0, attr: !0 } : t2 === !0 ? { aria: !0 } : { ...t2 };
  const r2 = {};
  return (
    Object.keys(e6).forEach((t3) => {
      ((n2.aria && (t3 === "role" || Qy(t3, "aria-"))) ||
        (n2.data && Qy(t3, "data-")) ||
        (n2.attr && Yy.includes(t3))) &&
        (r2[t3] = e6[t3]);
    }),
    r2
  );
}
function Zy(e6, t2 = {}) {
  let n2 = [];
  return (
    i.Children.forEach(e6, (e7) => {
      (e7 != null || t2.keepEmpty) &&
        (Array.isArray(e7)
          ? (n2 = n2.concat(Zy(e7)))
          : ay(e7) && e7.props
            ? (n2 = n2.concat(Zy(e7.props.children, t2)))
            : n2.push(e7));
    }),
    n2
  );
}
function eb(e6, t2) {
  let n2 = e6;
  for (let r2 = 0; r2 < t2.length; r2 += 1) {
    if (n2 == null) return;
    n2 = n2[t2[r2]];
  }
  return n2;
}
function tb(e6, t2, n2, r2) {
  if (!t2.length) return n2;
  const [o2, ...a2] = t2;
  let l2;
  if (
    ((l2 = e6 || typeof o2 != "number" ? (Array.isArray(e6) ? [...e6] : { ...e6 }) : []),
    r2 && n2 === void 0 && a2.length === 1)
  ) {
    const e7 = l2[o2];
    if (e7 && typeof e7 == "object") {
      const t3 = Array.isArray(e7) ? [...e7] : { ...e7 };
      delete t3[a2[0]], (l2[o2] = t3);
    }
  } else l2[o2] = tb(l2[o2], a2, n2, r2);
  return l2;
}
function nb(e6, t2, n2, r2 = !1) {
  return t2.length && r2 && n2 === void 0 && !eb(e6, t2.slice(0, -1)) ? e6 : tb(e6, t2, n2, r2);
}
function rb(e6) {
  return Array.isArray(e6) ? [] : {};
}
const ob = typeof Reflect > "u" ? Object.keys : Reflect.ownKeys;
function ab(e6, t2 = {}) {
  const { prepareArray: n2 } = t2,
    r2 = n2 || (() => []);
  let o2 = rb(e6[0]);
  return (
    e6.forEach((e7) => {
      (function t3(n3, a2) {
        const l2 = new Set(a2),
          i2 = eb(e7, n3),
          s2 = Array.isArray(i2);
        if (
          s2 ||
          (typeof (u2 = i2) == "object" &&
            u2 !== null &&
            Object.getPrototypeOf(u2) === Object.prototype)
        ) {
          if (!l2.has(i2)) {
            l2.add(i2);
            const e8 = eb(o2, n3);
            s2
              ? (o2 = nb(o2, n3, r2(e8, i2)))
              : (e8 && typeof e8 == "object") || (o2 = nb(o2, n3, rb(i2))),
              ob(i2).forEach((e9) => {
                Object.getOwnPropertyDescriptor(i2, e9).enumerable && t3([...n3, e9], l2);
              });
          }
        } else o2 = nb(o2, n3, i2);
        var u2;
      })([]);
    }),
    o2
  );
}
function lb(...e6) {
  return ab(e6);
}
function ib() {}
const sb = r.createContext({}),
  ub = () => {
    const e6 = () => {};
    return (e6.deprecated = ib), e6;
  },
  cb = r.createContext(null),
  db = new Map();
function fb(e6) {
  e6.forEach((e7) => {
    var t2;
    const { target: n2 } = e7;
    (t2 = db.get(n2)) == null || t2.forEach((e8) => e8(n2));
  });
}
let pb;
function hb() {
  return pb || (pb = new ResizeObserver(fb)), pb;
}
function mb(e6, t2, n2, o2) {
  const a2 = r.useRef({ width: -1, height: -1, offsetWidth: -1, offsetHeight: -1 }),
    l2 = wv((e7) => {
      const { width: t3, height: r2 } = e7.getBoundingClientRect(),
        { offsetWidth: l3, offsetHeight: i3 } = e7,
        s3 = Math.floor(t3),
        u2 = Math.floor(r2);
      if (
        a2.current.width !== s3 ||
        a2.current.height !== u2 ||
        a2.current.offsetWidth !== l3 ||
        a2.current.offsetHeight !== i3
      ) {
        const c2 = { width: s3, height: u2, offsetWidth: l3, offsetHeight: i3 };
        a2.current = c2;
        const d2 = l3 === Math.round(t3) ? t3 : l3,
          f2 = i3 === Math.round(r2) ? r2 : i3,
          p2 = { ...c2, offsetWidth: d2, offsetHeight: f2 };
        o2?.(p2, e7),
          Promise.resolve().then(() => {
            n2?.(p2, e7);
          });
      }
    }),
    i2 = typeof t2 == "function",
    s2 = r.useRef(0);
  r.useEffect(() => {
    const n3 = i2 ? t2() : t2;
    var r2, o3;
    return (
      n3 && e6
        ? ((r2 = n3),
          (o3 = l2),
          db.has(r2) || (db.set(r2, new Set()), hb().observe(r2)),
          db.get(r2).add(o3))
        : e6 && i2 && (s2.current += 1),
      () => {
        n3 &&
          (function (e7, t3) {
            db.has(e7) &&
              (db.get(e7).delete(t3), db.get(e7).size || (hb().unobserve(e7), db.delete(e7)));
          })(n3, l2);
      }
    );
  }, [e6, i2 ? s2.current : t2]);
}
function gb(e6, t2) {
  const { children: n2, disabled: o2, onResize: a2, data: l2 } = e6,
    i2 = r.useRef(null),
    s2 = r.useContext(cb),
    u2 = typeof n2 == "function",
    c2 = u2 ? n2(i2) : n2,
    d2 = !u2 && r.isValidElement(c2) && cy(c2),
    f2 = d2 ? py(c2) : null,
    p2 = uy(f2, i2),
    h2 = () => _y(i2.current);
  return (
    r.useImperativeHandle(t2, () => h2()),
    mb(!o2, h2, a2, (e7, t3) => {
      s2?.(e7, t3, l2);
    }),
    d2 ? r.cloneElement(c2, { ref: p2 }) : c2
  );
}
const vb = r.forwardRef(gb);
function yb() {
  return (
    (yb = Object.assign
      ? Object.assign.bind()
      : function (e6) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = arguments[t2];
            for (var r2 in n2) Object.prototype.hasOwnProperty.call(n2, r2) && (e6[r2] = n2[r2]);
          }
          return e6;
        }),
    yb.apply(this, arguments)
  );
}
function bb(e6, t2) {
  const { children: n2 } = e6;
  return (typeof n2 == "function" ? [n2] : Zy(n2)).map((n3, o2) => {
    const a2 = n3?.key || `rc-observer-key-${o2}`;
    return r.createElement(vb, yb({}, e6, { key: a2, ref: o2 === 0 ? t2 : void 0 }), n3);
  });
}
const wb = r.forwardRef(bb);
function Eb(e6) {
  var t2,
    n2,
    r2 = "";
  if (typeof e6 == "string" || typeof e6 == "number") r2 += e6;
  else if (typeof e6 == "object")
    if (Array.isArray(e6)) {
      var o2 = e6.length;
      for (t2 = 0; t2 < o2; t2++) e6[t2] && (n2 = Eb(e6[t2])) && (r2 && (r2 += " "), (r2 += n2));
    } else for (n2 in e6) e6[n2] && (r2 && (r2 += " "), (r2 += n2));
  return r2;
}
function Sb() {
  for (var e6, t2, n2 = 0, r2 = "", o2 = arguments.length; n2 < o2; n2++)
    (e6 = arguments[n2]) && (t2 = Eb(e6)) && (r2 && (r2 += " "), (r2 += t2));
  return r2;
}
function xb(e6, t2) {
  (t2 == null || t2 > e6.length) && (t2 = e6.length);
  for (var n2 = 0, r2 = Array(t2); n2 < t2; n2++) r2[n2] = e6[n2];
  return r2;
}
function kb(e6, t2) {
  if (e6) {
    if (typeof e6 == "string") return xb(e6, t2);
    var n2 = {}.toString.call(e6).slice(8, -1);
    return (
      n2 === "Object" && e6.constructor && (n2 = e6.constructor.name),
      n2 === "Map" || n2 === "Set"
        ? Array.from(e6)
        : n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2)
          ? xb(e6, t2)
          : void 0
    );
  }
}
function Cb(e6) {
  return (
    (function (e7) {
      if (Array.isArray(e7)) return xb(e7);
    })(e6) ||
    (function (e7) {
      if ((typeof Symbol < "u" && e7[Symbol.iterator] != null) || e7["@@iterator"] != null)
        return Array.from(e7);
    })(e6) ||
    kb(e6) ||
    (function () {
      throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    })()
  );
}
wb.Collection = function ({ children: e6, onBatchResize: t2 }) {
  const n2 = r.useRef(0),
    o2 = r.useRef([]),
    a2 = r.useContext(cb),
    l2 = r.useCallback(
      (e7, r2, l3) => {
        n2.current += 1;
        const i2 = n2.current;
        o2.current.push({ size: e7, element: r2, data: l3 }),
          Promise.resolve().then(() => {
            i2 === n2.current && (t2?.(o2.current), (o2.current = []));
          }),
          a2?.(e7, r2, l3);
      },
      [t2, a2],
    );
  return r.createElement(cb.Provider, { value: l2 }, e6);
};
const _b = "ant",
  Pb = "anticon",
  Ob = ["outlined", "borderless", "filled", "underlined"],
  Tb = r.createContext({
    getPrefixCls: (e6, t2) => t2 || (e6 ? `${_b}-${e6}` : _b),
    iconPrefixCls: Pb,
  }),
  Nb = {};
function $b(e6) {
  const t2 = r.useContext(Tb),
    { getPrefixCls: n2, direction: o2, getPopupContainer: a2, renderEmpty: l2 } = t2,
    i2 = t2[e6];
  return {
    classNames: Nb,
    styles: Nb,
    ...i2,
    getPrefixCls: n2,
    direction: o2,
    getPopupContainer: a2,
    renderEmpty: l2,
  };
}
function Mb(e6) {
  for (var t2, n2 = 0, r2 = 0, o2 = e6.length; o2 >= 4; ++r2, o2 -= 4)
    (t2 =
      1540483477 *
        (65535 &
          (t2 =
            (255 & e6.charCodeAt(r2)) |
            ((255 & e6.charCodeAt(++r2)) << 8) |
            ((255 & e6.charCodeAt(++r2)) << 16) |
            ((255 & e6.charCodeAt(++r2)) << 24))) +
      ((59797 * (t2 >>> 16)) << 16)),
      (n2 =
        (1540483477 * (65535 & (t2 ^= t2 >>> 24)) + ((59797 * (t2 >>> 16)) << 16)) ^
        (1540483477 * (65535 & n2) + ((59797 * (n2 >>> 16)) << 16)));
  switch (o2) {
    case 3:
      n2 ^= (255 & e6.charCodeAt(r2 + 2)) << 16;
    case 2:
      n2 ^= (255 & e6.charCodeAt(r2 + 1)) << 8;
    case 1:
      n2 = 1540483477 * (65535 & (n2 ^= 255 & e6.charCodeAt(r2))) + ((59797 * (n2 >>> 16)) << 16);
  }
  return (
    ((n2 = 1540483477 * (65535 & (n2 ^= n2 >>> 13)) + ((59797 * (n2 >>> 16)) << 16)) ^
      (n2 >>> 15)) >>>
    0
  ).toString(36);
}
function Rb(e6) {
  return e6.join("%");
}
let Lb = 0;
class Ib {
  constructor(e6) {
    n(this, "instanceId"),
      n(this, "cache", new Map()),
      n(this, "updateTimes", new Map()),
      n(this, "extracted", new Set()),
      (this.instanceId = e6);
  }
  get(e6) {
    return this.opGet(Rb(e6));
  }
  opGet(e6) {
    return this.cache.get(e6) || null;
  }
  update(e6, t2) {
    return this.opUpdate(Rb(e6), t2);
  }
  opUpdate(e6, t2) {
    const n2 = t2(this.cache.get(e6));
    n2 === null
      ? (this.cache.delete(e6), this.updateTimes.delete(e6))
      : (this.cache.set(e6, n2), this.updateTimes.set(e6, Lb), (Lb += 1));
  }
}
const Ab = "data-token-hash",
  Fb = "data-css-hash",
  zb = "__cssinjs_instance__",
  jb = r.createContext({
    hashPriority: "low",
    cache: (function () {
      const e6 = Math.random().toString(12).slice(2);
      if (typeof document < "u" && document.head && document.body) {
        const t2 = document.body.querySelectorAll(`style[${Fb}]`) || [],
          { firstChild: n2 } = document.head;
        Array.from(t2).forEach((t3) => {
          t3[zb] || (t3[zb] = e6), t3[zb] === e6 && document.head.insertBefore(t3, n2);
        });
        const r2 = {};
        Array.from(document.querySelectorAll(`style[${Fb}]`)).forEach((t3) => {
          var n3;
          const o2 = t3.getAttribute(Fb);
          r2[o2]
            ? t3[zb] === e6 && ((n3 = t3.parentNode) == null || n3.removeChild(t3))
            : (r2[o2] = !0);
        });
      }
      return new Ib(e6);
    })(),
    defaultCache: !0,
    autoPrefix: !1,
  }),
  Db = class e3 {
    constructor() {
      n(this, "cache"),
        n(this, "keys"),
        n(this, "cacheCallTimes"),
        (this.cache = new Map()),
        (this.keys = []),
        (this.cacheCallTimes = 0);
    }
    size() {
      return this.keys.length;
    }
    internalGet(e6, t2 = !1) {
      let n2 = { map: this.cache };
      return (
        e6.forEach((e7) => {
          var t3;
          n2 = n2 ? ((t3 = n2?.map) == null ? void 0 : t3.get(e7)) : void 0;
        }),
        n2?.value && t2 && (n2.value[1] = this.cacheCallTimes++),
        n2?.value
      );
    }
    get(e6) {
      var t2;
      return (t2 = this.internalGet(e6, !0)) == null ? void 0 : t2[0];
    }
    has(e6) {
      return !!this.internalGet(e6);
    }
    set(t2, n2) {
      if (!this.has(t2)) {
        if (this.size() + 1 > e3.MAX_CACHE_SIZE + e3.MAX_CACHE_OFFSET) {
          const [e6] = this.keys.reduce(
            (e7, t3) => {
              const [, n3] = e7;
              return this.internalGet(t3)[1] < n3 ? [t3, this.internalGet(t3)[1]] : e7;
            },
            [this.keys[0], this.cacheCallTimes],
          );
          this.delete(e6);
        }
        this.keys.push(t2);
      }
      let r2 = this.cache;
      t2.forEach((e6, o2) => {
        if (o2 === t2.length - 1) r2.set(e6, { value: [n2, this.cacheCallTimes++] });
        else {
          const t3 = r2.get(e6);
          t3 ? t3.map || (t3.map = new Map()) : r2.set(e6, { map: new Map() }),
            (r2 = r2.get(e6).map);
        }
      });
    }
    deleteByPath(e6, t2) {
      var n2;
      const r2 = e6.get(t2[0]);
      if (t2.length === 1)
        return (
          r2.map ? e6.set(t2[0], { map: r2.map }) : e6.delete(t2[0]),
          (n2 = r2.value) == null ? void 0 : n2[0]
        );
      const o2 = this.deleteByPath(r2.map, t2.slice(1));
      return (r2.map && r2.map.size !== 0) || r2.value || e6.delete(t2[0]), o2;
    }
    delete(e6) {
      if (this.has(e6))
        return (
          (this.keys = this.keys.filter(
            (t2) =>
              !(function (e7, t3) {
                if (e7.length !== t3.length) return !1;
                for (let n2 = 0; n2 < e7.length; n2++) if (e7[n2] !== t3[n2]) return !1;
                return !0;
              })(t2, e6),
          )),
          this.deleteByPath(this.cache, e6)
        );
    }
  };
n(Db, "MAX_CACHE_SIZE", 20), n(Db, "MAX_CACHE_OFFSET", 5);
let Hb = Db,
  Vb = 0;
class Bb {
  constructor(e6) {
    n(this, "derivatives"),
      n(this, "id"),
      (this.derivatives = Array.isArray(e6) ? e6 : [e6]),
      (this.id = Vb),
      e6.length === 0 && e6.length,
      (Vb += 1);
  }
  getDerivativeToken(e6) {
    return this.derivatives.reduce((t2, n2) => n2(e6, t2), void 0);
  }
}
const Ub = new Hb();
function Wb(e6) {
  const t2 = Array.isArray(e6) ? e6 : [e6];
  return Ub.has(t2) || Ub.set(t2, new Bb(t2)), Ub.get(t2);
}
const qb = new WeakMap(),
  Xb = {},
  Kb = new WeakMap();
function Gb(e6) {
  let t2 = Kb.get(e6) || "";
  return (
    t2 ||
      (Object.keys(e6).forEach((n2) => {
        const r2 = e6[n2];
        (t2 += n2), (t2 += r2 instanceof Bb ? r2.id : r2 && typeof r2 == "object" ? Gb(r2) : r2);
      }),
      (t2 = Mb(t2)),
      Kb.set(e6, t2)),
    t2
  );
}
const Yb = Ev();
function Qb(e6) {
  return typeof e6 == "number" ? `${e6}px` : e6;
}
function Jb(e6) {
  const { hashCls: t2, hashPriority: n2 = "low" } = e6 || {};
  if (!t2) return "";
  const r2 = `.${t2}`;
  return n2 === "low" ? `:where(${r2})` : r2;
}
function Zb(e6, t2) {
  const n2 = typeof t2 == "function" ? t2() : t2;
  return n2 ? { ...e6, csp: { ...e6.csp, nonce: n2 } } : e6;
}
const ew = (e6, t2 = "") =>
    `--${t2 ? `${t2}-` : ""}${e6}`
      .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
      .replace(/([A-Z]+)([A-Z][a-z0-9]+)/g, "$1-$2")
      .replace(/([a-z])([A-Z0-9])/g, "$1-$2")
      .toLowerCase(),
  tw = (e6, t2, n2) => {
    const { hashCls: r2, hashPriority: o2 = "low", scope: a2 } = n2 || {};
    if (!Object.keys(e6).length) return "";
    const l2 = `${Jb({ hashCls: r2, hashPriority: o2 })}.${t2}`,
      i2 = [a2].flat().filter(Boolean);
    return `${i2.length ? i2.map((e7) => `${l2}.${e7}`).join(", ") : l2}{${Object.entries(e6)
      .map(([e7, t3]) => `${e7}:${t3};`)
      .join("")}}`;
  },
  nw = (e6, t2, n2) => {
    const {
        hashCls: r2,
        hashPriority: o2 = "low",
        prefix: a2,
        unitless: l2,
        ignore: i2,
        preserve: s2,
      } = n2 || {},
      u2 = {},
      c2 = {};
    return (
      Object.entries(e6).forEach(([e7, t3]) => {
        if (s2?.[e7]) c2[e7] = t3;
        else if ((typeof t3 == "string" || typeof t3 == "number") && !i2?.[e7]) {
          const n3 = ew(e7, a2);
          (u2[n3] = typeof t3 != "number" || l2?.[e7] ? String(t3) : `${t3}px`),
            (c2[e7] = `var(${n3})`);
        }
      }),
      [c2, tw(u2, t2, { scope: n2?.scope, hashCls: r2, hashPriority: o2 })]
    );
  },
  rw = new Map();
function ow(e6, t2, n2, o2, a2) {
  const { cache: l2 } = r.useContext(jb),
    i2 = Rb([e6, ...t2]),
    s2 = (e7) => {
      l2.opUpdate(i2, (t3) => {
        const [r2 = 0, o3] = t3 || [void 0, void 0],
          a3 = [r2, o3 || n2()];
        return e7 ? e7(a3) : a3;
      });
    };
  r.useMemo(() => {
    s2();
  }, [i2]);
  const u2 = l2.opGet(i2)[1];
  return (
    r.useInsertionEffect(
      () => (
        s2(([e7, t3]) => [e7 + 1, t3]),
        rw.has(i2) ||
          (a2?.(u2),
          rw.set(i2, !0),
          Promise.resolve().then(() => {
            rw.delete(i2);
          })),
        () => {
          l2.opUpdate(i2, (e7) => {
            const [t3 = 0, n3] = e7 || [];
            return t3 - 1 === 0 ? (o2?.(n3, !1), rw.delete(i2), null) : [t3 - 1, n3];
          });
        }
      ),
      [i2],
    ),
    u2
  );
}
const aw = {},
  lw = new Map();
function iw(e6, t2) {
  lw.set(e6, (lw.get(e6) || 0) - 1);
  const n2 = new Set();
  lw.forEach((e7, t3) => {
    e7 <= 0 && n2.add(t3);
  }),
    lw.size - n2.size > -1 &&
      n2.forEach((e7) => {
        (function (e8, t3) {
          typeof document < "u" &&
            document.querySelectorAll(`style[${Ab}="${e8}"]`).forEach((e9) => {
              var n3;
              e9[zb] === t3 && ((n3 = e9.parentNode) == null || n3.removeChild(e9));
            });
        })(e7, t2),
          lw.delete(e7);
      });
}
function sw(e6, t2, n2) {
  const {
      cache: { instanceId: o2 },
      container: a2,
      hashPriority: l2,
    } = r.useContext(jb),
    {
      salt: i2 = "",
      override: s2 = aw,
      formatToken: u2,
      getComputedToken: c2,
      cssVar: d2,
      nonce: f2,
    } = n2,
    p2 = (function (e7, t3) {
      let n3 = qb;
      for (let r2 = 0; r2 < t3.length; r2 += 1) {
        const e8 = t3[r2];
        n3.has(e8) || n3.set(e8, new WeakMap()), (n3 = n3.get(e8));
      }
      return n3.has(Xb) || n3.set(Xb, e7()), n3.get(Xb);
    })(() => Object.assign({}, ...t2), t2),
    h2 = Gb(p2),
    m2 = Gb(s2),
    g2 = Gb(d2);
  return ow(
    "token",
    [i2, e6.id, h2, m2, g2],
    () => {
      const t3 = c2
          ? c2(p2, s2, e6)
          : ((e7, t4, n4, r3) => {
              let o4 = { ...n4.getDerivativeToken(e7), ...t4 };
              return r3 && (o4 = r3(o4)), o4;
            })(p2, s2, e6, u2),
        n3 = { ...t3 },
        r2 = `${i2}_${d2.prefix}`,
        o3 = Mb(r2),
        a3 = `css-${o3}`;
      n3._tokenKey = (function (e7, t4) {
        return Mb(`${t4}_${Gb(e7)}`);
      })(n3, r2);
      const [f3, h3] = nw(t3, d2.key, {
        prefix: d2.prefix,
        ignore: d2.ignore,
        unitless: d2.unitless,
        preserve: d2.preserve,
        hashPriority: l2,
        hashCls: d2.hashed ? a3 : void 0,
      });
      var m3;
      return (
        (f3._hashId = o3),
        (m3 = d2.key),
        lw.set(m3, (lw.get(m3) || 0) + 1),
        [f3, a3, n3, h3, d2.key]
      );
    },
    ([, , , , e7]) => {
      iw(e7, o2);
    },
    ([, , , e7, t3]) => {
      if (!e7) return;
      let n3 = { mark: Fb, prepend: "queue", attachTo: a2, priority: -999 };
      n3 = Zb(n3, f2);
      const r2 = ky(e7, Mb(`css-var-${t3}`), n3);
      (r2[zb] = o2), r2.setAttribute(Ab, t3);
    },
  );
}
var uw = {
    animationIterationCount: 1,
    borderImageOutset: 1,
    borderImageSlice: 1,
    borderImageWidth: 1,
    boxFlex: 1,
    boxFlexGroup: 1,
    boxOrdinalGroup: 1,
    columnCount: 1,
    columns: 1,
    flex: 1,
    flexGrow: 1,
    flexPositive: 1,
    flexShrink: 1,
    flexNegative: 1,
    flexOrder: 1,
    gridRow: 1,
    gridRowEnd: 1,
    gridRowSpan: 1,
    gridRowStart: 1,
    gridColumn: 1,
    gridColumnEnd: 1,
    gridColumnSpan: 1,
    gridColumnStart: 1,
    msGridRow: 1,
    msGridRowSpan: 1,
    msGridColumn: 1,
    msGridColumnSpan: 1,
    fontWeight: 1,
    lineHeight: 1,
    opacity: 1,
    order: 1,
    orphans: 1,
    tabSize: 1,
    widows: 1,
    zIndex: 1,
    zoom: 1,
    WebkitLineClamp: 1,
    fillOpacity: 1,
    floodOpacity: 1,
    stopOpacity: 1,
    strokeDasharray: 1,
    strokeDashoffset: 1,
    strokeMiterlimit: 1,
    strokeOpacity: 1,
    strokeWidth: 1,
  },
  cw = "-ms-",
  dw = "-moz-",
  fw = "-webkit-",
  pw = "comm",
  hw = "rule",
  mw = "decl",
  gw = "@keyframes",
  vw = Math.abs,
  yw = String.fromCharCode,
  bw = Object.assign;
function ww(e6) {
  return e6.trim();
}
function Ew(e6, t2) {
  return (e6 = t2.exec(e6)) ? e6[0] : e6;
}
function Sw(e6, t2, n2) {
  return e6.replace(t2, n2);
}
function xw(e6, t2) {
  return e6.indexOf(t2);
}
function kw(e6, t2) {
  return 0 | e6.charCodeAt(t2);
}
function Cw(e6, t2, n2) {
  return e6.slice(t2, n2);
}
function _w(e6) {
  return e6.length;
}
function Pw(e6) {
  return e6.length;
}
function Ow(e6, t2) {
  return t2.push(e6), e6;
}
function Tw(e6, t2) {
  return e6.filter(function (e7) {
    return !Ew(e7, t2);
  });
}
var Nw = 1,
  $w = 1,
  Mw = 0,
  Rw = 0,
  Lw = 0,
  Iw = "";
function Aw(e6, t2, n2, r2, o2, a2, l2, i2) {
  return {
    value: e6,
    root: t2,
    parent: n2,
    type: r2,
    props: o2,
    children: a2,
    line: Nw,
    column: $w,
    length: l2,
    return: "",
    siblings: i2,
  };
}
function Fw(e6, t2) {
  return bw(Aw("", null, null, "", null, null, 0, e6.siblings), e6, { length: -e6.length }, t2);
}
function zw(e6) {
  for (; e6.root; ) e6 = Fw(e6.root, { children: [e6] });
  Ow(e6, e6.siblings);
}
function jw() {
  return (Lw = Rw > 0 ? kw(Iw, --Rw) : 0), $w--, Lw === 10 && (($w = 1), Nw--), Lw;
}
function Dw() {
  return (Lw = Rw < Mw ? kw(Iw, Rw++) : 0), $w++, Lw === 10 && (($w = 1), Nw++), Lw;
}
function Hw() {
  return kw(Iw, Rw);
}
function Vw() {
  return Rw;
}
function Bw(e6, t2) {
  return Cw(Iw, e6, t2);
}
function Uw(e6) {
  switch (e6) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function Ww(e6) {
  return ww(Bw(Rw - 1, Kw(e6 === 91 ? e6 + 2 : e6 === 40 ? e6 + 1 : e6)));
}
function qw(e6) {
  for (; (Lw = Hw()) && Lw < 33; ) Dw();
  return Uw(e6) > 2 || Uw(Lw) > 3 ? "" : " ";
}
function Xw(e6, t2) {
  for (; --t2 && Dw() && !(Lw < 48 || Lw > 102 || (Lw > 57 && Lw < 65) || (Lw > 70 && Lw < 97)); );
  return Bw(e6, Vw() + (t2 < 6 && Hw() == 32 && Dw() == 32));
}
function Kw(e6) {
  for (; Dw(); )
    switch (Lw) {
      case e6:
        return Rw;
      case 34:
      case 39:
        e6 !== 34 && e6 !== 39 && Kw(Lw);
        break;
      case 40:
        e6 === 41 && Kw(e6);
        break;
      case 92:
        Dw();
    }
  return Rw;
}
function Gw(e6, t2) {
  for (; Dw() && e6 + Lw !== 57 && (e6 + Lw !== 84 || Hw() !== 47); );
  return "/*" + Bw(t2, Rw - 1) + "*" + yw(e6 === 47 ? e6 : Dw());
}
function Yw(e6) {
  for (; !Uw(Hw()); ) Dw();
  return Bw(e6, Rw);
}
function Qw(e6) {
  return (function (e7) {
    return (Iw = ""), e7;
  })(
    Jw(
      "",
      null,
      null,
      null,
      [""],
      (e6 = (function (e7) {
        return (Nw = $w = 1), (Mw = _w((Iw = e7))), (Rw = 0), [];
      })(e6)),
      0,
      [0],
      e6,
    ),
  );
}
function Jw(e6, t2, n2, r2, o2, a2, l2, i2, s2) {
  for (
    var u2 = 0,
      c2 = 0,
      d2 = l2,
      f2 = 0,
      p2 = 0,
      h2 = 0,
      m2 = 1,
      g2 = 1,
      v2 = 1,
      y2 = 0,
      b2 = 0,
      w2 = "",
      E2 = o2,
      S2 = a2,
      x2 = r2,
      k2 = w2;
    g2;

  )
    switch (((h2 = b2), (b2 = Dw()))) {
      case 40:
        h2 != 108 && kw(k2, d2 - 1) == 58 ? (y2++, (k2 += "(")) : (k2 += Ww(b2));
        break;
      case 41:
        y2--, (k2 += ")");
        break;
      case 34:
      case 39:
      case 91:
        k2 += Ww(b2);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        if (y2 > 0) {
          k2 += yw(b2);
          break;
        }
        k2 += qw(h2);
        break;
      case 92:
        k2 += Xw(Vw() - 1, 7);
        continue;
      case 47:
        switch (Hw()) {
          case 42:
          case 47:
            Ow(eE(Gw(Dw(), Vw()), t2, n2, s2), s2),
              (Uw(h2 || 1) != 5 && Uw(Hw() || 1) != 5) ||
                !_w(k2) ||
                Cw(k2, -1, void 0) === " " ||
                (k2 += " ");
            break;
          default:
            k2 += "/";
        }
        break;
      case 123 * m2:
        i2[u2++] = _w(k2) * v2;
      case 125 * m2:
      case 59:
      case 0:
        if (y2 > 0 && b2) {
          k2 += yw(b2);
          break;
        }
        switch (b2) {
          case 0:
          case 125:
            g2 = 0;
          case 59 + c2:
            v2 == -1 && (k2 = Sw(k2, /\f/g, "")),
              p2 > 0 &&
                (_w(k2) - d2 || m2 === 0) &&
                Ow(
                  p2 > 32
                    ? tE(k2 + ";", r2, n2, d2 - 1, s2)
                    : tE(Sw(k2, " ", "") + ";", r2, n2, d2 - 2, s2),
                  s2,
                );
            break;
          case 59:
            k2 += ";";
          default:
            if (
              (Ow((x2 = Zw(k2, t2, n2, u2, c2, o2, i2, w2, (E2 = []), (S2 = []), d2, a2)), a2),
              b2 === 123)
            )
              if (c2 === 0) Jw(k2, t2, x2, x2, E2, a2, d2, i2, S2);
              else {
                switch (f2) {
                  case 99:
                    if (kw(k2, 3) === 110) break;
                  case 108:
                    if (kw(k2, 2) === 97) break;
                  default:
                    c2 = 0;
                  case 100:
                  case 109:
                  case 115:
                }
                c2
                  ? Jw(
                      e6,
                      x2,
                      x2,
                      r2 && Ow(Zw(e6, x2, x2, 0, 0, o2, i2, w2, o2, (E2 = []), d2, S2), S2),
                      o2,
                      S2,
                      d2,
                      i2,
                      r2 ? E2 : S2,
                    )
                  : Jw(k2, x2, x2, x2, [""], S2, 0, i2, S2);
              }
        }
        (u2 = c2 = p2 = 0), (m2 = v2 = 1), (w2 = k2 = ""), (d2 = l2);
        break;
      case 58:
        (d2 = 1 + _w(k2)), (p2 = h2);
      default:
        if (m2 < 1) {
          if (b2 == 123) --m2;
          else if (b2 == 125 && m2++ == 0 && jw() == 125) continue;
        }
        switch (((k2 += yw(b2)), b2 * m2)) {
          case 38:
            v2 = c2 > 0 ? 1 : ((k2 += "\f"), -1);
            break;
          case 44:
            if (y2 > 0) break;
            (i2[u2++] = (_w(k2) - 1) * v2), (v2 = 1);
            break;
          case 64:
            Hw() === 45 && (k2 += Ww(Dw())),
              (f2 = Hw()),
              (c2 = d2 = _w((w2 = k2 += Yw(Vw())))),
              b2++;
            break;
          case 45:
            h2 === 45 && _w(k2) == 2 && (m2 = 0);
        }
    }
  return a2;
}
function Zw(e6, t2, n2, r2, o2, a2, l2, i2, s2, u2, c2, d2) {
  for (
    var f2 = o2 - 1, p2 = o2 === 0 ? a2 : [""], h2 = Pw(p2), m2 = 0, g2 = 0, v2 = 0;
    m2 < r2;
    ++m2
  )
    for (var y2 = 0, b2 = Cw(e6, f2 + 1, (f2 = vw((g2 = l2[m2])))), w2 = e6; y2 < h2; ++y2)
      (w2 = ww(g2 > 0 ? p2[y2] + " " + b2 : Sw(b2, /&\f/g, p2[y2]))) && (s2[v2++] = w2);
  return Aw(e6, t2, n2, o2 === 0 ? hw : i2, s2, u2, c2, d2);
}
function eE(e6, t2, n2, r2) {
  return Aw(e6, t2, n2, pw, yw(Lw), Cw(e6, 2, -2), 0, r2);
}
function tE(e6, t2, n2, r2, o2) {
  return Aw(e6, t2, n2, mw, Cw(e6, 0, r2), Cw(e6, r2 + 1, -1), r2, o2);
}
function nE(e6, t2, n2) {
  switch (
    (function (e7, t3) {
      return 45 ^ kw(e7, 0)
        ? (((((((t3 << 2) ^ kw(e7, 0)) << 2) ^ kw(e7, 1)) << 2) ^ kw(e7, 2)) << 2) ^ kw(e7, 3)
        : 0;
    })(e6, t2)
  ) {
    case 5103:
      return fw + "print-" + e6 + e6;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
      return fw + e6 + e6;
    case 4855:
      return (
        fw +
        e6
          .replace("add", "source-over")
          .replace("substract", "source-out")
          .replace("intersect", "source-in")
          .replace("exclude", "xor") +
        e6
      );
    case 4789:
      return dw + e6 + e6;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return fw + e6 + dw + e6 + cw + e6 + e6;
    case 5936:
      switch (kw(e6, t2 + 11)) {
        case 114:
          return fw + e6 + cw + Sw(e6, /[svh]\w+-[tblr]{2}/, "tb") + e6;
        case 108:
          return fw + e6 + cw + Sw(e6, /[svh]\w+-[tblr]{2}/, "tb-rl") + e6;
        case 45:
          return fw + e6 + cw + Sw(e6, /[svh]\w+-[tblr]{2}/, "lr") + e6;
      }
    case 6828:
    case 4268:
    case 2903:
      return fw + e6 + cw + e6 + e6;
    case 6165:
      return fw + e6 + cw + "flex-" + e6 + e6;
    case 5187:
      return fw + e6 + Sw(e6, /(\w+).+(:[^]+)/, fw + "box-$1$2" + cw + "flex-$1$2") + e6;
    case 5443:
      return (
        fw +
        e6 +
        cw +
        "flex-item-" +
        Sw(e6, /flex-|-self/g, "") +
        (Ew(e6, /flex-|baseline/) ? "" : cw + "grid-row-" + Sw(e6, /flex-|-self/g, "")) +
        e6
      );
    case 4675:
      return fw + e6 + cw + "flex-line-pack" + Sw(e6, /align-content|flex-|-self/g, "") + e6;
    case 5548:
      return fw + e6 + cw + Sw(e6, "shrink", "negative") + e6;
    case 5292:
      return fw + e6 + cw + Sw(e6, "basis", "preferred-size") + e6;
    case 6060:
      return fw + "box-" + Sw(e6, "-grow", "") + fw + e6 + cw + Sw(e6, "grow", "positive") + e6;
    case 4554:
      return fw + Sw(e6, /([^-])(transform)/g, "$1" + fw + "$2") + e6;
    case 6187:
      return Sw(Sw(Sw(e6, /(zoom-|grab)/, fw + "$1"), /(image-set)/, fw + "$1"), e6, "") + e6;
    case 5495:
    case 3959:
      return Sw(e6, /(image-set\([^]*)/, fw + "$1$`$1");
    case 4968:
      return (
        Sw(
          Sw(e6, /(.+:)(flex-)?(.*)/, fw + "box-pack:$3" + cw + "flex-pack:$3"),
          /space-between/,
          "justify",
        ) +
        fw +
        e6 +
        e6
      );
    case 4200:
      if (!Ew(e6, /flex-|baseline/)) return cw + "grid-column-align" + Cw(e6, t2) + e6;
      break;
    case 2592:
    case 3360:
      return cw + Sw(e6, "template-", "") + e6;
    case 4384:
    case 3616:
      return n2 &&
        n2.some(function (e7, n3) {
          return (t2 = n3), Ew(e7.props, /grid-\w+-end/);
        })
        ? ~xw(e6 + (n2 = n2[t2].value), "span")
          ? e6
          : cw +
            Sw(e6, "-start", "") +
            e6 +
            cw +
            "grid-row-span:" +
            (~xw(n2, "span") ? Ew(n2, /\d+/) : +Ew(n2, /\d+/) - +Ew(e6, /\d+/)) +
            ";"
        : cw + Sw(e6, "-start", "") + e6;
    case 4896:
    case 4128:
      return n2 &&
        n2.some(function (e7) {
          return Ew(e7.props, /grid-\w+-start/);
        })
        ? e6
        : cw + Sw(Sw(e6, "-end", "-span"), "span ", "") + e6;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return Sw(e6, /(.+)-inline(.+)/, fw + "$1$2") + e6;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (_w(e6) - 1 - t2 > 6)
        switch (kw(e6, t2 + 1)) {
          case 109:
            if (kw(e6, t2 + 4) !== 45) break;
          case 102:
            return (
              Sw(
                e6,
                /(.+:)(.+)-([^]+)/,
                "$1" + fw + "$2-$3$1" + dw + (kw(e6, t2 + 3) == 108 ? "$3" : "$2-$3"),
              ) + e6
            );
          case 115:
            return ~xw(e6, "stretch") ? nE(Sw(e6, "stretch", "fill-available"), t2, n2) + e6 : e6;
        }
      break;
    case 5152:
    case 5920:
      return Sw(
        e6,
        /(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,
        function (t3, n3, r2, o2, a2, l2, i2) {
          return (
            cw +
            n3 +
            ":" +
            r2 +
            i2 +
            (o2 ? cw + n3 + "-span:" + (a2 ? l2 : +l2 - +r2) + i2 : "") +
            e6
          );
        },
      );
    case 4949:
      if (kw(e6, t2 + 6) === 121) return Sw(e6, ":", ":" + fw) + e6;
      break;
    case 6444:
      switch (kw(e6, kw(e6, 14) === 45 ? 18 : 11)) {
        case 120:
          return (
            Sw(
              e6,
              /(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,
              "$1" +
                fw +
                (kw(e6, 14) === 45 ? "inline-" : "") +
                "box$3$1" +
                fw +
                "$2$3$1" +
                cw +
                "$2box$3",
            ) + e6
          );
        case 100:
          return Sw(e6, ":", ":" + cw) + e6;
      }
      break;
    case 5719:
    case 2647:
    case 2135:
    case 3927:
    case 2391:
      return Sw(e6, "scroll-", "scroll-snap-") + e6;
  }
  return e6;
}
function rE(e6, t2) {
  for (var n2 = "", r2 = 0; r2 < e6.length; r2++) n2 += t2(e6[r2], r2, e6, t2) || "";
  return n2;
}
function oE(e6, t2, n2, r2) {
  switch (e6.type) {
    case "@layer":
      if (e6.children.length) break;
    case "@import":
    case "@namespace":
    case mw:
      return (e6.return = e6.return || e6.value);
    case pw:
      return "";
    case gw:
      return (e6.return = e6.value + "{" + rE(e6.children, r2) + "}");
    case hw:
      if (!_w((e6.value = e6.props.join(",")))) return "";
  }
  return _w((n2 = rE(e6.children, r2))) ? (e6.return = e6.value + "{" + n2 + "}") : "";
}
function aE(e6, t2, n2, r2) {
  if (e6.length > -1 && !e6.return)
    switch (e6.type) {
      case mw:
        return void (e6.return = nE(e6.value, e6.length, n2));
      case gw:
        return rE([Fw(e6, { value: Sw(e6.value, "@", "@" + fw) })], r2);
      case hw:
        if (e6.length)
          return (function (e7, t3) {
            return e7.map(t3).join("");
          })((n2 = e6.props), function (t3) {
            switch (Ew(t3, (r2 = /(::plac\w+|:read-\w+)/))) {
              case ":read-only":
              case ":read-write":
                zw(Fw(e6, { props: [Sw(t3, /:(read-\w+)/, ":-moz-$1")] })),
                  zw(Fw(e6, { props: [t3] })),
                  bw(e6, { props: Tw(n2, r2) });
                break;
              case "::placeholder":
                zw(Fw(e6, { props: [Sw(t3, /:(plac\w+)/, ":" + fw + "input-$1")] })),
                  zw(Fw(e6, { props: [Sw(t3, /:(plac\w+)/, ":-moz-$1")] })),
                  zw(Fw(e6, { props: [Sw(t3, /:(plac\w+)/, cw + "input-$1")] })),
                  zw(Fw(e6, { props: [t3] })),
                  bw(e6, { props: Tw(n2, r2) });
            }
            return "";
          });
    }
}
const lE = "data-ant-cssinjs-cache-path",
  iE = "_FILE_STYLE__";
let sE,
  uE = !0;
function cE(e6) {
  return (
    (function () {
      var e7;
      if (!sE && ((sE = {}), Ev())) {
        const t2 = document.createElement("div");
        (t2.className = lE),
          (t2.style.position = "fixed"),
          (t2.style.visibility = "hidden"),
          (t2.style.top = "-9999px"),
          document.body.appendChild(t2);
        let n2 = getComputedStyle(t2).content || "";
        (n2 = n2.replace(/^"/, "").replace(/"$/, "")),
          n2.split(";").forEach((e8) => {
            const [t3, n3] = e8.split(":");
            sE[t3] = n3;
          });
        const r2 = document.querySelector(`style[${lE}]`);
        r2 && ((uE = !1), (e7 = r2.parentNode) == null || e7.removeChild(r2)),
          document.body.removeChild(t2);
      }
    })(),
    !!sE[e6]
  );
}
const dE = "_multi_value_";
function fE(e6, t2) {
  var n2, r2;
  return rE(
    Qw(e6),
    t2
      ? ((r2 = Pw((n2 = [aE, oE]))),
        function (e7, t3, o2, a2) {
          for (var l2 = "", i2 = 0; i2 < r2; i2++) l2 += n2[i2](e7, t3, o2, a2) || "";
          return l2;
        })
      : oE,
  ).replace(/\{%%%\:[^;];}/g, ";");
}
function pE(e6, t2, n2 = "high") {
  if (!t2) return e6;
  const r2 = Jb({ hashCls: t2, hashPriority: n2 });
  return e6
    .split(",")
    .map((e7) => {
      var t3;
      const n3 = e7.trim().split(/\s+/);
      let o2 = n3[0] || "";
      const a2 = ((t3 = o2.match(/^\w+/)) == null ? void 0 : t3[0]) || "";
      return (o2 = `${a2}${r2}${o2.slice(a2.length)}`), [o2, ...n3.slice(1)].join(" ");
    })
    .join(",");
}
const hE = (
  e6,
  t2 = {},
  { root: n2, injectHash: r2, parentSelectors: o2 } = { root: !0, parentSelectors: [] },
) => {
  const {
    hashId: a2,
    layer: l2,
    path: i2,
    hashPriority: s2,
    transformers: u2 = [],
    linters: c2 = [],
  } = t2;
  let d2 = "",
    f2 = {};
  function p2(e7) {
    const n3 = e7.getName(a2);
    if (!f2[n3]) {
      const [r3] = hE(e7.style, t2, { root: !1, parentSelectors: o2 });
      f2[n3] = `@keyframes ${e7.getName(a2)}${r3}`;
    }
  }
  return (
    (function e7(t3, n3 = []) {
      return (
        t3.forEach((t4) => {
          Array.isArray(t4) ? e7(t4, n3) : t4 && n3.push(t4);
        }),
        n3
      );
    })(Array.isArray(e6) ? e6 : [e6]).forEach((e7) => {
      const l3 = typeof e7 != "string" || n2 ? e7 : {};
      if (typeof l3 == "string")
        d2 += `${l3}
`;
      else if (l3._keyframe) p2(l3);
      else {
        const e8 = u2.reduce((e9, t3) => {
          var n3;
          return ((n3 = t3?.visit) == null ? void 0 : n3.call(t3, e9)) || e9;
        }, l3);
        Object.keys(e8).forEach((l4) => {
          const i3 = e8[l4];
          if (
            typeof i3 != "object" ||
            !i3 ||
            (l4 === "animationName" && i3._keyframe) ||
            (function (e9) {
              return typeof e9 == "object" && e9 && ("_skip_check_" in e9 || dE in e9);
            })(i3)
          ) {
            let e9 = function (e10, t4) {
              const n3 = e10.replace(/[A-Z]/g, (e11) => `-${e11.toLowerCase()}`);
              let r3 = t4;
              uw[e10] || typeof r3 != "number" || r3 === 0 || (r3 = `${r3}px`),
                e10 === "animationName" && t4?._keyframe && (p2(t4), (r3 = t4.getName(a2))),
                (d2 += `${n3}:${r3};`);
            };
            const t3 = i3?.value ?? i3;
            typeof i3 == "object" && i3?.[dE] && Array.isArray(t3)
              ? t3.forEach((t4) => {
                  e9(l4, t4);
                })
              : t3 != null && e9(l4, t3);
          } else {
            let e9 = !1,
              u3 = l4.trim(),
              c3 = !1;
            (n2 || r2) && a2
              ? u3.startsWith("@")
                ? (e9 = !0)
                : (u3 = pE(u3 === "&" ? "" : l4, a2, s2))
              : !n2 || a2 || (u3 !== "&" && u3 !== "") || ((u3 = ""), (c3 = !0));
            const [p3, h3] = hE(i3, t2, { root: c3, injectHash: e9, parentSelectors: [...o2, u3] });
            (f2 = { ...f2, ...h3 }), (d2 += `${u3}${p3}`);
          }
        });
      }
    }),
    n2
      ? l2 &&
        (d2 && (d2 = `@layer ${l2.name} {${d2}}`),
        l2.dependencies &&
          (f2[`@layer ${l2.name}`] = l2.dependencies.map((e7) => `@layer ${e7}, ${l2.name};`).join(`
`)))
      : (d2 = `{${d2}}`),
    [d2, f2]
  );
};
function mE(e6, t2) {
  return Mb(`${e6.join("%")}${t2}`);
}
function gE(e6, t2) {
  const { path: n2, hashId: o2, layer: a2, nonce: l2, clientOnly: i2, order: s2 = 0 } = e6,
    {
      mock: u2,
      hashPriority: c2,
      container: d2,
      transformers: f2,
      linters: p2,
      cache: h2,
      layer: m2,
      autoPrefix: g2,
    } = r.useContext(jb),
    v2 = [o2 || ""];
  m2 && v2.push("layer"), v2.push(...n2);
  let y2 = Yb;
  ow(
    "style",
    v2,
    () => {
      const e7 = v2.join("|");
      if (cE(e7)) {
        const [t3, n3] = (function (e8) {
          const t4 = sE[e8];
          let n4 = null;
          if (t4 && Ev())
            if (uE) n4 = iE;
            else {
              const t5 = document.querySelector(`style[${Fb}="${sE[e8]}"]`);
              t5 ? (n4 = t5.innerHTML) : delete sE[e8];
            }
          return [n4, t4];
        })(e7);
        if (t3) return [t3, n3, {}, i2, s2];
      }
      const r2 = t2(),
        [l3, u3] = hE(r2, {
          hashId: o2,
          hashPriority: c2,
          layer: m2 ? a2 : void 0,
          path: n2.join("-"),
          transformers: f2,
          linters: p2,
        }),
        d3 = fE(l3, g2 || !1);
      return [d3, mE(v2, d3), u3, i2, s2];
    },
    (e7, t3) => {
      const [, n3] = e7;
      t3 && Yb && xy(n3, { mark: Fb, attachTo: d2 });
    },
    (e7) => {
      const [t3, n3, r2, , o3] = e7;
      if (y2 && t3 !== iE) {
        let e8 = { mark: Fb, prepend: !m2 && "queue", attachTo: d2, priority: o3 };
        e8 = Zb(e8, l2);
        const a3 = [],
          i3 = [];
        Object.keys(r2).forEach((e9) => {
          e9.startsWith("@layer") ? a3.push(e9) : i3.push(e9);
        }),
          a3.forEach((t4) => {
            ky(fE(r2[t4], g2 || !1), `_layer-${t4}`, { ...e8, prepend: !0 });
          }),
          (ky(t3, n3, e8)[zb] = h2.instanceId),
          i3.forEach((t4) => {
            ky(fE(r2[t4], g2 || !1), `_effect-${t4}`, e8);
          });
      }
    },
  );
}
class vE {
  constructor(e6, t2) {
    n(this, "name"),
      n(this, "style"),
      n(this, "_keyframe", !0),
      (this.name = e6),
      (this.style = t2);
  }
  getName(e6 = "") {
    return e6 ? `${e6}-${this.name}` : this.name;
  }
}
function yE(e6) {
  return (e6.notSplit = !0), e6;
}
function bE(e6) {
  return (bE =
    typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
      ? function (e7) {
          return typeof e7;
        }
      : function (e7) {
          return e7 &&
            typeof Symbol == "function" &&
            e7.constructor === Symbol &&
            e7 !== Symbol.prototype
            ? "symbol"
            : typeof e7;
        })(e6);
}
function wE(e6, t2) {
  return (
    (function (e7) {
      if (Array.isArray(e7)) return e7;
    })(e6) ||
    (function (e7, t3) {
      var n2 = e7 == null ? null : (typeof Symbol < "u" && e7[Symbol.iterator]) || e7["@@iterator"];
      if (n2 != null) {
        var r2,
          o2,
          a2,
          l2,
          i2 = [],
          s2 = !0,
          u2 = !1;
        try {
          if (((a2 = (n2 = n2.call(e7)).next), t3 === 0)) {
            if (Object(n2) !== n2) return;
            s2 = !1;
          } else
            for (
              ;
              !(s2 = (r2 = a2.call(n2)).done) && (i2.push(r2.value), i2.length !== t3);
              s2 = !0
            );
        } catch (c2) {
          (u2 = !0), (o2 = c2);
        } finally {
          try {
            if (!s2 && n2.return != null && ((l2 = n2.return()), Object(l2) !== l2)) return;
          } finally {
            if (u2) throw o2;
          }
        }
        return i2;
      }
    })(e6, t2) ||
    kb(e6, t2) ||
    (function () {
      throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    })()
  );
}
function EE(e6) {
  var t2 = (function (e7, t3) {
    if (bE(e7) != "object" || !e7) return e7;
    var n2;
    if (typeof Symbol < "u" && (n2 = e7[Symbol.toPrimitive]) !== void 0) {
      var r2 = n2.call(e7, t3 || "default");
      if (bE(r2) != "object") return r2;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (t3 === "string" ? String : Number)(e7);
  })(e6, "string");
  return bE(t2) == "symbol" ? t2 : t2 + "";
}
function SE(e6, t2, n2) {
  return (
    (t2 = EE(t2)) in e6
      ? Object.defineProperty(e6, t2, { value: n2, enumerable: !0, configurable: !0, writable: !0 })
      : (e6[t2] = n2),
    e6
  );
}
function xE(e6, t2) {
  var n2 = Object.keys(e6);
  if (Object.getOwnPropertySymbols) {
    var r2 = Object.getOwnPropertySymbols(e6);
    t2 &&
      (r2 = r2.filter(function (t3) {
        return Object.getOwnPropertyDescriptor(e6, t3).enumerable;
      })),
      n2.push.apply(n2, r2);
  }
  return n2;
}
function kE(e6) {
  for (var t2 = 1; t2 < arguments.length; t2++) {
    var n2 = arguments[t2] != null ? arguments[t2] : {};
    t2 % 2
      ? xE(Object(n2), !0).forEach(function (t3) {
          SE(e6, t3, n2[t3]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e6, Object.getOwnPropertyDescriptors(n2))
        : xE(Object(n2)).forEach(function (t3) {
            Object.defineProperty(e6, t3, Object.getOwnPropertyDescriptor(n2, t3));
          });
  }
  return e6;
}
function CE(e6, t2) {
  if (!(e6 instanceof t2)) throw new TypeError("Cannot call a class as a function");
}
function _E(e6, t2) {
  for (var n2 = 0; n2 < t2.length; n2++) {
    var r2 = t2[n2];
    (r2.enumerable = r2.enumerable || !1),
      (r2.configurable = !0),
      "value" in r2 && (r2.writable = !0),
      Object.defineProperty(e6, EE(r2.key), r2);
  }
}
function PE(e6, t2, n2) {
  return (
    t2 && _E(e6.prototype, t2),
    n2 && _E(e6, n2),
    Object.defineProperty(e6, "prototype", { writable: !1 }),
    e6
  );
}
function OE(e6) {
  if (e6 === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e6;
}
function TE(e6, t2) {
  return (TE = Object.setPrototypeOf
    ? Object.setPrototypeOf.bind()
    : function (e7, t3) {
        return (e7.__proto__ = t3), e7;
      })(e6, t2);
}
function NE(e6, t2) {
  if (typeof t2 != "function" && t2 !== null)
    throw new TypeError("Super expression must either be null or a function");
  (e6.prototype = Object.create(t2 && t2.prototype, {
    constructor: { value: e6, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e6, "prototype", { writable: !1 }),
    t2 && TE(e6, t2);
}
function $E(e6) {
  return ($E = Object.setPrototypeOf
    ? Object.getPrototypeOf.bind()
    : function (e7) {
        return e7.__proto__ || Object.getPrototypeOf(e7);
      })(e6);
}
function ME() {
  try {
    var e6 = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch {}
  return (ME = function () {
    return !!e6;
  })();
}
function RE(e6) {
  var t2 = ME();
  return function () {
    var n2,
      r2 = $E(e6);
    if (t2) {
      var o2 = $E(this).constructor;
      n2 = Reflect.construct(r2, arguments, o2);
    } else n2 = r2.apply(this, arguments);
    return (function (e7, t3) {
      if (t3 && (bE(t3) == "object" || typeof t3 == "function")) return t3;
      if (t3 !== void 0)
        throw new TypeError("Derived constructors may only return object or undefined");
      return OE(e7);
    })(this, n2);
  };
}
yE(["borderTop", "borderBottom"]),
  yE(["borderTop"]),
  yE(["borderBottom"]),
  yE(["borderLeft", "borderRight"]),
  yE(["borderLeft"]),
  yE(["borderRight"]);
var LE = PE(function e4() {
    CE(this, e4);
  }),
  IE = "CALC_UNIT",
  AE = new RegExp(IE, "g");
function FE(e6) {
  return typeof e6 == "number" ? "".concat(e6).concat(IE) : e6;
}
var zE = (function () {
    NE(t2, LE);
    var e6 = RE(t2);
    function t2(n2, r2) {
      var o2;
      CE(this, t2),
        SE(OE((o2 = e6.call(this))), "result", ""),
        SE(OE(o2), "unitlessCssVar", void 0),
        SE(OE(o2), "lowPriority", void 0);
      var a2 = bE(n2);
      return (
        (o2.unitlessCssVar = r2),
        n2 instanceof t2
          ? (o2.result = "(".concat(n2.result, ")"))
          : a2 === "number"
            ? (o2.result = FE(n2))
            : a2 === "string" && (o2.result = n2),
        o2
      );
    }
    return (
      PE(t2, [
        {
          key: "add",
          value: function (e7) {
            return (
              e7 instanceof t2
                ? (this.result = "".concat(this.result, " + ").concat(e7.getResult()))
                : (typeof e7 != "number" && typeof e7 != "string") ||
                  (this.result = "".concat(this.result, " + ").concat(FE(e7))),
              (this.lowPriority = !0),
              this
            );
          },
        },
        {
          key: "sub",
          value: function (e7) {
            return (
              e7 instanceof t2
                ? (this.result = "".concat(this.result, " - ").concat(e7.getResult()))
                : (typeof e7 != "number" && typeof e7 != "string") ||
                  (this.result = "".concat(this.result, " - ").concat(FE(e7))),
              (this.lowPriority = !0),
              this
            );
          },
        },
        {
          key: "mul",
          value: function (e7) {
            return (
              this.lowPriority && (this.result = "(".concat(this.result, ")")),
              e7 instanceof t2
                ? (this.result = "".concat(this.result, " * ").concat(e7.getResult(!0)))
                : (typeof e7 != "number" && typeof e7 != "string") ||
                  (this.result = "".concat(this.result, " * ").concat(e7)),
              (this.lowPriority = !1),
              this
            );
          },
        },
        {
          key: "div",
          value: function (e7) {
            return (
              this.lowPriority && (this.result = "(".concat(this.result, ")")),
              e7 instanceof t2
                ? (this.result = "".concat(this.result, " / ").concat(e7.getResult(!0)))
                : (typeof e7 != "number" && typeof e7 != "string") ||
                  (this.result = "".concat(this.result, " / ").concat(e7)),
              (this.lowPriority = !1),
              this
            );
          },
        },
        {
          key: "getResult",
          value: function (e7) {
            return this.lowPriority || e7 ? "(".concat(this.result, ")") : this.result;
          },
        },
        {
          key: "equal",
          value: function (e7) {
            var t3 = this,
              n2 = (e7 || {}).unit,
              r2 = !0;
            return (
              typeof n2 == "boolean"
                ? (r2 = n2)
                : Array.from(this.unitlessCssVar).some(function (e8) {
                    return t3.result.includes(e8);
                  }) && (r2 = !1),
              (this.result = this.result.replace(AE, r2 ? "px" : "")),
              this.lowPriority !== void 0 ? "calc(".concat(this.result, ")") : this.result
            );
          },
        },
      ]),
      t2
    );
  })(),
  jE = (function () {
    NE(t2, LE);
    var e6 = RE(t2);
    function t2(n2) {
      var r2;
      return (
        CE(this, t2),
        SE(OE((r2 = e6.call(this))), "result", 0),
        n2 instanceof t2 ? (r2.result = n2.result) : typeof n2 == "number" && (r2.result = n2),
        r2
      );
    }
    return (
      PE(t2, [
        {
          key: "add",
          value: function (e7) {
            return (
              e7 instanceof t2
                ? (this.result += e7.result)
                : typeof e7 == "number" && (this.result += e7),
              this
            );
          },
        },
        {
          key: "sub",
          value: function (e7) {
            return (
              e7 instanceof t2
                ? (this.result -= e7.result)
                : typeof e7 == "number" && (this.result -= e7),
              this
            );
          },
        },
        {
          key: "mul",
          value: function (e7) {
            return (
              e7 instanceof t2
                ? (this.result *= e7.result)
                : typeof e7 == "number" && (this.result *= e7),
              this
            );
          },
        },
        {
          key: "div",
          value: function (e7) {
            return (
              e7 instanceof t2
                ? (this.result /= e7.result)
                : typeof e7 == "number" && (this.result /= e7),
              this
            );
          },
        },
        {
          key: "equal",
          value: function () {
            return this.result;
          },
        },
      ]),
      t2
    );
  })(),
  DE = function (e6, t2) {
    return "".concat(
      [t2, e6.replace(/([A-Z]+)([A-Z][a-z]+)/g, "$1-$2").replace(/([a-z])([A-Z])/g, "$1-$2")]
        .filter(Boolean)
        .join("-"),
    );
  };
function HE(e6, t2, n2, r2) {
  var o2 = kE({}, t2[e6]);
  r2 != null &&
    r2.deprecatedTokens &&
    r2.deprecatedTokens.forEach(function (e7) {
      var t3,
        n3 = wE(e7, 2),
        r3 = n3[0],
        a3 = n3[1];
      ((o2 != null && o2[r3]) || (o2 != null && o2[a3])) &&
        (((t3 = o2[a3]) !== null && t3 !== void 0) || (o2[a3] = o2?.[r3]));
    });
  var a2 = kE(kE({}, n2), o2);
  return (
    Object.keys(a2).forEach(function (e7) {
      a2[e7] === t2[e7] && delete a2[e7];
    }),
    a2
  );
}
var VE = typeof CSSINJS_STATISTIC < "u",
  BE = !0;
function UE() {
  for (var e6 = arguments.length, t2 = new Array(e6), n2 = 0; n2 < e6; n2++) t2[n2] = arguments[n2];
  if (!VE) return Object.assign.apply(Object, [{}].concat(t2));
  BE = !1;
  var r2 = {};
  return (
    t2.forEach(function (e7) {
      bE(e7) === "object" &&
        Object.keys(e7).forEach(function (t3) {
          Object.defineProperty(r2, t3, {
            configurable: !0,
            enumerable: !0,
            get: function () {
              return e7[t3];
            },
          });
        });
    }),
    (BE = !0),
    r2
  );
}
var WE = {};
function qE() {}
function XE(e6, t2, n2) {
  var r2;
  return typeof n2 == "function"
    ? n2(UE(t2, (r2 = t2[e6]) !== null && r2 !== void 0 ? r2 : {}))
    : (n2 ?? {});
}
var KE = new ((function () {
    function e6() {
      CE(this, e6),
        SE(this, "map", new Map()),
        SE(this, "objectIDMap", new WeakMap()),
        SE(this, "nextID", 0),
        SE(this, "lastAccessBeat", new Map()),
        SE(this, "accessBeat", 0);
    }
    return (
      PE(e6, [
        {
          key: "set",
          value: function (e7, t2) {
            this.clear();
            var n2 = this.getCompositeKey(e7);
            this.map.set(n2, t2), this.lastAccessBeat.set(n2, Date.now());
          },
        },
        {
          key: "get",
          value: function (e7) {
            var t2 = this.getCompositeKey(e7),
              n2 = this.map.get(t2);
            return this.lastAccessBeat.set(t2, Date.now()), (this.accessBeat += 1), n2;
          },
        },
        {
          key: "getCompositeKey",
          value: function (e7) {
            var t2 = this;
            return e7
              .map(function (e8) {
                return e8 && bE(e8) === "object"
                  ? "obj_".concat(t2.getObjectID(e8))
                  : "".concat(bE(e8), "_").concat(e8);
              })
              .join("|");
          },
        },
        {
          key: "getObjectID",
          value: function (e7) {
            if (this.objectIDMap.has(e7)) return this.objectIDMap.get(e7);
            var t2 = this.nextID;
            return this.objectIDMap.set(e7, t2), (this.nextID += 1), t2;
          },
        },
        {
          key: "clear",
          value: function () {
            var e7 = this;
            if (this.accessBeat > 1e4) {
              var t2 = Date.now();
              this.lastAccessBeat.forEach(function (n2, r2) {
                t2 - n2 > 6e5 && (e7.map.delete(r2), e7.lastAccessBeat.delete(r2));
              }),
                (this.accessBeat = 0);
            }
          },
        },
      ]),
      e6
    );
  })())(),
  GE = function () {
    return {};
  };
const YE = [
  "blue",
  "purple",
  "cyan",
  "green",
  "magenta",
  "pink",
  "red",
  "orange",
  "yellow",
  "volcano",
  "geekblue",
  "lime",
  "gold",
];
function QE(e6) {
  return (e6 + 8) / e6;
}
const JE = {
    blue: "#1677FF",
    purple: "#722ED1",
    cyan: "#13C2C2",
    green: "#52C41A",
    magenta: "#EB2F96",
    pink: "#EB2F96",
    red: "#F5222D",
    orange: "#FA8C16",
    yellow: "#FADB14",
    volcano: "#FA541C",
    geekblue: "#2F54EB",
    gold: "#FAAD14",
    lime: "#A0D911",
  },
  ZE = {
    ...JE,
    colorPrimary: "#1677ff",
    colorSuccess: "#52c41a",
    colorWarning: "#faad14",
    colorError: "#ff4d4f",
    colorInfo: "#1677ff",
    colorLink: "",
    colorTextBase: "",
    colorBgBase: "",
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
'Noto Color Emoji'`,
    fontFamilyCode: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
    fontSize: 14,
    lineWidth: 1,
    lineType: "solid",
    motionUnit: 0.1,
    motionBase: 0,
    motionEaseOutCirc: "cubic-bezier(0.08, 0.82, 0.17, 1)",
    motionEaseInOutCirc: "cubic-bezier(0.78, 0.14, 0.15, 0.86)",
    motionEaseOut: "cubic-bezier(0.215, 0.61, 0.355, 1)",
    motionEaseInOut: "cubic-bezier(0.645, 0.045, 0.355, 1)",
    motionEaseOutBack: "cubic-bezier(0.12, 0.4, 0.29, 1.46)",
    motionEaseInBack: "cubic-bezier(0.71, -0.46, 0.88, 0.6)",
    motionEaseInQuint: "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
    motionEaseOutQuint: "cubic-bezier(0.23, 1, 0.32, 1)",
    borderRadius: 6,
    sizeUnit: 4,
    sizeStep: 4,
    sizePopupArrow: 16,
    controlHeight: 32,
    zIndexBase: 0,
    zIndexPopupBase: 1e3,
    opacityImage: 1,
    wireframe: !1,
    focusOutline: !0,
    motion: !0,
  },
  eS = {
    aliceblue: "9ehhb",
    antiquewhite: "9sgk7",
    aqua: "1ekf",
    aquamarine: "4zsno",
    azure: "9eiv3",
    beige: "9lhp8",
    bisque: "9zg04",
    black: "0",
    blanchedalmond: "9zhe5",
    blue: "73",
    blueviolet: "5e31e",
    brown: "6g016",
    burlywood: "8ouiv",
    cadetblue: "3qba8",
    chartreuse: "4zshs",
    chocolate: "87k0u",
    coral: "9yvyo",
    cornflowerblue: "3xael",
    cornsilk: "9zjz0",
    crimson: "8l4xo",
    cyan: "1ekf",
    darkblue: "3v",
    darkcyan: "rkb",
    darkgoldenrod: "776yz",
    darkgray: "6mbhl",
    darkgreen: "jr4",
    darkgrey: "6mbhl",
    darkkhaki: "7ehkb",
    darkmagenta: "5f91n",
    darkolivegreen: "3bzfz",
    darkorange: "9yygw",
    darkorchid: "5z6x8",
    darkred: "5f8xs",
    darksalmon: "9441m",
    darkseagreen: "5lwgf",
    darkslateblue: "2th1n",
    darkslategray: "1ugcv",
    darkslategrey: "1ugcv",
    darkturquoise: "14up",
    darkviolet: "5rw7n",
    deeppink: "9yavn",
    deepskyblue: "11xb",
    dimgray: "442g9",
    dimgrey: "442g9",
    dodgerblue: "16xof",
    firebrick: "6y7tu",
    floralwhite: "9zkds",
    forestgreen: "1cisi",
    fuchsia: "9y70f",
    gainsboro: "8m8kc",
    ghostwhite: "9pq0v",
    goldenrod: "8j4f4",
    gold: "9zda8",
    gray: "50i2o",
    green: "pa8",
    greenyellow: "6senj",
    grey: "50i2o",
    honeydew: "9eiuo",
    hotpink: "9yrp0",
    indianred: "80gnw",
    indigo: "2xcoy",
    ivory: "9zldc",
    khaki: "9edu4",
    lavenderblush: "9ziet",
    lavender: "90c8q",
    lawngreen: "4vk74",
    lemonchiffon: "9zkct",
    lightblue: "6s73a",
    lightcoral: "9dtog",
    lightcyan: "8s1rz",
    lightgoldenrodyellow: "9sjiq",
    lightgray: "89jo3",
    lightgreen: "5nkwg",
    lightgrey: "89jo3",
    lightpink: "9z6wx",
    lightsalmon: "9z2ii",
    lightseagreen: "19xgq",
    lightskyblue: "5arju",
    lightslategray: "4nwk9",
    lightslategrey: "4nwk9",
    lightsteelblue: "6wau6",
    lightyellow: "9zlcw",
    lime: "1edc",
    limegreen: "1zcxe",
    linen: "9shk6",
    magenta: "9y70f",
    maroon: "4zsow",
    mediumaquamarine: "40eju",
    mediumblue: "5p",
    mediumorchid: "79qkz",
    mediumpurple: "5r3rv",
    mediumseagreen: "2d9ip",
    mediumslateblue: "4tcku",
    mediumspringgreen: "1di2",
    mediumturquoise: "2uabw",
    mediumvioletred: "7rn9h",
    midnightblue: "z980",
    mintcream: "9ljp6",
    mistyrose: "9zg0x",
    moccasin: "9zfzp",
    navajowhite: "9zest",
    navy: "3k",
    oldlace: "9wq92",
    olive: "50hz4",
    olivedrab: "472ub",
    orange: "9z3eo",
    orangered: "9ykg0",
    orchid: "8iu3a",
    palegoldenrod: "9bl4a",
    palegreen: "5yw0o",
    paleturquoise: "6v4ku",
    palevioletred: "8k8lv",
    papayawhip: "9zi6t",
    peachpuff: "9ze0p",
    peru: "80oqn",
    pink: "9z8wb",
    plum: "8nba5",
    powderblue: "6wgdi",
    purple: "4zssg",
    rebeccapurple: "3zk49",
    red: "9y6tc",
    rosybrown: "7cv4f",
    royalblue: "2jvtt",
    saddlebrown: "5fmkz",
    salmon: "9rvci",
    sandybrown: "9jn1c",
    seagreen: "1tdnb",
    seashell: "9zje6",
    sienna: "6973h",
    silver: "7ir40",
    skyblue: "5arjf",
    slateblue: "45e4t",
    slategray: "4e100",
    slategrey: "4e100",
    snow: "9zke2",
    springgreen: "1egv",
    steelblue: "2r1kk",
    tan: "87yx8",
    teal: "pds",
    thistle: "8ggk8",
    tomato: "9yqfb",
    turquoise: "2j4r4",
    violet: "9b10u",
    wheat: "9ld4j",
    white: "9zldr",
    whitesmoke: "9lhpx",
    yellow: "9zl6o",
    yellowgreen: "61fzm",
  },
  tS = Math.round;
function nS(e6, t2) {
  const n2 =
      e6
        .replace(/^[^(]*\((.*)/, "$1")
        .replace(/\).*/, "")
        .match(/\d*\.?\d+%?/g) || [],
    r2 = n2.map((e7) => parseFloat(e7));
  for (let o2 = 0; o2 < 3; o2 += 1) r2[o2] = t2(r2[o2] || 0, n2[o2] || "", o2);
  return n2[3] ? (r2[3] = n2[3].includes("%") ? r2[3] / 100 : r2[3]) : (r2[3] = 1), r2;
}
const rS = (e6, t2, n2) => (n2 === 0 ? e6 : e6 / 100);
function oS(e6, t2) {
  const n2 = t2 || 255;
  return e6 > n2 ? n2 : e6 < 0 ? 0 : e6;
}
class aS {
  constructor(e6) {
    function t2(t3) {
      return t3[0] in e6 && t3[1] in e6 && t3[2] in e6;
    }
    if (
      (n(this, "isValid", !0),
      n(this, "r", 0),
      n(this, "g", 0),
      n(this, "b", 0),
      n(this, "a", 1),
      n(this, "_h"),
      n(this, "_hsl_s"),
      n(this, "_hsv_s"),
      n(this, "_l"),
      n(this, "_v"),
      n(this, "_max"),
      n(this, "_min"),
      n(this, "_brightness"),
      e6)
    )
      if (typeof e6 == "string") {
        let t3 = function (e7) {
          return n2.startsWith(e7);
        };
        const n2 = e6.trim();
        if (/^#?[A-F\d]{3,8}$/i.test(n2)) this.fromHexString(n2);
        else if (t3("rgb")) this.fromRgbString(n2);
        else if (t3("hsl")) this.fromHslString(n2);
        else if (t3("hsv") || t3("hsb")) this.fromHsvString(n2);
        else {
          const e7 = eS[n2.toLowerCase()];
          e7 && this.fromHexString(parseInt(e7, 36).toString(16).padStart(6, "0"));
        }
      } else if (e6 instanceof aS)
        (this.r = e6.r),
          (this.g = e6.g),
          (this.b = e6.b),
          (this.a = e6.a),
          (this._h = e6._h),
          (this._hsl_s = e6._hsl_s),
          (this._hsv_s = e6._hsv_s),
          (this._l = e6._l),
          (this._v = e6._v);
      else if (t2("rgb"))
        (this.r = oS(e6.r)),
          (this.g = oS(e6.g)),
          (this.b = oS(e6.b)),
          (this.a = typeof e6.a == "number" ? oS(e6.a, 1) : 1);
      else if (t2("hsl")) this.fromHsl(e6);
      else {
        if (!t2("hsv"))
          throw new Error("@ant-design/fast-color: unsupported input " + JSON.stringify(e6));
        this.fromHsv(e6);
      }
  }
  setR(e6) {
    return this._sc("r", e6);
  }
  setG(e6) {
    return this._sc("g", e6);
  }
  setB(e6) {
    return this._sc("b", e6);
  }
  setA(e6) {
    return this._sc("a", e6, 1);
  }
  setHue(e6) {
    const t2 = this.toHsv();
    return (t2.h = e6), this._c(t2);
  }
  getLuminance() {
    function e6(e7) {
      const t2 = e7 / 255;
      return t2 <= 0.03928 ? t2 / 12.92 : Math.pow((t2 + 0.055) / 1.055, 2.4);
    }
    return 0.2126 * e6(this.r) + 0.7152 * e6(this.g) + 0.0722 * e6(this.b);
  }
  getHue() {
    if (this._h === void 0) {
      const e6 = this.getMax() - this.getMin();
      this._h =
        e6 === 0
          ? 0
          : tS(
              60 *
                (this.r === this.getMax()
                  ? (this.g - this.b) / e6 + (this.g < this.b ? 6 : 0)
                  : this.g === this.getMax()
                    ? (this.b - this.r) / e6 + 2
                    : (this.r - this.g) / e6 + 4),
            );
    }
    return this._h;
  }
  getSaturation() {
    return this.getHSVSaturation();
  }
  getHSVSaturation() {
    if (this._hsv_s === void 0) {
      const e6 = this.getMax() - this.getMin();
      this._hsv_s = e6 === 0 ? 0 : e6 / this.getMax();
    }
    return this._hsv_s;
  }
  getHSLSaturation() {
    if (this._hsl_s === void 0) {
      const e6 = this.getMax() - this.getMin();
      if (e6 === 0) this._hsl_s = 0;
      else {
        const t2 = this.getLightness();
        this._hsl_s = e6 / 255 / (1 - Math.abs(2 * t2 - 1));
      }
    }
    return this._hsl_s;
  }
  getLightness() {
    return this._l === void 0 && (this._l = (this.getMax() + this.getMin()) / 510), this._l;
  }
  getValue() {
    return this._v === void 0 && (this._v = this.getMax() / 255), this._v;
  }
  getBrightness() {
    return (
      this._brightness === void 0 &&
        (this._brightness = (299 * this.r + 587 * this.g + 114 * this.b) / 1e3),
      this._brightness
    );
  }
  darken(e6 = 10) {
    const t2 = this.getHue(),
      n2 = this.getSaturation();
    let r2 = this.getLightness() - e6 / 100;
    return r2 < 0 && (r2 = 0), this._c({ h: t2, s: n2, l: r2, a: this.a });
  }
  lighten(e6 = 10) {
    const t2 = this.getHue(),
      n2 = this.getSaturation();
    let r2 = this.getLightness() + e6 / 100;
    return r2 > 1 && (r2 = 1), this._c({ h: t2, s: n2, l: r2, a: this.a });
  }
  mix(e6, t2 = 50) {
    const n2 = this._c(e6),
      r2 = t2 / 100,
      o2 = (e7) => (n2[e7] - this[e7]) * r2 + this[e7],
      a2 = { r: tS(o2("r")), g: tS(o2("g")), b: tS(o2("b")), a: tS(100 * o2("a")) / 100 };
    return this._c(a2);
  }
  tint(e6 = 10) {
    return this.mix({ r: 255, g: 255, b: 255, a: 1 }, e6);
  }
  shade(e6 = 10) {
    return this.mix({ r: 0, g: 0, b: 0, a: 1 }, e6);
  }
  onBackground(e6) {
    const t2 = this._c(e6),
      n2 = this.a + t2.a * (1 - this.a),
      r2 = (e7) => tS((this[e7] * this.a + t2[e7] * t2.a * (1 - this.a)) / n2);
    return this._c({ r: r2("r"), g: r2("g"), b: r2("b"), a: n2 });
  }
  isDark() {
    return this.getBrightness() < 128;
  }
  isLight() {
    return this.getBrightness() >= 128;
  }
  equals(e6) {
    return this.r === e6.r && this.g === e6.g && this.b === e6.b && this.a === e6.a;
  }
  clone() {
    return this._c(this);
  }
  toHexString() {
    let e6 = "#";
    const t2 = (this.r || 0).toString(16);
    e6 += t2.length === 2 ? t2 : "0" + t2;
    const n2 = (this.g || 0).toString(16);
    e6 += n2.length === 2 ? n2 : "0" + n2;
    const r2 = (this.b || 0).toString(16);
    if (
      ((e6 += r2.length === 2 ? r2 : "0" + r2),
      typeof this.a == "number" && this.a >= 0 && this.a < 1)
    ) {
      const t3 = tS(255 * this.a).toString(16);
      e6 += t3.length === 2 ? t3 : "0" + t3;
    }
    return e6;
  }
  toHsl() {
    return { h: this.getHue(), s: this.getHSLSaturation(), l: this.getLightness(), a: this.a };
  }
  toHslString() {
    const e6 = this.getHue(),
      t2 = tS(100 * this.getHSLSaturation()),
      n2 = tS(100 * this.getLightness());
    return this.a !== 1 ? `hsla(${e6},${t2}%,${n2}%,${this.a})` : `hsl(${e6},${t2}%,${n2}%)`;
  }
  toHsv() {
    return { h: this.getHue(), s: this.getHSVSaturation(), v: this.getValue(), a: this.a };
  }
  toRgb() {
    return { r: this.r, g: this.g, b: this.b, a: this.a };
  }
  toRgbString() {
    return this.a !== 1
      ? `rgba(${this.r},${this.g},${this.b},${this.a})`
      : `rgb(${this.r},${this.g},${this.b})`;
  }
  toString() {
    return this.toRgbString();
  }
  _sc(e6, t2, n2) {
    const r2 = this.clone();
    return (r2[e6] = oS(t2, n2)), r2;
  }
  _c(e6) {
    return new this.constructor(e6);
  }
  getMax() {
    return this._max === void 0 && (this._max = Math.max(this.r, this.g, this.b)), this._max;
  }
  getMin() {
    return this._min === void 0 && (this._min = Math.min(this.r, this.g, this.b)), this._min;
  }
  fromHexString(e6) {
    const t2 = e6.replace("#", "");
    function n2(e7, n3) {
      return parseInt(t2[e7] + t2[n3 || e7], 16);
    }
    t2.length < 6
      ? ((this.r = n2(0)), (this.g = n2(1)), (this.b = n2(2)), (this.a = t2[3] ? n2(3) / 255 : 1))
      : ((this.r = n2(0, 1)),
        (this.g = n2(2, 3)),
        (this.b = n2(4, 5)),
        (this.a = t2[6] ? n2(6, 7) / 255 : 1));
  }
  fromHsl({ h: e6, s: t2, l: n2, a: r2 }) {
    const o2 = ((e6 % 360) + 360) % 360;
    if (
      ((this._h = o2),
      (this._hsl_s = t2),
      (this._l = n2),
      (this.a = typeof r2 == "number" ? r2 : 1),
      t2 <= 0)
    ) {
      const e7 = tS(255 * n2);
      return (this.r = e7), (this.g = e7), void (this.b = e7);
    }
    let a2 = 0,
      l2 = 0,
      i2 = 0;
    const s2 = o2 / 60,
      u2 = (1 - Math.abs(2 * n2 - 1)) * t2,
      c2 = u2 * (1 - Math.abs((s2 % 2) - 1));
    s2 >= 0 && s2 < 1
      ? ((a2 = u2), (l2 = c2))
      : s2 >= 1 && s2 < 2
        ? ((a2 = c2), (l2 = u2))
        : s2 >= 2 && s2 < 3
          ? ((l2 = u2), (i2 = c2))
          : s2 >= 3 && s2 < 4
            ? ((l2 = c2), (i2 = u2))
            : s2 >= 4 && s2 < 5
              ? ((a2 = c2), (i2 = u2))
              : s2 >= 5 && s2 < 6 && ((a2 = u2), (i2 = c2));
    const d2 = n2 - u2 / 2;
    (this.r = tS(255 * (a2 + d2))), (this.g = tS(255 * (l2 + d2))), (this.b = tS(255 * (i2 + d2)));
  }
  fromHsv({ h: e6, s: t2, v: n2, a: r2 }) {
    const o2 = ((e6 % 360) + 360) % 360;
    (this._h = o2), (this._hsv_s = t2), (this._v = n2), (this.a = typeof r2 == "number" ? r2 : 1);
    const a2 = tS(255 * n2);
    if (((this.r = a2), (this.g = a2), (this.b = a2), t2 <= 0)) return;
    const l2 = o2 / 60,
      i2 = Math.floor(l2),
      s2 = l2 - i2,
      u2 = tS(n2 * (1 - t2) * 255),
      c2 = tS(n2 * (1 - t2 * s2) * 255),
      d2 = tS(n2 * (1 - t2 * (1 - s2)) * 255);
    switch (i2) {
      case 0:
        (this.g = d2), (this.b = u2);
        break;
      case 1:
        (this.r = c2), (this.b = u2);
        break;
      case 2:
        (this.r = u2), (this.b = d2);
        break;
      case 3:
        (this.r = u2), (this.g = c2);
        break;
      case 4:
        (this.r = d2), (this.g = u2);
        break;
      default:
        (this.g = u2), (this.b = c2);
    }
  }
  fromHsvString(e6) {
    const t2 = nS(e6, rS);
    this.fromHsv({ h: t2[0], s: t2[1], v: t2[2], a: t2[3] });
  }
  fromHslString(e6) {
    const t2 = nS(e6, rS);
    this.fromHsl({ h: t2[0], s: t2[1], l: t2[2], a: t2[3] });
  }
  fromRgbString(e6) {
    const t2 = nS(e6, (e7, t3) => (t3.includes("%") ? tS((e7 / 100) * 255) : e7));
    (this.r = t2[0]), (this.g = t2[1]), (this.b = t2[2]), (this.a = t2[3]);
  }
}
const lS = [
  { index: 7, amount: 15 },
  { index: 6, amount: 25 },
  { index: 5, amount: 30 },
  { index: 5, amount: 45 },
  { index: 5, amount: 65 },
  { index: 5, amount: 85 },
  { index: 4, amount: 90 },
  { index: 3, amount: 95 },
  { index: 2, amount: 97 },
  { index: 1, amount: 98 },
];
function iS(e6, t2, n2) {
  let r2;
  return (
    (r2 =
      Math.round(e6.h) >= 60 && Math.round(e6.h) <= 240
        ? n2
          ? Math.round(e6.h) - 2 * t2
          : Math.round(e6.h) + 2 * t2
        : n2
          ? Math.round(e6.h) + 2 * t2
          : Math.round(e6.h) - 2 * t2),
    r2 < 0 ? (r2 += 360) : r2 >= 360 && (r2 -= 360),
    r2
  );
}
function sS(e6, t2, n2) {
  if (e6.h === 0 && e6.s === 0) return e6.s;
  let r2;
  return (
    (r2 = n2 ? e6.s - 0.16 * t2 : t2 === 4 ? e6.s + 0.16 : e6.s + 0.05 * t2),
    r2 > 1 && (r2 = 1),
    n2 && t2 === 5 && r2 > 0.1 && (r2 = 0.1),
    r2 < 0.06 && (r2 = 0.06),
    Math.round(100 * r2) / 100
  );
}
function uS(e6, t2, n2) {
  let r2;
  return (
    (r2 = n2 ? e6.v + 0.05 * t2 : e6.v - 0.15 * t2),
    (r2 = Math.max(0, Math.min(1, r2))),
    Math.round(100 * r2) / 100
  );
}
function cS(e6, t2 = {}) {
  const n2 = [],
    r2 = new aS(e6),
    o2 = r2.toHsv();
  for (let a2 = 5; a2 > 0; a2 -= 1) {
    const e7 = new aS({ h: iS(o2, a2, !0), s: sS(o2, a2, !0), v: uS(o2, a2, !0) });
    n2.push(e7);
  }
  n2.push(r2);
  for (let a2 = 1; a2 <= 4; a2 += 1) {
    const e7 = new aS({ h: iS(o2, a2), s: sS(o2, a2), v: uS(o2, a2) });
    n2.push(e7);
  }
  return t2.theme === "dark"
    ? lS.map(({ index: e7, amount: r3 }) =>
        new aS(t2.backgroundColor || "#141414").mix(n2[e7], r3).toHexString(),
      )
    : n2.map((e7) => e7.toHexString());
}
const dS = {
    red: "#F5222D",
    volcano: "#FA541C",
    orange: "#FA8C16",
    gold: "#FAAD14",
    yellow: "#FADB14",
    lime: "#A0D911",
    green: "#52C41A",
    cyan: "#13C2C2",
    blue: "#1677FF",
    geekblue: "#2F54EB",
    purple: "#722ED1",
    magenta: "#EB2F96",
    grey: "#666666",
  },
  fS = [
    "#fff1f0",
    "#ffccc7",
    "#ffa39e",
    "#ff7875",
    "#ff4d4f",
    "#f5222d",
    "#cf1322",
    "#a8071a",
    "#820014",
    "#5c0011",
  ];
fS.primary = fS[5];
const pS = [
  "#fff2e8",
  "#ffd8bf",
  "#ffbb96",
  "#ff9c6e",
  "#ff7a45",
  "#fa541c",
  "#d4380d",
  "#ad2102",
  "#871400",
  "#610b00",
];
pS.primary = pS[5];
const hS = [
  "#fff7e6",
  "#ffe7ba",
  "#ffd591",
  "#ffc069",
  "#ffa940",
  "#fa8c16",
  "#d46b08",
  "#ad4e00",
  "#873800",
  "#612500",
];
hS.primary = hS[5];
const mS = [
  "#fffbe6",
  "#fff1b8",
  "#ffe58f",
  "#ffd666",
  "#ffc53d",
  "#faad14",
  "#d48806",
  "#ad6800",
  "#874d00",
  "#613400",
];
mS.primary = mS[5];
const gS = [
  "#feffe6",
  "#ffffb8",
  "#fffb8f",
  "#fff566",
  "#ffec3d",
  "#fadb14",
  "#d4b106",
  "#ad8b00",
  "#876800",
  "#614700",
];
gS.primary = gS[5];
const vS = [
  "#fcffe6",
  "#f4ffb8",
  "#eaff8f",
  "#d3f261",
  "#bae637",
  "#a0d911",
  "#7cb305",
  "#5b8c00",
  "#3f6600",
  "#254000",
];
vS.primary = vS[5];
const yS = [
  "#f6ffed",
  "#d9f7be",
  "#b7eb8f",
  "#95de64",
  "#73d13d",
  "#52c41a",
  "#389e0d",
  "#237804",
  "#135200",
  "#092b00",
];
yS.primary = yS[5];
const bS = [
  "#e6fffb",
  "#b5f5ec",
  "#87e8de",
  "#5cdbd3",
  "#36cfc9",
  "#13c2c2",
  "#08979c",
  "#006d75",
  "#00474f",
  "#002329",
];
bS.primary = bS[5];
const wS = [
  "#e6f4ff",
  "#bae0ff",
  "#91caff",
  "#69b1ff",
  "#4096ff",
  "#1677ff",
  "#0958d9",
  "#003eb3",
  "#002c8c",
  "#001d66",
];
wS.primary = wS[5];
const ES = [
  "#f0f5ff",
  "#d6e4ff",
  "#adc6ff",
  "#85a5ff",
  "#597ef7",
  "#2f54eb",
  "#1d39c4",
  "#10239e",
  "#061178",
  "#030852",
];
ES.primary = ES[5];
const SS = [
  "#f9f0ff",
  "#efdbff",
  "#d3adf7",
  "#b37feb",
  "#9254de",
  "#722ed1",
  "#531dab",
  "#391085",
  "#22075e",
  "#120338",
];
SS.primary = SS[5];
const xS = [
  "#fff0f6",
  "#ffd6e7",
  "#ffadd2",
  "#ff85c0",
  "#f759ab",
  "#eb2f96",
  "#c41d7f",
  "#9e1068",
  "#780650",
  "#520339",
];
xS.primary = xS[5];
const kS = [
  "#a6a6a6",
  "#999999",
  "#8c8c8c",
  "#808080",
  "#737373",
  "#666666",
  "#404040",
  "#1a1a1a",
  "#000000",
  "#000000",
];
kS.primary = kS[5];
const CS = {
  red: fS,
  volcano: pS,
  orange: hS,
  gold: mS,
  yellow: gS,
  lime: vS,
  green: yS,
  cyan: bS,
  blue: wS,
  geekblue: ES,
  purple: SS,
  magenta: xS,
  grey: kS,
};
function _S(e6, { generateColorPalettes: t2, generateNeutralColorPalettes: n2 }) {
  const {
      colorSuccess: r2,
      colorWarning: o2,
      colorError: a2,
      colorInfo: l2,
      colorPrimary: i2,
      colorBgBase: s2,
      colorTextBase: u2,
    } = e6,
    c2 = t2(i2),
    d2 = t2(r2),
    f2 = t2(o2),
    p2 = t2(a2),
    h2 = t2(l2),
    m2 = n2(s2, u2),
    g2 = e6.colorLink || e6.colorInfo,
    v2 = t2(g2),
    y2 = new aS(p2[1]).mix(new aS(p2[3]), 50).toHexString(),
    b2 = {};
  return (
    YE.forEach((n3) => {
      const r3 = e6[n3];
      if (r3) {
        const e7 = t2(r3);
        (b2[`${n3}Hover`] = e7[5]), (b2[`${n3}Active`] = e7[7]);
      }
    }),
    {
      ...m2,
      colorPrimaryBg: c2[1],
      colorPrimaryBgHover: c2[2],
      colorPrimaryBorder: c2[3],
      colorPrimaryBorderHover: c2[4],
      colorPrimaryHover: c2[5],
      colorPrimary: c2[6],
      colorPrimaryActive: c2[7],
      colorPrimaryTextHover: c2[8],
      colorPrimaryText: c2[9],
      colorPrimaryTextActive: c2[10],
      colorSuccessBg: d2[1],
      colorSuccessBgHover: d2[2],
      colorSuccessBorder: d2[3],
      colorSuccessBorderHover: d2[4],
      colorSuccessHover: d2[4],
      colorSuccess: d2[6],
      colorSuccessActive: d2[7],
      colorSuccessTextHover: d2[8],
      colorSuccessText: d2[9],
      colorSuccessTextActive: d2[10],
      colorErrorBg: p2[1],
      colorErrorBgHover: p2[2],
      colorErrorBgFilledHover: y2,
      colorErrorBgActive: p2[3],
      colorErrorBorder: p2[3],
      colorErrorBorderHover: p2[4],
      colorErrorHover: p2[5],
      colorError: p2[6],
      colorErrorActive: p2[7],
      colorErrorTextHover: p2[8],
      colorErrorText: p2[9],
      colorErrorTextActive: p2[10],
      colorWarningBg: f2[1],
      colorWarningBgHover: f2[2],
      colorWarningBorder: f2[3],
      colorWarningBorderHover: f2[4],
      colorWarningHover: f2[4],
      colorWarning: f2[6],
      colorWarningActive: f2[7],
      colorWarningTextHover: f2[8],
      colorWarningText: f2[9],
      colorWarningTextActive: f2[10],
      colorInfoBg: h2[1],
      colorInfoBgHover: h2[2],
      colorInfoBorder: h2[3],
      colorInfoBorderHover: h2[4],
      colorInfoHover: h2[4],
      colorInfo: h2[6],
      colorInfoActive: h2[7],
      colorInfoTextHover: h2[8],
      colorInfoText: h2[9],
      colorInfoTextActive: h2[10],
      colorLinkHover: v2[4],
      colorLink: v2[6],
      colorLinkActive: v2[7],
      ...b2,
      colorBgMask: new aS("#000").setA(0.45).toRgbString(),
      colorWhite: "#fff",
    }
  );
}
const PS = (e6) => {
  let t2 = e6,
    n2 = e6,
    r2 = e6,
    o2 = e6;
  return (
    e6 < 6 && e6 >= 5 ? (t2 = e6 + 1) : e6 < 16 && e6 >= 6 ? (t2 = e6 + 2) : e6 >= 16 && (t2 = 16),
    e6 < 7 && e6 >= 5
      ? (n2 = 4)
      : e6 < 8 && e6 >= 7
        ? (n2 = 5)
        : e6 < 14 && e6 >= 8
          ? (n2 = 6)
          : e6 < 16 && e6 >= 14
            ? (n2 = 7)
            : e6 >= 16 && (n2 = 8),
    e6 < 6 && e6 >= 2 ? (r2 = 1) : e6 >= 6 && (r2 = 2),
    e6 > 4 && e6 < 8 ? (o2 = 4) : e6 >= 8 && (o2 = 6),
    {
      borderRadius: e6,
      borderRadiusXS: r2,
      borderRadiusSM: n2,
      borderRadiusLG: t2,
      borderRadiusOuter: o2,
    }
  );
};
function OS(e6) {
  const { motionUnit: t2, motionBase: n2, borderRadius: r2, lineWidth: o2 } = e6;
  return {
    motionDurationFast: `${(n2 + t2).toFixed(1)}s`,
    motionDurationMid: `${(n2 + 2 * t2).toFixed(1)}s`,
    motionDurationSlow: `${(n2 + 3 * t2).toFixed(1)}s`,
    lineWidthBold: o2 + 1,
    ...PS(r2),
  };
}
const TS = (e6) => {
    const { controlHeight: t2 } = e6;
    return { controlHeightSM: 0.75 * t2, controlHeightXS: 0.5 * t2, controlHeightLG: 1.25 * t2 };
  },
  NS = (e6) => {
    const t2 = (function (e7) {
        const t3 = Array.from({ length: 10 }).map((t4, n3) => {
          const r3 = n3 - 1,
            o3 = e7 * Math.E ** (r3 / 5),
            a3 = n3 > 1 ? Math.floor(o3) : Math.ceil(o3);
          return 2 * Math.floor(a3 / 2);
        });
        return (t3[1] = e7), t3.map((e8) => ({ size: e8, lineHeight: QE(e8) }));
      })(e6),
      n2 = t2.map((e7) => e7.size),
      r2 = t2.map((e7) => e7.lineHeight),
      o2 = n2[1],
      a2 = n2[0],
      l2 = n2[2],
      i2 = r2[1],
      s2 = r2[0],
      u2 = r2[2];
    return {
      fontSizeSM: a2,
      fontSize: o2,
      fontSizeLG: l2,
      fontSizeXL: n2[3],
      fontSizeHeading1: n2[6],
      fontSizeHeading2: n2[5],
      fontSizeHeading3: n2[4],
      fontSizeHeading4: n2[3],
      fontSizeHeading5: n2[2],
      lineHeight: i2,
      lineHeightLG: u2,
      lineHeightSM: s2,
      fontHeight: Math.round(i2 * o2),
      fontHeightLG: Math.round(u2 * l2),
      fontHeightSM: Math.round(s2 * a2),
      lineHeightHeading1: r2[6],
      lineHeightHeading2: r2[5],
      lineHeightHeading3: r2[4],
      lineHeightHeading4: r2[3],
      lineHeightHeading5: r2[2],
    };
  };
function $S(e6) {
  const { sizeUnit: t2, sizeStep: n2 } = e6;
  return {
    sizeXXL: t2 * (n2 + 8),
    sizeXL: t2 * (n2 + 4),
    sizeLG: t2 * (n2 + 2),
    sizeMD: t2 * (n2 + 1),
    sizeMS: t2 * n2,
    size: t2 * n2,
    sizeSM: t2 * (n2 - 1),
    sizeXS: t2 * (n2 - 2),
    sizeXXS: t2 * (n2 - 3),
  };
}
const MS = (e6, t2) => new aS(e6).setA(t2).toRgbString(),
  RS = (e6, t2) => new aS(e6).darken(t2).toHexString(),
  LS = (e6) => {
    const t2 = cS(e6);
    return {
      1: t2[0],
      2: t2[1],
      3: t2[2],
      4: t2[3],
      5: t2[4],
      6: t2[5],
      7: t2[6],
      8: t2[4],
      9: t2[5],
      10: t2[6],
    };
  },
  IS = (e6, t2, n2) => {
    const r2 = e6 || "#fff",
      o2 = t2 || "#000";
    return {
      colorBgBase: r2,
      colorTextBase: o2,
      colorShadow: n2 || "#000",
      colorText: MS(o2, 0.88),
      colorTextSecondary: MS(o2, 0.65),
      colorTextTertiary: MS(o2, 0.45),
      colorTextQuaternary: MS(o2, 0.25),
      colorFill: MS(o2, 0.15),
      colorFillSecondary: MS(o2, 0.06),
      colorFillTertiary: MS(o2, 0.04),
      colorFillQuaternary: MS(o2, 0.02),
      colorBgSolid: MS(o2, 1),
      colorBgSolidHover: MS(o2, 0.75),
      colorBgSolidActive: MS(o2, 0.95),
      colorBgLayout: RS(r2, 4),
      colorBgContainer: RS(r2, 0),
      colorBgElevated: RS(r2, 0),
      colorBgSpotlight: MS(o2, 0.85),
      colorBgBlur: "transparent",
      colorBorder: RS(r2, 15),
      colorBorderDisabled: RS(r2, 15),
      colorBorderSecondary: RS(r2, 6),
    };
  },
  AS = Wb(function (e6) {
    (dS.pink = dS.magenta), (CS.pink = CS.magenta);
    const t2 = Object.keys(JE)
      .map((t3) => {
        const n2 = e6[t3] === dS[t3] ? CS[t3] : cS(e6[t3]);
        return Array.from({ length: 10 }, () => 1).reduce(
          (e7, r2, o2) => ((e7[`${t3}-${o2 + 1}`] = n2[o2]), (e7[`${t3}${o2 + 1}`] = n2[o2]), e7),
          {},
        );
      })
      .reduce((e7, t3) => (e7 = { ...e7, ...t3 }), {});
    return {
      ...e6,
      ...t2,
      ..._S(e6, { generateColorPalettes: LS, generateNeutralColorPalettes: IS }),
      ...NS(e6.fontSize),
      ...$S(e6),
      ...TS(e6),
      ...OS(e6),
    };
  }),
  FS = { token: ZE, override: { override: ZE }, hashed: !0 },
  zS = i.createContext(FS);
function jS(e6) {
  return e6 >= 0 && e6 <= 255;
}
function DS(e6, t2) {
  const { r: n2, g: r2, b: o2, a: a2 } = new aS(e6).toRgb();
  if (a2 < 1) return e6;
  const { r: l2, g: i2, b: s2 } = new aS(t2).toRgb();
  for (let u2 = 0.01; u2 <= 1; u2 += 0.01) {
    const e7 = Math.round((n2 - l2 * (1 - u2)) / u2),
      t3 = Math.round((r2 - i2 * (1 - u2)) / u2),
      a3 = Math.round((o2 - s2 * (1 - u2)) / u2);
    if (jS(e7) && jS(t3) && jS(a3))
      return new aS({ r: e7, g: t3, b: a3, a: Math.round(100 * u2) / 100 }).toRgbString();
  }
  return new aS({ r: n2, g: r2, b: o2, a: 1 }).toRgbString();
}
const HS = {
    lineHeight: !0,
    lineHeightSM: !0,
    lineHeightLG: !0,
    lineHeightHeading1: !0,
    lineHeightHeading2: !0,
    lineHeightHeading3: !0,
    lineHeightHeading4: !0,
    lineHeightHeading5: !0,
    opacityLoading: !0,
    fontWeightStrong: !0,
    zIndexPopupBase: !0,
    zIndexBase: !0,
    opacityImage: !0,
  },
  VS = { motionBase: !0, motionUnit: !0 },
  BS = {
    screenXS: !0,
    screenXSMin: !0,
    screenXSMax: !0,
    screenSM: !0,
    screenSMMin: !0,
    screenSMMax: !0,
    screenMD: !0,
    screenMDMin: !0,
    screenMDMax: !0,
    screenLG: !0,
    screenLGMin: !0,
    screenLGMax: !0,
    screenXL: !0,
    screenXLMin: !0,
    screenXLMax: !0,
    screenXXL: !0,
    screenXXLMin: !0,
    screenXXLMax: !0,
    screenXXXL: !0,
    screenXXXLMin: !0,
  },
  US = (e6, t2, n2) => {
    const r2 = n2.getDerivativeToken(e6),
      { override: o2, ...a2 } = t2;
    let l2 = { ...r2, override: o2 };
    return (
      (l2 = (function (e7) {
        const { override: t3, ...n3 } = e7,
          r3 = { ...t3 };
        Object.keys(ZE).forEach((e8) => {
          delete r3[e8];
        });
        const o3 = { ...n3, ...r3 },
          a3 = new aS(o3.colorShadow),
          l3 = a3.a,
          i2 = (e8) =>
            a3
              .clone()
              .setA(l3 * e8)
              .toRgbString(),
          s2 = 1200,
          u2 = 1600,
          c2 = 1920;
        if (o3.motion === !1) {
          const e8 = "0s";
          (o3.motionDurationFast = e8), (o3.motionDurationMid = e8), (o3.motionDurationSlow = e8);
        }
        return {
          ...o3,
          colorFillContent: o3.colorFillSecondary,
          colorFillContentHover: o3.colorFill,
          colorFillAlter: o3.colorFillQuaternary,
          colorBgContainerDisabled: o3.colorFillTertiary,
          colorBorderBg: o3.colorBgContainer,
          colorSplit: DS(o3.colorBorderSecondary, o3.colorBgContainer),
          colorTextPlaceholder: o3.colorTextQuaternary,
          colorTextDisabled: o3.colorTextQuaternary,
          colorTextHeading: o3.colorText,
          colorTextLabel: o3.colorTextSecondary,
          colorTextDescription: o3.colorTextTertiary,
          colorTextLightSolid: o3.colorWhite,
          colorHighlight: o3.colorError,
          colorBgTextHover: o3.colorFillSecondary,
          colorBgTextActive: o3.colorFill,
          colorIcon: o3.colorTextTertiary,
          colorIconHover: o3.colorText,
          colorErrorOutline: DS(o3.colorErrorBg, o3.colorBgContainer),
          colorWarningOutline: DS(o3.colorWarningBg, o3.colorBgContainer),
          colorErrorAffix: o3.colorError,
          colorWarningAffix: o3.colorWarning,
          fontHeight: Math.round(o3.fontSize * o3.lineHeight),
          fontHeightSM: Math.round(o3.fontSizeSM * o3.lineHeightSM),
          fontHeightLG: Math.round(o3.fontSizeLG * o3.lineHeightLG),
          fontSizeIcon: o3.fontSizeSM,
          lineWidthFocus: o3.focusOutline === !1 ? 0 : 3 * o3.lineWidth,
          lineWidth: o3.lineWidth,
          controlOutlineWidth: 2 * o3.lineWidth,
          controlInteractiveSize: o3.controlHeight / 2,
          controlItemBgHover: o3.colorFillTertiary,
          controlItemBgActive: o3.colorPrimaryBg,
          controlItemBgActiveHover: o3.colorPrimaryBgHover,
          controlItemBgActiveDisabled: o3.colorFill,
          controlTmpOutline: o3.colorFillQuaternary,
          controlOutline: DS(o3.colorPrimaryBg, o3.colorBgContainer),
          lineType: o3.lineType,
          borderRadius: o3.borderRadius,
          borderRadiusXS: o3.borderRadiusXS,
          borderRadiusSM: o3.borderRadiusSM,
          borderRadiusLG: o3.borderRadiusLG,
          fontWeightStrong: 600,
          opacityLoading: 0.65,
          linkDecoration: "none",
          linkHoverDecoration: "none",
          linkFocusDecoration: "none",
          controlPaddingHorizontal: 12,
          controlPaddingHorizontalSM: 8,
          paddingXXS: o3.sizeXXS,
          paddingXS: o3.sizeXS,
          paddingSM: o3.sizeSM,
          padding: o3.size,
          paddingMD: o3.sizeMD,
          paddingLG: o3.sizeLG,
          paddingXL: o3.sizeXL,
          paddingContentHorizontalLG: o3.sizeLG,
          paddingContentVerticalLG: o3.sizeMS,
          paddingContentHorizontal: o3.sizeMS,
          paddingContentVertical: o3.sizeSM,
          paddingContentHorizontalSM: o3.size,
          paddingContentVerticalSM: o3.sizeXS,
          marginXXS: o3.sizeXXS,
          marginXS: o3.sizeXS,
          marginSM: o3.sizeSM,
          margin: o3.size,
          marginMD: o3.sizeMD,
          marginLG: o3.sizeLG,
          marginXL: o3.sizeXL,
          marginXXL: o3.sizeXXL,
          boxShadow: `
      0 6px 16px 0 ${i2(0.08)},
      0 3px 6px -4px ${i2(0.12)},
      0 9px 28px 8px ${i2(0.05)}
    `,
          boxShadowSecondary: `
      0 6px 16px 0 ${i2(0.08)},
      0 3px 6px -4px ${i2(0.12)},
      0 9px 28px 8px ${i2(0.05)}
    `,
          boxShadowTertiary: `
      0 1px 2px 0 ${i2(0.05)},
      0 1px 6px -1px ${i2(0.03)},
      0 2px 4px 0 ${i2(0.03)}
    `,
          screenXS: 480,
          screenXSMin: 480,
          screenXSMax: 575,
          screenSM: 576,
          screenSMMin: 576,
          screenSMMax: 767,
          screenMD: 768,
          screenMDMin: 768,
          screenMDMax: 991,
          screenLG: 992,
          screenLGMin: 992,
          screenLGMax: 1199,
          screenXL: s2,
          screenXLMin: s2,
          screenXLMax: 1599,
          screenXXL: u2,
          screenXXLMin: u2,
          screenXXLMax: 1919,
          screenXXXL: c2,
          screenXXXLMin: c2,
          boxShadowPopoverArrow: `2px 2px 5px ${i2(0.05)}`,
          dropShadowPopover: `drop-shadow(0 6px 16px ${i2(0.08)}) drop-shadow(0 3px 6px ${i2(0.12)}) drop-shadow(0 9px 28px ${i2(0.05)})`,
          boxShadowCard: `
      0 1px 2px -2px ${i2(0.16)},
      0 3px 6px 0 ${i2(0.12)},
      0 5px 12px 4px ${i2(0.09)}
    `,
          boxShadowDrawerRight: `
      -6px 0 16px 0 ${i2(0.08)},
      -3px 0 6px -4px ${i2(0.12)},
      -9px 0 28px 8px ${i2(0.05)}
    `,
          boxShadowDrawerLeft: `
      6px 0 16px 0 ${i2(0.08)},
      3px 0 6px -4px ${i2(0.12)},
      9px 0 28px 8px ${i2(0.05)}
    `,
          boxShadowDrawerUp: `
      0 6px 16px 0 ${i2(0.08)},
      0 3px 6px -4px ${i2(0.12)},
      0 9px 28px 8px ${i2(0.05)}
    `,
          boxShadowDrawerDown: `
      0 -6px 16px 0 ${i2(0.08)},
      0 -3px 6px -4px ${i2(0.12)},
      0 -9px 28px 8px ${i2(0.05)}
    `,
          boxShadowTabsOverflowLeft: `inset 10px 0 8px -8px ${i2(0.08)}`,
          boxShadowTabsOverflowRight: `inset -10px 0 8px -8px ${i2(0.08)}`,
          boxShadowTabsOverflowTop: `inset 0 10px 8px -8px ${i2(0.08)}`,
          boxShadowTabsOverflowBottom: `inset 0 -10px 8px -8px ${i2(0.08)}`,
          ...r3,
        };
      })(l2)),
      a2 &&
        Object.entries(a2).forEach(([e7, t3]) => {
          const { theme: n3, ...r3 } = t3;
          let o3 = r3;
          n3 && (o3 = US({ ...l2, ...r3 }, { override: r3 }, n3)), (l2[e7] = o3);
        }),
      l2
    );
  };
function WS() {
  const {
      token: e6,
      hashed: t2,
      theme: n2,
      override: r2,
      cssVar: o2,
      zeroRuntime: a2,
    } = i.useContext(zS),
    { csp: l2, getPrefixCls: s2 } = i.useContext(Tb),
    u2 = { prefix: o2?.prefix ?? s2(), key: o2?.key ?? "css-var-root" },
    c2 = `6.6.6-${t2 || ""}`,
    d2 = n2 || AS,
    [f2, p2, h2] = sw(d2, [ZE, e6], {
      salt: c2,
      override: r2,
      getComputedToken: US,
      cssVar: { ...u2, unitless: HS, ignore: VS, preserve: BS },
      nonce: l2?.nonce,
    });
  return [d2, h2, t2 ? p2 : "", f2, u2, !!a2];
}
const qS = { overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" },
  XS = (e6, t2 = !1) => ({
    boxSizing: "border-box",
    margin: 0,
    padding: 0,
    color: e6.colorText,
    fontSize: e6.fontSize,
    lineHeight: e6.lineHeight,
    listStyle: "none",
    fontFamily: t2 ? "inherit" : e6.fontFamily,
  }),
  KS = () => ({
    display: "inline-flex",
    alignItems: "center",
    color: "inherit",
    fontStyle: "normal",
    lineHeight: 0,
    textAlign: "center",
    textTransform: "none",
    verticalAlign: "-0.125em",
    textRendering: "optimizeLegibility",
    "-webkit-font-smoothing": "antialiased",
    "-moz-osx-font-smoothing": "grayscale",
    "> *": { lineHeight: 1 },
    svg: { display: "inline-block", verticalAlign: "inherit" },
  }),
  GS = new vE("loadingCircle", { "100%": { transform: "rotate(360deg)" } }),
  YS = () => ({
    "&::before": { display: "table", content: '""' },
    "&::after": { display: "table", clear: "both", content: '""' },
  }),
  QS = (e6, t2) => ({
    outline: `${Qb(e6.lineWidthFocus)} solid ${e6.colorPrimaryBorder}`,
    outlineOffset: t2 ?? 1,
    transition: ["outline-offset", "outline"].map((e7) => `${e7} 0s`).join(", "),
  }),
  JS = (e6, t2) => ({ "&:focus-visible": QS(e6, t2) }),
  ZS = (e6) => ({
    [`.${e6}`]: {
      display: "inline-flex",
      alignItems: "center",
      color: "inherit",
      fontStyle: "normal",
      lineHeight: 0,
      textAlign: "center",
      textTransform: "none",
      verticalAlign: "-0.125em",
      textRendering: "optimizeLegibility",
      "-webkit-font-smoothing": "antialiased",
      "-moz-osx-font-smoothing": "grayscale",
      "> *": { lineHeight: 1 },
      svg: { display: "inline-block", verticalAlign: "inherit" },
      "&::before": { display: "none" },
      "&[tabindex]": { cursor: "pointer" },
    },
    [`.${e6} .${e6}-icon`]: { display: "block" },
    [`.${e6}-spin`]: {
      animationName: GS,
      animationDuration: "1s",
      animationIterationCount: "infinite",
      animationTimingFunction: "linear",
    },
  }),
  ex = (e6) => ({
    color: e6.colorLink,
    textDecoration: e6.linkDecoration,
    outline: "none",
    cursor: "pointer",
    transition: `all ${e6.motionDurationSlow}`,
    border: 0,
    padding: 0,
    background: "none",
    userSelect: "none",
    ...JS(e6),
    "&:hover": { color: e6.colorLinkHover, textDecoration: e6.linkHoverDecoration },
    "&:focus": { color: e6.colorLinkHover, textDecoration: e6.linkFocusDecoration },
    "&:active": { color: e6.colorLinkActive, textDecoration: e6.linkHoverDecoration },
  }),
  {
    genStyleHooks: tx,
    genComponentStyleHook: nx,
    genSubStyleComponent: rx,
  } = (function (e6) {
    var t2 = e6.useCSP,
      n2 = t2 === void 0 ? GE : t2,
      o2 = e6.useToken,
      a2 = e6.usePrefix,
      l2 = e6.getResetStyles,
      s2 = e6.getCommonStyle,
      u2 = e6.getCompUnitless;
    function c2(t3, u3, c3) {
      var d2 = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {},
        f2 = Array.isArray(t3) ? t3 : [t3, t3],
        p2 = wE(f2, 1)[0],
        h2 = f2.join("-"),
        m2 = e6.layer || { name: "antd" };
      return function (e7) {
        var t4 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e7,
          f3 = o2(),
          g2 = f3.theme,
          v2 = f3.realToken,
          y2 = f3.hashId,
          b2 = f3.token,
          w2 = f3.cssVar,
          E2 = f3.zeroRuntime;
        if (
          r.useMemo(function () {
            return E2;
          }, [])
        )
          return y2;
        var S2,
          x2,
          k2 = a2(),
          C2 = k2.rootPrefixCls,
          _2 = k2.iconPrefixCls,
          P2 = n2(),
          O2 = "css",
          T2 =
            ((S2 = function () {
              var e8 = new Set();
              return (
                Object.keys(d2.unitless || {}).forEach(function (t5) {
                  e8.add(ew(t5, w2.prefix)), e8.add(ew(t5, DE(p2, w2.prefix)));
                }),
                (function (e9, t5) {
                  var n3 = e9 === "css" ? zE : jE;
                  return function (e10) {
                    return new n3(e10, t5);
                  };
                })(O2, e8)
              );
            }),
            (x2 = [O2, p2, w2?.prefix]),
            i.useMemo(function () {
              var e8 = KE.get(x2);
              if (e8) return e8;
              var t5 = S2();
              return KE.set(x2, t5), t5;
            }, x2)),
          N2 = (function (e8) {
            return e8 === "js"
              ? { max: Math.max, min: Math.min }
              : {
                  max: function () {
                    for (var e9 = arguments.length, t5 = new Array(e9), n3 = 0; n3 < e9; n3++)
                      t5[n3] = arguments[n3];
                    return "max(".concat(
                      t5
                        .map(function (e10) {
                          return Qb(e10);
                        })
                        .join(","),
                      ")",
                    );
                  },
                  min: function () {
                    for (var e9 = arguments.length, t5 = new Array(e9), n3 = 0; n3 < e9; n3++)
                      t5[n3] = arguments[n3];
                    return "min(".concat(
                      t5
                        .map(function (e10) {
                          return Qb(e10);
                        })
                        .join(","),
                      ")",
                    );
                  },
                };
          })(O2),
          $2 = N2.max,
          M2 = N2.min,
          R2 = {
            theme: g2,
            token: b2,
            hashId: y2,
            nonce: function () {
              return P2.nonce;
            },
            clientOnly: d2.clientOnly,
            layer: m2,
            order: d2.order || -999,
          };
        return (
          typeof l2 == "function" &&
            gE(kE(kE({}, R2), {}, { clientOnly: !1, path: ["Shared", C2] }), function () {
              return l2(b2, { prefix: { rootPrefixCls: C2, iconPrefixCls: _2 }, csp: P2 });
            }),
          gE(kE(kE({}, R2), {}, { path: [h2, e7, _2] }), function () {
            if (d2.injectStyle === !1) return [];
            var n3 = (function (e8) {
                var t5,
                  n4 = e8,
                  r3 = qE;
                return (
                  VE &&
                    typeof Proxy < "u" &&
                    ((t5 = new Set()),
                    (n4 = new Proxy(e8, {
                      get: function (e9, n5) {
                        var r4;
                        return BE && ((r4 = t5) === null || r4 === void 0 || r4.add(n5)), e9[n5];
                      },
                    })),
                    (r3 = function (e9, n5) {
                      var r4;
                      WE[e9] = {
                        global: Array.from(t5),
                        component: kE(
                          kE({}, (r4 = WE[e9]) === null || r4 === void 0 ? void 0 : r4.component),
                          n5,
                        ),
                      };
                    })),
                  { token: n4, keys: t5, flush: r3 }
                );
              })(b2),
              r2 = n3.token,
              o3 = n3.flush,
              a3 = XE(p2, v2, c3),
              l3 = ".".concat(e7),
              i2 = HE(p2, v2, a3, { deprecatedTokens: d2.deprecatedTokens });
            a3 &&
              bE(a3) === "object" &&
              Object.keys(a3).forEach(function (e8) {
                a3[e8] = "var(".concat(ew(e8, DE(p2, w2.prefix)), ")");
              });
            var f4 = UE(
                r2,
                {
                  componentCls: l3,
                  prefixCls: e7,
                  iconCls: ".".concat(_2),
                  antCls: ".".concat(C2),
                  calc: T2,
                  max: $2,
                  min: M2,
                },
                a3,
              ),
              h3 = u3(f4, { hashId: y2, prefixCls: e7, rootPrefixCls: C2, iconPrefixCls: _2 });
            o3(p2, i2);
            var m3 = typeof s2 == "function" ? s2(f4, e7, t4, d2.resetFont) : null;
            return [d2.resetStyle === !1 ? null : m3, h3];
          }),
          y2
        );
      };
    }
    return {
      genStyleHooks: function (e7, t3, a3, l3) {
        var i2 = Array.isArray(e7) ? e7[0] : e7;
        function s3(e8) {
          return "".concat(String(i2)).concat(e8.slice(0, 1).toUpperCase()).concat(e8.slice(1));
        }
        var d2 = l3?.unitless || {},
          f2 = kE(kE({}, typeof u2 == "function" ? u2(e7) : {}), {}, SE({}, s3("zIndexPopup"), !0));
        Object.keys(d2).forEach(function (e8) {
          f2[s3(e8)] = d2[e8];
        });
        var p2 = kE(kE({}, l3), {}, { unitless: f2, prefixToken: s3 }),
          h2 = c2(e7, t3, a3, p2),
          m2 = (function (e8, t4, a4) {
            var l4 = a4.unitless,
              i3 = a4.prefixToken,
              s4 = a4.ignore;
            return function (u3) {
              var c3 = o2(),
                d3 = c3.cssVar,
                f3 = c3.realToken,
                p3 = n2();
              return (
                ((e9, t5) => {
                  const {
                      key: n3,
                      prefix: o3,
                      unitless: a5,
                      ignore: l5,
                      token: i4,
                      hashId: s5,
                      scope: u4,
                      nonce: c4,
                    } = e9,
                    {
                      cache: { instanceId: d4 },
                      container: f4,
                      hashPriority: p4,
                    } = r.useContext(jb),
                    { _tokenKey: h3 } = i4,
                    m3 = Array.isArray(u4) ? u4.join("@@") : u4,
                    g2 = [...e9.path, n3, m3, h3];
                  ow(
                    "cssVar",
                    g2,
                    () => {
                      const e10 = t5(),
                        [r2, i5] = nw(e10, n3, {
                          prefix: o3,
                          unitless: a5,
                          ignore: l5,
                          scope: u4,
                          hashPriority: p4,
                          hashCls: s5,
                        });
                      return [r2, i5, mE(g2, i5), n3];
                    },
                    ([, , e10]) => {
                      Yb && xy(e10, { mark: Fb, attachTo: f4 });
                    },
                    ([, e10, t6]) => {
                      if (!e10) return;
                      let r2 = { mark: Fb, prepend: "queue", attachTo: f4, priority: -999 };
                      r2 = Zb(r2, c4);
                      const o4 = ky(e10, t6, r2);
                      (o4[zb] = d4), o4.setAttribute(Ab, n3);
                    },
                  );
                })(
                  {
                    path: [e8],
                    prefix: d3.prefix,
                    key: d3.key,
                    unitless: l4,
                    ignore: s4,
                    token: f3,
                    scope: u3,
                    nonce: function () {
                      return p3.nonce;
                    },
                  },
                  function () {
                    var n3 = XE(e8, f3, t4),
                      r2 = HE(e8, f3, n3, { deprecatedTokens: a4?.deprecatedTokens });
                    return (
                      n3 &&
                        Object.keys(n3).forEach(function (e9) {
                          (r2[i3(e9)] = r2[e9]), delete r2[e9];
                        }),
                      r2
                    );
                  },
                ),
                d3?.key
              );
            };
          })(i2, a3, p2);
        return function (e8) {
          var t4 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e8,
            n3 = h2(e8, t4),
            r2 = l3?.extraCssVarPrefixCls,
            o3 = typeof r2 == "function" ? r2({ prefixCls: e8, rootCls: t4 }) : r2;
          return [n3, m2(o3 != null && o3.length ? [t4].concat(Cb(o3)) : t4)];
        };
      },
      genSubStyleComponent: function (e7, t3, n3) {
        var r2 = c2(
          e7,
          t3,
          n3,
          kE(
            { resetStyle: !1, order: -998 },
            arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {},
          ),
        );
        return function (e8) {
          var t4 = e8.prefixCls,
            n4 = e8.rootCls;
          return r2(t4, n4 === void 0 ? t4 : n4), null;
        };
      },
      genComponentStyleHook: c2,
    };
  })({
    usePrefix: () => {
      const { getPrefixCls: e6, iconPrefixCls: t2 } = r.useContext(Tb);
      return { rootPrefixCls: e6(), iconPrefixCls: t2 };
    },
    useToken: () => {
      const [e6, t2, n2, r2, o2, a2] = WS();
      return { theme: e6, realToken: t2, hashId: n2, token: r2, cssVar: o2, zeroRuntime: a2 };
    },
    useCSP: () => {
      const { csp: e6 } = r.useContext(Tb);
      return e6 ?? {};
    },
    getResetStyles: (e6, t2) => {
      const n2 = ((e7) => ({
        a: {
          color: e7.colorLink,
          textDecoration: e7.linkDecoration,
          backgroundColor: "transparent",
          outline: "none",
          cursor: "pointer",
          transition: `color ${e7.motionDurationSlow}`,
          "-webkit-text-decoration-skip": "objects",
          "&:hover": { color: e7.colorLinkHover },
          "&:active": { color: e7.colorLinkActive },
          "&:active, &:hover": { textDecoration: e7.linkHoverDecoration, outline: 0 },
          "&:focus": { textDecoration: e7.linkFocusDecoration, outline: 0 },
          ...JS(e7),
          "&[disabled]": { color: e7.colorTextDisabled, cursor: "not-allowed" },
        },
      }))(e6);
      return [n2, { "&": n2 }, ZS(t2?.prefix.iconPrefixCls ?? Pb)];
    },
    getCommonStyle: (e6, t2, n2, r2) => {
      const o2 = `[class^="${t2}"], [class*=" ${t2}"]`,
        a2 = n2 ? `.${n2}` : o2,
        l2 = { boxSizing: "border-box", "&::before, &::after": { boxSizing: "border-box" } };
      let i2 = {};
      return (
        r2 !== !1 && (i2 = { fontFamily: e6.fontFamily, fontSize: e6.fontSize }),
        { [a2]: { ...i2, ...l2, [o2]: l2 } }
      );
    },
    getCompUnitless: () => HS,
  }),
  ox = (e6, t2) => {
    const n2 = `--${e6.replace(/\./g, "")}-${t2}-`;
    return [(e7) => `${n2}${e7}`, (e7, t3) => (t3 ? `var(${n2}${e7}, ${t3})` : `var(${n2}${e7})`)];
  },
  ax = (e6, t2) => {
    const [n2, r2] = WS();
    return gE(
      {
        theme: n2,
        token: r2,
        hashId: "",
        path: ["ant-design-icons", e6],
        nonce: () => t2?.nonce,
        layer: { name: "antd" },
      },
      () => ZS(e6),
    );
  },
  lx = r.createContext({}),
  ix = "data-rc-order",
  sx = "data-rc-priority",
  ux = new Map();
function cx() {
  return !(typeof window > "u" || !window.document || !window.document.createElement);
}
function dx({ mark: e6 } = {}) {
  return e6 ? (e6.startsWith("data-") ? e6 : `data-${e6}`) : "rc-util-key";
}
function fx(e6) {
  return e6.attachTo ? e6.attachTo : document.querySelector("head") || document.body;
}
function px(e6) {
  return Array.from((ux.get(e6) || e6).children).filter((e7) => e7.tagName === "STYLE");
}
function hx(e6, t2 = {}) {
  if (!cx()) return null;
  const { csp: n2, prepend: r2, priority: o2 = 0 } = t2,
    a2 = (function (e7) {
      return e7 === "queue" ? "prependQueue" : e7 ? "prepend" : "append";
    })(r2),
    l2 = a2 === "prependQueue",
    i2 = document.createElement("style");
  i2.setAttribute(ix, a2),
    l2 && o2 && i2.setAttribute(sx, `${o2}`),
    n2?.nonce && (i2.nonce = n2.nonce),
    (i2.innerHTML = e6);
  const s2 = fx(t2),
    { firstChild: u2 } = s2;
  if (r2) {
    if (l2) {
      const e7 = (t2.styles || px(s2)).filter((e8) => {
        if (!["prepend", "prependQueue"].includes(e8.getAttribute(ix))) return !1;
        const t3 = Number(e8.getAttribute(sx) || 0);
        return o2 >= t3;
      });
      if (e7.length) return s2.insertBefore(i2, e7[e7.length - 1].nextSibling), i2;
    }
    s2.insertBefore(i2, u2);
  } else s2.appendChild(i2);
  return i2;
}
function mx(e6, t2, n2 = {}) {
  var r2;
  if (!cx()) return null;
  const o2 = fx(n2),
    a2 = px(o2),
    l2 = { ...n2, styles: a2 };
  (function (e7, t3) {
    const n3 = ux.get(e7);
    if (
      !n3 ||
      !(function (e8, t4) {
        if (!e8 || !t4) return !1;
        if (e8.contains) return e8.contains(t4);
        let n4 = t4;
        for (; n4; ) {
          if (n4 === e8) return !0;
          n4 = n4.parentNode;
        }
        return !1;
      })(document, n3)
    ) {
      const n4 = hx("", t3);
      if (!n4) return;
      const { parentNode: r3 } = n4;
      ux.set(e7, r3), e7.removeChild(n4);
    }
  })(o2, l2);
  const i2 = (function (e7, t3 = {}) {
    let { styles: n3 } = t3;
    return n3 || (n3 = px(fx(t3))), n3.find((n4) => n4.getAttribute(dx(t3)) === e7);
  })(t2, l2);
  if (i2)
    return (
      (r2 = l2.csp) != null && r2.nonce && i2.nonce !== l2.csp.nonce && (i2.nonce = l2.csp.nonce),
      i2.innerHTML !== e6 && (i2.innerHTML = e6),
      i2
    );
  const s2 = hx(e6, l2);
  return s2?.setAttribute(dx(l2), t2), s2;
}
const gx = {};
function vx(e6, t2) {
  (function (e7, t3) {
    e7 || gx[t3] || (gx[t3] = !0);
  })(e6, `[@ant-design/icons] ${t2}`);
}
function yx(e6) {
  return (
    e6 !== null &&
    typeof e6 == "object" &&
    typeof e6.name == "string" &&
    typeof e6.theme == "string" &&
    (typeof e6.icon == "object" || typeof e6.icon == "function")
  );
}
function bx(e6 = {}) {
  return Object.keys(e6).reduce((t2, n2) => {
    const r2 = e6[n2];
    n2 === "class"
      ? ((t2.className = r2), delete t2.class)
      : (delete t2[n2], (t2[((o2 = n2), o2.replace(/-(.)/g, (e7, t3) => t3.toUpperCase()))] = r2));
    var o2;
    return t2;
  }, {});
}
function wx(e6, t2, n2) {
  return n2
    ? i.createElement(
        e6.tag,
        { key: t2, ...bx(e6.attrs), ...n2 },
        (e6.children || []).map((n3, r2) => wx(n3, `${t2}-${e6.tag}-${r2}`)),
      )
    : i.createElement(
        e6.tag,
        { key: t2, ...bx(e6.attrs) },
        (e6.children || []).map((n3, r2) => wx(n3, `${t2}-${e6.tag}-${r2}`)),
      );
}
const Ex = (e6) => {
    const { csp: t2, prefixCls: n2, layer: o2, zeroRuntime: a2 } = r.useContext(lx);
    let l2 = `
.anticon {
  display: inline-flex;
  align-items: center;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.anticon > * {
  line-height: 1;
}

.anticon svg {
  display: inline-block;
  vertical-align: inherit;
}

.anticon::before {
  display: none;
}

.anticon .anticon-icon {
  display: block;
}

.anticon[tabindex] {
  cursor: pointer;
}

.anticon-spin {
  -webkit-animation: loadingCircle 1s infinite linear;
  animation: loadingCircle 1s infinite linear;
}

@-webkit-keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
`;
    n2 && (l2 = l2.replace(/anticon/g, n2)),
      o2 &&
        (l2 = `@layer ${o2} {
${l2}
}`),
      r.useEffect(() => {
        if (a2) return;
        const n3 = (function (e7) {
          const t3 = (function (e8) {
            var t4;
            return (t4 = e8?.getRootNode) == null ? void 0 : t4.call(e8);
          })(e7);
          return typeof ShadowRoot < "u" && t3 instanceof ShadowRoot ? t3 : null;
        })(e6.current);
        mx(l2, "@ant-design-icons", { prepend: !o2, csp: t2, attachTo: n3 });
      }, []);
  },
  Sx = (e6) => {
    const {
        icon: t2,
        className: n2,
        onClick: o2,
        style: a2,
        primaryColor: l2,
        secondaryColor: i2,
        ...s2
      } = e6,
      u2 = r.useRef(null);
    if ((Ex(u2), vx(yx(t2), "icon should be icon definiton, but got " + typeof t2), !yx(t2)))
      return null;
    const c2 = t2;
    return wx(c2.icon, `svg-${c2.name}`, {
      className: n2,
      onClick: o2,
      style: a2,
      "data-icon": c2.name,
      width: "1em",
      height: "1em",
      fill: "currentColor",
      "aria-hidden": "true",
      ...s2,
      ref: u2,
    });
  };
Sx.displayName = "IconReact";
const xx = Sx;
function kx() {
  return (
    (kx = Object.assign
      ? Object.assign.bind()
      : function (e6) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = arguments[t2];
            for (var r2 in n2) Object.prototype.hasOwnProperty.call(n2, r2) && (e6[r2] = n2[r2]);
          }
          return e6;
        }),
    kx.apply(this, arguments)
  );
}
const Cx = r.forwardRef((e6, t2) => {
    const {
        className: n2,
        icon: o2,
        spin: a2,
        rotate: l2,
        tabIndex: i2,
        onClick: s2,
        twoToneColor: u2,
        ...c2
      } = e6,
      { prefixCls: d2 = "anticon", rootClassName: f2 } = r.useContext(lx);
    if ((vx(yx(o2), "icon should be icon definiton, but got " + typeof o2), !yx(o2))) return null;
    const p2 = Sb(
      f2,
      d2,
      { [`${d2}-${o2.name}`]: !!o2.name, [`${d2}-spin`]: !!a2 || o2.name === "loading" },
      n2,
    );
    let h2 = i2;
    h2 === void 0 && s2 && (h2 = -1);
    const m2 = l2 ? { msTransform: `rotate(${l2}deg)`, transform: `rotate(${l2}deg)` } : void 0;
    return r.createElement(
      "span",
      kx({ role: "img", "aria-label": o2.name }, c2, {
        ref: t2,
        tabIndex: h2,
        onClick: s2,
        className: p2,
      }),
      r.createElement(xx, { icon: o2, style: m2 }),
    );
  }),
  _x = {
    icon: {
      tag: "svg",
      attrs: { "fill-rule": "evenodd", viewBox: "64 64 896 896", focusable: "false" },
      children: [
        {
          tag: "path",
          attrs: {
            d: "M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z",
          },
        },
      ],
    },
    name: "close-circle",
    theme: "filled",
  };
function Px() {
  return (
    (Px = Object.assign
      ? Object.assign.bind()
      : function (e6) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = arguments[t2];
            for (var r2 in n2) Object.prototype.hasOwnProperty.call(n2, r2) && (e6[r2] = n2[r2]);
          }
          return e6;
        }),
    Px.apply(this, arguments)
  );
}
const Ox = (e6, t2) => r.createElement(Cx, Px({}, e6, { ref: t2, icon: _x })),
  Tx = r.forwardRef(Ox),
  Nx = {
    icon: {
      tag: "svg",
      attrs: { "fill-rule": "evenodd", viewBox: "64 64 896 896", focusable: "false" },
      children: [
        {
          tag: "path",
          attrs: {
            d: "M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z",
          },
        },
      ],
    },
    name: "close",
    theme: "outlined",
  };
function $x() {
  return (
    ($x = Object.assign
      ? Object.assign.bind()
      : function (e6) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = arguments[t2];
            for (var r2 in n2) Object.prototype.hasOwnProperty.call(n2, r2) && (e6[r2] = n2[r2]);
          }
          return e6;
        }),
    $x.apply(this, arguments)
  );
}
const Mx = (e6, t2) => r.createElement(Cx, $x({}, e6, { ref: t2, icon: Nx })),
  Rx = r.forwardRef(Mx),
  Lx = r.createContext({}),
  Ix = (e6) => {
    const { children: t2, ...n2 } = e6,
      o2 = r.useMemo(() => ({ motion: n2.motion }), [n2.motion]);
    return r.createElement(Lx.Provider, { value: o2 }, t2);
  },
  Ax = "none",
  Fx = "appear",
  zx = "enter",
  jx = "leave",
  Dx = "none",
  Hx = "prepare",
  Vx = "start",
  Bx = "active",
  Ux = "end",
  Wx = "prepared";
function qx(e6, t2) {
  const n2 = {};
  return (
    (n2[e6.toLowerCase()] = t2.toLowerCase()),
    (n2[`Webkit${e6}`] = `webkit${t2}`),
    (n2[`Moz${e6}`] = `moz${t2}`),
    (n2[`ms${e6}`] = `MS${t2}`),
    (n2[`O${e6}`] = `o${t2.toLowerCase()}`),
    n2
  );
}
const Xx = (function (e6, t2) {
  const n2 = {
    animationend: qx("Animation", "AnimationEnd"),
    transitionend: qx("Transition", "TransitionEnd"),
  };
  return (
    e6 &&
      ("AnimationEvent" in t2 || delete n2.animationend.animation,
      "TransitionEvent" in t2 || delete n2.transitionend.transition),
    n2
  );
})(Ev(), typeof window < "u" ? window : {});
let Kx = {};
Ev() && ({ style: Kx } = document.createElement("div"));
const Gx = {};
function Yx(e6) {
  if (Gx[e6]) return Gx[e6];
  const t2 = Xx[e6];
  if (t2) {
    const n2 = Object.keys(t2),
      r2 = n2.length;
    for (let o2 = 0; o2 < r2; o2 += 1) {
      const r3 = n2[o2];
      if (Object.prototype.hasOwnProperty.call(t2, r3) && r3 in Kx)
        return (Gx[e6] = t2[r3]), Gx[e6];
    }
  }
  return "";
}
const Qx = Yx("animationend"),
  Jx = Yx("transitionend"),
  Zx = !(!Qx || !Jx),
  ek = Qx || "animationend",
  tk = Jx || "transitionend";
function nk(e6, t2) {
  return e6
    ? typeof e6 == "object"
      ? e6[t2.replace(/-\w/g, (e7) => e7[1].toUpperCase())]
      : `${e6}-${t2}`
    : null;
}
const rk = Ev() ? r.useLayoutEffect : r.useEffect,
  ok = [Hx, Vx, Bx, Ux],
  ak = [Hx, Wx],
  lk = !1;
function ik(e6) {
  return e6 === Bx || e6 === Ux;
}
const sk = (e6, t2, n2) => {
  const [o2, a2] = Cv(Dx),
    [l2, i2] = (() => {
      const e7 = r.useRef(null);
      function t3() {
        Mv.cancel(e7.current);
      }
      return (
        r.useEffect(
          () => () => {
            t3();
          },
          [],
        ),
        [
          function n3(r2, o3 = 2) {
            t3();
            const a3 = Mv(() => {
              o3 <= 1 ? r2({ isCanceled: () => a3 !== e7.current }) : n3(r2, o3 - 1);
            });
            e7.current = a3;
          },
          t3,
        ]
      );
    })(),
    s2 = t2 ? ak : ok;
  return (
    rk(() => {
      if (o2 !== Dx && o2 !== Ux) {
        const e7 = s2.indexOf(o2),
          t3 = s2[e7 + 1],
          r2 = n2(o2);
        r2 === lk
          ? a2(t3, !0)
          : t3 &&
            l2((e8) => {
              function n3() {
                e8.isCanceled() || a2(t3, !0);
              }
              r2 === !0 ? n3() : Promise.resolve(r2).then(n3);
            });
      }
    }, [e6, o2]),
    r.useEffect(
      () => () => {
        i2();
      },
      [],
    ),
    [
      function () {
        a2(Hx, !0);
      },
      o2,
    ]
  );
};
function uk(
  e6,
  t2,
  n2,
  {
    motionEnter: o2 = !0,
    motionAppear: a2 = !0,
    motionLeave: l2 = !0,
    motionDeadline: i2,
    motionLeaveImmediately: s2,
    onAppearPrepare: u2,
    onEnterPrepare: c2,
    onLeavePrepare: d2,
    onAppearStart: f2,
    onEnterStart: p2,
    onLeaveStart: h2,
    onAppearActive: m2,
    onEnterActive: g2,
    onLeaveActive: v2,
    onAppearEnd: y2,
    onEnterEnd: b2,
    onLeaveEnd: w2,
    onVisibleChanged: E2,
  },
) {
  const [S2, x2] = r.useState(),
    [k2, C2] = (function (e7) {
      const [, t3] = r.useReducer((e8) => e8 + 1, 0),
        n3 = r.useRef(e7);
      return [
        wv(() => n3.current),
        wv((e8) => {
          (n3.current = typeof e8 == "function" ? e8(n3.current) : e8), t3();
        }),
      ];
    })(Ax),
    [_2, P2] = r.useState([null, null]),
    O2 = k2(),
    T2 = r.useRef(!1),
    N2 = r.useRef(null);
  function $2() {
    return n2();
  }
  const M2 = r.useRef(!1);
  function R2() {
    C2(Ax), P2([null, null]);
  }
  const L2 = wv((e7) => {
      const t3 = k2();
      if (t3 === Ax) return;
      const n3 = $2();
      if (e7 && !e7.deadline && e7.target !== n3) return;
      const r2 = M2.current;
      let o3;
      t3 === Fx && r2
        ? (o3 = y2?.(n3, e7))
        : t3 === zx && r2
          ? (o3 = b2?.(n3, e7))
          : t3 === jx && r2 && (o3 = w2?.(n3, e7)),
        r2 && o3 !== !1 && R2();
    }),
    [I2] = ((e7) => {
      const t3 = r.useRef();
      function n3(t4) {
        t4 && (t4.removeEventListener(tk, e7), t4.removeEventListener(ek, e7));
      }
      return (
        r.useEffect(
          () => () => {
            n3(t3.current), (t3.current = null);
          },
          [],
        ),
        [
          function (r2) {
            t3.current && t3.current !== r2 && n3(t3.current),
              r2 &&
                r2 !== t3.current &&
                (r2.addEventListener(tk, e7), r2.addEventListener(ek, e7), (t3.current = r2));
          },
          n3,
        ]
      );
    })(L2),
    A2 = (e7) => {
      switch (e7) {
        case Fx:
          return { [Hx]: u2, [Vx]: f2, [Bx]: m2 };
        case zx:
          return { [Hx]: c2, [Vx]: p2, [Bx]: g2 };
        case jx:
          return { [Hx]: d2, [Vx]: h2, [Bx]: v2 };
        default:
          return {};
      }
    },
    F2 = r.useMemo(() => A2(O2), [O2]),
    [z2, j2] = sk(O2, !e6, (e7) => {
      var t3;
      if (e7 === Hx) {
        const e8 = F2[Hx];
        return e8 ? e8($2()) : lk;
      }
      return (
        e7 in F2 && P2([((t3 = F2[e7]) == null ? void 0 : t3.call(F2, $2(), null)) || null, e7]),
        e7 === Bx &&
          O2 !== Ax &&
          (I2($2()),
          i2 > 0 &&
            (clearTimeout(N2.current),
            (N2.current = setTimeout(() => {
              L2({ deadline: !0 });
            }, i2)))),
        e7 === Wx && R2(),
        !0
      );
    }),
    D2 = ik(j2);
  M2.current = D2;
  const H2 = r.useRef(null);
  rk(() => {
    if (T2.current && H2.current === t2) return;
    x2(t2);
    const n3 = T2.current;
    let r2;
    (T2.current = !0),
      !n3 && t2 && a2 && (r2 = Fx),
      n3 && t2 && o2 && (r2 = zx),
      ((n3 && !t2 && l2) || (!n3 && s2 && !t2 && l2)) && (r2 = jx);
    const i3 = A2(r2);
    r2 && (e6 || i3[Hx]) ? (C2(r2), z2()) : C2(Ax), (H2.current = t2);
  }, [t2]),
    r.useEffect(() => {
      ((O2 === Fx && !a2) || (O2 === zx && !o2) || (O2 === jx && !l2)) && C2(Ax);
    }, [a2, o2, l2]),
    r.useEffect(
      () => () => {
        (T2.current = !1), clearTimeout(N2.current);
      },
      [],
    );
  const V2 = r.useRef(!1);
  r.useEffect(() => {
    S2 && (V2.current = !0),
      S2 !== void 0 && O2 === Ax && ((V2.current || S2) && E2?.(S2), (V2.current = !0));
  }, [S2, O2]);
  let B2 = _2[0];
  F2[Hx] && j2 === Vx && (B2 = { transition: "none", ...B2 });
  const U2 = _2[1];
  return [
    k2,
    j2,
    B2,
    S2 ?? t2,
    !T2.current && O2 === Ax && e6 && a2 ? "NONE" : (j2 !== Vx && j2 !== Bx) || U2 === j2,
  ];
}
const ck = (function (e6) {
    let t2 = e6;
    typeof e6 == "object" && ({ transitionSupport: t2 } = e6);
    const n2 = r.forwardRef((e7, n3) => {
      const {
          visible: o2 = !0,
          removeOnLeave: a2 = !0,
          forceRender: l2,
          children: i2,
          motionName: s2,
          leavedClassName: u2,
          eventProps: c2,
        } = e7,
        { motion: d2 } = r.useContext(Lx),
        f2 = (function (e8, n4) {
          return !(!e8.motionName || !t2 || n4 === !1);
        })(e7, d2),
        p2 = r.useRef();
      function h2() {
        return _y(p2.current);
      }
      const [m2, g2, v2, y2, b2] = uk(f2, o2, h2, e7),
        w2 = m2(),
        E2 = r.useRef(y2);
      y2 && (E2.current = !0);
      const S2 = r.useMemo(() => {
        const e8 = {};
        return (
          Object.defineProperties(e8, {
            nativeElement: { enumerable: !0, get: h2 },
            inMotion: { enumerable: !0, get: () => () => m2() !== Ax },
            enableMotion: { enumerable: !0, get: () => () => f2 },
          }),
          e8
        );
      }, []);
      r.useImperativeHandle(n3, () => S2, []);
      const x2 = r.useRef(0);
      b2 && (x2.current += 1);
      const k2 = r.useMemo(() => {
        if (b2 === "NONE") return null;
        let e8;
        const t3 = { ...c2, visible: o2 };
        if (i2)
          if (w2 === Ax)
            e8 = y2
              ? i2({ ...t3 }, p2)
              : !a2 && E2.current && u2
                ? i2({ ...t3, className: u2 }, p2)
                : l2 || (!a2 && !u2)
                  ? i2({ ...t3, style: { display: "none" } }, p2)
                  : null;
          else {
            let n4;
            g2 === Hx ? (n4 = "prepare") : ik(g2) ? (n4 = "active") : g2 === Vx && (n4 = "start");
            const r2 = nk(s2, `${w2}-${n4}`);
            e8 = i2(
              {
                ...t3,
                className: Sb(nk(s2, w2), { [r2]: r2 && n4, [s2]: typeof s2 == "string" }),
                style: v2,
              },
              p2,
            );
          }
        else e8 = null;
        return e8;
      }, [x2.current]);
      if (
        (function (e8) {
          return e8?.length < 2;
        })(i2) &&
        fy(k2)
      ) {
        const e8 = py(k2);
        if (e8 !== p2) return r.cloneElement(k2, { ref: sy(e8, p2) });
      }
      return k2;
    });
    return (n2.displayName = "CSSMotion"), n2;
  })(Zx),
  dk = (e6) => typeof e6 == "number" && !Number.isNaN(e6),
  fk = (e6) => typeof e6 == "string",
  pk = (e6) => e6 !== null && typeof e6 == "object",
  hk = (e6) => typeof e6 == "function",
  mk = (e6) => Hy(e6) && hk(e6.then),
  gk = (e6) => (typeof e6 != "object" && !hk(e6)) || e6 === null,
  vk = (e6) => pk(e6) && "propertyName" in e6 && fk(e6.propertyName),
  yk = (e6) => !!Hy(e6) && e6 === e6.window,
  bk = (e6) =>
    !!Hy(e6) &&
    (e6 instanceof Document ||
      e6.constructor.name === "HTMLDocument" ||
      e6.nodeType === window.Node.DOCUMENT_NODE),
  wk = (e6) => !!Hy(e6) && typeof HTMLElement < "u" && e6 instanceof HTMLElement,
  Ek = (e6, t2) => {
    const n2 = { ...e6 };
    return (
      Object.keys(t2).forEach((e7) => {
        t2[e7]._default ? n2[e7] || (n2[e7] = {}) : (n2[e7] = Ek(n2[e7], t2[e7]));
      }),
      n2
    );
  },
  Sk = (e6 = {}, ...t2) =>
    t2
      .filter((e7) => !!e7)
      .reduce(
        (t3, n2) => (
          Object.keys(n2).forEach((r2) => {
            const o2 = e6[r2],
              a2 = n2[r2];
            if (o2)
              if (pk(a2)) t3[r2] = Sk(o2, t3[r2], a2);
              else {
                const { _default: e7 } = o2;
                e7 && ((t3[r2] = t3[r2] || {}), (t3[r2][e7] = Sb(t3[r2][e7], a2)));
              }
            else t3[r2] = Sb(t3[r2], a2);
          }),
          t3
        ),
        {},
      ),
  xk = (e6, ...t2) => r.useMemo(() => Sk.apply(void 0, [e6].concat(t2)), [e6].concat(t2)),
  kk = (...e6) =>
    e6
      .filter((e7) => !!e7)
      .reduce(
        (e7, t2 = {}) => (
          Object.keys(t2).forEach((n2) => {
            e7[n2] = { ...e7[n2], ...t2[n2] };
          }),
          e7
        ),
        {},
      ),
  Ck = (...e6) => r.useMemo(() => kk.apply(void 0, e6), [].concat(e6)),
  _k = (e6, t2 = "root") => r.useMemo(() => (e6 ? { [t2]: e6 } : void 0), [e6, t2]),
  Pk = (e6, t2) => (hk(e6) ? e6(t2) : e6),
  Ok = (e6, t2, n2, o2) => {
    const a2 = e6.map((e7) => (e7 ? Pk(e7, n2) : void 0)),
      l2 = t2.map((e7) => (e7 ? Pk(e7, n2) : void 0)),
      i2 = xk.apply(void 0, [o2].concat(Cb(a2))),
      s2 = Ck.apply(void 0, Cb(l2));
    return r.useMemo(() => (o2 ? [Ek(i2, o2), Ek(s2, o2)] : [i2, s2]), [i2, s2, o2]);
  },
  Tk = (e6) => `${e6}-css-var`,
  Nk = r.createContext(void 0);
var $k = {};
Object.defineProperty($k, "__esModule", { value: !0 });
var Mk = ($k.default = void 0);
Mk = $k.default = {
  items_per_page: "/ page",
  jump_to: "Go to",
  jump_to_confirm: "confirm",
  page: "Page",
  prev_page: "Previous Page",
  next_page: "Next Page",
  prev_5: "Previous 5 Pages",
  next_5: "Next 5 Pages",
  prev_3: "Previous 3 Pages",
  next_3: "Next 3 Pages",
  page_size: "Page Size",
};
var Rk = {},
  Lk = {};
Object.defineProperty(Lk, "__esModule", { value: !0 }),
  (Lk.commonLocale = void 0),
  (Lk.commonLocale = {
    yearFormat: "YYYY",
    dayFormat: "D",
    cellMeridiemFormat: "A",
    monthBeforeYear: !0,
  }),
  Object.defineProperty(Rk, "__esModule", { value: !0 });
var Ik = (Rk.default = void 0);
const Ak = {
  ...Lk.commonLocale,
  locale: "en_US",
  today: "Today",
  now: "Now",
  backToToday: "Back to today",
  ok: "OK",
  clear: "Clear",
  week: "Week",
  month: "Month",
  year: "Year",
  timeSelect: "select time",
  dateSelect: "select date",
  weekSelect: "Choose a week",
  monthSelect: "Choose a month",
  yearSelect: "Choose a year",
  decadeSelect: "Choose a decade",
  previousMonth: "Previous month",
  nextMonth: "Next month",
  previousYear: "Last year",
  nextYear: "Next year",
  previousDecade: "Last decade",
  nextDecade: "Next decade",
  previousCentury: "Last century",
  nextCentury: "Next century",
};
Ik = Rk.default = Ak;
const Fk = { placeholder: "Select time", rangePlaceholder: ["Start time", "End time"] },
  zk = {
    lang: {
      placeholder: "Select date",
      yearPlaceholder: "Select year",
      quarterPlaceholder: "Select quarter",
      monthPlaceholder: "Select month",
      weekPlaceholder: "Select week",
      rangePlaceholder: ["Start date", "End date"],
      rangeYearPlaceholder: ["Start year", "End year"],
      rangeQuarterPlaceholder: ["Start quarter", "End quarter"],
      rangeMonthPlaceholder: ["Start month", "End month"],
      rangeWeekPlaceholder: ["Start week", "End week"],
      ...Ik,
    },
    timePickerLocale: { ...Fk },
  },
  jk = "${label} is not a valid ${type}",
  Dk = {
    locale: "en",
    Pagination: Mk,
    DatePicker: zk,
    TimePicker: Fk,
    Calendar: zk,
    global: {
      placeholder: "Please select",
      close: "Close",
      sortable: "sortable",
      show: "Show",
      hide: "Hide",
    },
    Table: {
      filterTitle: "Filter menu",
      filterConfirm: "OK",
      filterReset: "Reset",
      filterEmptyText: "No filters",
      filterCheckAll: "Select all items",
      filterSearchPlaceholder: "Search in filters",
      emptyText: "No data",
      selectAll: "Select current page",
      selectInvert: "Invert current page",
      selectNone: "Clear all data",
      selectionAll: "Select all data",
      sortTitle: "Sort",
      expand: "Expand row",
      collapse: "Collapse row",
      triggerDesc: "Click to sort descending",
      triggerAsc: "Click to sort ascending",
      cancelSort: "Click to cancel sorting",
    },
    Tour: { Next: "Next", Previous: "Previous", Finish: "Finish" },
    Modal: { okText: "OK", cancelText: "Cancel", justOkText: "OK" },
    Popconfirm: { okText: "OK", cancelText: "Cancel" },
    Transfer: {
      titles: ["", ""],
      searchPlaceholder: "Search here",
      itemUnit: "item",
      itemsUnit: "items",
      remove: "Remove",
      selectCurrent: "Select current page",
      removeCurrent: "Remove current page",
      selectAll: "Select all data",
      deselectAll: "Deselect all data",
      removeAll: "Remove all data",
      selectInvert: "Invert current page",
    },
    Upload: {
      uploading: "Uploading...",
      removeFile: "Remove file",
      uploadError: "Upload error",
      previewFile: "Preview file",
      downloadFile: "Download file",
    },
    Empty: { description: "No data" },
    Icon: { icon: "icon" },
    Text: { edit: "Edit", copy: "Copy", copied: "Copied", expand: "Expand", collapse: "Collapse" },
    Carousel: { prevSlide: "Previous slide", nextSlide: "Next slide" },
    Form: {
      optional: "(optional)",
      defaultValidateMessages: {
        default: "Field validation error for ${label}",
        required: "Please enter ${label}",
        enum: "${label} must be one of [${enum}]",
        whitespace: "${label} cannot be a blank character",
        date: {
          format: "${label} date format is invalid",
          parse: "${label} cannot be converted to a date",
          invalid: "${label} is an invalid date",
        },
        types: {
          string: jk,
          method: jk,
          array: jk,
          object: jk,
          number: jk,
          date: jk,
          boolean: jk,
          integer: jk,
          float: jk,
          regexp: jk,
          email: jk,
          url: jk,
          hex: jk,
        },
        string: {
          len: "${label} must be ${len} characters",
          min: "${label} must be at least ${min} characters",
          max: "${label} must be up to ${max} characters",
          range: "${label} must be between ${min}-${max} characters",
        },
        number: {
          len: "${label} must be equal to ${len}",
          min: "${label} must be minimum ${min}",
          max: "${label} must be maximum ${max}",
          range: "${label} must be between ${min}-${max}",
        },
        array: {
          len: "Must be ${len} ${label}",
          min: "At least ${min} ${label}",
          max: "At most ${max} ${label}",
          range: "The amount of ${label} must be between ${min}-${max}",
        },
        pattern: { mismatch: "${label} does not match the pattern ${pattern}" },
      },
    },
    QRCode: { expired: "QR code expired", refresh: "Refresh", scanned: "Scanned" },
    ColorPicker: {
      presetEmpty: "Empty",
      transparent: "Transparent",
      singleColor: "Single",
      gradientColor: "Gradient",
    },
  };
let Hk = { ...Dk.Modal },
  Vk = [];
const Bk = () => Vk.reduce((e6, t2) => ({ ...e6, ...t2 }), Dk.Modal);
function Uk() {
  return Hk;
}
const Wk = r.createContext(void 0),
  qk = (e6, t2) => {
    const n2 = r.useContext(Wk);
    return [
      r.useMemo(() => {
        const r2 = t2 || Dk[e6],
          o2 = n2?.[e6] ?? {};
        return { ...(hk(r2) ? r2() : r2), ...(o2 || {}) };
      }, [e6, t2, n2]),
      r.useMemo(() => {
        const e7 = n2?.locale;
        return n2?.exist && !e7 ? Dk.locale : e7;
      }, [n2]),
    ];
  },
  Xk = (e6) => {
    const { locale: t2 = {}, children: n2, _ANT_MARK__: o2 } = e6;
    r.useEffect(
      () =>
        (function (e8) {
          if (e8) {
            const t3 = { ...e8 };
            return (
              Vk.push(t3),
              (Hk = Bk()),
              () => {
                (Vk = Vk.filter((e9) => e9 !== t3)), (Hk = Bk());
              }
            );
          }
          Hk = { ...Dk.Modal };
        })(t2?.Modal),
      [t2],
    );
    const a2 = r.useMemo(() => ({ ...t2, exist: !0 }), [t2]);
    return r.createElement(Wk.Provider, { value: a2 }, n2);
  },
  Kk = r.createContext(null);
let Gk = !1;
const Yk = [],
  Qk = `rc-util-locker-${Date.now()}`;
let Jk = 0;
function Zk(e6) {
  const t2 = !!e6,
    [n2] = r.useState(() => ((Jk += 1), `${Qk}_${Jk}`));
  xv(() => {
    if (t2) {
      const e7 = Ly(document.body).width;
      ky(
        `
html body {
  overflow-y: hidden;
  ${document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight) && window.innerWidth > document.body.offsetWidth ? `width: calc(100% - ${e7}px);` : ""}
}`,
        n2,
      );
    } else xy(n2);
    return () => {
      xy(n2);
    };
  }, [t2, n2]);
}
let eC = [],
  tC = 0;
const nC = (e6) => {
    if (e6.key === "Escape" && !e6.isComposing) {
      if (Date.now() - tC < 200) return;
      const t2 = eC.length;
      for (let n2 = t2 - 1; n2 >= 0; n2 -= 1) eC[n2].onEsc({ top: n2 === t2 - 1, event: e6 });
    }
  },
  rC = () => {
    tC = Date.now();
  };
function oC(e6, t2) {
  const n2 = Av(),
    o2 = wv(t2),
    a2 = () => {
      eC.find((e7) => e7.id === n2) || eC.push({ id: n2, onEsc: o2 });
    },
    l2 = () => {
      eC = eC.filter((e7) => e7.id !== n2);
    };
  r.useMemo(() => {
    e6 ? a2() : e6 || l2();
  }, [e6]),
    r.useEffect(() => {
      if (e6)
        return (
          a2(),
          window.addEventListener("keydown", nC),
          window.addEventListener("compositionend", rC),
          () => {
            l2(),
              eC.length === 0 &&
                (window.removeEventListener("keydown", nC),
                window.removeEventListener("compositionend", rC));
          }
        );
    }, [e6]);
}
const aC = (e6) =>
    e6 !== !1 &&
    (Ev() && e6
      ? typeof e6 == "string"
        ? document.querySelector(e6)
        : typeof e6 == "function"
          ? e6()
          : e6
      : null),
  lC = r.forwardRef((e6, t2) => {
    const {
        open: n2,
        autoLock: a2,
        getContainer: l2,
        debug: i2,
        autoDestroy: s2 = !0,
        children: u2,
        onEsc: c2,
      } = e6,
      [d2, f2] = r.useState(n2),
      p2 = d2 || n2;
    r.useEffect(() => {
      (s2 || n2) && f2(n2);
    }, [n2, s2]);
    const [h2, m2] = r.useState(() => aC(l2));
    r.useEffect(() => {
      const e7 = aC(l2);
      m2(() => e7 ?? null);
    });
    const [g2, v2] = (function (e7) {
        const [t3] = r.useState(() => (Ev() ? document.createElement("div") : null)),
          n3 = r.useRef(!1),
          o2 = r.useContext(Kk),
          [a3, l3] = r.useState(Yk),
          i3 =
            o2 ||
            (n3.current
              ? void 0
              : (e8) => {
                  l3((t4) => [e8, ...t4]);
                });
        function s3() {
          t3.parentElement || document.body.appendChild(t3), (n3.current = !0);
        }
        function u3() {
          var e8;
          (e8 = t3.parentElement) == null || e8.removeChild(t3), (n3.current = !1);
        }
        return (
          xv(() => (e7 ? (o2 ? o2(s3) : s3()) : u3(), u3), [e7]),
          xv(() => {
            a3.length && (a3.forEach((e8) => e8()), l3(Yk));
          }, [a3]),
          [t3, i3]
        );
      })(p2 && !h2),
      y2 = h2 ?? g2;
    Zk(a2 && n2 && Ev() && (y2 === g2 || y2 === document.body)), oC(n2, c2);
    let b2 = null;
    u2 && cy(u2) && t2 && (b2 = py(u2));
    const w2 = uy(b2, t2);
    if (!p2 || !Ev() || h2 === void 0) return null;
    const E2 = y2 === !1 || (typeof S2 == "boolean" && (Gk = S2), Gk);
    var S2;
    let x2 = u2;
    return (
      t2 && (x2 = r.cloneElement(u2, { ref: w2 })),
      r.createElement(Kk.Provider, { value: v2 }, E2 ? x2 : o.createPortal(x2, y2))
    );
  });
function iC(e6) {
  const { prefixCls: t2, align: n2, arrow: o2, arrowPos: a2 } = e6,
    { className: l2, content: i2, style: s2 } = o2 || {},
    { x: u2 = 0, y: c2 = 0 } = a2,
    d2 = r.useRef(null);
  if (!n2 || !n2.points) return null;
  const f2 = { position: "absolute" };
  if (n2.autoArrow !== !1) {
    const e7 = n2.points[0],
      t3 = n2.points[1],
      r2 = e7[0],
      o3 = e7[1],
      a3 = t3[0],
      l3 = t3[1];
    r2 !== a3 && ["t", "b"].includes(r2)
      ? r2 === "t"
        ? (f2.top = 0)
        : (f2.bottom = 0)
      : (f2.top = c2),
      o3 !== l3 && ["l", "r"].includes(o3)
        ? o3 === "l"
          ? (f2.left = 0)
          : (f2.right = 0)
        : (f2.left = u2);
  }
  return r.createElement(
    "div",
    { ref: d2, className: Sb(`${t2}-arrow`, l2), style: { ...f2, ...s2 } },
    i2,
  );
}
function sC() {
  return (
    (sC = Object.assign
      ? Object.assign.bind()
      : function (e6) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = arguments[t2];
            for (var r2 in n2) Object.prototype.hasOwnProperty.call(n2, r2) && (e6[r2] = n2[r2]);
          }
          return e6;
        }),
    sC.apply(this, arguments)
  );
}
function uC(e6) {
  const { prefixCls: t2, open: n2, zIndex: o2, mask: a2, motion: l2, mobile: i2 } = e6;
  return a2
    ? r.createElement(
        ck,
        sC({}, l2, { motionAppear: !0, visible: n2, removeOnLeave: !0 }),
        ({ className: e7 }) =>
          r.createElement("div", {
            style: { zIndex: o2 },
            className: Sb(`${t2}-mask`, i2 && `${t2}-mobile-mask`, e7),
          }),
      )
    : null;
}
const cC = r.memo(
  ({ children: e6 }) => e6,
  (e6, t2) => t2.cache,
);
function dC(e6, t2, n2, r2, o2, a2, l2, i2) {
  var s2;
  const u2 = "auto",
    c2 = e6 ? {} : { left: "-1000vw", top: "-1000vh", right: u2, bottom: u2 };
  if (!e6 && (t2 || !n2)) {
    const { points: e7 } = r2,
      t3 = r2.dynamicInset || ((s2 = r2._experimental) == null ? void 0 : s2.dynamicInset),
      n3 = t3 && e7[0][1] === "r",
      d2 = t3 && e7[0][0] === "b";
    n3 ? ((c2.right = o2), (c2.left = u2)) : ((c2.left = l2), (c2.right = u2)),
      d2 ? ((c2.bottom = a2), (c2.top = u2)) : ((c2.top = i2), (c2.bottom = u2));
  }
  return c2;
}
function fC() {
  return (
    (fC = Object.assign
      ? Object.assign.bind()
      : function (e6) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = arguments[t2];
            for (var r2 in n2) Object.prototype.hasOwnProperty.call(n2, r2) && (e6[r2] = n2[r2]);
          }
          return e6;
        }),
    fC.apply(this, arguments)
  );
}
const pC = r.forwardRef((e6, t2) => {
    const {
        onEsc: n2,
        popup: o2,
        className: a2,
        prefixCls: l2,
        style: i2,
        target: s2,
        onVisibleChanged: u2,
        open: c2,
        keepDom: d2,
        fresh: f2,
        onClick: p2,
        mask: h2,
        arrow: m2,
        arrowPos: g2,
        align: v2,
        motion: y2,
        maskMotion: b2,
        mobile: w2,
        forceRender: E2,
        getPopupContainer: S2,
        autoDestroy: x2,
        portal: k2,
        children: C2,
        zIndex: _2,
        onMouseEnter: P2,
        onMouseLeave: O2,
        onPointerEnter: T2,
        onPointerDownCapture: N2,
        ready: $2,
        offsetX: M2,
        offsetY: R2,
        offsetR: L2,
        offsetB: I2,
        onAlign: A2,
        onPrepare: F2,
        onResize: z2,
        stretch: j2,
        targetWidth: D2,
        targetHeight: H2,
      } = e6,
      V2 = typeof o2 == "function" ? o2() : o2,
      B2 = c2 || d2,
      U2 = !!w2,
      [W2, q2, X2] = r.useMemo(
        () => (w2 ? [w2.mask, w2.maskMotion, w2.motion] : [h2, b2, y2]),
        [w2, h2, b2, y2],
      ),
      K2 = S2?.length > 0,
      [G2, Y2] = r.useState(!S2 || !K2);
    xv(() => {
      !G2 && K2 && s2 && Y2(!0);
    }, [G2, K2, s2]);
    const Q2 = wv((e7, t3) => {
        z2?.(e7, t3), A2();
      }),
      J2 = dC(U2, $2, c2, v2, L2, I2, M2, R2);
    if (!G2) return null;
    const Z2 = {};
    return (
      j2 &&
        (j2.includes("height") && H2
          ? (Z2.height = H2)
          : j2.includes("minHeight") && H2 && (Z2.minHeight = H2),
        j2.includes("width") && D2
          ? (Z2.width = D2)
          : j2.includes("minWidth") && D2 && (Z2.minWidth = D2)),
      c2 || (Z2.pointerEvents = "none"),
      r.createElement(
        k2,
        { open: E2 || B2, getContainer: S2 && (() => S2(s2)), autoDestroy: x2, onEsc: n2 },
        r.createElement(uC, {
          prefixCls: l2,
          open: c2,
          zIndex: _2,
          mask: W2,
          motion: q2,
          mobile: U2,
        }),
        r.createElement(wb, { onResize: Q2, disabled: !c2 }, (e7) =>
          r.createElement(
            ck,
            fC(
              {
                motionAppear: !0,
                motionEnter: !0,
                motionLeave: !0,
                removeOnLeave: !1,
                forceRender: E2,
                leavedClassName: `${l2}-hidden`,
              },
              X2,
              {
                onAppearPrepare: F2,
                onEnterPrepare: F2,
                visible: c2,
                onVisibleChanged: (e8) => {
                  var t3;
                  (t3 = y2?.onVisibleChanged) == null || t3.call(y2, e8), u2(e8);
                },
              },
            ),
            ({ className: n3, style: o3 }, s3) => {
              const u3 = Sb(l2, n3, a2, { [`${l2}-mobile`]: U2 });
              return r.createElement(
                "div",
                {
                  ref: sy(e7, t2, s3),
                  className: u3,
                  style: {
                    "--arrow-x": `${g2.x || 0}px`,
                    "--arrow-y": `${g2.y || 0}px`,
                    ...J2,
                    ...Z2,
                    ...o3,
                    boxSizing: "border-box",
                    zIndex: _2,
                    ...i2,
                  },
                  onMouseEnter: P2,
                  onMouseLeave: O2,
                  onPointerEnter: T2,
                  onClick: p2,
                  onPointerDownCapture: N2,
                },
                m2 && r.createElement(iC, { prefixCls: l2, arrow: m2, arrowPos: g2, align: v2 }),
                r.createElement(cC, { cache: !c2 && !f2 }, V2),
              );
            },
          ),
        ),
        C2,
      )
    );
  }),
  hC = r.createContext(null),
  mC = r.createContext(null);
function gC(e6) {
  return e6 ? (Array.isArray(e6) ? e6 : [e6]) : [];
}
function vC(e6 = [], t2 = [], n2) {
  const r2 = (e7, t3) => e7[t3] || "";
  return n2 ? r2(e6, 0) === r2(t2, 0) : r2(e6, 0) === r2(t2, 0) && r2(e6, 1) === r2(t2, 1);
}
function yC(e6, t2, n2, r2) {
  var o2;
  const { points: a2 } = n2,
    l2 = Object.keys(e6);
  for (let i2 = 0; i2 < l2.length; i2 += 1) {
    const n3 = l2[i2];
    if (vC((o2 = e6[n3]) == null ? void 0 : o2.points, a2, r2)) return `${t2}-placement-${n3}`;
  }
  return "";
}
function bC(e6) {
  return e6.ownerDocument.defaultView;
}
function wC(e6) {
  const t2 = [];
  let n2 = e6?.parentElement;
  const r2 = ["hidden", "scroll", "clip", "auto"];
  for (; n2; ) {
    const { overflowX: e7, overflowY: o2, overflow: a2 } = bC(n2).getComputedStyle(n2);
    [e7, o2, a2].some((e8) => r2.includes(e8)) && t2.push(n2), (n2 = n2.parentElement);
  }
  return t2;
}
function EC(e6, t2 = 1) {
  return Number.isNaN(e6) ? t2 : e6;
}
function SC(e6) {
  return EC(parseFloat(e6), 0);
}
function xC(e6, t2) {
  const n2 = { ...e6 };
  return (
    (t2 || []).forEach((e7) => {
      if (e7 instanceof HTMLBodyElement || e7 instanceof HTMLHtmlElement) return;
      const {
          overflow: t3,
          overflowClipMargin: r2,
          borderTopWidth: o2,
          borderBottomWidth: a2,
          borderLeftWidth: l2,
          borderRightWidth: i2,
        } = bC(e7).getComputedStyle(e7),
        s2 = e7.getBoundingClientRect(),
        { offsetHeight: u2, clientHeight: c2, offsetWidth: d2, clientWidth: f2 } = e7,
        p2 = SC(o2),
        h2 = SC(a2),
        m2 = SC(l2),
        g2 = SC(i2),
        v2 = EC(Math.round((s2.width / d2) * 1e3) / 1e3),
        y2 = EC(Math.round((s2.height / u2) * 1e3) / 1e3),
        b2 = (d2 - f2 - m2 - g2) * v2,
        w2 = (u2 - c2 - p2 - h2) * y2,
        E2 = p2 * y2,
        S2 = h2 * y2,
        x2 = m2 * v2,
        k2 = g2 * v2;
      let C2 = 0,
        _2 = 0;
      if (t3 === "clip") {
        const e8 = SC(r2);
        (C2 = e8 * v2), (_2 = e8 * y2);
      }
      const P2 = s2.x + x2 - C2,
        O2 = s2.y + E2 - _2,
        T2 = P2 + s2.width + 2 * C2 - x2 - k2 - b2,
        N2 = O2 + s2.height + 2 * _2 - E2 - S2 - w2;
      (n2.left = Math.max(n2.left, P2)),
        (n2.top = Math.max(n2.top, O2)),
        (n2.right = Math.min(n2.right, T2)),
        (n2.bottom = Math.min(n2.bottom, N2));
    }),
    n2
  );
}
function kC(e6, t2 = 0) {
  const n2 = `${t2}`,
    r2 = n2.match(/^(.*)\%$/);
  return r2 ? e6 * (parseFloat(r2[1]) / 100) : parseFloat(n2);
}
function CC(e6, t2) {
  const [n2, r2] = t2 || [];
  return [kC(e6.width, n2), kC(e6.height, r2)];
}
function _C(e6 = "") {
  return [e6[0], e6[1]];
}
function PC(e6, t2) {
  const n2 = t2[0],
    r2 = t2[1];
  let o2, a2;
  return (
    (a2 = n2 === "t" ? e6.y : n2 === "b" ? e6.y + e6.height : e6.y + e6.height / 2),
    (o2 = r2 === "l" ? e6.x : r2 === "r" ? e6.x + e6.width : e6.x + e6.width / 2),
    { x: o2, y: a2 }
  );
}
function OC(e6, t2) {
  const n2 = [...e6];
  return (n2[t2] = { t: "b", b: "t", l: "r", r: "l" }[e6[t2]] || "c"), n2;
}
function TC(e6) {
  return e6.join("");
}
function NC(e6, t2, n2, o2, a2, l2, i2, s2) {
  const [u2, c2] = r.useState({
      ready: !1,
      offsetX: 0,
      offsetY: 0,
      offsetR: 0,
      offsetB: 0,
      arrowX: 0,
      arrowY: 0,
      scaleX: 1,
      scaleY: 1,
      align: a2[o2] || {},
    }),
    d2 = r.useRef(0),
    f2 = r.useMemo(() => (!t2 || s2 ? [] : wC(t2)), [t2]),
    p2 = r.useRef({});
  e6 || (p2.current = {});
  const h2 = wv(() => {
      var r2, u3;
      if (t2 && n2 && e6 && !s2) {
        let e7 = function (e8, t3, n3 = K2) {
            const r3 = P2.x + e8,
              o3 = P2.y + t3,
              a3 = r3 + F2,
              l3 = o3 + A2,
              i3 = Math.max(r3, n3.left),
              s4 = Math.max(o3, n3.top),
              u4 = Math.min(a3, n3.right),
              c3 = Math.min(l3, n3.bottom);
            return Math.max(0, (u4 - i3) * (c3 - s4));
          },
          s3 = function () {
            (Pe2 = P2.y + he2), (Oe2 = Pe2 + A2), (Te2 = P2.x + pe2), (Ne2 = Te2 + F2);
          };
        const d3 = t2,
          h3 = d3.ownerDocument,
          m3 = bC(d3),
          { position: g2 } = m3.getComputedStyle(d3),
          v2 = d3.style.left,
          y2 = d3.style.top,
          b2 = d3.style.right,
          w2 = d3.style.bottom,
          E2 = d3.style.overflow,
          S2 = d3.style.overflowX,
          x2 = d3.style.overflowY,
          k2 = { ...a2[o2], ...l2 },
          C2 = h3.createElement("div");
        let _2;
        if (
          ((r2 = d3.parentElement) == null || r2.appendChild(C2),
          (C2.style.left = `${d3.offsetLeft}px`),
          (C2.style.top = `${d3.offsetTop}px`),
          (C2.style.position = g2),
          (C2.style.height = `${d3.offsetHeight}px`),
          (C2.style.width = `${d3.offsetWidth}px`),
          (d3.style.left = "0"),
          (d3.style.top = "0"),
          (d3.style.right = "auto"),
          (d3.style.bottom = "auto"),
          (d3.style.overflow = "hidden"),
          Array.isArray(n2))
        )
          _2 = { x: n2[0], y: n2[1], width: 0, height: 0 };
        else {
          const e8 = n2.getBoundingClientRect();
          (e8.x = e8.x ?? e8.left),
            (e8.y = e8.y ?? e8.top),
            (_2 = { x: e8.x, y: e8.y, width: e8.width, height: e8.height });
        }
        const P2 = d3.getBoundingClientRect(),
          { height: O2, width: T2 } = m3.getComputedStyle(d3);
        (P2.x = P2.x ?? P2.left), (P2.y = P2.y ?? P2.top);
        const {
            clientWidth: N2,
            clientHeight: $2,
            scrollWidth: M2,
            scrollHeight: R2,
            scrollTop: L2,
            scrollLeft: I2,
          } = h3.documentElement,
          A2 = P2.height,
          F2 = P2.width,
          z2 = _2.height,
          j2 = _2.width,
          D2 = { left: 0, top: 0, right: N2, bottom: $2 },
          H2 = { left: -I2, top: -L2, right: M2 - I2, bottom: R2 - L2 };
        let { htmlRegion: V2 } = k2;
        const B2 = "visible",
          U2 = "visibleFirst";
        V2 !== "scroll" && V2 !== U2 && (V2 = B2);
        const W2 = V2 === U2,
          q2 = xC(H2, f2),
          X2 = xC(D2, f2),
          K2 = V2 === B2 ? X2 : q2,
          G2 = W2 ? X2 : K2;
        (d3.style.left = "auto"),
          (d3.style.top = "auto"),
          (d3.style.right = "0"),
          (d3.style.bottom = "0");
        const Y2 = d3.getBoundingClientRect();
        (d3.style.left = v2),
          (d3.style.top = y2),
          (d3.style.right = b2),
          (d3.style.bottom = w2),
          (d3.style.overflow = E2),
          (d3.style.overflowX = S2),
          (d3.style.overflowY = x2),
          (u3 = d3.parentElement) == null || u3.removeChild(C2);
        const Q2 = EC(Math.round((F2 / parseFloat(T2)) * 1e3) / 1e3),
          J2 = EC(Math.round((A2 / parseFloat(O2)) * 1e3) / 1e3);
        if (Q2 === 0 || J2 === 0 || (Cy(n2) && !Py(n2))) return;
        const { offset: Z2, targetOffset: ee2 } = k2;
        let [te2, ne2] = CC(P2, Z2);
        const [re2, oe2] = CC(_2, ee2);
        (_2.x -= re2), (_2.y -= oe2);
        const [ae2, le2] = k2.points || [],
          ie2 = _C(le2),
          se2 = _C(ae2),
          ue2 = PC(_2, ie2),
          ce2 = PC(P2, se2),
          de2 = { ...k2 };
        let fe2 = [se2, ie2],
          pe2 = ue2.x - ce2.x + te2,
          he2 = ue2.y - ce2.y + ne2;
        const me2 = e7(pe2, he2),
          ge2 = e7(pe2, he2, X2),
          ve2 = PC(_2, ["t", "l"]),
          ye2 = PC(P2, ["t", "l"]),
          be2 = PC(_2, ["b", "r"]),
          we2 = PC(P2, ["b", "r"]),
          Ee2 = k2.overflow || {},
          { adjustX: Se2, adjustY: xe2, shiftX: ke2, shiftY: Ce2 } = Ee2,
          _e2 = (e8) => (typeof e8 == "boolean" ? e8 : e8 >= 0);
        let Pe2, Oe2, Te2, Ne2;
        s3();
        const $e2 = _e2(xe2),
          Me2 = se2[0] === ie2[0];
        if ($e2 && se2[0] === "t" && (Oe2 > G2.bottom || p2.current.bt)) {
          let t3 = he2;
          Me2 ? (t3 -= A2 - z2) : (t3 = ve2.y - we2.y - ne2);
          const n3 = e7(pe2, t3),
            r3 = e7(pe2, t3, X2);
          n3 > me2 || (n3 === me2 && (!W2 || r3 >= ge2))
            ? ((p2.current.bt = !0),
              (he2 = t3),
              (ne2 = -ne2),
              (fe2 = [OC(fe2[0], 0), OC(fe2[1], 0)]))
            : (p2.current.bt = !1);
        }
        if ($e2 && se2[0] === "b" && (Pe2 < G2.top || p2.current.tb)) {
          let t3 = he2;
          Me2 ? (t3 += A2 - z2) : (t3 = be2.y - ye2.y - ne2);
          const n3 = e7(pe2, t3),
            r3 = e7(pe2, t3, X2);
          n3 > me2 || (n3 === me2 && (!W2 || r3 >= ge2))
            ? ((p2.current.tb = !0),
              (he2 = t3),
              (ne2 = -ne2),
              (fe2 = [OC(fe2[0], 0), OC(fe2[1], 0)]))
            : (p2.current.tb = !1);
        }
        const Re2 = _e2(Se2),
          Le2 = se2[1] === ie2[1];
        if (Re2 && se2[1] === "l" && (Ne2 > G2.right || p2.current.rl)) {
          let t3 = pe2;
          Le2 ? (t3 -= F2 - j2) : (t3 = ve2.x - we2.x - te2);
          const n3 = e7(t3, he2),
            r3 = e7(t3, he2, X2);
          n3 > me2 || (n3 === me2 && (!W2 || r3 >= ge2))
            ? ((p2.current.rl = !0),
              (pe2 = t3),
              (te2 = -te2),
              (fe2 = [OC(fe2[0], 1), OC(fe2[1], 1)]))
            : (p2.current.rl = !1);
        }
        if (Re2 && se2[1] === "r" && (Te2 < G2.left || p2.current.lr)) {
          let t3 = pe2;
          Le2 ? (t3 += F2 - j2) : (t3 = be2.x - ye2.x - te2);
          const n3 = e7(t3, he2),
            r3 = e7(t3, he2, X2);
          n3 > me2 || (n3 === me2 && (!W2 || r3 >= ge2))
            ? ((p2.current.lr = !0),
              (pe2 = t3),
              (te2 = -te2),
              (fe2 = [OC(fe2[0], 1), OC(fe2[1], 1)]))
            : (p2.current.lr = !1);
        }
        (de2.points = [TC(fe2[0]), TC(fe2[1])]), s3();
        const Ie2 = ke2 === !0 ? 0 : ke2;
        typeof Ie2 == "number" &&
          (Te2 < X2.left &&
            ((pe2 -= Te2 - X2.left - te2),
            _2.x + j2 < X2.left + Ie2 && (pe2 += _2.x - X2.left + j2 - Ie2)),
          Ne2 > X2.right &&
            ((pe2 -= Ne2 - X2.right - te2),
            _2.x > X2.right - Ie2 && (pe2 += _2.x - X2.right + Ie2)));
        const Ae2 = Ce2 === !0 ? 0 : Ce2;
        typeof Ae2 == "number" &&
          (Pe2 < X2.top &&
            ((he2 -= Pe2 - X2.top - ne2),
            _2.y + z2 < X2.top + Ae2 && (he2 += _2.y - X2.top + z2 - Ae2)),
          Oe2 > X2.bottom &&
            ((he2 -= Oe2 - X2.bottom - ne2),
            _2.y > X2.bottom - Ae2 && (he2 += _2.y - X2.bottom + Ae2)));
        const Fe2 = P2.x + pe2,
          ze2 = Fe2 + F2,
          je2 = P2.y + he2,
          De2 = je2 + A2,
          He2 = _2.x,
          Ve2 = He2 + j2,
          Be2 = _2.y,
          Ue2 = Be2 + z2,
          We2 = (Math.max(Fe2, He2) + Math.min(ze2, Ve2)) / 2 - Fe2,
          qe2 = (Math.max(je2, Be2) + Math.min(De2, Ue2)) / 2 - je2;
        i2?.(t2, de2);
        let Xe2 = Y2.right - P2.x - (pe2 + P2.width),
          Ke2 = Y2.bottom - P2.y - (he2 + P2.height);
        Q2 === 1 && ((pe2 = Math.floor(pe2)), (Xe2 = Math.floor(Xe2))),
          J2 === 1 && ((he2 = Math.floor(he2)), (Ke2 = Math.floor(Ke2))),
          c2({
            ready: !0,
            offsetX: pe2 / Q2,
            offsetY: he2 / J2,
            offsetR: Xe2 / Q2,
            offsetB: Ke2 / J2,
            arrowX: We2 / Q2,
            arrowY: qe2 / J2,
            scaleX: Q2,
            scaleY: J2,
            align: de2,
          });
      }
    }),
    m2 = () => {
      c2((e7) => ({ ...e7, ready: !1 }));
    };
  return (
    xv(m2, [o2]),
    xv(() => {
      e6 || m2();
    }, [e6]),
    [
      u2.ready,
      u2.offsetX,
      u2.offsetY,
      u2.offsetR,
      u2.offsetB,
      u2.arrowX,
      u2.arrowY,
      u2.scaleX,
      u2.scaleY,
      u2.align,
      () => {
        d2.current += 1;
        const e7 = d2.current;
        Promise.resolve().then(() => {
          d2.current === e7 && h2();
        });
      },
    ]
  );
}
function $C() {
  const e6 = r.useRef(null),
    t2 = () => {
      e6.current && (clearTimeout(e6.current), (e6.current = null));
    };
  return (
    r.useEffect(
      () => () => {
        t2();
      },
      [],
    ),
    (n2, r2) => {
      t2(),
        r2 === 0
          ? n2()
          : (e6.current = setTimeout(() => {
              n2();
            }, 1e3 * r2));
    }
  );
}
function MC() {
  return (
    (MC = Object.assign
      ? Object.assign.bind()
      : function (e6) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = arguments[t2];
            for (var r2 in n2) Object.prototype.hasOwnProperty.call(n2, r2) && (e6[r2] = n2[r2]);
          }
          return e6;
        }),
    MC.apply(this, arguments)
  );
}
const RC = (e6) => {
    const {
        prefixCls: t2,
        isMobile: n2,
        ready: r2,
        open: o2,
        align: a2,
        offsetR: l2,
        offsetB: s2,
        offsetX: u2,
        offsetY: c2,
        arrowPos: d2,
        popupSize: f2,
        motion: p2,
        uniqueContainerClassName: h2,
        uniqueContainerStyle: m2,
      } = e6,
      g2 = `${t2}-unique-container`,
      [v2, y2] = i.useState(!1),
      b2 = dC(n2, r2, o2, a2, l2, s2, u2, c2),
      w2 = i.useRef(b2);
    r2 && (w2.current = b2);
    const E2 = {};
    return (
      f2 && ((E2.width = f2.width), (E2.height = f2.height)),
      i.createElement(
        ck,
        MC(
          {
            motionAppear: !0,
            motionEnter: !0,
            motionLeave: !0,
            removeOnLeave: !1,
            leavedClassName: `${g2}-hidden`,
          },
          p2,
          {
            visible: o2,
            onVisibleChanged: (e7) => {
              y2(e7);
            },
          },
        ),
        ({ className: e7, style: t3 }) => {
          const n3 = Sb(g2, e7, h2, { [`${g2}-visible`]: v2 });
          return i.createElement("div", {
            className: n3,
            style: {
              "--arrow-x": `${d2?.x || 0}px`,
              "--arrow-y": `${d2?.y || 0}px`,
              ...w2.current,
              ...E2,
              ...t3,
              ...m2,
            },
          });
        },
      )
    );
  },
  LC = ({ children: e6, postTriggerProps: t2 }) => {
    const [n2, o2, a2, l2] = (function () {
        const [e7, t3] = i.useState(null),
          [n3, r2] = i.useState(!1),
          [o3, a3] = i.useState(!1),
          l3 = i.useRef(null),
          s3 = wv((e8) => {
            e8 === !1
              ? ((l3.current = null), r2(!1))
              : o3 && n3
                ? (l3.current = e8)
                : (r2(!0), t3(e8), (l3.current = null), n3 || a3(!0));
          }),
          u3 = wv((e8) => {
            e8
              ? (a3(!1), l3.current && (t3(l3.current), (l3.current = null)))
              : (a3(!1), (l3.current = null));
          });
        return [s3, n3, e7, u3];
      })(),
      s2 = r.useMemo(() => (a2 && t2 ? t2(a2) : a2), [a2, t2]),
      [u2, c2] = r.useState(null),
      [d2, f2] = r.useState(null),
      p2 = r.useRef(null),
      h2 = wv((e7) => {
        (p2.current = e7), Cy(e7) && u2 !== e7 && c2(e7);
      }),
      m2 = r.useRef(null),
      g2 = $C(),
      v2 = wv((e7, t3) => {
        (m2.current = t3),
          g2(() => {
            n2(e7);
          }, e7.delay);
      }),
      y2 = (e7) => {
        g2(() => {
          var e8;
          ((e8 = m2.current) != null && e8.call(m2)) || n2(!1);
        }, e7);
      },
      b2 = wv((e7) => {
        l2(e7);
      }),
      [w2, E2, S2, x2, k2, C2, _2, , , P2, O2] = NC(
        o2,
        u2,
        s2?.target,
        s2?.popupPlacement,
        s2?.builtinPlacements || {},
        s2?.popupAlign,
        void 0,
        !1,
      ),
      T2 = r.useMemo(() => {
        var e7;
        return s2
          ? Sb(
              yC(s2.builtinPlacements || {}, s2.prefixCls || "", P2, !1),
              (e7 = s2.getPopupClassNameFromAlign) == null ? void 0 : e7.call(s2, P2),
            )
          : "";
      }, [P2, s2?.getPopupClassNameFromAlign, s2?.builtinPlacements, s2?.prefixCls]),
      N2 = r.useMemo(() => ({ show: v2, hide: y2 }), []);
    r.useEffect(() => {
      O2();
    }, [s2?.target]);
    const $2 = wv(() => (O2(), Promise.resolve())),
      M2 = r.useRef({}),
      R2 = r.useContext(hC),
      L2 = r.useMemo(
        () => ({
          registerSubPopup: (e7, t3) => {
            (M2.current[e7] = t3), R2?.registerSubPopup(e7, t3);
          },
        }),
        [R2],
      ),
      I2 = s2?.prefixCls;
    return r.createElement(
      mC.Provider,
      { value: N2 },
      e6,
      s2 &&
        r.createElement(
          hC.Provider,
          { value: L2 },
          r.createElement(
            pC,
            {
              ref: h2,
              portal: lC,
              onEsc: s2.onEsc,
              prefixCls: I2,
              popup: s2.popup,
              className: Sb(s2.popupClassName, T2, `${I2}-unique-controlled`),
              style: s2.popupStyle,
              target: s2.target,
              open: o2,
              keepDom: !0,
              fresh: !0,
              autoDestroy: !1,
              onVisibleChanged: b2,
              ready: w2,
              offsetX: E2,
              offsetY: S2,
              offsetR: x2,
              offsetB: k2,
              onAlign: O2,
              onPrepare: $2,
              onResize: (e7) => f2({ width: e7.offsetWidth, height: e7.offsetHeight }),
              arrowPos: { x: C2, y: _2 },
              align: P2,
              zIndex: s2.zIndex,
              mask: s2.mask,
              arrow: s2.arrow,
              motion: s2.popupMotion,
              maskMotion: s2.maskMotion,
              getPopupContainer: s2.getPopupContainer,
            },
            r.createElement(RC, {
              prefixCls: I2,
              isMobile: !1,
              ready: w2,
              open: o2,
              align: P2,
              offsetR: x2,
              offsetB: k2,
              offsetX: E2,
              offsetY: S2,
              arrowPos: { x: C2, y: _2 },
              popupSize: d2,
              motion: s2.popupMotion,
              uniqueContainerClassName: Sb(s2.uniqueContainerClassName, T2),
              uniqueContainerStyle: s2.uniqueContainerStyle,
            }),
          ),
        ),
    );
  },
  IC = (function (e6 = lC) {
    return r.forwardRef((t2, n2) => {
      const {
          prefixCls: a2 = "rc-trigger-popup",
          children: l2,
          action: i2 = "hover",
          showAction: s2,
          hideAction: u2,
          disabled: c2 = !1,
          popupVisible: d2,
          defaultPopupVisible: f2,
          onOpenChange: p2,
          afterOpenChange: h2,
          onPopupVisibleChange: m2,
          afterPopupVisibleChange: g2,
          mouseEnterDelay: v2,
          mouseLeaveDelay: y2 = 0.1,
          focusDelay: b2,
          blurDelay: w2,
          mask: E2,
          maskClosable: S2 = !0,
          getPopupContainer: x2,
          forceRender: k2,
          autoDestroy: C2,
          popup: _2,
          popupClassName: P2,
          uniqueContainerClassName: O2,
          uniqueContainerStyle: T2,
          popupStyle: N2,
          popupPlacement: $2,
          builtinPlacements: M2 = {},
          popupAlign: R2,
          zIndex: L2,
          stretch: I2,
          getPopupClassNameFromAlign: A2,
          fresh: F2,
          unique: z2,
          alignPoint: j2,
          onPopupClick: D2,
          onPopupAlign: H2,
          arrow: V2,
          popupMotion: B2,
          maskMotion: U2,
          mobile: W2,
          ...q2
        } = t2,
        X2 = C2 || !1,
        K2 = d2 === void 0,
        G2 = !!W2,
        Y2 = r.useRef({}),
        Q2 = r.useContext(hC),
        J2 = r.useMemo(
          () => ({
            registerSubPopup: (e7, t3) => {
              (Y2.current[e7] = t3), Q2?.registerSubPopup(e7, t3);
            },
          }),
          [Q2],
        ),
        Z2 = r.useContext(mC),
        ee2 = Av(),
        [te2, ne2] = r.useState(null),
        re2 = r.useRef(null),
        oe2 = wv((e7) => {
          (re2.current = e7), Cy(e7) && te2 !== e7 && ne2(e7), Q2?.registerSubPopup(ee2, e7);
        }),
        [ae2, le2] = r.useState(null),
        ie2 = r.useRef(null),
        se2 = wv((e7) => {
          const t3 = _y(e7);
          Cy(t3) && ae2 !== t3 && (le2(t3), (ie2.current = t3));
        }),
        ue2 = {},
        ce2 = wv((e7) => {
          var t3, n3;
          const r2 = ae2;
          return (
            r2?.contains(e7) ||
            ((t3 = Ty(r2)) == null ? void 0 : t3.host) === e7 ||
            e7 === r2 ||
            te2?.contains(e7) ||
            ((n3 = Ty(te2)) == null ? void 0 : n3.host) === e7 ||
            e7 === te2 ||
            Object.values(Y2.current).some((t4) => t4?.contains(e7) || e7 === t4)
          );
        }),
        de2 = V2 ? { ...(V2 !== !0 ? V2 : {}) } : null,
        [fe2, pe2] = _v(f2 || !1, d2),
        he2 = fe2 || !1,
        me2 = he2 && !c2,
        ge2 = r.useMemo(() => {
          const e7 = typeof l2 == "function" ? l2({ open: me2 }) : l2;
          return r.Children.only(e7);
        }, [l2, me2]),
        ve2 = ge2?.props || {},
        ye2 = wv(() => me2),
        be2 = wv((e7 = 0) => ({
          popup: _2,
          target: ae2,
          delay: e7,
          prefixCls: a2,
          popupClassName: P2,
          uniqueContainerClassName: O2,
          uniqueContainerStyle: T2,
          popupStyle: N2,
          popupPlacement: $2,
          builtinPlacements: M2,
          popupAlign: R2,
          zIndex: L2,
          mask: E2,
          maskClosable: S2,
          popupMotion: B2,
          maskMotion: U2,
          arrow: de2,
          getPopupContainer: x2,
          getPopupClassNameFromAlign: A2,
          id: ee2,
          onEsc: ke2,
        }));
      xv(() => {
        Z2 && z2 && ae2 && !K2 && !Q2 && (me2 ? Z2.show(be2(v2), ye2) : Z2.hide(y2));
      }, [me2, ae2]);
      const we2 = r.useRef(me2);
      we2.current = me2;
      const Ee2 = wv((e7) => {
          o.flushSync(() => {
            he2 !== e7 && (pe2(e7), p2?.(e7), m2?.(e7));
          });
        }),
        Se2 = $C(),
        xe2 = (e7, t3 = 0) => {
          d2 === void 0 && Z2 && z2 && K2 && !Q2
            ? e7
              ? Z2.show(be2(t3), ye2)
              : Z2.hide(t3)
            : Se2(() => {
                Ee2(e7);
              }, t3);
        };
      function ke2({ top: e7 }) {
        e7 && xe2(!1);
      }
      const [Ce2, _e2] = r.useState(!1);
      xv(
        (e7) => {
          (e7 && !me2) || _e2(!0);
        },
        [me2],
      );
      const [Pe2, Oe2] = r.useState(null),
        [Te2, Ne2] = r.useState(null),
        $e2 = (e7) => {
          Ne2([e7.clientX, e7.clientY]);
        },
        [Me2, Re2, Le2, Ie2, Ae2, Fe2, ze2, je2, De2, He2, Ve2] = NC(
          me2,
          te2,
          j2 && Te2 !== null ? Te2 : ae2,
          $2,
          M2,
          R2,
          H2,
          G2,
        ),
        [Be2, Ue2] = (function (e7, t3, n3) {
          return r.useMemo(() => {
            const r2 = gC(t3 ?? e7),
              o2 = gC(n3 ?? e7),
              a3 = new Set(r2),
              l3 = new Set(o2);
            return (
              a3.has("hover") && !a3.has("click") && a3.add("touch"),
              l3.has("hover") && !l3.has("click") && l3.add("touch"),
              [a3, l3]
            );
          }, [e7, t3, n3]);
        })(i2, s2, u2),
        We2 = Be2.has("click"),
        qe2 = Ue2.has("click") || Ue2.has("contextMenu"),
        Xe2 = wv(() => {
          Ce2 || Ve2();
        });
      (function (e7, t3, n3, r2, o2) {
        xv(() => {
          if (e7 && t3 && n3) {
            let e8 = function () {
              r2(), o2();
            };
            const a3 = n3,
              l3 = wC(t3),
              i3 = wC(a3),
              s3 = bC(a3),
              u3 = new Set([s3, ...l3, ...i3]);
            return (
              u3.forEach((t4) => {
                t4.addEventListener("scroll", e8, { passive: !0 });
              }),
              s3.addEventListener("resize", e8, { passive: !0 }),
              r2(),
              () => {
                u3.forEach((t4) => {
                  t4.removeEventListener("scroll", e8), s3.removeEventListener("resize", e8);
                });
              }
            );
          }
        }, [e7, t3, n3]);
      })(me2, ae2, te2, Xe2, () => {
        we2.current && j2 && qe2 && xe2(!1);
      }),
        xv(() => {
          Xe2();
        }, [Te2, $2]),
        xv(() => {
          me2 && !M2?.[$2] && Xe2();
        }, [JSON.stringify(R2)]);
      const Ke2 = r.useMemo(() => Sb(yC(M2, a2, He2, j2), A2?.(He2)), [He2, A2, M2, a2, j2]);
      r.useImperativeHandle(n2, () => ({
        nativeElement: ie2.current,
        popupElement: re2.current,
        forceAlign: Xe2,
      }));
      const [Ge2, Ye2] = r.useState(0),
        [Qe2, Je2] = r.useState(0),
        Ze2 = () => {
          if (I2 && ae2) {
            const e7 = ae2.getBoundingClientRect();
            Ye2(e7.width), Je2(e7.height);
          }
        };
      function et2(e7, t3, n3, r2, o2) {
        ue2[e7] = (a3, ...l3) => {
          var i3;
          (o2 && o2()) || (r2?.(a3), xe2(t3, n3)),
            (i3 = ve2[e7]) == null || i3.call(ve2, a3, ...l3);
        };
      }
      xv(() => {
        Pe2 && (Ve2(), Pe2(), Oe2(null));
      }, [Pe2]);
      const tt2 = Be2.has("touch"),
        nt2 = Ue2.has("touch"),
        rt2 = r.useRef(!1);
      (tt2 || nt2) &&
        (ue2.onTouchStart = (...e7) => {
          var t3;
          (rt2.current = !0),
            we2.current && nt2 ? xe2(!1) : !we2.current && tt2 && xe2(!0),
            (t3 = ve2.onTouchStart) == null || t3.call(ve2, ...e7);
        }),
        (We2 || qe2) &&
          (ue2.onClick = (e7, ...t3) => {
            var n3;
            we2.current && qe2 ? xe2(!1) : !we2.current && We2 && ($e2(e7), xe2(!0)),
              (n3 = ve2.onClick) == null || n3.call(ve2, e7, ...t3),
              (rt2.current = !1);
          });
      const ot2 = (function (e7, t3, n3, o2, a3, l3, i3, s3) {
          const u3 = r.useRef(e7);
          u3.current = e7;
          const c3 = r.useRef(!1);
          return (
            r.useEffect(() => {
              if (t3 && o2 && (!a3 || l3)) {
                const e8 = () => {
                    c3.current = !1;
                  },
                  t4 = (e9) => {
                    var t5, n4;
                    !u3.current ||
                      i3(
                        ((n4 = (t5 = e9.composedPath) == null ? void 0 : t5.call(e9)) == null
                          ? void 0
                          : n4[0]) || e9.target,
                      ) ||
                      c3.current ||
                      s3(!1);
                  },
                  r2 = bC(o2);
                r2.addEventListener("pointerdown", e8, !0),
                  r2.addEventListener("mousedown", t4, !0),
                  r2.addEventListener("contextmenu", t4, !0);
                const a4 = Ty(n3);
                return (
                  a4 &&
                    (a4.addEventListener("mousedown", t4, !0),
                    a4.addEventListener("contextmenu", t4, !0)),
                  () => {
                    r2.removeEventListener("pointerdown", e8, !0),
                      r2.removeEventListener("mousedown", t4, !0),
                      r2.removeEventListener("contextmenu", t4, !0),
                      a4 &&
                        (a4.removeEventListener("mousedown", t4, !0),
                        a4.removeEventListener("contextmenu", t4, !0));
                  }
                );
              }
            }, [t3, n3, o2, a3, l3]),
            function () {
              c3.current = !0;
            }
          );
        })(me2, qe2 || nt2, ae2, te2, E2, S2, ce2, xe2),
        at2 = Be2.has("hover"),
        lt2 = Ue2.has("hover");
      let it2, st2;
      const ut2 = () => rt2.current;
      if (at2) {
        const e7 = (e8) => {
          $e2(e8);
        };
        et2("onMouseEnter", !0, v2, e7, ut2),
          et2("onPointerEnter", !0, v2, e7, ut2),
          (it2 = (e8) => {
            (me2 || Ce2) && te2?.contains(e8.target) && xe2(!0, v2);
          }),
          j2 &&
            (ue2.onMouseMove = (e8) => {
              var t3;
              (t3 = ve2.onMouseMove) == null || t3.call(ve2, e8);
            });
      }
      lt2 &&
        (et2("onMouseLeave", !1, y2, void 0, ut2),
        et2("onPointerLeave", !1, y2, void 0, ut2),
        (st2 = () => {
          xe2(!1, y2);
        })),
        Be2.has("focus") && et2("onFocus", !0, b2),
        Ue2.has("focus") && et2("onBlur", !1, w2),
        Be2.has("contextMenu") &&
          (ue2.onContextMenu = (e7, ...t3) => {
            var n3;
            we2.current && Ue2.has("contextMenu") ? xe2(!1) : ($e2(e7), xe2(!0)),
              e7.preventDefault(),
              (n3 = ve2.onContextMenu) == null || n3.call(ve2, e7, ...t3);
          });
      const ct2 = r.useRef(!1);
      ct2.current || (ct2.current = k2 || me2 || Ce2);
      const dt2 = { ...ve2, ...ue2 },
        ft2 = {};
      [
        "onContextMenu",
        "onClick",
        "onMouseDown",
        "onTouchStart",
        "onMouseEnter",
        "onMouseLeave",
        "onFocus",
        "onBlur",
      ].forEach((e7) => {
        q2[e7] &&
          (ft2[e7] = (...t3) => {
            var n3;
            (n3 = dt2[e7]) == null || n3.call(dt2, ...t3), q2[e7](...t3);
          });
      });
      const pt2 = { x: Fe2, y: ze2 };
      mb(me2, ae2, () => {
        Ze2(), Xe2();
      });
      const ht2 = uy(se2, py(ge2)),
        mt2 = r.cloneElement(ge2, { ...dt2, ...ft2, ref: ht2 });
      return r.createElement(
        r.Fragment,
        null,
        mt2,
        ct2.current &&
          (!Z2 || !z2) &&
          r.createElement(
            hC.Provider,
            { value: J2 },
            r.createElement(pC, {
              portal: e6,
              ref: oe2,
              prefixCls: a2,
              popup: _2,
              className: Sb(P2, !G2 && Ke2),
              style: N2,
              target: ae2,
              onMouseEnter: it2,
              onMouseLeave: st2,
              onPointerEnter: it2,
              zIndex: L2,
              open: me2,
              keepDom: Ce2,
              fresh: F2,
              onClick: D2,
              onPointerDownCapture: ot2,
              mask: E2,
              motion: B2,
              maskMotion: U2,
              onVisibleChanged: (e7) => {
                _e2(!1), Ve2(), h2?.(e7), g2?.(e7);
              },
              onPrepare: () =>
                new Promise((e7) => {
                  Ze2(), Oe2(() => e7);
                }),
              forceRender: k2,
              autoDestroy: X2,
              getPopupContainer: x2,
              onEsc: ke2,
              align: He2,
              arrow: de2,
              arrowPos: pt2,
              ready: Me2,
              offsetX: Re2,
              offsetY: Le2,
              offsetR: Ie2,
              offsetB: Ae2,
              onAlign: Xe2,
              stretch: I2,
              targetWidth: Ge2 / je2,
              targetHeight: Qe2 / De2,
              mobile: W2,
            }),
          ),
      );
    });
  })(lC);
function AC(e6) {
  return e6 && i.isValidElement(e6) && e6.type === i.Fragment;
}
function FC(e6, t2) {
  return ((e7, t3, n2) =>
    i.isValidElement(e7) ? i.cloneElement(e7, hk(n2) ? n2(e7.props || {}) : n2) : t3)(e6, e6, t2);
}
const zC = ({ children: e6 }) => {
    const { getPrefixCls: t2 } = i.useContext(Tb),
      n2 = t2();
    return i.isValidElement(e6)
      ? i.createElement(
          ck,
          {
            visible: !0,
            motionName: `${n2}-fade`,
            motionAppear: !0,
            motionEnter: !0,
            motionLeave: !1,
            removeOnLeave: !1,
          },
          ({ style: t3, className: n3 }) =>
            FC(e6, (e7) => ({ className: Sb(e7.className, n3), style: { ...e7.style, ...t3 } })),
        )
      : e6;
  },
  jC = [null, null],
  DC = ({ children: e6 }) =>
    i.createElement(
      LC,
      {
        postTriggerProps: (e7) => {
          const { id: t2, builtinPlacements: n2, popup: r2 } = e7,
            o2 = hk(r2) ? r2() : r2,
            a2 = (function (e8) {
              if (jC[0] !== e8) {
                const t3 = {};
                Object.keys(e8).forEach((n3) => {
                  t3[n3] = { ...e8[n3], dynamicInset: !1 };
                }),
                  (jC[0] = e8),
                  (jC[1] = t3);
              }
              return jC[1];
            })(n2);
          return {
            ...e7,
            getPopupContainer: null,
            arrow: !1,
            popup: i.createElement(zC, { key: t2 }, o2),
            builtinPlacements: a2,
          };
        },
      },
      e6,
    ),
  HC = r.createContext(!1),
  VC = ({ children: e6, disabled: t2 }) => {
    const n2 = r.useContext(HC);
    return r.createElement(HC.Provider, { value: t2 ?? n2 }, e6);
  },
  BC = r.createContext(void 0),
  UC = ({ children: e6, size: t2 }) => {
    const n2 = r.useContext(BC);
    return r.createElement(BC.Provider, { value: t2 || n2 }, e6);
  },
  WC = BC,
  qC = r.createContext(!0);
function XC(e6) {
  const t2 = r.useContext(qC),
    { children: n2 } = e6,
    [, o2] = WS(),
    { motion: a2 } = o2,
    l2 = r.useRef(!1);
  return (
    l2.current || (l2.current = t2 !== a2),
    l2.current
      ? r.createElement(qC.Provider, { value: a2 }, r.createElement(Ix, { motion: a2 }, n2))
      : n2
  );
}
const KC = () => null,
  GC = ({ iconPrefixCls: e6, csp: t2 }) => (ax(e6, t2), null),
  YC = [
    "getTargetContainer",
    "getPopupContainer",
    "renderEmpty",
    "input",
    "pagination",
    "form",
    "select",
    "button",
  ];
let QC, JC, ZC, e_;
function t_() {
  return QC || _b;
}
function n_() {
  return JC || Pb;
}
const r_ = () => ({
    getPrefixCls: (e6, t2) => t2 || (e6 ? `${t_()}-${e6}` : t_()),
    getIconPrefixCls: n_,
    getRootPrefixCls: () => QC || t_(),
    getTheme: () => ZC,
    holderRender: e_,
  }),
  o_ = (e6) => {
    const {
        children: t2,
        csp: n2,
        autoInsertSpaceInButton: o2,
        alert: a2,
        affix: l2,
        anchor: i2,
        app: s2,
        form: u2,
        locale: c2,
        componentSize: d2,
        direction: f2,
        space: p2,
        splitter: h2,
        virtual: m2,
        dropdownMatchSelectWidth: g2,
        popupMatchSelectWidth: v2,
        popupOverflow: y2,
        legacyLocale: b2,
        parentContext: w2,
        iconPrefixCls: E2,
        theme: S2,
        componentDisabled: x2,
        segmented: k2,
        statistic: C2,
        spin: _2,
        calendar: P2,
        carousel: O2,
        cascader: T2,
        collapse: N2,
        typography: $2,
        checkbox: M2,
        descriptions: R2,
        divider: L2,
        drawer: I2,
        skeleton: A2,
        steps: F2,
        image: z2,
        layout: j2,
        list: D2,
        listy: H2,
        mentions: V2,
        modal: B2,
        progress: U2,
        result: W2,
        slider: q2,
        breadcrumb: X2,
        masonry: K2,
        menu: G2,
        pagination: Y2,
        input: Q2,
        inputPassword: J2,
        inputSearch: Z2,
        textArea: ee2,
        otp: te2,
        empty: ne2,
        badge: re2,
        borderBeam: oe2,
        radio: ae2,
        rate: le2,
        ribbon: ie2,
        switch: se2,
        transfer: ue2,
        avatar: ce2,
        message: de2,
        tag: fe2,
        table: pe2,
        card: he2,
        cardMeta: me2,
        tabs: ge2,
        timeline: ve2,
        timePicker: ye2,
        upload: be2,
        notification: we2,
        tree: Ee2,
        colorPicker: Se2,
        datePicker: xe2,
        rangePicker: ke2,
        flex: Ce2,
        wave: _e2,
        dropdown: Pe2,
        warning: Oe2,
        tour: Te2,
        tooltip: Ne2,
        popover: $e2,
        popconfirm: Me2,
        qrcode: Re2,
        floatButton: Le2,
        floatButtonGroup: Ie2,
        variant: Ae2,
        inputNumber: Fe2,
        treeSelect: ze2,
        watermark: je2,
      } = e6,
      De2 = r.useMemo(() => {
        var e7;
        return pk(c2) &&
          Object.prototype.hasOwnProperty.call(c2, "default") &&
          (e7 = c2.default) != null &&
          e7.locale
          ? c2.default
          : c2;
      }, [c2]),
      He2 = r.useCallback(
        (t3, n3) => {
          const { prefixCls: r2 } = e6;
          if (n3) return n3;
          const o3 = r2 || w2.getPrefixCls("");
          return t3 ? `${o3}-${t3}` : o3;
        },
        [w2.getPrefixCls, e6.prefixCls],
      ),
      Ve2 = E2 || w2.iconPrefixCls || Pb,
      Be2 = n2 || w2.csp,
      Ue2 = (function (e7, t3, n3) {
        ub();
        const o3 = e7 || {},
          a3 =
            o3.inherit !== !1 && t3
              ? t3
              : {
                  ...FS,
                  hashed: t3?.hashed ?? FS.hashed,
                  cssVar: t3?.cssVar,
                  zeroRuntime: t3?.zeroRuntime,
                },
          l3 = r.useId();
        return Fv(
          () => {
            var r2;
            if (!e7) return t3;
            const i3 = { ...a3.components };
            Object.keys(e7.components || {}).forEach((t4) => {
              i3[t4] = { ...i3[t4], ...e7.components[t4] };
            });
            const s3 = `css-var-${l3.replace(/:/g, "")}`,
              u3 = {
                prefix: n3?.prefixCls,
                ...a3.cssVar,
                ...o3.cssVar,
                key: ((r2 = o3.cssVar) == null ? void 0 : r2.key) || s3,
              };
            return {
              ...a3,
              ...o3,
              token: { ...a3.token, ...o3.token },
              components: i3,
              cssVar: u3,
            };
          },
          [o3, a3, n3?.prefixCls, l3],
          (e8, t4) => e8.some((e9, n4) => !Dy(e9, t4[n4], !0)),
        );
      })(S2, w2.theme, { prefixCls: He2("") }),
      We2 = {
        csp: Be2,
        autoInsertSpaceInButton: o2,
        alert: a2,
        affix: l2,
        anchor: i2,
        app: s2,
        locale: De2 || b2,
        direction: f2,
        space: p2,
        splitter: h2,
        virtual: m2,
        popupMatchSelectWidth: v2 ?? g2,
        popupOverflow: y2,
        getPrefixCls: He2,
        iconPrefixCls: Ve2,
        theme: Ue2,
        segmented: k2,
        statistic: C2,
        spin: _2,
        calendar: P2,
        carousel: O2,
        cascader: T2,
        collapse: N2,
        typography: $2,
        checkbox: M2,
        descriptions: R2,
        divider: L2,
        drawer: I2,
        skeleton: A2,
        steps: F2,
        image: z2,
        input: Q2,
        inputPassword: J2,
        inputSearch: Z2,
        textArea: ee2,
        otp: te2,
        layout: j2,
        list: D2,
        listy: H2,
        mentions: V2,
        modal: B2,
        progress: U2,
        result: W2,
        slider: q2,
        breadcrumb: X2,
        masonry: K2,
        menu: G2,
        pagination: Y2,
        empty: ne2,
        badge: re2,
        borderBeam: oe2,
        radio: ae2,
        rate: le2,
        ribbon: ie2,
        switch: se2,
        transfer: ue2,
        avatar: ce2,
        message: de2,
        tag: fe2,
        table: pe2,
        card: he2,
        cardMeta: me2,
        tabs: ge2,
        timeline: ve2,
        timePicker: ye2,
        upload: be2,
        notification: we2,
        tree: Ee2,
        colorPicker: Se2,
        datePicker: xe2,
        rangePicker: ke2,
        flex: Ce2,
        wave: _e2,
        dropdown: Pe2,
        warning: Oe2,
        tour: Te2,
        tooltip: Ne2,
        popover: $e2,
        popconfirm: Me2,
        qrcode: Re2,
        floatButton: Le2,
        floatButtonGroup: Ie2,
        variant: Ae2,
        inputNumber: Fe2,
        treeSelect: ze2,
        watermark: je2,
      },
      qe2 = { ...w2 };
    Object.keys(We2).forEach((e7) => {
      We2[e7] !== void 0 && (qe2[e7] = We2[e7]);
    }),
      YC.forEach((t3) => {
        const n3 = e6[t3];
        n3 && (qe2[t3] = n3);
      }),
      o2 !== void 0 && (qe2.button = { autoInsertSpace: o2, ...qe2.button });
    const Xe2 = Fv(
        () => qe2,
        qe2,
        (e7, t3) => {
          const n3 = Object.keys(e7),
            r2 = Object.keys(t3);
          return n3.length !== r2.length || n3.some((n4) => e7[n4] !== t3[n4]);
        },
      ),
      { layer: Ke2 } = r.useContext(jb),
      Ge2 = r.useMemo(
        () => ({
          prefixCls: Ve2,
          csp: Be2,
          layer: Ke2 ? "antd" : void 0,
          zeroRuntime: !!Ke2 || Ue2?.zeroRuntime,
        }),
        [Ve2, Be2, Ke2, Ue2?.zeroRuntime],
      );
    let Ye2 = r.createElement(
      r.Fragment,
      null,
      r.createElement(GC, { iconPrefixCls: Ve2, csp: Be2 }),
      r.createElement(KC, { dropdownMatchSelectWidth: g2 }),
      t2,
    );
    const Qe2 = r.useMemo(() => {
      var e7, t3, n3, r2;
      return lb(
        ((e7 = Dk.Form) == null ? void 0 : e7.defaultValidateMessages) || {},
        ((n3 = (t3 = Xe2.locale) == null ? void 0 : t3.Form) == null
          ? void 0
          : n3.defaultValidateMessages) || {},
        ((r2 = Xe2.form) == null ? void 0 : r2.validateMessages) || {},
        u2?.validateMessages || {},
      );
    }, [Xe2, u2?.validateMessages]);
    Object.keys(Qe2).length > 0 && (Ye2 = r.createElement(Nk.Provider, { value: Qe2 }, Ye2)),
      De2 && (Ye2 = r.createElement(Xk, { locale: De2, _ANT_MARK__: "internalMark" }, Ye2)),
      (Ve2 || Be2) && (Ye2 = r.createElement(lx.Provider, { value: Ge2 }, Ye2)),
      d2 && (Ye2 = r.createElement(UC, { size: d2 }, Ye2)),
      (Ye2 = r.createElement(XC, null, Ye2)),
      Ne2?.unique && (Ye2 = r.createElement(DC, null, Ye2));
    const Je2 = r.useMemo(() => {
      const { algorithm: e7, token: t3, components: n3, cssVar: r2, ...o3 } = Ue2 || {},
        a3 = e7 && (!Array.isArray(e7) || e7.length > 0) ? Wb(e7) : AS,
        l3 = {};
      Object.entries(n3 || {}).forEach(([e8, t4]) => {
        const n4 = { ...t4 };
        "algorithm" in n4 &&
          (n4.algorithm === !0
            ? (n4.theme = a3)
            : (Array.isArray(n4.algorithm) || hk(n4.algorithm)) && (n4.theme = Wb(n4.algorithm)),
          delete n4.algorithm),
          (l3[e8] = n4);
      });
      const i3 = { ...ZE, ...t3 };
      return {
        ...o3,
        theme: a3,
        token: i3,
        components: l3,
        override: { override: i3, ...l3 },
        cssVar: r2,
      };
    }, [Ue2]);
    return (
      S2 && (Ye2 = r.createElement(zS.Provider, { value: Je2 }, Ye2)),
      Xe2.warning && (Ye2 = r.createElement(sb.Provider, { value: Xe2.warning }, Ye2)),
      x2 !== void 0 && (Ye2 = r.createElement(VC, { disabled: x2 }, Ye2)),
      r.createElement(Tb.Provider, { value: Xe2 }, Ye2)
    );
  },
  a_ = (e6) => {
    const t2 = r.useContext(Tb),
      n2 = r.useContext(Wk);
    return r.createElement(o_, { parentContext: t2, legacyLocale: n2, ...e6 });
  };
(a_.ConfigContext = Tb),
  (a_.SizeContext = WC),
  (a_.config = (e6) => {
    const { prefixCls: t2, iconPrefixCls: n2, theme: r2, holderRender: o2 } = e6;
    t2 !== void 0 && (QC = t2),
      n2 !== void 0 && (JC = n2),
      "holderRender" in e6 && (e_ = o2),
      r2 && (ZC = r2);
  }),
  (a_.useConfig = function () {
    return { componentDisabled: r.useContext(HC), componentSize: r.useContext(WC) };
  }),
  Object.defineProperty(a_, "SizeContext", { get: () => WC });
const l_ = {
  icon: {
    tag: "svg",
    attrs: { viewBox: "0 0 1024 1024", focusable: "false" },
    children: [
      {
        tag: "path",
        attrs: {
          d: "M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z",
        },
      },
    ],
  },
  name: "loading",
  theme: "outlined",
};
function i_() {
  return (
    (i_ = Object.assign
      ? Object.assign.bind()
      : function (e6) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = arguments[t2];
            for (var r2 in n2) Object.prototype.hasOwnProperty.call(n2, r2) && (e6[r2] = n2[r2]);
          }
          return e6;
        }),
    i_.apply(this, arguments)
  );
}
const s_ = (e6, t2) => r.createElement(Cx, i_({}, e6, { ref: t2, icon: l_ })),
  u_ = r.forwardRef(s_);
function c_(...e6) {
  return e6.find((e7) => e7 !== void 0);
}
const d_ = (e6) => e6 === "horizontal" || e6 === "vertical",
  f_ = (e6, t2, n2) =>
    r.useMemo(() => {
      let r2;
      return (
        d_(e6)
          ? (r2 = e6)
          : typeof t2 == "boolean"
            ? (r2 = t2 ? "vertical" : "horizontal")
            : (r2 = d_(n2) ? n2 : "horizontal"),
        [r2, r2 === "vertical"]
      );
    }, [n2, e6, t2]),
  p_ = i.createContext(void 0),
  h_ = 100,
  m_ = 1e3,
  g_ = {
    Modal: h_,
    Drawer: h_,
    Popover: h_,
    Popconfirm: h_,
    Tooltip: h_,
    Tour: h_,
    FloatButton: h_,
  },
  v_ = { SelectLike: 50, Dropdown: 50, DatePicker: 50, Menu: 50, ImagePreview: 1 },
  y_ = (e6, t2) => {
    const [, n2] = WS(),
      r2 = i.useContext(p_),
      o2 = e6 in g_;
    let a2;
    if (t2 !== void 0) a2 = [t2, t2];
    else {
      let l2 = r2 ?? 0;
      (l2 += o2 ? (r2 ? 0 : n2.zIndexPopupBase) + g_[e6] : v_[e6]),
        (a2 = [r2 === void 0 ? t2 : l2, l2]);
    }
    return a2;
  },
  b_ = () => ({ height: 0, opacity: 0 }),
  w_ = (e6) => ({ height: e6?.scrollHeight ?? 0, opacity: e6 ? 1 : 0 }),
  E_ = (e6) => ({ height: e6?.offsetHeight ?? 0 }),
  S_ = (e6, t2) => t2?.deadline === !0 || (vk(t2) && t2.propertyName === "height"),
  x_ = (e6 = _b) => ({
    motionName: `${e6}-motion-collapse`,
    onAppearStart: b_,
    onEnterStart: b_,
    onAppearActive: w_,
    onEnterActive: w_,
    onLeaveStart: E_,
    onLeaveActive: b_,
    onAppearEnd: S_,
    onEnterEnd: S_,
    onLeaveEnd: S_,
    motionDeadline: 500,
  }),
  k_ = (e6, t2, n2) => (n2 !== void 0 ? n2 : `${e6}-${t2}`),
  C_ = (e6) => {
    const t2 = i.useContext(WC);
    return i.useMemo(() => (e6 ? (fk(e6) ? (e6 ?? t2) : hk(e6) ? e6(t2) : t2) : t2), [e6, t2]);
  },
  __ = tx(
    ["Space", "Compact"],
    (e6) => {
      const { componentCls: t2 } = e6;
      return {
        [t2]: {
          display: "inline-flex",
          "&-block": { display: "flex", width: "100%" },
          "&-vertical": { flexDirection: "column" },
          "&-rtl": { direction: "rtl" },
        },
      };
    },
    () => ({}),
    { resetStyle: !1 },
  ),
  P_ = r.createContext(null),
  O_ = (e6, t2) => {
    const n2 = r.useContext(P_),
      o2 = r.useMemo(() => {
        if (!n2) return "";
        const { compactDirection: r2, isFirstItem: o3, isLastItem: a2 } = n2,
          l2 = r2 === "vertical" ? "-vertical-" : "-";
        return Sb(`${e6}-compact${l2}item`, {
          [`${e6}-compact${l2}first-item`]: o3,
          [`${e6}-compact${l2}last-item`]: a2,
          [`${e6}-compact${l2}item-rtl`]: t2 === "rtl",
        });
      }, [e6, t2, n2]);
    return {
      compactSize: n2?.compactSize,
      compactDirection: n2?.compactDirection,
      compactItemClassnames: o2,
    };
  },
  T_ = (e6) => {
    const { children: t2 } = e6;
    return r.createElement(P_.Provider, { value: null }, t2);
  },
  N_ = (e6) => {
    const { children: t2, ...n2 } = e6;
    return r.createElement(P_.Provider, { value: r.useMemo(() => n2, [n2]) }, t2);
  },
  $_ = r.forwardRef((e6, t2) => {
    const { getPrefixCls: n2, direction: o2 } = r.useContext(Tb),
      {
        size: a2,
        direction: l2,
        orientation: i2,
        block: s2,
        prefixCls: u2,
        className: c2,
        rootClassName: d2,
        children: f2,
        vertical: p2,
        ...h2
      } = e6,
      [m2, g2] = f_(i2, p2, l2),
      v2 = C_((e7) => a2 ?? e7),
      y2 = n2("space-compact", u2),
      [b2] = __(y2),
      w2 = Sb(
        y2,
        b2,
        { [`${y2}-rtl`]: o2 === "rtl", [`${y2}-block`]: s2, [`${y2}-vertical`]: g2 },
        c2,
        d2,
      ),
      E2 = r.useContext(P_),
      S2 = r.useRef(null);
    r.useImperativeHandle(t2, () => ({ nativeElement: S2.current }));
    const x2 = Zy(f2),
      k2 = r.useMemo(
        () =>
          x2.map((e7, t3) => {
            const n3 = e7?.key || `${y2}-item-${t3}`;
            return r.createElement(
              N_,
              {
                key: n3,
                compactSize: v2,
                compactDirection: m2,
                isFirstItem: t3 === 0 && (!E2 || E2?.isFirstItem),
                isLastItem: t3 === x2.length - 1 && (!E2 || E2?.isLastItem),
              },
              e7,
            );
          }),
        [x2, E2, m2, v2, y2],
      );
    return x2.length === 0 ? null : r.createElement("div", { ref: S2, className: w2, ...h2 }, k2);
  }),
  M_ = (e6) => ({ animationDuration: e6, animationFillMode: "both" }),
  R_ = (e6, t2, n2, r2, o2 = !1) => {
    const a2 = o2 ? "&" : "";
    return {
      [`
      ${a2}${e6}-enter,
      ${a2}${e6}-appear
    `]: { ...M_(r2), animationPlayState: "paused" },
      [`${a2}${e6}-leave`]: { ...M_(r2), animationPlayState: "paused" },
      [`
      ${a2}${e6}-enter${e6}-enter-active,
      ${a2}${e6}-appear${e6}-appear-active
    `]: { animationName: t2, animationPlayState: "running" },
      [`${a2}${e6}-leave${e6}-leave-active`]: {
        animationName: n2,
        animationPlayState: "running",
        pointerEvents: "none",
      },
    };
  },
  L_ = new vE("antMoveDownIn", {
    "0%": { transform: "translate3d(0, 100%, 0)", transformOrigin: "0 0", opacity: 0 },
    "100%": { transform: "translate3d(0, 0, 0)", transformOrigin: "0 0", opacity: 1 },
  }),
  I_ = new vE("antMoveDownOut", {
    "0%": { transform: "translate3d(0, 0, 0)", transformOrigin: "0 0", opacity: 1 },
    "100%": { transform: "translate3d(0, 100%, 0)", transformOrigin: "0 0", opacity: 0 },
  }),
  A_ = new vE("antMoveLeftIn", {
    "0%": { transform: "translate3d(-100%, 0, 0)", transformOrigin: "0 0", opacity: 0 },
    "100%": { transform: "translate3d(0, 0, 0)", transformOrigin: "0 0", opacity: 1 },
  }),
  F_ = new vE("antMoveLeftOut", {
    "0%": { transform: "translate3d(0, 0, 0)", transformOrigin: "0 0", opacity: 1 },
    "100%": { transform: "translate3d(-100%, 0, 0)", transformOrigin: "0 0", opacity: 0 },
  }),
  z_ = new vE("antMoveRightIn", {
    "0%": { transform: "translate3d(100%, 0, 0)", transformOrigin: "0 0", opacity: 0 },
    "100%": { transform: "translate3d(0, 0, 0)", transformOrigin: "0 0", opacity: 1 },
  }),
  j_ = new vE("antMoveRightOut", {
    "0%": { transform: "translate3d(0, 0, 0)", transformOrigin: "0 0", opacity: 1 },
    "100%": { transform: "translate3d(100%, 0, 0)", transformOrigin: "0 0", opacity: 0 },
  }),
  D_ = {
    "move-up": {
      inKeyframes: new vE("antMoveUpIn", {
        "0%": { transform: "translate3d(0, -100%, 0)", transformOrigin: "0 0", opacity: 0 },
        "100%": { transform: "translate3d(0, 0, 0)", transformOrigin: "0 0", opacity: 1 },
      }),
      outKeyframes: new vE("antMoveUpOut", {
        "0%": { transform: "translate3d(0, 0, 0)", transformOrigin: "0 0", opacity: 1 },
        "100%": { transform: "translate3d(0, -100%, 0)", transformOrigin: "0 0", opacity: 0 },
      }),
    },
    "move-down": { inKeyframes: L_, outKeyframes: I_ },
    "move-left": { inKeyframes: A_, outKeyframes: F_ },
    "move-right": { inKeyframes: z_, outKeyframes: j_ },
  },
  H_ = (e6, t2) => {
    const { antCls: n2 } = e6,
      r2 = `${n2}-${t2}`,
      { inKeyframes: o2, outKeyframes: a2 } = D_[t2];
    return [
      R_(r2, o2, a2, e6.motionDurationMid),
      {
        [`
        ${r2}-enter,
        ${r2}-appear
      `]: { opacity: 0, animationTimingFunction: e6.motionEaseOutCirc },
        [`${r2}-leave`]: { animationTimingFunction: e6.motionEaseInOutCirc },
      },
    ];
  },
  V_ = new vE("antSlideUpIn", {
    "0%": { transform: "scaleY(0.8)", transformOrigin: "0% 0%", opacity: 0 },
    "100%": { transform: "scaleY(1)", transformOrigin: "0% 0%", opacity: 1 },
  }),
  B_ = new vE("antSlideUpOut", {
    "0%": { transform: "scaleY(1)", transformOrigin: "0% 0%", opacity: 1 },
    "100%": { transform: "scaleY(0.8)", transformOrigin: "0% 0%", opacity: 0 },
  }),
  U_ = new vE("antSlideDownIn", {
    "0%": { transform: "scaleY(0.8)", transformOrigin: "100% 100%", opacity: 0 },
    "100%": { transform: "scaleY(1)", transformOrigin: "100% 100%", opacity: 1 },
  }),
  W_ = new vE("antSlideDownOut", {
    "0%": { transform: "scaleY(1)", transformOrigin: "100% 100%", opacity: 1 },
    "100%": { transform: "scaleY(0.8)", transformOrigin: "100% 100%", opacity: 0 },
  }),
  q_ = new vE("antSlideLeftIn", {
    "0%": { transform: "scaleX(0.8)", transformOrigin: "0% 0%", opacity: 0 },
    "100%": { transform: "scaleX(1)", transformOrigin: "0% 0%", opacity: 1 },
  }),
  X_ = new vE("antSlideLeftOut", {
    "0%": { transform: "scaleX(1)", transformOrigin: "0% 0%", opacity: 1 },
    "100%": { transform: "scaleX(0.8)", transformOrigin: "0% 0%", opacity: 0 },
  }),
  K_ = new vE("antSlideRightIn", {
    "0%": { transform: "scaleX(0.8)", transformOrigin: "100% 0%", opacity: 0 },
    "100%": { transform: "scaleX(1)", transformOrigin: "100% 0%", opacity: 1 },
  }),
  G_ = new vE("antSlideRightOut", {
    "0%": { transform: "scaleX(1)", transformOrigin: "100% 0%", opacity: 1 },
    "100%": { transform: "scaleX(0.8)", transformOrigin: "100% 0%", opacity: 0 },
  }),
  Y_ = {
    "slide-up": { inKeyframes: V_, outKeyframes: B_ },
    "slide-down": { inKeyframes: U_, outKeyframes: W_ },
    "slide-left": { inKeyframes: q_, outKeyframes: X_ },
    "slide-right": { inKeyframes: K_, outKeyframes: G_ },
  },
  Q_ = (e6, t2) => {
    const { antCls: n2 } = e6,
      r2 = `${n2}-${t2}`,
      { inKeyframes: o2, outKeyframes: a2 } = Y_[t2];
    return [
      R_(r2, o2, a2, e6.motionDurationMid),
      {
        [`
      ${r2}-enter,
      ${r2}-appear
    `]: {
          transform: "scale(0)",
          transformOrigin: "0% 0%",
          opacity: 0,
          animationTimingFunction: e6.motionEaseOutQuint,
          "&-prepare": { transform: "scale(1)" },
        },
        [`${r2}-leave`]: { animationTimingFunction: e6.motionEaseInQuint },
      },
    ];
  };
function J_() {
  return (
    (J_ = Object.assign
      ? Object.assign.bind()
      : function (e6) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = arguments[t2];
            for (var r2 in n2) ({}).hasOwnProperty.call(n2, r2) && (e6[r2] = n2[r2]);
          }
          return e6;
        }),
    J_.apply(null, arguments)
  );
}
function Z_(e6, t2, n2, r2) {
  const { focusElCls: o2, focus: a2, borderElCls: l2 } = n2,
    i2 = l2 ? "> *" : "",
    s2 = i2 ? ` ${i2}` : "",
    u2 = (e7) =>
      e7
        .filter(Boolean)
        .map((e8) => `&:${e8}${s2}`)
        .join(","),
    c2 = u2(["hover", o2 ? `hover${o2}` : null]),
    d2 = u2([a2 ? "focus" : null, "active"]);
  return {
    [`&-item:not(${t2}-last-item)`]: { marginInlineEnd: e6.calc(e6.lineWidth).mul(-1).equal() },
    [`&-item:not(${r2}-status-success)`]: { zIndex: 2 },
    "&-item": {
      [d2]: { zIndex: 3 },
      [c2]: { zIndex: 4 },
      ...(o2 ? { [`&${o2}`]: { zIndex: 3 } } : {}),
      [`&[disabled] ${i2}`]: { zIndex: 0 },
    },
  };
}
function eP(e6, t2, n2) {
  const { borderElCls: r2 } = n2,
    o2 = r2 ? `> ${r2}` : "";
  return {
    [`&-item:not(${t2}-first-item):not(${t2}-last-item) ${o2}`]: { borderRadius: 0 },
    [`&-item:not(${t2}-last-item)${t2}-first-item`]: {
      [`& ${o2}, &${e6}-sm ${o2}, &${e6}-lg ${o2}`]: {
        borderStartEndRadius: 0,
        borderEndEndRadius: 0,
      },
    },
    [`&-item:not(${t2}-first-item)${t2}-last-item`]: {
      [`& ${o2}, &${e6}-sm ${o2}, &${e6}-lg ${o2}`]: {
        borderStartStartRadius: 0,
        borderEndStartRadius: 0,
      },
    },
  };
}
function tP(e6, t2 = { focus: !0 }) {
  const { componentCls: n2 } = e6,
    { componentCls: r2 } = t2,
    o2 = r2 || n2,
    a2 = `${o2}-compact`;
  return { [a2]: { ...Z_(e6, a2, t2, o2), ...eP(o2, a2, t2) } };
}
const nP = "RC_FORM_INTERNAL_HOOKS",
  rP = () => {
    jy(!1, "Can not find FormContext. Please make sure you wrap Field under Form.");
  },
  oP = r.createContext({
    getFieldValue: rP,
    getFieldsValue: rP,
    getFieldError: rP,
    getFieldWarning: rP,
    getFieldsError: rP,
    isFieldsTouched: rP,
    isFieldTouched: rP,
    isFieldValidating: rP,
    isFieldsValidating: rP,
    resetFields: rP,
    setFields: rP,
    setFieldValue: rP,
    setFieldsValue: rP,
    validateFields: rP,
    submit: rP,
    getInternalHooks: () => (
      rP(),
      {
        dispatch: rP,
        initEntityValue: rP,
        registerField: rP,
        useSubscribe: rP,
        setInitialValues: rP,
        destroyForm: rP,
        setCallbacks: rP,
        registerWatch: rP,
        getFields: rP,
        setValidateMessages: rP,
        setPreserve: rP,
        getInitialValue: rP,
      }
    ),
  }),
  aP = r.createContext(null);
function lP(e6) {
  return e6 == null ? [] : Array.isArray(e6) ? e6 : [e6];
}
function iP() {
  return {
    default: "Validation error on field %s",
    required: "%s is required",
    enum: "%s must be one of %s",
    whitespace: "%s cannot be empty",
    date: {
      format: "%s date %s is invalid for format %s",
      parse: "%s date could not be parsed, %s is invalid ",
      invalid: "%s date %s is invalid",
    },
    types: {
      string: "%s is not a %s",
      method: "%s is not a %s (function)",
      array: "%s is not an %s",
      object: "%s is not an %s",
      number: "%s is not a %s",
      date: "%s is not a %s",
      boolean: "%s is not a %s",
      integer: "%s is not an %s",
      float: "%s is not a %s",
      regexp: "%s is not a valid %s",
      email: "%s is not a valid %s",
      tel: "%s is not a valid %s",
      url: "%s is not a valid %s",
      hex: "%s is not a valid %s",
    },
    string: {
      len: "%s must be exactly %s characters",
      min: "%s must be at least %s characters",
      max: "%s cannot be longer than %s characters",
      range: "%s must be between %s and %s characters",
    },
    number: {
      len: "%s must equal %s",
      min: "%s cannot be less than %s",
      max: "%s cannot be greater than %s",
      range: "%s must be between %s and %s",
    },
    array: {
      len: "%s must be exactly %s in length",
      min: "%s cannot be less than %s in length",
      max: "%s cannot be greater than %s in length",
      range: "%s must be between %s and %s in length",
    },
    pattern: { mismatch: "%s value %s does not match pattern %s" },
    clone() {
      const e6 = JSON.parse(JSON.stringify(this));
      return (e6.clone = this.clone), e6;
    },
  };
}
const sP = iP(),
  uP = /%[sdj%]/g;
let cP = () => {};
function dP(e6) {
  if (!e6 || !e6.length) return null;
  const t2 = {};
  return (
    e6.forEach((e7) => {
      const n2 = e7.field;
      (t2[n2] = t2[n2] || []), t2[n2].push(e7);
    }),
    t2
  );
}
function fP(e6, ...t2) {
  let n2 = 0;
  const r2 = t2.length;
  return typeof e6 == "function"
    ? e6.apply(null, t2)
    : typeof e6 == "string"
      ? e6.replace(uP, (e7) => {
          if (e7 === "%%") return "%";
          if (n2 >= r2) return e7;
          switch (e7) {
            case "%s":
              return String(t2[n2++]);
            case "%d":
              return Number(t2[n2++]);
            case "%j":
              try {
                return JSON.stringify(t2[n2++]);
              } catch {
                return "[Circular]";
              }
              break;
            default:
              return e7;
          }
        })
      : e6;
}
function pP(e6, t2) {
  return (
    e6 == null ||
    !(t2 !== "array" || !Array.isArray(e6) || e6.length) ||
    !(
      !(function (e7) {
        return (
          e7 === "string" ||
          e7 === "url" ||
          e7 === "hex" ||
          e7 === "email" ||
          e7 === "date" ||
          e7 === "pattern" ||
          e7 === "tel"
        );
      })(t2) ||
      typeof e6 != "string" ||
      e6
    )
  );
}
function hP(e6, t2, n2) {
  let r2 = 0;
  const o2 = e6.length;
  (function a2(l2) {
    if (l2 && l2.length) return void n2(l2);
    const i2 = r2;
    (r2 += 1), i2 < o2 ? t2(e6[i2], a2) : n2([]);
  })([]);
}
typeof process < "u" && process.env;
class mP extends Error {
  constructor(e6, t2) {
    super("Async Validation Error"),
      n(this, "errors"),
      n(this, "fields"),
      (this.errors = e6),
      (this.fields = t2);
  }
}
function gP(e6, t2, n2, r2, o2) {
  if (t2.first) {
    const t3 = new Promise((t4, a3) => {
      const l3 = (function (e7) {
        const t5 = [];
        return (
          Object.keys(e7).forEach((n3) => {
            t5.push(...(e7[n3] || []));
          }),
          t5
        );
      })(e6);
      hP(l3, n2, (e7) => (r2(e7), e7.length ? a3(new mP(e7, dP(e7))) : t4(o2)));
    });
    return t3.catch((e7) => e7), t3;
  }
  const a2 = t2.firstFields === !0 ? Object.keys(e6) : t2.firstFields || [],
    l2 = Object.keys(e6),
    i2 = l2.length;
  let s2 = 0;
  const u2 = [],
    c2 = new Promise((t3, c3) => {
      const d2 = (e7) => {
        if ((u2.push.apply(u2, e7), s2++, s2 === i2))
          return r2(u2), u2.length ? c3(new mP(u2, dP(u2))) : t3(o2);
      };
      l2.length || (r2(u2), t3(o2)),
        l2.forEach((t4) => {
          const r3 = e6[t4];
          a2.indexOf(t4) !== -1
            ? hP(r3, n2, d2)
            : (function (e7, t5, n3) {
                const r4 = [];
                let o3 = 0;
                const a3 = e7.length;
                function l3(e8) {
                  r4.push(...(e8 || [])), o3++, o3 === a3 && n3(r4);
                }
                e7.forEach((e8) => {
                  t5(e8, l3);
                });
              })(r3, n2, d2);
        });
    });
  return c2.catch((e7) => e7), c2;
}
function vP(e6, t2) {
  return (n2) => {
    let r2;
    return (
      (r2 = e6.fullFields
        ? (function (e7, t3) {
            let n3 = e7;
            for (let r3 = 0; r3 < t3.length; r3++) {
              if (n3 == null) return n3;
              n3 = n3[t3[r3]];
            }
            return n3;
          })(t2, e6.fullFields)
        : t2[n2.field || e6.fullField]),
      (o2 = n2) && o2.message !== void 0
        ? ((n2.field = n2.field || e6.fullField), (n2.fieldValue = r2), n2)
        : {
            message: typeof n2 == "function" ? n2() : n2,
            fieldValue: r2,
            field: n2.field || e6.fullField,
          }
    );
    var o2;
  };
}
function yP(e6, t2) {
  if (t2) {
    for (const n2 in t2)
      if (t2.hasOwnProperty(n2)) {
        const r2 = t2[n2];
        typeof r2 == "object" && typeof e6[n2] == "object"
          ? (e6[n2] = { ...e6[n2], ...r2 })
          : (e6[n2] = r2);
      }
  }
  return e6;
}
const bP = "enum",
  wP = (e6, t2, n2, r2, o2, a2) => {
    !e6.required ||
      (n2.hasOwnProperty(e6.field) && !pP(t2, a2 || e6.type)) ||
      r2.push(fP(o2.messages.required, e6.fullField));
  };
let EP;
const SP =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
  xP = /^(\+[0-9]{1,3}[-\s\u2011]?)?(\([0-9]{1,4}\)[-\s\u2011]?)?([0-9]+[-\s\u2011]?)*[0-9]+$/,
  kP = /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i,
  CP = {
    integer: (e6) => CP.number(e6) && parseInt(e6, 10) === e6,
    float: (e6) => CP.number(e6) && !CP.integer(e6),
    array: (e6) => Array.isArray(e6),
    regexp(e6) {
      if (e6 instanceof RegExp) return !0;
      try {
        return !!new RegExp(e6);
      } catch {
        return !1;
      }
    },
    date: (e6) =>
      typeof e6.getTime == "function" &&
      typeof e6.getMonth == "function" &&
      typeof e6.getYear == "function" &&
      !isNaN(e6.getTime()),
    number: (e6) => !isNaN(e6) && typeof e6 == "number",
    object: (e6) => typeof e6 == "object" && !CP.array(e6),
    method: (e6) => typeof e6 == "function",
    email: (e6) => typeof e6 == "string" && e6.length <= 320 && !!e6.match(SP),
    tel: (e6) => typeof e6 == "string" && e6.length <= 32 && !!e6.match(xP),
    url: (e6) =>
      typeof e6 == "string" &&
      e6.length <= 2048 &&
      !!e6.match(
        (() => {
          if (EP) return EP;
          const e7 = "[a-fA-F\\d:]",
            t2 = (t3) =>
              t3 && t3.includeBoundaries ? `(?:(?<=\\s|^)(?=${e7})|(?<=${e7})(?=\\s|$))` : "",
            n2 =
              "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}",
            r2 = "[a-fA-F\\d]{1,4}",
            o2 = `(?:${[`(?:${r2}:){7}(?:${r2}|:)`, `(?:${r2}:){6}(?:${n2}|:${r2}|:)`, `(?:${r2}:){5}(?::${n2}|(?::${r2}){1,2}|:)`, `(?:${r2}:){4}(?:(?::${r2}){0,1}:${n2}|(?::${r2}){1,3}|:)`, `(?:${r2}:){3}(?:(?::${r2}){0,2}:${n2}|(?::${r2}){1,4}|:)`, `(?:${r2}:){2}(?:(?::${r2}){0,3}:${n2}|(?::${r2}){1,5}|:)`, `(?:${r2}:){1}(?:(?::${r2}){0,4}:${n2}|(?::${r2}){1,6}|:)`, `(?::(?:(?::${r2}){0,5}:${n2}|(?::${r2}){1,7}|:))`].join("|")})(?:%[0-9a-zA-Z]{1,})?`,
            a2 = new RegExp(`(?:^${n2}$)|(?:^${o2}$)`),
            l2 = new RegExp(`^${n2}$`),
            i2 = new RegExp(`^${o2}$`),
            s2 = (e8) =>
              e8 && e8.exact
                ? a2
                : new RegExp(`(?:${t2(e8)}${n2}${t2(e8)})|(?:${t2(e8)}${o2}${t2(e8)})`, "g");
          (s2.v4 = (e8) => (e8 && e8.exact ? l2 : new RegExp(`${t2(e8)}${n2}${t2(e8)}`, "g"))),
            (s2.v6 = (e8) => (e8 && e8.exact ? i2 : new RegExp(`${t2(e8)}${o2}${t2(e8)}`, "g")));
          const u2 = s2.v4().source,
            c2 = s2.v6().source;
          return (
            (EP = new RegExp(
              `(?:^(?:(?:(?:[a-z]+:)?//)|www\\.)(?:\\S+(?::\\S*)?@)?(?:localhost|${u2}|${c2}|(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))(?::\\d{2,5})?(?:[/?#][^\\s"]*)?$)`,
              "i",
            )),
            EP
          );
        })(),
      ),
    hex: (e6) => typeof e6 == "string" && !!e6.match(kP),
  },
  _P = {
    required: wP,
    whitespace: (e6, t2, n2, r2, o2) => {
      (/^\s+$/.test(t2) || t2 === "") && r2.push(fP(o2.messages.whitespace, e6.fullField));
    },
    type: (e6, t2, n2, r2, o2) => {
      if (e6.required && t2 === void 0) return void wP(e6, t2, n2, r2, o2);
      const a2 = e6.type;
      [
        "integer",
        "float",
        "array",
        "regexp",
        "object",
        "method",
        "email",
        "tel",
        "number",
        "date",
        "url",
        "hex",
      ].indexOf(a2) > -1
        ? CP[a2](t2) || r2.push(fP(o2.messages.types[a2], e6.fullField, e6.type))
        : a2 && typeof t2 !== e6.type && r2.push(fP(o2.messages.types[a2], e6.fullField, e6.type));
    },
    range: (e6, t2, n2, r2, o2) => {
      const a2 = typeof e6.len == "number",
        l2 = typeof e6.min == "number",
        i2 = typeof e6.max == "number",
        s2 = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
      let u2 = t2,
        c2 = null;
      const d2 = typeof t2 == "number",
        f2 = typeof t2 == "string",
        p2 = Array.isArray(t2);
      if ((d2 ? (c2 = "number") : f2 ? (c2 = "string") : p2 && (c2 = "array"), !c2)) return !1;
      p2 && (u2 = t2.length),
        f2 && (u2 = t2.replace(s2, "_").length),
        a2
          ? u2 !== e6.len && r2.push(fP(o2.messages[c2].len, e6.fullField, e6.len))
          : l2 && !i2 && u2 < e6.min
            ? r2.push(fP(o2.messages[c2].min, e6.fullField, e6.min))
            : i2 && !l2 && u2 > e6.max
              ? r2.push(fP(o2.messages[c2].max, e6.fullField, e6.max))
              : l2 &&
                i2 &&
                (u2 < e6.min || u2 > e6.max) &&
                r2.push(fP(o2.messages[c2].range, e6.fullField, e6.min, e6.max));
    },
    enum: (e6, t2, n2, r2, o2) => {
      (e6[bP] = Array.isArray(e6[bP]) ? e6[bP] : []),
        e6[bP].indexOf(t2) === -1 && r2.push(fP(o2.messages[bP], e6.fullField, e6[bP].join(", ")));
    },
    pattern: (e6, t2, n2, r2, o2) => {
      e6.pattern &&
        (e6.pattern instanceof RegExp
          ? ((e6.pattern.lastIndex = 0),
            e6.pattern.test(t2) ||
              r2.push(fP(o2.messages.pattern.mismatch, e6.fullField, t2, e6.pattern)))
          : typeof e6.pattern == "string" &&
            (new RegExp(e6.pattern).test(t2) ||
              r2.push(fP(o2.messages.pattern.mismatch, e6.fullField, t2, e6.pattern))));
    },
  },
  PP = (e6, t2, n2, r2, o2) => {
    const a2 = e6.type,
      l2 = [];
    if (e6.required || (!e6.required && r2.hasOwnProperty(e6.field))) {
      if (pP(t2, a2) && !e6.required) return n2();
      _P.required(e6, t2, r2, l2, o2, a2), pP(t2, a2) || _P.type(e6, t2, r2, l2, o2);
    }
    n2(l2);
  },
  OP = {
    string: (e6, t2, n2, r2, o2) => {
      const a2 = [];
      if (e6.required || (!e6.required && r2.hasOwnProperty(e6.field))) {
        if (pP(t2, "string") && !e6.required) return n2();
        _P.required(e6, t2, r2, a2, o2, "string"),
          pP(t2, "string") ||
            (_P.type(e6, t2, r2, a2, o2),
            _P.range(e6, t2, r2, a2, o2),
            _P.pattern(e6, t2, r2, a2, o2),
            e6.whitespace === !0 && _P.whitespace(e6, t2, r2, a2, o2));
      }
      n2(a2);
    },
    method: (e6, t2, n2, r2, o2) => {
      const a2 = [];
      if (e6.required || (!e6.required && r2.hasOwnProperty(e6.field))) {
        if (pP(t2) && !e6.required) return n2();
        _P.required(e6, t2, r2, a2, o2), t2 !== void 0 && _P.type(e6, t2, r2, a2, o2);
      }
      n2(a2);
    },
    number: (e6, t2, n2, r2, o2) => {
      const a2 = [];
      if (e6.required || (!e6.required && r2.hasOwnProperty(e6.field))) {
        if ((t2 === "" && (t2 = void 0), pP(t2) && !e6.required)) return n2();
        _P.required(e6, t2, r2, a2, o2),
          t2 !== void 0 && (_P.type(e6, t2, r2, a2, o2), _P.range(e6, t2, r2, a2, o2));
      }
      n2(a2);
    },
    boolean: (e6, t2, n2, r2, o2) => {
      const a2 = [];
      if (e6.required || (!e6.required && r2.hasOwnProperty(e6.field))) {
        if (pP(t2) && !e6.required) return n2();
        _P.required(e6, t2, r2, a2, o2), t2 !== void 0 && _P.type(e6, t2, r2, a2, o2);
      }
      n2(a2);
    },
    regexp: (e6, t2, n2, r2, o2) => {
      const a2 = [];
      if (e6.required || (!e6.required && r2.hasOwnProperty(e6.field))) {
        if (pP(t2) && !e6.required) return n2();
        _P.required(e6, t2, r2, a2, o2), pP(t2) || _P.type(e6, t2, r2, a2, o2);
      }
      n2(a2);
    },
    integer: (e6, t2, n2, r2, o2) => {
      const a2 = [];
      if (e6.required || (!e6.required && r2.hasOwnProperty(e6.field))) {
        if (pP(t2) && !e6.required) return n2();
        _P.required(e6, t2, r2, a2, o2),
          t2 !== void 0 && (_P.type(e6, t2, r2, a2, o2), _P.range(e6, t2, r2, a2, o2));
      }
      n2(a2);
    },
    float: (e6, t2, n2, r2, o2) => {
      const a2 = [];
      if (e6.required || (!e6.required && r2.hasOwnProperty(e6.field))) {
        if (pP(t2) && !e6.required) return n2();
        _P.required(e6, t2, r2, a2, o2),
          t2 !== void 0 && (_P.type(e6, t2, r2, a2, o2), _P.range(e6, t2, r2, a2, o2));
      }
      n2(a2);
    },
    array: (e6, t2, n2, r2, o2) => {
      const a2 = [];
      if (e6.required || (!e6.required && r2.hasOwnProperty(e6.field))) {
        if (t2 == null && !e6.required) return n2();
        _P.required(e6, t2, r2, a2, o2, "array"),
          t2 != null && (_P.type(e6, t2, r2, a2, o2), _P.range(e6, t2, r2, a2, o2));
      }
      n2(a2);
    },
    object: (e6, t2, n2, r2, o2) => {
      const a2 = [];
      if (e6.required || (!e6.required && r2.hasOwnProperty(e6.field))) {
        if (pP(t2) && !e6.required) return n2();
        _P.required(e6, t2, r2, a2, o2), t2 !== void 0 && _P.type(e6, t2, r2, a2, o2);
      }
      n2(a2);
    },
    enum: (e6, t2, n2, r2, o2) => {
      const a2 = [];
      if (e6.required || (!e6.required && r2.hasOwnProperty(e6.field))) {
        if (pP(t2) && !e6.required) return n2();
        _P.required(e6, t2, r2, a2, o2), t2 !== void 0 && _P.enum(e6, t2, r2, a2, o2);
      }
      n2(a2);
    },
    pattern: (e6, t2, n2, r2, o2) => {
      const a2 = [];
      if (e6.required || (!e6.required && r2.hasOwnProperty(e6.field))) {
        if (pP(t2, "string") && !e6.required) return n2();
        _P.required(e6, t2, r2, a2, o2), pP(t2, "string") || _P.pattern(e6, t2, r2, a2, o2);
      }
      n2(a2);
    },
    date: (e6, t2, n2, r2, o2) => {
      const a2 = [];
      if (e6.required || (!e6.required && r2.hasOwnProperty(e6.field))) {
        if (pP(t2, "date") && !e6.required) return n2();
        if ((_P.required(e6, t2, r2, a2, o2), !pP(t2, "date"))) {
          let n3;
          (n3 = t2 instanceof Date ? t2 : new Date(t2)),
            _P.type(e6, n3, r2, a2, o2),
            n3 && _P.range(e6, n3.getTime(), r2, a2, o2);
        }
      }
      n2(a2);
    },
    url: PP,
    hex: PP,
    email: PP,
    tel: PP,
    required: (e6, t2, n2, r2, o2) => {
      const a2 = [],
        l2 = Array.isArray(t2) ? "array" : typeof t2;
      _P.required(e6, t2, r2, a2, o2, l2), n2(a2);
    },
    any: (e6, t2, n2, r2, o2) => {
      const a2 = [];
      if (e6.required || (!e6.required && r2.hasOwnProperty(e6.field))) {
        if (pP(t2) && !e6.required) return n2();
        _P.required(e6, t2, r2, a2, o2);
      }
      n2(a2);
    },
  },
  TP = class e5 {
    constructor(e6) {
      n(this, "rules", null), n(this, "_messages", sP), this.define(e6);
    }
    define(e6) {
      if (!e6) throw new Error("Cannot configure a schema with no rules");
      if (typeof e6 != "object" || Array.isArray(e6)) throw new Error("Rules must be an object");
      (this.rules = {}),
        Object.keys(e6).forEach((t2) => {
          const n2 = e6[t2];
          this.rules[t2] = Array.isArray(n2) ? n2 : [n2];
        });
    }
    messages(e6) {
      return e6 && (this._messages = yP(iP(), e6)), this._messages;
    }
    validate(t2, n2 = {}, r2 = () => {}) {
      let o2 = t2,
        a2 = n2,
        l2 = r2;
      if (
        (typeof a2 == "function" && ((l2 = a2), (a2 = {})),
        !this.rules || Object.keys(this.rules).length === 0)
      )
        return l2 && l2(null, o2), Promise.resolve(o2);
      if (a2.messages) {
        let e6 = this.messages();
        e6 === sP && (e6 = iP()), yP(e6, a2.messages), (a2.messages = e6);
      } else a2.messages = this.messages();
      const i2 = {};
      (a2.keys || Object.keys(this.rules)).forEach((e6) => {
        const n3 = this.rules[e6];
        let r3 = o2[e6];
        n3.forEach((n4) => {
          let a3 = n4;
          typeof a3.transform == "function" &&
            (o2 === t2 && (o2 = { ...o2 }),
            (r3 = o2[e6] = a3.transform(r3)),
            r3 != null && (a3.type = a3.type || (Array.isArray(r3) ? "array" : typeof r3))),
            (a3 = typeof a3 == "function" ? { validator: a3 } : { ...a3 }),
            (a3.validator = this.getValidationMethod(a3)),
            a3.validator &&
              ((a3.field = e6),
              (a3.fullField = a3.fullField || e6),
              (a3.type = this.getType(a3)),
              (i2[e6] = i2[e6] || []),
              i2[e6].push({ rule: a3, value: r3, source: o2, field: e6 }));
        });
      });
      const s2 = {};
      return gP(
        i2,
        a2,
        (t3, n3) => {
          var r3;
          const l3 = t3.rule;
          let i3,
            u2 = !(
              (l3.type !== "object" && l3.type !== "array") ||
              (typeof l3.fields != "object" && typeof l3.defaultField != "object")
            );
          function c2(e6, t4) {
            return {
              ...t4,
              fullField: `${l3.fullField}.${e6}`,
              fullFields: l3.fullFields ? [...l3.fullFields, e6] : [e6],
            };
          }
          function d2(r4 = []) {
            let i4 = Array.isArray(r4) ? r4 : [r4];
            !a2.suppressWarning && i4.length && e5.warning("async-validator:", i4),
              i4.length &&
                l3.message !== void 0 &&
                l3.message !== null &&
                (i4 = [].concat(l3.message));
            let d3 = i4.map(vP(l3, o2));
            if (a2.first && d3.length) return (s2[l3.field] = 1), n3(d3);
            if (u2) {
              if (l3.required && !t3.value)
                return (
                  l3.message !== void 0
                    ? (d3 = [].concat(l3.message).map(vP(l3, o2)))
                    : a2.error && (d3 = [a2.error(l3, fP(a2.messages.required, l3.field))]),
                  n3(d3)
                );
              let r5 = {};
              l3.defaultField &&
                Object.keys(t3.value).map((e6) => {
                  r5[e6] = l3.defaultField;
                }),
                (r5 = { ...r5, ...t3.rule.fields });
              const i5 = {};
              Object.keys(r5).forEach((e6) => {
                const t4 = r5[e6],
                  n4 = Array.isArray(t4) ? t4 : [t4];
                i5[e6] = n4.map(c2.bind(null, e6));
              });
              const s3 = new e5(i5);
              s3.messages(a2.messages),
                t3.rule.options &&
                  ((t3.rule.options.messages = a2.messages), (t3.rule.options.error = a2.error)),
                s3.validate(t3.value, t3.rule.options || a2, (e6) => {
                  const t4 = [];
                  d3 && d3.length && t4.push(...d3),
                    e6 && e6.length && t4.push(...e6),
                    n3(t4.length ? t4 : null);
                });
            } else n3(d3);
          }
          if (
            ((u2 = u2 && (l3.required || (!l3.required && t3.value))),
            (l3.field = t3.field),
            l3.asyncValidator)
          )
            i3 = l3.asyncValidator(l3, t3.value, d2, t3.source, a2);
          else if (l3.validator) {
            try {
              i3 = l3.validator(l3, t3.value, d2, t3.source, a2);
            } catch (f2) {
              (r3 = console.error) == null || r3.call(console, f2),
                a2.suppressValidatorError ||
                  setTimeout(() => {
                    throw f2;
                  }, 0),
                d2(f2.message);
            }
            i3 === !0
              ? d2()
              : i3 === !1
                ? d2(
                    typeof l3.message == "function"
                      ? l3.message(l3.fullField || l3.field)
                      : l3.message || `${l3.fullField || l3.field} fails`,
                  )
                : i3 instanceof Array
                  ? d2(i3)
                  : i3 instanceof Error && d2(i3.message);
          }
          i3 &&
            i3.then &&
            i3.then(
              () => d2(),
              (e6) => d2(e6),
            );
        },
        (e6) => {
          (function (e7) {
            let t3 = [],
              n3 = {};
            function r3(e8) {
              Array.isArray(e8) ? (t3 = t3.concat(...e8)) : t3.push(e8);
            }
            for (let o3 = 0; o3 < e7.length; o3++) r3(e7[o3]);
            t3.length ? ((n3 = dP(t3)), l2(t3, n3)) : l2(null, o2);
          })(e6);
        },
        o2,
      );
    }
    getType(e6) {
      if (
        (e6.type === void 0 && e6.pattern instanceof RegExp && (e6.type = "pattern"),
        typeof e6.validator != "function" && e6.type && !OP.hasOwnProperty(e6.type))
      )
        throw new Error(fP("Unknown rule type %s", e6.type));
      return e6.type || "string";
    }
    getValidationMethod(e6) {
      if (typeof e6.validator == "function") return e6.validator;
      const t2 = Object.keys(e6),
        n2 = t2.indexOf("message");
      return (
        n2 !== -1 && t2.splice(n2, 1),
        t2.length === 1 && t2[0] === "required" ? OP.required : OP[this.getType(e6)] || void 0
      );
    }
  };
n(TP, "register", function (e6, t2) {
  if (typeof t2 != "function")
    throw new Error("Cannot register a validator by type, validator is not a function");
  OP[e6] = t2;
}),
  n(TP, "warning", cP),
  n(TP, "messages", sP),
  n(TP, "validators", OP);
const NP = "'${name}' is not a valid ${type}",
  $P = {
    default: "Validation error on field '${name}'",
    required: "'${name}' is required",
    enum: "'${name}' must be one of [${enum}]",
    whitespace: "'${name}' cannot be empty",
    date: {
      format: "'${name}' is invalid for format date",
      parse: "'${name}' could not be parsed as date",
      invalid: "'${name}' is invalid date",
    },
    types: {
      string: NP,
      method: NP,
      array: NP,
      object: NP,
      number: NP,
      date: NP,
      boolean: NP,
      integer: NP,
      float: NP,
      regexp: NP,
      email: NP,
      tel: NP,
      url: NP,
      hex: NP,
    },
    string: {
      len: "'${name}' must be exactly ${len} characters",
      min: "'${name}' must be at least ${min} characters",
      max: "'${name}' cannot be longer than ${max} characters",
      range: "'${name}' must be between ${min} and ${max} characters",
    },
    number: {
      len: "'${name}' must equal ${len}",
      min: "'${name}' cannot be less than ${min}",
      max: "'${name}' cannot be greater than ${max}",
      range: "'${name}' must be between ${min} and ${max}",
    },
    array: {
      len: "'${name}' must be exactly ${len} in length",
      min: "'${name}' cannot be less than ${min} in length",
      max: "'${name}' cannot be greater than ${max} in length",
      range: "'${name}' must be between ${min} and ${max} in length",
    },
    pattern: { mismatch: "'${name}' does not match pattern ${pattern}" },
  },
  MP = TP,
  RP = "CODE_LOGIC_ERROR";
async function LP(e6, t2, n2, o2, a2) {
  const l2 = { ...n2 };
  if ((delete l2.ruleIndex, (MP.warning = () => {}), l2.validator)) {
    const e7 = l2.validator;
    l2.validator = (...t3) => {
      try {
        return e7(...t3);
      } catch {
        return Promise.reject(RP);
      }
    };
  }
  let i2 = null;
  l2 && l2.type === "array" && l2.defaultField && ((i2 = l2.defaultField), delete l2.defaultField);
  const s2 = new MP({ [e6]: [l2] }),
    u2 = lb($P, o2.validateMessages);
  s2.messages(u2);
  let c2 = [];
  try {
    await Promise.resolve(s2.validate({ [e6]: t2 }, { ...o2 }));
  } catch (p2) {
    p2.errors &&
      (c2 = p2.errors.map(({ message: e7 }, t3) => {
        const n3 = e7 === RP ? u2.default : e7;
        return r.isValidElement(n3) ? r.cloneElement(n3, { key: `error_${t3}` }) : n3;
      }));
  }
  if (!c2.length && i2 && Array.isArray(t2) && t2.length > 0)
    return (await Promise.all(t2.map((t3, n3) => LP(`${e6}.${n3}`, t3, i2, o2, a2)))).reduce(
      (e7, t3) => [...e7, ...t3],
      [],
    );
  const d2 = { ...n2, name: e6, enum: (n2.enum || []).join(", "), ...a2 };
  return c2.map((e7) =>
    typeof e7 == "string"
      ? (function (e8, t3) {
          return e8.replace(/\\?\$\{\w+\}/g, (e9) => {
            if (e9.startsWith("\\")) return e9.slice(1);
            const n3 = e9.slice(2, -1);
            return t3[n3];
          });
        })(e7, d2)
      : e7,
  );
}
function IP(e6, t2, n2, r2, o2, a2) {
  const l2 = e6.join("."),
    i2 = n2
      .map((e7, t3) => {
        const n3 = e7.validator,
          r3 = { ...e7, ruleIndex: t3 };
        return (
          n3 &&
            (r3.validator = (e8, t4, r4) => {
              let o3 = !1;
              const a3 = n3(e8, t4, (...e9) => {
                Promise.resolve().then(() => {
                  jy(
                    !o3,
                    "Your validator function has already return a promise. `callback` will be ignored.",
                  ),
                    o3 || r4(...e9);
                });
              });
              (o3 = a3 && typeof a3.then == "function" && typeof a3.catch == "function"),
                jy(o3, "`callback` is deprecated. Please return a promise instead."),
                o3 &&
                  a3
                    .then(() => {
                      r4();
                    })
                    .catch((e9) => {
                      r4(e9 || " ");
                    });
            }),
          r3
        );
      })
      .sort(({ warningOnly: e7, ruleIndex: t3 }, { warningOnly: n3, ruleIndex: r3 }) =>
        !!e7 == !!n3 ? t3 - r3 : e7 ? 1 : -1,
      );
  let s2;
  if (o2 === !0)
    s2 = new Promise(async (e7, n3) => {
      for (let o3 = 0; o3 < i2.length; o3 += 1) {
        const e8 = i2[o3],
          s3 = await LP(l2, t2, e8, r2, a2);
        if (s3.length) return void n3([{ errors: s3, rule: e8 }]);
      }
      e7([]);
    });
  else {
    const e7 = i2.map((e8) => LP(l2, t2, e8, r2, a2).then((t3) => ({ errors: t3, rule: e8 })));
    s2 = (
      o2
        ? (async function (e8) {
            let t3 = 0;
            return new Promise((n3) => {
              e8.forEach((r3) => {
                r3.then((r4) => {
                  r4.errors.length && n3([r4]), (t3 += 1), t3 === e8.length && n3([]);
                });
              });
            });
          })(e7)
        : (async function (e8) {
            return Promise.all(e8).then((e9) => [].concat(...e9));
          })(e7)
    ).then((e8) => Promise.reject(e8));
  }
  return s2.catch((e7) => e7), s2;
}
function AP(e6) {
  return lP(e6);
}
function FP(e6, t2) {
  let n2 = {};
  return (
    t2.forEach((t3) => {
      const r2 = eb(e6, t3);
      n2 = nb(n2, t3, r2);
    }),
    n2
  );
}
function zP(e6, t2, n2 = !1) {
  return e6 && e6.some((e7) => jP(t2, e7, n2));
}
function jP(e6, t2, n2 = !1) {
  return !(!e6 || !t2) && !(!n2 && e6.length !== t2.length) && t2.every((t3, n3) => e6[n3] === t3);
}
function DP(e6, t2, n2) {
  const { length: r2 } = e6;
  if (t2 < 0 || t2 >= r2 || n2 < 0 || n2 >= r2) return e6;
  const o2 = e6[t2],
    a2 = t2 - n2;
  return a2 > 0
    ? [...e6.slice(0, n2), o2, ...e6.slice(n2, t2), ...e6.slice(t2 + 1, r2)]
    : a2 < 0
      ? [...e6.slice(0, t2), ...e6.slice(t2 + 1, n2 + 1), o2, ...e6.slice(n2 + 1, r2)]
      : e6;
}
const HP = (e6) => {
  const t2 = new MessageChannel();
  (t2.port1.onmessage = e6), t2.port2.postMessage(null);
};
class VP {
  constructor(e6) {
    n(this, "namePathList", []),
      n(this, "taskId", 0),
      n(this, "watcherList", new Set()),
      n(this, "form"),
      (this.form = e6);
  }
  register(e6) {
    return (
      this.watcherList.add(e6),
      () => {
        this.watcherList.delete(e6);
      }
    );
  }
  notify(e6) {
    e6.forEach((e7) => {
      this.namePathList.every((t2) => !jP(t2, e7)) && this.namePathList.push(e7);
    }),
      this.doBatch();
  }
  doBatch() {
    this.taskId += 1;
    const e6 = this.taskId;
    HP(() => {
      if (e6 === this.taskId && this.watcherList.size) {
        const e7 = this.form.getForm(),
          t2 = e7.getFieldsValue(),
          n2 = e7.getFieldsValue(!0);
        this.watcherList.forEach((e8) => {
          e8(t2, n2, this.namePathList);
        }),
          (this.namePathList = []);
      }
    });
  }
}
function BP() {
  return (
    (BP = Object.assign
      ? Object.assign.bind()
      : function (e6) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = arguments[t2];
            for (var r2 in n2) Object.prototype.hasOwnProperty.call(n2, r2) && (e6[r2] = n2[r2]);
          }
          return e6;
        }),
    BP.apply(this, arguments)
  );
}
const UP = [],
  WP = [];
function qP(e6, t2, n2, r2, o2, a2) {
  return typeof e6 == "function"
    ? e6(t2, n2, "source" in a2 ? { source: a2.source } : {})
    : r2 !== o2;
}
class XP extends r.PureComponent {
  constructor(e6) {
    if (
      (super(e6),
      n(this, "state", { resetCount: 0 }),
      n(this, "cancelRegisterFunc", null),
      n(this, "mounted", !1),
      n(this, "touched", !1),
      n(this, "dirty", !1),
      n(this, "validatePromise"),
      n(this, "prevValidating"),
      n(this, "errors", UP),
      n(this, "warnings", WP),
      n(this, "cancelRegister", () => {
        const { preserve: e7, isListField: t2, name: n2 } = this.props;
        this.cancelRegisterFunc && this.cancelRegisterFunc(t2, e7, AP(n2)),
          (this.cancelRegisterFunc = null);
      }),
      n(this, "getNamePath", () => {
        const { name: e7, fieldContext: t2 } = this.props,
          { prefixName: n2 = [] } = t2;
        return e7 !== void 0 ? [...n2, ...e7] : [];
      }),
      n(this, "getRules", () => {
        const { rules: e7 = [], fieldContext: t2 } = this.props;
        return e7.map((e8) => (typeof e8 == "function" ? e8(t2) : e8));
      }),
      n(this, "refresh", () => {
        this.mounted && this.setState(({ resetCount: e7 }) => ({ resetCount: e7 + 1 }));
      }),
      n(this, "metaCache", null),
      n(this, "triggerMetaEvent", (e7) => {
        const { onMetaChange: t2 } = this.props;
        if (t2) {
          const n2 = { ...this.getMeta(), destroy: e7 };
          Dy(this.metaCache, n2) || t2(n2), (this.metaCache = n2);
        } else this.metaCache = null;
      }),
      n(this, "onStoreChange", (e7, t2, n2) => {
        const { shouldUpdate: r2, dependencies: o2 = [], onReset: a2 } = this.props,
          { store: l2 } = n2,
          i2 = this.getNamePath(),
          s2 = this.getValue(e7),
          u2 = this.getValue(l2),
          c2 = t2 && zP(t2, i2);
        switch (
          (n2.type !== "valueUpdate" ||
            n2.source !== "external" ||
            Dy(s2, u2) ||
            ((this.touched = !0),
            (this.dirty = !0),
            (this.validatePromise = null),
            (this.errors = UP),
            (this.warnings = WP),
            this.triggerMetaEvent()),
          n2.type)
        ) {
          case "reset":
            if (!t2 || c2)
              return (
                (this.touched = !1),
                (this.dirty = !1),
                (this.validatePromise = void 0),
                (this.errors = UP),
                (this.warnings = WP),
                this.triggerMetaEvent(),
                a2?.(),
                void this.refresh()
              );
            break;
          case "remove":
            if (r2 && qP(r2, e7, l2, s2, u2, n2)) return void this.reRender();
            break;
          case "setField": {
            const { data: o3 } = n2;
            if (c2)
              return (
                "touched" in o3 && (this.touched = o3.touched),
                "validating" in o3 &&
                  !("originRCField" in o3) &&
                  (this.validatePromise = o3.validating ? Promise.resolve([]) : null),
                "errors" in o3 && (this.errors = o3.errors || UP),
                "warnings" in o3 && (this.warnings = o3.warnings || WP),
                (this.dirty = !0),
                this.triggerMetaEvent(),
                void this.reRender()
              );
            if ("value" in o3 && zP(t2, i2, !0)) return void this.reRender();
            if (r2 && !i2.length && qP(r2, e7, l2, s2, u2, n2)) return void this.reRender();
            break;
          }
          case "dependenciesUpdate":
            if (o2.map(AP).some((e8) => zP(n2.relatedFields, e8))) return void this.reRender();
            break;
          default:
            if (c2 || ((!o2.length || i2.length || r2) && qP(r2, e7, l2, s2, u2, n2)))
              return void this.reRender();
        }
        r2 === !0 && this.reRender();
      }),
      n(this, "validateRules", (e7) => {
        const t2 = this.getNamePath(),
          n2 = this.getValue(),
          { triggerName: r2, validateOnly: o2 = !1, delayFrame: a2 } = e7 || {},
          l2 = Promise.resolve().then(async () => {
            if (!this.mounted) return [];
            const {
              validateFirst: o3 = !1,
              messageVariables: i2,
              validateDebounce: s2,
            } = this.props;
            a2 &&
              (await (async function () {
                return new Promise((e8) => {
                  HP(() => {
                    Mv(() => {
                      e8();
                    });
                  });
                });
              })());
            let u2 = this.getRules();
            if (
              (r2 &&
                (u2 = u2
                  .filter((e8) => e8)
                  .filter((e8) => {
                    const { validateTrigger: t3 } = e8;
                    return t3 ? lP(t3).includes(r2) : !0;
                  })),
              s2 &&
                r2 &&
                (await new Promise((e8) => {
                  setTimeout(e8, s2);
                }),
                this.validatePromise !== l2))
            )
              return [];
            const c2 = IP(t2, n2, u2, e7, o3, i2);
            return (
              c2
                .catch((e8) => e8)
                .then((e8 = UP) => {
                  var t3;
                  if (this.validatePromise === l2) {
                    this.validatePromise = null;
                    const n3 = [],
                      r3 = [];
                    (t3 = e8.forEach) == null ||
                      t3.call(e8, ({ rule: { warningOnly: e9 }, errors: t4 = UP }) => {
                        e9 ? r3.push(...t4) : n3.push(...t4);
                      }),
                      (this.errors = n3),
                      (this.warnings = r3),
                      this.triggerMetaEvent(),
                      this.reRender();
                  }
                }),
              c2
            );
          });
        return (
          o2 ||
            ((this.validatePromise = l2),
            (this.dirty = !0),
            (this.errors = UP),
            (this.warnings = WP),
            this.triggerMetaEvent(),
            this.reRender()),
          l2
        );
      }),
      n(this, "isFieldValidating", () => !!this.validatePromise),
      n(this, "isFieldTouched", () => this.touched),
      n(this, "isFieldDirty", () => {
        if (this.dirty || this.props.initialValue !== void 0) return !0;
        const { fieldContext: e7 } = this.props,
          { getInitialValue: t2 } = e7.getInternalHooks(nP);
        return t2(this.getNamePath()) !== void 0;
      }),
      n(this, "getErrors", () => this.errors),
      n(this, "getWarnings", () => this.warnings),
      n(this, "isListField", () => this.props.isListField),
      n(this, "isList", () => this.props.isList),
      n(this, "isPreserve", () => this.props.preserve),
      n(
        this,
        "getMeta",
        () => (
          (this.prevValidating = this.isFieldValidating()),
          {
            touched: this.isFieldTouched(),
            validating: this.prevValidating,
            errors: this.errors,
            warnings: this.warnings,
            name: this.getNamePath(),
            validated: this.validatePromise === null,
          }
        ),
      ),
      n(this, "getOnlyChild", (e7) => {
        if (typeof e7 == "function") {
          const t3 = this.getMeta();
          return {
            ...this.getOnlyChild(e7(this.getControlled(), t3, this.props.fieldContext)),
            isFunction: !0,
          };
        }
        const t2 = Zy(e7);
        return t2.length === 1 && r.isValidElement(t2[0])
          ? { child: t2[0], isFunction: !1 }
          : { child: t2, isFunction: !1 };
      }),
      n(this, "getValue", (e7) => {
        const { getFieldsValue: t2 } = this.props.fieldContext,
          n2 = this.getNamePath();
        return eb(e7 || t2(!0), n2);
      }),
      n(this, "getControlled", (e7 = {}) => {
        const {
            name: t2,
            trigger: n2 = "onChange",
            validateTrigger: r2,
            getValueFromEvent: o2,
            normalize: a2,
            valuePropName: l2 = "value",
            getValueProps: i2,
            fieldContext: s2,
          } = this.props,
          u2 = r2 !== void 0 ? r2 : s2.validateTrigger,
          c2 = this.getNamePath(),
          { getInternalHooks: d2, getFieldsValue: f2 } = s2,
          { dispatch: p2 } = d2(nP),
          h2 = this.getValue(),
          m2 = i2 || ((e8) => ({ [l2]: e8 })),
          g2 = e7[n2],
          v2 = t2 !== void 0 ? m2(h2) : {},
          y2 = { ...e7, ...v2 };
        return (
          (y2[n2] = (...e8) => {
            (this.touched = !0), (this.dirty = !0), this.triggerMetaEvent();
            const t3 = this.getValue();
            let n3;
            (n3 = o2
              ? o2(...e8)
              : (function (e9, ...t4) {
                  const n4 = t4[0];
                  return n4 && n4.target && typeof n4.target == "object" && e9 in n4.target
                    ? n4.target[e9]
                    : n4;
                })(l2, ...e8)),
              a2 && (n3 = a2(n3, t3, f2(!0))),
              n3 !== t3 && p2({ type: "updateValue", namePath: c2, value: n3 }),
              g2 && g2(...e8);
          }),
          lP(u2 || []).forEach((e8) => {
            const t3 = y2[e8];
            y2[e8] = (...n3) => {
              t3 && t3(...n3);
              const { rules: r3 } = this.props;
              r3 && r3.length && p2({ type: "validateField", namePath: c2, triggerName: e8 });
            };
          }),
          y2
        );
      }),
      e6.fieldContext)
    ) {
      const { getInternalHooks: t2 } = e6.fieldContext,
        { initEntityValue: n2 } = t2(nP);
      n2(this);
    }
  }
  componentDidMount() {
    const { shouldUpdate: e6, fieldContext: t2 } = this.props;
    if (((this.mounted = !0), t2)) {
      const { getInternalHooks: e7 } = t2,
        { registerField: n2 } = e7(nP);
      this.cancelRegisterFunc = n2(this);
    }
    e6 === !0 && this.reRender();
  }
  componentWillUnmount() {
    this.cancelRegister(), this.triggerMetaEvent(!0), (this.mounted = !1);
  }
  reRender() {
    this.mounted && this.forceUpdate();
  }
  render() {
    const { resetCount: e6 } = this.state,
      { children: t2 } = this.props,
      { child: n2, isFunction: o2 } = this.getOnlyChild(t2);
    let a2;
    return (
      o2
        ? (a2 = n2)
        : r.isValidElement(n2)
          ? (a2 = r.cloneElement(n2, this.getControlled(n2.props)))
          : (jy(!n2, "`children` of Field is not validate ReactElement."), (a2 = n2)),
      r.createElement(r.Fragment, { key: e6 }, a2)
    );
  }
}
function KP({ name: e6, ...t2 }) {
  const n2 = r.useContext(oP),
    o2 = r.useContext(aP),
    a2 = e6 !== void 0 ? AP(e6) : void 0,
    l2 = t2.isListField ?? !!o2;
  let i2 = "keep";
  return (
    l2 || (i2 = `_${(a2 || []).join("_")}`),
    r.createElement(XP, BP({ key: i2, name: a2, isListField: l2 }, t2, { fieldContext: n2 }))
  );
}
n(XP, "contextType", oP);
const GP = "__@field_split__";
function YP(e6) {
  return e6.map((e7) => `${typeof e7}:${e7}`).join(GP);
}
class QP {
  constructor() {
    n(this, "kvs", new Map());
  }
  set(e6, t2) {
    this.kvs.set(YP(e6), t2);
  }
  get(e6) {
    return this.kvs.get(YP(e6));
  }
  getAsPrefix(e6) {
    const t2 = YP(e6),
      n2 = t2 + GP,
      r2 = [],
      o2 = this.kvs.get(t2);
    return (
      o2 !== void 0 && r2.push(o2),
      this.kvs.forEach((e7, t3) => {
        t3.startsWith(n2) && r2.push(e7);
      }),
      r2
    );
  }
  update(e6, t2) {
    const n2 = t2(this.get(e6));
    n2 ? this.set(e6, n2) : this.delete(e6);
  }
  delete(e6) {
    this.kvs.delete(YP(e6));
  }
  map(e6) {
    return [...this.kvs.entries()].map(([t2, n2]) => {
      const r2 = t2.split(GP);
      return e6({
        key: r2.map((e7) => {
          const [, t3, n3] = e7.match(/^([^:]*):(.*)$/);
          return t3 === "number" ? Number(n3) : n3;
        }),
        value: n2,
      });
    });
  }
  toJSON() {
    const e6 = {};
    return this.map(({ key: t2, value: n2 }) => ((e6[t2.join(".")] = n2), null)), e6;
  }
}
class JP {
  constructor(e6) {
    n(this, "formHooked", !1),
      n(this, "forceRootUpdate"),
      n(this, "subscribable", !0),
      n(this, "store", {}),
      n(this, "fieldEntities", []),
      n(this, "initialValues", {}),
      n(this, "callbacks", {}),
      n(this, "validateMessages", null),
      n(this, "preserve", null),
      n(this, "lastValidatePromise", null),
      n(this, "watcherCenter", new VP(this)),
      n(this, "getForm", () => ({
        getFieldValue: this.getFieldValue,
        getFieldsValue: this.getFieldsValue,
        getFieldError: this.getFieldError,
        getFieldWarning: this.getFieldWarning,
        getFieldsError: this.getFieldsError,
        isFieldsTouched: this.isFieldsTouched,
        isFieldTouched: this.isFieldTouched,
        isFieldValidating: this.isFieldValidating,
        isFieldsValidating: this.isFieldsValidating,
        resetFields: this.resetFields,
        setFields: this.setFields,
        setFieldValue: this.setFieldValue,
        setFieldsValue: this.setFieldsValue,
        validateFields: this.validateFields,
        submit: this.submit,
        _init: !0,
        getInternalHooks: this.getInternalHooks,
      })),
      n(this, "getInternalHooks", (e7) =>
        e7 === nP
          ? ((this.formHooked = !0),
            {
              dispatch: this.dispatch,
              initEntityValue: this.initEntityValue,
              registerField: this.registerField,
              useSubscribe: this.useSubscribe,
              setInitialValues: this.setInitialValues,
              destroyForm: this.destroyForm,
              setCallbacks: this.setCallbacks,
              setValidateMessages: this.setValidateMessages,
              getFields: this.getFields,
              setPreserve: this.setPreserve,
              getInitialValue: this.getInitialValue,
              registerWatch: this.registerWatch,
            })
          : (jy(!1, "`getInternalHooks` is internal usage. Should not call directly."), null),
      ),
      n(this, "useSubscribe", (e7) => {
        this.subscribable = e7;
      }),
      n(this, "prevWithoutPreserves", null),
      n(this, "setInitialValues", (e7, t2) => {
        var n2;
        if (((this.initialValues = e7 || {}), t2)) {
          let t3 = lb(e7, this.store);
          (n2 = this.prevWithoutPreserves) == null ||
            n2.map(({ key: n3 }) => {
              t3 = nb(t3, n3, eb(e7, n3));
            }),
            (this.prevWithoutPreserves = null),
            this.updateStore(t3);
        }
      }),
      n(this, "destroyForm", (e7) => {
        if (e7) this.updateStore({});
        else {
          const e8 = new QP();
          this.getFieldEntities(!0).forEach((t2) => {
            this.isMergedPreserve(t2.isPreserve()) || e8.set(t2.getNamePath(), !0);
          }),
            (this.prevWithoutPreserves = e8);
        }
      }),
      n(this, "getInitialValue", (e7) => {
        const t2 = eb(this.initialValues, e7);
        return e7.length ? lb(t2) : t2;
      }),
      n(this, "setCallbacks", (e7) => {
        this.callbacks = e7;
      }),
      n(this, "setValidateMessages", (e7) => {
        this.validateMessages = e7;
      }),
      n(this, "setPreserve", (e7) => {
        this.preserve = e7;
      }),
      n(this, "registerWatch", (e7) => this.watcherCenter.register(e7)),
      n(this, "notifyWatch", (e7 = []) => {
        this.watcherCenter.notify(e7);
      }),
      n(this, "timeoutId", null),
      n(this, "warningUnhooked", () => {}),
      n(this, "updateStore", (e7) => {
        this.store = e7;
      }),
      n(this, "getFieldEntities", (e7 = !1) =>
        e7 ? this.fieldEntities.filter((e8) => e8.getNamePath().length) : this.fieldEntities,
      ),
      n(this, "getFieldsMap", (e7 = !1) => {
        const t2 = new QP();
        return (
          this.getFieldEntities(e7).forEach((e8) => {
            const n2 = e8.getNamePath();
            t2.set(n2, e8);
          }),
          t2
        );
      }),
      n(this, "getFieldEntitiesForNamePathList", (e7, t2 = !1) => {
        if (!e7) return this.getFieldEntities(!0);
        const n2 = this.getFieldsMap(!0);
        return t2
          ? e7.flatMap((e8) => {
              const t3 = AP(e8),
                r2 = n2.getAsPrefix(t3);
              return r2.length ? r2 : [{ INVALIDATE_NAME_PATH: t3 }];
            })
          : e7.map((e8) => {
              const t3 = AP(e8);
              return n2.get(t3) || { INVALIDATE_NAME_PATH: AP(e8) };
            });
      }),
      n(this, "getFieldsValue", (e7, t2) => {
        let n2, r2;
        if (
          (this.warningUnhooked(),
          e7 === !0 || Array.isArray(e7)
            ? ((n2 = e7), (r2 = t2))
            : e7 && typeof e7 == "object" && (r2 = e7.filter),
          n2 === !0 && !r2)
        )
          return this.store;
        const o2 = this.getFieldEntitiesForNamePathList(Array.isArray(n2) ? n2 : null, !0),
          a2 = [],
          l2 = [];
        o2.forEach((e8) => {
          var t3;
          const n3 = e8.INVALIDATE_NAME_PATH || e8.getNamePath();
          if ((t3 = e8.isList) != null && t3.call(e8)) l2.push(n3);
          else if (r2) {
            const t4 = "getMeta" in e8 ? e8.getMeta() : null;
            r2(t4) && a2.push(n3);
          } else a2.push(n3);
        });
        let i2 = FP(this.store, a2.map(AP));
        return (
          l2.forEach((e8) => {
            eb(i2, e8) || (i2 = nb(i2, e8, []));
          }),
          i2
        );
      }),
      n(this, "getFieldValue", (e7) => {
        this.warningUnhooked();
        const t2 = AP(e7);
        return eb(this.store, t2);
      }),
      n(
        this,
        "getFieldsError",
        (e7) => (
          this.warningUnhooked(),
          this.getFieldEntitiesForNamePathList(e7).map((t2, n2) =>
            t2 && !t2.INVALIDATE_NAME_PATH
              ? { name: t2.getNamePath(), errors: t2.getErrors(), warnings: t2.getWarnings() }
              : { name: AP(e7[n2]), errors: [], warnings: [] },
          )
        ),
      ),
      n(this, "getFieldError", (e7) => {
        this.warningUnhooked();
        const t2 = AP(e7);
        return this.getFieldsError([t2])[0].errors;
      }),
      n(this, "getFieldWarning", (e7) => {
        this.warningUnhooked();
        const t2 = AP(e7);
        return this.getFieldsError([t2])[0].warnings;
      }),
      n(this, "isFieldsTouched", (...e7) => {
        this.warningUnhooked();
        const [t2, n2] = e7;
        let r2,
          o2 = !1;
        e7.length === 0
          ? (r2 = null)
          : e7.length === 1
            ? Array.isArray(t2)
              ? ((r2 = t2.map(AP)), (o2 = !1))
              : ((r2 = null), (o2 = t2))
            : ((r2 = t2.map(AP)), (o2 = n2));
        const a2 = this.getFieldEntities(!0),
          l2 = (e8) => e8.isFieldTouched();
        if (!r2) return o2 ? a2.every((e8) => l2(e8) || e8.isList()) : a2.some(l2);
        const i2 = new QP();
        r2.forEach((e8) => {
          i2.set(e8, []);
        }),
          a2.forEach((e8) => {
            const t3 = e8.getNamePath();
            r2.forEach((n3) => {
              n3.every((e9, n4) => t3[n4] === e9) && i2.update(n3, (t4) => [...t4, e8]);
            });
          });
        const s2 = (e8) => e8.some(l2),
          u2 = i2.map(({ value: e8 }) => e8);
        return o2 ? u2.every(s2) : u2.some(s2);
      }),
      n(this, "isFieldTouched", (e7) => (this.warningUnhooked(), this.isFieldsTouched([e7]))),
      n(this, "isFieldsValidating", (e7) => {
        this.warningUnhooked();
        const t2 = this.getFieldEntities();
        if (!e7) return t2.some((e8) => e8.isFieldValidating());
        const n2 = e7.map(AP);
        return t2.some((e8) => {
          const t3 = e8.getNamePath();
          return zP(n2, t3) && e8.isFieldValidating();
        });
      }),
      n(this, "isFieldValidating", (e7) => (this.warningUnhooked(), this.isFieldsValidating([e7]))),
      n(this, "resetWithFieldInitialValue", (e7 = {}) => {
        const t2 = new QP(),
          n2 = this.getFieldEntities(!0);
        n2.forEach((e8) => {
          const { initialValue: n3 } = e8.props,
            r3 = e8.getNamePath();
          if (n3 !== void 0) {
            const o2 = t2.get(r3) || new Set();
            o2.add({ entity: e8, value: n3 }), t2.set(r3, o2);
          }
        });
        let r2;
        e7.entities
          ? (r2 = e7.entities)
          : e7.namePathList
            ? ((r2 = []),
              e7.namePathList.forEach((e8) => {
                const n3 = t2.get(e8);
                n3 && r2.push(...[...n3].map((e9) => e9.entity));
              }))
            : (r2 = n2),
          ((n3) => {
            n3.forEach((n4) => {
              const { initialValue: r3 } = n4.props;
              if (r3 !== void 0) {
                const r4 = n4.getNamePath();
                if (this.getInitialValue(r4) !== void 0)
                  jy(
                    !1,
                    `Form already set 'initialValues' with path '${r4.join(".")}'. Field can not overwrite it.`,
                  );
                else {
                  const o2 = t2.get(r4);
                  if (o2 && o2.size > 1)
                    jy(
                      !1,
                      `Multiple Field with path '${r4.join(".")}' set 'initialValue'. Can not decide which one to pick.`,
                    );
                  else if (o2) {
                    const t3 = this.getFieldValue(r4);
                    n4.isListField() ||
                      (e7.skipExist && t3 !== void 0) ||
                      this.updateStore(nb(this.store, r4, [...o2][0].value));
                  }
                }
              }
            });
          })(r2);
      }),
      n(this, "resetFields", (e7) => {
        this.warningUnhooked();
        const t2 = this.store;
        if (!e7)
          return (
            this.updateStore(lb(this.initialValues)),
            this.resetWithFieldInitialValue(),
            this.notifyObservers(t2, null, { type: "reset" }),
            void this.notifyWatch()
          );
        const n2 = e7.map(AP);
        n2.forEach((e8) => {
          const t3 = this.getInitialValue(e8);
          this.updateStore(nb(this.store, e8, t3));
        }),
          this.resetWithFieldInitialValue({ namePathList: n2 }),
          this.notifyObservers(t2, n2, { type: "reset" }),
          this.notifyWatch(n2);
      }),
      n(this, "setFields", (e7) => {
        this.warningUnhooked();
        const t2 = this.store,
          n2 = [];
        e7.forEach((e8) => {
          const { name: r2, ...o2 } = e8,
            a2 = AP(r2);
          n2.push(a2),
            "value" in o2 && this.updateStore(nb(this.store, a2, o2.value)),
            this.notifyObservers(t2, [a2], { type: "setField", data: e8 });
        }),
          this.notifyWatch(n2);
      }),
      n(this, "getFields", () =>
        this.getFieldEntities(!0).map((e7) => {
          const t2 = e7.getNamePath(),
            n2 = { ...e7.getMeta(), name: t2, value: this.getFieldValue(t2) };
          return Object.defineProperty(n2, "originRCField", { value: !0 }), n2;
        }),
      ),
      n(this, "initEntityValue", (e7) => {
        const { initialValue: t2 } = e7.props;
        if (t2 !== void 0) {
          const n2 = e7.getNamePath();
          eb(this.store, n2) === void 0 && this.updateStore(nb(this.store, n2, t2));
        }
      }),
      n(this, "isMergedPreserve", (e7) => (e7 !== void 0 ? e7 : this.preserve) ?? !0),
      n(this, "registerField", (e7) => {
        this.fieldEntities.push(e7);
        const t2 = e7.getNamePath();
        if ((this.notifyWatch([t2]), e7.props.initialValue !== void 0)) {
          const t3 = this.store;
          this.resetWithFieldInitialValue({ entities: [e7], skipExist: !0 }),
            this.notifyObservers(t3, [e7.getNamePath()], {
              type: "valueUpdate",
              source: "internal",
            });
        }
        return (n2, r2, o2 = []) => {
          if (
            ((this.fieldEntities = this.fieldEntities.filter((t3) => t3 !== e7)),
            !this.isMergedPreserve(r2) && (!n2 || o2.length > 1))
          ) {
            const e8 = n2 ? void 0 : this.getInitialValue(t2);
            if (
              t2.length &&
              this.getFieldValue(t2) !== e8 &&
              this.fieldEntities.every((e9) => !jP(e9.getNamePath(), t2))
            ) {
              const n3 = this.store;
              this.updateStore(nb(n3, t2, e8, !0)),
                this.notifyObservers(n3, [t2], { type: "remove" }),
                this.triggerDependenciesUpdate(n3, t2);
            }
          }
          this.notifyWatch([t2]);
        };
      }),
      n(this, "dispatch", (e7) => {
        switch (e7.type) {
          case "updateValue": {
            const { namePath: t2, value: n2 } = e7;
            this.updateValue(t2, n2);
            break;
          }
          case "validateField": {
            const { namePath: t2, triggerName: n2 } = e7;
            this.validateFields([t2], { triggerName: n2 });
            break;
          }
        }
      }),
      n(this, "notifyObservers", (e7, t2, n2) => {
        if (this.subscribable) {
          const r2 = { ...n2, store: this.getFieldsValue(!0) };
          this.getFieldEntities().forEach(({ onStoreChange: n3 }) => {
            n3(e7, t2, r2);
          });
        } else this.forceRootUpdate();
      }),
      n(this, "triggerDependenciesUpdate", (e7, t2) => {
        const n2 = this.getDependencyChildrenFields(t2);
        return (
          n2.length && this.validateFields(n2, { delayFrame: !0 }),
          this.notifyObservers(e7, n2, { type: "dependenciesUpdate", relatedFields: [t2, ...n2] }),
          n2
        );
      }),
      n(this, "updateValue", (e7, t2) => {
        const n2 = AP(e7),
          r2 = this.store;
        this.updateStore(nb(this.store, n2, t2)),
          this.notifyObservers(r2, [n2], { type: "valueUpdate", source: "internal" }),
          this.notifyWatch([n2]);
        const o2 = this.triggerDependenciesUpdate(r2, n2),
          { onValuesChange: a2 } = this.callbacks;
        if (a2) {
          const e8 = FP(this.store, [n2]);
          a2(e8, nb(this.getFieldsValue(), n2, eb(e8, n2)));
        }
        this.triggerOnFieldsChange([n2, ...o2]);
      }),
      n(this, "setFieldsValue", (e7) => {
        this.warningUnhooked();
        const t2 = this.store;
        if (e7) {
          const t3 = lb(this.store, e7);
          this.updateStore(t3);
        }
        this.notifyObservers(t2, null, { type: "valueUpdate", source: "external" }),
          this.notifyWatch();
      }),
      n(this, "setFieldValue", (e7, t2) => {
        this.setFields([{ name: e7, value: t2, errors: [], warnings: [], touched: !0 }]);
      }),
      n(this, "getDependencyChildrenFields", (e7) => {
        const t2 = new Set(),
          n2 = [],
          r2 = new QP();
        this.getFieldEntities().forEach((e8) => {
          const { dependencies: t3 } = e8.props;
          (t3 || []).forEach((t4) => {
            const n3 = AP(t4);
            r2.update(n3, (t5 = new Set()) => (t5.add(e8), t5));
          });
        });
        const o2 = (e8) => {
          (r2.get(e8) || new Set()).forEach((e9) => {
            if (!t2.has(e9)) {
              t2.add(e9);
              const r3 = e9.getNamePath();
              e9.isFieldDirty() && r3.length && (n2.push(r3), o2(r3));
            }
          });
        };
        return o2(e7), n2;
      }),
      n(this, "triggerOnFieldsChange", (e7, t2) => {
        const { onFieldsChange: n2 } = this.callbacks;
        if (n2) {
          const r2 = this.getFields();
          if (t2) {
            const e8 = new QP();
            t2.forEach(({ name: t3, errors: n3 }) => {
              e8.set(t3, n3);
            }),
              r2.forEach((t3) => {
                t3.errors = e8.get(t3.name) || t3.errors;
              });
          }
          const o2 = r2.filter(({ name: t3 }) => zP(e7, t3));
          o2.length && n2(o2, r2);
        }
      }),
      n(this, "validateFields", (e7, t2) => {
        let n2, r2;
        this.warningUnhooked(),
          Array.isArray(e7) || typeof e7 == "string" || typeof t2 == "string"
            ? ((n2 = e7), (r2 = t2))
            : (r2 = e7);
        const o2 = !!n2,
          a2 = o2 ? n2.map(AP) : [],
          l2 = [...a2],
          i2 = [],
          s2 = String(Date.now()),
          u2 = new Set(),
          { recursive: c2, dirty: d2 } = r2 || {};
        this.getFieldEntities(!0).forEach((e8) => {
          const t3 = e8.getNamePath();
          if (
            (o2 || ((e8.isList() && a2.some((e9) => jP(e9, t3, !0))) || l2.push(t3), a2.push(t3)),
            e8.props.rules &&
              e8.props.rules.length &&
              (!d2 || e8.isFieldDirty()) &&
              (u2.add(t3.join(s2)), !o2 || zP(a2, t3, c2)))
          ) {
            const n3 = e8.validateRules({
              validateMessages: { ...$P, ...this.validateMessages },
              ...r2,
            });
            i2.push(
              n3
                .then(() => ({ name: t3, errors: [], warnings: [] }))
                .catch((e9) => {
                  var n4;
                  const r3 = [],
                    o3 = [];
                  return (
                    (n4 = e9.forEach) == null ||
                      n4.call(e9, ({ rule: { warningOnly: e10 }, errors: t4 }) => {
                        e10 ? o3.push(...t4) : r3.push(...t4);
                      }),
                    r3.length
                      ? Promise.reject({ name: t3, errors: r3, warnings: o3 })
                      : { name: t3, errors: r3, warnings: o3 }
                  );
                }),
            );
          }
        });
        const f2 = (function (e8) {
          let t3 = !1,
            n3 = e8.length;
          const r3 = [];
          return e8.length
            ? new Promise((o3, a3) => {
                e8.forEach((e9, l3) => {
                  e9.catch((e10) => ((t3 = !0), e10)).then((e10) => {
                    (n3 -= 1), (r3[l3] = e10), n3 > 0 || (t3 && a3(r3), o3(r3));
                  });
                });
              })
            : Promise.resolve([]);
        })(i2);
        (this.lastValidatePromise = f2),
          f2
            .catch((e8) => e8)
            .then((e8) => {
              const t3 = e8.map(({ name: e9 }) => e9);
              this.notifyObservers(this.store, t3, { type: "validateFinish" }),
                this.triggerOnFieldsChange(t3, e8);
            });
        const p2 = f2
          .then(() =>
            this.lastValidatePromise === f2
              ? Promise.resolve(this.getFieldsValue(l2))
              : Promise.reject([]),
          )
          .catch((e8) => {
            var t3, n3;
            const r3 = e8.filter((e9) => e9 && e9.errors.length),
              o3 = (n3 = (t3 = r3[0]) == null ? void 0 : t3.errors) == null ? void 0 : n3[0];
            return Promise.reject({
              message: o3,
              values: this.getFieldsValue(a2),
              errorFields: r3,
              outOfDate: this.lastValidatePromise !== f2,
            });
          });
        p2.catch((e8) => e8);
        const h2 = a2.filter((e8) => u2.has(e8.join(s2)));
        return this.triggerOnFieldsChange(h2), p2;
      }),
      n(this, "submit", () => {
        this.warningUnhooked(),
          this.validateFields()
            .then((e7) => {
              const { onFinish: t2 } = this.callbacks;
              if (t2)
                try {
                  t2(e7);
                } catch {}
            })
            .catch((e7) => {
              const { onFinishFailed: t2 } = this.callbacks;
              t2 && t2(e7);
            });
      }),
      (this.forceRootUpdate = e6);
  }
}
function ZP(e6) {
  const t2 = r.useRef(null),
    [, n2] = r.useState({});
  if (!t2.current)
    if (e6) t2.current = e6;
    else {
      const e7 = new JP(() => {
        n2({});
      });
      t2.current = e7.getForm();
    }
  return [t2.current];
}
const eO = r.createContext({
  triggerFormChange: () => {},
  triggerFormFinish: () => {},
  registerForm: () => {},
  unregisterForm: () => {},
});
function tO() {
  return (
    (tO = Object.assign
      ? Object.assign.bind()
      : function (e6) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = arguments[t2];
            for (var r2 in n2) Object.prototype.hasOwnProperty.call(n2, r2) && (e6[r2] = n2[r2]);
          }
          return e6;
        }),
    tO.apply(this, arguments)
  );
}
const nO = (e6, t2) => {
  const {
      name: n2,
      initialValues: o2,
      fields: a2,
      form: l2,
      preserve: i2,
      children: s2,
      component: u2 = "form",
      validateMessages: c2,
      validateTrigger: d2 = "onChange",
      onValuesChange: f2,
      onFieldsChange: p2,
      onFinish: h2,
      onFinishFailed: m2,
      clearOnDestroy: g2,
      ...v2
    } = e6,
    y2 = r.useRef(null),
    b2 = r.useContext(eO),
    [w2] = ZP(l2),
    {
      useSubscribe: E2,
      setInitialValues: S2,
      setCallbacks: x2,
      setValidateMessages: k2,
      setPreserve: C2,
      destroyForm: _2,
    } = w2.getInternalHooks(nP);
  r.useImperativeHandle(t2, () => ({ ...w2, nativeElement: y2.current })),
    r.useEffect(
      () => (
        b2.registerForm(n2, w2),
        () => {
          b2.unregisterForm(n2);
        }
      ),
      [b2, w2, n2],
    ),
    k2({ ...b2.validateMessages, ...c2 }),
    x2({
      onValuesChange: f2,
      onFieldsChange: (e7, ...t3) => {
        b2.triggerFormChange(n2, e7), p2 && p2(e7, ...t3);
      },
      onFinish: (e7) => {
        b2.triggerFormFinish(n2, e7), h2 && h2(e7);
      },
      onFinishFailed: m2,
    }),
    C2(i2);
  const P2 = r.useRef(null);
  let O2;
  S2(o2, !P2.current), P2.current || (P2.current = !0), r.useEffect(() => () => _2(g2), []);
  const T2 = typeof s2 == "function";
  T2 ? (O2 = s2(w2.getFieldsValue(!0), w2)) : (O2 = s2), E2(!T2);
  const N2 = r.useRef(null);
  r.useEffect(() => {
    (function (e7, t3) {
      if (e7 === t3) return !0;
      if (
        (!e7 && t3) ||
        (e7 && !t3) ||
        !e7 ||
        !t3 ||
        typeof e7 != "object" ||
        typeof t3 != "object"
      )
        return !1;
      const n3 = Object.keys(e7),
        r2 = Object.keys(t3);
      return [...new Set([...n3, ...r2])].every((n4) => {
        const r3 = e7[n4],
          o3 = t3[n4];
        return (typeof r3 == "function" && typeof o3 == "function") || r3 === o3;
      });
    })(N2.current || [], a2 || []) || w2.setFields(a2 || []),
      (N2.current = a2);
  }, [a2, w2]);
  const $2 = r.useMemo(() => ({ ...w2, validateTrigger: d2 }), [w2, d2]),
    M2 = r.createElement(
      aP.Provider,
      { value: null },
      r.createElement(oP.Provider, { value: $2 }, O2),
    );
  return u2 === !1
    ? M2
    : r.createElement(
        u2,
        tO({}, v2, {
          ref: y2,
          onSubmit: (e7) => {
            e7.preventDefault(), e7.stopPropagation(), w2.submit();
          },
          onReset: (e7) => {
            var t3;
            e7.preventDefault(), w2.resetFields(), (t3 = v2.onReset) == null || t3.call(v2, e7);
          },
        }),
        M2,
      );
};
function rO(e6) {
  try {
    return JSON.stringify(e6);
  } catch {
    return Math.random();
  }
}
const oO = r.forwardRef(nO);
(oO.FormProvider = ({ validateMessages: e6, onFormChange: t2, onFormFinish: n2, children: o2 }) => {
  const a2 = r.useContext(eO),
    l2 = r.useRef({});
  return r.createElement(
    eO.Provider,
    {
      value: {
        ...a2,
        validateMessages: { ...a2.validateMessages, ...e6 },
        triggerFormChange: (e7, n3) => {
          t2 && t2(e7, { changedFields: n3, forms: l2.current }), a2.triggerFormChange(e7, n3);
        },
        triggerFormFinish: (e7, t3) => {
          n2 && n2(e7, { values: t3, forms: l2.current }), a2.triggerFormFinish(e7, t3);
        },
        registerForm: (e7, t3) => {
          e7 && (l2.current = { ...l2.current, [e7]: t3 }), a2.registerForm(e7, t3);
        },
        unregisterForm: (e7) => {
          const t3 = { ...l2.current };
          delete t3[e7], (l2.current = t3), a2.unregisterForm(e7);
        },
      },
    },
    o2,
  );
}),
  (oO.Field = KP),
  (oO.List = function ({
    name: e6,
    initialValue: t2,
    children: n2,
    rules: o2,
    validateTrigger: a2,
    isListField: l2,
  }) {
    const i2 = r.useContext(oP),
      s2 = r.useContext(aP),
      u2 = r.useRef({ keys: [], id: 0 }).current,
      c2 = r.useMemo(() => [...(AP(i2.prefixName) || []), ...AP(e6)], [i2.prefixName, e6]),
      d2 = r.useMemo(() => ({ ...i2, prefixName: c2 }), [i2, c2]),
      f2 = r.useMemo(
        () => ({
          getKey: (e7) => {
            const t3 = c2.length,
              n3 = e7[t3];
            return [u2.keys[n3], e7.slice(t3 + 1)];
          },
        }),
        [u2, c2],
      );
    return typeof n2 != "function"
      ? (jy(!1, "Form.List only accepts function as children."), null)
      : r.createElement(
          aP.Provider,
          { value: f2 },
          r.createElement(
            oP.Provider,
            { value: d2 },
            r.createElement(
              KP,
              {
                name: [],
                shouldUpdate: (e7, t3, { source: n3 }) => n3 !== "internal" && e7 !== t3,
                rules: o2,
                validateTrigger: a2,
                initialValue: t2,
                isList: !0,
                isListField: l2 ?? !!s2,
              },
              ({ value: e7 = [], onChange: t3 }, r2) => {
                const { getFieldValue: o3 } = i2,
                  a3 = () => o3(c2 || []) || [],
                  l3 = {
                    add: (e8, n3) => {
                      const r3 = a3();
                      n3 >= 0 && n3 <= r3.length
                        ? ((u2.keys = [...u2.keys.slice(0, n3), u2.id, ...u2.keys.slice(n3)]),
                          t3([...r3.slice(0, n3), e8, ...r3.slice(n3)]))
                        : ((u2.keys = [...u2.keys, u2.id]), t3([...r3, e8])),
                        (u2.id += 1);
                    },
                    remove: (e8) => {
                      const n3 = a3(),
                        r3 = new Set(Array.isArray(e8) ? e8 : [e8]);
                      r3.size <= 0 ||
                        ((u2.keys = u2.keys.filter((e9, t4) => !r3.has(t4))),
                        t3(n3.filter((e9, t4) => !r3.has(t4))));
                    },
                    move(e8, n3) {
                      if (e8 === n3) return;
                      const r3 = a3();
                      e8 < 0 ||
                        e8 >= r3.length ||
                        n3 < 0 ||
                        n3 >= r3.length ||
                        ((u2.keys = DP(u2.keys, e8, n3)), t3(DP(r3, e8, n3)));
                    },
                  };
                let s3 = e7 || [];
                return (
                  Array.isArray(s3) || (s3 = []),
                  n2(
                    s3.map((e8, t4) => {
                      let n3 = u2.keys[t4];
                      return (
                        n3 === void 0 && ((u2.keys[t4] = u2.id), (n3 = u2.keys[t4]), (u2.id += 1)),
                        { name: t4, key: n3, isListField: !0 }
                      );
                    }),
                    l3,
                    r2,
                  )
                );
              },
            ),
          ),
        );
  }),
  (oO.useForm = ZP),
  (oO.useWatch = function (...e6) {
    const [t2, n2 = {}] = e6,
      o2 = (function (e7) {
        return e7 && !!e7._init;
      })(n2)
        ? { form: n2 }
        : n2,
      a2 = o2.form,
      [l2, i2] = r.useState(() => (typeof t2 == "function" ? t2({}) : void 0)),
      s2 = r.useMemo(() => rO(l2), [l2]);
    r.useRef(s2).current = s2;
    const u2 = r.useContext(oP),
      c2 = a2 || u2,
      d2 = c2 && c2._init,
      { getFieldsValue: f2, getInternalHooks: p2 } = c2,
      { registerWatch: h2 } = p2(nP),
      m2 = wv((e7, n3) => {
        const r2 = o2.preserve ? (n3 ?? f2(!0)) : (e7 ?? f2()),
          a3 = typeof t2 == "function" ? t2(r2) : eb(r2, AP(t2));
        rO(l2) !== rO(a3) && i2(a3);
      }),
      g2 = typeof t2 == "function" ? t2 : JSON.stringify(t2);
    return (
      r.useEffect(() => {
        d2 && m2();
      }, [d2, g2]),
      r.useEffect(() => {
        if (d2)
          return h2((e7, t3) => {
            m2(e7, t3);
          });
      }, [d2]),
      l2
    );
  });
const aO = r.createContext({}),
  lO = ({ children: e6, status: t2, override: n2 }) => {
    const o2 = r.useContext(aO),
      a2 = r.useMemo(() => {
        const e7 = { ...o2 };
        return (
          n2 && delete e7.isFormItemInput,
          t2 && (delete e7.status, delete e7.hasFeedback, delete e7.feedbackIcon),
          e7
        );
      }, [t2, n2, o2]);
    return r.createElement(aO.Provider, { value: a2 }, e6);
  },
  iO = r.createContext(void 0),
  sO = (e6) => {
    const { space: t2, form: n2, children: r2 } = e6;
    if (!Vy(r2)) return null;
    let o2 = r2;
    return (
      n2 && (o2 = i.createElement(lO, { override: !0, status: !0 }, o2)),
      t2 && (o2 = i.createElement(T_, null, o2)),
      o2
    );
  };
function uO(e6) {
  return (t2) =>
    r.createElement(
      a_,
      { theme: { token: { motion: !1, zIndexPopupBase: 0 } } },
      r.createElement(e6, { ...t2 }),
    );
}
const cO = (e6, t2, n2, o2, a2) =>
    uO((l2) => {
      const { prefixCls: i2, style: s2 } = l2,
        u2 = r.useRef(null),
        [c2, d2] = r.useState(0),
        [f2, p2] = r.useState(0),
        [h2, m2] = _v(!1, l2.open),
        { getPrefixCls: g2 } = r.useContext(Tb),
        v2 = g2(o2 || "select", i2);
      r.useEffect(() => {
        if ((m2(!0), typeof ResizeObserver < "u")) {
          const e7 = new ResizeObserver((e8) => {
              const t4 = e8[0].target;
              d2(t4.offsetHeight + 8), p2(t4.offsetWidth);
            }),
            t3 = setInterval(() => {
              var n3;
              const r2 = a2 ? `.${a2(v2)}` : `.${v2}-dropdown`,
                o3 = (n3 = u2.current) == null ? void 0 : n3.querySelector(r2);
              o3 && (clearInterval(t3), e7.observe(o3));
            }, 10);
          return () => {
            clearInterval(t3), e7.disconnect();
          };
        }
      }, [v2]);
      let y2 = {
        ...l2,
        style: { ...s2, margin: 0 },
        open: h2,
        getPopupContainer: () => u2.current,
      };
      n2 && (y2 = n2(y2)), t2 && (y2 = { ...y2, [t2]: { overflow: { adjustX: !1, adjustY: !1 } } });
      const b2 = { paddingBottom: c2, position: "relative", minWidth: f2 };
      return r.createElement("div", { ref: u2, style: b2 }, r.createElement(e6, { ...y2 }));
    }),
  dO = r.createContext(null);
function fO() {
  return r.useContext(dO);
}
function pO(e6, t2) {
  return e6.filter((e7) => e7).some((e7) => e7.contains(t2) || e7 === t2);
}
function hO() {
  return (
    (hO = Object.assign
      ? Object.assign.bind()
      : function (e6) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = arguments[t2];
            for (var r2 in n2) Object.prototype.hasOwnProperty.call(n2, r2) && (e6[r2] = n2[r2]);
          }
          return e6;
        }),
    hO.apply(this, arguments)
  );
}
const mO = (e6, t2) => {
    const {
        prefixCls: n2,
        disabled: o2,
        visible: a2,
        children: l2,
        popupElement: i2,
        animation: s2,
        transitionName: u2,
        popupStyle: c2,
        popupClassName: d2,
        direction: f2 = "ltr",
        placement: p2,
        builtinPlacements: h2,
        popupMatchSelectWidth: m2,
        popupRender: g2,
        popupAlign: v2,
        getPopupContainer: y2,
        empty: b2,
        onPopupVisibleChange: w2,
        onPopupMouseEnter: E2,
        onPopupMouseDown: S2,
        onPopupBlur: x2,
        ...k2
      } = e6,
      C2 = `${n2}-dropdown`;
    let _2 = i2;
    g2 && (_2 = g2(i2));
    const P2 = r.useMemo(
        () =>
          h2 ||
          ((e7) => {
            const t3 = e7 === !0 ? 0 : 1;
            return {
              bottomLeft: {
                points: ["tl", "bl"],
                offset: [0, 4],
                overflow: { adjustX: t3, adjustY: 1 },
                htmlRegion: "scroll",
              },
              bottomRight: {
                points: ["tr", "br"],
                offset: [0, 4],
                overflow: { adjustX: t3, adjustY: 1 },
                htmlRegion: "scroll",
              },
              topLeft: {
                points: ["bl", "tl"],
                offset: [0, -4],
                overflow: { adjustX: t3, adjustY: 1 },
                htmlRegion: "scroll",
              },
              topRight: {
                points: ["br", "tr"],
                offset: [0, -4],
                overflow: { adjustX: t3, adjustY: 1 },
                htmlRegion: "scroll",
              },
            };
          })(m2),
        [h2, m2],
      ),
      O2 = s2 ? `${C2}-${s2}` : u2,
      T2 = typeof m2 == "number",
      N2 = r.useMemo(() => (m2 === !1 || T2 ? "minWidth" : "width"), [m2, T2]);
    let $2 = c2;
    T2 && ($2 = { ...c2, width: m2 });
    const M2 = r.useRef(null);
    return (
      r.useImperativeHandle(t2, () => ({
        getPopupElement: () => {
          var e7;
          return (e7 = M2.current) == null ? void 0 : e7.popupElement;
        },
      })),
      r.createElement(
        IC,
        hO({}, k2, {
          showAction: w2 ? ["click"] : [],
          hideAction: w2 ? ["click"] : [],
          popupPlacement: p2 || (f2 === "rtl" ? "bottomRight" : "bottomLeft"),
          builtinPlacements: P2,
          prefixCls: C2,
          popupMotion: { motionName: O2 },
          popup: r.createElement("div", { onMouseEnter: E2, onMouseDown: S2, onBlur: x2 }, _2),
          ref: M2,
          stretch: N2,
          popupAlign: v2,
          popupVisible: a2,
          getPopupContainer: y2,
          popupClassName: Sb(d2, { [`${C2}-empty`]: b2 }),
          popupStyle: $2,
          onPopupVisibleChange: w2,
        }),
        l2,
      )
    );
  },
  gO = r.forwardRef(mO);
function vO(e6, t2) {
  const { key: n2 } = e6;
  let r2;
  return "value" in e6 && ({ value: r2 } = e6), n2 ?? (r2 !== void 0 ? r2 : `rc-index-key-${t2}`);
}
function yO(e6) {
  return e6 !== void 0 && !Number.isNaN(e6);
}
function bO(e6, t2) {
  const { label: n2, value: r2, options: o2, groupLabel: a2 } = e6 || {},
    l2 = n2 || (t2 ? "children" : "label");
  return { label: l2, value: r2 || "value", options: o2 || "options", groupLabel: a2 || l2 };
}
function wO(e6) {
  const t2 = { ...e6 };
  return (
    "props" in t2 ||
      Object.defineProperty(t2, "props", {
        get: () => (
          jy(
            !1,
            "Return type is option instead of Option instance. Please read value directly instead of reading from `props`.",
          ),
          t2
        ),
      }),
    t2
  );
}
function EO(e6) {
  const { visible: t2, values: n2 } = e6;
  return t2
    ? r.createElement(
        "span",
        {
          "aria-live": "polite",
          style: { width: 0, height: 0, position: "absolute", overflow: "hidden", opacity: 0 },
        },
        `${n2
          .slice(0, 50)
          .map(({ label: e7, value: t3 }) => (["number", "string"].includes(typeof e7) ? e7 : t3))
          .join(", ")}`,
        n2.length > 50 ? ", ..." : null,
      )
    : null;
}
const SO = (e6, t2 = 1) => {
  t2 <= 0
    ? e6()
    : ((e7) => {
        const t3 = new MessageChannel();
        (t3.port1.onmessage = e7), t3.port2.postMessage(null);
      })(() => {
        SO(e6, t2 - 1);
      });
};
function xO(e6) {
  const { children: t2, ...n2 } = e6;
  return t2 ? r.createElement("div", n2, t2) : null;
}
const kO = r.createContext(null);
function CO() {
  return r.useContext(kO);
}
const _O = r.forwardRef((e6, t2) => {
  const {
      onChange: n2,
      onKeyDown: o2,
      onBlur: a2,
      style: l2,
      syncWidth: i2,
      value: s2,
      className: u2,
      autoComplete: c2,
      ...d2
    } = e6,
    {
      prefixCls: f2,
      mode: p2,
      onSearch: h2,
      onSearchSubmit: m2,
      onInputBlur: g2,
      autoFocus: v2,
      tokenWithEnter: y2,
      placeholder: b2,
      components: { input: w2 = "input" },
    } = CO(),
    {
      id: E2,
      classNames: S2,
      styles: x2,
      open: k2,
      activeDescendantId: C2,
      role: _2,
      disabled: P2,
    } = fO() || {},
    O2 = Sb(`${f2}-input`, S2?.input, u2),
    T2 = r.useRef(!1),
    N2 = r.useRef(null),
    $2 = r.useRef(null);
  r.useImperativeHandle(t2, () => $2.current);
  const [M2, R2] = r.useState(void 0);
  xv(() => {
    const e7 = $2.current;
    if (i2 && e7) {
      e7.style.width = "0px";
      const t3 = e7.scrollWidth;
      R2(t3), (e7.style.width = "");
    }
  }, [i2, s2]);
  const L2 = {
    id: E2,
    type: "text",
    ...d2,
    ref: $2,
    style: { ...x2?.input, ...l2, "--select-input-width": M2 },
    autoFocus: v2,
    autoComplete: c2 || "new-password",
    className: O2,
    disabled: P2,
    value: s2 || "",
    onChange: (e7) => {
      let { value: t3 } = e7.target;
      if (y2 && N2.current && /[\r\n]/.test(N2.current)) {
        const e8 = N2.current
          .replace(/[\r\n]+$/, "")
          .replace(/\r\n/g, " ")
          .replace(/[\r\n]/g, " ");
        t3 = t3.replace(e8, N2.current);
      }
      (N2.current = null), h2 && h2(t3, !0, T2.current), n2?.(e7);
    },
    onKeyDown: (e7) => {
      const { key: t3 } = e7,
        { value: n3 } = e7.currentTarget;
      t3 !== "Enter" || p2 !== "tags" || k2 || T2.current || !m2 || m2(n3), o2?.(e7);
    },
    onBlur: (e7) => {
      g2?.(), a2?.(e7);
    },
    onPaste: (e7) => {
      const { clipboardData: t3 } = e7,
        n3 = t3?.getData("text");
      N2.current = n3 || "";
    },
    onCompositionStart: () => {
      T2.current = !0;
    },
    onCompositionEnd: (e7) => {
      if (((T2.current = !1), p2 !== "combobox")) {
        const { value: t3 } = e7.currentTarget;
        h2?.(t3, !0, !1);
      }
    },
    role: _2 || "combobox",
    "aria-expanded": k2 || !1,
    "aria-haspopup": "listbox",
    "aria-owns": k2 ? `${E2}_list` : void 0,
    "aria-autocomplete": "list",
    "aria-controls": k2 ? `${E2}_list` : void 0,
    "aria-activedescendant": k2 ? C2 : void 0,
  };
  if (r.isValidElement(w2)) {
    const t3 = w2.props || {},
      n3 = { placeholder: e6.placeholder || b2, ...L2, ...t3 };
    return (
      Object.keys(t3).forEach((e7) => {
        const r2 = t3[e7];
        typeof r2 == "function" &&
          (n3[e7] = (...t4) => {
            var n4;
            r2(...t4), (n4 = L2[e7]) == null || n4.call(L2, ...t4);
          });
      }),
      (n3.ref = sy(w2.ref, L2.ref)),
      r.cloneElement(w2, n3)
    );
  }
  const I2 = w2;
  return r.createElement(I2, L2);
});
function PO(e6) {
  const { prefixCls: t2, placeholder: n2, displayValues: o2 } = CO(),
    { classNames: a2, styles: l2 } = fO(),
    { show: i2 = !0 } = e6;
  return o2.length
    ? null
    : r.createElement(
        "div",
        {
          className: Sb(`${t2}-placeholder`, a2?.placeholder),
          style: { ...(i2 ? {} : { visibility: "hidden" }), ...l2?.placeholder },
        },
        n2,
      );
}
const OO = r.createContext(null);
function TO(e6) {
  return Array.isArray(e6) ? e6 : e6 !== void 0 ? [e6] : [];
}
function NO(e6) {
  return ["string", "number"].includes(typeof e6);
}
function $O(e6) {
  let t2;
  return (
    e6 && (NO(e6.title) ? (t2 = e6.title.toString()) : NO(e6.label) && (t2 = e6.label.toString())),
    t2
  );
}
function MO() {
  return (
    (MO = Object.assign
      ? Object.assign.bind()
      : function (e6) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = arguments[t2];
            for (var r2 in n2) Object.prototype.hasOwnProperty.call(n2, r2) && (e6[r2] = n2[r2]);
          }
          return e6;
        }),
    MO.apply(this, arguments)
  );
}
const RO = r.forwardRef(({ inputProps: e6 }, t2) => {
    const {
        prefixCls: n2,
        searchValue: o2,
        activeValue: a2,
        displayValues: l2,
        maxLength: i2,
        mode: s2,
        components: u2,
      } = CO(),
      { triggerOpen: c2, title: d2, showSearch: f2, classNames: p2, styles: h2 } = fO(),
      m2 = r.useContext(OO),
      [g2, v2] = r.useState(!1),
      y2 = s2 === "combobox",
      b2 = l2[0],
      w2 = r.useMemo(() => (y2 && a2 && !g2 && c2 ? a2 : f2 ? o2 : ""), [y2, a2, g2, c2, o2, f2]),
      [E2, S2, x2, k2] = r.useMemo(() => {
        let e7, t3, n3;
        if (b2 && m2?.flattenOptions) {
          const r2 = m2.flattenOptions.find((e8) => e8.value === b2.value);
          r2?.data && ((e7 = r2.data.className), (t3 = r2.data.style), (n3 = $O(r2.data)));
        }
        return b2 && !n3 && (n3 = $O(b2)), d2 !== void 0 && (n3 = d2), [e7, t3, n3, !!e7 || !!t3];
      }, [b2, m2?.flattenOptions, d2]);
    r.useEffect(() => {
      y2 && v2(!1);
    }, [y2, a2]);
    const C2 = b2 && b2.label !== null && b2.label !== void 0 && String(b2.label).trim() !== "",
      _2 =
        y2 && u2?.input
          ? null
          : b2
            ? k2
              ? r.createElement(
                  "div",
                  {
                    className: Sb(`${n2}-content-value`, E2),
                    style: { ...(w2 ? { visibility: "hidden" } : {}), ...S2 },
                    title: x2,
                  },
                  b2.label,
                )
              : b2.label
            : r.createElement(PO, { show: !w2 });
    return r.createElement(
      "div",
      {
        className: Sb(
          `${n2}-content`,
          C2 && `${n2}-content-has-value`,
          w2 && `${n2}-content-has-search-value`,
          k2 && `${n2}-content-has-option-style`,
          p2?.content,
        ),
        style: h2?.content,
        title: k2 ? void 0 : x2,
      },
      _2,
      r.createElement(
        _O,
        MO({ ref: t2 }, e6, {
          value: w2,
          maxLength: s2 === "combobox" ? i2 : void 0,
          onChange: (t3) => {
            var n3;
            v2(!0), (n3 = e6.onChange) == null || n3.call(e6, t3);
          },
        }),
      ),
    );
  }),
  LO = void 0;
function IO(e6, t2) {
  const {
      prefixCls: n2,
      invalidate: o2,
      item: a2,
      renderItem: l2,
      responsive: i2,
      responsiveDisabled: s2,
      registerSize: u2,
      itemKey: c2,
      className: d2,
      style: f2,
      children: p2,
      display: h2,
      order: m2,
      component: g2 = "div",
      ...v2
    } = e6,
    y2 = i2 && !h2;
  function b2(e7) {
    u2(c2, e7);
  }
  r.useEffect(
    () => () => {
      b2(null);
    },
    [],
  );
  const w2 = l2 && a2 !== LO ? l2(a2, { index: m2 }) : p2;
  let E2;
  o2 ||
    (E2 = {
      opacity: y2 ? 0 : 1,
      height: y2 ? 0 : LO,
      overflowY: y2 ? "hidden" : LO,
      order: i2 ? m2 : LO,
      pointerEvents: y2 ? "none" : LO,
      position: y2 ? "absolute" : LO,
    });
  const S2 = {};
  y2 && (S2["aria-hidden"] = !0);
  let x2 = r.createElement(
    g2,
    J_({ className: Sb(!o2 && n2, d2), style: { ...E2, ...f2 } }, S2, v2, { ref: t2 }),
    w2,
  );
  return (
    i2 &&
      (x2 = r.createElement(
        wb,
        {
          onResize: ({ offsetWidth: e7 }) => {
            b2(e7);
          },
          disabled: s2,
        },
        x2,
      )),
    x2
  );
}
const AO = r.forwardRef(IO);
function FO() {
  const e6 = r.useRef(null);
  return (t2) => {
    e6.current ||
      ((e6.current = []),
      (function (e7) {
        if (typeof MessageChannel > "u") Mv(e7);
        else {
          const t3 = new MessageChannel();
          (t3.port1.onmessage = () => e7()), t3.port2.postMessage(void 0);
        }
      })(() => {
        o.unstable_batchedUpdates(() => {
          e6.current.forEach((e7) => {
            e7();
          }),
            (e6.current = null);
        });
      })),
      e6.current.push(t2);
  };
}
function zO(e6, t2) {
  const [n2, o2] = r.useState(t2);
  return [
    n2,
    wv((t3) => {
      e6(() => {
        o2(t3);
      });
    }),
  ];
}
const jO = i.createContext(null),
  DO = (e6, t2) => {
    const n2 = r.useContext(jO);
    if (!n2) {
      const { component: n3 = "div", ...o3 } = e6;
      return r.createElement(n3, J_({}, o3, { ref: t2 }));
    }
    const { className: o2, ...a2 } = n2,
      { className: l2, ...i2 } = e6;
    return r.createElement(
      jO.Provider,
      { value: null },
      r.createElement(AO, J_({ ref: t2, className: Sb(o2, l2) }, a2, i2)),
    );
  },
  HO = r.forwardRef(DO),
  VO = "responsive",
  BO = "invalidate";
function UO(e6) {
  return `+ ${e6.length} ...`;
}
function WO(e6, t2) {
  const {
      prefixCls: n2 = "rc-overflow",
      data: o2 = [],
      renderItem: a2,
      renderRawItem: l2,
      itemKey: i2,
      itemWidth: s2 = 10,
      ssr: u2,
      style: c2,
      className: d2,
      maxCount: f2,
      renderRest: p2,
      renderRawRest: h2,
      prefix: m2,
      suffix: g2,
      component: v2 = "div",
      itemComponent: y2,
      onVisibleChange: b2,
      ...w2
    } = e6,
    E2 = u2 === "full",
    S2 = FO(),
    [x2, k2] = zO(S2, null),
    C2 = x2 || 0,
    [_2, P2] = zO(S2, new Map()),
    [O2, T2] = zO(S2, 0),
    [N2, $2] = zO(S2, 0),
    [M2, R2] = zO(S2, 0),
    [L2, I2] = zO(S2, 0),
    [A2, F2] = r.useState(null),
    [z2, j2] = r.useState(null),
    D2 = r.useMemo(() => (z2 === null && E2 ? Number.MAX_SAFE_INTEGER : z2 || 0), [z2, x2]),
    [H2, V2] = r.useState(!1),
    B2 = `${n2}-item`,
    U2 = Math.max(O2, N2),
    W2 = f2 === VO,
    q2 = o2.length && W2,
    X2 = f2 === BO,
    K2 = q2 || (typeof f2 == "number" && o2.length > f2),
    G2 = r.useMemo(() => {
      let e7 = o2;
      return (
        q2
          ? (e7 = x2 === null && E2 ? o2 : o2.slice(0, Math.min(o2.length, C2 / s2)))
          : typeof f2 == "number" && (e7 = o2.slice(0, f2)),
        e7
      );
    }, [o2, s2, x2, f2, q2]),
    Y2 = r.useMemo(() => (q2 ? o2.slice(D2 + 1) : o2.slice(G2.length)), [o2, G2, q2, D2]),
    Q2 = r.useCallback(
      (e7, t3) => (typeof i2 == "function" ? i2(e7) : ((i2 && e7?.[i2]) ?? t3)),
      [i2],
    ),
    J2 = r.useCallback(a2 || ((e7) => e7), [a2]);
  function Z2(e7, t3, n3) {
    (z2 !== e7 || (t3 !== void 0 && t3 !== A2)) &&
      (j2(e7), n3 || (V2(e7 < o2.length - 1), b2?.(e7)), t3 !== void 0 && F2(t3));
  }
  function ee2(e7, t3) {
    P2((n3) => {
      const r2 = new Map(n3);
      return t3 === null ? r2.delete(e7) : r2.set(e7, t3), r2;
    });
  }
  function te2(e7) {
    return _2.get(Q2(G2[e7], e7));
  }
  xv(() => {
    if (C2 && typeof U2 == "number" && G2) {
      let e7 = M2 + L2;
      const t3 = G2.length,
        n3 = t3 - 1;
      if (!t3) return void Z2(0, null);
      for (let r2 = 0; r2 < t3; r2 += 1) {
        let t4 = te2(r2);
        if ((E2 && (t4 = t4 || 0), t4 === void 0)) {
          Z2(r2 - 1, void 0, !0);
          break;
        }
        if (((e7 += t4), (n3 === 0 && e7 <= C2) || (r2 === n3 - 1 && e7 + te2(n3) <= C2))) {
          Z2(n3, null);
          break;
        }
        if (e7 + U2 > C2) {
          Z2(r2 - 1, e7 - t4 - L2 + N2);
          break;
        }
      }
      g2 && te2(0) + L2 > C2 && F2(null);
    }
  }, [C2, _2, N2, M2, L2, Q2, G2]);
  const ne2 = H2 && !!Y2.length;
  let re2 = {};
  A2 !== null && q2 && (re2 = { position: "absolute", top: 0, insetInlineStart: A2 });
  const oe2 = { prefixCls: B2, responsive: q2, component: y2, invalidate: X2 },
    ae2 = l2
      ? (e7, t3) => {
          const n3 = Q2(e7, t3);
          return r.createElement(
            jO.Provider,
            {
              key: n3,
              value: {
                ...oe2,
                order: t3,
                item: e7,
                itemKey: n3,
                registerSize: ee2,
                display: t3 <= D2,
              },
            },
            l2(e7, t3),
          );
        }
      : (e7, t3) => {
          const n3 = Q2(e7, t3);
          return r.createElement(
            AO,
            J_({}, oe2, {
              order: t3,
              key: n3,
              item: e7,
              renderItem: J2,
              itemKey: n3,
              registerSize: ee2,
              display: t3 <= D2,
            }),
          );
        },
    le2 = {
      order: ne2 ? D2 : Number.MAX_SAFE_INTEGER,
      className: `${B2}-rest`,
      registerSize: function (e7, t3) {
        $2(t3), T2(N2);
      },
      display: ne2,
    },
    ie2 = p2 || UO,
    se2 = h2
      ? r.createElement(jO.Provider, { value: { ...oe2, ...le2 } }, h2(Y2))
      : r.createElement(AO, J_({}, oe2, le2), typeof ie2 == "function" ? ie2(Y2) : ie2),
    ue2 = r.createElement(
      v2,
      J_({ className: Sb(!X2 && n2, d2), style: c2, ref: t2 }, w2),
      m2 &&
        r.createElement(
          AO,
          J_({}, oe2, {
            responsive: W2,
            responsiveDisabled: !q2,
            order: -1,
            className: `${B2}-prefix`,
            registerSize: function (e7, t3) {
              R2(t3);
            },
            display: !0,
          }),
          m2,
        ),
      G2.map(ae2),
      K2 ? se2 : null,
      g2 &&
        r.createElement(
          AO,
          J_({}, oe2, {
            responsive: W2,
            responsiveDisabled: !q2,
            order: D2,
            className: `${B2}-suffix`,
            registerSize: function (e7, t3) {
              I2(t3);
            },
            display: !0,
            style: re2,
          }),
          g2,
        ),
    );
  return W2
    ? r.createElement(
        wb,
        {
          onResize: function (e7, t3) {
            k2(t3.clientWidth);
          },
          disabled: !q2,
        },
        ue2,
      )
    : ue2;
}
const qO = r.forwardRef(WO);
(qO.Item = HO), (qO.RESPONSIVE = VO), (qO.INVALIDATE = BO);
const XO = (e6) => {
  const {
      className: t2,
      style: n2,
      customizeIcon: o2,
      customizeIconProps: a2,
      children: l2,
      onMouseDown: i2,
      onClick: s2,
    } = e6,
    u2 = typeof o2 == "function" ? o2(a2) : o2;
  return r.createElement(
    "span",
    {
      className: t2,
      onMouseDown: (e7) => {
        e7.preventDefault(), i2?.(e7);
      },
      style: { userSelect: "none", WebkitUserSelect: "none", ...n2 },
      unselectable: "on",
      onClick: s2,
      "aria-hidden": !0,
    },
    u2 !== void 0
      ? u2
      : r.createElement("span", { className: Sb(t2.split(/\s+/).map((e7) => `${e7}-icon`)) }, l2),
  );
};
function KO() {
  return (
    (KO = Object.assign
      ? Object.assign.bind()
      : function (e6) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = arguments[t2];
            for (var r2 in n2) Object.prototype.hasOwnProperty.call(n2, r2) && (e6[r2] = n2[r2]);
          }
          return e6;
        }),
    KO.apply(this, arguments)
  );
}
function GO(e6) {
  return e6.key ?? e6.value;
}
const YO = (e6) => {
    e6.preventDefault(), e6.stopPropagation();
  },
  QO = r.forwardRef(function ({ inputProps: e6 }, t2) {
    const {
        prefixCls: n2,
        displayValues: o2,
        searchValue: a2,
        mode: l2,
        onSelectorRemove: i2,
        removeIcon: s2,
      } = CO(),
      {
        disabled: u2,
        showSearch: c2,
        triggerOpen: d2,
        rawOpen: f2,
        toggleOpen: p2,
        autoClearSearchValue: h2,
        tagRender: m2,
        maxTagPlaceholder: g2,
        maxTagTextLength: v2,
        maxTagCount: y2,
        classNames: b2,
        styles: w2,
      } = fO(),
      E2 = `${n2}-selection-item`;
    let S2 = a2;
    f2 || l2 !== "multiple" || h2 === !1 || (S2 = "");
    const x2 = (c2 && S2) || "",
      k2 = c2 && !u2,
      C2 = s2 ?? "\xD7",
      _2 = g2 ?? ((e7) => `+ ${e7.length} ...`),
      P2 = m2,
      O2 = (e7, t3, n3, o3, a3) =>
        r.createElement(
          "span",
          {
            title: $O(e7),
            className: Sb(E2, { [`${E2}-disabled`]: n3 }, b2?.item),
            style: w2?.item,
          },
          r.createElement(
            "span",
            { className: Sb(`${E2}-content`, b2?.itemContent), style: w2?.itemContent },
            t3,
          ),
          o3 &&
            r.createElement(
              XO,
              {
                className: Sb(`${E2}-remove`, b2?.itemRemove),
                style: w2?.itemRemove,
                onMouseDown: YO,
                onClick: a3,
                customizeIcon: C2,
              },
              "\xD7",
            ),
        ),
      T2 = (e7, t3, n3, o3, a3, l3, i3) =>
        r.createElement(
          "span",
          {
            onMouseDown: (e8) => {
              YO(e8), p2(!d2);
            },
          },
          P2({
            label: t3,
            value: e7,
            index: i3?.index,
            disabled: n3,
            closable: o3,
            onClose: a3,
            isMaxTag: !!l3,
          }),
        );
    return r.createElement(qO, {
      prefixCls: `${n2}-content`,
      className: b2?.content,
      style: w2?.content,
      prefix: !o2.length && !x2 && r.createElement(PO, null),
      data: o2,
      renderItem: (e7, t3) => {
        const { disabled: n3, label: r2, value: o3 } = e7,
          a3 = !u2 && !n3;
        let l3 = r2;
        if (typeof v2 == "number" && (typeof r2 == "string" || typeof r2 == "number")) {
          const e8 = String(l3);
          e8.length > v2 && (l3 = `${e8.slice(0, v2)}...`);
        }
        const s3 = (t4) => {
          t4 && t4.stopPropagation(),
            ((e8) => {
              i2?.(e8);
            })(e7);
        };
        return typeof P2 == "function"
          ? T2(o3, l3, n3, a3, s3, void 0, t3)
          : O2(e7, l3, n3, a3, s3);
      },
      renderRest: (e7) => {
        if (!o2.length) return null;
        const t3 = typeof _2 == "function" ? _2(e7) : _2;
        return typeof P2 == "function"
          ? T2(void 0, t3, !1, !1, void 0, !0)
          : O2({ title: t3 }, t3, !1);
      },
      suffix: r.createElement(
        _O,
        KO({ ref: t2, disabled: u2, readOnly: !k2 }, e6, { value: x2 || "", syncWidth: !0 }),
      ),
      itemKey: GO,
      maxCount: y2,
    });
  }),
  JO = r.forwardRef(function (e6, t2) {
    const { multiple: n2, onInputKeyDown: o2, tabIndex: a2 } = CO(),
      l2 = fO(),
      { showSearch: i2 } = l2,
      s2 = { ...Jy(l2, { aria: !0 }), onKeyDown: o2, readOnly: !i2, tabIndex: a2 };
    return n2
      ? r.createElement(QO, { ref: t2, inputProps: s2 })
      : r.createElement(RO, { ref: t2, inputProps: s2 });
  });
function ZO() {
  return (
    (ZO = Object.assign
      ? Object.assign.bind()
      : function (e6) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = arguments[t2];
            for (var r2 in n2) Object.prototype.hasOwnProperty.call(n2, r2) && (e6[r2] = n2[r2]);
          }
          return e6;
        }),
    ZO.apply(this, arguments)
  );
}
const eT = [
    "value",
    "onChange",
    "removeIcon",
    "placeholder",
    "maxTagCount",
    "maxTagTextLength",
    "maxTagPlaceholder",
    "choiceTransitionName",
    "onInputKeyDown",
    "onPopupScroll",
    "tabIndex",
    "activeValue",
    "onSelectorRemove",
    "focused",
  ],
  tT = r.forwardRef(function (e6, t2) {
    const {
        prefixCls: n2,
        className: o2,
        style: a2,
        prefix: l2,
        suffix: i2,
        clearIcon: s2,
        clearLabel: u2,
        children: c2,
        multiple: d2,
        displayValues: f2,
        placeholder: p2,
        mode: h2,
        searchValue: m2,
        onSearch: g2,
        onSearchSubmit: v2,
        onInputBlur: y2,
        maxLength: b2,
        autoFocus: w2,
        onMouseDown: E2,
        onClearMouseDown: S2,
        onInputKeyDown: x2,
        onSelectorRemove: k2,
        tokenWithEnter: C2,
        components: _2,
        ...P2
      } = e6,
      {
        triggerOpen: O2,
        toggleOpen: T2,
        showSearch: N2,
        disabled: $2,
        loading: M2,
        classNames: R2,
        styles: L2,
      } = fO(),
      I2 = r.useRef(null),
      A2 = r.useRef(null),
      F2 = wv((e7) => {
        const { which: t3 } = e7,
          n3 = A2.current instanceof HTMLTextAreaElement;
        if (
          (n3 || !O2 || (t3 !== Ny.UP && t3 !== Ny.DOWN) || e7.preventDefault(),
          x2 && x2(e7),
          !(n3 && !O2 && ~[Ny.UP, Ny.DOWN, Ny.LEFT, Ny.RIGHT].indexOf(t3)))
        ) {
          var r2;
          e7.ctrlKey ||
            e7.altKey ||
            e7.metaKey ||
            !(r2 = t3) ||
            [
              Ny.ESC,
              Ny.SHIFT,
              Ny.BACKSPACE,
              Ny.TAB,
              Ny.WIN_KEY,
              Ny.ALT,
              Ny.META,
              Ny.WIN_KEY_RIGHT,
              Ny.CTRL,
              Ny.SEMICOLON,
              Ny.EQUALS,
              Ny.CAPS_LOCK,
              Ny.CONTEXT_MENU,
              Ny.UP,
              Ny.LEFT,
              Ny.RIGHT,
              Ny.F1,
              Ny.F2,
              Ny.F3,
              Ny.F4,
              Ny.F5,
              Ny.F6,
              Ny.F7,
              Ny.F8,
              Ny.F9,
              Ny.F10,
              Ny.F11,
              Ny.F12,
            ].includes(r2) ||
            T2(!0);
        }
      });
    r.useImperativeHandle(t2, () => ({
      focus: (e7) => {
        var t3, n3;
        (n3 = (t3 = A2.current || I2.current).focus) == null || n3.call(t3, e7);
      },
      blur: () => {
        var e7, t3;
        (t3 = (e7 = A2.current || I2.current).blur) == null || t3.call(e7);
      },
      nativeElement: _y(I2.current),
    }));
    const z2 = wv((e7) => {
        var t3;
        if (!$2) {
          const n3 = _y(A2.current);
          e7.nativeEvent._ori_target = n3;
          const r2 = n3 === e7.target || n3?.contains(e7.target);
          n3 && !r2 && e7.preventDefault();
          const o3 = (O2 && !d2 && (h2 === "combobox" || N2)) || (O2 && d2 && r2);
          e7.nativeEvent._select_lazy
            ? O2 && !d2 && T2(!1)
            : ((t3 = A2.current) == null || t3.focus(), o3 || T2());
        }
        E2?.(e7);
      }),
      { root: j2 } = _2,
      D2 = Gy(P2, eT),
      H2 = Jy(D2, { aria: !0 }),
      V2 = Object.keys(H2),
      B2 = { ...e6, onInputKeyDown: F2 };
    if (j2) {
      const e7 = j2.props || {},
        t3 = { ...e7, ...D2 };
      return (
        Object.keys(e7).forEach((n3) => {
          const r2 = e7[n3],
            o3 = D2[n3];
          typeof r2 == "function" &&
            typeof o3 == "function" &&
            (t3[n3] = (...e8) => {
              o3(...e8), r2(...e8);
            });
        }),
        r.isValidElement(j2)
          ? r.cloneElement(j2, { ...t3, ref: sy(j2.ref, I2) })
          : r.createElement(j2, ZO({}, t3, { ref: I2 }))
      );
    }
    return r.createElement(
      kO.Provider,
      { value: B2 },
      r.createElement(
        "div",
        ZO({}, Gy(D2, V2), { ref: I2, className: o2, style: a2, onMouseDown: z2 }),
        r.createElement(xO, { className: Sb(`${n2}-prefix`, R2?.prefix), style: L2?.prefix }, l2),
        r.createElement(JO, { ref: A2 }),
        r.createElement(
          xO,
          {
            className: Sb(`${n2}-suffix`, { [`${n2}-suffix-loading`]: M2 }, R2?.suffix),
            style: L2?.suffix,
          },
          i2,
        ),
        s2 &&
          r.createElement(
            "button",
            {
              type: "button",
              "aria-label": u2,
              className: Sb(`${n2}-clear`, R2?.clear),
              style: L2?.clear,
              onMouseDown: (e7) => {
                e7.preventDefault(), (e7.nativeEvent._select_lazy = !0);
              },
              onKeyDown: (e7) => {
                (e7.key !== "Enter" && e7.key !== " ") || e7.stopPropagation();
              },
              onClick: S2,
            },
            s2,
          ),
        c2,
      ),
    );
  });
function nT() {
  return (
    (nT = Object.assign
      ? Object.assign.bind()
      : function (e6) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = arguments[t2];
            for (var r2 in n2) Object.prototype.hasOwnProperty.call(n2, r2) && (e6[r2] = n2[r2]);
          }
          return e6;
        }),
    nT.apply(this, arguments)
  );
}
const rT = (e6) => e6 === "tags" || e6 === "multiple",
  oT = r.forwardRef((e6, t2) => {
    const {
        id: n2,
        prefixCls: o2,
        className: a2,
        styles: l2,
        classNames: i2,
        showSearch: s2,
        tagRender: u2,
        showScrollBar: c2 = "optional",
        direction: d2,
        omitDomProps: f2,
        displayValues: p2,
        onDisplayValuesChange: h2,
        emptyOptions: m2,
        notFoundContent: g2 = "Not Found",
        onClear: v2,
        maxCount: y2,
        placeholder: b2,
        mode: w2,
        disabled: E2,
        loading: S2,
        getInputElement: x2,
        getRawInputElement: k2,
        open: C2,
        defaultOpen: _2,
        onPopupVisibleChange: P2,
        activeValue: O2,
        onActiveValueChange: T2,
        activeDescendantId: N2,
        searchValue: $2,
        autoClearSearchValue: M2,
        onSearch: R2,
        onSearchSplit: L2,
        tokenSeparators: I2,
        allowClear: A2,
        prefix: F2,
        suffix: z2,
        suffixIcon: j2,
        clearIcon: D2,
        OptionList: H2,
        animation: V2,
        transitionName: B2,
        popupStyle: U2,
        popupClassName: W2,
        popupMatchSelectWidth: q2,
        popupRender: X2,
        popupAlign: K2,
        placement: G2,
        builtinPlacements: Y2,
        getPopupContainer: Q2,
        showAction: J2 = [],
        onFocus: Z2,
        onBlur: ee2,
        onKeyUp: te2,
        onKeyDown: ne2,
        onMouseDown: re2,
        components: oe2,
        ...ae2
      } = e6,
      le2 = rT(w2),
      ie2 = r.useRef(null),
      se2 = r.useRef(null),
      ue2 = r.useRef(null),
      [ce2, de2] = r.useState(!1);
    r.useImperativeHandle(t2, () => {
      var e7, t3;
      return {
        focus: (e7 = ie2.current) == null ? void 0 : e7.focus,
        blur: (t3 = ie2.current) == null ? void 0 : t3.blur,
        scrollTo: (e8) => {
          var t4;
          return (t4 = ue2.current) == null ? void 0 : t4.scrollTo(e8);
        },
        nativeElement: _y(ie2.current),
      };
    });
    const fe2 = (function (e7, t3, n3) {
        return r.useMemo(() => {
          let { root: r2, input: o3 } = e7 || {};
          return n3 && (r2 = n3()), t3 && (o3 = t3()), { root: r2, input: o3 };
        }, [e7, t3, n3]);
      })(oe2, x2, k2),
      pe2 = r.useMemo(() => {
        var e7;
        if (w2 !== "combobox") return $2;
        const t3 = (e7 = p2[0]) == null ? void 0 : e7.value;
        return typeof t3 == "string" || typeof t3 == "number" ? String(t3) : "";
      }, [$2, w2, p2]),
      he2 = (w2 === "combobox" && typeof x2 == "function" && x2()) || null,
      me2 = !g2 && m2,
      [ge2, ve2, ye2, be2] = (function (e7, t3, n3, o3) {
        const [a3, l3] = r.useState(!1);
        r.useEffect(() => {
          l3(!0);
        }, []);
        const [i3, s3] = _v(e7, t3),
          [u3, c3] = r.useState(!1),
          d3 = !!a3 && i3,
          f3 = o3(d3),
          p3 = r.useRef(0),
          h3 = wv((e8) => {
            n3 && f3 !== e8 && n3(e8), s3(e8);
          }),
          m3 = wv((e8, t4 = {}) => {
            const { cancelFun: n4 } = t4;
            p3.current += 1;
            const r2 = p3.current,
              o4 = typeof e8 == "boolean" ? e8 : !f3;
            function a4() {
              r2 !== p3.current || n4?.() || (h3(o4), c3(!1));
            }
            c3(!o4),
              o4
                ? a4()
                : SO(() => {
                    a4();
                  });
          });
        return [d3, f3, m3, u3];
      })(_2 || !1, C2, P2, (e7) => !E2 && !me2 && e7),
      we2 = r.useMemo(
        () =>
          typeof I2 == "function" ||
          (I2 || []).some((e7) =>
            [
              `
`,
              `\r
`,
            ].includes(e7),
          ),
        [I2],
      ),
      Ee2 = r.useMemo(
        () =>
          typeof I2 == "function"
            ? (e7, t3) => {
                const n3 = I2(e7),
                  r2 = Array.isArray(n3) && n3.length === 1 && n3[0] === e7;
                return Array.isArray(n3) && n3.length && !r2
                  ? t3 !== void 0
                    ? n3.slice(0, t3)
                    : n3
                  : null;
              }
            : (e7, t3) =>
                ((e8, t4, n3) => {
                  if (!t4 || !t4.length) return null;
                  let r2 = !1;
                  const o3 = (e9, [t5, ...n4]) => {
                      if (!t5) return [e9];
                      const a4 = e9.split(t5);
                      return (
                        (r2 = r2 || a4.length > 1),
                        a4.reduce((e10, t6) => [...e10, ...o3(t6, n4)], []).filter(Boolean)
                      );
                    },
                    a3 = o3(e8, t4);
                  return r2 ? (n3 !== void 0 ? a3.slice(0, n3) : a3) : null;
                })(e7, I2, t3),
        [I2],
      ),
      Se2 = (e7, t3, n3) => {
        if (le2 && yO(y2) && p2.length >= y2) return;
        let r2 = !0,
          o3 = e7;
        T2?.(null);
        const a3 = yO(y2) ? y2 - p2.length : void 0,
          l3 = n3 ? null : Ee2(e7, a3);
        return (
          w2 !== "combobox" && l3 && ((o3 = ""), L2?.(l3), ye2(!1), (r2 = !1)),
          R2 && pe2 !== o3 && R2(o3, { source: t3 ? "typing" : "effect" }),
          e7 && t3 && r2 && ye2(!0),
          r2
        );
      };
    r.useEffect(() => {
      ge2 || le2 || w2 === "combobox" || Se2("", !1, !1);
    }, [ge2]),
      r.useEffect(() => {
        E2 && (ye2(!1), de2(!1));
      }, [E2, ve2]);
    const [xe2, ke2] = (function (e7 = 250) {
        const t3 = r.useRef(null),
          n3 = r.useRef(null);
        return (
          r.useEffect(
            () => () => {
              window.clearTimeout(n3.current);
            },
            [],
          ),
          [
            () => t3.current,
            function (r2) {
              (r2 || t3.current === null) && (t3.current = r2),
                window.clearTimeout(n3.current),
                (n3.current = window.setTimeout(() => {
                  t3.current = null;
                }, e7));
            },
          ]
        );
      })(),
      Ce2 = r.useRef(!1),
      _e2 = wv((e7) => {
        const t3 = p2.filter((t4) => t4 !== e7);
        h2(t3, { type: "remove", values: [e7] });
      }),
      Pe2 = () => {
        var e7;
        return [_y(ie2.current), (e7 = se2.current) == null ? void 0 : e7.getPopupElement()];
      };
    (function (e7, t3, n3, o3) {
      const a3 = wv((r2) => {
        if (o3) return;
        let a4 = r2.target;
        a4.shadowRoot && r2.composed && (a4 = r2.composedPath()[0] || a4),
          r2._ori_target && (a4 = r2._ori_target),
          t3 && !pO(e7(), a4) && n3(!1);
      });
      r.useEffect(
        () => (
          window.addEventListener("mousedown", a3),
          () => window.removeEventListener("mousedown", a3)
        ),
        [a3],
      );
    })(Pe2, ve2, ye2, !!fe2.root);
    const Oe2 = r.useRef(!1),
      Te2 = () => {
        ve2 && !Oe2.current && ye2(!1, { cancelFun: () => pO(Pe2(), document.activeElement) });
      },
      Ne2 = (e7, ...t3) => {
        var n3;
        const { target: r2 } = e7,
          o3 = (n3 = se2.current) == null ? void 0 : n3.getPopupElement();
        o3?.contains(r2) && ye2 && ye2(!0),
          re2?.(e7, ...t3),
          (Oe2.current = !0),
          SO(() => {
            Oe2.current = !1;
          });
      },
      [, $e2] = r.useState({});
    let Me2;
    fe2.root &&
      (Me2 = (e7) => {
        ye2(e7);
      });
    const Re2 = r.useMemo(
        () => ({
          ...e6,
          notFoundContent: g2,
          open: ve2,
          triggerOpen: ve2,
          rawOpen: ge2,
          id: n2,
          showSearch: s2,
          multiple: le2,
          toggleOpen: ye2,
          showScrollBar: c2,
          styles: l2,
          classNames: i2,
          lockOptions: be2,
        }),
        [e6, g2, ye2, n2, s2, le2, ve2, ge2, c2, l2, i2, be2],
      ),
      Le2 = r.useMemo(() => {
        const e7 = z2 ?? j2;
        return typeof e7 == "function"
          ? e7({ searchValue: pe2, open: ve2, focused: ce2, showSearch: s2, loading: S2 })
          : e7;
      }, [z2, j2, pe2, ve2, ce2, s2, S2]),
      {
        allowClear: Ie2,
        clearIcon: Ae2,
        label: Fe2,
      } = ((e7, t3, n3, o3, a3 = !1, l3, i3) => {
        const s3 = r.useMemo(
          () =>
            typeof n3 == "boolean"
              ? { allowClear: n3 }
              : n3 && typeof n3 == "object"
                ? n3
                : { allowClear: !1 },
          [n3],
        );
        return r.useMemo(() => {
          const e8 =
            !a3 && s3.allowClear !== !1 && (t3.length || l3) && !(i3 === "combobox" && l3 === "");
          return {
            allowClear: e8,
            clearIcon: e8 ? s3.clearIcon || o3 || "\xD7" : null,
            label: e8 ? (s3.label ?? "Clear") : "",
          };
        }, [s3, o3, a3, t3.length, l3, i3]);
      })(0, p2, A2, D2, E2, pe2, w2),
      ze2 = r.createElement(H2, { ref: ue2 }),
      je2 = Sb(o2, a2, {
        [`${o2}-focused`]: ce2,
        [`${o2}-multiple`]: le2,
        [`${o2}-single`]: !le2,
        [`${o2}-allow-clear`]: Ie2,
        [`${o2}-show-arrow`]: Le2 != null,
        [`${o2}-disabled`]: E2,
        [`${o2}-loading`]: S2,
        [`${o2}-open`]: ve2,
        [`${o2}-customize-input`]: he2,
        [`${o2}-show-search`]: s2,
      });
    let De2 = r.createElement(
      tT,
      nT({}, ae2, {
        ref: ie2,
        prefixCls: o2,
        className: je2,
        focused: ce2,
        prefix: F2,
        suffix: Le2,
        clearIcon: Ae2,
        clearLabel: Fe2,
        multiple: le2,
        mode: w2,
        displayValues: p2,
        placeholder: b2,
        searchValue: pe2,
        activeValue: O2,
        onSearch: Se2,
        onSearchSubmit: (e7) => {
          e7 && e7.trim() && R2(e7, { source: "submit" });
        },
        onInputBlur: () => {
          Ce2.current = !1;
        },
        onFocus: (e7) => {
          de2(!0), E2 || (J2.includes("focus") && ye2(!0), Z2?.(e7));
        },
        onBlur: (e7) => {
          de2(!1),
            pe2 &&
              (w2 === "tags"
                ? R2(pe2, { source: "submit" })
                : w2 === "multiple" && R2("", { source: "blur" })),
            Te2(),
            E2 || ee2 == null || ee2(e7);
        },
        onClearMouseDown: () => {
          var e7;
          v2?.(),
            (e7 = ie2.current) == null || e7.focus(),
            h2([], { type: "clear", values: p2 }),
            Se2("", !1, !1);
        },
        onKeyDown: (e7) => {
          var t3;
          const n3 = xe2(),
            { key: r2 } = e7,
            o3 = r2 === "Enter",
            a3 = r2 === " ";
          if (o3 || a3) {
            const t4 = w2 === "combobox";
            ((a3 && !(t4 || s2)) || (o3 && !t4)) && e7.preventDefault(), ve2 || ye2(!0);
          }
          if ((ke2(!!pe2), r2 === "Backspace" && !n3 && le2 && !pe2 && p2.length)) {
            const e8 = [...p2];
            let t4 = null;
            for (let n4 = e8.length - 1; n4 >= 0; n4 -= 1) {
              const r3 = e8[n4];
              if (!r3.disabled) {
                e8.splice(n4, 1), (t4 = r3);
                break;
              }
            }
            t4 && h2(e8, { type: "remove", values: [t4] });
          }
          !ve2 ||
            (o3 && Ce2.current) ||
            a3 ||
            (o3 && (Ce2.current = !0), (t3 = ue2.current) == null || t3.onKeyDown(e7)),
            ne2?.(e7);
        },
        onKeyUp: (e7, ...t3) => {
          var n3;
          ve2 && ((n3 = ue2.current) == null || n3.onKeyUp(e7, ...t3)),
            e7.key === "Enter" && (Ce2.current = !1),
            te2?.(e7, ...t3);
        },
        onSelectorRemove: _e2,
        tokenWithEnter: we2,
        onMouseDown: Ne2,
        components: fe2,
      }),
    );
    return (
      (De2 = r.createElement(
        gO,
        {
          ref: se2,
          disabled: E2,
          prefixCls: o2,
          visible: ve2,
          popupElement: ze2,
          animation: V2,
          transitionName: B2,
          popupStyle: U2,
          popupClassName: W2,
          direction: d2,
          popupMatchSelectWidth: q2,
          popupRender: X2,
          popupAlign: K2,
          placement: G2,
          builtinPlacements: Y2,
          getPopupContainer: Q2,
          empty: m2,
          onPopupVisibleChange: Me2,
          onPopupMouseEnter: function () {
            $e2({});
          },
          onPopupMouseDown: Ne2,
          onPopupBlur: Te2,
        },
        De2,
      )),
      r.createElement(
        dO.Provider,
        { value: Re2 },
        r.createElement(EO, { visible: ce2 && !ve2, values: p2 }),
        De2,
      )
    );
  }),
  aT = () => null;
aT.isSelectOptGroup = !0;
const lT = () => null;
function iT() {
  return (
    (iT = Object.assign
      ? Object.assign.bind()
      : function (e6) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = arguments[t2];
            for (var r2 in n2) Object.prototype.hasOwnProperty.call(n2, r2) && (e6[r2] = n2[r2]);
          }
          return e6;
        }),
    iT.apply(this, arguments)
  );
}
lT.isSelectOption = !0;
const sT = r.forwardRef(
  (
    {
      height: e6,
      offsetY: t2,
      offsetX: n2,
      children: o2,
      prefixCls: a2,
      onInnerResize: l2,
      innerProps: i2,
      rtl: s2,
      extra: u2,
    },
    c2,
  ) => {
    let d2 = {},
      f2 = { display: "flex", flexDirection: "column" };
    return (
      t2 !== void 0 &&
        ((d2 = { height: e6, position: "relative", overflow: "hidden" }),
        (f2 = {
          ...f2,
          transform: `translateY(${t2}px)`,
          [s2 ? "marginRight" : "marginLeft"]: -n2 || 0,
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
        })),
      r.createElement(
        "div",
        { style: d2 },
        r.createElement(
          wb,
          {
            onResize: ({ offsetHeight: e7 }) => {
              e7 && l2 && l2();
            },
          },
          r.createElement(
            "div",
            iT({ style: f2, className: Sb({ [`${a2}-holder-inner`]: a2 }), ref: c2 }, i2),
            o2,
            u2,
          ),
        ),
      )
    );
  },
);
function uT({ children: e6, setRef: t2 }) {
  const n2 = r.useCallback(
    (e7) => {
      t2(e7);
    },
    [t2],
  );
  return r.cloneElement(e6, { ref: n2 });
}
function cT(e6, t2, n2) {
  const [o2, a2] = r.useState(e6),
    [l2, i2] = r.useState(null);
  return (
    r.useEffect(() => {
      const r2 = (function (e7, t3, n3) {
        const r3 = e7.length,
          o3 = t3.length;
        let a3, l3;
        if (r3 === 0 && o3 === 0) return null;
        r3 < o3 ? ((a3 = e7), (l3 = t3)) : ((a3 = t3), (l3 = e7));
        const i3 = { __EMPTY_ITEM__: !0 };
        function s2(e8) {
          return e8 !== void 0 ? n3(e8) : i3;
        }
        let u2 = null,
          c2 = Math.abs(r3 - o3) !== 1;
        for (let d2 = 0; d2 < l3.length; d2 += 1) {
          const e8 = s2(a3[d2]);
          if (e8 !== s2(l3[d2])) {
            (u2 = d2), (c2 = c2 || e8 !== s2(l3[d2 + 1]));
            break;
          }
        }
        return u2 === null ? null : { index: u2, multiple: c2 };
      })(o2 || [], e6 || [], t2);
      r2?.index !== void 0 && (n2?.(r2.index), i2(e6[r2.index])), a2(e6);
    }, [e6]),
    [l2]
  );
}
sT.displayName = "Filler";
const dT = typeof navigator == "object" && /Firefox/i.test(navigator.userAgent),
  fT = (e6, t2, n2, o2) => {
    const a2 = r.useRef(!1),
      l2 = r.useRef(null),
      i2 = r.useRef({ top: e6, bottom: t2, left: n2, right: o2 });
    return (
      (i2.current.top = e6),
      (i2.current.bottom = t2),
      (i2.current.left = n2),
      (i2.current.right = o2),
      (e7, t3, n3 = !1) => {
        const r2 = e7
          ? (t3 < 0 && i2.current.left) || (t3 > 0 && i2.current.right)
          : (t3 < 0 && i2.current.top) || (t3 > 0 && i2.current.bottom);
        return (
          n3 && r2
            ? (clearTimeout(l2.current), (a2.current = !1))
            : (r2 && !a2.current) ||
              (clearTimeout(l2.current),
              (a2.current = !0),
              (l2.current = setTimeout(() => {
                a2.current = !1;
              }, 50))),
          !a2.current && r2
        );
      }
    );
  };
function pT(e6, t2, n2, o2, a2, l2, i2) {
  const s2 = r.useRef(0),
    u2 = r.useRef(null),
    c2 = r.useRef(null),
    d2 = r.useRef(!1),
    f2 = fT(t2, n2, o2, a2),
    p2 = r.useRef(null),
    h2 = r.useRef(null);
  return [
    function (t3) {
      if (!e6) return;
      Mv.cancel(h2.current),
        (h2.current = Mv(() => {
          p2.current = null;
        }, 2));
      const { deltaX: n3, deltaY: r2, shiftKey: o3 } = t3;
      let a3 = n3,
        m2 = r2;
      (p2.current === "sx" || (!p2.current && o3 && r2 && !n3)) &&
        ((a3 = r2), (m2 = 0), (p2.current = "sx"));
      const g2 = Math.abs(a3),
        v2 = Math.abs(m2);
      p2.current === null && (p2.current = l2 && g2 > v2 ? "x" : "y"),
        p2.current === "y"
          ? (function (e7, t4) {
              if ((Mv.cancel(u2.current), f2(!1, t4))) return;
              const n4 = e7;
              n4._virtualHandled ||
                ((n4._virtualHandled = !0),
                (s2.current += t4),
                (c2.current = t4),
                dT || n4.preventDefault(),
                (u2.current = Mv(() => {
                  const e8 = d2.current ? 10 : 1;
                  i2(s2.current * e8, !1), (s2.current = 0);
                })));
            })(t3, m2)
          : (function (e7, t4) {
              i2(t4, !0), dT || e7.preventDefault();
            })(t3, a3);
    },
    function (t3) {
      e6 && (d2.current = t3.detail === c2.current);
    },
  ];
}
class hT {
  constructor() {
    n(this, "maps"),
      n(this, "id", 0),
      n(this, "diffRecords", new Map()),
      (this.maps = Object.create(null));
  }
  set(e6, t2) {
    this.diffRecords.set(e6, this.maps[e6]), (this.maps[e6] = t2), (this.id += 1);
  }
  get(e6) {
    return this.maps[e6];
  }
  resetRecord() {
    this.diffRecords.clear();
  }
  getRecord() {
    return this.diffRecords;
  }
}
function mT(e6) {
  const t2 = parseFloat(e6);
  return isNaN(t2) ? 0 : t2;
}
const gT = 14 / 15;
function vT(e6) {
  return Math.floor(e6 ** 0.5);
}
function yT(e6, t2) {
  return (
    ("touches" in e6 ? e6.touches[0] : e6)[t2 ? "pageX" : "pageY"] -
    window[t2 ? "scrollX" : "scrollY"]
  );
}
function bT(e6, t2, n2, o2, a2, l2, i2, s2, u2) {
  const c2 = r.useRef(void 0),
    [d2, f2] = r.useState(null);
  return (
    xv(() => {
      if (d2 && d2.times < 10) {
        if (!e6.current) return void f2((e7) => ({ ...e7 }));
        i2();
        const { targetAlign: r2, originAlign: u3, offset: c3 } = d2,
          p2 = d2.index >= 0 ? d2.index : t2.findIndex((e7) => a2(e7) === d2.key),
          h2 = r2 || u3,
          m2 = (function (e7, t3) {
            const n3 = typeof e7 == "function" ? e7(t3) : e7;
            return Number.isFinite(n3) ? n3 : 0;
          })(c3, { getSize: l2, align: h2 }),
          g2 = e6.current.clientHeight;
        let v2 = p2 < 0,
          y2 = r2,
          b2 = null;
        if (g2 && p2 >= 0) {
          let r3 = 0,
            l3 = 0,
            i3 = 0;
          const u4 = Math.min(t2.length - 1, p2);
          for (let e7 = 0; e7 <= u4; e7 += 1) {
            const s3 = a2(t2[e7]);
            l3 = r3;
            const u5 = n2.get(s3);
            (i3 = l3 + (u5 === void 0 ? o2 : u5)), (r3 = i3);
          }
          let c4 = h2 === "top" ? m2 : g2 - m2;
          for (let e7 = u4; e7 >= 0; e7 -= 1) {
            const r4 = a2(t2[e7]),
              o3 = n2.get(r4);
            if (o3 === void 0) {
              v2 = !0;
              break;
            }
            if (((c4 -= o3), c4 <= 0)) break;
          }
          switch (h2) {
            case "top":
              b2 = l3 - m2;
              break;
            case "bottom":
              b2 = i3 - g2 + m2;
              break;
            default: {
              const { scrollTop: t3 } = e6.current;
              l3 < t3 ? (y2 = "top") : i3 > t3 + g2 && (y2 = "bottom");
            }
          }
          b2 !== null && s2(b2), b2 !== d2.lastTop && (v2 = !0);
        }
        v2 && f2((e7) => ({ ...e7, times: e7.times + 1, index: p2, targetAlign: y2, lastTop: b2 }));
      }
    }, [d2, e6.current]),
    (e7) => {
      if (e7 != null) {
        if ((Mv.cancel(c2.current), typeof e7 == "number")) s2(e7);
        else if (e7 && typeof e7 == "object") {
          let n3, r2;
          const { align: o3 } = e7;
          "index" in e7
            ? ({ index: n3 } = e7)
            : ((r2 = e7.key), (n3 = t2.findIndex((e8) => a2(e8) === r2)));
          const { offset: l3 = 0 } = e7;
          f2({ times: 0, index: n3, key: r2, offset: l3, originAlign: o3 });
        }
      } else u2();
    }
  );
}
function wT(e6, t2, n2) {
  if (t2 <= 0 || n2 <= 0) return 0;
  const r2 = Math.max(Math.min(e6, n2), 0) / n2;
  let o2 = Math.ceil(r2 * t2);
  return (o2 = Math.max(o2, 0)), (o2 = Math.min(o2, t2)), o2;
}
const ET = r.forwardRef((e6, t2) => {
  const {
      prefixCls: n2,
      rtl: o2,
      scrollOffset: a2,
      scrollRange: l2,
      onStartMove: i2,
      onStopMove: s2,
      onScroll: u2,
      horizontal: c2,
      spinSize: d2,
      containerSize: f2,
      style: p2,
      thumbStyle: h2,
      showScrollBar: m2,
    } = e6,
    [g2, v2] = r.useState(!1),
    [y2, b2] = r.useState(null),
    [w2, E2] = r.useState(null),
    S2 = !o2,
    x2 = r.useRef(null),
    k2 = r.useRef(null),
    [C2, _2] = r.useState(m2),
    P2 = r.useRef(void 0),
    O2 = () => {
      m2 !== !0 &&
        m2 !== !1 &&
        (clearTimeout(P2.current),
        _2(!0),
        (P2.current = setTimeout(() => {
          _2(!1);
        }, 3e3)));
    },
    T2 = l2 - f2 || 0,
    N2 = f2 - d2 || 0,
    $2 = r.useMemo(() => (a2 === 0 || T2 === 0 ? 0 : (a2 / T2) * N2), [a2, T2, N2]),
    M2 = r.useRef({ top: $2, dragging: g2, pageY: y2, startTop: w2 });
  M2.current = { top: $2, dragging: g2, pageY: y2, startTop: w2 };
  const R2 = wv((e7) => {
    v2(!0), b2(yT(e7, c2)), E2(M2.current.top), i2(), e7.stopPropagation(), e7.preventDefault();
  });
  r.useEffect(() => {
    const e7 = (e8) => {
        e8.preventDefault();
      },
      t3 = x2.current,
      n3 = k2.current;
    return (
      t3.addEventListener("touchstart", e7, { passive: !1 }),
      n3.addEventListener("touchstart", R2, { passive: !1 }),
      () => {
        t3.removeEventListener("touchstart", e7), n3.removeEventListener("touchstart", R2);
      }
    );
  }, [R2]);
  const L2 = r.useRef(void 0);
  L2.current = T2;
  const I2 = r.useRef(void 0);
  (I2.current = N2),
    r.useEffect(() => {
      if (g2) {
        let e7;
        const t3 = (t4) => {
            const { dragging: n4, pageY: r2, startTop: o3 } = M2.current;
            Mv.cancel(e7);
            const a3 = x2.current.getBoundingClientRect(),
              l3 = f2 / (c2 ? a3.width : a3.height);
            if (n4) {
              const n5 = (yT(t4, c2) - r2) * l3;
              let a4 = o3;
              !S2 && c2 ? (a4 -= n5) : (a4 += n5);
              const i3 = wT(a4, L2.current, I2.current);
              e7 = Mv(() => {
                u2(i3, c2);
              });
            }
          },
          n3 = () => {
            v2(!1), s2();
          };
        return (
          window.addEventListener("mousemove", t3, { passive: !0 }),
          window.addEventListener("touchmove", t3, { passive: !0 }),
          window.addEventListener("mouseup", n3, { passive: !0 }),
          window.addEventListener("touchend", n3, { passive: !0 }),
          () => {
            window.removeEventListener("mousemove", t3),
              window.removeEventListener("touchmove", t3),
              window.removeEventListener("mouseup", n3),
              window.removeEventListener("touchend", n3),
              Mv.cancel(e7);
          }
        );
      }
    }, [g2]),
    r.useEffect(
      () => (
        O2(),
        () => {
          clearTimeout(P2.current);
        }
      ),
      [a2],
    ),
    r.useImperativeHandle(t2, () => ({ delayHidden: O2 }));
  const A2 = `${n2}-scrollbar`,
    F2 = { position: "absolute", visibility: C2 ? null : "hidden" },
    z2 = {
      position: "absolute",
      borderRadius: 99,
      background: "var(--rc-virtual-list-scrollbar-bg, rgba(0, 0, 0, 0.5))",
      cursor: "pointer",
      userSelect: "none",
    };
  return (
    c2
      ? (Object.assign(F2, { height: 8, left: 0, right: 0, bottom: 0 }),
        Object.assign(z2, { height: "100%", width: d2, [S2 ? "left" : "right"]: $2 }))
      : (Object.assign(F2, { width: 8, top: 0, bottom: 0, [S2 ? "right" : "left"]: 0 }),
        Object.assign(z2, { width: "100%", height: d2, top: $2 })),
    r.createElement(
      "div",
      {
        ref: x2,
        className: Sb(A2, {
          [`${A2}-horizontal`]: c2,
          [`${A2}-vertical`]: !c2,
          [`${A2}-visible`]: C2,
        }),
        style: { ...F2, ...p2 },
        onMouseDown: (e7) => {
          var t3, n3;
          e7.stopPropagation(),
            e7.preventDefault(),
            e7.button !== 0 ||
              ((t3 = e7.target) && (n3 = k2.current) != null && n3.contains(t3)) ||
              ((e8) => {
                const t4 = x2.current;
                if (!t4) return;
                const n4 = t4.getBoundingClientRect(),
                  r2 = yT(e8, c2);
                let o3;
                if (Number.isFinite(r2)) {
                  if (c2) {
                    const e9 = S2 ? n4.left : n4.right;
                    if (!Number.isFinite(e9)) return;
                    o3 = (S2 ? r2 - e9 : e9 - r2) - d2 / 2;
                  } else {
                    if (!Number.isFinite(n4.top)) return;
                    o3 = r2 - n4.top - d2 / 2;
                  }
                  u2(wT(o3, T2, N2), c2);
                }
              })(e7);
        },
        onMouseMove: O2,
      },
      r.createElement("div", {
        ref: k2,
        className: Sb(`${A2}-thumb`, { [`${A2}-thumb-moving`]: g2 }),
        style: { ...z2, ...h2 },
        onMouseDown: R2,
      }),
    )
  );
});
function ST(e6 = 0, t2 = 0) {
  let n2 = (e6 / t2) * e6;
  return isNaN(n2) && (n2 = 0), (n2 = Math.max(n2, 20)), Math.floor(n2);
}
function xT() {
  return (
    (xT = Object.assign
      ? Object.assign.bind()
      : function (e6) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = arguments[t2];
            for (var r2 in n2) Object.prototype.hasOwnProperty.call(n2, r2) && (e6[r2] = n2[r2]);
          }
          return e6;
        }),
    xT.apply(this, arguments)
  );
}
const kT = [],
  CT = { overflowY: "auto", overflowAnchor: "none" };
function _T(e6, t2) {
  const {
      prefixCls: n2 = "rc-virtual-list",
      className: a2,
      height: l2,
      itemHeight: i2,
      fullHeight: s2 = !0,
      style: u2,
      data: c2,
      children: d2,
      itemKey: f2,
      virtual: p2,
      direction: h2,
      scrollWidth: m2,
      component: g2 = "div",
      onScroll: v2,
      onVirtualScroll: y2,
      onVisibleChange: b2,
      innerProps: w2,
      extraRender: E2,
      styles: S2,
      showScrollBar: x2 = "optional",
      ...k2
    } = e6,
    C2 = r.useCallback((e7) => (typeof f2 == "function" ? f2(e7) : e7?.[f2]), [f2]),
    [_2, P2, O2, T2] = (function (e7, t3, n3) {
      const [o2, a3] = r.useState(0),
        l3 = r.useRef(new Map()),
        i3 = r.useRef(new hT()),
        s3 = r.useRef(0);
      function u3() {
        s3.current += 1;
      }
      function c3(e8 = !1) {
        u3();
        const t4 = () => {
          let e9 = !1;
          l3.current.forEach((t5, n4) => {
            if (t5 && t5.offsetParent) {
              const { offsetHeight: r2 } = t5,
                { marginTop: o3, marginBottom: a4 } = getComputedStyle(t5),
                l4 = r2 + mT(o3) + mT(a4);
              i3.current.get(n4) !== l4 && (i3.current.set(n4, l4), (e9 = !0));
            }
          }),
            e9 && a3((e10) => e10 + 1);
        };
        if (e8) t4();
        else {
          s3.current += 1;
          const e9 = s3.current;
          Promise.resolve().then(() => {
            e9 === s3.current && t4();
          });
        }
      }
      return (
        r.useEffect(() => u3, []),
        [
          function (r2, o3) {
            const a4 = e7(r2),
              i4 = l3.current.get(a4);
            o3 ? (l3.current.set(a4, o3), c3()) : l3.current.delete(a4),
              !i4 != !o3 && (o3 ? t3?.(r2) : n3?.(r2));
          },
          c3,
          i3.current,
          o2,
        ]
      );
    })(C2, null, null),
    N2 = !(p2 === !1 || !l2 || !i2),
    $2 = r.useMemo(() => Object.values(O2.maps).reduce((e7, t3) => e7 + t3, 0), [O2.id, O2.maps]),
    M2 = N2 && c2 && (Math.max(i2 * c2.length, $2) > l2 || !!m2),
    R2 = h2 === "rtl",
    L2 = Sb(n2, { [`${n2}-rtl`]: R2 }, a2),
    I2 = c2 || kT,
    A2 = r.useRef(null),
    F2 = r.useRef(null),
    z2 = r.useRef(null),
    [j2, D2] = r.useState(0),
    [H2, V2] = r.useState(0),
    [B2, U2] = r.useState(!1),
    W2 = () => {
      U2(!0);
    },
    q2 = () => {
      U2(!1);
    },
    X2 = { getKey: C2 };
  function K2(e7) {
    D2((t3) => {
      let n3;
      n3 = typeof e7 == "function" ? e7(t3) : e7;
      const r2 = (function (e8) {
        let t4 = e8;
        return (
          Number.isNaN(ue2.current) || (t4 = Math.min(t4, ue2.current)), (t4 = Math.max(t4, 0)), t4
        );
      })(n3);
      return (A2.current.scrollTop = r2), r2;
    });
  }
  const G2 = r.useRef({ start: 0, end: I2.length }),
    Y2 = r.useRef(void 0),
    [Q2] = cT(I2, C2);
  Y2.current = Q2;
  const {
    scrollHeight: J2,
    start: Z2,
    end: ee2,
    offset: te2,
  } = r.useMemo(() => {
    var e7;
    if (!N2) return { scrollHeight: void 0, start: 0, end: I2.length - 1, offset: void 0 };
    if (!M2)
      return {
        scrollHeight: ((e7 = F2.current) == null ? void 0 : e7.offsetHeight) || 0,
        start: 0,
        end: I2.length - 1,
        offset: void 0,
      };
    let t3,
      n3,
      r2,
      o2 = 0;
    const a3 = I2.length;
    for (let s3 = 0; s3 < a3; s3 += 1) {
      const e8 = I2[s3],
        a4 = C2(e8),
        u3 = O2.get(a4),
        c3 = o2 + (u3 === void 0 ? i2 : u3);
      c3 >= j2 && t3 === void 0 && ((t3 = s3), (n3 = o2)),
        c3 > j2 + l2 && r2 === void 0 && (r2 = s3),
        (o2 = c3);
    }
    return (
      t3 === void 0 && ((t3 = 0), (n3 = 0), (r2 = Math.ceil(l2 / i2))),
      r2 === void 0 && (r2 = I2.length - 1),
      (r2 = Math.min(r2 + 1, I2.length - 1)),
      { scrollHeight: o2, start: t3, end: r2, offset: n3 }
    );
  }, [M2, N2, j2, I2, T2, l2]);
  (G2.current.start = Z2),
    (G2.current.end = ee2),
    r.useLayoutEffect(() => {
      const e7 = O2.getRecord();
      if (e7.size === 1) {
        const t3 = Array.from(e7.keys())[0],
          n3 = e7.get(t3),
          r2 = I2[Z2];
        if (r2 && n3 === void 0 && C2(r2) === t3) {
          const e8 = O2.get(t3) - i2;
          K2((t4) => t4 + e8);
        }
      }
      O2.resetRecord();
    }, [J2]);
  const [ne2, re2] = r.useState({ width: 0, height: l2 }),
    oe2 = r.useRef(null),
    ae2 = r.useRef(null),
    le2 = r.useMemo(() => ST(ne2.width, m2), [ne2.width, m2]),
    ie2 = r.useMemo(() => ST(ne2.height, J2), [ne2.height, J2]),
    se2 = J2 - l2,
    ue2 = r.useRef(se2);
  ue2.current = se2;
  const ce2 = j2 <= 0,
    de2 = j2 >= se2,
    fe2 = H2 <= 0,
    pe2 = H2 >= m2,
    he2 = fT(ce2, de2, fe2, pe2),
    me2 = () => ({ x: R2 ? -H2 : H2, y: j2 }),
    ge2 = r.useRef(me2()),
    ve2 = wv((e7) => {
      if (y2) {
        const t3 = { ...me2(), ...e7 };
        (ge2.current.x === t3.x && ge2.current.y === t3.y) || (y2(t3), (ge2.current = t3));
      }
    });
  function ye2(e7, t3) {
    const n3 = e7;
    t3
      ? (o.flushSync(() => {
          V2(n3);
        }),
        ve2())
      : K2(n3);
  }
  const be2 = (e7) => {
      let t3 = e7;
      const n3 = m2 ? m2 - ne2.width : 0;
      return (t3 = Math.max(t3, 0)), (t3 = Math.min(t3, n3)), t3;
    },
    we2 = wv((e7, t3) => {
      t3
        ? (o.flushSync(() => {
            V2((t4) => be2(t4 + (R2 ? -e7 : e7)));
          }),
          ve2())
        : K2((t4) => t4 + e7);
    }),
    [Ee2, Se2] = pT(N2, ce2, de2, fe2, pe2, !!m2, we2);
  (function (e7, t3, n3) {
    const o2 = r.useRef(!1),
      a3 = r.useRef(0),
      l3 = r.useRef(0),
      i3 = r.useRef(null),
      s3 = r.useRef(null);
    let u3;
    const c3 = (e8) => {
        if (o2.current) {
          const t4 = Math.ceil(e8.touches[0].pageX),
            r2 = Math.ceil(e8.touches[0].pageY);
          let o3 = a3.current - t4,
            i4 = l3.current - r2;
          const u4 = Math.abs(o3) > Math.abs(i4);
          u4 ? (a3.current = t4) : (l3.current = r2);
          const c4 = n3(u4, u4 ? o3 : i4, !1, e8);
          c4 && e8.preventDefault(),
            clearInterval(s3.current),
            c4 &&
              (s3.current = setInterval(() => {
                u4 ? (o3 *= gT) : (i4 *= gT);
                const e9 = Math.floor(u4 ? o3 : i4);
                (!n3(u4, e9, !0) || Math.abs(e9) <= 0.1) && clearInterval(s3.current);
              }, 16));
        }
      },
      d3 = () => {
        (o2.current = !1), u3();
      },
      f3 = (e8) => {
        u3(),
          e8.touches.length !== 1 ||
            o2.current ||
            ((o2.current = !0),
            (a3.current = Math.ceil(e8.touches[0].pageX)),
            (l3.current = Math.ceil(e8.touches[0].pageY)),
            (i3.current = e8.target),
            i3.current.addEventListener("touchmove", c3, { passive: !1 }),
            i3.current.addEventListener("touchend", d3, { passive: !0 }));
      };
    (u3 = () => {
      i3.current &&
        (i3.current.removeEventListener("touchmove", c3),
        i3.current.removeEventListener("touchend", d3));
    }),
      xv(
        () => (
          e7 && t3.current.addEventListener("touchstart", f3, { passive: !0 }),
          () => {
            var e8;
            (e8 = t3.current) == null || e8.removeEventListener("touchstart", f3),
              u3(),
              clearInterval(s3.current);
          }
        ),
        [e7],
      );
  })(N2, A2, (e7, t3, n3, r2) => {
    const o2 = r2;
    return (
      !he2(e7, t3, n3) &&
      (!o2 || !o2._virtualHandled) &&
      (o2 && (o2._virtualHandled = !0),
      Ee2({ preventDefault() {}, deltaX: e7 ? t3 : 0, deltaY: e7 ? 0 : t3 }),
      !0)
    );
  }),
    (function (e7, t3, n3) {
      r.useEffect(() => {
        const r2 = t3.current;
        if (e7 && r2) {
          let e8,
            t4,
            o2 = !1;
          const a3 = () => {
              Mv.cancel(e8);
            },
            l3 = () => {
              a3(),
                (e8 = Mv(() => {
                  n3(t4), l3();
                }));
            },
            i3 = () => {
              (o2 = !1), a3();
            },
            s3 = (e9) => {
              if (
                (function (e10) {
                  let t6 = e10;
                  for (; t6; ) {
                    if (t6.draggable) return !0;
                    t6 = t6.parentElement;
                  }
                  return !1;
                })(e9.target) ||
                e9.button !== 0
              )
                return;
              const t5 = e9;
              t5._virtualHandled || ((t5._virtualHandled = !0), (o2 = !0));
            },
            u3 = (e9) => {
              if (o2) {
                const n4 = yT(e9, !1),
                  { top: o3, bottom: i4 } = r2.getBoundingClientRect();
                n4 <= o3
                  ? ((t4 = -vT(o3 - n4)), l3())
                  : n4 >= i4
                    ? ((t4 = vT(n4 - i4)), l3())
                    : a3();
              }
            };
          return (
            r2.addEventListener("mousedown", s3),
            r2.ownerDocument.addEventListener("mouseup", i3),
            r2.ownerDocument.addEventListener("mousemove", u3),
            r2.ownerDocument.addEventListener("dragend", i3),
            () => {
              r2.removeEventListener("mousedown", s3),
                r2.ownerDocument.removeEventListener("mouseup", i3),
                r2.ownerDocument.removeEventListener("mousemove", u3),
                r2.ownerDocument.removeEventListener("dragend", i3),
                a3();
            }
          );
        }
      }, [e7]);
    })(M2, A2, (e7) => {
      K2((t3) => t3 + e7);
    }),
    xv(() => {
      function e7(e8) {
        const t4 = ce2 && e8.detail < 0,
          n3 = de2 && e8.detail > 0;
        !N2 || t4 || n3 || e8.preventDefault();
      }
      const t3 = A2.current;
      return (
        t3.addEventListener("wheel", Ee2, { passive: !1 }),
        t3.addEventListener("DOMMouseScroll", Se2, { passive: !0 }),
        t3.addEventListener("MozMousePixelScroll", e7, { passive: !1 }),
        () => {
          t3.removeEventListener("wheel", Ee2),
            t3.removeEventListener("DOMMouseScroll", Se2),
            t3.removeEventListener("MozMousePixelScroll", e7);
        }
      );
    }, [N2, ce2, de2]),
    xv(() => {
      if (m2) {
        const e7 = be2(H2);
        V2(e7), ve2({ x: e7 });
      }
    }, [ne2.width, m2]);
  const xe2 = () => {
      var e7, t3;
      (e7 = oe2.current) == null || e7.delayHidden(),
        (t3 = ae2.current) == null || t3.delayHidden();
    },
    ke2 = (function (e7, t3, n3, o2) {
      const [a3, l3] = r.useMemo(() => [new Map(), []], [e7, n3.id, o2]);
      return (r2, i3 = r2) => {
        let s3 = a3.get(r2),
          u3 = a3.get(i3);
        if (s3 === void 0 || u3 === void 0) {
          const c3 = e7.length;
          for (let d3 = l3.length; d3 < c3; d3 += 1) {
            const c4 = e7[d3],
              f3 = t3(c4);
            a3.set(f3, d3);
            const p3 = n3.get(f3) ?? o2;
            if (
              ((l3[d3] = (l3[d3 - 1] || 0) + p3),
              f3 === r2 && (s3 = d3),
              f3 === i3 && (u3 = d3),
              s3 !== void 0 && u3 !== void 0)
            )
              break;
          }
        }
        return { top: l3[s3 - 1] || 0, bottom: l3[u3] };
      };
    })(I2, C2, O2, i2),
    Ce2 = bT(A2, I2, O2, i2, C2, ke2, () => P2(!0), K2, xe2);
  r.useImperativeHandle(t2, () => ({
    nativeElement: z2.current,
    getScrollInfo: me2,
    scrollTo: (e7) => {
      var t3;
      (t3 = e7) && typeof t3 == "object" && ("left" in t3 || "top" in t3)
        ? (e7.left !== void 0 && V2(be2(e7.left)), Ce2(e7.top))
        : Ce2(e7);
    },
  })),
    xv(() => {
      if (b2) {
        const e7 = I2.slice(Z2, ee2 + 1);
        b2(e7, I2);
      }
    }, [Z2, ee2, I2]);
  const _e2 = E2?.({
      start: Z2,
      end: ee2,
      virtual: M2,
      offsetX: H2,
      scrollTop: j2,
      offsetY: te2,
      rtl: R2,
      getSize: ke2,
    }),
    Pe2 = (function (e7, t3, n3, o2, a3, l3, i3, { getKey: s3 }) {
      return e7.slice(t3, n3 + 1).map((e8, n4) => {
        const u3 = i3(e8, t3 + n4, { style: { width: o2 }, offsetX: a3 }),
          c3 = s3(e8);
        return r.createElement(uT, { key: c3, setRef: (t4) => l3(e8, t4) }, u3);
      });
    })(I2, Z2, ee2, m2, H2, _2, d2, X2);
  let Oe2 = null;
  l2 &&
    ((Oe2 = { [s2 ? "height" : "maxHeight"]: l2, ...CT }),
    N2 &&
      ((Oe2.overflowY = "hidden"),
      m2 && (Oe2.overflowX = "hidden"),
      B2 && (Oe2.pointerEvents = "none")));
  const Te2 = {};
  return (
    R2 && (Te2.dir = "rtl"),
    r.createElement(
      "div",
      xT({ ref: z2, style: { ...u2, position: "relative" }, className: L2 }, Te2, k2),
      r.createElement(
        wb,
        {
          onResize: (e7) => {
            re2({ width: e7.offsetWidth, height: e7.offsetHeight });
          },
        },
        r.createElement(
          g2,
          {
            className: `${n2}-holder`,
            style: Oe2,
            ref: A2,
            onScroll: function (e7) {
              const { scrollTop: t3 } = e7.currentTarget;
              t3 !== j2 && K2(t3), v2?.(e7), ve2();
            },
            onMouseEnter: xe2,
          },
          r.createElement(
            sT,
            {
              prefixCls: n2,
              height: J2,
              offsetX: H2,
              offsetY: te2,
              scrollWidth: m2,
              onInnerResize: P2,
              ref: F2,
              innerProps: w2,
              rtl: R2,
              extra: _e2,
            },
            Pe2,
          ),
        ),
      ),
      M2 &&
        J2 > l2 &&
        r.createElement(ET, {
          ref: oe2,
          prefixCls: n2,
          scrollOffset: j2,
          scrollRange: J2,
          rtl: R2,
          onScroll: ye2,
          onStartMove: W2,
          onStopMove: q2,
          spinSize: ie2,
          containerSize: ne2.height,
          style: S2?.verticalScrollBar,
          thumbStyle: S2?.verticalScrollBarThumb,
          showScrollBar: x2,
        }),
      M2 &&
        m2 > ne2.width &&
        r.createElement(ET, {
          ref: ae2,
          prefixCls: n2,
          scrollOffset: H2,
          scrollRange: m2,
          rtl: R2,
          onScroll: ye2,
          onStartMove: W2,
          onStopMove: q2,
          spinSize: le2,
          containerSize: ne2.width,
          horizontal: !0,
          style: S2?.horizontalScrollBar,
          thumbStyle: S2?.horizontalScrollBarThumb,
          showScrollBar: x2,
        }),
    )
  );
}
const PT = r.forwardRef(_T);
PT.displayName = "List";
function OT() {
  return (
    (OT = Object.assign
      ? Object.assign.bind()
      : function (e6) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = arguments[t2];
            for (var r2 in n2) Object.prototype.hasOwnProperty.call(n2, r2) && (e6[r2] = n2[r2]);
          }
          return e6;
        }),
    OT.apply(this, arguments)
  );
}
function TT(e6) {
  return typeof e6 == "string" || typeof e6 == "number";
}
r.forwardRef((e6, t2) => _T({ ...e6, virtual: !1 }, t2)).displayName = "List";
const NT = (e6, t2) => {
    var n2, o2;
    const {
        prefixCls: a2,
        id: l2,
        open: i2,
        multiple: s2,
        mode: u2,
        searchValue: c2,
        toggleOpen: d2,
        notFoundContent: f2,
        onPopupScroll: p2,
        showScrollBar: h2,
        lockOptions: m2,
      } = fO(),
      {
        maxCount: g2,
        flattenOptions: v2,
        onActiveValue: y2,
        defaultActiveFirstOption: b2,
        onSelect: w2,
        menuItemSelectedIcon: E2,
        rawValues: S2,
        fieldNames: x2,
        virtual: k2,
        direction: C2,
        listHeight: _2,
        listItemHeight: P2,
        optionRender: O2,
        classNames: T2,
        styles: N2,
      } = r.useContext(OO),
      $2 = `${a2}-item`,
      M2 = Fv(
        () => v2,
        [i2, m2],
        (e7, t3) => t3[0] && !t3[1],
      ),
      R2 = r.useRef(null),
      L2 = r.useMemo(() => s2 && yO(g2) && S2?.size >= g2, [s2, g2, S2?.size]),
      I2 = (e7) => {
        e7.preventDefault();
      },
      A2 = (e7) => {
        var t3;
        (t3 = R2.current) == null || t3.scrollTo(typeof e7 == "number" ? { index: e7 } : e7);
      },
      F2 = r.useCallback(
        (e7) => u2 !== "combobox" && S2.has(e7),
        [u2, [...S2].toString(), S2.size],
      ),
      z2 = (e7, t3 = 1) => {
        const n3 = M2.length;
        for (let r2 = 0; r2 < n3; r2 += 1) {
          const o3 = (e7 + r2 * t3 + n3) % n3,
            { group: a3, data: l3 } = M2[o3] || {};
          if (!a3 && !l3?.disabled && (F2(l3.value) || !L2)) return o3;
        }
        return -1;
      },
      [j2, D2] = r.useState(() => z2(0)),
      H2 = (e7, t3 = !1) => {
        D2(e7);
        const n3 = { source: t3 ? "keyboard" : "mouse" },
          r2 = M2[e7];
        r2 ? y2(r2.value, e7, n3) : y2(null, -1, n3);
      };
    r.useEffect(() => {
      H2(b2 !== !1 ? z2(0) : -1);
    }, [M2.length, c2]);
    const V2 = r.useCallback(
      (e7) => (u2 === "combobox" ? String(e7).toLowerCase() === c2.toLowerCase() : S2.has(e7)),
      [u2, c2, [...S2].toString(), S2.size],
    );
    r.useEffect(() => {
      var e7;
      let t3;
      if (!s2 && i2 && S2.size === 1) {
        const e8 = Array.from(S2)[0],
          n3 = M2.findIndex(({ data: t4 }) =>
            c2 ? String(t4.value).startsWith(c2) : t4.value === e8,
          );
        n3 !== -1 &&
          (H2(n3),
          (t3 = setTimeout(() => {
            A2(n3);
          })));
      }
      return i2 && ((e7 = R2.current) == null || e7.scrollTo(void 0)), () => clearTimeout(t3);
    }, [i2, c2]);
    const B2 = (e7) => {
      e7 !== void 0 && w2(e7, { selected: !S2.has(e7) }), s2 || d2(!1);
    };
    if (
      (r.useImperativeHandle(t2, () => ({
        onKeyDown: (e7) => {
          const { which: t3, ctrlKey: n3 } = e7;
          switch (t3) {
            case Ny.N:
            case Ny.P:
            case Ny.UP:
            case Ny.DOWN: {
              let e8 = 0;
              if (
                (t3 === Ny.UP
                  ? (e8 = -1)
                  : t3 === Ny.DOWN
                    ? (e8 = 1)
                    : /(mac\sos|macintosh)/i.test(navigator.appVersion) &&
                      n3 &&
                      (t3 === Ny.N ? (e8 = 1) : t3 === Ny.P && (e8 = -1)),
                e8 !== 0)
              ) {
                const t4 = z2(j2 + e8, e8);
                A2(t4), H2(t4, !0);
              }
              break;
            }
            case Ny.TAB:
            case Ny.ENTER: {
              const t4 = M2[j2];
              if (!t4 || t4.data.disabled) return B2(void 0);
              !L2 || S2.has(t4.value) ? B2(t4.value) : B2(void 0), i2 && e7.preventDefault();
              break;
            }
            case Ny.ESC:
              d2(!1), i2 && e7.stopPropagation();
          }
        },
        onKeyUp: () => {},
        scrollTo: (e7) => {
          A2(e7);
        },
      })),
      M2.length === 0)
    )
      return r.createElement(
        "div",
        { role: "listbox", id: `${l2}_list`, className: `${$2}-empty`, onMouseDown: I2 },
        f2,
      );
    const U2 = Object.keys(x2).map((e7) => x2[e7]),
      W2 = (e7) => e7.label;
    function q2(e7, t3) {
      const { group: n3 } = e7;
      return { role: n3 ? "presentation" : "option", id: `${l2}_list_${t3}` };
    }
    const X2 = (e7) => {
        const t3 = M2[e7];
        if (!t3) return null;
        const n3 = t3.data || {},
          { value: o3, disabled: a3 } = n3,
          { group: l3 } = t3,
          i3 = Jy(n3, !0),
          s3 = W2(t3);
        return t3
          ? r.createElement(
              "div",
              OT(
                { "aria-label": typeof s3 != "string" || l3 ? null : s3 },
                i3,
                { key: e7 },
                q2(t3, e7),
                { "aria-selected": V2(o3), "aria-disabled": a3 },
              ),
              o3,
            )
          : null;
      },
      K2 = { role: "listbox", id: `${l2}_list` };
    return r.createElement(
      r.Fragment,
      null,
      k2 &&
        r.createElement(
          "div",
          OT({}, K2, { style: { height: 0, width: 0, overflow: "hidden" } }),
          X2(j2 - 1),
          X2(j2),
          X2(j2 + 1),
        ),
      r.createElement(
        PT,
        {
          prefixCls: `${a2}-dropdown-list`,
          itemKey: "key",
          ref: R2,
          data: M2,
          height: _2,
          itemHeight: P2,
          fullHeight: !1,
          onMouseDown: I2,
          onScroll: p2,
          virtual: k2,
          direction: C2,
          innerProps: k2 ? null : K2,
          showScrollBar: h2,
          className: (n2 = T2?.popup) == null ? void 0 : n2.list,
          style: (o2 = N2?.popup) == null ? void 0 : o2.list,
        },
        (e7, t3) => {
          var n3, o3;
          const { group: a3, groupOption: l3, data: i3, label: s3, value: u3 } = e7,
            { key: c3 } = i3;
          if (a3) {
            const e8 = i3.title ?? (TT(s3) ? s3.toString() : void 0);
            return r.createElement(
              "div",
              { className: Sb($2, `${$2}-group`, i3.className), title: e8 },
              s3 !== void 0 ? s3 : c3,
            );
          }
          const { disabled: d3, title: f3, children: p3, style: h3, className: m3, ...g3 } = i3,
            v3 = Gy(g3, U2),
            y3 = F2(u3),
            b3 = d3 || (!y3 && L2),
            w3 = `${$2}-option`,
            S3 = Sb($2, w3, m3, (n3 = T2?.popup) == null ? void 0 : n3.listItem, {
              [`${w3}-grouped`]: l3,
              [`${w3}-active`]: j2 === t3 && !b3,
              [`${w3}-disabled`]: b3,
              [`${w3}-selected`]: y3,
            }),
            x3 = W2(e7),
            C3 = !E2 || typeof E2 == "function" || y3,
            _3 = typeof x3 == "number" ? x3 : x3 || u3;
          let P3 = TT(_3) ? _3.toString() : void 0;
          return (
            f3 !== void 0 && (P3 = f3),
            r.createElement(
              "div",
              OT({}, Jy(v3), k2 ? {} : q2(e7, t3), {
                "aria-selected": k2 ? void 0 : V2(u3),
                "aria-disabled": b3,
                className: S3,
                title: P3,
                onMouseMove: () => {
                  j2 === t3 || b3 || H2(t3);
                },
                onClick: () => {
                  b3 || B2(u3);
                },
                style: { ...((o3 = N2?.popup) == null ? void 0 : o3.listItem), ...h3 },
              }),
              r.createElement(
                "div",
                { className: `${w3}-content` },
                typeof O2 == "function" ? O2(e7, { index: t3 }) : _3,
              ),
              r.isValidElement(E2) || y3,
              C3 &&
                r.createElement(
                  XO,
                  {
                    className: `${$2}-option-state`,
                    customizeIcon: E2,
                    customizeIconProps: { value: u3, disabled: b3, isSelected: y3 },
                  },
                  y3 ? "\u2713" : null,
                ),
            )
          );
        },
      ),
    );
  },
  $T = r.forwardRef(NT);
function MT(e6, t2) {
  return TO(e6).join("").toUpperCase().includes(t2);
}
function RT(e6, t2 = !1) {
  return Zy(e6)
    .map((e7, n2) => {
      if (!r.isValidElement(e7) || !e7.type) return null;
      const {
        type: { isSelectOptGroup: o2 },
        key: a2,
        props: { children: l2, ...i2 },
      } = e7;
      return t2 || !o2
        ? (function (e8) {
            const {
              key: t3,
              props: { children: n3, value: r2, ...o3 },
            } = e8;
            return { key: t3, value: r2 !== void 0 ? r2 : t3, children: n3, ...o3 };
          })(e7)
        : { key: `__RC_SELECT_GRP__${a2 === null ? n2 : a2}__`, label: a2, ...i2, options: RT(l2) };
    })
    .filter((e7) => e7);
}
const LT = (e6, t2, n2, o2, a2) =>
  r.useMemo(() => {
    let r2 = e6;
    !e6 && (r2 = RT(t2));
    const l2 = new Map(),
      i2 = new Map(),
      s2 = (e7, t3, n3) => {
        n3 && typeof n3 == "string" && e7.set(t3[n3], t3);
      },
      u2 = (e7, t3 = !1) => {
        for (let r3 = 0; r3 < e7.length; r3 += 1) {
          const c2 = e7[r3];
          !c2[n2.options] || t3
            ? (l2.set(c2[n2.value], c2),
              s2(i2, c2, n2.label),
              o2.forEach((e8) => {
                s2(i2, c2, e8);
              }),
              s2(i2, c2, a2))
            : u2(c2[n2.options], !0);
        }
      };
    return u2(r2), { options: r2, valueOptions: l2, labelOptions: i2 };
  }, [e6, t2, n2, o2, a2]);
function IT(e6) {
  const t2 = r.useRef(e6);
  return (t2.current = e6), r.useCallback((...e7) => t2.current(...e7), []);
}
function AT() {
  return (
    (AT = Object.assign
      ? Object.assign.bind()
      : function (e6) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = arguments[t2];
            for (var r2 in n2) Object.prototype.hasOwnProperty.call(n2, r2) && (e6[r2] = n2[r2]);
          }
          return e6;
        }),
    AT.apply(this, arguments)
  );
}
const FT = ["inputValue"],
  zT = r.forwardRef((e6, t2) => {
    const {
        id: n2,
        mode: o2,
        prefixCls: a2 = "rc-select",
        backfill: l2,
        fieldNames: i2,
        showSearch: s2,
        searchValue: u2,
        onSearch: c2,
        autoClearSearchValue: d2,
        filterOption: f2,
        optionFilterProp: p2,
        filterSort: h2,
        onSelect: m2,
        onDeselect: g2,
        onActive: v2,
        popupMatchSelectWidth: y2 = !0,
        optionLabelProp: b2,
        options: w2,
        optionRender: E2,
        children: S2,
        defaultActiveFirstOption: x2,
        menuItemSelectedIcon: k2,
        virtual: C2,
        direction: _2,
        listHeight: P2 = 200,
        listItemHeight: O2 = 20,
        labelRender: T2,
        value: N2,
        defaultValue: $2,
        labelInValue: M2,
        onChange: R2,
        maxCount: L2,
        classNames: I2,
        styles: A2,
        ...F2
      } = e6,
      z2 = {
        searchValue: u2,
        onSearch: c2,
        autoClearSearchValue: d2,
        filterOption: f2,
        optionFilterProp: p2,
        filterSort: h2,
      },
      [j2, D2] = (function (e7, t3, n3) {
        const {
          filterOption: o3,
          searchValue: a3,
          optionFilterProp: l3,
          filterSort: i3,
          onSearch: s3,
          autoClearSearchValue: u3,
        } = t3;
        return r.useMemo(() => {
          const t4 = typeof e7 == "object",
            r2 = {
              filterOption: o3,
              searchValue: a3,
              optionFilterProp: l3,
              filterSort: i3,
              onSearch: s3,
              autoClearSearchValue: u3,
              ...(t4 ? e7 : {}),
            };
          return [
            !!(t4 || n3 === "combobox" || n3 === "tags" || (n3 === "multiple" && e7 === void 0)) ||
              e7,
            r2,
          ];
        }, [n3, e7, o3, a3, l3, i3, s3, u3]);
      })(s2, z2, o2),
      {
        filterOption: H2,
        searchValue: V2,
        optionFilterProp: B2,
        filterSort: U2,
        onSearch: W2,
        autoClearSearchValue: q2 = !0,
      } = D2,
      X2 = r.useMemo(() => (B2 ? (Array.isArray(B2) ? B2 : [B2]) : []), [B2]),
      K2 = Av(n2),
      G2 = rT(o2),
      Y2 = !(w2 || !S2),
      Q2 = r.useMemo(() => (H2 !== void 0 || o2 !== "combobox") && H2, [H2, o2]),
      J2 = r.useMemo(() => bO(i2, Y2), [JSON.stringify(i2), Y2]),
      [Z2, ee2] = _v("", V2),
      te2 = Z2 || "",
      ne2 = LT(w2, S2, J2, X2, b2),
      { valueOptions: re2, labelOptions: oe2, options: ae2 } = ne2,
      le2 = r.useCallback(
        (e7) =>
          TO(e7).map((e8) => {
            let t3, n3, r2, o3;
            (function (e9) {
              return !e9 || typeof e9 != "object";
            })(e8)
              ? (t3 = e8)
              : ((n3 = e8.label), (t3 = e8.value));
            const a3 = re2.get(t3);
            return (
              a3 &&
                (n3 === void 0 && (n3 = a3?.[b2 || J2.label]),
                (r2 = a3?.disabled),
                (o3 = a3?.title)),
              { label: n3, value: t3, key: t3, disabled: r2, title: o3 }
            );
          }),
        [J2, b2, re2],
      ),
      [ie2, se2] = _v($2, N2),
      ue2 = r.useMemo(() => {
        var e7;
        const t3 = le2(G2 && ie2 === null ? [] : ie2);
        return o2 === "combobox" &&
          (function (e8) {
            return !e8 && e8 !== 0;
          })((e7 = t3[0]) == null ? void 0 : e7.value)
          ? []
          : t3;
      }, [ie2, le2, o2, G2]),
      [ce2, de2] = ((e7, t3) => {
        const n3 = r.useRef({ values: new Map(), options: new Map() });
        return [
          r.useMemo(() => {
            const { values: r2, options: o3 } = n3.current,
              a3 = e7.map((e8) => {
                var t4;
                return e8.label === void 0
                  ? { ...e8, label: (t4 = r2.get(e8.value)) == null ? void 0 : t4.label }
                  : e8;
              }),
              l3 = new Map(),
              i3 = new Map();
            return (
              a3.forEach((e8) => {
                l3.set(e8.value, e8), i3.set(e8.value, t3.get(e8.value) || o3.get(e8.value));
              }),
              (n3.current.values = l3),
              (n3.current.options = i3),
              a3
            );
          }, [e7, t3]),
          r.useCallback((e8) => t3.get(e8) || n3.current.options.get(e8), [t3]),
        ];
      })(ue2, re2),
      fe2 = r.useMemo(() => {
        if (!o2 && ce2.length === 1) {
          const e7 = ce2[0];
          if (e7.value === null && (e7.label === null || e7.label === void 0)) return [];
        }
        return ce2.map((e7) => ({
          ...e7,
          label: (typeof T2 == "function" ? T2(e7) : e7.label) ?? e7.value,
        }));
      }, [o2, ce2, T2]),
      pe2 = r.useMemo(() => new Set(ce2.map((e7) => e7.value)), [ce2]);
    r.useEffect(() => {
      var e7;
      if (o2 === "combobox") {
        const t3 = (e7 = ce2[0]) == null ? void 0 : e7.value;
        ee2(
          (function (e8) {
            return e8 != null;
          })(t3)
            ? String(t3)
            : "",
        );
      }
    }, [ce2]);
    const he2 = IT((e7, t3) => {
        const n3 = t3 ?? e7;
        return { [J2.value]: e7, [J2.label]: n3 };
      }),
      me2 = ((e7, t3, n3, o3, a3) =>
        r.useMemo(() => {
          if (!n3 || o3 === !1) return e7;
          const { options: r2, label: l3, value: i3 } = t3,
            s3 = [],
            u3 = typeof o3 == "function",
            c3 = n3.toUpperCase(),
            d3 = u3
              ? o3
              : (e8, t4) =>
                  a3 && a3.length
                    ? a3.some((e9) => MT(t4[e9], c3))
                    : t4[r2]
                      ? MT(t4[l3 !== "children" ? l3 : "label"], c3)
                      : MT(t4[i3], c3),
            f3 = u3 ? (e8) => wO(e8) : (e8) => e8;
          return (
            e7.forEach((e8) => {
              if (e8[r2])
                if (d3(n3, f3(e8))) s3.push(e8);
                else {
                  const t4 = e8[r2].filter((e9) => d3(n3, f3(e9)));
                  t4.length && s3.push({ ...e8, [r2]: t4 });
                }
              else d3(n3, f3(e8)) && s3.push(e8);
            }),
            s3
          );
        }, [e7, o3, a3, n3, t3]))(
        r.useMemo(() => {
          if (o2 !== "tags") return ae2;
          const e7 = [...ae2];
          return (
            [...ce2]
              .sort((e8, t3) => (e8.value < t3.value ? -1 : 1))
              .forEach((t3) => {
                const n3 = t3.value;
                ((e8) => re2.has(e8))(n3) || e7.push(he2(n3, t3.label));
              }),
            e7
          );
        }, [he2, ae2, re2, ce2, o2]),
        J2,
        te2,
        Q2,
        X2,
      ),
      ge2 = r.useMemo(() => {
        var e7;
        return o2 !== "tags" ||
          !te2 ||
          me2.some((e8) =>
            ((e9) => (X2.length ? X2.some((t3) => e9?.[t3] === te2) : e9?.value === te2))(e8),
          ) ||
          me2.some((e8) => e8[J2.value] === te2) ||
          ((e7 = re2.get(te2)) != null && e7.disabled)
          ? me2
          : [he2(te2), ...me2];
      }, [he2, X2, o2, me2, te2, J2, re2]),
      ve2 = (e7) =>
        [...e7]
          .sort((e8, t3) => U2(e8, t3, { searchValue: te2 }))
          .map((e8) =>
            Array.isArray(e8.options)
              ? { ...e8, options: e8.options.length > 0 ? ve2(e8.options) : e8.options }
              : e8,
          ),
      ye2 = r.useMemo(() => (U2 ? ve2(ge2) : ge2), [ge2, U2, te2]),
      be2 = r.useMemo(
        () =>
          (function (e7, { fieldNames: t3, childrenAsData: n3 } = {}) {
            const r2 = [],
              { label: o3, value: a3, options: l3, groupLabel: i3 } = bO(t3, !1);
            return (
              (function e8(t4, s3) {
                Array.isArray(t4) &&
                  t4.forEach((t5) => {
                    if (s3 || !(l3 in t5)) {
                      const e9 = t5[a3];
                      r2.push({
                        key: vO(t5, r2.length),
                        groupOption: s3,
                        data: t5,
                        label: t5[o3],
                        value: e9,
                      });
                    } else {
                      let o4 = t5[i3];
                      o4 === void 0 && n3 && (o4 = t5.label),
                        r2.push({ key: vO(t5, r2.length), group: !0, data: t5, label: o4 }),
                        e8(t5[l3], !0);
                    }
                  });
              })(e7, !1),
              r2
            );
          })(ye2, { fieldNames: J2, childrenAsData: Y2 }),
        [ye2, J2, Y2],
      ),
      we2 = (e7) => {
        const t3 = le2(e7);
        if (
          (se2(t3),
          R2 &&
            (t3.length !== ce2.length ||
              t3.some((e8, t4) => {
                var n3;
                return ((n3 = ce2[t4]) == null ? void 0 : n3.value) !== e8?.value;
              })))
        ) {
          const e8 = M2
              ? t3.map(({ label: e9, value: t4 }) => ({ label: e9, value: t4 }))
              : t3.map((e9) => e9.value),
            n3 = t3.map((e9) => wO(de2(e9.value)));
          R2(G2 ? e8 : e8[0], G2 ? n3 : n3[0]);
        }
      },
      [Ee2, Se2] = r.useState(null),
      [xe2, ke2] = r.useState(0),
      Ce2 = x2 !== void 0 ? x2 : o2 !== "combobox",
      _e2 = r.useRef(void 0),
      Pe2 = r.useCallback(
        (e7, t3, { source: n3 = "keyboard" } = {}) => {
          ke2(t3), l2 && o2 === "combobox" && e7 !== null && n3 === "keyboard" && Se2(String(e7));
          const r2 = Promise.resolve().then(() => {
            _e2.current === r2 && v2?.(e7);
          });
          _e2.current = r2;
        },
        [l2, o2, v2],
      ),
      Oe2 = (e7, t3, n3) => {
        const r2 = () => {
          const t4 = de2(e7);
          return [M2 ? { label: t4?.[J2.label], value: e7 } : e7, wO(t4)];
        };
        if (t3 && m2) {
          const [e8, t4] = r2();
          m2(e8, t4);
        } else if (!t3 && g2 && n3 !== "clear") {
          const [e8, t4] = r2();
          g2(e8, t4);
        }
      },
      Te2 = IT((e7, t3) => {
        let n3;
        const r2 = !G2 || t3.selected;
        (n3 = r2 ? (G2 ? [...ce2, e7] : [e7]) : ce2.filter((t4) => t4.value !== e7)),
          we2(n3),
          Oe2(e7, r2),
          o2 === "combobox" ? Se2("") : (rT && !q2) || (ee2(""), Se2(""));
      }),
      Ne2 = r.useMemo(
        () => ({
          ...ne2,
          flattenOptions: be2,
          onActiveValue: Pe2,
          defaultActiveFirstOption: Ce2,
          onSelect: Te2,
          menuItemSelectedIcon: k2,
          rawValues: pe2,
          fieldNames: J2,
          virtual: C2 !== !1 && y2 !== !1,
          direction: _2,
          listHeight: P2,
          listItemHeight: O2,
          childrenAsData: Y2,
          maxCount: L2,
          optionRender: E2,
          classNames: I2,
          styles: A2,
        }),
        [L2, ne2, be2, Pe2, Ce2, Te2, k2, pe2, J2, C2, y2, _2, P2, O2, Y2, E2, I2, A2],
      );
    return r.createElement(
      OO.Provider,
      { value: Ne2 },
      r.createElement(
        oT,
        AT({}, F2, {
          id: K2,
          prefixCls: a2,
          ref: t2,
          omitDomProps: FT,
          mode: o2,
          classNames: I2,
          styles: A2,
          displayValues: fe2,
          onDisplayValuesChange: (e7, t3) => {
            we2(e7);
            const { type: n3, values: r2 } = t3;
            (n3 !== "remove" && n3 !== "clear") ||
              r2.forEach((e8) => {
                Oe2(e8.value, !1, n3);
              });
          },
          maxCount: L2,
          direction: _2,
          showSearch: j2,
          searchValue: te2,
          onSearch: (e7, t3) => {
            var n3;
            if ((ee2(e7), Se2(null), t3.source === "submit")) {
              const t4 = (e7 || "").trim();
              if (t4) {
                if ((n3 = re2.get(t4)) != null && n3.disabled) return void ee2("");
                const e8 = Array.from(new Set([...pe2, t4]));
                we2(e8), Oe2(t4, !0), ee2("");
              }
              return;
            }
            t3.source !== "blur" && (o2 === "combobox" && we2(e7), W2?.(e7));
          },
          autoClearSearchValue: q2,
          onSearchSplit: (e7) => {
            let t3 = e7;
            o2 !== "tags" &&
              (t3 = e7
                .map((e8) => {
                  const t4 = oe2.get(e8);
                  return t4?.value;
                })
                .filter((e8) => e8 !== void 0)),
              o2 === "tags" &&
                (t3 = t3.filter((e8) => {
                  var t4;
                  return !((t4 = re2.get(e8)) != null && t4.disabled);
                }));
            const n3 = Array.from(new Set([...pe2, ...t3]));
            we2(n3),
              n3.forEach((e8) => {
                Oe2(e8, !0);
              });
          },
          popupMatchSelectWidth: y2,
          OptionList: $T,
          emptyOptions: !be2.length,
          activeValue: Ee2,
          activeDescendantId: `${K2}_list_${xe2}`,
        }),
      ),
    );
  }),
  jT = zT;
(jT.Option = lT), (jT.OptGroup = aT);
const DT = (e6, t2, n2) =>
    e6 === !1 ? null : e6 === !0 ? n2 : e6 && t2 && e6[t2] !== void 0 ? e6[t2] : n2,
  HT = (e6, t2, n2) =>
    Sb({
      [`${e6}-status-success`]: t2 === "success",
      [`${e6}-status-warning`]: t2 === "warning",
      [`${e6}-status-error`]: t2 === "error",
      [`${e6}-status-validating`]: t2 === "validating",
      [`${e6}-has-feedback`]: n2,
    }),
  VT = (e6, t2) => t2 || e6,
  BT = (e6, t2) =>
    e6?.startsWith("var(") || t2?.startsWith("var(")
      ? e6
      : new aS(e6).onBackground(t2).toHexString(),
  UT = () => {
    const [, e6] = WS(),
      [t2] = qk("Empty"),
      {
        colorBgContainer: n2,
        colorFill: o2,
        colorFillSecondary: a2,
        colorFillTertiary: l2,
        colorTextQuaternary: i2,
      } = e6,
      {
        panelBgColor: s2,
        borderColor: u2,
        detailColor: c2,
        shadowColor: d2,
        iconColor: f2,
      } = r.useMemo(
        () => ({
          panelBgColor: BT(l2, n2),
          borderColor: BT(i2, n2),
          detailColor: BT(o2, n2),
          shadowColor: BT(a2, n2),
          iconColor: n2,
        }),
        [n2, o2, a2, l2, i2],
      );
    return r.createElement(
      "svg",
      { width: "184", height: "152", viewBox: "0 0 184 152", xmlns: "http://www.w3.org/2000/svg" },
      r.createElement("title", null, t2?.description || "Empty"),
      r.createElement(
        "g",
        { fill: "none", fillRule: "evenodd" },
        r.createElement(
          "g",
          { transform: "translate(24 31.7)" },
          r.createElement("ellipse", {
            fillOpacity: ".8",
            fill: d2,
            cx: "67.8",
            cy: "106.9",
            rx: "67.8",
            ry: "12.7",
          }),
          r.createElement("path", {
            fill: u2,
            d: "M122 69.7 98.1 40.2a6 6 0 0 0-4.6-2.2H42.1a6 6 0 0 0-4.6 2.2l-24 29.5V85H122z",
          }),
          r.createElement("path", {
            fill: s2,
            d: "M33.8 0h68a4 4 0 0 1 4 4v93.3a4 4 0 0 1-4 4h-68a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4",
          }),
          r.createElement("path", {
            fill: c2,
            d: "M42.7 10h50.2a2 2 0 0 1 2 2v25a2 2 0 0 1-2 2H42.7a2 2 0 0 1-2-2V12a2 2 0 0 1 2-2m.2 39.8h49.8a2.3 2.3 0 1 1 0 4.5H42.9a2.3 2.3 0 0 1 0-4.5m0 11.7h49.8a2.3 2.3 0 1 1 0 4.6H42.9a2.3 2.3 0 0 1 0-4.6m79 43.5a7 7 0 0 1-6.8 5.4H20.5a7 7 0 0 1-6.7-5.4l-.2-1.8V69.7h26.3c2.9 0 5.2 2.4 5.2 5.4s2.4 5.4 5.3 5.4h34.8c2.9 0 5.3-2.4 5.3-5.4s2.3-5.4 5.2-5.4H122v33.5q0 1-.2 1.8",
          }),
        ),
        r.createElement("path", {
          fill: c2,
          d: "m149.1 33.3-6.8 2.6a1 1 0 0 1-1.3-1.2l2-6.2q-4.1-4.5-4.2-10.4c0-10 10.1-18.1 22.6-18.1S184 8.1 184 18.1s-10.1 18-22.6 18q-6.8 0-12.3-2.8",
        }),
        r.createElement(
          "g",
          { fill: f2, transform: "translate(149.7 15.4)" },
          r.createElement("circle", { cx: "20.7", cy: "3.2", r: "2.8" }),
          r.createElement("path", { d: "M5.7 5.6H0L2.9.7zM9.3.7h5v5h-5z" }),
        ),
      ),
    );
  },
  WT = () => {
    const [, e6] = WS(),
      [t2] = qk("Empty"),
      { colorFill: n2, colorFillTertiary: o2, colorFillQuaternary: a2, colorBgContainer: l2 } = e6,
      {
        borderColor: i2,
        shadowColor: s2,
        contentColor: u2,
      } = r.useMemo(
        () => ({ borderColor: BT(n2, l2), shadowColor: BT(o2, l2), contentColor: BT(a2, l2) }),
        [n2, o2, a2, l2],
      );
    return r.createElement(
      "svg",
      { width: "64", height: "41", viewBox: "0 0 64 41", xmlns: "http://www.w3.org/2000/svg" },
      r.createElement("title", null, t2?.description || "Empty"),
      r.createElement(
        "g",
        { transform: "translate(0 1)", fill: "none", fillRule: "evenodd" },
        r.createElement("ellipse", { fill: s2, cx: "32", cy: "33", rx: "32", ry: "7" }),
        r.createElement(
          "g",
          { fillRule: "nonzero", stroke: i2 },
          r.createElement("path", {
            d: "M55 12.8 44.9 1.3Q44 0 42.9 0H21.1q-1.2 0-2 1.3L9 12.8V22h46z",
          }),
          r.createElement("path", {
            d: "M41.6 16c0-1.7 1-3 2.2-3H55v18.1c0 2.2-1.3 3.9-3 3.9H12c-1.7 0-3-1.7-3-3.9V13h11.2c1.2 0 2.2 1.3 2.2 3s1 2.9 2.2 2.9h14.8c1.2 0 2.2-1.4 2.2-3",
            fill: u2,
          }),
        ),
      ),
    );
  },
  qT = tx("Empty", (e6) => {
    const { componentCls: t2, controlHeightLG: n2, calc: r2 } = e6;
    return ((e7) => {
      const {
        componentCls: t3,
        margin: n3,
        marginXS: r3,
        marginXL: o2,
        fontSize: a2,
        lineHeight: l2,
      } = e7;
      return {
        [t3]: {
          marginInline: r3,
          fontSize: a2,
          lineHeight: l2,
          textAlign: "center",
          [`${t3}-image`]: {
            height: e7.emptyImgHeight,
            marginBottom: r3,
            opacity: e7.opacityImage,
            img: { height: "100%" },
            svg: { maxWidth: "100%", height: "100%", margin: "auto" },
          },
          [`${t3}-description`]: { color: e7.colorTextDescription },
          [`${t3}-footer`]: { marginTop: n3 },
          "&-normal": {
            marginBlock: o2,
            color: e7.colorTextDescription,
            [`${t3}-description`]: { color: e7.colorTextDescription },
            [`${t3}-image`]: { height: e7.emptyImgHeightMD },
          },
          "&-small": {
            marginBlock: r3,
            color: e7.colorTextDescription,
            [`${t3}-image`]: { height: e7.emptyImgHeightSM },
          },
        },
      };
    })(
      UE(e6, {
        emptyImgCls: `${t2}-img`,
        emptyImgHeight: r2(n2).mul(2.5).equal(),
        emptyImgHeightMD: n2,
        emptyImgHeightSM: r2(n2).mul(0.875).equal(),
      }),
    );
  }),
  XT = r.createElement(UT, null),
  KT = r.createElement(WT, null),
  GT = r.forwardRef((e6, t2) => {
    const {
        className: n2,
        rootClassName: o2,
        prefixCls: a2,
        image: l2,
        description: i2,
        children: s2,
        imageStyle: u2,
        style: c2,
        classNames: d2,
        styles: f2,
        ...p2
      } = e6,
      {
        getPrefixCls: h2,
        direction: m2,
        className: g2,
        style: v2,
        classNames: y2,
        styles: b2,
        image: w2,
      } = $b("empty"),
      E2 = h2("empty", a2),
      [S2, x2] = qT(E2),
      k2 = _k(v2),
      C2 = _k(c2),
      [_2, P2] = Ok([y2, d2], [b2, k2, f2, C2], { props: e6 }),
      [O2] = qk("Empty"),
      T2 = i2 !== void 0 ? i2 : O2?.description,
      N2 = typeof T2 == "string" ? T2 : "empty",
      $2 = l2 ?? w2 ?? XT;
    let M2 = null;
    M2 = typeof $2 == "string" ? r.createElement("img", { draggable: !1, alt: N2, src: $2 }) : $2;
    const R2 = r.useRef(null);
    return (
      r.useImperativeHandle(t2, () => ({ nativeElement: R2.current })),
      r.createElement(
        "div",
        {
          ref: R2,
          className: Sb(
            S2,
            x2,
            E2,
            g2,
            { [`${E2}-normal`]: $2 === KT, [`${E2}-rtl`]: m2 === "rtl" },
            n2,
            o2,
            _2.root,
          ),
          style: P2.root,
          ...p2,
        },
        r.createElement(
          "div",
          { className: Sb(`${E2}-image`, _2.image), style: { ...u2, ...P2.image } },
          M2,
        ),
        Vy(T2) &&
          r.createElement(
            "div",
            { className: Sb(`${E2}-description`, _2.description), style: P2.description },
            T2,
          ),
        Vy(s2) &&
          r.createElement(
            "div",
            { className: Sb(`${E2}-footer`, _2.footer), style: P2.footer },
            s2,
          ),
      )
    );
  });
(GT.PRESENTED_IMAGE_DEFAULT = XT), (GT.PRESENTED_IMAGE_SIMPLE = KT);
const YT = GT,
  QT = (e6) => {
    const { componentName: t2 } = e6,
      { getPrefixCls: n2 } = r.useContext(Tb),
      o2 = n2("empty");
    switch (t2) {
      case "Table":
      case "List":
        return i.createElement(YT, { image: YT.PRESENTED_IMAGE_SIMPLE });
      case "Select":
      case "TreeSelect":
      case "Cascader":
      case "Transfer":
      case "Mentions":
        return i.createElement(YT, { image: YT.PRESENTED_IMAGE_SIMPLE, className: `${o2}-small` });
      case "Table.filter":
        return null;
      default:
        return i.createElement(YT, null);
    }
  },
  JT = (e6, t2, n2, o2) => {
    const a2 = r.useContext(Tb),
      { variant: l2, [e6]: i2 } = a2,
      s2 = r.useContext(iO),
      u2 = o2 ? a2[o2] : void 0,
      c2 = i2?.variant ?? u2?.variant,
      d2 = t2 !== void 0 || n2 === !1 || s2 !== void 0 || c2 !== void 0 || l2 !== void 0;
    let f2;
    return (
      (f2 = t2 !== void 0 ? t2 : n2 === !1 ? "borderless" : (s2 ?? c2 ?? l2 ?? "outlined")),
      [f2, Ob.includes(f2), d2]
    );
  };
function ZT(e6, t2) {
  return (
    e6 ||
    ((e7) => {
      const t3 = {
        overflow: { adjustX: !0, adjustY: !0, shiftY: !0 },
        htmlRegion: e7 === "scroll" ? "scroll" : "visible",
        dynamicInset: !0,
      };
      return {
        bottomLeft: { ...t3, points: ["tl", "bl"], offset: [0, 4] },
        bottomRight: { ...t3, points: ["tr", "br"], offset: [0, 4] },
        topLeft: { ...t3, points: ["bl", "tl"], offset: [0, -4] },
        topRight: { ...t3, points: ["br", "tr"], offset: [0, -4] },
      };
    })(t2)
  );
}
const eN = (e6) => {
    const { optionHeight: t2, optionFontSize: n2, optionLineHeight: r2, optionPadding: o2 } = e6;
    return {
      position: "relative",
      display: "block",
      minHeight: t2,
      padding: o2,
      color: e6.colorText,
      fontWeight: 400,
      fontSize: n2,
      lineHeight: r2,
      boxSizing: "border-box",
    };
  },
  tN = (e6) => {
    const { antCls: t2, componentCls: n2 } = e6,
      r2 = `${n2}-item`,
      o2 = `&${t2}-slide-up-enter${t2}-slide-up-enter-active`,
      a2 = `&${t2}-slide-up-appear${t2}-slide-up-appear-active`,
      l2 = `&${t2}-slide-up-leave${t2}-slide-up-leave-active`,
      i2 = `${n2}-dropdown-placement-`,
      s2 = `${r2}-option-selected`;
    return [
      {
        [`${n2}-dropdown`]: {
          ...XS(e6),
          position: "absolute",
          top: -9999,
          zIndex: e6.zIndexPopup,
          boxSizing: "border-box",
          padding: e6.paddingXXS,
          overflow: "hidden",
          fontSize: e6.fontSize,
          fontVariant: "initial",
          backgroundColor: e6.colorBgElevated,
          borderRadius: e6.borderRadiusLG,
          outline: "none",
          boxShadow: e6.boxShadowSecondary,
          [`
          ${o2}${i2}bottomLeft,
          ${a2}${i2}bottomLeft
        `]: { animationName: V_ },
          [`
          ${o2}${i2}topLeft,
          ${a2}${i2}topLeft,
          ${o2}${i2}topRight,
          ${a2}${i2}topRight
        `]: { animationName: U_ },
          [`${l2}${i2}bottomLeft`]: { animationName: B_ },
          [`
          ${l2}${i2}topLeft,
          ${l2}${i2}topRight
        `]: { animationName: W_ },
          "&-hidden": { display: "none" },
          [`${n2}-dropdown-list-scrollbar`]: {
            cursor: "pointer",
            "&:hover": { backgroundColor: e6.colorFillQuaternary },
          },
          [r2]: {
            ...eN(e6),
            cursor: "pointer",
            transition: `background-color ${e6.motionDurationSlow} ease`,
            borderRadius: e6.borderRadiusSM,
            "&-group": {
              color: e6.colorTextDescription,
              fontSize: e6.fontSizeSM,
              cursor: "default",
            },
            "&-option": {
              display: "flex",
              "&-content": { flex: "auto", ...qS },
              "&-state": { flex: "none", display: "flex", alignItems: "center" },
              [`&-selected:not(${r2}-option-disabled)`]: {
                color: e6.optionSelectedColor,
                fontWeight: e6.optionSelectedFontWeight,
                backgroundColor: e6.optionSelectedBg,
                [`${r2}-option-state`]: { color: e6.colorPrimary },
              },
              [`&-active:not(${r2}-option-disabled)`]: { backgroundColor: e6.optionActiveBg },
              [`&-selected${r2}-option-active:not(${r2}-option-disabled)`]: {
                backgroundColor: e6.controlItemBgActiveHover,
              },
              "&-disabled": {
                [`&${r2}-option-selected`]: { backgroundColor: e6.colorBgContainerDisabled },
                color: e6.colorTextDisabled,
                cursor: "not-allowed",
              },
              "&-grouped": {
                paddingInlineStart: e6.calc(e6.controlPaddingHorizontal).mul(2).equal(),
              },
            },
            "&-empty": { ...eN(e6), color: e6.colorTextDisabled },
          },
          [`${s2}:has(+ ${s2})`]: {
            borderEndStartRadius: 0,
            borderEndEndRadius: 0,
            [`& + ${s2}`]: { borderStartStartRadius: 0, borderStartEndRadius: 0 },
          },
          "&-rtl": { direction: "rtl" },
        },
      },
      Q_(e6, "slide-up"),
      Q_(e6, "slide-down"),
      H_(e6, "move-up"),
      H_(e6, "move-down"),
    ];
  },
  nN = (e6) => {
    const { antCls: t2, componentCls: n2 } = e6,
      r2 = { background: "transparent" },
      o2 = [
        "> input[disabled]",
        "> textarea[disabled]",
        `> ${n2}-input`,
        `> ${t2}-input-affix-wrapper-disabled`,
        `> ${t2}-input-search`,
      ].join(", ");
    return {
      [`&${n2}-customize`]: {
        border: 0,
        padding: 0,
        fontSize: "inherit",
        lineHeight: "inherit",
        [`${n2}-placeholder`]: { display: "none" },
        [`${n2}-content`]: { margin: 0, padding: 0, "&-value": { display: "none" } },
        [`&${n2}-filled ${n2}-content`]: { [`${t2}-input-filled`]: r2 },
        [`&${n2}-disabled ${n2}-content`]: { [o2]: r2, "input[disabled], textarea[disabled]": r2 },
      },
    };
  },
  rN = (e6) => {
    const {
        componentCls: t2,
        calc: n2,
        iconCls: r2,
        paddingXS: o2,
        paddingXXS: a2,
        INTERNAL_FIXED_ITEM_MARGIN: l2,
        lineWidth: i2,
        lineType: s2,
        colorIcon: u2,
        colorIconHover: c2,
        inputPaddingHorizontalBase: d2,
        antCls: f2,
      } = e6,
      [p2, h2] = ox(f2, "select");
    return {
      "&-multiple": {
        [p2("multi-item-background")]: e6.multipleItemBg,
        [p2("multi-item-border-color")]: "transparent",
        [p2("multi-item-border-radius")]: e6.borderRadiusSM,
        [p2("multi-item-height")]: e6.multipleItemHeight,
        [p2("multi-padding-base")]: `calc((${h2("height")} - ${h2("multi-item-height")}) / 2)`,
        [p2("multi-padding-vertical")]: `calc(${h2("multi-padding-base")} - ${l2} - ${i2})`,
        [p2("multi-item-padding-horizontal")]:
          `calc(${d2} - ${h2("multi-padding-vertical")} - ${i2} * 2)`,
        paddingBlock: h2("multi-padding-vertical"),
        paddingInlineStart: `calc(${h2("multi-padding-base")} - ${i2})`,
        [`${t2}-prefix`]: { marginInlineStart: h2("multi-item-padding-horizontal") },
        [`${t2}-prefix + ${t2}-content`]: {
          [`${t2}-placeholder`]: { insetInlineStart: 0 },
          [`${t2}-content-item${t2}-content-item-suffix`]: { marginInlineStart: 0 },
        },
        [`${t2}-placeholder`]: {
          position: "absolute",
          lineHeight: h2("line-height"),
          insetInlineStart: h2("multi-item-padding-horizontal"),
          width: `calc(100% - ${h2("multi-item-padding-horizontal")})`,
          top: "50%",
          transform: "translateY(-50%)",
        },
        [`${t2}-content`]: {
          flexWrap: "wrap",
          alignItems: "center",
          lineHeight: 1,
          "&-item-prefix": { height: h2("font-size") },
          "&-item": { lineHeight: 1, maxWidth: "calc(100% - 4px)" },
          [`${t2}-content-item-prefix + ${t2}-content-item-suffix,
          ${t2}-content-item-suffix:first-child`]: {
            marginInlineStart: h2("multi-item-padding-horizontal"),
          },
          [`${t2}-selection-item`]: {
            lineHeight: `calc(${h2("multi-item-height")} - ${i2} * 2)`,
            border: `${i2} ${s2} ${h2("multi-item-border-color")}`,
            display: "flex",
            marginBlock: l2,
            marginInlineEnd: n2(l2).mul(2).equal(),
            background: h2("multi-item-background"),
            borderRadius: h2("multi-item-border-radius"),
            paddingInlineStart: o2,
            paddingInlineEnd: a2,
            transition: ["height", "line-height", "padding"]
              .map((t3) => `${t3} ${e6.motionDurationSlow}`)
              .join(","),
            "&-content": { ...qS, marginInlineEnd: a2 },
            "&-remove": {
              display: "inline-flex",
              alignItems: "center",
              color: "inherit",
              fontStyle: "normal",
              lineHeight: 0,
              textAlign: "center",
              textTransform: "none",
              verticalAlign: "-0.125em",
              textRendering: "optimizeLegibility",
              "-webkit-font-smoothing": "antialiased",
              "-moz-osx-font-smoothing": "grayscale",
              "> *": { lineHeight: 1 },
              svg: { display: "inline-block", verticalAlign: "inherit" },
              display: "inline-flex",
              alignItems: "center",
              color: u2,
              fontWeight: 700,
              fontSize: 10,
              lineHeight: "inherit",
              cursor: "pointer",
              [`> ${r2}`]: { verticalAlign: "-0.2em" },
              "&:hover": { color: c2 },
            },
          },
          [`${t2}-input`]: {
            lineHeight: n2(l2).mul(2).add(h2("multi-item-height")).equal(),
            width: "calc(var(--select-input-width, 0) * 1px)",
            minWidth: 4,
            maxWidth: "100%",
            transition: `line-height ${e6.motionDurationSlow}`,
          },
        },
        [`&${t2}-sm`]: {
          [p2("multi-item-height")]: e6.multipleItemHeightSM,
          [p2("multi-item-border-radius")]: e6.borderRadiusXS,
        },
        [`&${t2}-lg`]: {
          [p2("multi-item-height")]: e6.multipleItemHeightLG,
          [p2("multi-item-border-radius")]: e6.borderRadius,
        },
        [`&${t2}-filled`]: {
          [p2("multi-item-border-color")]: e6.colorSplit,
          [p2("multi-item-background")]: e6.colorBgContainer,
          [`&${t2}-disabled`]: { [p2("multi-item-border-color")]: "transparent" },
        },
      },
    };
  },
  oN = (e6, t2) => {
    const { componentCls: n2, antCls: r2 } = e6,
      [o2] = ox(r2, "select"),
      { border: a2, borderHover: l2, borderActive: i2, borderOutline: s2 } = t2,
      u2 = t2.background || e6.selectorBg || e6.colorBgContainer;
    return {
      [o2("border-color")]: a2,
      [o2("background-color")]: u2,
      [o2("affix-color")]: t2.affixColor,
      [`&:not(${n2}-disabled)`]: {
        "&:hover": { [o2("border-color")]: l2, [o2("background-color")]: t2.backgroundHover || u2 },
        [`&${n2}-focused`]: {
          [o2("border-color")]: i2,
          [o2("background-color")]: t2.backgroundActive || u2,
          boxShadow: `0 0 0 ${Qb(e6.controlOutlineWidth)} ${s2}`,
        },
      },
      [`&${n2}-disabled`]: {
        [o2("border-color")]: t2.borderDisabled || t2.border,
        [o2("background-color")]: t2.backgroundDisabled || t2.background,
      },
    };
  },
  aN = (e6, t2, n2, r2, o2, a2) => {
    const { componentCls: l2 } = e6;
    return {
      [`&${l2}-${t2}`]: [
        oN(e6, n2),
        {
          [`&${l2}-status-error`]: oN(e6, { ...n2, ...r2 }),
          [`&${l2}-status-warning`]: oN(e6, { ...n2, ...o2 }),
        },
        a2,
      ],
    };
  },
  lN = (e6, t2) => ({
    outline: `${Qb(e6.lineWidthFocus)} ${e6.lineType} ${t2}`,
    outlineOffset: Qb(e6.calc(e6.lineWidth).mul(-1).equal()),
    transition: ["outline-offset", "outline"].map((e7) => `${e7} 0s`).join(", "),
  }),
  iN = (e6) => {
    const {
        componentCls: t2,
        fontHeight: n2,
        controlHeight: r2,
        fontSizeIcon: o2,
        showArrowPaddingInlineEnd: a2,
        iconCls: l2,
        antCls: i2,
        max: s2,
        calc: u2,
      } = e6,
      [c2, d2] = ox(i2, "select"),
      f2 = s2(u2(a2).sub(o2).equal(), 0);
    return {
      [t2]: [
        {
          [c2("border-radius")]: e6.borderRadius,
          [c2("border-color")]: "#000",
          [c2("border-size")]: e6.lineWidth,
          [c2("background-color")]: e6.colorBgContainer,
          [c2("font-size")]: e6.fontSize,
          [c2("line-height")]: e6.lineHeight,
          [c2("font-height")]: n2,
          [c2("color")]: e6.colorText,
          [c2("affix-color")]: e6.colorText,
          [c2("height")]: r2,
          [c2("padding-horizontal")]: u2(e6.paddingSM).sub(e6.lineWidth).equal(),
          [c2("padding-vertical")]:
            `calc((${d2("height")} - ${d2("font-height")}) / 2 - ${d2("border-size")})`,
          ...XS(e6),
          display: "inline-flex",
          flexWrap: "nowrap",
          position: "relative",
          transition: `all ${e6.motionDurationSlow}`,
          alignItems: "flex-start",
          outline: 0,
          cursor: "pointer",
          borderRadius: d2("border-radius"),
          borderWidth: d2("border-size"),
          borderStyle: e6.lineType,
          borderColor: d2("border-color"),
          background: d2("background-color"),
          fontSize: d2("font-size"),
          lineHeight: d2("line-height"),
          color: d2("color"),
          paddingInline: d2("padding-horizontal"),
          paddingBlock: d2("padding-vertical"),
          [`${t2}-prefix`]: { color: d2("affix-color"), flex: "none", lineHeight: 1 },
          [`${t2}-placeholder`]: {
            ...qS,
            color: e6.colorTextPlaceholder,
            pointerEvents: "none",
            zIndex: 1,
          },
          [`${t2}-content`]: {
            flex: "auto",
            minWidth: 0,
            position: "relative",
            display: "flex",
            marginInlineEnd: f2,
            "&:before": { content: '"\\a0"', width: 0, overflow: "hidden" },
            "&-value": { visibility: "inherit" },
            "input[readonly]": { cursor: "inherit", caretColor: "transparent" },
          },
          [`${t2}-suffix`]: {
            flex: "none",
            color: e6.colorTextQuaternary,
            fontSize: e6.fontSizeIcon,
            lineHeight: 1,
            transition: ["opacity", "color"]
              .map((t3) => `${t3} ${e6.motionDurationMid} ease`)
              .join(", "),
            "> :not(:last-child)": { marginInlineEnd: e6.marginXS },
          },
          [`${t2}-prefix, ${t2}-suffix`]: { alignSelf: "center", [l2]: { verticalAlign: "top" } },
          "&-disabled": {
            background: e6.colorBgContainerDisabled,
            [c2("color")]: e6.colorTextDisabled,
            cursor: "not-allowed",
            input: { cursor: "not-allowed" },
          },
          "&-sm": {
            [c2("height")]: e6.controlHeightSM,
            [c2("padding-horizontal")]: u2(e6.paddingXS).sub(e6.lineWidth).equal(),
            [c2("border-radius")]: e6.borderRadiusSM,
            [`${t2}-clear`]: { insetInlineEnd: d2("padding-horizontal") },
          },
          "&-lg": {
            [c2("height")]: e6.controlHeightLG,
            [c2("font-size")]: e6.fontSizeLG,
            [c2("line-height")]: e6.lineHeightLG,
            [c2("font-height")]: e6.fontHeightLG,
            [c2("border-radius")]: e6.borderRadiusLG,
          },
        },
        {
          [`&:not(${t2}-customize)`]: {
            [`${t2}-input`]: {
              outline: "none",
              background: "transparent",
              appearance: "none",
              border: 0,
              margin: 0,
              padding: 0,
              color: d2("color"),
              fontFamily: "inherit",
              fontSize: "inherit",
              "&::-webkit-search-cancel-button": { display: "none", appearance: "none" },
            },
          },
        },
        {
          [`&-single:not(${t2}-customize)`]: {
            [`${t2}-input`]: { position: "absolute", inset: 0, lineHeight: "inherit" },
            [`${t2}-content`]: {
              ...qS,
              alignSelf: "center",
              "&-has-value": { display: "block", "&:before": { display: "none" } },
              "&-has-search-value": {
                color: "transparent",
                [`> *:not(${t2}-input)`]: { opacity: 0 },
              },
              "&-value": {
                transition: `all ${e6.motionDurationMid} ${e6.motionEaseInOut}`,
                zIndex: 1,
                opacity: 1,
              },
            },
            [`&${t2}-open ${t2}-content`]: {
              "&-has-value": { opacity: 0.25 },
              "&-has-search-value": {
                opacity: 1,
                transition: `opacity ${e6.motionDurationMid} ${e6.motionEaseInOut}`,
                color: "transparent",
                [`> *:not(${t2}-input)`]: { opacity: 0 },
              },
            },
          },
        },
        { [`&-show-search:not(${t2}-customize-input):not(${t2}-disabled)`]: { cursor: "text" } },
        rN(e6),
        aN(
          e6,
          "outlined",
          {
            border: e6.colorBorder,
            borderHover: e6.hoverBorderColor,
            borderActive: e6.activeBorderColor,
            borderOutline: e6.activeOutlineColor,
            borderDisabled: e6.colorBorderDisabled,
          },
          {
            border: e6.colorError,
            borderHover: e6.colorErrorBorderHover,
            borderActive: e6.colorError,
            borderOutline: e6.colorErrorOutline,
            affixColor: e6.colorErrorAffix,
          },
          {
            border: e6.colorWarning,
            borderHover: e6.colorWarningHover,
            borderActive: e6.colorWarning,
            borderOutline: e6.colorWarningOutline,
            affixColor: e6.colorWarningAffix,
          },
        ),
        aN(
          e6,
          "filled",
          {
            border: "transparent",
            borderHover: "transparent",
            borderActive: e6.activeBorderColor,
            borderOutline: "transparent",
            borderDisabled: e6.colorBorderDisabled,
            background: e6.colorFillTertiary,
            backgroundHover: e6.colorFillSecondary,
            backgroundActive: e6.colorBgContainer,
          },
          {
            color: e6.colorErrorText,
            background: e6.colorErrorBg,
            backgroundHover: e6.colorErrorBgHover,
            borderActive: e6.colorError,
          },
          {
            background: e6.colorWarningBg,
            backgroundHover: e6.colorWarningBgHover,
            borderActive: e6.colorWarning,
          },
        ),
        aN(
          e6,
          "borderless",
          {
            border: "transparent",
            borderHover: "transparent",
            borderActive: "transparent",
            borderOutline: "transparent",
            background: "transparent",
          },
          {},
          {},
          {
            [`&:not(${t2}-disabled):has(input:focus-visible), &:not(${t2}-disabled):has(textarea:focus-visible)`]:
              lN(e6, e6.activeBorderColor),
            [`&${t2}-status-error:not(${t2}-disabled):has(input:focus-visible), &${t2}-status-error:not(${t2}-disabled):has(textarea:focus-visible)`]:
              lN(e6, e6.colorError),
            [`&${t2}-status-warning:not(${t2}-disabled):has(input:focus-visible), &${t2}-status-warning:not(${t2}-disabled):has(textarea:focus-visible)`]:
              lN(e6, e6.colorWarning),
          },
        ),
        aN(
          e6,
          "underlined",
          {
            border: e6.colorBorder,
            borderHover: e6.hoverBorderColor,
            borderActive: e6.activeBorderColor,
            borderOutline: "transparent",
          },
          {
            border: e6.colorError,
            borderHover: e6.colorErrorBorderHover,
            borderActive: e6.colorError,
          },
          {
            border: e6.colorWarning,
            borderHover: e6.colorWarningHover,
            borderActive: e6.colorWarning,
          },
          { borderRadius: 0, borderTopColor: "transparent", borderInlineColor: "transparent" },
        ),
        nN(e6),
      ],
    };
  },
  sN = (e6) => {
    const {
        antCls: t2,
        componentCls: n2,
        motionDurationMid: r2,
        inputPaddingHorizontalBase: o2,
      } = e6,
      a2 = {
        [`${n2}-clear`]: { opacity: 1 },
        [`${n2}-suffix:not(:last-child)`]: { opacity: 0, pointerEvents: "none" },
        [`&${n2}-allow-clear:not(${n2}-show-arrow):not(${n2}-customize) ${n2}-content`]: {
          marginInlineEnd: e6.showArrowPaddingInlineEnd,
        },
      };
    return {
      [n2]: {
        ...XS(e6),
        [`${n2}-selection-item`]: {
          flex: 1,
          fontWeight: 400,
          position: "relative",
          userSelect: "none",
          ...qS,
          [`> ${t2}-typography`]: { display: "inline" },
        },
        [`${n2}-prefix`]: { flex: "none", marginInlineEnd: e6.selectAffixPadding },
        [`${n2}-clear`]: {
          position: "absolute",
          top: "50%",
          insetInlineStart: "auto",
          insetInlineEnd: o2,
          zIndex: 1,
          display: "inline-block",
          width: e6.fontSizeIcon,
          height: e6.fontSizeIcon,
          marginTop: e6.calc(e6.fontSizeIcon).mul(-1).div(2).equal(),
          padding: 0,
          background: "transparent",
          color: e6.colorTextQuaternary,
          fontSize: e6.fontSizeIcon,
          fontFamily: "inherit",
          fontStyle: "normal",
          lineHeight: 1,
          textAlign: "center",
          textTransform: "none",
          appearance: "none",
          border: 0,
          cursor: "pointer",
          opacity: 0,
          transition: ["color", "opacity"].map((e7) => `${e7} ${r2} ease`).join(", "),
          textRendering: "auto",
          transform: "translateZ(0)",
          "&:before": { display: "block" },
          "&:hover": { color: e6.colorIcon },
        },
        "@media(hover:none)": a2,
        "&:hover": a2,
      },
      [`${n2}-status`]: {
        "&-error, &-warning, &-success, &-validating": {
          [`&${n2}-has-feedback`]: {
            [`${n2}-clear`]: {
              insetInlineEnd: e6.calc(o2).add(e6.fontSize).add(e6.paddingXS).equal(),
            },
          },
        },
      },
    };
  },
  uN = (e6) => {
    const { componentCls: t2 } = e6;
    return [
      { [t2]: { [`&${t2}-in-form-item`]: { width: "100%" } } },
      sN(e6),
      tN(e6),
      { [`${t2}-rtl`]: { direction: "rtl" } },
      tP(e6, { focusElCls: `${t2}-focused` }),
    ];
  },
  cN = tx(
    "Select",
    (e6, { rootPrefixCls: t2 }) => {
      const n2 = UE(e6, {
        rootPrefixCls: t2,
        inputPaddingHorizontalBase: e6.calc(e6.paddingSM).sub(e6.lineWidth).equal(),
        multipleSelectItemHeight: e6.multipleItemHeight,
        selectHeight: e6.controlHeight,
      });
      return [uN(n2), iN(n2)];
    },
    (e6) => {
      const {
          fontSize: t2,
          lineHeight: n2,
          lineWidth: r2,
          lineWidthFocus: o2,
          controlHeight: a2,
          controlHeightSM: l2,
          controlHeightLG: i2,
          paddingXXS: s2,
          controlPaddingHorizontal: u2,
          zIndexPopupBase: c2,
          colorText: d2,
          fontWeightStrong: f2,
          controlItemBgActive: p2,
          controlItemBgHover: h2,
          colorBgContainer: m2,
          colorFillSecondary: g2,
          colorBgContainerDisabled: v2,
          colorTextDisabled: y2,
          colorPrimaryHover: b2,
          colorPrimary: w2,
          controlOutline: E2,
        } = e6,
        S2 = 2 * s2,
        x2 = 2 * r2,
        k2 = Math.min(a2 - S2, a2 - x2),
        C2 = Math.min(l2 - S2, l2 - x2),
        _2 = Math.min(i2 - S2, i2 - x2);
      return {
        lineWidthFocus: o2 === 0 ? 0 : r2,
        INTERNAL_FIXED_ITEM_MARGIN: Math.floor(s2 / 2),
        zIndexPopup: c2 + 50,
        optionSelectedColor: d2,
        optionSelectedFontWeight: f2,
        optionSelectedBg: p2,
        optionActiveBg: h2,
        optionPadding: `${(a2 - t2 * n2) / 2}px ${u2}px`,
        optionFontSize: t2,
        optionLineHeight: n2,
        optionHeight: a2,
        selectorBg: m2,
        clearBg: m2,
        singleItemHeightLG: i2,
        multipleItemBg: g2,
        multipleItemBorderColor: "transparent",
        multipleItemHeight: k2,
        multipleItemHeightSM: C2,
        multipleItemHeightLG: _2,
        multipleSelectorBgDisabled: v2,
        multipleItemColorDisabled: y2,
        multipleItemBorderColorDisabled: "transparent",
        showArrowPaddingInlineEnd: Math.ceil(1.25 * e6.fontSize),
        hoverBorderColor: b2,
        activeBorderColor: w2,
        activeOutlineColor: E2,
        selectAffixPadding: s2,
      };
    },
    { unitless: { optionLineHeight: !0, optionSelectedFontWeight: !0 } },
  ),
  dN = {
    icon: {
      tag: "svg",
      attrs: { viewBox: "64 64 896 896", focusable: "false" },
      children: [
        {
          tag: "path",
          attrs: {
            d: "M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z",
          },
        },
      ],
    },
    name: "check",
    theme: "outlined",
  };
function fN() {
  return (
    (fN = Object.assign
      ? Object.assign.bind()
      : function (e6) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = arguments[t2];
            for (var r2 in n2) Object.prototype.hasOwnProperty.call(n2, r2) && (e6[r2] = n2[r2]);
          }
          return e6;
        }),
    fN.apply(this, arguments)
  );
}
const pN = (e6, t2) => r.createElement(Cx, fN({}, e6, { ref: t2, icon: dN })),
  hN = r.forwardRef(pN),
  mN = {
    icon: {
      tag: "svg",
      attrs: { viewBox: "64 64 896 896", focusable: "false" },
      children: [
        {
          tag: "path",
          attrs: {
            d: "M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z",
          },
        },
      ],
    },
    name: "down",
    theme: "outlined",
  };
function gN() {
  return (
    (gN = Object.assign
      ? Object.assign.bind()
      : function (e6) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = arguments[t2];
            for (var r2 in n2) Object.prototype.hasOwnProperty.call(n2, r2) && (e6[r2] = n2[r2]);
          }
          return e6;
        }),
    gN.apply(this, arguments)
  );
}
const vN = (e6, t2) => r.createElement(Cx, gN({}, e6, { ref: t2, icon: mN })),
  yN = r.forwardRef(vN),
  bN = {
    icon: {
      tag: "svg",
      attrs: { viewBox: "64 64 896 896", focusable: "false" },
      children: [
        {
          tag: "path",
          attrs: {
            d: "M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z",
          },
        },
      ],
    },
    name: "search",
    theme: "outlined",
  };
function wN() {
  return (
    (wN = Object.assign
      ? Object.assign.bind()
      : function (e6) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n2 = arguments[t2];
            for (var r2 in n2) Object.prototype.hasOwnProperty.call(n2, r2) && (e6[r2] = n2[r2]);
          }
          return e6;
        }),
    wN.apply(this, arguments)
  );
}
const EN = (e6, t2) => r.createElement(Cx, wN({}, e6, { ref: t2, icon: bN })),
  SN = r.forwardRef(EN),
  xN = "SECRET_COMBOBOX_MODE_DO_NOT_USE",
  kN = (e6, t2) => {
    var n2, o2;
    const {
        prefixCls: a2,
        bordered: l2,
        className: s2,
        rootClassName: u2,
        getPopupContainer: c2,
        popupClassName: d2,
        dropdownClassName: f2,
        listHeight: p2 = 256,
        placement: h2,
        listItemHeight: m2,
        size: g2,
        disabled: v2,
        notFoundContent: y2,
        status: b2,
        builtinPlacements: w2,
        dropdownMatchSelectWidth: E2,
        popupMatchSelectWidth: S2,
        direction: x2,
        style: k2,
        allowClear: C2,
        variant: _2,
        popupStyle: P2,
        dropdownStyle: O2,
        transitionName: T2,
        tagRender: N2,
        maxCount: $2,
        prefix: M2,
        dropdownRender: R2,
        popupRender: L2,
        onDropdownVisibleChange: I2,
        onOpenChange: A2,
        styles: F2,
        classNames: z2,
        clearIcon: j2,
        showSearch: D2,
        ...H2
      } = e6,
      {
        getPopupContainer: V2,
        getPrefixCls: B2,
        renderEmpty: U2,
        direction: W2,
        virtual: q2,
        popupMatchSelectWidth: X2,
        popupOverflow: K2,
      } = r.useContext(Tb),
      {
        showSearch: G2,
        allowClear: Y2,
        style: Q2,
        styles: J2,
        className: Z2,
        classNames: ee2,
        clearIcon: te2,
        loadingIcon: ne2,
        menuItemSelectedIcon: re2,
        removeIcon: oe2,
        suffixIcon: ae2,
      } = $b("select"),
      [, le2] = WS(),
      ie2 = m2 ?? le2?.controlHeight,
      se2 = B2("select", a2),
      ue2 = B2(),
      ce2 = x2 ?? W2,
      { compactSize: de2, compactItemClassnames: fe2 } = O_(se2, ce2),
      [pe2, he2] = JT("select", _2, l2),
      me2 = Tk(se2),
      [ge2, ve2] = cN(se2, me2),
      ye2 = r.useMemo(() => {
        const { mode: t3 } = e6;
        if (t3 !== "combobox") return t3 === xN ? "combobox" : t3;
      }, [e6.mode]),
      be2 = ye2 === "multiple" || ye2 === "tags",
      we2 = (function (e7, t3) {
        return t3 !== void 0 ? t3 : e7 !== null;
      })(e6.suffixIcon, e6.showArrow),
      Ee2 = S2 ?? E2 ?? X2,
      Se2 =
        ((xe2 = L2 || R2),
        i.useMemo(() => {
          if (xe2) return (...e7) => i.createElement(sO, { space: !0 }, xe2.apply(void 0, e7));
        }, [xe2]));
    var xe2;
    const ke2 = A2 || I2,
      { status: Ce2, hasFeedback: _e2, isFormItemInput: Pe2, feedbackIcon: Oe2 } = r.useContext(aO),
      Te2 = VT(Ce2, b2);
    let Ne2;
    Ne2 =
      y2 !== void 0
        ? y2
        : ye2 === "combobox"
          ? null
          : U2?.("Select") || r.createElement(QT, { componentName: "Select" });
    const {
        suffixIcon: $e2,
        itemIcon: Me2,
        removeIcon: Re2,
        clearIcon: Le2,
      } = (function ({
        suffixIcon: e7,
        contextSuffixIcon: t3,
        clearIcon: n3,
        contextClearIcon: o3,
        menuItemSelectedIcon: a3,
        contextMenuItemSelectedIcon: l3,
        removeIcon: i2,
        contextRemoveIcon: s3,
        loading: u3,
        loadingIcon: c3,
        contextLoadingIcon: d3,
        searchIcon: f3,
        contextSearchIcon: p3,
        multiple: h3,
        hasFeedback: m3,
        showSuffixIcon: g3,
        feedbackIcon: v3,
        showArrow: y3,
        componentName: b3,
      }) {
        return r.useMemo(() => {
          const b4 = c_(n3, o3, r.createElement(Tx, null)),
            w3 = (t4) =>
              e7 !== null || m3 || y3
                ? r.createElement(r.Fragment, null, g3 !== !1 && t4, m3 && v3)
                : null;
          let E3 = null;
          return (
            (E3 =
              e7 !== void 0
                ? w3(e7)
                : u3
                  ? w3(c_(c3, d3, r.createElement(u_, { spin: !0 })))
                  : ({ open: e8, showSearch: n4 }) =>
                      w3(
                        e8 && n4
                          ? c_(f3, p3, r.createElement(SN, null))
                          : c_(t3, r.createElement(yN, null)),
                      )),
            {
              clearIcon: b4,
              suffixIcon: E3,
              itemIcon: c_(a3, l3, h3 ? r.createElement(hN, null) : null),
              removeIcon: c_(i2, s3, r.createElement(Rx, null)),
            }
          );
        }, [e7, t3, n3, o3, a3, l3, i2, s3, u3, c3, d3, f3, p3, h3, m3, g3, v3, y3]);
      })({
        ...H2,
        multiple: be2,
        hasFeedback: _e2,
        feedbackIcon: Oe2,
        showSuffixIcon: we2,
        prefixCls: se2,
        componentName: "Select",
        clearIcon: j2,
        searchIcon: DT(D2, "searchIcon"),
        contextClearIcon: te2,
        contextLoadingIcon: ne2,
        contextMenuItemSelectedIcon: re2,
        contextRemoveIcon: oe2,
        contextSearchIcon: DT(G2, "searchIcon"),
        contextSuffixIcon: ae2,
      }),
      Ie2 = C2 ?? Y2,
      Ae2 = Ie2 === !0 ? { clearIcon: Le2 } : Ie2,
      Fe2 = D2 ?? G2,
      ze2 = Gy(H2, ["suffixIcon", "itemIcon"]),
      je2 = C_((e7) => g2 ?? de2 ?? e7),
      De2 = r.useContext(HC),
      He2 = v2 ?? De2,
      Ve2 = { ...e6, variant: pe2, status: Te2, disabled: He2, size: je2 },
      Be2 = _k(Q2),
      Ue2 = _k(k2),
      [We2, qe2] = Ok(
        [ee2, z2],
        [J2, Be2, F2, Ue2],
        { props: Ve2 },
        { popup: { _default: "root" } },
      ),
      Xe2 = Sb(
        We2.popup.root,
        d2,
        f2,
        { [`${se2}-dropdown-${ce2}`]: ce2 === "rtl" },
        u2,
        ve2,
        me2,
        ge2,
      ),
      Ke2 = { ...((n2 = qe2.popup) == null ? void 0 : n2.root), ...(P2 ?? O2) },
      Ge2 = Sb(
        {
          [`${se2}-lg`]: je2 === "large",
          [`${se2}-sm`]: je2 === "small",
          [`${se2}-rtl`]: ce2 === "rtl",
          [`${se2}-${pe2}`]: he2,
          [`${se2}-in-form-item`]: Pe2,
        },
        HT(se2, Te2, _e2),
        fe2,
        Z2,
        s2,
        We2.root,
        u2,
        ve2,
        me2,
        ge2,
      ),
      Ye2 = r.useMemo(
        () => (h2 !== void 0 ? h2 : ce2 === "rtl" ? "bottomRight" : "bottomLeft"),
        [h2, ce2],
      ),
      [Qe2] = y_("SelectLike", ((o2 = qe2.popup.root) == null ? void 0 : o2.zIndex) ?? Ke2.zIndex);
    return r.createElement(jT, {
      ref: t2,
      virtual: q2,
      classNames: We2,
      styles: qe2,
      showSearch: Fe2,
      ...ze2,
      style: qe2.root,
      popupMatchSelectWidth: Ee2,
      transitionName: k_(ue2, "slide-up", T2),
      builtinPlacements: ZT(w2, K2),
      listHeight: p2,
      listItemHeight: ie2,
      mode: ye2,
      prefixCls: se2,
      placement: Ye2,
      direction: ce2,
      prefix: M2,
      suffixIcon: $e2,
      menuItemSelectedIcon: Me2,
      removeIcon: Re2,
      allowClear: Ae2,
      notFoundContent: Ne2,
      className: Ge2,
      getPopupContainer: c2 || V2,
      popupClassName: Xe2,
      disabled: He2,
      popupStyle: { ...qe2.popup.root, ...Ke2, zIndex: Qe2 },
      maxCount: be2 ? $2 : void 0,
      tagRender: be2 ? N2 : void 0,
      popupRender: Se2,
      onPopupVisibleChange: ke2,
    });
  },
  CN = r.forwardRef(kN),
  _N = cO(CN, "popupAlign");
(CN.SECRET_COMBOBOX_MODE_DO_NOT_USE = xN),
  (CN.Option = lT),
  (CN.OptGroup = aT),
  (CN._InternalPanelDoNotUseOrYouWillBeFired = _N);
const PN = CN;
var ON,
  TN = {},
  NN = { exports: {} };
((ON = NN).exports = function (e6) {
  return e6 && e6.__esModule ? e6 : { default: e6 };
}),
  (ON.exports.__esModule = !0),
  (ON.exports.default = ON.exports);
var $N = NN.exports,
  MN = {};
Object.defineProperty(MN, "__esModule", { value: !0 }),
  (MN.default = void 0),
  (MN.default = {
    items_per_page: "\u6761/\u9875",
    jump_to: "\u8DF3\u81F3",
    jump_to_confirm: "\u786E\u5B9A",
    page: "\u9875",
    prev_page: "\u4E0A\u4E00\u9875",
    next_page: "\u4E0B\u4E00\u9875",
    prev_5: "\u5411\u524D 5 \u9875",
    next_5: "\u5411\u540E 5 \u9875",
    prev_3: "\u5411\u524D 3 \u9875",
    next_3: "\u5411\u540E 3 \u9875",
    page_size: "\u9875\u7801",
  });
var RN = {},
  LN = {},
  IN = {};
Object.defineProperty(IN, "__esModule", { value: !0 }), (IN.default = void 0);
const AN = {
  ...Lk.commonLocale,
  locale: "zh_CN",
  today: "\u4ECA\u5929",
  now: "\u6B64\u523B",
  backToToday: "\u8FD4\u56DE\u4ECA\u5929",
  ok: "\u786E\u5B9A",
  timeSelect: "\u9009\u62E9\u65F6\u95F4",
  dateSelect: "\u9009\u62E9\u65E5\u671F",
  weekSelect: "\u9009\u62E9\u5468",
  clear: "\u6E05\u9664",
  week: "\u5468",
  month: "\u6708",
  year: "\u5E74",
  previousMonth: "\u4E0A\u4E2A\u6708",
  nextMonth: "\u4E0B\u4E2A\u6708",
  monthSelect: "\u9009\u62E9\u6708\u4EFD",
  yearSelect: "\u9009\u62E9\u5E74\u4EFD",
  decadeSelect: "\u9009\u62E9\u5E74\u4EE3",
  previousYear: "\u4E0A\u4E00\u5E74",
  nextYear: "\u4E0B\u4E00\u5E74",
  previousDecade: "\u4E0A\u4E00\u5E74\u4EE3",
  nextDecade: "\u4E0B\u4E00\u5E74\u4EE3",
  previousCentury: "\u4E0A\u4E00\u4E16\u7EAA",
  nextCentury: "\u4E0B\u4E00\u4E16\u7EAA",
  yearFormat: "YYYY\u5E74",
  cellDateFormat: "D",
  monthBeforeYear: !1,
};
IN.default = AN;
var FN = {};
Object.defineProperty(FN, "__esModule", { value: !0 }),
  (FN.default = void 0),
  (FN.default = {
    placeholder: "\u8BF7\u9009\u62E9\u65F6\u95F4",
    rangePlaceholder: ["\u5F00\u59CB\u65F6\u95F4", "\u7ED3\u675F\u65F6\u95F4"],
  });
var zN = $N.default;
Object.defineProperty(LN, "__esModule", { value: !0 }), (LN.default = void 0);
var jN = zN(IN),
  DN = zN(FN);
const HN = {
  lang: {
    placeholder: "\u8BF7\u9009\u62E9\u65E5\u671F",
    yearPlaceholder: "\u8BF7\u9009\u62E9\u5E74\u4EFD",
    quarterPlaceholder: "\u8BF7\u9009\u62E9\u5B63\u5EA6",
    monthPlaceholder: "\u8BF7\u9009\u62E9\u6708\u4EFD",
    weekPlaceholder: "\u8BF7\u9009\u62E9\u5468",
    rangePlaceholder: ["\u5F00\u59CB\u65E5\u671F", "\u7ED3\u675F\u65E5\u671F"],
    rangeYearPlaceholder: ["\u5F00\u59CB\u5E74\u4EFD", "\u7ED3\u675F\u5E74\u4EFD"],
    rangeMonthPlaceholder: ["\u5F00\u59CB\u6708\u4EFD", "\u7ED3\u675F\u6708\u4EFD"],
    rangeQuarterPlaceholder: ["\u5F00\u59CB\u5B63\u5EA6", "\u7ED3\u675F\u5B63\u5EA6"],
    rangeWeekPlaceholder: ["\u5F00\u59CB\u5468", "\u7ED3\u675F\u5468"],
    ...jN.default,
  },
  timePickerLocale: { ...DN.default },
};
(HN.lang.ok = "\u786E\u5B9A"), (LN.default = HN);
var VN = $N.default;
Object.defineProperty(RN, "__esModule", { value: !0 }), (RN.default = void 0);
var BN = VN(LN);
RN.default = BN.default;
var UN = $N.default;
Object.defineProperty(TN, "__esModule", { value: !0 }), (TN.default = void 0);
var WN = UN(MN),
  qN = UN(RN),
  XN = UN(LN),
  KN = UN(FN);
const GN = "${label}\u4E0D\u662F\u4E00\u4E2A\u6709\u6548\u7684${type}",
  YN = {
    locale: "zh-cn",
    Pagination: WN.default,
    DatePicker: XN.default,
    TimePicker: KN.default,
    Calendar: qN.default,
    global: {
      placeholder: "\u8BF7\u9009\u62E9",
      close: "\u5173\u95ED",
      sortable: "\u53EF\u6392\u5E8F",
      show: "\u663E\u793A",
      hide: "\u9690\u85CF",
    },
    Table: {
      filterTitle: "\u7B5B\u9009",
      filterConfirm: "\u786E\u5B9A",
      filterReset: "\u91CD\u7F6E",
      filterEmptyText: "\u65E0\u7B5B\u9009\u9879",
      filterCheckAll: "\u5168\u9009",
      filterSearchPlaceholder: "\u5728\u7B5B\u9009\u9879\u4E2D\u641C\u7D22",
      emptyText: "\u6682\u65E0\u6570\u636E",
      selectAll: "\u5168\u9009\u5F53\u9875",
      selectInvert: "\u53CD\u9009\u5F53\u9875",
      selectNone: "\u6E05\u7A7A\u6240\u6709",
      selectionAll: "\u5168\u9009\u6240\u6709",
      sortTitle: "\u6392\u5E8F",
      expand: "\u5C55\u5F00\u884C",
      collapse: "\u5173\u95ED\u884C",
      triggerDesc: "\u70B9\u51FB\u964D\u5E8F",
      triggerAsc: "\u70B9\u51FB\u5347\u5E8F",
      cancelSort: "\u53D6\u6D88\u6392\u5E8F",
    },
    Modal: { okText: "\u786E\u5B9A", cancelText: "\u53D6\u6D88", justOkText: "\u77E5\u9053\u4E86" },
    Tour: {
      Next: "\u4E0B\u4E00\u6B65",
      Previous: "\u4E0A\u4E00\u6B65",
      Finish: "\u7ED3\u675F\u5BFC\u89C8",
    },
    Popconfirm: { cancelText: "\u53D6\u6D88", okText: "\u786E\u5B9A" },
    Transfer: {
      titles: ["", ""],
      searchPlaceholder: "\u8BF7\u8F93\u5165\u641C\u7D22\u5185\u5BB9",
      itemUnit: "\u9879",
      itemsUnit: "\u9879",
      remove: "\u5220\u9664",
      selectCurrent: "\u5168\u9009\u5F53\u9875",
      removeCurrent: "\u5220\u9664\u5F53\u9875",
      selectAll: "\u5168\u9009\u6240\u6709",
      deselectAll: "\u53D6\u6D88\u5168\u9009",
      removeAll: "\u5220\u9664\u5168\u90E8",
      selectInvert: "\u53CD\u9009\u5F53\u9875",
    },
    Upload: {
      uploading: "\u6587\u4EF6\u4E0A\u4F20\u4E2D",
      removeFile: "\u5220\u9664\u6587\u4EF6",
      uploadError: "\u4E0A\u4F20\u9519\u8BEF",
      previewFile: "\u9884\u89C8\u6587\u4EF6",
      downloadFile: "\u4E0B\u8F7D\u6587\u4EF6",
    },
    Empty: { description: "\u6682\u65E0\u6570\u636E" },
    Icon: { icon: "\u56FE\u6807" },
    Text: {
      edit: "\u7F16\u8F91",
      copy: "\u590D\u5236",
      copied: "\u590D\u5236\u6210\u529F",
      expand: "\u5C55\u5F00",
      collapse: "\u6536\u8D77",
    },
    Carousel: {
      prevSlide: "\u4E0A\u4E00\u5F20\u5E7B\u706F\u7247",
      nextSlide: "\u4E0B\u4E00\u5F20\u5E7B\u706F\u7247",
    },
    Form: {
      optional: "\uFF08\u53EF\u9009\uFF09",
      defaultValidateMessages: {
        default: "\u5B57\u6BB5\u9A8C\u8BC1\u9519\u8BEF${label}",
        required: "\u8BF7\u8F93\u5165${label}",
        enum: "${label}\u5FC5\u987B\u662F\u5176\u4E2D\u4E00\u4E2A[${enum}]",
        whitespace: "${label}\u4E0D\u80FD\u4E3A\u7A7A\u5B57\u7B26",
        date: {
          format: "${label}\u65E5\u671F\u683C\u5F0F\u65E0\u6548",
          parse: "${label}\u4E0D\u80FD\u8F6C\u6362\u4E3A\u65E5\u671F",
          invalid: "${label}\u662F\u4E00\u4E2A\u65E0\u6548\u65E5\u671F",
        },
        types: {
          string: GN,
          method: GN,
          array: GN,
          object: GN,
          number: GN,
          date: GN,
          boolean: GN,
          integer: GN,
          float: GN,
          regexp: GN,
          email: GN,
          url: GN,
          hex: GN,
        },
        string: {
          len: "${label}\u987B\u4E3A${len}\u4E2A\u5B57\u7B26",
          min: "${label}\u6700\u5C11${min}\u4E2A\u5B57\u7B26",
          max: "${label}\u6700\u591A${max}\u4E2A\u5B57\u7B26",
          range: "${label}\u987B\u5728${min}-${max}\u5B57\u7B26\u4E4B\u95F4",
        },
        number: {
          len: "${label}\u5FC5\u987B\u7B49\u4E8E${len}",
          min: "${label}\u6700\u5C0F\u503C\u4E3A${min}",
          max: "${label}\u6700\u5927\u503C\u4E3A${max}",
          range: "${label}\u987B\u5728${min}-${max}\u4E4B\u95F4",
        },
        array: {
          len: "\u987B\u4E3A${len}\u4E2A${label}",
          min: "\u6700\u5C11${min}\u4E2A${label}",
          max: "\u6700\u591A${max}\u4E2A${label}",
          range: "${label}\u6570\u91CF\u987B\u5728${min}-${max}\u4E4B\u95F4",
        },
        pattern: { mismatch: "${label}\u4E0E\u6A21\u5F0F\u4E0D\u5339\u914D${pattern}" },
      },
    },
    QRCode: {
      expired: "\u4E8C\u7EF4\u7801\u8FC7\u671F",
      refresh: "\u70B9\u51FB\u5237\u65B0",
      scanned: "\u5DF2\u626B\u63CF",
    },
    ColorPicker: {
      presetEmpty: "\u6682\u65E0",
      transparent: "\u65E0\u8272",
      singleColor: "\u5355\u8272",
      gradientColor: "\u6E10\u53D8\u8272",
    },
  };
TN.default = YN;
const QN = l(TN);
var JN = {},
  ZN = {},
  e$ = {},
  t$ = {};
Object.defineProperty(t$, "__esModule", { value: !0 }),
  (t$.default = void 0),
  (t$.default = { placeholder: "Select time", rangePlaceholder: ["Start time", "End time"] });
var n$ = $N.default;
Object.defineProperty(e$, "__esModule", { value: !0 }), (e$.default = void 0);
var r$ = n$(Rk),
  o$ = n$(t$);
const a$ = {
  lang: {
    placeholder: "Select date",
    yearPlaceholder: "Select year",
    quarterPlaceholder: "Select quarter",
    monthPlaceholder: "Select month",
    weekPlaceholder: "Select week",
    rangePlaceholder: ["Start date", "End date"],
    rangeYearPlaceholder: ["Start year", "End year"],
    rangeQuarterPlaceholder: ["Start quarter", "End quarter"],
    rangeMonthPlaceholder: ["Start month", "End month"],
    rangeWeekPlaceholder: ["Start week", "End week"],
    ...r$.default,
  },
  timePickerLocale: { ...o$.default },
};
e$.default = a$;
var l$ = $N.default;
Object.defineProperty(ZN, "__esModule", { value: !0 }), (ZN.default = void 0);
var i$ = l$(e$);
ZN.default = i$.default;
var s$ = $N.default;
Object.defineProperty(JN, "__esModule", { value: !0 }), (JN.default = void 0);
var u$ = s$($k),
  c$ = s$(ZN),
  d$ = s$(e$),
  f$ = s$(t$);
const p$ = "${label} is not a valid ${type}",
  h$ = {
    locale: "en",
    Pagination: u$.default,
    DatePicker: d$.default,
    TimePicker: f$.default,
    Calendar: c$.default,
    global: {
      placeholder: "Please select",
      close: "Close",
      sortable: "sortable",
      show: "Show",
      hide: "Hide",
    },
    Table: {
      filterTitle: "Filter menu",
      filterConfirm: "OK",
      filterReset: "Reset",
      filterEmptyText: "No filters",
      filterCheckAll: "Select all items",
      filterSearchPlaceholder: "Search in filters",
      emptyText: "No data",
      selectAll: "Select current page",
      selectInvert: "Invert current page",
      selectNone: "Clear all data",
      selectionAll: "Select all data",
      sortTitle: "Sort",
      expand: "Expand row",
      collapse: "Collapse row",
      triggerDesc: "Click to sort descending",
      triggerAsc: "Click to sort ascending",
      cancelSort: "Click to cancel sorting",
    },
    Tour: { Next: "Next", Previous: "Previous", Finish: "Finish" },
    Modal: { okText: "OK", cancelText: "Cancel", justOkText: "OK" },
    Popconfirm: { okText: "OK", cancelText: "Cancel" },
    Transfer: {
      titles: ["", ""],
      searchPlaceholder: "Search here",
      itemUnit: "item",
      itemsUnit: "items",
      remove: "Remove",
      selectCurrent: "Select current page",
      removeCurrent: "Remove current page",
      selectAll: "Select all data",
      deselectAll: "Deselect all data",
      removeAll: "Remove all data",
      selectInvert: "Invert current page",
    },
    Upload: {
      uploading: "Uploading...",
      removeFile: "Remove file",
      uploadError: "Upload error",
      previewFile: "Preview file",
      downloadFile: "Download file",
    },
    Empty: { description: "No data" },
    Icon: { icon: "icon" },
    Text: { edit: "Edit", copy: "Copy", copied: "Copied", expand: "Expand", collapse: "Collapse" },
    Carousel: { prevSlide: "Previous slide", nextSlide: "Next slide" },
    Form: {
      optional: "(optional)",
      defaultValidateMessages: {
        default: "Field validation error for ${label}",
        required: "Please enter ${label}",
        enum: "${label} must be one of [${enum}]",
        whitespace: "${label} cannot be a blank character",
        date: {
          format: "${label} date format is invalid",
          parse: "${label} cannot be converted to a date",
          invalid: "${label} is an invalid date",
        },
        types: {
          string: p$,
          method: p$,
          array: p$,
          object: p$,
          number: p$,
          date: p$,
          boolean: p$,
          integer: p$,
          float: p$,
          regexp: p$,
          email: p$,
          url: p$,
          hex: p$,
        },
        string: {
          len: "${label} must be ${len} characters",
          min: "${label} must be at least ${min} characters",
          max: "${label} must be up to ${max} characters",
          range: "${label} must be between ${min}-${max} characters",
        },
        number: {
          len: "${label} must be equal to ${len}",
          min: "${label} must be minimum ${min}",
          max: "${label} must be maximum ${max}",
          range: "${label} must be between ${min}-${max}",
        },
        array: {
          len: "Must be ${len} ${label}",
          min: "At least ${min} ${label}",
          max: "At most ${max} ${label}",
          range: "The amount of ${label} must be between ${min}-${max}",
        },
        pattern: { mismatch: "${label} does not match the pattern ${pattern}" },
      },
    },
    QRCode: { expired: "QR code expired", refresh: "Refresh", scanned: "Scanned" },
    ColorPicker: {
      presetEmpty: "Empty",
      transparent: "Transparent",
      singleColor: "Single",
      gradientColor: "Gradient",
    },
  };
JN.default = h$;
const m$ = l(JN),
  g$ = Object.assign({
    "../multilingual/values-am/string.json": () => bm(() => import("./string-bdc23ec0.read.js"), []),
    "../multilingual/values-ar/string.json": () => bm(() => import("./string-43a0ce05.read.js"), []),
    "../multilingual/values-as-rIN/string.json": () => bm(() => import("./string-03c43076.read.js"), []),
    "../multilingual/values-az-rAZ/string.json": () => bm(() => import("./string-5ae8c19f.read.js"), []),
    "../multilingual/values-be/string.json": () => bm(() => import("./string-21cb7f32.read.js"), []),
    "../multilingual/values-bg/string.json": () => bm(() => import("./string-34566463.read.js"), []),
    "../multilingual/values-bn-rBD/string.json": () => bm(() => import("./string-f646c373.read.js"), []),
    "../multilingual/values-bn-rIN/string.json": () => bm(() => import("./string-2a831755.read.js"), []),
    "../multilingual/values-bo-rCN/string.json": () => bm(() => import("./string-17121473.read.js"), []),
    "../multilingual/values-bs/string.json": () => bm(() => import("./string-9d529e35.read.js"), []),
    "../multilingual/values-ca/string.json": () => bm(() => import("./string-98374b2f.read.js"), []),
    "../multilingual/values-cs/string.json": () => bm(() => import("./string-5a268289.read.js"), []),
    "../multilingual/values-da/string.json": () => bm(() => import("./string-77b09e31.read.js"), []),
    "../multilingual/values-de/string.json": () => bm(() => import("./string-aeb1faa0.read.js"), []),
    "../multilingual/values-el/string.json": () => bm(() => import("./string-2d35742a.read.js"), []),
    "../multilingual/values-en-rAU/string.json": () => bm(() => import("./string-e9406e1e.read.js"), []),
    "../multilingual/values-en-rGB/string.json": () => bm(() => import("./string-a751ea57.read.js"), []),
    "../multilingual/values-en-rIN/string.json": () => bm(() => import("./string-796af41f.read.js"), []),
    "../multilingual/values-es-rUS/string.json": () => bm(() => import("./string-867388a3.read.js"), []),
    "../multilingual/values-es/string.json": () => bm(() => import("./string-95304ed0.read.js"), []),
    "../multilingual/values-et-rEE/string.json": () => bm(() => import("./string-0972a682.read.js"), []),
    "../multilingual/values-eu-rES/string.json": () => bm(() => import("./string-8c8597f1.read.js"), []),
    "../multilingual/values-fa-rIR/string.json": () => bm(() => import("./string-8123a8f6.read.js"), []),
    "../multilingual/values-fi/string.json": () => bm(() => import("./string-09c88dee.read.js"), []),
    "../multilingual/values-fr/string.json": () => bm(() => import("./string-89ba15eb.read.js"), []),
    "../multilingual/values-gl-rES/string.json": () => bm(() => import("./string-491b9b7c.read.js"), []),
    "../multilingual/values-gu-rIN/string.json": () => bm(() => import("./string-47693cd6.read.js"), []),
    "../multilingual/values-ha-rNG/string.json": () => bm(() => import("./string-37055cd1.read.js"), []),
    "../multilingual/values-hi/string.json": () => bm(() => import("./string-d03d34c3.read.js"), []),
    "../multilingual/values-hr/string.json": () => bm(() => import("./string-0bc1e6e2.read.js"), []),
    "../multilingual/values-hu/string.json": () => bm(() => import("./string-afb5d523.read.js"), []),
    "../multilingual/values-hy-rAM/string.json": () => bm(() => import("./string-5f1e6eda.read.js"), []),
    "../multilingual/values-in/string.json": () => bm(() => import("./string-c7eef30b.read.js"), []),
    "../multilingual/values-it/string.json": () => bm(() => import("./string-51836d2a.read.js"), []),
    "../multilingual/values-iw-rIL/string.json": () => bm(() => import("./string-a6192997.read.js"), []),
    "../multilingual/values-ja/string.json": () => bm(() => import("./string-3abc5654.read.js"), []),
    "../multilingual/values-ka-rGE/string.json": () => bm(() => import("./string-0a770a5c.read.js"), []),
    "../multilingual/values-kk-rKZ/string.json": () => bm(() => import("./string-cb5899f8.read.js"), []),
    "../multilingual/values-km-rKH/string.json": () => bm(() => import("./string-cb05a37b.read.js"), []),
    "../multilingual/values-kn-rIN/string.json": () => bm(() => import("./string-be3a95f0.read.js"), []),
    "../multilingual/values-ko/string.json": () => bm(() => import("./string-2be2613e.read.js"), []),
    "../multilingual/values-lo-rLA/string.json": () => bm(() => import("./string-9efa61c3.read.js"), []),
    "../multilingual/values-lt/string.json": () => bm(() => import("./string-eee9ec69.read.js"), []),
    "../multilingual/values-lv/string.json": () => bm(() => import("./string-3f7d80f9.read.js"), []),
    "../multilingual/values-mk-rMK/string.json": () => bm(() => import("./string-12a7439a.read.js"), []),
    "../multilingual/values-ml-rIN/string.json": () => bm(() => import("./string-4e5f85ac.read.js"), []),
    "../multilingual/values-mr-rIN/string.json": () => bm(() => import("./string-b5d50a1e.read.js"), []),
    "../multilingual/values-ms-rMY/string.json": () => bm(() => import("./string-8e021ab3.read.js"), []),
    "../multilingual/values-mt-rMT/string.json": () => bm(() => import("./string-30e5a1b2.read.js"), []),
    "../multilingual/values-my-rMM/string.json": () => bm(() => import("./string-f2cb11a8.read.js"), []),
    "../multilingual/values-nb/string.json": () => bm(() => import("./string-27eada3b.read.js"), []),
    "../multilingual/values-ne-rIN/string.json": () => bm(() => import("./string-7a895a5c.read.js"), []),
    "../multilingual/values-ne-rNP/string.json": () => bm(() => import("./string-74109861.read.js"), []),
    "../multilingual/values-nl/string.json": () => bm(() => import("./string-22a7809e.read.js"), []),
    "../multilingual/values-or-rIN/string.json": () => bm(() => import("./string-ba45a733.read.js"), []),
    "../multilingual/values-pa-rIN/string.json": () => bm(() => import("./string-0b3fae03.read.js"), []),
    "../multilingual/values-pl/string.json": () => bm(() => import("./string-d27b7c62.read.js"), []),
    "../multilingual/values-pt-rBR/string.json": () => bm(() => import("./string-072b36a9.read.js"), []),
    "../multilingual/values-pt-rPT/string.json": () => bm(() => import("./string-9d6d9948.read.js"), []),
    "../multilingual/values-ro/string.json": () => bm(() => import("./string-71962b5c.read.js"), []),
    "../multilingual/values-ru/string.json": () => bm(() => import("./string-f460fc52.read.js"), []),
    "../multilingual/values-sk/string.json": () => bm(() => import("./string-50e8481b.read.js"), []),
    "../multilingual/values-sl/string.json": () => bm(() => import("./string-7ef178fd.read.js"), []),
    "../multilingual/values-sq-rAL/string.json": () => bm(() => import("./string-d2a1a04b.read.js"), []),
    "../multilingual/values-sr/string.json": () => bm(() => import("./string-34d51461.read.js"), []),
    "../multilingual/values-sv/string.json": () => bm(() => import("./string-9331bfa9.read.js"), []),
    "../multilingual/values-sw/string.json": () => bm(() => import("./string-33ef4345.read.js"), []),
    "../multilingual/values-ta-rIN/string.json": () => bm(() => import("./string-b03480b0.read.js"), []),
    "../multilingual/values-te-rIN/string.json": () => bm(() => import("./string-5a536782.read.js"), []),
    "../multilingual/values-th/string.json": () => bm(() => import("./string-fb44ec18.read.js"), []),
    "../multilingual/values-tr/string.json": () => bm(() => import("./string-35e11642.read.js"), []),
    "../multilingual/values-ug-rCN/string.json": () => bm(() => import("./string-bef00118.read.js"), []),
    "../multilingual/values-uk/string.json": () => bm(() => import("./string-bb5808ae.read.js"), []),
    "../multilingual/values-ur-rIN/string.json": () => bm(() => import("./string-1549942e.read.js"), []),
    "../multilingual/values-ur-rPK/string.json": () => bm(() => import("./string-ad6b9eb6.read.js"), []),
    "../multilingual/values-uz-rUZ/string.json": () => bm(() => import("./string-fec4e459.read.js"), []),
    "../multilingual/values-vi/string.json": () => bm(() => import("./string-cb98c879.read.js"), []),
    "../multilingual/values-zh-rCN/string.json": () => bm(() => import("./string-54d4ecc9.read.js"), []),
    "../multilingual/values-zh-rHK/string.json": () => bm(() => import("./string-0aa6b912.read.js"), []),
    "../multilingual/values-zh-rTW/string.json": () => bm(() => import("./string-0fcade0d.read.js"), []),
    "../multilingual/values/string.json": () => bm(() => import("./string-cca7247e.read.js"), []),
  });
function v$(e6) {
  return `../multilingual/${e6}/string.json`;
}
function y$(e6) {
  const [t2, n2] = r.useState(null),
    [o2, a2] = r.useState(!0);
  return (
    r.useEffect(() => {
      let t3 = !1;
      return (
        (async function () {
          var r2;
          a2(!0);
          const o3 = (function (e7) {
              if (!e7) return "values";
              const t4 = e7.replace(/_/g, "-").split("-");
              if (t4.length === 1) return `values-${t4[0].toLowerCase()}`;
              const n3 = t4[0].toLowerCase();
              let r3 = t4[t4.length - 1];
              return r3.startsWith("r") && r3.length === 3
                ? `values-${n3}-${r3}`
                : `values-${n3}-r${r3.toUpperCase()}`;
            })(e6),
            l2 = e6 ? e6.replace(/_/g, "-").split("-")[0].toLowerCase() : null,
            i2 = [v$(o3), l2 ? v$(`values-${l2}`) : null, v$("values")].filter(Boolean);
          for (const e7 of i2) {
            const o4 = g$[e7];
            if (o4)
              try {
                const e8 = await o4();
                if (!t3) {
                  const t4 = e8.default || e8,
                    o5 = Object.keys(t4)[0];
                  n2(((r2 = t4[o5]) == null ? void 0 : r2.translation) || {}), a2(!1);
                }
                return;
              } catch {}
          }
          t3 || (n2({}), a2(!1));
        })(),
        () => {
          t3 = !0;
        }
      );
    }, [e6]),
    {
      t: (e7) => {
        const n3 = t2?.[e7];
        return n3 === void 0
          ? e7
          : typeof n3 == "string" && n3.startsWith("\u672A\u77E5")
            ? "--"
            : n3;
      },
      loading: o2,
      translations: t2,
    }
  );
}
const b$ = "xiaomi-powerbank-lang",
  w$ = ["zh-rCN", "en"],
  E$ = ["CN", "HK", "MO", "TW"];
async function S$() {
  var e6, t2;
  try {
    const n2 = await fetch("/eco--usb-device-web/static/xiaomi.svg"),
      r2 =
        (t2 = (e6 = n2?.headers) == null ? void 0 : e6.get) == null
          ? void 0
          : t2.call(e6, "lbs-info");
    return r2
      ? (function (e7) {
          var t3;
          if (typeof e7 != "string" || !e7) return "en";
          const n3 = (t3 = e7.split("-")[0]) == null ? void 0 : t3.toUpperCase();
          return E$.includes(n3) ? "zh-rCN" : "en";
        })(r2)
      : null;
  } catch {
    return null;
  }
}
function x$() {
  try {
    const e6 = localStorage.getItem(b$);
    return w$.includes(e6) ? e6 : null;
  } catch {
    return null;
  }
}
const k$ = {
    panel_page_title: "\u5C0F\u7C73\u79FB\u52A8\u7535\u6E90\u8BE6\u60C5",
    panel_page_subtitle:
      "\u8FDE\u63A5\u5C0F\u7C73\u79FB\u52A8\u7535\u6E90\u81F3\u6B64\u8BA1\u7B97\u673A\uFF0C\u67E5\u770B\u8BBE\u5907\u8BE6\u7EC6\u4FE1\u606F\u53CA\u5F02\u5E38\u8BB0\u5F55\u3002",
    panel_connect_button: "\u5EFA\u7ACB\u8FDE\u63A5",
    panel_connected_button: "\u5DF2\u8FDE\u63A5",
    panel_disconnect_button: "\u65AD\u5F00\u8FDE\u63A5",
    panel_tab_details: "\u8BE6\u7EC6\u4FE1\u606F",
    panel_tab_exceptions: "\u5F02\u5E38\u8BB0\u5F55",
    panel_disconnect_modal_title: "\u65AD\u5F00\u8FDE\u63A5\uFF1F",
    panel_disconnect_modal_content:
      "\u786E\u8BA4\u65AD\u5F00\u8FDE\u63A5\uFF1F\u65AD\u5F00\u540E\u5C06\u65E0\u6CD5\u67E5\u770B\u79FB\u52A8\u7535\u6E90\u8BE6\u60C5",
    panel_modal_ok: "\u786E\u5B9A",
    panel_modal_cancel: "\u53D6\u6D88",
    panel_how_to_view: "\u67E5\u770B\u65B9\u6CD5",
    panel_step_1: "\u7B2C\u4E00\u6B65",
    panel_step1_desc:
      "\u7528 USB-C\u6570\u636E\u7EBF \u5C06\u5C0F\u7C73\u79FB\u52A8\u7535\u6E90 \u300C\u6307\u5B9AUSB-C\u53E3\u300D \u8FDE\u63A5\u81F3\u7535\u8111",
    panel_step1_tip_port:
      "\u4E0D\u540C\u578B\u53F7\u79FB\u52A8\u7535\u6E90\u7684\u300C\u6307\u5B9AUSB-C\u53E3\u300D\u4E0D\u540C\u3002",
    panel_step1_link_models:
      "\u67E5\u770B\u652F\u6301\u7684\u8BBE\u5907\u578B\u53F7\u53CA\u63A5\u53E3\u8BE6\u60C5",
    panel_step1_tip_cable:
      "\u8BF7\u4F7F\u7528\u652F\u6301\u6570\u636E\u4F20\u8F93\u529F\u80FD\u7684USB-C\u7EBF\uFF08\u53EF\u7528\u4E8E\u7535\u8111\u548C\u624B\u673A\u95F4\u7684\u6587\u4EF6\u4E92\u4F20\uFF09",
    panel_step_2: "\u7B2C\u4E8C\u6B65",
    panel_step2_desc:
      "\u8FDE\u7EED\u5FEB\u901F\u63098\u6B21\u79FB\u52A8\u7535\u6E90\u4E0A\u7684\u6309\u952E\uFF0C\u8FDB\u5165\u6570\u636E\u4F20\u8F93\u6A21\u5F0F",
    panel_step_3: "\u7B2C\u4E09\u6B65",
    panel_step3_desc:
      '\u70B9\u51FB\u4E0B\u65B9"\u5EFA\u7ACB\u8FDE\u63A5"\u6309\u94AE\uFF0C\u5728\u914D\u5BF9\u5F39\u7A97\u4E2D\u9009\u62E9 \u300CXiaomiPowerBank\u300D \u5B8C\u6210\u8FDE\u63A5',
    panel_step3_tip:
      "\u8FDE\u63A5\u6210\u529F\u540E\uFF0C\u5373\u53EF\u67E5\u770B\u8BBE\u5907\u8BE6\u60C5",
    panel_unauthorized_title: "\u5F53\u524D\u8BBE\u5907\u672A\u6388\u6743",
    panel_unauthorized_desc:
      "\u8BF7\u5728\u914D\u5BF9\u5F39\u7A97\u4E2D\u9009\u62E9\u300CXiaomiPowerBank\u300D \u5B8C\u6210\u8FDE\u63A5",
    panel_disconnected_toast:
      "\u5DF2\u65AD\u5F00\u8FDE\u63A5\uFF0C\u79FB\u52A8\u7535\u6E90\u81EA\u52A8\u9000\u51FA\u6570\u636E\u4F20\u8F93\u6A21\u5F0F\u3002",
    panel_not_connected_title: "\u5F53\u524D\u672A\u8FDE\u63A5\u79FB\u52A8\u7535\u6E90",
    panel_no_details: "\u6682\u672A\u8FDE\u63A5\u65E0\u6CD5\u83B7\u53D6\u8BE6\u7EC6\u4FE1\u606F",
    panel_no_exceptions: "\u6682\u672A\u8FDE\u63A5\u65E0\u6CD5\u83B7\u53D6\u5F02\u5E38\u8BB0\u5F55",
    panel_connected_title: "\u5C0F\u7C73\u79FB\u52A8\u7535\u6E90-\u5DF2\u8FDE\u63A5",
    panel_basic_info: "\u57FA\u7840\u4FE1\u606F",
    panel_product_name: "\u4EA7\u54C1\u540D\u79F0",
    panel_product_model: "\u4EA7\u54C1\u578B\u53F7",
    panel_device_sn: "\u8BBE\u5907SN\u7801",
    panel_battery_level: "\u5F53\u524D\u5269\u4F59\u7535\u91CF",
    panel_battery_info: "\u7535\u6C60\u4FE1\u606F",
    panel_battery_health: "\u7535\u6C60\u5065\u5EB7\u5EA6",
    panel_cycle_count: "\u7535\u6C60\u5FAA\u73AF\u6B21\u6570",
    panel_battery_model: "\u7535\u6C60\u578B\u53F7",
    panel_battery_manufacturer: "\u7535\u6C60\u751F\u4EA7\u5382\u5546",
    panel_battery_total_voltage: "\u7535\u6C60\u4E32\u603B\u7535\u538B",
    panel_cycle_unit: "\u6B21",
    panel_refresh: "\u5237\u65B0",
    panel_battery_temperature: "\u7535\u6C60\u6E29\u5EA6",
    panel_temp_sensor: "\u6D4B\u6E29\u70B9",
    panel_temp_range_tip:
      "\u7535\u6C60\u6B63\u5E38\u5DE5\u4F5C\u6E29\u5EA6\u4E3A{tempRange}\uFF0C\u77ED\u65F6\u6E29\u5EA6\u7565\u9AD8\u5C5E\u4E8E\u6B63\u5E38\u73B0\u8C61\u3002",
    panel_temp_protect_tip:
      "\u82E5\u6E29\u5EA6\u8FC7\u9AD8\uFF0C\u5145\u7535\u5B9D\u4F1A\u89E6\u53D1\u9AD8\u6E29\u4FDD\u62A4\u5E76\u505C\u6B62\u5145\u653E\u7535\uFF0C\u4E0D\u7528\u62C5\u5FC3\u3002",
    panel_cell_info: "\u5206\u7535\u6C60\u4FE1\u606F",
    panel_cell: "\u7535\u6C60",
    panel_voltage: "\u7535\u538B",
    panel_production_date: "\u751F\u4EA7\u65E5\u671F",
    panel_cell_sn: "\u7535\u82AF\u7F16\u7801",
    panel_no_temp_data: "\u6682\u65E0\u6E29\u5EA6\u6570\u636E\uFF0C\u8BF7\u70B9\u51FB\u5237\u65B0",
    panel_no_cell_data:
      "\u6682\u65E0\u6570\u636E\uFF0C\u8BF7\u8FDE\u63A5\u8BBE\u5907\u540E\u5237\u65B0",
    panel_col_time: "\u53D1\u751F\u65F6\u95F4",
    panel_col_type: "\u5F02\u5E38\u7C7B\u578B",
    panel_col_value: "\u6570\u503C",
    panel_no_data: "\u6682\u65E0\u6570\u636E",
    panel_fetch_cell_error_title: "\u83B7\u53D6\u7535\u82AF\u8BE6\u60C5\u5931\u8D25",
    panel_fetch_cell_error_content:
      "\u591A\u6B21\u5C1D\u8BD5\u540E\u65E0\u6CD5\u83B7\u53D6\u6570\u636E",
    panel_refresh_main_error_title: "\u5237\u65B0\u6574\u673A\u72B6\u6001\u5931\u8D25",
    panel_refresh_main_error_content: "\u65E0\u6CD5\u83B7\u53D6\u6700\u65B0\u6570\u636E",
    panel_loading: "\u52A0\u8F7D\u4E2D...",
    panel_browser_unsupported_title:
      "\u5F53\u524D\u6D4F\u89C8\u5668\u6682\u4E0D\u652F\u6301\u8FDE\u63A5\u8BBE\u5907",
    panel_browser_unsupported_desc:
      "\u8BF7\u4F7F\u7528PC\u7AEFChrome\u3001Edge\u6216Opera\u6D4F\u89C8\u5668\u6253\u5F00\u672C\u9875\u9762\uFF0C\u4EE5\u8FDE\u63A5\u8BBE\u5907\u5E76\u67E5\u770B\u8BBE\u5907\u4FE1\u606F\u3002",
    panel_browser_solution_title: "\u5EFA\u8BAE\u5C1D\u8BD5\u4EE5\u4E0B\u65B9\u6848\u89E3\u51B3",
    panel_browser_solution1_step: "\u65B9\u6848\u4E00",
    panel_browser_solution1_title: "\u4E0B\u8F7D\u63A8\u8350\u6D4F\u89C8\u5668",
    panel_browser_solution1_desc:
      "\u5982\u60A8\u5C1A\u672A\u5B89\u88C5\u63A8\u8350\u6D4F\u89C8\u5668\uFF0C\u8BF7\u70B9\u51FB\u4E0B\u65B9\u94FE\u63A5\u4E0B\u8F7D\uFF1A",
    panel_browser_solution2_step: "\u65B9\u6848\u4E8C",
    panel_browser_solution2_title:
      "\u5728\u5DF2\u5B89\u88C5\u63A8\u8350\u6D4F\u89C8\u5668\u4E2D\u6253\u5F00",
    panel_browser_solution2_desc:
      "\u590D\u5236\u4E0B\u65B9\u7F51\u5740\uFF0C\u5728\u63A8\u8350\u6D4F\u89C8\u5668\u5730\u5740\u680F\u4E2D\u7C98\u8D34\u5E76\u6253\u5F00\uFF1A",
    panel_browser_copy_button: "\u590D\u5236",
    panel_browser_copied_button: "\u5DF2\u590D\u5236",
  },
  C$ = (e6) => k$[e6] ?? e6,
  _$ = r.createContext({ lang: "zh-rCN", setLang: () => {}, t: C$, loading: !1 });
function P$({ children: e6 }) {
  const [t2, n2] = r.useState(() => x$() ?? "zh-rCN"),
    { t: o2, loading: a2 } = y$(t2),
    l2 = r.useCallback((e7) => {
      n2(e7),
        (function (e8) {
          if (w$.includes(e8))
            try {
              localStorage.setItem(b$, e8);
            } catch {}
        })(e7);
    }, []);
  r.useEffect(() => {
    if (x$()) return;
    let e7 = !1;
    return (
      S$().then((t3) => {
        e7 || !t3 || x$() || n2(t3);
      }),
      () => {
        e7 = !0;
      }
    );
  }, []);
  const i2 = r.useCallback((e7) => (a2 ? C$(e7) : o2(e7)), [a2, o2]);
  return (
    r.useEffect(() => {
      document.title = i2("panel_page_title");
    }, [i2]),
    p.jsx(_$.Provider, { value: { lang: t2, setLang: l2, t: i2, loading: a2 }, children: e6 })
  );
}
function O$() {
  return r.useContext(_$);
}
const T$ = ({ children: e6 }) => {
    const [t2, n2] = r.useState(!0),
      [o2, a2] = r.useState(!0),
      { t: l2 } = O$(),
      [i2, s2] = r.useState(!0);
    r.useState(!1);
    const u2 = r.useRef(null);
    return (
      r.useEffect(() => {
        (() => {
          const e7 = navigator.userAgent;
          if (!navigator.hid) return n2(!1), void a2(!1);
          const t3 = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(e7),
            r2 = window.screen.width < 768 && navigator.maxTouchPoints > 0,
            o3 = t3 || r2,
            l3 =
              /Chrome/.test(e7) &&
              /Google Inc/.test(navigator.vendor) &&
              !/Edg/.test(e7) &&
              !/OPR/.test(e7),
            i3 = /Edg\//.test(e7),
            s3 = /OPR\//.test(e7),
            u3 = "brave" in navigator;
          n2(!o3 && !u3 && (l3 || i3 || s3)), a2(!1);
        })();
      }, []),
      r.useEffect(() => {
        if (o2 || t2) return;
        let e7 = !1;
        return (
          S$().then((t3) => {
            e7 || t3 !== "en" || s2(!1);
          }),
          () => {
            e7 = !0;
          }
        );
      }, [o2, t2]),
      r.useEffect(
        () => () => {
          u2.current && clearTimeout(u2.current);
        },
        [],
      ),
      o2
        ? null
        : t2
          ? p.jsx(p.Fragment, { children: e6 })
          : p.jsx("div", {
              className:
                "fixed inset-0 bg-[#f7f8fa] flex items-center justify-center z-[9999] overflow-y-auto py-8",
              children: p.jsxs("div", {
                className: "max-w-md w-full px-6 text-left",
                children: [
                  p.jsx("div", {
                    className: "mb-6 flex justify-center",
                    children: p.jsx("img", {
                      src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG8AAABICAYAAAD4bKvuAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAyeSURBVHgB7V2/bxzHFX6zdyJFJIoowI0FyeQhSG1JSOE0Ft24SAJYAQTYlUU1iV3ZQpw2JJUyjq2kiIMkSKg0TmHAAuI0KSLqL5DkIkWa40mynY4uIoik7/Z5Zndn7s2bN3cn2Du3J98HiLs7O7szN9+8n7O7AphjjjnmmGOObwYUPGF41O2uHl1cxIcHBycW2+3jD/f27h9/6qmBOnmyB08YZpo8TdSaytrP4qB/TmWt53XRCvi/Caut0oAccU+fvJspuKP/7bTa7TuzTOrMkWcIa7WOvJrn+U/04XFDCiKO+x2GxKBOeS3c1Nf/DWCws9Tp7MIMYSbIw253+TBrv6F339ADfSJWT5OhTxfCZn8XJy1GornOcLmd54PrmsQdmAE0mjxLmh7YN/Xhsh1kc47uPy4qaZXK7T13EAeXmy6JjSXvUffeuu7dO7qDRtIKiSGD60lQrLyCLaNbgDG/3dxTV72uJXGrqSQ2jjwjbQeq9aHeXQvOaWkxUkNRHcdIDSRMIppLcXVddSH2FOZXFjudG9AwZNAg/L/bPaOJu6131ywp9LxAXHGeDDy1dd7W1GVq10khV7+EcF0rW4Gs/eFB7/4GNAyNkbzDXu9Sjuqa3l2O1aFSM6GXSSE6K0IbVuoExybbXsi/uKI6nc+hAWgEeWZW6/HaHGO7iFdYepWPS2BMjdr9yL38iYJ4ZxHyF5pA4NTJs8RJ55gtirn9gZ0DQR1y4kF2eCDSlt8vwDsLOH0Cp2rzjKoUiKOS4Mhg9o6KT2CvDBFEgm05Jxhi9wDfKw2ge2Vs819hypgaeSYHWdm4AlR9EXCnAmEoFU4i2bUoXW/bkFQjU6X2fpxA3r8L+73euzBFTIU8/PjjE0q1bupBKpwTNqii50cGNJASNvhR9WcnAFendEvvp3wRVayeofnNg273AkwJUyFv/9iymbErdpAEe0MHtdhwNUjGNZCS6tqY3VK0Dds264Mt422FdlSrT6NFYApITp7JnOixuARVxgTAG+zikFQPgmcy84P6LO4LJWWIYLLQfdYfJJLt69eyfFlhdg2mgOTe5v7uva4enBXi+cVCgmrXy6AU+yB4mQCTp70ex7Oc8F7YaqkXjpw+fQsSIqnkHfYeGIlbgYqUiqBAMqjkWO+RqVFK4CSkuWvpveh5poYnArXT/b4c7tSJpOTlmG9Cab+QhAFRr06yNdXgU+dGseu4A2LrgWRjR4UNwjlRDZepN1gza42QEMnIK1YJAFYJYTwnGUgQhss2KJTz6xxR1HZFbJ+TchSS3sAmBKnPyyoCWxuQEMnIy5Qyi6lOVUqz2sCWU2eGuvEwGp7HyNSvYu1YYh3BfLJIqw8gq2nbVlLpS0LeYffBGW25zpAiriqpZwLVlg665zkW2wefweDan0BvpZhN6obXXv7n9wH/dcvee9SkcJJm+0LtI5foVtZ6CRIhCXk5DNb5j6SznHiXIgJC73+q+q+8Brkmz2wNkfZWtj6TEnfOYPDWFvR/9Y7q//QXkH/wT6lhMbwQpFVxByhHWIdESEKenqjnyTqaK662YrgAYdBd4sGnBWFYEWa29phOACqxFIY4TRg9VoMPPgq6DFKHqvClIqwoEpLny6lUZ+3kmeyDSeTaWSuIWExlSeRi/p//OuIszPHgldddOc912uPBW1c94hw0eTGHxusQscfE0QlTaDmchQSonbwMWsbWIZEEHp+NGziagFbZi2uQXfxRUAm1RA5KFcoluRjgUuI+Cu9+6mnI3t6I9oPaN6a+PWeHbCHPsvOQAPWrzUw9q8JHGsY5CUV97mnawWvpwc4u/ji8oFShyhDoGtLXc1XpoIlr//0PkJ0+iTYZYG/l7lnqSOsdK6b2A6kr+pdlz0MC1E4e5niWSJ00U4NsR7VVsQE1aP9mA0cS+ElJYP/nWypGXOv990CdehoF++h5t3Z9kGeFyErH8MJSpZ4wD1JBzWhDzUAcmOUfe+hlL4gDAKRckQFSI9bgVOvtXxbVODkFgS+/prLnzqE+F0p4JXGaOGBteGRguKDLV+R5vtVVfagTEnp7B2pE/WrTPH1FD9lTXMCkkRApZWEAmK0sVahkA7UTM5442yZvw+uyd19i96SlJxcLluTVitrJMysIwNJLOHwCTExtgaxavcQ0VVkxGxggJK66ZRATjvxJAOEzMqRvxSntqNWuNlOlxzyVQsoCx0X5jyCoYbG3lkdtaAGjQiUJdPCJ80IJsvxEbRnvr+2Ibd+zeSzRMM4Z+1qQKEgPM/wGKCSehWDenlBEaum1E0kMmyVKOoUjVtUVWwSmZAkZokml+CshCXmMECmW4urTcxbUiBUB67tHwwFbt8rEVKk08X4kJAAhnccJdv2l+1YadbhQO4H1hwqIPeJyF2WxgbHOjB1EO5CI0Qdri4zNOOJc5YLA12kuFKm9qyTbnrN2ObgNhN5lMOkGOfagZtSfYVGwJ2U8ih2BRDuAiJNNXJObjMVx6sXzQTGWuVFVEUjzlK4K69Ow4yRYF/qPaoIU29eJ2snTWfa74IcDBViAy1NlNiBWkQGpcpUx4k4Wzkn7j7+OhhFUhTL7GcRuKvJIPA0XWACvjkK/1hjPoHbyWpnaA8GrJCrKqkgv/ovEU842RpPMBXHvofEqh3FgNBMD8Mn/aM6LJsO9vtIt6S+wBLX997lK8Ch8gvQY3LK7/JyVMqIqqftvZ7RLX9kxjieZC+JMOOAG21wzMpX28s+UXh907dmuwQh3H4eP1KPkheq/tUudQe3kLcBgx2wlu8LUohK2dLGzGCu9+g3xXOXveQDuBrokMKJCr77r2qX9pOqSJslZspym/Mo+Yn4LEqD+DItWH+atGil2MkD/sb5oSGCvUc+dK4jyQFYHQLCvUBGvVahIoLr4Q7frGUA+ceQ4kF5baI5+P9+BBEiTYVHgvRIsBOD8nKeKPHznWKEaHYEsyQyyynPSzG2gOW7pNUKhru2bUsJDURBH79j30nxNQkECFB+7Ua1/EwPvPRVNqkoeXjGbkWXwjctv1KchwizrwNBDhep6ELxId3/z6IMhvPWD76OUo2TZEzVq378WthdXnrkMCZCEPIP93fs39didj7Wr/PcM6ODwgBhh8n6Pq2tJR8T44/e8nwLZrqyPg7Pf7nSeDIfFoVSdQ9s1VI/UxgDZ5w4MBcaOY3lUVk9sl0rtGPsrQl9zOxVxBsnIW8z71/XGxT5EZVK1qJQa/RggQNyNHyE5NuWmWHLAXhdMqBEJAtcWbzPP+7+DhEhGXuF1KnVNMvp0puPwmctR8CTNqteY52ptLbOxdDUBqq0n7aOkjLZZFXWXOp1tSIikL5osrpzeqhLVQZrJ7gKMDpAt1DBpTR/Js1tqL5G1VWxI1sZbRAVws8DLW4KgqtXwQswUbkFiJH+5stVS6xhfx/PSTyCEDCQtRfOgrowFzQAgJpG99xjAz6xI16iYR1r2Fa4vrKxch8RITl7xAiLib0kRdePLgiEJ1BbZcwqF9xmIpPFcJJUwMU5DPy0n3jPz1+eIqs53F460N2EKmMo76YtQvKe3Wx0GXiVNRRkItqcYODVc8+OSQ8uozQtsGSEUIlAjykwqbGtaH1ydCnnGecnamfmKgvE+uTR4qajoPYZqsjhk93BlIKi8qhG7lZwTSa87KbbtDAa4ldpJoZjad1gWTp26q8fvCpAgmaXJYh4ndUI84jkBSn58fZykjZRCK8V6nfLGt767sglTxFS/gLTUeWZbj8MW+utkxTk59RQs4Lq4kEqurR6RJk6w3TrbGJsELhOjE+1LMLgMU8ZYlzwFHnXvb+px2YidH5FT9HKW7BzPb9J8KkTq01iRagJHfFO+O2bQiO9tLnVOb+pRvsLLJXXIpIJmTJBLK5L3Cuy1Sn4n3rs3V+G2LV203RTiDBoheRbmY6nt8iu3q+aYxlLInjxDOWkdk0x6rtoVU2nS/cpH1BCvLnWma+M4GkWewaPuZ6sAh5s6rnoVwyUjBzV+BSBYBhpTHpyriNvVzVzW2mEHGobGkWdRfvoDN/QArgKMX9rhKTdBnTovE4WgXElLUDqZYGLSpqhJjsaSZ1BJ4boy9jDLjjGCoiqTb6U6/B6sfMd4wU2UNopGk2dh3mvPsvYlPbjrUNlDCcxbHLdqL6hepUmDxpNmMRPkURx0713QPvJLepBNhuZ4VTzR72AhR+UEqZ38i8N/LLWzvzRVPcYwc+RR6PhwDSE/kynzAn++qn9O8aEe0X5BIYk9fbirabutfdi7R2FwY9YIo5hp8iSYd8H3i8/7t1fLkv6u+Ttr/8nTHHPMMcccc8wxxJfjQPts/JucpQAAAABJRU5ErkJggg==",
                      alt: "Error",
                      className: "w-24 h-24 object-contain",
                    }),
                  }),
                  p.jsx("h1", {
                    className: "text-xl font-bold text-gray-900 mb-2 text-center",
                    children: l2("panel_browser_unsupported_title"),
                  }),
                  p.jsx("p", {
                    className: "text-[15px] text-gray-500 leading-relaxed mb-6 text-center",
                    children: l2("panel_browser_unsupported_desc"),
                  }),
                ],
              }),
            })
    );
  },
  N$ = () => {
    const [e6] = vv(),
      t2 = e6.get("lang") || "zh-rCN",
      { t: n2, loading: o2 } = y$(t2),
      a2 = (e6.get("theme") || "").toLowerCase(),
      l2 = a2 === "dark" || a2 === "light",
      [i2, s2] = r.useState(
        () =>
          typeof window < "u" &&
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches,
      ),
      u2 = l2 ? a2 === "dark" : i2;
    r.useEffect(() => {
      if (typeof window > "u" || !window.matchMedia) return;
      const e7 = window.matchMedia("(prefers-color-scheme: dark)"),
        t3 = (e8) => s2(e8.matches);
      return e7.addEventListener("change", t3), () => e7.removeEventListener("change", t3);
    }, []),
      r.useEffect(() => {
        if (typeof document > "u") return;
        const e7 = document.querySelector('meta[name="viewport"]');
        if (!e7) return;
        const t3 = e7.getAttribute("content") || "";
        return (
          /viewport-fit\s*=\s*cover/.test(t3) ||
            e7.setAttribute("content", `${t3}, viewport-fit=cover`),
          () => {
            e7.setAttribute("content", t3);
          }
        );
      }, []);
    const c2 = ["ar", "iw", "he", "fa", "ur", "ug"].some((e7) => t2.toLowerCase().startsWith(e7)),
      d2 = u2
        ? {
            bg: "#000000",
            title: "#ffffff",
            heading: "#ffffff",
            subHeading: "#e5e5e5",
            body: "#9ca3af",
            tips: "#6b7280",
            border: "#1f2937",
          }
        : {
            bg: "#ffffff",
            title: "#111827",
            heading: "#111827",
            subHeading: "#1f2937",
            body: "#6b7280",
            tips: "#9ca3af",
            border: "#f3f4f6",
          };
    return o2
      ? p.jsx("div", { style: { minHeight: "100vh", backgroundColor: d2.bg } })
      : p.jsxs(p.Fragment, {
          children: [
            p.jsx("style", {
              children: `
          body, html {
            margin: 0;
            padding: 0;
            background-color: ${d2.bg};
          }
          .fixed-header { display: none !important; }
          .content-container {
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
            min-height: 100vh !important;
            height: auto !important;
            overflow-y: auto !important;
          }
          .app { padding: 0 !important; }
        `,
            }),
            p.jsx("div", {
              className: "w-full max-w-md mx-auto",
              style: { minHeight: "100vh", backgroundColor: d2.bg },
              dir: c2 ? "rtl" : "ltr",
              children: p.jsxs("div", {
                className: "px-5 pt-6 min-h-screen",
                style: {
                  backgroundColor: d2.bg,
                  paddingBottom: "max(56px, calc(24px + env(safe-area-inset-bottom, 0px)))",
                },
                children: [
                  p.jsx("h1", {
                    className: "text-2xl font-bold mb-8",
                    style: { color: d2.title },
                    children: n2("common_exceptions_guide"),
                  }),
                  p.jsxs("div", {
                    className: "mb-8",
                    children: [
                      p.jsx("h2", {
                        className: "text-lg font-bold mb-3",
                        style: { color: d2.heading },
                        children: n2("intro_title"),
                      }),
                      p.jsx("p", {
                        className: "text-sm leading-relaxed",
                        style: { color: d2.body },
                        children: n2("intro_content"),
                      }),
                    ],
                  }),
                  p.jsxs("div", {
                    className: "mb-8",
                    children: [
                      p.jsx("h2", {
                        className: "text-lg font-bold mb-4",
                        style: { color: d2.heading },
                        children: n2("exception_handling_title"),
                      }),
                      p.jsxs("div", {
                        className: "mb-6",
                        children: [
                          p.jsx("h3", {
                            className: "text-sm font-bold mb-2",
                            style: { color: d2.subHeading },
                            children: n2("charge_high_temp_title"),
                          }),
                          p.jsx("p", {
                            className: "text-sm leading-relaxed",
                            style: { color: d2.body },
                            children: n2("charge_high_temp_content"),
                          }),
                        ],
                      }),
                      p.jsxs("div", {
                        className: "mb-6",
                        children: [
                          p.jsx("h3", {
                            className: "text-sm font-bold mb-2",
                            style: { color: d2.subHeading },
                            children: n2("discharge_high_temp_title"),
                          }),
                          p.jsx("p", {
                            className: "text-sm leading-relaxed",
                            style: { color: d2.body },
                            children: n2("discharge_high_temp_content"),
                          }),
                        ],
                      }),
                      p.jsxs("div", {
                        className: "mb-6",
                        children: [
                          p.jsx("h3", {
                            className: "text-sm font-bold mb-2",
                            style: { color: d2.subHeading },
                            children: n2("over_voltage_title"),
                          }),
                          p.jsx("p", {
                            className: "text-sm leading-relaxed",
                            style: { color: d2.body },
                            children: n2("over_voltage_content"),
                          }),
                        ],
                      }),
                    ],
                  }),
                  p.jsx("div", {
                    className: "mt-10 pt-6 border-t",
                    style: { borderColor: d2.border },
                    children: p.jsx("p", {
                      className: "text-sm leading-relaxed",
                      style: { color: d2.tips },
                      children: n2("warm_tips"),
                    }),
                  }),
                ],
              }),
            }),
          ],
        });
  },
  $$ = r.lazy(() =>
    bm(
      () => import("./XiaomiPowerBankPanel.js"),
      [
        "assets/XiaomiPowerBankPanel-369974d1.read26.js",
        "assets/react-vendor-252eb283.read.js",
        "assets/ModelData-16716423.read26.js",
      ],
    ),
  ),
  M$ = r.lazy(() =>
    bm(
      () => import("./ModelSupportPanel.js"),
      [
        "assets/ModelSupportPanel-ec289ffd.read26.js",
        "assets/react-vendor-252eb283.read.js",
        "assets/ModelData-16716423.read26.js",
      ],
    ),
  );
function R$() {
  const { t: e6 } = O$();
  return p.jsx("div", { className: "loading-indicator", children: e6("panel_loading") });
}
const L$ = () => {
    const { lang: e6, setLang: t2 } = O$();
    return p.jsx(PN, {
      value: e6,
      onChange: t2,
      size: "small",
      style: { minWidth: 88 },
      options: [
        { value: "en", label: "EN" },
        { value: "zh-rCN", label: "\u4E2D\u6587" },
      ],
    });
  },
  I$ = () => {
    const { t: e6 } = O$();
    return p.jsxs(Vg, {
      children: [
        p.jsx(Dg, {
          path: "/",
          element: p.jsx(T$, {
            children: p.jsxs("div", {
              className: "app",
              children: [
                p.jsx("header", {
                  className: "fixed-header ",
                  children: p.jsx("div", {
                    className: "header-content",
                    children: p.jsxs("div", {
                      className: "card p-8",
                      style: {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      },
                      children: [
                        p.jsxs("div", {
                          children: [
                            p.jsx("h1", {
                              className: "text-xl font-bold text-gray-900 mb-2",
                              children: e6("panel_page_title"),
                            }),
                            p.jsx("p", {
                              className: "text-sm text-gray-500",
                              children: e6("panel_page_subtitle"),
                            }),
                          ],
                        }),
                        p.jsx(L$, {}),
                      ],
                    }),
                  }),
                }),
                p.jsx("div", { className: "content-container", children: p.jsx($$, {}) }),
              ],
            }),
          }),
        }),
        p.jsx(Dg, {
          path: "/models",
          element: p.jsx(T$, {
            children: p.jsxs("div", {
              className: "app",
              children: [
                p.jsx("header", {
                  className: "fixed-header ",
                  children: p.jsx("div", {
                    className: "header-content",
                    children: p.jsxs("div", {
                      className: "card p-8",
                      children: [
                        p.jsx("h1", {
                          className: "text-xl font-bold text-gray-900 mb-2",
                          children: e6("models_page_title"),
                        }),
                        p.jsx("p", {
                          className: "text-sm text-gray-500",
                          children: e6("models_page_subtitle"),
                        }),
                      ],
                    }),
                  }),
                }),
                p.jsx("div", { className: "content-container", children: p.jsx(M$, {}) }),
              ],
            }),
          }),
        }),
        p.jsx(Dg, { path: "/exception-guide", element: p.jsx(N$, {}) }),
      ],
    });
  },
  A$ = ({ children: e6 }) => {
    const { lang: t2 } = O$(),
      n2 = t2 === "en" ? m$ : QN;
    return p.jsx(a_, {
      locale: n2,
      theme: {
        components: {
          Button: {
            borderWidth: 0,
            paddingInline: 15,
            borderRadius: 8,
            boxShadow: "none",
            controlOutline: "none",
            contentFontSize: 14,
          },
        },
      },
      children: e6,
    });
  };
function F$() {
  return p.jsx(P$, {
    children: p.jsx(A$, {
      children: p.jsx(pv, {
        children: p.jsx(r.Suspense, { fallback: p.jsx(R$, {}), children: p.jsx(I$, {}) }),
      }),
    }),
  });
}
vm.createRoot(document.getElementById("root")).render(
  p.jsx(r.StrictMode, { children: p.jsx(F$, {}) }),
);
export {
  $b as $,
  Cx as A,
  Sb as B,
  Tx as C,
  WS as D,
  cy as E,
  py as F,
  FC as G,
  Vy as H,
  AC as I,
  R_ as J,
  vE as K,
  u_ as L,
  aS as M,
  PE as N,
  CE as O,
  YE as P,
  UE as Q,
  QE as R,
  Qb as S,
  DS as T,
  tx as U,
  KS as V,
  JS as W,
  rx as X,
  tP as Y,
  Zy as Z,
  Cb as _,
  Av as a,
  eb as a$,
  HC as a0,
  uy as a1,
  xv as a2,
  O_ as a3,
  C_ as a4,
  Gy as a5,
  _k as a6,
  Ok as a7,
  Cv as a8,
  mk as a9,
  qS as aA,
  Q_ as aB,
  x_ as aC,
  V_ as aD,
  U_ as aE,
  B_ as aF,
  W_ as aG,
  q_ as aH,
  K_ as aI,
  X_ as aJ,
  G_ as aK,
  H_ as aL,
  gk as aM,
  cO as aN,
  aO,
  f_ as aP,
  kv as aQ,
  wb as aR,
  Lv as aS,
  PT as aT,
  HT as aU,
  JT as aV,
  VT as aW,
  $_ as aX,
  Mk as aY,
  PN as aZ,
  uO as a_,
  hy as aa,
  lC as ab,
  Ev as ac,
  Uk as ad,
  VC as ae,
  XS as af,
  QS as ag,
  Tk as ah,
  y_ as ai,
  sO as aj,
  p_ as ak,
  k_ as al,
  YS as am,
  a_ as an,
  m_ as ao,
  r_ as ap,
  IC as aq,
  DC as ar,
  ub as as,
  _v as at,
  Ny as au,
  Fv as av,
  Dy as aw,
  jy as ax,
  qO as ay,
  fy as az,
  Ky as b,
  iy as b0,
  _y as b1,
  Ry as b2,
  Ly as b3,
  yN as b4,
  SN as b5,
  YT as b6,
  ex as b7,
  QT as b8,
  Sk as b9,
  Pk as ba,
  kk as bb,
  O$ as bc,
  p as bd,
  vm as c,
  yk as d,
  bk as e,
  wk as f,
  dk as g,
  hk as h,
  Py as i,
  c_ as j,
  pk as k,
  qk as l,
  Dk as m,
  Rx as n,
  Hy as o,
  Jy as p,
  nx as q,
  ox as r,
  _b as s,
  fk as t,
  wv as u,
  Tb as v,
  Mv as w,
  ck as x,
  vk as y,
  sy as z,
};
