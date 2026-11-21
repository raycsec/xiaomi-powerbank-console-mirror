var e,
  t = Object.defineProperty,
  o = (e3, o2, n2) => (
    ((e4, o3, n3) => {
      o3 in e4
        ? t(e4, o3, { enumerable: !0, configurable: !0, writable: !0, value: n3 })
        : (e4[o3] = n3);
    })(e3, typeof o2 != "symbol" ? o2 + "" : o2, n2),
    n2
  );
import {
  u as n,
  w as r,
  a as l,
  i as a,
  b as i,
  c as s,
  P as c,
  A as d,
  d as u,
  e as p,
  f as m,
  g as f,
  h,
  j as g,
  C as b,
  k as v,
  l as y,
  m as $,
  n as x,
  o as C,
  p as w,
  _ as S,
  q as E,
  r as k,
  s as N,
  t as I,
  v as B,
  x as R,
  y as T,
  z as M,
  B as P,
  D as A,
  E as L,
  F as O,
  G as D,
  H as z,
  I as H,
  L as j,
  J as _,
  K,
  M as W,
  N as F,
  O as G,
  Q as q,
  R as V,
  S as X,
  T as U,
  U as Y,
  V as Z,
  W as J,
  X as Q,
  Y as ee,
  Z as te,
  $ as oe,
  a0 as ne,
  a1 as re,
  a2 as le,
  a3 as ae,
  a4 as ie,
  a5 as se,
  a6 as ce,
  a7 as de,
  a8 as ue,
  a9 as pe,
  aa as me,
  ab as fe,
  ac as he,
  ad as ge,
  ae as be,
  af as ve,
  ag as ye,
  ah as $e,
  ai as xe,
  aj as Ce,
  ak as we,
  al as Se,
  am as Ee,
  an as ke,
  ao as Ne,
  ap as Ie,
  aq as Be,
  ar as Re,
  as as Te,
  at as Me,
  au as Pe,
  av as Ae,
  aw as Le,
  ax as Oe,
  ay as De,
  az as ze,
  aA as He,
  aB as je,
  aC as _e,
  aD as Ke,
  aE as We,
  aF as Fe,
  aG as Ge,
  aH as qe,
  aI as Ve,
  aJ as Xe,
  aK as Ue,
  aL as Ye,
  aM as Ze,
  aN as Je,
  aO as Qe,
  aP as et,
  aQ as tt,
  aR as ot,
  aS as nt,
  aT as rt,
  aU as lt,
  aV as at,
  aW as it,
  aX as st,
  aY as ct,
  aZ as dt,
  a_ as ut,
  a$ as pt,
  b0 as mt,
  b1 as ft,
  b2 as ht,
  b3 as gt,
  b4 as bt,
  b5 as vt,
  b6 as yt,
  b7 as $t,
  b8 as xt,
  b9 as Ct,
  ba as wt,
  bb as St,
  bc as Et,
  bd as kt,
} from "./index.js";
import { r as Nt, b as It, a as Bt } from "./react-vendor.js";
import { g as Rt, a as _qi2FindModel } from "./ModelData.js";
function Tt(e3, t2 = !1) {
  if (a(e3)) {
    const o2 = e3.nodeName.toLowerCase(),
      n2 =
        ["input", "select", "textarea", "button"].includes(o2) ||
        e3.isContentEditable ||
        (o2 === "a" && !!e3.getAttribute("href")),
      r2 = e3.getAttribute("tabindex"),
      l2 = Number(r2);
    let a2 = null;
    return (
      r2 && !Number.isNaN(l2) ? (a2 = l2) : n2 && a2 === null && (a2 = 0),
      n2 && e3.disabled && (a2 = null),
      a2 !== null && (a2 >= 0 || (t2 && a2 < 0))
    );
  }
  return !1;
}
function Mt(e3, t2 = !1) {
  const o2 = [...e3.querySelectorAll("*")].filter((e4) => Tt(e4, t2));
  return Tt(e3, t2) && o2.unshift(e3), o2;
}
let Pt = null,
  At = [];
const Lt = new Map(),
  Ot = new Map();
function Dt() {
  return At[At.length - 1];
}
function zt() {
  const e3 = Dt(),
    { activeElement: t2 } = document;
  if (
    !(function (e4) {
      const t3 = Dt();
      if (e4 && t3) {
        let o2;
        for (const [e5, r2] of Lt.entries())
          if (r2 === t3) {
            o2 = e5;
            break;
          }
        const n2 = Ot.get(o2);
        return !!n2 && (n2 === e4 || n2.contains(e4));
      }
      return !1;
    })(t2)
  )
    if (
      e3 &&
      !(function (e4) {
        const { activeElement: t3 } = document;
        return e4 === t3 || e4.contains(t3);
      })(e3)
    ) {
      const t3 = Mt(e3),
        o2 = t3.includes(Pt) ? Pt : t3[0];
      o2?.focus({ preventScroll: !0 });
    } else Pt = t2;
}
function Ht(e3) {
  if (e3.key === "Tab") {
    const { activeElement: t2 } = document,
      o2 = Mt(Dt()),
      n2 = o2[o2.length - 1];
    e3.shiftKey && t2 === o2[0] ? (Pt = n2) : e3.shiftKey || t2 !== n2 || (Pt = o2[0]);
  }
}
function jt(e3, t2) {
  return (
    e3 &&
      (Lt.set(t2, e3),
      (At = At.filter((t3) => t3 !== e3)),
      At.push(e3),
      window.addEventListener("focusin", zt),
      window.addEventListener("keydown", Ht, !0),
      zt()),
    () => {
      (Pt = null),
        (At = At.filter((t3) => t3 !== e3)),
        Lt.delete(t2),
        Ot.delete(t2),
        At.length === 0 &&
          (window.removeEventListener("focusin", zt),
          window.removeEventListener("keydown", Ht, !0));
    }
  );
}
function _t(e3, t2) {
  const o2 = l(),
    n2 = Nt.useRef(t2);
  return (
    (n2.current = t2),
    (function (e4, t3) {
      const o3 = Nt.useRef(0),
        [n3, r2] = Nt.useState(0);
      Nt.useEffect(() => {
        o3.current = 0;
      }, t3),
        Nt.useEffect(() => {
          const [t4, n4] = e4(o3.current);
          return n4 || ((o3.current += 1), r2((e5) => e5 + 1)), t4;
        }, [...t3, n3]);
    })(
      (t3) => {
        if (!e3) return [void 0, !0];
        const r2 = n2.current();
        return r2 ? [jt(r2, o2), !0] : [void 0, t3 >= 1];
      },
      [o2, e3],
    ),
    [
      (e4) => {
        e4 && Ot.set(o2, e4);
      },
    ]
  );
}
let Kt;
function Wt(...e3) {
  const t2 = {};
  for (const o2 of e3)
    if (o2) for (const e4 of Object.keys(o2)) o2[e4] !== void 0 && (t2[e4] = o2[e4]);
  return t2;
}
const Ft = "__rc_react_root__";
function Gt(e3, t2) {
  const o2 = t2[Ft] || s.createRoot(t2);
  o2.render(e3), (t2[Ft] = o2);
}
async function qt(e3) {
  return Promise.resolve().then(() => {
    var t2;
    (t2 = e3[Ft]) == null || t2.unmount(), delete e3[Ft];
  });
}
function Vt(e3, t2) {
  return c.reduce((o2, n2) => {
    const r2 = e3[`${n2}1`],
      l2 = e3[`${n2}3`],
      a2 = e3[`${n2}6`],
      i2 = e3[`${n2}7`];
    return {
      ...o2,
      ...t2(n2, { lightColor: r2, lightBorderColor: l2, darkColor: a2, textColor: i2 }),
    };
  }, {});
}
const Xt = {
  icon: {
    tag: "svg",
    attrs: { viewBox: "64 64 896 896", focusable: "false" },
    children: [
      {
        tag: "path",
        attrs: {
          d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z",
        },
      },
    ],
  },
  name: "check-circle",
  theme: "filled",
};
function Ut() {
  return (
    (Ut = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    Ut.apply(this, arguments)
  );
}
const Yt = (e3, t2) => Nt.createElement(d, Ut({}, e3, { ref: t2, icon: Xt })),
  Zt = Nt.forwardRef(Yt),
  Jt = {
    icon: {
      tag: "svg",
      attrs: { viewBox: "64 64 896 896", focusable: "false" },
      children: [
        {
          tag: "path",
          attrs: {
            d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z",
          },
        },
      ],
    },
    name: "exclamation-circle",
    theme: "filled",
  };
function Qt() {
  return (
    (Qt = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    Qt.apply(this, arguments)
  );
}
const eo = (e3, t2) => Nt.createElement(d, Qt({}, e3, { ref: t2, icon: Jt })),
  to = Nt.forwardRef(eo),
  oo = {
    icon: {
      tag: "svg",
      attrs: { viewBox: "64 64 896 896", focusable: "false" },
      children: [
        {
          tag: "path",
          attrs: {
            d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z",
          },
        },
      ],
    },
    name: "info-circle",
    theme: "filled",
  };
function no() {
  return (
    (no = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    no.apply(this, arguments)
  );
}
const ro = (e3, t2) => Nt.createElement(d, no({}, e3, { ref: t2, icon: oo })),
  lo = Nt.forwardRef(ro),
  ao = (e3) => {
    var t2;
    if (typeof window > "u") return 0;
    let o2 = 0;
    return (
      u(e3)
        ? (o2 = e3.pageYOffset)
        : p(e3)
          ? (o2 = e3.documentElement.scrollTop)
          : (m(e3) || e3) && (o2 = e3.scrollTop),
      !e3 ||
        u(e3) ||
        f(o2) ||
        (o2 = (t2 = (e3.ownerDocument ?? e3).documentElement) == null ? void 0 : t2.scrollTop),
      o2
    );
  },
  io = (e3, t2 = {}) => {
    const { getContainer: o2 = () => window, callback: n2, duration: l2 = 450 } = t2,
      a2 = o2(),
      i2 = ao(a2),
      s2 = (e4) => {
        u(a2)
          ? a2.scrollTo(window.pageXOffset, e4)
          : p(a2)
            ? (a2.documentElement.scrollTop = e4)
            : (a2.scrollTop = e4);
      };
    if (l2 <= 0) return s2(e3), h(n2) && n2(), () => {};
    const c2 = Date.now();
    let d2;
    const m2 = () => {
      const t3 = Date.now() - c2,
        o3 = (function (e4, t4, o4, n3) {
          const r2 = o4 - t4;
          return (e4 /= n3 / 2) < 1
            ? (r2 / 2) * e4 * e4 * e4 + t4
            : (r2 / 2) * ((e4 -= 2) * e4 * e4 + 2) + t4;
        })(t3 > l2 ? l2 : t3, i2, e3, l2);
      s2(o3), t3 < l2 ? (d2 = r(m2)) : h(n2) && n2();
    };
    return (
      (d2 = r(m2)),
      () => {
        r.cancel(d2);
      }
    );
  },
  so = (e3) => {
    if (!e3) return;
    const { closable: t2, closeIcon: o2 } = e3;
    return { closable: t2, closeIcon: o2 };
  },
  co = {},
  uo = (e3, t2) => {
    if (!e3 && (e3 === !1 || t2 === !1 || t2 === null)) return !1;
    if (!C(e3) && !C(t2)) return null;
    let o2 = { closeIcon: typeof t2 != "boolean" && C(t2) ? t2 : void 0 };
    return v(e3) && (o2 = { ...o2, ...e3 }), o2;
  },
  po = (e3, t2, o2 = co, n2 = "Close") => {
    const r2 = uo(e3?.closable, e3?.closeIcon),
      l2 = uo(t2?.closable, t2?.closeIcon),
      a2 = { closeIcon: It.createElement(x, null), ...o2 },
      i2 = ((e4, t3, o3) =>
        e4 !== !1 && (e4 ? Wt(o3, t3, e4) : t3 !== !1 && (t3 ? Wt(o3, t3) : !!o3.closable && o3)))(
        r2,
        l2,
        a2,
      ),
      s2 = typeof i2 != "boolean" && !!i2?.disabled;
    if (i2 === !1) return [!1, null, s2, {}];
    const [c2, d2] = ((e4, t3, o3) => {
      const { closeIconRender: n3 } = t3,
        { closeIcon: r3, ...l3 } = e4;
      let a3 = r3;
      const i3 = w(l3, !0);
      return (
        C(a3) &&
          (n3 && (a3 = n3(a3)),
          (a3 = It.isValidElement(a3)
            ? It.cloneElement(a3, { "aria-label": o3, ...a3.props, ...i3 })
            : It.createElement("span", { "aria-label": o3, ...i3 }, a3))),
        [a3, { "aria-label": o3, ...i3 }]
      );
    })(i2, a2, n2);
    return [!0, c2, s2, d2];
  },
  mo = () => It.useReducer((e3) => e3 + 1, 0),
  fo = (e3, t2) => {
    let o2 = {};
    return (
      v(e3) && (o2 = { ...e3 }),
      typeof e3 == "boolean" && (o2 = { enabled: e3 }),
      o2.closable === void 0 && t2 !== void 0 && (o2.closable = t2),
      o2
    );
  },
  ho = (e3, t2) =>
    Nt.useImperativeHandle(e3, () => {
      const e4 = t2(),
        { nativeElement: o2 } = e4;
      return typeof Proxy < "u"
        ? new Proxy(o2, { get: (t3, o3) => (e4[o3] ? e4[o3] : Reflect.get(t3, o3)) })
        : ((r2 = e4),
          ((n2 = o2)._antProxy = n2._antProxy || {}),
          Object.keys(r2).forEach((e5) => {
            if (!(e5 in n2._antProxy)) {
              const t3 = n2[e5];
              (n2._antProxy[e5] = t3), (n2[e5] = r2[e5]);
            }
          }),
          n2);
      var n2, r2;
    }),
  go = E("Wave", (e3) => {
    const {
        componentCls: t2,
        colorPrimary: o2,
        motionDurationSlow: n2,
        motionEaseInOut: r2,
        motionEaseOutCirc: l2,
        antCls: a2,
      } = e3,
      [, i2] = k(a2, "wave");
    return {
      [t2]: {
        position: "absolute",
        background: "transparent",
        pointerEvents: "none",
        boxSizing: "border-box",
        color: i2("color", o2),
        boxShadow: "0 0 0 0 currentcolor",
        opacity: 0.2,
        "&.wave-motion-appear": {
          transition: ["box-shadow 0.4s", "opacity 2s"].map((e4) => `${e4} ${l2}`).join(","),
          "&-active": { boxShadow: "0 0 0 6px currentcolor", opacity: 0 },
          "&.wave-quick": {
            transition: ["box-shadow", "opacity"].map((e4) => `${e4} ${n2} ${r2}`).join(","),
          },
        },
      },
    };
  }),
  bo = `${N}-wave-target`,
  vo = (e3) =>
    !!e3 &&
    I(e3) &&
    e3 !== "#fff" &&
    e3 !== "#ffffff" &&
    e3 !== "rgb(255, 255, 255)" &&
    e3 !== "rgba(255, 255, 255, 1)" &&
    !/rgba\((?:\d*, ){3}0\)/i.test(e3) &&
    !/^#(?:[0-9a-f]{3}0|[0-9a-f]{6}00)$/i.test(e3) &&
    e3 !== "transparent" &&
    e3 !== "canvastext";
function yo(e3) {
  return Number.isNaN(e3) ? 0 : e3;
}
const $o = (e3) => {
    const { className: t2, target: o2, component: n2, colorSource: l2 } = e3,
      a2 = Nt.useRef(null),
      { getPrefixCls: i2 } = Nt.useContext(B),
      s2 = i2(),
      [c2] = k(s2, "wave"),
      [d2, u2] = Nt.useState(null),
      [p2, m2] = Nt.useState([]),
      [f2, h2] = Nt.useState(0),
      [g2, b2] = Nt.useState(0),
      [v2, y2] = Nt.useState(0),
      [$2, x2] = Nt.useState(0),
      [C2, w2] = Nt.useState(!1),
      S2 = {
        left: f2,
        top: g2,
        width: v2,
        height: $2,
        borderRadius: p2.map((e4) => `${e4}px`).join(" "),
      };
    function E2() {
      const e4 = getComputedStyle(o2);
      u2(
        (function (e5, t4 = null) {
          const o3 = getComputedStyle(e5),
            { borderTopColor: n4, borderColor: r3, backgroundColor: l3 } = o3;
          return t4 && vo(o3[t4]) ? o3[t4] : ([n4, r3, l3].find(vo) ?? null);
        })(o2, l2),
      );
      const t3 = e4.position === "static",
        { borderLeftWidth: n3, borderTopWidth: r2 } = e4;
      h2(t3 ? o2.offsetLeft : yo(-Number.parseFloat(n3))),
        b2(t3 ? o2.offsetTop : yo(-Number.parseFloat(r2))),
        y2(o2.offsetWidth),
        x2(o2.offsetHeight);
      const {
        borderTopLeftRadius: a3,
        borderTopRightRadius: i3,
        borderBottomLeftRadius: s3,
        borderBottomRightRadius: c3,
      } = e4;
      m2([a3, i3, c3, s3].map((e5) => yo(Number.parseFloat(e5))));
    }
    if (
      (d2 && (S2[c2("color")] = d2),
      Nt.useEffect(() => {
        if (o2) {
          const e4 = r(() => {
            E2(), w2(!0);
          });
          let t3;
          return (
            typeof ResizeObserver < "u" && ((t3 = new ResizeObserver(E2)), t3.observe(o2)),
            () => {
              r.cancel(e4), t3?.disconnect();
            }
          );
        }
      }, [o2]),
      !C2)
    )
      return null;
    const N2 = (n2 === "Checkbox" || n2 === "Radio") && o2?.classList.contains(bo);
    return Nt.createElement(
      R,
      {
        visible: !0,
        motionAppear: !0,
        motionName: "wave-motion",
        motionDeadline: 5e3,
        onAppearEnd: (e4, t3) => {
          var o3;
          if (t3.deadline || (T(t3) && t3.propertyName === "opacity")) {
            const e5 = (o3 = a2.current) == null ? void 0 : o3.parentElement;
            qt(e5).then(() => {
              e5?.remove();
            });
          }
          return !1;
        },
      },
      ({ className: e4 }, o3) =>
        Nt.createElement("div", {
          ref: M(a2, o3),
          className: P(t2, e4, { "wave-quick": N2 }),
          style: S2,
        }),
    );
  },
  xo = (e3, t2) => {
    var o2;
    const { component: n2 } = t2;
    if (n2 === "Checkbox" && !((o2 = e3.querySelector("input")) != null && o2.checked)) return;
    const r2 = document.createElement("div");
    (r2.style.position = "absolute"),
      (r2.style.left = "0px"),
      (r2.style.top = "0px"),
      e3?.insertBefore(r2, e3?.firstChild),
      Gt(Nt.createElement($o, { ...t2, target: e3 }), r2);
  },
  Co = (e3, t2, o2, l2) => {
    const { wave: a2 } = Nt.useContext(B),
      [, i2, s2] = A(),
      c2 = n((n2) => {
        const r2 = e3.current;
        if (a2?.disabled || !r2) return;
        const c3 = r2.querySelector(`.${bo}`) || r2,
          { showEffect: d3 } = a2 || {};
        (d3 || xo)(c3, {
          className: t2,
          token: i2,
          component: o2,
          event: n2,
          hashId: s2,
          colorSource: l2,
        });
      }),
      d2 = Nt.useRef(null);
    return (
      Nt.useEffect(
        () => () => {
          r.cancel(d2.current);
        },
        [],
      ),
      (e4) => {
        r.cancel(d2.current),
          (d2.current = r(() => {
            c2(e4);
          }));
      }
    );
  },
  wo = {
    click: "click",
    mousedown: "mousedown",
    mouseup: "mouseup",
    pointerdown: "pointerdown",
    pointerup: "pointerup",
  },
  So = (e3) => {
    const { children: t2, disabled: o2, component: n2, colorSource: r2 } = e3,
      { getPrefixCls: l2, wave: i2 } = Nt.useContext(B),
      s2 = Nt.useRef(null),
      c2 = l2("wave"),
      d2 = go(c2),
      u2 = Co(s2, P(c2, d2), n2, r2);
    if (
      (It.useEffect(() => {
        const e4 = s2.current;
        if (!e4 || e4.nodeType !== window.Node.ELEMENT_NODE || o2) return;
        const t3 = (t4) => {
            !a(t4.target) ||
              !e4.getAttribute ||
              e4.getAttribute("disabled") ||
              e4.disabled ||
              (e4.className.includes("disabled") && !e4.className.includes("disabled:")) ||
              e4.getAttribute("aria-disabled") === "true" ||
              e4.className.includes("-leave") ||
              u2(t4);
          },
          n3 = i2?.triggerType,
          r3 = n3 && n3 in wo ? wo[n3] : "click";
        return (
          e4.addEventListener(r3, t3, !0),
          () => {
            e4.removeEventListener(r3, t3, !0);
          }
        );
      }, [o2, i2?.triggerType]),
      !It.isValidElement(t2))
    )
      return t2 ?? null;
    const p2 = L(t2) ? M(O(t2), s2) : s2;
    return D(t2, { ref: p2 });
  },
  Eo = Nt.createContext(void 0),
  ko = (e3) => {
    const { getPrefixCls: t2, direction: o2 } = Nt.useContext(B),
      { prefixCls: n2, size: r2, className: l2, ...a2 } = e3,
      i2 = t2("btn-group", n2),
      [, , s2] = A(),
      c2 = Nt.useMemo(() => {
        switch (r2) {
          case "large":
            return "lg";
          case "small":
            return "sm";
          default:
            return "";
        }
      }, [r2]),
      d2 = P(i2, { [`${i2}-${c2}`]: c2, [`${i2}-rtl`]: o2 === "rtl" }, l2, s2);
    return Nt.createElement(
      Eo.Provider,
      { value: r2 },
      Nt.createElement("div", { ...a2, className: d2 }),
    );
  },
  No = /^[\u4E00-\u9FA5]{2}$/,
  Io = No.test.bind(No);
function Bo(e3) {
  return e3 === "danger" ? { danger: !0 } : { type: e3 };
}
function Ro(e3) {
  return e3 === "text" || e3 === "link";
}
function To(e3, t2, o2, n2) {
  let r2 = !1;
  const l2 = [];
  return (
    It.Children.forEach(e3, (e4) => {
      const t3 = I(e4) || f(e4);
      if (r2 && t3) {
        const t4 = l2.length - 1,
          o3 = l2[t4];
        l2[t4] = `${o3}${e4}`;
      } else l2.push(e4);
      r2 = t3;
    }),
    It.Children.map(l2, (e4) =>
      (function (e5, t3, o3, n3) {
        if (!z(e5)) return;
        const r3 = t3 ? " " : "";
        return !I(e5) && !f(e5) && I(e5.type) && Io(e5.props.children)
          ? D(e5, (e6) => {
              const t4 = P(e6.className, n3) || void 0,
                l3 = { ...o3, ...e6.style };
              return { ...e6, children: e6.children.split("").join(r3), className: t4, style: l3 };
            })
          : I(e5)
            ? It.createElement(
                "span",
                { className: n3, style: o3 },
                Io(e5) ? e5.split("").join(r3) : e5,
              )
            : H(e5)
              ? It.createElement("span", { className: n3, style: o3 }, e5)
              : D(e5, (e6) => ({
                  ...e6,
                  className: P(e6.className, n3) || void 0,
                  style: { ...e6.style, ...o3 },
                }));
      })(e4, t2, o2, n2),
    )
  );
}
["default", "primary", "danger"].concat(S(c));
const Mo = Nt.forwardRef((e3, t2) => {
    const { className: o2, style: n2, children: r2, prefixCls: l2 } = e3,
      a2 = P(`${l2}-icon`, o2);
    return It.createElement("span", { ref: t2, className: a2, style: n2 }, r2);
  }),
  Po = Nt.forwardRef((e3, t2) => {
    const { prefixCls: o2, className: n2, style: r2, iconClassName: l2 } = e3,
      a2 = P(`${o2}-loading-icon`, n2);
    return It.createElement(
      Mo,
      { prefixCls: o2, className: a2, style: r2, ref: t2 },
      It.createElement(j, { className: l2 }),
    );
  }),
  Ao = () => ({ width: 0, opacity: 0, transform: "scale(0)" }),
  Lo = (e3) => ({ width: e3.scrollWidth, opacity: 1, transform: "scale(1)" }),
  Oo = (e3) => {
    const { prefixCls: t2, loading: o2, existIcon: n2, className: r2, style: l2, mount: a2 } = e3,
      i2 = !!o2;
    return n2
      ? It.createElement(Po, { prefixCls: t2, className: r2, style: l2 })
      : It.createElement(
          R,
          {
            visible: i2,
            motionName: `${t2}-loading-icon-motion`,
            motionAppear: !a2,
            motionEnter: !a2,
            motionLeave: !a2,
            removeOnLeave: !0,
            onAppearStart: Ao,
            onAppearActive: Lo,
            onEnterStart: Ao,
            onEnterActive: Lo,
            onLeaveStart: Lo,
            onLeaveActive: Ao,
          },
          ({ className: e4, style: o3 }, n3) => {
            const a3 = { ...l2, ...o3 };
            return It.createElement(Po, {
              prefixCls: t2,
              className: P(r2, e4),
              style: a3,
              ref: n3,
            });
          },
        );
  },
  Do = (e3) => {
    const { componentCls: t2, antCls: o2, motionDurationMid: n2, motionEaseInOut: r2 } = e3;
    return {
      [t2]: {
        [`${o2}-motion-collapse-legacy`]: {
          overflow: "hidden",
          "&-active": {
            transition: `${["height", "opacity"].map((e4) => `${e4} ${n2} ${r2}`).join(", ")} !important`,
          },
        },
        [`${o2}-motion-collapse`]: {
          overflow: "hidden",
          transition: `${["height", "opacity"].map((e4) => `${e4} ${n2} ${r2}`).join(", ")} !important`,
        },
      },
    };
  },
  zo = new K("antFadeIn", { "0%": { opacity: 0 }, "100%": { opacity: 1 } }),
  Ho = new K("antFadeOut", { "0%": { opacity: 1 }, "100%": { opacity: 0 } }),
  jo = (e3, t2 = !1) => {
    const { antCls: o2 } = e3,
      n2 = `${o2}-fade`,
      r2 = t2 ? "&" : "";
    return [
      _(n2, zo, Ho, e3.motionDurationMid, t2),
      {
        [`
        ${r2}${n2}-enter,
        ${r2}${n2}-appear
      `]: { opacity: 0, animationTimingFunction: "linear" },
        [`${r2}${n2}-leave`]: { animationTimingFunction: "linear" },
      },
    ];
  },
  _o = new K("antZoomIn", {
    "0%": { transform: "scale(0.2)", opacity: 0 },
    "100%": { transform: "scale(1)", opacity: 1 },
  }),
  Ko = new K("antZoomOut", {
    "0%": { transform: "scale(1)" },
    "100%": { transform: "scale(0.2)", opacity: 0 },
  }),
  Wo = new K("antZoomBigIn", {
    "0%": { transform: "scale(0.8)", opacity: 0 },
    "100%": { transform: "scale(1)", opacity: 1 },
  }),
  Fo = new K("antZoomBigOut", {
    "0%": { transform: "scale(1)" },
    "100%": { transform: "scale(0.8)", opacity: 0 },
  }),
  Go = new K("antZoomUpIn", {
    "0%": { transform: "scale(0.8)", transformOrigin: "50% 0%", opacity: 0 },
    "100%": { transform: "scale(1)", transformOrigin: "50% 0%" },
  }),
  qo = new K("antZoomUpOut", {
    "0%": { transform: "scale(1)", transformOrigin: "50% 0%" },
    "100%": { transform: "scale(0.8)", transformOrigin: "50% 0%", opacity: 0 },
  }),
  Vo = {
    zoom: { inKeyframes: _o, outKeyframes: Ko },
    "zoom-big": { inKeyframes: Wo, outKeyframes: Fo },
    "zoom-big-fast": { inKeyframes: Wo, outKeyframes: Fo },
    "zoom-left": {
      inKeyframes: new K("antZoomLeftIn", {
        "0%": { transform: "scale(0.8)", transformOrigin: "0% 50%", opacity: 0 },
        "100%": { transform: "scale(1)", transformOrigin: "0% 50%" },
      }),
      outKeyframes: new K("antZoomLeftOut", {
        "0%": { transform: "scale(1)", transformOrigin: "0% 50%" },
        "100%": { transform: "scale(0.8)", transformOrigin: "0% 50%", opacity: 0 },
      }),
    },
    "zoom-right": {
      inKeyframes: new K("antZoomRightIn", {
        "0%": { transform: "scale(0.8)", transformOrigin: "100% 50%", opacity: 0 },
        "100%": { transform: "scale(1)", transformOrigin: "100% 50%" },
      }),
      outKeyframes: new K("antZoomRightOut", {
        "0%": { transform: "scale(1)", transformOrigin: "100% 50%" },
        "100%": { transform: "scale(0.8)", transformOrigin: "100% 50%", opacity: 0 },
      }),
    },
    "zoom-up": { inKeyframes: Go, outKeyframes: qo },
    "zoom-down": {
      inKeyframes: new K("antZoomDownIn", {
        "0%": { transform: "scale(0.8)", transformOrigin: "50% 100%", opacity: 0 },
        "100%": { transform: "scale(1)", transformOrigin: "50% 100%" },
      }),
      outKeyframes: new K("antZoomDownOut", {
        "0%": { transform: "scale(1)", transformOrigin: "50% 100%" },
        "100%": { transform: "scale(0.8)", transformOrigin: "50% 100%", opacity: 0 },
      }),
    },
  },
  Xo = (e3, t2) => {
    const { antCls: o2 } = e3,
      n2 = `${o2}-${t2}`,
      { inKeyframes: r2, outKeyframes: l2 } = Vo[t2];
    return [
      _(n2, r2, l2, t2 === "zoom-big-fast" ? e3.motionDurationFast : e3.motionDurationMid),
      {
        [`
        ${n2}-enter,
        ${n2}-appear
      `]: {
          transform: "scale(0)",
          opacity: 0,
          animationTimingFunction: e3.motionEaseOutCirc,
          "&-prepare": { transform: "none" },
        },
        [`${n2}-leave`]: { animationTimingFunction: e3.motionEaseInOutCirc },
      },
    ];
  },
  Uo = (e3, t2) => ({
    [`> span, > ${e3}`]: {
      "&:not(:last-child)": {
        [`&, & > ${e3}`]: { "&:not(:disabled)": { borderInlineEndColor: t2 } },
      },
      "&:not(:first-child)": {
        [`&, & > ${e3}`]: { "&:not(:disabled)": { borderInlineStartColor: t2 } },
      },
    },
  }),
  Yo = (e3) => {
    const {
      componentCls: t2,
      fontSize: o2,
      lineWidth: n2,
      groupBorderColor: r2,
      colorErrorHover: l2,
    } = e3;
    return {
      [`${t2}-group`]: [
        {
          position: "relative",
          display: "inline-flex",
          [`> span, > ${t2}`]: {
            "&:not(:last-child)": {
              [`&, & > ${t2}`]: { borderStartEndRadius: 0, borderEndEndRadius: 0 },
            },
            "&:not(:first-child)": {
              marginInlineStart: e3.calc(n2).mul(-1).equal(),
              [`&, & > ${t2}`]: { borderStartStartRadius: 0, borderEndStartRadius: 0 },
            },
          },
          [t2]: {
            position: "relative",
            zIndex: 1,
            "&:hover, &:focus, &:active": { zIndex: 2 },
            "&[disabled]": { zIndex: 0 },
          },
          [`${t2}-icon-only`]: { fontSize: o2 },
        },
        Uo(`${t2}-primary`, r2),
        Uo(`${t2}-danger`, l2),
      ],
    };
  },
  Zo = (e3) => Math.round(Number(e3 || 0));
class Jo extends W {
  constructor(e3) {
    super(
      ((e4) => {
        if (e4 instanceof W) return e4;
        if (e4 && typeof e4 == "object" && "h" in e4 && "b" in e4) {
          const { b: t2, ...o2 } = e4;
          return { ...o2, v: t2 };
        }
        return typeof e4 == "string" && /hsb/.test(e4) ? e4.replace(/hsb/, "hsv") : e4;
      })(e3),
    );
  }
  toHsbString() {
    const e3 = this.toHsb(),
      t2 = Zo(100 * e3.s),
      o2 = Zo(100 * e3.b),
      n2 = Zo(e3.h),
      r2 = e3.a,
      l2 = `hsb(${n2}, ${t2}%, ${o2}%)`,
      a2 = `hsba(${n2}, ${t2}%, ${o2}%, ${r2.toFixed(r2 === 0 ? 0 : 2)})`;
    return r2 === 1 ? l2 : a2;
  }
  toHsb() {
    const { v: e3, ...t2 } = this.toHsv();
    return { ...t2, b: e3, a: this.a };
  }
}
var Qo;
(Qo = "#1677ff") instanceof Jo || new Jo(Qo);
let en = (function () {
  return F(
    function e3(t2) {
      var o2;
      if ((G(this, e3), (this.cleared = !1), t2 instanceof e3))
        return (
          (this.metaColor = t2.metaColor.clone()),
          (this.colors =
            (o2 = t2.colors) == null
              ? void 0
              : o2.map((t3) => ({ color: new e3(t3.color), percent: t3.percent }))),
          void (this.cleared = t2.cleared)
        );
      const n2 = Array.isArray(t2);
      n2 && t2.length
        ? ((this.colors = t2.map(({ color: t3, percent: o3 }) => ({
            color: new e3(t3),
            percent: o3,
          }))),
          (this.metaColor = new Jo(this.colors[0].color.metaColor)))
        : (this.metaColor = new Jo(n2 ? "" : t2)),
        (!t2 || (n2 && !this.colors)) &&
          ((this.metaColor = this.metaColor.setA(0)), (this.cleared = !0));
    },
    [
      {
        key: "toHsb",
        value: function () {
          return this.metaColor.toHsb();
        },
      },
      {
        key: "toHsbString",
        value: function () {
          return this.metaColor.toHsbString();
        },
      },
      {
        key: "toHex",
        value: function () {
          return (
            (e3 = this.toHexString()),
            (t2 = this.metaColor.a < 1),
            e3
              ? ((e4, t3) => e4?.replace(/[^0-9a-f]/gi, "").slice(0, t3 ? 8 : 6) || "")(e3, t2)
              : ""
          );
          var e3, t2;
        },
      },
      {
        key: "toHexString",
        value: function () {
          return this.metaColor.toHexString();
        },
      },
      {
        key: "toRgb",
        value: function () {
          return this.metaColor.toRgb();
        },
      },
      {
        key: "toRgbString",
        value: function () {
          return this.metaColor.toRgbString();
        },
      },
      {
        key: "isGradient",
        value: function () {
          return !!this.colors && !this.cleared;
        },
      },
      {
        key: "getColors",
        value: function () {
          return this.colors || [{ color: this, percent: 0 }];
        },
      },
      {
        key: "toCssString",
        value: function () {
          const { colors: e3 } = this;
          return e3
            ? `linear-gradient(90deg, ${e3.map((e4) => `${e4.color.toRgbString()} ${e4.percent}%`).join(", ")})`
            : this.metaColor.toRgbString();
        },
      },
      {
        key: "equals",
        value: function (e3) {
          return (
            !(!e3 || this.isGradient() !== e3.isGradient()) &&
            (this.isGradient()
              ? this.colors.length === e3.colors.length &&
                this.colors.every((t2, o2) => {
                  const n2 = e3.colors[o2];
                  return t2.percent === n2.percent && t2.color.equals(n2.color);
                })
              : this.toHexString() === e3.toHexString())
          );
        },
      },
    ],
  );
})();
const tn = {
  icon: {
    tag: "svg",
    attrs: { viewBox: "64 64 896 896", focusable: "false" },
    children: [
      {
        tag: "path",
        attrs: {
          d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z",
        },
      },
    ],
  },
  name: "right",
  theme: "outlined",
};
function on() {
  return (
    (on = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    on.apply(this, arguments)
  );
}
const nn = (e3, t2) => Nt.createElement(d, on({}, e3, { ref: t2, icon: tn })),
  rn = Nt.forwardRef(nn),
  ln = (e3) => {
    const { paddingInline: t2, onlyIconSize: o2, borderColorDisabled: n2 } = e3;
    return q(e3, {
      buttonPaddingHorizontal: t2,
      buttonPaddingVertical: 0,
      buttonIconOnlyFontSize: o2,
      colorBorderDisabled: n2,
    });
  },
  an = (e3) => {
    const t2 = e3.contentFontSize ?? e3.fontSize,
      o2 = e3.contentFontSizeSM ?? e3.fontSize,
      n2 = e3.contentFontSizeLG ?? e3.fontSizeLG,
      r2 = e3.contentLineHeight ?? V(t2),
      l2 = e3.contentLineHeightSM ?? V(o2),
      a2 = e3.contentLineHeightLG ?? V(n2),
      i2 = ((e4, t3) => {
        const { r: o3, g: n3, b: r3, a: l3 } = e4.toRgb(),
          a3 = new Jo(e4.toRgbString()).onBackground(t3).toHsv();
        return l3 <= 0.5 ? a3.v > 0.5 : 0.299 * o3 + 0.587 * n3 + 0.114 * r3 > 192;
      })(new en(e3.colorBgSolid), "#fff")
        ? "#000"
        : "#fff",
      s2 = c.reduce(
        (t3, o3) => ({
          ...t3,
          [`${o3}ShadowColor`]: `0 ${X(e3.controlOutlineWidth)} 0 ${U(e3[`${o3}1`], e3.colorBgContainer)}`,
        }),
        {},
      ),
      d2 = e3.colorBgContainerDisabled,
      u2 = e3.colorBgContainerDisabled;
    return {
      ...s2,
      fontWeight: 400,
      iconGap: e3.marginXS,
      defaultShadow: `0 ${e3.controlOutlineWidth}px 0 ${e3.controlTmpOutline}`,
      primaryShadow: `0 ${e3.controlOutlineWidth}px 0 ${e3.controlOutline}`,
      dangerShadow: `0 ${e3.controlOutlineWidth}px 0 ${e3.colorErrorOutline}`,
      primaryColor: e3.colorTextLightSolid,
      dangerColor: e3.colorTextLightSolid,
      borderColorDisabled: e3.colorBorderDisabled,
      defaultGhostColor: e3.colorBgContainer,
      ghostBg: "transparent",
      defaultGhostBorderColor: e3.colorBgContainer,
      paddingInline: e3.paddingContentHorizontal - e3.lineWidth,
      paddingInlineLG: e3.paddingContentHorizontal - e3.lineWidth,
      paddingInlineSM: 8 - e3.lineWidth,
      onlyIconSize: "inherit",
      onlyIconSizeSM: "inherit",
      onlyIconSizeLG: "inherit",
      groupBorderColor: e3.colorPrimaryHover,
      linkHoverBg: "transparent",
      textTextColor: e3.colorText,
      textTextHoverColor: e3.colorText,
      textTextActiveColor: e3.colorText,
      textHoverBg: e3.colorFillTertiary,
      defaultColor: e3.colorText,
      defaultBg: e3.colorBgContainer,
      defaultBorderColor: e3.colorBorder,
      defaultBorderColorDisabled: e3.colorBorder,
      defaultHoverBg: e3.colorBgContainer,
      defaultHoverColor: e3.colorPrimaryHover,
      defaultHoverBorderColor: e3.colorPrimaryHover,
      defaultActiveBg: e3.colorBgContainer,
      defaultActiveColor: e3.colorPrimaryActive,
      defaultActiveBorderColor: e3.colorPrimaryActive,
      solidTextColor: i2,
      contentFontSize: t2,
      contentFontSizeSM: o2,
      contentFontSizeLG: n2,
      contentLineHeight: r2,
      contentLineHeightSM: l2,
      contentLineHeightLG: a2,
      paddingBlock: Math.max((e3.controlHeight - t2 * r2) / 2 - e3.lineWidth, 0),
      paddingBlockSM: Math.max((e3.controlHeightSM - o2 * l2) / 2 - e3.lineWidth, 0),
      paddingBlockLG: Math.max((e3.controlHeightLG - n2 * a2) / 2 - e3.lineWidth, 0),
      defaultBgDisabled: d2,
      dashedBgDisabled: u2,
    };
  },
  sn = (e3) => {
    const { componentCls: t2, antCls: o2, lineWidth: n2, lineType: r2 } = e3,
      [l2, a2] = k(o2, "btn");
    return {
      [t2]: [
        {
          [l2("border-width")]: n2,
          [l2("border-color")]: "#000",
          [l2("border-color-hover")]: a2("border-color"),
          [l2("border-color-active")]: a2("border-color"),
          [l2("border-color-disabled")]: a2("border-color"),
          [l2("border-style")]: r2,
          [l2("text-color")]: "#000",
          [l2("text-color-hover")]: a2("text-color"),
          [l2("text-color-active")]: a2("text-color"),
          [l2("text-color-disabled")]: a2("text-color"),
          [l2("bg-color")]: "#ddd",
          [l2("bg-color-hover")]: a2("bg-color"),
          [l2("bg-color-active")]: a2("bg-color"),
          [l2("bg-color-disabled")]: e3.colorBgContainerDisabled,
          [l2("bg-color-container")]: e3.colorBgContainer,
          [l2("shadow")]: "none",
        },
        {
          border: [a2("border-width"), a2("border-style"), a2("border-color")].join(" "),
          color: a2("text-color"),
          backgroundColor: a2("bg-color"),
          [`&:not(:disabled):not(${t2}-disabled)`]: {
            "&:hover": {
              border: [a2("border-width"), a2("border-style"), a2("border-color-hover")].join(" "),
              color: a2("text-color-hover"),
              backgroundColor: a2("bg-color-hover"),
            },
            "&:active": {
              border: [a2("border-width"), a2("border-style"), a2("border-color-active")].join(" "),
              color: a2("text-color-active"),
              backgroundColor: a2("bg-color-active"),
            },
          },
        },
        {
          [`&${t2}-variant-solid`]: {
            [l2("solid-bg-color")]: a2("color-base"),
            [l2("solid-bg-color-hover")]: a2("color-hover"),
            [l2("solid-bg-color-active")]: a2("color-active"),
            [l2("border-color")]: "transparent",
            [l2("text-color")]: e3.colorTextLightSolid,
            [l2("bg-color")]: a2("solid-bg-color"),
            [l2("bg-color-hover")]: a2("solid-bg-color-hover"),
            [l2("bg-color-active")]: a2("solid-bg-color-active"),
            boxShadow: a2("shadow"),
          },
          [`&${t2}-variant-outlined, &${t2}-variant-dashed`]: {
            [l2("border-color")]: a2("color-base"),
            [l2("border-color-hover")]: a2("color-hover"),
            [l2("border-color-active")]: a2("color-active"),
            [l2("bg-color")]: a2("bg-color-container"),
            [l2("text-color")]: a2("color-base"),
            [l2("text-color-hover")]: a2("color-hover"),
            [l2("text-color-active")]: a2("color-active"),
            boxShadow: a2("shadow"),
          },
          [`&${t2}-variant-dashed`]: {
            [l2("border-style")]: "dashed",
            [l2("bg-color-disabled")]: e3.dashedBgDisabled,
          },
          [`&${t2}-variant-filled`]: {
            [l2("border-color")]: "transparent",
            [l2("text-color")]: a2("color-base"),
            [l2("bg-color")]: a2("color-light"),
            [l2("bg-color-hover")]: a2("color-light-hover"),
            [l2("bg-color-active")]: a2("color-light-active"),
          },
          [`&${t2}-variant-text, &${t2}-variant-link`]: {
            [l2("border-color")]: "transparent",
            [l2("text-color")]: a2("color-base"),
            [l2("text-color-hover")]: a2("color-hover"),
            [l2("text-color-active")]: a2("color-active"),
            [l2("bg-color")]: "transparent",
            [l2("bg-color-hover")]: "transparent",
            [l2("bg-color-active")]: "transparent",
            [`&:disabled, &${e3.componentCls}-disabled`]: {
              background: "transparent",
              borderColor: "transparent",
            },
          },
          [`&${t2}-variant-text`]: {
            [l2("bg-color-hover")]: a2("color-light"),
            [l2("bg-color-active")]: a2("color-light-active"),
          },
        },
        {
          [`&${t2}-variant-link`]: {
            [l2("color-base")]: e3.colorLink,
            [l2("color-hover")]: e3.colorLinkHover,
            [l2("color-active")]: e3.colorLinkActive,
            [l2("bg-color-hover")]: e3.linkHoverBg,
          },
          [`&${t2}-color-primary`]: {
            [l2("color-base")]: e3.colorPrimary,
            [l2("color-hover")]: e3.colorPrimaryHover,
            [l2("color-active")]: e3.colorPrimaryActive,
            [l2("color-light")]: e3.colorPrimaryBg,
            [l2("color-light-hover")]: e3.colorPrimaryBgHover,
            [l2("color-light-active")]: e3.colorPrimaryBorder,
            [l2("shadow")]: e3.primaryShadow,
            [`&${t2}-variant-solid`]: {
              [l2("text-color")]: e3.primaryColor,
              [l2("text-color-hover")]: a2("text-color"),
              [l2("text-color-active")]: a2("text-color"),
            },
          },
          [`&${t2}-color-dangerous`]: {
            [l2("color-base")]: e3.colorError,
            [l2("color-hover")]: e3.colorErrorHover,
            [l2("color-active")]: e3.colorErrorActive,
            [l2("color-light")]: e3.colorErrorBg,
            [l2("color-light-hover")]: e3.colorErrorBgFilledHover,
            [l2("color-light-active")]: e3.colorErrorBgActive,
            [l2("shadow")]: e3.dangerShadow,
            [`&${t2}-variant-solid`]: {
              [l2("text-color")]: e3.dangerColor,
              [l2("text-color-hover")]: a2("text-color"),
              [l2("text-color-active")]: a2("text-color"),
            },
          },
          [`&${t2}-color-default`]: {
            [l2("solid-bg-color")]: e3.colorBgSolid,
            [l2("solid-bg-color-hover")]: e3.colorBgSolidHover,
            [l2("solid-bg-color-active")]: e3.colorBgSolidActive,
            [l2("color-base")]: e3.defaultBorderColor,
            [l2("color-hover")]: e3.defaultHoverBorderColor,
            [l2("color-active")]: e3.defaultActiveBorderColor,
            [l2("color-light")]: e3.colorFillTertiary,
            [l2("color-light-hover")]: e3.colorFillSecondary,
            [l2("color-light-active")]: e3.colorFill,
            [l2("text-color")]: e3.defaultColor,
            [l2("text-color-hover")]: e3.defaultHoverColor,
            [l2("text-color-active")]: e3.defaultActiveColor,
            [l2("shadow")]: e3.defaultShadow,
            [`&${t2}-variant-outlined`]: { [l2("bg-color-disabled")]: e3.defaultBgDisabled },
            [`&${t2}-variant-solid`]: {
              [l2("text-color")]: e3.solidTextColor,
              [l2("text-color-hover")]: a2("text-color"),
              [l2("text-color-active")]: a2("text-color"),
            },
            [`&${t2}-variant-filled, &${t2}-variant-text`]: {
              [l2("text-color-hover")]: a2("text-color"),
              [l2("text-color-active")]: a2("text-color"),
            },
            [`&${t2}-variant-outlined, &${t2}-variant-dashed`]: {
              [l2("text-color")]: e3.defaultColor,
              [l2("text-color-hover")]: e3.defaultHoverColor,
              [l2("text-color-active")]: e3.defaultActiveColor,
              [l2("bg-color-container")]: e3.defaultBg,
              [l2("bg-color-hover")]: e3.defaultHoverBg,
              [l2("bg-color-active")]: e3.defaultActiveBg,
            },
            [`&${t2}-variant-text`]: {
              [l2("text-color")]: e3.textTextColor,
              [l2("text-color-hover")]: e3.textTextHoverColor,
              [l2("text-color-active")]: e3.textTextActiveColor,
              [l2("bg-color-hover")]: e3.textHoverBg,
            },
            [`&${t2}-background-ghost`]: {
              [`&${t2}-variant-outlined, &${t2}-variant-dashed`]: {
                [l2("text-color")]: e3.defaultGhostColor,
                [l2("border-color")]: e3.defaultGhostBorderColor,
              },
            },
          },
        },
        c.map((o3) => {
          const n3 = e3[`${o3}6`],
            r3 = e3[`${o3}1`],
            a3 = e3[`${o3}Hover`],
            i2 = e3[`${o3}2`],
            s2 = e3[`${o3}3`],
            c2 = e3[`${o3}Active`],
            d2 = e3[`${o3}ShadowColor`];
          return {
            [`&${t2}-color-${o3}`]: {
              [l2("color-base")]: n3,
              [l2("color-hover")]: a3,
              [l2("color-active")]: c2,
              [l2("color-light")]: r3,
              [l2("color-light-hover")]: i2,
              [l2("color-light-active")]: s2,
              [l2("shadow")]: d2,
            },
          };
        }),
        {
          [`&:disabled, &${e3.componentCls}-disabled`]: {
            cursor: "not-allowed",
            borderColor: e3.colorBorderDisabled,
            background: a2("bg-color-disabled"),
            color: e3.colorTextDisabled,
            boxShadow: "none",
          },
        },
        {
          [`&${t2}-background-ghost`]: {
            [l2("bg-color")]: e3.ghostBg,
            [l2("bg-color-hover")]: e3.ghostBg,
            [l2("bg-color-active")]: e3.ghostBg,
            [l2("shadow")]: "none",
            [`&${t2}-variant-outlined, &${t2}-variant-dashed`]: {
              [l2("bg-color-hover")]: e3.ghostBg,
              [l2("bg-color-active")]: e3.ghostBg,
            },
          },
        },
      ],
    };
  },
  cn = (e3) => {
    const {
      componentCls: t2,
      iconCls: o2,
      fontWeight: n2,
      opacityLoading: r2,
      motionDurationSlow: l2,
      motionEaseInOut: a2,
      iconGap: i2,
      calc: s2,
    } = e3;
    return {
      [t2]: {
        outline: "none",
        position: "relative",
        display: "inline-flex",
        gap: i2,
        alignItems: "center",
        justifyContent: "center",
        fontWeight: n2,
        whiteSpace: "nowrap",
        textAlign: "center",
        backgroundImage: "none",
        cursor: "pointer",
        transition: `all ${e3.motionDurationMid} ${e3.motionEaseInOut}`,
        userSelect: "none",
        touchAction: "manipulation",
        "@media (prefers-reduced-motion: reduce)": {
          "&, &::before, &::after": { transition: "none", animation: "none" },
        },
        "&:disabled > *": { pointerEvents: "none" },
        [`${t2}-icon > svg`]: Z(),
        [`${t2}-icon`]: {
          display: "inline-flex",
          alignItems: "center",
          [o2]: {
            verticalAlign: "middle",
            "&:before": { content: '"\\a0"', display: "inline-block", width: 0 },
          },
        },
        "> a": { color: "currentColor" },
        "&:not(:disabled)": J(e3),
        [`&${t2}-two-chinese-chars::first-letter`]: { letterSpacing: "0.34em" },
        [`&${t2}-two-chinese-chars > *:not(${o2})`]: {
          marginInlineEnd: "-0.34em",
          letterSpacing: "0.34em",
        },
        [`&${t2}-icon-only`]: { paddingInline: 0, [`&${t2}-compact-item`]: { flex: "none" } },
        [`&${t2}-loading`]: { opacity: r2, cursor: "default" },
        [`${t2}-loading-icon`]: {
          transition: ["width", "opacity", "margin"].map((e4) => `${e4} ${l2} ${a2}`).join(","),
        },
        [`&:not(${t2}-icon-end)`]: {
          [`${t2}-loading-icon-motion`]: {
            "&-appear-start, &-enter-start, &-appear-prepare, &-enter-prepare": {
              marginInlineEnd: s2(i2).mul(-1).equal(),
              opacity: 0,
            },
            "&-appear-active, &-enter-active": { marginInlineEnd: 0 },
            "&-leave-start": { marginInlineEnd: 0 },
            "&-leave-active": { marginInlineEnd: s2(i2).mul(-1).equal() },
          },
        },
        "&-icon-end": {
          flexDirection: "row-reverse",
          [`${t2}-loading-icon-motion`]: {
            "&-appear-start, &-enter-start, &-appear-prepare, &-enter-prepare": {
              marginInlineStart: s2(i2).mul(-1).equal(),
              opacity: 0,
            },
            "&-appear-active, &-enter-active": { marginInlineStart: 0 },
            "&-leave-start": { marginInlineStart: 0 },
            "&-leave-active": { marginInlineStart: s2(i2).mul(-1).equal() },
          },
        },
      },
    };
  },
  dn = (e3) => ({ minWidth: e3.controlHeight, paddingInline: 0, borderRadius: "50%" }),
  un = (e3, t2 = "") => {
    const {
      componentCls: o2,
      controlHeight: n2,
      fontSize: r2,
      borderRadius: l2,
      buttonPaddingHorizontal: a2,
      iconCls: i2,
      buttonPaddingVertical: s2,
      buttonIconOnlyFontSize: c2,
    } = e3;
    return [
      {
        [t2]: {
          fontSize: r2,
          height: n2,
          padding: `${X(s2)} ${X(a2)}`,
          borderRadius: l2,
          [`&${o2}-icon-only`]: { width: n2, [i2]: { fontSize: c2 } },
        },
      },
      { [`${o2}${o2}-circle${t2}`]: dn(e3) },
      {
        [`${o2}${o2}-round${t2}`]: {
          borderRadius: e3.controlHeight,
          [`&:not(${o2}-icon-only)`]: { paddingInline: e3.buttonPaddingHorizontal },
        },
      },
    ];
  },
  pn = (e3) => {
    const t2 = q(e3, { fontSize: e3.contentFontSize });
    return un(t2, e3.componentCls);
  },
  mn = (e3) => {
    const t2 = q(e3, {
      controlHeight: e3.controlHeightSM,
      fontSize: e3.contentFontSizeSM,
      padding: e3.paddingXS,
      buttonPaddingHorizontal: e3.paddingInlineSM,
      buttonPaddingVertical: 0,
      borderRadius: e3.borderRadiusSM,
      buttonIconOnlyFontSize: e3.onlyIconSizeSM,
    });
    return un(t2, `${e3.componentCls}-sm`);
  },
  fn = (e3) => {
    const t2 = q(e3, {
      controlHeight: e3.controlHeightLG,
      fontSize: e3.contentFontSizeLG,
      buttonPaddingHorizontal: e3.paddingInlineLG,
      buttonPaddingVertical: 0,
      borderRadius: e3.borderRadiusLG,
      buttonIconOnlyFontSize: e3.onlyIconSizeLG,
    });
    return un(t2, `${e3.componentCls}-lg`);
  },
  hn = (e3) => {
    const { componentCls: t2 } = e3;
    return { [t2]: { [`&${t2}-block`]: { width: "100%" } } };
  },
  gn = Y(
    "Button",
    (e3) => {
      const t2 = ln(e3);
      return [cn(t2), pn(t2), mn(t2), fn(t2), hn(t2), sn(t2), Yo(t2)];
    },
    an,
    {
      unitless: {
        fontWeight: !0,
        contentLineHeight: !0,
        contentLineHeightSM: !0,
        contentLineHeightLG: !0,
      },
    },
  );
function bn(e3, t2, o2) {
  return {
    [`&-item:not(${t2}-last-item)`]: { marginBottom: e3.calc(e3.lineWidth).mul(-1).equal() },
    [`&-item:not(${o2}-status-success)`]: { zIndex: 2 },
    "&-item": {
      "&:focus,&:active": { zIndex: 3 },
      "&:hover": { zIndex: 4 },
      "&[disabled]": { zIndex: 0 },
    },
  };
}
function vn(e3) {
  const t2 = `${e3.componentCls}-compact-vertical`;
  return {
    [t2]: {
      ...bn(e3, t2, e3.componentCls),
      ...((o2 = e3.componentCls),
      (n2 = t2),
      {
        [`&-item:not(${n2}-first-item):not(${n2}-last-item)`]: { borderRadius: 0 },
        [`&-item${n2}-first-item:not(${n2}-last-item)`]: {
          [`&, &${o2}-sm, &${o2}-lg`]: { borderEndEndRadius: 0, borderEndStartRadius: 0 },
        },
        [`&-item${n2}-last-item:not(${n2}-first-item)`]: {
          [`&, &${o2}-sm, &${o2}-lg`]: { borderStartStartRadius: 0, borderStartEndRadius: 0 },
        },
      }),
    },
  };
  var o2, n2;
}
const yn = (e3) => {
    const { antCls: t2, componentCls: o2, lineWidth: n2, calc: r2, colorBgContainer: l2 } = e3,
      a2 = `${o2}-variant-solid:not([disabled])`,
      i2 = r2(n2).mul(-1).equal(),
      [s2, c2] = k(t2, "btn"),
      d2 = (e4) => ({
        [`${o2}-compact${e4 ? "-vertical" : ""}-item`]: {
          [s2("compact-connect-border-color")]: c2("bg-color-hover"),
          [`&${a2}`]: {
            transition: "none",
            [`& + ${a2}:before`]: [
              {
                position: "absolute",
                backgroundColor: c2("compact-connect-border-color"),
                content: '""',
              },
              e4
                ? { top: i2, insetInline: i2, height: n2 }
                : { insetBlock: i2, insetInlineStart: i2, width: n2 },
            ],
            "&:hover:before": { display: "none" },
          },
        },
      });
    return [
      d2(),
      d2(!0),
      {
        [`${a2}${o2}-color-default`]: {
          [s2("compact-connect-border-color")]:
            `color-mix(in srgb, ${c2("bg-color-hover")} 75%, ${l2})`,
        },
      },
    ];
  },
  $n = Q(
    ["Button", "compact"],
    (e3) => {
      const t2 = ln(e3);
      return [ee(t2), vn(t2), yn(t2)];
    },
    an,
  ),
  xn = {
    default: ["default", "outlined"],
    primary: ["primary", "solid"],
    dashed: ["default", "dashed"],
    link: ["link", "link"],
    text: ["default", "text"],
  },
  Cn = It.forwardRef((e3, t2) => {
    const {
        _skipSemantic: o2,
        loading: l2 = !1,
        prefixCls: a2,
        color: i2,
        variant: s2,
        type: c2,
        danger: d2 = !1,
        shape: u2,
        size: p2,
        disabled: m2,
        className: h2,
        rootClassName: g2,
        children: b2,
        icon: y2,
        iconPosition: $2,
        iconPlacement: x2,
        ghost: C2 = !1,
        block: w2 = !1,
        htmlType: S2 = "button",
        classNames: E2,
        styles: k2,
        style: N2,
        autoInsertSpace: I2,
        autoFocus: B2,
        ...R2
      } = e3,
      T2 = te(b2),
      M2 = c2 || "default",
      {
        getPrefixCls: A2,
        direction: L2,
        autoInsertSpace: O2,
        className: D2,
        style: H2,
        classNames: j2,
        styles: _2,
        loadingIcon: K2,
        shape: W2,
        color: F2,
        variant: G2,
      } = oe("button"),
      q2 = u2 || W2 || "default",
      [V2, X2] = Nt.useMemo(() => {
        if (i2 && s2) return [i2, s2];
        if (c2 || d2) {
          const e4 = xn[M2] || [];
          return d2 ? ["danger", e4[1]] : e4;
        }
        return s2 === "solid"
          ? ["primary", s2]
          : F2 && G2
            ? [F2, G2]
            : G2 === "solid"
              ? ["primary", G2]
              : ["default", "outlined"];
      }, [i2, s2, c2, d2, F2, G2, M2]),
      [U2, Y2] = Nt.useMemo(
        () => (C2 && X2 === "solid" ? [V2, "outlined"] : [V2, X2]),
        [V2, X2, C2],
      ),
      Z2 = U2 === "danger",
      J2 = Z2 ? "dangerous" : U2,
      Q2 = I2 ?? O2 ?? !0,
      ee2 = A2("btn", a2),
      [ue2, pe2] = gn(ee2),
      me2 = Nt.useContext(ne),
      fe2 = m2 ?? me2,
      he2 = Nt.useContext(Eo),
      ge2 = Nt.useMemo(
        () =>
          (function (e4) {
            if (v(e4)) {
              let t3 = e4?.delay;
              return (t3 = f(t3) ? t3 : 0), { loading: t3 <= 0, delay: t3 };
            }
            return { loading: !!e4, delay: 0 };
          })(l2),
        [l2],
      ),
      [be2, ve2] = (function (e4) {
        const [t3, o3] = Nt.useState(e4),
          l3 = Nt.useRef(null),
          a3 = n(() => {
            if (l3.current) {
              const [e5, t4] = l3.current;
              e5 ? r.cancel(t4) : clearTimeout(t4), (l3.current = null);
            }
          });
        return (
          Nt.useEffect(() => a3, [a3]),
          [
            t3,
            n((e5, t4) => {
              const n2 = t4 || { frame: 1 };
              a3(),
                n2 === !0
                  ? o3(e5)
                  : (l3.current =
                      "ms" in n2
                        ? [!1, setTimeout(() => o3(e5), n2.ms)]
                        : [!0, r(() => o3(e5), n2.frame)]);
            }),
          ]
        );
      })(ge2.loading),
      [ye2, $e2] = Nt.useState(!1),
      xe2 = Nt.useRef(null),
      Ce2 = re(t2, xe2),
      we2 = T2.length === 1 && !y2 && !Ro(Y2),
      Se2 = Nt.useRef(!0);
    It.useEffect(
      () => (
        (Se2.current = !1),
        () => {
          Se2.current = !0;
        }
      ),
      [],
    ),
      le(() => {
        ge2.delay > 0 ? ve2(!0, { ms: ge2.delay }) : ve2(ge2.loading, !0);
      }, [ge2.delay, ge2.loading]),
      Nt.useEffect(() => {
        if (!xe2.current || !Q2) return;
        const e4 = xe2.current.textContent || "";
        we2 && Io(e4) ? ye2 || $e2(!0) : ye2 && $e2(!1);
      }),
      Nt.useEffect(() => {
        var e4;
        B2 && ((e4 = xe2.current) == null || e4.focus());
      }, []);
    const Ee2 = It.useCallback(
        (t3) => {
          var o3;
          be2 || fe2 ? t3.preventDefault() : (o3 = e3.onClick) == null || o3.call(e3, t3);
        },
        [e3.onClick, be2, fe2],
      ),
      { compactSize: ke2, compactItemClassnames: Ne2 } = ae(ee2, L2),
      Ie2 = ie((e4) => p2 ?? ke2 ?? he2 ?? e4),
      Be2 = be2 ? "loading" : y2,
      Re2 = x2 ?? $2 ?? "start",
      Te2 = se(R2, ["navigate"]),
      Me2 = {
        ...e3,
        type: M2,
        color: U2,
        variant: Y2,
        danger: Z2,
        shape: q2,
        size: Ie2,
        disabled: fe2,
        loading: be2,
        iconPlacement: Re2,
      },
      Pe2 = ce(H2),
      Ae2 = ce(N2),
      [Le2, Oe2] = de([o2 ? void 0 : j2, E2], [o2 ? void 0 : _2, Pe2, k2, Ae2], { props: Me2 }),
      De2 = P(
        ee2,
        ue2,
        pe2,
        {
          [`${ee2}-${q2}`]: q2 !== "default" && q2 !== "square" && q2,
          [`${ee2}-${M2}`]: M2,
          [`${ee2}-dangerous`]: d2,
          [`${ee2}-color-${J2}`]: J2,
          [`${ee2}-variant-${Y2}`]: Y2,
          [`${ee2}-lg`]: Ie2 === "large",
          [`${ee2}-sm`]: Ie2 === "small",
          [`${ee2}-icon-only`]: !b2 && b2 !== 0 && !!Be2,
          [`${ee2}-background-ghost`]: C2 && !Ro(Y2),
          [`${ee2}-loading`]: be2,
          [`${ee2}-two-chinese-chars`]: ye2 && Q2 && !be2,
          [`${ee2}-block`]: w2,
          [`${ee2}-rtl`]: L2 === "rtl",
          [`${ee2}-icon-end`]: Re2 === "end",
        },
        Ne2,
        h2,
        g2,
        D2,
        Le2.root,
      ),
      ze2 = { className: Le2.icon, style: Oe2.icon },
      He2 = (e4) => It.createElement(Mo, { prefixCls: ee2, ...ze2 }, e4),
      je2 = It.createElement(Oo, {
        existIcon: !!y2,
        prefixCls: ee2,
        loading: be2,
        mount: Se2.current,
        ...ze2,
      }),
      _e2 = (v(l2) && l2.icon) || K2;
    let Ke2;
    Ke2 = y2 && !be2 ? He2(y2) : be2 && _e2 ? He2(_e2) : je2;
    const We2 = z(b2) ? To(b2, we2 && Q2, Oe2.content, Le2.content) : null;
    if (Te2.href !== void 0)
      return It.createElement(
        "a",
        {
          ...Te2,
          className: P(De2, { [`${ee2}-disabled`]: fe2 }),
          href: fe2 ? void 0 : Te2.href,
          style: Oe2.root,
          onClick: Ee2,
          ref: Ce2,
          tabIndex: fe2 ? -1 : 0,
          "aria-disabled": fe2,
        },
        Ke2,
        We2,
      );
    let Fe2 = It.createElement(
      "button",
      { ...R2, type: S2, className: De2, style: Oe2.root, onClick: Ee2, disabled: fe2, ref: Ce2 },
      Ke2,
      We2,
      Ne2 && It.createElement($n, { prefixCls: ee2 }),
    );
    return Ro(Y2) || (Fe2 = It.createElement(So, { component: "Button", disabled: be2 }, Fe2)), Fe2;
  }),
  wn = Cn;
(wn.Group = ko), (wn.__ANT_BUTTON = !0);
const Sn = wn,
  En = (e3) => {
    const {
        type: t2,
        children: o2,
        prefixCls: n2,
        buttonProps: r2,
        close: l2,
        autoFocus: a2,
        emitEvent: i2,
        isSilent: s2,
        quitOnNullishReturnValue: c2,
        actionFn: d2,
      } = e3,
      u2 = Nt.useRef(!1),
      p2 = Nt.useRef(null),
      [m2, f2] = ue(!1),
      h2 = (...e4) => {
        l2?.(...e4);
      };
    return (
      Nt.useEffect(() => {
        let e4 = null;
        return (
          a2 &&
            (e4 = setTimeout(() => {
              var e5;
              (e5 = p2.current) == null || e5.focus({ preventScroll: !0 });
            })),
          () => {
            e4 && clearTimeout(e4);
          }
        );
      }, [a2]),
      Nt.createElement(
        Sn,
        {
          ...Bo(t2),
          onClick: (e4) => {
            if (u2.current) return;
            if (((u2.current = !0), !d2)) return void h2();
            let t3;
            if (i2) {
              if (((t3 = d2(e4)), c2 && !pe(t3))) return (u2.current = !1), void h2(e4);
            } else if (d2.length) (t3 = d2(l2)), (u2.current = !1);
            else if (((t3 = d2()), !pe(t3))) return void h2();
            ((e5) => {
              pe(e5) &&
                (f2(!0),
                e5.then(
                  (...e6) => {
                    f2(!1, !0), h2.apply(void 0, e6), (u2.current = !1);
                  },
                  (e6) => {
                    if ((f2(!1, !0), (u2.current = !1), !s2?.())) return Promise.reject(e6);
                  },
                ));
            })(t3);
          },
          loading: m2,
          prefixCls: n2,
          ...r2,
          ref: p2,
        },
        o2,
      )
    );
  },
  kn = It.createContext({}),
  { Provider: Nn } = kn,
  In = () => {
    const {
      autoFocusButton: e3,
      cancelButtonProps: t2,
      cancelTextLocale: o2,
      isSilent: n2,
      mergedOkCancel: r2,
      rootPrefixCls: l2,
      close: a2,
      onCancel: i2,
      onConfirm: s2,
      onClose: c2,
    } = Nt.useContext(kn);
    return r2
      ? It.createElement(
          En,
          {
            isSilent: n2,
            actionFn: i2,
            close: (...e4) => {
              a2?.(...e4), s2?.(!1), c2?.();
            },
            autoFocus: e3 === "cancel",
            buttonProps: t2,
            prefixCls: `${l2}-btn`,
          },
          o2,
        )
      : null;
  },
  Bn = () => {
    const {
      autoFocusButton: e3,
      close: t2,
      isSilent: o2,
      okButtonProps: n2,
      rootPrefixCls: r2,
      okTextLocale: l2,
      okType: a2,
      onConfirm: i2,
      onOk: s2,
      onClose: c2,
    } = Nt.useContext(kn);
    return It.createElement(
      En,
      {
        isSilent: o2,
        type: a2 || "primary",
        actionFn: s2,
        close: (...e4) => {
          t2?.(...e4), i2?.(!0), c2?.();
        },
        autoFocus: e3 === "ok",
        buttonProps: n2,
        prefixCls: `${r2}-btn`,
      },
      l2,
    );
  },
  Rn = Nt.createContext({});
function Tn(e3, t2, o2) {
  let n2 = t2;
  return !n2 && o2 && (n2 = `${e3}-${o2}`), n2;
}
function Mn(e3, t2) {
  let o2 = e3[`page${t2 ? "Y" : "X"}Offset`];
  const n2 = "scroll" + (t2 ? "Top" : "Left");
  if (typeof o2 != "number") {
    const t3 = e3.document;
    (o2 = t3.documentElement[n2]), typeof o2 != "number" && (o2 = t3.body[n2]);
  }
  return o2;
}
const Pn = Nt.memo(
  ({ children: e3 }) => e3,
  (e3, { shouldUpdate: t2 }) => !t2,
);
function An() {
  return (
    (An = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    An.apply(this, arguments)
  );
}
const Ln = It.forwardRef((e3, t2) => {
  const {
      prefixCls: o2,
      className: n2,
      style: r2,
      title: l2,
      ariaId: a2,
      footer: i2,
      closable: s2,
      closeIcon: c2,
      onClose: d2,
      children: u2,
      bodyStyle: p2,
      bodyProps: m2,
      modalRender: f2,
      onMouseDown: h2,
      onMouseUp: g2,
      holderRef: b2,
      visible: v2,
      forceRender: y2,
      width: $2,
      height: x2,
      classNames: C2,
      styles: S2,
      isFixedPos: E2,
      focusTrap: k2,
    } = e3,
    { panel: N2 } = It.useContext(Rn),
    I2 = Nt.useRef(null),
    B2 = re(b2, N2, I2),
    [R2] = _t(v2 && E2 && k2 !== !1, () => I2.current);
  It.useImperativeHandle(t2, () => ({
    focus: () => {
      var e4;
      (e4 = I2.current) == null || e4.focus({ preventScroll: !0 });
    },
  }));
  const T2 = {};
  $2 !== void 0 && (T2.width = $2), x2 !== void 0 && (T2.height = x2);
  const M2 = i2
      ? It.createElement(
          "div",
          { className: P(`${o2}-footer`, C2?.footer), style: { ...S2?.footer } },
          i2,
        )
      : null,
    A2 = l2
      ? It.createElement(
          "div",
          { className: P(`${o2}-header`, C2?.header), style: { ...S2?.header } },
          It.createElement(
            "div",
            { className: P(`${o2}-title`, C2?.title), id: a2, style: { ...S2?.title } },
            l2,
          ),
        )
      : null,
    L2 = Nt.useMemo(
      () =>
        typeof s2 == "object" && s2 !== null
          ? s2
          : s2
            ? { closeIcon: c2 ?? It.createElement("span", { className: `${o2}-close-x` }) }
            : {},
      [s2, c2, o2],
    ),
    O2 = w(L2, !0),
    D2 = typeof s2 == "object" && s2.disabled,
    z2 = s2
      ? It.createElement(
          "button",
          An({ type: "button", onClick: d2, "aria-label": "Close" }, O2, {
            className: P(`${o2}-close`, C2?.close),
            disabled: D2,
            style: S2?.close,
          }),
          L2.closeIcon,
        )
      : null,
    H2 = It.createElement(
      "div",
      { className: P(`${o2}-container`, C2?.container), style: S2?.container },
      z2,
      A2,
      It.createElement(
        "div",
        An({ className: P(`${o2}-body`, C2?.body), style: { ...p2, ...S2?.body } }, m2),
        u2,
      ),
      M2,
    );
  return It.createElement(
    "div",
    {
      key: "dialog-element",
      role: "dialog",
      "aria-labelledby": l2 ? a2 : null,
      "aria-modal": "true",
      ref: B2,
      style: { ...r2, ...T2 },
      className: P(o2, n2),
      onMouseDown: h2,
      onMouseUp: g2,
      tabIndex: -1,
      onFocus: (e4) => {
        R2(e4.target);
      },
    },
    It.createElement(Pn, { shouldUpdate: v2 || y2 }, f2 ? f2(H2) : H2),
  );
});
function On() {
  return (
    (On = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    On.apply(this, arguments)
  );
}
const Dn = Nt.forwardRef((e3, t2) => {
  const {
      prefixCls: o2,
      title: n2,
      style: r2,
      className: l2,
      visible: a2,
      forceRender: i2,
      destroyOnHidden: s2,
      motionName: c2,
      ariaId: d2,
      onVisibleChanged: u2,
      mousePosition: p2,
    } = e3,
    m2 = Nt.useRef(null),
    f2 = Nt.useRef(null);
  Nt.useImperativeHandle(t2, () => ({
    ...f2.current,
    inMotion: m2.current.inMotion,
    enableMotion: m2.current.enableMotion,
  }));
  const [h2, g2] = Nt.useState(),
    b2 = {};
  function v2() {
    var e4;
    if (!((e4 = m2.current) != null && e4.nativeElement)) return;
    const t3 = (function (e5) {
      const t4 = e5.getBoundingClientRect(),
        o3 = { left: t4.left, top: t4.top },
        n3 = e5.ownerDocument,
        r3 = n3.defaultView || n3.parentWindow;
      return (o3.left += Mn(r3)), (o3.top += Mn(r3, !0)), o3;
    })(m2.current.nativeElement);
    g2(p2 && (p2.x || p2.y) ? `${p2.x - t3.left}px ${p2.y - t3.top}px` : "");
  }
  return (
    h2 && (b2.transformOrigin = h2),
    Nt.createElement(
      R,
      {
        visible: a2,
        onVisibleChanged: u2,
        onAppearPrepare: v2,
        onEnterPrepare: v2,
        forceRender: i2,
        motionName: c2,
        removeOnLeave: s2,
        ref: m2,
      },
      ({ className: t3, style: a3 }, i3) =>
        Nt.createElement(
          Ln,
          On({}, e3, {
            ref: f2,
            title: n2,
            ariaId: d2,
            prefixCls: o2,
            holderRef: i3,
            style: { ...a3, ...r2, ...b2 },
            className: P(l2, t3),
          }),
        ),
    )
  );
});
function zn() {
  return (
    (zn = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    zn.apply(this, arguments)
  );
}
const Hn = (e3) => {
  const {
    prefixCls: t2,
    style: o2,
    visible: n2,
    maskProps: r2,
    motionName: l2,
    className: a2,
  } = e3;
  return Nt.createElement(
    R,
    { key: "mask", visible: n2, motionName: l2, leavedClassName: `${t2}-mask-hidden` },
    ({ className: e4, style: n3 }, l3) =>
      Nt.createElement(
        "div",
        zn({ ref: l3, style: { ...n3, ...o2 }, className: P(`${t2}-mask`, e4, a2) }, r2),
      ),
  );
};
function jn() {
  return (
    (jn = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    jn.apply(this, arguments)
  );
}
const _n = (e3) => {
  const {
      prefixCls: t2 = "rc-dialog",
      zIndex: o2,
      visible: n2 = !1,
      focusTriggerAfterClose: r2 = !0,
      wrapStyle: a2,
      wrapClassName: i2,
      wrapProps: s2,
      onClose: c2,
      afterOpenChange: d2,
      afterClose: u2,
      transitionName: p2,
      animation: m2,
      closable: f2 = !0,
      mask: h2 = !0,
      maskTransitionName: g2,
      maskAnimation: b2,
      maskClosable: v2 = !0,
      maskStyle: y2,
      maskProps: $2,
      rootClassName: x2,
      rootStyle: C2,
      classNames: S2,
      styles: E2,
    } = e3,
    k2 = Nt.useRef(null),
    N2 = Nt.useRef(null),
    I2 = Nt.useRef(null),
    [B2, R2] = Nt.useState(n2),
    [T2, M2] = Nt.useState(!1),
    A2 = l();
  function L2() {
    if ((R2(!1), h2 && k2.current && r2)) {
      try {
        k2.current.focus({ preventScroll: !0 });
      } catch {}
      k2.current = null;
    }
    B2 && u2?.();
  }
  function O2(e4) {
    c2?.(e4);
  }
  const D2 = Nt.useRef(!1);
  let z2 = null;
  v2 &&
    (z2 = (e4) => {
      N2.current === e4.target && D2.current && O2(e4);
    }),
    Nt.useEffect(() => {
      if (n2) {
        if (
          ((D2.current = !1),
          R2(!0),
          me(N2.current, document.activeElement) || (k2.current = document.activeElement),
          N2.current)
        ) {
          const e4 = getComputedStyle(N2.current);
          M2(e4.position === "fixed");
        }
      } else B2 && I2.current.enableMotion() && !I2.current.inMotion() && L2();
    }, [n2]);
  const H2 = { zIndex: o2, ...a2, ...E2?.wrapper, display: B2 ? null : "none" };
  return Nt.createElement(
    "div",
    jn({ className: P(`${t2}-root`, x2), style: C2 }, w(e3, { data: !0 })),
    Nt.createElement(Hn, {
      prefixCls: t2,
      visible: h2 && n2,
      motionName: Tn(t2, g2, b2),
      style: { zIndex: o2, ...y2, ...E2?.mask },
      maskProps: $2,
      className: S2?.mask,
    }),
    Nt.createElement(
      "div",
      jn(
        {
          className: P(`${t2}-wrap`, i2, S2?.wrapper),
          ref: N2,
          onClick: z2,
          onMouseDown: function (e4) {
            D2.current = e4.target === N2.current;
          },
          style: H2,
        },
        s2,
      ),
      Nt.createElement(
        Dn,
        jn({}, e3, {
          isFixedPos: T2,
          ref: I2,
          closable: f2,
          ariaId: A2,
          prefixCls: t2,
          visible: n2 && B2,
          onClose: O2,
          onVisibleChanged: function (e4) {
            var t3;
            e4
              ? me(N2.current, document.activeElement) || (t3 = I2.current) == null || t3.focus()
              : L2(),
              d2?.(e4);
          },
          motionName: Tn(t2, p2, m2),
        }),
      ),
    ),
  );
};
function Kn() {
  return (
    (Kn = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    Kn.apply(this, arguments)
  );
}
const Wn = (e3) => {
    const {
        visible: t2,
        getContainer: o2,
        forceRender: n2,
        destroyOnHidden: r2 = !1,
        afterClose: l2,
        closable: a2,
        panelRef: i2,
        keyboard: s2 = !0,
        scrollLock: c2 = !0,
        onClose: d2,
      } = e3,
      { scrollLock: u2, ...p2 } = e3,
      [m2, f2] = Nt.useState(t2),
      h2 = Nt.useMemo(() => ({ panel: i2 }), [i2]);
    return (
      Nt.useEffect(() => {
        t2 && f2(!0);
      }, [t2]),
      n2 || !r2 || m2
        ? Nt.createElement(
            Rn.Provider,
            { value: h2 },
            Nt.createElement(
              fe,
              {
                open: t2 || n2 || m2,
                onEsc: ({ top: e4, event: t3 }) => {
                  if (e4 && s2) return t3.stopPropagation(), void (d2 == null || d2(t3));
                },
                autoDestroy: !1,
                getContainer: o2,
                autoLock: c2 && (t2 || m2),
              },
              Nt.createElement(
                _n,
                Kn({}, p2, {
                  destroyOnHidden: r2,
                  afterClose: () => {
                    const e4 = a2 && typeof a2 == "object" ? a2 : {},
                      { afterClose: t3 } = e4 || {};
                    t3?.(), l2?.(), f2(!1);
                  },
                }),
              ),
            ),
          )
        : null
    );
  },
  Fn = (e3) => {
    const { prefixCls: t2, className: o2, style: n2, size: r2, shape: l2 } = e3,
      a2 = P({ [`${t2}-lg`]: r2 === "large", [`${t2}-sm`]: r2 === "small" }),
      i2 = P({
        [`${t2}-circle`]: l2 === "circle",
        [`${t2}-square`]: l2 === "square",
        [`${t2}-round`]: l2 === "round",
      }),
      s2 = Nt.useMemo(() => (f(r2) ? { width: r2, height: r2, lineHeight: `${r2}px` } : {}), [r2]);
    return Nt.createElement("span", { className: P(t2, a2, i2, o2), style: { ...s2, ...n2 } });
  },
  Gn = new K("ant-skeleton-loading", {
    "0%": { backgroundPosition: "100% 50%" },
    "100%": { backgroundPosition: "0 50%" },
  }),
  qn = (e3) => ({ height: e3, lineHeight: X(e3) }),
  Vn = (e3) => ({ width: e3, ...qn(e3) }),
  Xn = (e3) => ({
    background: e3.skeletonLoadingBackground,
    backgroundSize: "400% 100%",
    animationName: Gn,
    animationDuration: e3.skeletonLoadingMotionDuration,
    animationTimingFunction: "ease",
    animationIterationCount: "infinite",
  }),
  Un = (e3, t2) => ({ width: t2(e3).mul(5).equal(), minWidth: t2(e3).mul(5).equal(), ...qn(e3) }),
  Yn = (e3) => {
    const {
      skeletonAvatarCls: t2,
      gradientFromColor: o2,
      controlHeight: n2,
      controlHeightLG: r2,
      controlHeightSM: l2,
    } = e3;
    return {
      [t2]: { display: "inline-block", verticalAlign: "top", background: o2, ...Vn(n2) },
      [`${t2}${t2}-circle`]: { borderRadius: "50%" },
      [`${t2}${t2}-lg`]: { ...Vn(r2) },
      [`${t2}${t2}-sm`]: { ...Vn(l2) },
    };
  },
  Zn = (e3) => {
    const {
      controlHeight: t2,
      borderRadiusSM: o2,
      skeletonInputCls: n2,
      controlHeightLG: r2,
      controlHeightSM: l2,
      gradientFromColor: a2,
      calc: i2,
    } = e3;
    return {
      [n2]: {
        display: "inline-block",
        verticalAlign: "top",
        background: a2,
        borderRadius: o2,
        ...Un(t2, i2),
      },
      [`${n2}-lg`]: { ...Un(r2, i2) },
      [`${n2}-sm`]: { ...Un(l2, i2) },
    };
  },
  Jn = (e3) => {
    const { gradientFromColor: t2, borderRadiusSM: o2, imageSizeBase: n2, calc: r2 } = e3;
    return {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      verticalAlign: "middle",
      background: t2,
      borderRadius: o2,
      ...Vn(r2(n2).mul(2).equal()),
    };
  },
  Qn = (e3) => ({ [e3.skeletonNodeCls]: { ...Jn(e3) } }),
  er = (e3) => {
    const { skeletonImageCls: t2, imageSizeBase: o2, calc: n2 } = e3;
    return {
      [t2]: {
        ...Jn(e3),
        [`${t2}-path`]: { fill: "#bfbfbf" },
        [`${t2}-svg`]: {
          ...Vn(o2),
          maxWidth: n2(o2).mul(4).equal(),
          maxHeight: n2(o2).mul(4).equal(),
        },
        [`${t2}-svg${t2}-svg-circle`]: { borderRadius: "50%" },
      },
      [`${t2}${t2}-circle`]: { borderRadius: "50%" },
    };
  },
  tr = (e3, t2, o2) => {
    const { skeletonButtonCls: n2 } = e3;
    return {
      [`${o2}${n2}-circle`]: { width: t2, minWidth: t2, borderRadius: "50%" },
      [`${o2}${n2}-round`]: { borderRadius: t2 },
    };
  },
  or = (e3, t2) => ({ width: t2(e3).mul(2).equal(), minWidth: t2(e3).mul(2).equal(), ...qn(e3) }),
  nr = (e3) => {
    const {
      borderRadiusSM: t2,
      skeletonButtonCls: o2,
      controlHeight: n2,
      controlHeightLG: r2,
      controlHeightSM: l2,
      gradientFromColor: a2,
      calc: i2,
    } = e3;
    return {
      [o2]: {
        display: "inline-block",
        verticalAlign: "top",
        background: a2,
        borderRadius: t2,
        width: i2(n2).mul(2).equal(),
        minWidth: i2(n2).mul(2).equal(),
        ...or(n2, i2),
      },
      ...tr(e3, n2, o2),
      [`${o2}-lg`]: { ...or(r2, i2) },
      ...tr(e3, r2, `${o2}-lg`),
      [`${o2}-sm`]: { ...or(l2, i2) },
      ...tr(e3, l2, `${o2}-sm`),
    };
  },
  rr = Y(
    "Skeleton",
    (e3) => {
      const { componentCls: t2, calc: o2 } = e3;
      return ((e4) => {
        const {
          componentCls: t3,
          skeletonAvatarCls: o3,
          skeletonTitleCls: n2,
          skeletonParagraphCls: r2,
          skeletonButtonCls: l2,
          skeletonInputCls: a2,
          skeletonNodeCls: i2,
          skeletonImageCls: s2,
          controlHeight: c2,
          controlHeightLG: d2,
          controlHeightSM: u2,
          gradientFromColor: p2,
          padding: m2,
          marginSM: f2,
          borderRadius: h2,
          titleHeight: g2,
          blockRadius: b2,
          paragraphLiHeight: v2,
          controlHeightXS: y2,
          paragraphMarginTop: $2,
        } = e4;
        return {
          [t3]: {
            display: "table",
            width: "100%",
            [`${t3}-header`]: {
              display: "table-cell",
              paddingInlineEnd: m2,
              verticalAlign: "top",
              [o3]: { display: "inline-block", verticalAlign: "top", background: p2, ...Vn(c2) },
              [`${o3}-circle`]: { borderRadius: "50%" },
              [`${o3}-lg`]: { ...Vn(d2) },
              [`${o3}-sm`]: { ...Vn(u2) },
            },
            [`${t3}-section`]: {
              display: "table-cell",
              width: "100%",
              verticalAlign: "top",
              [n2]: {
                width: "100%",
                height: g2,
                background: p2,
                borderRadius: b2,
                [`+ ${r2}`]: { marginBlockStart: u2 },
              },
              [r2]: {
                padding: 0,
                "> li": {
                  width: "100%",
                  height: v2,
                  listStyle: "none",
                  background: p2,
                  borderRadius: b2,
                  "+ li": { marginBlockStart: y2 },
                },
              },
              [`${r2}> li:last-child:not(:first-child):not(:nth-child(2))`]: { width: "61%" },
            },
            [`&-round ${t3}-section`]: { [`${n2}, ${r2} > li`]: { borderRadius: h2 } },
          },
          [`${t3}-with-avatar ${t3}-section`]: {
            [n2]: { marginBlockStart: f2, [`+ ${r2}`]: { marginBlockStart: $2 } },
          },
          [`${t3}${t3}-element`]: {
            display: "inline-block",
            width: "auto",
            ...nr(e4),
            ...Yn(e4),
            ...Zn(e4),
            ...Qn(e4),
            ...er(e4),
          },
          [`${t3}${t3}-block`]: { width: "100%", [l2]: { width: "100%" }, [a2]: { width: "100%" } },
          [`${t3}${t3}-active`]: {
            [`
        ${n2},
        ${r2} > li,
        ${o3},
        ${l2},
        ${a2},
        ${i2},
        ${s2}
      `]: { ...Xn(e4) },
          },
        };
      })(
        q(e3, {
          skeletonAvatarCls: `${t2}-avatar`,
          skeletonTitleCls: `${t2}-title`,
          skeletonParagraphCls: `${t2}-paragraph`,
          skeletonButtonCls: `${t2}-button`,
          skeletonInputCls: `${t2}-input`,
          skeletonNodeCls: `${t2}-node`,
          skeletonImageCls: `${t2}-image`,
          imageSizeBase: o2(e3.controlHeight).mul(1.5).equal(),
          borderRadius: 100,
          skeletonLoadingBackground: `linear-gradient(90deg, ${e3.gradientFromColor} 25%, ${e3.gradientToColor} 37%, ${e3.gradientFromColor} 63%)`,
          skeletonLoadingMotionDuration: "1.4s",
        }),
      );
    },
    (e3) => {
      const { colorFillContent: t2, colorFill: o2 } = e3;
      return {
        color: t2,
        colorGradientEnd: o2,
        gradientFromColor: t2,
        gradientToColor: o2,
        titleHeight: e3.controlHeight / 2,
        blockRadius: e3.borderRadiusSM,
        paragraphMarginTop: e3.marginLG + e3.marginXXS,
        paragraphLiHeight: e3.controlHeight / 2,
      };
    },
    {
      deprecatedTokens: [
        ["color", "gradientFromColor"],
        ["colorGradientEnd", "gradientToColor"],
      ],
    },
  ),
  lr = (e3) => {
    const {
        prefixCls: t2,
        className: o2,
        classNames: n2,
        rootClassName: r2,
        active: l2,
        style: a2,
        styles: i2,
        shape: s2 = "circle",
        size: c2,
        ...d2
      } = e3,
      { getPrefixCls: u2 } = Nt.useContext(B),
      p2 = u2("skeleton", t2),
      [m2, f2] = rr(p2),
      h2 = ie((e4) => c2 ?? e4),
      g2 = P(p2, `${p2}-element`, { [`${p2}-active`]: l2 }, n2?.root, o2, r2, m2, f2);
    return Nt.createElement(
      "div",
      { className: g2, style: i2?.root },
      Nt.createElement(Fn, {
        prefixCls: `${p2}-avatar`,
        className: n2?.content,
        style: { ...i2?.content, ...a2 },
        shape: s2,
        size: h2,
        ...d2,
      }),
    );
  },
  ar = (e3) => {
    const {
        prefixCls: t2,
        className: o2,
        rootClassName: n2,
        classNames: r2,
        active: l2,
        style: a2,
        styles: i2,
        block: s2 = !1,
        size: c2,
        ...d2
      } = e3,
      { getPrefixCls: u2 } = Nt.useContext(B),
      p2 = u2("skeleton", t2),
      [m2, f2] = rr(p2),
      h2 = ie((e4) => c2 ?? e4),
      g2 = P(
        p2,
        `${p2}-element`,
        { [`${p2}-active`]: l2, [`${p2}-block`]: s2 },
        r2?.root,
        o2,
        n2,
        m2,
        f2,
      );
    return Nt.createElement(
      "div",
      { className: g2, style: i2?.root },
      Nt.createElement(Fn, {
        prefixCls: `${p2}-button`,
        className: r2?.content,
        style: { ...i2?.content, ...a2 },
        size: h2,
        ...d2,
      }),
    );
  },
  ir = (e3) => {
    const {
        prefixCls: t2,
        className: o2,
        classNames: n2,
        rootClassName: r2,
        internalClassName: l2,
        style: a2,
        styles: i2,
        active: s2,
        children: c2,
      } = e3,
      { getPrefixCls: d2 } = Nt.useContext(B),
      u2 = d2("skeleton", t2),
      [p2, m2] = rr(u2),
      f2 = P(u2, `${u2}-element`, { [`${u2}-active`]: s2 }, p2, n2?.root, o2, r2, m2);
    return Nt.createElement(
      "div",
      { className: f2, style: i2?.root },
      Nt.createElement(
        "div",
        { className: P(n2?.content, l2 || `${u2}-node`), style: { ...i2?.content, ...a2 } },
        c2,
      ),
    );
  },
  sr = (e3) => {
    const { getPrefixCls: t2 } = Nt.useContext(B),
      o2 = t2("skeleton", e3.prefixCls);
    return Nt.createElement(
      ir,
      { ...e3, internalClassName: `${o2}-image` },
      Nt.createElement(
        "svg",
        {
          viewBox: "0 0 1098 1024",
          xmlns: "http://www.w3.org/2000/svg",
          className: `${o2}-image-svg`,
          "aria-hidden": "true",
          focusable: "false",
        },
        Nt.createElement("title", null, "Image placeholder"),
        Nt.createElement("path", {
          d: "M365.7 329.1q0 45.8-32 77.7t-77.7 32-77.7-32-32-77.7 32-77.6 77.7-32 77.7 32 32 77.6M951 548.6v256H146.3V694.9L329 512l91.5 91.4L713 311zm54.8-402.3H91.4q-7.4 0-12.8 5.4T73 164.6v694.8q0 7.5 5.5 12.9t12.8 5.4h914.3q7.5 0 12.9-5.4t5.4-12.9V164.6q0-7.5-5.4-12.9t-12.9-5.4m91.4 18.3v694.8q0 37.8-26.8 64.6t-64.6 26.9H91.4q-37.7 0-64.6-26.9T0 859.4V164.6q0-37.8 26.8-64.6T91.4 73h914.3q37.8 0 64.6 26.9t26.8 64.6",
          className: `${o2}-image-path`,
        }),
      ),
    );
  },
  cr = (e3) => {
    const {
        prefixCls: t2,
        className: o2,
        classNames: n2,
        rootClassName: r2,
        active: l2,
        block: a2,
        style: i2,
        styles: s2,
        size: c2,
        ...d2
      } = e3,
      { getPrefixCls: u2 } = Nt.useContext(B),
      p2 = u2("skeleton", t2),
      [m2, f2] = rr(p2),
      h2 = ie((e4) => c2 ?? e4),
      g2 = P(
        p2,
        `${p2}-element`,
        { [`${p2}-active`]: l2, [`${p2}-block`]: a2 },
        n2?.root,
        o2,
        r2,
        m2,
        f2,
      );
    return Nt.createElement(
      "div",
      { className: g2, style: s2?.root },
      Nt.createElement(Fn, {
        prefixCls: `${p2}-input`,
        className: n2?.content,
        style: { ...s2?.content, ...i2 },
        size: h2,
        ...d2,
      }),
    );
  },
  dr = (e3, t2) => {
    const { width: o2, rows: n2 = 2 } = t2;
    return Array.isArray(o2) ? o2[e3] : n2 - 1 === e3 ? o2 : void 0;
  },
  ur = (e3) => {
    const { prefixCls: t2, className: o2, style: n2, rows: r2 = 0 } = e3,
      l2 = Array.from({ length: r2 }).map((t3, o3) =>
        Nt.createElement("li", { key: o3, style: { width: dr(o3, e3) } }),
      );
    return Nt.createElement("ul", { className: P(t2, o2), style: n2 }, l2);
  },
  pr = ({ prefixCls: e3, className: t2, width: o2, style: n2 }) =>
    Nt.createElement("h3", { className: P(e3, t2), style: { width: o2, ...n2 } });
function mr(e3) {
  return v(e3) ? e3 : {};
}
function fr(e3, t2) {
  return e3 && !t2 ? { size: "large", shape: "square" } : { size: "large", shape: "circle" };
}
function hr(e3, t2) {
  return !e3 && t2 ? { width: "38%" } : e3 && t2 ? { width: "50%" } : {};
}
function gr(e3, t2) {
  const o2 = {};
  return (e3 && t2) || (o2.width = "61%"), (o2.rows = !e3 && t2 ? 3 : 2), o2;
}
const br = It.forwardRef((e3, t2) => {
  const {
      prefixCls: o2,
      loading: n2,
      className: r2,
      rootClassName: l2,
      classNames: a2,
      style: i2,
      styles: s2,
      children: c2,
      avatar: d2 = !1,
      title: u2 = !0,
      paragraph: p2 = !0,
      active: m2,
      round: f2,
    } = e3,
    {
      getPrefixCls: h2,
      direction: g2,
      className: b2,
      style: v2,
      classNames: y2,
      styles: $2,
    } = oe("skeleton"),
    x2 = h2("skeleton", o2),
    [C2, w2] = rr(x2),
    S2 = { ...e3, avatar: d2, title: u2, paragraph: p2 },
    E2 = ce(v2),
    k2 = ce(i2),
    [N2, I2] = de([y2, a2], [$2, E2, s2, k2], { props: S2 }),
    B2 = It.useRef(null);
  if (
    (It.useImperativeHandle(t2, () => ({ nativeElement: B2.current })), n2 || !("loading" in e3))
  ) {
    const e4 = !!d2,
      t3 = !!u2,
      o3 = !!p2;
    let n3, a3;
    if (e4) {
      const e5 = {
        className: N2.avatar,
        prefixCls: `${x2}-avatar`,
        ...fr(t3, o3),
        ...mr(d2),
        style: I2.avatar,
      };
      n3 = It.createElement(
        "div",
        { className: P(N2.header, `${x2}-header`), style: I2.header },
        It.createElement(Fn, { ...e5 }),
      );
    }
    if (t3 || o3) {
      let n4, r3;
      if (t3) {
        const t4 = {
          className: N2.title,
          prefixCls: `${x2}-title`,
          ...hr(e4, o3),
          ...mr(u2),
          style: I2.title,
        };
        n4 = It.createElement(pr, { ...t4 });
      }
      if (o3) {
        const o4 = {
          className: N2.paragraph,
          prefixCls: `${x2}-paragraph`,
          ...gr(e4, t3),
          ...mr(p2),
          style: I2.paragraph,
        };
        r3 = It.createElement(ur, { ...o4 });
      }
      a3 = It.createElement(
        "div",
        { className: P(N2.section, `${x2}-section`), style: I2.section },
        n4,
        r3,
      );
    }
    const i3 = P(
      x2,
      {
        [`${x2}-with-avatar`]: e4,
        [`${x2}-active`]: m2,
        [`${x2}-rtl`]: g2 === "rtl",
        [`${x2}-round`]: f2,
      },
      N2.root,
      b2,
      r2,
      l2,
      C2,
      w2,
    );
    return It.createElement("div", { ref: B2, className: i3, style: I2.root }, n3, a3);
  }
  return c2 ?? null;
});
(br.Button = ar), (br.Avatar = lr), (br.Input = cr), (br.Image = sr), (br.Node = ir);
const vr = br;
function yr() {}
const $r = Nt.createContext({ add: yr, remove: yr }),
  xr = () => {
    const { cancelButtonProps: e3, cancelTextLocale: t2, onCancel: o2 } = Nt.useContext(kn);
    return It.createElement(
      Sn,
      {
        ...e3,
        onClick: (t3) => {
          var n2;
          o2?.(t3), (n2 = e3?.onClick) == null || n2.call(e3, t3);
        },
      },
      t2,
    );
  },
  Cr = () => {
    const {
      confirmLoading: e3,
      okButtonProps: t2,
      okType: o2,
      okTextLocale: n2,
      onOk: r2,
    } = Nt.useContext(kn);
    return It.createElement(Sn, { ...Bo(o2), loading: e3, onClick: r2, ...t2 }, n2);
  };
function wr(e3, t2) {
  return It.createElement(
    "span",
    { className: `${e3}-close-x` },
    z(t2) ? t2 : It.createElement(x, { className: `${e3}-close-icon` }),
  );
}
const Sr = (e3) => {
    const {
        okText: t2,
        okType: o2 = "primary",
        cancelText: n2,
        confirmLoading: r2,
        onOk: l2,
        onCancel: a2,
        okButtonProps: i2,
        cancelButtonProps: s2,
        footer: c2,
      } = e3,
      [d2] = y("Modal", ge()),
      u2 = g(t2, d2?.okText),
      p2 = g(n2, d2?.cancelText),
      m2 = It.useMemo(
        () => ({
          confirmLoading: r2,
          okButtonProps: i2,
          cancelButtonProps: s2,
          okTextLocale: u2,
          cancelTextLocale: p2,
          okType: o2,
          onOk: l2,
          onCancel: a2,
        }),
        [r2, i2, s2, u2, p2, o2, l2, a2],
      );
    let f2;
    return (
      h(c2) || c2 === void 0
        ? ((f2 = It.createElement(
            It.Fragment,
            null,
            It.createElement(xr, null),
            It.createElement(Cr, null),
          )),
          h(c2) && (f2 = c2(f2, { OkBtn: Cr, CancelBtn: xr })),
          (f2 = It.createElement(Nn, { value: m2 }, f2)))
        : (f2 = c2),
      It.createElement(be, { disabled: !1 }, f2)
    );
  },
  Er = (e3) => {
    const { componentCls: t2 } = e3;
    return { [t2]: { position: "relative", maxWidth: "100%", minHeight: 1 } };
  },
  kr = (e3, t2) =>
    ((e4, t3) => {
      const { componentCls: o2, gridColumns: n2, antCls: r2 } = e4,
        [l2, a2] = k(r2, "grid"),
        [, i2] = k(r2, "col"),
        s2 = {};
      for (let c2 = n2; c2 >= 0; c2--)
        c2 === 0
          ? ((s2[`${o2}${t3}-${c2}`] = { display: "none" }),
            (s2[`${o2}-push-${c2}`] = { insetInlineStart: "auto" }),
            (s2[`${o2}-pull-${c2}`] = { insetInlineEnd: "auto" }),
            (s2[`${o2}${t3}-push-${c2}`] = { insetInlineStart: "auto" }),
            (s2[`${o2}${t3}-pull-${c2}`] = { insetInlineEnd: "auto" }),
            (s2[`${o2}${t3}-offset-${c2}`] = { marginInlineStart: 0 }),
            (s2[`${o2}${t3}-order-${c2}`] = { order: 0 }))
          : ((s2[`${o2}${t3}-${c2}`] = [
              { [l2("display")]: "block", display: "block" },
              {
                display: a2("display"),
                flex: `0 0 ${(c2 / n2) * 100}%`,
                maxWidth: (c2 / n2) * 100 + "%",
              },
            ]),
            (s2[`${o2}${t3}-push-${c2}`] = { insetInlineStart: (c2 / n2) * 100 + "%" }),
            (s2[`${o2}${t3}-pull-${c2}`] = { insetInlineEnd: (c2 / n2) * 100 + "%" }),
            (s2[`${o2}${t3}-offset-${c2}`] = { marginInlineStart: (c2 / n2) * 100 + "%" }),
            (s2[`${o2}${t3}-order-${c2}`] = { order: c2 }));
      return (s2[`${o2}${t3}-flex`] = { flex: i2(`${t3.replace(/-/, "")}-flex`) }), s2;
    })(e3, t2);
Y(
  "Grid",
  (e3) => {
    const { componentCls: t2 } = e3;
    return {
      [t2]: {
        display: "flex",
        flexFlow: "row wrap",
        minWidth: 0,
        "&::before, &::after": { display: "flex" },
        "&-no-wrap": { flexWrap: "nowrap" },
        "&-start": { justifyContent: "flex-start" },
        "&-center": { justifyContent: "center" },
        "&-end": { justifyContent: "flex-end" },
        "&-space-between": { justifyContent: "space-between" },
        "&-space-around": { justifyContent: "space-around" },
        "&-space-evenly": { justifyContent: "space-evenly" },
        "&-top": { alignItems: "flex-start" },
        "&-middle": { alignItems: "center" },
        "&-bottom": { alignItems: "flex-end" },
      },
    };
  },
  () => ({}),
);
const Nr = (e3) => ({
  xs: e3.screenXSMin,
  sm: e3.screenSMMin,
  md: e3.screenMDMin,
  lg: e3.screenLGMin,
  xl: e3.screenXLMin,
  xxl: e3.screenXXLMin,
  xxxl: e3.screenXXXLMin,
});
function Ir(e3) {
  return { position: e3, inset: 0 };
}
Y(
  "Grid",
  (e3) => {
    const t2 = q(e3, { gridColumns: 24 }),
      o2 = Nr(t2);
    return (
      delete o2.xs,
      [
        Er(t2),
        kr(t2, ""),
        kr(t2, "-xs"),
        Object.keys(o2)
          .map((e4) =>
            ((e5, t3, o3) => ({ [`@media (min-width: ${X(t3)})`]: { ...kr(e5, o3) } }))(
              t2,
              o2[e4],
              `-${e4}`,
            ),
          )
          .reduce((e4, t3) => ({ ...e4, ...t3 }), {}),
      ]
    );
  },
  () => ({}),
);
const Br = (e3) => {
    const { componentCls: t2, antCls: o2 } = e3;
    return [
      {
        [`${t2}-root`]: {
          [`${t2}${o2}-zoom-enter, ${t2}${o2}-zoom-appear`]: {
            transform: "none",
            opacity: 0,
            animationDuration: e3.motionDurationSlow,
            userSelect: "none",
          },
          [`${t2}${o2}-zoom-leave ${t2}-container`]: { pointerEvents: "none" },
          [`${t2}-mask`]: {
            ...Ir("fixed"),
            zIndex: e3.zIndexPopupBase,
            height: "100%",
            backgroundColor: e3.colorBgMask,
            pointerEvents: "none",
            [`&${t2}-mask-blur`]: { backdropFilter: "blur(4px)" },
            [`${t2}-hidden`]: { display: "none" },
          },
          [`${t2}-wrap`]: {
            ...Ir("fixed"),
            zIndex: e3.zIndexPopupBase,
            overflow: "auto",
            outline: 0,
            WebkitOverflowScrolling: "touch",
          },
        },
      },
      { [`${t2}-root`]: jo(e3) },
    ];
  },
  Rr = (e3) => {
    const { componentCls: t2, motionDurationMid: o2 } = e3;
    return [
      {
        [`${t2}-root`]: {
          [`${t2}-wrap-rtl`]: { direction: "rtl" },
          [`${t2}-centered`]: {
            textAlign: "center",
            "&::before": {
              display: "inline-block",
              width: 0,
              height: "100%",
              verticalAlign: "middle",
              content: '""',
            },
            [t2]: {
              top: 0,
              display: "inline-block",
              paddingBottom: 0,
              textAlign: "start",
              verticalAlign: "middle",
            },
          },
          [`@media (max-width: ${e3.screenSMMax}px)`]: {
            [t2]: { maxWidth: "calc(100vw - 16px)", margin: `${X(e3.marginXS)} auto` },
            [`${t2}-centered`]: { [t2]: { flex: 1 } },
          },
        },
      },
      {
        [t2]: {
          ...ve(e3),
          pointerEvents: "none",
          position: "relative",
          top: 100,
          width: "auto",
          maxWidth: `calc(100vw - ${X(e3.calc(e3.margin).mul(2).equal())})`,
          margin: "0 auto",
          "&:focus-visible": { borderRadius: e3.borderRadiusLG, ...ye(e3) },
          [`${t2}-title`]: {
            margin: 0,
            color: e3.titleColor,
            fontWeight: e3.fontWeightStrong,
            fontSize: e3.titleFontSize,
            lineHeight: e3.titleLineHeight,
            wordWrap: "break-word",
          },
          [`${t2}-container`]: {
            position: "relative",
            backgroundColor: e3.contentBg,
            backgroundClip: "padding-box",
            border: 0,
            borderRadius: e3.borderRadiusLG,
            boxShadow: e3.boxShadow,
            pointerEvents: "auto",
            padding: e3.contentPadding,
          },
          [`${t2}-close`]: {
            position: "absolute",
            top: e3.calc(e3.modalHeaderHeight).sub(e3.modalCloseBtnSize).div(2).equal(),
            insetInlineEnd: e3.calc(e3.modalHeaderHeight).sub(e3.modalCloseBtnSize).div(2).equal(),
            zIndex: e3.calc(e3.zIndexPopupBase).add(10).equal(),
            padding: 0,
            color: e3.modalCloseIconColor,
            fontWeight: e3.fontWeightStrong,
            lineHeight: 1,
            textDecoration: "none",
            background: "transparent",
            borderRadius: e3.borderRadiusSM,
            width: e3.modalCloseBtnSize,
            height: e3.modalCloseBtnSize,
            border: 0,
            outline: 0,
            cursor: "pointer",
            transition: ["color", "background-color"].map((e4) => `${e4} ${o2}`).join(", "),
            "&-x": {
              display: "flex",
              fontSize: e3.fontSizeLG,
              fontStyle: "normal",
              lineHeight: X(e3.modalCloseBtnSize),
              justifyContent: "center",
              textTransform: "none",
              textRendering: "auto",
            },
            "&:disabled": { pointerEvents: "none" },
            "&:hover": {
              color: e3.modalCloseIconHoverColor,
              backgroundColor: e3.colorBgTextHover,
              textDecoration: "none",
            },
            "&:active": { backgroundColor: e3.colorBgTextActive },
            ...J(e3),
          },
          [`${t2}-header`]: {
            color: e3.colorText,
            background: e3.headerBg,
            borderRadius: `${X(e3.borderRadiusLG)} ${X(e3.borderRadiusLG)} 0 0`,
            marginBottom: e3.headerMarginBottom,
            padding: e3.headerPadding,
            borderBottom: e3.headerBorderBottom,
          },
          [`${t2}-body`]: {
            fontSize: e3.fontSize,
            lineHeight: e3.lineHeight,
            wordWrap: "break-word",
            padding: e3.bodyPadding,
            [`${t2}-body-skeleton`]: {
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: `${X(e3.margin)} auto`,
            },
          },
          [`${t2}-footer`]: {
            textAlign: "end",
            background: e3.footerBg,
            marginTop: e3.footerMarginTop,
            padding: e3.footerPadding,
            borderTop: e3.footerBorderTop,
            borderRadius: e3.footerBorderRadius,
            [`> ${e3.antCls}-btn + ${e3.antCls}-btn`]: { marginInlineStart: e3.marginXS },
          },
          [`${t2}-open`]: { overflow: "hidden" },
        },
      },
      {
        [`${t2}-pure-panel`]: {
          top: "auto",
          padding: 0,
          display: "flex",
          flexDirection: "column",
          [`${t2}-container,
          ${t2}-body,
          ${t2}-confirm-body-wrapper`]: { display: "flex", flexDirection: "column", flex: "auto" },
          [`${t2}-confirm-body`]: { marginBottom: "auto" },
        },
      },
    ];
  },
  Tr = (e3) => {
    const { componentCls: t2 } = e3;
    return {
      [`${t2}-root`]: {
        [`${t2}-wrap-rtl`]: { direction: "rtl", [`${t2}-confirm-body`]: { direction: "rtl" } },
      },
    };
  },
  Mr = (e3) => {
    const { componentCls: t2 } = e3,
      o2 = Nr(e3),
      n2 = { ...o2 };
    delete n2.xs;
    const r2 = `--${t2.replace(".", "")}-`,
      l2 = Object.keys(n2).map((e4) => ({
        [`@media (min-width: ${X(n2[e4])})`]: { width: `var(${r2}${e4}-width)` },
      }));
    return {
      [`${t2}-root`]: {
        [t2]: [].concat(
          S(
            Object.keys(o2).map((e4, t3) => {
              const n3 = Object.keys(o2)[t3 - 1];
              return n3 ? { [`${r2}${e4}-width`]: `var(${r2}${n3}-width)` } : null;
            }),
          ),
          [{ width: `var(${r2}xs-width)` }],
          S(l2),
        ),
      },
    };
  },
  Pr = (e3) => {
    const t2 = e3.padding,
      o2 = e3.fontSizeHeading5,
      n2 = e3.lineHeightHeading5;
    return q(e3, {
      modalHeaderHeight: e3
        .calc(e3.calc(n2).mul(o2).equal())
        .add(e3.calc(t2).mul(2).equal())
        .equal(),
      modalFooterBorderColorSplit: e3.colorSplit,
      modalFooterBorderStyle: e3.lineType,
      modalFooterBorderWidth: e3.lineWidth,
      modalCloseIconColor: e3.colorIcon,
      modalCloseIconHoverColor: e3.colorIconHover,
      modalCloseBtnSize: e3.controlHeight,
      modalConfirmIconSize: e3.fontHeight,
      modalTitleHeight: e3.calc(e3.titleFontSize).mul(e3.titleLineHeight).equal(),
    });
  },
  Ar = (e3) => ({
    footerBg: "transparent",
    headerBg: "transparent",
    titleLineHeight: e3.lineHeightHeading5,
    titleFontSize: e3.fontSizeHeading5,
    contentBg: e3.colorBgElevated,
    titleColor: e3.colorTextHeading,
    contentPadding: e3.wireframe ? 0 : `${X(e3.paddingMD)} ${X(e3.paddingContentHorizontalLG)}`,
    headerPadding: e3.wireframe ? `${X(e3.padding)} ${X(e3.paddingLG)}` : 0,
    headerBorderBottom: e3.wireframe
      ? `${X(e3.lineWidth)} ${e3.lineType} ${e3.colorSplit}`
      : "none",
    headerMarginBottom: e3.wireframe ? 0 : e3.marginXS,
    bodyPadding: e3.wireframe ? e3.paddingLG : 0,
    footerPadding: e3.wireframe ? `${X(e3.paddingXS)} ${X(e3.padding)}` : 0,
    footerBorderTop: e3.wireframe ? `${X(e3.lineWidth)} ${e3.lineType} ${e3.colorSplit}` : "none",
    footerBorderRadius: e3.wireframe ? `0 0 ${X(e3.borderRadiusLG)} ${X(e3.borderRadiusLG)}` : 0,
    footerMarginTop: e3.wireframe ? 0 : e3.marginSM,
    confirmBodyPadding: e3.wireframe
      ? `${X(2 * e3.padding)} ${X(2 * e3.padding)} ${X(e3.paddingLG)}`
      : 0,
    confirmIconMarginInlineEnd: e3.wireframe ? e3.margin : e3.marginSM,
    confirmBtnsMarginTop: e3.wireframe ? e3.marginLG : e3.marginSM,
    mask: !0,
  }),
  Lr = Y(
    "Modal",
    (e3) => {
      const t2 = Pr(e3);
      return [Rr(t2), Tr(t2), Br(t2), Xo(t2, "zoom"), Mr(t2)];
    },
    Ar,
    { unitless: { titleLineHeight: !0 } },
  );
let Or;
const Dr = (e3) => {
  (Or = { x: e3.pageX, y: e3.pageY }),
    setTimeout(() => {
      Or = null;
    }, 100);
};
he() &&
  window.document.documentElement &&
  document.documentElement.addEventListener("click", Dr, !0);
const zr = (e3) => {
    const {
        prefixCls: t2,
        className: o2,
        rootClassName: r2,
        open: l2,
        wrapClassName: a2,
        centered: i2,
        getContainer: s2,
        style: c2,
        width: d2 = 520,
        footer: u2,
        classNames: p2,
        styles: m2,
        children: h2,
        loading: g2,
        confirmLoading: b2,
        zIndex: w2,
        mousePosition: S2,
        onOk: E2,
        onCancel: k2,
        okButtonProps: N2,
        cancelButtonProps: I2,
        destroyOnHidden: R2,
        destroyOnClose: T2,
        panelRef: A2 = null,
        closable: L2,
        mask: O2,
        modalRender: D2,
        maskClosable: z2,
        _semanticOmit: H2,
        scrollLock: j2,
        focusTriggerAfterClose: _2,
        focusable: K2,
        _renderSemanticContent: W2,
        ...F2
      } = e3,
      {
        getPopupContainer: G2,
        getPrefixCls: q2,
        direction: V2,
        className: X2,
        style: U2,
        classNames: Y2,
        styles: Z2,
        centered: J2,
        cancelButtonProps: Q2,
        okButtonProps: ee2,
        mask: te2,
        focusable: ne2,
      } = oe("modal"),
      { modal: re2 } = Nt.useContext(B),
      [le2, ae2] = Nt.useMemo(
        () => (typeof L2 == "boolean" ? [void 0, void 0] : [L2?.afterClose, L2?.onClose]),
        [L2],
      ),
      ie2 = q2("modal", t2),
      ce2 = q2(),
      [ue2, pe2, me2] = ((e4, t3, o3, n2) =>
        Nt.useMemo(() => {
          const r3 = fo(e4, n2),
            l3 = fo(t3),
            a3 = { blur: !1, ...l3, ...r3, closable: r3.closable ?? n2 ?? l3.closable ?? !0 },
            i3 = a3.blur ? `${o3}-mask-blur` : void 0;
          return [a3.enabled !== !1, { mask: i3 }, !!a3.closable];
        }, [e4, t3, o3, n2]))(O2, te2, ie2, z2),
      fe2 = (function (e4, t3, o3) {
        return Nt.useMemo(
          () => ({ trap: t3 ?? !0, focusTriggerAfterClose: o3 ?? !0, ...e4 }),
          [e4, t3, o3],
        );
      })({ ...ne2, ...K2 }, ue2, _2),
      he2 = (e4) => {
        b2 || (k2?.(e4), ae2?.());
      },
      ge2 = $e(ie2),
      [be2, ve2] = Lr(ie2, ge2),
      ye2 = P(a2, { [`${ie2}-centered`]: i2 ?? J2, [`${ie2}-wrap-rtl`]: V2 === "rtl" }),
      Ee2 =
        u2 === null || g2
          ? null
          : Nt.createElement(Sr, {
              ...e3,
              okButtonProps: { ...ee2, ...N2 },
              onOk: (e4) => {
                E2?.(e4), ae2?.();
              },
              cancelButtonProps: { ...Q2, ...I2 },
              onCancel: he2,
            }),
      [ke2, Ne2, Ie2, Be2] = ((e4, t3, o3 = co) => {
        const [n2] = y("global", $.global);
        return It.useMemo(
          () => po(e4, t3, { closeIcon: It.createElement(x, null), ...o3 }, n2.close),
          [e4, t3, o3, n2.close],
        );
      })(so(e3), so(re2), {
        closable: !0,
        closeIcon: Nt.createElement(x, { className: `${ie2}-close-icon` }),
        closeIconRender: (e4) => wr(ie2, e4),
      }),
      Re2 = !!ke2 && { disabled: Ie2, closeIcon: Ne2, afterClose: le2, ...Be2 },
      Te2 = D2 ? (e4) => Nt.createElement("div", { className: `${ie2}-render` }, D2(e4)) : void 0,
      Me2 = (function (e4) {
        const t3 = Nt.useContext($r),
          o3 = Nt.useRef(null);
        return n((n2) => {
          if (n2) {
            const r3 = e4 ? n2.querySelector(e4) : n2;
            r3 && (t3.add(r3), (o3.current = r3));
          } else t3.remove(o3.current);
        });
      })(`.${ie2}-${D2 ? "render" : "container"}`),
      Pe2 = M(A2, Me2),
      [Ae2, Le2] = xe("Modal", w2),
      Oe2 = {
        ...e3,
        width: d2,
        panelRef: A2,
        focusTriggerAfterClose: fe2.focusTriggerAfterClose,
        focusable: fe2,
        mask: ue2,
        maskClosable: me2,
        zIndex: Ae2,
      },
      [De2, ze2] = de([Y2, p2, pe2], [Z2, m2], { props: Oe2 }),
      He2 = H2 ? se(De2, H2) : De2,
      je2 = H2 ? se(ze2, H2) : ze2,
      _e2 = W2 ? W2({ classNames: De2, styles: ze2 }) : h2,
      [Ke2, We2] = Nt.useMemo(() => (v(d2) ? [void 0, d2] : [d2, void 0]), [d2]),
      Fe2 = Nt.useMemo(() => {
        const e4 = {};
        return (
          We2 &&
            Object.keys(We2).forEach((t3) => {
              const o3 = We2[t3];
              C(o3) && (e4[`--${ie2}-${t3}-width`] = f(o3) ? `${o3}px` : o3);
            }),
          e4
        );
      }, [ie2, We2]);
    return Nt.createElement(
      Ce,
      { form: !0, space: !0 },
      Nt.createElement(
        we.Provider,
        { value: Le2 },
        Nt.createElement(
          Wn,
          {
            width: Ke2,
            ...F2,
            zIndex: Ae2,
            getContainer: s2 === void 0 ? G2 : s2,
            prefixCls: ie2,
            rootClassName: P(be2, r2, ve2, ge2, He2.root),
            rootStyle: je2.root,
            footer: Ee2,
            visible: l2,
            mousePosition: S2 ?? Or,
            onClose: he2,
            closable: Re2,
            closeIcon: Ne2,
            transitionName: Se(ce2, "zoom", e3.transitionName),
            maskTransitionName: Se(ce2, "fade", e3.maskTransitionName),
            mask: ue2,
            maskClosable: me2,
            scrollLock: j2,
            className: P(be2, o2, X2),
            style: { ...U2, ...c2, ...Fe2 },
            classNames: { ...He2, wrapper: P(He2.wrapper, ye2) },
            styles: je2,
            panelRef: Pe2,
            destroyOnHidden: R2 ?? T2,
            modalRender: Te2,
            focusTriggerAfterClose: fe2.focusTriggerAfterClose,
            focusTrap: fe2.trap,
          },
          g2
            ? Nt.createElement(vr, {
                active: !0,
                title: !1,
                paragraph: { rows: 4 },
                className: `${ie2}-body-skeleton`,
              })
            : _e2,
        ),
      ),
    );
  },
  Hr = Q(
    ["Modal", "confirm"],
    (e3) =>
      ((e4) => {
        const {
            componentCls: t2,
            titleFontSize: o2,
            titleLineHeight: n2,
            modalConfirmIconSize: r2,
            fontSize: l2,
            lineHeight: a2,
            modalTitleHeight: i2,
            fontHeight: s2,
            confirmBodyPadding: c2,
          } = e4,
          d2 = `${t2}-confirm`;
        return {
          [d2]: {
            "&-rtl": { direction: "rtl" },
            [`${e4.antCls}-modal-header`]: { display: "none" },
            [`${d2}-body-wrapper`]: { ...Ee() },
            [`&${t2} ${t2}-body`]: { padding: c2 },
            [`${d2}-body`]: {
              display: "flex",
              flexWrap: "nowrap",
              alignItems: "start",
              [`> ${e4.iconCls}`]: {
                flex: "none",
                fontSize: r2,
                marginInlineEnd: e4.confirmIconMarginInlineEnd,
                marginTop: e4.calc(e4.calc(s2).sub(r2).equal()).div(2).equal(),
              },
              [`&-has-title > ${e4.iconCls}`]: {
                marginTop: e4.calc(e4.calc(i2).sub(r2).equal()).div(2).equal(),
              },
            },
            [`${d2}-paragraph`]: {
              display: "flex",
              flexDirection: "column",
              flex: "auto",
              rowGap: e4.marginXS,
              maxWidth: `calc(100% - ${X(e4.marginSM)})`,
            },
            [`${d2}-body-no-icon ${d2}-paragraph`]: { maxWidth: "100%" },
            [`${e4.iconCls} + ${d2}-paragraph`]: {
              maxWidth: `calc(100% - ${X(e4.calc(e4.modalConfirmIconSize).add(e4.marginSM).equal())})`,
            },
            [`${d2}-title`]: {
              color: e4.colorTextHeading,
              fontWeight: e4.fontWeightStrong,
              fontSize: o2,
              lineHeight: n2,
            },
            [`${d2}-container`]: { color: e4.colorText, fontSize: l2, lineHeight: a2 },
            [`${d2}-btns`]: {
              textAlign: "end",
              marginTop: e4.confirmBtnsMarginTop,
              [`${e4.antCls}-btn + ${e4.antCls}-btn`]: {
                marginBottom: 0,
                marginInlineStart: e4.marginXS,
              },
            },
          },
          [`${d2}-error ${d2}-body > ${e4.iconCls}`]: { color: e4.colorError },
          [`${d2}-warning ${d2}-body > ${e4.iconCls},
        ${d2}-confirm ${d2}-body > ${e4.iconCls}`]: { color: e4.colorWarning },
          [`${d2}-info ${d2}-body > ${e4.iconCls}`]: { color: e4.colorInfo },
          [`${d2}-success ${d2}-body > ${e4.iconCls}`]: { color: e4.colorSuccess },
        };
      })(Pr(e3)),
    Ar,
    { order: -1e3 },
  ),
  jr = ["body"],
  _r = (e3) => {
    const {
        prefixCls: t2,
        icon: o2,
        okText: n2,
        cancelText: r2,
        confirmPrefixCls: l2,
        type: a2,
        okCancel: i2,
        footer: s2,
        locale: c2,
        autoFocusButton: d2,
        focusable: u2,
        contentClassName: p2,
        contentStyle: m2,
        ...f2
      } = e3,
      { infoIcon: $2, successIcon: x2, errorIcon: C2, warningIcon: w2 } = oe("modal");
    let S2 = o2;
    if (o2 === void 0)
      switch (a2) {
        case "info":
          S2 = g($2, Nt.createElement(lo, null));
          break;
        case "success":
          S2 = g(x2, Nt.createElement(Zt, null));
          break;
        case "error":
          S2 = g(C2, Nt.createElement(b, null));
          break;
        default:
          S2 = g(w2, Nt.createElement(to, null));
      }
    const E2 = i2 ?? a2 === "confirm",
      k2 = Nt.useMemo(() => {
        const e4 = u2?.autoFocusButton || d2;
        return e4 || e4 === null ? e4 : "ok";
      }, [d2, u2?.autoFocusButton]),
      [N2] = y("Modal"),
      I2 = c2 || N2,
      B2 = g(n2, E2 ? I2?.okText : I2?.justOkText),
      R2 = g(r2, I2?.cancelText),
      { closable: T2 } = f2,
      { onClose: M2 } = v(T2) ? T2 : {},
      A2 = Nt.useMemo(
        () => ({
          autoFocusButton: k2,
          cancelTextLocale: R2,
          okTextLocale: B2,
          mergedOkCancel: E2,
          onClose: M2,
          ...f2,
        }),
        [k2, R2, B2, E2, M2, f2],
      ),
      L2 = Nt.createElement(
        Nt.Fragment,
        null,
        Nt.createElement(In, null),
        Nt.createElement(Bn, null),
      ),
      O2 = z(e3.title),
      D2 = z(S2),
      H2 = `${l2}-body`;
    return Nt.createElement(
      "div",
      { className: `${l2}-body-wrapper` },
      Nt.createElement(
        "div",
        { className: P(H2, { [`${H2}-has-title`]: O2, [`${H2}-no-icon`]: !D2 }) },
        S2,
        Nt.createElement(
          "div",
          { className: `${l2}-paragraph` },
          O2 && Nt.createElement("span", { className: `${l2}-title` }, e3.title),
          Nt.createElement("div", { className: P(`${l2}-content`, p2), style: m2 }, e3.content),
        ),
      ),
      s2 === void 0 || h(s2)
        ? Nt.createElement(
            Nn,
            { value: A2 },
            Nt.createElement(
              "div",
              { className: `${l2}-btns` },
              h(s2) ? s2(L2, { OkBtn: Bn, CancelBtn: In }) : L2,
            ),
          )
        : s2,
      Nt.createElement(Hr, { prefixCls: t2 }),
    );
  },
  Kr = (e3) => {
    const {
        close: t2,
        zIndex: o2,
        maskStyle: n2,
        direction: r2,
        prefixCls: l2,
        wrapClassName: a2,
        rootPrefixCls: i2,
        bodyStyle: s2,
        closable: c2 = !1,
        onConfirm: d2,
        styles: u2,
        title: p2,
        mask: m2,
        maskClosable: f2,
        okButtonProps: g2,
        cancelButtonProps: b2,
      } = e3,
      { cancelButtonProps: v2, okButtonProps: y2 } = oe("modal"),
      $2 = `${l2}-confirm`,
      x2 = e3.width || 416,
      C2 = e3.style || {},
      w2 = h(u2) ? (e4) => ({ body: s2, mask: n2, ...u2(e4) }) : { body: s2, mask: n2, ...u2 },
      S2 = se(e3, ["bodyStyle", "maskStyle"]),
      E2 = P($2, `${$2}-${e3.type}`, { [`${$2}-rtl`]: r2 === "rtl" }, e3.className),
      k2 = Nt.useMemo(() => {
        const e4 = fo(m2, f2);
        return e4.closable ?? (e4.closable = !1), e4;
      }, [m2, f2]),
      [, N2] = A(),
      I2 = Nt.useMemo(() => (o2 !== void 0 ? o2 : N2.zIndexPopupBase + Ne), [o2, N2]);
    return Nt.createElement(zr, {
      ...S2,
      className: E2,
      wrapClassName: P({ [`${$2}-centered`]: !!e3.centered }, a2),
      onCancel: () => {
        t2?.({ triggerCancel: !0 }), d2?.(!1);
      },
      title: p2,
      footer: null,
      transitionName: Se(i2 || "", "zoom", e3.transitionName),
      maskTransitionName: Se(i2 || "", "fade", e3.maskTransitionName),
      mask: k2,
      style: C2,
      styles: w2,
      width: x2,
      zIndex: I2,
      closable: c2,
      _semanticOmit: jr,
      _renderSemanticContent: ({ classNames: t3, styles: o3 }) =>
        Nt.createElement(_r, {
          ...e3,
          confirmPrefixCls: $2,
          okButtonProps: { ...y2, ...g2 },
          cancelButtonProps: { ...v2, ...b2 },
          contentClassName: t3.body,
          contentStyle: o3.body,
        }),
    });
  },
  Wr = (e3) => {
    const { rootPrefixCls: t2, iconPrefixCls: o2, direction: n2, theme: r2 } = e3;
    return Nt.createElement(
      ke,
      { prefixCls: t2, iconPrefixCls: o2, direction: n2, theme: r2 },
      Nt.createElement(Kr, { ...e3 }),
    );
  },
  Fr = [];
let Gr = "";
function qr() {
  return Gr;
}
const Vr = (e3) => {
  var t2;
  const { prefixCls: o2, getContainer: n2, direction: r2 } = e3,
    l2 = ge(),
    a2 = Nt.useContext(B),
    i2 = qr() || a2.getPrefixCls(),
    s2 = o2 || `${i2}-modal`;
  let c2 = n2;
  return (
    c2 === !1 && (c2 = void 0),
    It.createElement(Wr, {
      ...e3,
      rootPrefixCls: i2,
      prefixCls: s2,
      iconPrefixCls: a2.iconPrefixCls,
      theme: a2.theme,
      direction: r2 ?? a2.direction,
      locale: ((t2 = a2.locale) == null ? void 0 : t2.Modal) ?? l2,
      getContainer: c2,
    })
  );
};
function Xr(e3) {
  const t2 = Ie(),
    o2 = document.createDocumentFragment();
  let n2,
    r2 = { ...e3, close: i2, open: !0 };
  function l2(...t3) {
    var n3;
    t3.some((e4) => e4?.triggerCancel) &&
      ((n3 = e3.onCancel) == null || n3.call(e3, () => {}, ...t3.slice(1)));
    for (let e4 = 0; e4 < Fr.length; e4++)
      if (Fr[e4] === i2) {
        Fr.splice(e4, 1);
        break;
      }
    qt(o2).then(() => {});
  }
  const a2 = (e4) => {
    clearTimeout(n2),
      (n2 = setTimeout(() => {
        const n3 = t2.getPrefixCls(void 0, qr()),
          r3 = t2.getIconPrefixCls(),
          l3 = t2.getTheme(),
          a3 = It.createElement(Vr, { ...e4 });
        Gt(
          It.createElement(
            ke,
            { prefixCls: n3, iconPrefixCls: r3, theme: l3 },
            h(t2.holderRender) ? t2.holderRender(a3) : a3,
          ),
          o2,
        );
      }));
  };
  function i2(...t3) {
    (r2 = {
      ...r2,
      open: !1,
      afterClose: () => {
        h(e3.afterClose) && e3.afterClose(), l2.apply(this, t3);
      },
    }),
      a2(r2);
  }
  return (
    a2(r2),
    Fr.push(i2),
    {
      destroy: i2,
      update: function (e4) {
        (r2 = h(e4) ? e4(r2) : { ...r2, ...e4 }), a2(r2);
      },
    }
  );
}
function Ur(e3) {
  return { ...e3, type: "warning" };
}
function Yr(e3) {
  return { ...e3, type: "info" };
}
function Zr(e3) {
  return { ...e3, type: "success" };
}
function Jr(e3) {
  return { ...e3, type: "error" };
}
function Qr(e3) {
  return { ...e3, type: "confirm" };
}
const el = Nt.forwardRef((e3, t2) => {
  const { afterClose: o2, config: n2, ...r2 } = e3,
    [l2, a2] = Nt.useState(!0),
    [i2, s2] = Nt.useState(n2),
    { direction: c2, getPrefixCls: d2 } = Nt.useContext(B),
    u2 = d2("modal"),
    p2 = d2(),
    m2 = (...e4) => {
      var t3;
      a2(!1),
        e4.some((e5) => e5?.triggerCancel) &&
          ((t3 = i2.onCancel) == null || t3.call(i2, () => {}, ...e4.slice(1)));
    };
  Nt.useImperativeHandle(t2, () => ({
    destroy: m2,
    update: (e4) => {
      s2((t3) => {
        const o3 = h(e4) ? e4(t3) : e4;
        return { ...t3, ...o3 };
      });
    },
  }));
  const f2 = i2.okCancel ?? i2.type === "confirm",
    [b2] = y("Modal", $.Modal);
  return Nt.createElement(Wr, {
    prefixCls: u2,
    rootPrefixCls: p2,
    ...i2,
    close: m2,
    open: l2,
    afterClose: () => {
      var e4;
      o2(), (e4 = i2.afterClose) == null || e4.call(i2);
    },
    okText: g(i2.okText, f2 ? b2?.okText : b2?.justOkText),
    direction: i2.direction || c2,
    cancelText: g(i2.cancelText, b2?.cancelText),
    ...r2,
  });
});
let tl = 0;
const ol = Nt.memo(
    Nt.forwardRef((e3, t2) => {
      const [o2, n2] = (() => {
        const [e4, t3] = Nt.useState([]);
        return [
          e4,
          Nt.useCallback(
            (e5) => (
              t3((t4) => [].concat(S(t4), [e5])),
              () => {
                t3((t4) => t4.filter((t5) => t5 !== e5));
              }
            ),
            [],
          ),
        ];
      })();
      return (
        Nt.useImperativeHandle(t2, () => ({ patchElement: n2 }), [n2]),
        Nt.createElement(Nt.Fragment, null, o2)
      );
    }),
  ),
  nl = ["xxxl", "xxl", "xl", "lg", "md", "sm", "xs"],
  rl = () => {
    const [, e3] = A(),
      t2 = ((e4) => ({
        xs: `(max-width: ${e4.screenXSMax}px)`,
        sm: `(min-width: ${e4.screenSM}px)`,
        md: `(min-width: ${e4.screenMD}px)`,
        lg: `(min-width: ${e4.screenLG}px)`,
        xl: `(min-width: ${e4.screenXL}px)`,
        xxl: `(min-width: ${e4.screenXXL}px)`,
        xxxl: `(min-width: ${e4.screenXXXL}px)`,
      }))(
        ((e4) => {
          const t3 = e4,
            o2 = [].concat(nl).reverse();
          return (
            o2.forEach((e5, n2) => {
              const r2 = e5.toUpperCase(),
                l2 = `screen${r2}Min`,
                a2 = `screen${r2}`;
              if (!(t3[l2] <= t3[a2]))
                throw new Error(`${l2}<=${a2} fails : !(${t3[l2]}<=${t3[a2]})`);
              if (n2 < o2.length - 1) {
                const e6 = `screen${r2}Max`;
                if (!(t3[a2] <= t3[e6]))
                  throw new Error(`${a2}<=${e6} fails : !(${t3[a2]}<=${t3[e6]})`);
                const l3 = `screen${o2[n2 + 1].toUpperCase()}Min`;
                if (!(t3[e6] <= t3[l3]))
                  throw new Error(`${e6}<=${l3} fails : !(${t3[e6]}<=${t3[l3]})`);
              }
            }),
            e4
          );
        })(e3),
      );
    return It.useMemo(() => {
      const e4 = new Map();
      let o2 = -1,
        n2 = {};
      return {
        responsiveMap: t2,
        matchHandlers: {},
        dispatch: (t3) => (
          (n2 = t3),
          e4.forEach((e5) => {
            e5(n2);
          }),
          e4.size >= 1
        ),
        subscribe(t3) {
          return e4.size || this.register(), (o2 += 1), e4.set(o2, t3), t3(n2), o2;
        },
        unsubscribe(t3) {
          e4.delete(t3), e4.size || this.unregister();
        },
        register() {
          Object.entries(t2).forEach(([e5, t3]) => {
            const o3 = ({ matches: t4 }) => {
                this.dispatch({ ...n2, [e5]: t4 });
              },
              r2 = window.matchMedia(t3);
            h(r2.addEventListener) && r2.addEventListener("change", o3),
              (this.matchHandlers[t3] = { mql: r2, listener: o3 }),
              o3(r2);
          });
        },
        unregister() {
          Object.values(t2).forEach((e5) => {
            const t3 = this.matchHandlers[e5];
            h(t3?.mql.removeEventListener) && t3.mql.removeEventListener("change", t3?.listener);
          }),
            e4.clear();
        },
      };
    }, [t2]);
  };
function ll(e3 = !0, t2 = {}) {
  const o2 = Nt.useRef(t2),
    [, n2] = mo(),
    r2 = rl();
  return (
    le(() => {
      const t3 = r2.subscribe((t4) => {
        (o2.current = t4), e3 && n2();
      });
      return () => r2.unsubscribe(t3);
    }, [e3]),
    o2.current
  );
}
const al = (e3) => {
    const {
      children: t2,
      prefixCls: o2,
      id: n2,
      classNames: r2,
      styles: l2,
      className: a2,
      style: i2,
    } = e3;
    return Nt.createElement(
      "div",
      {
        id: n2,
        className: P(`${o2}-container`, r2?.container, a2),
        style: { ...l2?.container, ...i2 },
        role: "tooltip",
      },
      typeof t2 == "function" ? t2() : t2,
    );
  },
  il = { shiftX: 64, adjustY: 1 },
  sl = { adjustX: 1, shiftY: !0 },
  cl = [0, 0],
  dl = {
    left: { points: ["cr", "cl"], overflow: sl, offset: [-4, 0], targetOffset: cl },
    right: { points: ["cl", "cr"], overflow: sl, offset: [4, 0], targetOffset: cl },
    top: { points: ["bc", "tc"], overflow: il, offset: [0, -4], targetOffset: cl },
    bottom: { points: ["tc", "bc"], overflow: il, offset: [0, 4], targetOffset: cl },
    topLeft: { points: ["bl", "tl"], overflow: il, offset: [0, -4], targetOffset: cl },
    leftTop: { points: ["tr", "tl"], overflow: sl, offset: [-4, 0], targetOffset: cl },
    topRight: { points: ["br", "tr"], overflow: il, offset: [0, -4], targetOffset: cl },
    rightTop: { points: ["tl", "tr"], overflow: sl, offset: [4, 0], targetOffset: cl },
    bottomRight: { points: ["tr", "br"], overflow: il, offset: [0, 4], targetOffset: cl },
    rightBottom: { points: ["bl", "br"], overflow: sl, offset: [4, 0], targetOffset: cl },
    bottomLeft: { points: ["tl", "bl"], overflow: il, offset: [0, 4], targetOffset: cl },
    leftBottom: { points: ["br", "bl"], overflow: sl, offset: [-4, 0], targetOffset: cl },
  };
function ul() {
  return (
    (ul = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    ul.apply(this, arguments)
  );
}
const pl = Nt.forwardRef((e3, t2) => {
  const {
      trigger: o2 = ["hover", "focus"],
      mouseEnterDelay: n2 = 0,
      mouseLeaveDelay: r2 = 0.1,
      prefixCls: a2 = "rc-tooltip",
      children: i2,
      onVisibleChange: s2,
      afterVisibleChange: c2,
      motion: d2,
      placement: u2 = "right",
      align: p2 = {},
      destroyOnHidden: m2 = !1,
      defaultVisible: f2,
      getTooltipContainer: h2,
      arrowContent: g2,
      overlay: b2,
      id: v2,
      showArrow: y2 = !0,
      classNames: $2,
      styles: x2,
      ...C2
    } = e3,
    w2 = l(v2),
    S2 = Nt.useRef(null);
  Nt.useImperativeHandle(t2, () => S2.current);
  const E2 = { ...C2 };
  "visible" in e3 && (E2.popupVisible = e3.visible);
  const k2 = Nt.useMemo(() => {
      if (!y2) return !1;
      const e4 = y2 === !0 ? {} : y2;
      return {
        ...e4,
        className: P(e4.className, $2?.arrow),
        style: { ...e4.style, ...x2?.arrow },
        content: e4.content ?? g2,
      };
    }, [y2, $2?.arrow, x2?.arrow, g2]),
    N2 = ({ open: e4 }) => {
      const t3 = Nt.Children.only(i2),
        o3 = {
          "aria-describedby":
            [t3.props["aria-describedby"], b2 && e4 ? w2 : void 0].filter(Boolean).join(" ") ||
            void 0,
        };
      return Nt.cloneElement(t3, o3);
    };
  return Nt.createElement(
    Be,
    ul(
      {
        popupClassName: $2?.root,
        prefixCls: a2,
        popup: Nt.createElement(
          al,
          { key: "content", prefixCls: a2, id: w2, classNames: $2, styles: x2 },
          b2,
        ),
        action: o2,
        builtinPlacements: dl,
        popupPlacement: u2,
        ref: S2,
        popupAlign: p2,
        getPopupContainer: h2,
        onOpenChange: s2,
        afterOpenChange: c2,
        popupMotion: d2,
        defaultPopupVisible: f2,
        autoDestroy: m2,
        mouseLeaveDelay: r2,
        popupStyle: x2?.root,
        mouseEnterDelay: n2,
        arrow: k2,
        uniqueContainerClassName: $2?.uniqueContainer,
        uniqueContainerStyle: x2?.uniqueContainer,
      },
      E2,
    ),
    N2,
  );
});
function ml(e3) {
  const { sizePopupArrow: t2, borderRadiusXS: o2, borderRadiusOuter: n2 } = e3,
    r2 = t2 / 2,
    l2 = r2,
    a2 = (1 * n2) / Math.sqrt(2),
    i2 = r2 - n2 * (1 - 1 / Math.sqrt(2)),
    s2 = r2 - o2 * (1 / Math.sqrt(2)),
    c2 = n2 * (Math.sqrt(2) - 1) + o2 * (1 / Math.sqrt(2)),
    d2 = 2 * r2 - s2,
    u2 = c2,
    p2 = 2 * r2 - a2,
    m2 = i2,
    f2 = 2 * r2 - 0,
    h2 = l2,
    g2 = r2 * Math.sqrt(2) + n2 * (Math.sqrt(2) - 2),
    b2 = n2 * (Math.sqrt(2) - 1);
  return {
    arrowShadowWidth: g2,
    arrowPath: `path('M 0 ${l2} A ${n2} ${n2} 0 0 0 ${a2} ${i2} L ${s2} ${c2} A ${o2} ${o2} 0 0 1 ${d2} ${u2} L ${p2} ${m2} A ${n2} ${n2} 0 0 0 ${f2} ${h2} Z')`,
    arrowPolygon: `polygon(${b2}px 100%, 50% ${b2}px, ${2 * r2 - b2}px 100%, ${b2}px 100%)`,
  };
}
const fl = (e3, t2, o2) => {
  const {
      sizePopupArrow: n2,
      arrowPolygon: r2,
      arrowPath: l2,
      arrowShadowWidth: a2,
      borderRadiusXS: i2,
      calc: s2,
    } = e3,
    c2 = {
      content: '""',
      position: "absolute",
      width: a2,
      height: a2,
      bottom: 0,
      insetInline: 0,
      margin: "auto",
      borderRadius: { _skip_check_: !0, value: `0 0 ${X(i2)} 0` },
      transform: "translateY(50%) rotate(-135deg)",
      zIndex: 0,
      background: "transparent",
    };
  return (
    o2 && (c2.boxShadow = o2),
    {
      pointerEvents: "none",
      width: n2,
      height: n2,
      overflow: "hidden",
      "&::before": {
        position: "absolute",
        bottom: 0,
        insetInlineStart: 0,
        width: n2,
        height: s2(n2).div(2).equal(),
        background: t2,
        clipPath: { _multi_value_: !0, value: [r2, l2] },
        content: '""',
      },
      "&::after": c2,
    }
  );
};
function hl(e3) {
  const { contentRadius: t2, limitVerticalRadius: o2 } = e3,
    n2 = t2 > 12 ? t2 + 2 : 12;
  return { arrowOffsetHorizontal: n2, arrowOffsetVertical: o2 ? 8 : n2 };
}
const gl = (e3, t2, o2) => {
    const {
        componentCls: n2,
        boxShadowPopoverArrow: r2,
        arrowOffsetVertical: l2,
        arrowOffsetHorizontal: a2,
        antCls: i2,
      } = e3,
      [s2] = k(i2, "tooltip"),
      { arrowDistance: c2 = 0, arrowShadow: d2 = !0 } = o2 || {};
    return {
      [n2]: {
        [`${n2}-arrow`]: [
          {
            position: "absolute",
            zIndex: 1,
            display: "block",
            ...fl(e3, t2, !!d2 && r2),
            "&:before": { background: t2 },
          },
        ],
        [[
          `&-placement-top > ${n2}-arrow`,
          `&-placement-topLeft > ${n2}-arrow`,
          `&-placement-topRight > ${n2}-arrow`,
        ].join(",")]: { bottom: c2, transform: "translateY(100%) rotate(180deg)" },
        [`&-placement-top > ${n2}-arrow`]: {
          left: { _skip_check_: !0, value: "50%" },
          transform: "translateX(-50%) translateY(100%) rotate(180deg)",
        },
        "&-placement-topLeft": {
          [s2("arrow-offset-x")]: a2,
          [`> ${n2}-arrow`]: { left: { _skip_check_: !0, value: a2 } },
        },
        "&-placement-topRight": {
          [s2("arrow-offset-x")]: `calc(100% - ${X(a2)})`,
          [`> ${n2}-arrow`]: { right: { _skip_check_: !0, value: a2 } },
        },
        [[
          `&-placement-bottom > ${n2}-arrow`,
          `&-placement-bottomLeft > ${n2}-arrow`,
          `&-placement-bottomRight > ${n2}-arrow`,
        ].join(",")]: { top: c2, transform: "translateY(-100%)" },
        [`&-placement-bottom > ${n2}-arrow`]: {
          left: { _skip_check_: !0, value: "50%" },
          transform: "translateX(-50%) translateY(-100%)",
        },
        "&-placement-bottomLeft": {
          [s2("arrow-offset-x")]: a2,
          [`> ${n2}-arrow`]: { left: { _skip_check_: !0, value: a2 } },
        },
        "&-placement-bottomRight": {
          [s2("arrow-offset-x")]: `calc(100% - ${X(a2)})`,
          [`> ${n2}-arrow`]: { right: { _skip_check_: !0, value: a2 } },
        },
        [[
          `&-placement-left > ${n2}-arrow`,
          `&-placement-leftTop > ${n2}-arrow`,
          `&-placement-leftBottom > ${n2}-arrow`,
        ].join(",")]: {
          right: { _skip_check_: !0, value: c2 },
          transform: "translateX(100%) rotate(90deg)",
        },
        [`&-placement-left > ${n2}-arrow`]: {
          top: { _skip_check_: !0, value: "50%" },
          transform: "translateY(-50%) translateX(100%) rotate(90deg)",
        },
        [`&-placement-leftTop > ${n2}-arrow`]: { top: l2 },
        [`&-placement-leftBottom > ${n2}-arrow`]: { bottom: l2 },
        [[
          `&-placement-right > ${n2}-arrow`,
          `&-placement-rightTop > ${n2}-arrow`,
          `&-placement-rightBottom > ${n2}-arrow`,
        ].join(",")]: {
          left: { _skip_check_: !0, value: c2 },
          transform: "translateX(-100%) rotate(-90deg)",
        },
        [`&-placement-right > ${n2}-arrow`]: {
          top: { _skip_check_: !0, value: "50%" },
          transform: "translateY(-50%) translateX(-100%) rotate(-90deg)",
        },
        [`&-placement-rightTop > ${n2}-arrow`]: { top: l2 },
        [`&-placement-rightBottom > ${n2}-arrow`]: { bottom: l2 },
      },
    };
  },
  bl = {
    left: { points: ["cr", "cl"] },
    right: { points: ["cl", "cr"] },
    top: { points: ["bc", "tc"] },
    bottom: { points: ["tc", "bc"] },
    topLeft: { points: ["bl", "tl"] },
    leftTop: { points: ["tr", "tl"] },
    topRight: { points: ["br", "tr"] },
    rightTop: { points: ["tl", "tr"] },
    bottomRight: { points: ["tr", "br"] },
    rightBottom: { points: ["bl", "br"] },
    bottomLeft: { points: ["tl", "bl"] },
    leftBottom: { points: ["br", "bl"] },
  },
  vl = {
    topLeft: { points: ["bl", "tc"] },
    leftTop: { points: ["tr", "cl"] },
    topRight: { points: ["br", "tc"] },
    rightTop: { points: ["tl", "cr"] },
    bottomRight: { points: ["tr", "bc"] },
    rightBottom: { points: ["bl", "cr"] },
    bottomLeft: { points: ["tl", "bc"] },
    leftBottom: { points: ["br", "cl"] },
  },
  yl = new Set([
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight",
    "leftTop",
    "leftBottom",
    "rightTop",
    "rightBottom",
  ]);
function $l(e3) {
  const {
      arrowWidth: t2,
      autoAdjustOverflow: o2,
      arrowPointAtCenter: n2,
      offset: r2,
      borderRadius: l2,
      visibleFirst: a2,
    } = e3,
    i2 = t2 / 2,
    s2 = {},
    c2 = hl({ contentRadius: l2, limitVerticalRadius: !0 });
  return (
    Object.keys(bl).forEach((e4) => {
      const l3 = { ...((n2 && vl[e4]) || bl[e4]), offset: [0, 0], dynamicInset: !0 };
      switch (((s2[e4] = l3), yl.has(e4) && (l3.autoArrow = !1), e4)) {
        case "top":
        case "topLeft":
        case "topRight":
          l3.offset[1] = -i2 - r2;
          break;
        case "bottom":
        case "bottomLeft":
        case "bottomRight":
          l3.offset[1] = i2 + r2;
          break;
        case "left":
        case "leftTop":
        case "leftBottom":
          l3.offset[0] = -i2 - r2;
          break;
        case "right":
        case "rightTop":
        case "rightBottom":
          l3.offset[0] = i2 + r2;
      }
      if (n2)
        switch (e4) {
          case "topLeft":
          case "bottomLeft":
            l3.offset[0] = -c2.arrowOffsetHorizontal - i2;
            break;
          case "topRight":
          case "bottomRight":
            l3.offset[0] = c2.arrowOffsetHorizontal + i2;
            break;
          case "leftTop":
          case "rightTop":
            l3.offset[1] = 2 * -c2.arrowOffsetHorizontal + i2;
            break;
          case "leftBottom":
          case "rightBottom":
            l3.offset[1] = 2 * c2.arrowOffsetHorizontal - i2;
        }
      (l3.overflow = (function (e5, t3, o3, n3) {
        if (n3 === !1) return { adjustX: !1, adjustY: !1 };
        const r3 = v(n3) ? n3 : {},
          l4 = {};
        switch (e5) {
          case "top":
          case "bottom":
            (l4.shiftX = 2 * t3.arrowOffsetHorizontal + o3), (l4.shiftY = !0), (l4.adjustY = !0);
            break;
          case "left":
          case "right":
            (l4.shiftY = 2 * t3.arrowOffsetVertical + o3), (l4.shiftX = !0), (l4.adjustX = !0);
        }
        const a3 = { ...l4, ...r3 };
        return a3.shiftX || (a3.adjustX = !0), a3.shiftY || (a3.adjustY = !0), a3;
      })(e4, c2, t2, o2)),
        a2 && (l3.htmlRegion = "visibleFirst");
    }),
    s2
  );
}
const xl = It.createContext(!1),
  Cl = (e3, t2) => {
    const o2 = (e4) => (typeof e4 == "boolean" ? { show: e4 } : e4 || {});
    return It.useMemo(() => {
      const n2 = o2(e3),
        r2 = o2(t2);
      return { ...r2, ...n2, show: n2.show ?? r2.show ?? !0 };
    }, [e3, t2]);
  },
  wl = (e3) => {
    const {
        calc: t2,
        componentCls: o2,
        tooltipMaxWidth: n2,
        tooltipColor: r2,
        tooltipBg: l2,
        tooltipBorderRadius: a2,
        zIndexPopup: i2,
        controlHeight: s2,
        dropShadowPopover: c2,
        paddingSM: d2,
        paddingXS: u2,
        arrowOffsetHorizontal: p2,
        sizePopupArrow: m2,
        antCls: f2,
      } = e3,
      [h2, g2] = k(f2, "tooltip"),
      b2 = t2(a2).add(m2).add(p2).equal(),
      v2 = {
        minWidth: t2(a2).mul(2).add(m2).equal(),
        minHeight: s2,
        padding: `${X(e3.calc(d2).div(2).equal())} ${X(u2)}`,
        color: g2("overlay-color", r2),
        textAlign: "start",
        textDecoration: "none",
        wordWrap: "break-word",
        backgroundColor: l2,
        borderRadius: a2,
        boxSizing: "border-box",
      },
      y2 = {
        [h2("valid-offset-x")]: g2("arrow-offset-x", "var(--arrow-x)"),
        transformOrigin: [g2("valid-offset-x", "50%"), "var(--arrow-y, 50%)"].join(" "),
      };
    return [
      {
        [o2]: {
          ...ve(e3),
          position: "absolute",
          zIndex: i2,
          display: "block",
          width: "max-content",
          maxWidth: n2,
          visibility: "visible",
          filter: c2,
          ...y2,
          "&-hidden": { display: "none" },
          [h2("arrow-background-color")]: l2,
          [`${o2}-container`]: [v2, jo(e3, !0)],
          [`&:has(~ ${o2}-unique-container)`]: {
            [`${o2}-container`]: { border: "none", background: "transparent" },
          },
          [[
            "&-placement-topLeft",
            "&-placement-topRight",
            "&-placement-bottomLeft",
            "&-placement-bottomRight",
          ].join(",")]: { minWidth: b2 },
          [[
            "&-placement-left",
            "&-placement-leftTop",
            "&-placement-leftBottom",
            "&-placement-right",
            "&-placement-rightTop",
            "&-placement-rightBottom",
          ].join(",")]: { [`${o2}-inner`]: { borderRadius: e3.min(a2, 8) } },
          [`${o2}-content`]: { position: "relative" },
          ...Vt(e3, (e4, { darkColor: t3 }) => ({
            [`&${o2}-${e4}`]: {
              [`${o2}-container`]: { backgroundColor: t3 },
              [`${o2}-arrow`]: { [h2("arrow-background-color")]: t3 },
            },
          })),
          "&-rtl": { direction: "rtl" },
        },
      },
      gl(e3, g2("arrow-background-color"), { arrowShadow: !1 }),
      { [`${o2}-pure`]: { position: "relative", maxWidth: "none", margin: e3.sizePopupArrow } },
      {
        [`${o2}-unique-container`]: {
          ...v2,
          ...y2,
          position: "absolute",
          zIndex: t2(i2).sub(1).equal(),
          filter: c2,
          "&-hidden": { display: "none" },
          "&-visible": { transition: `all ${e3.motionDurationSlow}` },
        },
      },
    ];
  },
  Sl = (e3) => ({
    zIndexPopup: e3.zIndexPopupBase + 70,
    maxWidth: 250,
    ...hl({ contentRadius: e3.borderRadius, limitVerticalRadius: !0 }),
    ...ml(q(e3, { borderRadiusOuter: Math.min(e3.borderRadiusOuter, 4) })),
  }),
  El = (e3, t2, o2 = !0) =>
    Y(
      "Tooltip",
      (e4) => {
        const {
            borderRadius: t3,
            colorTextLightSolid: o3,
            colorBgSpotlight: n2,
            maxWidth: r2,
          } = e4,
          l2 = q(e4, {
            tooltipMaxWidth: r2,
            tooltipColor: o3,
            tooltipBorderRadius: t3,
            tooltipBg: n2,
          });
        return [wl(l2), Xo(e4, "zoom-big-fast")];
      },
      Sl,
      { resetStyle: !1, injectStyle: o2 },
    )(e3, t2),
  kl = c.map((e3) => `${e3}-inverse`),
  Nl = (e3, t2, o2) => {
    const n2 = (function (e4, t3 = !0) {
        return t3 ? [].concat(S(kl), S(c)).includes(e4) : c.includes(e4);
      })(o2),
      [r2] = k(e3, "tooltip"),
      l2 = P({ [`${t2}-${o2}`]: o2 && n2 }),
      a2 = {},
      i2 = {},
      s2 = ((e4) => (e4 instanceof en ? e4 : new en(e4)))(o2).toRgb(),
      d2 = (0.299 * s2.r + 0.587 * s2.g + 0.114 * s2.b) / 255 < 0.5 ? "#FFF" : "#000";
    return (
      o2 &&
        !n2 &&
        ((a2.background = o2),
        (a2[r2("overlay-color")] = d2),
        (i2[r2("arrow-background-color")] = o2)),
      { className: l2, overlayStyle: a2, arrowStyle: i2 }
    );
  },
  Il = (e3) => {
    const {
        prefixCls: t2,
        className: o2,
        placement: n2 = "top",
        title: r2,
        color: l2,
        overlayInnerStyle: a2,
        classNames: i2,
        styles: s2,
      } = e3,
      { getPrefixCls: c2 } = Nt.useContext(B),
      d2 = c2("tooltip", t2),
      u2 = c2(),
      p2 = $e(d2),
      [m2, f2] = El(d2, p2),
      h2 = Nl(u2, d2, l2),
      g2 = h2.arrowStyle,
      b2 = Nt.useMemo(() => ({ container: { ...a2, ...h2.overlayStyle } }), [a2, h2.overlayStyle]),
      v2 = { ...e3, placement: n2 },
      [y2, $2] = de([i2], [b2, s2], { props: v2 }),
      x2 = P(p2, m2, f2, d2, `${d2}-pure`, `${d2}-placement-${n2}`, o2, h2.className);
    return Nt.createElement(
      "div",
      { className: x2, style: g2 },
      Nt.createElement("div", { className: `${d2}-arrow` }),
      Nt.createElement(al, { ...e3, className: m2, prefixCls: d2, classNames: y2, styles: $2 }, r2),
    );
  },
  Bl = Nt.forwardRef((e3, t2) => {
    const {
        prefixCls: o2,
        openClassName: n2,
        getTooltipContainer: r2,
        color: l2,
        children: a2,
        afterOpenChange: i2,
        arrow: s2,
        destroyTooltipOnHide: c2,
        destroyOnHidden: d2,
        title: u2,
        overlay: p2,
        trigger: m2,
        builtinPlacements: f2,
        autoAdjustOverflow: g2 = !0,
        motion: b2,
        getPopupContainer: v2,
        placement: y2 = "top",
        mouseEnterDelay: $2,
        mouseLeaveDelay: x2,
        rootClassName: C2,
        styles: w2,
        classNames: S2,
        onOpenChange: E2,
        overlayInnerStyle: k2,
        overlayStyle: N2,
        overlayClassName: I2,
        ...B2
      } = e3,
      [, R2] = A(),
      T2 = e3["data-popover-inject"],
      { getPopupContainer: M2, getPrefixCls: L2, direction: O2, ...z2 } = oe("tooltip"),
      {
        className: j2,
        style: _2,
        classNames: K2,
        styles: W2,
        arrow: F2,
        trigger: G2,
        mouseEnterDelay: q2,
        mouseLeaveDelay: V2,
      } = T2 ? {} : z2,
      X2 = $2 ?? q2 ?? 0.1,
      U2 = x2 ?? V2 ?? 0.1,
      Y2 = Cl(s2, F2),
      Z2 = Y2.show,
      J2 = m2 || G2 || "hover",
      Q2 = v2 || r2 || M2,
      ee2 = d2 ?? !!c2,
      te2 = Nt.useContext(xl);
    Te();
    const ne2 = Nt.useRef(null),
      re2 = () => {
        var e4;
        (e4 = ne2.current) == null || e4.forceAlign();
      };
    Nt.useImperativeHandle(t2, () => {
      var e4, t3;
      return {
        forceAlign: re2,
        nativeElement: (e4 = ne2.current) == null ? void 0 : e4.nativeElement,
        popupElement: (t3 = ne2.current) == null ? void 0 : t3.popupElement,
      };
    });
    const [le2, ae2] = Me(e3.defaultOpen ?? !1, e3.open),
      ie2 = !u2 && !p2 && u2 !== 0,
      se2 = Nt.useMemo(
        () =>
          f2 ||
          $l({
            arrowPointAtCenter: Y2?.pointAtCenter ?? !1,
            autoAdjustOverflow: g2,
            arrowWidth: Z2 ? R2.sizePopupArrow : 0,
            borderRadius: R2.borderRadius,
            offset: R2.marginXXS,
            visibleFirst: !0,
          }),
        [Y2, f2, R2, Z2, g2],
      ),
      ue2 = Nt.useMemo(() => (u2 === 0 ? u2 : p2 || u2 || ""), [p2, u2]),
      pe2 = Nt.createElement(Ce, { space: !0, form: !0 }, h(ue2) ? ue2() : ue2),
      me2 = {
        ...e3,
        trigger: J2,
        builtinPlacements: se2,
        getPopupContainer: Q2,
        destroyOnHidden: ee2,
        mouseEnterDelay: X2,
        mouseLeaveDelay: U2,
      },
      fe2 = ce(_2),
      he2 = ce(N2),
      [ge2, be2] = de([K2, S2], [W2, fe2, w2, he2], { props: me2 }),
      ve2 = L2("tooltip", o2),
      ye2 = L2();
    let Ee2 = le2;
    ((!("open" in e3) && ie2) || te2) && (Ee2 = !1);
    const ke2 = Nt.isValidElement(a2) && !H(a2) ? a2 : Nt.createElement("span", null, a2),
      Ne2 = ke2.props,
      Ie2 =
        Ne2.className && typeof Ne2.className != "string"
          ? Ne2.className
          : P(Ne2.className, n2 || `${ve2}-open`),
      Be2 = $e(ve2),
      [Re2, Pe2] = El(ve2, Be2, !T2),
      Ae2 = Nl(ye2, ve2, l2),
      Le2 = Ae2.arrowStyle,
      Oe2 = P(Be2, Re2, Pe2),
      De2 = P(I2, { [`${ve2}-rtl`]: O2 === "rtl" }, Ae2.className, C2, Oe2, j2, ge2.root),
      [ze2, He2] = xe("Tooltip", B2.zIndex),
      je2 = { ...be2.container, ...k2, ...Ae2.overlayStyle },
      _e2 = Nt.createElement(
        pl,
        {
          unique: !0,
          ...B2,
          zIndex: ze2,
          showArrow: Z2,
          placement: y2,
          mouseEnterDelay: X2,
          mouseLeaveDelay: U2,
          prefixCls: ve2,
          classNames: {
            root: De2,
            container: ge2.container,
            arrow: ge2.arrow,
            uniqueContainer: P(Oe2, ge2.container),
          },
          styles: {
            root: { ...Le2, ...be2.root },
            container: je2,
            uniqueContainer: je2,
            arrow: be2.arrow,
          },
          ref: ne2,
          overlay: pe2,
          visible: Ee2,
          onVisibleChange: (e4) => {
            ae2(!ie2 && e4), !ie2 && E2 && E2(e4);
          },
          afterVisibleChange: i2,
          arrowContent: Nt.createElement("span", { className: `${ve2}-arrow-content` }),
          motion: {
            motionName: Se(
              ye2,
              "zoom-big-fast",
              typeof b2?.motionName == "string" ? b2?.motionName : void 0,
            ),
            motionDeadline: 1e3,
          },
          trigger: J2,
          builtinPlacements: se2,
          getTooltipContainer: Q2,
          destroyOnHidden: ee2,
        },
        Ee2 && !B2.disabled ? D(ke2, { className: Ie2 }) : ke2,
      );
    return Nt.createElement(we.Provider, { value: He2 }, _e2);
  }),
  Rl = Bl;
(Rl._InternalPanelDoNotUseOrYouWillBeFired = Il), (Rl.UniqueProvider = Re);
const Tl = Rl,
  Ml = {
    icon: {
      tag: "svg",
      attrs: { viewBox: "64 64 896 896", focusable: "false" },
      children: [
        {
          tag: "path",
          attrs: {
            d: "M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z",
          },
        },
      ],
    },
    name: "left",
    theme: "outlined",
  };
function Pl() {
  return (
    (Pl = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    Pl.apply(this, arguments)
  );
}
const Al = (e3, t2) => Nt.createElement(d, Pl({}, e3, { ref: t2, icon: Ml })),
  Ll = Nt.forwardRef(Al),
  { ESC: Ol, TAB: Dl } = Pe,
  zl = Nt.forwardRef((e3, t2) => {
    const { overlay: o2, arrow: n2, prefixCls: r2 } = e3,
      l2 = Nt.useMemo(() => {
        let e4;
        return (e4 = typeof o2 == "function" ? o2() : o2), e4;
      }, [o2]),
      a2 = M(t2, O(l2));
    return It.createElement(
      It.Fragment,
      null,
      n2 && It.createElement("div", { className: `${r2}-arrow` }),
      It.cloneElement(l2, { ref: L(l2) ? a2 : void 0 }),
    );
  }),
  Hl = { adjustX: 1, adjustY: 1 },
  jl = [0, 0],
  _l = {
    topLeft: { points: ["bl", "tl"], overflow: Hl, offset: [0, -4], targetOffset: jl },
    top: { points: ["bc", "tc"], overflow: Hl, offset: [0, -4], targetOffset: jl },
    topRight: { points: ["br", "tr"], overflow: Hl, offset: [0, -4], targetOffset: jl },
    bottomLeft: { points: ["tl", "bl"], overflow: Hl, offset: [0, 4], targetOffset: jl },
    bottom: { points: ["tc", "bc"], overflow: Hl, offset: [0, 4], targetOffset: jl },
    bottomRight: { points: ["tr", "br"], overflow: Hl, offset: [0, 4], targetOffset: jl },
  };
function Kl() {
  return (
    (Kl = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    Kl.apply(this, arguments)
  );
}
const Wl = It.forwardRef((e3, t2) => {
    var o2;
    const {
        arrow: n2 = !1,
        prefixCls: l2 = "rc-dropdown",
        transitionName: a2,
        animation: i2,
        align: s2,
        placement: c2 = "bottomLeft",
        placements: d2 = _l,
        getPopupContainer: u2,
        showAction: p2,
        hideAction: m2,
        overlayClassName: f2,
        overlayStyle: h2,
        visible: g2,
        trigger: b2 = ["hover"],
        autoFocus: v2,
        overlay: y2,
        children: $2,
        onVisibleChange: x2,
        disabled: C2,
        ...w2
      } = e3,
      [S2, E2] = It.useState(),
      k2 = "visible" in e3 ? g2 : S2,
      N2 = i2 ? `${l2}-${i2}` : a2,
      I2 = It.useRef(null),
      B2 = It.useRef(null),
      R2 = It.useRef(null);
    It.useImperativeHandle(t2, () => I2.current);
    const T2 = (e4) => {
      E2(e4), x2?.(e4);
    };
    (function ({
      visible: e4,
      triggerRef: t3,
      onVisibleChange: o3,
      autoFocus: n3,
      overlayRef: l3,
    }) {
      const a3 = Nt.useRef(!1),
        i3 = () => {
          var n4, r2;
          e4 &&
            ((r2 = (n4 = t3.current) == null ? void 0 : n4.focus) == null || r2.call(n4), o3?.(!1));
        },
        s3 = () => {
          var e5;
          return (
            !!((e5 = l3.current) != null && e5.focus) && (l3.current.focus(), (a3.current = !0), !0)
          );
        },
        c3 = (e5) => {
          switch (e5.keyCode) {
            case Ol:
              i3();
              break;
            case Dl: {
              let t4 = !1;
              a3.current || (t4 = s3()), t4 ? e5.preventDefault() : i3();
              break;
            }
          }
        };
      Nt.useEffect(
        () =>
          e4
            ? (window.addEventListener("keydown", c3),
              n3 && r(s3, 3),
              () => {
                window.removeEventListener("keydown", c3), (a3.current = !1);
              })
            : () => {
                a3.current = !1;
              },
        [e4],
      );
    })({ visible: k2, triggerRef: R2, onVisibleChange: T2, autoFocus: v2, overlayRef: B2 });
    const A2 = () => It.createElement(zl, { ref: B2, overlay: y2, prefixCls: l2, arrow: n2 }),
      D2 = $2,
      z2 = P(
        (o2 = D2.props) == null ? void 0 : o2.className,
        k2 &&
          (() => {
            const { openClassName: t3 } = e3;
            return t3 !== void 0 ? t3 : `${l2}-open`;
          })(),
      ),
      H2 = { className: z2, ref: M(R2, O(D2)) },
      j2 = L(D2)
        ? It.cloneElement(D2, H2)
        : It.createElement(
            "span",
            { className: z2, ref: R2 },
            It.cloneElement(D2, { className: z2 }),
          );
    let _2 = m2;
    return (
      _2 || b2.indexOf("contextMenu") === -1 || (_2 = ["click"]),
      It.createElement(
        Be,
        Kl({ builtinPlacements: d2 }, w2, {
          prefixCls: l2,
          ref: I2,
          popupClassName: P(f2, { [`${l2}-show-arrow`]: n2 }),
          popupStyle: h2,
          action: b2,
          showAction: p2,
          hideAction: _2,
          popupPlacement: c2,
          popupAlign: s2,
          popupMotion: { motionName: N2 },
          popupVisible: k2,
          stretch: (() => {
            const { minOverlayWidthMatchTrigger: t3, alignPoint: o3 } = e3;
            return "minOverlayWidthMatchTrigger" in e3 ? t3 : !o3;
          })()
            ? "minWidth"
            : "",
          popup: typeof y2 == "function" ? A2 : A2(),
          onOpenChange: T2,
          onPopupClick: (t3) => {
            const { onOverlayClick: o3 } = e3;
            E2(!1), o3 && o3(t3);
          },
          getPopupContainer: u2,
        }),
        j2,
      )
    );
  }),
  Fl = Nt.createContext(null);
function Gl(e3, t2) {
  return `${e3}-${t2}`;
}
function ql(e3) {
  return Gl(Nt.useContext(Fl), e3);
}
const Vl = Nt.createContext(null);
function Xl({ children: e3, locked: t2, ...o2 }) {
  const n2 = Nt.useContext(Vl),
    r2 = Ae(
      () =>
        (function (e4, t3) {
          const o3 = { ...e4 };
          return (
            Object.keys(t3).forEach((e5) => {
              const n3 = t3[e5];
              n3 !== void 0 && (o3[e5] = n3);
            }),
            o3
          );
        })(n2, o2),
      [n2, o2],
      (e4, o3) => !(t2 || (e4[0] === o3[0] && Le(e4[1], o3[1], !0))),
    );
  return Nt.createElement(Vl.Provider, { value: r2 }, e3);
}
const Ul = [],
  Yl = Nt.createContext(null);
function Zl() {
  return Nt.useContext(Yl);
}
const Jl = Nt.createContext(Ul);
function Ql(e3) {
  const t2 = Nt.useContext(Jl);
  return Nt.useMemo(() => (e3 !== void 0 ? [...t2, e3] : t2), [t2, e3]);
}
const ea = Nt.createContext(null),
  ta = Nt.createContext({}),
  { LEFT: oa, RIGHT: na, UP: ra, DOWN: la, ENTER: aa, ESC: ia, HOME: sa, END: ca } = Pe,
  da = [ra, la, oa, na];
function ua(e3, t2) {
  return Mt(e3, !0).filter((e4) => t2.has(e4));
}
function pa(e3, t2, o2, n2 = 1) {
  if (!e3) return null;
  const r2 = ua(e3, t2),
    l2 = r2.length;
  let a2 = r2.findIndex((e4) => o2 === e4);
  return (
    n2 < 0 ? (a2 === -1 ? (a2 = l2 - 1) : (a2 -= 1)) : n2 > 0 && (a2 += 1),
    (a2 = (a2 + l2) % l2),
    r2[a2]
  );
}
const ma = (e3, t2) => {
  const o2 = new Set(),
    n2 = new Map(),
    r2 = new Map();
  return (
    e3.forEach((e4) => {
      const l2 = document.querySelector(`[data-menu-id='${Gl(t2, e4)}']`);
      l2 && (o2.add(l2), r2.set(l2, e4), n2.set(e4, l2));
    }),
    { elements: o2, key2element: n2, element2key: r2 }
  );
};
function fa(e3, t2, o2, n2, l2, a2, i2, s2, c2, d2) {
  const u2 = Nt.useRef(void 0),
    p2 = Nt.useRef(void 0);
  p2.current = t2;
  const m2 = () => {
    r.cancel(u2.current);
  };
  return (
    Nt.useEffect(
      () => () => {
        m2();
      },
      [],
    ),
    (f2) => {
      const { which: h2 } = f2;
      if ([...da, aa, ia, sa, ca].includes(h2)) {
        const d3 = a2();
        let g2 = ma(d3, n2);
        const { elements: b2, key2element: v2, element2key: y2 } = g2,
          $2 = (function (e4, t3) {
            let o3 = e4 || document.activeElement;
            for (; o3; ) {
              if (t3.has(o3)) return o3;
              o3 = o3.parentElement;
            }
            return null;
          })(v2.get(t2), b2),
          x2 = y2.get($2),
          C2 = (function (e4, t3, o3, n3) {
            var r2;
            const l3 = "prev",
              a3 = "next",
              i3 = "children",
              s3 = "parent";
            if (e4 === "inline" && n3 === aa) return { inlineTrigger: !0 };
            const c3 = { [ra]: l3, [la]: a3 },
              d4 = { [oa]: o3 ? a3 : l3, [na]: o3 ? l3 : a3, [la]: i3, [aa]: i3 },
              u3 = {
                [ra]: l3,
                [la]: a3,
                [aa]: i3,
                [ia]: s3,
                [oa]: o3 ? i3 : s3,
                [na]: o3 ? s3 : i3,
              };
            switch (
              (r2 = {
                inline: c3,
                horizontal: d4,
                vertical: u3,
                inlineSub: c3,
                horizontalSub: u3,
                verticalSub: u3,
              }[`${e4}${t3 ? "" : "Sub"}`]) == null
                ? void 0
                : r2[n3]
            ) {
              case l3:
                return { offset: -1, sibling: !0 };
              case a3:
                return { offset: 1, sibling: !0 };
              case s3:
                return { offset: -1, sibling: !1 };
              case i3:
                return { offset: 1, sibling: !1 };
              default:
                return null;
            }
          })(e3, i2(x2, !0).length === 1, o2, h2);
        if (!C2 && h2 !== sa && h2 !== ca) return;
        (da.includes(h2) || [sa, ca].includes(h2)) && f2.preventDefault();
        const w2 = (e4) => {
          if (e4) {
            let t3 = e4;
            const o3 = e4.querySelector("a");
            o3?.getAttribute("href") && (t3 = o3);
            const n3 = y2.get(e4);
            s2(n3),
              m2(),
              (u2.current = r(() => {
                p2.current === n3 && t3.focus();
              }));
          }
        };
        if ([sa, ca].includes(h2) || C2.sibling || !$2) {
          let t3, o3;
          t3 =
            $2 && e3 !== "inline"
              ? (function (e4) {
                  let t4 = e4;
                  for (; t4; ) {
                    if (t4.getAttribute("data-menu-list")) return t4;
                    t4 = t4.parentElement;
                  }
                  return null;
                })($2)
              : l2.current;
          const n3 = ua(t3, b2);
          (o3 = h2 === sa ? n3[0] : h2 === ca ? n3[n3.length - 1] : pa(t3, b2, $2, C2.offset)),
            w2(o3);
        } else if (C2.inlineTrigger) c2(x2);
        else if (C2.offset > 0)
          c2(x2, !0),
            m2(),
            (u2.current = r(() => {
              g2 = ma(d3, n2);
              const e4 = $2.getAttribute("aria-controls"),
                t3 = pa(document.getElementById(e4), g2.elements);
              w2(t3);
            }, 5));
        else if (C2.offset < 0) {
          const e4 = i2(x2, !0),
            t3 = e4[e4.length - 2],
            o3 = v2.get(t3);
          c2(t3, !1), w2(o3);
        }
      }
      d2?.(f2);
    }
  );
}
const ha = "__RC_UTIL_PATH_SPLIT__",
  ga = (e3) => e3.join(ha),
  ba = "rc-menu-more";
function va() {
  const [, e3] = Nt.useState({}),
    t2 = Nt.useRef(new Map()),
    o2 = Nt.useRef(new Map()),
    [n2, r2] = Nt.useState([]),
    l2 = Nt.useRef(0),
    a2 = Nt.useRef(!1),
    i2 = Nt.useCallback((n3, r3) => {
      const i3 = ga(r3);
      o2.current.set(i3, n3), t2.current.set(n3, i3), (l2.current += 1);
      const s3 = l2.current;
      var c3;
      (c3 = () => {
        s3 === l2.current && (a2.current || e3({}));
      }),
        Promise.resolve().then(c3);
    }, []),
    s2 = Nt.useCallback((e4, n3) => {
      const r3 = ga(n3);
      o2.current.delete(r3), t2.current.delete(e4);
    }, []),
    c2 = Nt.useCallback((e4) => {
      r2(e4);
    }, []),
    d2 = Nt.useCallback(
      (e4, o3) => {
        const r3 = t2.current.get(e4) || "",
          l3 = r3.split(ha);
        return o3 && n2.includes(l3[0]) && l3.unshift(ba), l3;
      },
      [n2],
    ),
    u2 = Nt.useCallback(
      (e4, t3) => e4.filter((e5) => e5 !== void 0).some((e5) => d2(e5, !0).includes(t3)),
      [d2],
    ),
    p2 = Nt.useCallback((e4) => {
      const n3 = `${t2.current.get(e4)}${ha}`,
        r3 = new Set();
      return (
        [...o2.current.keys()].forEach((e5) => {
          e5.startsWith(n3) && r3.add(o2.current.get(e5));
        }),
        r3
      );
    }, []);
  return (
    Nt.useEffect(
      () => () => {
        a2.current = !0;
      },
      [],
    ),
    {
      registerPath: i2,
      unregisterPath: s2,
      refreshOverflowKeys: c2,
      isSubPathKey: u2,
      getKeyPath: d2,
      getKeys: () => {
        const e4 = [...t2.current.keys()];
        return n2.length && e4.push(ba), e4;
      },
      getSubPathKeys: p2,
    }
  );
}
function ya(e3) {
  const t2 = Nt.useRef(e3);
  t2.current = e3;
  const o2 = Nt.useCallback((...e4) => {
    var o3;
    return (o3 = t2.current) == null ? void 0 : o3.call(t2, ...e4);
  }, []);
  return e3 ? o2 : void 0;
}
function $a(e3, t2, o2, n2) {
  const { activeKey: r2, onActive: l2, onInactive: a2 } = Nt.useContext(Vl),
    i2 = { active: r2 === e3 };
  return (
    t2 ||
      ((i2.onMouseEnter = (t3) => {
        o2?.({ key: e3, domEvent: t3 }), l2(e3);
      }),
      (i2.onMouseLeave = (t3) => {
        n2?.({ key: e3, domEvent: t3 }), a2(e3);
      })),
    i2
  );
}
function xa(e3) {
  const { mode: t2, rtl: o2, inlineIndent: n2 } = Nt.useContext(Vl);
  return t2 !== "inline" ? null : o2 ? { paddingRight: e3 * n2 } : { paddingLeft: e3 * n2 };
}
function Ca({ icon: e3, props: t2, children: o2 }) {
  let n2;
  return e3 === null || e3 === !1
    ? null
    : (typeof e3 == "function"
        ? (n2 = Nt.createElement(e3, { ...t2 }))
        : typeof e3 != "boolean" && (n2 = e3),
      n2 || o2 || null);
}
function wa({ item: e3, ...t2 }) {
  return (
    Object.defineProperty(t2, "item", {
      get: () => (
        Oe(
          !1,
          "`info.item` is deprecated since we will move to function component that not provides React Node instance in future.",
        ),
        e3
      ),
    }),
    t2
  );
}
function Sa() {
  return (
    (Sa = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    Sa.apply(this, arguments)
  );
}
class Ea extends Nt.Component {
  render() {
    const { title: e3, attribute: t2, elementRef: o2, ...n2 } = this.props,
      r2 = se(n2, ["eventKey", "popupClassName", "popupOffset", "onTitleClick"]);
    return (
      Oe(!t2, "`attribute` of Menu.Item is deprecated. Please pass attribute directly."),
      Nt.createElement(
        De.Item,
        Sa({}, t2, { title: typeof e3 == "string" ? e3 : void 0 }, r2, { ref: o2 }),
      )
    );
  }
}
const ka = Nt.forwardRef((e3, t2) => {
  const {
      style: o2,
      className: n2,
      eventKey: r2,
      warnKey: l2,
      disabled: a2,
      itemIcon: i2,
      children: s2,
      itemData: c2,
      role: d2,
      onMouseEnter: u2,
      onMouseLeave: p2,
      onClick: m2,
      onKeyDown: f2,
      onFocus: h2,
      ...g2
    } = e3,
    b2 = ql(r2),
    {
      prefixCls: v2,
      onItemClick: y2,
      disabled: $2,
      overflowDisabled: x2,
      itemIcon: C2,
      selectedKeys: w2,
      onActive: S2,
    } = Nt.useContext(Vl),
    { _internalRenderMenuItem: E2 } = Nt.useContext(ta),
    k2 = `${v2}-item`,
    N2 = Nt.useRef(null),
    I2 = Nt.useRef(null),
    B2 = $2 || a2,
    R2 = re(t2, I2),
    T2 = Ql(r2),
    M2 = (t3) => {
      const o3 = c2 || { key: r2 || "", label: s2, itemIcon: i2, extra: e3.extra, title: e3.title };
      return {
        key: r2,
        keyPath: [...T2].reverse(),
        item: N2.current,
        domEvent: t3,
        itemData: c2 || o3,
      };
    },
    A2 = i2 || C2,
    { active: L2, ...O2 } = $a(r2, B2, u2, p2),
    D2 = w2.includes(r2),
    z2 = xa(T2.length),
    H2 = {};
  e3.role === "option" && (H2["aria-selected"] = D2);
  let j2 = Nt.createElement(
    Ea,
    Sa(
      {
        ref: N2,
        elementRef: R2,
        role: d2 === null ? "none" : d2 || "menuitem",
        tabIndex: a2 ? null : -1,
        "data-menu-id": x2 && b2 ? null : b2,
      },
      se(g2, ["extra"]),
      O2,
      H2,
      {
        component: "li",
        "aria-disabled": a2,
        style: { ...z2, ...o2 },
        className: P(
          k2,
          { [`${k2}-active`]: L2, [`${k2}-selected`]: D2, [`${k2}-disabled`]: B2 },
          n2,
        ),
        onClick: (e4) => {
          if (B2) return;
          const t3 = M2(e4);
          m2?.(wa(t3)), y2(t3);
        },
        onKeyDown: (e4) => {
          if ((f2?.(e4), e4.which === Pe.ENTER)) {
            const t3 = M2(e4);
            m2?.(wa(t3)), y2(t3);
          }
        },
        onFocus: (e4) => {
          S2(r2), h2?.(e4);
        },
      },
    ),
    s2,
    Nt.createElement(Ca, { props: { ...e3, isSelected: D2 }, icon: A2 }),
  );
  return E2 && (j2 = E2(j2, e3, { selected: D2 })), j2;
});
function Na(e3, t2) {
  const { eventKey: o2 } = e3,
    n2 = Zl(),
    r2 = Ql(o2);
  return (
    Nt.useEffect(() => {
      if (n2)
        return (
          n2.registerPath(o2, r2),
          () => {
            n2.unregisterPath(o2, r2);
          }
        );
    }, [r2]),
    n2 ? null : Nt.createElement(ka, Sa({}, e3, { ref: t2 }))
  );
}
const Ia = Nt.forwardRef(Na);
function Ba() {
  return (
    (Ba = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    Ba.apply(this, arguments)
  );
}
const Ra = ({ className: e3, children: t2, ...o2 }, n2) => {
    const { prefixCls: r2, mode: l2, rtl: a2 } = Nt.useContext(Vl);
    return Nt.createElement(
      "ul",
      Ba(
        {
          className: P(
            r2,
            a2 && `${r2}-rtl`,
            `${r2}-sub`,
            `${r2}-${l2 === "inline" ? "inline" : "vertical"}`,
            e3,
          ),
          role: "menu",
        },
        o2,
        { "data-menu-list": !0, ref: n2 },
      ),
      t2,
    );
  },
  Ta = Nt.forwardRef(Ra);
function Ma(e3, t2) {
  return te(e3).map((e4, o2) => {
    var n2;
    if (Nt.isValidElement(e4)) {
      const { key: r2 } = e4;
      let l2 = ((n2 = e4.props) == null ? void 0 : n2.eventKey) ?? r2;
      l2 == null && (l2 = `tmp_key-${[...t2, o2].join("-")}`);
      const a2 = { key: l2, eventKey: l2 };
      return Nt.cloneElement(e4, a2);
    }
    return e4;
  });
}
const Pa = { adjustX: 1, adjustY: 1 },
  Aa = {
    topLeft: { points: ["bl", "tl"], overflow: Pa },
    topRight: { points: ["br", "tr"], overflow: Pa },
    bottomLeft: { points: ["tl", "bl"], overflow: Pa },
    bottomRight: { points: ["tr", "br"], overflow: Pa },
    leftTop: { points: ["tr", "tl"], overflow: Pa },
    leftBottom: { points: ["br", "bl"], overflow: Pa },
    rightTop: { points: ["tl", "tr"], overflow: Pa },
    rightBottom: { points: ["bl", "br"], overflow: Pa },
  },
  La = {
    topLeft: { points: ["bl", "tl"], overflow: Pa },
    topRight: { points: ["br", "tr"], overflow: Pa },
    bottomLeft: { points: ["tl", "bl"], overflow: Pa },
    bottomRight: { points: ["tr", "br"], overflow: Pa },
    rightTop: { points: ["tr", "tl"], overflow: Pa },
    rightBottom: { points: ["br", "bl"], overflow: Pa },
    leftTop: { points: ["tl", "tr"], overflow: Pa },
    leftBottom: { points: ["bl", "br"], overflow: Pa },
  };
function Oa(e3, t2, o2) {
  return t2 || (o2 ? o2[e3] || o2.other : void 0);
}
const Da = {
  horizontal: "bottomLeft",
  vertical: "rightTop",
  "vertical-left": "rightTop",
  "vertical-right": "leftTop",
};
function za({
  prefixCls: e3,
  visible: t2,
  children: o2,
  popup: n2,
  popupStyle: l2,
  popupClassName: a2,
  popupOffset: i2,
  disabled: s2,
  mode: c2,
  onVisibleChange: d2,
}) {
  const {
      getPopupContainer: u2,
      rtl: p2,
      subMenuOpenDelay: m2,
      subMenuCloseDelay: f2,
      builtinPlacements: h2,
      triggerSubMenuAction: g2,
      forceSubMenuRender: b2,
      rootClassName: v2,
      motion: y2,
      defaultMotions: $2,
    } = Nt.useContext(Vl),
    [x2, C2] = Nt.useState(!1),
    w2 = p2 ? { ...La, ...h2 } : { ...Aa, ...h2 },
    S2 = Da[c2],
    E2 = Oa(c2, y2, $2),
    k2 = Nt.useRef(E2);
  c2 !== "inline" && (k2.current = E2);
  const N2 = {
      ...k2.current,
      leavedClassName: `${e3}-hidden`,
      removeOnLeave: !1,
      motionAppear: !0,
    },
    I2 = Nt.useRef(void 0);
  return (
    Nt.useEffect(
      () => (
        (I2.current = r(() => {
          C2(t2);
        })),
        () => {
          r.cancel(I2.current);
        }
      ),
      [t2],
    ),
    Nt.createElement(
      Be,
      {
        prefixCls: e3,
        popupClassName: P(`${e3}-popup`, { [`${e3}-rtl`]: p2 }, a2, v2),
        stretch: c2 === "horizontal" ? "minWidth" : null,
        getPopupContainer: u2,
        builtinPlacements: w2,
        popupPlacement: S2,
        popupVisible: x2,
        popup: n2,
        popupStyle: l2,
        popupAlign: i2 && { offset: i2 },
        action: s2 ? [] : [g2],
        mouseEnterDelay: m2,
        mouseLeaveDelay: f2,
        onPopupVisibleChange: d2,
        forceRender: b2,
        popupMotion: N2,
        fresh: !0,
      },
      o2,
    )
  );
}
function Ha() {
  return (
    (Ha = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    Ha.apply(this, arguments)
  );
}
function ja({ id: e3, open: t2, keyPath: o2, children: n2 }) {
  const r2 = "inline",
    {
      prefixCls: l2,
      forceSubMenuRender: a2,
      motion: i2,
      defaultMotions: s2,
      mode: c2,
    } = Nt.useContext(Vl),
    d2 = Nt.useRef(!1);
  d2.current = c2 === r2;
  const [u2, p2] = Nt.useState(!d2.current),
    m2 = !!d2.current && t2;
  Nt.useEffect(() => {
    d2.current && p2(!1);
  }, [c2]);
  const f2 = { ...Oa(r2, i2, s2) };
  o2.length > 1 && (f2.motionAppear = !1);
  const h2 = f2.onVisibleChanged;
  return (
    (f2.onVisibleChanged = (e4) => (d2.current || e4 || p2(!0), h2?.(e4))),
    u2
      ? null
      : Nt.createElement(
          Xl,
          { mode: r2, locked: !d2.current },
          Nt.createElement(
            R,
            Ha({ visible: m2 }, f2, {
              forceRender: a2,
              removeOnLeave: !1,
              leavedClassName: `${l2}-hidden`,
            }),
            ({ className: t3, style: o3 }) =>
              Nt.createElement(Ta, { id: e3, className: t3, style: o3 }, n2),
          ),
        )
  );
}
function _a() {
  return (
    (_a = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    _a.apply(this, arguments)
  );
}
const Ka = Nt.forwardRef((e3, t2) => {
    const {
        style: o2,
        className: n2,
        styles: r2,
        classNames: l2,
        title: a2,
        itemTitle: i2,
        eventKey: s2,
        warnKey: c2,
        disabled: d2,
        internalPopupClose: u2,
        children: p2,
        itemIcon: m2,
        expandIcon: f2,
        popupClassName: h2,
        popupOffset: g2,
        popupStyle: b2,
        onClick: v2,
        onMouseEnter: y2,
        onMouseLeave: $2,
        onTitleClick: x2,
        onTitleMouseEnter: C2,
        onTitleMouseLeave: w2,
        popupRender: S2,
        ...E2
      } = e3,
      k2 = ql(s2),
      {
        prefixCls: N2,
        mode: I2,
        openKeys: B2,
        disabled: R2,
        overflowDisabled: T2,
        activeKey: M2,
        selectedKeys: A2,
        itemIcon: L2,
        expandIcon: O2,
        onItemClick: D2,
        onOpenChange: z2,
        onActive: H2,
        popupRender: j2,
      } = Nt.useContext(Vl),
      { _internalRenderSubMenuItem: _2 } = Nt.useContext(ta),
      { isSubPathKey: K2 } = Nt.useContext(ea),
      W2 = Ql(),
      F2 = `${N2}-submenu`,
      G2 = R2 || d2,
      q2 = Nt.useRef(null),
      V2 = Nt.useRef(null),
      X2 = m2 ?? L2,
      U2 = f2 ?? O2,
      Y2 = B2.includes(s2),
      Z2 = !T2 && Y2,
      J2 = K2(A2, s2),
      { active: Q2, ...ee2 } = $a(s2, G2, C2, w2),
      [te2, oe2] = Nt.useState(!1),
      ne2 = (e4) => {
        G2 || oe2(e4);
      },
      re2 = Nt.useMemo(
        () => Q2 || (I2 !== "inline" && (te2 || K2([M2], s2))),
        [I2, Q2, M2, te2, s2, K2],
      ),
      le2 = xa(W2.length),
      ae2 = ya((e4) => {
        v2?.(wa(e4)), D2(e4);
      }),
      ie2 = (e4) => {
        I2 !== "inline" && z2(s2, e4);
      },
      se2 = k2 && `${k2}-popup`,
      ce2 = Nt.useMemo(
        () =>
          Nt.createElement(
            Ca,
            {
              icon: I2 !== "horizontal" ? U2 : void 0,
              props: { ...e3, isOpen: Z2, isSubMenu: !0 },
            },
            Nt.createElement("i", { className: `${F2}-arrow` }),
          ),
        [I2, U2, e3, Z2, F2],
      );
    let de2 = Nt.createElement(
      "div",
      _a(
        {
          role: "menuitem",
          style: le2,
          className: `${F2}-title`,
          tabIndex: G2 ? null : -1,
          ref: q2,
          title: i2 ?? (typeof a2 == "string" ? a2 : null),
          "data-menu-id": T2 && k2 ? null : k2,
          "aria-expanded": Z2,
          "aria-haspopup": !0,
          "aria-controls": se2,
          "aria-disabled": G2,
          onClick: (e4) => {
            G2 || (x2?.({ key: s2, domEvent: e4 }), I2 === "inline" && z2(s2, !Y2));
          },
          onFocus: () => {
            H2(s2);
          },
        },
        ee2,
      ),
      a2,
      ce2,
    );
    const ue2 = Nt.useRef(I2);
    I2 !== "inline" && W2.length > 1 ? (ue2.current = "vertical") : (ue2.current = I2);
    const pe2 = ue2.current,
      me2 = Nt.useMemo(() => {
        const t3 = Nt.createElement(
            Xl,
            { classNames: l2, styles: r2, mode: pe2 === "horizontal" ? "vertical" : pe2 },
            Nt.createElement(Ta, { id: se2, ref: V2 }, p2),
          ),
          o3 = S2 || j2;
        return o3 ? o3(t3, { item: e3, keys: W2 }) : t3;
      }, [S2, j2, W2, se2, p2, e3, pe2]);
    if (!T2) {
      const e4 = ue2.current;
      de2 = Nt.createElement(
        za,
        {
          mode: e4,
          prefixCls: F2,
          visible: !u2 && Z2 && I2 !== "inline",
          popupClassName: h2,
          popupOffset: g2,
          popupStyle: b2,
          popup: me2,
          disabled: G2,
          onVisibleChange: ie2,
        },
        de2,
      );
    }
    let fe2 = Nt.createElement(
      De.Item,
      _a({ ref: t2, role: "none" }, E2, {
        component: "li",
        style: o2,
        className: P(F2, `${F2}-${I2}`, n2, {
          [`${F2}-open`]: Z2,
          [`${F2}-active`]: re2,
          [`${F2}-selected`]: J2,
          [`${F2}-disabled`]: G2,
        }),
        onMouseEnter: (e4) => {
          ne2(!0), y2?.({ key: s2, domEvent: e4 });
        },
        onMouseLeave: (e4) => {
          ne2(!1), $2?.({ key: s2, domEvent: e4 });
        },
      }),
      de2,
      !T2 && Nt.createElement(ja, { id: se2, open: Z2, keyPath: W2 }, p2),
    );
    return (
      _2 && (fe2 = _2(fe2, e3, { selected: J2, active: re2, open: Z2, disabled: G2 })),
      Nt.createElement(
        Xl,
        {
          classNames: l2,
          styles: r2,
          onItemClick: ae2,
          mode: I2 === "horizontal" ? "vertical" : I2,
          itemIcon: X2,
          expandIcon: U2,
        },
        fe2,
      )
    );
  }),
  Wa = Nt.forwardRef((e3, t2) => {
    const { eventKey: o2, children: n2 } = e3,
      r2 = Ql(o2),
      l2 = Ma(n2, r2),
      a2 = Zl();
    let i2;
    return (
      Nt.useEffect(() => {
        if (a2)
          return (
            a2.registerPath(o2, r2),
            () => {
              a2.unregisterPath(o2, r2);
            }
          );
      }, [r2]),
      (i2 = a2 ? l2 : Nt.createElement(Ka, _a({ ref: t2 }, e3), l2)),
      Nt.createElement(Jl.Provider, { value: r2 }, i2)
    );
  });
function Fa({ className: e3, style: t2 }) {
  const { prefixCls: o2 } = Nt.useContext(Vl);
  return Zl()
    ? null
    : Nt.createElement("li", {
        role: "separator",
        className: P(`${o2}-item-divider`, e3),
        style: t2,
      });
}
function Ga() {
  return (
    (Ga = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    Ga.apply(this, arguments)
  );
}
const qa = Nt.forwardRef((e3, t2) => {
    const { className: o2, title: n2, eventKey: r2, children: l2, ...a2 } = e3,
      { prefixCls: i2, classNames: s2, styles: c2 } = Nt.useContext(Vl),
      d2 = `${i2}-item-group`;
    return Nt.createElement(
      "li",
      Ga({ ref: t2, role: "presentation" }, a2, {
        onClick: (e4) => e4.stopPropagation(),
        className: P(d2, o2),
      }),
      Nt.createElement(
        "div",
        {
          role: "presentation",
          className: P(`${d2}-title`, s2?.listTitle),
          style: c2?.listTitle,
          title: typeof n2 == "string" ? n2 : void 0,
        },
        n2,
      ),
      Nt.createElement(
        "ul",
        { role: "group", className: P(`${d2}-list`, s2?.list), style: c2?.list },
        l2,
      ),
    );
  }),
  Va = Nt.forwardRef((e3, t2) => {
    const { eventKey: o2, children: n2 } = e3,
      r2 = Ma(n2, Ql(o2));
    return Zl() ? r2 : Nt.createElement(qa, Ga({ ref: t2 }, se(e3, ["warnKey"])), r2);
  });
function Xa() {
  return (
    (Xa = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    Xa.apply(this, arguments)
  );
}
function Ua(e3, t2, o2) {
  const { item: n2, group: r2, submenu: l2, divider: a2 } = t2;
  return (e3 || [])
    .map((e4, i2) => {
      if (e4 && typeof e4 == "object") {
        const { label: s2, children: c2, key: d2, type: u2, extra: p2, ...m2 } = e4,
          f2 = d2 ?? `tmp-${i2}`;
        if (c2 || u2 === "group") {
          if (u2 === "group")
            return Nt.createElement(r2, Xa({ key: f2 }, m2, { title: s2 }), Ua(c2, t2, o2));
          const { title: e5, ...n3 } = m2;
          return Nt.createElement(
            l2,
            Xa({ key: f2 }, n3, { title: s2, itemTitle: typeof e5 == "string" ? e5 : void 0 }),
            Ua(c2, t2, o2),
          );
        }
        if (u2 === "divider") return Nt.createElement(a2, Xa({ key: f2 }, m2));
        const h2 = !!p2 || p2 === 0;
        return Nt.createElement(
          n2,
          Xa({ key: f2 }, m2, { extra: p2, itemData: { ...e4, key: f2 } }),
          h2
            ? Nt.createElement(
                Nt.Fragment,
                null,
                Nt.createElement("span", { className: `${o2}-item-label` }, s2),
                Nt.createElement("span", { className: `${o2}-item-extra` }, p2),
              )
            : s2,
        );
      }
      return null;
    })
    .filter((e4) => e4);
}
function Ya(e3, t2, o2, n2, r2) {
  let l2 = e3;
  const a2 = { divider: Fa, item: Ia, group: Va, submenu: Wa, ...n2 };
  return t2 && (l2 = Ua(t2, a2, r2)), Ma(l2, o2);
}
function Za() {
  return (
    (Za = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    Za.apply(this, arguments)
  );
}
const Ja = [],
  Qa = Nt.forwardRef((e3, t2) => {
    var o2;
    const {
        prefixCls: n2 = "rc-menu",
        rootClassName: r2,
        style: a2,
        className: i2,
        styles: s2,
        classNames: c2,
        tabIndex: d2 = 0,
        items: u2,
        children: p2,
        direction: m2,
        id: f2,
        mode: h2 = "vertical",
        inlineCollapsed: g2,
        disabled: b2,
        disabledOverflow: v2,
        subMenuOpenDelay: y2 = 0.1,
        subMenuCloseDelay: $2 = 0.1,
        forceSubMenuRender: x2,
        defaultOpenKeys: C2,
        openKeys: w2,
        activeKey: S2,
        defaultActiveFirst: E2,
        selectable: k2 = !0,
        multiple: N2 = !1,
        defaultSelectedKeys: I2,
        selectedKeys: B2,
        onSelect: R2,
        onDeselect: T2,
        inlineIndent: M2 = 24,
        motion: A2,
        defaultMotions: L2,
        triggerSubMenuAction: O2 = "hover",
        builtinPlacements: D2,
        itemIcon: z2,
        expandIcon: H2,
        overflowedIndicator: j2 = "...",
        overflowedIndicatorPopupClassName: _2,
        getPopupContainer: K2,
        onClick: W2,
        onOpenChange: F2,
        onKeyDown: G2,
        openAnimation: q2,
        openTransitionName: V2,
        _internalRenderMenuItem: X2,
        _internalRenderSubMenuItem: U2,
        _internalComponents: Y2,
        popupRender: Z2,
        ...J2
      } = e3,
      [Q2, ee2] = Nt.useMemo(() => [Ya(p2, u2, Ja, Y2, n2), Ya(p2, u2, Ja, {}, n2)], [p2, u2, Y2]),
      [te2, oe2] = Nt.useState(!1),
      ne2 = Nt.useRef(null),
      re2 = l(),
      le2 = f2 ?? `rc-menu-uuid-${re2}`,
      ae2 = m2 === "rtl",
      [ie2, se2] = Me(C2, w2),
      ce2 = ie2 || Ja,
      de2 = (e4, t3 = !1) => {
        function o3() {
          se2(e4), F2?.(e4);
        }
        t3 ? Bt.flushSync(o3) : o3();
      },
      [ue2, pe2] = Nt.useState(ce2),
      me2 = Nt.useRef(!1),
      [fe2, he2] = Nt.useMemo(
        () => ((h2 !== "inline" && h2 !== "vertical") || !g2 ? [h2, !1] : ["vertical", g2]),
        [h2, g2],
      ),
      ge2 = fe2 === "inline",
      [be2, ve2] = Nt.useState(fe2),
      [ye2, $e2] = Nt.useState(he2);
    Nt.useEffect(() => {
      ve2(fe2), $e2(he2), me2.current && (ge2 ? se2(ue2) : de2(Ja));
    }, [fe2, he2]);
    const [xe2, Ce2] = Nt.useState(0),
      we2 = xe2 >= Q2.length - 1 || be2 !== "horizontal" || v2;
    Nt.useEffect(() => {
      ge2 && pe2(ce2);
    }, [ce2]),
      Nt.useEffect(
        () => (
          (me2.current = !0),
          () => {
            me2.current = !1;
          }
        ),
        [],
      );
    const {
        registerPath: Se2,
        unregisterPath: Ee2,
        refreshOverflowKeys: ke2,
        isSubPathKey: Ne2,
        getKeyPath: Ie2,
        getKeys: Be2,
        getSubPathKeys: Re2,
      } = va(),
      Te2 = Nt.useMemo(() => ({ registerPath: Se2, unregisterPath: Ee2 }), [Se2, Ee2]),
      Pe2 = Nt.useMemo(() => ({ isSubPathKey: Ne2 }), [Ne2]);
    Nt.useEffect(() => {
      ke2(we2 ? Ja : Q2.slice(xe2 + 1).map((e4) => e4.key));
    }, [xe2, we2]);
    const [Ae2, Oe2] = Me(S2 || (E2 && ((o2 = Q2[0]) == null ? void 0 : o2.key)), S2),
      ze2 = ya((e4) => {
        Oe2(e4);
      }),
      He2 = ya(() => {
        Oe2(void 0);
      });
    Nt.useImperativeHandle(t2, () => ({
      list: ne2.current,
      focus: (e4) => {
        var t3, o3;
        const n3 = Be2(),
          { elements: r3, key2element: l2, element2key: a3 } = ma(n3, le2),
          i3 = ua(ne2.current, r3);
        let s3;
        s3 =
          Ae2 && n3.includes(Ae2)
            ? Ae2
            : i3[0]
              ? a3.get(i3[0])
              : (t3 = Q2.find((e5) => !e5.props.disabled)) == null
                ? void 0
                : t3.key;
        const c3 = l2.get(s3);
        s3 && c3 && ((o3 = c3?.focus) == null || o3.call(c3, e4));
      },
      findItem: ({ key: e4 }) => {
        const t3 = Be2(),
          { key2element: o3 } = ma(t3, le2);
        return o3.get(e4) || null;
      },
    }));
    const [je2, _e2] = Me(I2 || [], B2),
      Ke2 = Nt.useMemo(() => (Array.isArray(je2) ? je2 : je2 == null ? Ja : [je2]), [je2]),
      We2 = ya((e4) => {
        W2?.(wa(e4)),
          ((e5) => {
            if (k2) {
              const { key: t3 } = e5,
                o3 = Ke2.includes(t3);
              let n3;
              (n3 = N2 ? (o3 ? Ke2.filter((e6) => e6 !== t3) : [...Ke2, t3]) : [t3]), _e2(n3);
              const r3 = { ...e5, selectedKeys: n3 };
              o3 ? T2?.(r3) : R2?.(r3);
            }
            !N2 && ce2.length && be2 !== "inline" && de2(Ja);
          })(e4);
      }),
      Fe2 = ya((e4, t3) => {
        let o3 = ce2.filter((t4) => t4 !== e4);
        if (t3) o3.push(e4);
        else if (be2 !== "inline") {
          const t4 = Re2(e4);
          o3 = o3.filter((e5) => !t4.has(e5));
        }
        Le(ce2, o3, !0) || de2(o3, !0);
      }),
      Ge2 = fa(
        be2,
        Ae2,
        ae2,
        le2,
        ne2,
        Be2,
        Ie2,
        Oe2,
        (e4, t3) => {
          const o3 = t3 ?? !ce2.includes(e4);
          Fe2(e4, o3);
        },
        G2,
      );
    Nt.useEffect(() => {
      oe2(!0);
    }, []);
    const qe2 = Nt.useMemo(
        () => ({ _internalRenderMenuItem: X2, _internalRenderSubMenuItem: U2 }),
        [X2, U2],
      ),
      Ve2 =
        be2 !== "horizontal" || v2
          ? Q2
          : Q2.map((e4, t3) =>
              Nt.createElement(
                Xl,
                { key: e4.key, overflowDisabled: t3 > xe2, classNames: c2, styles: s2 },
                e4,
              ),
            ),
      Xe2 = Nt.createElement(
        De,
        Za(
          {
            id: f2,
            ref: ne2,
            prefixCls: `${n2}-overflow`,
            component: "ul",
            itemComponent: Ia,
            className: P(
              n2,
              `${n2}-root`,
              `${n2}-${be2}`,
              i2,
              { [`${n2}-inline-collapsed`]: ye2, [`${n2}-rtl`]: ae2 },
              r2,
            ),
            dir: m2,
            style: a2,
            role: "menu",
            tabIndex: d2,
            data: Ve2,
            renderRawItem: (e4) => e4,
            renderRawRest: (e4) => {
              const t3 = e4.length,
                o3 = t3 ? Q2.slice(-t3) : null;
              return Nt.createElement(
                Wa,
                {
                  eventKey: ba,
                  title: j2,
                  disabled: we2,
                  internalPopupClose: t3 === 0,
                  popupClassName: _2,
                },
                o3,
              );
            },
            maxCount: be2 !== "horizontal" || v2 ? De.INVALIDATE : De.RESPONSIVE,
            ssr: "full",
            "data-menu-list": !0,
            onVisibleChange: (e4) => {
              Ce2(e4);
            },
            onKeyDown: Ge2,
          },
          J2,
        ),
      );
    return Nt.createElement(
      ta.Provider,
      { value: qe2 },
      Nt.createElement(
        Fl.Provider,
        { value: le2 },
        Nt.createElement(
          Xl,
          {
            prefixCls: n2,
            rootClassName: r2,
            classNames: c2,
            styles: s2,
            mode: be2,
            openKeys: ce2,
            rtl: ae2,
            disabled: b2,
            motion: te2 ? A2 : null,
            defaultMotions: te2 ? L2 : null,
            activeKey: Ae2,
            onActive: ze2,
            onInactive: He2,
            selectedKeys: Ke2,
            inlineIndent: M2,
            subMenuOpenDelay: y2,
            subMenuCloseDelay: $2,
            forceSubMenuRender: x2,
            builtinPlacements: D2,
            triggerSubMenuAction: O2,
            getPopupContainer: K2,
            itemIcon: z2,
            expandIcon: H2,
            onItemClick: We2,
            onOpenChange: Fe2,
            popupRender: Z2,
          },
          Nt.createElement(ea.Provider, { value: Pe2 }, Xe2),
          Nt.createElement(
            "div",
            { style: { display: "none" }, "aria-hidden": !0 },
            Nt.createElement(Yl.Provider, { value: Te2 }, ee2),
          ),
        ),
      ),
    );
  });
(Qa.Item = Ia), (Qa.SubMenu = Wa), (Qa.ItemGroup = Va), (Qa.Divider = Fa);
const ei = Nt.createContext({}),
  ti = {
    icon: {
      tag: "svg",
      attrs: { viewBox: "64 64 896 896", focusable: "false" },
      children: [
        {
          tag: "path",
          attrs: {
            d: "M176 511a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0z",
          },
        },
      ],
    },
    name: "ellipsis",
    theme: "outlined",
  };
function oi() {
  return (
    (oi = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    oi.apply(this, arguments)
  );
}
const ni = (e3, t2) => Nt.createElement(d, oi({}, e3, { ref: t2, icon: ti })),
  ri = Nt.forwardRef(ni),
  li = Nt.createContext({
    prefixCls: "",
    firstLevel: !0,
    inlineCollapsed: !1,
    styles: null,
    classNames: null,
  }),
  ai = (e3) => {
    const { prefixCls: t2, className: o2, dashed: n2, ...r2 } = e3,
      { getPrefixCls: l2 } = Nt.useContext(B),
      a2 = l2("menu", t2),
      i2 = P({ [`${a2}-item-divider-dashed`]: !!n2 }, o2);
    return Nt.createElement(Fa, { className: i2, ...r2 });
  },
  ii = (e3) => {
    var t2, o2;
    const { className: n2, children: r2, icon: l2, title: a2, danger: i2, extra: s2 } = e3,
      {
        prefixCls: c2,
        firstLevel: d2,
        direction: u2,
        disableMenuItemTitleTooltip: p2,
        tooltip: m2,
        inlineCollapsed: f2,
        styles: g2,
        classNames: b2,
      } = Nt.useContext(li),
      { siderCollapsed: v2 } = Nt.useContext(ei),
      y2 = !(!v2 && !f2),
      [$2, x2] = Nt.useState(!1);
    Nt.useEffect(() => {
      x2(!1);
    }, [y2]);
    let C2 = a2;
    a2 === void 0 ? (C2 = d2 ? r2 : "") : a2 === !1 && (C2 = "");
    const w2 = m2 === !1 ? void 0 : m2,
      S2 = w2 && w2.title !== void 0 ? w2.title : C2,
      E2 = { ...(w2 ?? null), title: S2 };
    y2
      ? ((E2.open = w2?.open ?? $2),
        (E2.onOpenChange = (e4) => {
          var t3;
          x2(e4), (t3 = w2?.onOpenChange) == null || t3.call(w2, e4);
        }))
      : ((E2.title = null), (E2.open = !1));
    const k2 = te(r2).length;
    let N2 = Nt.createElement(
      Ia,
      {
        ...se(e3, ["title", "icon", "danger"]),
        className: P(
          d2 ? b2?.item : (t2 = b2?.subMenu) == null ? void 0 : t2.item,
          { [`${c2}-item-danger`]: i2, [`${c2}-item-only-child`]: (l2 ? k2 + 1 : k2) === 1 },
          n2,
        ),
        style: { ...(d2 ? g2?.item : (o2 = g2?.subMenu) == null ? void 0 : o2.item), ...e3.style },
        title: typeof a2 == "string" ? a2 : void 0,
        itemData: e3?.itemData ?? { ...e3, key: e3.eventKey },
      },
      D(l2, (e4) => {
        var t3, o3;
        return {
          className: P(
            `${c2}-item-icon`,
            d2 ? b2?.itemIcon : (t3 = b2?.subMenu) == null ? void 0 : t3.itemIcon,
            e4.className,
          ),
          style: {
            ...(d2 ? g2?.itemIcon : (o3 = g2?.subMenu) == null ? void 0 : o3.itemIcon),
            ...e4.style,
          },
        };
      }),
      ((e4) => {
        var t3, o3;
        const n3 = r2?.[0],
          a3 = Nt.createElement(
            "span",
            {
              className: P(
                `${c2}-title-content`,
                d2 ? b2?.itemContent : (t3 = b2?.subMenu) == null ? void 0 : t3.itemContent,
                { [`${c2}-title-content-with-extra`]: !!s2 || s2 === 0 },
              ),
              style: d2 ? g2?.itemContent : (o3 = g2?.subMenu) == null ? void 0 : o3.itemContent,
            },
            r2,
          );
        return (!l2 || (Nt.isValidElement(r2) && r2.type === "span")) &&
          r2 &&
          e4 &&
          d2 &&
          typeof n3 == "string"
          ? Nt.createElement("div", { className: `${c2}-inline-collapsed-noicon` }, n3.charAt(0))
          : a3;
      })(f2),
    );
    if (!p2 && m2 !== !1) {
      const e4 = w2 && w2.placement ? w2.placement : u2 === "rtl" ? "left" : "right",
        t3 = `${c2}-inline-collapsed-tooltip`,
        o3 = (e5) => ({ ...e5, root: P(t3, e5?.root) }),
        n3 = h(w2?.classNames)
          ? (e5) => {
              const t4 = w2.classNames(e5);
              return o3(t4);
            }
          : o3(w2?.classNames);
      N2 = Nt.createElement(Tl, { ...E2, placement: e4, classNames: n3 }, N2);
    }
    return N2;
  },
  si = Nt.createContext(null),
  ci = Nt.forwardRef((e3, t2) => {
    const { children: o2, ...n2 } = e3,
      r2 = Nt.useContext(si),
      l2 = Nt.useMemo(
        () => ({ ...r2, ...n2 }),
        [r2, n2.prefixCls, n2.mode, n2.selectable, n2.rootClassName],
      ),
      a2 = ze(o2),
      i2 = re(t2, a2 ? O(o2) : null);
    return Nt.createElement(
      si.Provider,
      { value: l2 },
      Nt.createElement(Ce, { space: !0 }, a2 ? Nt.cloneElement(o2, { ref: i2 }) : o2),
    );
  }),
  di = (e3) => {
    const {
      componentCls: t2,
      motionDurationSlow: o2,
      horizontalLineHeight: n2,
      colorSplit: r2,
      lineWidth: l2,
      lineType: a2,
      itemPaddingInline: i2,
    } = e3;
    return {
      [`${t2}-horizontal`]: {
        lineHeight: n2,
        border: 0,
        borderBottom: `${X(l2)} ${a2} ${r2}`,
        boxShadow: "none",
        "&::after": { display: "block", clear: "both", height: 0, content: '"\\20"' },
        [`${t2}-item, ${t2}-submenu`]: {
          position: "relative",
          display: "inline-block",
          verticalAlign: "bottom",
          paddingInline: i2,
        },
        [`> ${t2}-item:hover,
        > ${t2}-item-active,
        > ${t2}-submenu ${t2}-submenu-title:hover`]: { backgroundColor: "transparent" },
        [`${t2}-item, ${t2}-submenu-title`]: {
          transition: ["border-color", "background-color"].map((e4) => `${e4} ${o2}`).join(","),
        },
        [`${t2}-submenu-arrow`]: { display: "none" },
      },
    };
  },
  ui = ({ componentCls: e3, menuArrowOffset: t2, calc: o2 }) => ({
    [`${e3}-rtl`]: { direction: "rtl" },
    [`${e3}-submenu-rtl`]: { transformOrigin: "100% 0" },
    [`${e3}-rtl${e3}-vertical,
    ${e3}-submenu-rtl ${e3}-vertical`]: {
      [`${e3}-submenu-arrow`]: {
        "&::before": { transform: `rotate(-45deg) translateY(${X(o2(t2).mul(-1).equal())})` },
        "&::after": { transform: `rotate(45deg) translateY(${X(t2)})` },
      },
    },
  }),
  pi = (e3) => ye(e3),
  mi = (e3, t2) => {
    const {
      componentCls: o2,
      itemColor: n2,
      itemSelectedColor: r2,
      subMenuItemSelectedColor: l2,
      groupTitleColor: a2,
      itemBg: i2,
      subMenuItemBg: s2,
      itemSelectedBg: c2,
      activeBarHeight: d2,
      activeBarWidth: u2,
      activeBarBorderWidth: p2,
      motionDurationSlow: m2,
      motionEaseInOut: f2,
      motionEaseOut: h2,
      itemPaddingInline: g2,
      motionDurationMid: b2,
      itemHoverColor: v2,
      lineType: y2,
      colorSplit: $2,
      itemDisabledColor: x2,
      dangerItemColor: C2,
      dangerItemHoverColor: w2,
      dangerItemSelectedColor: S2,
      dangerItemActiveBg: E2,
      dangerItemSelectedBg: k2,
      popupBg: N2,
      itemHoverBg: I2,
      itemActiveBg: B2,
      menuSubMenuBg: R2,
      horizontalItemSelectedColor: T2,
      horizontalItemSelectedBg: M2,
      horizontalItemBorderRadius: P2,
      horizontalItemHoverBg: A2,
    } = e3;
    return {
      [`${o2}-${t2}, ${o2}-${t2} > ${o2}`]: {
        color: n2,
        background: i2,
        [`&${o2}-root:focus-visible`]: { ...pi(e3) },
        [`${o2}-item`]: { "&-group-title, &-extra": { color: a2 } },
        [`${o2}-submenu-selected > ${o2}-submenu-title`]: { color: l2 },
        [`${o2}-item, ${o2}-submenu-title`]: {
          color: n2,
          [`&:not(${o2}-item-disabled):focus-visible`]: { ...pi(e3) },
        },
        [`${o2}-item-disabled, ${o2}-submenu-disabled`]: { color: `${x2} !important` },
        [`${o2}-item:not(${o2}-item-selected):not(${o2}-submenu-selected)`]: {
          [`&:hover, > ${o2}-submenu-title:hover`]: { color: v2 },
        },
        [`${o2}-submenu:not(${o2}-submenu-selected)`]: {
          [`> ${o2}-submenu-title:hover`]: { color: v2 },
        },
        [`&:not(${o2}-horizontal)`]: {
          [`${o2}-item:not(${o2}-item-selected)`]: {
            "&:hover": { backgroundColor: I2 },
            "&:active": { backgroundColor: B2 },
          },
          [`${o2}-submenu-title`]: {
            "&:hover": { backgroundColor: I2 },
            "&:active": { backgroundColor: B2 },
          },
        },
        [`${o2}-item-danger`]: {
          color: C2,
          [`&${o2}-item:hover`]: {
            [`&:not(${o2}-item-selected):not(${o2}-submenu-selected)`]: { color: w2 },
          },
          [`&${o2}-item:active`]: { background: E2 },
        },
        [`${o2}-item a`]: { "&, &:hover": { color: "inherit" } },
        [`${o2}-item-selected`]: {
          color: r2,
          [`&${o2}-item-danger`]: { color: S2 },
          "a, a:hover": { color: "inherit" },
        },
        [`& ${o2}-item-selected`]: {
          backgroundColor: c2,
          [`&${o2}-item-danger`]: { backgroundColor: k2 },
        },
        [`&${o2}-submenu > ${o2}`]: { backgroundColor: R2 },
        [`&${o2}-popup > ${o2}`]: { backgroundColor: N2 },
        [`&${o2}-submenu-popup > ${o2}`]: { backgroundColor: N2 },
        [`&${o2}-horizontal`]: {
          ...(t2 === "dark" ? { borderBottom: 0 } : {}),
          [`> ${o2}-item, > ${o2}-submenu`]: {
            top: p2,
            marginTop: e3.calc(p2).mul(-1).equal(),
            marginBottom: 0,
            borderRadius: P2,
            "&::after": {
              position: "absolute",
              insetInline: g2,
              bottom: 0,
              pointerEvents: "none",
              borderBottom: `${X(d2)} solid transparent`,
              transition: `border-color ${m2} ${f2}`,
              content: '""',
            },
            "&:hover, &-active, &-open": {
              background: A2,
              "&::after": { borderBottomWidth: d2, borderBottomColor: T2 },
            },
            "&-selected": {
              color: T2,
              backgroundColor: M2,
              "&:hover": { backgroundColor: M2 },
              "&::after": { borderBottomWidth: d2, borderBottomColor: T2 },
            },
          },
        },
        [`&${o2}-root`]: {
          [`&${o2}-inline, &${o2}-vertical`]: { borderInlineEnd: `${X(p2)} ${y2} ${$2}` },
        },
        [`&${o2}-inline`]: {
          [`${o2}-sub${o2}-inline`]: { background: s2 },
          [`${o2}-item`]: {
            position: "relative",
            "&::after": {
              position: "absolute",
              insetBlock: 0,
              insetInlineEnd: 0,
              borderInlineEnd: `${X(u2)} solid ${r2}`,
              transform: "scaleY(0.0001)",
              opacity: 0,
              transition: ["transform", "opacity"].map((e4) => `${e4} ${b2} ${h2}`).join(","),
              content: '""',
            },
            [`&${o2}-item-danger`]: { "&::after": { borderInlineEndColor: S2 } },
          },
          [`${o2}-selected, ${o2}-item-selected`]: {
            "&::after": {
              transform: "scaleY(1)",
              opacity: 1,
              transition: ["transform", "opacity"].map((e4) => `${e4} ${b2} ${f2}`).join(","),
            },
          },
        },
      },
    };
  },
  fi = (e3) => {
    const {
        componentCls: t2,
        itemHeight: o2,
        itemMarginInline: n2,
        padding: r2,
        menuArrowSize: l2,
        marginXS: a2,
        itemMarginBlock: i2,
        itemWidth: s2,
        itemPaddingInline: c2,
      } = e3,
      d2 = e3.calc(l2).add(r2).add(a2).equal();
    return {
      [`${t2}-item`]: { position: "relative", overflow: "hidden" },
      [`${t2}-item, ${t2}-submenu-title`]: {
        height: o2,
        lineHeight: X(o2),
        paddingInline: c2,
        overflow: "hidden",
        textOverflow: "ellipsis",
        marginInline: n2,
        marginBlock: i2,
        width: s2,
      },
      [`> ${t2}-item,
            > ${t2}-submenu > ${t2}-submenu-title`]: { height: o2, lineHeight: X(o2) },
      [`${t2}-item-group-list ${t2}-submenu-title,
            ${t2}-submenu-title`]: { paddingInlineEnd: d2 },
    };
  },
  hi = (e3) => {
    const {
        componentCls: t2,
        iconCls: o2,
        itemHeight: n2,
        colorTextLightSolid: r2,
        dropdownWidth: l2,
        controlHeightLG: a2,
        padding: i2,
        paddingXL: s2,
        itemMarginInline: c2,
        fontSizeLG: d2,
        motionDurationSlow: u2,
        paddingXS: p2,
        boxShadowSecondary: m2,
        collapsedWidth: f2,
        collapsedIconSize: h2,
      } = e3,
      g2 = { height: n2, lineHeight: X(n2), listStylePosition: "inside", listStyleType: "disc" };
    return [
      {
        [t2]: { "&-inline, &-vertical": { [`&${t2}-root`]: { boxShadow: "none" }, ...fi(e3) } },
        [`${t2}-submenu-popup`]: { [`${t2}-vertical`]: { ...fi(e3), boxShadow: m2 } },
      },
      {
        [`${t2}-submenu-popup ${t2}-vertical${t2}-sub`]: {
          minWidth: l2,
          maxHeight: `calc(100vh - ${X(e3.calc(a2).mul(2.5).equal())})`,
          padding: "0",
          overflow: "hidden",
          borderInlineEnd: 0,
          "&:not([class*='-active'])": { overflowX: "hidden", overflowY: "auto" },
        },
      },
      {
        [`${t2}-inline`]: {
          width: "100%",
          [`&${t2}-root`]: {
            [`${t2}-item, ${t2}-submenu-title`]: {
              display: "flex",
              alignItems: "center",
              transition: [`border-color ${u2}`, `background-color ${u2}`].join(","),
              [`> ${t2}-title-content`]: {
                flex: "auto",
                minWidth: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
              },
              "> *": { flex: "none" },
            },
          },
          [`${t2}-sub${t2}-inline`]: {
            padding: 0,
            border: 0,
            borderRadius: 0,
            boxShadow: "none",
            [`& > ${t2}-submenu > ${t2}-submenu-title`]: g2,
            [`& ${t2}-item-group-title`]: { paddingInlineStart: s2 },
          },
          [`${t2}-item`]: g2,
        },
      },
      {
        [`${t2}-inline-collapsed`]: {
          width: f2,
          [`&${t2}-root`]: {
            [`${t2}-item, ${t2}-submenu ${t2}-submenu-title`]: {
              transition: ["border-color", "background-color"].map((e4) => `${e4} ${u2}`).join(","),
              [`> ${t2}-inline-collapsed-noicon`]: {
                fontSize: d2,
                textAlign: "center",
                width: "100%",
              },
            },
          },
          [`> ${t2}-item,
          > ${t2}-item-group > ${t2}-item-group-list > ${t2}-item,
          > ${t2}-item-group > ${t2}-item-group-list > ${t2}-submenu > ${t2}-submenu-title,
          > ${t2}-submenu > ${t2}-submenu-title`]: {
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            insetInlineStart: 0,
            paddingInline: `calc(50% - ${X(e3.calc(h2).div(2).equal())} - ${X(c2)})`,
            textOverflow: "clip",
            [`
            ${t2}-submenu-arrow,
            ${t2}-submenu-expand-icon
          `]: { opacity: 0 },
            [`> ${t2}-title-content`]: { width: 0, opacity: 0, overflow: "hidden" },
            [`${t2}-item-icon, ${o2}`]: {
              margin: 0,
              fontSize: h2,
              lineHeight: X(n2),
              "+ span": {
                display: "inline-block",
                width: 0,
                opacity: 0,
                overflow: "hidden",
                marginInlineStart: 0,
              },
            },
          },
          [`${t2}-item-icon, ${o2}`]: { display: "inline-block" },
          "&-tooltip": {
            pointerEvents: "none",
            [`${t2}-item-icon, ${o2}`]: { display: "none" },
            [`${t2}-item-extra`]: { paddingInlineStart: i2 },
            "a, a:hover": { color: r2 },
          },
          [`${t2}-item-group-title`]: { ...He, paddingInline: p2 },
        },
      },
    ];
  },
  gi = (e3) => {
    const {
      componentCls: t2,
      motionDurationSlow: o2,
      motionDurationMid: n2,
      motionEaseInOut: r2,
      motionEaseOut: l2,
      iconCls: a2,
      iconSize: i2,
      iconMarginInlineEnd: s2,
    } = e3;
    return {
      [`${t2}-item, ${t2}-submenu-title`]: {
        position: "relative",
        display: "block",
        margin: 0,
        whiteSpace: "nowrap",
        cursor: "pointer",
        transition: [
          `border-color ${o2}`,
          `background-color ${o2}`,
          `padding calc(${o2} + 0.1s) ${r2}`,
        ].join(","),
        [`${t2}-item-icon, ${a2}`]: {
          minWidth: i2,
          fontSize: i2,
          transition: [`font-size ${n2} ${l2}`, `margin ${o2} ${r2}`, `color ${o2}`].join(","),
          "+ span": {
            marginInlineStart: s2,
            opacity: 1,
            transition: [`opacity ${o2} ${r2}`, `margin ${o2}`, `color ${o2}`].join(","),
          },
        },
        [`${t2}-item-icon`]: { ...Z() },
        [`&${t2}-item-only-child`]: { [`> ${a2}, > ${t2}-item-icon`]: { marginInlineEnd: 0 } },
      },
      [`${t2}-item-disabled, ${t2}-submenu-disabled`]: {
        background: "none !important",
        cursor: "not-allowed",
        "&::after": { borderColor: "transparent !important" },
        a: { color: "inherit !important", cursor: "not-allowed", pointerEvents: "none" },
        [`> ${t2}-submenu-title`]: { color: "inherit !important", cursor: "not-allowed" },
      },
    };
  },
  bi = (e3) => {
    const {
      componentCls: t2,
      motionDurationSlow: o2,
      motionEaseInOut: n2,
      borderRadius: r2,
      menuArrowSize: l2,
      menuArrowOffset: a2,
    } = e3;
    return {
      [`${t2}-submenu`]: {
        "&-expand-icon, &-arrow": {
          position: "absolute",
          top: "50%",
          insetInlineEnd: e3.margin,
          width: l2,
          color: "currentcolor",
          transform: "translateY(-50%)",
          transition: ["transform", "opacity"].map((e4) => `${e4} ${o2}`).join(","),
        },
        "&-arrow": {
          "&::before, &::after": {
            position: "absolute",
            width: e3.calc(l2).mul(0.6).equal(),
            height: e3.calc(l2).mul(0.15).equal(),
            backgroundColor: "currentcolor",
            borderRadius: r2,
            transition: ["background-color", "transform", "top", "color"]
              .map((e4) => `${e4} ${o2} ${n2}`)
              .join(","),
            content: '""',
          },
          "&::before": { transform: `rotate(45deg) translateY(${X(e3.calc(a2).mul(-1).equal())})` },
          "&::after": { transform: `rotate(-45deg) translateY(${X(a2)})` },
        },
      },
    };
  },
  vi = (e3) => {
    const {
        antCls: t2,
        componentCls: o2,
        fontSize: n2,
        motionDurationSlow: r2,
        motionDurationMid: l2,
        motionEaseInOut: a2,
        paddingXS: i2,
        padding: s2,
        colorSplit: c2,
        lineWidth: d2,
        zIndexPopup: u2,
        borderRadiusLG: p2,
        subMenuItemBorderRadius: m2,
        menuArrowSize: f2,
        menuArrowOffset: h2,
        lineType: g2,
        groupTitleLineHeight: b2,
        groupTitleFontSize: v2,
        iconSize: y2,
        iconMarginInlineEnd: $2,
      } = e3,
      x2 = [
        `> ${t2}-typography-ellipsis-single-line`,
        `> ${o2}-item-label > ${t2}-typography-ellipsis-single-line`,
      ].join(",");
    return [
      {
        "": { [o2]: { ...Ee(), "&-hidden": { display: "none" } } },
        [`${o2}-submenu-hidden`]: { display: "none" },
      },
      {
        [o2]: {
          ...ve(e3),
          ...Ee(),
          marginBottom: 0,
          paddingInlineStart: 0,
          fontSize: n2,
          lineHeight: 0,
          listStyle: "none",
          outline: "none",
          transition: `width ${r2} cubic-bezier(0.2, 0, 0, 1) 0s`,
          "ul, ol": { margin: 0, padding: 0, listStyle: "none" },
          "&-overflow": { display: "flex", [`${o2}-item`]: { flex: "none" } },
          [`${o2}-item, ${o2}-submenu, ${o2}-submenu-title`]: { borderRadius: e3.itemBorderRadius },
          [`${o2}-item-group-title`]: {
            padding: `${X(i2)} ${X(s2)}`,
            fontSize: v2,
            lineHeight: b2,
            transition: `all ${r2}`,
          },
          [`&-horizontal ${o2}-submenu`]: {
            transition: ["border-color", "background-color"]
              .map((e4) => `${e4} ${r2} ${a2}`)
              .join(","),
          },
          [`${o2}-submenu, ${o2}-submenu-inline`]: {
            transition: [`border-color ${r2}`, `background-color ${r2}`, `padding ${l2}`]
              .map((e4) => `${e4} ${a2}`)
              .join(","),
          },
          [`${o2}-submenu ${o2}-sub`]: {
            cursor: "initial",
            transition: ["background-color", "padding"].map((e4) => `${e4} ${r2} ${a2}`).join(","),
          },
          [`${o2}-title-content`]: {
            transition: `color ${r2}`,
            "&-with-extra": {
              display: "inline-flex",
              alignItems: "center",
              width: "100%",
              minWidth: 0,
            },
            [`${o2}-item-label`]: { flex: "auto", minWidth: 0, ...He },
            [x2]: { display: "inline", verticalAlign: "unset" },
            [`${o2}-item-extra`]: {
              flex: "none",
              marginInlineStart: "auto",
              paddingInlineStart: e3.padding,
            },
          },
          [`${o2}-item-icon + ${o2}-title-content-with-extra`]: {
            width: `calc(100% - ${X(
              e3
                .calc(y2)
                .add($2 ?? 0)
                .equal(),
            )})`,
          },
          [`${o2}-item a`]: {
            "&::before": {
              position: "absolute",
              inset: 0,
              backgroundColor: "transparent",
              content: '""',
            },
          },
          [`${o2}-item-divider`]: {
            overflow: "hidden",
            lineHeight: 0,
            borderColor: c2,
            borderStyle: g2,
            borderWidth: 0,
            borderTopWidth: d2,
            marginBlock: d2,
            padding: 0,
            "&-dashed": { borderStyle: "dashed" },
          },
          ...gi(e3),
          [`${o2}-item-group`]: {
            [`${o2}-item-group-list`]: {
              margin: 0,
              padding: 0,
              [`${o2}-item, ${o2}-submenu-title`]: {
                paddingInline: `${X(e3.calc(n2).mul(2).equal())} ${X(s2)}`,
              },
            },
          },
          "&-submenu": {
            "&-popup": {
              position: "absolute",
              zIndex: u2,
              borderRadius: p2,
              boxShadow: "none",
              transformOrigin: "0 0",
              [`&${o2}-submenu`]: { background: "transparent" },
              "&::before": {
                position: "absolute",
                inset: 0,
                zIndex: -1,
                width: "100%",
                height: "100%",
                opacity: 0,
                content: '""',
              },
              [`> ${o2}`]: {
                borderRadius: p2,
                ...gi(e3),
                ...bi(e3),
                [`${o2}-item, ${o2}-submenu > ${o2}-submenu-title`]: { borderRadius: m2 },
                [`${o2}-submenu-title::after`]: { transition: `transform ${r2} ${a2}` },
              },
            },
            "&-placement-leftTop, &-placement-bottomRight": { transformOrigin: "100% 0" },
            "&-placement-leftBottom, &-placement-topRight": { transformOrigin: "100% 100%" },
            "&-placement-rightBottom, &-placement-topLeft": { transformOrigin: "0 100%" },
            "&-placement-bottomLeft, &-placement-rightTop": { transformOrigin: "0 0" },
            "&-placement-leftTop, &-placement-leftBottom": { paddingInlineEnd: e3.paddingXS },
            "&-placement-rightTop, &-placement-rightBottom": { paddingInlineStart: e3.paddingXS },
            "&-placement-topRight, &-placement-topLeft": { paddingBottom: e3.paddingXS },
            "&-placement-bottomRight, &-placement-bottomLeft": { paddingTop: e3.paddingXS },
          },
          ...bi(e3),
          [`&-inline-collapsed ${o2}-submenu-arrow,
        &-inline ${o2}-submenu-arrow`]: {
            "&::before": { transform: `rotate(-45deg) translateX(${X(h2)})` },
            "&::after": {
              transform: `rotate(45deg) translateX(${X(e3.calc(h2).mul(-1).equal())})`,
            },
          },
          [`${o2}-submenu-open${o2}-submenu-inline > ${o2}-submenu-title > ${o2}-submenu-arrow`]: {
            transform: `translateY(${X(e3.calc(f2).mul(0.2).mul(-1).equal())})`,
            "&::after": {
              transform: `rotate(-45deg) translateX(${X(e3.calc(h2).mul(-1).equal())})`,
            },
            "&::before": { transform: `rotate(45deg) translateX(${X(h2)})` },
          },
        },
      },
      { [`${t2}-layout-header`]: { [o2]: { lineHeight: "inherit" } } },
    ];
  },
  yi = (e3) => {
    const {
        colorPrimary: t2,
        colorError: o2,
        colorTextDisabled: n2,
        colorErrorBg: r2,
        colorText: l2,
        colorTextDescription: a2,
        colorBgContainer: i2,
        colorFillAlter: s2,
        colorFillContent: c2,
        lineWidth: d2,
        lineWidthBold: u2,
        controlItemBgActive: p2,
        colorBgTextHover: m2,
        controlHeightLG: f2,
        lineHeight: h2,
        colorBgElevated: g2,
        marginXXS: b2,
        padding: v2,
        fontSize: y2,
        controlHeightSM: $2,
        fontSizeLG: x2,
        colorTextLightSolid: C2,
        colorErrorHover: w2,
      } = e3,
      S2 = e3.activeBarWidth ?? 0,
      E2 = e3.activeBarBorderWidth ?? d2,
      k2 = e3.itemMarginInline ?? e3.marginXXS,
      N2 = new W(C2).setA(0.65).toRgbString();
    return {
      dropdownWidth: 160,
      zIndexPopup: e3.zIndexPopupBase + 50,
      radiusItem: e3.borderRadiusLG,
      itemBorderRadius: e3.borderRadiusLG,
      radiusSubMenuItem: e3.borderRadiusSM,
      subMenuItemBorderRadius: e3.borderRadiusSM,
      colorItemText: l2,
      itemColor: l2,
      colorItemTextHover: l2,
      itemHoverColor: l2,
      colorItemTextHoverHorizontal: t2,
      horizontalItemHoverColor: t2,
      colorGroupTitle: a2,
      groupTitleColor: a2,
      colorItemTextSelected: t2,
      itemSelectedColor: t2,
      subMenuItemSelectedColor: t2,
      colorItemTextSelectedHorizontal: t2,
      horizontalItemSelectedColor: t2,
      colorItemBg: i2,
      itemBg: i2,
      colorItemBgHover: m2,
      itemHoverBg: m2,
      colorItemBgActive: c2,
      itemActiveBg: p2,
      colorSubItemBg: s2,
      subMenuItemBg: s2,
      colorItemBgSelected: p2,
      itemSelectedBg: p2,
      colorItemBgSelectedHorizontal: "transparent",
      horizontalItemSelectedBg: "transparent",
      colorActiveBarWidth: 0,
      activeBarWidth: S2,
      colorActiveBarHeight: u2,
      activeBarHeight: u2,
      colorActiveBarBorderSize: d2,
      activeBarBorderWidth: E2,
      colorItemTextDisabled: n2,
      itemDisabledColor: n2,
      colorDangerItemText: o2,
      dangerItemColor: o2,
      colorDangerItemTextHover: o2,
      dangerItemHoverColor: o2,
      colorDangerItemTextSelected: o2,
      dangerItemSelectedColor: o2,
      colorDangerItemBgActive: r2,
      dangerItemActiveBg: r2,
      colorDangerItemBgSelected: r2,
      dangerItemSelectedBg: r2,
      itemMarginInline: k2,
      horizontalItemBorderRadius: 0,
      horizontalItemHoverBg: "transparent",
      itemHeight: f2,
      groupTitleLineHeight: h2,
      collapsedWidth: 2 * f2,
      popupBg: g2,
      itemMarginBlock: b2,
      itemPaddingInline: v2,
      horizontalLineHeight: 1.15 * f2 + "px",
      iconSize: y2,
      iconMarginInlineEnd: $2 - y2,
      collapsedIconSize: x2,
      groupTitleFontSize: y2,
      darkItemDisabledColor: new W(C2).setA(0.25).toRgbString(),
      darkItemColor: N2,
      darkDangerItemColor: o2,
      darkItemBg: "#001529",
      darkPopupBg: "#001529",
      darkSubMenuItemBg: "#000c17",
      darkItemSelectedColor: C2,
      darkItemSelectedBg: t2,
      darkDangerItemSelectedBg: o2,
      darkItemHoverBg: "transparent",
      darkGroupTitleColor: N2,
      darkItemHoverColor: C2,
      darkDangerItemHoverColor: w2,
      darkDangerItemSelectedColor: C2,
      darkDangerItemActiveBg: o2,
      itemWidth: S2 ? `calc(100% + ${E2}px)` : `calc(100% - ${2 * k2}px)`,
    };
  },
  $i = (e3) => {
    var t2, o2, n2, r2, l2, a2;
    const { popupClassName: i2, icon: s2, title: c2, theme: d2 } = e3,
      u2 = Nt.useContext(li),
      { prefixCls: p2, inlineCollapsed: m2, theme: f2, classNames: h2, styles: g2 } = u2,
      b2 = Ql();
    let v2;
    if (s2) {
      const e4 = Nt.isValidElement(c2) && c2.type === "span";
      v2 = Nt.createElement(
        Nt.Fragment,
        null,
        D(s2, (e5) => ({
          className: P(e5.className, `${p2}-item-icon`, h2?.itemIcon),
          style: { ...e5.style, ...g2?.itemIcon },
        })),
        e4 ? c2 : Nt.createElement("span", { className: `${p2}-title-content` }, c2),
      );
    } else
      v2 =
        m2 && !b2.length && c2 && typeof c2 == "string"
          ? Nt.createElement("div", { className: `${p2}-inline-collapsed-noicon` }, c2.charAt(0))
          : Nt.createElement("span", { className: `${p2}-title-content` }, c2);
    const y2 = Nt.useMemo(() => ({ ...u2, firstLevel: !1 }), [u2]),
      [$2] = xe("Menu");
    return Nt.createElement(
      li.Provider,
      { value: y2 },
      Nt.createElement(Wa, {
        ...se(e3, ["icon"]),
        title: v2,
        classNames: {
          list: (t2 = h2?.subMenu) == null ? void 0 : t2.list,
          listTitle: (o2 = h2?.subMenu) == null ? void 0 : o2.itemTitle,
        },
        styles: {
          list: (n2 = g2?.subMenu) == null ? void 0 : n2.list,
          listTitle: (r2 = g2?.subMenu) == null ? void 0 : r2.itemTitle,
        },
        popupClassName: P(p2, i2, (l2 = h2?.popup) == null ? void 0 : l2.root, `${p2}-${d2 || f2}`),
        popupStyle: {
          zIndex: $2,
          ...e3.popupStyle,
          ...((a2 = g2?.popup) == null ? void 0 : a2.root),
        },
      }),
    );
  };
function xi(e3) {
  return e3 === null || e3 === !1;
}
const Ci = { item: ii, submenu: $i, divider: ai },
  wi = Nt.forwardRef((e3, t2) => {
    var o2;
    const r2 = Nt.useContext(si),
      l2 = r2 || {},
      {
        prefixCls: a2,
        className: i2,
        style: s2,
        theme: c2 = "light",
        expandIcon: d2,
        _internalDisableMenuItemTitleTooltip: u2,
        tooltip: p2,
        inlineCollapsed: m2,
        siderCollapsed: f2,
        rootClassName: g2,
        mode: b2,
        selectable: v2,
        onClick: y2,
        overflowedIndicatorPopupClassName: $2,
        classNames: x2,
        styles: C2,
        ...w2
      } = e3,
      { menu: S2 } = Nt.useContext(B),
      {
        getPrefixCls: E2,
        getPopupContainer: k2,
        direction: N2,
        className: I2,
        style: R2,
        classNames: T2,
        styles: M2,
      } = oe("menu"),
      A2 = E2(),
      L2 = se(w2, ["collapsedWidth"]);
    (o2 = l2.validator) == null || o2.call(l2, { mode: b2 });
    const O2 = n((...e4) => {
        var t3;
        y2?.(...e4), (t3 = l2.onClick) == null || t3.call(l2);
      }),
      z2 = l2.mode || b2,
      H2 = v2 ?? l2.selectable,
      j2 = m2 ?? f2,
      _2 = { ...e3, mode: z2, inlineCollapsed: j2, selectable: H2, theme: c2 },
      K2 = ce(R2),
      W2 = ce(s2),
      [F2, G2] = de(
        [T2, x2],
        [M2, K2, C2, W2],
        { props: _2 },
        { popup: { _default: "root" }, subMenu: { _default: "item" } },
      ),
      V2 = {
        horizontal: { motionName: `${A2}-slide-up` },
        inline: _e(A2),
        other: { motionName: `${A2}-zoom-big` },
      },
      X2 = E2("menu", a2 || l2.prefixCls),
      U2 = $e(X2),
      [Z2, J2] = ((e4, t3 = e4, o3 = !0) =>
        Y(
          "Menu",
          (e5) => {
            const {
                colorBgElevated: t4,
                controlHeightLG: o4,
                fontSize: n2,
                darkItemColor: r3,
                darkDangerItemColor: l3,
                darkItemBg: a3,
                darkSubMenuItemBg: i3,
                darkItemSelectedColor: s3,
                darkItemSelectedBg: c3,
                darkDangerItemSelectedBg: d3,
                darkItemHoverBg: u3,
                darkGroupTitleColor: p3,
                darkItemHoverColor: m3,
                darkItemDisabledColor: f3,
                darkDangerItemHoverColor: h2,
                darkDangerItemSelectedColor: g3,
                darkDangerItemActiveBg: b3,
                popupBg: v3,
                darkPopupBg: y3,
              } = e5,
              $3 = e5.calc(n2).div(7).mul(5).equal(),
              x3 = q(e5, {
                menuArrowSize: $3,
                menuHorizontalHeight: e5.calc(o4).mul(1.15).equal(),
                menuArrowOffset: e5.calc($3).mul(0.25).equal(),
                menuSubMenuBg: t4,
                calc: e5.calc,
                popupBg: v3,
              }),
              C3 = q(x3, {
                itemColor: r3,
                itemHoverColor: m3,
                groupTitleColor: p3,
                itemSelectedColor: s3,
                subMenuItemSelectedColor: s3,
                itemBg: a3,
                popupBg: y3,
                subMenuItemBg: i3,
                itemActiveBg: "transparent",
                itemSelectedBg: c3,
                activeBarHeight: 0,
                activeBarBorderWidth: 0,
                itemHoverBg: u3,
                itemDisabledColor: f3,
                dangerItemColor: l3,
                dangerItemHoverColor: h2,
                dangerItemSelectedColor: g3,
                dangerItemActiveBg: b3,
                dangerItemSelectedBg: d3,
                menuSubMenuBg: i3,
                horizontalItemSelectedColor: s3,
                horizontalItemSelectedBg: c3,
              });
            return [
              vi(x3),
              di(x3),
              hi(x3),
              mi(x3, "light"),
              mi(C3, "dark"),
              ui(x3),
              Do(x3),
              je(x3, "slide-up"),
              je(x3, "slide-down"),
              Xo(x3, "zoom-big"),
            ];
          },
          yi,
          {
            deprecatedTokens: [
              ["colorGroupTitle", "groupTitleColor"],
              ["radiusItem", "itemBorderRadius"],
              ["radiusSubMenuItem", "subMenuItemBorderRadius"],
              ["colorItemText", "itemColor"],
              ["colorItemTextHover", "itemHoverColor"],
              ["colorItemTextHoverHorizontal", "horizontalItemHoverColor"],
              ["colorItemTextSelected", "itemSelectedColor"],
              ["colorItemTextSelectedHorizontal", "horizontalItemSelectedColor"],
              ["colorItemTextDisabled", "itemDisabledColor"],
              ["colorDangerItemText", "dangerItemColor"],
              ["colorDangerItemTextHover", "dangerItemHoverColor"],
              ["colorDangerItemTextSelected", "dangerItemSelectedColor"],
              ["colorDangerItemBgActive", "dangerItemActiveBg"],
              ["colorDangerItemBgSelected", "dangerItemSelectedBg"],
              ["colorItemBg", "itemBg"],
              ["colorItemBgHover", "itemHoverBg"],
              ["colorSubItemBg", "subMenuItemBg"],
              ["colorItemBgActive", "itemActiveBg"],
              ["colorItemBgSelectedHorizontal", "horizontalItemSelectedBg"],
              ["colorActiveBarWidth", "activeBarWidth"],
              ["colorActiveBarHeight", "activeBarHeight"],
              ["colorActiveBarBorderSize", "activeBarBorderWidth"],
              ["colorItemBgSelected", "itemSelectedBg"],
            ],
            injectStyle: o3,
            unitless: { groupTitleLineHeight: !0 },
          },
        )(e4, t3))(X2, U2, !r2),
      Q2 = P(`${X2}-${c2}`, I2, i2),
      ee2 = Nt.useMemo(() => {
        var e4;
        if (h(d2) || xi(d2)) return d2 || null;
        if (h(l2.expandIcon) || xi(l2.expandIcon)) return l2.expandIcon || null;
        if (h(S2?.expandIcon) || xi(S2?.expandIcon)) return S2?.expandIcon || null;
        const t3 = d2 ?? l2?.expandIcon ?? S2?.expandIcon;
        return D(t3, {
          className: P(
            `${X2}-submenu-expand-icon`,
            Nt.isValidElement(t3) ? ((e4 = t3.props) == null ? void 0 : e4.className) : void 0,
          ),
        });
      }, [d2, l2?.expandIcon, S2?.expandIcon, X2]),
      te2 = Nt.useMemo(
        () => ({
          prefixCls: X2,
          inlineCollapsed: j2 || !1,
          direction: N2,
          firstLevel: !0,
          theme: c2,
          mode: z2,
          disableMenuItemTitleTooltip: u2,
          tooltip: p2,
          classNames: F2,
          styles: G2,
        }),
        [X2, j2, N2, u2, c2, z2, F2, G2, p2],
      );
    return Nt.createElement(
      si.Provider,
      { value: null },
      Nt.createElement(
        li.Provider,
        { value: te2 },
        Nt.createElement(Qa, {
          getPopupContainer: k2,
          overflowedIndicator: Nt.createElement(ri, null),
          overflowedIndicatorPopupClassName: P(X2, `${X2}-${c2}`, $2),
          classNames: { list: F2.list, listTitle: F2.itemTitle },
          styles: { list: G2.list, listTitle: G2.itemTitle },
          mode: z2,
          selectable: H2,
          onClick: O2,
          ...L2,
          inlineCollapsed: j2,
          style: G2.root,
          className: Q2,
          prefixCls: X2,
          direction: N2,
          defaultMotions: V2,
          expandIcon: ee2,
          ref: t2,
          rootClassName: P(g2, Z2, l2.rootClassName, J2, U2, F2.root),
          _internalComponents: Ci,
        }),
      ),
    );
  }),
  Si = Nt.forwardRef((e3, t2) => {
    const o2 = Nt.useRef(null),
      n2 = Nt.useContext(ei);
    return (
      Nt.useImperativeHandle(t2, () => ({
        menu: o2.current,
        focus: (e4) => {
          var t3;
          (t3 = o2.current) == null || t3.focus(e4);
        },
      })),
      Nt.createElement(wi, { ref: o2, ...e3, ...n2 })
    );
  });
(Si.Item = ii), (Si.SubMenu = $i), (Si.Divider = ai), (Si.ItemGroup = Va);
const Ei = Si,
  ki = (e3) => {
    const { componentCls: t2, menuCls: o2, colorError: n2, colorTextLightSolid: r2 } = e3,
      l2 = `${o2}-item`;
    return {
      [`${t2}, ${t2}-menu-submenu`]: {
        [`${o2} ${l2}`]: {
          [`&${l2}-danger:not(${l2}-disabled)`]: {
            color: n2,
            "&:hover": { color: r2, backgroundColor: n2 },
          },
        },
      },
    };
  },
  Ni = (e3) => {
    const {
      componentCls: t2,
      menuCls: o2,
      zIndexPopup: n2,
      dropdownArrowDistance: r2,
      sizePopupArrow: l2,
      antCls: a2,
      iconCls: i2,
      motionDurationMid: s2,
      paddingBlock: c2,
      fontSize: d2,
      dropdownEdgeChildPadding: u2,
      colorTextDisabled: p2,
      fontSizeIcon: m2,
      controlPaddingHorizontal: f2,
      colorBgElevated: h2,
      controlHeightLG: g2,
    } = e3;
    return [
      {
        [t2]: {
          position: "absolute",
          top: -9999,
          left: { _skip_check_: !0, value: -9999 },
          zIndex: n2,
          display: "block",
          "&::before": {
            position: "absolute",
            insetBlock: e3.calc(l2).div(2).sub(r2).equal(),
            zIndex: -9999,
            opacity: 1e-4,
            content: '""',
          },
          "&-menu-vertical": {
            maxHeight: `calc(100vh - ${X(e3.calc(g2).mul(2.5).equal())})`,
            overflowY: "auto",
          },
          [`&-trigger${a2}-btn`]: {
            [`& > ${i2}-down, & > ${a2}-btn-icon > ${i2}-down`]: { fontSize: m2 },
          },
          [`${t2}-wrap`]: {
            position: "relative",
            [`${a2}-btn > ${i2}-down`]: { fontSize: m2 },
            [`${i2}-down::before`]: { transition: `transform ${s2}` },
          },
          [`${t2}-wrap-open`]: { [`${i2}-down::before`]: { transform: "rotate(180deg)" } },
          "&-hidden, &-menu-hidden, &-menu-submenu-hidden": { display: "none" },
          [`&${a2}-slide-down-enter${a2}-slide-down-enter-active${t2}-placement-bottomLeft,
          &${a2}-slide-down-appear${a2}-slide-down-appear-active${t2}-placement-bottomLeft,
          &${a2}-slide-down-enter${a2}-slide-down-enter-active${t2}-placement-bottom,
          &${a2}-slide-down-appear${a2}-slide-down-appear-active${t2}-placement-bottom,
          &${a2}-slide-down-enter${a2}-slide-down-enter-active${t2}-placement-bottomRight,
          &${a2}-slide-down-appear${a2}-slide-down-appear-active${t2}-placement-bottomRight`]: {
            animationName: Ke,
          },
          [`&${a2}-slide-up-enter${a2}-slide-up-enter-active${t2}-placement-topLeft,
          &${a2}-slide-up-appear${a2}-slide-up-appear-active${t2}-placement-topLeft,
          &${a2}-slide-up-enter${a2}-slide-up-enter-active${t2}-placement-top,
          &${a2}-slide-up-appear${a2}-slide-up-appear-active${t2}-placement-top,
          &${a2}-slide-up-enter${a2}-slide-up-enter-active${t2}-placement-topRight,
          &${a2}-slide-up-appear${a2}-slide-up-appear-active${t2}-placement-topRight`]: {
            animationName: We,
          },
          [`&${a2}-slide-down-leave${a2}-slide-down-leave-active${t2}-placement-bottomLeft,
          &${a2}-slide-down-leave${a2}-slide-down-leave-active${t2}-placement-bottom,
          &${a2}-slide-down-leave${a2}-slide-down-leave-active${t2}-placement-bottomRight`]: {
            animationName: Fe,
          },
          [`&${a2}-slide-up-leave${a2}-slide-up-leave-active${t2}-placement-topLeft,
          &${a2}-slide-up-leave${a2}-slide-up-leave-active${t2}-placement-top,
          &${a2}-slide-up-leave${a2}-slide-up-leave-active${t2}-placement-topRight`]: {
            animationName: Ge,
          },
          [`&${a2}-slide-right-enter${a2}-slide-right-enter-active${t2}-placement-right,
          &${a2}-slide-right-appear${a2}-slide-right-appear-active${t2}-placement-right,
          &${a2}-slide-right-enter${a2}-slide-right-enter-active${t2}-placement-rightTop,
          &${a2}-slide-right-appear${a2}-slide-right-appear-active${t2}-placement-rightTop,
          &${a2}-slide-right-enter${a2}-slide-right-enter-active${t2}-placement-rightBottom,
          &${a2}-slide-right-appear${a2}-slide-right-appear-active${t2}-placement-rightBottom`]: {
            animationName: qe,
          },
          [`&${a2}-slide-left-enter${a2}-slide-left-enter-active${t2}-placement-left,
          &${a2}-slide-left-appear${a2}-slide-left-appear-active${t2}-placement-left,
          &${a2}-slide-left-enter${a2}-slide-left-enter-active${t2}-placement-leftTop,
          &${a2}-slide-left-appear${a2}-slide-left-appear-active${t2}-placement-leftTop,
          &${a2}-slide-left-enter${a2}-slide-left-enter-active${t2}-placement-leftBottom,
          &${a2}-slide-left-appear${a2}-slide-left-appear-active${t2}-placement-leftBottom`]: {
            animationName: Ve,
          },
          [`&${a2}-slide-right-leave${a2}-slide-right-leave-active${t2}-placement-right,
          &${a2}-slide-right-leave${a2}-slide-right-leave-active${t2}-placement-rightTop,
          &${a2}-slide-right-leave${a2}-slide-right-leave-active${t2}-placement-rightBottom`]: {
            animationName: Xe,
          },
          [`&${a2}-slide-left-leave${a2}-slide-left-leave-active${t2}-placement-left,
          &${a2}-slide-left-leave${a2}-slide-left-leave-active${t2}-placement-leftTop,
          &${a2}-slide-left-leave${a2}-slide-left-leave-active${t2}-placement-leftBottom`]: {
            animationName: Ue,
          },
        },
      },
      gl(e3, h2),
      {
        [`${t2} ${o2}`]: { position: "relative", margin: 0 },
        [`${o2}-submenu-popup`]: {
          position: "absolute",
          zIndex: n2,
          background: "transparent",
          boxShadow: "none",
          transformOrigin: "0 0",
          "ul, li": { listStyle: "none", margin: 0 },
        },
        [`${t2}, ${t2}-menu-submenu`]: {
          ...ve(e3),
          [o2]: {
            padding: u2,
            listStyleType: "none",
            backgroundColor: h2,
            backgroundClip: "padding-box",
            borderRadius: e3.borderRadiusLG,
            outline: "none",
            boxShadow: e3.boxShadowSecondary,
            ...J(e3),
            "&:empty": { padding: 0, boxShadow: "none" },
            [`${o2}-item-group-title`]: {
              padding: `${X(c2)} ${X(f2)}`,
              color: e3.colorTextDescription,
              transition: `all ${s2}`,
            },
            [`${o2}-item`]: { position: "relative", display: "flex", alignItems: "center" },
            [`${o2}-item-icon`]: {
              minWidth: d2,
              marginInlineEnd: e3.marginXS,
              fontSize: e3.fontSizeSM,
            },
            [`${o2}-title-content`]: {
              flex: "auto",
              "&-with-extra": { display: "inline-flex", alignItems: "center", width: "100%" },
              [`> a, > ${o2}-item-label > a`]: {
                color: "inherit",
                transition: `all ${s2}`,
                "&:hover": { color: "inherit" },
                "&::after": { position: "absolute", inset: 0, content: '""' },
              },
              [`${o2}-item-extra`]: {
                paddingInlineStart: e3.padding,
                marginInlineStart: "auto",
                fontSize: e3.fontSizeSM,
                color: e3.colorTextDescription,
              },
            },
            [`${o2}-item, ${o2}-submenu-title`]: {
              display: "flex",
              margin: 0,
              padding: `${X(c2)} ${X(f2)}`,
              color: e3.colorText,
              fontWeight: 400,
              fontSize: d2,
              lineHeight: e3.lineHeight,
              cursor: "pointer",
              transition: `all ${s2}`,
              borderRadius: e3.borderRadiusSM,
              "&:hover, &-active": { backgroundColor: e3.controlItemBgHover },
              ...J(e3),
              "&-selected": {
                color: e3.colorPrimary,
                backgroundColor: e3.controlItemBgActive,
                "&:hover, &-active": { backgroundColor: e3.controlItemBgActiveHover },
              },
              "&-disabled": {
                color: p2,
                cursor: "not-allowed",
                "&:hover": { color: p2, backgroundColor: h2, cursor: "not-allowed" },
                a: { pointerEvents: "none" },
              },
              "&-divider": {
                height: 1,
                margin: `${X(e3.marginXXS)} 0`,
                overflow: "hidden",
                lineHeight: 0,
                backgroundColor: e3.colorSplit,
              },
              [`${t2}-menu-submenu-expand-icon`]: {
                position: "absolute",
                insetInlineEnd: e3.paddingXS,
                [`${t2}-menu-submenu-arrow-icon`]: {
                  marginInlineEnd: "0 !important",
                  color: e3.colorIcon,
                  fontSize: m2,
                  fontStyle: "normal",
                },
              },
            },
            [`${o2}-item-group-list`]: {
              margin: `0 ${X(e3.marginXS)}`,
              padding: 0,
              listStyle: "none",
            },
            [`${o2}-submenu-title`]: { paddingInlineEnd: e3.calc(f2).add(e3.fontSizeSM).equal() },
            [`${o2}-submenu-vertical`]: { position: "relative" },
            [`${o2}-submenu${o2}-submenu-disabled ${t2}-menu-submenu-title`]: {
              [`&, ${t2}-menu-submenu-arrow-icon`]: {
                color: p2,
                backgroundColor: h2,
                cursor: "not-allowed",
              },
            },
            [`${o2}-submenu-selected ${t2}-menu-submenu-title`]: { color: e3.colorPrimary },
          },
        },
      },
      [
        je(e3, "slide-up"),
        je(e3, "slide-down"),
        je(e3, "slide-left"),
        je(e3, "slide-right"),
        Ye(e3, "move-up"),
        Ye(e3, "move-down"),
        Xo(e3, "zoom-big"),
      ],
    ];
  },
  Ii = Y(
    "Dropdown",
    (e3) => {
      const { marginXXS: t2, sizePopupArrow: o2, paddingXXS: n2, componentCls: r2 } = e3,
        l2 = q(e3, {
          menuCls: `${r2}-menu`,
          dropdownArrowDistance: e3.calc(o2).div(2).add(t2).equal(),
          dropdownEdgeChildPadding: n2,
        });
      return [Ni(l2), ki(l2)];
    },
    (e3) => ({
      zIndexPopup: e3.zIndexPopupBase + 50,
      paddingBlock: (e3.controlHeight - e3.fontSize * e3.lineHeight) / 2,
      ...hl({ contentRadius: e3.borderRadiusLG, limitVerticalRadius: !0 }),
      ...ml(e3),
    }),
    { resetStyle: !1 },
  ),
  Bi = Nt.forwardRef((e3, t2) => {
    const {
        menu: o2,
        arrow: r2,
        prefixCls: l2,
        children: a2,
        trigger: i2,
        disabled: s2,
        dropdownRender: c2,
        popupRender: d2,
        getPopupContainer: u2,
        overlayClassName: p2,
        rootClassName: m2,
        overlayStyle: f2,
        open: h2,
        onOpenChange: g2,
        mouseEnterDelay: b2 = 0.15,
        mouseLeaveDelay: y2 = 0.1,
        autoAdjustOverflow: $2 = !0,
        placement: x2 = "",
        transitionName: C2,
        classNames: w2,
        styles: S2,
        destroyPopupOnHide: E2,
        destroyOnHidden: k2,
      } = e3,
      {
        getPrefixCls: N2,
        direction: B2,
        getPopupContainer: R2,
        className: T2,
        style: M2,
        classNames: L2,
        styles: z2,
      } = oe("dropdown"),
      H2 = { ...e3, mouseEnterDelay: b2, mouseLeaveDelay: y2, autoAdjustOverflow: $2 },
      j2 = ce(M2),
      _2 = ce(f2),
      [K2, W2] = de([L2, w2], [z2, j2, S2, _2], { props: H2 }),
      F2 = { ...W2.root },
      G2 = d2 || c2;
    Te();
    const q2 = Nt.useMemo(() => {
        const e4 = N2();
        return C2 !== void 0
          ? C2
          : x2.startsWith("top")
            ? `${e4}-slide-down`
            : x2.startsWith("left")
              ? `${e4}-slide-right`
              : x2.startsWith("right")
                ? `${e4}-slide-left`
                : `${e4}-slide-up`;
      }, [N2, x2, C2]),
      V2 = Nt.useMemo(
        () =>
          x2
            ? x2.includes("Center")
              ? x2.slice(0, x2.indexOf("Center"))
              : x2
            : B2 === "rtl"
              ? "bottomRight"
              : "bottomLeft",
        [x2, B2],
      ),
      X2 = N2("dropdown", l2),
      U2 = $e(X2),
      [Y2, Z2] = Ii(X2, U2),
      [, J2] = A(),
      Q2 = Nt.Children.only(Ze(a2) ? Nt.createElement("span", null, a2) : a2),
      ee2 = re(t2, O(Q2)),
      te2 = D(Q2, {
        className: P(`${X2}-trigger`, { [`${X2}-rtl`]: B2 === "rtl" }, Q2.props.className),
        disabled: Q2.props.disabled ?? s2,
        ref: ee2,
      }),
      ne2 = s2 ? [] : i2,
      le2 = !!ne2?.includes("contextMenu"),
      [ae2, ie2] = Me(!1, h2),
      ue2 = n((e4) => {
        g2?.(e4, { source: "trigger" }), ie2(e4);
      }),
      pe2 = P(p2, m2, Y2, Z2, U2, T2, K2.root, { [`${X2}-rtl`]: B2 === "rtl" }),
      me2 = $l({
        arrowPointAtCenter: v(r2) && r2.pointAtCenter,
        autoAdjustOverflow: $2,
        offset: J2.marginXXS,
        arrowWidth: r2 ? J2.sizePopupArrow : 0,
        borderRadius: J2.borderRadius,
      }),
      fe2 = n(() => {
        (o2?.selectable && o2?.multiple) || (g2?.(!1, { source: "menu" }), ie2(!1));
      }),
      [he2, ge2] = xe("Dropdown", F2.zIndex);
    let be2 = Nt.createElement(
      Wl,
      {
        alignPoint: le2,
        ...se(e3, ["rootClassName", "onOpenChange"]),
        mouseEnterDelay: b2,
        mouseLeaveDelay: y2,
        visible: ae2,
        builtinPlacements: me2,
        arrow: !!r2,
        overlayClassName: pe2,
        prefixCls: X2,
        getPopupContainer: u2 || R2,
        transitionName: q2,
        trigger: ne2,
        overlay: () => {
          const e4 = se(K2, ["root"]),
            t3 = se(W2, ["root"]);
          let n2;
          return (
            o2?.items &&
              (n2 = Nt.createElement(Ei, {
                ...o2,
                classNames: { ...e4, subMenu: { ...e4 } },
                styles: { ...t3, subMenu: { ...t3 } },
              })),
            G2 && (n2 = G2(n2)),
            I(n2)
              ? (n2 = Nt.createElement("span", null, n2))
              : Nt.isValidElement(n2) || (n2 = Nt.createElement(Nt.Fragment, null, n2)),
            Nt.createElement(
              ci,
              {
                prefixCls: `${X2}-menu`,
                rootClassName: P(Z2, U2),
                expandIcon: Nt.createElement(
                  "span",
                  { className: `${X2}-menu-submenu-arrow` },
                  B2 === "rtl"
                    ? Nt.createElement(Ll, { className: `${X2}-menu-submenu-arrow-icon` })
                    : Nt.createElement(rn, { className: `${X2}-menu-submenu-arrow-icon` }),
                ),
                mode: "vertical",
                selectable: !1,
                onClick: fe2,
                validator: ({ mode: e5 }) => {},
              },
              n2,
            )
          );
        },
        placement: V2,
        onVisibleChange: ue2,
        overlayStyle: { ...F2, zIndex: he2 },
        autoDestroy: k2 ?? E2,
      },
      te2,
    );
    return he2 && (be2 = Nt.createElement(we.Provider, { value: ge2 }, be2)), be2;
  }),
  Ri = Je(Bi, "align", void 0, "dropdown", (e3) => e3);
Bi._InternalPanelDoNotUseOrYouWillBeFired = (e3) =>
  Nt.createElement(Ri, { ...e3 }, Nt.createElement("span", null));
const Ti = Bi;
function Mi(e3) {
  var t2;
  return ((t2 = e3) === void 0 || t2 === !1 ? [] : Array.isArray(t2) ? t2 : [t2]).join("_");
}
const Pi = Nt.createContext(void 0),
  Ai = Pi.Provider,
  Li = Nt.createContext(void 0),
  Oi = Li.Provider;
function Di() {
  return (
    (Di = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    Di.apply(this, arguments)
  );
}
const zi = Nt.forwardRef((e3, t2) => {
  const {
      prefixCls: o2 = "rc-checkbox",
      className: n2,
      style: r2,
      checked: l2,
      disabled: a2,
      defaultChecked: i2 = !1,
      type: s2 = "checkbox",
      title: c2,
      onChange: d2,
      ...u2
    } = e3,
    p2 = Nt.useRef(null),
    m2 = Nt.useRef(null),
    [f2, h2] = Me(i2, l2);
  Nt.useImperativeHandle(t2, () => ({
    focus: (e4) => {
      var t3;
      (t3 = p2.current) == null || t3.focus(e4);
    },
    blur: () => {
      var e4;
      (e4 = p2.current) == null || e4.blur();
    },
    input: p2.current,
    nativeElement: m2.current,
  }));
  const g2 = P(o2, n2, { [`${o2}-checked`]: f2, [`${o2}-disabled`]: a2 });
  return Nt.createElement(
    "span",
    { className: g2, title: c2, style: r2, ref: m2 },
    Nt.createElement(
      "input",
      Di({}, u2, {
        className: `${o2}-input`,
        ref: p2,
        onChange: (t3) => {
          a2 ||
            ("checked" in e3 || h2(t3.target.checked),
            d2?.({
              target: { ...e3, type: s2, checked: t3.target.checked },
              stopPropagation() {
                t3.stopPropagation();
              },
              preventDefault() {
                t3.preventDefault();
              },
              nativeEvent: t3.nativeEvent,
            }));
        },
        disabled: a2,
        checked: !!f2,
        type: s2,
      }),
    ),
  );
});
function Hi(e3) {
  const t2 = It.useRef(null),
    o2 = () => {
      r.cancel(t2.current), (t2.current = null);
    };
  return [
    () => {
      o2(),
        (t2.current = r(() => {
          t2.current = null;
        }));
    },
    (n2) => {
      t2.current && (n2.stopPropagation(), o2()), e3?.(n2);
    },
  ];
}
const ji = (e3) => {
    const {
        componentCls: t2,
        antCls: o2,
        lineWidth: n2,
        borderRadius: r2,
        borderRadiusLG: l2,
        borderRadiusSM: a2,
        calc: i2,
      } = e3,
      s2 = `${t2}-group`,
      c2 = `${t2}-button-wrapper`,
      d2 = `${o2}-badge`,
      u2 = (e4) => ({
        [`> ${d2}`]: { width: "auto" },
        [`> ${d2} > ${c2}`]: { width: "100%" },
        [`> ${d2}:not(:last-child)`]: { marginBlockEnd: i2(n2).mul(-1).equal() },
        [`> ${d2} > ${c2}:not(:last-child)`]: { marginBlockEnd: 0 },
        [`> ${d2}:first-child > ${c2}`]: {
          borderStartStartRadius: e4,
          borderStartEndRadius: e4,
          borderEndStartRadius: 0,
          borderEndEndRadius: 0,
        },
        [`> ${d2}:last-child > ${c2}`]: {
          borderStartStartRadius: 0,
          borderStartEndRadius: 0,
          borderEndStartRadius: e4,
          borderEndEndRadius: e4,
        },
        [`> ${d2}:not(:first-child):not(:last-child) > ${c2}`]: { borderRadius: 0 },
        [`> ${d2}:first-child:last-child > ${c2}`]: { borderRadius: e4 },
      });
    return {
      [s2]: {
        ...ve(e3),
        display: "inline-block",
        fontSize: 0,
        [`&${s2}-rtl`]: { direction: "rtl" },
        [`&${s2}-block`]: { display: "flex" },
        [`${o2}-badge ${o2}-badge-count`]: { zIndex: 1 },
        [`> ${o2}-badge:not(:first-child) > ${o2}-button-wrapper`]: { borderInlineStart: "none" },
        "&-vertical": {
          display: "flex",
          flexDirection: "column",
          rowGap: e3.marginXS,
          [`&:has(> ${c2}, > ${d2} > ${c2})`]: { rowGap: 0 },
          [`${t2}-wrapper`]: { marginInlineEnd: 0 },
          ...u2(r2),
          [`&${s2}-large`]: { ...u2(l2) },
          [`&${s2}-small`]: { ...u2(a2) },
        },
      },
    };
  },
  _i = (e3) => {
    const {
      componentCls: t2,
      wrapperMarginInlineEnd: o2,
      colorPrimary: n2,
      colorPrimaryHover: r2,
      radioSize: l2,
      motionDurationSlow: a2,
      motionDurationMid: i2,
      motionEaseInOutCirc: s2,
      colorBgContainer: c2,
      colorBorder: d2,
      lineWidth: u2,
      colorBgContainerDisabled: p2,
      colorTextDisabled: m2,
      paddingXS: f2,
      dotColorDisabled: h2,
      dotSize: g2,
      lineType: b2,
      radioColor: v2,
      radioBgColor: y2,
    } = e3;
    return {
      [`${t2}-wrapper`]: {
        ...ve(e3),
        display: "inline-flex",
        alignItems: "baseline",
        marginInlineStart: 0,
        marginInlineEnd: o2,
        cursor: "pointer",
        "&:last-child": { marginInlineEnd: 0 },
        [`&${t2}-wrapper-rtl`]: { direction: "rtl" },
        "&-disabled": { cursor: "not-allowed", color: e3.colorTextDisabled },
        "&::after": { display: "inline-block", width: 0, overflow: "hidden", content: '"\\a0"' },
        "&-block": { flex: 1, justifyContent: "center" },
        [t2]: {
          ...ve(e3),
          position: "relative",
          whiteSpace: "nowrap",
          lineHeight: 1,
          cursor: "pointer",
          alignSelf: "center",
          boxSizing: "border-box",
          display: "block",
          width: `calc(${l2} * 1px)`,
          height: `calc(${l2} * 1px)`,
          backgroundColor: c2,
          border: `${X(u2)} ${b2} ${d2}`,
          borderRadius: "50%",
          transition: `all ${i2}`,
          flex: "none",
          "&:after": {
            content: '""',
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) scale(0)",
            width: `calc(${g2} * 1px)`,
            height: `calc(${g2} * 1px)`,
            backgroundColor: v2,
            borderRadius: "50%",
            transformOrigin: "50% 50%",
            opacity: 0,
            transition: `all ${a2} ${s2}`,
          },
          [`${t2}-input`]: {
            position: "absolute",
            inset: 0,
            zIndex: 1,
            cursor: "pointer",
            opacity: 0,
            margin: 0,
          },
          [`&:has(${t2}-input:focus-visible)`]: ye(e3),
        },
        [`&:hover:not(${t2}-wrapper-disabled) ${t2}`]: { borderColor: n2 },
        [`&:hover ${t2}-checked:not(${t2}-disabled)`]: {
          backgroundColor: r2,
          borderColor: "transparent",
        },
        [`${t2}-checked`]: {
          backgroundColor: y2,
          borderColor: n2,
          "&::after": { transform: "translate(-50%, -50%)", opacity: 1 },
        },
        [`${t2}-disabled`]: {
          [`&, ${t2}-input`]: { cursor: "not-allowed", pointerEvents: "none" },
          background: p2,
          borderColor: d2,
          "&::after": { backgroundColor: h2 },
        },
        [`${t2}-disabled + span`]: { color: m2, cursor: "not-allowed" },
        [`span${t2} + *`]: { paddingInlineStart: f2, paddingInlineEnd: f2 },
      },
    };
  },
  Ki = (e3) => {
    const {
      buttonColor: t2,
      controlHeight: o2,
      componentCls: n2,
      lineWidth: r2,
      lineType: l2,
      colorBorder: a2,
      motionDurationMid: i2,
      buttonPaddingInline: s2,
      fontSize: c2,
      buttonBg: d2,
      fontSizeLG: u2,
      controlHeightLG: p2,
      controlHeightSM: m2,
      paddingXS: f2,
      borderRadius: h2,
      borderRadiusSM: g2,
      borderRadiusLG: b2,
      buttonCheckedBg: v2,
      buttonSolidCheckedColor: y2,
      colorTextDisabled: $2,
      colorBgContainerDisabled: x2,
      buttonCheckedBgDisabled: C2,
      buttonCheckedColorDisabled: w2,
      colorPrimary: S2,
      colorPrimaryHover: E2,
      colorPrimaryActive: k2,
      buttonSolidCheckedBg: N2,
      buttonSolidCheckedHoverBg: I2,
      buttonSolidCheckedActiveBg: B2,
      calc: R2,
    } = e3;
    return {
      [`${n2}-button-wrapper`]: {
        position: "relative",
        display: "inline-block",
        height: o2,
        margin: 0,
        paddingInline: s2,
        paddingBlock: 0,
        color: t2,
        fontSize: c2,
        lineHeight: X(R2(o2).sub(R2(r2).mul(2)).equal()),
        background: d2,
        border: `${X(r2)} ${l2} ${a2}`,
        borderBlockStartWidth: R2(r2).add(0.02).equal(),
        borderInlineEndWidth: r2,
        cursor: "pointer",
        transition: ["color", "background-color", "box-shadow"]
          .map((e4) => `${e4} ${i2}`)
          .join(","),
        a: { color: t2 },
        [`> ${n2}-button`]: {
          position: "absolute",
          insetBlockStart: 0,
          insetInlineStart: 0,
          zIndex: -1,
          width: "100%",
          height: "100%",
        },
        "&:not(:last-child)": { marginInlineEnd: R2(r2).mul(-1).equal() },
        "&:first-child": {
          borderInlineStart: `${X(r2)} ${l2} ${a2}`,
          borderStartStartRadius: h2,
          borderEndStartRadius: h2,
        },
        "&:last-child": { borderStartEndRadius: h2, borderEndEndRadius: h2 },
        "&:first-child:last-child": { borderRadius: h2 },
        [`${n2}-group-large &`]: {
          height: p2,
          fontSize: u2,
          lineHeight: X(R2(p2).sub(R2(r2).mul(2)).equal()),
          "&:first-child": { borderStartStartRadius: b2, borderEndStartRadius: b2 },
          "&:last-child": { borderStartEndRadius: b2, borderEndEndRadius: b2 },
        },
        [`${n2}-group-small &`]: {
          height: m2,
          paddingInline: R2(f2).sub(r2).equal(),
          paddingBlock: 0,
          lineHeight: X(R2(m2).sub(R2(r2).mul(2)).equal()),
          "&:first-child": { borderStartStartRadius: g2, borderEndStartRadius: g2 },
          "&:last-child": { borderStartEndRadius: g2, borderEndEndRadius: g2 },
        },
        [`${n2}-group-vertical > &`]: {
          marginInlineEnd: 0,
          borderRadius: 0,
          "&:not(:last-child)": { marginBlockEnd: R2(r2).mul(-1).equal() },
          "&:first-child": {
            borderStartStartRadius: h2,
            borderStartEndRadius: h2,
            borderEndStartRadius: 0,
            borderEndEndRadius: 0,
          },
          "&:last-child": {
            borderStartStartRadius: 0,
            borderStartEndRadius: 0,
            borderEndStartRadius: h2,
            borderEndEndRadius: h2,
          },
          "&:first-child:last-child": { borderRadius: h2 },
        },
        [`${n2}-group-vertical${n2}-group-large > &`]: {
          "&:first-child": { borderStartStartRadius: b2, borderStartEndRadius: b2 },
          "&:last-child": { borderEndStartRadius: b2, borderEndEndRadius: b2 },
          "&:first-child:last-child": { borderRadius: b2 },
        },
        [`${n2}-group-vertical${n2}-group-small > &`]: {
          "&:first-child": { borderStartStartRadius: g2, borderStartEndRadius: g2 },
          "&:last-child": { borderEndStartRadius: g2, borderEndEndRadius: g2 },
          "&:first-child:last-child": { borderRadius: g2 },
        },
        "&:hover": { position: "relative", color: S2 },
        "&:has(:focus-visible)": ye(e3),
        [`${n2}, input[type='checkbox'], input[type='radio']`]: {
          width: 0,
          height: 0,
          opacity: 0,
          pointerEvents: "none",
        },
        [`&-checked:not(${n2}-button-wrapper-disabled)`]: {
          zIndex: 1,
          color: S2,
          background: v2,
          borderColor: S2,
          "&::before": { backgroundColor: S2 },
          "&:first-child": { borderColor: S2 },
          "&:hover": { color: E2, borderColor: E2, "&::before": { backgroundColor: E2 } },
          "&:active": { color: k2, borderColor: k2, "&::before": { backgroundColor: k2 } },
        },
        [`${n2}-group-solid &-checked:not(${n2}-button-wrapper-disabled)`]: {
          color: y2,
          background: N2,
          borderColor: N2,
          "&:hover": { color: y2, background: I2, borderColor: I2 },
          "&:active": { color: y2, background: B2, borderColor: B2 },
        },
        "&-disabled": {
          color: $2,
          backgroundColor: x2,
          borderColor: a2,
          cursor: "not-allowed",
          "&:first-child, &:hover": { color: $2, backgroundColor: x2, borderColor: a2 },
        },
        [`&-disabled${n2}-button-wrapper-checked`]: {
          color: w2,
          backgroundColor: C2,
          borderColor: a2,
          boxShadow: "none",
        },
        "&-block": { flex: 1, textAlign: "center" },
      },
    };
  },
  Wi = Y(
    "Radio",
    (e3) => {
      const { controlOutline: t2, controlOutlineWidth: o2 } = e3,
        n2 = `0 0 0 ${X(o2)} ${t2}`,
        r2 = q(e3, { radioFocusShadow: n2, radioButtonFocusShadow: n2 });
      return [ji(r2), _i(r2), Ki(r2)];
    },
    (e3) => {
      const {
        wireframe: t2,
        padding: o2,
        marginXS: n2,
        lineWidth: r2,
        fontSizeLG: l2,
        colorText: a2,
        colorBgContainer: i2,
        colorTextDisabled: s2,
        controlItemBgActiveDisabled: c2,
        colorTextLightSolid: d2,
        colorPrimary: u2,
        colorPrimaryHover: p2,
        colorPrimaryActive: m2,
        colorWhite: f2,
      } = e3;
      return {
        radioSize: l2,
        dotSize: t2 ? l2 - 8 : l2 - 2 * (4 + r2),
        dotColorDisabled: s2,
        buttonSolidCheckedColor: d2,
        buttonSolidCheckedBg: u2,
        buttonSolidCheckedHoverBg: p2,
        buttonSolidCheckedActiveBg: m2,
        buttonBg: i2,
        buttonCheckedBg: i2,
        buttonColor: a2,
        buttonCheckedBgDisabled: c2,
        buttonCheckedColorDisabled: s2,
        buttonPaddingInline: o2 - r2,
        wrapperMarginInlineEnd: n2,
        radioColor: t2 ? u2 : f2,
        radioBgColor: t2 ? i2 : u2,
      };
    },
    { unitless: { radioSize: !0, dotSize: !0 } },
  ),
  Fi = (e3, t2) => {
    const o2 = Nt.useContext(Pi),
      n2 = Nt.useContext(Li),
      {
        getPrefixCls: r2,
        direction: l2,
        className: a2,
        style: i2,
        classNames: s2,
        styles: c2,
      } = oe("radio"),
      d2 = Nt.useRef(null),
      u2 = M(t2, d2),
      { isFormItemInput: p2 } = Nt.useContext(Qe),
      m2 = (t3) => {
        var n3, r3;
        (n3 = e3.onChange) == null || n3.call(e3, t3),
          (r3 = o2?.onChange) == null || r3.call(o2, t3);
      },
      {
        prefixCls: f2,
        className: h2,
        rootClassName: g2,
        children: b2,
        style: v2,
        title: y2,
        classNames: $2,
        styles: x2,
        checked: C2,
        ...w2
      } = e3,
      S2 = r2("radio", f2),
      E2 = (o2?.optionType || n2) === "button",
      k2 = E2 ? `${S2}-button` : S2,
      N2 = $e(S2),
      [I2, B2] = Wi(S2, N2),
      R2 = { ...w2 },
      T2 = Nt.useContext(ne),
      A2 = "checked" in e3;
    let L2 = C2;
    o2 &&
      ((R2.name = o2.name),
      (R2.onChange = m2),
      (L2 = e3.value === o2.value),
      (R2.disabled = R2.disabled ?? o2.disabled)),
      (A2 || o2) && (R2.checked = L2),
      (R2.disabled = R2.disabled ?? T2);
    const O2 = { ...e3, ...R2, checked: L2 },
      D2 = ce(i2),
      H2 = ce(v2),
      [j2, _2] = de([s2, $2], [c2, D2, x2, H2], { props: O2 }),
      K2 = P(
        `${k2}-wrapper`,
        {
          [`${k2}-wrapper-checked`]: L2,
          [`${k2}-wrapper-disabled`]: R2.disabled,
          [`${k2}-wrapper-rtl`]: l2 === "rtl",
          [`${k2}-wrapper-in-form-item`]: p2,
          [`${k2}-wrapper-block`]: !!o2?.block,
        },
        a2,
        h2,
        g2,
        j2.root,
        I2,
        B2,
        N2,
      ),
      [W2, F2] = Hi(R2.onClick);
    return Nt.createElement(
      So,
      { component: "Radio", disabled: R2.disabled },
      Nt.createElement(
        "label",
        {
          className: K2,
          style: _2.root,
          onMouseEnter: e3.onMouseEnter,
          onMouseLeave: e3.onMouseLeave,
          title: y2,
          onClick: W2,
        },
        Nt.createElement(zi, {
          ...R2,
          className: P(j2.icon, { [bo]: !E2 }),
          style: _2.icon,
          type: "radio",
          prefixCls: k2,
          ref: u2,
          onClick: F2,
        }),
        z(b2)
          ? Nt.createElement("span", { className: P(`${k2}-label`, j2.label), style: _2.label }, b2)
          : null,
      ),
    );
  },
  Gi = Nt.forwardRef(Fi),
  qi = Nt.forwardRef((e3, t2) => {
    const { getPrefixCls: o2, direction: n2 } = Nt.useContext(B),
      { name: r2 } = Nt.useContext(Qe),
      a2 = l(Mi(r2)),
      {
        prefixCls: i2,
        className: s2,
        rootClassName: c2,
        options: d2,
        buttonStyle: u2 = "outline",
        disabled: p2,
        children: m2,
        size: h2,
        style: g2,
        id: b2,
        optionType: v2,
        name: y2 = a2,
        defaultValue: $2,
        value: x2,
        block: C2 = !1,
        onChange: S2,
        onMouseEnter: E2,
        onMouseLeave: k2,
        onFocus: N2,
        onBlur: I2,
        orientation: R2,
        vertical: T2,
        role: M2 = "radiogroup",
      } = e3,
      [A2, L2] = Me($2, x2),
      O2 = Nt.useCallback(
        (e4) => {
          const t3 = A2,
            o3 = e4.target.value;
          L2(o3), o3 !== t3 && S2?.(e4);
        },
        [A2, L2, S2],
      ),
      D2 = o2("radio", i2),
      z2 = `${D2}-group`,
      H2 = $e(D2),
      [j2, _2] = Wi(D2, H2);
    let K2 = m2;
    d2 &&
      d2.length > 0 &&
      (K2 = d2.map((e4) =>
        typeof e4 == "string" || f(e4)
          ? Nt.createElement(
              Gi,
              { key: e4.toString(), prefixCls: D2, disabled: p2, value: e4, checked: A2 === e4 },
              e4,
            )
          : Nt.createElement(
              Gi,
              {
                key: `radio-group-value-options-${e4.value}`,
                prefixCls: D2,
                disabled: e4.disabled || p2,
                value: e4.value,
                checked: A2 === e4.value,
                title: e4.title,
                style: e4.style,
                className: e4.className,
                id: e4.id,
                required: e4.required,
                onChange: e4.onChange,
              },
              e4.label,
            ),
      ));
    const W2 = ie(h2),
      [, F2] = et(R2, T2),
      G2 = P(
        z2,
        `${z2}-${u2}`,
        {
          [`${z2}-large`]: W2 === "large",
          [`${z2}-small`]: W2 === "small",
          [`${z2}-rtl`]: n2 === "rtl",
          [`${z2}-block`]: C2,
        },
        s2,
        c2,
        j2,
        _2,
        H2,
      ),
      q2 = Nt.useMemo(
        () => ({ onChange: O2, value: A2, disabled: p2, name: y2, optionType: v2, block: C2 }),
        [O2, A2, p2, y2, v2, C2],
      );
    return Nt.createElement(
      "div",
      {
        ...w(e3, { aria: !0, data: !0 }),
        role: M2,
        className: P(G2, { [`${D2}-group-vertical`]: F2 }),
        style: g2,
        onMouseEnter: E2,
        onMouseLeave: k2,
        onFocus: N2,
        onBlur: I2,
        id: b2,
        ref: t2,
      },
      Nt.createElement(Ai, { value: q2 }, K2),
    );
  }),
  Vi = Nt.memo(qi),
  Xi = (e3, t2) => {
    const { getPrefixCls: o2 } = Nt.useContext(B),
      { prefixCls: n2, ...r2 } = e3,
      l2 = o2("radio", n2);
    return Nt.createElement(
      Oi,
      { value: "button" },
      Nt.createElement(Gi, { prefixCls: l2, ...r2, type: "radio", ref: t2 }),
    );
  },
  Ui = Nt.forwardRef(Xi),
  Yi = Gi;
(Yi.Button = Ui), (Yi.Group = Vi), (Yi.__ANT_RADIO = !0);
const Zi = Yi;
function Ji(e3) {
  return q(e3, { inputAffixPadding: e3.paddingXXS });
}
const Qi = (e3) => {
    const {
        controlHeight: t2,
        fontSize: o2,
        lineHeight: n2,
        lineWidth: r2,
        lineWidthFocus: l2,
        controlHeightSM: a2,
        controlHeightLG: i2,
        fontSizeLG: s2,
        lineHeightLG: c2,
        paddingSM: d2,
        controlPaddingHorizontalSM: u2,
        controlPaddingHorizontal: p2,
        colorFillAlter: m2,
        colorPrimaryHover: f2,
        colorPrimary: h2,
        controlOutlineWidth: g2,
        controlOutline: b2,
        colorErrorOutline: v2,
        colorWarningOutline: y2,
        colorBgContainer: $2,
        inputFontSize: x2,
        inputFontSizeLG: C2,
        inputFontSizeSM: w2,
      } = e3,
      S2 = x2 || o2,
      E2 = w2 || S2,
      k2 = C2 || s2,
      N2 = Math.round(((t2 - S2 * n2) / 2) * 10) / 10 - r2,
      I2 = Math.round(((a2 - E2 * n2) / 2) * 10) / 10 - r2,
      B2 = Math.ceil(((i2 - k2 * c2) / 2) * 10) / 10 - r2;
    return {
      lineWidthFocus: l2 === 0 ? 0 : r2,
      paddingBlock: Math.max(N2, 0),
      paddingBlockSM: Math.max(I2, 0),
      paddingBlockLG: Math.max(B2, 0),
      paddingInline: d2 - r2,
      paddingInlineSM: u2 - r2,
      paddingInlineLG: p2 - r2,
      addonBg: m2,
      activeBorderColor: h2,
      hoverBorderColor: f2,
      activeShadow: `0 0 0 ${g2}px ${b2}`,
      errorActiveShadow: `0 0 0 ${g2}px ${v2}`,
      warningActiveShadow: `0 0 0 ${g2}px ${y2}`,
      hoverBg: $2,
      activeBg: $2,
      inputFontSize: S2,
      inputFontSizeLG: k2,
      inputFontSizeSM: E2,
    };
  },
  es = (e3) => ({ borderColor: e3.hoverBorderColor, backgroundColor: e3.hoverBg }),
  ts = (e3) => ({
    color: e3.colorTextDisabled,
    backgroundColor: e3.colorBgContainerDisabled,
    borderColor: e3.colorBorderDisabled,
    boxShadow: "none",
    cursor: "not-allowed",
    opacity: 1,
    "input[disabled], textarea[disabled]": { cursor: "not-allowed" },
    "&:hover:not([disabled])": {
      ...es(
        q(e3, { hoverBorderColor: e3.colorBorderDisabled, hoverBg: e3.colorBgContainerDisabled }),
      ),
    },
  }),
  os = (e3, t2) => ({
    background: e3.colorBgContainer,
    borderWidth: e3.lineWidth,
    borderStyle: e3.lineType,
    borderColor: t2.borderColor,
    "&:hover": { borderColor: t2.hoverBorderColor, backgroundColor: e3.hoverBg },
    "&:focus, &:focus-within": {
      borderColor: t2.activeBorderColor,
      boxShadow: t2.activeShadow,
      outline: 0,
      backgroundColor: e3.activeBg,
    },
  }),
  ns = (e3, t2) => ({
    [`&${e3.componentCls}-status-${t2.status}:not(${e3.componentCls}-disabled)`]: {
      ...os(e3, t2),
      [`${e3.componentCls}-prefix, ${e3.componentCls}-suffix`]: { color: t2.affixColor },
    },
    [`&${e3.componentCls}-status-${t2.status}${e3.componentCls}-disabled`]: {
      borderColor: t2.borderColor,
    },
  }),
  rs = (e3, t2) => ({
    "&-outlined": {
      ...os(e3, {
        borderColor: e3.colorBorder,
        hoverBorderColor: e3.hoverBorderColor,
        activeBorderColor: e3.activeBorderColor,
        activeShadow: e3.activeShadow,
      }),
      [`&${e3.componentCls}-disabled, &[disabled]`]: { ...ts(e3) },
      ...ns(e3, {
        status: "error",
        borderColor: e3.colorError,
        hoverBorderColor: e3.colorErrorBorderHover,
        activeBorderColor: e3.colorError,
        activeShadow: e3.errorActiveShadow,
        affixColor: e3.colorErrorAffix,
      }),
      ...ns(e3, {
        status: "warning",
        borderColor: e3.colorWarning,
        hoverBorderColor: e3.colorWarningBorderHover,
        activeBorderColor: e3.colorWarning,
        activeShadow: e3.warningActiveShadow,
        affixColor: e3.colorWarningAffix,
      }),
      ...t2,
    },
  }),
  ls = (e3, t2) => ({
    [`&${e3.componentCls}-group-wrapper-status-${t2.status}`]: {
      [`${e3.componentCls}-group-addon`]: {
        borderColor: t2.addonBorderColor,
        color: t2.addonColor,
      },
    },
  }),
  as = (e3) => ({
    "&-outlined": {
      [`${e3.componentCls}-group`]: {
        "&-addon": {
          background: e3.addonBg,
          border: `${X(e3.lineWidth)} ${e3.lineType} ${e3.colorBorder}`,
        },
        "&-addon:first-child": { borderInlineEnd: 0 },
        "&-addon:last-child": { borderInlineStart: 0 },
      },
      ...ls(e3, {
        status: "error",
        addonBorderColor: e3.colorError,
        addonColor: e3.colorErrorText,
      }),
      ...ls(e3, {
        status: "warning",
        addonBorderColor: e3.colorWarning,
        addonColor: e3.colorWarningText,
      }),
      [`&${e3.componentCls}-group-wrapper-disabled`]: {
        [`${e3.componentCls}-group-addon`]: { ...ts(e3) },
      },
    },
  }),
  is = "&:focus-visible, &:has(input:focus-visible), &:has(textarea:focus-visible)",
  ss = (e3, t2) => ({
    outline: `${X(e3.lineWidthFocus)} ${e3.lineType} ${t2}`,
    outlineOffset: X(e3.calc(e3.lineWidth).mul(-1).equal()),
    transition: ["outline-offset", "outline"].map((e4) => `${e4} 0s`).join(", "),
  }),
  cs = (e3, t2) => ({
    "&, & input, & textarea": { color: t2.color },
    [is]: ss(e3, t2.color),
    [`${e3.componentCls}-prefix, ${e3.componentCls}-suffix`]: { color: t2.affixColor },
  }),
  ds = (e3, t2) => {
    const { componentCls: o2 } = e3;
    return {
      "&-borderless": {
        background: "transparent",
        border: "none",
        paddingBlock: e3.calc(e3.paddingBlock).add(e3.lineWidth).equal(),
        [`&${o2}-sm, &${o2}-affix-wrapper-sm`]: {
          paddingBlock: e3.calc(e3.paddingBlockSM).add(e3.lineWidth).equal(),
        },
        [`&${o2}-lg, &${o2}-affix-wrapper-lg`]: {
          paddingBlock: e3.calc(e3.paddingBlockLG).add(e3.lineWidth).equal(),
        },
        "&:focus, &:focus-within": { outline: "none" },
        [is]: ss(e3, e3.activeBorderColor),
        [`&${o2}-disabled, &[disabled]`]: { color: e3.colorTextDisabled, cursor: "not-allowed" },
        [`&${o2}-status-error`]: cs(e3, { color: e3.colorError, affixColor: e3.colorErrorAffix }),
        [`&${o2}-status-warning`]: cs(e3, {
          color: e3.colorWarning,
          affixColor: e3.colorWarningAffix,
        }),
        ...t2,
      },
    };
  },
  us = (e3, t2) => ({
    background: t2.bg,
    borderWidth: e3.lineWidth,
    borderStyle: e3.lineType,
    borderColor: "transparent",
    "input&, & input, textarea&, & textarea": { color: t2?.inputColor ?? "unset" },
    "&:hover": { background: t2.hoverBg },
    "&:focus, &:focus-within": {
      outline: 0,
      borderColor: t2.activeBorderColor,
      backgroundColor: e3.activeBg,
    },
  }),
  ps = (e3, t2) => ({
    [`&${e3.componentCls}-status-${t2.status}:not(${e3.componentCls}-disabled)`]: {
      ...us(e3, t2),
      [`${e3.componentCls}-prefix, ${e3.componentCls}-suffix`]: { color: t2.affixColor },
    },
  }),
  ms = (e3, t2) => ({
    "&-filled": {
      ...us(e3, {
        bg: e3.colorFillTertiary,
        hoverBg: e3.colorFillSecondary,
        activeBorderColor: e3.activeBorderColor,
        inputColor: e3.colorText,
      }),
      [`&${e3.componentCls}-disabled, &[disabled]`]: { ...ts(e3) },
      ...ps(e3, {
        status: "error",
        bg: e3.colorErrorBg,
        hoverBg: e3.colorErrorBgHover,
        activeBorderColor: e3.colorError,
        inputColor: e3.colorErrorText,
        affixColor: e3.colorErrorAffix,
      }),
      ...ps(e3, {
        status: "warning",
        bg: e3.colorWarningBg,
        hoverBg: e3.colorWarningBgHover,
        activeBorderColor: e3.colorWarning,
        inputColor: e3.colorWarningText,
        affixColor: e3.colorWarningAffix,
      }),
      ...t2,
    },
  }),
  fs = (e3, t2) => ({
    [`&${e3.componentCls}-group-wrapper-status-${t2.status}`]: {
      [`${e3.componentCls}-group-addon`]: { background: t2.addonBg, color: t2.addonColor },
    },
  }),
  hs = (e3) => ({
    "&-filled": {
      [`${e3.componentCls}-group-addon`]: {
        background: e3.colorFillTertiary,
        "&:last-child": { position: "static" },
      },
      ...fs(e3, { status: "error", addonBg: e3.colorErrorBg, addonColor: e3.colorErrorText }),
      ...fs(e3, { status: "warning", addonBg: e3.colorWarningBg, addonColor: e3.colorWarningText }),
      [`&${e3.componentCls}-group-wrapper-disabled`]: {
        [`${e3.componentCls}-group`]: {
          "&-addon": { background: e3.colorFillTertiary, color: e3.colorTextDisabled },
          "&-addon:first-child": {
            borderInlineStart: `${X(e3.lineWidth)} ${e3.lineType} ${e3.colorBorder}`,
            borderTop: `${X(e3.lineWidth)} ${e3.lineType} ${e3.colorBorder}`,
            borderBottom: `${X(e3.lineWidth)} ${e3.lineType} ${e3.colorBorder}`,
          },
          "&-addon:last-child": {
            borderInlineEnd: `${X(e3.lineWidth)} ${e3.lineType} ${e3.colorBorder}`,
            borderTop: `${X(e3.lineWidth)} ${e3.lineType} ${e3.colorBorder}`,
            borderBottom: `${X(e3.lineWidth)} ${e3.lineType} ${e3.colorBorder}`,
          },
        },
      },
    },
  }),
  gs = (e3, t2) => ({
    background: e3.colorBgContainer,
    borderWidth: `${X(e3.lineWidth)} 0`,
    borderStyle: `${e3.lineType} none`,
    borderColor: `transparent transparent ${t2.borderColor} transparent`,
    borderRadius: 0,
    "&:hover": {
      borderColor: `transparent transparent ${t2.hoverBorderColor} transparent`,
      backgroundColor: e3.hoverBg,
    },
    "&:focus, &:focus-within": {
      borderColor: `transparent transparent ${t2.activeBorderColor} transparent`,
      outline: 0,
      backgroundColor: e3.activeBg,
    },
  }),
  bs = (e3, t2) => ({
    [`&${e3.componentCls}-status-${t2.status}:not(${e3.componentCls}-disabled)`]: {
      ...gs(e3, t2),
      [`${e3.componentCls}-prefix, ${e3.componentCls}-suffix`]: { color: t2.affixColor },
    },
    [`&${e3.componentCls}-status-${t2.status}${e3.componentCls}-disabled`]: {
      borderColor: `transparent transparent ${t2.borderColor} transparent`,
    },
  }),
  vs = (e3, t2) => ({
    "&-underlined": {
      ...gs(e3, {
        borderColor: e3.colorBorder,
        hoverBorderColor: e3.hoverBorderColor,
        activeBorderColor: e3.activeBorderColor,
        activeShadow: e3.activeShadow,
      }),
      [`&${e3.componentCls}-disabled, &[disabled]`]: {
        color: e3.colorTextDisabled,
        boxShadow: "none",
        cursor: "not-allowed",
        "&:hover": { borderColor: `transparent transparent ${e3.colorBorder} transparent` },
      },
      "input[disabled], textarea[disabled]": { cursor: "not-allowed" },
      ...bs(e3, {
        status: "error",
        borderColor: e3.colorError,
        hoverBorderColor: e3.colorErrorBorderHover,
        activeBorderColor: e3.colorError,
        activeShadow: e3.errorActiveShadow,
        affixColor: e3.colorErrorAffix,
      }),
      ...bs(e3, {
        status: "warning",
        borderColor: e3.colorWarning,
        hoverBorderColor: e3.colorWarningBorderHover,
        activeBorderColor: e3.colorWarning,
        activeShadow: e3.warningActiveShadow,
        affixColor: e3.colorWarningAffix,
      }),
      ...t2,
    },
  }),
  ys = (e3) => ({
    "&::-moz-placeholder": { opacity: 1 },
    "&::placeholder": { color: e3, userSelect: "none" },
    "&:placeholder-shown": { textOverflow: "ellipsis" },
  }),
  $s = (e3) => {
    const { paddingBlockLG: t2, lineHeightLG: o2, borderRadiusLG: n2, paddingInlineLG: r2 } = e3;
    return {
      padding: `${X(t2)} ${X(r2)}`,
      fontSize: e3.inputFontSizeLG,
      lineHeight: o2,
      borderRadius: n2,
    };
  },
  xs = (e3) => ({
    padding: `${X(e3.paddingBlockSM)} ${X(e3.paddingInlineSM)}`,
    fontSize: e3.inputFontSizeSM,
    borderRadius: e3.borderRadiusSM,
  }),
  Cs = (e3, t2 = {}) => ({
    position: "relative",
    display: "inline-block",
    width: "100%",
    minWidth: 0,
    padding: `${X(e3.paddingBlock)} ${X(e3.paddingInline)}`,
    color: e3.colorText,
    fontSize: e3.inputFontSize,
    lineHeight: e3.lineHeight,
    borderRadius: e3.borderRadius,
    transition: `all ${e3.motionDurationMid}`,
    ...ys(e3.colorTextPlaceholder),
    "&-lg": { ...$s(e3), ...t2.largeStyle },
    "&-sm": { ...xs(e3), ...t2.smallStyle },
    "&-rtl, &-textarea-rtl": { direction: "rtl" },
  }),
  ws = (e3) => {
    const { componentCls: t2, antCls: o2 } = e3;
    return {
      position: "relative",
      display: "table",
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: 0,
      "&[class*='col-']": {
        paddingInlineEnd: e3.paddingXS,
        "&:last-child": { paddingInlineEnd: 0 },
      },
      [`&-lg ${t2}, &-lg > ${t2}-group-addon`]: { ...$s(e3) },
      [`&-sm ${t2}, &-sm > ${t2}-group-addon`]: { ...xs(e3) },
      [`&-lg ${o2}-select-single`]: { height: e3.controlHeightLG },
      [`&-sm ${o2}-select-single`]: { height: e3.controlHeightSM },
      [`> ${t2}`]: {
        display: "table-cell",
        "&:not(:first-child):not(:last-child)": { borderRadius: 0 },
      },
      [`${t2}-group`]: {
        "&-addon, &-wrap": {
          display: "table-cell",
          width: 1,
          whiteSpace: "nowrap",
          verticalAlign: "middle",
          "&:not(:first-child):not(:last-child)": { borderRadius: 0 },
        },
        "&-wrap > *": { display: "block !important" },
        "&-addon": {
          position: "relative",
          padding: `0 ${X(e3.paddingInline)}`,
          color: e3.colorText,
          fontWeight: 400,
          fontSize: e3.inputFontSize,
          textAlign: "center",
          borderRadius: e3.borderRadius,
          transition: `all ${e3.motionDurationSlow}`,
          lineHeight: 1,
          [`${o2}-select`]: {
            margin: `${X(e3.calc(e3.paddingBlock).add(1).mul(-1).equal())} ${X(e3.calc(e3.paddingInline).mul(-1).equal())}`,
            [`&${o2}-select-single:not(${o2}-select-customize-input):not(${o2}-pagination-size-changer)`]:
              {
                backgroundColor: "inherit",
                border: `${X(e3.lineWidth)} ${e3.lineType} transparent`,
                boxShadow: "none",
              },
          },
          [`${o2}-cascader-picker`]: {
            margin: `-9px ${X(e3.calc(e3.paddingInline).mul(-1).equal())}`,
            backgroundColor: "transparent",
            [`${o2}-cascader-input`]: { textAlign: "start", border: 0, boxShadow: "none" },
          },
        },
      },
      [t2]: {
        width: "100%",
        marginBottom: 0,
        textAlign: "inherit",
        "&:focus": { zIndex: 1, borderInlineEndWidth: 1 },
        "&:hover": { zIndex: 1, borderInlineEndWidth: 1 },
      },
      [`> ${t2}:first-child, ${t2}-group-addon:first-child`]: {
        borderStartEndRadius: 0,
        borderEndEndRadius: 0,
        [`${o2}-select`]: { borderStartEndRadius: 0, borderEndEndRadius: 0 },
      },
      [`> ${t2}-affix-wrapper`]: {
        [`&:not(:first-child) ${t2}`]: { borderStartStartRadius: 0, borderEndStartRadius: 0 },
        [`&:not(:last-child) ${t2}`]: { borderStartEndRadius: 0, borderEndEndRadius: 0 },
      },
      [`> ${t2}:last-child, ${t2}-group-addon:last-child`]: {
        borderStartStartRadius: 0,
        borderEndStartRadius: 0,
        [`${o2}-select`]: { borderStartStartRadius: 0, borderEndStartRadius: 0 },
      },
      [`${t2}-affix-wrapper`]: {
        "&:not(:last-child)": { borderStartEndRadius: 0, borderEndEndRadius: 0 },
        "&:not(:first-child)": { borderStartStartRadius: 0, borderEndStartRadius: 0 },
      },
      [`&${t2}-group-compact`]: {
        display: "block",
        ...Ee(),
        [`${t2}-group-addon, ${t2}-group-wrap, > ${t2}`]: {
          "&:not(:first-child):not(:last-child)": {
            borderInlineEndWidth: e3.lineWidth,
            "&:hover, &:focus": { zIndex: 1 },
          },
        },
        "& > *": { display: "inline-flex", float: "none", verticalAlign: "top", borderRadius: 0 },
        [`
        & > ${t2}-affix-wrapper,
        & > ${t2}-number-affix-wrapper,
        & > ${o2}-picker-range
      `]: { display: "inline-flex" },
        "& > *:not(:last-child)": {
          marginInlineEnd: e3.calc(e3.lineWidth).mul(-1).equal(),
          borderInlineEndWidth: e3.lineWidth,
        },
        [t2]: { float: "none" },
        [`& > ${o2}-select,
      & > ${o2}-select-auto-complete ${t2},
      & > ${o2}-cascader-picker ${t2},
      & > ${t2}-group-wrapper ${t2}`]: {
          borderInlineEndWidth: e3.lineWidth,
          borderRadius: 0,
          "&:hover, &:focus": { zIndex: 1 },
        },
        [`& > ${o2}-select-focused`]: { zIndex: 1 },
        [`& > ${o2}-select > ${o2}-select-arrow`]: { zIndex: 1 },
        [`& > *:first-child,
      & > ${o2}-select:first-child,
      & > ${o2}-select-auto-complete:first-child ${t2},
      & > ${o2}-cascader-picker:first-child ${t2}`]: {
          borderStartStartRadius: e3.borderRadius,
          borderEndStartRadius: e3.borderRadius,
        },
        [`& > *:last-child,
      & > ${o2}-select:last-child,
      & > ${o2}-cascader-picker:last-child ${t2},
      & > ${o2}-cascader-picker-focused:last-child ${t2}`]: {
          borderInlineEndWidth: e3.lineWidth,
          borderStartEndRadius: e3.borderRadius,
          borderEndEndRadius: e3.borderRadius,
        },
        [`& > ${o2}-select-auto-complete ${t2}`]: { verticalAlign: "top" },
        [`${t2}-group-wrapper + ${t2}-group-wrapper`]: {
          marginInlineStart: e3.calc(e3.lineWidth).mul(-1).equal(),
          [`${t2}-affix-wrapper`]: {},
        },
      },
    };
  },
  Ss = (e3) => {
    const { componentCls: t2, controlHeightSM: o2, lineWidth: n2, calc: r2 } = e3,
      l2 = r2(o2).sub(r2(n2).mul(2)).sub(16).div(2).equal();
    return {
      [t2]: {
        ...ve(e3),
        ...Cs(e3),
        ...rs(e3),
        ...ms(e3),
        ...ds(e3),
        ...vs(e3),
        '&[type="color"]': {
          height: e3.controlHeight,
          [`&${t2}-lg`]: { height: e3.controlHeightLG },
          [`&${t2}-sm`]: { height: o2, paddingTop: l2, paddingBottom: l2 },
        },
        '&[type="search"]::-webkit-search-cancel-button, &[type="search"]::-webkit-search-decoration':
          { appearance: "none" },
      },
    };
  },
  Es = (e3) => {
    const { componentCls: t2 } = e3;
    return {
      [`${t2}-clear-icon`]: {
        margin: 0,
        padding: 0,
        lineHeight: 0,
        color: e3.colorTextQuaternary,
        fontSize: e3.fontSizeIcon,
        verticalAlign: -1,
        cursor: "pointer",
        transition: `color ${e3.motionDurationSlow}`,
        border: "none",
        outline: "none",
        backgroundColor: "transparent",
        "&:hover": { color: e3.colorIcon },
        "&:focus-visible": { color: e3.colorIcon, borderRadius: e3.borderRadiusSM, ...ye(e3) },
        "&:active": { color: e3.colorText },
        "&-hidden": { visibility: "hidden" },
        "&-has-suffix": { margin: `0 ${X(e3.inputAffixPadding)}` },
      },
    };
  },
  ks = (e3) => {
    const {
        componentCls: t2,
        inputAffixPadding: o2,
        colorTextDescription: n2,
        motionDurationSlow: r2,
        colorIcon: l2,
        colorIconHover: a2,
      } = e3,
      i2 = `${t2}-affix-wrapper`,
      s2 = `${t2}-affix-wrapper-disabled`;
    return {
      [i2]: {
        ...Cs(e3),
        display: "inline-flex",
        "&-focused, &:focus": { zIndex: 1 },
        [`> input${t2}`]: { padding: 0 },
        [`> input${t2}, > textarea${t2}`]: {
          fontSize: "inherit",
          border: "none",
          borderRadius: 0,
          outline: "none",
          background: "transparent",
          color: "inherit",
          "&::-ms-reveal": { display: "none" },
          "&:focus": { boxShadow: "none !important" },
        },
        "&::before": { display: "inline-block", width: 0, visibility: "hidden", content: '"\\a0"' },
        [t2]: {
          "&-prefix, &-suffix": {
            display: "flex",
            flex: "none",
            alignItems: "center",
            "> *:not(:last-child)": { marginInlineEnd: e3.paddingXS },
          },
          "&-show-count-suffix": { color: n2, direction: "ltr" },
          "&-show-count-has-suffix": { marginInlineEnd: e3.paddingXXS },
          "&-prefix": { marginInlineEnd: o2 },
          "&-suffix": { marginInlineStart: o2 },
          "&-password-icon": {
            display: "inline-flex",
            color: l2,
            cursor: "pointer",
            transition: `all ${r2}`,
            "&:hover": { color: a2 },
          },
        },
        ...Es(e3),
      },
      [`${t2}-underlined`]: { borderRadius: 0 },
      [s2]: {
        [`${t2}-password-icon`]: { color: l2, cursor: "not-allowed", "&:hover": { color: l2 } },
      },
    };
  },
  Ns = (e3) => {
    const { componentCls: t2, borderRadiusLG: o2, borderRadiusSM: n2 } = e3;
    return {
      [`${t2}-group`]: {
        ...ve(e3),
        ...ws(e3),
        "&-rtl": { direction: "rtl" },
        "&-wrapper": {
          display: "inline-block",
          width: "100%",
          textAlign: "start",
          verticalAlign: "top",
          "&-rtl": { direction: "rtl" },
          "&-lg": { [`${t2}-group-addon`]: { borderRadius: o2, fontSize: e3.inputFontSizeLG } },
          "&-sm": { [`${t2}-group-addon`]: { borderRadius: n2 } },
          ...as(e3),
          ...hs(e3),
          [`&:not(${t2}-compact-first-item):not(${t2}-compact-last-item)${t2}-compact-item`]: {
            [`${t2}, ${t2}-group-addon`]: { borderRadius: 0 },
          },
          [`&:not(${t2}-compact-last-item)${t2}-compact-first-item`]: {
            [`${t2}, ${t2}-group-addon`]: { borderStartEndRadius: 0, borderEndEndRadius: 0 },
          },
          [`&:not(${t2}-compact-first-item)${t2}-compact-last-item`]: {
            [`${t2}, ${t2}-group-addon`]: { borderStartStartRadius: 0, borderEndStartRadius: 0 },
          },
          [`&:not(${t2}-compact-last-item)${t2}-compact-item`]: {
            [`${t2}-affix-wrapper`]: { borderStartEndRadius: 0, borderEndEndRadius: 0 },
          },
          [`&:not(${t2}-compact-first-item)${t2}-compact-item`]: {
            [`${t2}-affix-wrapper`]: { borderStartStartRadius: 0, borderEndStartRadius: 0 },
          },
        },
      },
    };
  },
  Is = (e3) => {
    const { componentCls: t2 } = e3;
    return {
      [`${t2}-out-of-range`]: {
        [`&, & input, & textarea, ${t2}-show-count-suffix, ${t2}-data-count`]: {
          color: e3.colorError,
        },
      },
    };
  },
  Bs = Y(
    ["Input", "Shared"],
    (e3) => {
      const t2 = q(e3, Ji(e3));
      return [Ss(t2), ks(t2)];
    },
    Qi,
    { resetFont: !1 },
  ),
  Rs = Y(
    ["Input", "Component"],
    (e3) => {
      const t2 = q(e3, Ji(e3));
      return [
        Ns(t2),
        Is(t2),
        ee(t2, { focus: !0, focusElCls: `${t2.componentCls}-affix-wrapper-focused` }),
      ];
    },
    Qi,
    { resetFont: !1 },
  ),
  Ts = {
    icon: {
      tag: "svg",
      attrs: { viewBox: "64 64 896 896", focusable: "false" },
      children: [
        { tag: "path", attrs: { d: "M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z" } },
        { tag: "path", attrs: { d: "M192 474h672q8 0 8 8v60q0 8-8 8H160q-8 0-8-8v-60q0-8 8-8z" } },
      ],
    },
    name: "plus",
    theme: "outlined",
  };
function Ms() {
  return (
    (Ms = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    Ms.apply(this, arguments)
  );
}
const Ps = (e3, t2) => Nt.createElement(d, Ms({}, e3, { ref: t2, icon: Ts })),
  As = Nt.forwardRef(Ps),
  Ls = Nt.createContext(null),
  Os = { width: 0, height: 0, left: 0, top: 0 };
function Ds(e3, t2) {
  const o2 = Nt.useRef(e3),
    [, n2] = Nt.useState({});
  return [
    o2.current,
    function (e4) {
      const r2 = typeof e4 == "function" ? e4(o2.current) : e4;
      r2 !== o2.current && t2(r2, o2.current), (o2.current = r2), n2({});
    },
  ];
}
const zs = 0.995 ** 20;
function Hs(e3) {
  const [t2, o2] = Nt.useState(0),
    n2 = Nt.useRef(0),
    r2 = Nt.useRef(void 0);
  return (
    (r2.current = e3),
    tt(() => {
      var e4;
      (e4 = r2.current) == null || e4.call(r2);
    }, [t2]),
    () => {
      n2.current === t2 && ((n2.current += 1), o2(n2.current));
    }
  );
}
const js = { width: 0, height: 0, left: 0, top: 0, right: 0 };
function _s(e3) {
  let t2;
  return (
    e3 instanceof Map
      ? ((t2 = {}),
        e3.forEach((e4, o2) => {
          t2[o2] = e4;
        }))
      : (t2 = e3),
    JSON.stringify(t2)
  );
}
function Ks(e3) {
  return String(e3).replace(/"/g, "TABS_DQ");
}
function Ws(e3, t2, o2, n2) {
  return !(!o2 || n2 || e3 === !1 || (e3 === void 0 && (t2 === !1 || t2 === null)));
}
const Fs = Nt.forwardRef((e3, t2) => {
    const { prefixCls: o2, editable: n2, locale: r2, style: l2 } = e3;
    return n2 && n2.showAdd !== !1
      ? Nt.createElement(
          "button",
          {
            ref: t2,
            type: "button",
            className: `${o2}-nav-add`,
            style: l2,
            "aria-label": r2?.addAriaLabel || "Add tab",
            onClick: (e4) => {
              n2.onEdit("add", { event: e4 });
            },
          },
          n2.addIcon || "+",
        )
      : null;
  }),
  Gs = Nt.forwardRef((e3, t2) => {
    const { position: o2, prefixCls: n2, extra: r2 } = e3;
    if (!r2) return null;
    let l2,
      a2 = {};
    return (
      typeof r2 != "object" || Nt.isValidElement(r2) ? (a2.right = r2) : (a2 = r2),
      o2 === "right" && (l2 = a2.right),
      o2 === "left" && (l2 = a2.left),
      l2 ? Nt.createElement("div", { className: `${n2}-extra-content`, ref: t2 }, l2) : null
    );
  });
function qs() {
  return (
    (qs = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    qs.apply(this, arguments)
  );
}
const Vs = Nt.forwardRef((e3, t2) => {
    const {
        prefixCls: o2,
        id: n2,
        tabs: r2,
        locale: l2,
        mobile: a2,
        more: i2 = {},
        style: s2,
        className: c2,
        editable: d2,
        tabBarGutter: u2,
        rtl: p2,
        removeAriaLabel: m2,
        onTabClick: f2,
        getPopupContainer: h2,
        popupClassName: g2,
        popupStyle: b2,
        classNames: v2,
        styles: y2,
      } = e3,
      [$2, x2] = Nt.useState(!1),
      [C2, w2] = Nt.useState(null),
      { icon: S2 = "More", popupRender: E2 } = i2,
      k2 = `${n2}-more-popup`,
      N2 = `${o2}-dropdown`,
      I2 = C2 !== null ? `${k2}-${C2}` : null,
      B2 = l2?.dropdownAriaLabel,
      R2 = Nt.createElement(
        Qa,
        {
          onClick: ({ key: e4, domEvent: t3 }) => {
            f2(e4, t3), x2(!1);
          },
          prefixCls: `${N2}-menu`,
          id: k2,
          tabIndex: -1,
          role: "listbox",
          "aria-activedescendant": I2,
          selectedKeys: [C2],
          "aria-label": B2 !== void 0 ? B2 : "expanded dropdown",
        },
        r2.map((e4) => {
          const { closable: t3, disabled: o3, closeIcon: r3, key: l3, label: a3 } = e4,
            i3 = Ws(t3, r3, d2, o3);
          return Nt.createElement(
            Ia,
            {
              key: l3,
              id: `${k2}-${l3}`,
              role: "option",
              "aria-controls": n2 && `${n2}-panel-${l3}`,
              disabled: o3,
            },
            Nt.createElement("span", null, a3),
            i3 &&
              Nt.createElement(
                "button",
                {
                  type: "button",
                  "aria-label": m2 || "remove",
                  tabIndex: 0,
                  className: P(`${N2}-menu-item-remove`, v2?.remove),
                  style: y2?.remove,
                  onClick: (e5) => {
                    e5.stopPropagation(),
                      (function (e6, t4) {
                        e6.preventDefault(),
                          e6.stopPropagation(),
                          d2.onEdit("remove", { key: t4, event: e6 });
                      })(e5, l3);
                  },
                },
                r3 || d2.removeIcon || "\xD7",
              ),
          );
        }),
      ),
      T2 = E2 ? E2(R2, { restTabs: r2, onClose: () => x2(!1) }) : R2;
    function M2(e4) {
      const t3 = r2.filter((e5) => !e5.disabled);
      let o3 = t3.findIndex((e5) => e5.key === C2) || 0;
      const n3 = t3.length;
      for (let r3 = 0; r3 < n3; r3 += 1) {
        o3 = (o3 + e4 + n3) % n3;
        const r4 = t3[o3];
        if (!r4.disabled) return void w2(r4.key);
      }
    }
    Nt.useEffect(() => {
      const e4 = document.getElementById(I2);
      e4?.scrollIntoView && e4.scrollIntoView(!1);
    }, [I2, C2]),
      Nt.useEffect(() => {
        $2 || w2(null);
      }, [$2]);
    const A2 = { marginInlineStart: u2 };
    r2.length || ((A2.visibility = "hidden"), (A2.order = 1));
    const L2 = P(g2, { [`${N2}-rtl`]: p2 }),
      O2 = a2
        ? null
        : Nt.createElement(
            Wl,
            qs(
              {
                prefixCls: N2,
                overlay: T2,
                visible: !!r2.length && $2,
                onVisibleChange: x2,
                overlayClassName: L2,
                overlayStyle: b2,
                mouseEnterDelay: 0.1,
                mouseLeaveDelay: 0.1,
                getPopupContainer: h2,
              },
              i2,
            ),
            Nt.createElement(
              "button",
              {
                type: "button",
                className: `${o2}-nav-more`,
                style: A2,
                "aria-haspopup": "listbox",
                "aria-controls": k2,
                id: `${n2}-more`,
                "aria-expanded": $2,
                onKeyDown: function (e4) {
                  const { which: t3 } = e4;
                  if ($2)
                    switch (t3) {
                      case Pe.UP:
                        M2(-1), e4.preventDefault();
                        break;
                      case Pe.DOWN:
                        M2(1), e4.preventDefault();
                        break;
                      case Pe.ESC:
                        x2(!1);
                        break;
                      case Pe.SPACE:
                      case Pe.ENTER:
                        C2 !== null && f2(C2, e4);
                    }
                  else [Pe.DOWN, Pe.SPACE, Pe.ENTER].includes(t3) && (x2(!0), e4.preventDefault());
                },
              },
              S2,
            ),
          );
    return Nt.createElement(
      "div",
      { className: P(`${o2}-nav-operations`, c2), style: s2, ref: t2 },
      O2,
      Nt.createElement(Fs, { prefixCls: o2, locale: l2, editable: d2 }),
    );
  }),
  Xs = Nt.memo(Vs, (e3, t2) => t2.tabMoving),
  Us = (e3) => {
    const {
        prefixCls: t2,
        id: o2,
        active: n2,
        focus: r2,
        tab: { key: l2, label: a2, disabled: i2, closeIcon: s2, icon: c2 },
        closable: d2,
        renderWrapper: u2,
        removeAriaLabel: p2,
        editable: m2,
        onClick: f2,
        onFocus: h2,
        onBlur: g2,
        onKeyDown: b2,
        onMouseDown: v2,
        onMouseUp: y2,
        styles: $2,
        classNames: x2,
        tabCount: C2,
        currentPosition: w2,
      } = e3,
      S2 = `${t2}-tab`,
      E2 = Ws(d2, s2, m2, i2);
    function k2(e4) {
      i2 || f2(e4);
    }
    const N2 = Nt.useMemo(
        () => (c2 && typeof a2 == "string" ? Nt.createElement("span", null, a2) : a2),
        [a2, c2],
      ),
      I2 = Nt.useRef(null);
    Nt.useEffect(() => {
      r2 && I2.current && I2.current.focus();
    }, [r2]);
    const B2 = Nt.createElement(
      "div",
      {
        key: l2,
        "data-node-key": Ks(l2),
        className: P(S2, x2?.item, {
          [`${S2}-with-remove`]: E2,
          [`${S2}-active`]: n2,
          [`${S2}-disabled`]: i2,
          [`${S2}-focus`]: r2,
        }),
        style: $2?.item,
        onClick: k2,
      },
      Nt.createElement(
        "div",
        {
          ref: I2,
          role: "tab",
          "aria-selected": n2,
          id: o2 && `${o2}-tab-${l2}`,
          className: `${S2}-btn`,
          "aria-controls": o2 && `${o2}-panel-${l2}`,
          "aria-disabled": i2,
          tabIndex: i2 ? null : n2 ? 0 : -1,
          onClick: (e4) => {
            e4.stopPropagation(), k2(e4);
          },
          onKeyDown: b2,
          onMouseDown: v2,
          onMouseUp: y2,
          onFocus: h2,
          onBlur: g2,
        },
        r2 &&
          Nt.createElement(
            "div",
            {
              "aria-live": "polite",
              style: { width: 0, height: 0, position: "absolute", overflow: "hidden", opacity: 0 },
            },
            `Tab ${w2} of ${C2}`,
          ),
        c2 && Nt.createElement("span", { className: `${S2}-icon` }, c2),
        a2 && N2,
      ),
      E2 &&
        Nt.createElement(
          "button",
          {
            type: "button",
            "aria-label": p2 || "remove",
            tabIndex: n2 ? 0 : -1,
            className: P(`${S2}-remove`, x2?.remove),
            style: $2?.remove,
            onClick: (e4) => {
              var t3;
              e4.stopPropagation(),
                (t3 = e4).preventDefault(),
                t3.stopPropagation(),
                m2.onEdit("remove", { key: l2, event: t3 });
            },
          },
          s2 || m2.removeIcon || "\xD7",
        ),
    );
    return u2 ? u2(B2) : B2;
  };
function Ys() {
  return (
    (Ys = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    Ys.apply(this, arguments)
  );
}
const Zs = (e3) => {
    const { offsetWidth: t2 = 0, offsetHeight: o2 = 0 } = e3.current || {};
    if (e3.current) {
      const { width: o3, height: n2 } = e3.current.getBoundingClientRect();
      if (Math.abs(o3 - t2) < 1) return [o3, n2];
    }
    return [t2, o2];
  },
  Js = (e3, t2) => e3[t2 ? 0 : 1],
  Qs = Nt.forwardRef((e3, t2) => {
    const {
        className: o2,
        style: l2,
        id: a2,
        animated: i2,
        activeKey: s2,
        rtl: c2,
        extra: d2,
        editable: u2,
        locale: p2,
        tabPosition: m2,
        tabBarGutter: f2,
        children: h2,
        onTabClick: g2,
        onTabScroll: b2,
        indicator: v2,
        classNames: y2,
        styles: $2,
      } = e3,
      { prefixCls: x2, tabs: C2 } = Nt.useContext(Ls),
      w2 = Nt.useRef(null),
      S2 = Nt.useRef(null),
      E2 = Nt.useRef(null),
      k2 = Nt.useRef(null),
      N2 = Nt.useRef(null),
      I2 = Nt.useRef(null),
      B2 = Nt.useRef(null),
      R2 = m2 === "top" || m2 === "bottom",
      [T2, M2] = Ds(0, (e4, t3) => {
        R2 && b2 && b2({ direction: e4 > t3 ? "left" : "right" });
      }),
      [A2, L2] = Ds(0, (e4, t3) => {
        !R2 && b2 && b2({ direction: e4 > t3 ? "top" : "bottom" });
      }),
      [O2, D2] = Nt.useState([0, 0]),
      [z2, H2] = Nt.useState([0, 0]),
      [j2, _2] = Nt.useState([0, 0]),
      [K2, W2] = Nt.useState([0, 0]),
      [F2, G2] = (function (e4) {
        const t3 = Nt.useRef([]),
          [, o3] = Nt.useState({}),
          n2 = Nt.useRef(typeof e4 == "function" ? e4() : e4),
          r2 = Hs(() => {
            let e5 = n2.current;
            t3.current.forEach((t4) => {
              e5 = t4(e5);
            }),
              (t3.current = []),
              (n2.current = e5),
              o3({});
          });
        return [
          n2.current,
          function (e5) {
            t3.current.push(e5), r2();
          },
        ];
      })(new Map()),
      q2 = (function (e4, t3, o3) {
        return Nt.useMemo(() => {
          var o4, n2;
          const r2 = new Map(),
            l3 = t3.get((o4 = e4[0]) == null ? void 0 : o4.key) || Os,
            a3 = l3.left + l3.width;
          for (let i3 = 0; i3 < e4.length; i3 += 1) {
            const { key: o5 } = e4[i3];
            let l4 = t3.get(o5);
            l4 || (l4 = t3.get((n2 = e4[i3 - 1]) == null ? void 0 : n2.key) || Os);
            const s3 = r2.get(o5) || { ...l4 };
            (s3.right = a3 - s3.left - s3.width), r2.set(o5, s3);
          }
          return r2;
        }, [e4.map((e5) => e5.key).join("_"), t3, o3]);
      })(C2, F2, z2[0]),
      V2 = Js(O2, R2),
      X2 = Js(z2, R2),
      U2 = Js(j2, R2),
      Y2 = Js(K2, R2),
      Z2 = Math.floor(V2) < Math.floor(X2 + U2),
      J2 = Z2 ? V2 - Y2 : V2 - U2,
      Q2 = `${x2}-nav-operations-hidden`;
    let ee2 = 0,
      te2 = 0;
    function oe2(e4) {
      return e4 < ee2 ? ee2 : e4 > te2 ? te2 : e4;
    }
    R2 && c2
      ? ((ee2 = 0), (te2 = Math.max(0, X2 - J2)))
      : ((ee2 = Math.min(0, J2 - X2)), (te2 = 0));
    const ne2 = Nt.useRef(null),
      [le2, ae2] = Nt.useState();
    function ie2() {
      ae2(Date.now());
    }
    function se2() {
      ne2.current && clearTimeout(ne2.current);
    }
    (function (e4, t3) {
      const [o3, n2] = Nt.useState(),
        [r2, l3] = Nt.useState(0),
        [a3, i3] = Nt.useState(0),
        [s3, c3] = Nt.useState(),
        d3 = Nt.useRef(void 0),
        u3 = Nt.useRef(void 0),
        p3 = Nt.useRef(null);
      (p3.current = {
        onTouchStart: function (e5) {
          const { screenX: t4, screenY: o4 } = e5.touches[0];
          n2({ x: t4, y: o4 }), window.clearInterval(d3.current);
        },
        onTouchMove: function (e5) {
          if (!o3) return;
          const { screenX: a4, screenY: s4 } = e5.touches[0];
          n2({ x: a4, y: s4 });
          const d4 = a4 - o3.x,
            u4 = s4 - o3.y;
          t3(d4, u4);
          const p4 = Date.now();
          l3(p4), i3(p4 - r2), c3({ x: d4, y: u4 });
        },
        onTouchEnd: function () {
          if (o3 && (n2(null), c3(null), s3)) {
            const e5 = s3.x / a3,
              o4 = s3.y / a3,
              n3 = Math.abs(e5),
              r3 = Math.abs(o4);
            if (Math.max(n3, r3) < 0.1) return;
            let l4 = e5,
              i4 = o4;
            d3.current = window.setInterval(() => {
              Math.abs(l4) < 0.01 && Math.abs(i4) < 0.01
                ? window.clearInterval(d3.current)
                : ((l4 *= zs), (i4 *= zs), t3(20 * l4, 20 * i4));
            }, 20);
          }
        },
        onWheel: function (e5) {
          const { deltaX: o4, deltaY: n3 } = e5;
          let r3;
          const l4 = Math.abs(o4),
            a4 = Math.abs(n3);
          l4 === a4
            ? (r3 = u3.current === "x" ? o4 : n3)
            : l4 > a4
              ? ((r3 = o4), (u3.current = "x"))
              : ((r3 = n3), (u3.current = "y")),
            t3(-r3, -r3) && e5.preventDefault();
        },
      }),
        Nt.useEffect(() => {
          function t4(e5) {
            p3.current.onTouchMove(e5);
          }
          function o4(e5) {
            p3.current.onTouchEnd(e5);
          }
          return (
            document.addEventListener("touchmove", t4, { passive: !1 }),
            document.addEventListener("touchend", o4, { passive: !0 }),
            e4.current.addEventListener(
              "touchstart",
              function (e5) {
                p3.current.onTouchStart(e5);
              },
              { passive: !0 },
            ),
            e4.current.addEventListener(
              "wheel",
              function (e5) {
                p3.current.onWheel(e5);
              },
              { passive: !1 },
            ),
            () => {
              document.removeEventListener("touchmove", t4),
                document.removeEventListener("touchend", o4);
            }
          );
        }, []);
    })(k2, (e4, t3) => {
      function o3(e5, t4) {
        e5((e6) => oe2(e6 + t4));
      }
      return !!Z2 && (R2 ? o3(M2, e4) : o3(L2, t3), se2(), ie2(), !0);
    }),
      Nt.useEffect(
        () => (
          se2(),
          le2 &&
            (ne2.current = setTimeout(() => {
              ae2(0);
            }, 100)),
          se2
        ),
        [le2],
      );
    const [ce2, de2] = (function (e4, t3, o3, n2, r2, l3, { tabs: a3, tabPosition: i3, rtl: s3 }) {
        let c3, d3, u3;
        return (
          ["top", "bottom"].includes(i3)
            ? ((c3 = "width"), (d3 = s3 ? "right" : "left"), (u3 = Math.abs(o3)))
            : ((c3 = "height"), (d3 = "top"), (u3 = -o3)),
          Nt.useMemo(() => {
            if (!a3.length) return [0, 0];
            const o4 = a3.length;
            let n3 = o4;
            for (let l4 = 0; l4 < o4; l4 += 1) {
              const o5 = e4.get(a3[l4].key) || js;
              if (Math.floor(o5[d3] + o5[c3]) > Math.floor(u3 + t3)) {
                n3 = l4 - 1;
                break;
              }
            }
            let r3 = 0;
            for (let t4 = o4 - 1; t4 >= 0; t4 -= 1)
              if ((e4.get(a3[t4].key) || js)[d3] < u3) {
                r3 = t4 + 1;
                break;
              }
            return r3 > n3 ? [0, -1] : [r3, n3];
          }, [e4, t3, n2, r2, l3, u3, i3, a3.map((e5) => e5.key).join("_"), s3])
        );
      })(q2, J2, R2 ? T2 : A2, X2, U2, Y2, { ...e3, tabs: C2 }),
      ue2 = n((e4 = s2) => {
        const t3 = q2.get(e4) || { width: 0, height: 0, left: 0, right: 0, top: 0 };
        if (R2) {
          let e5 = T2;
          c2
            ? t3.right < T2
              ? (e5 = t3.right)
              : t3.right + t3.width > T2 + J2 && (e5 = t3.right + t3.width - J2)
            : t3.left < -T2
              ? (e5 = -t3.left)
              : t3.left + t3.width > -T2 + J2 && (e5 = -(t3.left + t3.width - J2)),
            L2(0),
            M2(oe2(e5));
        } else {
          let e5 = A2;
          t3.top < -A2
            ? (e5 = -t3.top)
            : t3.top + t3.height > -A2 + J2 && (e5 = -(t3.top + t3.height - J2)),
            M2(0),
            L2(oe2(e5));
        }
      }),
      [pe2, me2] = Nt.useState(),
      [fe2, he2] = Nt.useState(!1),
      ge2 = C2.filter((e4) => !e4.disabled).map((e4) => e4.key),
      be2 = (e4) => {
        const t3 = ge2.indexOf(pe2 || s2),
          o3 = ge2.length,
          n2 = ge2[(t3 + e4 + o3) % o3];
        me2(n2);
      },
      ve2 = (e4, t3) => {
        const o3 = ge2.indexOf(e4),
          n2 = C2.find((t4) => t4.key === e4);
        Ws(n2?.closable, n2?.closeIcon, u2, n2?.disabled) &&
          (t3.preventDefault(),
          t3.stopPropagation(),
          u2.onEdit("remove", { key: e4, event: t3 }),
          o3 === ge2.length - 1 ? be2(-1) : be2(1));
      },
      ye2 = (e4) => {
        const { code: t3 } = e4,
          o3 = c2 && R2,
          n2 = ge2[0],
          r2 = ge2[ge2.length - 1];
        switch (t3) {
          case "ArrowLeft":
            R2 && be2(o3 ? 1 : -1);
            break;
          case "ArrowRight":
            R2 && be2(o3 ? -1 : 1);
            break;
          case "ArrowUp":
            e4.preventDefault(), R2 || be2(-1);
            break;
          case "ArrowDown":
            e4.preventDefault(), R2 || be2(1);
            break;
          case "Home":
            e4.preventDefault(), me2(n2);
            break;
          case "End":
            e4.preventDefault(), me2(r2);
            break;
          case "Enter":
          case "Space":
            e4.preventDefault(), g2(pe2 ?? s2, e4);
            break;
          case "Backspace":
          case "Delete":
            ve2(pe2, e4);
        }
      },
      $e2 = {};
    R2 ? ($e2.marginInlineStart = f2) : ($e2.marginTop = f2);
    const xe2 = C2.map((e4, t3) => {
        const { key: o3 } = e4;
        return Nt.createElement(Us, {
          id: a2,
          prefixCls: x2,
          key: o3,
          tab: e4,
          classNames: { item: y2?.item, remove: y2?.remove },
          styles: { item: t3 === 0 ? $2?.item : { ...$e2, ...$2?.item }, remove: $2?.remove },
          closable: e4.closable,
          editable: u2,
          active: o3 === s2,
          focus: o3 === pe2,
          renderWrapper: h2,
          removeAriaLabel: p2?.removeAriaLabel,
          tabCount: ge2.length,
          currentPosition: t3 + 1,
          onClick: (e5) => {
            g2(o3, e5);
          },
          onKeyDown: ye2,
          onFocus: () => {
            fe2 || me2(o3),
              ue2(o3),
              ie2(),
              k2.current && (c2 || (k2.current.scrollLeft = 0), (k2.current.scrollTop = 0));
          },
          onBlur: () => {
            me2(void 0);
          },
          onMouseDown: (e5) =>
            ((e6, t4) => {
              he2(!0), t4.button === 1 && ve2(e6, t4);
            })(o3, e5),
          onMouseUp: () => {
            he2(!1);
          },
        });
      }),
      Ce2 = () =>
        G2(() => {
          var e4;
          const t3 = new Map(),
            o3 = (e4 = N2.current) == null ? void 0 : e4.getBoundingClientRect();
          return (
            C2.forEach(({ key: e5 }) => {
              var n2;
              const r2 =
                (n2 = N2.current) == null
                  ? void 0
                  : n2.querySelector(`[data-node-key="${Ks(e5)}"]`);
              if (r2) {
                const [n3, l3, a3, i3] = ((e6, t4) => {
                  const { offsetWidth: o4, offsetHeight: n4, offsetTop: r3, offsetLeft: l4 } = e6,
                    { width: a4, height: i4, left: s3, top: c3 } = e6.getBoundingClientRect();
                  return Math.abs(a4 - o4) < 1
                    ? [a4, i4, s3 - t4.left, c3 - t4.top]
                    : [o4, n4, l4, r3];
                })(r2, o3);
                t3.set(e5, { width: n3, height: l3, left: a3, top: i3 });
              }
            }),
            t3
          );
        });
    Nt.useEffect(() => {
      Ce2();
    }, [C2.map((e4) => e4.key).join("_")]);
    const we2 = Hs(() => {
        const e4 = Zs(w2),
          t3 = Zs(S2),
          o3 = Zs(E2);
        D2([e4[0] - t3[0] - o3[0], e4[1] - t3[1] - o3[1]]);
        const n2 = Zs(B2);
        _2(n2);
        const r2 = Zs(I2);
        W2(r2);
        const l3 = Zs(N2);
        H2([l3[0] - n2[0], l3[1] - n2[1]]), Ce2();
      }),
      Se2 = [...C2.slice(0, ce2), ...C2.slice(de2 + 1)],
      Ee2 = q2.get(s2),
      { style: ke2 } = ((e4) => {
        const { activeTabOffset: t3, horizontal: o3, rtl: n2, indicator: l3 = {} } = e4,
          { size: a3, align: i3 = "center" } = l3,
          [s3, c3] = Nt.useState(),
          d3 = Nt.useRef(void 0),
          u3 = It.useCallback(
            (e5) => (typeof a3 == "function" ? a3(e5) : typeof a3 == "number" ? a3 : e5),
            [a3],
          );
        function p3() {
          r.cancel(d3.current);
        }
        return (
          Nt.useEffect(() => {
            const e5 = {};
            if (t3)
              if (o3) {
                e5.width = u3(t3.width);
                const o4 = n2 ? "right" : "left";
                i3 === "start" && (e5[o4] = t3[o4]),
                  i3 === "center" &&
                    ((e5[o4] = t3[o4] + t3.width / 2),
                    (e5.transform = n2 ? "translateX(50%)" : "translateX(-50%)")),
                  i3 === "end" &&
                    ((e5[o4] = t3[o4] + t3.width), (e5.transform = "translateX(-100%)"));
              } else
                (e5.height = u3(t3.height)),
                  i3 === "start" && (e5.top = t3.top),
                  i3 === "center" &&
                    ((e5.top = t3.top + t3.height / 2), (e5.transform = "translateY(-50%)")),
                  i3 === "end" &&
                    ((e5.top = t3.top + t3.height), (e5.transform = "translateY(-100%)"));
            return (
              p3(),
              (d3.current = r(() => {
                (s3 &&
                  e5 &&
                  Object.keys(e5).every((t4) => {
                    const o4 = e5[t4],
                      n3 = s3[t4];
                    return typeof o4 == "number" && typeof n3 == "number"
                      ? Math.round(o4) === Math.round(n3)
                      : o4 === n3;
                  })) ||
                  c3(e5);
              })),
              p3
            );
          }, [JSON.stringify(t3), o3, n2, i3, u3]),
          { style: s3 }
        );
      })({ activeTabOffset: Ee2, horizontal: R2, indicator: v2, rtl: c2 });
    Nt.useEffect(() => {
      ue2();
    }, [s2, ee2, te2, _s(Ee2), _s(q2), R2]),
      Nt.useEffect(() => {
        we2();
      }, [c2]);
    const Ne2 = !!Se2.length,
      Ie2 = `${x2}-nav-wrap`;
    let Be2, Re2, Te2, Me2;
    return (
      R2
        ? c2
          ? ((Re2 = T2 > 0), (Be2 = T2 !== te2))
          : ((Be2 = T2 < 0), (Re2 = T2 !== ee2))
        : ((Te2 = A2 < 0), (Me2 = A2 !== ee2)),
      Nt.createElement(
        ot,
        { onResize: we2 },
        Nt.createElement(
          "div",
          {
            ref: re(t2, w2),
            role: "tablist",
            "aria-orientation": R2 ? "horizontal" : "vertical",
            className: P(`${x2}-nav`, o2, y2?.header),
            style: { ...$2?.header, ...l2 },
            onKeyDown: () => {
              ie2();
            },
          },
          Nt.createElement(Gs, { ref: S2, position: "left", extra: d2, prefixCls: x2 }),
          Nt.createElement(
            ot,
            { onResize: we2 },
            Nt.createElement(
              "div",
              {
                className: P(Ie2, {
                  [`${Ie2}-ping-left`]: Be2,
                  [`${Ie2}-ping-right`]: Re2,
                  [`${Ie2}-ping-top`]: Te2,
                  [`${Ie2}-ping-bottom`]: Me2,
                }),
                ref: k2,
              },
              Nt.createElement(
                ot,
                { onResize: we2 },
                Nt.createElement(
                  "div",
                  {
                    ref: N2,
                    className: `${x2}-nav-list`,
                    style: {
                      transform: `translate(${T2}px, ${A2}px)`,
                      transition: le2 ? "none" : void 0,
                    },
                  },
                  xe2,
                  Nt.createElement(Fs, {
                    ref: B2,
                    prefixCls: x2,
                    locale: p2,
                    editable: u2,
                    style: {
                      ...(xe2.length === 0 ? void 0 : $e2),
                      visibility: Ne2 ? "hidden" : null,
                    },
                  }),
                  Nt.createElement("div", {
                    className: P(`${x2}-ink-bar`, y2?.indicator, {
                      [`${x2}-ink-bar-animated`]: i2.inkBar,
                    }),
                    style: { ...ke2, ...$2?.indicator },
                  }),
                ),
              ),
            ),
          ),
          Nt.createElement(
            Xs,
            Ys({}, e3, {
              removeAriaLabel: p2?.removeAriaLabel,
              ref: I2,
              prefixCls: x2,
              tabs: Se2,
              className: !Ne2 && Q2,
              popupStyle: $2?.popup,
              tabMoving: !!le2,
            }),
          ),
          Nt.createElement(Gs, { ref: E2, position: "right", extra: d2, prefixCls: x2 }),
        ),
      )
    );
  }),
  ec = ({ renderTabBar: e3, ...t2 }) => (e3 ? e3(t2, Qs) : Nt.createElement(Qs, t2)),
  tc = Nt.forwardRef((e3, t2) => {
    const {
        prefixCls: o2,
        className: n2,
        style: r2,
        id: l2,
        active: a2,
        tabKey: i2,
        children: s2,
      } = e3,
      c2 = Nt.Children.count(s2) > 0;
    return Nt.createElement(
      "div",
      {
        id: l2 && `${l2}-panel-${i2}`,
        role: "tabpanel",
        tabIndex: a2 && c2 ? 0 : -1,
        "aria-labelledby": l2 && `${l2}-tab-${i2}`,
        "aria-hidden": !a2,
        style: r2,
        className: P(o2, a2 && `${o2}-active`, n2),
        ref: t2,
      },
      s2,
    );
  });
function oc() {
  return (
    (oc = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    oc.apply(this, arguments)
  );
}
const nc = (e3) => {
  const {
      id: t2,
      activeKey: o2,
      animated: n2,
      tabPosition: r2,
      destroyOnHidden: l2,
      bodyStyle: a2,
      bodyClassName: i2,
      contentStyle: s2,
      contentClassName: c2,
    } = e3,
    { prefixCls: d2, tabs: u2 } = Nt.useContext(Ls),
    p2 = n2.tabPane,
    m2 = `${d2}-body`,
    f2 = `${d2}-content`;
  return Nt.createElement(
    "div",
    { className: P(`${m2}-holder`) },
    Nt.createElement(
      "div",
      { className: P(m2, `${m2}-${r2}`, { [`${m2}-animated`]: p2 }, i2), style: a2 },
      u2.map((e4) => {
        const {
            key: r3,
            forceRender: a3,
            style: i3,
            className: d3,
            destroyOnHidden: u3,
            ...m3
          } = e4,
          h2 = r3 === o2;
        return Nt.createElement(
          R,
          oc(
            {
              key: r3,
              visible: h2,
              forceRender: a3,
              removeOnLeave: !!(l2 ?? u3),
              leavedClassName: `${f2}-hidden`,
            },
            n2.tabPaneMotion,
          ),
          ({ style: e5, className: o3 }, n3) =>
            Nt.createElement(
              tc,
              oc({}, m3, {
                prefixCls: f2,
                id: t2,
                tabKey: r3,
                animated: p2,
                active: h2,
                style: { ...s2, ...i3, ...e5 },
                className: P(c2, d3, o3),
                ref: n3,
              }),
            ),
        );
      }),
    ),
  );
};
function rc() {
  return (
    (rc = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    rc.apply(this, arguments)
  );
}
let lc = 0;
const ac = Nt.forwardRef((e3, t2) => {
    var o2;
    const {
        id: n2,
        prefixCls: r2 = "rc-tabs",
        className: l2,
        items: a2,
        direction: s2,
        activeKey: c2,
        defaultActiveKey: d2,
        editable: u2,
        animated: p2,
        tabPosition: m2 = "top",
        tabBarGutter: f2,
        tabBarStyle: h2,
        tabBarExtraContent: g2,
        locale: b2,
        more: v2,
        destroyOnHidden: y2,
        renderTabBar: $2,
        onChange: x2,
        onTabClick: C2,
        onTabScroll: w2,
        getPopupContainer: S2,
        popupClassName: E2,
        indicator: k2,
        classNames: N2,
        styles: I2,
        ...B2
      } = e3,
      R2 = Nt.useMemo(
        () => (a2 || []).filter((e4) => e4 && typeof e4 == "object" && "key" in e4),
        [a2],
      ),
      T2 = s2 === "rtl",
      M2 = (function (e4 = { inkBar: !0, tabPane: !1 }) {
        let t3;
        return (
          (t3 =
            e4 === !1
              ? { inkBar: !1, tabPane: !1 }
              : e4 === !0
                ? { inkBar: !0, tabPane: !1 }
                : { inkBar: !0, ...(typeof e4 == "object" ? e4 : {}) }),
          t3.tabPaneMotion && t3.tabPane === void 0 && (t3.tabPane = !0),
          !t3.tabPaneMotion && t3.tabPane && (t3.tabPane = !1),
          t3
        );
      })(p2),
      [A2, L2] = Nt.useState(!1);
    Nt.useEffect(() => {
      L2((Kt === void 0 && (Kt = i()), Kt));
    }, []);
    const [O2, D2] = Me(d2 ?? ((o2 = R2[0]) == null ? void 0 : o2.key), c2),
      [z2, H2] = Nt.useState(() => R2.findIndex((e4) => e4.key === O2));
    Nt.useEffect(() => {
      var e4;
      let t3 = R2.findIndex((e5) => e5.key === O2);
      t3 === -1 &&
        ((t3 = Math.max(0, Math.min(z2, R2.length - 1))),
        D2((e4 = R2[t3]) == null ? void 0 : e4.key)),
        H2(t3);
    }, [R2.map((e4) => e4.key).join("_"), O2, z2]);
    const [j2, _2] = Me(null, n2);
    Nt.useEffect(() => {
      n2 || (_2(`rc-tabs-${lc}`), (lc += 1));
    }, []);
    const K2 = { id: j2, activeKey: O2, animated: M2, tabPosition: m2, rtl: T2, mobile: A2 },
      W2 = {
        ...K2,
        editable: u2,
        locale: b2,
        more: v2,
        tabBarGutter: f2,
        onTabClick: function (e4, t3) {
          C2?.(e4, t3);
          const o3 = e4 !== O2;
          D2(e4), o3 && x2?.(e4);
        },
        onTabScroll: w2,
        extra: g2,
        style: h2,
        getPopupContainer: S2,
        popupClassName: P(E2, N2?.popup),
        indicator: k2,
        styles: I2,
        classNames: N2,
      },
      F2 = Nt.useMemo(() => ({ tabs: R2, prefixCls: r2 }), [R2, r2]);
    return Nt.createElement(
      Ls.Provider,
      { value: F2 },
      Nt.createElement(
        "div",
        rc(
          {
            ref: t2,
            id: n2,
            className: P(
              r2,
              `${r2}-${m2}`,
              { [`${r2}-mobile`]: A2, [`${r2}-editable`]: u2, [`${r2}-rtl`]: T2 },
              l2,
            ),
          },
          B2,
        ),
        Nt.createElement(ec, rc({}, W2, { renderTabBar: $2 })),
        Nt.createElement(
          nc,
          rc({ destroyOnHidden: y2 }, K2, {
            bodyStyle: I2?.body,
            bodyClassName: N2?.body,
            contentStyle: I2?.content,
            contentClassName: N2?.content,
            animated: M2,
          }),
        ),
      ),
    );
  }),
  ic = { motionAppear: !1, motionEnter: !0, motionLeave: !0 },
  sc = (e3) => {
    const { componentCls: t2, motionDurationSlow: o2 } = e3;
    return [
      {
        [t2]: {
          [`${t2}-switch`]: {
            "&-appear, &-enter": {
              transition: "none",
              "&-start": { opacity: 0 },
              "&-active": { opacity: 1, transition: `opacity ${o2}` },
            },
            "&-leave": {
              position: "absolute",
              transition: "none",
              inset: 0,
              "&-start": { opacity: 1 },
              "&-active": { opacity: 0, transition: `opacity ${o2}` },
            },
          },
        },
      },
      [je(e3, "slide-up"), je(e3, "slide-down")],
    ];
  },
  cc = (e3) => {
    const {
      componentCls: t2,
      tabsCardPadding: o2,
      cardBg: n2,
      cardGutter: r2,
      colorBorderSecondary: l2,
      itemSelectedColor: a2,
    } = e3;
    return {
      [`${t2}-card`]: {
        [`> ${t2}-nav, > div > ${t2}-nav`]: {
          [`${t2}-tab`]: {
            margin: 0,
            padding: o2,
            background: n2,
            border: `${X(e3.lineWidth)} ${e3.lineType} ${l2}`,
            transition: `all ${e3.motionDurationSlow} ${e3.motionEaseInOut}`,
          },
          [`${t2}-tab-active`]: { color: a2, background: e3.colorBgContainer },
          [`${t2}-tab-focus:has(${t2}-tab-btn:focus-visible)`]: ye(e3, -3),
          [`& ${t2}-tab${t2}-tab-focus ${t2}-tab-btn:focus-visible`]: { outline: "none" },
          [`${t2}-ink-bar`]: { visibility: "hidden" },
        },
        [`&${t2}-top, &${t2}-bottom`]: {
          [`> ${t2}-nav, > div > ${t2}-nav`]: {
            [`${t2}-tab + ${t2}-tab`]: { marginLeft: { _skip_check_: !0, value: X(r2) } },
          },
        },
        [`&${t2}-top`]: {
          [`> ${t2}-nav, > div > ${t2}-nav`]: {
            [`${t2}-tab`]: { borderRadius: `${X(e3.borderRadiusLG)} ${X(e3.borderRadiusLG)} 0 0` },
            [`${t2}-tab-active`]: { borderBottomColor: e3.colorBgContainer },
          },
        },
        [`&${t2}-bottom`]: {
          [`> ${t2}-nav, > div > ${t2}-nav`]: {
            [`${t2}-tab`]: { borderRadius: `0 0 ${X(e3.borderRadiusLG)} ${X(e3.borderRadiusLG)}` },
            [`${t2}-tab-active`]: { borderTopColor: e3.colorBgContainer },
          },
        },
        [`&${t2}-left, &${t2}-right`]: {
          [`> ${t2}-nav, > div > ${t2}-nav`]: { [`${t2}-tab + ${t2}-tab`]: { marginTop: X(r2) } },
        },
        [`&${t2}-left`]: {
          [`> ${t2}-nav, > div > ${t2}-nav`]: {
            [`${t2}-tab`]: {
              borderRadius: {
                _skip_check_: !0,
                value: `${X(e3.borderRadiusLG)} 0 0 ${X(e3.borderRadiusLG)}`,
              },
            },
            [`${t2}-tab-active`]: {
              borderRightColor: { _skip_check_: !0, value: e3.colorBgContainer },
            },
          },
        },
        [`&${t2}-right`]: {
          [`> ${t2}-nav, > div > ${t2}-nav`]: {
            [`${t2}-tab`]: {
              borderRadius: {
                _skip_check_: !0,
                value: `0 ${X(e3.borderRadiusLG)} ${X(e3.borderRadiusLG)} 0`,
              },
            },
            [`${t2}-tab-active`]: {
              borderLeftColor: { _skip_check_: !0, value: e3.colorBgContainer },
            },
          },
        },
      },
    };
  },
  dc = (e3) => {
    const {
      antCls: t2,
      componentCls: o2,
      itemHoverColor: n2,
      dropdownEdgeChildVerticalPadding: r2,
    } = e3;
    return {
      [`${o2}-dropdown`]: {
        ...ve(e3),
        position: "absolute",
        top: -9999,
        left: { _skip_check_: !0, value: -9999 },
        zIndex: e3.zIndexPopup,
        display: "block",
        "&-hidden": { display: "none" },
        [`&${t2}-slide-down-enter${t2}-slide-down-enter-active${o2}-dropdown-placement-bottomLeft,
        &${t2}-slide-down-appear${t2}-slide-down-appear-active${o2}-dropdown-placement-bottomLeft,
        &${t2}-slide-down-enter${t2}-slide-down-enter-active${o2}-dropdown-placement-bottom,
        &${t2}-slide-down-appear${t2}-slide-down-appear-active${o2}-dropdown-placement-bottom,
        &${t2}-slide-down-enter${t2}-slide-down-enter-active${o2}-dropdown-placement-bottomRight,
        &${t2}-slide-down-appear${t2}-slide-down-appear-active${o2}-dropdown-placement-bottomRight`]:
          { animationName: Ke },
        [`&${t2}-slide-up-enter${t2}-slide-up-enter-active${o2}-dropdown-placement-topLeft,
        &${t2}-slide-up-appear${t2}-slide-up-appear-active${o2}-dropdown-placement-topLeft,
        &${t2}-slide-up-enter${t2}-slide-up-enter-active${o2}-dropdown-placement-top,
        &${t2}-slide-up-appear${t2}-slide-up-appear-active${o2}-dropdown-placement-top,
        &${t2}-slide-up-enter${t2}-slide-up-enter-active${o2}-dropdown-placement-topRight,
        &${t2}-slide-up-appear${t2}-slide-up-appear-active${o2}-dropdown-placement-topRight`]: {
          animationName: We,
        },
        [`&${t2}-slide-down-leave${t2}-slide-down-leave-active${o2}-dropdown-placement-bottomLeft,
        &${t2}-slide-down-leave${t2}-slide-down-leave-active${o2}-dropdown-placement-bottom,
        &${t2}-slide-down-leave${t2}-slide-down-leave-active${o2}-dropdown-placement-bottomRight`]:
          { animationName: Fe },
        [`&${t2}-slide-up-leave${t2}-slide-up-leave-active${o2}-dropdown-placement-topLeft,
        &${t2}-slide-up-leave${t2}-slide-up-leave-active${o2}-dropdown-placement-top,
        &${t2}-slide-up-leave${t2}-slide-up-leave-active${o2}-dropdown-placement-topRight`]: {
          animationName: Ge,
        },
        [`${o2}-dropdown-menu`]: {
          maxHeight: e3.tabsDropdownHeight,
          margin: 0,
          padding: `${X(r2)} 0`,
          overflowX: "hidden",
          overflowY: "auto",
          textAlign: { _skip_check_: !0, value: "left" },
          listStyleType: "none",
          backgroundColor: e3.colorBgContainer,
          backgroundClip: "padding-box",
          borderRadius: e3.borderRadiusLG,
          outline: "none",
          boxShadow: e3.boxShadowSecondary,
          "&-item": {
            ...He,
            display: "flex",
            alignItems: "center",
            minWidth: e3.tabsDropdownWidth,
            margin: 0,
            padding: `${X(e3.paddingXXS)} ${X(e3.paddingSM)}`,
            color: e3.colorText,
            fontWeight: 400,
            fontSize: e3.fontSize,
            lineHeight: e3.lineHeight,
            cursor: "pointer",
            transition: `all ${e3.motionDurationSlow}`,
            "> span": { flex: 1, whiteSpace: "nowrap" },
            "&-remove": {
              flex: "none",
              marginLeft: { _skip_check_: !0, value: e3.marginSM },
              color: e3.colorIcon,
              fontSize: e3.fontSizeSM,
              background: "transparent",
              border: 0,
              cursor: "pointer",
              "&:hover": { color: n2 },
            },
            "&:hover": { background: e3.controlItemBgHover },
            "&-disabled": {
              "&, &:hover": {
                color: e3.colorTextDisabled,
                background: "transparent",
                cursor: "not-allowed",
              },
            },
          },
        },
      },
    };
  },
  uc = (e3) => {
    const {
      componentCls: t2,
      margin: o2,
      colorBorderSecondary: n2,
      horizontalMargin: r2,
      verticalItemPadding: l2,
      verticalItemMargin: a2,
      motionDurationSlow: i2,
      calc: s2,
    } = e3;
    return {
      [`${t2}-top, ${t2}-bottom`]: {
        flexDirection: "column",
        [`> ${t2}-nav, > div > ${t2}-nav`]: {
          margin: r2,
          "&::before": {
            position: "absolute",
            right: { _skip_check_: !0, value: 0 },
            left: { _skip_check_: !0, value: 0 },
            borderBottom: `${X(e3.lineWidth)} ${e3.lineType} ${n2}`,
            content: "''",
          },
          [`${t2}-ink-bar`]: {
            height: e3.lineWidthBold,
            "&-animated": {
              transition: ["width", "left", "right"].map((e4) => `${e4} ${i2}`).join(", "),
            },
          },
          [`${t2}-nav-wrap`]: {
            "&::before, &::after": { top: 0, bottom: 0, width: e3.controlHeight },
            "&::before": {
              left: { _skip_check_: !0, value: 0 },
              boxShadow: e3.boxShadowTabsOverflowLeft,
            },
            "&::after": {
              right: { _skip_check_: !0, value: 0 },
              boxShadow: e3.boxShadowTabsOverflowRight,
            },
            [`&${t2}-nav-wrap-ping-left::before`]: { opacity: 1 },
            [`&${t2}-nav-wrap-ping-right::after`]: { opacity: 1 },
          },
        },
      },
      [`${t2}-top`]: {
        [`> ${t2}-nav,
        > div > ${t2}-nav`]: { "&::before": { bottom: 0 }, [`${t2}-ink-bar`]: { bottom: 0 } },
      },
      [`${t2}-bottom`]: {
        [`> ${t2}-nav, > div > ${t2}-nav`]: {
          order: 1,
          marginTop: o2,
          marginBottom: 0,
          "&::before": { top: 0 },
          [`${t2}-ink-bar`]: { top: 0 },
        },
        [`> ${t2}-body-holder, > div > ${t2}-body-holder`]: { order: 0 },
      },
      [`${t2}-left, ${t2}-right`]: {
        [`> ${t2}-nav, > div > ${t2}-nav`]: {
          flexDirection: "column",
          minWidth: s2(e3.controlHeight).mul(1.25).equal(),
          [`${t2}-tab`]: { padding: l2, textAlign: "center" },
          [`${t2}-tab + ${t2}-tab`]: { margin: a2 },
          [`${t2}-nav-wrap`]: {
            flexDirection: "column",
            "&::before, &::after": {
              right: { _skip_check_: !0, value: 0 },
              left: { _skip_check_: !0, value: 0 },
              height: e3.controlHeight,
            },
            "&::before": { top: 0, boxShadow: e3.boxShadowTabsOverflowTop },
            "&::after": { bottom: 0, boxShadow: e3.boxShadowTabsOverflowBottom },
            [`&${t2}-nav-wrap-ping-top::before`]: { opacity: 1 },
            [`&${t2}-nav-wrap-ping-bottom::after`]: { opacity: 1 },
          },
          [`${t2}-ink-bar`]: {
            width: e3.lineWidthBold,
            "&-animated": { transition: ["height", "top"].map((e4) => `${e4} ${i2}`).join(", ") },
          },
          [`${t2}-nav-list, ${t2}-nav-operations`]: { flex: "1 0 auto", flexDirection: "column" },
        },
      },
      [`${t2}-left`]: {
        [`> ${t2}-nav, > div > ${t2}-nav`]: {
          [`${t2}-ink-bar`]: { right: { _skip_check_: !0, value: 0 } },
        },
        [`> ${t2}-body-holder, > div > ${t2}-body-holder`]: {
          marginLeft: { _skip_check_: !0, value: X(s2(e3.lineWidth).mul(-1).equal()) },
          borderLeft: {
            _skip_check_: !0,
            value: `${X(e3.lineWidth)} ${e3.lineType} ${e3.colorBorder}`,
          },
          [`> ${t2}-body > ${t2}-content`]: {
            paddingLeft: { _skip_check_: !0, value: e3.paddingLG },
          },
        },
      },
      [`${t2}-right`]: {
        [`> ${t2}-nav, > div > ${t2}-nav`]: {
          order: 1,
          [`${t2}-ink-bar`]: { left: { _skip_check_: !0, value: 0 } },
        },
        [`> ${t2}-body-holder, > div > ${t2}-body-holder`]: {
          order: 0,
          marginRight: { _skip_check_: !0, value: s2(e3.lineWidth).mul(-1).equal() },
          borderRight: {
            _skip_check_: !0,
            value: `${X(e3.lineWidth)} ${e3.lineType} ${e3.colorBorder}`,
          },
          [`> ${t2}-body > ${t2}-content`]: {
            paddingRight: { _skip_check_: !0, value: e3.paddingLG },
          },
        },
      },
    };
  },
  pc = (e3) => {
    const {
      componentCls: t2,
      cardPaddingSM: o2,
      cardPaddingLG: n2,
      cardHeightSM: r2,
      cardHeightLG: l2,
      horizontalItemPaddingSM: a2,
      horizontalItemPaddingLG: i2,
    } = e3;
    return {
      [t2]: {
        "&-small": {
          [`> ${t2}-nav`]: { [`${t2}-tab`]: { padding: a2, fontSize: e3.titleFontSizeSM } },
        },
        "&-large": {
          [`> ${t2}-nav`]: {
            [`${t2}-tab`]: {
              padding: i2,
              fontSize: e3.titleFontSizeLG,
              lineHeight: e3.lineHeightLG,
            },
          },
        },
      },
      [`${t2}-card`]: {
        [`&${t2}-small`]: {
          [`> ${t2}-nav`]: {
            [`${t2}-tab`]: { padding: o2 },
            [`${t2}-nav-add`]: { minWidth: r2, minHeight: r2 },
          },
          [`&${t2}-bottom`]: {
            [`> ${t2}-nav ${t2}-tab`]: {
              borderRadius: `0 0 ${X(e3.borderRadius)} ${X(e3.borderRadius)}`,
            },
          },
          [`&${t2}-top`]: {
            [`> ${t2}-nav ${t2}-tab`]: {
              borderRadius: `${X(e3.borderRadius)} ${X(e3.borderRadius)} 0 0`,
            },
          },
          [`&${t2}-right`]: {
            [`> ${t2}-nav ${t2}-tab`]: {
              borderRadius: {
                _skip_check_: !0,
                value: `0 ${X(e3.borderRadius)} ${X(e3.borderRadius)} 0`,
              },
            },
          },
          [`&${t2}-left`]: {
            [`> ${t2}-nav ${t2}-tab`]: {
              borderRadius: {
                _skip_check_: !0,
                value: `${X(e3.borderRadius)} 0 0 ${X(e3.borderRadius)}`,
              },
            },
          },
        },
        [`&${t2}-large`]: {
          [`> ${t2}-nav`]: {
            [`${t2}-tab`]: { padding: n2 },
            [`${t2}-nav-add`]: { minWidth: l2, minHeight: l2 },
          },
        },
      },
    };
  },
  mc = (e3) => {
    const {
        componentCls: t2,
        itemActiveColor: o2,
        itemHoverColor: n2,
        iconCls: r2,
        tabsHorizontalItemMargin: l2,
        horizontalItemPadding: a2,
        itemSelectedColor: i2,
        itemColor: s2,
      } = e3,
      c2 = `${t2}-tab`;
    return {
      [c2]: {
        position: "relative",
        WebkitTouchCallout: "none",
        WebkitTapHighlightColor: "transparent",
        display: "inline-flex",
        alignItems: "center",
        padding: a2,
        fontSize: e3.titleFontSize,
        background: "transparent",
        border: 0,
        outline: "none",
        cursor: "pointer",
        color: s2,
        "&-btn, &-remove": { "&:focus:not(:focus-visible), &:active": { color: o2 } },
        "&-btn": {
          outline: "none",
          transition: `all ${e3.motionDurationSlow}`,
          [`${c2}-icon:not(:last-child)`]: { marginInlineEnd: e3.marginSM },
          [`${c2}-icon > svg`]: {
            display: "inline-block",
            verticalAlign: "middle",
            marginBlockEnd: "0.2em",
          },
        },
        "&-remove": {
          flex: "none",
          lineHeight: 1,
          marginRight: { _skip_check_: !0, value: e3.calc(e3.marginXXS).mul(-1).equal() },
          marginLeft: { _skip_check_: !0, value: e3.marginXS },
          color: e3.colorIcon,
          fontSize: e3.fontSizeSM,
          background: "transparent",
          border: "none",
          outline: "none",
          cursor: "pointer",
          transition: `all ${e3.motionDurationSlow}`,
          "&:hover": { color: e3.colorTextHeading },
          ...J(e3),
        },
        "&:hover": { color: n2 },
        [`&${c2}-active ${c2}-btn`]: { color: i2 },
        [`&${c2}-focus ${c2}-btn:focus-visible`]: ye(e3),
        [`&${c2}-disabled`]: { color: e3.colorTextDisabled, cursor: "not-allowed" },
        [`&${c2}-disabled ${c2}-btn, &${c2}-disabled ${t2}-remove`]: {
          "&:focus, &:active": { color: e3.colorTextDisabled },
        },
        [`& ${c2}-remove ${r2}`]: { margin: 0, verticalAlign: "middle" },
        [`${r2}:not(:last-child)`]: { marginRight: { _skip_check_: !0, value: e3.marginSM } },
      },
      [`${c2} + ${c2}`]: { margin: { _skip_check_: !0, value: l2 } },
    };
  },
  fc = (e3) => {
    const {
      componentCls: t2,
      tabsHorizontalItemMarginRTL: o2,
      iconCls: n2,
      cardGutter: r2,
      calc: l2,
    } = e3;
    return {
      [`${t2}-rtl`]: {
        direction: "rtl",
        [`${t2}-nav`]: {
          [`${t2}-tab`]: {
            margin: { _skip_check_: !0, value: o2 },
            [`${t2}-tab:last-of-type`]: { marginLeft: { _skip_check_: !0, value: 0 } },
            [n2]: {
              marginRight: { _skip_check_: !0, value: 0 },
              marginLeft: { _skip_check_: !0, value: e3.marginSM },
            },
            [`${t2}-tab-remove`]: {
              marginRight: { _skip_check_: !0, value: e3.marginXS },
              marginLeft: { _skip_check_: !0, value: l2(e3.marginXXS).mul(-1).equal() },
              [n2]: { margin: 0 },
            },
          },
        },
        [`&${t2}-left`]: { [`> ${t2}-nav`]: { order: 1 }, [`> ${t2}-body-holder`]: { order: 0 } },
        [`&${t2}-right`]: { [`> ${t2}-nav`]: { order: 0 }, [`> ${t2}-body-holder`]: { order: 1 } },
        [`&${t2}-card${t2}-top, &${t2}-card${t2}-bottom`]: {
          [`> ${t2}-nav, > div > ${t2}-nav`]: {
            [`${t2}-tab + ${t2}-tab`]: {
              marginRight: { _skip_check_: !0, value: r2 },
              marginLeft: { _skip_check_: !0, value: 0 },
            },
          },
        },
      },
      [`${t2}-dropdown-rtl`]: { direction: "rtl" },
      [`${t2}-menu-item`]: {
        [`${t2}-dropdown-rtl`]: { textAlign: { _skip_check_: !0, value: "right" } },
      },
    };
  },
  hc = (e3) => {
    const {
      componentCls: t2,
      tabsCardPadding: o2,
      cardHeight: n2,
      cardGutter: r2,
      itemHoverColor: l2,
      itemActiveColor: a2,
      colorBorderSecondary: i2,
    } = e3;
    return {
      [t2]: {
        ...ve(e3),
        display: "flex",
        [`> ${t2}-nav, > div > ${t2}-nav`]: {
          position: "relative",
          display: "flex",
          flex: "none",
          alignItems: "center",
          [`${t2}-nav-wrap`]: {
            position: "relative",
            display: "flex",
            flex: "auto",
            alignSelf: "stretch",
            overflow: "hidden",
            whiteSpace: "nowrap",
            transform: "translate(0)",
            "&::before, &::after": {
              position: "absolute",
              zIndex: 1,
              opacity: 0,
              transition: `opacity ${e3.motionDurationSlow}`,
              content: "''",
              pointerEvents: "none",
            },
          },
          [`${t2}-nav-list`]: {
            position: "relative",
            display: "flex",
            transition: `opacity ${e3.motionDurationSlow}`,
          },
          [`${t2}-nav-operations`]: { display: "flex", alignSelf: "stretch" },
          [`${t2}-nav-operations-hidden`]: {
            position: "absolute",
            visibility: "hidden",
            pointerEvents: "none",
          },
          [`${t2}-nav-more`]: {
            position: "relative",
            padding: o2,
            background: "transparent",
            border: 0,
            color: e3.colorText,
            "&::after": {
              position: "absolute",
              right: { _skip_check_: !0, value: 0 },
              bottom: 0,
              left: { _skip_check_: !0, value: 0 },
              height: e3.calc(e3.controlHeightLG).div(8).equal(),
              transform: "translateY(100%)",
              content: "''",
            },
          },
          [`${t2}-nav-add`]: {
            minWidth: n2,
            minHeight: n2,
            marginLeft: { _skip_check_: !0, value: r2 },
            background: "transparent",
            border: `${X(e3.lineWidth)} ${e3.lineType} ${i2}`,
            borderRadius: `${X(e3.borderRadiusLG)} ${X(e3.borderRadiusLG)} 0 0`,
            outline: "none",
            cursor: "pointer",
            color: e3.colorText,
            transition: `all ${e3.motionDurationSlow} ${e3.motionEaseInOut}`,
            "&:hover": { color: l2 },
            "&:active, &:focus:not(:focus-visible)": { color: a2 },
            ...J(e3, -3),
          },
        },
        [`${t2}-extra-content`]: { flex: "none" },
        [`${t2}-ink-bar`]: {
          position: "absolute",
          background: e3.inkBarColor,
          pointerEvents: "none",
        },
        ...mc(e3),
        [`${t2}-body`]: { position: "relative", width: "100%" },
        [`${t2}-body-holder`]: { flex: "auto", minWidth: 0, minHeight: 0 },
        [`${t2}-content`]: { ...J(e3), "&-hidden": { display: "none" } },
      },
      [`${t2}-centered`]: {
        [`> ${t2}-nav, > div > ${t2}-nav`]: {
          [`${t2}-nav-wrap`]: {
            [`&:not([class*='${t2}-nav-wrap-ping']) > ${t2}-nav-list`]: { margin: "auto" },
          },
        },
      },
    };
  },
  gc = Y(
    "Tabs",
    (e3) => {
      const t2 = q(e3, {
        tabsCardPadding: e3.cardPadding,
        dropdownEdgeChildVerticalPadding: e3.paddingXXS,
        tabsDropdownHeight: 200,
        tabsDropdownWidth: 120,
        tabsHorizontalItemMargin: `0 0 0 ${X(e3.horizontalItemGutter)}`,
        tabsHorizontalItemMarginRTL: `0 0 0 ${X(e3.horizontalItemGutter)}`,
      });
      return [pc(t2), fc(t2), uc(t2), dc(t2), cc(t2), hc(t2), sc(t2)];
    },
    (e3) => {
      const {
          cardHeight: t2,
          cardHeightSM: o2,
          cardHeightLG: n2,
          controlHeight: r2,
          controlHeightLG: l2,
        } = e3,
        a2 = t2 || l2,
        i2 = o2 || r2,
        s2 = n2 || l2 + 8;
      return {
        zIndexPopup: e3.zIndexPopupBase + 50,
        cardBg: e3.colorFillAlter,
        cardHeight: a2,
        cardHeightSM: i2,
        cardHeightLG: s2,
        cardPadding: `${(a2 - e3.fontHeight) / 2 - e3.lineWidth}px ${e3.padding}px`,
        cardPaddingSM: `${(i2 - e3.fontHeight) / 2 - e3.lineWidth}px ${e3.paddingXS}px`,
        cardPaddingLG: `${(s2 - e3.fontHeightLG) / 2 - e3.lineWidth}px ${e3.padding}px`,
        titleFontSize: e3.fontSize,
        titleFontSizeLG: e3.fontSizeLG,
        titleFontSizeSM: e3.fontSize,
        inkBarColor: e3.colorPrimary,
        horizontalMargin: `0 0 ${e3.margin}px 0`,
        horizontalItemGutter: 32,
        horizontalItemMargin: "",
        horizontalItemMarginRTL: "",
        horizontalItemPadding: `${e3.paddingSM}px 0`,
        horizontalItemPaddingSM: `${e3.paddingXS}px 0`,
        horizontalItemPaddingLG: `${e3.padding}px 0`,
        verticalItemPadding: `${e3.paddingXS}px ${e3.paddingLG}px`,
        verticalItemMargin: `${e3.margin}px 0 0 0`,
        itemColor: e3.colorText,
        itemSelectedColor: e3.colorPrimary,
        itemHoverColor: e3.colorPrimaryHover,
        itemActiveColor: e3.colorPrimaryActive,
        cardGutter: e3.marginXXS / 2,
      };
    },
  ),
  bc = () => null,
  vc = Nt.forwardRef((e3, t2) => {
    var o2, n2, r2, l2, a2;
    const {
        type: i2,
        className: s2,
        rootClassName: c2,
        size: d2,
        onEdit: u2,
        hideAdd: p2,
        centered: m2,
        addIcon: f2,
        removeIcon: h2,
        moreIcon: g2,
        more: b2,
        popupClassName: y2,
        children: $2,
        items: C2,
        animated: w2,
        style: S2,
        indicatorSize: E2,
        indicator: k2,
        classNames: N2,
        styles: I2,
        destroyInactiveTabPane: R2,
        destroyOnHidden: T2,
        tabPlacement: M2,
        tabPosition: A2,
        ...L2
      } = e3,
      { prefixCls: O2 } = L2,
      {
        getPrefixCls: D2,
        direction: z2,
        getPopupContainer: H2,
        className: j2,
        style: _2,
        classNames: K2,
        styles: W2,
      } = oe("tabs"),
      { tabs: F2 } = Nt.useContext(B),
      G2 = D2("tabs", O2),
      q2 = $e(G2),
      [V2, X2] = gc(G2, q2),
      U2 = Nt.useRef(null);
    let Y2;
    Nt.useImperativeHandle(t2, () => ({ nativeElement: U2.current })),
      i2 === "editable-card" &&
        (Y2 = {
          onEdit: (e4, { key: t3, event: o3 }) => {
            u2?.(e4 === "add" ? o3 : t3, e4);
          },
          removeIcon: h2 ?? F2?.removeIcon ?? Nt.createElement(x, null),
          addIcon: (f2 ?? F2?.addIcon) || Nt.createElement(As, null),
          showAdd: p2 !== !0,
        });
    const Z2 = D2(),
      J2 = ie(d2),
      Q2 = (function (e4, t3) {
        return e4
          ? e4.map((e5) => ({
              ...e5,
              destroyOnHidden: e5.destroyOnHidden ?? e5.destroyInactiveTabPane,
            }))
          : (function (e5) {
              return e5.filter((e6) => e6);
            })(
              te(t3).map((e5) => {
                if (Nt.isValidElement(e5)) {
                  const { key: t4, props: o3 } = e5,
                    { tab: n3, ...r3 } = o3 || {};
                  return { key: String(t4), ...r3, label: n3 };
                }
                return null;
              }),
            );
      })(C2, $2),
      ee2 = (function (e4, t3 = { inkBar: !0, tabPane: !1 }) {
        let o3;
        return (
          (o3 =
            t3 === !1
              ? { inkBar: !1, tabPane: !1 }
              : t3 === !0
                ? { inkBar: !0, tabPane: !0 }
                : { inkBar: !0, ...(v(t3) ? t3 : {}) }),
          o3.tabPane && (o3.tabPaneMotion = { ...ic, motionName: Se(e4, "switch") }),
          o3
        );
      })(G2, w2),
      ne2 = {
        align: k2?.align ?? ((o2 = F2?.indicator) == null ? void 0 : o2.align),
        size:
          k2?.size ?? E2 ?? ((n2 = F2?.indicator) == null ? void 0 : n2.size) ?? F2?.indicatorSize,
      },
      re2 = Nt.useMemo(() => {
        const e4 = M2 ?? A2 ?? void 0,
          t3 = z2 === "rtl";
        switch (e4) {
          case "start":
            return t3 ? "right" : "left";
          case "end":
            return t3 ? "left" : "right";
          default:
            return e4;
        }
      }, [M2, A2, z2]),
      le2 = { ...e3, size: J2, tabPlacement: re2, items: Q2 },
      ae2 = ce(_2),
      se2 = ce(S2),
      [ue2, pe2] = de(
        [K2, N2],
        [W2, ae2, I2, se2],
        { props: le2 },
        { popup: { _default: "root" } },
      );
    return Nt.createElement(ac, {
      ref: U2,
      direction: z2,
      getPopupContainer: H2,
      ...L2,
      items: Q2,
      className: P(
        {
          [`${G2}-large`]: J2 === "large",
          [`${G2}-small`]: J2 === "small",
          [`${G2}-card`]: ["card", "editable-card"].includes(i2),
          [`${G2}-editable-card`]: i2 === "editable-card",
          [`${G2}-centered`]: m2,
        },
        j2,
        s2,
        c2,
        ue2.root,
        V2,
        X2,
        q2,
      ),
      classNames: { ...ue2, popup: P(y2, V2, X2, q2, (r2 = ue2.popup) == null ? void 0 : r2.root) },
      styles: { ...pe2, popup: (l2 = pe2.popup) == null ? void 0 : l2.root },
      style: pe2.root,
      editable: Y2,
      more: {
        icon:
          ((a2 = F2?.more) == null ? void 0 : a2.icon) ??
          F2?.moreIcon ??
          g2 ??
          Nt.createElement(ri, null),
        transitionName: `${Z2}-slide-up`,
        ...b2,
      },
      prefixCls: G2,
      animated: ee2,
      indicator: ne2,
      destroyOnHidden: T2 ?? R2,
      tabPosition: re2,
    });
  });
vc.TabPane = bc;
const yc = vc;
function $c(e3, t2, o2) {
  var n2 = (o2 || {}).atBegin;
  return (function (e4, t3, o3) {
    var n3,
      r2 = o3 || {},
      l2 = r2.noTrailing,
      a2 = l2 !== void 0 && l2,
      i2 = r2.noLeading,
      s2 = i2 !== void 0 && i2,
      c2 = r2.debounceMode,
      d2 = c2 === void 0 ? void 0 : c2,
      u2 = !1,
      p2 = 0;
    function m2() {
      n3 && clearTimeout(n3);
    }
    function f2() {
      for (var o4 = arguments.length, r3 = new Array(o4), l3 = 0; l3 < o4; l3++)
        r3[l3] = arguments[l3];
      var i3 = this,
        c3 = Date.now() - p2;
      function f3() {
        (p2 = Date.now()), t3.apply(i3, r3);
      }
      function h2() {
        n3 = void 0;
      }
      u2 ||
        (s2 || !d2 || n3 || f3(),
        m2(),
        d2 === void 0 && c3 > e4
          ? s2
            ? ((p2 = Date.now()), a2 || (n3 = setTimeout(d2 ? h2 : f3, e4)))
            : f3()
          : a2 !== !0 && (n3 = setTimeout(d2 ? h2 : f3, d2 === void 0 ? e4 - c3 : e4)));
    }
    return (
      (f2.cancel = function (e5) {
        var t4 = (e5 || {}).upcomingOnly,
          o4 = t4 !== void 0 && t4;
        m2(), (u2 = !o4);
      }),
      f2
    );
  })(e3, t2, { debounceMode: (n2 !== void 0 && n2) !== !1 });
}
const xc = Nt.createContext(null),
  Cc = Nt.createContext({}),
  wc = ({ prefixCls: e3, level: t2, isStart: o2, isEnd: n2 }) => {
    const r2 = `${e3}-indent-unit`,
      l2 = [];
    for (let a2 = 0; a2 < t2; a2 += 1)
      l2.push(
        Nt.createElement("span", {
          key: a2,
          className: P(r2, { [`${r2}-start`]: o2[a2], [`${r2}-end`]: n2[a2] }),
        }),
      );
    return Nt.createElement("span", { "aria-hidden": "true", className: `${e3}-indent` }, l2);
  },
  Sc = Nt.memo(wc);
function Ec(e3, t2) {
  return e3[t2];
}
function kc(e3, t2) {
  return `${e3}-${t2}`;
}
function Nc(e3, t2) {
  return e3 ?? t2;
}
function Ic(e3) {
  const { title: t2, _title: o2, key: n2, children: r2 } = e3 || {},
    l2 = t2 || "title";
  return { title: l2, _title: o2 || [l2], key: n2 || "key", children: r2 || "children" };
}
function Bc(e3) {
  return (function e4(t2) {
    return te(t2)
      .map((t3) => {
        if (
          !(function (e5) {
            return e5 && e5.type && e5.type.isTreeNode;
          })(t3)
        )
          return Oe(!t3, "Tree/TreeNode can only accept TreeNode as children."), null;
        const { key: o2 } = t3,
          { children: n2, ...r2 } = t3.props,
          l2 = { key: o2, ...r2 },
          a2 = e4(n2);
        return a2.length && (l2.children = a2), l2;
      })
      .filter((e5) => e5);
  })(e3);
}
function Rc(e3, t2, o2) {
  const { _title: n2, key: r2, children: l2 } = Ic(o2),
    a2 = new Set(t2 === !0 ? [] : t2),
    i2 = [];
  return (
    (function e4(o3, s2 = null) {
      return o3.map((c2, d2) => {
        const u2 = kc(s2 ? s2.pos : "0", d2),
          p2 = Nc(c2[r2], u2);
        let m2;
        for (let e5 = 0; e5 < n2.length; e5 += 1) {
          const t3 = n2[e5];
          if (c2[t3] !== void 0) {
            m2 = c2[t3];
            break;
          }
        }
        const f2 = Object.assign(se(c2, [...n2, r2, l2]), {
          title: m2,
          key: p2,
          parent: s2,
          pos: u2,
          children: null,
          data: c2,
          isStart: [...(s2 ? s2.isStart : []), d2 === 0],
          isEnd: [...(s2 ? s2.isEnd : []), d2 === o3.length - 1],
        });
        return (
          i2.push(f2),
          t2 === !0 || a2.has(p2) ? (f2.children = e4(c2[l2] || [], f2)) : (f2.children = []),
          f2
        );
      });
    })(e3),
    i2
  );
}
function Tc(
  e3,
  {
    initWrapper: t2,
    processEntity: o2,
    onProcessFinished: n2,
    externalGetKey: r2,
    childrenPropName: l2,
    fieldNames: a2,
  } = {},
  i2,
) {
  const s2 = r2 || i2,
    c2 = {},
    d2 = {};
  let u2 = { posEntities: c2, keyEntities: d2 };
  return (
    t2 && (u2 = t2(u2) || u2),
    (function (e4, t3, o3) {
      const n3 = typeof o3 == "object" ? o3 || {} : { externalGetKey: o3 },
        { childrenPropName: r3, externalGetKey: l3, fieldNames: a3 } = n3,
        { key: i3, children: s3 } = Ic(a3),
        c3 = r3 || s3;
      let d3;
      l3
        ? typeof l3 == "string"
          ? (d3 = (e5) => e5[l3])
          : typeof l3 == "function" && (d3 = (e5) => l3(e5))
        : (d3 = (e5, t4) => Nc(e5[i3], t4)),
        (function o4(n4, r4, l4, a4) {
          const i4 = n4 ? n4[c3] : e4,
            s4 = n4 ? kc(l4.pos, r4) : "0",
            u3 = n4 ? [...a4, n4] : [];
          if (n4) {
            const e5 = d3(n4, s4),
              o5 = {
                node: n4,
                index: r4,
                pos: s4,
                key: e5,
                parentPos: l4.node ? l4.pos : null,
                level: l4.level + 1,
                nodes: u3,
              };
            t3(o5);
          }
          i4 &&
            i4.forEach((e5, t4) => {
              o4(e5, t4, { node: n4, pos: s4, level: l4 ? l4.level + 1 : -1 }, u3);
            });
        })(null);
    })(
      e3,
      (e4) => {
        const { node: t3, index: n3, pos: r3, key: l3, parentPos: a3, level: i3, nodes: s3 } = e4,
          p2 = { node: t3, nodes: s3, index: n3, key: l3, pos: r3, level: i3 },
          m2 = Nc(l3, r3);
        (c2[r3] = p2),
          (d2[m2] = p2),
          (p2.parent = c2[a3]),
          p2.parent &&
            ((p2.parent.children = p2.parent.children || []), p2.parent.children.push(p2)),
          o2 && o2(p2, u2);
      },
      { externalGetKey: s2, childrenPropName: l2, fieldNames: a2 },
    ),
    n2 && n2(u2),
    u2
  );
}
function Mc(e3, t2, o2, n2) {
  return e3 !== !1 && (e3 || (!t2 && !o2) || (t2 && n2 && !o2));
}
function Pc(
  e3,
  {
    expandedKeys: t2,
    selectedKeys: o2,
    loadedKeys: n2,
    loadingKeys: r2,
    checkedKeys: l2,
    halfCheckedKeys: a2,
    dragOverNodeKey: i2,
    dropPosition: s2,
    keyEntities: c2,
  },
) {
  const d2 = Ec(c2, e3);
  return {
    eventKey: e3,
    expanded: t2.indexOf(e3) !== -1,
    selected: o2.indexOf(e3) !== -1,
    loaded: n2.indexOf(e3) !== -1,
    loading: r2.indexOf(e3) !== -1,
    checked: l2.indexOf(e3) !== -1,
    halfChecked: a2.indexOf(e3) !== -1,
    pos: String(d2 ? d2.pos : ""),
    dragOver: i2 === e3 && s2 === 0,
    dragOverGapTop: i2 === e3 && s2 === -1,
    dragOverGapBottom: i2 === e3 && s2 === 1,
  };
}
function Ac(e3) {
  const {
      data: t2,
      expanded: o2,
      selected: n2,
      checked: r2,
      loaded: l2,
      loading: a2,
      halfChecked: i2,
      dragOver: s2,
      dragOverGapTop: c2,
      dragOverGapBottom: d2,
      pos: u2,
      active: p2,
      eventKey: m2,
    } = e3,
    f2 = {
      ...t2,
      expanded: o2,
      selected: n2,
      checked: r2,
      loaded: l2,
      loading: a2,
      halfChecked: i2,
      dragOver: s2,
      dragOverGapTop: c2,
      dragOverGapBottom: d2,
      pos: u2,
      active: p2,
      key: m2,
    };
  return (
    "props" in f2 ||
      Object.defineProperty(f2, "props", {
        get: () => (
          Oe(
            !1,
            "Second param return from event is node data instead of TreeNode instance. Please read value directly instead of reading from `props`.",
          ),
          e3
        ),
      }),
    f2
  );
}
function Lc() {
  return (
    (Lc = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    Lc.apply(this, arguments)
  );
}
const Oc = "open",
  Dc = "close",
  zc = "---",
  Hc = (e3) => {
    var t2, o2;
    const {
        eventKey: n2,
        className: r2,
        style: l2,
        dragOver: a2,
        dragOverGapTop: i2,
        dragOverGapBottom: s2,
        isLeaf: c2,
        isStart: d2,
        isEnd: u2,
        expanded: p2,
        selected: m2,
        checked: f2,
        halfChecked: h2,
        loading: g2,
        domRef: b2,
        active: v2,
        data: y2,
        onMouseMove: $2,
        selectable: x2,
        treeId: C2,
        ...S2
      } = e3,
      E2 = nt(C2, n2),
      k2 = It.useContext(xc),
      { classNames: N2, styles: I2 } = k2 || {},
      B2 = It.useContext(Cc),
      R2 = It.useRef(null),
      [T2, M2] = It.useState(!1),
      A2 = !!(k2.disabled || e3.disabled || ((t2 = B2.nodeDisabled) != null && t2.call(B2, y2))),
      L2 = It.useMemo(
        () => !(!k2.checkable || e3.checkable === !1) && k2.checkable,
        [k2.checkable, e3.checkable],
      ),
      O2 = (t3) => {
        A2 || (L2 && !e3.disableCheckbox && k2.onNodeCheck(t3, Ac(e3), !f2));
      },
      D2 = It.useMemo(() => (typeof x2 == "boolean" ? x2 : k2.selectable), [x2, k2.selectable]),
      z2 = (t3) => {
        k2.onNodeClick(t3, Ac(e3)),
          D2
            ? ((t4) => {
                A2 || k2.onNodeSelect(t4, Ac(e3));
              })(t3)
            : O2(t3);
      },
      H2 = (t3) => {
        k2.onNodeDoubleClick(t3, Ac(e3));
      },
      j2 = (t3) => {
        k2.onNodeMouseEnter(t3, Ac(e3));
      },
      _2 = (t3) => {
        k2.onNodeMouseLeave(t3, Ac(e3));
      },
      K2 = (t3) => {
        k2.onNodeContextMenu(t3, Ac(e3));
      },
      W2 = It.useMemo(
        () => !(!k2.draggable || (k2.draggable.nodeDraggable && !k2.draggable.nodeDraggable(y2))),
        [k2.draggable, y2],
      ),
      F2 = (t3) => {
        g2 || k2.onNodeExpand(t3, Ac(e3));
      },
      G2 = It.useMemo(() => {
        const { children: e4 } = Ec(k2.keyEntities, n2) || {};
        return !!(e4 || []).length;
      }, [k2.keyEntities, n2]),
      q2 = It.useMemo(() => Mc(c2, k2.loadData, G2, e3.loaded), [c2, k2.loadData, G2, e3.loaded]);
    It.useEffect(() => {
      g2 || typeof k2.loadData != "function" || !p2 || q2 || e3.loaded || k2.onNodeLoad(Ac(e3));
    }, [g2, k2.loadData, k2.onNodeLoad, p2, q2, e3]);
    const V2 = It.useMemo(() => {
        var e4;
        return (e4 = k2.draggable) != null && e4.icon
          ? It.createElement(
              "span",
              { className: `${k2.prefixCls}-draggable-icon` },
              k2.draggable.icon,
            )
          : null;
      }, [k2.draggable]),
      X2 = (t3) => {
        const o3 = e3.switcherIcon || k2.switcherIcon;
        return typeof o3 == "function" ? o3({ ...e3, isLeaf: t3 }) : o3;
      },
      U2 = It.useMemo(() => {
        if (!L2) return null;
        const t3 = typeof L2 != "boolean" ? L2 : null;
        return It.createElement(
          "span",
          {
            className: P(`${k2.prefixCls}-checkbox`, {
              [`${k2.prefixCls}-checkbox-checked`]: f2,
              [`${k2.prefixCls}-checkbox-indeterminate`]: !f2 && h2,
              [`${k2.prefixCls}-checkbox-disabled`]: A2 || e3.disableCheckbox,
            }),
            onClick: O2,
            role: "checkbox",
            "aria-checked": h2 ? "mixed" : f2,
            "aria-disabled": A2 || e3.disableCheckbox,
            "aria-labelledby": E2,
          },
          t3,
        );
      }, [L2, f2, h2, A2, e3.disableCheckbox, E2]),
      Y2 = It.useMemo(() => (q2 ? null : p2 ? Oc : Dc), [q2, p2]),
      Z2 = It.useMemo(
        () =>
          It.createElement("span", {
            className: P(
              N2?.itemIcon,
              `${k2.prefixCls}-iconEle`,
              `${k2.prefixCls}-icon__${Y2 || "docu"}`,
              { [`${k2.prefixCls}-icon_loading`]: g2 },
            ),
            style: I2?.itemIcon,
          }),
        [k2.prefixCls, Y2, g2],
      ),
      J2 = It.useMemo(() => {
        const t3 = !!k2.draggable;
        return !e3.disabled && t3 && k2.dragOverNodeKey === n2
          ? k2.dropIndicatorRender({
              dropPosition: k2.dropPosition,
              dropLevelOffset: k2.dropLevelOffset,
              indent: k2.indent,
              prefixCls: k2.prefixCls,
              direction: k2.direction,
            })
          : null;
      }, [
        k2.dropPosition,
        k2.dropLevelOffset,
        k2.indent,
        k2.prefixCls,
        k2.direction,
        k2.draggable,
        k2.dragOverNodeKey,
        k2.dropIndicatorRender,
      ]),
      Q2 = It.useMemo(() => {
        const { title: t3 = zc } = e3,
          o3 = `${k2.prefixCls}-node-content-wrapper`;
        let n3, r3;
        if (k2.showIcon) {
          const t4 = e3.icon || k2.icon;
          n3 = t4
            ? It.createElement(
                "span",
                {
                  className: P(
                    N2?.itemIcon,
                    `${k2.prefixCls}-iconEle`,
                    `${k2.prefixCls}-icon__customize`,
                  ),
                  style: I2?.itemIcon,
                },
                typeof t4 == "function" ? t4(e3) : t4,
              )
            : Z2;
        } else k2.loadData && g2 && (n3 = Z2);
        return (
          (r3 = typeof t3 == "function" ? t3(y2) : k2.titleRender ? k2.titleRender(y2) : t3),
          It.createElement(
            "span",
            {
              ref: R2,
              title: typeof t3 == "string" ? t3 : "",
              className: P(o3, `${o3}-${Y2 || "normal"}`, {
                [`${k2.prefixCls}-node-selected`]: !A2 && (m2 || T2),
              }),
              onMouseEnter: j2,
              onMouseLeave: _2,
              onContextMenu: K2,
              onClick: z2,
              onDoubleClick: H2,
            },
            n3,
            It.createElement(
              "span",
              { className: P(`${k2.prefixCls}-title`, N2?.itemTitle), style: I2?.itemTitle },
              r3,
            ),
            J2,
          )
        );
      }, [k2.prefixCls, k2.showIcon, e3, k2.icon, Z2, k2.titleRender, y2, Y2, j2, _2, K2, z2, H2]),
      ee2 = w(S2, { aria: !0, data: !0 }),
      { level: te2 } = Ec(k2.keyEntities, n2) || {},
      oe2 = u2[u2.length - 1],
      ne2 = !A2 && W2,
      re2 = k2.draggingNodeKey === n2;
    return It.createElement(
      "div",
      Lc(
        {
          ref: b2,
          role: "treeitem",
          id: E2,
          "aria-expanded": q2 ? void 0 : p2,
          "aria-selected": D2 && !A2 ? m2 : void 0,
          "aria-checked": L2 && !A2 ? (h2 ? "mixed" : f2) : void 0,
          "aria-disabled": A2,
          className: P(r2, `${k2.prefixCls}-treenode`, N2?.item, {
            [`${k2.prefixCls}-treenode-disabled`]: A2,
            [`${k2.prefixCls}-treenode-switcher-${p2 ? "open" : "close"}`]: !c2,
            [`${k2.prefixCls}-treenode-checkbox-checked`]: f2,
            [`${k2.prefixCls}-treenode-checkbox-indeterminate`]: h2,
            [`${k2.prefixCls}-treenode-selected`]: m2,
            [`${k2.prefixCls}-treenode-loading`]: g2,
            [`${k2.prefixCls}-treenode-active`]: v2,
            [`${k2.prefixCls}-treenode-leaf-last`]: oe2,
            [`${k2.prefixCls}-treenode-draggable`]: W2,
            dragging: re2,
            "drop-target": k2.dropTargetKey === n2,
            "drop-container": k2.dropContainerKey === n2,
            "drag-over": !A2 && a2,
            "drag-over-gap-top": !A2 && i2,
            "drag-over-gap-bottom": !A2 && s2,
            "filter-node": (o2 = k2.filterTreeNode) == null ? void 0 : o2.call(k2, Ac(e3)),
            [`${k2.prefixCls}-treenode-leaf`]: q2,
          }),
          style: { ...l2, ...I2?.item },
          draggable: ne2,
          onDragStart: ne2
            ? (t3) => {
                t3.stopPropagation(), M2(!0), k2.onNodeDragStart(t3, e3);
                try {
                  t3.dataTransfer.setData("text/plain", "");
                } catch {}
              }
            : void 0,
          onDragEnter: W2
            ? (t3) => {
                t3.preventDefault(), t3.stopPropagation(), k2.onNodeDragEnter(t3, e3);
              }
            : void 0,
          onDragOver: W2
            ? (t3) => {
                t3.preventDefault(), t3.stopPropagation(), k2.onNodeDragOver(t3, e3);
              }
            : void 0,
          onDragLeave: W2
            ? (t3) => {
                t3.stopPropagation(), k2.onNodeDragLeave(t3, e3);
              }
            : void 0,
          onDrop: W2
            ? (t3) => {
                t3.preventDefault(), t3.stopPropagation(), M2(!1), k2.onNodeDrop(t3, e3);
              }
            : void 0,
          onDragEnd: W2
            ? (t3) => {
                t3.stopPropagation(), M2(!1), k2.onNodeDragEnd(t3, e3);
              }
            : void 0,
          onMouseMove: $2,
        },
        ee2,
      ),
      It.createElement(Sc, { prefixCls: k2.prefixCls, level: te2, isStart: d2, isEnd: u2 }),
      V2,
      (() => {
        if (q2) {
          const e5 = X2(!0);
          return e5 !== !1
            ? It.createElement(
                "span",
                {
                  className: P(
                    `${k2.prefixCls}-switcher`,
                    `${k2.prefixCls}-switcher-noop`,
                    N2?.itemSwitcher,
                  ),
                  style: I2?.itemSwitcher,
                },
                e5,
              )
            : null;
        }
        const e4 = X2(!1);
        return e4 !== !1
          ? It.createElement(
              "span",
              {
                onClick: F2,
                className: P(
                  `${k2.prefixCls}-switcher`,
                  `${k2.prefixCls}-switcher_${p2 ? Oc : Dc}`,
                  N2?.itemSwitcher,
                ),
                style: I2?.itemSwitcher,
              },
              e4,
            )
          : null;
      })(),
      U2,
      Q2,
    );
  };
function jc() {
  return (
    (jc = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    jc.apply(this, arguments)
  );
}
Hc.isTreeNode = 1;
const _c = Nt.forwardRef((e3, t2) => {
  const {
      className: o2,
      style: n2,
      motion: r2,
      motionNodes: l2,
      motionType: a2,
      onMotionStart: i2,
      onMotionEnd: s2,
      active: c2,
      treeNodeRequiredProps: d2,
      ...u2
    } = e3,
    [p2, m2] = Nt.useState(!0),
    { prefixCls: f2 } = Nt.useContext(xc),
    h2 = l2 && a2 !== "hide";
  le(() => {
    l2 && h2 !== p2 && m2(h2);
  }, [l2]);
  const g2 = Nt.useRef(!1),
    b2 = () => {
      l2 && !g2.current && ((g2.current = !0), s2());
    };
  (function (e4, t3) {
    const [o3, n3] = Nt.useState(!1);
    le(() => {
      if (o3)
        return (
          e4(),
          () => {
            t3();
          }
        );
    }, [o3]),
      le(
        () => (
          n3(!0),
          () => {
            n3(!1);
          }
        ),
        [],
      );
  })(() => {
    l2 && i2();
  }, b2);
  const v2 = (e4) => {
    h2 === e4 && b2();
  };
  return l2
    ? Nt.createElement(
        R,
        jc({ ref: t2, visible: p2 }, r2, { motionAppear: a2 === "show", onVisibleChanged: v2 }),
        ({ className: e4, style: t3 }, o3) =>
          Nt.createElement(
            "div",
            { ref: o3, className: P(`${f2}-treenode-motion`, e4), style: t3 },
            l2.map((e5) => {
              const {
                data: { ...t4 },
                title: o4,
                key: n3,
                isStart: r3,
                isEnd: l3,
              } = e5;
              delete t4.children;
              const a3 = Pc(n3, d2);
              return Nt.createElement(
                Hc,
                jc({}, t4, a3, {
                  title: o4,
                  active: c2,
                  data: e5.data,
                  key: n3,
                  isStart: r3,
                  isEnd: l3,
                }),
              );
            }),
          ),
      )
    : Nt.createElement(Hc, jc({ domRef: t2, className: o2, style: n2 }, u2, { active: c2 }));
});
function Kc(e3, t2, o2) {
  const n2 = e3.findIndex((e4) => e4.key === o2),
    r2 = e3[n2 + 1],
    l2 = t2.findIndex((e4) => e4.key === o2);
  if (r2) {
    const e4 = t2.findIndex((e5) => e5.key === r2.key);
    return t2.slice(l2 + 1, e4);
  }
  return t2.slice(l2 + 1);
}
function Wc() {
  return (
    (Wc = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    Wc.apply(this, arguments)
  );
}
const Fc = `RC_TREE_MOTION_${Math.random()}`,
  Gc = { key: Fc },
  qc = { key: Fc, level: 0, index: 0, pos: "0", node: Gc, nodes: [Gc] },
  Vc = {
    parent: null,
    children: [],
    pos: qc.pos,
    data: Gc,
    title: null,
    key: Fc,
    isStart: [],
    isEnd: [],
  };
function Xc(e3, t2, o2, n2) {
  return t2 !== !1 && o2 ? e3.slice(0, Math.ceil(o2 / n2) + 1) : e3;
}
function Uc(e3) {
  const { key: t2, pos: o2 } = e3;
  return Nc(t2, o2);
}
const Yc = Nt.forwardRef((e3, t2) => {
  const {
      prefixCls: o2,
      data: n2,
      selectable: r2,
      checkable: a2,
      expandedKeys: i2,
      selectedKeys: s2,
      checkedKeys: c2,
      loadedKeys: d2,
      loadingKeys: u2,
      halfCheckedKeys: p2,
      keyEntities: m2,
      disabled: f2,
      dragging: h2,
      dragOverNodeKey: g2,
      dropPosition: b2,
      motion: v2,
      height: y2,
      itemHeight: $2,
      virtual: x2,
      scrollWidth: C2,
      focusable: w2,
      activeItem: S2,
      tabIndex: E2,
      onKeyDown: k2,
      onFocus: N2,
      onBlur: I2,
      onMouseDown: B2,
      onActiveChange: R2,
      onListChangeStart: T2,
      onListChangeEnd: M2,
      ...P2
    } = e3,
    A2 = l(),
    L2 = Nt.useRef(null),
    O2 = Nt.useRef(null);
  Nt.useImperativeHandle(t2, () => ({
    scrollTo: (e4) => {
      L2.current.scrollTo(e4);
    },
    getIndentWidth: () => O2.current.offsetWidth,
  }));
  const [D2, z2] = Nt.useState(i2),
    [H2, j2] = Nt.useState(n2),
    [_2, K2] = Nt.useState(n2),
    [W2, F2] = Nt.useState([]),
    [G2, q2] = Nt.useState(null),
    V2 = Nt.useRef(n2);
  function X2() {
    const e4 = V2.current;
    j2(e4), K2(e4), F2([]), q2(null), M2();
  }
  (V2.current = n2),
    le(() => {
      z2(i2);
      const e4 = (function (e5 = [], t3 = []) {
        const o3 = e5.length,
          n3 = t3.length;
        if (Math.abs(o3 - n3) !== 1) return { add: !1, key: null };
        function r3(e6, t4) {
          const o4 = new Map();
          e6.forEach((e7) => {
            o4.set(e7, !0);
          });
          const n4 = t4.filter((e7) => !o4.has(e7));
          return n4.length === 1 ? n4[0] : null;
        }
        return o3 < n3 ? { add: !0, key: r3(e5, t3) } : { add: !1, key: r3(t3, e5) };
      })(D2, i2);
      if (e4.key !== null)
        if (e4.add) {
          const t3 = H2.findIndex(({ key: t4 }) => t4 === e4.key),
            o3 = Xc(Kc(H2, n2, e4.key), x2, y2, $2),
            r3 = H2.slice();
          r3.splice(t3 + 1, 0, Vc), K2(r3), F2(o3), q2("show");
        } else {
          const t3 = n2.findIndex(({ key: t4 }) => t4 === e4.key),
            o3 = Xc(Kc(n2, H2, e4.key), x2, y2, $2),
            r3 = n2.slice();
          r3.splice(t3 + 1, 0, Vc), K2(r3), F2(o3), q2("hide");
        }
      else H2 !== n2 && (j2(n2), K2(n2));
    }, [i2, n2]),
    Nt.useEffect(() => {
      h2 || X2();
    }, [h2]);
  const U2 = v2 ? _2 : n2,
    Y2 = {
      expandedKeys: i2,
      selectedKeys: s2,
      loadedKeys: d2,
      loadingKeys: u2,
      checkedKeys: c2,
      halfCheckedKeys: p2,
      dragOverNodeKey: g2,
      dropPosition: b2,
      keyEntities: m2,
    };
  return Nt.createElement(
    Nt.Fragment,
    null,
    Nt.createElement(
      "div",
      {
        className: `${o2}-treenode`,
        "aria-hidden": !0,
        style: {
          position: "absolute",
          pointerEvents: "none",
          visibility: "hidden",
          height: 0,
          overflow: "hidden",
          border: 0,
          padding: 0,
        },
      },
      Nt.createElement(
        "div",
        { className: `${o2}-indent` },
        Nt.createElement("div", { ref: O2, className: `${o2}-indent-unit` }),
      ),
    ),
    Nt.createElement(
      rt,
      Wc({}, P2, {
        data: U2,
        itemKey: Uc,
        height: y2,
        fullHeight: !1,
        virtual: x2,
        itemHeight: $2,
        scrollWidth: C2,
        prefixCls: `${o2}-list`,
        ref: L2,
        role: "tree",
        tabIndex: w2 === !1 || f2 ? void 0 : E2,
        "aria-activedescendant": S2 ? nt(A2, S2.key) : void 0,
        onKeyDown: k2,
        onFocus: N2,
        onBlur: I2,
        onMouseDown: B2,
        onVisibleChange: (e4) => {
          e4.every((e5) => Uc(e5) !== Fc) && X2();
        },
      }),
      (e4) => {
        const {
            pos: t3,
            data: { ...o3 },
            title: n3,
            key: r3,
            isStart: l2,
            isEnd: a3,
          } = e4,
          i3 = Nc(r3, t3);
        delete o3.key, delete o3.children;
        const s3 = Pc(i3, Y2);
        return Nt.createElement(
          _c,
          Wc({}, o3, s3, {
            title: n3,
            active: !!S2 && r3 === S2.key,
            pos: t3,
            data: e4.data,
            isStart: l2,
            isEnd: a3,
            motion: v2,
            motionNodes: r3 === Fc ? W2 : null,
            motionType: G2,
            onMotionStart: T2,
            onMotionEnd: X2,
            treeNodeRequiredProps: Y2,
            treeId: A2,
            onMouseMove: () => {
              R2(null);
            },
          }),
        );
      },
    ),
  );
});
function Zc(e3, t2) {
  if (!e3) return [];
  const o2 = e3.slice(),
    n2 = o2.indexOf(t2);
  return n2 >= 0 && o2.splice(n2, 1), o2;
}
function Jc(e3, t2) {
  const o2 = (e3 || []).slice();
  return o2.indexOf(t2) === -1 && o2.push(t2), o2;
}
function Qc(e3) {
  return e3.split("-");
}
function ed(e3, t2) {
  const o2 = [];
  return (
    (function e4(t3 = []) {
      t3.forEach(({ key: t4, children: n2 }) => {
        o2.push(t4), e4(n2);
      });
    })(Ec(t2, e3).children),
    o2
  );
}
function td(e3) {
  if (e3.parent) {
    const t2 = Qc(e3.pos);
    return Number(t2[t2.length - 1]) === e3.parent.children.length - 1;
  }
  return !1;
}
function od(e3, t2, o2, n2, r2, l2, a2, i2, s2, c2) {
  var d2;
  const { clientX: u2, clientY: p2 } = e3,
    { top: m2, height: f2 } = e3.target.getBoundingClientRect(),
    h2 = ((c2 === "rtl" ? -1 : 1) * ((r2?.x || 0) - u2) - 12) / n2,
    g2 = s2.filter((e4) => {
      var t3, o3;
      return (o3 = (t3 = i2[e4]) == null ? void 0 : t3.children) == null ? void 0 : o3.length;
    });
  let b2 = Ec(i2, o2.eventKey);
  if (p2 < m2 + f2 / 2) {
    const e4 = a2.findIndex((e5) => e5.key === b2.key),
      t3 = a2[e4 <= 0 ? 0 : e4 - 1].key;
    b2 = Ec(i2, t3);
  }
  const v2 = b2.key,
    y2 = b2,
    $2 = b2.key;
  let x2 = 0,
    C2 = 0;
  if (!g2.includes(v2)) for (let k2 = 0; k2 < h2 && td(b2); k2 += 1) (b2 = b2.parent), (C2 += 1);
  const w2 = t2.data,
    S2 = b2.node;
  let E2 = !0;
  return (
    (function (e4) {
      const t3 = Qc(e4.pos);
      return Number(t3[t3.length - 1]) === 0;
    })(b2) &&
    b2.level === 0 &&
    p2 < m2 + f2 / 2 &&
    l2({ dragNode: w2, dropNode: S2, dropPosition: -1 }) &&
    b2.key === o2.eventKey
      ? (x2 = -1)
      : (y2.children || []).length && g2.includes($2)
        ? l2({ dragNode: w2, dropNode: S2, dropPosition: 0 })
          ? (x2 = 0)
          : (E2 = !1)
        : C2 === 0
          ? h2 > -1.5
            ? l2({ dragNode: w2, dropNode: S2, dropPosition: 1 })
              ? (x2 = 1)
              : (E2 = !1)
            : l2({ dragNode: w2, dropNode: S2, dropPosition: 0 })
              ? (x2 = 0)
              : l2({ dragNode: w2, dropNode: S2, dropPosition: 1 })
                ? (x2 = 1)
                : (E2 = !1)
          : l2({ dragNode: w2, dropNode: S2, dropPosition: 1 })
            ? (x2 = 1)
            : (E2 = !1),
    {
      dropPosition: x2,
      dropLevelOffset: C2,
      dropTargetKey: b2.key,
      dropTargetPos: b2.pos,
      dragOverNodeKey: $2,
      dropContainerKey: x2 === 0 ? null : ((d2 = b2.parent) == null ? void 0 : d2.key) || null,
      dropAllowed: E2,
    }
  );
}
function nd(e3, t2) {
  if (!e3) return;
  const { multiple: o2 } = t2;
  return o2 ? e3.slice() : e3.length ? [e3[0]] : e3;
}
function rd(e3) {
  if (!e3) return null;
  let t2;
  if (Array.isArray(e3)) t2 = { checkedKeys: e3, halfCheckedKeys: void 0 };
  else {
    if (typeof e3 != "object") return Oe(!1, "`checkedKeys` is not an array or an object"), null;
    t2 = { checkedKeys: e3.checked || void 0, halfCheckedKeys: e3.halfChecked || void 0 };
  }
  return t2;
}
function ld(e3, t2) {
  const o2 = new Set();
  function n2(e4) {
    if (o2.has(e4)) return;
    const r2 = Ec(t2, e4);
    if (!r2) return;
    o2.add(e4);
    const { parent: l2, node: a2 } = r2;
    a2.disabled || (l2 && n2(l2.key));
  }
  return (
    (e3 || []).forEach((e4) => {
      n2(e4);
    }),
    [...o2]
  );
}
function ad(e3, t2) {
  const o2 = new Set();
  return (
    e3.forEach((e4) => {
      t2.has(e4) || o2.add(e4);
    }),
    o2
  );
}
function id(e3) {
  const { disabled: t2, disableCheckbox: o2, checkable: n2 } = e3 || {};
  return !(!t2 && !o2) || n2 === !1;
}
function sd(e3, t2, o2, n2) {
  const r2 = [];
  let l2;
  l2 = n2 || id;
  const a2 = new Set(
      e3.filter((e4) => {
        const t3 = !!Ec(o2, e4);
        return t3 || r2.push(e4), t3;
      }),
    ),
    i2 = new Map();
  let s2,
    c2 = 0;
  return (
    Object.keys(o2).forEach((e4) => {
      const t3 = o2[e4],
        { level: n3 } = t3;
      let r3 = i2.get(n3);
      r3 || ((r3 = new Set()), i2.set(n3, r3)), r3.add(t3), (c2 = Math.max(c2, n3));
    }),
    Oe(
      !r2.length,
      `Tree missing follow keys: ${r2
        .slice(0, 100)
        .map((e4) => `'${e4}'`)
        .join(", ")}`,
    ),
    (s2 =
      t2 === !0
        ? (function (e4, t3, o3, n3) {
            const r3 = new Set(e4),
              l3 = new Set();
            for (let i3 = 0; i3 <= o3; i3 += 1)
              (t3.get(i3) || new Set()).forEach((e5) => {
                const { key: t4, node: o4, children: l4 = [] } = e5;
                r3.has(t4) &&
                  !n3(o4) &&
                  l4
                    .filter((e6) => !n3(e6.node))
                    .forEach((e6) => {
                      r3.add(e6.key);
                    });
              });
            const a3 = new Set();
            for (let i3 = o3; i3 >= 0; i3 -= 1)
              (t3.get(i3) || new Set()).forEach((e5) => {
                const { parent: t4, node: o4 } = e5;
                if (n3(o4) || !e5.parent || a3.has(e5.parent.key)) return;
                if (n3(e5.parent.node)) return void a3.add(t4.key);
                let i4 = !0,
                  s3 = !1;
                (t4.children || [])
                  .filter((e6) => !n3(e6.node))
                  .forEach(({ key: e6 }) => {
                    const t5 = r3.has(e6);
                    i4 && !t5 && (i4 = !1), s3 || (!t5 && !l3.has(e6)) || (s3 = !0);
                  }),
                  i4 && r3.add(t4.key),
                  s3 && l3.add(t4.key),
                  a3.add(t4.key);
              });
            return { checkedKeys: Array.from(r3), halfCheckedKeys: Array.from(ad(l3, r3)) };
          })(a2, i2, c2, l2)
        : (function (e4, t3, o3, n3, r3) {
            const l3 = new Set(e4);
            let a3 = new Set(t3);
            for (let s3 = 0; s3 <= n3; s3 += 1)
              (o3.get(s3) || new Set()).forEach((e5) => {
                const { key: t4, node: o4, children: n4 = [] } = e5;
                l3.has(t4) ||
                  a3.has(t4) ||
                  r3(o4) ||
                  n4
                    .filter((e6) => !r3(e6.node))
                    .forEach((e6) => {
                      l3.delete(e6.key);
                    });
              });
            a3 = new Set();
            const i3 = new Set();
            for (let s3 = n3; s3 >= 0; s3 -= 1)
              (o3.get(s3) || new Set()).forEach((e5) => {
                const { parent: t4, node: o4 } = e5;
                if (r3(o4) || !e5.parent || i3.has(e5.parent.key)) return;
                if (r3(e5.parent.node)) return void i3.add(t4.key);
                let n4 = !0,
                  s4 = !1;
                (t4.children || [])
                  .filter((e6) => !r3(e6.node))
                  .forEach(({ key: e6 }) => {
                    const t5 = l3.has(e6);
                    n4 && !t5 && (n4 = !1), s4 || (!t5 && !a3.has(e6)) || (s4 = !0);
                  }),
                  n4 || l3.delete(t4.key),
                  s4 && a3.add(t4.key),
                  i3.add(t4.key);
              });
            return { checkedKeys: Array.from(l3), halfCheckedKeys: Array.from(ad(a3, l3)) };
          })(a2, t2.halfCheckedKeys, i2, c2, l2)),
    s2
  );
}
function cd() {
  return (
    (cd = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    cd.apply(this, arguments)
  );
}
let dd =
  ((e = class extends Nt.Component {
    constructor() {
      super(...arguments),
        o(this, "destroyed", !1),
        o(this, "delayedDragEnterLogic"),
        o(this, "loadingRetryTimes", {}),
        o(this, "state", {
          keyEntities: {},
          indent: null,
          selectedKeys: [],
          checkedKeys: [],
          halfCheckedKeys: [],
          loadedKeys: [],
          loadingKeys: [],
          expandedKeys: [],
          draggingNodeKey: null,
          dragChildrenKeys: [],
          dropTargetKey: null,
          dropPosition: null,
          dropContainerKey: null,
          dropLevelOffset: null,
          dropTargetPos: null,
          dropAllowed: !0,
          dragOverNodeKey: null,
          treeData: [],
          flattenNodes: [],
          activeKey: null,
          listChanging: !1,
          prevProps: null,
          fieldNames: Ic(),
        }),
        o(this, "dragStartMousePosition", null),
        o(this, "dragNodeProps", null),
        o(this, "currentMouseOverDroppableNodeKey", null),
        o(this, "focusedByMouse", !1),
        o(this, "listRef", Nt.createRef()),
        o(this, "onNodeDragStart", (e3, t2) => {
          const { expandedKeys: o2, keyEntities: n2 } = this.state,
            { onDragStart: r2 } = this.props,
            { eventKey: l2 } = t2;
          (this.dragNodeProps = t2),
            (this.dragStartMousePosition = { x: e3.clientX, y: e3.clientY });
          const a2 = Zc(o2, l2);
          this.setState({
            draggingNodeKey: l2,
            dragChildrenKeys: ed(l2, n2),
            indent: this.listRef.current.getIndentWidth(),
          }),
            this.setExpandedKeys(a2),
            window.addEventListener("dragend", this.onWindowDragEnd),
            r2?.({ event: e3, node: Ac(t2) });
        }),
        o(this, "onNodeDragEnter", (e3, t2) => {
          const {
              expandedKeys: o2,
              keyEntities: n2,
              dragChildrenKeys: r2,
              flattenNodes: l2,
              indent: a2,
            } = this.state,
            { onDragEnter: i2, onExpand: s2, allowDrop: c2, direction: d2 } = this.props,
            { pos: u2, eventKey: p2 } = t2;
          if (
            (this.currentMouseOverDroppableNodeKey !== p2 &&
              (this.currentMouseOverDroppableNodeKey = p2),
            !this.dragNodeProps)
          )
            return void this.resetDragState();
          const {
            dropPosition: m2,
            dropLevelOffset: f2,
            dropTargetKey: h2,
            dropContainerKey: g2,
            dropTargetPos: b2,
            dropAllowed: v2,
            dragOverNodeKey: y2,
          } = od(e3, this.dragNodeProps, t2, a2, this.dragStartMousePosition, c2, l2, n2, o2, d2);
          !r2.includes(h2) && v2
            ? (this.delayedDragEnterLogic || (this.delayedDragEnterLogic = {}),
              Object.keys(this.delayedDragEnterLogic).forEach((e4) => {
                clearTimeout(this.delayedDragEnterLogic[e4]);
              }),
              this.dragNodeProps.eventKey !== t2.eventKey &&
                (e3.persist(),
                (this.delayedDragEnterLogic[u2] = window.setTimeout(() => {
                  if (this.state.draggingNodeKey === null) return;
                  let r3 = [...o2];
                  const l3 = Ec(n2, t2.eventKey);
                  l3 && (l3.children || []).length && (r3 = Jc(o2, t2.eventKey)),
                    this.setExpandedKeys(r3),
                    s2?.(r3, { node: Ac(t2), expanded: !0, nativeEvent: e3.nativeEvent });
                }, 800))),
              this.dragNodeProps.eventKey !== h2 || f2 !== 0
                ? (this.setState({
                    dragOverNodeKey: y2,
                    dropPosition: m2,
                    dropLevelOffset: f2,
                    dropTargetKey: h2,
                    dropContainerKey: g2,
                    dropTargetPos: b2,
                    dropAllowed: v2,
                  }),
                  i2?.({ event: e3, node: Ac(t2), expandedKeys: o2 }))
                : this.resetDragState())
            : this.resetDragState();
        }),
        o(this, "onNodeDragOver", (e3, t2) => {
          const {
              dragChildrenKeys: o2,
              flattenNodes: n2,
              keyEntities: r2,
              expandedKeys: l2,
              indent: a2,
            } = this.state,
            { onDragOver: i2, allowDrop: s2, direction: c2 } = this.props;
          if (!this.dragNodeProps) return;
          const {
            dropPosition: d2,
            dropLevelOffset: u2,
            dropTargetKey: p2,
            dropContainerKey: m2,
            dropTargetPos: f2,
            dropAllowed: h2,
            dragOverNodeKey: g2,
          } = od(e3, this.dragNodeProps, t2, a2, this.dragStartMousePosition, s2, n2, r2, l2, c2);
          !o2.includes(p2) &&
            h2 &&
            (this.dragNodeProps.eventKey === p2 && u2 === 0
              ? (this.state.dropPosition === null &&
                  this.state.dropLevelOffset === null &&
                  this.state.dropTargetKey === null &&
                  this.state.dropContainerKey === null &&
                  this.state.dropTargetPos === null &&
                  this.state.dropAllowed === !1 &&
                  this.state.dragOverNodeKey === null) ||
                this.resetDragState()
              : (d2 === this.state.dropPosition &&
                  u2 === this.state.dropLevelOffset &&
                  p2 === this.state.dropTargetKey &&
                  m2 === this.state.dropContainerKey &&
                  f2 === this.state.dropTargetPos &&
                  h2 === this.state.dropAllowed &&
                  g2 === this.state.dragOverNodeKey) ||
                this.setState({
                  dropPosition: d2,
                  dropLevelOffset: u2,
                  dropTargetKey: p2,
                  dropContainerKey: m2,
                  dropTargetPos: f2,
                  dropAllowed: h2,
                  dragOverNodeKey: g2,
                }),
            i2?.({ event: e3, node: Ac(t2) }));
        }),
        o(this, "onNodeDragLeave", (e3, t2) => {
          this.currentMouseOverDroppableNodeKey !== t2.eventKey ||
            e3.currentTarget.contains(e3.relatedTarget) ||
            (this.resetDragState(), (this.currentMouseOverDroppableNodeKey = null));
          const { onDragLeave: o2 } = this.props;
          o2?.({ event: e3, node: Ac(t2) });
        }),
        o(this, "onWindowDragEnd", (e3) => {
          this.onNodeDragEnd(e3, null, !0),
            window.removeEventListener("dragend", this.onWindowDragEnd);
        }),
        o(this, "onNodeDragEnd", (e3, t2) => {
          const { onDragEnd: o2 } = this.props;
          this.setState({ dragOverNodeKey: null }),
            this.cleanDragState(),
            o2?.({ event: e3, node: Ac(t2) }),
            (this.dragNodeProps = null),
            window.removeEventListener("dragend", this.onWindowDragEnd);
        }),
        o(this, "onNodeDrop", (e3, t2, o2 = !1) => {
          var n2;
          const {
            dragChildrenKeys: r2,
            dropPosition: l2,
            dropTargetKey: a2,
            dropTargetPos: i2,
            dropAllowed: s2,
          } = this.state;
          if (!s2) return;
          const { onDrop: c2 } = this.props;
          if ((this.setState({ dragOverNodeKey: null }), this.cleanDragState(), a2 === null))
            return;
          const d2 = {
              ...Pc(a2, this.getTreeNodeRequiredProps()),
              active: ((n2 = this.getActiveItem()) == null ? void 0 : n2.key) === a2,
              data: Ec(this.state.keyEntities, a2).node,
            },
            u2 = r2.includes(a2);
          Oe(
            !u2,
            "Can not drop to dragNode's children node. This is a bug of rc-tree. Please report an issue.",
          );
          const p2 = Qc(i2),
            m2 = {
              event: e3,
              node: Ac(d2),
              dragNode: this.dragNodeProps ? Ac(this.dragNodeProps) : null,
              dragNodesKeys: [this.dragNodeProps.eventKey].concat(r2),
              dropToGap: l2 !== 0,
              dropPosition: l2 + Number(p2[p2.length - 1]),
            };
          o2 || c2 == null || c2(m2), (this.dragNodeProps = null);
        }),
        o(this, "cleanDragState", () => {
          const { draggingNodeKey: e3 } = this.state;
          e3 !== null &&
            this.setState({
              draggingNodeKey: null,
              dropPosition: null,
              dropContainerKey: null,
              dropTargetKey: null,
              dropLevelOffset: null,
              dropAllowed: !0,
              dragOverNodeKey: null,
            }),
            (this.dragStartMousePosition = null),
            (this.currentMouseOverDroppableNodeKey = null);
        }),
        o(this, "triggerExpandActionExpand", (e3, t2) => {
          const { expandedKeys: o2, flattenNodes: n2 } = this.state,
            { expanded: r2, key: l2, isLeaf: a2 } = t2;
          if (a2 || e3.shiftKey || e3.metaKey || e3.ctrlKey) return;
          const i2 = n2.filter((e4) => e4.key === l2)[0],
            s2 = Ac({ ...Pc(l2, this.getTreeNodeRequiredProps()), data: i2.data });
          this.setExpandedKeys(r2 ? Zc(o2, l2) : Jc(o2, l2)), this.onNodeExpand(e3, s2);
        }),
        o(this, "onNodeClick", (e3, t2) => {
          const { onClick: o2, expandAction: n2 } = this.props;
          n2 === "click" && this.triggerExpandActionExpand(e3, t2), o2?.(e3, t2);
        }),
        o(this, "onNodeDoubleClick", (e3, t2) => {
          const { onDoubleClick: o2, expandAction: n2 } = this.props;
          n2 === "doubleClick" && this.triggerExpandActionExpand(e3, t2), o2?.(e3, t2);
        }),
        o(this, "onNodeSelect", (e3, t2) => {
          let { selectedKeys: o2 } = this.state;
          const { keyEntities: n2, fieldNames: r2 } = this.state,
            { onSelect: l2, multiple: a2 } = this.props,
            { selected: i2 } = t2,
            s2 = t2[r2.key],
            c2 = !i2;
          o2 = c2 ? (a2 ? Jc(o2, s2) : [s2]) : Zc(o2, s2);
          const d2 = o2
            .map((e4) => {
              const t3 = Ec(n2, e4);
              return t3 ? t3.node : null;
            })
            .filter(Boolean);
          this.setUncontrolledState({ selectedKeys: o2 }),
            l2?.(o2, {
              event: "select",
              selected: c2,
              node: t2,
              selectedNodes: d2,
              nativeEvent: e3.nativeEvent,
            });
        }),
        o(this, "onNodeCheck", (e3, t2, o2) => {
          const { keyEntities: n2, checkedKeys: r2, halfCheckedKeys: l2 } = this.state,
            { checkStrictly: a2, onCheck: i2 } = this.props,
            { key: s2 } = t2;
          let c2;
          const d2 = { event: "check", node: t2, checked: o2, nativeEvent: e3.nativeEvent };
          if (a2) {
            const e4 = o2 ? Jc(r2, s2) : Zc(r2, s2);
            (c2 = { checked: e4, halfChecked: Zc(l2, s2) }),
              (d2.checkedNodes = e4
                .map((e5) => Ec(n2, e5))
                .filter(Boolean)
                .map((e5) => e5.node)),
              this.setUncontrolledState({ checkedKeys: e4 });
          } else {
            let { checkedKeys: e4, halfCheckedKeys: t3 } = sd([...r2, s2], !0, n2);
            if (!o2) {
              const o3 = new Set(e4);
              o3.delete(s2),
                ({ checkedKeys: e4, halfCheckedKeys: t3 } = sd(
                  Array.from(o3),
                  { checked: !1, halfCheckedKeys: t3 },
                  n2,
                ));
            }
            (c2 = e4),
              (d2.checkedNodes = []),
              (d2.checkedNodesPositions = []),
              (d2.halfCheckedKeys = t3),
              e4.forEach((e5) => {
                const t4 = Ec(n2, e5);
                if (!t4) return;
                const { node: o3, pos: r3 } = t4;
                d2.checkedNodes.push(o3), d2.checkedNodesPositions.push({ node: o3, pos: r3 });
              }),
              this.setUncontrolledState({ checkedKeys: e4 }, !1, { halfCheckedKeys: t3 });
          }
          i2?.(c2, d2);
        }),
        o(this, "onNodeLoad", (e3) => {
          var t2;
          const { key: o2 } = e3,
            { keyEntities: n2 } = this.state,
            r2 = Ec(n2, o2);
          if ((t2 = r2?.children) != null && t2.length) return;
          const l2 = new Promise((t3, n3) => {
            this.setState(({ loadedKeys: r3 = [], loadingKeys: l3 = [] }) => {
              const { loadData: a2, onLoad: i2 } = this.props;
              return !a2 || r3.includes(o2) || l3.includes(o2)
                ? null
                : (a2(e3)
                    .then(() => {
                      const { loadedKeys: n4 } = this.state,
                        r4 = Jc(n4, o2);
                      i2?.(r4, { event: "load", node: e3 }),
                        this.setUncontrolledState({ loadedKeys: r4 }),
                        this.setState((e4) => ({ loadingKeys: Zc(e4.loadingKeys, o2) })),
                        t3();
                    })
                    .catch((e4) => {
                      if (
                        (this.setState((e5) => ({ loadingKeys: Zc(e5.loadingKeys, o2) })),
                        (this.loadingRetryTimes[o2] = (this.loadingRetryTimes[o2] || 0) + 1),
                        this.loadingRetryTimes[o2] >= 10)
                      ) {
                        const { loadedKeys: e5 } = this.state;
                        Oe(!1, "Retry for `loadData` many times but still failed. No more retry."),
                          this.setUncontrolledState({ loadedKeys: Jc(e5, o2) }),
                          t3();
                      }
                      n3(e4);
                    }),
                  { loadingKeys: Jc(l3, o2) });
            });
          });
          return l2.catch(() => {}), l2;
        }),
        o(this, "onNodeMouseEnter", (e3, t2) => {
          const { onMouseEnter: o2 } = this.props;
          o2?.({ event: e3, node: t2 });
        }),
        o(this, "onNodeMouseLeave", (e3, t2) => {
          const { onMouseLeave: o2 } = this.props;
          o2?.({ event: e3, node: t2 });
        }),
        o(this, "onNodeContextMenu", (e3, t2) => {
          const { onRightClick: o2 } = this.props;
          o2 && (e3.preventDefault(), o2({ event: e3, node: t2 }));
        }),
        o(this, "onMouseDown", (e3) => {
          this.focusedByMouse = !0;
          const { onMouseDown: t2 } = this.props;
          t2?.(e3);
        }),
        o(this, "onGlobalMouseUp", () => {
          this.focusedByMouse = !1;
        }),
        o(this, "onFocus", (...e3) => {
          var t2;
          const { onFocus: o2, disabled: n2 } = this.props,
            { activeKey: r2, selectedKeys: l2, flattenNodes: a2 } = this.state;
          if (!this.focusedByMouse && !n2 && r2 === null) {
            const e4 = l2.find((e5) => a2.some((t3) => t3.key === e5));
            e4 !== void 0
              ? this.onActiveChange(e4)
              : this.onActiveChange(((t2 = a2?.[0]) == null ? void 0 : t2.key) || null);
          }
          o2?.(...e3);
        }),
        o(this, "onBlur", (...e3) => {
          const { onBlur: t2 } = this.props;
          this.onActiveChange(null), t2?.(...e3);
        }),
        o(this, "getTreeNodeRequiredProps", () => {
          const {
            expandedKeys: e3,
            selectedKeys: t2,
            loadedKeys: o2,
            loadingKeys: n2,
            checkedKeys: r2,
            halfCheckedKeys: l2,
            dragOverNodeKey: a2,
            dropPosition: i2,
            keyEntities: s2,
          } = this.state;
          return {
            expandedKeys: e3 || [],
            selectedKeys: t2 || [],
            loadedKeys: o2 || [],
            loadingKeys: n2 || [],
            checkedKeys: r2 || [],
            halfCheckedKeys: l2 || [],
            dragOverNodeKey: a2,
            dropPosition: i2,
            keyEntities: s2,
          };
        }),
        o(this, "setExpandedKeys", (e3) => {
          if (this.props.hasOwnProperty("expandedKeys")) return;
          const { treeData: t2, fieldNames: o2 } = this.state,
            n2 = Rc(t2, e3, o2);
          this.setUncontrolledState({ expandedKeys: e3, flattenNodes: n2 }, !0);
        }),
        o(this, "onNodeExpand", (e3, t2) => {
          let { expandedKeys: o2 } = this.state;
          const { listChanging: n2, fieldNames: r2 } = this.state,
            { onExpand: l2, loadData: a2 } = this.props,
            { expanded: i2 } = t2,
            s2 = t2[r2.key];
          if (n2) return;
          const c2 = o2.includes(s2),
            d2 = !i2;
          if (
            (Oe((i2 && c2) || (!i2 && !c2), "Expand state not sync with index check"),
            (o2 = d2 ? Jc(o2, s2) : Zc(o2, s2)),
            this.setExpandedKeys(o2),
            l2?.(o2, { node: t2, expanded: d2, nativeEvent: e3.nativeEvent }),
            d2 && a2)
          ) {
            const e4 = this.onNodeLoad(t2);
            e4 &&
              e4
                .then(() => {
                  const e5 = Rc(this.state.treeData, o2, r2);
                  this.setUncontrolledState({ flattenNodes: e5 });
                })
                .catch(() => {
                  const { expandedKeys: e5 } = this.state,
                    t3 = Zc(e5, s2);
                  this.setExpandedKeys(t3);
                });
          }
        }),
        o(this, "onListChangeStart", () => {
          this.setUncontrolledState({ listChanging: !0 });
        }),
        o(this, "onListChangeEnd", () => {
          setTimeout(() => {
            this.setUncontrolledState({ listChanging: !1 });
          });
        }),
        o(this, "onActiveChange", (e3) => {
          const { activeKey: t2 } = this.state,
            { onActiveChange: o2, itemScrollOffset: n2 = 0 } = this.props;
          t2 !== e3 &&
            (this.setState({ activeKey: e3 }),
            e3 !== null && this.scrollTo({ key: e3, offset: n2 }),
            o2?.(e3));
        }),
        o(this, "getActiveItem", () => {
          const { activeKey: e3, flattenNodes: t2 } = this.state;
          return e3 === null ? null : t2.find(({ key: t3 }) => t3 === e3) || null;
        }),
        o(this, "offsetActiveKey", (e3) => {
          const { flattenNodes: t2, activeKey: o2 } = this.state;
          let n2 = t2.findIndex(({ key: e4 }) => e4 === o2);
          n2 === -1 && e3 < 0 && (n2 = t2.length), (n2 = (n2 + e3 + t2.length) % t2.length);
          const r2 = t2[n2];
          if (r2) {
            const { key: e4 } = r2;
            this.onActiveChange(e4);
          } else this.onActiveChange(null);
        }),
        o(this, "onKeyDown", (e3) => {
          var t2, o2, n2;
          const {
              activeKey: r2,
              expandedKeys: l2,
              checkedKeys: a2,
              flattenNodes: i2,
              keyEntities: s2,
            } = this.state,
            {
              onKeyDown: c2,
              checkable: d2,
              selectable: u2,
              disabled: p2,
              loadData: m2,
            } = this.props;
          if (p2) return;
          switch (e3.key) {
            case "ArrowUp":
              this.offsetActiveKey(-1), e3.preventDefault();
              break;
            case "ArrowDown":
              this.offsetActiveKey(1), e3.preventDefault();
              break;
            case "Home":
              this.onActiveChange((t2 = i2?.[0]) == null ? void 0 : t2.key), e3.preventDefault();
              break;
            case "End":
              this.onActiveChange((o2 = i2?.[i2.length - 1]) == null ? void 0 : o2.key),
                e3.preventDefault();
          }
          const f2 = this.getActiveItem();
          if (f2 && f2.data) {
            const t3 = Ac({
                ...Pc(r2, this.getTreeNodeRequiredProps()),
                data: f2.data,
                active: !0,
              }),
              o3 = Ec(s2, r2),
              i3 = !!((n2 = o3?.children) != null && n2.length),
              c3 = !Mc(f2.data.isLeaf, m2, i3, t3.loaded),
              p3 = d2 && !t3.disabled && t3.checkable !== !1 && !t3.disableCheckbox,
              h2 = !d2 && u2 && !t3.disabled && t3.selectable !== !1;
            switch (e3.key) {
              case "ArrowLeft":
                c3 && l2.includes(r2)
                  ? this.onNodeExpand({}, t3)
                  : f2.parent && this.onActiveChange(f2.parent.key),
                  e3.preventDefault();
                break;
              case "ArrowRight":
                c3 && !l2.includes(r2)
                  ? this.onNodeExpand({}, t3)
                  : f2.children && f2.children.length && this.onActiveChange(f2.children[0].key),
                  e3.preventDefault();
                break;
              case "Enter":
                c3
                  ? (e3.preventDefault(), this.onNodeExpand({}, t3))
                  : p3
                    ? a2.includes(r2) || (e3.preventDefault(), this.onNodeCheck({}, t3, !0))
                    : h2 && !t3.selected && (e3.preventDefault(), this.onNodeSelect({}, t3));
                break;
              case " ":
                p3
                  ? (e3.preventDefault(), this.onNodeCheck({}, t3, !a2.includes(r2)))
                  : h2 && (e3.preventDefault(), this.onNodeSelect({}, t3));
            }
          }
          c2?.(e3);
        }),
        o(this, "setUncontrolledState", (e3, t2 = !1, o2 = null) => {
          if (!this.destroyed) {
            let n2 = !1,
              r2 = !0;
            const l2 = {};
            Object.keys(e3).forEach((t3) => {
              this.props.hasOwnProperty(t3) ? (r2 = !1) : ((n2 = !0), (l2[t3] = e3[t3]));
            }),
              !n2 || (t2 && !r2) || this.setState({ ...l2, ...o2 });
          }
        }),
        o(this, "scrollTo", (e3) => {
          e3 &&
            typeof e3 == "object" &&
            e3.autoExpand &&
            this.setExpandedKeys(Jc(this.state.expandedKeys, e3.key)),
            this.listRef.current.scrollTo(e3);
        });
    }
    componentDidMount() {
      (this.destroyed = !1),
        this.onUpdated(),
        window.addEventListener("mouseup", this.onGlobalMouseUp);
    }
    componentDidUpdate() {
      this.onUpdated();
    }
    onUpdated() {
      const { activeKey: e3, itemScrollOffset: t2 = 0 } = this.props;
      e3 !== void 0 &&
        e3 !== this.state.activeKey &&
        (this.setState({ activeKey: e3 }), e3 !== null && this.scrollTo({ key: e3, offset: t2 }));
    }
    componentWillUnmount() {
      window.removeEventListener("dragend", this.onWindowDragEnd),
        window.removeEventListener("mouseup", this.onGlobalMouseUp),
        (this.destroyed = !0);
    }
    static getDerivedStateFromProps(e3, t2) {
      const { prevProps: o2 } = t2,
        n2 = { prevProps: e3 };
      function r2(t3) {
        return (!o2 && e3.hasOwnProperty(t3)) || (o2 && o2[t3] !== e3[t3]);
      }
      let l2,
        { fieldNames: a2 } = t2;
      if (
        (r2("fieldNames") && ((a2 = Ic(e3.fieldNames)), (n2.fieldNames = a2)),
        r2("treeData")
          ? ({ treeData: l2 } = e3)
          : r2("children") &&
            (Oe(!1, "`children` of Tree is deprecated. Please use `treeData` instead."),
            (l2 = Bc(e3.children))),
        l2)
      ) {
        n2.treeData = l2;
        const e4 = Tc(l2, { fieldNames: a2 });
        n2.keyEntities = { [Fc]: qc, ...e4.keyEntities };
      }
      const i2 = n2.keyEntities || t2.keyEntities;
      if (r2("expandedKeys") || (o2 && r2("autoExpandParent")))
        n2.expandedKeys =
          e3.autoExpandParent || (!o2 && e3.defaultExpandParent)
            ? ld(e3.expandedKeys, i2)
            : e3.expandedKeys;
      else if (!o2 && e3.defaultExpandAll) {
        const e4 = { ...i2 };
        delete e4[Fc];
        const t3 = [];
        Object.keys(e4).forEach((o3) => {
          const n3 = e4[o3];
          n3.children && n3.children.length && t3.push(n3.key);
        }),
          (n2.expandedKeys = t3);
      } else
        !o2 &&
          e3.defaultExpandedKeys &&
          (n2.expandedKeys =
            e3.autoExpandParent || e3.defaultExpandParent
              ? ld(e3.defaultExpandedKeys, i2)
              : e3.defaultExpandedKeys);
      if ((n2.expandedKeys || delete n2.expandedKeys, l2 || n2.expandedKeys)) {
        const e4 = Rc(l2 || t2.treeData, n2.expandedKeys || t2.expandedKeys, a2);
        n2.flattenNodes = e4;
      }
      if (
        (e3.selectable &&
          (r2("selectedKeys")
            ? (n2.selectedKeys = nd(e3.selectedKeys, e3))
            : !o2 && e3.defaultSelectedKeys && (n2.selectedKeys = nd(e3.defaultSelectedKeys, e3))),
        e3.checkable)
      ) {
        let a3;
        if (
          (r2("checkedKeys")
            ? (a3 = rd(e3.checkedKeys) || {})
            : !o2 && e3.defaultCheckedKeys
              ? (a3 = rd(e3.defaultCheckedKeys) || {})
              : l2 &&
                (a3 = rd(e3.checkedKeys) || {
                  checkedKeys: t2.checkedKeys,
                  halfCheckedKeys: t2.halfCheckedKeys,
                }),
          a3)
        ) {
          let { checkedKeys: t3 = [], halfCheckedKeys: o3 = [] } = a3;
          e3.checkStrictly || ({ checkedKeys: t3, halfCheckedKeys: o3 } = sd(t3, !0, i2)),
            (n2.checkedKeys = t3),
            (n2.halfCheckedKeys = o3);
        }
      }
      return r2("loadedKeys") && (n2.loadedKeys = e3.loadedKeys), n2;
    }
    resetDragState() {
      this.setState({
        dragOverNodeKey: null,
        dropPosition: null,
        dropLevelOffset: null,
        dropTargetKey: null,
        dropContainerKey: null,
        dropTargetPos: null,
        dropAllowed: !1,
      });
    }
    render() {
      const {
          flattenNodes: e3,
          keyEntities: t2,
          draggingNodeKey: o2,
          dropLevelOffset: n2,
          dropContainerKey: r2,
          dropTargetKey: l2,
          dropPosition: a2,
          dragOverNodeKey: i2,
          indent: s2,
        } = this.state,
        {
          prefixCls: c2,
          className: d2,
          style: u2,
          styles: p2,
          classNames: m2,
          showLine: f2,
          focusable: h2,
          tabIndex: g2 = 0,
          selectable: b2,
          showIcon: v2,
          icon: y2,
          switcherIcon: $2,
          draggable: x2,
          checkable: C2,
          checkStrictly: S2,
          disabled: E2,
          motion: k2,
          loadData: N2,
          filterTreeNode: I2,
          height: B2,
          itemHeight: R2,
          scrollWidth: T2,
          virtual: M2,
          titleRender: A2,
          dropIndicatorRender: L2,
          onContextMenu: O2,
          onScroll: D2,
          direction: z2,
          rootClassName: H2,
          rootStyle: j2,
        } = this.props,
        _2 = w(this.props, { aria: !0, data: !0 });
      let K2;
      x2 &&
        (K2 = typeof x2 == "object" ? x2 : typeof x2 == "function" ? { nodeDraggable: x2 } : {});
      const W2 = {
        styles: p2,
        classNames: m2,
        prefixCls: c2,
        selectable: b2,
        showIcon: v2,
        icon: y2,
        switcherIcon: $2,
        draggable: K2,
        draggingNodeKey: o2,
        checkable: C2,
        checkStrictly: S2,
        disabled: E2,
        keyEntities: t2,
        dropLevelOffset: n2,
        dropContainerKey: r2,
        dropTargetKey: l2,
        dropPosition: a2,
        dragOverNodeKey: i2,
        indent: s2,
        direction: z2,
        dropIndicatorRender: L2,
        loadData: N2,
        filterTreeNode: I2,
        titleRender: A2,
        onNodeClick: this.onNodeClick,
        onNodeDoubleClick: this.onNodeDoubleClick,
        onNodeExpand: this.onNodeExpand,
        onNodeSelect: this.onNodeSelect,
        onNodeCheck: this.onNodeCheck,
        onNodeLoad: this.onNodeLoad,
        onNodeMouseEnter: this.onNodeMouseEnter,
        onNodeMouseLeave: this.onNodeMouseLeave,
        onNodeContextMenu: this.onNodeContextMenu,
        onNodeDragStart: this.onNodeDragStart,
        onNodeDragEnter: this.onNodeDragEnter,
        onNodeDragOver: this.onNodeDragOver,
        onNodeDragLeave: this.onNodeDragLeave,
        onNodeDragEnd: this.onNodeDragEnd,
        onNodeDrop: this.onNodeDrop,
      };
      return Nt.createElement(
        xc.Provider,
        { value: W2 },
        Nt.createElement(
          "div",
          { className: P(c2, d2, H2, { [`${c2}-show-line`]: f2 }), style: j2 },
          Nt.createElement(
            Yc,
            cd(
              {
                ref: this.listRef,
                prefixCls: c2,
                style: u2,
                data: e3,
                disabled: E2,
                selectable: b2,
                checkable: !!C2,
                motion: k2,
                dragging: o2 !== null,
                height: B2,
                itemHeight: R2,
                virtual: M2,
                focusable: h2,
                tabIndex: g2,
                activeItem: this.getActiveItem(),
                onFocus: this.onFocus,
                onMouseDown: this.onMouseDown,
                onBlur: this.onBlur,
                onKeyDown: this.onKeyDown,
                onActiveChange: this.onActiveChange,
                onListChangeStart: this.onListChangeStart,
                onListChangeEnd: this.onListChangeEnd,
                onContextMenu: O2,
                onScroll: D2,
                scrollWidth: T2,
              },
              this.getTreeNodeRequiredProps(),
              _2,
            ),
          ),
        ),
      );
    }
  }),
  o(e, "defaultProps", {
    prefixCls: "rc-tree",
    showLine: !1,
    showIcon: !0,
    selectable: !0,
    multiple: !1,
    checkable: !1,
    disabled: !1,
    checkStrictly: !1,
    draggable: !1,
    defaultExpandParent: !0,
    autoExpandParent: !1,
    defaultExpandAll: !1,
    defaultExpandedKeys: [],
    defaultCheckedKeys: [],
    defaultSelectedKeys: [],
    dropIndicatorRender: (e3) => {
      const { dropPosition: t2, dropLevelOffset: o2, indent: n2 } = e3,
        r2 = {
          pointerEvents: "none",
          position: "absolute",
          right: 0,
          backgroundColor: "red",
          height: 2,
        };
      switch (t2) {
        case -1:
          (r2.top = 0), (r2.left = -o2 * n2);
          break;
        case 1:
          (r2.bottom = 0), (r2.left = -o2 * n2);
          break;
        case 0:
          (r2.bottom = 0), (r2.left = n2);
      }
      return It.createElement("div", { style: r2 });
    },
    allowDrop: () => !0,
    expandAction: !1,
  }),
  o(e, "TreeNode", Hc),
  e);
function ud(e3, t2) {
  return ((e4) => {
    const { checkboxCls: t3, checkboxSize: o2, lineWidth: n2 } = e4,
      r2 = `${t3}-wrapper`,
      l2 = "@media (hover: hover) and (pointer: fine)";
    return [
      {
        [`${t3}-group`]: {
          ...ve(e4),
          display: "inline-flex",
          flexWrap: "wrap",
          columnGap: e4.marginXS,
          [`> ${e4.antCls}-row`]: { flex: 1 },
        },
        [r2]: {
          ...ve(e4),
          display: "inline-flex",
          alignItems: "baseline",
          cursor: "pointer",
          "&:after": { display: "inline-block", width: 0, overflow: "hidden", content: "'\\a0'" },
          [`& + ${r2}`]: { marginInlineStart: 0 },
        },
        [t3]: {
          ...ve(e4),
          position: "relative",
          whiteSpace: "nowrap",
          lineHeight: 1,
          cursor: "pointer",
          alignSelf: "center",
          boxSizing: "border-box",
          display: "block",
          width: o2,
          height: o2,
          direction: "ltr",
          backgroundColor: e4.colorBgContainer,
          border: `${X(n2)} ${e4.lineType} ${e4.colorBorder}`,
          borderRadius: e4.borderRadiusSM,
          borderCollapse: "separate",
          transition: `all ${e4.motionDurationSlow}`,
          flex: "none",
          "@media (prefers-reduced-motion: reduce)": {
            "&, &::before, &::after": { transition: "none", animation: "none" },
          },
          "&:after": {
            boxSizing: "border-box",
            position: "absolute",
            top: `calc(${o2} / 2 - ${n2})`,
            insetInlineStart: `calc(${o2} / 4 - ${n2})`,
            display: "table",
            width: e4.calc(o2).div(14).mul(5).equal(),
            height: e4.calc(o2).div(14).mul(8).equal(),
            border: `${X(e4.lineWidthBold)} solid ${e4.colorWhite}`,
            borderTop: 0,
            borderInlineStart: 0,
            transform: "rotate(45deg) scale(0) translate(-50%,-50%)",
            opacity: 0,
            content: '""',
            transition: `all ${e4.motionDurationFast} ${e4.motionEaseInBack}, opacity ${e4.motionDurationFast}`,
            "@media (prefers-reduced-motion: reduce)": { transition: "none", animation: "none" },
          },
          [`${t3}-input`]: {
            position: "absolute",
            inset: `calc(-1 * (${n2}))`,
            zIndex: 1,
            cursor: "pointer",
            opacity: 0,
            margin: 0,
          },
          [`&:has(${t3}-input:focus-visible)`]: ye(e4),
          "& + span": { paddingInlineStart: e4.paddingXS, paddingInlineEnd: e4.paddingXS },
        },
      },
      {
        [l2]: {
          [`
          ${r2}:not(${r2}-disabled),
          ${t3}:not(${t3}-disabled)
        `]: { [`&:hover ${t3}`]: { borderColor: e4.colorPrimary } },
          [`${r2}:not(${r2}-disabled)`]: {
            [`&:hover ${t3}-checked:not(${t3}-disabled)`]: {
              backgroundColor: e4.colorPrimaryHover,
              borderColor: "transparent",
            },
          },
        },
      },
      {
        [`${t3}-checked`]: {
          backgroundColor: e4.colorPrimary,
          borderColor: e4.colorPrimary,
          "&:after": {
            opacity: 1,
            transform: "rotate(45deg) scale(1) translate(-50%,-50%)",
            transition: `all ${e4.motionDurationMid} ${e4.motionEaseOutBack} ${e4.motionDurationFast}`,
            "@media (prefers-reduced-motion: reduce)": { transition: "none", animation: "none" },
          },
          [l2]: {
            [`&:not(${t3}-disabled):hover`]: {
              backgroundColor: e4.colorPrimaryHover,
              borderColor: "transparent",
            },
          },
        },
      },
      {
        [t3]: {
          "&-indeterminate": {
            backgroundColor: e4.colorBgContainer,
            borderColor: e4.colorBorder,
            "&:after": {
              top: "50%",
              insetInlineStart: "50%",
              width: e4.calc(e4.fontSizeLG).div(2).equal(),
              height: e4.calc(e4.fontSizeLG).div(2).equal(),
              backgroundColor: e4.colorPrimary,
              border: 0,
              transform: "translate(-50%, -50%) scale(1)",
              opacity: 1,
              content: '""',
            },
            [l2]: {
              [`&:not(${t3}-disabled):hover`]: {
                backgroundColor: e4.colorBgContainer,
                borderColor: e4.colorPrimary,
              },
            },
          },
        },
      },
      {
        [`${r2}-disabled`]: { cursor: "not-allowed" },
        [`${t3}-disabled`]: {
          [`&, ${t3}-input`]: { cursor: "not-allowed", pointerEvents: "none" },
          background: e4.colorBgContainerDisabled,
          borderColor: e4.colorBorder,
          "&:after": { borderColor: e4.colorTextDisabled },
          "& + span": { color: e4.colorTextDisabled },
          [`&${t3}-indeterminate::after`]: { background: e4.colorTextDisabled },
        },
      },
    ];
  })(q(t2, { checkboxCls: `.${e3}`, checkboxSize: t2.controlInteractiveSize }));
}
const pd = Y("Checkbox", (e3, { prefixCls: t2 }) => [ud(t2, e3)]),
  md = It.createContext(null),
  fd = (e3, t2) => {
    const {
        prefixCls: o2,
        children: r2,
        indeterminate: l2 = !1,
        onMouseEnter: a2,
        onMouseLeave: i2,
        skipGroup: s2 = !1,
        disabled: c2,
        rootClassName: d2,
        className: u2,
        style: p2,
        classNames: m2,
        styles: f2,
        name: h2,
        value: g2,
        checked: b2,
        defaultChecked: v2,
        onChange: y2,
        ...$2
      } = e3,
      {
        getPrefixCls: x2,
        direction: C2,
        className: w2,
        style: S2,
        classNames: E2,
        styles: k2,
      } = oe("checkbox"),
      N2 = Nt.useContext(md),
      { isFormItemInput: I2 } = Nt.useContext(Qe),
      B2 = Nt.useContext(ne),
      R2 = c2 ?? N2?.disabled ?? B2,
      [T2, M2] = Me(v2, b2);
    let A2 = T2;
    const L2 = n((e4) => {
      M2(e4.target.checked),
        y2?.(e4),
        !s2 && N2?.toggleOption && N2.toggleOption({ label: r2, value: g2 });
    });
    N2 && !s2 && (A2 = N2.value.includes(g2));
    const O2 = Nt.useRef(null),
      D2 = re(t2, O2);
    Nt.useEffect(() => {
      if (!s2 && N2)
        return (
          N2.registerValue(g2),
          () => {
            N2.cancelValue(g2);
          }
        );
    }, [g2, s2]),
      Nt.useEffect(() => {
        var e4;
        (e4 = O2.current) != null && e4.input && (O2.current.input.indeterminate = l2);
      }, [l2]);
    const H2 = x2("checkbox", o2),
      j2 = $e(H2),
      [_2, K2] = pd(H2, j2),
      W2 = { ...$2 },
      F2 = { ...e3, indeterminate: l2, disabled: R2, checked: A2 },
      G2 = ce(S2),
      q2 = ce(p2),
      [V2, X2] = de([E2, m2], [k2, G2, f2, q2], { props: F2 }),
      U2 = P(
        `${H2}-wrapper`,
        {
          [`${H2}-rtl`]: C2 === "rtl",
          [`${H2}-wrapper-checked`]: A2,
          [`${H2}-wrapper-disabled`]: R2,
          [`${H2}-wrapper-in-form-item`]: I2,
        },
        w2,
        u2,
        V2.root,
        d2,
        K2,
        j2,
        _2,
      ),
      Y2 = P(V2.icon, { [`${H2}-indeterminate`]: l2 }, bo, _2),
      [Z2, J2] = Hi(W2.onClick);
    return Nt.createElement(
      So,
      { component: "Checkbox", disabled: R2 },
      Nt.createElement(
        "label",
        { className: U2, style: X2.root, onMouseEnter: a2, onMouseLeave: i2, onClick: Z2 },
        Nt.createElement(zi, {
          ...W2,
          name: !s2 && N2 ? N2.name : h2,
          checked: A2,
          onClick: J2,
          onChange: L2,
          prefixCls: H2,
          className: Y2,
          style: X2.icon,
          disabled: R2,
          ref: D2,
          value: g2,
        }),
        z(r2) &&
          Nt.createElement("span", { className: P(`${H2}-label`, V2.label), style: X2.label }, r2),
      ),
    );
  },
  hd = Nt.forwardRef(fd),
  gd = Nt.forwardRef((e3, t2) => {
    const {
        defaultValue: o2,
        children: n2,
        options: r2 = [],
        prefixCls: l2,
        className: a2,
        rootClassName: i2,
        style: s2,
        onChange: c2,
        role: d2 = "group",
        ...u2
      } = e3,
      { getPrefixCls: p2, direction: m2 } = Nt.useContext(B),
      [h2, g2] = Me(o2 || [], u2.value),
      b2 = h2 || [],
      [v2, y2] = Nt.useState([]),
      $2 = Nt.useMemo(
        () =>
          r2
            .map((e4) => (I(e4) || f(e4) ? { label: e4, value: e4 } : e4))
            .filter((e4) => C(e4) && C(e4.value)),
        [r2],
      ),
      x2 = (e4) => {
        y2((t3) => t3.filter((t4) => t4 !== e4));
      },
      w2 = (e4) => {
        y2((t3) => [].concat(S(t3), [e4]));
      },
      E2 = (e4) => {
        const t3 = b2.indexOf(e4.value),
          o3 = S(b2);
        t3 === -1 ? o3.push(e4.value) : o3.splice(t3, 1),
          g2(o3),
          c2?.(
            o3
              .filter((e5) => v2.includes(e5))
              .sort(
                (e5, t4) =>
                  $2.findIndex((t5) => t5.value === e5) - $2.findIndex((e6) => e6.value === t4),
              ),
          );
      },
      k2 = p2("checkbox", l2),
      N2 = `${k2}-group`,
      R2 = $e(k2),
      [T2, M2] = pd(k2, R2),
      A2 = se(u2, ["value", "disabled"]),
      L2 =
        $2.length > 0
          ? $2.map((e4) =>
              Nt.createElement(
                hd,
                {
                  prefixCls: k2,
                  key: e4.value.toString(),
                  disabled: "disabled" in e4 ? e4.disabled : u2.disabled,
                  value: e4.value,
                  checked: b2.includes(e4.value),
                  onChange: e4.onChange,
                  className: P(`${N2}-item`, e4.className),
                  style: e4.style,
                  title: e4.title,
                  id: e4.id,
                  required: e4.required,
                },
                e4.label,
              ),
            )
          : n2,
      O2 = Nt.useMemo(
        () => ({
          toggleOption: E2,
          value: b2,
          disabled: u2.disabled,
          name: u2.name,
          registerValue: w2,
          cancelValue: x2,
        }),
        [E2, b2, u2.disabled, u2.name, w2, x2],
      ),
      D2 = P(N2, { [`${N2}-rtl`]: m2 === "rtl" }, a2, i2, M2, R2, T2);
    return Nt.createElement(
      "div",
      { className: D2, style: s2, role: d2, ...A2, ref: t2 },
      Nt.createElement(md.Provider, { value: O2 }, L2),
    );
  }),
  bd = hd;
(bd.Group = gd), (bd.__ANT_CHECKBOX = !0);
const vd = bd,
  yd = (e3) => {
    const {
        componentCls: t2,
        borderRadius: o2,
        paddingSM: n2,
        colorBorder: r2,
        paddingXS: l2,
        fontSizeLG: a2,
        fontSizeSM: i2,
        borderRadiusLG: s2,
        borderRadiusSM: c2,
        colorBgContainerDisabled: d2,
        lineWidth: u2,
        lineType: p2,
        antCls: m2,
      } = e3,
      [f2, h2] = k(m2, "space-addon");
    return {
      [t2]: [
        {
          ...ve(e3),
          display: "inline-flex",
          alignItems: "center",
          gap: 0,
          whiteSpace: "nowrap",
          paddingInline: n2,
          margin: 0,
          borderWidth: u2,
          borderStyle: p2,
          borderRadius: o2,
          "&:hover": { zIndex: 0 },
          [`&${t2}-disabled`]: { color: e3.colorTextDisabled },
          "&-large": { fontSize: a2, borderRadius: s2 },
          "&-small": { paddingInline: l2, borderRadius: c2, fontSize: i2 },
          "&-compact-last-item": { borderEndStartRadius: 0, borderStartStartRadius: 0 },
          "&-compact-first-item": { borderEndEndRadius: 0, borderStartEndRadius: 0 },
          "&-compact-item:not(:first-child):not(:last-child)": { borderRadius: 0 },
          "&-compact-item:not(:last-child)": { borderInlineEndWidth: 0 },
          "&-compact-item:not(:first-child)": { borderInlineStartWidth: 0 },
        },
        {
          [f2("addon-border-color")]: r2,
          [f2("addon-background")]: d2,
          [f2("addon-border-color-outlined")]: r2,
          [f2("addon-background-filled")]: d2,
          borderColor: h2("addon-border-color"),
          background: h2("addon-background"),
          "&-variant-outlined": { [f2("addon-border-color")]: h2("addon-border-color-outlined") },
          "&-variant-filled": {
            [f2("addon-border-color")]: "transparent",
            [f2("addon-background")]: h2("addon-background-filled"),
            [`&${t2}-disabled`]: { [f2("addon-border-color")]: r2, [f2("addon-background")]: d2 },
          },
          "&-variant-borderless": { border: "none", background: "transparent" },
          "&-variant-underlined": { border: "none", background: "transparent" },
        },
        {
          "&-status-error": {
            [f2("addon-border-color-outlined")]: e3.colorError,
            [f2("addon-background-filled")]: e3.colorErrorBg,
            color: e3.colorError,
          },
          "&-status-warning": {
            [f2("addon-border-color-outlined")]: e3.colorWarning,
            [f2("addon-background-filled")]: e3.colorWarningBg,
            color: e3.colorWarning,
          },
        },
      ],
    };
  },
  $d = Y("Addon", (e3) => [yd(e3), ee(e3, { focus: !1 })]),
  xd = It.forwardRef((e3, t2) => {
    const {
        className: o2,
        children: n2,
        style: r2,
        prefixCls: l2,
        variant: a2 = "outlined",
        disabled: i2,
        status: s2,
        ...c2
      } = e3,
      { getPrefixCls: d2, direction: u2 } = It.useContext(B),
      p2 = d2("space-addon", l2),
      [m2, f2] = $d(p2),
      { compactItemClassnames: h2, compactSize: g2 } = ae(p2, u2),
      b2 = lt(p2, s2),
      v2 = P(
        p2,
        m2,
        h2,
        f2,
        `${p2}-variant-${a2}`,
        b2,
        { [`${p2}-${g2}`]: g2, [`${p2}-disabled`]: i2 },
        o2,
      );
    return It.createElement("div", { ref: t2, className: v2, style: r2, ...c2 }, n2);
  });
function Cd(e3, t2, o2) {
  const n2 = t2.cloneNode(!0),
    r2 = Object.create(e3, { target: { value: n2 }, currentTarget: { value: n2 } });
  return (
    (n2.value = o2),
    typeof t2.selectionStart == "number" &&
      typeof t2.selectionEnd == "number" &&
      ((n2.selectionStart = t2.selectionStart), (n2.selectionEnd = t2.selectionEnd)),
    (n2.setSelectionRange = (...e4) => {
      t2.setSelectionRange(...e4);
    }),
    r2
  );
}
function wd(e3, t2, o2, n2) {
  if (!o2) return;
  let r2 = t2;
  return t2.type === "click"
    ? ((r2 = Cd(t2, e3, "")), void o2(r2))
    : (e3.type !== "file" && n2 !== void 0 && (r2 = Cd(t2, e3, n2)), void o2(r2));
}
function Sd() {
  return (
    (Sd = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    Sd.apply(this, arguments)
  );
}
const Ed = It.forwardRef((e3, t2) => {
  var o2, n2, r2;
  const {
      inputElement: l2,
      children: a2,
      prefixCls: i2,
      prefix: s2,
      suffix: c2,
      addonBefore: d2,
      addonAfter: u2,
      className: p2,
      style: m2,
      disabled: f2,
      readOnly: h2,
      focused: g2,
      triggerFocus: b2,
      allowClear: v2,
      value: y2,
      handleReset: $2,
      hidden: x2,
      classes: C2,
      classNames: w2,
      dataAttrs: S2,
      styles: E2,
      components: k2,
      onClear: N2,
    } = e3,
    I2 = a2 ?? l2,
    B2 = k2?.affixWrapper || "span",
    R2 = k2?.groupWrapper || "span",
    T2 = k2?.wrapper || "span",
    M2 = k2?.groupAddon || "span",
    A2 = Nt.useRef(null),
    L2 = (e4) => {
      var t3;
      (t3 = A2.current) != null && t3.contains(e4.target) && b2?.();
    },
    O2 = (function (e4) {
      return !!(e4.prefix || e4.suffix || e4.allowClear);
    })(e3);
  let D2 = Nt.cloneElement(I2, {
    value: y2,
    className: P((o2 = I2.props) == null ? void 0 : o2.className, !O2 && w2?.variant) || null,
  });
  const z2 = Nt.useRef(null);
  if ((It.useImperativeHandle(t2, () => ({ nativeElement: z2.current || A2.current })), O2)) {
    let e4 = null;
    if (v2) {
      const t4 = !f2 && !h2 && y2 && !(typeof v2 == "object" && v2.disabled),
        o4 = `${i2}-clear-icon`,
        n4 = typeof v2 == "object" && v2?.clearIcon ? v2.clearIcon : "\u2716";
      e4 = It.createElement(
        "button",
        {
          type: "button",
          onClick: (e5) => {
            $2?.(e5), N2?.();
          },
          onMouseDown: (e5) => e5.preventDefault(),
          className: P(o4, { [`${o4}-hidden`]: !t4, [`${o4}-has-suffix`]: !!c2 }, w2?.clear),
          style: E2?.clear,
        },
        n4,
      );
    }
    const t3 = `${i2}-affix-wrapper`,
      o3 = P(
        t3,
        {
          [`${i2}-disabled`]: f2,
          [`${t3}-disabled`]: f2,
          [`${t3}-focused`]: g2,
          [`${t3}-readonly`]: h2,
          [`${t3}-input-with-clear-btn`]: c2 && v2 && y2,
        },
        C2?.affixWrapper,
        w2?.affixWrapper,
        w2?.variant,
      ),
      n3 =
        (c2 || v2) &&
        It.createElement(
          "span",
          { className: P(`${i2}-suffix`, w2?.suffix), style: E2?.suffix },
          e4,
          c2,
        );
    D2 = It.createElement(
      B2,
      Sd({ className: o3, style: E2?.affixWrapper, onClick: L2 }, S2?.affixWrapper, { ref: A2 }),
      s2 &&
        It.createElement(
          "span",
          { className: P(`${i2}-prefix`, w2?.prefix), style: E2?.prefix },
          s2,
        ),
      D2,
      n3,
    );
  }
  if (
    (function (e4) {
      return !(!e4.addonBefore && !e4.addonAfter);
    })(e3)
  ) {
    const e4 = `${i2}-group`,
      t3 = `${e4}-addon`,
      o3 = `${e4}-wrapper`,
      n3 = P(`${i2}-wrapper`, e4, C2?.wrapper, w2?.wrapper),
      r3 = P(o3, { [`${o3}-disabled`]: f2 }, C2?.group, w2?.groupWrapper);
    D2 = It.createElement(
      R2,
      { className: r3, ref: z2 },
      It.createElement(
        T2,
        { className: n3 },
        d2 && It.createElement(M2, { className: t3 }, d2),
        D2,
        u2 && It.createElement(M2, { className: t3 }, u2),
      ),
    );
  }
  return It.cloneElement(D2, {
    className: P((n2 = D2.props) == null ? void 0 : n2.className, p2) || null,
    style: { ...((r2 = D2.props) == null ? void 0 : r2.style), ...m2 },
    hidden: x2,
  });
});
function kd() {
  return (
    (kd = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    kd.apply(this, arguments)
  );
}
const Nd = Nt.forwardRef((e3, t2) => {
    const {
        autoComplete: o2,
        onChange: n2,
        onFocus: r2,
        onBlur: l2,
        onPressEnter: a2,
        onKeyDown: i2,
        onKeyUp: s2,
        prefixCls: c2 = "rc-input",
        disabled: d2,
        htmlSize: u2,
        className: p2,
        maxLength: m2,
        suffix: f2,
        showCount: h2,
        count: g2,
        type: b2 = "text",
        classes: v2,
        classNames: y2,
        styles: $2,
        onCompositionStart: x2,
        onCompositionEnd: C2,
        ...w2
      } = e3,
      [S2, E2] = Nt.useState(!1),
      k2 = Nt.useRef(!1),
      N2 = Nt.useRef(!1),
      I2 = Nt.useRef(null),
      B2 = Nt.useRef(null),
      R2 = (e4) => {
        I2.current &&
          (function (e5, t3) {
            if (!e5) return;
            e5.focus(t3);
            const { cursor: o3 } = t3 || {};
            if (o3 && (e5 instanceof HTMLInputElement || e5 instanceof HTMLTextAreaElement)) {
              const t4 = e5.value.length;
              switch (o3) {
                case "start":
                  e5.setSelectionRange(0, 0);
                  break;
                case "end":
                  e5.setSelectionRange(t4, t4);
                  break;
                default:
                  e5.setSelectionRange(0, t4);
              }
            }
          })(I2.current, e4);
      },
      { setValue: T2, formatValue: M2 } = (function (e4, t3) {
        const [o3, n3] = Me(e4, t3);
        return { value: o3, setValue: n3, formatValue: o3 == null ? "" : String(o3) };
      })(e3.defaultValue, e3.value),
      A2 = (function (e4, t3) {
        return Nt.useMemo(() => {
          let o3 = {};
          t3 && (o3.show = typeof t3 == "object" && t3.formatter ? t3.formatter : !!t3),
            (o3 = { ...o3, ...e4 });
          const { show: n3, ...r3 } = o3;
          return {
            ...r3,
            show: !!n3,
            showFormatter: typeof n3 == "function" ? n3 : void 0,
            strategy: r3.strategy || ((e5) => e5.length),
          };
        }, [e4, t3]);
      })(g2, h2),
      { isOutOfRange: L2, dataCount: O2 } = (function ({
        countConfig: e4,
        value: t3,
        maxLength: o3,
      }) {
        return Nt.useMemo(() => {
          const n3 = e4.max ?? o3,
            r3 = e4.strategy(t3),
            l3 = !!n3 && r3 > n3,
            a3 = Number(n3) > 0;
          return {
            mergedMax: n3,
            isOutOfRange: l3,
            dataCount: e4.show
              ? e4.showFormatter
                ? e4.showFormatter({ value: t3, count: r3, maxLength: n3 })
                : `${r3}${a3 ? ` / ${n3}` : ""}`
              : void 0,
          };
        }, [e4, o3, t3]);
      })({ countConfig: A2, value: M2, maxLength: m2 }),
      D2 = (function ({ countConfig: e4, getTarget: t3 }) {
        const [o3, n3] = Nt.useState(null),
          r3 = Nt.useRef(t3);
        return (
          Nt.useEffect(() => {
            r3.current = t3;
          }, [t3]),
          Nt.useEffect(() => {
            var e5;
            o3 && ((e5 = r3.current()) == null || e5.setSelectionRange(...o3), n3(null));
          }, [o3]),
          Nt.useCallback(
            (t4, o4) => {
              var l3, a3;
              let i3 = t4;
              return (
                !o4 &&
                  e4.exceedFormatter &&
                  e4.max &&
                  e4.strategy(t4) > e4.max &&
                  ((i3 = e4.exceedFormatter(t4, { max: e4.max })),
                  t4 !== i3 &&
                    n3([
                      ((l3 = r3.current()) == null ? void 0 : l3.selectionStart) || 0,
                      ((a3 = r3.current()) == null ? void 0 : a3.selectionEnd) || 0,
                    ])),
                i3
              );
            },
            [e4],
          )
        );
      })({ countConfig: A2, getTarget: () => I2.current });
    Nt.useImperativeHandle(t2, () => {
      var e4;
      return {
        focus: R2,
        blur: () => {
          var e5;
          (e5 = I2.current) == null || e5.blur();
        },
        setSelectionRange: (e5, t3, o3) => {
          var n3;
          (n3 = I2.current) == null || n3.setSelectionRange(e5, t3, o3);
        },
        select: () => {
          var e5;
          (e5 = I2.current) == null || e5.select();
        },
        input: I2.current,
        nativeElement: ((e4 = B2.current) == null ? void 0 : e4.nativeElement) || I2.current,
      };
    }),
      Nt.useEffect(() => {
        N2.current && (N2.current = !1), E2((e4) => (!e4 || !d2) && e4);
      }, [d2]);
    const z2 = (e4, t3, o3) => {
        const r3 = D2(t3, k2.current);
        (o3.source === "compositionEnd" && t3 === r3) ||
          (T2(r3), I2.current && wd(I2.current, e4, n2, r3));
      },
      H2 = (e4) => {
        z2(e4, e4.target.value, { source: "change" });
      },
      j2 = (e4) => {
        (k2.current = !1), z2(e4, e4.currentTarget.value, { source: "compositionEnd" }), C2?.(e4);
      },
      _2 = (e4) => {
        !a2 ||
          e4.key !== "Enter" ||
          N2.current ||
          e4.nativeEvent.isComposing ||
          ((N2.current = !0), a2(e4)),
          i2?.(e4);
      },
      K2 = (e4) => {
        e4.key === "Enter" && (N2.current = !1), s2?.(e4);
      },
      W2 = (e4) => {
        E2(!0), r2?.(e4);
      },
      F2 = (e4) => {
        N2.current && (N2.current = !1), E2(!1), l2?.(e4);
      },
      G2 = L2 && `${c2}-out-of-range`;
    return It.createElement(
      Ed,
      kd({}, w2, {
        prefixCls: c2,
        className: P(p2, G2),
        handleReset: (e4) => {
          T2(""), R2(), I2.current && wd(I2.current, e4, n2);
        },
        value: M2,
        focused: S2,
        triggerFocus: R2,
        suffix:
          f2 || A2.show
            ? It.createElement(
                It.Fragment,
                null,
                A2.show &&
                  It.createElement(
                    "span",
                    {
                      className: P(
                        `${c2}-show-count-suffix`,
                        { [`${c2}-show-count-has-suffix`]: !!f2 },
                        y2?.count,
                      ),
                      style: { ...$2?.count },
                    },
                    O2,
                  ),
                f2,
              )
            : null,
        disabled: d2,
        classes: v2,
        classNames: y2,
        styles: $2,
        ref: B2,
      }),
      (() => {
        const t3 = se(e3, [
          "prefixCls",
          "onPressEnter",
          "addonBefore",
          "addonAfter",
          "prefix",
          "suffix",
          "allowClear",
          "defaultValue",
          "showCount",
          "count",
          "classes",
          "htmlSize",
          "styles",
          "classNames",
          "onClear",
        ]);
        return It.createElement(
          "input",
          kd({ autoComplete: o2 }, t3, {
            onChange: H2,
            onFocus: W2,
            onBlur: F2,
            onKeyDown: _2,
            onKeyUp: K2,
            className: P(c2, { [`${c2}-disabled`]: d2 }, y2?.input),
            style: $2?.input,
            ref: I2,
            size: u2,
            type: b2,
            onCompositionStart: (e4) => {
              (k2.current = !0), x2?.(e4);
            },
            onCompositionEnd: j2,
          }),
        );
      })(),
    );
  }),
  Id = Nt.forwardRef((e3, t2) => {
    const {
        prefixCls: o2,
        bordered: n2 = !0,
        status: r2,
        size: l2,
        disabled: a2,
        onBlur: i2,
        onFocus: s2,
        suffix: c2,
        allowClear: d2,
        addonAfter: u2,
        addonBefore: p2,
        className: m2,
        style: f2,
        styles: h2,
        rootClassName: y2,
        onChange: $2,
        classNames: x2,
        variant: C2,
        ...w2
      } = e3,
      {
        getPrefixCls: S2,
        direction: E2,
        allowClear: k2,
        autoComplete: N2,
        className: I2,
        style: B2,
        classNames: R2,
        styles: T2,
      } = oe("input"),
      A2 = S2("input", o2),
      L2 = Nt.useRef(null),
      O2 = $e(A2),
      [D2, z2] = Bs(A2, y2);
    Rs(A2, O2);
    const { compactSize: H2, compactItemClassnames: j2 } = ae(A2, E2),
      _2 = ie((e4) => l2 ?? H2 ?? e4),
      K2 = It.useContext(ne),
      W2 = a2 ?? K2,
      F2 = { ...e3, size: _2, disabled: W2 },
      G2 = ce(B2),
      q2 = ce(f2),
      [V2, X2] = de([R2, x2], [T2, G2, h2, q2], { props: F2 }),
      { status: U2, hasFeedback: Y2, feedbackIcon: Z2 } = Nt.useContext(Qe),
      J2 = it(U2, r2),
      Q2 =
        (function (e4) {
          return !!(e4.prefix || e4.suffix || e4.allowClear || e4.showCount);
        })(e3) || !!Y2;
    Nt.useRef(Q2);
    const ee2 = (function (e4, t3) {
        const o3 = Nt.useRef([]),
          n3 = () => {
            o3.current.push(
              setTimeout(() => {
                var t4, o4, n4, r3;
                (t4 = e4.current) != null &&
                  t4.input &&
                  ((o4 = e4.current) == null ? void 0 : o4.input.getAttribute("type")) ===
                    "password" &&
                  (n4 = e4.current) != null &&
                  n4.input.hasAttribute("value") &&
                  ((r3 = e4.current) == null || r3.input.removeAttribute("value"));
              }),
            );
          };
        return (
          Nt.useEffect(
            () => (
              t3 && n3(),
              () =>
                o3.current.forEach((e5) => {
                  e5 && clearTimeout(e5);
                })
            ),
            [t3],
          ),
          n3
        );
      })(L2, !0),
      te2 = (Y2 || c2) && It.createElement(It.Fragment, null, c2, Y2 && Z2),
      re2 = ((e4) => {
        const {
          allowClear: t3,
          clearIcon: o3,
          contextAllowClear: n3,
          contextClearIcon: r3,
          defaultAllowClear: l3,
          componentName: a3,
        } = e4;
        return Nt.useMemo(
          () =>
            !!(t3 ?? n3 ?? l3) && {
              clearIcon: g(
                v(t3) ? t3?.clearIcon : o3,
                v(n3) ? n3?.clearIcon : r3,
                It.createElement(b, null),
              ),
              disabled: (v(t3) ? t3?.disabled : void 0) ?? (v(n3) ? n3?.disabled : void 0),
            },
          [t3, o3, n3, r3, l3],
        );
      })({ allowClear: d2, contextAllowClear: k2, componentName: "Input" }),
      [le2, se2] = at("input", C2, n2);
    return It.createElement(Nd, {
      ref: M(t2, L2),
      prefixCls: A2,
      autoComplete: N2,
      ...w2,
      disabled: W2,
      onBlur: (e4) => {
        ee2(), i2?.(e4);
      },
      onFocus: (e4) => {
        ee2(), s2?.(e4);
      },
      style: X2.root,
      styles: X2,
      suffix: te2,
      allowClear: re2,
      className: P(m2, y2, z2, O2, j2, I2, V2.root),
      onChange: (e4) => {
        ee2(), $2?.(e4);
      },
      addonBefore: p2 && It.createElement(Ce, { form: !0, space: !0 }, p2),
      addonAfter: u2 && It.createElement(Ce, { form: !0, space: !0 }, u2),
      classNames: {
        ...V2,
        input: P(
          {
            [`${A2}-sm`]: _2 === "small",
            [`${A2}-lg`]: _2 === "large",
            [`${A2}-rtl`]: E2 === "rtl",
          },
          V2.input,
          D2,
        ),
        variant: P({ [`${A2}-${le2}`]: se2 }, lt(A2, J2)),
        affixWrapper: P(
          {
            [`${A2}-affix-wrapper-sm`]: _2 === "small",
            [`${A2}-affix-wrapper-lg`]: _2 === "large",
            [`${A2}-affix-wrapper-rtl`]: E2 === "rtl",
          },
          D2,
        ),
        wrapper: P({ [`${A2}-group-rtl`]: E2 === "rtl" }, D2),
        groupWrapper: P(
          {
            [`${A2}-group-wrapper-sm`]: _2 === "small",
            [`${A2}-group-wrapper-lg`]: _2 === "large",
            [`${A2}-group-wrapper-rtl`]: E2 === "rtl",
            [`${A2}-group-wrapper-${le2}`]: se2,
          },
          lt(`${A2}-group-wrapper`, J2, Y2),
          D2,
        ),
      },
    });
  });
function Bd(e3) {
  return ["small", "middle", "medium", "large"].includes(e3);
}
function Rd(e3) {
  return !!e3 && f(e3);
}
const Td = It.createContext({ latestIndex: 0 }),
  Md = Td.Provider,
  Pd = (e3) => {
    const {
        className: t2,
        prefix: o2,
        index: n2,
        children: r2,
        separator: l2,
        style: a2,
        classNames: i2,
        styles: s2,
      } = e3,
      { latestIndex: c2 } = Nt.useContext(Td);
    return z(r2)
      ? Nt.createElement(
          Nt.Fragment,
          null,
          Nt.createElement("div", { className: t2, style: a2 }, r2),
          n2 < c2 &&
            l2 &&
            Nt.createElement(
              "span",
              { className: P(`${o2}-item-separator`, i2?.separator), style: s2?.separator },
              l2,
            ),
        )
      : null;
  },
  Ad = (e3) => {
    const { componentCls: t2, antCls: o2 } = e3;
    return {
      [t2]: {
        display: "inline-flex",
        "&-rtl": { direction: "rtl" },
        "&-vertical": { flexDirection: "column" },
        "&-align": {
          flexDirection: "column",
          "&-center": { alignItems: "center" },
          "&-start": { alignItems: "flex-start" },
          "&-end": { alignItems: "flex-end" },
          "&-baseline": { alignItems: "baseline" },
        },
        [`${t2}-item:empty`]: { display: "none" },
        [`${t2}-item > ${o2}-badge-not-a-wrapper:only-child`]: { display: "block" },
      },
    };
  },
  Ld = (e3) => {
    const { componentCls: t2 } = e3;
    return {
      [t2]: {
        "&-gap-row-small": { rowGap: e3.spaceGapSmallSize },
        "&-gap-row-medium, &-gap-row-middle": { rowGap: e3.spaceGapMiddleSize },
        "&-gap-row-large": { rowGap: e3.spaceGapLargeSize },
        "&-gap-col-small": { columnGap: e3.spaceGapSmallSize },
        "&-gap-col-medium, &-gap-col-middle": { columnGap: e3.spaceGapMiddleSize },
        "&-gap-col-large": { columnGap: e3.spaceGapLargeSize },
      },
    };
  },
  Od = Y(
    "Space",
    (e3) => {
      const t2 = q(e3, {
        spaceGapSmallSize: e3.paddingXS,
        spaceGapMiddleSize: e3.padding,
        spaceGapLargeSize: e3.paddingLG,
      });
      return [Ad(t2), Ld(t2)];
    },
    () => ({}),
    { resetStyle: !1 },
  ),
  Dd = Nt.forwardRef((e3, t2) => {
    const {
        getPrefixCls: o2,
        direction: n2,
        size: r2,
        className: l2,
        style: a2,
        classNames: i2,
        styles: s2,
      } = oe("space"),
      {
        size: c2 = r2 ?? "small",
        align: d2,
        className: u2,
        rootClassName: p2,
        children: m2,
        direction: f2,
        orientation: h2,
        prefixCls: g2,
        split: b2,
        separator: v2,
        style: y2,
        vertical: $2,
        wrap: x2 = !1,
        classNames: C2,
        styles: w2,
        ...S2
      } = e3,
      [E2, k2] = Array.isArray(c2) ? c2 : [c2, c2],
      N2 = Bd(k2),
      I2 = Bd(E2),
      B2 = Rd(k2),
      R2 = Rd(E2),
      T2 = te(m2, { keepEmpty: !0 }),
      [M2, A2] = et(h2, $2, f2),
      L2 = d2 !== void 0 || A2 ? d2 : "center",
      O2 = v2 ?? b2,
      D2 = o2("space", g2),
      [H2, j2] = Od(D2),
      _2 = { ...e3, size: c2, orientation: M2, align: L2 },
      K2 = ce(a2),
      W2 = ce(y2),
      [F2, G2] = de([i2, C2], [s2, K2, w2, W2], { props: _2 }),
      q2 = P(
        D2,
        l2,
        H2,
        `${D2}-${M2}`,
        {
          [`${D2}-rtl`]: n2 === "rtl",
          [`${D2}-align-${L2}`]: L2,
          [`${D2}-gap-row-${k2}`]: N2,
          [`${D2}-gap-col-${E2}`]: I2,
        },
        u2,
        p2,
        j2,
        F2.root,
      ),
      V2 = P(`${D2}-item`, F2.item),
      X2 = T2.map((e4, t3) => {
        const o3 = e4?.key || `${V2}-${t3}`;
        return Nt.createElement(
          Pd,
          {
            prefix: D2,
            classNames: F2,
            styles: G2,
            className: V2,
            key: o3,
            index: t3,
            separator: O2,
            style: G2.item,
          },
          e4,
        );
      }),
      U2 = Nt.useMemo(
        () => ({ latestIndex: T2.reduce((e4, t3, o3) => (z(t3) ? o3 : e4), 0) }),
        [T2],
      );
    if (T2.length === 0) return null;
    const Y2 = {};
    return (
      x2 && (Y2.flexWrap = "wrap"),
      !I2 && R2 && (Y2.columnGap = E2),
      !N2 && B2 && (Y2.rowGap = k2),
      Nt.createElement(
        "div",
        { ref: t2, className: q2, style: { ...Y2, ...G2.root }, ...S2 },
        Nt.createElement(Md, { value: U2 }, X2),
      )
    );
  });
(Dd.Compact = st), (Dd.Addon = xd);
const zd = Dd,
  Hd = (e3) => {
    const { getPopupContainer: t2, getPrefixCls: o2, direction: n2 } = Nt.useContext(B),
      {
        prefixCls: r2,
        type: l2 = "default",
        danger: a2,
        disabled: i2,
        loading: s2,
        onClick: c2,
        htmlType: d2,
        children: u2,
        className: p2,
        menu: m2,
        arrow: f2,
        autoFocus: h2,
        trigger: g2,
        align: b2,
        open: v2,
        onOpenChange: y2,
        placement: $2,
        getPopupContainer: x2,
        href: C2,
        icon: w2 = Nt.createElement(ri, null),
        title: S2,
        buttonsRender: E2 = (e4) => e4,
        mouseEnterDelay: k2,
        mouseLeaveDelay: N2,
        overlayClassName: I2,
        overlayStyle: R2,
        destroyOnHidden: T2,
        destroyPopupOnHide: M2,
        dropdownRender: A2,
        popupRender: L2,
        ...O2
      } = e3,
      D2 = o2("dropdown", r2),
      z2 = `${D2}-button`,
      H2 = {
        menu: m2,
        arrow: f2,
        autoFocus: h2,
        align: b2,
        disabled: i2,
        trigger: i2 ? [] : g2,
        onOpenChange: y2,
        getPopupContainer: x2 || t2,
        mouseEnterDelay: k2,
        mouseLeaveDelay: N2,
        classNames: { root: I2 },
        styles: { root: R2 },
        destroyOnHidden: T2,
        popupRender: L2 || A2,
      },
      { compactSize: j2, compactItemClassnames: _2 } = ae(D2, n2),
      K2 = P(z2, _2, p2);
    "destroyPopupOnHide" in e3 && (H2.destroyPopupOnHide = M2),
      "open" in e3 && (H2.open = v2),
      (H2.placement = "placement" in e3 ? $2 : n2 === "rtl" ? "bottomLeft" : "bottomRight");
    const W2 = Nt.createElement(
        Sn,
        {
          type: l2,
          danger: a2,
          disabled: i2,
          loading: s2,
          onClick: c2,
          htmlType: d2,
          href: C2,
          title: S2,
        },
        u2,
      ),
      F2 = Nt.createElement(Sn, { type: l2, danger: a2, icon: w2 }),
      [G2, q2] = E2([W2, F2]);
    return Nt.createElement(
      zd.Compact,
      { className: K2, size: j2, block: !0, ...O2 },
      G2,
      Nt.createElement(Ti, { ...H2 }, q2),
    );
  };
Hd.__ANT_BUTTON = !0;
const jd = Hd,
  _d = Ti;
_d.Button = jd;
const Kd = _d,
  Wd = {
    icon: {
      tag: "svg",
      attrs: { viewBox: "64 64 896 896", focusable: "false" },
      children: [
        {
          tag: "path",
          attrs: {
            d: "M272.9 512l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L186.8 492.3a31.99 31.99 0 000 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H532c6.7 0 10.4-7.7 6.3-12.9L272.9 512zm304 0l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L490.8 492.3a31.99 31.99 0 000 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H836c6.7 0 10.4-7.7 6.3-12.9L576.9 512z",
          },
        },
      ],
    },
    name: "double-left",
    theme: "outlined",
  };
function Fd() {
  return (
    (Fd = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    Fd.apply(this, arguments)
  );
}
const Gd = (e3, t2) => Nt.createElement(d, Fd({}, e3, { ref: t2, icon: Wd })),
  qd = Nt.forwardRef(Gd),
  Vd = {
    icon: {
      tag: "svg",
      attrs: { viewBox: "64 64 896 896", focusable: "false" },
      children: [
        {
          tag: "path",
          attrs: {
            d: "M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1A7.98 7.98 0 00188 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5zm304 0L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1A7.98 7.98 0 00492 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z",
          },
        },
      ],
    },
    name: "double-right",
    theme: "outlined",
  };
function Xd() {
  return (
    (Xd = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    Xd.apply(this, arguments)
  );
}
const Ud = (e3, t2) => Nt.createElement(d, Xd({}, e3, { ref: t2, icon: Vd })),
  Yd = Nt.forwardRef(Ud),
  Zd = {
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
  },
  Jd = [10, 20, 50, 100],
  Qd = (e3) => {
    const {
        pageSizeOptions: t2 = Jd,
        locale: o2,
        changeSize: n2,
        pageSize: r2,
        goButton: l2,
        quickGo: a2,
        rootPrefixCls: i2,
        disabled: s2,
        buildOptionText: c2,
        showSizeChanger: d2,
        sizeChangerRender: u2,
      } = e3,
      [p2, m2] = It.useState(""),
      f2 = It.useMemo(() => (!p2 || Number.isNaN(p2) ? void 0 : Number(p2)), [p2]),
      h2 = typeof c2 == "function" ? c2 : (e4) => `${e4} ${o2.items_per_page}`,
      g2 = (e4) => {
        const t3 = e4.target.value;
        /^\d*$/.test(t3) && m2(t3);
      },
      b2 = (e4) => {
        l2 ||
          p2 === "" ||
          (m2(""),
          (e4.relatedTarget &&
            (e4.relatedTarget.className.includes(`${i2}-item-link`) ||
              e4.relatedTarget.className.includes(`${i2}-item`))) ||
            a2 == null ||
            a2(f2));
      },
      v2 = (e4) => {
        p2 !== "" && ((e4.keyCode !== Pe.ENTER && e4.type !== "click") || (m2(""), a2?.(f2)));
      },
      y2 = `${i2}-options`;
    if (!d2 && !a2) return null;
    let $2 = null,
      x2 = null,
      C2 = null;
    return (
      d2 &&
        u2 &&
        ($2 = u2({
          disabled: s2,
          size: r2,
          onSizeChange: (e4) => {
            n2?.(Number(e4));
          },
          "aria-label": o2.page_size,
          className: `${y2}-size-changer`,
          options: (t2.some((e4) => e4.toString() === r2.toString())
            ? t2
            : t2
                .concat([r2])
                .sort(
                  (e4, t3) =>
                    (Number.isNaN(Number(e4)) ? 0 : Number(e4)) -
                    (Number.isNaN(Number(t3)) ? 0 : Number(t3)),
                )
          ).map((e4) => ({ label: h2(e4), value: e4 })),
        })),
      a2 &&
        (l2 &&
          (C2 =
            typeof l2 == "boolean"
              ? It.createElement(
                  "button",
                  {
                    type: "button",
                    onClick: v2,
                    onKeyUp: v2,
                    disabled: s2,
                    className: `${y2}-quick-jumper-button`,
                  },
                  o2.jump_to_confirm,
                )
              : It.createElement("span", { onClick: v2, onKeyUp: v2 }, l2)),
        (x2 = It.createElement(
          "div",
          { className: `${y2}-quick-jumper` },
          o2.jump_to,
          It.createElement("input", {
            disabled: s2,
            type: "text",
            value: p2,
            onChange: g2,
            onKeyUp: v2,
            onBlur: b2,
            "aria-label": o2.page,
          }),
          o2.page,
          C2,
        ))),
      It.createElement("li", { className: y2 }, $2, x2)
    );
  },
  eu = (e3) => {
    const {
        rootPrefixCls: t2,
        page: o2,
        active: n2,
        className: r2,
        style: l2,
        showTitle: a2,
        onClick: i2,
        onKeyPress: s2,
        itemRender: c2,
      } = e3,
      d2 = `${t2}-item`,
      u2 = P(d2, `${d2}-${o2}`, { [`${d2}-active`]: n2, [`${d2}-disabled`]: !o2 }, r2),
      p2 = c2(o2, "page", It.createElement("a", { rel: "nofollow" }, o2));
    return p2
      ? It.createElement(
          "li",
          {
            title: a2 ? String(o2) : null,
            className: u2,
            style: l2,
            onClick: () => {
              i2(o2);
            },
            onKeyDown: (e4) => {
              s2(e4, i2, o2);
            },
            tabIndex: 0,
          },
          p2,
        )
      : null;
  };
function tu() {
  return (
    (tu = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    tu.apply(this, arguments)
  );
}
const ou = (e3, t2, o2) => o2;
function nu() {}
function ru(e3) {
  const t2 = Number(e3);
  return typeof t2 == "number" && !Number.isNaN(t2) && isFinite(t2) && Math.floor(t2) === t2;
}
function lu(e3, t2, o2) {
  const n2 = e3 === void 0 ? t2 : e3;
  return Math.floor((o2 - 1) / n2) + 1;
}
const au = (e3) => {
    const {
        prefixCls: t2 = "rc-pagination",
        selectPrefixCls: o2 = "rc-select",
        className: n2,
        classNames: r2,
        styles: l2,
        current: a2,
        defaultCurrent: i2 = 1,
        total: s2 = 0,
        pageSize: c2,
        defaultPageSize: d2 = 10,
        onChange: u2 = nu,
        hideOnSinglePage: p2,
        align: m2,
        showPrevNextJumpers: f2 = !0,
        showQuickJumper: h2,
        showLessItems: g2,
        showTitle: b2 = !0,
        onShowSizeChange: v2 = nu,
        locale: y2 = Zd,
        style: $2,
        totalBoundaryShowSizeChanger: x2 = 50,
        disabled: C2,
        simple: S2,
        showTotal: E2,
        showSizeChanger: k2 = s2 > x2,
        sizeChangerRender: N2,
        pageSizeOptions: I2,
        itemRender: B2 = ou,
        jumpPrevIcon: R2,
        jumpNextIcon: T2,
        prevIcon: M2,
        nextIcon: A2,
      } = e3,
      L2 = It.useRef(null),
      [O2, D2] = Me(d2, c2),
      [z2, H2] = Me(i2, a2),
      j2 = Math.max(1, Math.min(z2, lu(void 0, O2, s2))),
      [_2, K2] = It.useState(j2);
    Nt.useEffect(() => {
      K2(j2);
    }, [j2]);
    const W2 = Math.max(1, j2 - (g2 ? 3 : 5)),
      F2 = Math.min(lu(void 0, O2, s2), j2 + (g2 ? 3 : 5));
    function G2(o3, n3) {
      let r3 =
        o3 ||
        It.createElement("button", {
          type: "button",
          "aria-label": n3,
          className: `${t2}-item-link`,
        });
      return typeof o3 == "function" && (r3 = It.createElement(o3, e3)), r3;
    }
    function q2(e4) {
      const t3 = e4.target.value,
        o3 = lu(void 0, O2, s2);
      let n3;
      return (n3 = t3 === "" ? t3 : Number.isNaN(Number(t3)) ? _2 : t3 >= o3 ? o3 : Number(t3)), n3;
    }
    const V2 = s2 > O2 && h2;
    function X2(e4) {
      const t3 = q2(e4);
      switch ((t3 !== _2 && K2(t3), e4.keyCode)) {
        case Pe.ENTER:
          U2(t3);
          break;
        case Pe.UP:
          U2(t3 - 1);
          break;
        case Pe.DOWN:
          U2(t3 + 1);
      }
    }
    function U2(e4) {
      if (
        (function (e5) {
          return ru(e5) && e5 !== j2 && ru(s2) && s2 > 0;
        })(e4) &&
        !C2
      ) {
        const t3 = lu(void 0, O2, s2);
        let o3 = e4;
        return (
          e4 > t3 ? (o3 = t3) : e4 < 1 && (o3 = 1), o3 !== _2 && K2(o3), H2(o3), u2?.(o3, O2), o3
        );
      }
      return j2;
    }
    const Y2 = j2 > 1,
      Z2 = j2 < lu(void 0, O2, s2);
    function J2() {
      Y2 && U2(j2 - 1);
    }
    function Q2() {
      Z2 && U2(j2 + 1);
    }
    function ee2() {
      U2(W2);
    }
    function te2() {
      U2(F2);
    }
    function oe2(e4, t3, ...o3) {
      (e4.key !== "Enter" && e4.charCode !== Pe.ENTER && e4.keyCode !== Pe.ENTER) || t3(...o3);
    }
    function ne2(e4) {
      (e4.type !== "click" && e4.keyCode !== Pe.ENTER) || U2(_2);
    }
    let re2 = null;
    const le2 = w(e3, { aria: !0, data: !0 }),
      ae2 =
        E2 &&
        It.createElement(
          "li",
          { className: `${t2}-total-text` },
          E2(s2, [s2 === 0 ? 0 : (j2 - 1) * O2 + 1, j2 * O2 > s2 ? s2 : j2 * O2]),
        );
    let ie2 = null;
    const se2 = lu(void 0, O2, s2);
    if (p2 && s2 <= O2) return null;
    const ce2 = [],
      de2 = {
        rootPrefixCls: t2,
        onClick: U2,
        onKeyPress: oe2,
        showTitle: b2,
        itemRender: B2,
        page: -1,
        className: r2?.item,
        style: l2?.item,
      },
      ue2 = j2 - 1 > 0 ? j2 - 1 : 0,
      pe2 = j2 + 1 < se2 ? j2 + 1 : se2,
      me2 = h2 && h2.goButton,
      fe2 = typeof S2 == "object" ? S2.readOnly : !S2;
    let he2 = me2,
      ge2 = null;
    S2 &&
      (me2 &&
        ((he2 =
          typeof me2 == "boolean"
            ? It.createElement(
                "button",
                { type: "button", onClick: ne2, onKeyUp: ne2 },
                y2.jump_to_confirm,
              )
            : It.createElement("span", { onClick: ne2, onKeyUp: ne2 }, me2)),
        (he2 = It.createElement(
          "li",
          { title: b2 ? `${y2.jump_to}${j2}/${se2}` : null, className: `${t2}-simple-pager` },
          he2,
        ))),
      (ge2 = It.createElement(
        "li",
        {
          title: b2 ? `${j2}/${se2}` : null,
          className: P(`${t2}-simple-pager`, r2?.item),
          style: l2?.item,
        },
        fe2
          ? _2
          : It.createElement("input", {
              type: "text",
              "aria-label": y2.jump_to,
              value: _2,
              disabled: C2,
              onKeyDown: function (e4) {
                (e4.keyCode !== Pe.UP && e4.keyCode !== Pe.DOWN) || e4.preventDefault();
              },
              onKeyUp: X2,
              onChange: X2,
              onBlur: function (e4) {
                U2(q2(e4));
              },
              size: 3,
            }),
        It.createElement("span", { className: `${t2}-slash` }, "/"),
        se2,
      )));
    const be2 = g2 ? 1 : 2;
    if (se2 <= 3 + 2 * be2) {
      se2 ||
        ce2.push(
          It.createElement(
            eu,
            tu({}, de2, { key: "noPager", page: 1, className: `${t2}-item-disabled` }),
          ),
        );
      for (let e4 = 1; e4 <= se2; e4 += 1)
        ce2.push(It.createElement(eu, tu({}, de2, { key: e4, page: e4, active: j2 === e4 })));
    } else {
      const e4 = g2 ? y2.prev_3 : y2.prev_5,
        o3 = g2 ? y2.next_3 : y2.next_5,
        n3 = B2(W2, "jump-prev", G2(R2, "prev page")),
        r3 = B2(F2, "jump-next", G2(T2, "next page"));
      f2 &&
        ((re2 = n3
          ? It.createElement(
              "li",
              {
                title: b2 ? e4 : null,
                key: "prev",
                onClick: ee2,
                tabIndex: 0,
                onKeyDown: function (e5) {
                  oe2(e5, ee2);
                },
                className: P(`${t2}-jump-prev`, { [`${t2}-jump-prev-custom-icon`]: !!R2 }),
              },
              n3,
            )
          : null),
        (ie2 = r3
          ? It.createElement(
              "li",
              {
                title: b2 ? o3 : null,
                key: "next",
                onClick: te2,
                tabIndex: 0,
                onKeyDown: function (e5) {
                  oe2(e5, te2);
                },
                className: P(`${t2}-jump-next`, { [`${t2}-jump-next-custom-icon`]: !!T2 }),
              },
              r3,
            )
          : null));
      let l3 = Math.max(1, j2 - be2),
        a3 = Math.min(j2 + be2, se2);
      j2 - 1 <= be2 && (a3 = 1 + 2 * be2), se2 - j2 <= be2 && (l3 = se2 - 2 * be2);
      const i3 = !!re2 && j2 - 1 >= 2 * be2 && j2 !== 3,
        s3 = !!ie2 && se2 - j2 >= 2 * be2 && j2 !== se2 - 2;
      !g2 && i3 && a3 !== se2 && (l3 += 1), !g2 && s3 && l3 !== 1 && (a3 -= 1);
      for (let t3 = l3; t3 <= a3; t3 += 1)
        ce2.push(It.createElement(eu, tu({}, de2, { key: t3, page: t3, active: j2 === t3 })));
      if (
        (i3 &&
          ((ce2[0] = It.cloneElement(ce2[0], {
            className: P(`${t2}-item-after-jump-prev`, ce2[0].props.className),
          })),
          ce2.unshift(re2)),
        s3)
      ) {
        const e5 = ce2[ce2.length - 1];
        (ce2[ce2.length - 1] = It.cloneElement(e5, {
          className: P(`${t2}-item-before-jump-next`, e5.props.className),
        })),
          ce2.push(ie2);
      }
      l3 !== 1 && ce2.unshift(It.createElement(eu, tu({}, de2, { key: 1, page: 1 }))),
        a3 !== se2 && ce2.push(It.createElement(eu, tu({}, de2, { key: se2, page: se2 })));
    }
    let ve2 = (function (e4) {
      const t3 = B2(e4, "prev", G2(M2, "prev page"));
      return It.isValidElement(t3) ? It.cloneElement(t3, { disabled: !Y2 }) : t3;
    })(ue2);
    if (ve2) {
      const e4 = !Y2 || !se2;
      ve2 = It.createElement(
        "li",
        {
          title: b2 ? y2.prev_page : null,
          onClick: J2,
          tabIndex: e4 ? null : 0,
          onKeyDown: function (e5) {
            oe2(e5, J2);
          },
          className: P(`${t2}-prev`, r2?.item, { [`${t2}-disabled`]: e4 }),
          style: l2?.item,
          "aria-disabled": e4,
        },
        ve2,
      );
    }
    let ye2 = (function (e4) {
      const t3 = B2(e4, "next", G2(A2, "next page"));
      return It.isValidElement(t3) ? It.cloneElement(t3, { disabled: !Z2 }) : t3;
    })(pe2);
    if (ye2) {
      let e4, o3;
      S2 ? ((e4 = !Z2), (o3 = Y2 ? 0 : null)) : ((e4 = !Z2 || !se2), (o3 = e4 ? null : 0)),
        (ye2 = It.createElement(
          "li",
          {
            title: b2 ? y2.next_page : null,
            onClick: Q2,
            tabIndex: o3,
            onKeyDown: function (e5) {
              oe2(e5, Q2);
            },
            className: P(`${t2}-next`, r2?.item, { [`${t2}-disabled`]: e4 }),
            style: l2?.item,
            "aria-disabled": e4,
          },
          ye2,
        ));
    }
    const $e2 = P(t2, n2, {
      [`${t2}-start`]: m2 === "start",
      [`${t2}-center`]: m2 === "center",
      [`${t2}-end`]: m2 === "end",
      [`${t2}-simple`]: S2,
      [`${t2}-disabled`]: C2,
    });
    return It.createElement(
      "ul",
      tu({ className: $e2, style: $2, ref: L2 }, le2),
      ae2,
      ve2,
      S2 ? ge2 : ce2,
      ye2,
      It.createElement(Qd, {
        locale: y2,
        rootPrefixCls: t2,
        disabled: C2,
        selectPrefixCls: o2,
        changeSize: function (e4) {
          const t3 = lu(e4, O2, s2),
            o3 = j2 > t3 && t3 !== 0 ? t3 : j2;
          D2(e4), K2(o3), v2?.(j2, e4), H2(o3), u2?.(o3, e4);
        },
        pageSize: O2,
        pageSizeOptions: I2,
        quickGo: V2 ? U2 : null,
        goButton: he2,
        showSizeChanger: k2,
        sizeChangerRender: N2,
      }),
    );
  },
  iu = (e3) => {
    const { componentCls: t2 } = e3;
    return {
      [`${t2}-disabled`]: {
        "&, &:hover": {
          cursor: "not-allowed",
          [`${t2}-item-link`]: { color: e3.colorTextDisabled, cursor: "not-allowed" },
        },
        "&:focus-visible": {
          cursor: "not-allowed",
          [`${t2}-item-link`]: { color: e3.colorTextDisabled, cursor: "not-allowed" },
        },
      },
      [`&${t2}-disabled`]: {
        cursor: "not-allowed",
        [`${t2}-item`]: {
          cursor: "not-allowed",
          backgroundColor: "transparent",
          "&:hover, &:active": { backgroundColor: "transparent" },
          a: {
            color: e3.colorTextDisabled,
            backgroundColor: "transparent",
            border: "none",
            cursor: "not-allowed",
          },
          "&-active": {
            borderColor: e3.colorBorder,
            backgroundColor: e3.itemActiveBgDisabled,
            "&:hover, &:active": { backgroundColor: e3.itemActiveBgDisabled },
            a: { color: e3.itemActiveColorDisabled },
          },
        },
        [`${t2}-item-link`]: {
          color: e3.colorTextDisabled,
          cursor: "not-allowed",
          "&:hover, &:active": { backgroundColor: "transparent" },
          [`${t2}-simple&`]: {
            backgroundColor: "transparent",
            "&:hover, &:active": { backgroundColor: "transparent" },
          },
        },
        [`${t2}-simple-pager`]: { color: e3.colorTextDisabled },
        [`${t2}-jump-prev, ${t2}-jump-next`]: {
          [`${t2}-item-link-icon`]: { opacity: 0 },
          [`${t2}-item-ellipsis`]: { opacity: 1 },
        },
      },
    };
  },
  su = (e3) => {
    const { componentCls: t2 } = e3;
    return {
      [`&${t2}-small ${t2}-options`]: {
        marginInlineStart: e3.paginationMiniOptionsMarginInlineStart,
        "&-quick-jumper": { input: { ...xs(e3), width: e3.paginationMiniQuickJumperInputWidth } },
      },
    };
  },
  cu = (e3) => {
    const { componentCls: t2 } = e3;
    return { [`&${t2}-large ${t2}-options`]: { "&-quick-jumper": { input: { ...$s(e3) } } } };
  },
  du = (e3) => {
    const { componentCls: t2, antCls: o2 } = e3,
      [, n2] = k(o2, "pagination");
    return {
      [`&${t2}-simple`]: {
        [`${t2}-prev, ${t2}-next`]: {
          height: n2("item-size-actual"),
          lineHeight: n2("item-size-actual"),
          verticalAlign: "top",
          [`${t2}-item-link`]: {
            height: n2("item-size-actual"),
            backgroundColor: "transparent",
            border: 0,
            "&:hover": { backgroundColor: e3.colorBgTextHover },
            "&:active": { backgroundColor: e3.colorBgTextActive },
            "&::after": { height: n2("item-size-actual"), lineHeight: n2("item-size-actual") },
          },
        },
        [`${t2}-simple-pager`]: {
          display: "inline-flex",
          alignItems: "center",
          height: n2("item-size-actual"),
          marginInlineEnd: n2("item-spacing-actual"),
          input: {
            boxSizing: "border-box",
            height: "100%",
            width: e3.quickJumperInputWidth,
            padding: `0 ${X(e3.paginationItemPaddingInline)}`,
            textAlign: "center",
            backgroundColor: e3.itemInputBg,
            border: `${X(e3.lineWidth)} ${e3.lineType} ${e3.colorBorder}`,
            borderRadius: e3.borderRadius,
            outline: "none",
            transition: `border-color ${e3.motionDurationMid}`,
            color: "inherit",
            "&:hover": { borderColor: e3.colorPrimary },
            "&:focus": {
              borderColor: e3.colorPrimaryHover,
              boxShadow: `${X(e3.inputOutlineOffset)} 0 ${X(e3.controlOutlineWidth)} ${e3.controlOutline}`,
            },
            "&[disabled]": {
              color: e3.colorTextDisabled,
              backgroundColor: e3.colorBgContainerDisabled,
              borderColor: e3.colorBorder,
              cursor: "not-allowed",
            },
          },
        },
        [`&${t2}-disabled`]: {
          [`${t2}-prev, ${t2}-next`]: {
            [`${t2}-item-link`]: { "&:hover, &:active": { backgroundColor: "transparent" } },
          },
        },
        [`&${t2}-small`]: {
          [`${t2}-simple-pager`]: { input: { width: e3.paginationMiniQuickJumperInputWidth } },
        },
      },
    };
  },
  uu = (e3) => {
    const { componentCls: t2 } = e3,
      o2 = `${t2}-options-quick-jumper input, ${t2}-simple-pager input`;
    return {
      [`&${t2}-filled`]: {
        [o2]: {
          background: e3.colorFillTertiary,
          borderColor: "transparent",
          "&:hover": { background: e3.colorFillSecondary },
          "&:focus": {
            borderColor: e3.activeBorderColor,
            outline: 0,
            backgroundColor: e3.activeBg,
          },
          "&[disabled]": { ...ts(e3) },
        },
      },
      [`&${t2}-borderless`]: {
        [o2]: {
          background: "transparent",
          border: "none",
          "&:focus": { outline: "none", boxShadow: "none" },
          "&[disabled]": { color: e3.colorTextDisabled, cursor: "not-allowed" },
        },
      },
      [`&${t2}-underlined`]: {
        [o2]: {
          background: e3.colorBgContainer,
          borderWidth: `${X(e3.lineWidth)} 0`,
          borderStyle: `${e3.lineType} none`,
          borderColor: `transparent transparent ${e3.colorBorder} transparent`,
          borderRadius: 0,
          "&:hover": {
            borderColor: `transparent transparent ${e3.hoverBorderColor} transparent`,
            backgroundColor: e3.hoverBg,
          },
          "&:focus": {
            borderColor: `transparent transparent ${e3.activeBorderColor} transparent`,
            outline: 0,
            backgroundColor: e3.activeBg,
          },
          "&[disabled]": { color: e3.colorTextDisabled, boxShadow: "none", cursor: "not-allowed" },
        },
      },
    };
  },
  pu = (e3) => {
    const { componentCls: t2, iconCls: o2, sizeLG: n2, antCls: r2 } = e3,
      [, l2] = k(r2, "pagination");
    return {
      [`${t2}-jump-prev, ${t2}-jump-next`]: {
        outline: 0,
        [`${t2}-item-container`]: {
          position: "relative",
          [`${t2}-item-link-icon`]: {
            color: e3.colorPrimary,
            fontSize: e3.fontSizeSM,
            opacity: 0,
            transition: `all ${e3.motionDurationMid}`,
            "&-svg": { top: 0, insetInlineEnd: 0, bottom: 0, insetInlineStart: 0, margin: "auto" },
          },
          [`${t2}-item-ellipsis`]: {
            position: "absolute",
            inset: 0,
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
            color: e3.colorTextDisabled,
            textAlign: "center",
            opacity: 1,
            transition: `all ${e3.motionDurationMid}`,
            [`${o2}-ellipsis > svg`]: { width: n2, height: n2 },
          },
        },
        "&:hover": {
          [`${t2}-item-link-icon`]: { opacity: 1 },
          [`${t2}-item-ellipsis`]: { opacity: 0 },
        },
      },
      [`
    ${t2}-prev,
    ${t2}-jump-prev,
    ${t2}-jump-next
    `]: { marginInlineEnd: l2("item-spacing-actual") },
      [`
    ${t2}-prev,
    ${t2}-next,
    ${t2}-jump-prev,
    ${t2}-jump-next
    `]: {
        display: "inline-block",
        minWidth: l2("item-size-actual"),
        height: l2("item-size-actual"),
        color: e3.colorText,
        fontFamily: e3.fontFamily,
        lineHeight: l2("item-size-actual"),
        textAlign: "center",
        verticalAlign: "middle",
        listStyle: "none",
        borderRadius: e3.borderRadius,
        cursor: "pointer",
        transition: `all ${e3.motionDurationMid}`,
      },
      [`${t2}-prev, ${t2}-next`]: {
        outline: 0,
        button: { color: e3.colorText, cursor: "pointer", userSelect: "none" },
        [`${t2}-item-link`]: {
          display: "block",
          width: "100%",
          height: "100%",
          padding: 0,
          fontSize: e3.fontSizeSM,
          textAlign: "center",
          backgroundColor: "transparent",
          border: `${X(e3.lineWidth)} ${e3.lineType} transparent`,
          borderRadius: e3.borderRadius,
          outline: "none",
          transition: `all ${e3.motionDurationMid}`,
        },
        [`&:hover ${t2}-item-link`]: { backgroundColor: e3.colorBgTextHover },
        [`&:active ${t2}-item-link`]: { backgroundColor: e3.colorBgTextActive },
        [`&${t2}-disabled:hover`]: { [`${t2}-item-link`]: { backgroundColor: "transparent" } },
      },
      [`${t2}-slash`]: {
        marginInlineEnd: e3.paginationSlashMarginInlineEnd,
        marginInlineStart: e3.paginationSlashMarginInlineStart,
      },
      [`${t2}-options`]: {
        display: "inline-block",
        marginInlineStart: e3.margin,
        verticalAlign: "middle",
        [`&-size-changer, &-size-changer${t2}-options-size-changer-select`]: { width: "auto" },
        "&-quick-jumper": {
          display: "inline-block",
          height: l2("item-size-actual"),
          marginInlineStart: e3.marginXS,
          lineHeight: l2("item-size-actual"),
          verticalAlign: "baseline",
          input: {
            ...Cs(e3),
            ...os(e3, {
              borderColor: e3.colorBorder,
              hoverBorderColor: e3.colorPrimaryHover,
              activeBorderColor: e3.colorPrimary,
              activeShadow: e3.activeShadow,
            }),
            "&[disabled]": { ...ts(e3) },
            width: e3.quickJumperInputWidth,
            height: l2("item-size-actual"),
            boxSizing: "border-box",
            margin: 0,
            marginInlineStart: l2("item-spacing-actual"),
            marginInlineEnd: l2("item-spacing-actual"),
          },
        },
      },
    };
  },
  mu = (e3) => {
    const { componentCls: t2, antCls: o2 } = e3,
      [, n2] = k(o2, "pagination");
    return {
      [`${t2}-item`]: {
        display: "inline-block",
        minWidth: n2("item-size-actual"),
        height: n2("item-size-actual"),
        marginInlineEnd: n2("item-spacing-actual"),
        fontFamily: e3.fontFamily,
        lineHeight: X(e3.calc(n2("item-size-actual")).sub(2).equal()),
        textAlign: "center",
        verticalAlign: "middle",
        listStyle: "none",
        backgroundColor: e3.itemBg,
        border: `${X(e3.lineWidth)} ${e3.lineType} transparent`,
        borderRadius: e3.borderRadius,
        outline: 0,
        cursor: "pointer",
        userSelect: "none",
        a: {
          display: "block",
          padding: `0 ${X(e3.paginationItemPaddingInline)}`,
          color: e3.colorText,
          "&:hover": { textDecoration: "none" },
        },
        [`&:not(${t2}-item-active)`]: {
          "&:hover": {
            transition: `all ${e3.motionDurationMid}`,
            backgroundColor: e3.colorBgTextHover,
          },
          "&:active": { backgroundColor: e3.colorBgTextActive },
        },
        "&-active": {
          fontWeight: e3.fontWeightStrong,
          backgroundColor: e3.itemActiveBg,
          borderColor: e3.colorPrimary,
          a: { color: e3.itemActiveColor },
          "&:hover": { borderColor: e3.colorPrimaryHover },
          "&:hover a": { color: e3.itemActiveColorHover },
        },
      },
    };
  },
  fu = (e3) => {
    const { componentCls: t2, antCls: o2 } = e3,
      [n2, r2] = k(o2, "pagination");
    return {
      [t2]: {
        [n2("item-size-actual")]: X(e3.itemSize),
        [n2("item-spacing-actual")]: X(e3.marginXS),
        "&-small": {
          [n2("item-size-actual")]: X(e3.itemSizeSM),
          [n2("item-spacing-actual")]: X(e3.marginXXS),
        },
        "&-large": {
          [n2("item-size-actual")]: X(e3.itemSizeLG),
          [n2("item-spacing-actual")]: X(e3.marginSM),
        },
        ...ve(e3),
        display: "flex",
        alignItems: "center",
        "&-start": { justifyContent: "start" },
        "&-center": { justifyContent: "center" },
        "&-end": { justifyContent: "end" },
        "ul, ol": { margin: 0, padding: 0, listStyle: "none" },
        "&::after": {
          display: "block",
          clear: "both",
          height: 0,
          overflow: "hidden",
          visibility: "hidden",
          content: '""',
        },
        [`${t2}-total-text`]: {
          display: "inline-block",
          height: r2("item-size-actual"),
          marginInlineEnd: r2("item-spacing-actual"),
          lineHeight: X(e3.calc(r2("item-size-actual")).sub(2).equal()),
          verticalAlign: "middle",
        },
        ...mu(e3),
        ...pu(e3),
        ...du(e3),
        ...uu(e3),
        ...su(e3),
        ...cu(e3),
        ...iu(e3),
        [`@media only screen and (max-width: ${e3.screenLG}px)`]: {
          [`${t2}-item`]: { "&-after-jump-prev, &-before-jump-next": { display: "none" } },
        },
        [`@media only screen and (max-width: ${e3.screenSM}px)`]: {
          [`${t2}-options`]: { display: "none" },
        },
      },
      [`&${e3.componentCls}-rtl`]: { direction: "rtl" },
    };
  },
  hu = (e3) => {
    const { componentCls: t2 } = e3;
    return {
      [`${t2}:not(${t2}-disabled)`]: {
        [`${t2}-item`]: { ...J(e3) },
        [`${t2}-jump-prev, ${t2}-jump-next`]: {
          "&:focus-visible": {
            [`${t2}-item-link-icon`]: { opacity: 1 },
            [`${t2}-item-ellipsis`]: { opacity: 0 },
            ...ye(e3),
          },
        },
        [`${t2}-prev, ${t2}-next`]: { [`&:focus-visible ${t2}-item-link`]: ye(e3) },
      },
    };
  },
  gu = (e3) => ({
    itemBg: e3.colorBgContainer,
    itemSize: e3.controlHeight,
    itemSizeSM: e3.controlHeightSM,
    itemSizeLG: e3.controlHeightLG,
    itemActiveBg: e3.colorBgContainer,
    itemActiveColor: e3.colorPrimary,
    itemActiveColorHover: e3.colorPrimaryHover,
    itemLinkBg: e3.colorBgContainer,
    itemActiveColorDisabled: e3.colorTextDisabled,
    itemActiveBgDisabled: e3.controlItemBgActiveDisabled,
    itemInputBg: e3.colorBgContainer,
    miniOptionsSizeChangerTop: 0,
    ...Qi(e3),
  }),
  bu = (e3) =>
    q(
      e3,
      {
        inputOutlineOffset: 0,
        quickJumperInputWidth: e3.calc(e3.controlHeightLG).mul(1.25).equal(),
        paginationMiniOptionsMarginInlineStart: e3.calc(e3.marginXXS).div(2).equal(),
        paginationMiniQuickJumperInputWidth: e3.calc(e3.controlHeightLG).mul(1.1).equal(),
        paginationItemPaddingInline: e3.calc(e3.marginXXS).mul(1.5).equal(),
        paginationEllipsisLetterSpacing: e3.calc(e3.marginXXS).div(2).equal(),
        paginationSlashMarginInlineStart: e3.marginSM,
        paginationSlashMarginInlineEnd: e3.marginSM,
        paginationEllipsisTextIndent: "0.13em",
      },
      Ji(e3),
    ),
  vu = Y(
    "Pagination",
    (e3) => {
      const t2 = bu(e3);
      return [fu(t2), hu(t2)];
    },
    gu,
  ),
  yu = Q(
    ["Pagination", "bordered"],
    (e3) =>
      ((e4) => {
        const { componentCls: t2 } = e4;
        return {
          [`${t2}${t2}-bordered${t2}-disabled`]: {
            "&, &:hover": { [`${t2}-item-link`]: { borderColor: e4.colorBorder } },
            "&:focus-visible": { [`${t2}-item-link`]: { borderColor: e4.colorBorder } },
            [`${t2}-item, ${t2}-item-link`]: {
              backgroundColor: e4.colorBgContainerDisabled,
              borderColor: e4.colorBorder,
              [`&:hover:not(${t2}-item-active)`]: {
                backgroundColor: e4.colorBgContainerDisabled,
                borderColor: e4.colorBorder,
                a: { color: e4.colorTextDisabled },
              },
              [`&${t2}-item-active`]: { backgroundColor: e4.itemActiveBgDisabled },
            },
            [`${t2}-prev, ${t2}-next`]: {
              "&:hover button": {
                backgroundColor: e4.colorBgContainerDisabled,
                borderColor: e4.colorBorder,
                color: e4.colorTextDisabled,
              },
              [`${t2}-item-link`]: {
                backgroundColor: e4.colorBgContainerDisabled,
                borderColor: e4.colorBorder,
              },
            },
          },
          [`${t2}${t2}-bordered`]: {
            [`${t2}-prev, ${t2}-next`]: {
              "&:hover button": { borderColor: e4.colorPrimaryHover, backgroundColor: e4.itemBg },
              [`${t2}-item-link`]: { backgroundColor: e4.itemLinkBg, borderColor: e4.colorBorder },
              [`&:hover ${t2}-item-link`]: {
                borderColor: e4.colorPrimary,
                backgroundColor: e4.itemBg,
                color: e4.colorPrimary,
              },
              [`&${t2}-disabled`]: {
                [`${t2}-item-link`]: { borderColor: e4.colorBorder, color: e4.colorTextDisabled },
              },
            },
            [`${t2}-item`]: {
              backgroundColor: e4.itemBg,
              border: `${X(e4.lineWidth)} ${e4.lineType} ${e4.colorBorder}`,
              [`&:hover:not(${t2}-item-active)`]: {
                borderColor: e4.colorPrimary,
                backgroundColor: e4.itemBg,
                a: { color: e4.colorPrimary },
              },
              "&-active": { borderColor: e4.colorPrimary },
            },
          },
        };
      })(bu(e3)),
    gu,
  );
function $u(e3) {
  return Nt.useMemo(
    () => (typeof e3 == "boolean" ? [e3, {}] : v(e3) ? [!0, e3] : [void 0, void 0]),
    [e3],
  );
}
const xu = (e3) => {
    const {
        align: t2,
        prefixCls: o2,
        selectPrefixCls: n2,
        className: r2,
        rootClassName: l2,
        style: a2,
        size: i2,
        locale: s2,
        responsive: c2,
        showSizeChanger: d2,
        components: u2,
        selectComponentClass: p2,
        pageSizeOptions: m2,
        styles: f2,
        classNames: h2,
        ...g2
      } = e3,
      { xs: b2 } = ll(c2),
      [, v2] = A(),
      {
        getPrefixCls: $2,
        direction: x2,
        showSizeChanger: C2,
        className: w2,
        style: S2,
        classNames: E2,
        styles: k2,
        totalBoundaryShowSizeChanger: N2,
      } = oe("pagination"),
      I2 = $2("pagination", o2),
      [B2, R2] = vu(I2),
      T2 = ie(i2),
      M2 = T2 === "small" || !(!b2 || T2 || !c2),
      [L2, O2] = at("input"),
      D2 = { ...e3, size: T2 },
      z2 = ce(S2),
      H2 = ce(a2),
      [j2, _2] = de([E2, h2], [k2, z2, f2, H2], { props: D2 }),
      [K2] = y("Pagination", ct),
      W2 = { ...K2, ...s2 },
      [F2, G2] = $u(d2),
      [q2, V2] = $u(C2),
      X2 = F2 ?? q2,
      U2 = G2 ?? V2,
      Y2 = p2 || dt,
      Z2 = Nt.useMemo(() => (m2 ? m2.map(Number) : void 0), [m2]),
      J2 = Nt.useMemo(() => {
        const e4 = Nt.createElement(
          "span",
          { className: `${I2}-item-ellipsis` },
          Nt.createElement(ri, null),
        );
        return {
          prevIcon: Nt.createElement(
            "button",
            { className: `${I2}-item-link`, type: "button", tabIndex: -1 },
            x2 === "rtl" ? Nt.createElement(rn, null) : Nt.createElement(Ll, null),
          ),
          nextIcon: Nt.createElement(
            "button",
            { className: `${I2}-item-link`, type: "button", tabIndex: -1 },
            x2 === "rtl" ? Nt.createElement(Ll, null) : Nt.createElement(rn, null),
          ),
          jumpPrevIcon: Nt.createElement(
            "a",
            { className: `${I2}-item-link` },
            Nt.createElement(
              "div",
              { className: `${I2}-item-container` },
              x2 === "rtl"
                ? Nt.createElement(Yd, { className: `${I2}-item-link-icon` })
                : Nt.createElement(qd, { className: `${I2}-item-link-icon` }),
              e4,
            ),
          ),
          jumpNextIcon: Nt.createElement(
            "a",
            { className: `${I2}-item-link` },
            Nt.createElement(
              "div",
              { className: `${I2}-item-container` },
              x2 === "rtl"
                ? Nt.createElement(qd, { className: `${I2}-item-link-icon` })
                : Nt.createElement(Yd, { className: `${I2}-item-link-icon` }),
              e4,
            ),
          ),
        };
      }, [x2, I2]),
      Q2 = $2("select", n2),
      ee2 = P(
        {
          [`${I2}-${t2}`]: !!t2,
          [`${I2}-${T2}`]: T2,
          [`${I2}-${L2}`]: O2 && L2 !== "outlined",
          [`${I2}-mini`]: M2,
          [`${I2}-rtl`]: x2 === "rtl",
          [`${I2}-bordered`]: v2.wireframe,
        },
        w2,
        r2,
        l2,
        j2.root,
        B2,
        R2,
      ),
      te2 = { ..._2.root };
    return Nt.createElement(
      Nt.Fragment,
      null,
      v2.wireframe && Nt.createElement(yu, { prefixCls: I2 }),
      Nt.createElement(au, {
        ...J2,
        ...g2,
        styles: _2,
        classNames: j2,
        style: te2,
        prefixCls: I2,
        selectPrefixCls: Q2,
        className: ee2,
        locale: W2,
        pageSizeOptions: Z2,
        showSizeChanger: X2,
        totalBoundaryShowSizeChanger: g2.totalBoundaryShowSizeChanger ?? N2,
        sizeChangerRender: (e4) => {
          var t3;
          const {
              disabled: o3,
              size: n3,
              onSizeChange: r3,
              "aria-label": l3,
              className: a3,
              options: i3,
            } = e4,
            s3 = u2?.sizeChanger;
          if (s3)
            return Nt.createElement(s3, { value: n3, onChange: r3, disabled: !!o3, className: a3 });
          const { className: c3, onChange: d3 } = U2 || {},
            p3 =
              (t3 = i3.find((e5) => String(e5.value) === String(n3))) == null ? void 0 : t3.value;
          return Nt.createElement(Y2, {
            disabled: o3,
            showSearch: !0,
            popupMatchSelectWidth: !1,
            getPopupContainer: (e5) => e5.parentNode,
            "aria-label": l3,
            options: i3,
            ...U2,
            value: p3,
            onChange: (e5, t4) => {
              r3?.(e5), d3?.(e5, t4);
            },
            size: T2,
            className: P(`${I2}-options-size-changer-select`, a3, c3),
          });
        },
      }),
    );
  },
  Cu = 80 * Math.PI,
  wu = (e3) => {
    const { dotClassName: t2, style: o2, hasCircleCls: n2 } = e3;
    return Nt.createElement("circle", {
      className: P(`${t2}-circle`, { [`${t2}-circle-bg`]: n2 }),
      r: 40,
      cx: 50,
      cy: 50,
      strokeWidth: 20,
      style: o2,
    });
  },
  Su = ({ percent: e3, prefixCls: t2 }) => {
    const o2 = `${t2}-dot`,
      n2 = `${o2}-holder`,
      r2 = `${n2}-hidden`,
      [l2, a2] = Nt.useState(!1);
    le(() => {
      e3 !== 0 && a2(!0);
    }, [e3]);
    const i2 = Math.max(Math.min(e3, 100), 0);
    if (!l2) return null;
    const s2 = {
      strokeDashoffset: "" + Cu / 4,
      strokeDasharray: `${(Cu * i2) / 100} ${(Cu * (100 - i2)) / 100}`,
    };
    return Nt.createElement(
      "span",
      { className: P(n2, `${o2}-progress`, { [r2]: i2 <= 0 }) },
      Nt.createElement(
        "svg",
        {
          viewBox: "0 0 100 100",
          role: "progressbar",
          "aria-valuemin": 0,
          "aria-valuemax": 100,
          "aria-valuenow": i2,
        },
        Nt.createElement(wu, { dotClassName: o2, hasCircleCls: !0 }),
        Nt.createElement(wu, { dotClassName: o2, style: s2 }),
      ),
    );
  };
function Eu(e3) {
  const { prefixCls: t2, percent: o2 = 0, className: n2, style: r2 } = e3,
    l2 = `${t2}-dot`,
    a2 = `${l2}-holder`,
    i2 = `${a2}-hidden`;
  return Nt.createElement(
    Nt.Fragment,
    null,
    Nt.createElement(
      "span",
      { className: P(a2, n2, o2 > 0 && i2), style: r2 },
      Nt.createElement(
        "span",
        { className: P(l2, `${t2}-dot-spin`) },
        [1, 2, 3, 4].map((e4) => Nt.createElement("i", { className: `${t2}-dot-item`, key: e4 })),
      ),
    ),
    Nt.createElement(Su, { prefixCls: t2, percent: o2 }),
  );
}
function ku(e3) {
  const { prefixCls: t2, indicator: o2, percent: n2, className: r2, style: l2 } = e3,
    a2 = `${t2}-dot`;
  return o2 && Nt.isValidElement(o2)
    ? D(o2, (e4) => ({
        className: P(e4.className, a2, r2),
        style: { ...e4.style, ...l2 },
        percent: n2,
      }))
    : Nt.createElement(Eu, { prefixCls: t2, percent: n2, className: r2, style: l2 });
}
const Nu = new K("antSpinMove", { to: { opacity: 1 } }),
  Iu = new K("antRotate", { to: { transform: "rotate(405deg)" } }),
  Bu = (e3) => {
    const { componentCls: t2 } = e3,
      o2 = `${t2}-section`;
    return {
      [t2]: {
        ...ve(e3),
        position: "relative",
        "&-rtl": { direction: "rtl" },
        [`&${o2}, > ${o2}`]: {
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: e3.paddingSM,
          color: e3.colorPrimary,
        },
        [`&${o2}`]: { display: "inline-flex" },
        [`> ${o2}`]: {
          position: "absolute",
          top: "50%",
          left: { _skip_check_: !0, value: "50%" },
          transform: "translate(-50%, -50%)",
          zIndex: 1,
        },
        [`${t2}-description`]: { fontSize: e3.fontSize, lineHeight: 1 },
        [`${t2}-container`]: {
          position: "relative",
          transition: `opacity ${e3.motionDurationSlow}`,
          "&::after": {
            position: "absolute",
            top: 0,
            insetInlineEnd: 0,
            bottom: 0,
            insetInlineStart: 0,
            zIndex: 10,
            width: "100%",
            height: "100%",
            background: e3.colorBgContainer,
            opacity: 0,
            transition: `all ${e3.motionDurationSlow}`,
            content: '""',
            pointerEvents: "none",
          },
        },
        "&-spinning": {
          [`${t2}-description`]: { textShadow: `0 0px 5px ${e3.colorBgContainer}` },
          [`${t2}-container`]: {
            clear: "both",
            opacity: 0.5,
            userSelect: "none",
            pointerEvents: "none",
            "&::after": { opacity: 0.4, pointerEvents: "auto" },
          },
        },
        "&-fullscreen": {
          position: "fixed",
          inset: 0,
          backgroundColor: e3.colorBgMask,
          zIndex: e3.zIndexPopupBase,
          opacity: 0,
          pointerEvents: "none",
          transition: `all ${e3.motionDurationMid}`,
          [`&${t2}-spinning`]: { opacity: 1, pointerEvents: "auto" },
          [`> ${o2}`]: {
            color: e3.colorWhite,
            [`${t2}-description`]: { color: e3.colorTextLightSolid },
          },
        },
      },
    };
  },
  Ru = (e3) => {
    const { componentCls: t2, antCls: o2, motionDurationSlow: n2 } = e3,
      [r2, l2] = k(o2, "spin");
    return {
      [t2]: {
        [r2("dot-holder-size")]: e3.dotSize,
        [r2("dot-item-size")]: `calc((${l2("dot-holder-size")} - ${e3.marginXXS} / 2) / 2)`,
        [`${t2}-dot`]: {
          "&-holder": {
            width: "1em",
            height: "1em",
            fontSize: l2("dot-holder-size"),
            display: "inline-block",
            transition: ["transform", "opacity"].map((e4) => `${e4} ${n2} ease`).join(", "),
            transformOrigin: "50% 50%",
            lineHeight: 1,
            "&-hidden": { transform: "scale(0.3)", opacity: 0 },
          },
          position: "relative",
          display: "inline-block",
          fontSize: l2("dot-holder-size"),
          width: "1em",
          height: "1em",
          "&-spin": {
            transform: "rotate(45deg)",
            animationName: Iu,
            animationDuration: "1.2s",
            animationIterationCount: "infinite",
            animationTimingFunction: "linear",
          },
          "&-item": {
            position: "absolute",
            display: "block",
            width: l2("dot-item-size"),
            height: l2("dot-item-size"),
            background: "currentColor",
            borderRadius: "100%",
            transform: "scale(0.75)",
            transformOrigin: "50% 50%",
            opacity: 0.3,
            animationName: Nu,
            animationDuration: "1s",
            animationIterationCount: "infinite",
            animationTimingFunction: "linear",
            animationDirection: "alternate",
            "&:nth-child(1)": { top: 0, insetInlineStart: 0, animationDelay: "0s" },
            "&:nth-child(2)": { top: 0, insetInlineEnd: 0, animationDelay: "0.4s" },
            "&:nth-child(3)": { insetInlineEnd: 0, bottom: 0, animationDelay: "0.8s" },
            "&:nth-child(4)": { bottom: 0, insetInlineStart: 0, animationDelay: "1.2s" },
          },
          "&-progress": {
            position: "absolute",
            left: "50%",
            top: 0,
            transform: "translateX(-50%)",
          },
          "&-circle": {
            strokeLinecap: "round",
            transition: [
              "stroke-dashoffset",
              "stroke-dasharray",
              "stroke",
              "stroke-width",
              "opacity",
            ]
              .map((e4) => `${e4} ${n2} ease`)
              .join(","),
            fillOpacity: 0,
            stroke: "currentcolor",
          },
          "&-circle-bg": { stroke: e3.colorFillSecondary },
        },
      },
    };
  },
  Tu = (e3) => {
    const { componentCls: t2 } = e3,
      [o2] = k(e3.antCls, "spin");
    return {
      [t2]: {
        "&-sm": { [o2("dot-holder-size")]: e3.dotSizeSM },
        "&-lg": { [o2("dot-holder-size")]: e3.dotSizeLG },
      },
    };
  },
  Mu = Y(
    "Spin",
    (e3) => {
      const t2 = q(e3, { spinDotDefault: e3.colorTextDescription });
      return [Bu(t2), Ru(t2), Tu(t2)];
    },
    (e3) => {
      const { controlHeightLG: t2, controlHeight: o2 } = e3;
      return { contentHeight: 400, dotSize: t2 / 2, dotSizeSM: 0.35 * t2, dotSizeLG: o2 };
    },
  ),
  Pu = [
    [30, 0.05],
    [70, 0.03],
    [96, 0.01],
  ];
let Au;
const Lu = Nt.forwardRef((e3, t2) => {
  const {
      prefixCls: o2,
      spinning: n2 = !0,
      delay: r2 = 0,
      className: l2,
      rootClassName: a2,
      size: i2,
      tip: s2,
      description: c2,
      wrapperClassName: d2,
      style: u2,
      children: p2,
      fullscreen: m2 = !1,
      indicator: f2,
      percent: h2,
      classNames: g2,
      styles: b2,
      ...v2
    } = e3,
    {
      getPrefixCls: y2,
      direction: $2,
      indicator: x2,
      className: C2,
      style: w2,
      classNames: S2,
      styles: E2,
    } = oe("spin"),
    k2 = y2("spin", o2),
    [N2, I2] = Mu(k2),
    [B2, R2] = Nt.useState(
      () =>
        n2 &&
        !(function (e4, t3) {
          return !!e4 && !!t3 && !Number.isNaN(Number(t3));
        })(n2, r2),
    ),
    T2 = (function (e4, t3) {
      const [o3, n3] = Nt.useState(0),
        r3 = Nt.useRef(null),
        l3 = t3 === "auto";
      return (
        Nt.useEffect(
          () => (
            l3 &&
              e4 &&
              (n3(0),
              (r3.current = setInterval(() => {
                n3((e5) => {
                  const t4 = 100 - e5;
                  for (let o4 = 0; o4 < Pu.length; o4 += 1) {
                    const [n4, r4] = Pu[o4];
                    if (e5 <= n4) return e5 + t4 * r4;
                  }
                  return e5;
                });
              }, 200))),
            () => {
              r3.current && (clearInterval(r3.current), (r3.current = null));
            }
          ),
          [l3, e4],
        ),
        l3 ? o3 : t3
      );
    })(B2, h2);
  Nt.useEffect(() => {
    if (n2) {
      const e4 = $c(r2, () => {
        R2(!0);
      });
      return (
        e4(),
        () => {
          var t3;
          (t3 = e4?.cancel) == null || t3.call(e4);
        }
      );
    }
    R2(!1);
  }, [r2, n2]);
  const M2 = ie((e4) => i2 ?? e4),
    A2 = c2 ?? s2,
    L2 = {
      ...e3,
      size: M2,
      spinning: B2,
      tip: A2,
      description: A2,
      fullscreen: m2,
      children: p2,
      percent: T2,
    },
    O2 = ce(w2),
    [D2, z2] = de([S2, g2], [E2, O2, b2], { props: L2 }),
    H2 = f2 ?? x2 ?? Au,
    j2 = p2 !== void 0,
    _2 = j2 || m2,
    K2 = Nt.createElement(
      Nt.Fragment,
      null,
      Nt.createElement(ku, {
        className: P(D2.indicator),
        style: z2.indicator,
        prefixCls: k2,
        indicator: H2,
        percent: T2,
      }),
      A2 &&
        Nt.createElement(
          "div",
          {
            className: P(`${k2}-description`, D2.tip, D2.description),
            style: { ...z2.tip, ...z2.description },
          },
          A2,
        ),
    ),
    W2 = Nt.useRef(null);
  return (
    Nt.useImperativeHandle(t2, () => ({ nativeElement: W2.current })),
    Nt.createElement(
      "div",
      {
        ref: W2,
        className: P(
          k2,
          {
            [`${k2}-sm`]: M2 === "small",
            [`${k2}-lg`]: M2 === "large",
            [`${k2}-spinning`]: B2,
            [`${k2}-rtl`]: $2 === "rtl",
            [`${k2}-fullscreen`]: m2,
          },
          a2,
          D2.root,
          m2 && D2.mask,
          _2 ? d2 : [`${k2}-section`, D2.section],
          C2,
          l2,
          N2,
          I2,
        ),
        style: { ...z2.root, ...(_2 ? {} : z2.section), ...(m2 ? z2.mask : {}), ...u2 },
        "aria-live": "polite",
        "aria-busy": B2,
        ...v2,
      },
      B2 &&
        (_2
          ? Nt.createElement(
              "div",
              { className: P(`${k2}-section`, D2.section), style: z2.section },
              K2,
            )
          : K2),
      j2 &&
        Nt.createElement(
          "div",
          { className: P(`${k2}-container`, D2.container), style: z2.container },
          p2,
        ),
    )
  );
});
Lu.setDefaultIndicator = (e3) => {
  Au = e3;
};
const Ou = Lu,
  Du = ut((e3) => {
    const {
        prefixCls: t2,
        className: o2,
        closeIcon: n2,
        closable: r2,
        type: l2,
        title: a2,
        children: i2,
        footer: s2,
        style: c2,
        classNames: d2,
        styles: u2,
        ...p2
      } = e3,
      { getPrefixCls: m2 } = Nt.useContext(B),
      { className: f2, style: h2, classNames: g2, styles: b2 } = oe("modal"),
      v2 = m2(),
      y2 = t2 || m2("modal"),
      $2 = $e(v2),
      [x2, C2] = Lr(y2, $2),
      w2 = ce(h2),
      S2 = ce(c2),
      [E2, k2] = de([g2, d2], [b2, w2, u2, S2], { props: e3 }),
      N2 = `${y2}-confirm`;
    let I2 = {};
    return (
      (I2 = l2
        ? {
            closable: r2 ?? !1,
            title: "",
            footer: "",
            children: Nt.createElement(_r, {
              ...e3,
              prefixCls: y2,
              confirmPrefixCls: N2,
              rootPrefixCls: v2,
              content: i2,
            }),
          }
        : {
            closable: r2 ?? !0,
            title: a2,
            footer: s2 !== null && Nt.createElement(Sr, { ...e3 }),
            children: i2,
          }),
      Nt.createElement(Ln, {
        prefixCls: y2,
        className: P(
          x2,
          `${y2}-pure-panel`,
          l2 && N2,
          l2 && `${N2}-${l2}`,
          o2,
          f2,
          C2,
          $2,
          E2.root,
        ),
        style: k2.root,
        ...p2,
        closeIcon: wr(y2, n2),
        closable: r2,
        classNames: E2,
        styles: k2,
        ...I2,
      })
    );
  });
function zu(e3) {
  return Xr(Ur(e3));
}
const Hu = zr;
(Hu.useModal = function () {
  const e3 = Nt.useRef(null),
    [t2, o2] = Nt.useState([]);
  Nt.useEffect(() => {
    t2.length &&
      (S(t2).forEach((e4) => {
        e4();
      }),
      o2([]));
  }, [t2]);
  const n2 = Nt.useCallback(
    (t3) =>
      function (n3) {
        var r2;
        tl += 1;
        const l2 = Nt.createRef();
        let a2;
        const i2 = new Promise((e4) => {
          a2 = e4;
        });
        let s2,
          c2 = !1;
        const d2 = Nt.createElement(el, {
          key: `modal-${tl}`,
          config: t3(n3),
          ref: l2,
          afterClose: () => {
            s2?.();
          },
          isSilent: () => c2,
          onConfirm: (e4) => {
            a2(e4);
          },
        });
        return (
          (s2 = (r2 = e3.current) == null ? void 0 : r2.patchElement(d2)),
          s2 && Fr.push(s2),
          {
            destroy: () => {
              function e4() {
                var e5;
                (e5 = l2.current) == null || e5.destroy();
              }
              l2.current ? e4() : o2((t4) => [].concat(S(t4), [e4]));
            },
            update: (e4) => {
              function t4() {
                var t5;
                (t5 = l2.current) == null || t5.update(e4);
              }
              l2.current ? t4() : o2((e5) => [].concat(S(e5), [t4]));
            },
            then: (e4) => ((c2 = !0), i2.then(e4)),
          }
        );
      },
    [],
  );
  return [
    Nt.useMemo(
      () => ({ info: n2(Yr), success: n2(Zr), error: n2(Jr), warning: n2(Ur), confirm: n2(Qr) }),
      [n2],
    ),
    Nt.createElement(ol, { key: "modal-holder", ref: e3 }),
  ];
}),
  (Hu.info = function (e3) {
    return Xr(Yr(e3));
  }),
  (Hu.success = function (e3) {
    return Xr(Zr(e3));
  }),
  (Hu.error = function (e3) {
    return Xr(Jr(e3));
  }),
  (Hu.warning = zu),
  (Hu.warn = zu),
  (Hu.confirm = function (e3) {
    return Xr(Qr(e3));
  }),
  (Hu.destroyAll = function () {
    for (; Fr.length; ) {
      const e3 = Fr.pop();
      e3 && e3();
    }
  }),
  (Hu.config = function ({ rootPrefixCls: e3 }) {
    Gr = e3;
  }),
  (Hu._InternalPanelDoNotUseOrYouWillBeFired = Du);
const ju = Hu,
  _u = {},
  Ku = "rc-table-internal-hook";
function Wu(e3) {
  const t2 = Nt.createContext(void 0);
  return {
    Context: t2,
    Provider: ({ value: e4, children: o2 }) => {
      const n2 = Nt.useRef(e4);
      n2.current = e4;
      const [r2] = Nt.useState(() => ({ getValue: () => n2.current, listeners: new Set() }));
      return (
        le(() => {
          Bt.unstable_batchedUpdates(() => {
            r2.listeners.forEach((t3) => {
              t3(e4);
            });
          });
        }, [e4]),
        Nt.createElement(t2.Provider, { value: r2 }, o2)
      );
    },
    defaultValue: e3,
  };
}
function Fu(e3, t2) {
  const o2 = n(
      typeof t2 == "function"
        ? t2
        : (e4) => {
            if (t2 === void 0) return e4;
            if (!Array.isArray(t2)) return e4[t2];
            const o3 = {};
            return (
              t2.forEach((t3) => {
                o3[t3] = e4[t3];
              }),
              o3
            );
          },
    ),
    r2 = Nt.useContext(e3?.Context),
    { listeners: l2, getValue: a2 } = r2 || {},
    i2 = Nt.useRef();
  i2.current = o2(r2 ? a2() : e3?.defaultValue);
  const [, s2] = Nt.useState({});
  return (
    le(() => {
      if (r2)
        return (
          l2.add(e4),
          () => {
            l2.delete(e4);
          }
        );
      function e4(e5) {
        const t3 = o2(e5);
        Le(i2.current, t3, !0) || s2({});
      }
    }, [r2]),
    i2.current
  );
}
function Gu() {
  return (
    (Gu = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    Gu.apply(this, arguments)
  );
}
const {
    makeImmutable: qu,
    responseImmutable: Vu,
    useImmutableMark: Xu,
  } = (function () {
    const e3 = Nt.createContext(null);
    function t2() {
      return Nt.useContext(e3);
    }
    return {
      makeImmutable: function (o2, n2) {
        const r2 = L(o2),
          l2 = (l3, a2) => {
            const i2 = r2 ? { ref: a2 } : {},
              s2 = Nt.useRef(0),
              c2 = Nt.useRef(l3);
            return t2() !== null
              ? Nt.createElement(o2, Gu({}, l3, i2))
              : ((n2 && !n2(c2.current, l3)) || (s2.current += 1),
                (c2.current = l3),
                Nt.createElement(
                  e3.Provider,
                  { value: s2.current },
                  Nt.createElement(o2, Gu({}, l3, i2)),
                ));
          };
        return r2 ? Nt.forwardRef(l2) : l2;
      },
      responseImmutable: function (e4, o2) {
        const n2 = L(e4),
          r2 = (o3, r3) => {
            const l2 = n2 ? { ref: r3 } : {};
            return t2(), Nt.createElement(e4, Gu({}, o3, l2));
          };
        return Nt.memo(n2 ? Nt.forwardRef(r2) : r2, o2);
      },
      useImmutableMark: t2,
    };
  })(),
  Uu = Wu(),
  Yu = Nt.createContext({ renderWithProps: !1 });
function Zu(e3) {
  const t2 = [],
    o2 = {};
  return (
    e3.forEach((e4) => {
      const { key: n2, dataIndex: r2 } = e4 || {};
      let l2 =
        n2 ||
        ((a2 = r2), a2 == null ? [] : Array.isArray(a2) ? a2 : [a2]).join("-") ||
        "RC_TABLE_KEY";
      for (var a2; o2[l2]; ) l2 = `${l2}_next`;
      (o2[l2] = !0), t2.push(l2);
    }),
    t2
  );
}
function Ju(e3) {
  return e3 != null;
}
function Qu(e3, t2, o2, n2, r2, l2) {
  const a2 = Nt.useContext(Yu),
    i2 = Xu();
  return Ae(
    () => {
      if (Ju(n2)) return [n2];
      const l3 = t2 == null || t2 === "" ? [] : Array.isArray(t2) ? t2 : [t2],
        i3 = pt(e3, l3);
      let s2,
        c2 = i3;
      if (r2) {
        const t3 = r2(i3, e3, o2);
        !(d2 = t3) || typeof d2 != "object" || Array.isArray(d2) || Nt.isValidElement(d2)
          ? (c2 = t3)
          : ((c2 = t3.children), (s2 = t3.props), (a2.renderWithProps = !0));
      }
      var d2;
      return [c2, s2];
    },
    [i2, e3, n2, t2, r2, o2],
    (e4, t3) => {
      if (l2) {
        const [, o3] = e4,
          [, n3] = t3;
        return l2(n3, o3);
      }
      return !!a2.renderWithProps || !Le(e4, t3, !0);
    },
  );
}
function ep() {
  return (
    (ep = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    ep.apply(this, arguments)
  );
}
const tp = (e3) => {
    const {
        component: t2,
        children: o2,
        ellipsis: r2,
        scope: l2,
        prefixCls: a2,
        className: i2,
        style: s2,
        align: c2,
        record: d2,
        render: u2,
        dataIndex: p2,
        renderIndex: m2,
        shouldCellUpdate: f2,
        index: h2,
        rowType: g2,
        colSpan: b2,
        rowSpan: v2,
        fixStart: y2,
        fixEnd: $2,
        fixedStartShadow: x2,
        fixedEndShadow: C2,
        offsetFixedStartShadow: w2,
        offsetFixedEndShadow: S2,
        zIndex: E2,
        zIndexReverse: k2,
        appendNode: N2,
        additionalProps: I2 = {},
        originRowSpan: B2,
        isSticky: R2,
      } = e3,
      T2 = `${a2}-cell`,
      { allColumnsFixedLeft: M2, rowHoverable: A2 } = Fu(Uu, [
        "allColumnsFixedLeft",
        "rowHoverable",
      ]),
      [L2, O2] = Qu(d2, p2, m2, o2, u2, f2),
      D2 = {},
      z2 = typeof y2 == "number" && !M2,
      H2 = typeof $2 == "number" && !M2,
      [j2, _2] = Fu(Uu, ({ scrollInfo: e4 }) => {
        if (!z2 && !H2) return [!1, !1];
        const [t3, o3] = e4;
        return [(z2 && x2 && t3) - w2 >= 1, (H2 && C2 && o3 - t3) - S2 > 1];
      });
    z2 && ((D2.insetInlineStart = y2), (D2["--z-offset"] = E2), (D2["--z-offset-reverse"] = k2)),
      H2 && ((D2.insetInlineEnd = $2), (D2["--z-offset"] = E2), (D2["--z-offset-reverse"] = k2));
    const K2 = O2?.colSpan ?? I2.colSpan ?? b2 ?? 1,
      W2 = O2?.rowSpan ?? I2.rowSpan ?? v2 ?? 1,
      F2 = O2?.rowSpan ?? B2 ?? W2,
      [G2, q2] = (function (e4, t3) {
        return Fu(Uu, (o3) => {
          var n2, r3, l3, a3;
          return [
            ((n2 = e4),
            (r3 = t3 || 1),
            (l3 = o3.hoverStartRow),
            (a3 = o3.hoverEndRow),
            n2 <= a3 && n2 + r3 - 1 >= l3),
            o3.onHover,
          ];
        });
      })(h2, F2),
      V2 = n((e4) => {
        var t3;
        d2 && q2(h2, h2 + F2 - 1), (t3 = I2?.onMouseEnter) == null || t3.call(I2, e4);
      }),
      X2 = n((e4) => {
        var t3;
        d2 && q2(-1, -1), (t3 = I2?.onMouseLeave) == null || t3.call(I2, e4);
      });
    if (K2 === 0 || W2 === 0) return null;
    const U2 =
        I2.title ??
        (({ ellipsis: e4, rowType: t3, children: o3 }) => {
          var n2, r3;
          let l3;
          const a3 = e4 === !0 ? { showTitle: !0 } : e4;
          return (
            a3 &&
              (a3.showTitle || t3 === "header") &&
              (typeof o3 == "string" || typeof o3 == "number"
                ? (l3 = o3.toString())
                : Nt.isValidElement(o3) &&
                  typeof ((n2 = o3.props) == null ? void 0 : n2.children) == "string" &&
                  (l3 = (r3 = o3.props) == null ? void 0 : r3.children)),
            l3
          );
        })({ rowType: g2, ellipsis: r2, children: L2 }),
      Y2 = P(
        T2,
        i2,
        {
          [`${T2}-fix`]: z2 || H2,
          [`${T2}-fix-start`]: z2,
          [`${T2}-fix-end`]: H2,
          [`${T2}-fix-start-shadow`]: x2,
          [`${T2}-fix-start-shadow-show`]: x2 && j2,
          [`${T2}-fix-end-shadow`]: C2,
          [`${T2}-fix-end-shadow-show`]: C2 && _2,
          [`${T2}-ellipsis`]: r2,
          [`${T2}-with-append`]: N2,
          [`${T2}-fix-sticky`]: (z2 || H2) && R2,
          [`${T2}-row-hover`]: !O2 && G2,
        },
        I2.className,
        O2?.className,
      ),
      Z2 = {};
    c2 && (Z2.textAlign = c2);
    const J2 = { ...O2?.style, ...D2, ...Z2, ...I2.style, ...s2 };
    let Q2 = L2;
    return (
      typeof Q2 != "object" || Array.isArray(Q2) || Nt.isValidElement(Q2) || (Q2 = null),
      r2 && (x2 || C2) && (Q2 = Nt.createElement("span", { className: `${T2}-content` }, Q2)),
      Nt.createElement(
        t2,
        ep({}, O2, I2, {
          className: Y2,
          style: J2,
          title: U2,
          scope: l2,
          onMouseEnter: A2 ? V2 : void 0,
          onMouseLeave: A2 ? X2 : void 0,
          colSpan: K2 !== 1 ? K2 : null,
          rowSpan: W2 !== 1 ? W2 : null,
        }),
        N2,
        Q2,
      )
    );
  },
  op = Nt.memo(tp);
function np(e3) {
  return e3.fixed === "start";
}
function rp(e3) {
  return e3.fixed === "end";
}
function lp(e3, t2, o2, n2) {
  const r2 = o2[e3] || {},
    l2 = o2[t2] || {};
  let a2 = null,
    i2 = null;
  np(r2) && np(l2) ? (a2 = n2.start[e3]) : rp(l2) && rp(r2) && (i2 = n2.end[t2]);
  let s2 = !1,
    c2 = !1,
    d2 = 0,
    u2 = 0;
  a2 !== null &&
    ((s2 = !o2[t2 + 1] || !np(o2[t2 + 1])), (d2 = 2 * o2.length - e3), (u2 = o2.length + e3)),
    i2 !== null && ((c2 = !o2[e3 - 1] || !rp(o2[e3 - 1])), (d2 = t2), (u2 = o2.length - t2));
  let p2 = 0,
    m2 = 0;
  if (s2) for (let f2 = 0; f2 < e3; f2 += 1) np(o2[f2]) || (p2 += n2.widths[f2] || 0);
  if (c2) for (let f2 = o2.length - 1; f2 > t2; f2 -= 1) rp(o2[f2]) || (m2 += n2.widths[f2] || 0);
  return {
    fixStart: a2,
    fixEnd: i2,
    fixedStartShadow: s2,
    fixedEndShadow: c2,
    offsetFixedStartShadow: p2,
    offsetFixedEndShadow: m2,
    isSticky: n2.isSticky,
    zIndex: d2,
    zIndexReverse: u2,
  };
}
const ap = Nt.createContext({});
function ip() {
  return (
    (ip = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    ip.apply(this, arguments)
  );
}
const sp = (e3) => {
  const { children: t2 } = e3;
  return t2;
};
(sp.Row = (e3) => {
  const { children: t2, ...o2 } = e3;
  return Nt.createElement("tr", o2, t2);
}),
  (sp.Cell = (e3) => {
    const { className: t2, index: o2, children: n2, colSpan: r2 = 1, rowSpan: l2, align: a2 } = e3,
      { prefixCls: i2 } = Fu(Uu, ["prefixCls"]),
      { scrollColumnIndex: s2, stickyOffsets: c2, flattenColumns: d2 } = Nt.useContext(ap),
      u2 = o2 + r2 - 1 + 1 === s2 ? r2 + 1 : r2,
      p2 = Nt.useMemo(() => lp(o2, o2 + u2 - 1, d2, c2), [o2, u2, d2, c2]);
    return Nt.createElement(
      op,
      ip(
        {
          className: t2,
          index: o2,
          component: "td",
          prefixCls: i2,
          record: null,
          dataIndex: null,
          align: a2,
          colSpan: u2,
          rowSpan: l2,
          render: () => n2,
        },
        p2,
      ),
    );
  });
const cp = Vu((e3) => {
    const { children: t2, stickyOffsets: o2, flattenColumns: n2 } = e3,
      r2 = Fu(Uu, "prefixCls"),
      l2 = n2.length - 1,
      a2 = n2[l2],
      i2 = Nt.useMemo(
        () => ({
          stickyOffsets: o2,
          flattenColumns: n2,
          scrollColumnIndex: a2?.scrollbar ? l2 : null,
        }),
        [a2, n2, l2, o2],
      );
    return Nt.createElement(
      ap.Provider,
      { value: i2 },
      Nt.createElement("tfoot", { className: `${r2}-summary` }, t2),
    );
  }),
  dp = sp;
function up(e3, t2, o2, n2, r2, l2, a2) {
  const i2 = l2(t2, a2);
  e3.push({ record: t2, indent: o2, index: a2, rowKey: i2 });
  const s2 = r2?.has(i2);
  if (t2 && Array.isArray(t2[n2]) && s2)
    for (let c2 = 0; c2 < t2[n2].length; c2 += 1) up(e3, t2[n2][c2], o2 + 1, n2, r2, l2, c2);
}
function pp(e3, t2, o2, n2) {
  return Nt.useMemo(() => {
    if (o2?.size) {
      const r2 = [];
      for (let l2 = 0; l2 < e3?.length; l2 += 1) up(r2, e3[l2], 0, t2, o2, n2, l2);
      return r2;
    }
    return e3?.map((e4, t3) => ({ record: e4, indent: 0, index: t3, rowKey: n2(e4, t3) }));
  }, [e3, t2, o2, n2]);
}
function mp(e3, t2, o2, r2) {
  const l2 = Fu(Uu, [
      "prefixCls",
      "fixedInfoList",
      "flattenColumns",
      "expandableType",
      "expandRowByClick",
      "onTriggerExpand",
      "rowClassName",
      "expandedRowClassName",
      "indentSize",
      "expandIcon",
      "expandedRowRender",
      "forceRender",
      "expandIconColumnIndex",
      "expandedKeys",
      "childrenColumnName",
      "rowExpandable",
      "onRow",
    ]),
    {
      flattenColumns: a2,
      expandableType: i2,
      expandedKeys: s2,
      childrenColumnName: c2,
      onTriggerExpand: d2,
      rowExpandable: u2,
      onRow: p2,
      expandRowByClick: m2,
      rowClassName: f2,
    } = l2,
    h2 = i2 === "nest",
    g2 = i2 === "row" && (!u2 || u2(e3)),
    b2 = g2 || h2,
    v2 = s2 && s2.has(t2),
    y2 = c2 && e3 && e3[c2],
    $2 = n(d2),
    x2 = p2?.(e3, o2),
    C2 = x2?.onClick;
  let w2;
  typeof f2 == "string" ? (w2 = f2) : typeof f2 == "function" && (w2 = f2(e3, o2, r2));
  const S2 = Zu(a2);
  return {
    ...l2,
    columnsKey: S2,
    nestExpandable: h2,
    expanded: v2,
    hasNestChildren: y2,
    record: e3,
    onTriggerExpand: $2,
    rowSupportExpand: g2,
    expandable: b2,
    rowProps: {
      ...x2,
      className: P(w2, x2?.className),
      onClick: (t3, ...o3) => {
        m2 && b2 && d2(e3, t3), C2?.(t3, ...o3);
      },
    },
  };
}
const fp = (e3) => {
  const {
      prefixCls: t2,
      children: o2,
      component: n2,
      cellComponent: r2,
      className: l2,
      expanded: a2,
      colSpan: i2,
      isEmpty: s2,
      stickyOffset: c2 = 0,
    } = e3,
    {
      scrollbarSize: d2,
      fixHeader: u2,
      fixColumn: p2,
      componentWidth: m2,
      horizonScroll: f2,
    } = Fu(Uu, ["scrollbarSize", "fixHeader", "fixColumn", "componentWidth", "horizonScroll"]);
  let h2 = o2;
  return (
    (s2 ? f2 && m2 : p2) &&
      (h2 = Nt.createElement(
        "div",
        {
          style: {
            width: m2 - c2 - (u2 && !s2 ? d2 : 0),
            position: "sticky",
            left: c2,
            overflow: "hidden",
          },
          className: `${t2}-expanded-row-fixed`,
        },
        h2,
      )),
    Nt.createElement(
      n2,
      { className: l2, style: { display: a2 ? null : "none" } },
      Nt.createElement(op, { component: r2, prefixCls: t2, colSpan: i2 }, h2),
    )
  );
};
function hp({ prefixCls: e3, record: t2, onExpand: o2, expanded: n2, expandable: r2 }) {
  const l2 = `${e3}-row-expand-icon`;
  return r2
    ? Nt.createElement("span", {
        className: P(l2, { [`${e3}-row-expanded`]: n2, [`${e3}-row-collapsed`]: !n2 }),
        onClick: (e4) => {
          o2(t2, e4), e4.stopPropagation();
        },
      })
    : Nt.createElement("span", { className: P(l2, `${e3}-row-spaced`) });
}
function gp(e3, t2, o2, n2) {
  return typeof e3 == "string" ? e3 : typeof e3 == "function" ? e3(t2, o2, n2) : "";
}
function bp() {
  return (
    (bp = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    bp.apply(this, arguments)
  );
}
function vp(e3, t2, o2, n2, r2, l2 = [], a2 = 0) {
  var i2;
  const {
      record: s2,
      prefixCls: c2,
      columnsKey: d2,
      fixedInfoList: u2,
      expandIconColumnIndex: p2,
      nestExpandable: m2,
      indentSize: f2,
      expandIcon: h2,
      expanded: g2,
      hasNestChildren: b2,
      onTriggerExpand: v2,
      expandable: y2,
      expandedKeys: $2,
    } = e3,
    x2 = d2[o2],
    C2 = u2[o2];
  let w2;
  o2 === (p2 || 0) &&
    m2 &&
    (w2 = Nt.createElement(
      Nt.Fragment,
      null,
      Nt.createElement("span", {
        style: { paddingLeft: f2 * n2 + "px" },
        className: `${c2}-row-indent indent-level-${n2}`,
      }),
      h2({ prefixCls: c2, expanded: g2, expandable: b2, record: s2, onExpand: v2 }),
    ));
  const S2 = { ...((i2 = t2.onCell) == null ? void 0 : i2.call(t2, s2, r2)) };
  let E2;
  if (a2) {
    const { rowSpan: e4 = 1 } = S2;
    if (y2 && e4 && o2 < a2) {
      E2 = e4;
      let t3 = e4;
      for (let o3 = r2; o3 < r2 + e4; o3 += 1) {
        const e5 = l2[o3];
        $2.has(e5) && (t3 += 1);
      }
      S2.rowSpan = t3;
    }
  }
  return { key: x2, fixedInfo: C2, appendCellNode: w2, additionalCellProps: S2, originRowSpan: E2 };
}
const yp = Vu((e3) => {
    const {
        className: t2,
        style: o2,
        classNames: n2,
        styles: r2,
        record: l2,
        index: a2,
        renderIndex: i2,
        rowKey: s2,
        rowKeys: c2,
        indent: d2 = 0,
        rowComponent: u2,
        cellComponent: p2,
        scopeCellComponent: m2,
        expandedRowInfo: f2,
      } = e3,
      h2 = mp(l2, s2, a2, d2),
      {
        prefixCls: g2,
        flattenColumns: b2,
        expandedRowClassName: v2,
        expandedRowRender: y2,
        forceRender: $2,
        rowProps: x2,
        expanded: C2,
        rowSupportExpand: w2,
      } = h2,
      S2 = Nt.useRef(!1);
    S2.current || (S2.current = C2);
    const E2 = gp(v2, l2, a2, d2),
      k2 = Nt.createElement(
        u2,
        bp({}, x2, {
          "data-row-key": s2,
          className: P(t2, `${g2}-row`, `${g2}-row-level-${d2}`, x2?.className, n2.row, {
            [E2]: d2 >= 1,
          }),
          style: { ...o2, ...x2?.style, ...r2.row },
        }),
        b2.map((e4, t3) => {
          const { render: o3, dataIndex: s3, className: u3 } = e4,
            {
              key: b3,
              fixedInfo: v3,
              appendCellNode: y3,
              additionalCellProps: $3,
              originRowSpan: x3,
            } = vp(h2, e4, t3, d2, a2, c2, f2?.offset);
          return Nt.createElement(
            op,
            bp(
              {
                className: P(u3, n2.cell),
                style: r2.cell,
                ellipsis: e4.ellipsis,
                align: e4.align,
                scope: e4.rowScope,
                component: e4.rowScope ? m2 : p2,
                prefixCls: g2,
                key: b3,
                record: l2,
                index: a2,
                renderIndex: i2,
                dataIndex: s3,
                render: o3,
                shouldCellUpdate: e4.shouldCellUpdate,
              },
              v3,
              { appendNode: y3, additionalProps: $3, originRowSpan: x3 },
            ),
          );
        }),
      );
    let N2;
    if (w2 && ($2 || S2.current || C2)) {
      const e4 = y2(l2, a2, d2 + 1, C2);
      N2 = Nt.createElement(
        fp,
        {
          expanded: C2,
          className: P(`${g2}-expanded-row`, `${g2}-expanded-row-level-${d2 + 1}`, E2),
          prefixCls: g2,
          component: u2,
          cellComponent: p2,
          colSpan: f2 ? f2.colSpan : b2.length,
          isEmpty: !1,
          stickyOffset: f2?.sticky,
        },
        e4,
      );
    }
    return Nt.createElement(Nt.Fragment, null, k2, N2);
  }),
  $p = (e3) => {
    const { columnKey: t2, onColumnResize: o2, title: n2 } = e3,
      r2 = Nt.useRef(null);
    return (
      le(() => {
        r2.current && o2(t2, r2.current.offsetWidth);
      }, []),
      Nt.createElement(
        ot,
        { data: t2 },
        Nt.createElement(
          "td",
          {
            ref: r2,
            style: { paddingTop: 0, paddingBottom: 0, borderTop: 0, borderBottom: 0, height: 0 },
          },
          Nt.createElement(
            "div",
            { style: { height: 0, overflow: "hidden", fontWeight: "bold" } },
            n2 || "\xA0",
          ),
        ),
      )
    );
  },
  xp = ({ prefixCls: e3, columnsKey: t2, onColumnResize: o2, columns: n2 }) => {
    const r2 = Nt.useRef(null),
      { measureRowRender: l2 } = Fu(Uu, ["measureRowRender"]),
      i2 = Nt.createElement(
        "tr",
        { "aria-hidden": "true", className: `${e3}-measure-row`, style: { height: 0 }, ref: r2 },
        Nt.createElement(
          ot.Collection,
          {
            onBatchResize: (e4) => {
              a(r2.current) &&
                e4.forEach(({ data: e5, size: t3 }) => {
                  o2(e5, t3.offsetWidth);
                });
            },
          },
          t2.map((e4) => {
            const t3 = n2.find((t4) => t4.key === e4),
              r3 = t3?.title,
              l3 = Nt.isValidElement(r3) ? Nt.cloneElement(r3, { ref: null }) : r3;
            return Nt.createElement($p, { key: e4, columnKey: e4, onColumnResize: o2, title: l3 });
          }),
        ),
      );
    return typeof l2 == "function" ? l2(i2) : i2;
  },
  Cp = Vu((e3) => {
    const { data: t2, measureColumnWidth: o2 } = e3,
      {
        prefixCls: n2,
        getComponent: r2,
        onColumnResize: l2,
        flattenColumns: a2,
        getRowKey: i2,
        expandedKeys: s2,
        childrenColumnName: c2,
        emptyNode: d2,
        classNames: u2,
        styles: p2,
        expandedRowOffset: m2 = 0,
        colWidths: f2,
      } = Fu(Uu, [
        "prefixCls",
        "getComponent",
        "onColumnResize",
        "flattenColumns",
        "getRowKey",
        "expandedKeys",
        "childrenColumnName",
        "emptyNode",
        "classNames",
        "styles",
        "expandedRowOffset",
        "fixedInfoList",
        "colWidths",
      ]),
      { body: h2 = {} } = u2 || {},
      { body: g2 = {} } = p2 || {},
      b2 = pp(t2, c2, s2, i2),
      v2 = Nt.useMemo(() => b2.map((e4) => e4.rowKey), [b2]),
      y2 = Nt.useRef({ renderWithProps: !1 }),
      $2 = Nt.useMemo(() => {
        const e4 = a2.length - m2;
        let t3 = 0;
        for (let o3 = 0; o3 < m2; o3 += 1) t3 += f2[o3] || 0;
        return { offset: m2, colSpan: e4, sticky: t3 };
      }, [a2.length, m2, f2]),
      x2 = r2(["body", "wrapper"], "tbody"),
      C2 = r2(["body", "row"], "tr"),
      w2 = r2(["body", "cell"], "td"),
      S2 = r2(["body", "cell"], "th");
    let E2;
    E2 = t2.length
      ? b2.map((e4, t3) => {
          const { record: o3, indent: n3, index: r3, rowKey: l3 } = e4;
          return Nt.createElement(yp, {
            classNames: h2,
            styles: g2,
            key: l3,
            rowKey: l3,
            rowKeys: v2,
            record: o3,
            index: t3,
            renderIndex: r3,
            rowComponent: C2,
            cellComponent: w2,
            scopeCellComponent: S2,
            indent: n3,
            expandedRowInfo: $2,
          });
        })
      : Nt.createElement(
          fp,
          {
            expanded: !0,
            className: `${n2}-placeholder`,
            prefixCls: n2,
            component: C2,
            cellComponent: w2,
            colSpan: a2.length,
            isEmpty: !0,
          },
          d2,
        );
    const k2 = Zu(a2);
    return Nt.createElement(
      Yu.Provider,
      { value: y2.current },
      Nt.createElement(
        x2,
        { style: g2.wrapper, className: P(`${n2}-tbody`, h2.wrapper) },
        o2 &&
          Nt.createElement(xp, { prefixCls: n2, columnsKey: k2, onColumnResize: l2, columns: a2 }),
        E2,
      ),
    );
  }),
  wp = "RC_TABLE_INTERNAL_COL_DEFINE";
function Sp() {
  return (
    (Sp = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    Sp.apply(this, arguments)
  );
}
const Ep = (e3) => {
    const { colWidths: t2, columns: o2, columCount: n2 } = e3,
      { tableLayout: r2 } = Fu(Uu, ["tableLayout"]),
      l2 = [];
    let a2 = !1;
    for (let i2 = (n2 || o2.length) - 1; i2 >= 0; i2 -= 1) {
      const e4 = t2[i2],
        n3 = o2 && o2[i2];
      let s2, c2;
      if ((n3 && ((s2 = n3[wp]), r2 === "auto" && (c2 = n3.minWidth)), e4 || c2 || s2 || a2)) {
        const { columnType: t3, ...o3 } = s2 || {};
        l2.unshift(
          Nt.createElement("col", Sp({ key: i2, style: { width: e4, minWidth: c2 } }, o3)),
        ),
          (a2 = !0);
      }
    }
    return l2.length > 0 ? Nt.createElement("colgroup", null, l2) : null;
  },
  kp = Nt.forwardRef((e3, t2) => {
    const {
        className: o2,
        style: n2,
        noData: r2,
        columns: l2,
        flattenColumns: a2,
        colWidths: i2,
        colGroup: s2,
        columCount: c2,
        stickyOffsets: d2,
        direction: u2,
        fixHeader: p2,
        stickyTopOffset: m2,
        stickyBottomOffset: f2,
        stickyClassName: h2,
        scrollX: g2,
        tableLayout: b2 = "fixed",
        onScroll: v2,
        maxContentScroll: y2,
        children: $2,
        ...x2
      } = e3,
      {
        prefixCls: C2,
        scrollbarSize: w2,
        isSticky: S2,
        getComponent: E2,
      } = Fu(Uu, ["prefixCls", "scrollbarSize", "isSticky", "getComponent"]),
      k2 = E2(["header", "table"], "table"),
      N2 = S2 && !p2 ? 0 : w2,
      I2 = Nt.useRef(null),
      B2 = Nt.useCallback((e4) => {
        mt(t2, e4), mt(I2, e4);
      }, []);
    Nt.useEffect(() => {
      function e4(e5) {
        const { currentTarget: t4, deltaX: o3 } = e5;
        if (o3) {
          const { scrollLeft: n3, scrollWidth: r3, clientWidth: l3 } = t4,
            a3 = r3 - l3;
          let i3 = n3 + o3;
          u2 === "rtl"
            ? ((i3 = Math.max(-a3, i3)), (i3 = Math.min(0, i3)))
            : ((i3 = Math.min(a3, i3)), (i3 = Math.max(0, i3))),
            v2({ currentTarget: t4, scrollLeft: i3 }),
            e5.preventDefault();
        }
      }
      const t3 = I2.current;
      return (
        t3?.addEventListener("wheel", e4, { passive: !1 }),
        () => {
          t3?.removeEventListener("wheel", e4);
        }
      );
    }, []);
    const R2 = a2[a2.length - 1],
      T2 = {
        fixed: R2 ? R2.fixed : null,
        scrollbar: !0,
        onHeaderCell: () => ({ className: `${C2}-cell-scrollbar` }),
      },
      M2 = Nt.useMemo(() => (N2 ? [...l2, T2] : l2), [N2, l2]),
      A2 = Nt.useMemo(() => (N2 ? [...a2, T2] : a2), [N2, a2]),
      L2 = Nt.useMemo(() => {
        const { start: e4, end: t3 } = d2;
        return { ...d2, start: e4, end: [...t3.map((e5) => e5 + N2), 0], isSticky: S2 };
      }, [N2, d2, S2]),
      O2 = (function (e4, t3) {
        return Nt.useMemo(() => {
          const o3 = [];
          for (let n3 = 0; n3 < t3; n3 += 1) {
            const t4 = e4[n3];
            if (t4 === void 0) return null;
            o3[n3] = t4;
          }
          return o3;
        }, [e4.join("_"), t3]);
      })(i2, c2),
      D2 = Nt.useMemo(() => {
        const e4 = !O2 || !O2.length || O2.every((e5) => !e5);
        return r2 || e4;
      }, [r2, O2]);
    return Nt.createElement(
      "div",
      {
        style: { overflow: "hidden", ...(S2 ? { top: m2, bottom: f2 } : {}), ...n2 },
        ref: B2,
        className: P(o2, { [h2]: !!h2 }),
      },
      Nt.createElement(
        k2,
        { style: { tableLayout: b2, minWidth: "100%", width: g2 } },
        D2 ? s2 : Nt.createElement(Ep, { colWidths: [...O2, N2], columCount: c2 + 1, columns: A2 }),
        $2({ ...x2, stickyOffsets: L2, columns: M2, flattenColumns: A2 }),
      ),
    );
  }),
  Np = Nt.memo(kp);
function Ip() {
  return (
    (Ip = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    Ip.apply(this, arguments)
  );
}
const Bp = (e3) => {
    const {
        cells: t2,
        stickyOffsets: o2,
        flattenColumns: n2,
        rowComponent: r2,
        cellComponent: l2,
        onHeaderRow: a2,
        index: i2,
        classNames: s2,
        styles: c2,
      } = e3,
      { prefixCls: d2 } = Fu(Uu, ["prefixCls"]);
    let u2;
    a2 &&
      (u2 = a2(
        t2.map((e4) => e4.column),
        i2,
      ));
    const p2 = Zu(t2.map((e4) => e4.column));
    return Nt.createElement(
      r2,
      Ip({}, u2, { className: s2.row, style: c2.row }),
      t2.map((e4, t3) => {
        var r3;
        const { column: a3, colStart: i3, colEnd: s3, colSpan: c3 } = e4,
          u3 = lp(i3, s3, n2, o2),
          m2 = ((r3 = a3?.onHeaderCell) == null ? void 0 : r3.call(a3, a3)) || {};
        return Nt.createElement(
          op,
          Ip(
            {},
            e4,
            {
              scope: a3.title ? (c3 > 1 ? "colgroup" : "col") : null,
              ellipsis: a3.ellipsis,
              align: a3.align,
              component: l2,
              prefixCls: d2,
              key: p2[t3],
            },
            u3,
            { additionalProps: m2, rowType: "header" },
          ),
        );
      }),
    );
  },
  Rp = Vu((e3) => {
    const { stickyOffsets: t2, columns: o2, flattenColumns: n2, onHeaderRow: r2 } = e3,
      {
        prefixCls: l2,
        getComponent: a2,
        classNames: i2,
        styles: s2,
      } = Fu(Uu, ["prefixCls", "getComponent", "classNames", "styles"]),
      { header: c2 = {} } = i2 || {},
      { header: d2 = {} } = s2 || {},
      u2 = Nt.useMemo(
        () =>
          (function (e4, t3, o3) {
            const n3 = [];
            (function e5(r4, l3, a3 = 0) {
              n3[a3] = n3[a3] || [];
              let i3 = l3;
              return r4.filter(Boolean).map((r5) => {
                const l4 = {
                  key: r5.key,
                  className: P(r5.className, t3.cell) || "",
                  style: o3.cell,
                  children: r5.title,
                  column: r5,
                  colStart: i3,
                };
                let s3 = 1;
                const c3 = r5.children;
                return (
                  c3 &&
                    c3.length > 0 &&
                    ((s3 = e5(c3, i3, a3 + 1).reduce((e6, t4) => e6 + t4, 0)),
                    (l4.hasSubColumns = !0)),
                  "colSpan" in r5 && ({ colSpan: s3 } = r5),
                  "rowSpan" in r5 && (l4.rowSpan = r5.rowSpan),
                  (l4.colSpan = s3),
                  (l4.colEnd = l4.colStart + s3 - 1),
                  n3[a3].push(l4),
                  (i3 += s3),
                  s3
                );
              });
            })(e4, 0);
            const r3 = n3.length;
            for (let l3 = 0; l3 < r3; l3 += 1)
              n3[l3].forEach((e5) => {
                "rowSpan" in e5 || e5.hasSubColumns || (e5.rowSpan = r3 - l3);
              });
            return n3;
          })(o2, c2, d2),
        [o2, c2, d2],
      ),
      p2 = a2(["header", "wrapper"], "thead"),
      m2 = a2(["header", "row"], "tr"),
      f2 = a2(["header", "cell"], "th");
    return Nt.createElement(
      p2,
      { className: P(`${l2}-thead`, c2.wrapper), style: d2.wrapper },
      u2.map((e4, o3) =>
        Nt.createElement(Bp, {
          classNames: c2,
          styles: d2,
          key: o3,
          flattenColumns: n2,
          cells: e4,
          stickyOffsets: t2,
          rowComponent: m2,
          cellComponent: f2,
          onHeaderRow: r2,
          index: o3,
        }),
      ),
    );
  });
function Tp(e3, t2 = "") {
  return typeof t2 == "number" ? t2 : t2.endsWith("%") ? (e3 * parseFloat(t2)) / 100 : null;
}
function Mp(e3) {
  return te(e3)
    .filter((e4) => Nt.isValidElement(e4))
    .map((e4) => {
      const { key: t2, props: o2 } = e4,
        { children: n2, ...r2 } = o2,
        l2 = { key: t2, ...r2 };
      return n2 && (l2.children = Mp(n2)), l2;
    });
}
function Pp(e3) {
  return e3
    .filter((e4) => e4 && typeof e4 == "object" && !e4.hidden)
    .map((e4) => {
      const t2 = e4.children;
      return t2 && t2.length > 0 ? { ...e4, children: Pp(t2) } : e4;
    });
}
function Ap(e3, t2 = "key") {
  return e3
    .filter((e4) => e4 && typeof e4 == "object")
    .reduce((e4, o2, n2) => {
      const { fixed: r2 } = o2,
        l2 = r2 === !0 || r2 === "left" ? "start" : r2 === "right" ? "end" : r2,
        a2 = `${t2}-${n2}`,
        i2 = o2.children;
      return i2 && i2.length > 0
        ? [...e4, ...Ap(i2, a2).map((e5) => ({ ...e5, fixed: e5.fixed ?? l2 }))]
        : [...e4, { key: a2, ...o2, fixed: l2 }];
    }, []);
}
function Lp(
  {
    prefixCls: e3,
    columns: t2,
    children: o2,
    expandable: n2,
    expandedKeys: r2,
    columnTitle: l2,
    getRowKey: a2,
    onTriggerExpand: i2,
    expandIcon: s2,
    rowExpandable: c2,
    expandIconColumnIndex: d2,
    expandedRowOffset: u2 = 0,
    direction: p2,
    expandRowByClick: m2,
    columnWidth: f2,
    fixed: h2,
    scrollWidth: g2,
    clientWidth: b2,
  },
  v2,
) {
  const y2 = Nt.useMemo(() => Pp((t2 || Mp(o2) || []).slice()), [t2, o2]),
    $2 = Nt.useMemo(() => {
      if (n2) {
        let t3 = y2.slice();
        if (!t3.includes(_u)) {
          const e4 = d2 || 0,
            o4 = e4 !== 0 || (h2 !== "right" && h2 !== "end") ? e4 : y2.length;
          o4 >= 0 && t3.splice(o4, 0, _u);
        }
        const o3 = t3.indexOf(_u);
        t3 = t3.filter((e4, t4) => e4 !== _u || t4 === o3);
        const n3 = y2[o3];
        let p3;
        p3 = h2 || (n3 ? n3.fixed : null);
        const g3 = {
          [wp]: { className: `${e3}-expand-icon-col`, columnType: "EXPAND_COLUMN" },
          title: l2,
          fixed: p3,
          className: `${e3}-row-expand-icon-cell`,
          width: f2,
          render: (t4, o4, n4) => {
            const l3 = a2(o4, n4),
              d3 = r2.has(l3),
              u3 = !c2 || c2(o4),
              p4 = s2({ prefixCls: e3, expanded: d3, expandable: u3, record: o4, onExpand: i2 });
            return m2
              ? Nt.createElement("span", { onClick: (e4) => e4.stopPropagation() }, p4)
              : p4;
          },
        };
        return t3.map((e4, t4) => {
          const o4 = e4 === _u ? g3 : e4;
          return t4 < u2 ? { ...o4, fixed: o4.fixed || "start" } : o4;
        });
      }
      return y2.filter((e4) => e4 !== _u);
    }, [n2, y2, a2, r2, s2, p2, u2]),
    x2 = Nt.useMemo(() => {
      let e4 = $2;
      return v2 && (e4 = v2(e4)), e4.length || (e4 = [{ render: () => null }]), e4;
    }, [v2, $2, p2]),
    C2 = Nt.useMemo(() => Ap(x2), [x2, p2, g2]),
    [w2, S2] = (function (e4, t3, o3) {
      return Nt.useMemo(() => {
        if (t3 && t3 > 0) {
          let n3 = 0,
            r3 = 0;
          e4.forEach((e5) => {
            const o4 = Tp(t3, e5.width);
            o4 ? (n3 += o4) : (r3 += 1);
          });
          const l3 = Math.max(t3, o3);
          let a3 = Math.max(l3 - n3, r3),
            i3 = r3;
          const s3 = a3 / r3;
          let c3 = 0;
          const d3 = e4.map((e5) => {
            const o4 = { ...e5 },
              n4 = Tp(t3, o4.width);
            if (n4) o4.width = n4;
            else {
              const e6 = Math.floor(s3);
              (o4.width = i3 === 1 ? a3 : e6), (a3 -= e6), (i3 -= 1);
            }
            return (c3 += o4.width), o4;
          });
          if (c3 < l3) {
            const e5 = l3 / c3;
            (a3 = l3),
              d3.forEach((t4, o4) => {
                const n4 = Math.floor(t4.width * e5);
                (t4.width = o4 === d3.length - 1 ? a3 : n4), (a3 -= n4);
              });
          }
          return [d3, Math.max(c3, l3)];
        }
        return [e4, t3];
      }, [e4, t3, o3]);
    })(C2, g2, b2);
  return [x2, w2, S2];
}
const Op = he() ? window : null,
  Dp = (e3) => {
    const { children: t2, className: o2, style: n2 } = e3;
    return Nt.createElement("div", { className: o2, style: n2 }, t2);
  };
function zp(e3) {
  const t2 = ft(e3).getBoundingClientRect(),
    o2 = document.documentElement;
  return {
    left:
      t2.left +
      (window.pageXOffset || o2.scrollLeft) -
      (o2.clientLeft || document.body.clientLeft || 0),
    top:
      t2.top +
      (window.pageYOffset || o2.scrollTop) -
      (o2.clientTop || document.body.clientTop || 0),
  };
}
const Hp = "mouseup",
  jp = "mousemove",
  _p = "scroll",
  Kp = "resize",
  Wp = (e3, t2) => {
    var o2, n2;
    const { scrollBodyRef: l2, onScroll: a2, offsetScroll: i2, container: s2, direction: c2 } = e3,
      d2 = Fu(Uu, "prefixCls"),
      u2 = ((o2 = l2.current) == null ? void 0 : o2.scrollWidth) || 0,
      p2 = ((n2 = l2.current) == null ? void 0 : n2.clientWidth) || 0,
      m2 = u2 && p2 * (p2 / u2),
      f2 = Nt.useRef(null),
      [h2, g2] = (function (e4) {
        const t3 = Nt.useRef(e4),
          [, o3] = Nt.useState({}),
          n3 = Nt.useRef(null),
          r2 = Nt.useRef([]);
        return (
          Nt.useEffect(
            () => () => {
              n3.current = null;
            },
            [],
          ),
          [
            t3.current,
            function (e5) {
              r2.current.push(e5);
              const l3 = Promise.resolve();
              (n3.current = l3),
                l3.then(() => {
                  if (n3.current === l3) {
                    const e6 = r2.current,
                      l4 = t3.current;
                    (r2.current = []),
                      e6.forEach((e7) => {
                        t3.current = e7(t3.current);
                      }),
                      (n3.current = null),
                      l4 !== t3.current && o3({});
                  }
                });
            },
          ]
        );
      })({ scrollLeft: 0, isHiddenScrollBar: !0 }),
      b2 = Nt.useRef({ delta: 0, x: 0 }),
      [v2, y2] = Nt.useState(!1),
      $2 = Nt.useRef(null);
    Nt.useEffect(
      () => () => {
        r.cancel($2.current);
      },
      [],
    );
    const x2 = () => {
        y2(!1);
      },
      C2 = (e4) => {
        const { buttons: t3 } = e4 || window?.event;
        if (!v2 || t3 === 0) return void (v2 && y2(!1));
        let o3 = b2.current.x + e4.pageX - b2.current.x - b2.current.delta;
        const n3 = c2 === "rtl";
        (o3 = Math.max(n3 ? m2 - p2 : 0, Math.min(n3 ? 0 : p2 - m2, o3))),
          (!n3 || Math.abs(o3) + Math.abs(m2) < p2) &&
            (a2({ scrollLeft: (o3 / p2) * (u2 + 2) }), (b2.current.x = e4.pageX));
      },
      w2 = () => {
        r.cancel($2.current),
          ($2.current = r(() => {
            if (!l2.current) return;
            const e4 = zp(l2.current).top,
              t3 = e4 + l2.current.offsetHeight,
              o3 =
                s2 === window
                  ? document.documentElement.scrollTop + window.innerHeight
                  : zp(s2).top + s2.clientHeight;
            t3 - ht() <= o3 || e4 >= o3 - i2
              ? g2((e5) => ({ ...e5, isHiddenScrollBar: !0 }))
              : g2((e5) => ({ ...e5, isHiddenScrollBar: !1 }));
          }));
      },
      S2 = (e4) => {
        g2((t3) => ({ ...t3, scrollLeft: (e4 / u2) * p2 || 0 }));
      };
    return (
      Nt.useImperativeHandle(t2, () => ({ setScrollLeft: S2, checkScrollBarVisible: w2 })),
      Nt.useEffect(
        () => (
          document.body.addEventListener(Hp, x2, !1),
          document.body.addEventListener(jp, C2, !1),
          w2(),
          () => {
            document.body.removeEventListener(Hp, x2), document.body.removeEventListener(jp, C2);
          }
        ),
        [m2, v2],
      ),
      Nt.useEffect(() => {
        if (l2.current) {
          const e4 = [];
          let t3 = ft(l2.current);
          for (; t3; ) e4.push(t3), (t3 = t3.parentElement);
          return (
            e4.forEach((e5) => {
              e5.addEventListener(_p, w2, !1);
            }),
            window.addEventListener(Kp, w2, !1),
            window.addEventListener(_p, w2, !1),
            s2.addEventListener(_p, w2, !1),
            () => {
              e4.forEach((e5) => {
                e5.removeEventListener(_p, w2);
              }),
                window.removeEventListener(Kp, w2),
                window.removeEventListener(_p, w2),
                s2.removeEventListener(_p, w2);
            }
          );
        }
      }, [s2]),
      Nt.useEffect(() => {
        h2.isHiddenScrollBar ||
          g2((e4) => {
            const t3 = l2.current;
            return t3
              ? { ...e4, scrollLeft: (t3.scrollLeft / t3.scrollWidth) * t3.clientWidth }
              : e4;
          });
      }, [h2.isHiddenScrollBar]),
      u2 <= p2 || !m2 || h2.isHiddenScrollBar
        ? null
        : Nt.createElement(
            "div",
            { style: { height: ht(), width: p2, bottom: i2 }, className: `${d2}-sticky-scroll` },
            Nt.createElement("div", {
              onMouseDown: (e4) => {
                e4.persist(),
                  (b2.current.delta = e4.pageX - h2.scrollLeft),
                  (b2.current.x = 0),
                  y2(!0),
                  e4.preventDefault();
              },
              ref: f2,
              className: P(`${d2}-sticky-scroll-bar`, { [`${d2}-sticky-scroll-bar-active`]: v2 }),
              style: { width: `${m2}px`, transform: `translate3d(${h2.scrollLeft}px, 0, 0)` },
            }),
          )
    );
  },
  Fp = Nt.forwardRef(Wp);
function Gp() {
  return (
    (Gp = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    Gp.apply(this, arguments)
  );
}
const qp = "rc-table",
  Vp = [],
  Xp = {};
function Up() {
  return "No Data";
}
const Yp = (e3, t2) => {
    var o2, r2;
    const l2 = { rowKey: "key", prefixCls: qp, emptyText: Up, ...e3 },
      {
        prefixCls: a2,
        className: i2,
        rowClassName: s2,
        style: c2,
        classNames: d2,
        styles: u2,
        data: p2,
        rowKey: m2,
        scroll: f2,
        tableLayout: h2,
        direction: g2,
        title: b2,
        footer: v2,
        summary: y2,
        caption: $2,
        id: x2,
        showHeader: C2,
        components: S2,
        emptyText: E2,
        onRow: k2,
        onHeaderRow: N2,
        measureRowRender: I2,
        onScroll: B2,
        internalHooks: R2,
        transformColumns: T2,
        internalRefs: M2,
        tailor: A2,
        getContainerWidth: L2,
        sticky: O2,
        rowHoverable: D2 = !0,
      } = l2,
      z2 = p2 || Vp,
      H2 = !!z2.length,
      j2 = R2 === Ku,
      _2 = Nt.useCallback((e4, t3) => pt(S2, e4) || t3, [S2]),
      K2 = Nt.useMemo(() => (typeof m2 == "function" ? m2 : (e4) => e4 && e4[m2]), [m2]),
      W2 = _2(["body"]),
      [F2, G2, q2] = (function () {
        const [e4, t3] = Nt.useState(-1),
          [o3, n2] = Nt.useState(-1);
        return [
          e4,
          o3,
          Nt.useCallback((e5, o4) => {
            t3(e5), n2(o4);
          }, []),
        ];
      })(),
      [V2, X2, U2, Y2, Z2, J2] = (function (e4, t3, o3) {
        const n2 = (function (e5) {
            const { expandable: t4, ...o4 } = e5;
            let n3;
            return (
              (n3 = "expandable" in e5 ? { ...o4, ...t4 } : o4),
              n3.showExpandColumn === !1 && (n3.expandIconColumnIndex = -1),
              n3
            );
          })(e4),
          {
            expandIcon: r3,
            expandedRowKeys: l3,
            defaultExpandedRowKeys: a3,
            defaultExpandAllRows: i3,
            expandedRowRender: s3,
            onExpand: c3,
            onExpandedRowsChange: d3,
            childrenColumnName: u3,
          } = n2,
          p3 = r3 || hp,
          m3 = u3 || "children",
          f3 = Nt.useMemo(
            () =>
              s3
                ? "row"
                : !!(
                    (e4.expandable &&
                      e4.internalHooks === Ku &&
                      e4.expandable.__PARENT_RENDER_ICON__) ||
                    t3.some((e5) => e5 && typeof e5 == "object" && e5[m3])
                  ) && "nest",
            [!!s3, t3],
          ),
          [h3, g3] = Nt.useState(
            () =>
              a3 ||
              (i3
                ? (function (e5, t4, o4) {
                    const n3 = [];
                    return (
                      (function e6(r4) {
                        (r4 || []).forEach((r5, l4) => {
                          n3.push(t4(r5, l4)), e6(r5[o4]);
                        });
                      })(e5),
                      n3
                    );
                  })(t3, o3, m3)
                : []),
          ),
          b3 = Nt.useMemo(() => new Set(l3 || h3 || []), [l3, h3]),
          v3 = Nt.useCallback(
            (e5) => {
              const n3 = o3(e5, t3.indexOf(e5));
              let r4;
              const l4 = b3.has(n3);
              l4 ? (b3.delete(n3), (r4 = [...b3])) : (r4 = [...b3, n3]),
                g3(r4),
                c3 && c3(!l4, e5),
                d3 && d3(r4);
            },
            [o3, b3, t3, c3, d3],
          );
        return [n2, f3, b3, p3, m3, v3];
      })(l2, z2, K2),
      Q2 = f2?.x,
      [ee2, te2] = Nt.useState(0),
      [oe2, ne2, re2] = Lp(
        {
          ...l2,
          ...V2,
          expandable: !!V2.expandedRowRender,
          columnTitle: V2.columnTitle,
          expandedKeys: U2,
          getRowKey: K2,
          onTriggerExpand: J2,
          expandIcon: Y2,
          expandIconColumnIndex: V2.expandIconColumnIndex,
          direction: g2,
          scrollWidth: j2 && A2 && typeof Q2 == "number" ? Q2 : null,
          clientWidth: ee2,
        },
        j2 ? T2 : null,
      ),
      ae2 = re2 ?? Q2,
      ie2 = Nt.useMemo(() => ({ columns: oe2, flattenColumns: ne2 }), [oe2, ne2]),
      se2 = Nt.useRef(null),
      ce2 = Nt.useRef(null),
      de2 = Nt.useRef(null),
      ue2 = Nt.useRef(null);
    Nt.useImperativeHandle(t2, () => ({
      nativeElement: se2.current,
      scrollTo: (e4) => {
        var t3, o3, n2;
        if (de2.current instanceof HTMLElement) {
          const { index: o4, top: r3, key: l3, offset: a3, align: i3 = "nearest" } = e4;
          if (typeof (n2 = r3) != "number" || Number.isNaN(n2)) {
            const e5 = l3 ?? K2(z2[o4]),
              t4 = de2.current.querySelector(`[data-row-key="${e5}"]`);
            if (t4 && (t4.scrollIntoView({ block: i3 }), a3)) {
              const e6 = de2.current;
              e6.scrollTo({ top: e6.scrollTop + a3 });
            }
          } else (t3 = de2.current) == null || t3.scrollTo({ top: r3 });
        } else (o3 = de2.current) != null && o3.scrollTo && de2.current.scrollTo(e4);
      },
    }));
    const pe2 = Nt.useRef(null),
      [me2, fe2] = Nt.useState(!1),
      [he2, ge2] = Nt.useState(!1),
      [be2, ve2] = Nt.useState(new Map()),
      ye2 = Zu(ne2).map((e4) => be2.get(e4)),
      $e2 = Nt.useMemo(() => ye2, [ye2.join("_")]),
      xe2 = (function (e4, t3) {
        return Nt.useMemo(() => {
          const o3 = t3.length,
            n2 = (o4, n3, r3) => {
              const l3 = [];
              let a3 = 0;
              for (let i3 = o4; i3 !== n3; i3 += r3)
                l3.push(a3), t3[i3].fixed && (a3 += e4[i3] || 0);
              return l3;
            };
          return { start: n2(0, o3, 1), end: n2(o3 - 1, -1, -1).reverse(), widths: e4 };
        }, [e4, t3]);
      })($e2, ne2),
      Ce2 = f2 && Ju(f2.y),
      we2 = (f2 && Ju(ae2)) || !!V2.fixed,
      Se2 = we2 && ne2.some(({ fixed: e4 }) => e4),
      Ee2 = Nt.useRef(null),
      {
        isSticky: ke2,
        offsetHeader: Ne2,
        offsetSummary: Ie2,
        offsetScroll: Be2,
        stickyClassName: Re2,
        container: Te2,
      } = (function (e4, t3) {
        const {
            offsetHeader: o3 = 0,
            offsetSummary: n2 = 0,
            offsetScroll: r3 = 0,
            getContainer: l3 = () => Op,
          } = typeof e4 == "object" ? e4 : {},
          a3 = l3() || Op,
          i3 = !!e4;
        return Nt.useMemo(
          () => ({
            isSticky: i3,
            stickyClassName: i3 ? `${t3}-sticky-holder` : "",
            offsetHeader: o3,
            offsetSummary: n2,
            offsetScroll: r3,
            container: a3,
          }),
          [i3, r3, o3, n2, t3, a3],
        );
      })(O2, a2),
      Me2 = Nt.useMemo(() => y2?.(z2), [y2, z2]),
      Pe2 = (Ce2 || ke2) && Nt.isValidElement(Me2) && Me2.type === sp && Me2.props.fixed;
    let Oe2, De2, ze2;
    Ce2 && (De2 = { overflowY: H2 ? "scroll" : "auto", maxHeight: f2.y }),
      we2 &&
        ((Oe2 = { overflowX: "auto" }),
        Ce2 || (De2 = { overflowY: "hidden" }),
        (ze2 = { width: ae2 === !0 ? "auto" : ae2, minWidth: "100%" }));
    const He2 = Nt.useCallback((e4, t3) => {
        ve2((o3) => {
          if (o3.get(e4) !== t3) {
            const n2 = new Map(o3);
            return n2.set(e4, t3), n2;
          }
          return o3;
        });
      }, []),
      [je2, _e2] = (function (e4) {
        const t3 = Nt.useRef(e4 || null),
          o3 = Nt.useRef(null);
        function n2() {
          clearTimeout(o3.current);
        }
        return (
          Nt.useEffect(() => n2, []),
          [
            function (e5) {
              (t3.current = e5),
                n2(),
                (o3.current = setTimeout(() => {
                  (t3.current = null), (o3.current = void 0);
                }, 100));
            },
            function () {
              return t3.current;
            },
          ]
        );
      })(null),
      [Ke2] = Nt.useState(() => new WeakMap());
    function We2(e4, t3) {
      if (!t3) return;
      if (typeof t3 == "function") return void t3(e4);
      const o3 = Ke2.get(t3);
      if ((o3 && clearTimeout(o3), t3.scrollLeft !== e4)) {
        t3.scrollLeft = e4;
        const o4 = setTimeout(() => {
          t3.scrollLeft !== e4 && (t3.scrollLeft = e4);
        }, 0);
        Ke2.set(t3, o4);
      }
    }
    const [Fe2, Ge2] = Nt.useState([0, 0]),
      qe2 = n(({ currentTarget: e4, scrollLeft: t3 }) => {
        var o3;
        const n2 = typeof t3 == "number" ? t3 : e4.scrollLeft,
          r3 = e4 || Xp;
        (_e2() && _e2() !== r3) ||
          (je2(r3),
          We2(n2, ce2.current),
          We2(n2, de2.current),
          We2(n2, pe2.current),
          We2(n2, (o3 = Ee2.current) == null ? void 0 : o3.setScrollLeft));
        const l3 = e4 || ce2.current;
        if (l3) {
          const e5 = j2 && A2 && typeof ae2 == "number" ? ae2 : l3.scrollWidth,
            t4 = l3.clientWidth,
            o4 = Math.abs(n2);
          if (
            (Ge2((n3) => {
              const r4 = [o4, e5 - t4];
              return Le(n3, r4) ? n3 : r4;
            }),
            e5 === t4)
          )
            return fe2(!1), void ge2(!1);
          fe2(o4 > 0), ge2(o4 < e5 - t4 - 1);
        }
      }),
      Ve2 = n((e4) => {
        qe2(e4), B2?.(e4);
      }),
      Xe2 = () => {
        var e4;
        we2 && de2.current
          ? qe2({
              currentTarget: ft(de2.current),
              scrollLeft: (e4 = de2.current) == null ? void 0 : e4.scrollLeft,
            })
          : (fe2(!1), ge2(!1));
      },
      Ue2 = (e4) => {
        var t3, o3;
        (t3 = Ee2.current) == null || t3.checkScrollBarVisible();
        let n2 = e4 ?? ((o3 = se2.current) == null ? void 0 : o3.offsetWidth) ?? 0;
        j2 && L2 && se2.current && (n2 = L2(se2.current, n2) || n2), n2 !== ee2 && (Xe2(), te2(n2));
      };
    le(() => {
      we2 && Ue2();
    }, [we2]);
    const Ye2 = Nt.useRef(!1);
    Nt.useEffect(() => {
      Ye2.current && Xe2();
    }, [we2, p2, oe2.length]),
      Nt.useEffect(() => {
        Ye2.current = !0;
      }, []);
    const [Ze2, Je2] = Nt.useState(0);
    le(() => {
      (A2 && j2) ||
        (de2.current instanceof Element ? Je2(gt(de2.current).width) : Je2(gt(ue2.current).width));
    }, []),
      Nt.useEffect(() => {
        j2 && M2 && (M2.body.current = de2.current);
      });
    const Qe2 = Nt.useCallback(
        (e4) =>
          Nt.createElement(
            Nt.Fragment,
            null,
            Nt.createElement(Rp, e4),
            Pe2 === "top" && Nt.createElement(cp, e4, Me2),
          ),
        [Pe2, Me2],
      ),
      et2 = Nt.useCallback((e4) => Nt.createElement(cp, e4, Me2), [Me2]),
      tt2 = _2(["table"], "table"),
      nt2 = Nt.useMemo(
        () =>
          h2 ||
          (Se2
            ? ae2 === "max-content"
              ? "auto"
              : "fixed"
            : Ce2 || ke2 || ne2.some(({ ellipsis: e4 }) => e4)
              ? "fixed"
              : "auto"),
        [Ce2, Se2, ne2, h2, ke2],
      );
    let rt2;
    const lt2 = {
        colWidths: $e2,
        columCount: ne2.length,
        stickyOffsets: xe2,
        onHeaderRow: N2,
        fixHeader: Ce2,
        scroll: f2,
      },
      at2 = Nt.useMemo(() => (H2 ? null : typeof E2 == "function" ? E2() : E2), [H2, E2]),
      it2 = Nt.createElement(Cp, { data: z2, measureColumnWidth: Ce2 || we2 || ke2 }),
      st2 = Nt.createElement(Ep, { colWidths: ne2.map(({ width: e4 }) => e4), columns: ne2 }),
      ct2 = $2 != null ? Nt.createElement("caption", { className: `${a2}-caption` }, $2) : void 0,
      dt2 = w(l2, { data: !0 }),
      ut2 = w(l2, { aria: !0 });
    if (Ce2 || ke2) {
      let e4;
      typeof W2 == "function"
        ? ((e4 = W2(z2, { scrollbarSize: Ze2, ref: de2, onScroll: qe2 })),
          (lt2.colWidths = ne2.map(({ width: e5 }, t4) => {
            const o3 = t4 === ne2.length - 1 ? e5 - Ze2 : e5;
            return typeof o3 != "number" || Number.isNaN(o3) ? 0 : o3;
          })))
        : (e4 = Nt.createElement(
            "div",
            { style: { ...Oe2, ...De2 }, onScroll: Ve2, ref: de2, className: `${a2}-body` },
            Nt.createElement(
              tt2,
              Gp({ style: { ...ze2, tableLayout: nt2 } }, ut2),
              ct2,
              st2,
              it2,
              !Pe2 && Me2 && Nt.createElement(cp, { stickyOffsets: xe2, flattenColumns: ne2 }, Me2),
            ),
          ));
      const t3 = {
        noData: !z2.length,
        maxContentScroll: we2 && ae2 === "max-content",
        ...lt2,
        ...ie2,
        direction: g2,
        stickyClassName: Re2,
        scrollX: ae2,
        tableLayout: nt2,
        onScroll: qe2,
      };
      rt2 = Nt.createElement(
        Nt.Fragment,
        null,
        C2 !== !1 &&
          Nt.createElement(
            Np,
            Gp({}, t3, {
              stickyTopOffset: Ne2,
              className: `${a2}-header`,
              ref: ce2,
              colGroup: st2,
            }),
            Qe2,
          ),
        e4,
        Pe2 &&
          Pe2 !== "top" &&
          Nt.createElement(
            Np,
            Gp({}, t3, {
              stickyBottomOffset: Ie2,
              className: `${a2}-summary`,
              ref: pe2,
              colGroup: st2,
            }),
            et2,
          ),
        ke2 &&
          de2.current &&
          de2.current instanceof Element &&
          Nt.createElement(Fp, {
            ref: Ee2,
            offsetScroll: Be2,
            scrollBodyRef: de2,
            onScroll: qe2,
            container: Te2,
            direction: g2,
          }),
      );
    } else
      rt2 = Nt.createElement(
        "div",
        {
          style: { ...Oe2, ...De2, ...u2?.content },
          className: P(`${a2}-content`, d2?.content),
          onScroll: qe2,
          ref: de2,
        },
        Nt.createElement(
          tt2,
          Gp({ style: { ...ze2, tableLayout: nt2 } }, ut2),
          ct2,
          st2,
          C2 !== !1 && Nt.createElement(Rp, Gp({}, lt2, ie2)),
          it2,
          Me2 && Nt.createElement(cp, { stickyOffsets: xe2, flattenColumns: ne2 }, Me2),
        ),
      );
    const mt2 = { ...c2 };
    ke2 && (mt2["--columns-count"] = ne2.length);
    let ht2 = Nt.createElement(
      "div",
      Gp(
        {
          className: P(a2, i2, {
            [`${a2}-rtl`]: g2 === "rtl",
            [`${a2}-fix-start-shadow`]: we2,
            [`${a2}-fix-end-shadow`]: we2,
            [`${a2}-fix-start-shadow-show`]: we2 && me2,
            [`${a2}-fix-end-shadow-show`]: we2 && he2,
            [`${a2}-layout-fixed`]: h2 === "fixed",
            [`${a2}-fixed-header`]: Ce2,
            [`${a2}-fixed-column`]: Se2,
            [`${a2}-scroll-horizontal`]: we2,
            [`${a2}-has-fix-start`]: (o2 = ne2[0]) == null ? void 0 : o2.fixed,
            [`${a2}-has-fix-end`]:
              ((r2 = ne2[ne2.length - 1]) == null ? void 0 : r2.fixed) === "end",
          }),
          style: mt2,
          id: x2,
          ref: se2,
        },
        dt2,
      ),
      b2 &&
        Nt.createElement(Dp, { className: P(`${a2}-title`, d2?.title), style: u2?.title }, b2(z2)),
      Nt.createElement(
        "div",
        { ref: ue2, className: P(`${a2}-container`, d2?.section), style: u2?.section },
        rt2,
      ),
      v2 &&
        Nt.createElement(
          Dp,
          { className: P(`${a2}-footer`, d2?.footer), style: u2?.footer },
          v2(z2),
        ),
    );
    we2 && (ht2 = Nt.createElement(ot, { onResize: ({ offsetWidth: e4 }) => Ue2(e4) }, ht2));
    const bt2 = (function (e4, t3) {
        const o3 = Nt.useMemo(() => e4.map((o4, n2) => lp(n2, n2, e4, t3)), [e4, t3]);
        return Ae(
          () => o3,
          [o3],
          (e5, t4) => !Le(e5, t4),
        );
      })(ne2, xe2),
      vt2 = Nt.useMemo(
        () => ({
          scrollX: ae2,
          scrollInfo: Fe2,
          classNames: d2,
          styles: u2,
          prefixCls: a2,
          getComponent: _2,
          scrollbarSize: Ze2,
          direction: g2,
          fixedInfoList: bt2,
          isSticky: ke2,
          componentWidth: ee2,
          fixHeader: Ce2,
          fixColumn: Se2,
          horizonScroll: we2,
          tableLayout: nt2,
          rowClassName: s2,
          expandedRowClassName: V2.expandedRowClassName,
          expandIcon: Y2,
          expandableType: X2,
          expandRowByClick: V2.expandRowByClick,
          expandedRowRender: V2.expandedRowRender,
          forceRender: V2.forceRender ?? !1,
          expandedRowOffset: V2.expandedRowOffset,
          onTriggerExpand: J2,
          expandIconColumnIndex: V2.expandIconColumnIndex,
          indentSize: V2.indentSize,
          allColumnsFixedLeft: ne2.every((e4) => e4.fixed === "start"),
          emptyNode: at2,
          columns: oe2,
          flattenColumns: ne2,
          onColumnResize: He2,
          colWidths: $e2,
          hoverStartRow: F2,
          hoverEndRow: G2,
          onHover: q2,
          rowExpandable: V2.rowExpandable,
          onRow: k2,
          getRowKey: K2,
          expandedKeys: U2,
          childrenColumnName: Z2,
          rowHoverable: D2,
          measureRowRender: I2,
        }),
        [
          ae2,
          Fe2,
          d2,
          u2,
          a2,
          _2,
          Ze2,
          g2,
          bt2,
          ke2,
          ee2,
          Ce2,
          Se2,
          we2,
          nt2,
          s2,
          V2.expandedRowClassName,
          Y2,
          X2,
          V2.expandRowByClick,
          V2.expandedRowRender,
          V2.forceRender,
          V2.expandedRowOffset,
          J2,
          V2.expandIconColumnIndex,
          V2.indentSize,
          at2,
          oe2,
          ne2,
          He2,
          $e2,
          F2,
          G2,
          q2,
          V2.rowExpandable,
          k2,
          K2,
          U2,
          Z2,
          D2,
          I2,
        ],
      );
    return Nt.createElement(Uu.Provider, { value: vt2 }, ht2);
  },
  Zp = Nt.forwardRef(Yp),
  Jp = (e3) => qu(Zp, e3),
  Qp = Jp();
(Qp.EXPAND_COLUMN = _u),
  (Qp.INTERNAL_HOOKS = Ku),
  (Qp.Column = function (e3) {
    return null;
  }),
  (Qp.ColumnGroup = function (e3) {
    return null;
  }),
  (Qp.Summary = dp);
const em = Wu(null),
  tm = Wu(null);
function om() {
  return (
    (om = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    om.apply(this, arguments)
  );
}
const nm = (e3) => {
  const {
      rowInfo: t2,
      column: o2,
      colIndex: n2,
      indent: r2,
      index: l2,
      component: a2,
      renderIndex: i2,
      record: s2,
      style: c2,
      className: d2,
      inverse: u2,
      getHeight: p2,
    } = e3,
    { render: m2, dataIndex: f2, className: h2, width: g2 } = o2,
    { columnsOffset: b2 } = Fu(tm, ["columnsOffset"]),
    {
      key: v2,
      fixedInfo: y2,
      appendCellNode: $2,
      additionalCellProps: x2,
      originRowSpan: C2,
    } = vp(t2, o2, n2, r2, l2),
    { style: w2, colSpan: S2 = 1, rowSpan: E2 = 1 } = x2,
    k2 = (function (e4, t3, o3) {
      return o3[e4 + (t3 || 1)] - (o3[e4] || 0);
    })(n2 - 1, S2, b2),
    N2 = {
      ...w2,
      ...c2,
      flex: `0 0 ${k2}px`,
      width: `${k2}px`,
      marginRight: S2 > 1 ? g2 - k2 : 0,
      pointerEvents: "auto",
    },
    I2 = Nt.useMemo(() => (u2 ? E2 <= 1 : S2 === 0 || E2 === 0 || E2 > 1), [E2, S2, u2]);
  I2 ? (N2.visibility = "hidden") : u2 && (N2.height = p2?.(E2));
  const B2 = I2 ? () => null : m2,
    R2 = {};
  return (
    (E2 !== 0 && S2 !== 0) || ((R2.rowSpan = 1), (R2.colSpan = 1)),
    Nt.createElement(
      op,
      om(
        {
          className: P(h2, d2),
          ellipsis: o2.ellipsis,
          align: o2.align,
          scope: o2.rowScope,
          component: a2,
          prefixCls: t2.prefixCls,
          key: v2,
          record: s2,
          index: l2,
          renderIndex: i2,
          dataIndex: f2,
          render: B2,
          shouldCellUpdate: o2.shouldCellUpdate,
        },
        y2,
        { appendNode: $2, originRowSpan: C2, additionalProps: { ...x2, style: N2, ...R2 } },
      ),
    )
  );
};
function rm() {
  return (
    (rm = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    rm.apply(this, arguments)
  );
}
const lm = Vu(
    Nt.forwardRef((e3, t2) => {
      var o2, n2;
      const {
          data: r2,
          index: l2,
          className: a2,
          rowKey: i2,
          style: s2,
          extra: c2,
          getHeight: d2,
          ...u2
        } = e3,
        { record: p2, indent: m2, index: f2 } = r2,
        {
          scrollX: h2,
          flattenColumns: g2,
          prefixCls: b2,
          fixColumn: v2,
          componentWidth: y2,
          classNames: $2,
          styles: x2,
        } = Fu(Uu, [
          "prefixCls",
          "flattenColumns",
          "fixColumn",
          "componentWidth",
          "scrollX",
          "classNames",
          "styles",
        ]),
        { getComponent: C2 } = Fu(em, ["getComponent"]),
        w2 = mp(p2, i2, l2, m2),
        S2 = C2(["body", "row"], "div"),
        E2 = C2(["body", "cell"], "div"),
        {
          rowSupportExpand: k2,
          expanded: N2,
          rowProps: I2,
          expandedRowRender: B2,
          expandedRowClassName: R2,
          forceRender: T2,
        } = w2,
        M2 = gp(R2, p2, l2, m2);
      let A2;
      if (!c2 && k2 && (T2 || N2)) {
        const e4 = B2(p2, l2, m2 + 1, N2);
        let t3 = {};
        v2 && (t3 = { style: { "--virtual-width": `${y2}px` } });
        const o3 = `${b2}-expanded-row-cell`;
        A2 = Nt.createElement(
          S2,
          {
            className: P(`${b2}-expanded-row`, `${b2}-expanded-row-level-${m2 + 1}`, M2),
            style: { display: N2 ? void 0 : "none" },
          },
          Nt.createElement(
            op,
            {
              component: E2,
              prefixCls: b2,
              className: P(o3, { [`${o3}-fixed`]: v2 }),
              additionalProps: t3,
            },
            e4,
          ),
        );
      }
      const L2 = { ...s2, width: h2 };
      c2 && ((L2.position = "absolute"), (L2.pointerEvents = "none"));
      const O2 = Nt.createElement(
        S2,
        rm({}, I2, u2, {
          "data-row-key": i2,
          ref: k2 ? null : t2,
          className: P(a2, `${b2}-row`, I2?.className, (o2 = $2?.body) == null ? void 0 : o2.row, {
            [M2]: m2 >= 1,
            [`${b2}-row-extra`]: c2,
          }),
          style: { ...L2, ...I2?.style, ...((n2 = x2?.body) == null ? void 0 : n2.row) },
        }),
        g2.map((e4, t3) => {
          var o3, n3;
          return Nt.createElement(nm, {
            key: t3,
            className: (o3 = $2?.body) == null ? void 0 : o3.cell,
            style: (n3 = x2?.body) == null ? void 0 : n3.cell,
            component: E2,
            rowInfo: w2,
            column: e4,
            colIndex: t3,
            indent: m2,
            index: l2,
            renderIndex: f2,
            record: p2,
            inverse: c2,
            getHeight: d2,
          });
        }),
      );
      return k2 ? Nt.createElement("div", { ref: t2 }, O2, A2) : O2;
    }),
  ),
  am = { start: "top", end: "bottom", nearest: "auto" },
  im = Vu(
    Nt.forwardRef((e3, t2) => {
      const { data: o2, onScroll: n2 } = e3,
        {
          flattenColumns: r2,
          onColumnResize: l2,
          getRowKey: a2,
          expandedKeys: i2,
          prefixCls: s2,
          childrenColumnName: c2,
          scrollX: d2,
          direction: u2,
        } = Fu(Uu, [
          "flattenColumns",
          "onColumnResize",
          "getRowKey",
          "prefixCls",
          "expandedKeys",
          "childrenColumnName",
          "scrollX",
          "direction",
        ]),
        { sticky: p2, scrollY: m2, listItemHeight: f2, getComponent: h2, onScroll: g2 } = Fu(em),
        b2 = Nt.useRef(null),
        v2 = pp(o2, c2, i2, a2),
        y2 = Nt.useMemo(() => {
          let e4 = 0;
          return r2.map(({ width: t3, minWidth: o3, key: n3 }) => {
            const r3 = Math.max(t3 || 0, o3 || 0);
            return (e4 += r3), [n3, r3, e4];
          });
        }, [r2]),
        $2 = Nt.useMemo(() => y2.map((e4) => e4[2]), [y2]);
      Nt.useEffect(() => {
        y2.forEach(([e4, t3]) => {
          l2(e4, t3);
        });
      }, [y2]),
        Nt.useImperativeHandle(t2, () => {
          var e4;
          const t3 = {
            scrollTo: (e5) => {
              var t4;
              const { align: o3, offset: n3, ...r3 } = e5,
                l3 = am[o3] ?? (n3 ? "top" : "auto");
              (t4 = b2.current) == null || t4.scrollTo({ ...r3, offset: n3, align: l3 });
            },
            nativeElement: (e4 = b2.current) == null ? void 0 : e4.nativeElement,
          };
          return (
            Object.defineProperty(t3, "scrollLeft", {
              get: () => {
                var e5;
                return ((e5 = b2.current) == null ? void 0 : e5.getScrollInfo().x) || 0;
              },
              set: (e5) => {
                var t4;
                (t4 = b2.current) == null || t4.scrollTo({ left: e5 });
              },
            }),
            Object.defineProperty(t3, "scrollTop", {
              get: () => {
                var e5;
                return ((e5 = b2.current) == null ? void 0 : e5.getScrollInfo().y) || 0;
              },
              set: (e5) => {
                var t4;
                (t4 = b2.current) == null || t4.scrollTo({ top: e5 });
              },
            }),
            t3
          );
        });
      const x2 = (e4, t3) => {
          var o3;
          const n3 = (o3 = v2[t3]) == null ? void 0 : o3.record,
            { onCell: r3 } = e4;
          if (r3) {
            const e5 = r3(n3, t3);
            return e5?.rowSpan ?? 1;
          }
          return 1;
        },
        C2 = Nt.useMemo(() => ({ columnsOffset: $2 }), [$2]),
        w2 = `${s2}-tbody`,
        S2 = h2(["body", "wrapper"]),
        E2 = {};
      return (
        p2 &&
          ((E2.position = "sticky"),
          (E2.bottom = 0),
          typeof p2 == "object" && p2.offsetScroll && (E2.bottom = p2.offsetScroll)),
        Nt.createElement(
          tm.Provider,
          { value: C2 },
          Nt.createElement(
            rt,
            {
              fullHeight: !1,
              ref: b2,
              prefixCls: `${w2}-virtual`,
              styles: { horizontalScrollBar: E2 },
              className: w2,
              height: m2,
              itemHeight: f2 || 24,
              data: v2,
              itemKey: (e4) => a2(e4.record),
              component: S2,
              scrollWidth: d2,
              direction: u2,
              onVirtualScroll: ({ x: e4 }) => {
                var t3;
                n2({
                  currentTarget: (t3 = b2.current) == null ? void 0 : t3.nativeElement,
                  scrollLeft: e4,
                });
              },
              onScroll: g2,
              extraRender: (e4) => {
                const { start: t3, end: o3, getSize: n3, offsetY: l3 } = e4;
                if (o3 < 0) return null;
                let i3 = r2.filter((e5) => x2(e5, t3) === 0),
                  s3 = t3;
                for (let r3 = t3; r3 >= 0; r3 -= 1)
                  if (((i3 = i3.filter((e5) => x2(e5, r3) === 0)), !i3.length)) {
                    s3 = r3;
                    break;
                  }
                let c3 = r2.filter((e5) => x2(e5, o3) !== 1),
                  d3 = o3;
                for (let r3 = o3; r3 < v2.length; r3 += 1)
                  if (((c3 = c3.filter((e5) => x2(e5, r3) !== 1)), !c3.length)) {
                    d3 = Math.max(r3 - 1, o3);
                    break;
                  }
                const u3 = [];
                for (let a3 = s3; a3 <= d3; a3 += 1)
                  v2[a3] && r2.some((e5) => x2(e5, a3) > 1) && u3.push(a3);
                return u3.map((e5) => {
                  const t4 = v2[e5],
                    o4 = a2(t4.record, e5),
                    r3 = n3(o4);
                  return Nt.createElement(lm, {
                    key: e5,
                    data: t4,
                    rowKey: o4,
                    index: e5,
                    style: { top: -l3 + r3.top },
                    extra: !0,
                    getHeight: (t5) => {
                      const r4 = e5 + t5 - 1,
                        l4 = v2[r4];
                      if (!l4 || !l4.record) {
                        const e6 = Math.min(r4, v2.length - 1),
                          t6 = v2[e6],
                          l5 = a2(t6.record, e6),
                          i5 = n3(o4, l5);
                        return i5.bottom - i5.top;
                      }
                      const i4 = a2(l4.record, r4),
                        s4 = n3(o4, i4);
                      return s4.bottom - s4.top;
                    },
                  });
                });
              },
            },
            (e4, t3, o3) => {
              const n3 = a2(e4.record, t3);
              return Nt.createElement(lm, { data: e4, rowKey: n3, index: t3, style: o3.style });
            },
          ),
        )
      );
    }),
  );
function sm() {
  return (
    (sm = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    sm.apply(this, arguments)
  );
}
const cm = (e3, t2) => {
    const { ref: o2, onScroll: n2 } = t2;
    return Nt.createElement(im, { ref: o2, data: e3, onScroll: n2 });
  },
  dm = (e3, t2) => {
    const {
      data: o2,
      columns: r2,
      scroll: l2,
      sticky: a2,
      prefixCls: i2 = qp,
      className: s2,
      listItemHeight: c2,
      components: d2,
      onScroll: u2,
    } = e3;
    let { x: p2, y: m2 } = l2 || {};
    typeof p2 != "number" && (p2 = 1), typeof m2 != "number" && (m2 = 500);
    const f2 = n((e4, t3) => pt(d2, e4) || t3),
      h2 = n(u2),
      g2 = Nt.useMemo(
        () => ({ sticky: a2, scrollY: m2, listItemHeight: c2, getComponent: f2, onScroll: h2 }),
        [a2, m2, c2, f2, h2],
      );
    return Nt.createElement(
      em.Provider,
      { value: g2 },
      Nt.createElement(
        Qp,
        sm({}, e3, {
          className: P(s2, `${i2}-virtual`),
          scroll: { ...l2, x: p2 },
          components: { ...d2, body: o2?.length ? cm : void 0 },
          columns: r2,
          internalHooks: Ku,
          tailor: !0,
          ref: t2,
        }),
      ),
    );
  },
  um = Nt.forwardRef(dm),
  pm = (e3) => qu(um, e3);
pm();
const mm = (e3) => null,
  fm = (e3) => null,
  hm = {},
  gm = "SELECT_ALL",
  bm = "SELECT_INVERT",
  vm = "SELECT_NONE",
  ym = [],
  $m = (e3, t2, o2 = []) => (
    (t2 || []).forEach((t3) => {
      o2.push(t3), v(t3) && e3 in t3 && $m(e3, t3[e3], o2);
    }),
    o2
  ),
  xm = (e3, t2) => {
    const {
        preserveSelectedRowKeys: o2,
        selectedRowKeys: r2,
        defaultSelectedRowKeys: l2,
        getCheckboxProps: a2,
        getTitleCheckboxProps: i2,
        onChange: s2,
        onSelect: c2,
        onSelectAll: d2,
        onSelectInvert: u2,
        onSelectNone: p2,
        onSelectMultiple: m2,
        columnWidth: f2,
        type: g2,
        selections: b2,
        fixed: v2,
        renderCell: y2,
        hideSelectAll: $2,
        checkStrictly: x2 = !0,
      } = t2 || {},
      {
        prefixCls: C2,
        data: w2,
        pageData: E2,
        getRecordByKey: k2,
        getRowKey: N2,
        expandType: I2,
        childrenColumnName: B2,
        locale: R2,
        getPopupContainer: T2,
      } = e3,
      M2 = Te(),
      [A2, L2] = ((e4) => {
        const [t3, o3] = Nt.useState(null);
        return [
          n((n2, r3, l3) => {
            const a3 = t3 ?? n2,
              i3 = Math.min(a3 || 0, n2),
              s3 = Math.max(a3 || 0, n2),
              c3 = r3.slice(i3, s3 + 1).map(e4),
              d3 = c3.some((e5) => !l3.has(e5)),
              u3 = [];
            return (
              c3.forEach((e5) => {
                d3 ? (l3.has(e5) || u3.push(e5), l3.add(e5)) : (l3.delete(e5), u3.push(e5));
              }),
              o3(d3 ? s3 : null),
              u3
            );
          }),
          o3,
        ];
      })((e4) => e4),
      [O2, D2] = Me(l2 || ym, r2),
      z2 = O2 ?? ym,
      H2 = Nt.useRef(new Map()),
      j2 = Nt.useCallback(
        (e4) => {
          if (o2) {
            const t3 = new Map();
            e4.forEach((e5) => {
              let o3 = k2(e5);
              !o3 && H2.current.has(e5) && (o3 = H2.current.get(e5)), t3.set(e5, o3);
            }),
              (H2.current = t3);
          }
        },
        [k2, o2],
      );
    Nt.useEffect(() => {
      j2(z2);
    }, [z2, j2]);
    const _2 = Nt.useCallback(
        (e4) => {
          const t3 = k2(e4);
          return !t3 && o2 ? H2.current.get(e4) : t3;
        },
        [k2, o2],
      ),
      K2 = Nt.useMemo(() => $m(B2, E2), [B2, E2]),
      { keyEntities: W2 } = Nt.useMemo(() => {
        if (x2) return { keyEntities: null };
        let e4 = w2;
        if (o2) {
          const t3 = new Set(K2.map(N2)),
            o3 = Array.from(H2.current).reduce(
              (e5, [o4, n2]) => (t3.has(o4) ? e5 : e5.concat(n2)),
              [],
            );
          e4 = [].concat(S(e4), S(o3));
        }
        return Tc(e4, { externalGetKey: N2, childrenPropName: B2 });
      }, [w2, N2, x2, B2, o2, K2]),
      F2 = Nt.useMemo(() => {
        const e4 = new Map();
        return (
          K2.forEach((t3, o3) => {
            const n2 = N2(t3, o3),
              r3 = (a2 ? a2(t3) : null) || {};
            e4.set(n2, r3);
          }),
          e4
        );
      }, [K2, N2, a2]),
      G2 = Nt.useCallback(
        (e4) => {
          const t3 = N2(e4);
          let o3;
          return (o3 = F2.has(t3) ? F2.get(N2(e4)) : a2 ? a2(e4) : void 0), !!o3?.disabled;
        },
        [F2, N2],
      ),
      [q2, V2] = Nt.useMemo(() => {
        if (x2) return [z2, []];
        const { checkedKeys: e4, halfCheckedKeys: t3 } = sd(z2, !0, W2, G2);
        return [e4 || [], t3];
      }, [z2, x2, W2, G2]),
      X2 = Nt.useMemo(() => {
        const e4 = g2 === "radio" ? q2.slice(0, 1) : q2;
        return new Set(e4);
      }, [q2, g2]),
      U2 = Nt.useMemo(() => (g2 === "radio" ? new Set() : new Set(V2)), [V2, g2]);
    Nt.useEffect(() => {
      t2 || D2(ym);
    }, [!!t2]);
    const Y2 = Nt.useCallback(
        (e4, t3) => {
          let n2, r3;
          j2(e4),
            o2
              ? ((n2 = e4), (r3 = e4.map((e5) => H2.current.get(e5))))
              : ((n2 = []),
                (r3 = []),
                e4.forEach((e5) => {
                  const t4 = k2(e5);
                  t4 !== void 0 && (n2.push(e5), r3.push(t4));
                })),
            D2(n2),
            s2?.(n2, r3, { type: t3 });
        },
        [D2, k2, s2, o2],
      ),
      Z2 = Nt.useCallback(
        (e4, t3, o3, n2) => {
          if (c2) {
            const r3 = o3.map(_2);
            c2(k2(e4), t3, r3, n2);
          }
          Y2(o3, "single");
        },
        [c2, k2, _2, Y2],
      ),
      J2 = Nt.useMemo(
        () =>
          !b2 || $2
            ? null
            : (b2 === !0 ? [gm, bm, vm] : b2).map((e4) => {
                let t3;
                return (
                  (t3 =
                    e4 === gm
                      ? {
                          key: "all",
                          text: R2.selectionAll,
                          onSelect() {
                            Y2(
                              $m(B2, w2).reduce((e5, t4, o3) => {
                                const n2 = N2(t4, o3);
                                return (G2(t4) && !X2.has(n2)) || e5.push(n2), e5;
                              }, []),
                              "all",
                            );
                          },
                        }
                      : e4 === bm
                        ? {
                            key: "invert",
                            text: R2.selectInvert,
                            onSelect() {
                              const e5 = new Set(X2);
                              E2.forEach((t5, o3) => {
                                const n2 = N2(t5, o3),
                                  r3 = F2.get(n2);
                                r3?.disabled || (e5.has(n2) ? e5.delete(n2) : e5.add(n2));
                              });
                              const t4 = Array.from(e5);
                              u2 && (M2.deprecated(!1, "onSelectInvert", "onChange"), u2(t4)),
                                Y2(t4, "invert");
                            },
                          }
                        : e4 === vm
                          ? {
                              key: "none",
                              text: R2.selectNone,
                              onSelect() {
                                p2?.(),
                                  Y2(
                                    Array.from(X2).filter((e5) => {
                                      const t4 = F2.get(e5);
                                      return t4?.disabled;
                                    }),
                                    "none",
                                  );
                              },
                            }
                          : e4),
                  {
                    ...t3,
                    onSelect: (e5) => {
                      var o3;
                      (o3 = t3.onSelect) == null || o3.call(t3, e5), L2(null);
                    },
                  }
                );
              }),
        [
          b2,
          $2,
          R2.selectionAll,
          R2.selectInvert,
          R2.selectNone,
          F2,
          G2,
          X2,
          w2,
          B2,
          E2,
          N2,
          u2,
          Y2,
        ],
      );
    return [
      Nt.useCallback(
        (e4) => {
          var o3;
          if (!t2) return e4.filter((e5) => e5 !== hm);
          let n2 = S(e4);
          const r3 = new Set(X2),
            l3 = K2.reduce((e5, t3, o4) => {
              const n3 = N2(t3, o4);
              return F2.get(n3).disabled || e5.push(n3), e5;
            }, []),
            a3 = l3.every((e5) => r3.has(e5)),
            s3 = l3.some((e5) => r3.has(e5));
          let c3, u3, p3;
          if (g2 !== "radio") {
            let e5;
            if (J2) {
              const t4 = {
                getPopupContainer: T2,
                items: J2.map((e6, t5) => {
                  const { key: o5, text: n4, onSelect: r4 } = e6;
                  return {
                    key: o5 ?? t5,
                    onClick: () => {
                      r4?.(l3);
                    },
                    label: n4,
                  };
                }),
              };
              e5 = Nt.createElement(
                "div",
                { className: `${C2}-selection-extra` },
                Nt.createElement(
                  Kd,
                  { menu: t4, getPopupContainer: T2 },
                  Nt.createElement("span", null, Nt.createElement(bt, null)),
                ),
              );
            }
            const t3 = K2.reduce((e6, t4, o5) => {
                const n4 = N2(t4, o5),
                  l4 = F2.get(n4) || {},
                  a4 = { checked: r3.has(n4), ...l4 };
                return a4.disabled && e6.push(a4), e6;
              }, []),
              o4 = !!t3.length && t3.length === K2.length,
              n3 = o4 && t3.every(({ checked: e6 }) => e6),
              p4 = o4 && t3.some(({ checked: e6 }) => e6),
              m3 = i2?.() || {},
              { onChange: f3, disabled: h2 } = m3;
            (u3 = Nt.createElement(vd, {
              "aria-label": e5 ? "Custom selection" : "Select all",
              ...m3,
              checked: o4 ? n3 : !!K2.length && a3,
              indeterminate: o4 ? !n3 && p4 : !a3 && s3,
              onChange: (e6) => {
                (() => {
                  const e7 = [];
                  a3
                    ? l3.forEach((t5) => {
                        r3.delete(t5), e7.push(t5);
                      })
                    : l3.forEach((t5) => {
                        r3.has(t5) || (r3.add(t5), e7.push(t5));
                      });
                  const t4 = Array.from(r3);
                  d2?.(!a3, t4.map(_2), e7.map(k2)), Y2(t4, "all"), L2(null);
                })(),
                  f3?.(e6);
              },
              disabled: h2 ?? (K2.length === 0 || o4),
              skipGroup: !0,
            })),
              (c3 = !$2 && Nt.createElement("div", { className: `${C2}-selection` }, u3, e5));
          }
          if (
            ((p3 =
              g2 === "radio"
                ? (e5, t3, o4) => {
                    const n3 = N2(t3, o4),
                      l4 = r3.has(n3),
                      a4 = F2.get(n3),
                      i3 = `Select row ${o4 + 1}`;
                    return {
                      node: Nt.createElement(Zi, {
                        "aria-label": i3,
                        ...a4,
                        checked: l4,
                        onClick: (e6) => {
                          var t4;
                          e6.stopPropagation(), (t4 = a4?.onClick) == null || t4.call(a4, e6);
                        },
                        onChange: (e6) => {
                          var t4;
                          r3.has(n3) || Z2(n3, !0, [n3], e6.nativeEvent),
                            (t4 = a4?.onChange) == null || t4.call(a4, e6);
                        },
                      }),
                      checked: l4,
                    };
                  }
                : (e5, t3, o4) => {
                    const n3 = N2(t3, o4),
                      a4 = r3.has(n3),
                      i3 = U2.has(n3),
                      s4 = F2.get(n3);
                    let c4;
                    c4 = I2 === "nest" ? i3 : (s4?.indeterminate ?? i3);
                    const d3 = a4 ? `Row ${o4 + 1} selected` : `Select row ${o4 + 1}`;
                    return {
                      node: Nt.createElement(vd, {
                        "aria-label": d3,
                        ...s4,
                        indeterminate: c4,
                        checked: a4,
                        skipGroup: !0,
                        onClick: (e6) => {
                          var t4;
                          e6.stopPropagation(), (t4 = s4?.onClick) == null || t4.call(s4, e6);
                        },
                        onChange: (e6) => {
                          var t4;
                          const { nativeEvent: o5 } = e6,
                            { shiftKey: i4 } = o5,
                            c5 = l3.indexOf(n3),
                            d4 = X2.size > 0 && l3.some((e7) => X2.has(e7));
                          if (i4 && x2 && d4) {
                            const e7 = A2(c5, l3, r3),
                              t5 = Array.from(r3);
                            m2?.(!a4, t5.map(_2), e7.map(k2)), Y2(t5, "multiple");
                          } else {
                            const e7 = q2;
                            if (x2) {
                              const t5 = a4 ? Zc(e7, n3) : Jc(e7, n3);
                              Z2(n3, !a4, t5, o5);
                            } else {
                              const t5 = sd([].concat(S(e7), [n3]), !0, W2, G2),
                                { checkedKeys: r4, halfCheckedKeys: l4 } = t5;
                              let i5 = r4;
                              if (a4) {
                                const e8 = new Set(r4);
                                e8.delete(n3),
                                  (i5 = sd(
                                    Array.from(e8),
                                    { checked: !1, halfCheckedKeys: l4 },
                                    W2,
                                    G2,
                                  ).checkedKeys);
                              }
                              Z2(n3, !a4, i5, o5);
                            }
                          }
                          L2(a4 ? null : c5), (t4 = s4?.onChange) == null || t4.call(s4, e6);
                        },
                      }),
                      checked: a4,
                    };
                  }),
            !n2.includes(hm))
          )
            if (
              n2.findIndex((e5) => {
                var t3;
                return ((t3 = e5[wp]) == null ? void 0 : t3.columnType) === "EXPAND_COLUMN";
              }) === 0
            ) {
              const [e5, ...t3] = n2;
              n2 = [e5, hm].concat(S(t3));
            } else n2 = [hm].concat(S(n2));
          const w3 = n2.indexOf(hm);
          n2 = n2.filter((e5, t3) => e5 !== hm || t3 === w3);
          const E3 = n2[w3 - 1],
            B3 = n2[w3 + 1];
          let R3 = v2;
          R3 === void 0 &&
            (B3?.fixed !== void 0 ? (R3 = B3.fixed) : E3?.fixed !== void 0 && (R3 = E3.fixed)),
            R3 &&
              E3 &&
              ((o3 = E3[wp]) == null ? void 0 : o3.columnType) === "EXPAND_COLUMN" &&
              E3.fixed === void 0 &&
              (E3.fixed = R3);
          const M3 = P(`${C2}-selection-col`, {
              [`${C2}-selection-col-with-dropdown`]: b2 && g2 === "checkbox",
            }),
            O3 = {
              fixed: R3,
              width: f2,
              className: `${C2}-selection-column`,
              title: t2?.columnTitle
                ? h(t2.columnTitle)
                  ? t2.columnTitle(u3)
                  : t2.columnTitle
                : c3,
              render: (e5, t3, o4) => {
                const { node: n3, checked: r4 } = p3(e5, t3, o4);
                return y2 ? y2(r4, t3, o4, n3) : n3;
              },
              onCell: t2.onCell,
              align: t2.align,
              [wp]: { className: M3 },
            };
          return n2.map((e5) => (e5 === hm ? O3 : e5));
        },
        [N2, K2, t2, q2, X2, U2, f2, J2, I2, F2, m2, Z2, G2],
      ),
      X2,
    ];
  },
  Cm = (e3) => {
    const t2 = {};
    for (const [o2, n2] of Object.entries(e3)) C(n2) && (t2[o2] = n2);
    return t2;
  },
  wm = (e3, t2) => It.useMemo(() => ({ ...e3, filters: Cm(t2) }), [e3, t2]),
  Sm = (e3, t2) =>
    Nt.useMemo(() => {
      if (!t2) return e3;
      const o2 = (e4) =>
        e4.map((e5) =>
          e5 === hm || e5 === _u
            ? e5
            : "children" in e5 && Array.isArray(e5.children)
              ? { ...Wt(t2, e5), children: o2(e5.children) }
              : Wt(se(t2, ["children"]), e5),
        );
      return o2(e3);
    }, [e3, t2]),
  Em = (e3, t2) =>
    "key" in e3 && C(e3.key)
      ? e3.key
      : e3.dataIndex
        ? Array.isArray(e3.dataIndex)
          ? e3.dataIndex.join(".")
          : e3.dataIndex
        : t2;
function km(e3, t2) {
  return t2 ? `${t2}-${e3}` : `${e3}`;
}
const Nm = (e3, t2) => (h(e3) ? e3(t2) : e3),
  Im = (e3) => {
    const t2 = e3.toLowerCase();
    return t2.includes("center")
      ? "center"
      : t2.includes("left") || t2.includes("start")
        ? "start"
        : "end";
  },
  Bm = {
    icon: {
      tag: "svg",
      attrs: { viewBox: "64 64 896 896", focusable: "false" },
      children: [
        {
          tag: "path",
          attrs: {
            d: "M349 838c0 17.7 14.2 32 31.8 32h262.4c17.6 0 31.8-14.3 31.8-32V642H349v196zm531.1-684H143.9c-24.5 0-39.8 26.7-27.5 48l221.3 376h348.8l221.3-376c12.1-21.3-3.2-48-27.7-48z",
          },
        },
      ],
    },
    name: "filter",
    theme: "filled",
  };
function Rm() {
  return (
    (Rm = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    Rm.apply(this, arguments)
  );
}
const Tm = (e3, t2) => Nt.createElement(d, Rm({}, e3, { ref: t2, icon: Bm })),
  Mm = Nt.forwardRef(Tm),
  Pm = {
    icon: {
      tag: "svg",
      attrs: { viewBox: "64 64 896 896", focusable: "false" },
      children: [
        {
          tag: "path",
          attrs: {
            d: "M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494z",
          },
        },
      ],
    },
    name: "file",
    theme: "outlined",
  };
function Am() {
  return (
    (Am = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    Am.apply(this, arguments)
  );
}
const Lm = (e3, t2) => Nt.createElement(d, Am({}, e3, { ref: t2, icon: Pm })),
  Om = Nt.forwardRef(Lm),
  Dm = {
    icon: {
      tag: "svg",
      attrs: { viewBox: "64 64 896 896", focusable: "false" },
      children: [
        {
          tag: "path",
          attrs: {
            d: "M928 444H820V330.4c0-17.7-14.3-32-32-32H473L355.7 186.2a8.15 8.15 0 00-5.5-2.2H96c-17.7 0-32 14.3-32 32v592c0 17.7 14.3 32 32 32h698c13 0 24.8-7.9 29.7-20l134-332c1.5-3.8 2.3-7.9 2.3-12 0-17.7-14.3-32-32-32zM136 256h188.5l119.6 114.4H748V444H238c-13 0-24.8 7.9-29.7 20L136 643.2V256zm635.3 512H159l103.3-256h612.4L771.3 768z",
          },
        },
      ],
    },
    name: "folder-open",
    theme: "outlined",
  };
function zm() {
  return (
    (zm = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    zm.apply(this, arguments)
  );
}
const Hm = (e3, t2) => Nt.createElement(d, zm({}, e3, { ref: t2, icon: Dm })),
  jm = Nt.forwardRef(Hm),
  _m = {
    icon: {
      tag: "svg",
      attrs: { viewBox: "64 64 896 896", focusable: "false" },
      children: [
        {
          tag: "path",
          attrs: {
            d: "M880 298.4H521L403.7 186.2a8.15 8.15 0 00-5.5-2.2H144c-17.7 0-32 14.3-32 32v592c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V330.4c0-17.7-14.3-32-32-32zM840 768H184V256h188.5l119.6 114.4H840V768z",
          },
        },
      ],
    },
    name: "folder",
    theme: "outlined",
  };
function Km() {
  return (
    (Km = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    Km.apply(this, arguments)
  );
}
const Wm = (e3, t2) => Nt.createElement(d, Km({}, e3, { ref: t2, icon: _m })),
  Fm = Nt.forwardRef(Wm),
  Gm = {
    icon: {
      tag: "svg",
      attrs: { viewBox: "64 64 896 896", focusable: "false" },
      children: [
        {
          tag: "path",
          attrs: {
            d: "M300 276.5a56 56 0 1056-97 56 56 0 00-56 97zm0 284a56 56 0 1056-97 56 56 0 00-56 97zM640 228a56 56 0 10112 0 56 56 0 00-112 0zm0 284a56 56 0 10112 0 56 56 0 00-112 0zM300 844.5a56 56 0 1056-97 56 56 0 00-56 97zM640 796a56 56 0 10112 0 56 56 0 00-112 0z",
          },
        },
      ],
    },
    name: "holder",
    theme: "outlined",
  };
function qm() {
  return (
    (qm = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    qm.apply(this, arguments)
  );
}
const Vm = (e3, t2) => Nt.createElement(d, qm({}, e3, { ref: t2, icon: Gm })),
  Xm = Nt.forwardRef(Vm),
  Um = ({
    treeCls: e3,
    treeNodeCls: t2,
    directoryNodeSelectedBg: o2,
    directoryNodeSelectedColor: n2,
    motionDurationMid: r2,
    borderRadius: l2,
    controlItemBgHover: a2,
  }) => ({
    [`${e3}${e3}-directory ${t2}`]: {
      [`${e3}-node-content-wrapper`]: {
        position: "static",
        [`&:has(${e3}-drop-indicator)`]: { position: "relative" },
        [`> *:not(${e3}-drop-indicator)`]: { position: "relative" },
        "&:hover": { background: "transparent" },
        "&:before": {
          position: "absolute",
          inset: 0,
          transition: `background-color ${r2}`,
          content: '""',
          borderRadius: l2,
        },
        "&:hover:before": { background: a2 },
      },
      [`${e3}-switcher, ${e3}-checkbox, ${e3}-draggable-icon`]: { zIndex: 1 },
      "&-selected": {
        background: o2,
        borderRadius: l2,
        [`${e3}-switcher, ${e3}-draggable-icon`]: { color: n2 },
        [`${e3}-node-content-wrapper`]: {
          color: n2,
          background: "transparent",
          "&, &:hover": { color: n2 },
          "&:before, &:hover:before": { background: o2 },
        },
      },
    },
  }),
  Ym = new K("ant-tree-node-fx-do-not-use", { "0%": { opacity: 0 }, "100%": { opacity: 1 } }),
  Zm = (e3, t2) => ({
    [`.${e3}-switcher-icon`]: {
      display: "inline-block",
      fontSize: 10,
      verticalAlign: "baseline",
      svg: { transition: `transform ${t2.motionDurationSlow}` },
    },
  }),
  Jm = (e3, t2) => ({
    [`.${e3}-drop-indicator`]: {
      position: "absolute",
      zIndex: 1,
      height: 2,
      backgroundColor: t2.colorPrimary,
      borderRadius: 1,
      pointerEvents: "none",
      "&:after": {
        position: "absolute",
        top: -3,
        insetInlineStart: -6,
        width: 8,
        height: 8,
        backgroundColor: "transparent",
        border: `${X(t2.lineWidthBold)} solid ${t2.colorPrimary}`,
        borderRadius: "50%",
        content: '""',
      },
    },
  }),
  Qm = (e3, t2) => {
    const {
      treeCls: o2,
      treeNodeCls: n2,
      treeNodePadding: r2,
      titleHeight: l2,
      indentSize: a2,
      switcherSize: i2,
      motionDurationMid: s2,
      nodeSelectedBg: c2,
      nodeHoverBg: d2,
      colorTextQuaternary: u2,
      controlItemBgActiveDisabled: p2,
    } = t2;
    return {
      [o2]: {
        ...ve(t2),
        "--rc-virtual-list-scrollbar-bg": t2.colorSplit,
        background: t2.colorBgContainer,
        borderRadius: t2.borderRadius,
        transition: `background-color ${t2.motionDurationSlow}`,
        "&-rtl": { direction: "rtl" },
        [`&${o2}-rtl ${o2}-switcher_close ${o2}-switcher-icon svg`]: { transform: "rotate(90deg)" },
        [`${o2}-list`]: {
          "&:focus-visible": {
            outline: "none",
            [`${n2}-active ${o2}-node-content-wrapper`]: { ...ye(t2) },
          },
        },
        [`${o2}-list-scrollbar`]: {
          cursor: "pointer",
          "&:hover": { backgroundColor: t2.colorFillQuaternary },
        },
        [`${o2}-list-holder-inner`]: { alignItems: "flex-start" },
        [`&${o2}-block-node`]: {
          [`${o2}-list-holder-inner`]: {
            alignItems: "stretch",
            [`${o2}-node-content-wrapper`]: { flex: "auto" },
            [`${n2}.dragging:after`]: {
              position: "absolute",
              inset: 0,
              border: `${X(t2.lineWidth)} ${t2.lineType} ${t2.colorPrimary}`,
              opacity: 0,
              animationName: Ym,
              animationDuration: t2.motionDurationSlow,
              animationPlayState: "running",
              animationFillMode: "forwards",
              content: '""',
              pointerEvents: "none",
              borderRadius: t2.borderRadius,
            },
          },
        },
        [n2]: {
          display: "flex",
          alignItems: "flex-start",
          marginBottom: r2,
          lineHeight: X(l2),
          position: "relative",
          "&:before": {
            content: '""',
            position: "absolute",
            zIndex: 1,
            insetInlineStart: 0,
            width: "100%",
            top: "100%",
            height: r2,
          },
          [`&-disabled ${o2}-node-content-wrapper`]: {
            color: t2.colorTextDisabled,
            cursor: "not-allowed",
            "&:hover": { background: "transparent" },
          },
          [`${o2}-checkbox-disabled + ${o2}-node-selected,&${n2}-disabled${n2}-selected ${o2}-node-content-wrapper`]:
            { backgroundColor: p2 },
          [`${o2}-checkbox-disabled`]: { pointerEvents: "unset" },
          [`&:not(${n2}-disabled)`]: {
            [`${o2}-node-content-wrapper`]: { "&:hover": { color: t2.nodeHoverColor } },
          },
          [`&-active ${o2}-node-content-wrapper`]: { background: t2.controlItemBgHover },
          [`&:not(${n2}-disabled).filter-node ${o2}-title`]: {
            color: t2.colorPrimary,
            fontWeight: t2.fontWeightStrong,
          },
          "&-draggable": {
            cursor: "grab",
            [`${o2}-draggable-icon`]: {
              flexShrink: 0,
              width: i2,
              textAlign: "center",
              visibility: "visible",
              color: u2,
            },
            [`&${n2}-disabled ${o2}-draggable-icon`]: { visibility: "hidden" },
          },
        },
        [`${o2}-indent`]: {
          alignSelf: "stretch",
          whiteSpace: "nowrap",
          userSelect: "none",
          "&-unit": { display: "inline-block", width: a2 },
        },
        [`${o2}-draggable-icon`]: { visibility: "hidden" },
        [`${o2}-switcher, ${o2}-checkbox`]: {
          marginInlineEnd: t2.calc(t2.calc(i2).sub(t2.controlInteractiveSize)).div(2).equal(),
        },
        [`${o2}-checkbox`]: {
          flexShrink: 0,
          alignSelf: "flex-start",
          marginBlockStart: t2.calc(t2.calc(l2).sub(t2.controlInteractiveSize)).div(2).equal(),
        },
        [`${o2}-switcher`]: {
          ...Zm(e3, t2),
          position: "relative",
          flex: "none",
          alignSelf: "stretch",
          width: i2,
          textAlign: "center",
          cursor: "pointer",
          userSelect: "none",
          transition: `all ${t2.motionDurationSlow}`,
          "&-noop": { cursor: "unset" },
          "&:before": {
            pointerEvents: "none",
            content: '""',
            width: i2,
            height: l2,
            position: "absolute",
            left: { _skip_check_: !0, value: 0 },
            top: 0,
            borderRadius: t2.borderRadius,
            transition: `all ${t2.motionDurationSlow}`,
          },
          [`&:not(${o2}-switcher-noop):hover:before`]: { backgroundColor: t2.colorBgTextHover },
          [`&_close ${o2}-switcher-icon svg`]: { transform: "rotate(-90deg)" },
          "&-loading-icon": { color: t2.colorPrimary },
          "&-leaf-line": {
            position: "relative",
            zIndex: 1,
            display: "inline-block",
            width: "100%",
            height: "100%",
            "&:before": {
              position: "absolute",
              top: 0,
              insetInlineEnd: t2.calc(i2).div(2).equal(),
              bottom: t2.calc(r2).mul(-1).equal(),
              marginInlineStart: t2.calc(t2.lineWidth).mul(-1).equal(),
              borderInlineEnd: `${X(t2.lineWidth)} ${t2.lineType} ${t2.colorBorder}`,
              content: '""',
            },
            "&:after": {
              position: "absolute",
              width: t2.calc(t2.calc(i2).div(2).equal()).mul(0.8).equal(),
              height: t2.calc(l2).div(2).equal(),
              borderBottom: `${X(t2.lineWidth)} ${t2.lineType} ${t2.colorBorder}`,
              content: '""',
            },
          },
        },
        [`${o2}-node-content-wrapper`]: {
          position: "relative",
          minHeight: l2,
          paddingBlock: 0,
          paddingInline: t2.paddingXS,
          background: "transparent",
          borderRadius: t2.borderRadius,
          cursor: "pointer",
          transition: [`all ${s2}`, "border 0s", "line-height 0s", "box-shadow 0s"].join(", "),
          ...Jm(e3, t2),
          "&:hover": { backgroundColor: d2 },
          [`&${o2}-node-selected`]: { color: t2.nodeSelectedColor, backgroundColor: c2 },
          [`${o2}-iconEle`]: {
            display: "inline-block",
            width: i2,
            height: l2,
            textAlign: "center",
            verticalAlign: "top",
            "&:empty": { display: "none" },
          },
        },
        [`${o2}-unselectable ${o2}-node-content-wrapper:hover`]: { backgroundColor: "transparent" },
        [`${n2}.drop-container > [draggable]`]: { boxShadow: `0 0 0 2px ${t2.colorPrimary}` },
        "&-show-line": {
          [`${o2}-indent-unit`]: {
            position: "relative",
            height: "100%",
            "&:before": {
              position: "absolute",
              top: 0,
              insetInlineEnd: t2.calc(i2).div(2).equal(),
              bottom: t2.calc(r2).mul(-1).equal(),
              borderInlineEnd: `${X(t2.lineWidth)} ${t2.lineType} ${t2.colorBorder}`,
              content: '""',
            },
            "&-end:before": { display: "none" },
          },
          [`${o2}-switcher`]: {
            background: "transparent",
            "&-line-icon": { verticalAlign: "-0.15em" },
          },
        },
        [`${n2}-leaf-last ${o2}-switcher-leaf-line:before`]: {
          top: "auto !important",
          bottom: "auto !important",
          height: `${X(t2.calc(l2).div(2).equal())} !important`,
        },
      },
    };
  },
  ef = (e3, t2, o2 = !0) => {
    const n2 = `.${e3}`,
      r2 = `${n2}-treenode`,
      l2 = t2.calc(t2.paddingXS).div(2).equal(),
      a2 = q(t2, { treeCls: n2, treeNodeCls: r2, treeNodePadding: l2 });
    return [Qm(e3, a2), o2 && Um(a2)].filter(Boolean);
  },
  tf = (e3) => {
    const { controlHeightSM: t2, controlItemBgHover: o2, controlItemBgActive: n2 } = e3;
    return {
      titleHeight: t2,
      switcherSize: t2,
      indentSize: t2,
      nodeHoverBg: o2,
      nodeHoverColor: e3.colorText,
      nodeSelectedBg: n2,
      nodeSelectedColor: e3.colorText,
    };
  },
  of = Y(
    "Tree",
    (e3, { prefixCls: t2 }) => [
      { [e3.componentCls]: ud(`${t2}-checkbox`, e3) },
      ef(t2, e3),
      Do(e3),
    ],
    (e3) => {
      const { colorTextLightSolid: t2, colorPrimary: o2 } = e3;
      return { ...tf(e3), directoryNodeSelectedColor: t2, directoryNodeSelectedBg: o2 };
    },
  ),
  nf = (e3) => {
    const {
        dropPosition: t2,
        dropLevelOffset: o2,
        prefixCls: n2,
        indent: r2,
        direction: l2 = "ltr",
      } = e3,
      a2 = l2 === "ltr" ? "left" : "right",
      i2 = l2 === "ltr" ? "right" : "left",
      s2 = { [a2]: -o2 * r2 + 4, [i2]: 0 };
    switch (t2) {
      case -1:
        s2.top = -3;
        break;
      case 1:
        s2.bottom = -3;
        break;
      default:
        (s2.bottom = -3), (s2[a2] = r2 + 4);
    }
    return It.createElement("div", { style: s2, className: `${n2}-drop-indicator` });
  },
  rf = {
    icon: {
      tag: "svg",
      attrs: { viewBox: "0 0 1024 1024", focusable: "false" },
      children: [
        {
          tag: "path",
          attrs: {
            d: "M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z",
          },
        },
      ],
    },
    name: "caret-down",
    theme: "filled",
  };
function lf() {
  return (
    (lf = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    lf.apply(this, arguments)
  );
}
const af = (e3, t2) => Nt.createElement(d, lf({}, e3, { ref: t2, icon: rf })),
  sf = Nt.forwardRef(af),
  cf = {
    icon: {
      tag: "svg",
      attrs: { viewBox: "64 64 896 896", focusable: "false" },
      children: [
        {
          tag: "path",
          attrs: {
            d: "M328 544h368c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8z",
          },
        },
        {
          tag: "path",
          attrs: {
            d: "M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z",
          },
        },
      ],
    },
    name: "minus-square",
    theme: "outlined",
  };
function df() {
  return (
    (df = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    df.apply(this, arguments)
  );
}
const uf = (e3, t2) => Nt.createElement(d, df({}, e3, { ref: t2, icon: cf })),
  pf = Nt.forwardRef(uf),
  mf = {
    icon: {
      tag: "svg",
      attrs: { viewBox: "64 64 896 896", focusable: "false" },
      children: [
        {
          tag: "path",
          attrs: {
            d: "M328 544h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8z",
          },
        },
        {
          tag: "path",
          attrs: {
            d: "M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z",
          },
        },
      ],
    },
    name: "plus-square",
    theme: "outlined",
  };
function ff() {
  return (
    (ff = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    ff.apply(this, arguments)
  );
}
const hf = (e3, t2) => Nt.createElement(d, ff({}, e3, { ref: t2, icon: mf })),
  gf = Nt.forwardRef(hf),
  bf = (e3) => {
    var t2, o2;
    const {
        prefixCls: n2,
        switcherIcon: r2,
        treeNodeProps: l2,
        showLine: a2,
        switcherLoadingIcon: i2,
      } = e3,
      { isLeaf: s2, expanded: c2, loading: d2 } = l2;
    if (d2)
      return Nt.isValidElement(i2)
        ? i2
        : Nt.createElement(j, { className: `${n2}-switcher-loading-icon` });
    let u2;
    if ((v(a2) && (u2 = a2.showLeafIcon), s2)) {
      if (!a2) return null;
      if (typeof u2 != "boolean" && u2) {
        const e4 = h(u2) ? u2(l2) : u2,
          o3 = `${n2}-switcher-line-custom-icon`;
        return Nt.isValidElement(e4)
          ? D(e4, { className: P((t2 = e4.props) == null ? void 0 : t2.className, o3) })
          : e4;
      }
      return u2
        ? Nt.createElement(Om, { className: `${n2}-switcher-line-icon` })
        : Nt.createElement("span", { className: `${n2}-switcher-leaf-line` });
    }
    const p2 = `${n2}-switcher-icon`,
      m2 = h(r2) ? r2(l2) : r2;
    return Nt.isValidElement(m2)
      ? D(m2, {
          className: P(
            (o2 = m2.props) == null ? void 0 : o2.className,
            a2 ? `${n2}-switcher-line-icon` : p2,
          ),
        })
      : m2 !== void 0
        ? m2
        : a2
          ? c2
            ? Nt.createElement(pf, { className: `${n2}-switcher-line-icon` })
            : Nt.createElement(gf, { className: `${n2}-switcher-line-icon` })
          : Nt.createElement(sf, { className: p2 });
  },
  vf = It.forwardRef((e3, t2) => {
    var o2;
    const {
        getPrefixCls: n2,
        direction: r2,
        className: l2,
        style: a2,
        classNames: i2,
        styles: s2,
      } = oe("tree"),
      { virtual: c2 } = It.useContext(B),
      {
        prefixCls: d2,
        className: u2,
        showIcon: p2 = !1,
        showLine: m2,
        switcherIcon: f2,
        switcherLoadingIcon: h2,
        blockNode: g2 = !1,
        children: b2,
        checkable: v2 = !1,
        selectable: y2 = !0,
        draggable: $2,
        disabled: x2,
        motion: C2,
        style: w2,
        rootClassName: S2,
        rootStyle: E2,
        classNames: k2,
        styles: N2,
        icon: I2,
      } = e3,
      R2 = It.useContext(ne),
      T2 = x2 ?? R2,
      M2 = n2("tree", d2),
      L2 = n2(),
      O2 = C2 ?? { ..._e(L2), motionAppear: !1 },
      D2 = {
        ...e3,
        showIcon: p2,
        blockNode: g2,
        checkable: v2,
        selectable: y2,
        disabled: T2,
        motion: O2,
      },
      z2 = ce(E2),
      [H2, j2] = de([i2, k2], [s2, z2, N2], { props: D2 }),
      _2 = { ...D2, showLine: !!m2, icon: I2, dropIndicatorRender: nf },
      [K2, W2] = of(M2),
      [, F2] = A(),
      G2 =
        F2.paddingXS / 2 +
        (((o2 = F2.Tree) == null ? void 0 : o2.titleHeight) || F2.controlHeightSM),
      q2 = It.useMemo(() => {
        if (!$2) return !1;
        let e4 = {};
        switch (typeof $2) {
          case "function":
            e4.nodeDraggable = $2;
            break;
          case "object":
            e4 = { ...$2 };
        }
        return e4.icon !== !1 && (e4.icon = e4.icon || It.createElement(Xm, null)), e4;
      }, [$2]);
    return It.createElement(
      dd,
      {
        itemHeight: G2,
        ref: t2,
        virtual: c2,
        ..._2,
        prefixCls: M2,
        className: P(
          {
            [`${M2}-icon-hide`]: !p2,
            [`${M2}-block-node`]: g2,
            [`${M2}-unselectable`]: !y2,
            [`${M2}-rtl`]: r2 === "rtl",
            [`${M2}-disabled`]: T2,
          },
          l2,
          u2,
          K2,
          W2,
        ),
        style: { ...a2, ...w2 },
        rootClassName: P(H2.root, S2),
        rootStyle: j2.root,
        classNames: H2,
        styles: j2,
        direction: r2,
        checkable: v2 && It.createElement("span", { className: `${M2}-checkbox-inner` }),
        selectable: y2,
        switcherIcon: (e4) =>
          It.createElement(bf, {
            prefixCls: M2,
            switcherIcon: f2,
            switcherLoadingIcon: h2,
            treeNodeProps: e4,
            showLine: m2,
          }),
        draggable: q2,
      },
      b2,
    );
  });
function yf(e3, t2, o2) {
  const { key: n2, children: r2 } = o2;
  e3.forEach(function (e4) {
    const l2 = e4[n2],
      a2 = e4[r2];
    t2(l2, e4) !== !1 && yf(a2 || [], t2, o2);
  });
}
function $f({ treeData: e3, expandedKeys: t2, startKey: o2, endKey: n2, fieldNames: r2 }) {
  const l2 = [];
  let a2 = 0;
  return !C(o2) || !C(n2)
    ? []
    : o2 === n2
      ? [o2]
      : (yf(
          e3,
          (e4, r3) => {
            if (a2 === 2) return !1;
            if (
              (function (e5) {
                return e5 === o2 || e5 === n2;
              })(e4)
            ) {
              if ((l2.push(e4), a2 === 0)) a2 = 1;
              else if (a2 === 1) return (a2 = 2), !1;
            } else a2 !== 1 || r3.disabled || r3.selectable === !1 || l2.push(e4);
            return t2.includes(e4);
          },
          Ic(r2),
        ),
        l2);
}
function xf(e3, t2, o2) {
  const n2 = S(t2),
    r2 = [];
  return (
    yf(
      e3,
      (e4, t3) => {
        const o3 = n2.indexOf(e4);
        return o3 !== -1 && (r2.push(t3), n2.splice(o3, 1)), !!n2.length;
      },
      Ic(o2),
    ),
    r2
  );
}
function Cf(e3) {
  const { isLeaf: t2, expanded: o2 } = e3;
  return t2
    ? Nt.createElement(Om, null)
    : o2
      ? Nt.createElement(jm, null)
      : Nt.createElement(Fm, null);
}
function wf({ treeData: e3, children: t2 }) {
  return e3 || Bc(t2);
}
const Sf = Nt.forwardRef((e3, t2) => {
    const {
        defaultExpandAll: o2,
        defaultExpandParent: n2 = !0,
        defaultExpandedKeys: r2,
        ...l2
      } = e3,
      a2 = Nt.useRef(null),
      i2 = Nt.useRef(null),
      [s2, c2] = Me(l2.defaultSelectedKeys || [], l2.selectedKeys),
      [d2, u2] = Me(() => {
        const { keyEntities: e4 } = Tc(wf(l2), { fieldNames: l2.fieldNames });
        let t3;
        const a3 = l2.expandedKeys || r2 || [];
        return (t3 = o2 ? Object.values(e4).map(({ key: e5 }) => e5) : n2 ? ld(a3, e4) : a3), t3;
      }, l2.expandedKeys),
      { getPrefixCls: p2, direction: m2 } = Nt.useContext(B),
      { prefixCls: f2, className: h2, showIcon: g2 = !0, expandAction: b2 = "click", ...v2 } = l2,
      y2 = p2("tree", f2),
      $2 = P(`${y2}-directory`, { [`${y2}-directory-rtl`]: m2 === "rtl" }, h2);
    return Nt.createElement(vf, {
      icon: Cf,
      ref: t2,
      blockNode: !0,
      ...v2,
      showIcon: g2,
      expandAction: b2,
      prefixCls: y2,
      className: $2,
      defaultExpandParent: n2,
      expandedKeys: d2,
      selectedKeys: s2,
      onSelect: (e4, t3) => {
        var o3;
        const { multiple: n3, fieldNames: r3 } = l2,
          { node: s3, nativeEvent: u3 } = t3,
          { key: p3 = "" } = s3,
          m3 = wf(l2),
          f3 = { ...t3, selected: !0 },
          h3 = u3?.ctrlKey || u3?.metaKey,
          g3 = u3?.shiftKey;
        let b3;
        n3 && h3
          ? ((b3 = e4), (a2.current = p3), (i2.current = b3), (f3.selectedNodes = xf(m3, b3, r3)))
          : n3 && g3
            ? ((b3 = Array.from(
                new Set(
                  [].concat(
                    S(i2.current || []),
                    S(
                      $f({
                        treeData: m3,
                        expandedKeys: d2,
                        startKey: p3,
                        endKey: a2.current,
                        fieldNames: r3,
                      }),
                    ),
                  ),
                ),
              )),
              (f3.selectedNodes = xf(m3, b3, r3)))
            : ((b3 = [p3]),
              (a2.current = p3),
              (i2.current = b3),
              (f3.selectedNodes = xf(m3, b3, r3))),
          (o3 = l2.onSelect) == null || o3.call(l2, b3, f3),
          c2(b3);
      },
      onExpand: (e4, t3) => {
        var o3;
        return u2(e4), (o3 = l2.onExpand) == null ? void 0 : o3.call(l2, e4, t3);
      },
    });
  }),
  Ef = vf;
(Ef.DirectoryTree = Sf),
  (Ef.TreeNode = Hc),
  (Ef.useTree = function (e3, t2) {
    const { fieldNames: o2 } = t2,
      r2 = Nt.useMemo(() => {
        const { keyEntities: t3 } = Tc(e3, { fieldNames: o2 });
        return t3;
      }, [e3, o2]);
    return {
      getPath: n((e4) => {
        const t3 = [];
        let o3 = Ec(r2, e4);
        for (; o3; ) t3.unshift(o3), (o3 = o3.parent);
        return t3;
      }),
    };
  });
const kf = Ef,
  Nf = (e3) => {
    const { value: t2, filterSearch: o2, tablePrefixCls: n2, locale: r2, onChange: l2 } = e3;
    return o2
      ? Nt.createElement(
          "div",
          { className: `${n2}-filter-dropdown-search` },
          Nt.createElement(Id, {
            prefix: Nt.createElement(vt, null),
            placeholder: r2.filterSearchPlaceholder,
            onChange: l2,
            value: t2,
            htmlSize: 1,
            className: `${n2}-filter-dropdown-search-input`,
          }),
        )
      : null;
  },
  If = (e3) => {
    const { keyCode: t2 } = e3;
    t2 === Pe.ENTER && e3.stopPropagation();
  },
  Bf = Nt.forwardRef((e3, t2) =>
    Nt.createElement(
      "div",
      {
        className: e3.className,
        onClick: (e4) => e4.stopPropagation(),
        onKeyDown: If,
        ref: t2,
        role: "presentation",
      },
      e3.children,
    ),
  );
function Rf(e3) {
  let t2 = [];
  return (
    (e3 || []).forEach(({ value: e4, children: o2 }) => {
      t2.push(e4), o2 && (t2 = [].concat(S(t2), S(Rf(o2))));
    }),
    t2
  );
}
const Tf = (e3, t2) =>
    !(typeof t2 != "string" && !f(t2)) && t2.toString().toLowerCase().includes(e3),
  Mf = (e3) => {
    const {
      filters: t2,
      prefixCls: o2,
      filteredKeys: n2,
      filterMultiple: r2,
      searchValue: l2,
      normalizedSearchValue: a2,
      filterSearch: i2,
    } = e3;
    return t2.map((e4, t3) => {
      const s2 = String(e4.value);
      if (e4.children)
        return {
          key: s2 || t3,
          label: e4.text,
          popupClassName: `${o2}-dropdown-submenu`,
          children: Mf({
            filters: e4.children,
            prefixCls: o2,
            filteredKeys: n2,
            filterMultiple: r2,
            searchValue: l2,
            normalizedSearchValue: a2,
            filterSearch: i2,
          }),
        };
      const c2 = r2 ? vd : Zi,
        d2 = {
          key: e4.value !== void 0 ? s2 : t3,
          label: Nt.createElement(
            Nt.Fragment,
            null,
            Nt.createElement(c2, { checked: n2.includes(s2) }),
            Nt.createElement("span", null, e4.text),
          ),
        };
      return a2 ? (h(i2) ? (i2(a2, e4) ? d2 : null) : Tf(a2, e4.text) ? d2 : null) : d2;
    });
  };
function Pf(e3) {
  return e3 || [];
}
const Af = (e3) => {
    var t2;
    const {
        tablePrefixCls: o2,
        prefixCls: n2,
        column: r2,
        dropdownPrefixCls: l2,
        columnKey: a2,
        filterOnClose: i2,
        filterMultiple: s2,
        filterMode: c2 = "menu",
        filterSearch: d2 = !1,
        filterState: u2,
        triggerFilter: p2,
        locale: m2,
        children: f2,
        getPopupContainer: g2,
        rootClassName: b2,
      } = e3,
      {
        filterResetToDefaultFilteredValue: v2,
        defaultFilteredValue: y2,
        filterDropdownProps: $2 = {},
        filterDropdownOpen: x2,
        onFilterDropdownOpenChange: C2,
      } = r2,
      [w2, S2] = Nt.useState(!1),
      E2 = Nt.useContext(xl),
      k2 = !(!u2 || (!((t2 = u2.filteredKeys) != null && t2.length) && !u2.forceFiltered)),
      N2 = (e4) => {
        var t3;
        S2(e4), (t3 = $2.onOpenChange) == null || t3.call($2, e4), C2?.(e4);
      },
      I2 = $2.open ?? x2 ?? w2,
      R2 = u2?.filteredKeys,
      [T2, M2] = ((e4) => {
        const t3 = Nt.useRef(e4),
          [, o3] = mo();
        return [
          () => t3.current,
          (e5) => {
            (t3.current = e5), o3();
          },
        ];
      })(Pf(R2)),
      A2 = ({ selectedKeys: e4 }) => {
        M2(e4);
      },
      L2 = (e4, { node: t3, checked: o3 }) => {
        A2(s2 ? { selectedKeys: e4 } : { selectedKeys: o3 ? [t3.key] : [] });
      };
    Nt.useEffect(() => {
      I2 && A2({ selectedKeys: Pf(R2) });
    }, [R2, I2]);
    const [O2, D2] = Nt.useState([]),
      z2 = (e4) => {
        D2(e4);
      },
      [H2, j2] = Nt.useState(""),
      _2 = Nt.useMemo(() => H2.trim().toLowerCase(), [H2]),
      K2 = (e4) => {
        const { value: t3 } = e4.target;
        j2(t3);
      };
    Nt.useEffect(() => {
      I2 || j2("");
    }, [I2]);
    const W2 = (e4) => {
        const t3 = e4?.length ? e4 : null;
        return t3 !== null || (u2 && u2.filteredKeys)
          ? Le(t3, u2?.filteredKeys, !0)
            ? null
            : void p2({ column: r2, key: a2, filteredKeys: t3 })
          : null;
      },
      F2 = () => {
        N2(!1), W2(T2());
      },
      G2 = ({ confirm: e4, closeDropdown: t3 } = { confirm: !1, closeDropdown: !1 }) => {
        e4 && W2([]), t3 && N2(!1), j2(""), M2(v2 ? (y2 || []).map(String) : []);
      },
      q2 = ({ closeDropdown: e4 } = { closeDropdown: !0 }) => {
        e4 && N2(!1), W2(T2());
      },
      V2 = P({
        [`${l2}-menu-without-submenu`]:
          ((X2 = r2.filters || []), !X2.some(({ children: e4 }) => e4)),
      });
    var X2;
    const U2 = (e4) => {
        if (e4.target.checked) {
          const e5 = Rf(r2?.filters).map(String);
          M2(e5);
        } else M2([]);
      },
      Y2 = ({ filters: e4 }) =>
        (e4 || []).map((e5, t3) => {
          const o3 = String(e5.value),
            n3 = { title: e5.text, key: e5.value !== void 0 ? o3 : String(t3) };
          return e5.children && (n3.children = Y2({ filters: e5.children })), n3;
        }),
      Z2 = (e4) => {
        var t3;
        return {
          ...e4,
          text: e4.title,
          value: e4.key,
          children: ((t3 = e4.children) == null ? void 0 : t3.map(Z2)) || [],
        };
      };
    let J2;
    const { direction: Q2, renderEmpty: ee2 } = Nt.useContext(B);
    if (h(r2.filterDropdown))
      J2 = r2.filterDropdown({
        prefixCls: `${l2}-custom`,
        setSelectedKeys: (e4) => A2({ selectedKeys: e4 }),
        selectedKeys: T2(),
        confirm: q2,
        clearFilters: G2,
        filters: r2.filters,
        visible: I2,
        close: () => {
          N2(!1);
        },
      });
    else if (r2.filterDropdown) J2 = r2.filterDropdown;
    else {
      const e4 = T2() || [],
        t3 = () => {
          const t4 =
            ee2?.("Table.filter") ??
            Nt.createElement(yt, {
              image: yt.PRESENTED_IMAGE_SIMPLE,
              description: m2.filterEmptyText,
              styles: { image: { height: 24 } },
              style: { margin: 0, padding: "16px 0" },
            });
          if ((r2.filters || []).length === 0) return t4;
          if (c2 === "tree")
            return Nt.createElement(
              Nt.Fragment,
              null,
              Nt.createElement(Nf, {
                filterSearch: d2,
                value: H2,
                onChange: K2,
                tablePrefixCls: o2,
                locale: m2,
              }),
              Nt.createElement(
                "div",
                { className: `${o2}-filter-dropdown-tree` },
                s2
                  ? Nt.createElement(
                      vd,
                      {
                        checked: e4.length === Rf(r2.filters).length,
                        indeterminate: e4.length > 0 && e4.length < Rf(r2.filters).length,
                        className: `${o2}-filter-dropdown-checkall`,
                        onChange: U2,
                      },
                      m2?.filterCheckall ?? m2?.filterCheckAll,
                    )
                  : null,
                Nt.createElement(kf, {
                  checkable: !0,
                  selectable: !1,
                  blockNode: !0,
                  multiple: s2,
                  checkStrictly: !s2,
                  className: `${l2}-menu`,
                  onCheck: L2,
                  checkedKeys: e4,
                  selectedKeys: e4,
                  showIcon: !1,
                  treeData: Y2({ filters: r2.filters }),
                  autoExpandParent: !0,
                  defaultExpandAll: !0,
                  filterTreeNode: _2 ? (e5) => (h(d2) ? d2(H2, Z2(e5)) : Tf(_2, e5.title)) : void 0,
                }),
              ),
            );
          const a4 = Mf({
              filters: r2.filters || [],
              filterSearch: d2,
              prefixCls: n2,
              filteredKeys: T2(),
              filterMultiple: s2,
              searchValue: H2,
              normalizedSearchValue: _2,
            }),
            i3 = a4.every((e5) => e5 === null);
          return Nt.createElement(
            Nt.Fragment,
            null,
            Nt.createElement(Nf, {
              filterSearch: d2,
              value: H2,
              onChange: K2,
              tablePrefixCls: o2,
              locale: m2,
            }),
            i3
              ? t4
              : Nt.createElement(Ei, {
                  selectable: !0,
                  multiple: s2,
                  prefixCls: `${l2}-menu`,
                  className: V2,
                  onSelect: A2,
                  onDeselect: A2,
                  selectedKeys: e4,
                  getPopupContainer: g2,
                  openKeys: O2,
                  onOpenChange: z2,
                  items: a4,
                }),
          );
        },
        a3 = () => (v2 ? Le((y2 || []).map(String), e4, !0) : e4.length === 0);
      J2 = Nt.createElement(
        Nt.Fragment,
        null,
        t3(),
        Nt.createElement(
          "div",
          { className: `${n2}-dropdown-btns` },
          Nt.createElement(
            Sn,
            { type: "link", size: "small", disabled: a3(), onClick: () => G2() },
            m2.filterReset,
          ),
          Nt.createElement(Sn, { type: "primary", size: "small", onClick: F2 }, m2.filterConfirm),
        ),
      );
    }
    r2.filterDropdown && (J2 = Nt.createElement(ci, { selectable: void 0 }, J2)),
      (J2 = Nt.createElement(Bf, { className: `${n2}-dropdown` }, J2));
    const te2 = (() => {
      let e4;
      return (
        (e4 = h(r2.filterIcon)
          ? r2.filterIcon(k2)
          : r2.filterIcon
            ? r2.filterIcon
            : Nt.createElement(Mm, null)),
        Nt.createElement(
          "span",
          {
            role: "button",
            tabIndex: -1,
            className: P(`${n2}-trigger`, { active: k2 }),
            onClick: (e5) => {
              e5.stopPropagation();
            },
          },
          e4,
        )
      );
    })();
    if (E2)
      return Nt.createElement(
        "div",
        { className: `${n2}-column` },
        Nt.createElement("span", { className: `${o2}-column-title` }, f2),
        te2,
      );
    const oe2 = Wt(
      {
        trigger: ["click"],
        placement: Q2 === "rtl" ? "bottomLeft" : "bottomRight",
        children: te2,
        getPopupContainer: g2,
      },
      {
        ...$2,
        rootClassName: P(b2, $2.rootClassName),
        open: I2,
        onOpenChange: (e4, t3) => {
          t3.source === "trigger" &&
            (e4 && R2 !== void 0 && M2(Pf(R2)), e4 || r2.filterDropdown || !i2 ? N2(e4) : F2());
        },
        popupRender: () => {
          const e4 = $2?.popupRender ?? $2?.dropdownRender;
          return h(e4) ? e4(J2) : J2;
        },
      },
    );
    return Nt.createElement(
      "div",
      { className: `${n2}-column` },
      Nt.createElement("span", { className: `${o2}-column-title` }, f2),
      Nt.createElement(Kd, { ...oe2 }),
    );
  },
  Lf = (e3, t2, o2) => {
    let n2 = [];
    return (
      (e3 || []).forEach((e4, r2) => {
        const l2 = km(r2, o2),
          a2 = e4.filterDropdown !== void 0;
        if (e4.filters || a2 || "onFilter" in e4)
          if ("filteredValue" in e4) {
            let t3 = e4.filteredValue;
            a2 || (t3 = t3?.map(String) ?? t3),
              n2.push({
                column: e4,
                key: Em(e4, l2),
                filteredKeys: t3,
                forceFiltered: e4.filtered,
              });
          } else
            n2.push({
              column: e4,
              key: Em(e4, l2),
              filteredKeys: t2 && e4.defaultFilteredValue ? e4.defaultFilteredValue : void 0,
              forceFiltered: e4.filtered,
            });
        "children" in e4 && (n2 = [].concat(S(n2), S(Lf(e4.children, t2, l2))));
      }),
      n2
    );
  };
function Of(e3, t2, o2, n2, r2, l2, a2, i2, s2) {
  return o2.map((o3, c2) => {
    const d2 = km(c2, i2),
      { filterOnClose: u2 = !0, filterMultiple: p2 = !0, filterMode: m2, filterSearch: f2 } = o3;
    let h2 = o3;
    if (h2.filters || h2.filterDropdown) {
      const i3 = Em(h2, d2),
        c3 = n2.find(({ key: e4 }) => i3 === e4);
      h2 = {
        ...h2,
        title: (n3) =>
          Nt.createElement(
            Af,
            {
              tablePrefixCls: e3,
              prefixCls: `${e3}-filter`,
              dropdownPrefixCls: t2,
              column: h2,
              columnKey: i3,
              filterState: c3,
              filterOnClose: u2,
              filterMultiple: p2,
              filterMode: m2,
              filterSearch: f2,
              triggerFilter: l2,
              locale: r2,
              getPopupContainer: a2,
              rootClassName: s2,
            },
            Nm(o3.title, n3),
          ),
      };
    }
    return (
      "children" in h2 &&
        (h2 = { ...h2, children: Of(e3, t2, h2.children, n2, r2, l2, a2, d2, s2) }),
      h2
    );
  });
}
const Df = (e3) => {
    const t2 = {};
    return (
      e3.forEach(({ key: e4, filteredKeys: o2, column: n2 }) => {
        const r2 = e4,
          { filters: l2, filterDropdown: a2 } = n2;
        if (a2) t2[r2] = o2 || null;
        else if (Array.isArray(o2)) {
          const e5 = Rf(l2);
          t2[r2] = e5.filter((e6) => o2.includes(String(e6)));
        } else t2[r2] = null;
      }),
      t2
    );
  },
  zf = (e3, t2, o2) =>
    t2.reduce((e4, n2) => {
      const {
        column: { onFilter: r2, filters: l2 },
        filteredKeys: a2,
      } = n2;
      if (r2 && a2 && a2.length) {
        const n3 = Rf(l2),
          i2 = new Map();
        n3.forEach((e5) => {
          const t3 = String(e5);
          i2.has(t3) || i2.set(t3, e5);
        });
        const s2 = a2.map((e5) => {
          const t3 = String(e5);
          return i2.get(t3) ?? e5;
        });
        return ((e5) =>
          e5.reduce((e6, n4) => {
            const l3 = { ...n4 };
            return (
              l3[o2] && (l3[o2] = zf(l3[o2], t2, o2)),
              s2.some((e7) => r2(e7, l3)) && e6.push(l3),
              e6
            );
          }, []))(e4);
      }
      return e4;
    }, e3),
  Hf = (e3) =>
    e3.flatMap((e4) => ("children" in e4 ? [e4].concat(S(Hf(e4.children || []))) : [e4])),
  jf = (e3) => {
    const {
      prefixCls: t2,
      dropdownPrefixCls: o2,
      mergedColumns: n2,
      baseColumns: r2,
      onFilterChange: l2,
      getPopupContainer: a2,
      locale: i2,
      rootClassName: s2,
    } = e3;
    Te();
    const c2 = Nt.useMemo(() => Hf(r2 ?? n2 ?? []), [r2, n2]),
      [d2, u2] = Nt.useState(() => Lf(c2, !0)),
      p2 = Nt.useMemo(() => {
        const e4 = Lf(c2, !1);
        if (e4.length === 0) return e4;
        let t3 = !0;
        if (
          (e4.forEach(({ filteredKeys: e5 }) => {
            e5 !== void 0 && (t3 = !1);
          }),
          t3)
        ) {
          const e5 = (c2 || []).map((e6, t4) => Em(e6, km(t4)));
          return d2.reduce((t4, o3) => {
            const n3 = e5.indexOf(o3.key);
            if (n3 !== -1) {
              const e6 = c2[n3];
              t4.push({ ...o3, column: { ...o3.column, ...e6 }, forceFiltered: e6.filtered });
            }
            return t4;
          }, []);
        }
        return e4;
      }, [c2, d2]),
      m2 = Nt.useMemo(() => Df(p2), [p2]),
      f2 = (e4) => {
        const t3 = p2.filter(({ key: t4 }) => t4 !== e4.key);
        t3.push(e4), u2(t3), l2(Df(t3), t3);
      };
    return [(e4) => Of(t2, o2, e4, p2, i2, f2, a2, void 0, s2), p2, m2];
  },
  _f = (e3, t2, o2) => {
    const n2 = Nt.useRef({});
    return [
      function (r2) {
        var l2;
        if (
          n2.current.data !== e3 ||
          n2.current.childrenColumnName !== t2 ||
          n2.current.getRowKey !== o2
        ) {
          let r3 = function (e4) {
            e4.forEach((e5, n3) => {
              const a2 = o2(e5, n3);
              l3.set(a2, e5), v(e5) && t2 in e5 && r3(e5[t2] || []);
            });
          };
          const l3 = new Map();
          r3(e3), (n2.current = { data: e3, childrenColumnName: t2, kvMap: l3, getRowKey: o2 });
        }
        return (l2 = n2.current.kvMap) == null ? void 0 : l2.get(r2);
      },
    ];
  },
  Kf = 10,
  Wf = {
    icon: {
      tag: "svg",
      attrs: { viewBox: "0 0 1024 1024", focusable: "false" },
      children: [
        {
          tag: "path",
          attrs: {
            d: "M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z",
          },
        },
      ],
    },
    name: "caret-down",
    theme: "outlined",
  };
function Ff() {
  return (
    (Ff = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    Ff.apply(this, arguments)
  );
}
const Gf = (e3, t2) => Nt.createElement(d, Ff({}, e3, { ref: t2, icon: Wf })),
  qf = Nt.forwardRef(Gf),
  Vf = {
    icon: {
      tag: "svg",
      attrs: { viewBox: "0 0 1024 1024", focusable: "false" },
      children: [
        {
          tag: "path",
          attrs: {
            d: "M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z",
          },
        },
      ],
    },
    name: "caret-up",
    theme: "outlined",
  };
function Xf() {
  return (
    (Xf = Object.assign
      ? Object.assign.bind()
      : function (e3) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var o2 = arguments[t2];
            for (var n2 in o2) Object.prototype.hasOwnProperty.call(o2, n2) && (e3[n2] = o2[n2]);
          }
          return e3;
        }),
    Xf.apply(this, arguments)
  );
}
const Uf = (e3, t2) => Nt.createElement(d, Xf({}, e3, { ref: t2, icon: Vf })),
  Yf = Nt.forwardRef(Uf),
  Zf = "ascend",
  Jf = "descend",
  Qf = (e3) => !(!v(e3.sorter) || !f(e3.sorter.multiple)) && e3.sorter.multiple,
  eh = (e3) => (h(e3) ? e3 : !(!v(e3) || !e3.compare) && e3.compare),
  th = (e3, t2, o2) => {
    let n2 = [];
    const r2 = (e4, t3) => {
      n2.push({ column: e4, key: Em(e4, t3), multiplePriority: Qf(e4), sortOrder: e4.sortOrder });
    };
    return (
      (e3 || []).forEach((e4, l2) => {
        const a2 = km(l2, o2);
        e4.children
          ? ("sortOrder" in e4 && r2(e4, a2), (n2 = [].concat(S(n2), S(th(e4.children, t2, a2)))))
          : e4.sorter &&
            ("sortOrder" in e4
              ? r2(e4, a2)
              : t2 &&
                e4.defaultSortOrder &&
                n2.push({
                  column: e4,
                  key: Em(e4, a2),
                  multiplePriority: Qf(e4),
                  sortOrder: e4.defaultSortOrder,
                }));
      }),
      n2
    );
  },
  oh = (e3, t2, o2, n2, r2, l2, a2, i2, s2) =>
    (t2 || []).map((t3, c2) => {
      const d2 = km(c2, i2);
      let u2 = t3;
      if (u2.sorter) {
        const i3 = u2.sortDirections || r2,
          c3 = u2.showSorterTooltip === void 0 ? a2 : u2.showSorterTooltip,
          p2 = Em(u2, d2),
          m2 = o2.find(({ key: e4 }) => e4 === p2),
          f2 = m2 ? m2.sortOrder : null,
          h2 = ((e4, t4) => (t4 ? e4[e4.indexOf(t4) + 1] : e4[0]))(i3, f2);
        let g2;
        if (t3.sortIcon) g2 = t3.sortIcon({ sortOrder: f2 });
        else {
          const t4 =
              i3.includes(Zf) &&
              Nt.createElement(Yf, {
                className: P(`${e3}-column-sorter-up`, { active: f2 === Zf }),
              }),
            o3 =
              i3.includes(Jf) &&
              Nt.createElement(qf, {
                className: P(`${e3}-column-sorter-down`, { active: f2 === Jf }),
              });
          g2 = Nt.createElement(
            "span",
            {
              className: P(`${e3}-column-sorter`, { [`${e3}-column-sorter-full`]: !(!t4 || !o3) }),
            },
            Nt.createElement(
              "span",
              { className: `${e3}-column-sorter-inner`, "aria-hidden": "true" },
              t4,
              o3,
            ),
          );
        }
        const { cancelSort: b2, triggerAsc: y2, triggerDesc: $2 } = l2 || {};
        let x2 = b2;
        h2 === Jf ? (x2 = $2) : h2 === Zf && (x2 = y2);
        const C2 = v(c3) ? { title: x2, ...c3 } : { title: x2 };
        u2 = {
          ...u2,
          className: P(u2.className, { [`${e3}-column-sort`]: f2 }),
          title: (o3) => {
            const n3 = `${e3}-column-sorters`,
              r3 = Nt.createElement("span", { className: `${e3}-column-title` }, Nm(t3.title, o3)),
              l3 = Nt.createElement("div", { className: n3 }, r3, g2);
            return c3
              ? typeof c3 != "boolean" && c3?.target === "sorter-icon"
                ? Nt.createElement(
                    "div",
                    { className: P(n3, `${n3}-tooltip-target-sorter`) },
                    r3,
                    Nt.createElement(Tl, { ...C2 }, g2),
                  )
                : Nt.createElement(Tl, { ...C2 }, l3)
              : l3;
          },
          onHeaderCell: (o3) => {
            var r3;
            const l3 = ((r3 = t3.onHeaderCell) == null ? void 0 : r3.call(t3, o3)) || {},
              a3 = l3.onClick,
              i4 = l3.onKeyDown;
            (l3.onClick = (e4) => {
              n2({ column: t3, key: p2, sortOrder: h2, multiplePriority: Qf(t3) }), a3?.(e4);
            }),
              (l3.onKeyDown = (e4) => {
                e4.keyCode === Pe.ENTER &&
                  n2({ column: t3, key: p2, sortOrder: h2, multiplePriority: Qf(t3) }),
                  i4?.(e4);
              });
            const c4 = ((e4, t4) => {
                const o4 = Nm(e4, t4);
                return v(o4) || Array.isArray(o4) ? "" : o4;
              })(t3.title, {}),
              d3 = c4?.toString();
            return (
              f2 && (l3["aria-sort"] = f2 === "ascend" ? "ascending" : "descending"),
              (l3["aria-description"] = s2?.sortable),
              (l3["aria-label"] = d3 || ""),
              (l3.className = P(l3.className, `${e3}-column-has-sorters`)),
              (l3.tabIndex = 0),
              t3.ellipsis && (l3.title = (c4 ?? "").toString()),
              l3
            );
          },
        };
      }
      return (
        "children" in u2 &&
          (u2 = { ...u2, children: oh(e3, u2.children, o2, n2, r2, l2, a2, d2, s2) }),
        u2
      );
    }),
  nh = (e3) => {
    const { column: t2, sortOrder: o2 } = e3;
    return { column: t2, order: o2, field: t2.dataIndex, columnKey: t2.key };
  },
  rh = (e3) => {
    const t2 = e3.reduce((e4, t3) => (t3.sortOrder && e4.push(nh(t3)), e4), []);
    if (t2.length === 0 && e3.length) {
      const t3 = e3.length - 1;
      return { ...nh(e3[t3]), column: void 0, order: void 0, field: void 0, columnKey: void 0 };
    }
    return t2.length <= 1 ? t2[0] || {} : t2;
  },
  lh = (e3, t2, o2) => {
    const n2 = t2.slice().sort((e4, t3) => t3.multiplePriority - e4.multiplePriority),
      r2 = e3.slice(),
      l2 = n2.filter(({ column: { sorter: e4 }, sortOrder: t3 }) => eh(e4) && t3);
    return l2.length
      ? r2
          .sort((e4, t3) => {
            for (let o3 = 0; o3 < l2.length; o3 += 1) {
              const n3 = l2[o3],
                {
                  column: { sorter: r3 },
                  sortOrder: a2,
                } = n3,
                i2 = eh(r3);
              if (i2 && a2) {
                const o4 = i2(e4, t3, a2);
                if (o4 !== 0) return a2 === Zf ? o4 : -o4;
              }
            }
            return 0;
          })
          .map((e4) => {
            const n3 = e4[o2];
            return n3 ? { ...e4, [o2]: lh(n3, t2, o2) } : e4;
          })
      : r2;
  },
  ah = (e3) => {
    const {
        prefixCls: t2,
        mergedColumns: o2,
        baseColumns: n2,
        sortDirections: r2,
        tableLocale: l2,
        showSorterTooltip: a2,
        onSorterChange: i2,
        globalLocale: s2,
      } = e3,
      c2 = n2 ?? o2,
      [d2, u2] = Nt.useState(() => th(c2, !0)),
      p2 = (e4, t3) => {
        const o3 = [];
        return (
          e4.forEach((e5, n3) => {
            const r3 = km(n3, t3);
            if ((o3.push(Em(e5, r3)), Array.isArray(e5.children))) {
              const t4 = p2(e5.children, r3);
              o3.push.apply(o3, S(t4));
            }
          }),
          o3
        );
      },
      m2 = Nt.useMemo(() => {
        let e4 = !0;
        const t3 = th(c2, !1);
        if (!t3.length) {
          const e5 = p2(c2);
          return d2.filter(({ key: t4 }) => e5.includes(t4));
        }
        const o3 = [];
        function n3(t4) {
          e4 ? o3.push(t4) : o3.push({ ...t4, sortOrder: null });
        }
        let r3 = null;
        return (
          t3.forEach((t4) => {
            r3 === null
              ? (n3(t4), t4.sortOrder && (t4.multiplePriority === !1 ? (e4 = !1) : (r3 = !0)))
              : ((r3 && t4.multiplePriority !== !1) || (e4 = !1), n3(t4));
          }),
          o3
        );
      }, [c2, d2]),
      f2 = Nt.useMemo(() => {
        var e4, t3;
        const o3 = m2.map(({ column: e5, sortOrder: t4 }) => ({ column: e5, order: t4 }));
        return {
          sortColumns: o3,
          sortColumn: (e4 = o3[0]) == null ? void 0 : e4.column,
          sortOrder: (t3 = o3[0]) == null ? void 0 : t3.order,
        };
      }, [m2]),
      h2 = (e4) => {
        let t3;
        (t3 =
          e4.multiplePriority !== !1 && m2.length && m2[0].multiplePriority !== !1
            ? [].concat(S(m2.filter(({ key: t4 }) => t4 !== e4.key)), [e4])
            : [e4]),
          u2(t3),
          i2(rh(t3), t3);
      };
    return [(e4) => oh(t2, e4, m2, h2, r2, l2, a2, void 0, s2), m2, f2, () => rh(m2)];
  },
  ih = (e3) =>
    It.useMemo(
      () => (typeof e3 == "boolean" ? { spinning: e3 } : v(e3) ? { spinning: !0, ...e3 } : {}),
      [e3],
    ),
  sh = (e3, t2) =>
    e3.map((e4) => {
      const o2 = { ...e4 };
      return (
        (o2.title = Nm(e4.title, t2)), "children" in o2 && (o2.children = sh(o2.children, t2)), o2
      );
    }),
  ch = (e3) => [Nt.useCallback((t2) => sh(t2, e3), [e3])],
  dh = Jp((e3, t2) => {
    const { _renderTimes: o2 } = e3,
      { _renderTimes: n2 } = t2;
    return o2 !== n2;
  }),
  uh = pm((e3, t2) => {
    const { _renderTimes: o2 } = e3,
      { _renderTimes: n2 } = t2;
    return o2 !== n2;
  }),
  ph = (e3) => {
    const {
        antCls: t2,
        componentCls: o2,
        lineWidth: n2,
        lineType: r2,
        tableBorderColor: l2,
        tableHeaderBg: a2,
        tablePaddingVertical: i2,
        tablePaddingHorizontal: s2,
        calc: c2,
      } = e3,
      d2 = `${X(n2)} ${r2} ${l2}`,
      [u2, p2] = k(t2, "table"),
      m2 = (e4, t3, r3) => ({
        [`&${o2}-${e4}`]: {
          [`> ${o2}-container`]: {
            [`> ${o2}-content, > ${o2}-body`]: {
              "> table > tbody > tr > th, > table > tbody > tr > td": {
                [`> ${o2}-expanded-row-fixed`]: {
                  margin: `${X(c2(t3).mul(-1).equal())}
              ${X(c2(c2(r3).add(n2)).mul(-1).equal())}`,
                },
              },
            },
          },
        },
      });
    return {
      [`${o2}-wrapper`]: {
        [u2("nested-border-top")]: d2,
        [`${o2}${o2}-bordered`]: {
          [`> ${o2}-title`]: { border: d2, borderBottom: 0 },
          [`> ${o2}-container`]: {
            borderInlineStart: d2,
            borderTop: d2,
            "&:first-child": { borderTop: p2("nested-border-top", d2) },
            [`> ${o2}-header${o2}-sticky-holder`]: {
              marginTop: c2(n2).mul(-1).equal(),
              borderTop: d2,
            },
            [`> ${o2}-content, > ${o2}-header, > ${o2}-body, > ${o2}-summary`]: {
              "> table": {
                "> thead > tr > th, > thead > tr > td, > tbody > tr > th, > tbody > tr > td, > tfoot > tr > th, > tfoot > tr > td":
                  { borderInlineEnd: d2 },
                "> thead": {
                  "> tr:not(:last-child) > th": { borderBottom: d2 },
                  "> tr > th::before": { backgroundColor: "transparent !important" },
                },
                "> thead > tr, > tbody > tr, > tfoot > tr": {
                  [`> ${o2}-cell-fix-right-first:not(${o2}-cell-fix-right-last)::after`]: {
                    borderInlineEnd: d2,
                  },
                },
                "> tbody > tr > th, > tbody > tr > td": {
                  [`> ${o2}-expanded-row-fixed`]: {
                    margin: `${X(c2(i2).mul(-1).equal())} ${X(c2(c2(s2).add(n2)).mul(-1).equal())}`,
                    "&::after": {
                      position: "absolute",
                      top: 0,
                      insetInlineEnd: n2,
                      bottom: 0,
                      borderInlineEnd: d2,
                      content: '""',
                    },
                  },
                },
              },
            },
          },
          [`&${o2}-scroll-horizontal`]: {
            [`> ${o2}-container > ${o2}-body`]: {
              "> table > tbody": {
                [`
                > tr${o2}-expanded-row,
                > tr${o2}-placeholder
              `]: { "> th, > td": { borderInlineEnd: 0 } },
              },
            },
          },
          ...m2("medium", e3.tablePaddingVerticalMiddle, e3.tablePaddingHorizontalMiddle),
          ...m2("small", e3.tablePaddingVerticalSmall, e3.tablePaddingHorizontalSmall),
          [`> ${o2}-footer`]: { border: d2, borderTop: 0 },
        },
        [`${o2}-cell`]: {
          [`
          > ${o2}-wrapper:only-child,
          > ${o2}-expanded-row-fixed > ${o2}-wrapper:only-child
        `]: { [u2("nested-border-top")]: 0 },
          "&-scrollbar:not([rowspan])": { boxShadow: `0 ${X(n2)} 0 ${X(n2)} ${a2}` },
        },
        [`${o2}-bordered ${o2}-cell-scrollbar`]: { borderInlineEnd: d2 },
      },
    };
  },
  mh = (e3) => {
    const { componentCls: t2 } = e3;
    return {
      [`${t2}-wrapper`]: {
        [`${t2}-cell-ellipsis`]: {
          ...He,
          wordBreak: "keep-all",
          [`
          &${t2}-cell-fix-start-shadow,
          &${t2}-cell-fix-end-shadow
        `]: { overflow: "visible", [`${t2}-cell-content`]: { ...He, display: "block" } },
          [`${t2}-column-title`]: { ...He, wordBreak: "keep-all" },
        },
      },
    };
  },
  fh = (e3) => {
    const { componentCls: t2 } = e3;
    return {
      [`${t2}-wrapper`]: {
        [`${t2}-tbody > tr${t2}-placeholder`]: {
          textAlign: "center",
          color: e3.colorTextDisabled,
          "&:hover > th, &:hover > td": { background: e3.colorBgContainer },
        },
      },
    };
  },
  hh = (e3) => {
    const {
        componentCls: t2,
        antCls: o2,
        motionDurationSlow: n2,
        lineWidth: r2,
        paddingXS: l2,
        lineType: a2,
        tableBorderColor: i2,
        tableExpandIconBg: s2,
        tableExpandColumnWidth: c2,
        borderRadius: d2,
        tablePaddingVertical: u2,
        tablePaddingHorizontal: p2,
        tableExpandedRowBg: m2,
        paddingXXS: f2,
        expandIconMarginTop: h2,
        expandIconSize: g2,
        expandIconHalfInner: b2,
        expandIconScale: v2,
        calc: y2,
      } = e3,
      $2 = `${X(r2)} ${a2} ${i2}`,
      x2 = y2(f2).sub(r2).equal();
    return {
      [`${t2}-wrapper`]: {
        [`${t2}-expand-icon-col`]: { width: c2 },
        [`${t2}-row-expand-icon-cell`]: {
          textAlign: "center",
          [`${t2}-row-expand-icon`]: {
            display: "inline-flex",
            float: "none",
            verticalAlign: "sub",
          },
        },
        [`${t2}-row-indent`]: { height: 1, float: "left" },
        [`${t2}-row-expand-icon`]: {
          ...$t(e3),
          position: "relative",
          float: "left",
          width: g2,
          height: g2,
          color: "inherit",
          lineHeight: X(g2),
          background: s2,
          border: $2,
          borderRadius: d2,
          transform: `scale(${v2})`,
          "&:focus, &:hover, &:active": { borderColor: "currentcolor" },
          "&::before, &::after": {
            position: "absolute",
            background: "currentcolor",
            transition: `transform ${n2} ease-out`,
            content: '""',
          },
          "&::before": { top: b2, insetInlineEnd: x2, insetInlineStart: x2, height: r2 },
          "&::after": {
            top: x2,
            bottom: x2,
            insetInlineStart: b2,
            width: r2,
            transform: "rotate(90deg)",
          },
          "&-collapsed::before": { transform: "rotate(-180deg)" },
          "&-collapsed::after": { transform: "rotate(0deg)" },
          "&-spaced": {
            "&::before, &::after": { display: "none", content: "none" },
            background: "transparent",
            border: 0,
            visibility: "hidden",
          },
        },
        [`${t2}-row-indent + ${t2}-row-expand-icon`]: { marginTop: h2, marginInlineEnd: l2 },
        [`tr${t2}-expanded-row`]: {
          "&, &:hover": { "> th, > td": { background: m2 } },
          [`${o2}-descriptions-view`]: { display: "flex", table: { flex: "auto", width: "100%" } },
        },
        [`${t2}-expanded-row-fixed`]: {
          position: "relative",
          margin: `${X(y2(u2).mul(-1).equal())} ${X(y2(p2).mul(-1).equal())}`,
          padding: `${X(u2)} ${X(p2)}`,
        },
      },
    };
  },
  gh = (e3) => {
    const {
        componentCls: t2,
        antCls: o2,
        iconCls: n2,
        tableFilterDropdownWidth: r2,
        tableFilterDropdownSearchWidth: l2,
        paddingXXS: a2,
        paddingXS: i2,
        colorText: s2,
        lineWidth: c2,
        lineType: d2,
        tableBorderColor: u2,
        headerIconColor: p2,
        fontSizeSM: m2,
        tablePaddingHorizontal: f2,
        borderRadius: h2,
        motionDurationSlow: g2,
        colorIcon: b2,
        colorPrimary: v2,
        tableHeaderFilterActiveBg: y2,
        colorTextDisabled: $2,
        tableFilterDropdownBg: x2,
        tableFilterDropdownHeight: C2,
        controlItemBgHover: w2,
        controlItemBgActive: S2,
        boxShadowSecondary: E2,
        filterDropdownMenuBg: k2,
        calc: N2,
      } = e3,
      I2 = `${o2}-dropdown`,
      B2 = `${t2}-filter-dropdown`,
      R2 = `${o2}-tree`,
      T2 = `${X(c2)} ${d2} ${u2}`;
    return [
      {
        [`${t2}-wrapper`]: {
          [`${t2}-filter-column`]: { display: "flex", justifyContent: "space-between" },
          [`${t2}-filter-trigger`]: {
            position: "relative",
            display: "flex",
            alignItems: "center",
            marginBlock: N2(a2).mul(-1).equal(),
            marginInline: `${X(a2)} ${X(N2(f2).div(2).mul(-1).equal())}`,
            padding: `0 ${X(a2)}`,
            color: p2,
            fontSize: m2,
            borderRadius: h2,
            cursor: "pointer",
            transition: `all ${g2}`,
            "&:hover": { color: b2, background: y2 },
            "&.active": { color: v2 },
          },
        },
      },
      {
        [`${o2}-dropdown`]: {
          [B2]: {
            ...ve(e3),
            minWidth: r2,
            backgroundColor: x2,
            borderRadius: h2,
            boxShadow: E2,
            overflow: "hidden",
            [`${I2}-menu`]: {
              maxHeight: C2,
              overflowX: "hidden",
              border: 0,
              boxShadow: "none",
              borderRadius: "unset",
              backgroundColor: k2,
              "&:empty::after": {
                display: "block",
                padding: `${X(i2)} 0`,
                color: $2,
                fontSize: m2,
                textAlign: "center",
                content: '"Not Found"',
              },
            },
            [`${B2}-tree`]: {
              paddingBlock: `${X(i2)} 0`,
              paddingInline: i2,
              [R2]: { padding: 0 },
              [`${R2}-treenode ${R2}-node-content-wrapper:hover`]: { backgroundColor: w2 },
              [`${R2}-treenode-checkbox-checked ${R2}-node-content-wrapper`]: {
                "&, &:hover": { backgroundColor: S2 },
              },
            },
            [`${B2}-search`]: {
              padding: i2,
              borderBottom: T2,
              "&-input": { input: { minWidth: l2 }, [n2]: { color: $2 } },
            },
            [`${B2}-checkall`]: { width: "100%", marginBottom: a2, marginInlineStart: a2 },
            [`${B2}-btns`]: {
              display: "flex",
              justifyContent: "space-between",
              padding: `${X(N2(i2).sub(c2).equal())} ${X(i2)}`,
              overflow: "hidden",
              borderTop: T2,
            },
          },
        },
      },
      {
        [`${o2}-dropdown ${B2}, ${B2}-submenu`]: {
          [`${o2}-checkbox-wrapper + span`]: { paddingInlineStart: i2, color: s2 },
          "> ul": { maxHeight: "calc(100vh - 130px)", overflowX: "hidden", overflowY: "auto" },
        },
      },
    ];
  };
function bh({ colorSplit: e3 }) {
  return [
    { boxShadow: `inset 10px 0 8px -8px ${e3}` },
    { boxShadow: `inset -10px 0 8px -8px ${e3}` },
  ];
}
const vh = (e3) => {
    const {
        componentCls: t2,
        lineWidth: o2,
        motionDurationSlow: n2,
        zIndexTableFixed: r2,
        tableBg: l2,
        calc: a2,
      } = e3,
      i2 = `${t2}-cell`,
      s2 = `${i2}-fix`,
      c2 = {
        position: "absolute",
        top: 0,
        bottom: a2(o2).mul(-1).equal(),
        width: 30,
        transition: `box-shadow ${n2}`,
        content: '""',
        pointerEvents: "none",
      },
      [d2, u2] = bh(e3);
    return {
      [`${t2}-wrapper`]: {
        [`${i2}${s2}`]: { position: "sticky" },
        [s2]: {
          zIndex: `calc(var(--z-offset-reverse) + ${r2})`,
          background: l2,
          "&:after": c2,
          "&-start:after": { insetInlineStart: "100%" },
          "&-end:after": { insetInlineEnd: "100%" },
          "&-start-shadow-show:after": d2,
          "&-end-shadow-show:after": u2,
        },
        [`${t2}-container`]: {
          position: "relative",
          "&:before, &:after": { ...c2, zIndex: `calc(var(--columns-count) * 2 + ${r2} + 1)` },
          "&:before": { insetInlineStart: 0 },
          "&:after": { insetInlineEnd: 0 },
        },
        [`${t2}-has-fix-start ${t2}-container:before`]: { display: "none" },
        [`${t2}-has-fix-end ${t2}-container:after`]: { display: "none" },
        [`${t2}-fix-start-shadow-show ${t2}-container:before`]: d2,
        [`${t2}-fix-end-shadow-show ${t2}-container:after`]: u2,
      },
    };
  },
  yh = (e3) => {
    const { componentCls: t2, antCls: o2, margin: n2 } = e3;
    return {
      [`${t2}-wrapper`]: {
        [`${t2}-pagination${o2}-pagination`]: { margin: `${X(n2)} 0` },
        [`${t2}-pagination`]: {
          display: "flex",
          flexWrap: "wrap",
          rowGap: e3.paddingXS,
          "> *": { flex: "none" },
          "&-start": { justifyContent: "flex-start" },
          "&-center": { justifyContent: "center" },
          "&-end": { justifyContent: "flex-end" },
        },
      },
    };
  },
  $h = (e3) => {
    const { componentCls: t2, tableRadius: o2 } = e3;
    return {
      [`${t2}-wrapper`]: {
        [t2]: {
          [`${t2}-title, ${t2}-header`]: { borderRadius: `${X(o2)} ${X(o2)} 0 0` },
          [`${t2}-title + ${t2}-container`]: {
            borderStartStartRadius: 0,
            borderStartEndRadius: 0,
            [`${t2}-header, table`]: { borderRadius: 0 },
            "table > thead > tr:first-child": {
              "th:first-child, th:last-child, td:first-child, td:last-child": { borderRadius: 0 },
            },
          },
          [`&${t2}-bordered${t2}-no-header`]: {
            [`> ${t2}-container`]: {
              [`> ${t2}-content, > ${t2}-body`]: {
                "> table > tbody > tr:first-child": {
                  "> *:first-child": { borderStartStartRadius: o2 },
                  "> *:last-child": { borderStartEndRadius: o2 },
                },
              },
            },
          },
          "&-container": {
            borderStartStartRadius: o2,
            borderStartEndRadius: o2,
            "&::before": { borderStartStartRadius: o2 },
            "&::after": { borderStartEndRadius: o2 },
            [`> ${t2}-content`]: { borderStartStartRadius: o2, borderStartEndRadius: o2 },
            "table > thead > tr:first-child": {
              "> *:first-child": { borderStartStartRadius: o2 },
              "> *:last-child": { borderStartEndRadius: o2 },
            },
          },
          "&-footer": { borderRadius: `0 0 ${X(o2)} ${X(o2)}` },
        },
      },
    };
  },
  xh = (e3) => {
    const { componentCls: t2 } = e3,
      [o2, n2] = bh(e3);
    return {
      [`${t2}-wrapper-rtl`]: {
        direction: "rtl",
        table: { direction: "rtl" },
        [`${t2}-row-expand-icon`]: {
          float: "right",
          "&::after": { transform: "rotate(-90deg)" },
          "&-collapsed::before": { transform: "rotate(180deg)" },
          "&-collapsed::after": { transform: "rotate(0deg)" },
        },
        [`${t2}-cell-fix`]: { "&-start-shadow-show:after": n2, "&-end-shadow-show:after": o2 },
        [`${t2}-container`]: { [`${t2}-row-indent`]: { float: "right" } },
        [`${t2}-fix-start-shadow-show ${t2}-container:before`]: n2,
        [`${t2}-fix-end-shadow-show ${t2}-container:after`]: o2,
      },
    };
  },
  Ch = (e3) => {
    const {
      componentCls: t2,
      antCls: o2,
      iconCls: n2,
      fontSizeIcon: r2,
      padding: l2,
      paddingXS: a2,
      headerIconColor: i2,
      headerIconHoverColor: s2,
      tableSelectionColumnWidth: c2,
      tableSelectedRowBg: d2,
      tableSelectedRowHoverBg: u2,
      tableRowHoverBg: p2,
      tablePaddingHorizontal: m2,
      calc: f2,
    } = e3;
    return {
      [`${t2}-wrapper`]: {
        [`${t2}-selection-col`]: {
          width: c2,
          [`&${t2}-selection-col-with-dropdown`]: {
            width: f2(c2).add(r2).add(f2(l2).div(4)).equal(),
          },
        },
        [`${t2}-bordered ${t2}-selection-col`]: {
          width: f2(c2).add(f2(a2).mul(2)).equal(),
          [`&${t2}-selection-col-with-dropdown`]: {
            width: f2(c2).add(r2).add(f2(l2).div(4)).add(f2(a2).mul(2)).equal(),
          },
        },
        [`
        table tr th${t2}-selection-column,
        table tr td${t2}-selection-column,
        ${t2}-selection-column
      `]: {
          paddingInlineEnd: e3.paddingXS,
          paddingInlineStart: e3.paddingXS,
          textAlign: "center",
          [`${o2}-radio-wrapper`]: { marginInlineEnd: 0 },
        },
        [`table tr th${t2}-selection-column${t2}-cell-fix-start`]: {
          zIndex: `calc(var(--z-offset, 0) + ${e3.zIndexTableFixed})`,
        },
        [`table tr th${t2}-selection-column::after`]: { backgroundColor: "transparent !important" },
        [`${t2}-selection`]: {
          position: "relative",
          display: "inline-flex",
          flexDirection: "column",
        },
        [`${t2}-selection-extra`]: {
          position: "absolute",
          top: 0,
          zIndex: 1,
          cursor: "pointer",
          transition: `all ${e3.motionDurationSlow}`,
          marginInlineStart: "100%",
          paddingInlineStart: X(f2(m2).div(4).equal()),
          [n2]: { color: i2, fontSize: r2, verticalAlign: "baseline", "&:hover": { color: s2 } },
        },
        [`${t2}-tbody`]: {
          [`${t2}-row`]: {
            [`&${t2}-row-selected`]: {
              [`> ${t2}-cell`]: { background: d2, "&-row-hover": { background: u2 } },
            },
            [`> ${t2}-cell-row-hover`]: { background: p2 },
          },
        },
      },
    };
  },
  wh = (e3) => {
    const { componentCls: t2, tableExpandColumnWidth: o2, calc: n2 } = e3,
      r2 = (e4, r3, l2, a2) => ({
        [`${t2}${t2}-${e4}`]: {
          fontSize: a2,
          [`
        ${t2}-title,
        ${t2}-footer,
        ${t2}-cell,
        ${t2}-thead > tr > th,
        ${t2}-tbody > tr > th,
        ${t2}-tbody > tr > td,
        tfoot > tr > th,
        tfoot > tr > td
      `]: { padding: `${X(r3)} ${X(l2)}` },
          [`${t2}-filter-trigger`]: { marginInlineEnd: X(n2(l2).div(2).mul(-1).equal()) },
          [`${t2}-expanded-row-fixed`]: {
            margin: `${X(n2(r3).mul(-1).equal())} ${X(n2(l2).mul(-1).equal())}`,
          },
          [`${t2}-tbody`]: {
            [`${t2}-wrapper:only-child ${t2}`]: {
              marginBlock: X(n2(r3).mul(-1).equal()),
              marginInline: `${X(n2(o2).sub(l2).equal())} ${X(n2(l2).mul(-1).equal())}`,
            },
          },
          [`${t2}-selection-extra`]: { paddingInlineStart: X(n2(l2).div(4).equal()) },
        },
      });
    return {
      [`${t2}-wrapper`]: {
        ...r2(
          "medium",
          e3.tablePaddingVerticalMiddle,
          e3.tablePaddingHorizontalMiddle,
          e3.tableFontSizeMiddle,
        ),
        ...r2(
          "small",
          e3.tablePaddingVerticalSmall,
          e3.tablePaddingHorizontalSmall,
          e3.tableFontSizeSmall,
        ),
      },
    };
  },
  Sh = (e3) => {
    const {
      componentCls: t2,
      marginXXS: o2,
      fontSizeIcon: n2,
      headerIconColor: r2,
      headerIconHoverColor: l2,
    } = e3;
    return {
      [`${t2}-wrapper`]: {
        [`${t2}-thead th${t2}-column-has-sorters`]: {
          outline: "none",
          cursor: "pointer",
          transition: `all ${e3.motionDurationSlow}, left 0s`,
          "&:hover": {
            background: e3.tableHeaderSortHoverBg,
            "&::before": { backgroundColor: "transparent !important" },
          },
          "&:focus-visible": { color: e3.colorPrimary },
          [`
          &${t2}-cell-fix-left:hover,
          &${t2}-cell-fix-right:hover
        `]: { background: e3.tableFixedHeaderSortActiveBg },
        },
        [`${t2}-thead th${t2}-column-sort`]: {
          background: e3.tableHeaderSortBg,
          "&::before": { backgroundColor: "transparent !important" },
        },
        [`td${t2}-column-sort`]: { background: e3.tableBodySortBg },
        [`${t2}-column-title`]: { position: "relative", zIndex: 1, flex: 1, minWidth: 0 },
        [`${t2}-column-sorters`]: {
          display: "flex",
          flex: "auto",
          alignItems: "center",
          justifyContent: "space-between",
          "&::after": {
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            content: '""',
          },
        },
        [`${t2}-column-sorters-tooltip-target-sorter`]: { "&::after": { content: "none" } },
        [`${t2}-column-sorter`]: {
          marginInlineStart: o2,
          color: r2,
          fontSize: 0,
          transition: `color ${e3.motionDurationSlow}`,
          "&-inner": { display: "inline-flex", flexDirection: "column", alignItems: "center" },
          "&-up, &-down": { fontSize: n2, "&.active": { color: e3.colorPrimary } },
          [`${t2}-column-sorter-up + ${t2}-column-sorter-down`]: { marginTop: "-0.3em" },
        },
        [`${t2}-column-sorters:hover ${t2}-column-sorter`]: { color: l2 },
      },
    };
  },
  Eh = (e3) => {
    const {
        componentCls: t2,
        opacityLoading: o2,
        tableScrollThumbBg: n2,
        tableScrollThumbBgHover: r2,
        tableScrollThumbSize: l2,
        tableScrollBg: a2,
        stickyScrollBarBorderRadius: i2,
        lineWidth: s2,
        lineType: c2,
        tableBorderColor: d2,
        zIndexTableFixed: u2,
      } = e3,
      p2 = `${X(s2)} ${c2} ${d2}`;
    return {
      [`${t2}-wrapper`]: {
        [`${t2}-sticky`]: {
          "&-holder": {
            position: "sticky",
            zIndex: `calc(var(--columns-count) * 2 + ${u2} + 1)`,
            background: e3.colorBgContainer,
          },
          "&-scroll": {
            position: "sticky",
            bottom: 0,
            height: `${X(l2)} !important`,
            zIndex: `calc(var(--columns-count) * 2 + ${u2} + 1)`,
            display: "flex",
            alignItems: "center",
            background: a2,
            borderTop: p2,
            opacity: o2,
            "&:hover": { transformOrigin: "center bottom" },
            "&-bar": {
              height: l2,
              backgroundColor: n2,
              borderRadius: i2,
              transition: `all ${e3.motionDurationSlow}, transform 0s`,
              position: "absolute",
              bottom: 0,
              "&:hover, &-active": { backgroundColor: r2 },
            },
          },
        },
      },
    };
  },
  kh = (e3) => {
    const { componentCls: t2, lineWidth: o2, tableBorderColor: n2, calc: r2 } = e3,
      l2 = `${X(o2)} ${e3.lineType} ${n2}`;
    return {
      [`${t2}-wrapper`]: {
        [`${t2}-summary`]: {
          position: "relative",
          zIndex: e3.zIndexTableFixed,
          background: e3.tableBg,
          "> tr": { "> th, > td": { borderBottom: l2 } },
        },
        [`div${t2}-summary`]: { boxShadow: `0 ${X(r2(o2).mul(-1).equal())} 0 ${n2}` },
      },
    };
  },
  Nh = (e3) => {
    const {
        componentCls: t2,
        motionDurationMid: o2,
        lineWidth: n2,
        lineType: r2,
        tableBorderColor: l2,
        calc: a2,
      } = e3,
      i2 = `${X(n2)} ${r2} ${l2}`,
      s2 = `${t2}-expanded-row-cell`;
    return {
      [`${t2}-wrapper`]: {
        [`${t2}-tbody-virtual`]: {
          [`${t2}-tbody-virtual-scrollbar`]: {
            cursor: "pointer",
            "&:hover": { backgroundColor: e3.colorFillQuaternary },
          },
          [`${t2}-tbody-virtual-holder-inner`]: {
            [`
            & > ${t2}-row,
            & > div:not(${t2}-row) > ${t2}-row
          `]: {
              display: "flex",
              boxSizing: "border-box",
              width: "100%",
              [`> ${t2}-cell`]: { alignContent: "center" },
            },
          },
          [`${t2}-cell`]: { borderBottom: i2, transition: `background-color ${o2}` },
          [`${t2}-expanded-row`]: {
            [`${s2}${s2}-fixed`]: {
              position: "sticky",
              insetInlineStart: 0,
              overflow: "hidden",
              width: `calc(var(--virtual-width) - ${X(n2)})`,
              borderInlineEnd: "none",
            },
          },
        },
        [`${t2}-bordered`]: {
          [`${t2}-tbody-virtual`]: {
            "&:after": {
              content: '""',
              insetInline: 0,
              bottom: 0,
              borderBottom: i2,
              position: "absolute",
            },
            [`${t2}-cell`]: {
              borderInlineEnd: i2,
              [`&${t2}-cell-fix-right-first:before`]: {
                content: '""',
                position: "absolute",
                insetBlock: 0,
                insetInlineStart: a2(n2).mul(-1).equal(),
                borderInlineStart: i2,
              },
            },
          },
          [`&${t2}-virtual`]: {
            [`${t2}-placeholder ${t2}-cell`]: { borderInlineEnd: i2, borderBottom: i2 },
          },
        },
      },
    };
  },
  Ih = (e3) => {
    const {
        componentCls: t2,
        fontWeightStrong: o2,
        tablePaddingVertical: n2,
        tablePaddingHorizontal: r2,
        tableExpandColumnWidth: l2,
        lineWidth: a2,
        lineType: i2,
        tableBorderColor: s2,
        tableFontSize: c2,
        tableBg: d2,
        tableRadius: u2,
        tableHeaderTextColor: p2,
        motionDurationMid: m2,
        tableHeaderBg: f2,
        tableHeaderCellSplitColor: h2,
        tableFooterTextColor: g2,
        tableFooterBg: b2,
        calc: v2,
      } = e3,
      y2 = `${X(a2)} ${i2} ${s2}`;
    return {
      [`${t2}-wrapper`]: {
        clear: "both",
        maxWidth: "100%",
        "--rc-virtual-list-scrollbar-bg": e3.tableScrollBg,
        ...Ee(),
        [t2]: {
          ...ve(e3),
          fontSize: c2,
          background: d2,
          borderRadius: `${X(u2)} ${X(u2)} 0 0`,
          scrollbarColor: `${e3.tableScrollThumbBg} ${e3.tableScrollBg}`,
        },
        table: {
          width: "100%",
          textAlign: "start",
          borderRadius: `${X(u2)} ${X(u2)} 0 0`,
          borderCollapse: "separate",
          borderSpacing: 0,
        },
        [`
          ${t2}-cell,
          ${t2}-thead > tr > th,
          ${t2}-tbody > tr > th,
          ${t2}-tbody > tr > td,
          tfoot > tr > th,
          tfoot > tr > td
        `]: { position: "relative", padding: `${X(n2)} ${X(r2)}`, overflowWrap: "break-word" },
        [`${t2}-title`]: { padding: `${X(n2)} ${X(r2)}` },
        [`${t2}-thead`]: {
          "> tr > th, > tr > td": {
            position: "relative",
            color: p2,
            fontWeight: o2,
            textAlign: "start",
            background: f2,
            borderBottom: y2,
            transition: `background-color ${m2} ease`,
            "&[colspan]:not([colspan='1'])": { textAlign: "center" },
            [`&:not(:last-child):not(${t2}-selection-column):not(${t2}-row-expand-icon-cell):not([colspan])::before`]:
              {
                position: "absolute",
                top: "50%",
                insetInlineEnd: 0,
                width: 1,
                height: "1.6em",
                backgroundColor: h2,
                transform: "translateY(-50%)",
                transition: `background-color ${m2}`,
                content: '""',
              },
          },
          "> tr:not(:last-child) > th[colspan]": { borderBottom: 0 },
        },
        [`${t2}-tbody`]: {
          "> tr": {
            "> th, > td": {
              borderBottom: y2,
              transition: ["background-color", "border-color"]
                .map((e4) => `${e4} ${m2}`)
                .join(", "),
              [`
              > ${t2}-wrapper:only-child,
              > ${t2}-expanded-row-fixed > ${t2}-wrapper:only-child
            `]: {
                [t2]: {
                  marginBlock: X(v2(n2).mul(-1).equal()),
                  marginInline: `${X(v2(l2).sub(r2).equal())}
                ${X(v2(r2).mul(-1).equal())}`,
                  [`${t2}-tbody > tr:last-child > td`]: {
                    borderBottomWidth: 0,
                    "&:first-child, &:last-child": { borderRadius: 0 },
                  },
                },
              },
            },
            "> th": {
              position: "relative",
              color: p2,
              fontWeight: o2,
              textAlign: "start",
              background: f2,
              borderBottom: y2,
              transition: `background-color ${m2} ease`,
            },
            [`& > ${t2}-measure-cell`]: {
              paddingBlock: "0 !important",
              borderBlock: "0 !important",
              [`${t2}-measure-cell-content`]: {
                height: 0,
                overflow: "hidden",
                pointerEvents: "none",
              },
            },
          },
        },
        [`${t2}-footer`]: { padding: `${X(n2)} ${X(r2)}`, color: g2, background: b2 },
      },
    };
  },
  Bh = Y(
    "Table",
    (e3) => {
      const {
          colorTextHeading: t2,
          colorSplit: o2,
          colorBgContainer: n2,
          controlInteractiveSize: r2,
          headerBg: l2,
          headerColor: a2,
          headerSortActiveBg: i2,
          headerSortHoverBg: s2,
          bodySortBg: c2,
          rowHoverBg: d2,
          rowSelectedBg: u2,
          rowSelectedHoverBg: p2,
          rowExpandedBg: m2,
          cellPaddingBlock: f2,
          cellPaddingInline: h2,
          cellPaddingBlockMD: g2,
          cellPaddingInlineMD: b2,
          cellPaddingBlockSM: v2,
          cellPaddingInlineSM: y2,
          borderColor: $2,
          footerBg: x2,
          footerColor: C2,
          headerBorderRadius: w2,
          cellFontSize: S2,
          cellFontSizeMD: E2,
          cellFontSizeSM: k2,
          headerSplitColor: N2,
          fixedHeaderSortActiveBg: I2,
          headerFilterHoverBg: B2,
          filterDropdownBg: R2,
          expandIconBg: T2,
          selectionColumnWidth: M2,
          stickyScrollBarBg: P2,
          calc: A2,
        } = e3,
        L2 = q(e3, {
          tableFontSize: S2,
          tableBg: n2,
          tableRadius: w2,
          tablePaddingVertical: f2,
          tablePaddingHorizontal: h2,
          tablePaddingVerticalMiddle: g2,
          tablePaddingHorizontalMiddle: b2,
          tablePaddingVerticalSmall: v2,
          tablePaddingHorizontalSmall: y2,
          tableBorderColor: $2,
          tableHeaderTextColor: a2,
          tableHeaderBg: l2,
          tableFooterTextColor: C2,
          tableFooterBg: x2,
          tableHeaderCellSplitColor: N2,
          tableHeaderSortBg: i2,
          tableHeaderSortHoverBg: s2,
          tableBodySortBg: c2,
          tableFixedHeaderSortActiveBg: I2,
          tableHeaderFilterActiveBg: B2,
          tableFilterDropdownBg: R2,
          tableRowHoverBg: d2,
          tableSelectedRowBg: u2,
          tableSelectedRowHoverBg: p2,
          zIndexTableFixed: 2,
          tableFontSizeMiddle: E2,
          tableFontSizeSmall: k2,
          tableSelectionColumnWidth: M2,
          tableExpandIconBg: T2,
          tableExpandColumnWidth: A2(r2).add(A2(e3.padding).mul(2)).equal(),
          tableExpandedRowBg: m2,
          tableFilterDropdownWidth: 120,
          tableFilterDropdownHeight: 264,
          tableFilterDropdownSearchWidth: 140,
          tableScrollThumbSize: 8,
          tableScrollThumbBg: P2,
          tableScrollThumbBgHover: t2,
          tableScrollBg: o2,
        });
      return [
        Ih(L2),
        yh(L2),
        kh(L2),
        Sh(L2),
        gh(L2),
        ph(L2),
        $h(L2),
        hh(L2),
        kh(L2),
        fh(L2),
        Ch(L2),
        vh(L2),
        Eh(L2),
        mh(L2),
        wh(L2),
        xh(L2),
        Nh(L2),
      ];
    },
    (e3) => {
      const {
          colorFillAlter: t2,
          colorBgContainer: o2,
          colorTextHeading: n2,
          colorFillSecondary: r2,
          colorFillContent: l2,
          controlItemBgActive: a2,
          controlItemBgActiveHover: i2,
          padding: s2,
          paddingSM: c2,
          paddingXS: d2,
          colorBorderSecondary: u2,
          borderRadiusLG: p2,
          controlHeight: m2,
          colorTextPlaceholder: f2,
          fontSize: h2,
          fontSizeSM: g2,
          lineHeight: b2,
          lineWidth: v2,
          colorIcon: y2,
          colorIconHover: $2,
          opacityLoading: x2,
          controlInteractiveSize: C2,
        } = e3,
        w2 = new W(r2).onBackground(o2).toHexString(),
        S2 = new W(l2).onBackground(o2).toHexString(),
        E2 = new W(t2).onBackground(o2).toHexString(),
        k2 = new W(y2),
        N2 = new W($2),
        I2 = C2 / 2 - v2,
        B2 = 2 * I2 + 3 * v2;
      return {
        headerBg: E2,
        headerColor: n2,
        headerSortActiveBg: w2,
        headerSortHoverBg: S2,
        bodySortBg: E2,
        rowHoverBg: E2,
        rowSelectedBg: a2,
        rowSelectedHoverBg: i2,
        rowExpandedBg: t2,
        cellPaddingBlock: s2,
        cellPaddingInline: s2,
        cellPaddingBlockMD: c2,
        cellPaddingInlineMD: d2,
        cellPaddingBlockSM: d2,
        cellPaddingInlineSM: d2,
        borderColor: u2,
        headerBorderRadius: p2,
        footerBg: E2,
        footerColor: n2,
        cellFontSize: h2,
        cellFontSizeMD: h2,
        cellFontSizeSM: h2,
        headerSplitColor: u2,
        fixedHeaderSortActiveBg: w2,
        headerFilterHoverBg: l2,
        filterDropdownMenuBg: o2,
        filterDropdownBg: o2,
        expandIconBg: o2,
        selectionColumnWidth: m2,
        stickyScrollBarBg: f2,
        stickyScrollBarBorderRadius: 100,
        expandIconMarginTop: (h2 * b2 - 3 * v2) / 2 - Math.ceil((1.4 * g2 - 3 * v2) / 2),
        headerIconColor: k2
          .clone()
          .setA(k2.a * x2)
          .toRgbString(),
        headerIconHoverColor: N2.clone()
          .setA(N2.a * x2)
          .toRgbString(),
        expandIconHalfInner: I2,
        expandIconSize: B2,
        expandIconScale: C2 / B2,
      };
    },
    { resetFont: !1, unitless: { expandIconScale: !0 } },
  ),
  Rh = [],
  Th = Nt.createContext({}),
  Mh = (e3) => {
    const { ariaProps: t2, component: o2 = "table" } = Nt.useContext(Th);
    return Nt.createElement(o2, { ...t2, ...e3 });
  },
  Ph = (e3, t2) => {
    var o2, n2, r2;
    const {
      prefixCls: l2,
      className: a2,
      rootClassName: i2,
      style: s2,
      classNames: c2,
      styles: d2,
      size: u2,
      bordered: p2,
      dropdownPrefixCls: m2,
      dataSource: g2,
      pagination: b2,
      rowSelection: x2,
      rowKey: C2,
      rowClassName: S2,
      column: E2,
      columns: k2,
      children: N2,
      childrenColumnName: I2,
      onChange: R2,
      getPopupContainer: T2,
      loading: M2,
      expandIcon: L2,
      expandable: O2,
      expandedRowRender: D2,
      expandIconColumnIndex: z2,
      indentSize: H2,
      scroll: j2,
      sortDirections: _2,
      locale: K2,
      showSorterTooltip: W2 = { target: "full-header" },
      virtual: F2,
      title: G2,
      showHeader: q2,
    } = e3;
    Te();
    const V2 = Nt.useMemo(() => k2 || Mp(N2), [k2, N2]),
      X2 = Sm(V2, E2),
      U2 = ll(Nt.useMemo(() => X2.some((e4) => e4.responsive), [X2])),
      Y2 = Nt.useMemo(() => {
        const e4 = new Set(Object.keys(U2).filter((e5) => U2[e5]));
        return X2.filter((t3) => !t3.responsive || t3.responsive.some((t4) => e4.has(t4)));
      }, [X2, U2]),
      Z2 = se(e3, ["className", "style", "column", "columns"]),
      J2 = Z2.components,
      Q2 = w(Z2, { aria: !0 }),
      ee2 = Object.keys(Q2).length > 0,
      te2 = Nt.useMemo(() => {
        var e4;
        return { ariaProps: Q2, component: (e4 = J2?.header) == null ? void 0 : e4.table };
      }, [Q2, (o2 = J2?.header) == null ? void 0 : o2.table]),
      ne2 = Nt.useMemo(
        () => (ee2 ? { ...J2, header: { ...J2?.header, table: Mh } } : J2),
        [J2, ee2],
      ),
      { locale: re2 = $, table: le2 } = Nt.useContext(B),
      {
        getPrefixCls: ae2,
        direction: ue2,
        renderEmpty: pe2,
        getPopupContainer: me2,
        className: fe2,
        style: he2,
        classNames: ge2,
        styles: be2,
      } = oe("table"),
      ve2 = ie((e4) => (u2 === "middle" ? "medium" : (u2 ?? e4))),
      ye2 = { ...e3, size: ve2, bordered: p2 },
      xe2 = ce(he2),
      Ce2 = ce(s2),
      [we2, Se2] = de(
        [ge2, c2],
        [be2, xe2, d2, Ce2],
        { props: ye2 },
        {
          pagination: { _default: "root" },
          header: { _default: "wrapper" },
          body: { _default: "wrapper" },
        },
      ),
      Ee2 = { ...re2.Table, ...K2 },
      [Ne2] = y("global", $.global),
      Ie2 = g2 || Rh,
      Be2 = ae2("table", l2),
      Re2 = ae2("dropdown", m2),
      [, Me2] = A(),
      Pe2 = Nt.useMemo(() => {
        var e4;
        return v(x2)
          ? { columnWidth: (e4 = Me2.Table) == null ? void 0 : e4.selectionColumnWidth, ...x2 }
          : x2;
      }, [x2, (n2 = Me2.Table) == null ? void 0 : n2.selectionColumnWidth]),
      Ae2 = $e(Be2),
      [Le2, Oe2] = Bh(Be2, Ae2),
      De2 = {
        childrenColumnName: I2,
        expandIconColumnIndex: z2,
        ...O2,
        expandIcon: O2?.expandIcon ?? ((r2 = le2?.expandable) == null ? void 0 : r2.expandIcon),
      },
      { childrenColumnName: ze2 = "children" } = De2,
      He2 = Nt.useMemo(
        () => (Ie2.some((e4) => e4?.[ze2]) ? "nest" : D2 || O2?.expandedRowRender ? "row" : null),
        [ze2, Ie2],
      ),
      je2 = { body: Nt.useRef(null) },
      _e2 = (function (e4) {
        return (t3, o3) => {
          const n3 = t3.querySelector(`.${e4}-container`);
          let r3 = o3;
          if (n3) {
            const e5 = getComputedStyle(n3);
            r3 =
              o3 -
              Number.parseInt(e5.borderLeftWidth, 10) -
              Number.parseInt(e5.borderRightWidth, 10);
          }
          return r3;
        };
      })(Be2),
      Ke2 = Nt.useRef(null),
      We2 = Nt.useRef(null);
    ho(t2, () => ({ ...We2.current, nativeElement: Ke2.current }));
    const Fe2 = C2 || le2?.rowKey || "key",
      Ge2 = j2 ?? le2?.scroll,
      qe2 = Nt.useMemo(() => (h(Fe2) ? Fe2 : (e4) => e4?.[Fe2]), [Fe2]),
      [Ve2] = _f(Ie2, ze2, qe2),
      Xe2 = {},
      Ue2 = (e4, t3, o3 = !1) => {
        var n3, r3, l3, a3;
        const i3 = { ...Xe2, ...e4 };
        o3 &&
          ((n3 = Xe2.resetPagination) == null || n3.call(Xe2),
          (r3 = i3.pagination) != null && r3.current && (i3.pagination.current = 1),
          b2 &&
            ((a3 = b2.onChange) == null ||
              a3.call(b2, 1, (l3 = i3.pagination) == null ? void 0 : l3.pageSize))),
          Ge2 &&
            Ge2.scrollToFirstRowOnChange !== !1 &&
            je2.body.current &&
            io(0, { getContainer: () => je2.body.current }),
          R2?.(i3.pagination, i3.filters, i3.sorter, {
            currentDataSource: zf(lh(Ie2, i3.sorterStates, ze2), i3.filterStates, ze2),
            action: t3,
          });
      },
      [Ye2, Ze2, Je2, Qe2] = ah({
        prefixCls: Be2,
        mergedColumns: Y2,
        baseColumns: X2,
        onSorterChange: (e4, t3) => {
          Ue2({ sorter: e4, sorterStates: t3 }, "sort", !1);
        },
        sortDirections: _2 || ["ascend", "descend"],
        tableLocale: Ee2,
        showSorterTooltip: W2,
        globalLocale: Ne2,
      }),
      et2 = Nt.useMemo(() => lh(Ie2, Ze2, ze2), [ze2, Ie2, Ze2]);
    (Xe2.sorter = Qe2()), (Xe2.sorterStates = Ze2);
    const [tt2, ot2, nt2] = jf({
        prefixCls: Be2,
        locale: Ee2,
        dropdownPrefixCls: Re2,
        mergedColumns: Y2,
        baseColumns: X2,
        onFilterChange: (e4, t3) => {
          Ue2({ filters: e4, filterStates: t3 }, "filter", !0);
        },
        getPopupContainer: T2 || me2,
        rootClassName: P(i2, Ae2),
      }),
      rt2 = zf(et2, ot2, ze2);
    (Xe2.filters = nt2), (Xe2.filterStates = ot2);
    const lt2 = wm(Je2, nt2),
      [at2] = ch(lt2),
      [it2, st2] = (function (e4, t3, o3) {
        const { total: n3 = 0, ...r3 } = v(o3) ? o3 : {},
          [l3, a3] = Nt.useState(() => ({
            current: "defaultCurrent" in r3 ? r3.defaultCurrent : 1,
            pageSize: "defaultPageSize" in r3 ? r3.defaultPageSize : Kf,
          })),
          i3 = Wt(l3, r3, { total: n3 > 0 ? n3 : e4 }),
          s3 = Math.ceil((n3 || e4) / i3.pageSize);
        i3.current > s3 && (i3.current = s3 || 1);
        const c3 = (e5, t4) => {
          a3({ current: e5 ?? 1, pageSize: t4 || i3.pageSize });
        };
        return o3 === !1
          ? [{}, () => {}]
          : [
              {
                ...i3,
                onChange: (e5, n4) => {
                  var r4;
                  o3 && ((r4 = o3.onChange) == null || r4.call(o3, e5, n4)),
                    c3(e5, n4),
                    t3(e5, n4 || i3?.pageSize);
                },
              },
              c3,
            ];
      })(
        rt2.length,
        (e4, t3) => {
          Ue2({ pagination: { ...Xe2.pagination, current: e4, pageSize: t3 } }, "paginate");
        },
        b2,
      ),
      ct2 = (e4) => Ct({}, we2.pagination, wt(it2.classNames, e4)),
      dt2 = (e4) => St(wt(it2.styles, e4), Se2.pagination);
    (Xe2.pagination =
      b2 === !1
        ? {}
        : (function (e4, t3) {
            const o3 = { current: e4.current, pageSize: e4.pageSize },
              n3 = v(t3) ? t3 : {};
            return (
              Object.keys(n3).forEach((t4) => {
                const n4 = e4[t4];
                h(n4) || (o3[t4] = n4);
              }),
              o3
            );
          })(it2, b2)),
      (Xe2.resetPagination = st2);
    const ut2 = Nt.useMemo(() => {
        if (b2 === !1 || !it2.pageSize) return rt2;
        const { current: e4 = 1, total: t3, pageSize: o3 = Kf } = it2;
        return rt2.length < t3
          ? rt2.length > o3
            ? rt2.slice((e4 - 1) * o3, e4 * o3)
            : rt2
          : rt2.slice((e4 - 1) * o3, e4 * o3);
      }, [!!b2, rt2, it2?.current, it2?.pageSize, it2?.total]),
      [pt2, mt2] = xm(
        {
          prefixCls: Be2,
          data: rt2,
          pageData: ut2,
          getRowKey: qe2,
          getRecordByKey: Ve2,
          expandType: He2,
          childrenColumnName: ze2,
          locale: Ee2,
          getPopupContainer: T2 || me2,
        },
        Pe2,
      );
    (De2.__PARENT_RENDER_ICON__ = De2.expandIcon),
      (De2.expandIcon =
        De2.expandIcon ||
        L2 ||
        (function (e4) {
          return (t3) => {
            const { prefixCls: o3, onExpand: n3, record: r3, expanded: l3, expandable: a3 } = t3,
              i3 = `${o3}-row-expand-icon`;
            return Nt.createElement("button", {
              type: "button",
              onClick: (e5) => {
                n3(r3, e5), e5.stopPropagation();
              },
              className: P(i3, {
                [`${i3}-spaced`]: !a3,
                [`${i3}-expanded`]: a3 && l3,
                [`${i3}-collapsed`]: a3 && !l3,
              }),
              "aria-label": l3 ? e4.collapse : e4.expand,
              "aria-expanded": l3,
            });
          };
        })(Ee2)),
      He2 === "nest" && De2.expandIconColumnIndex === void 0
        ? (De2.expandIconColumnIndex = Pe2 ? 1 : 0)
        : De2.expandIconColumnIndex > 0 && Pe2 && (De2.expandIconColumnIndex -= 1),
      f(De2.indentSize) || (De2.indentSize = f(H2) ? H2 : 15);
    const ft2 = Nt.useCallback((e4) => at2(pt2(tt2(Ye2(e4)))), [Ye2, tt2, pt2]);
    let ht2, gt2;
    if (b2 !== !1 && it2?.total) {
      const e4 = ((e5, t4) => e5 || (t4 === "small" || t4 === "medium" ? "small" : void 0))(
          it2.size,
          ve2,
        ),
        t3 = (t4 = "end") =>
          Nt.createElement(xu, {
            ...it2,
            classNames: ct2,
            styles: dt2,
            className: P(`${Be2}-pagination`, `${Be2}-pagination-${t4}`, it2.className),
            size: e4,
          }),
        { placement: o3, position: n3 } = it2,
        r3 = o3 ?? n3;
      if (Array.isArray(r3)) {
        const [e5, o4] = ["top", "bottom"].map((e6) => r3.find((t4) => t4.includes(e6))),
          n4 = r3.every((e6) => `${e6}` == "none");
        e5 || o4 || n4 || (gt2 = t3()), e5 && (ht2 = t3(Im(e5))), o4 && (gt2 = t3(Im(o4)));
      } else gt2 = t3();
    }
    const bt2 = ih(M2),
      vt2 = P(
        Oe2,
        Ae2,
        `${Be2}-wrapper`,
        fe2,
        { [`${Be2}-wrapper-rtl`]: ue2 === "rtl" },
        a2,
        i2,
        we2.root,
        Le2,
      ),
      yt2 = Nt.useMemo(
        () =>
          bt2?.spinning && Ie2 === Rh
            ? null
            : K2?.emptyText !== void 0
              ? K2.emptyText
              : pe2?.("Table") || Nt.createElement(xt, { componentName: "Table" }),
        [bt2?.spinning, Ie2, K2?.emptyText, pe2],
      ),
      $t2 = F2 ? uh : dh,
      Et2 = {},
      kt2 = Nt.useMemo(() => {
        const {
            fontSize: e4,
            lineHeight: t3,
            lineWidth: o3,
            padding: n3,
            paddingXS: r3,
            paddingSM: l3,
          } = Me2,
          a3 = Math.floor(e4 * t3);
        switch (ve2) {
          case "medium":
            return 2 * l3 + a3 + o3;
          case "small":
            return 2 * r3 + a3 + o3;
          default:
            return 2 * n3 + a3 + o3;
        }
      }, [Me2, ve2]);
    return (
      F2 && (Et2.listItemHeight = kt2),
      Nt.createElement(
        "div",
        { ref: Ke2, className: vt2, style: Se2.root },
        Nt.createElement(
          Ou,
          { spinning: !1, ...bt2 },
          ht2,
          Nt.createElement(
            Th.Provider,
            { value: te2 },
            Nt.createElement($t2, {
              ...Et2,
              ...Z2,
              components: ne2,
              scroll: Ge2,
              classNames: we2,
              styles: Se2,
              ref: We2,
              columns: Y2,
              direction: ue2,
              expandable: De2,
              prefixCls: Be2,
              className: P(
                {
                  [`${Be2}-medium`]: ve2 === "medium",
                  [`${Be2}-small`]: ve2 === "small",
                  [`${Be2}-bordered`]: p2,
                  [`${Be2}-empty`]: Ie2.length === 0,
                  [`${Be2}-no-header`]: !G2 && q2 === !1,
                },
                Oe2,
                Ae2,
                Le2,
              ),
              data: ut2,
              rowKey: qe2,
              rowClassName: (e4, t3, o3) =>
                P({ [`${Be2}-row-selected`]: mt2.has(qe2(e4, t3)) }, h(S2) ? S2(e4, t3, o3) : S2),
              emptyText: yt2,
              internalHooks: Ku,
              internalRefs: je2,
              transformColumns: ft2,
              getContainerWidth: _e2,
              measureRowRender: (e4) =>
                Nt.createElement(
                  xl.Provider,
                  { value: !0 },
                  Nt.createElement(ke, { getPopupContainer: (e5) => e5 }, e4),
                ),
            }),
          ),
          gt2,
        ),
      )
    );
  },
  Ah = Nt.forwardRef(Ph),
  Lh = (e3, t2) => {
    const o2 = Nt.useRef(0);
    return (o2.current += 1), Nt.createElement(Ah, { ...e3, ref: t2, _renderTimes: o2.current });
  },
  Oh = Nt.forwardRef(Lh);
(Oh.SELECTION_COLUMN = hm),
  (Oh.EXPAND_COLUMN = _u),
  (Oh.SELECTION_ALL = gm),
  (Oh.SELECTION_INVERT = bm),
  (Oh.SELECTION_NONE = vm),
  (Oh.Column = mm),
  (Oh.ColumnGroup = fm),
  (Oh.Summary = dp);
const Dh = Oh,
  zh = class e2 {
    static calculateCRC8(e3) {
      let t2 = 0;
      for (let o2 of e3) {
        t2 ^= o2;
        for (let e4 = 0; e4 < 8; e4++) 128 & t2 ? (t2 = (t2 << 1) ^ 7) : (t2 <<= 1), (t2 &= 255);
      }
      return t2;
    }
    static encode(t2, o2 = e2.CMD_HELLO, n2 = !0) {
      let r2, l2, a2;
      if (t2 === "Hello" || o2 === e2.CMD_HELLO) {
        (r2 = new Uint8Array(e2.FRAME_SIZE)),
          (r2[0] = e2.HEAD),
          (r2[1] = e2.CMD_HELLO),
          (r2[2] = 13);
        const t3 = Math.floor(Date.now() / 1e3) + 28800;
        (r2[3] = 255 & t3),
          (r2[4] = (t3 >> 8) & 255),
          (r2[5] = (t3 >> 16) & 255),
          (r2[6] = (t3 >> 24) & 255);
        const o3 = "xiaomi-pb",
          l3 = new TextEncoder().encode(o3);
        r2.set(l3, 7);
        for (let e3 = l3.length; e3 < 9; e3++) r2[7 + e3] = 0;
        const a3 = r2.subarray(0, 16),
          i2 = e2.calculateCRC8(a3);
        if (((r2[16] = i2), !n2)) return r2.subarray(0, 17);
      } else {
        (r2 = new Uint8Array(e2.FRAME_SIZE)),
          (r2[0] = e2.HEAD),
          (r2[1] = o2),
          (l2 = new TextEncoder().encode(t2)),
          (a2 = Math.min(l2.length, 28)),
          (r2[2] = a2),
          r2.set(l2.subarray(0, a2), 3);
        const n3 = r2.subarray(0, 3 + a2),
          i2 = e2.calculateCRC8(n3);
        r2[3 + a2] = i2;
      }
      return r2;
    }
    static decode(t2, o2 = !1) {
      if (t2.length < 4)
        throw new Error(
          `\u5E27\u957F\u5EA6\u9519\u8BEF\uFF0C\u81F3\u5C11\u9700\u89814\u5B57\u8282\uFF0C\u5B9E\u9645${t2.length}\u5B57\u8282`,
        );
      if (t2[0] !== e2.HEAD)
        throw new Error(
          `\u5E27\u5934\u9519\u8BEF\uFF0C\u671F\u671B0xA5\uFF0C\u5B9E\u9645${t2[0].toString(16)}`,
        );
      const n2 = t2[1],
        r2 = t2[2],
        l2 = t2.length - 4,
        a2 = t2.length - 4;
      if (r2 > l2 && r2 > a2)
        throw new Error(
          `\u6570\u636E\u957F\u5EA6\u9519\u8BEF\uFF0C\u6700\u5927\u5141\u8BB8${a2}\u5B57\u8282\uFF0C\u5B9E\u9645${r2}\u5B57\u8282`,
        );
      const i2 = Math.min(r2, a2),
        s2 = t2.subarray(3, 3 + i2),
        c2 = t2[3 + i2],
        d2 = t2.subarray(0, 3 + i2),
        u2 = e2.calculateCRC8(d2);
      if (!o2 && c2 !== u2)
        throw new Error(
          `CRC\u6821\u9A8C\u5931\u8D25\uFF0C\u63A5\u6536${c2.toString(16)}\uFF0C\u8BA1\u7B97${u2.toString(16)}`,
        );
      let p2;
      switch (n2) {
        case e2.CMD_HELLO:
          p2 = { timestamp: s2.subarray(0, 4), magicNumber: s2[4] };
          break;
        case e2.CMD_ECHO:
          try {
            const e3 = Array.from(s2.subarray(0, Math.min(8, s2.length)))
                .filter((e4) => e4 >= 32 && e4 <= 126)
                .map((e4) => String.fromCharCode(e4))
                .join(""),
              t3 = 8,
              o3 = Math.min(15, s2.length),
              n3 = Array.from(s2.subarray(t3, o3))
                .filter((e4) => e4 >= 32 && e4 <= 126)
                .map((e4) => String.fromCharCode(e4))
                .join(""),
              r3 = s2.length > 15 ? s2[15] : null;
            p2 = {
              deviceName: e3,
              serialNumber: n3,
              status: { status1: r3, status2: s2.length > 16 ? s2[16] : null },
              raw: Array.from(s2),
            };
          } catch {
            p2 = new TextDecoder().decode(s2);
          }
          break;
        case e2.CMD_STATUS:
          p2 = e2.decodeStatusPayload(s2);
          break;
        case e2.CMD_BATTERY:
          p2 = e2.decodeBatteryPayload(s2);
          break;
        default:
          try {
            p2 = new TextDecoder().decode(s2);
          } catch {
            p2 = Array.from(s2);
          }
      }
      return {
        cmd: n2,
        payload: p2,
        isValid: !0,
        frameType: t2.length === e2.FRAME_SIZE ? "fixed" : "variable",
      };
    }
    static decodeStatusPayload(e3) {
      return {
        deviceInfo: Array.from(e3.subarray(0, 8)),
        batteryStatus: Array.from(e3.subarray(8, 12)),
        temperature: Array.from(e3.subarray(12, 14)),
        rawData: Array.from(e3),
      };
    }
    static decodeBatteryPayload(e3) {
      if (e3.length < 18)
        return {
          error: "\u7535\u6C60\u6570\u636E\u957F\u5EA6\u4E0D\u8DB3",
          rawData: Array.from(e3),
        };
      const t2 = e3[0],
        o2 = e3[1],
        n2 = (e3[3] << 8) | e3[2],
        r2 = (e3[5] << 8) | e3[4],
        l2 = e3[6];
      return {
        title: "\u7535\u6C60\u7EC4\u4FE1\u606F",
        status: { code: t2, description: t2 === 0 ? "\u6210\u529F" : "\u5931\u8D25" },
        activateStatus: {
          code: o2,
          description: o2 === 0 ? "\u672A\u6FC0\u6D3B" : o2 === 1 ? "\u6FC0\u6D3B" : "\u4FDD\u7559",
        },
        cycleCount: n2,
        batteryHealth: r2,
        chargeErrorNow: {
          code: l2,
          description:
            l2 === 0
              ? "\u6B63\u5E38"
              : l2 === 1
                ? "\u6E29\u5EA6\u5F02\u5E38"
                : l2 === 2
                  ? "\u7535\u538B\u5F02\u5E38"
                  : l2 === 3
                    ? "\u7535\u6D41\u5F02\u5E38"
                    : "--",
        },
        errorValue: e3[7],
        historyErrorCount: (e3[9] << 8) | e3[8],
        batterySeriesParallel: e3[10],
        batteryLevel: e3[11],
        batteryTemperature: e3[12] > 127 ? e3[12] - 256 : e3[12],
        batteryVoltage: (e3[14] << 8) | e3[13],
        batteryCurrent: (e3[16] << 8) | e3[15],
        rawData: Array.from(e3),
      };
    }
    static extractFrames(t2) {
      const o2 = [];
      let n2 = 0;
      for (; n2 < t2.length; )
        if (t2[n2] === e2.HEAD) {
          if (!(n2 + 3 <= t2.length)) break;
          {
            const e3 = 3 + t2[n2 + 2] + 1;
            if (!(n2 + e3 <= t2.length)) break;
            {
              const r2 = t2.subarray(n2, n2 + e3);
              o2.push(r2), (n2 += e3);
            }
          }
        } else n2++;
      return { frames: o2, remaining: t2.subarray(n2) };
    }
    static frameToHexString(e3) {
      return Array.from(e3)
        .map((e4) => e4.toString(16).padStart(2, "0"))
        .join(" ");
    }
    static hexStringToFrame(e3) {
      const t2 = e3
        .replace(/\s+/g, "")
        .match(/.{1,2}/g)
        .map((e4) => parseInt(e4, 16));
      return new Uint8Array(t2);
    }
  };
o(zh, "FRAME_SIZE", 32),
  o(zh, "HEAD", 165),
  o(zh, "CMD_HELLO", 0),
  o(zh, "CMD_ECHO", 16),
  o(zh, "CMD_STATUS", 3),
  o(zh, "CMD_BATTERY", 17);
let Hh = zh;
typeof window < "u" && (window.ProtocolHandler = Hh);
const jh = {
  HEAD: 165,
  FRAME_SIZE: 32,
  CMD_HELLO: 16,
  CMD_GET_BATTERY_INFO: 1,
  CMD_GET_CELL_STATUS: 2,
  CMD_GET_HISTORY: 3,
  CMD_GET_BATTERY_ID: 4,
  CMD_DISCONNECT: 5,
  CMD_ENABLE_QI2: 6,
  CMD_ENABLE_QI2_RESPONSE: 22,
  CMD_GET_QI2_STATUS: 7,
  CMD_GET_QI2_STATUS_RESPONSE: 23,
  CMD_HEARTBEAT: 10,
  CMD_BATTERY_RESPONSE: 17,
  CMD_GET_CELL_STATUS_RESPONSE: 18,
  CMD_GET_HISTORY_RESPONSE: 19,
  CMD_GET_BATTERY_ID_RESPONSE: 20,
  CMD_GET_CELL_TEMP_MODEL: 8,
  CMD_GET_CELL_TEMP_MODEL_RESPONSE: 24,
  CMD_SET_QI2_ENCRYPTED: 230,
  CMD_SET_QI2_ENCRYPTED_RESPONSE: 246,
  BATTERY_STATUS: { SUCCESS: 0, FAILURE: 1 },
  ACTIVATE_STATUS: { INACTIVE: 0, ACTIVE: 1 },
  CHARGE_ERROR: { NORMAL: 0, TEMP_ERROR: 1, VOLTAGE_ERROR: 2, CURRENT_ERROR: 3 },
  FAULTS: {
    0: { code: 0, description: "\u6B63\u5E38", nameKey: "normal" },
    1: { code: 1, description: "\u7535\u6C60\u8FC7\u538B", nameKey: "exception_cell_over_voltage" },
    2: {
      code: 2,
      description: "\u7535\u6C60\u6B20\u538B",
      nameKey: "exception_cell_under_voltage",
    },
    3: {
      code: 3,
      description: "\u653E\u7535\u9AD8\u6E29",
      nameKey: "exception_discharge_high_temp",
    },
    4: {
      code: 4,
      description: "\u653E\u7535\u4F4E\u6E29",
      nameKey: "exception_discharge_low_temp",
    },
    5: { code: 5, description: "\u5145\u7535\u9AD8\u6E29", nameKey: "exception_charge_high_temp" },
    6: { code: 6, description: "\u5145\u7535\u4F4E\u6E29", nameKey: "exception_charge_low_temp" },
    7: { code: 7, description: "\u77ED\u8DEF\u5F02\u5E38", nameKey: "exception_short_circuit" },
    8: { code: 8, description: "MOS\u5F02\u5E38", nameKey: "exception_mos" },
    9: { code: 9, description: "AFE\u5F02\u5E38", nameKey: "exception_afe" },
  },
};
const __qlog = {
  on: true,
  seq: 0,
  lines: [],
  subs: new Set(),
  setEnabled(v) {
    this.on = !!v;
    this.emit();
  },
  clear() {
    this.lines = [];
    this.emit();
  },
  emit() {
    this.subs.forEach((fn) => {
      try {
        fn();
      } catch (e) {}
    });
  },
  sub(fn) {
    this.subs.add(fn);
    return () => this.subs.delete(fn);
  },
  hex(u8) {
    try {
      return Array.from(u8)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")
        .toUpperCase();
    } catch (e) {
      return "";
    }
  },
  push(kind, label, hex, extra) {
    if (!this.on) return;
    this.seq += 1;
    const entry = {
      seq: this.seq,
      t: new Date().toISOString(),
      kind,
      label: String(label || ""),
      hex: String(hex || ""),
      extra: extra || null,
    };
    this.lines.push(entry);
    try {
      console.log("[QI2] " + kind + " #" + entry.seq + " " + entry.label + (extra ? " " + JSON.stringify(extra) : "") + "\n" + entry.hex);
    } catch (e) {}
    if (this.lines.length > 400) this.lines.splice(0, this.lines.length - 400);
    this.emit();
  },
  dump() {
    return this.lines.slice(-120).map((e) => ({
      seq: e.seq,
      t: e.t,
      kind: e.kind,
      label: e.label,
      hex: e.hex,
      extra: e.extra,
    }));
  },
  text() {
    const head = [
      "mirror-mieco QI 2.2 diagnostic log",
      "generated: " + new Date().toISOString(),
      "ua: " + (navigator.userAgent || ""),
      "entries: " + this.lines.length,
      "",
    ];
    const body = this.lines.map((e) => {
      const extra = e.extra ? " " + JSON.stringify(e.extra) : "";
      return "#" + e.seq + " [" + e.t + "] " + e.kind + " " + e.label + extra + "\n  " + e.hex;
    });
    return head.concat(body).join("\n");
  },
};
class _h {
  constructor(e3) {
    this.log = e3 || console.log;
  }
  async sendCommand(e3, t2, o2) {
    if (!e3 || !e3.opened) return void this.log("\u8BBE\u5907\u672A\u8FDE\u63A5");
    try {
      const n2 = Array.from(t2)
          .map((e4) => e4.toString(16).padStart(2, "0"))
          .join("")
          .toUpperCase(),
        r2 =
          (new Date(new Date().getTime() + 288e5).toISOString().replace("Z", "+08:00"),
          new Uint8Array(jh.FRAME_SIZE));
      r2.set(t2);
      const l2 = Array.from(r2)
        .map((e4) => e4.toString(16).padStart(2, "0"))
        .join("")
        .toUpperCase();
      await e3.sendReport(0, r2), __qlog.push("TX", o2, l2, { rawBytes: t2.length, reportBytes: r2.length }), this.log(`\u27A1 \u5DF2\u53D1\u9001${o2}:`, n2);
    } catch (n2) {
      n2.name,
        n2.message,
        n2.stack,
        this.log(`\u274C \u53D1\u9001${o2}\u5931\u8D25:`, n2.message || n2);
    }
  }
  buildCrcCommand(e3, t2 = new Uint8Array(0)) {
    const o2 = jh.HEAD,
      n2 = t2.length,
      r2 = new Uint8Array([o2, e3, n2, ...t2]),
      l2 = Hh.calculateCRC8(r2);
    return new Uint8Array([...r2, l2]);
  }
  async sendHelloCommand(e3) {
    const t2 = Hh.encode("Hello", Hh.CMD_HELLO);
    await this.sendCommand(e3, t2, "Hello\u547D\u4EE4");
  }
  async sendBatteryInfoCommand(e3) {
    const t2 = this.buildCrcCommand(jh.CMD_GET_BATTERY_INFO);
    await this.sendCommand(e3, t2, "\u7535\u6C60\u7EC4\u4FE1\u606F\u547D\u4EE4");
  }
  async sendBatteryIdCommand(e3, t2 = 1) {
    const o2 = new Uint8Array([t2]),
      n2 = this.buildCrcCommand(jh.CMD_GET_BATTERY_ID, o2);
    await this.sendCommand(e3, n2, `\u7535\u6C60\u7F16\u53F7\u547D\u4EE4(\u7535\u82AF${t2})`);
  }
  async sendHeartbeatCommand(e3) {
    const t2 = new Uint8Array([1]),
      o2 = this.buildCrcCommand(jh.CMD_HEARTBEAT, t2);
    await this.sendCommand(e3, o2, "\u5FC3\u8DF3\u5305");
  }
  async sendGetCellTempModelCommand(e3) {
    const t2 = this.buildCrcCommand(jh.CMD_GET_CELL_TEMP_MODEL);
    await this.sendCommand(
      e3,
      t2,
      "\u7535\u82AF\u6E29\u5EA6\u9608\u503C\u4E0E\u578B\u53F7\u67E5\u8BE2",
    );
  }
  async sendEnableQI2Command(e3, t2) {
    const o2 = new Uint8Array([t2 ? 1 : 0]),
      n2 = this.buildCrcCommand(jh.CMD_ENABLE_QI2, o2);
    await this.sendCommand(e3, n2, t2 ? "\u5F00\u542FQI2.2" : "\u5173\u95EDQI2.2");
  }
  async sendGetQI2StatusCommand(e3) {
    const t2 = this.buildCrcCommand(jh.CMD_GET_QI2_STATUS);
    await this.sendCommand(e3, t2, "\u67E5\u8BE2QI2.2\u72B6\u6001");
  }
  async sendEncryptedQi2Command(e3, t2) {
    const o2 = this.buildCrcCommand(jh.CMD_SET_QI2_ENCRYPTED, t2);
    await this.sendCommand(e3, o2, "\u8BBE\u7F6EQI2.2\uFF08\u52A0\u5BC6\uFF09");
  }
  async sendCustomCommand(e3, t2, o2, n2) {
    const r2 = this.buildCrcCommand(t2, o2);
    await this.sendCommand(e3, r2, n2);
  }
  async sendHexCommand(e3, t2) {
    if (!e3 || !e3.opened) return void this.log("\u8BBE\u5907\u672A\u8FDE\u63A5");
    try {
      const o2 = new Uint8Array(t2.match(/.{1,2}/g).map((e4) => parseInt(e4, 16))),
        n2 =
          (new Date(new Date().getTime() + 288e5).toISOString().replace("Z", "+08:00"),
          o2.length,
          new Uint8Array(32));
      n2.set(o2);
      const r2 = Array.from(n2)
        .map((e4) => e4.toString(16).padStart(2, "0"))
        .join("")
        .toUpperCase();
      await e3.sendReport(0, n2), __qlog.push("TX", "\u81EA\u5B9A\u4E49\u6307\u4EE4", r2, { rawBytes: o2.length, reportBytes: n2.length }), this.log("\u27A1 \u5DF2\u53D1\u9001:", t2);
    } catch (o2) {
      o2.name, o2.message, o2.stack, this.log("\u274C \u53D1\u9001\u5931\u8D25:", o2.message || o2);
    }
  }
}
class Kh {
  constructor() {
    o(this, "faultCodeMap", {
      0: { hex: 0, name: "\u6B63\u5E38\u72B6\u6001 (\u65E0\u6545\u969C)", abbreviation: "" },
      1: { hex: 1, name: "\u7535\u6C60\u8FC7\u538B", abbreviation: "OV" },
      2: { hex: 2, name: "\u7535\u6C60\u6B20\u538B", abbreviation: "UV" },
      3: { hex: 3, name: "\u8FC7\u6E29", abbreviation: "OT" },
      4: { hex: 4, name: "\u4F4E\u6E29", abbreviation: "UT" },
      5: { hex: 5, name: "\u8FC7\u6D41", abbreviation: "OC" },
      6: { hex: 6, name: "\u77ED\u8DEF", abbreviation: "SC" },
      7: { hex: 7, name: "\u7535\u82AF\u538B\u5DEE\u5F02\u5E38", abbreviation: "" },
    });
  }
  parseProtocol(e3) {
    if (e3.length < 4) return { error: "\u6570\u636E\u957F\u5EA6\u4E0D\u8DB3" };
    const t2 = e3[0],
      o2 = e3[1],
      n2 = e3[2];
    if (e3.length < n2 + 3)
      return { error: "LEN \u4E0E\u5B9E\u9645\u957F\u5EA6\u4E0D\u5339\u914D" };
    const r2 = e3.slice(3, 3 + n2),
      l2 = e3[3 + n2];
    return {
      frameHead: `0x${t2.toString(16).toUpperCase()}`,
      command: `0x${o2.toString(16).padStart(2, "0").toUpperCase()}`,
      dataLength: n2,
      payloadHex: Array.from(r2).map((e4) => e4.toString(16).padStart(2, "0").toUpperCase()),
      payloadAscii: Array.from(r2)
        .map((e4) => (e4 >= 32 && e4 <= 126 ? String.fromCharCode(e4) : "."))
        .join(""),
      checksum: `0x${l2.toString(16).toUpperCase()}`,
    };
  }
  translateToUserView(e3, t2 = {}) {
    if (e3.error) return { message: e3.error };
    switch (e3.command) {
      case "0xFE":
        return {
          title: "\u8BBE\u5907\u56DE\u663E",
          echo: !0,
          error: "\u8BBE\u5907\u4EE5\u56DE\u663E\u65B9\u5F0F\u5E94\u7B54\uFF080xFE\uFF09\uFF0C\u672A\u8FD4\u56DE\u8BBE\u5907\u4FE1\u606F",
          rawData: (e3.payloadHex || []).join(" "),
        };
      case `0x${jh.CMD_HELLO.toString(16).padStart(2, "0")}`:
        return this.decodeHelloResponse(e3);
      case `0x${jh.CMD_BATTERY_RESPONSE.toString(16).padStart(2, "0")}`:
        return this.decodeBatteryInfo(e3);
      case `0x${jh.CMD_GET_CELL_STATUS_RESPONSE.toString(16).padStart(2, "0")}`:
        return this.decodeCellStatusResponse(e3);
      case `0x${jh.CMD_GET_HISTORY_RESPONSE.toString(16).padStart(2, "0")}`: {
        const o2 = t2.deviceModel || "";
        return this.decodeHistoryResponse(e3, o2);
      }
      case `0x${jh.CMD_GET_BATTERY_ID_RESPONSE.toString(16).padStart(2, "0")}`:
        return this.decodeBatteryIdResponse(e3);
      case `0x${jh.CMD_GET_CELL_TEMP_MODEL_RESPONSE.toString(16).padStart(2, "0")}`:
        return this.decodeCellTempModelResponse(e3);
      case `0x${jh.CMD_SET_QI2_ENCRYPTED_RESPONSE.toString(16).padStart(2, "0")}`:
        return this.decodeEnableQI2Response(e3);
      case `0x${jh.CMD_ENABLE_QI2_RESPONSE.toString(16).padStart(2, "0")}`:
        return this.decodeEnableQI2Response(e3);
      case `0x${jh.CMD_GET_QI2_STATUS_RESPONSE.toString(16).padStart(2, "0")}`:
        return this.decodeGetQI2StatusResponse(e3);
      default:
        return { title: "--", command: e3.command };
    }
  }
  decodeEnableQI2Response(e3) {
    try {
      const t2 = new Uint8Array(e3.payloadHex.map((e4) => parseInt(e4, 16)));
      if (t2.length < 1)
        throw new Error("QI2.2\u4F7F\u80FD\u54CD\u5E94\u6570\u636E\u957F\u5EA6\u4E0D\u8DB3");
      const o2 = t2[0],
        n2 = o2 === 0;
      return {
        title: "QI2.2\u4F7F\u80FD\u54CD\u5E94",
        success: n2,
        status: o2,
        description: n2 ? "\u8BBE\u7F6E\u6210\u529F" : "\u8BBE\u7F6E\u5931\u8D25",
      };
    } catch (t2) {
      return {
        title: "QI2.2\u4F7F\u80FD\u54CD\u5E94",
        error: t2.message,
        rawData: e3.payloadHex.join(" "),
      };
    }
  }
  decodeGetQI2StatusResponse(e3) {
    try {
      const t2 = new Uint8Array(e3.payloadHex.map((e4) => parseInt(e4, 16)));
      if (t2.length < 2)
        throw new Error(
          "QI2.2\u72B6\u6001\u67E5\u8BE2\u54CD\u5E94\u6570\u636E\u957F\u5EA6\u4E0D\u8DB3",
        );
      const o2 = t2[0],
        n2 = t2[1],
        r2 = o2 === 0,
        l2 = n2 === 1;
      return {
        title: "QI2.2\u72B6\u6001\u67E5\u8BE2\u54CD\u5E94",
        success: r2,
        status: o2,
        isEnabled: l2,
        description: r2
          ? l2
            ? "\u5DF2\u5F00\u542F"
            : "\u672A\u5F00\u542F"
          : "\u67E5\u8BE2\u5931\u8D25",
      };
    } catch (t2) {
      return {
        title: "QI2.2\u72B6\u6001\u67E5\u8BE2\u54CD\u5E94",
        error: t2.message,
        rawData: e3.payloadHex.join(" "),
      };
    }
  }
  decodeCellTempModelResponse(e3) {
    try {
      const t2 = new Uint8Array(e3.payloadHex.map((e4) => parseInt(e4, 16)));
      if (t2.length < 5)
        throw new Error(
          "\u7535\u82AF\u6E29\u5EA6\u9608\u503C\u4E0E\u578B\u53F7\u54CD\u5E94\u6570\u636E\u957F\u5EA6\u4E0D\u8DB3",
        );
      const o2 = t2[0],
        n2 = o2 === 0,
        r2 = t2[1] | (t2[2] << 8),
        l2 = r2 > 32767 ? r2 - 65536 : r2,
        a2 = t2[3] | (t2[4] << 8),
        i2 = a2 > 32767 ? a2 - 65536 : a2,
        s2 = Array.from(t2.subarray(5))
          .filter((e4) => e4 !== 0)
          .map((e4) => String.fromCharCode(e4))
          .join("");
      return {
        title: "\u7535\u82AF\u6E29\u5EA6\u9608\u503C\u4E0E\u578B\u53F7\u67E5\u8BE2\u54CD\u5E94",
        success: n2,
        status: o2,
        highTempThreshold: l2,
        lowTempThreshold: i2,
        tempRange: `${i2}\u2103~${l2}\u2103`,
        batteryModel: s2,
        description: n2 ? `${s2} (${i2}\u2103~${l2}\u2103)` : "\u67E5\u8BE2\u5931\u8D25",
      };
    } catch (t2) {
      return {
        title: "\u7535\u82AF\u6E29\u5EA6\u9608\u503C\u4E0E\u578B\u53F7\u67E5\u8BE2\u54CD\u5E94",
        error: t2.message,
        rawData: e3.payloadHex.join(" "),
      };
    }
  }
  decodeHelloResponse(e3) {
    try {
      const t2 = new Uint8Array(e3.payloadHex.map((e4) => parseInt(e4, 16)));
      if (t2.length < 23)
        throw new Error("Hello\u547D\u4EE4\u54CD\u5E94\u6570\u636E\u957F\u5EA6\u4E0D\u8DB3");
      const o2 = t2.subarray(0, 2),
        n2 = Array.from(o2)
          .map((e4) => e4.toString(16).toUpperCase().padStart(2, "0"))
          .join(""),
        r2 = this.convertHexToLittleEndian(n2),
        l2 = t2.subarray(2, 22),
        a2 = Array.from(l2)
          .filter((e4) => e4 !== 0)
          .map((e4) => String.fromCharCode(e4))
          .join(""),
        snBytes = new Uint8Array(l2),
        i2 = t2.length > 23 ? t2[t2.length - 1] : t2[22];
      let s2 = "--";
      switch (i2) {
        case 0:
          s2 = "\u7A7A\u95F2";
          break;
        case 1:
          s2 = "\u5145\u7535";
          break;
        case 2:
          s2 = "\u653E\u7535";
          break;
        default:
          s2 = "--";
      }
      const c2 = Rt(r2.value);
      const _idNum = parseInt(String(r2.value), 10);
      const _idHex = Number.isFinite(_idNum) ? _idNum.toString(16).toUpperCase().padStart(2, "0") : String(r2.value).toUpperCase();
      return {
        title: "\u8BBE\u5907\u72B6\u6001\u54CD\u5E94",
        name: c2?.name || (W2 === "en" ? "Xiaomi Power Bank (ID " + _idHex + ")" : "\u5C0F\u7C73\u5145\u7535\u5B9D\uFF08\u578B\u53F7 " + _idHex + "\uFF09"),
        deviceModel: c2?.model || ("ID_" + _idHex),
        deviceModelDecimal: n2,
        deviceModelId: r2.value,
        deviceModelKnown: !!c2,
        deviceModelInfo: c2,
        sn: a2,
        snBytes: snBytes,
        chargingStatus: { code: i2, description: s2 },
      };
    } catch (t2) {
      return {
        title: "Hello\u547D\u4EE4\u54CD\u5E94",
        error: t2.message,
        rawData: e3.payloadHex.join(" "),
      };
    }
  }
  decodeBatteryInfo(e3) {
    try {
      const t2 = new Uint8Array(e3.payloadHex.map((e4) => parseInt(e4, 16))),
        o2 = this.decodeBatteryPayload(t2);
      return this.logBatteryInfo(e3, o2), o2;
    } catch (t2) {
      return {
        title: "\u7535\u6C60\u4FE1\u606F\u54CD\u5E94",
        error: t2.message,
        rawData: e3.payloadHex.join(" "),
      };
    }
  }
  decodeBatteryPayload(e3) {
    const t2 = e3[0],
      o2 = {
        code: t2,
        description: t2 === jh.BATTERY_STATUS.SUCCESS ? "\u6210\u529F" : "\u5931\u8D25",
      },
      n2 = e3[1],
      r2 = {
        code: n2,
        description:
          n2 === jh.ACTIVATE_STATUS.INACTIVE
            ? "\u672A\u6FC0\u6D3B"
            : n2 === jh.ACTIVATE_STATUS.ACTIVE
              ? "\u6FC0\u6D3B"
              : "\u4FDD\u7559",
      },
      l2 = (e3[3] << 8) | e3[2],
      a2 = (e3[5] << 8) | e3[4],
      i2 = e3[6],
      s2 = (i2 >> 6) & 3,
      c2 = 63 & i2;
    let d2 = "";
    s2 === 0
      ? (d2 = "\u653E\u7535")
      : s2 === 1
        ? (d2 = "\u5145\u7535")
        : s2 === 2 && (d2 = "\u7A7A\u95F2");
    const u2 = {
        code: i2,
        chgState: s2,
        faultType: c2,
        description: `\u72B6\u6001:${d2}, \u6545\u969C\u7801:${c2}`,
      },
      p2 = (e3[8] << 8) | e3[7],
      m2 = (e3[10] << 8) | e3[9],
      f2 = e3[11],
      h2 = (f2 >> 4) & 15,
      g2 = 15 & f2,
      b2 = (h2 === 0 && f2 !== 0 ? 1 : h2) * (g2 === 0 && f2 !== 0 ? 1 : g2),
      v2 = e3[12];
    let y2 = e3[13];
    return (
      y2 > 127 && (y2 -= 256),
      {
        status: o2,
        activateStatus: r2,
        cycleCount: l2,
        batteryHealth: a2,
        chargeErrorNow: u2,
        errorValue: p2,
        historyErrorCount: m2,
        batterySeriesParallel: f2,
        cellCount: b2,
        batteryLevel: v2,
        batteryTemperature: y2,
        batteryVoltage: (e3[15] << 8) | e3[14],
        batteryCurrent: ((e3[17] << 8) | e3[16]) > 32767 ? ((e3[17] << 8) | e3[16]) - 65536 : (e3[17] << 8) | e3[16],
      }
    );
  }
  getChargeErrorDescription(e3) {
    switch (e3) {
      case jh.CHARGE_ERROR.NORMAL:
        return "\u6B63\u5E38";
      case jh.CHARGE_ERROR.TEMP_ERROR:
        return "\u6E29\u5EA6\u5F02\u5E38";
      case jh.CHARGE_ERROR.VOLTAGE_ERROR:
        return "\u7535\u538B\u5F02\u5E38";
      case jh.CHARGE_ERROR.CURRENT_ERROR:
        return "\u7535\u6D41\u5F02\u5E38";
      default:
        return "--";
    }
  }
  logBatteryInfo(e3, t2) {}
  decodeCellStatusResponse(e3) {
    try {
      const t2 = new Uint8Array(e3.payloadHex.map((e4) => parseInt(e4, 16)));
      if (t2.length < 1)
        throw new Error(
          "\u7535\u82AF\u72B6\u6001\u4FE1\u606F\u54CD\u5E94\u6570\u636E\u957F\u5EA6\u4E0D\u8DB3",
        );
      const o2 = t2[0],
        n2 = { code: o2, description: o2 === 0 ? "\u6210\u529F" : "\u5931\u8D25" };
      if (o2 !== 0)
        return { title: "\u7535\u82AF\u72B6\u6001\u4FE1\u606F\u54CD\u5E94", status: n2, cells: [] };
      const r2 = [],
        l2 = 5,
        a2 = t2.length - 1,
        i2 = Math.floor(a2 / l2);
      for (let e4 = 0; e4 < i2; e4++) {
        const o3 = 1 + e4 * l2;
        let n3 = t2[o3];
        n3 > 127 && (n3 -= 256);
        const a3 = (t2[o3 + 2] << 8) | t2[o3 + 1];
        let i3 = (t2[o3 + 4] << 8) | t2[o3 + 3];
        i3 > 32767 && (i3 -= 65536),
          r2.push({
            index: e4 + 1,
            temperature: { value: n3, unit: "\xB0C" },
            voltage: { value: a3, unit: "mV" },
            current: { value: i3, unit: "mA" },
          });
      }
      return (
        r2.forEach((e4) => {}),
        { title: "\u7535\u82AF\u72B6\u6001\u4FE1\u606F\u54CD\u5E94", status: n2, cells: r2 }
      );
    } catch (t2) {
      return {
        title: "\u7535\u82AF\u72B6\u6001\u4FE1\u606F\u54CD\u5E94",
        error: t2.message,
        rawData: e3.payloadHex.join(" "),
      };
    }
  }
  decodeHistoryResponse(e3, t2 = "") {
    try {
      const o2 = new Uint8Array(e3.payloadHex.map((e4) => parseInt(e4, 16)));
      if (o2.length < 1)
        throw new Error("\u5386\u53F2\u4FE1\u606F\u54CD\u5E94\u6570\u636E\u957F\u5EA6\u4E0D\u8DB3");
      const n2 = o2[0],
        r2 = { code: n2, description: n2 === 0 ? "\u6210\u529F" : "\u5931\u8D25" },
        l2 = [],
        a2 = [],
        i2 = [],
        s2 = 8,
        c2 = 7,
        d2 = o2.length - 1,
        u2 = Math.min(c2, Math.floor(d2 / s2));
      for (let e4 = 0; e4 < u2; e4++) {
        const n3 = 1 + e4 * s2;
        if (n3 + s2 <= o2.length) {
          const e5 = (o2[n3 + 3] << 24) | (o2[n3 + 2] << 16) | (o2[n3 + 1] << 8) | o2[n3],
            r3 = o2[n3 + 4],
            s3 = o2[n3 + 5],
            c3 = 192 & s3,
            d3 = 63 & s3,
            u3 = this.getChargeStateDescription(c3),
            p2 = this.getErrorTypeDescription(d3);
          let m2 = (o2[n3 + 7] << 8) | o2[n3 + 6];
          (d3 !== 3 && d3 !== 4) || (m2 > 32767 && (m2 -= 65536));
          const f2 = this.generateStatusDescription(r3, d3);
          let h2 = f2 || u3 + p2;
          d3 === 1
            ? (h2 = `\u7535\u6C60${r3}\u8FC7\u538B`)
            : d3 === 2
              ? (h2 = `\u7535\u6C60${r3}\u6B20\u538B`)
              : d3 === 3
                ? (h2 = u3 + "\u9AD8\u6E29")
                : d3 === 4 && (h2 = u3 + "\u4F4E\u6E29");
          const g2 = {
            timestamp: {
              value: e5,
              hex: Array.from(o2.subarray(n3, n3 + 4))
                .map((e6) => e6.toString(16).padStart(2, "0").toUpperCase())
                .join(""),
            },
            cellId: { value: r3, hex: o2[n3 + 4].toString(16).padStart(2, "0").toUpperCase() },
            chargeState: {
              code: c3,
              description: u3,
              hex: c3.toString(16).padStart(2, "0").toUpperCase(),
            },
            errorType: {
              code: d3,
              description: h2,
              hex: d3.toString(16).padStart(2, "0").toUpperCase(),
              nameKey: (() => {
                var e6;
                return d3 === 1
                  ? "exception_cell_over_voltage"
                  : d3 === 2
                    ? "exception_cell_under_voltage"
                    : d3 === 3
                      ? c3 === 128
                        ? "exception_idle_high_temp"
                        : c3 === 64
                          ? "exception_charge_high_temp"
                          : "exception_discharge_high_temp"
                      : d3 === 4
                        ? c3 === 64
                          ? "exception_charge_low_temp"
                          : "exception_discharge_low_temp"
                        : ((e6 = jh.FAULTS[d3]) == null ? void 0 : e6.nameKey) || null;
              })(),
              nameParams: d3 >= 1 && d3 <= 2 ? { cellId: r3 } : null,
            },
            val: {
              value: m2,
              hex: Array.from(o2.subarray(n3 + 6, n3 + 8))
                .map((e6) => e6.toString(16).padStart(2, "0").toUpperCase())
                .join(""),
            },
            statusDescription: f2 || null,
          };
          let b2 = !0;
          t2 === "WPB1007ZX" && e5 < 1772323200 && (b2 = !1),
            b2 ? (l2.push(g2), f2 && i2.push(f2)) : a2.push(g2);
        }
      }
      return (
        l2.forEach((e4, t3) => {
          new Date(1e3 * e4.timestamp.value).toISOString();
        }),
        a2.length > 0 &&
          a2.forEach((e4, t3) => {
            new Date(1e3 * e4.timestamp.value).toISOString();
          }),
        { title: "\u5386\u53F2\u4FE1\u606F\u54CD\u5E94", status: r2, records: l2, alerts: i2 }
      );
    } catch (o2) {
      return {
        title: "\u5386\u53F2\u4FE1\u606F\u54CD\u5E94",
        error: o2.message,
        rawData: e3.payloadHex.join(" "),
      };
    }
  }
  getErrorTypeDescription(e3) {
    const t2 = this.getFaultInfoByCode(e3);
    return t2 ? t2.name : "--";
  }
  parseTemperatureWithSign(e3, t2 = "byte") {
    try {
      let o2;
      if (e3 == null) throw new Error("\u6E29\u5EA6\u6570\u636E\u4E0D\u80FD\u4E3A\u7A7A");
      switch (t2) {
        case "byte":
          if (typeof e3 != "number" || !Number.isInteger(e3))
            throw new Error("\u5B57\u8282\u503C\u5FC5\u987B\u662F\u6574\u6570");
          if (e3 < 0 || e3 > 255)
            throw new Error(
              `\u5B57\u8282\u503C\u8D85\u51FA\u8303\u56F4\uFF1A${e3}\uFF0C\u6709\u6548\u8303\u56F4\uFF1A0-255`,
            );
          o2 = e3 > 127 ? e3 - 256 : e3;
          break;
        case "hex": {
          if (typeof e3 != "string")
            throw new Error(
              "\u5341\u516D\u8FDB\u5236\u683C\u5F0F\u5FC5\u987B\u662F\u5B57\u7B26\u4E32",
            );
          const t3 = e3.replace(/^0x/i, "").trim();
          if (!/^[0-9A-Fa-f]+$/.test(t3))
            throw new Error(
              `\u65E0\u6548\u7684\u5341\u516D\u8FDB\u5236\u5B57\u7B26\u4E32\uFF1A${e3}`,
            );
          const n2 = parseInt(t3, 16);
          if (n2 < 0 || n2 > 255)
            throw new Error(
              `\u5341\u516D\u8FDB\u5236\u503C\u8D85\u51FA\u8303\u56F4\uFF1A${t3}\uFF0C\u6709\u6548\u8303\u56F4\uFF1A00-FF`,
            );
          o2 = n2 > 127 ? n2 - 256 : n2;
          break;
        }
        case "decimal": {
          if (typeof e3 != "string")
            throw new Error("\u5341\u8FDB\u5236\u683C\u5F0F\u5FC5\u987B\u662F\u5B57\u7B26\u4E32");
          const t3 = e3.trim();
          if (!/^[+-]?\d+$/.test(t3))
            throw new Error(`\u65E0\u6548\u7684\u5341\u8FDB\u5236\u5B57\u7B26\u4E32\uFF1A${e3}`);
          if (((o2 = parseInt(t3, 10)), o2 < -128 || o2 > 127))
            throw new Error(
              `\u6E29\u5EA6\u503C\u8D85\u51FA\u5408\u7406\u8303\u56F4\uFF1A${o2}\xB0C\uFF0C\u6709\u6548\u8303\u56F4\uFF1A-128\xB0C\u5230127\xB0C`,
            );
          break;
        }
        default:
          throw new Error(
            `\u4E0D\u652F\u6301\u7684\u8F93\u5165\u683C\u5F0F\uFF1A${t2}\uFF0C\u652F\u6301\u7684\u683C\u5F0F\uFF1A'byte'\u3001'hex'\u3001'decimal'`,
          );
      }
      if (isNaN(o2)) throw new Error("\u6E29\u5EA6\u503C\u8F6C\u6362\u5931\u8D25");
      return {
        value: o2,
        unit: "\xB0C",
        formatted: `${o2}\xB0C`,
        inputFormat: t2,
        originalData: e3,
        valid: !0,
      };
    } catch (o2) {
      return {
        value: null,
        unit: "\xB0C",
        formatted: "\u65E0\u6548",
        inputFormat: t2,
        originalData: e3,
        valid: !1,
        error: o2.message,
      };
    }
  }
  getFaultInfoByCode(e3) {
    if (this.faultCodeMap[e3] !== void 0) return this.faultCodeMap[e3];
    for (const t2 in this.faultCodeMap)
      if (this.faultCodeMap[t2].hex === e3) return { ...this.faultCodeMap[t2], decimal: t2 };
    return null;
  }
  decimalToHexFaultCode(e3) {
    const t2 = this.faultCodeMap[e3];
    return t2 ? t2.hex : null;
  }
  hexToDecimalFaultCode(e3) {
    for (const t2 in this.faultCodeMap) if (this.faultCodeMap[t2].hex === e3) return parseInt(t2);
    return null;
  }
  getFaultAbbreviation(e3) {
    const t2 = this.getFaultInfoByCode(e3);
    return t2 ? t2.abbreviation : "";
  }
  getChargeStateDescription(e3) {
    switch (192 & e3) {
      case 0:
        return "\u653E\u7535";
      case 64:
        return "\u5145\u7535";
      case 128:
        return "\u7A7A\u95F2";
      default:
        return "--";
    }
  }
  generateStatusDescription(e3, t2) {
    return t2 === 1
      ? `\u7535\u6C60${e3}\u8FC7\u538B`
      : t2 === 2
        ? `\u7535\u6C60${e3}\u6B20\u538B`
        : "";
  }
  decodeBatteryIdResponse(e3) {
    try {
      const t2 = new Uint8Array(e3.payloadHex.map((e4) => parseInt(e4, 16)));
      if (t2.length < 2)
        throw new Error(
          "\u7535\u6C60\u7F16\u53F7\u4FE1\u606F\u54CD\u5E94\u6570\u636E\u957F\u5EA6\u4E0D\u8DB3",
        );
      const o2 = t2[0],
        n2 = { code: o2, description: o2 === 0 ? "\u6210\u529F" : "\u5931\u8D25" },
        r2 = t2[1];
      let l2 = "";
      if (t2.length > 2) {
        const e4 = t2.subarray(2, 31);
        let o3 = -1;
        for (let t3 = 0; t3 < e4.length; t3++)
          if (e4[t3] === 0) {
            o3 = t3;
            break;
          }
        const n3 = o3 !== -1 ? e4.subarray(0, o3) : e4;
        l2 = Array.from(n3)
          .map((e5) => (e5 >= 32 && e5 <= 126 ? String.fromCharCode(e5) : "."))
          .join("")
          .trim();
      }
      const a2 = this.parseBatteryId(l2);
      return (
        l2 && !a2.error && a2.variable && a2.variable.error,
        t2.subarray(1, 31),
        {
          title: "\u7535\u6C60\u7F16\u53F7\u4FE1\u606F\u54CD\u5E94",
          code: e3.payloadHex,
          status: n2,
          cellIndex: r2,
          batteryId: l2,
          batteryIdParsed: a2,
        }
      );
    } catch (t2) {
      return {
        title: "\u7535\u6C60\u7F16\u53F7\u4FE1\u606F\u54CD\u5E94",
        error: t2.message,
        rawData: e3.payloadHex.join(" "),
      };
    }
  }
  parseBatteryId(e3) {
    if (!e3 || typeof e3 != "string")
      return { error: "\u65E0\u6548\u7684\u7535\u6C60\u7F16\u7801" };
    const t2 = e3.replace(/\s+/g, "");
    let o2 = "",
      n2 = "",
      r2 = "";
    if (t2.length < 9) return { error: "\u7F16\u7801\u957F\u5EA6\u4E0D\u8DB3", raw: e3 };
    (o2 = t2.substring(0, 9)),
      (r2 = t2.substring(9)),
      r2.startsWith("-R-")
        ? ((n2 = "-R"), (r2 = r2.substring(3)))
        : r2.startsWith("R-") && ((n2 = "-R"), (r2 = r2.substring(2)));
    const l2 = o2.substring(0, 4),
      a2 = o2[4],
      i2 = o2[5],
      s2 = o2[6],
      c2 = o2[7],
      d2 = o2[8],
      u2 =
        {
          ATLN: "\u5B81\u5FB7\u65B0\u80FD\u6E90\u79D1\u6280\u6709\u9650\u516C\u53F8",
          ATLD: "\u4E1C\u839E\u65B0\u80FD\u6E90\u79D1\u6280\u6709\u9650\u516C\u53F8",
          BAKB: "\u90D1\u5DDE\u6BD4\u514B\u7535\u6C60\u6709\u9650\u516C\u53F8",
          BYDL: "\u4E0A\u6D77\u6BD4\u4E9A\u8FEA\u6709\u9650\u516C\u53F8",
          LSDC: "\u5929\u6D25\u529B\u795E\u7535\u6C60\u80A1\u4EFD\u6709\u9650\u516C\u53F8",
          LSJY: "\u5929\u6D25\u529B\u795E\u805A\u5143\u65B0\u80FD\u6E90\u79D1\u6280\u6709\u9650\u516C\u53F8",
          LSSZ: "\u82CF\u5DDE\u529B\u795E\u65B0\u80FD\u6E90\u79D1\u6280\u6709\u9650\u516C\u53F8",
          SSTB: "\u4E09\u661F\uFF08\u5929\u6D25\uFF09\u7535\u6C60\u6709\u9650\u516C\u53F8",
          EVE1: "\u60E0\u5DDE\u4EBF\u7EAC\u9502\u80FD\u80A1\u4EFD\u6709\u9650\u516C\u53F8",
          LWN3: "\u6D59\u6C5F\u9502\u5A01\u80FD\u6E90\u79D1\u6280\u6709\u9650\u516C\u53F8",
          LWN2: "\u60E0\u5DDE\u9502\u5A01\u65B0\u80FD\u6E90\u79D1\u6280\u6709\u9650\u516C\u53F8",
          LWN1: "\u4E1C\u839E\u9502\u5A01\u80FD\u6E90\u79D1\u6280\u6709\u9650\u516C\u53F8",
        }[l2] || "--",
      p2 =
        {
          ATLN: "Ningde Amperex Technology Limited",
          ATLD: "Dongguan Amperex Technology Limited",
          BAKB: "Zhengzhou BAK Battery Co.,Ltd",
          BYDL: "SHANGHAI BYD COMPANY LIMITED",
          LSDC: "Tianjin Lishen Battery Joint-Stock Co., Ltd.",
          LSJY: "Tianjin Lishen Juyuan New Energy Technology Co.,Ltd.",
          LSSZ: "Lishen Battery(SuZhou) Co., Ltd.",
          SSTB: "Samsung SDI(Tianjin)Battery Co.,Ltd.",
          EVE1: "EVE Energy Co., Ltd.",
          LWN3: "Zhejiang Liwinon Energy Technology Co., Ltd.",
          LWN2: "Huizhou Liwinon New Energy Technology Co., Ltd.",
          LWN1: "Dongguan Liwinon Energy Technology Co., Ltd.",
        }[l2] || "--",
      m2 =
        {
          C: "\u5355\u4F53\u7535\u6C60",
          E: "\u5C0F\u52A8\u529B\u578B\u7535\u6C60\u6A21\u5757",
          A: "\u6D88\u8D39\u578B\u7535\u6C60\u6A21\u5757",
          F: "\u5C0F\u52A8\u529B\u578B\u7535\u6C60\u5305",
          B: "\u6D88\u8D39\u578B\u7535\u6C60\u5305",
          G: "\u5C0F\u52A8\u529B\u578B\u7535\u6C60\u7CFB\u7EDF",
          D: "\u6D88\u8D39\u578B\u7535\u6C60\u7CFB\u7EDF",
          H: "\u50A8\u80FD\u578B\u7535\u6C60\u6A21\u5757",
          M: "\u5927\u52A8\u529B\u578B\u7535\u6C60\u6A21\u5757",
          J: "\u50A8\u80FD\u578B\u7535\u6C60\u7C07",
          P: "\u5927\u52A8\u529B\u578B\u7535\u6C60\u5305",
          K: "\u50A8\u80FD\u578B\u7535\u6C60\u7CFB\u7EDF",
          S: "\u5927\u52A8\u529B\u578B\u7535\u6C60\u7CFB\u7EDF",
        }[a2] || "--",
      f2 =
        {
          A: "\u78F7\u9178\u9530\u94C1\u9502\u7535\u6C60",
          B: "\u78F7\u9178\u4E9A\u94C1\u9502\u7535\u6C60",
          C: "\u9530\u9178\u9502\u7535\u6C60",
          D: "\u94B4\u9178\u9502\u7535\u6C60",
          E: "\u954D\u94B4\u9530\u4E09\u5143\u7535\u6C60",
          F: "\u954D\u94B4\u94DD\u4E09\u5143\u7535\u6C60",
          G: "\u949B\u9178\u9502\u7535\u6C60",
          Z: "\u5176\u4ED6\u7C7B\u7535\u6C60",
        }[i2] || "--",
      h2 =
        {
          F: 2025,
          G: 2026,
          H: 2027,
          J: 2028,
          K: 2029,
          L: 2030,
          M: 2031,
          N: 2032,
          P: 2033,
          R: 2034,
          S: 2035,
          T: 2036,
          V: 2037,
        }[s2] || "--",
      g2 =
        { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12 }[c2] || "--",
      b2 =
        {
          1: 1,
          2: 2,
          3: 3,
          4: 4,
          5: 5,
          6: 6,
          7: 7,
          8: 8,
          9: 9,
          A: 10,
          B: 11,
          C: 12,
          D: 13,
          E: 14,
          F: 15,
          G: 16,
          H: 17,
          J: 18,
          K: 19,
          L: 20,
          M: 21,
          N: 22,
          P: 23,
          R: 24,
          S: 25,
          T: 26,
          V: 27,
          W: 28,
          X: 29,
          Y: 30,
          0: 31,
        }[d2] || "--",
      v2 =
        h2 !== "--" && g2 !== "--" && b2 !== "--"
          ? `${h2}-${String(g2).padStart(2, "0")}-${String(b2).padStart(2, "0")}`
          : "--";
    let y2 = "",
      $2 = "",
      x2 = "",
      C2 = "";
    r2.length >= 5
      ? ((y2 = r2.substring(0, 1)),
        ($2 = r2.substring(1, 2)),
        (x2 = r2.substring(2, 5)),
        (C2 = r2.substring(5)))
      : (C2 = r2);
    const w2 = l2 + x2;
    return {
      raw: e3,
      fixed: {
        raw: o2,
        enterpriseCode: l2,
        assemblyFactory: u2,
        assemblyFactoryEn: p2,
        productTypeCode: a2,
        productType: m2,
        batteryTypeCode: i2,
        batteryType: f2,
        dateCode: `${s2}${c2}${d2}`,
        productionDate: v2,
      },
      ladderCode: n2 || "\u65E0",
      separator: y2,
      checksum: $2,
      compositeKey: w2,
      miCode: x2,
      miCodeInfo: {
        ATLNADA: { project: "P15", supplier: "ATL", cellModel: "995662B" },
        ATLDADA: { project: "P15", supplier: "ATL", cellModel: "995662B" },
        ATLNHDA: { project: "P15", supplier: "ATL", cellModel: "995662B" },
        ATLDHDA: { project: "P15", supplier: "ATL", cellModel: "995662B" },
        ATLNDAA: { project: "P15", supplier: "ATL", cellModel: "995662B" },
        ATLDDAA: { project: "P15", supplier: "ATL", cellModel: "995662B" },
        ATLNE7A: { project: "PB1067MI", supplier: "ATL", cellModel: "605463" },
        ATLDE7A: { project: "PB1067MI", supplier: "ATL", cellModel: "605463" },
        ATLNHE7: { project: "PB1067MI", supplier: "ATL", cellModel: "605463" },
        ATLDHE7: { project: "PB1067MI", supplier: "ATL", cellModel: "605463" },
        ATLND9A: { project: "WPB0525S/WPB1025S", supplier: "ATL", cellModel: "436678B" },
        ATLDD9A: { project: "WPB0525S/WPB1025S", supplier: "ATL", cellModel: "436678B" },
        ATLNHD9: { project: "WPB0525S/WPB1025S", supplier: "ATL", cellModel: "436678B" },
        ATLDHD9: { project: "WPB0525S/WPB1025S", supplier: "ATL", cellModel: "436678B" },
        ATLNWSA: { project: "WPB1007ZX", supplier: "ATL", cellModel: "606072G" },
        ATLDWSA: { project: "WPB1007ZX", supplier: "ATL", cellModel: "606072G" },
        ATLNGWS: { project: "WPB1007ZX", supplier: "ATL", cellModel: "606072G" },
        ATLDGWS: { project: "WPB1007ZX", supplier: "ATL", cellModel: "606072G" },
        ATLNDLA: { project: "WPB1025", supplier: "ATL", cellModel: "636078" },
        ATLDDLA: { project: "WPB1025", supplier: "ATL", cellModel: "636078" },
        ATLNHDL: { project: "WPB1025", supplier: "ATL", cellModel: "636078" },
        ATLDHDL: { project: "WPB1025", supplier: "ATL", cellModel: "636078" },
        ATLNHJQ: { project: "WPB0525S/WPB1026S", supplier: "ATL", cellModel: "436678N" },
        ATLDHJQ: { project: "WPB0525S/WPB1026S", supplier: "ATL", cellModel: "436678N" },
        ATLNHJP: { project: "P17", supplier: "ATL", cellModel: "995662N" },
        ATLDHJP: { project: "P17", supplier: "ATL", cellModel: "995662N" },
        LSJYT04: { project: "P15/P17", supplier: "\u529B\u795E", cellModel: "SP995662SF" },
        LSDCT04: { project: "P15/P17", supplier: "\u529B\u795E", cellModel: "SP995662SF" },
        LSSZT04: { project: "P15/P17", supplier: "\u529B\u795E", cellModel: "SP995662SF" },
        LSJYT12: { project: "PB1067MI", supplier: "\u529B\u795E", cellModel: "SP605463SC" },
        LSDCT12: { project: "PB1067MI", supplier: "\u529B\u795E", cellModel: "SP605463SC" },
        LSSZT12: { project: "PB1067MI", supplier: "\u529B\u795E", cellModel: "SP605463SC" },
        LSJYT07: {
          project: "PB2020/PB2045MI/PB2021",
          supplier: "\u529B\u795E",
          cellModel: "SP126280SX",
        },
        LSDCT07: {
          project: "PB2020/PB2045MI/PB2021",
          supplier: "\u529B\u795E",
          cellModel: "SP126280SX",
        },
        LSSZT07: {
          project: "PB2020/PB2045MI/PB2021",
          supplier: "\u529B\u795E",
          cellModel: "SP126280SX",
        },
        LSJYT03: { project: "PB2067MI", supplier: "\u529B\u795E", cellModel: "SP786288SF" },
        LSDCT03: { project: "PB2067MI", supplier: "\u529B\u795E", cellModel: "SP786288SF" },
        LSSZT03: { project: "PB2067MI", supplier: "\u529B\u795E", cellModel: "SP786288SF" },
        LSJYT01: { project: "WPB1025", supplier: "\u529B\u795E", cellModel: "SP626078SF" },
        LSDCT01: { project: "WPB1025", supplier: "\u529B\u795E", cellModel: "SP626078SF" },
        LSSZT01: { project: "WPB1025", supplier: "\u529B\u795E", cellModel: "SP626078SF" },
        LSJYT21: {
          project: "WPB1025S/WPB1026S",
          supplier: "\u529B\u795E",
          cellModel: "SP436678SQ",
        },
        LSDCT21: {
          project: "WPB1025S/WPB1026S",
          supplier: "\u529B\u795E",
          cellModel: "SP436678SQ",
        },
        LSSZT21: {
          project: "WPB1025S/WPB1026S",
          supplier: "\u529B\u795E",
          cellModel: "SP436678SQ",
        },
        LSJYT22: { project: "WPB0525S", supplier: "\u529B\u795E", cellModel: "SP446578SQ" },
        LSDCT22: { project: "WPB0525S", supplier: "\u529B\u795E", cellModel: "SP446578SQ" },
        LSSZT22: { project: "WPB0525S", supplier: "\u529B\u795E", cellModel: "SP446578SQ" },
        LSJYT11: { project: "AC1067/NPB1055R", supplier: "\u529B\u795E", cellModel: "SP753968SI" },
        LSDCT11: { project: "AC1067/NPB1055R", supplier: "\u529B\u795E", cellModel: "SP753968SI" },
        LSSZT11: { project: "AC1067/NPB1055R", supplier: "\u529B\u795E", cellModel: "SP753968SI" },
        LWN2MAI: { project: "AC1067/NPB1055R", supplier: "\u9502\u5A01", cellModel: "753968" },
        LWN2MAG: { project: "AC1067/NPB1055R", supplier: "\u9502\u5A01", cellModel: "753968" },
        LWN1MAI: { project: "AC1067/NPB1055R", supplier: "\u9502\u5A01", cellModel: "753968" },
        LWN3MAI: { project: "AC1067/NPB1055R", supplier: "\u9502\u5A01", cellModel: "753968" },
        LWN2AC8: { project: "AC1067/NPB1055R", supplier: "\u9502\u5A01", cellModel: "753968" },
        LWN1AC8: { project: "AC1067/NPB1055R", supplier: "\u9502\u5A01", cellModel: "753968" },
        LWN3AC8: { project: "AC1067/NPB1055R", supplier: "\u9502\u5A01", cellModel: "753968" },
        LWN2MIF: { project: "PB2020/PB2045MI", supplier: "\u9502\u5A01", cellModel: "C16280B" },
        LWN1MIF: { project: "PB2020/PB2045MI", supplier: "\u9502\u5A01", cellModel: "C16280B" },
        LWN3MIF: { project: "PB2020/PB2045MI", supplier: "\u9502\u5A01", cellModel: "C16280B" },
        LWN2AA9: { project: "PB2020/PB2045MI", supplier: "\u9502\u5A01", cellModel: "C16280B" },
        LWN1AA9: { project: "PB2020/PB2045MI", supplier: "\u9502\u5A01", cellModel: "C16280B" },
        LWN3AA9: { project: "PB2020/PB2045MI", supplier: "\u9502\u5A01", cellModel: "C16280B" },
        LWN2MLE: { project: "PB2067MI", supplier: "\u9502\u5A01", cellModel: "786288" },
        LWN1MLE: { project: "PB2067MI", supplier: "\u9502\u5A01", cellModel: "786288" },
        LWN3MLE: { project: "PB2067MI", supplier: "\u9502\u5A01", cellModel: "786288" },
        LWN2AB1: { project: "PB2067MI", supplier: "\u9502\u5A01", cellModel: "786288" },
        LWN1AB1: { project: "PB2067MI", supplier: "\u9502\u5A01", cellModel: "786288" },
        LWN3AB1: { project: "PB2067MI", supplier: "\u9502\u5A01", cellModel: "786288" },
        LWN2LVD: { project: "PB2067MI", supplier: "\u9502\u5A01", cellModel: "786288" },
        LWN1LVD: { project: "PB2067MI", supplier: "\u9502\u5A01", cellModel: "786288" },
        LWN3LVD: { project: "PB2067MI", supplier: "\u9502\u5A01", cellModel: "786288" },
        LWN2LVE: { project: "PB2067MI", supplier: "\u9502\u5A01", cellModel: "786288" },
        LWN1LVE: { project: "PB2067MI", supplier: "\u9502\u5A01", cellModel: "786288" },
        LWN3LVE: { project: "PB2067MI", supplier: "\u9502\u5A01", cellModel: "786288" },
        LWN2AF7: { project: "PB2021/PB2045MI", supplier: "\u9502\u5A01", cellModel: "C16280BA" },
        LWN1AF7: { project: "PB2021/PB2045MI", supplier: "\u9502\u5A01", cellModel: "C16280BA" },
        LWN3AF7: { project: "PB2021/PB2045MI", supplier: "\u9502\u5A01", cellModel: "C16280BA" },
      }[w2] || { project: "--", supplier: "--", cellModel: "--" },
      variable: { raw: C2 },
    };
  }
  convertHexToLittleEndian(e3) {
    try {
      if (typeof e3 != "string" || e3.length === 0)
        throw new Error("\u8F93\u5165\u5FC5\u987B\u662F\u975E\u7A7A\u5B57\u7B26\u4E32");
      if (e3.length % 2 != 0)
        throw new Error(
          "\u5341\u516D\u8FDB\u5236\u5B57\u7B26\u4E32\u957F\u5EA6\u5FC5\u987B\u4E3A\u5076\u6570",
        );
      const t2 = e3.length / 2,
        o2 = [];
      for (let l2 = 0; l2 < t2; l2++) {
        const t3 = e3.substr(2 * l2, 2),
          n3 = parseInt(t3, 16);
        if (isNaN(n3) || n3 < 0 || n3 > 255)
          throw new Error(`\u65E0\u6548\u7684\u5B57\u8282\u503C\uFF1A${t3}`);
        o2.push(n3);
      }
      let n2 = 0;
      if (t2 === 2) n2 = (o2[1] << 8) | o2[0];
      else if (t2 === 1) n2 = o2[0];
      else {
        if (t2 !== 4)
          throw new Error(
            `\u4E0D\u652F\u6301\u7684\u5B57\u8282\u6570\uFF1A${t2}\uFF0C\u4EC5\u652F\u63011\u30012\u62164\u5B57\u8282`,
          );
        n2 = (o2[3] << 24) | (o2[2] << 16) | (o2[1] << 8) | o2[0];
      }
      const r2 = Math.pow(2, 8 * t2) - 1;
      if (n2 < 0 || n2 > r2)
        throw new Error(
          `\u8F6C\u6362\u7ED3\u679C\u8D85\u51FA\u8303\u56F4\uFF1A${n2}\uFF0C\u6700\u5927\u503C\uFF1A${r2}`,
        );
      return {
        value: n2,
        hex: `0x${n2
          .toString(16)
          .toUpperCase()
          .padStart(2 * t2, "0")}`,
        bytes: o2,
        byteCount: t2,
        mode: "little-endian",
        valid: !0,
      };
    } catch (t2) {
      return {
        value: 0,
        hex: "0x00",
        bytes: [],
        byteCount: 0,
        mode: "little-endian",
        valid: !1,
        error: t2.message,
      };
    }
  }
}
let Wh = {};
const Fh =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMzSURBVHgBzVhBaxNBFP52ExMoVaTNJQXpeqkXtWBF8CAEPHgSetWTHqVQ3X/gP4iePOqtP0DBm9SLnixiC9KCNIHSQrFSaRFTsOv7ujP1ZYnJTBLXfvCRmd2Z2S/vzZt5MwH8cVo4KawIq8KSsGzetYT7wj3hprBh6s4IPNpOGU7ADzvCZeGaS2MXQbRCDallBgGt9gE9hHUTRFfMCC9lntMt34Trwi2kLmmZd3TduHAMqSWjDuN+Ei4JD+AhaFR4ywyuhawYtuAGWtW6WluY1nqJDvMr+IuY25kBOAeWPIR0EjZjhHUVVch0pJtm0S7mnRHzC/2D7mmY33PmGd1Lt37RY2cFXVMdiEXhZwwP20gtE5n6iDAUbtgGRdWY5tQTmJbpGar1ev0swtLjIEymkzCI47m5jz26cExa57qpXxY2kQbIkTqLmUynFbigUJgNQjyU6VgLDpPncMOyoUXNFqwgHQV2vfBGkiTfPZrzGzZIbDQeC9KuWjWinBDPz79IEtxPgKc4VbwHd3CCay8cCWLYM8zvqhcLPoIGBKP6Dv7shQuc1JFq0OhHTL3+LEpLP3fjON716EorcdWvmvokXaY3y014gmKC4uE6ibD4CP5YV+UKBelFcAf5Y0uVqxQ0qh78D0F6ipQoqKweHCB/6G+WQ5wwUJDewUvIH/qbLQrSJhs0K+wHFVXeo6C2WY78MabK+xT0VT2IkD/a1kEKaqoHTFnznEdcciJVb1IQ1wHrNi4BF5EfLqgyPbVnw35VveDOn4eVaB2dYx/t/FYQEzK7YtJKV/DvwYRQ52BrWhDxVpWZVjq5Lo4fNJJieJ7EmdEncAPH1u46TgizxyDmuTpZW4TjEdgDdFNN1ZnKvreV7KmDpwKeOkZMPUK6km9jOKBlbqg6XfUGXY5BfLFhhNhNlwI5AZkJ9Lv5Mkh4xLqaEfNK+EM3LHTozI82M6Iqpl4yA7kKY/tp4U20L4D8c6/RITvt57KBaCDNLnfQbjn2YeRUzR/gQlvO9O16LHe5jplCe4j2C1qDkdw1Tfa9sKK1xuEH7gJceId2YZWFvdKbMGVOeH2ld2BEcCvgXPQ6xfwGjXG35Ij8w00AAAAASUVORK5CYII=",
  Gh =
    "IWZ1bmN0aW9uKCl7InVzZSBzdHJpY3QiO2xldCB0PW51bGw7c2VsZi5vbm1lc3NhZ2U9ZT0+e2NvbnN0e3R5cGU6cyxpbnRlcnZhbDphfT1lLmRhdGF8fHt9OyJzdGFydCI9PT1zPyh0JiZjbGVhckludGVydmFsKHQpLHQ9c2V0SW50ZXJ2YWwoKCk9PntzZWxmLnBvc3RNZXNzYWdlKHt0eXBlOiJ0aWNrIix0aW1lc3RhbXA6RGF0ZS5ub3coKX0pfSxhKSk6InN0b3AiPT09cyYmdCYmKGNsZWFySW50ZXJ2YWwodCksdD1udWxsKX19KCk7Cg==",
  qh =
    typeof window < "u" &&
    window.Blob &&
    new Blob([atob(Gh)], { type: "text/javascript;charset=utf-8" });
function Vh() {
  let e3;
  try {
    if (((e3 = qh && (window.URL || window.webkitURL).createObjectURL(qh)), !e3)) throw "";
    return new Worker(e3);
  } catch {
    return new Worker("data:application/javascript;base64," + Gh);
  } finally {
    e3 && (window.URL || window.webkitURL).revokeObjectURL(e3);
  }
}
const { TabPane: Xh } = yc,
  Uh = ({ onDisconnect: e3 = () => {}, onConnect: t2 = () => {} }) => {
    var o2,
      n2,
      r2,
      l2,
      a2,
      i2,
      s2,
      c2,
      d2,
      u2,
      p2,
      m2,
      f2,
      h2,
      g2,
      b2,
      v2,
      y2,
      $2,
      x2,
      C2,
      w2,
      S2,
      E2,
      k2,
      N2,
      I2,
      B2,
      R2,
      T2,
      M2,
      P2,
      A2,
      L2,
      O2,
      D2,
      z2,
      H2,
      j2,
      _2;
    const { t: K2, lang: W2 } = Et(),
      F2 = (e4, t3) => {
        let o3 = K2(e4);
        return (
          t3 &&
            Object.entries(t3).forEach(([e5, t4]) => {
              o3 = o3.replace(`{${e5}}`, t4);
            }),
          o3
        );
      },
      G2 = {
        productName: K2("panel_product_name"),
        productModel: "--",
        serialNumber: "--",
        batteryLevel: "--",
        batteryHealth: "--",
        cycleCount: "--",
        batteryModel: "--",
        batteryCode: "--",
        batteryProductionDate: "--",
        batteryManufacturer: "--",
        batteryTemperature: "--",
        batteryVoltage: "--",
        batteryCurrent: "--",
      },
      q2 = {
        status: { code: 0, description: "--" },
        activateStatus: { code: 0, description: "--" },
        cycleCount: 0,
        batteryHealth: 0,
        chargeErrorNow: { code: 0, description: "--" },
        errorValue: 0,
        historyErrorCount: 0,
        batterySeriesParallel: 0,
        batteryLevel: 0,
        batteryTemperature: 0,
        batteryVoltage: 0,
        batteryCurrent: 0,
      },
      [V2, X2] = Nt.useState(null),
      [U2, Y2] = Nt.useState(null),
      [Z2, J2] = Nt.useState(!1),
      [Q2, ee2] = Nt.useState(!1),
      [te2, oe2] = Nt.useState(!1),
      [ne2, re2] = Nt.useState(!1),
      [le2, ae2] = Nt.useState(G2),
      [ie2, se2] = Nt.useState(q2),
      [ce2, de2] = Nt.useState({}),
      [ue2, pe2] = Nt.useState(1),
      [me2, fe2] = Nt.useState(!1),
      [he2, ge2] = Nt.useState([]),
      [be2, ve2] = Nt.useState(!1),
      [ye2, $e2] = Nt.useState({}),
      [xe2, Ce2] = Nt.useState(null),
      [we2, Se2] = Nt.useState(!1),
      [Ee2, ke2] = Nt.useState(!1),
      [Ne2, Ie2] = Nt.useState(null),
      [Be2, Re2] = Nt.useState(!0),
      [_qi2On, _setQi2On] = Nt.useState(!1),
      [_qi2Busy, _setQi2Busy] = Nt.useState(!1),
      _qi2Diag = It.useRef({}),
      _qi2Waiter = It.useRef(null),
      Te2 = It.useRef(null),
      Me2 = It.useRef(null),
      Pe2 = It.useRef(null),
      Ae2 = It.useRef(null),
      Le2 = It.useRef(null),
      Oe2 = It.useRef(0),
      De2 = It.useRef(""),
      ze2 = It.useRef(null),
      He2 = It.useRef(null),
      je2 = It.useRef(null),
      _qi2AppVersion = "v26",
      _qi2Model = (e4) =>
        _qi2FindModel(e4) || {
          id: null,
          name: "\u5C0F\u7C73\u5145\u7535\u5B9D",
          nameEn: "Xiaomi Power Bank",
          model: e4 || "",
          isShow: !0,
          tempRange: "-20\u2103~60\u2103",
          unknownDevice: !0,
          supportsQI2: !0,
          qi2Unknown: !0,
          qi2NewProtocol: !0,
        },
      _qi2Lock = It.useRef(!1),
      _qtest = (() => {
        try {
          return new URLSearchParams(location.search).get("qtest") === "1";
        } catch (e) {
          return false;
        }
      })(),
      _e2 = new _h(),
      Ke2 = new Kh(),
      We2 = Nt.useCallback(() => {
        Te2.current &&
          (Te2.current.reject(
            new Error("\u8BBE\u5907\u5DF2\u65AD\u5F00\uFF0C\u53D6\u6D88\u8BF7\u6C42"),
          ),
          (Te2.current = null)),
          Me2.current &&
            (Me2.current.reject(
              new Error("\u8BBE\u5907\u5DF2\u65AD\u5F00\uFF0C\u53D6\u6D88\u8BF7\u6C42"),
            ),
            (Me2.current = null)),
          Le2.current &&
            (Le2.current.reject(
              new Error("\u8BBE\u5907\u5DF2\u65AD\u5F00\uFF0C\u53D6\u6D88\u8BF7\u6C42"),
            ),
            (Le2.current = null)),
          ze2.current &&
            (ze2.current.reject(
              new Error("\u8BBE\u5907\u5DF2\u65AD\u5F00\uFF0C\u53D6\u6D88\u9A8C\u8BC1"),
            ),
            (ze2.current = null)),
          Pe2.current &&
            (Pe2.current.reject(
              new Error("\u8BBE\u5907\u5DF2\u65AD\u5F00\uFF0C\u53D6\u6D88\u8BF7\u6C42"),
            ),
            (Pe2.current = null)),
          Ae2.current &&
            (Ae2.current.reject(
              new Error("\u8BBE\u5907\u5DF2\u65AD\u5F00\uFF0C\u53D6\u6D88\u8BF7\u6C42"),
            ),
            (Ae2.current = null)),
          ae2(G2),
          se2(q2),
          de2({}),
          ge2([]),
          ve2(!1),
          Ce2(null),
          $e2({}),
          pe2(1),
          Se2(!1),
          ke2(!1),
          fe2(!1),
          Ie2(null),
          Re2(!0),
          (Oe2.current = 0),
          (De2.current = ""),
          (je2.current = null);
      }, []),
      Fe2 = Nt.useCallback(() => {
        U2 &&
          (typeof U2 == "number"
            ? clearInterval(U2)
            : typeof U2.terminate == "function" && U2.terminate(),
          Y2(null)),
          He2.current && (He2.current.release().catch(() => {}), (He2.current = null));
      }, [U2]),
      Ge2 = Nt.useCallback(async () => {
        try {
          Fe2(),
            X2(null),
            J2(!1),
            We2(),
            e3(),
            qe2("\u26A0\uFE0F \u8BBE\u5907\u5DF2\u5F02\u5E38\u65AD\u5F00\u8FDE\u63A5"),
            oe2(!0);
        } catch {}
      }, [Fe2, e3, We2]),
      qe2 = (e4, ...t3) => {
        t3.length > 0 && JSON.stringify(t3);
      },
      Ve2 = async (e4 = V2, t3 = 1) => {
        try {
          await _e2.sendBatteryIdCommand(e4 || V2, t3);
        } catch (o3) {
          o3.name,
            o3.message,
            o3.stack,
            qe2(
              "\u274C \u53D1\u9001\u7535\u6C60\u7F16\u53F7\u547D\u4EE4\u5931\u8D25:",
              o3.message || o3,
            );
        }
      },
      Xe2 = async (e4 = V2) => {
        if (_qi2Lock.current) {
          try {
            console.log("[QI2] heartbeat skipped (qi2 transaction busy)");
          } catch (err) {}
          return;
        }
        try {
          await _e2.sendHelloCommand(e4 || V2);
        } catch (t3) {
          t3.name,
            t3.message,
            t3.stack,
            qe2("\u274C \u53D1\u9001Hello\u547D\u4EE4\u5931\u8D25:", t3.message || t3);
        }
      },
      Ue2 = async (e4) => {
        if (!V2) throw new Error(K2("error_device_not_connected"));
        try {
          await _e2.sendHexCommand(V2, e4);
        } catch (t3) {
          throw (
            ((t3.name === "NotAllowedError" || t3.message.includes("disconnected")) && Ge2(), t3)
          );
        }
      },
      _qi2Fetch = async () => {
        if (!(!V2 || _qi2Lock.current)) {
          (_qi2Lock.current = !0), _setQi2Busy(!0);
          try {
            await _e2.sendGetQI2StatusCommand(V2);
          } catch {}
          setTimeout(() => {
            (_qi2Lock.current = !1), _setQi2Busy(!1);
          }, 2e3);
        }
      },
      _qi2Wait = (e4, t2) =>
        new Promise((o2, n2) => {
          const r2 = setTimeout(() => {
            _qi2Waiter.current &&
              _qi2Waiter.current.command === e4 &&
              ((_qi2Waiter.current = null), n2(new Error("\u8BBE\u5907\u54CD\u5E94\u8D85\u65F6")));
          }, t2 || 4e3);
          _qi2Waiter.current = {
            command: e4,
            resolve: (e5) => {
              clearTimeout(r2), (_qi2Waiter.current = null), o2(e5);
            },
            reject: (e5) => {
              clearTimeout(r2), (_qi2Waiter.current = null), n2(e5);
            },
          };
        }),
      _qi2Ccm = async (e4, t2, o2, n2, r2) => {
        const l2 = new TextEncoder(),
          a2 = new Uint8Array(12),
          i2 = (e4 instanceof Uint8Array ? e4 : new Uint8Array(0)).slice(-8);
        if (!i2.length) throw new Error("\u8BBE\u5907\u5E8F\u5217\u53F7\u4E3A\u7A7A");
        a2.set(i2, 8 - i2.length), new DataView(a2.buffer).setUint32(8, t2, !1);
        const s2 = await crypto.subtle.importKey(
            "raw",
            l2.encode("MiXiaomiQi22Key!"),
            { name: "HMAC", hash: "SHA-256" },
            !1,
            ["sign"],
          ),
          c2 = await crypto.subtle.sign("HMAC", s2, a2),
          d2 = await crypto.subtle.importKey("raw", c2.slice(0, 16), "AES-CBC", !1, ["encrypt"]),
          u2 = new Uint8Array(13);
        u2[0] = 72;
        new DataView(u2.buffer).setUint32(1, t2, !1);
        u2[9] = 230;
        const p2 = new Uint8Array(5),
          m2 = new DataView(p2.buffer);
        m2.setUint16(0, o2, !1);
        m2.setUint16(2, n2, !1);
        p2[4] = r2 ? 1 : 0;
        const f2 = async (e5) =>
            new Uint8Array(
              await crypto.subtle.encrypt({ name: "AES-CBC", iv: new Uint8Array(16) }, d2, e5),
            ).slice(0, 16),
          h2 = new Uint8Array(16);
        h2[0] = 9;
        h2.set(u2, 1);
        h2[15] = p2.length;
        const g2 = await f2(h2);
        for (let e5 = 0; e5 < p2.length; e5++) g2[e5] ^= p2[e5];
        const _2 = await f2(g2),
          b2 = new Uint8Array(16);
        b2[0] = 1;
        b2.set(u2, 1);
        const v2 = await f2(b2);
        b2[15] = 1;
        const y2 = await f2(b2),
          $2 = new Uint8Array(9);
        for (let e5 = 0; e5 < 5; e5++) $2[e5] = p2[e5] ^ y2[e5];
        for (let e5 = 0; e5 < 4; e5++) $2[5 + e5] = _2[e5] ^ v2[e5];
        return $2;
      },
      _qi2QuerySettled = async (e4, t2, o2, n2) => {
        const r2 = n2 || 6,
          l2 = o2 || 700;
        let a2 = null;
        for (let i2 = 0; i2 < r2; i2++) {
          if (i2) await new Promise((e5) => setTimeout(e5, l2));
          try {
            a2 = await _qi2QueryNow(e4);
          } catch (e5) {
            a2 = null;
          }
          _qi2Diag.current.readback = a2 && a2.success ? a2.isEnabled : "error";
          _qi2Diag.current.readbackTries = i2 + 1;
          if (a2 && a2.success && a2.isEnabled === t2) return a2;
        }
        return a2;
      },
      _qi2QueryNow = async (e4) => {
        const t2 = _qi2Wait("0x17", 3e3);
        return await _e2.sendGetQI2StatusCommand(e4), t2;
      },
      _qi2Legacy = async (e4, t2) => {
        _qi2Diag.current = { protocol: "legacy" };
        const o2 = await _qi2QueryNow(e4);
        if (o2 && o2.success && o2.isEnabled === t2) return void _setQi2On(t2);
        const n2 = _qi2Wait("0x16", 5e3);
        await _e2.sendEnableQI2Command(e4, t2);
        const r2 = await n2;
        _qi2Diag.current.writeStatus = r2 && r2.status !== void 0 ? r2.status : -1;
        if (!r2 || !r2.success) throw new Error("\u8BBE\u5907\u62D2\u7EDD\u4E86\u672C\u6B21\u8BBE\u7F6E");
        const l2 = await _qi2QuerySettled(e4, t2);
        if (!l2 || !l2.success || l2.isEnabled !== t2)
          throw new Error("\u56DE\u8BFB\u72B6\u6001\u4E0E\u76EE\u6807\u4E0D\u4E00\u81F4");
        _setQi2On(t2);
      },
      _qi2Encrypted = async (e4, t2) => {
        const helloFrame = Hh.encode("Hello", Hh.CMD_HELLO),
          n2 = new DataView(helloFrame.buffer, helloFrame.byteOffset).getUint32(3, !0),
          r2 = _qi2Wait("0x10", 2500);
        await _e2.sendCommand(e4, helloFrame, "Hello");
        const l2 = await r2,
          a2 = l2 && l2.snBytes ? l2.snBytes : new Uint8Array(0);
        _qi2Diag.current = { protocol: "encrypted", modelId: l2 ? l2.deviceModelDecimal : "", snLen: a2.length };
        if (!a2.length) throw new Error("\u65E0\u6CD5\u83B7\u53D6\u8BBE\u5907\u5E8F\u5217\u53F7");
        const c2 = await _qi2QueryNow(e4);
        if (c2 && c2.success && c2.isEnabled === t2) return void _setQi2On(t2);
        const i2 = _qi2Wait("0x11", 3500);
        await _e2.sendBatteryInfoCommand(e4);
        const s2 = await i2;
        if (!s2 || s2.error || !s2.status || s2.status.code !== 0)
          throw new Error("\u8BFB\u53D6\u7535\u6C60\u4FE1\u606F\u5931\u8D25");
        const _fault = s2.chargeErrorNow ? (s2.chargeErrorNow.faultType !== undefined ? s2.chargeErrorNow.faultType : (s2.chargeErrorNow.code & 63)) : 0,
          _chg = s2.chargeErrorNow ? (s2.chargeErrorNow.chgState !== undefined ? s2.chargeErrorNow.chgState : ((s2.chargeErrorNow.code >> 6) & 3)) : 0;
        Object.assign(_qi2Diag.current, { health: s2.batteryHealth, cycles: s2.cycleCount, level: s2.batteryLevel, temp: s2.batteryTemperature, voltage: s2.batteryVoltage, chgState: _chg, fault: _fault, faultRaw: s2.chargeErrorNow ? s2.chargeErrorNow.code : -1, statusCode: s2.status ? s2.status.code : -1 });
        if (t2 && _fault !== 0)
          throw new Error("\u8BBE\u5907\u5F53\u524D\u5B58\u5728\u6545\u969C\uFF08\u4EE3\u7801 " + _fault + "\uFF09\uFF0C\u5DF2\u505C\u6B62\u5199\u5165");
        const d2 = await _qi2Ccm(a2, n2, s2.batteryHealth, s2.cycleCount, t2),
          u2 = _qi2Wait("0xF6", 6e3);
        await _e2.sendEncryptedQi2Command(e4, d2);
        const p2 = await u2;
        _qi2Diag.current.writeStatus = p2 && p2.status !== void 0 ? p2.status : -1;
        if (!p2 || !p2.success) throw new Error("\u8BBE\u5907\u672A\u786E\u8BA4\u5199\u5165");
        const m2 = await _qi2QuerySettled(e4, t2);
        if (!m2 || !m2.success || m2.isEnabled !== t2)
          throw new Error("\u56DE\u8BFB\u72B6\u6001\u4E0E\u76EE\u6807\u4E0D\u4E00\u81F4");
        _setQi2On(t2);
      },
      _qi2Report = (e4, t2, o2) => {
        try {
          console.log("[QI2] report action=" + (e4 ? "on" : "off") + " ok=" + !!t2 + " detail=" + o2);
        } catch (e) {}
        try {
          const n2 = _qi2Model(De2.current) || {},
            r2 = (ce2["0x10"] && ce2["0x10"].data && ce2["0x10"].data.sn) || "",
            l2 = new TextEncoder().encode(String(r2));
          crypto.subtle
            .digest("SHA-256", l2)
            .then((a2) =>
              Array.from(new Uint8Array(a2))
                .slice(0, 16)
                .map((i2) => i2.toString(16).padStart(2, "0"))
                .join(""),
            )
            .then((a2) =>
              fetch("/api/qi2-report", {
                method: "POST",
                headers: { "content-type": "application/json" },
                credentials: "same-origin",
                body: JSON.stringify({
                  model: String(n2.model || De2.current || "GENERIC").toUpperCase(),
                  snHash: a2,
                  action: e4 ? "on" : "off",
                  appVersion: _qi2AppVersion,
                  reportedAt: new Date().toISOString(),
                  pageUrl: (function () { try { return location.origin + location.pathname; } catch (e) { return ""; } })(),
                  ok: !!t2,
                  detail: String(o2 || "").slice(0, 400),
                  devLogs: __qlog.dump(),
                  info: Object.assign({}, _qi2Diag.current, {
                    batteryModel: le2 && le2.batteryModel,
                    batteryCode: le2 && le2.batteryCode,
                    batteryManufacturer: le2 && le2.batteryManufacturer,
                    batteryProductionDate: le2 && le2.batteryProductionDate,
                  }),
                }),
              }).catch(() => {}),
            )
            .catch(() => {});
        } catch (e5) {}
      },
      _qi2Trial = async () => {
        if (!V2 || _qi2Lock.current) return;
        __qlog.setEnabled(!0);
        _qi2Lock.current = !0;
        _setQi2Busy(!0);
        try {
          await _qi2Encrypted(V2, !0);
          _qi2Report(!0, !0, "trial");
          setTimeout(() => _qi2Fetch(), 800);
        } catch (e4) {
          _qi2Report(!0, !1, (e4 && e4.message) || "trial-failed");
          ju.error({
            title: "QI 2.2 \u6D4B\u8BD5",
            content: (e4 && e4.message) || "\u6D4B\u8BD5\u5931\u8D25",
            okText: "\u786E\u5B9A",
          });
        }
        (_qi2Lock.current = !1), _setQi2Busy(!1);
      },
      _qi2Apply = async (e4) => {
        if (!(!V2 || _qi2Lock.current)) {
          (_qi2Lock.current = !0), _setQi2Busy(!0);
          try {
            const t2 = _qi2Model(De2.current),
              _preferEnc = !!(t2 && t2.qi2NewProtocol),
              _order = _preferEnc ? ["encrypted", "legacy"] : ["legacy", "encrypted"];
            let _done = !1,
              _firstErr = "";
            try {
              console.log("[QI2] apply target=" + !!e4 + " order=" + _order.join(">") + " model=" + (De2.current || "?") + " modelKnown=" + !!t2);
            } catch (e) {}
            for (const _mode of _order) {
              try {
                if (_mode === "encrypted") await _qi2Encrypted(V2, !!e4);
                else await _qi2Legacy(V2, !!e4);
                if (_mode === "encrypted" && !_done && _order[0] !== "encrypted")
                  _qi2Report(!!e4, true, "encrypted-fallback");
                else if (_mode === "legacy" && _order[0] !== "legacy")
                  _qi2Report(!!e4, true, "legacy-fallback");
                else _qi2Report(!!e4, true, _mode);
                _done = !0;
                try {
                  console.log("[QI2] " + _mode + " succeeded");
                } catch (e) {}
                break;
              } catch (_err) {
                const _msg = (_err && _err.message) || "unknown";
                if (!_firstErr) _firstErr = _mode + ": " + _msg;
                try {
                  console.log("[QI2] " + _mode + " failed: " + _msg);
                } catch (e) {}
                _qi2Diag.current = Object.assign({}, _qi2Diag.current, {
                  ["lastError_" + _mode]: _msg,
                  fallback: _mode === _order[0] ? _order[1] : "",
                });
              }
            }
            if (!_done) {
              try {
                console.log("[QI2] all paths failed: " + _firstErr);
              } catch (e) {}
              throw new Error(_firstErr || "QI2.2\u8BBE\u7F6E\u5931\u8D25");
            }
          } catch (t2) {
            (_qi2Lock.current = !1), _setQi2Busy(!1),
              _qi2Report(!!e4, false, (t2 && t2.message) || "unknown"),
              _setQi2Busy(!1),
              ju.error({
                title: "QI 2.2",
                content: (t2 && t2.message) || "QI2.2\u8BBE\u7F6E\u5931\u8D25",
                okText: "\u786E\u5B9A",
              });
            return;
          }
          (_qi2Lock.current = !1), _setQi2Busy(!1), setTimeout(() => _qi2Fetch(), 1200);
        }
      };
    Nt.useEffect(() => {
      Z2 && Re2(!1);
    }, [Z2]),
      Nt.useEffect(() => {
        const e4 = ce2["0x10"]?.data?.deviceModelInfo?.model;
        Z2 && _qi2Model(e4)?.supportsQI2 && _qi2Fetch();
      }, [Z2, ce2["0x10"]?.data?.deviceModelInfo?.model]),
      Nt.useEffect(() => {
        if (!Z2) return;
        const e4 = setInterval(() => {
          _qi2Model(De2.current)?.supportsQI2 && _qi2Fetch();
        }, 5e3);
        return () => clearInterval(e4);
      }, [Z2]);
    const Ye2 = Nt.useCallback(() => {
      V2 && !V2.opened && Ge2();
    }, [V2, Ge2]);
    Nt.useEffect(() => {
      let e4;
      return (
        V2 && V2.opened && (e4 = setInterval(Ye2, 3e3)),
        () => {
          e4 && clearInterval(e4);
        }
      );
    }, [V2, Ye2]),
      Nt.useEffect(() => {
        const e4 = ((e5) => {
          try {
            return (
              e5 && typeof e5 == "object" && Object.assign(Wh, e5),
              Object.keys(Wh).length === 0
                ? ""
                : Object.entries(Wh)
                    .sort((e6, t3) => Number(e6[0]) - Number(t3[0]))
                    .map((e6) => {
                      const t3 = e6[1];
                      return typeof t3 == "string" ? t3.trim() : "";
                    })
                    .filter((e6) => e6 !== "")
                    .join(" || ")
            );
          } catch {
            return "";
          }
        })(ye2);
        e4 && ae2((t3) => ({ ...t3, batteryCode: e4 }));
      }, [ye2]),
      Nt.useEffect(() => {
        if (Z2 && V2 && ie2.cellCount > 0 && Oe2.current !== ie2.cellCount) {
          (Oe2.current = ie2.cellCount), $e2({}), (Wh = {});
          const e4 = async (e5, t3) => {
            let o3 = 0;
            for (; o3 < 3; ) {
              o3++;
              try {
                const o4 = new Promise((e6, o5) => {
                  const n3 = setTimeout(() => {
                    Pe2.current &&
                      ((Pe2.current = null), o5(new Error("\u8BF7\u6C42\u8D85\u65F6 (5s)")));
                  }, 5e3);
                  Pe2.current = {
                    expectIndex: t3,
                    resolve: (t4) => {
                      clearTimeout(n3), e6(t4);
                    },
                    reject: (e7) => {
                      clearTimeout(n3), o5(e7);
                    },
                  };
                });
                return await Ve2(e5, t3), void (await o4);
              } catch (n3) {
                if (
                  n3.message === "\u8BBE\u5907\u5DF2\u65AD\u5F00\uFF0C\u53D6\u6D88\u8BF7\u6C42" ||
                  o3 >= 3
                )
                  return;
                await new Promise((e6) => setTimeout(e6, 500 * Math.pow(2, o3 - 1)));
              }
            }
          };
          (async () => {
            for (let t3 = 1; t3 <= ie2.cellCount; t3++) await e4(V2, t3);
          })(),
            Je2(V2);
        }
      }, [Z2, V2, ie2.cellCount]),
      Nt.useEffect(() => {
        if (!me2) return;
        const e4 = ce2["0x13"];
        if (e4 && e4.data && e4.data.records) {
          if (je2.current === e4.timestamp) return;
          je2.current = e4.timestamp;
          const t3 = e4.data.records;
          ge2((e5) => {
            const o3 = ie2.historyErrorCount || 0;
            if (o3 > 0 && e5.length >= o3) return e5;
            const n3 = new Set(
                e5.map((e6) => {
                  var t4, o4, n4;
                  return `${(t4 = e6.timestamp) == null ? void 0 : t4.value}_${(o4 = e6.cellId) == null ? void 0 : o4.value}_${(n4 = e6.errorType) == null ? void 0 : n4.code}`;
                }),
              ),
              r3 = t3.filter((e6) => {
                var t4, o4, r4;
                const l4 = `${(t4 = e6.timestamp) == null ? void 0 : t4.value}_${(o4 = e6.cellId) == null ? void 0 : o4.value}_${(r4 = e6.errorType) == null ? void 0 : r4.code}`;
                return !n3.has(l4);
              }),
              l3 = [...e5, ...r3].slice().sort((e6, t4) => {
                var o4, n4;
                return (
                  (((o4 = t4.timestamp) == null ? void 0 : o4.value) ?? 0) -
                  (((n4 = e6.timestamp) == null ? void 0 : n4.value) ?? 0)
                );
              });
            return o3 > 0 ? l3.slice(0, o3) : l3;
          });
        }
      }, [ce2, me2, ie2.historyErrorCount]);
    const Ze2 = (e4) => {
        pe2(e4);
      },
      Je2 = async (e4 = V2) => {
        if (we2 || !e4 || !ie2.cellCount) return;
        Se2(!0);
        let t3 = 0,
          o3 = !1;
        const n3 = (() => {
          const e5 = ((e6, t5) => {
              if (!Number.isInteger(e6) || !Number.isInteger(t5))
                throw new Error(
                  "\u8D77\u59CB\u7F16\u53F7\u548C\u7ED3\u675F\u7F16\u53F7\u5FC5\u987B\u4E3A\u6574\u6570",
                );
              if (e6 < 1 || e6 > 255)
                throw new Error(`\u8D77\u59CB\u7F16\u53F7\u8D85\u51FA\u8303\u56F4(1-255): ${e6}`);
              if (t5 < 1 || t5 > 255)
                throw new Error(`\u7ED3\u675F\u7F16\u53F7\u8D85\u51FA\u8303\u56F4(1-255): ${t5}`);
              if (e6 > t5)
                throw new Error(
                  `\u8D77\u59CB\u7F16\u53F7(${e6})\u4E0D\u80FD\u5927\u4E8E\u7ED3\u675F\u7F16\u53F7(${t5})`,
                );
              return `${e6.toString(16).padStart(2, "0").toUpperCase()}${t5.toString(16).padStart(2, "0").toUpperCase()}`;
            })(1, ie2.cellCount),
            t4 = new Uint8Array(e5.match(/.{1,2}/g).map((e6) => parseInt(e6, 16)));
          try {
            const [t5, o5] = ((e6) => {
              if (typeof e6 != "string" || e6.length !== 4)
                throw new Error(
                  "\u8F93\u5165\u5FC5\u987B\u4E3A4\u4F4D\u5341\u516D\u8FDB\u5236\u5B57\u7B26\u4E32",
                );
              if (!/^[0-9A-Fa-f]{4}$/.test(e6))
                throw new Error(
                  "\u8F93\u5165\u5305\u542B\u975E\u5341\u516D\u8FDB\u5236\u5B57\u7B26",
                );
              const t6 = parseInt(e6.substring(0, 2), 16),
                o6 = parseInt(e6.substring(2, 4), 16);
              if (t6 < 1 || t6 > 255)
                throw new Error(
                  `\u89E3\u6790\u51FA\u7684\u8D77\u59CB\u7F16\u53F7\u65E0\u6548: ${t6}`,
                );
              if (o6 < 1 || o6 > 255)
                throw new Error(
                  `\u89E3\u6790\u51FA\u7684\u7ED3\u675F\u7F16\u53F7\u65E0\u6548: ${o6}`,
                );
              if (t6 > o6)
                throw new Error(
                  `\u89E3\u6790\u51FA\u7684\u8D77\u59CB\u7F16\u53F7(${t6})\u5927\u4E8E\u7ED3\u675F\u7F16\u53F7(${o6})`,
                );
              return [t6, o6];
            })(e5);
          } catch {}
          const o4 = new Uint8Array([165, 2, 2, ...t4]),
            n4 = Hh.calculateCRC8(o4),
            r3 = new Uint8Array([...o4, n4]);
          return Array.from(r3)
            .map((e6) => e6.toString(16).padStart(2, "0"))
            .join("")
            .toUpperCase();
        })();
        for (; t3 < 3 && !o3; ) {
          t3++;
          try {
            const e5 = new Promise((e6, t5) => {
              const o4 = setTimeout(() => {
                Te2.current &&
                  ((Te2.current = null), t5(new Error("\u8BF7\u6C42\u8D85\u65F6 (8s)")));
              }, 8e3);
              Te2.current = {
                resolve: (t6) => {
                  clearTimeout(o4), e6(t6);
                },
                reject: (e7) => {
                  clearTimeout(o4), t5(e7);
                },
              };
            });
            await Ue2(n3);
            const t4 = await e5;
            if (!t4.status || t4.status.code !== 0)
              throw new Error(K2("error_device_return_failed"));
            (o3 = !0), Ce2(t4);
          } catch (r3) {
            if (t3 >= 3)
              r3.message,
                ju.error({
                  title: K2("panel_fetch_cell_error_title"),
                  content: `${K2("panel_fetch_cell_error_content")}: ${r3.message}`,
                  okText: K2("panel_modal_ok"),
                });
            else {
              const e5 = 500 * Math.pow(2, t3 - 1);
              await new Promise((t4) => setTimeout(t4, e5));
            }
          }
        }
        Se2(!1), (Te2.current = null);
      },
      Qe2 = (e4) => {
        try {
          console.log("[QI2] inputreport id=" + e4.reportId + " bytes=" + (e4.data ? e4.data.byteLength : -1));
        } catch (e) {}
        var t3, o3, n3, r3, l3, a3;
        const i3 = new Date().toISOString(),
          { reportId: s3 } = e4,
          c3 = new Uint8Array(e4.data.buffer),
          d3 = Ke2.parseProtocol(c3);
        __qlog.push("RX", d3 && !d3.error ? d3.command : "raw", __qlog.hex(c3), { reportId: s3, length: c3.length, dataLength: d3 && d3.dataLength, payloadHex: d3 && d3.payloadHex, checksum: d3 && d3.checksum, parseError: d3 && d3.error });
        !De2.current &&
          (n3 =
            (o3 = (t3 = ce2["0x10"]) == null ? void 0 : t3.data) == null
              ? void 0
              : o3.deviceModelInfo) != null &&
          n3.model &&
          (De2.current =
            (a3 =
              (l3 = (r3 = ce2["0x10"]) == null ? void 0 : r3.data) == null
                ? void 0
                : l3.deviceModelInfo) == null
              ? void 0
              : a3.model);
        const u3 = De2.current;
        let p3 = "\u672A\u6821\u9A8C";
        if (!d3.error) {
          const e5 = c3.slice(0, 3 + d3.dataLength),
            t4 = c3[3 + d3.dataLength],
            o4 = Hh.calculateCRC8(e5);
          if (t4 === o4) (p3 = "\u901A\u8FC7"), qe2("\u2705 CRC-8 \u6821\u9A8C\u901A\u8FC7");
          else {
            p3 = "\u5931\u8D25";
            const e6 =
              "CRC-8 \u6821\u9A8C\u5931\u8D25\uFF1A\u63A5\u6536\u7684 CRC \u4E3A 0x" +
              t4.toString(16).toUpperCase() +
              "\uFF0C\u8BA1\u7B97\u7684 CRC \u4E3A 0x" +
              o4.toString(16).toUpperCase();
            if ((qe2("\u274C " + e6), u3 !== "WPB1007ZX" || d3.command !== "0x13"))
              return (
                d3.command === "0x12" &&
                  Te2.current &&
                  (Te2.current.reject(new Error(e6)), (Te2.current = null)),
                (d3.command !== "0x11" && d3.command !== "0x01") ||
                  !Me2.current ||
                  (Me2.current.reject(new Error(e6)), (Me2.current = null)),
                d3.command === "0x14" &&
                  Pe2.current &&
                  (Pe2.current.reject(new Error(e6)), (Pe2.current = null)),
                void (
                  d3.command === "0x18" &&
                  Ae2.current &&
                  (Ae2.current.reject(new Error(e6)), (Ae2.current = null))
                )
              );
          }
        }
        const m3 = Ke2.translateToUserView(d3, { deviceModel: u3 });
        __qlog.push("DECODE", (d3 && d3.command) || "--", "", { crc: p3, view: m3 && typeof m3 === "object" ? JSON.parse(JSON.stringify(m3)) : m3 });
        if (d3.command === "0x10") {
          try {
            console.log("[QI2] HELLO modelId=" + (m3 && m3.deviceModelId) + " model=" + (m3 && m3.deviceModel) + " known=" + (m3 && m3.deviceModelKnown) + " sn=\"" + (m3 && m3.sn) + "\" snHex=" + __qlog.hex((m3 && m3.snBytes) || new Uint8Array(0)) + " err=" + (m3 && m3.error));
          } catch (e) {}
        }
        _qi2Waiter.current &&
          d3.command === _qi2Waiter.current.command &&
          (_qi2Waiter.current.resolve(m3), (_qi2Waiter.current = null));
        d3.command === "0x10" &&
          (m3 &&
            m3.deviceModelInfo &&
            m3.deviceModelInfo.model &&
            (De2.current = m3.deviceModelInfo.model),
          d3.command === "0xFE" && ze2.current &&
            (ze2.current.reject(new Error("\u8BBE\u5907\u4EE5\u56DE\u663E\u65B9\u5F0F\u5E94\u7B54\uFF080xFE\uFF09\uFF0C\u672A\u8FD4\u56DE\u8BBE\u5907\u4FE1\u606F")), (ze2.current = null)),
          ze2.current && ze2.current.resolve(m3)),
          d3.command &&
            m3 &&
            !d3.error &&
            de2((e5) => ({
              ...e5,
              [d3.command]: {
                data: m3,
                timestamp: i3,
                rawData: {
                  hex: Array.from(c3)
                    .map((e6) => e6.toString(16).padStart(2, "0"))
                    .join("")
                    .toUpperCase(),
                  length: c3.length,
                },
              },
            })),
          (d3.command !== "0x11" && d3.command !== "0x01") ||
            !m3 ||
            m3.error ||
            (Me2.current && Me2.current.resolve(m3),
            se2(m3),
            ae2((e5) => ({
              ...e5,
              batteryLevel: `${m3.batteryLevel}%`,
              batteryHealth: `${m3.batteryHealth}%`,
              cycleCount: `${m3.cycleCount}\u6B21`,
              batteryTemperature: `${m3.batteryTemperature}\xB0C`,
              batteryVoltage: `${(m3.batteryVoltage / 1e3).toFixed(1)}V`,
              batteryCurrent: `${(m3.batteryCurrent / 1e3).toFixed(1)}A`,
            }))),
          d3.command === "0x14" &&
            m3 &&
            !m3.error &&
            (m3.cellIndex !== void 0 &&
              m3.batteryId &&
              $e2((e5) => ({ ...e5, [m3.cellIndex]: m3.batteryId })),
            Pe2.current &&
              Pe2.current.expectIndex === m3.cellIndex &&
              (Pe2.current.resolve(m3), (Pe2.current = null))),
          d3.command === "0x12" &&
            m3 &&
            (Te2.current ? Te2.current.resolve(m3) : m3.error || Ce2(m3)),
          d3.command === "0x13" &&
            Le2.current &&
            (m3 && !m3.error
              ? Le2.current.resolve(m3)
              : Le2.current.reject(
                  new Error(m3?.error || "\u5386\u53F2\u8BB0\u5F55\u89E3\u6790\u5931\u8D25"),
                ),
            (Le2.current = null)),
          d3.command === "0x16" &&
            m3 &&
            (m3.success ||
              ju.error({
                title: "QI 2.2",
                content:
                  "QI2.2\u8BBE\u7F6E\u5931\u8D25: " +
                  (m3.description || "\u672A\u77E5\u9519\u8BEF"),
                okText: "\u786E\u5B9A",
              }),
            _setQi2Busy(!1),
            (_qi2Lock.current = !1),
            m3.success && _qi2Fetch()),
          d3.command === "0x17" &&
            m3 &&
            (m3.success && _setQi2On(m3.isEnabled), _setQi2Busy(!1), (_qi2Lock.current = !1)),
          d3.command === "0x18" &&
            m3 &&
            (Ae2.current &&
              (m3.success
                ? Ae2.current.resolve(m3)
                : Ae2.current.reject(new Error("\u8BBE\u5907\u8FD4\u56DE\u5931\u8D25\u72B6\u6001")),
              (Ae2.current = null)),
            m3.success && Ie2(m3));
        const f3 = Array.from(c3)
            .map((e5) => e5.toString(16).padStart(2, "0"))
            .join("")
            .toUpperCase(),
          h3 = Array.from(c3)
            .map((e5) => (e5 >= 32 && e5 <= 126 ? String.fromCharCode(e5) : "."))
            .join("");
        Array.from(c3).map((e5) => `0x${e5.toString(16).toUpperCase()}`),
          c3.length,
          d3.frameHead,
          d3.command,
          d3.dataLength,
          d3.payloadHex,
          d3.payloadAscii,
          d3.checksum,
          d3.error,
          d3.error || c3[3 + d3.dataLength - 1].toString(16).toUpperCase(),
          d3.error ||
            Hh.calculateCRC8(c3.slice(0, 3 + d3.dataLength - 1))
              .toString(16)
              .toUpperCase(),
          qe2("\u2B05 \u63A5\u6536\u5230\u8BBE\u5907\u6570\u636E"),
          qe2("HEX:", f3),
          qe2("ASCII:", h3),
          qe2("\u534F\u8BAE\u89E3\u6790:", d3),
          qe2("\u7528\u6237\u53EF\u8BFB:", m3);
      },
      et2 = async () => {
        if (V2)
          try {
            Fe2(),
              V2.removeEventListener("disconnect", Ge2),
              V2._pollingInterval &&
                (clearInterval(V2._pollingInterval),
                X2((e4) => ({ ...e4, _pollingInterval: null })));
            try {
              const e4 = jh.HEAD,
                t3 = jh.CMD_DISCONNECT,
                o3 = new Uint8Array(0),
                n3 = o3.length,
                r3 = new Uint8Array([e4, t3, n3, ...o3]),
                l3 = Hh.calculateCRC8(r3),
                a3 = new Uint8Array([...r3, l3]),
                i3 = Array.from(a3)
                  .map((e5) => e5.toString(16).padStart(2, "0"))
                  .join("")
                  .toUpperCase();
              t3.toString(16).toUpperCase(),
                Array.from(o3).map((e5) => `0x${e5.toString(16).toUpperCase()}`),
                l3.toString(16).toUpperCase(),
                await Ue2(i3);
            } catch {}
            try {
              await V2.releaseInterface(V2._interfaceNumber);
            } catch {}
            if (V2.opened)
              try {
                await V2.close();
              } catch {}
            X2(null),
              J2(!1),
              We2(),
              e3(),
              qe2("\u2705 \u8BBE\u5907\u5DF2\u65AD\u5F00\u8FDE\u63A5"),
              ee2(!1);
          } catch (r3) {
            qe2("\u274C \u65AD\u5F00\u8BBE\u5907\u8FDE\u63A5\u5931\u8D25:", r3.message || r3);
          }
      };
    return (
      Nt.useEffect(() => {
        !V2 &&
          U2 &&
          (Fe2(),
          qe2(
            "\u{1F494} \u8BBE\u5907\u5DF2\u65AD\u5F00\u8FDE\u63A5\uFF0C\u505C\u6B62\u53D1\u9001\u5FC3\u8DF3\u5305",
          ));
      }, [V2, U2, Fe2]),
      Nt.useEffect(() => {
        const e4 = (e5) => {
          V2 && e5.device === V2 && Ge2();
        };
        return (
          navigator.hid.addEventListener("disconnect", e4),
          () => {
            navigator.hid.removeEventListener("disconnect", e4),
              V2 && V2.removeEventListener("disconnect", Ge2);
          }
        );
      }, [V2, Ge2]),
      Nt.useEffect(() => {
        const e4 = () => {
          V2 &&
            (ju.warning({
              title: "\u5B89\u5168\u63D0\u793A",
              content:
                "\u68C0\u6D4B\u5230\u5F00\u53D1\u8005\u5DE5\u5177\u5DF2\u6253\u5F00\uFF0C\u8BBE\u5907\u8FDE\u63A5\u5DF2\u65AD\u5F00\u3002\u8BF7\u5173\u95ED\u5F00\u53D1\u8005\u5DE5\u5177\u540E\u91CD\u65B0\u8FDE\u63A5\u3002",
              okText: "\u6211\u77E5\u9053\u4E86",
            }),
            et2());
        };
        return (
          window.addEventListener("security:devtools-opened", e4),
          () => window.removeEventListener("security:devtools-opened", e4)
        );
      }, [V2]),
      Nt.useEffect(
        () => () => {
          U2 && Fe2();
        },
        [U2, Fe2],
      ),
      Nt.useEffect(() => {
        if (!Z2) return;
        const e4 = async () => {
          if (document.visibilityState === "visible" && Z2 && !He2.current && U2)
            try {
              if (navigator.wakeLock) {
                const e5 = await navigator.wakeLock.request("screen");
                He2.current = e5;
              }
            } catch {}
        };
        return (
          document.addEventListener("visibilitychange", e4),
          () => document.removeEventListener("visibilitychange", e4)
        );
      }, [Z2, U2]),
      kt.jsxs("div", {
        className: " mx-auto space-y-3",
        children: [
          kt.jsx(ju, {
            title: K2("panel_disconnect_modal_title"),
            open: Q2,
            onOk: et2,
            onCancel: () => ee2(!1),
            okText: K2("panel_modal_ok"),
            cancelText: K2("panel_modal_cancel"),
            children: kt.jsx("p", { children: K2("panel_disconnect_modal_content") }),
          }),
          kt.jsx(ju, {
            title: null,
            open: ne2,
            footer: null,
            closable: !1,
            centered: !0,
            width: 320,
            styles: { content: { borderRadius: "16px", padding: "24px" } },
            children: kt.jsxs("div", {
              className: "flex flex-col items-center justify-center space-y-6",
              children: [
                kt.jsxs("div", {
                  className: "text-center",
                  children: [
                    kt.jsx("div", {
                      className: "text-yellow-500 text-4xl mb-4",
                      children: kt.jsx("i", { className: "fas fa-exclamation-triangle" }),
                    }),
                    kt.jsx("div", {
                      className: "text-base font-medium text-gray-800 mb-2",
                      children: K2("panel_unauthorized_title"),
                    }),
                    kt.jsx("p", {
                      className: "text-sm text-gray-500",
                      children: K2("panel_unauthorized_desc"),
                    }),
                  ],
                }),
                kt.jsx("button", {
                  className:
                    "w-full bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium transition-colors",
                  onClick: async () => {
                    V2?.productId && V2.productId.toString(16).toUpperCase(),
                      V2?.vendorId && V2.vendorId.toString(16).toUpperCase(),
                      re2(!1),
                      await et2();
                  },
                  children: K2("panel_modal_ok"),
                }),
              ],
            }),
          }),
          kt.jsx(ju, {
            open: te2,
            footer: null,
            closable: !1,
            centered: !0,
            width: 320,
            styles: { content: { borderRadius: "24px", padding: "32px 24px" } },
            children: kt.jsxs("div", {
              className: "flex flex-col items-center justify-center space-y-8",
              children: [
                kt.jsx("div", {
                  className: "text-base font-medium text-gray-800 text-center",
                  children: K2("panel_disconnected_toast"),
                }),
                kt.jsx("button", {
                  className:
                    "w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-2xl text-sm font-medium transition-colors",
                  onClick: () => oe2(!1),
                  children: K2("panel_modal_ok"),
                }),
              ],
            }),
          }),
          kt.jsxs("div", {
            className: "card p-8",
            children: [
              kt.jsxs("div", {
                className: "flex items-center mb-6 cursor-pointer",
                onClick: () => Re2(!Be2),
                children: [
                  kt.jsx("h2", {
                    className: "text-base font-bold text-gray-900",
                    children: K2("panel_how_to_view"),
                  }),
                  kt.jsx("img", {
                    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAOdEVYdFNvZnR3YXJlAEZpZ21hnrGWYwAAAs9JREFUeAHVmstO6zAQhqftKYcDB8QOIZa8AxLvv2PDlgVbJIQQQkJcSsLFf+OJHDe1nXgc7F8ataShyRePZ8ZTzyiNZtoW+u+5fv1W9mW9il9Y6nv+GDYP/D9A1YZFA8YCYQR2lC1J5uF8KFtRAzpKY28CILvUjEYKYbTeaATYUCCc/1fbFBo8YkOAMCp7FD4/pASYV2WfIScvKEyYJ/skF0SGaKavD3mhQoDgXv/o98Xz1QnlAwLMLuUjL5QLCMOcw8jYAhTyVS/UNiAc36d8hbwHoI3o1xexcGyP8he8ZyNI9Y1QyoQpKYapzYP2COHvHSpHCFqdh28D5RgEfOpULSYQ3K8EV7PFFf5aJlBJrmZryW8YyCwvSlS7fJkbB0oWLzBb3wstUsfoUNmZfn9NzTonhcBSMUhvkhIQYM71639lp8oeqFnnSAv3/7HQb1IUoAxjRk5c74TSQLVA3BeQVB8MKyVUlQLIBcNKBVVzMpWKcttgEAhq6zopoCoGkqgQXDCXym6VHVNaqE8pIB8Mj9A9pYWqeQ7FuBxC/gW5YdoLkhvqjqzlwEBVEi0p5JYQGN9nS/1dMfoCUFC/yyH7ibpgfOdEVxFcKcR0Qp+oebpHyh6VXVHYjdnuh6BxQ3F653LngKbviEoLDZNnhoiZiLlozcBAsfMoB3WAKkrwa9rE6gABpqJyhYS8HhAzEJQOtJYJxL9zlibccxsD7FC9ovLUyXl2LwGxvG04FCC4Wmeq9CXTqF+hJxTuccOjFo6Tc+/TvVDPg3cBQbm6HkamNyq7+nGIHDnOJ8C8b/vQ12BESMwJygkDhXRMOTf9NhRAvGkltAUM9wMYoKbeq8AbL4IqmSE9bdRK7IIpe+GmMCKD9vyMfdrIX2iOpNy8tKIRpZjU9jKJnMUVP2x0TSm5ARB9Ae7zDd0AiDkqsiZLNcF5ns0Mg/iGedOE+KLyB9nbpqwr93/WAAAAAElFTkSuQmCC",
                    alt: "collapse",
                    className:
                      "w-5 h-5 ml-2 transition-transform duration-200 " + (Be2 ? "rotate-180" : ""),
                  }),
                ],
              }),
              Be2 &&
                kt.jsxs("div", {
                  className: "space-y-8",
                  children: [
                    kt.jsxs("div", {
                      children: [
                        kt.jsx("h3", {
                          className: "text-sm font-bold text-gray-900 mb-1",
                          children: K2("panel_step_1"),
                        }),
                        kt.jsx("p", {
                          className: "text-sm text-gray-900 mb-1",
                          children: K2("panel_step1_desc"),
                        }),
                        kt.jsxs("p", {
                          className: "text-xs text-gray-400 flex items-center",
                          children: [
                            kt.jsx("img", { src: Fh, alt: "tips", className: "w-3.5 h-3.5 mr-1" }),
                            K2("panel_step1_tip_port"),
                            kt.jsx("a", {
                              href: "/models",
                              target: "_blank",
                              rel: "noopener noreferrer",
                              className: "text-blue-500 ml-1",
                              children: K2("panel_step1_link_models"),
                            }),
                          ],
                        }),
                        kt.jsxs("p", {
                          className: "text-xs text-gray-400 flex items-center",
                          style: { marginTop: "4px" },
                          children: [
                            kt.jsx("img", { src: Fh, alt: "tips", className: "w-3.5 h-3.5 mr-1" }),
                            K2("panel_step1_tip_cable"),
                          ],
                        }),
                      ],
                    }),
                    kt.jsxs("div", {
                      children: [
                        kt.jsx("h3", {
                          className: "text-sm font-bold text-gray-900 mb-1",
                          children: K2("panel_step_2"),
                        }),
                        kt.jsx("p", {
                          className: "text-sm text-gray-900 mb-1",
                          children: K2("panel_step2_desc"),
                        }),
                      ],
                    }),
                    kt.jsxs("div", {
                      children: [
                        kt.jsx("h3", {
                          className: "text-sm font-bold text-gray-900 mb-1",
                          children: K2("panel_step_3"),
                        }),
                        kt.jsx("p", {
                          className: "text-sm text-gray-900 mb-1",
                          children: K2("panel_step3_desc"),
                        }),
                        kt.jsxs("p", {
                          className: "text-xs text-gray-400 flex items-start",
                          children: [
                            kt.jsx("img", {
                              src: Fh,
                              alt: "tips",
                              className: "w-3.5 h-3.5 mr-1 mt-0.5",
                            }),
                            kt.jsx("span", { children: K2("panel_step3_tip") }),
                          ],
                        }),
                      ],
                    }),
                    kt.jsx("button", {
                      disabled: Z2,
                      className:
                        (Z2 ? "bg-opacity-20 text-white" : "bg-blue-500 text-white") +
                        " bg-blue-600 px-8 py-2 rounded-lg text-sm font-medium",
                      style: { borderRadius: "16px" },
                      onClick: Z2
                        ? null
                        : async () => {
                            var e4;
                            try {
                              navigator.wakeLock &&
                                !He2.current &&
                                navigator.wakeLock
                                  .request("screen")
                                  .then((e5) => {
                                    (He2.current = e5),
                                      e5.addEventListener("release", () => {
                                        He2.current = null;
                                      });
                                  })
                                  .catch((e5) => {});
                              const r3 = await navigator.hid.requestDevice({
                                filters: [{ vendorId: 10007 }, { vendorId: 6790 }],
                              });
                              if (!r3.length) return void qe2("\u672A\u9009\u62E9\u8BBE\u5907");
                              const l3 = r3[0];
                              await l3.open(),
                                We2(),
                                l3.addEventListener("inputreport", Qe2),
                                l3.addEventListener("disconnect", Ge2),
                                X2(l3),
                                J2(!0),
                                l3.productName,
                                l3.vendorId.toString(16).toUpperCase(),
                                l3.productId.toString(16).toUpperCase(),
                                l3.collections;
                              let a3;
                              qe2("\u2705 \u8BBE\u5907\u5DF2\u8FDE\u63A5"),
                                qe2("\u4EA7\u54C1:", l3.productName),
                                qe2("VID:", l3.vendorId, "PID:", l3.productId),
                                ae2((e5) => ({
                                  ...e5,
                                  productName:
                                    l3.productName || "\u5C0F\u7C73\u5145\u7535\u5B9DPro",
                                  productModel: `${l3.vendorId}:${l3.productId}`,
                                  serialNumber: `${l3.vendorId}:${l3.productId}`,
                                })),
                                t2();
                              try {
                                a3 = await (async (e5) =>
                                  new Promise((t3, o3) => {
                                    const n3 = setTimeout(() => {
                                      ze2.current &&
                                        ((ze2.current = null),
                                        o3(
                                          new Error(
                                            "\u8BBE\u5907\u9A8C\u8BC1\u8D85\u65F6\uFF1A\u672A\u5728\u89C4\u5B9A\u65F6\u95F4\u5185\u6536\u5230Hello\u54CD\u5E94",
                                          ),
                                        ));
                                    }, 1e3);
                                    (ze2.current = {
                                      resolve: (e6) => {
                                        clearTimeout(n3), (ze2.current = null), t3(e6);
                                      },
                                      reject: (e6) => {
                                        clearTimeout(n3), (ze2.current = null), o3(e6);
                                      },
                                    }),
                                      Xe2(e5).catch((e6) => {
                                        clearTimeout(n3), (ze2.current = null), o3(e6);
                                      });
                                  }))(l3);
                              } catch {
                                return void re2(!0);
                              }
                              if (
                                (await (async (e5 = V2, { silent: t3 = !1 } = {}) => {
                                  if (Ee2 || !e5) return;
                                  ke2(!0);
                                  let o3 = 0,
                                    n3 = !1;
                                  const r4 = (() => {
                                    const e6 = jh.HEAD,
                                      t4 = jh.CMD_GET_BATTERY_INFO,
                                      o4 = new Uint8Array(0),
                                      n4 = new Uint8Array([e6, t4, 0, ...o4]),
                                      r5 = Hh.calculateCRC8(n4),
                                      l4 = new Uint8Array([...n4, r5]);
                                    return Array.from(l4)
                                      .map((e7) => e7.toString(16).padStart(2, "0"))
                                      .join("")
                                      .toUpperCase();
                                  })();
                                  for (; o3 < 3 && !n3; ) {
                                    o3++;
                                    try {
                                      const t4 = new Promise((e6, t5) => {
                                        const o5 = setTimeout(() => {
                                          Me2.current &&
                                            ((Me2.current = null),
                                            t5(new Error("\u8BF7\u6C42\u8D85\u65F6 (1s)")));
                                        }, 1e3);
                                        Me2.current = {
                                          resolve: (t6) => {
                                            clearTimeout(o5), e6(t6);
                                          },
                                          reject: (e7) => {
                                            clearTimeout(o5), t5(e7);
                                          },
                                        };
                                      });
                                      await _e2.sendHexCommand(e5, r4);
                                      const o4 = await t4;
                                      if (!o4 || o4.error)
                                        throw new Error(K2("error_device_return_invalid"));
                                      n3 = !0;
                                    } catch (l4) {
                                      if (o3 >= 3)
                                        t3 ||
                                          ju.error({
                                            title: K2("panel_refresh_main_error_title"),
                                            content: `${K2("panel_refresh_main_error_content")}: ${l4.message}`,
                                            okText: K2("panel_modal_ok"),
                                          });
                                      else {
                                        const e6 = 500 * Math.pow(2, o3 - 1);
                                        await new Promise((t4) => setTimeout(t4, e6));
                                      }
                                    }
                                  }
                                  ke2(!1), (Me2.current = null);
                                })(l3, { silent: !0 }),
                                await new Promise((e5) => setTimeout(e5, 30)),
                                await Ve2(l3),
                                await new Promise((e5) => setTimeout(e5, 30)),
                                ((e4 = a3?.deviceModelInfo) == null ? void 0 : e4.id) > 14 &&
                                  (await (async (e5 = V2) => {
                                    const t3 = e5 || V2;
                                    if (!t3) return;
                                    let o3 = 0,
                                      n3 = !1;
                                    const r4 = (() => {
                                      const e6 = jh.HEAD,
                                        t4 = jh.CMD_GET_CELL_TEMP_MODEL,
                                        o4 = new Uint8Array(0),
                                        n4 = new Uint8Array([e6, t4, 0, ...o4]),
                                        r5 = Hh.calculateCRC8(n4),
                                        l4 = new Uint8Array([...n4, r5]);
                                      return Array.from(l4)
                                        .map((e7) => e7.toString(16).padStart(2, "0"))
                                        .join("")
                                        .toUpperCase();
                                    })();
                                    for (; o3 < 3 && !n3; ) {
                                      o3++;
                                      try {
                                        const e6 = new Promise((e7, t4) => {
                                          const o5 = setTimeout(() => {
                                            Ae2.current &&
                                              ((Ae2.current = null),
                                              t4(new Error("\u8BF7\u6C42\u8D85\u65F6 (5s)")));
                                          }, 5e3);
                                          Ae2.current = {
                                            resolve: (t5) => {
                                              clearTimeout(o5), e7(t5);
                                            },
                                            reject: (e8) => {
                                              clearTimeout(o5), t4(e8);
                                            },
                                          };
                                        });
                                        await _e2.sendHexCommand(t3, r4);
                                        const o4 = await e6;
                                        if (!o4 || !o4.success)
                                          throw new Error(
                                            "\u8BBE\u5907\u8FD4\u56DE\u5931\u8D25\u72B6\u6001",
                                          );
                                        n3 = !0;
                                      } catch (l4) {
                                        if (
                                          l4.message ===
                                          "\u8BBE\u5907\u5DF2\u65AD\u5F00\uFF0C\u53D6\u6D88\u8BF7\u6C42"
                                        )
                                          break;
                                        if (!(o3 >= 3)) {
                                          const e6 = 500 * Math.pow(2, o3 - 1);
                                          await new Promise((t4) => setTimeout(t4, e6));
                                        }
                                      }
                                    }
                                    Ae2.current = null;
                                  })(l3),
                                  await new Promise((e5) => setTimeout(e5, 30))),
                                !U2)
                              )
                                try {
                                  const e5 = new Vh();
                                  (e5.onmessage = (e6) => {
                                    var t3;
                                    ((t3 = e6.data) == null ? void 0 : t3.type) === "tick" &&
                                      Xe2(l3);
                                  }),
                                    (e5.onerror = (e6) => {}),
                                    e5.postMessage({ type: "start", interval: 15e3 }),
                                    Y2(e5),
                                    qe2(
                                      "\u{1F493} \u542F\u52A8Hello\u547D\u4EE4\u5B9A\u65F6\u53D1\u9001\uFF0815\u79D2\u95F4\u9694\uFF0CWeb Worker\uFF09",
                                    );
                                } catch {
                                  const e5 = setInterval(() => {
                                    Xe2(l3);
                                  }, 15e3);
                                  Y2(e5),
                                    qe2(
                                      "\u{1F493} \u542F\u52A8Hello\u547D\u4EE4\u5B9A\u65F6\u53D1\u9001\uFF0815\u79D2\u95F4\u9694\uFF0C\u964D\u7EA7\u6A21\u5F0F\uFF09",
                                    );
                                }
                            } catch (n3) {
                              n3.name,
                                n3.message,
                                n3.stack,
                                qe2("\u274C \u8FDE\u63A5\u5931\u8D25:", n3.message || n3);
                            }
                          },
                      children: K2(Z2 ? "panel_connected_button" : "panel_connect_button"),
                    }),
                  ],
                }),
            ],
          }),
          Z2 && _qi2Model(De2.current)?.supportsQI2 && !_qi2Model(De2.current)?.qi2Unsupported
            ? kt.jsxs("div", {
                className: "card p-8 flex justify-between items-center",
                children: [
                  kt.jsxs("div", {
                    children: [
                      kt.jsx("h2", {
                        className: "text-base font-bold text-gray-900 mb-1",
                        children: _qi2On
                          ? W2 === "en"
                            ? "Qi 2.2 is enabled"
                            : "此设备已开启 QI 2.2 功能"
                          : W2 === "en"
                            ? "This device supports Qi 2.2"
                            : "此设备可开启 QI 2.2 功能",
                      }),
                      kt.jsx("p", {
                        className: "text-xs text-gray-500",
                        children: _qi2On
                          ? W2 === "en"
                            ? "25W wireless charging is active."
                            : "开启后，将支持25W无线快充"
                          : W2 === "en"
                            ? "25W wireless charging is supported after enabling."
                            : "开启后，将支持25W无线快充",
                      }),
                      _qi2Model(De2.current)?.qi2Unknown
                        ? kt.jsx("p", {
                            className: "text-xs text-amber-600 mt-1",
                            children:
                              W2 === "en"
                                ? "May support Qi 2.2. Not tested on this model; firmware differences can block it."
                                : "\u53EF\u80FD\u652F\u6301 QI 2.2\uFF0C\u672A\u7ECF\u8BE5\u578B\u53F7\u5B9E\u673A\u6D4B\u8BD5\uFF0C\u56FA\u4EF6\u5DEE\u5F02\u53EF\u80FD\u5BFC\u81F4\u65E0\u6CD5\u5F00\u542F\u3002",
                          })
                        : null,

                    ],
                  }),
                  kt.jsx("div", {
                    className: "flex items-center space-x-3",
                    children: _qi2On
                      ? kt.jsxs(kt.Fragment, {
                          children: [
                            kt.jsx("button", {
                              disabled: !0,
                              className:
                                "bg-opacity-20 text-white bg-blue-600 px-6 py-1.5 rounded text-sm font-medium border-none outline-none focus:outline-none focus:ring-0 cursor-not-allowed",
                              style: { borderRadius: "16px" },
                              children: W2 === "en" ? "Enabled" : "已开启",
                            }),
                            kt.jsx("button", {
                              disabled: _qi2Busy,
                              onClick: (e4) => {
                                (e4 && (!e4.isTrusted || e4.clientX === 0 || e4.clientY === 0)) ||
                                  _qi2Apply(!1);
                              },
                              className:
                                "px-4 py-1.5 rounded text-sm font-medium border-none outline-none bg-gray-100 text-gray-700",
                              style: {
                                borderRadius: "16px",
                                cursor: _qi2Busy ? "not-allowed" : "pointer",
                                opacity: _qi2Busy ? 0.6 : 1,
                              },
                              children: _qi2Busy
                                ? W2 === "en"
                                  ? "Working..."
                                  : "处理中…"
                                : W2 === "en"
                                  ? "Disable"
                                  : "关闭",
                            }),
                          ],
                        })
                      : kt.jsx("button", {
                          disabled: _qi2Busy,
                          onClick: (e4) => {
                            (e4 && (!e4.isTrusted || e4.clientX === 0 || e4.clientY === 0)) ||
                              _qi2Apply(!0);
                          },
                          className:
                            (_qi2Busy
                              ? "bg-opacity-20 text-white cursor-not-allowed"
                              : "bg-blue-500 text-white") +
                            " bg-blue-600 px-6 py-1.5 rounded text-sm font-medium border-none outline-none focus:outline-none focus:ring-0",
                          style: { borderRadius: "16px" },
                          children: _qi2Busy
                            ? kt.jsxs("span", {
                                className: "flex items-center",
                                children: [
                                  kt.jsx("i", { className: "fas fa-circle-notch fa-spin mr-1" }),
                                  W2 === "en" ? "Enabling" : "正在开启",
                                ],
                              })
                            : W2 === "en"
                              ? _qi2Model(De2.current)?.qi2Unknown
                                ? "Try (untested)"
                                : "Enable now"
                              : _qi2Model(De2.current)?.qi2Unknown
                                ? "未经测试尝试开启"
                                : "立即开启",
                        }),
                  }),
                ],
              })
            : Z2 && _qi2Model(De2.current)?.qi2Pending
              ? kt.jsxs("div", {
                  className: "card p-8",
                  children: [
                    kt.jsx("h2", {
                      className: "text-base font-bold text-gray-900 mb-1",
                      children:
                        W2 === "en"
                          ? "Qi 2.2 temporarily unavailable"
                          : "该设备暂未支持开启 QI 2.2",
                    }),
                    kt.jsx("p", {
                      className: "text-xs text-gray-500 leading-relaxed",
                      children:
                        W2 === "en"
                          ? "This model may support Qi 2.2 at the hardware level, but requires a new enabling method. It is not available in this page yet."
                          : "此型号可能在硬件层面支持 QI 2.2，但需要新版开启方式，本页面暂未适配；请勿使用旧方式尝试。",
                    }),
                  ],
                })
              : Z2 && _qi2Model(De2.current)?.qi2Unsupported
              ? kt.jsxs("div", {
                  className: "card p-8",
                  children: [
                    kt.jsx("h2", {
                      className: "text-base font-bold text-gray-900 mb-1",
                      children:
                        W2 === "en"
                          ? "Qi 2.2 is not supported on this model"
                          : "\u8BE5\u8BBE\u5907\u7684 QI 2.2 \u5F00\u542F\u65B9\u5F0F\u6682\u4E0D\u9002\u914D",
                    }),
                    kt.jsx("p", {
                      className: "text-xs text-gray-500 leading-relaxed",
                      children:
                        W2 === "en"
                          ? "Xiaomi UltraThin Magnetic Power Bank 5000 25W (WPB0525S) rejects both the encrypted and the plaintext enable command, so this page does not offer the toggle."
                          : "\u6B64\u578B\u53F7\u786C\u4EF6\u5C42\u9762\u652F\u6301 QI 2.2\uFF0C\u4F46\u5F53\u524D\u5F00\u542F\u65B9\u5F0F\u5C1A\u672A\u9002\u914D\uFF1B\u5BC6\u6587\u4E0E\u660E\u6587\u4E24\u79CD\u5F00\u542F\u6307\u4EE4\u5747\u88AB\u56FA\u4EF6\u62D2\u7EDD\uFF0C\u56E0\u6B64\u672C\u9875\u9762\u4E0D\u63D0\u4F9B\u5F00\u5173\u3002",
                    }),
                  ],
                })
            : Z2 && _qi2Model(De2.current)?.qi2Unknown
                ? kt.jsxs("div", {
                    className: "card p-8",
                    children: [
                      kt.jsx("h2", {
                        className: "text-base font-bold text-gray-900 mb-1",
                        children:
                          W2 === "en"
                            ? "Qi 2.2 support unconfirmed"
                            : "无法确定该设备是否支持 QI 2.2",
                      }),
                      kt.jsx("p", {
                        className: "text-xs text-gray-500 leading-relaxed",
                        children:
                          W2 === "en"
                            ? "Whether this model supports Qi 2.2 cannot be confirmed. Please refer to actual device behavior; do not retry with the old method."
                            : "此型号是否支持 QI 2.2 暂时无法确定，请以实机为准；请勿使用旧方式反复尝试。",
                      }),
                    ],
                  })
                : null,
          Z2
            ? kt.jsx(kt.Fragment, {
                children: kt.jsxs("div", {
                  className: "card p-8",
                  children: [
                    kt.jsxs("div", {
                      className: "flex justify-between items-center mb-6",
                      children: [
                        kt.jsx("h2", {
                          className: "text-lg font-bold text-gray-900",
                          children: K2("panel_connected_title"),
                        }),
                        kt.jsx("button", {
                          className:
                            "bg-red-600 text-white px-6 py-1.5 rounded text-sm font-medium",
                          onClick: () => ee2(!0),
                          style: { borderRadius: "16px" },
                          children: K2("panel_disconnect_button"),
                        }),
                      ],
                    }),
                    kt.jsxs(yc, {
                      defaultActiveKey: "1",
                      className: "w-full mb-8",
                      onChange: async (e4) => {
                        e4 === "2" &&
                          V2 &&
                          (pe2(1),
                          (async () => {
                            if (!V2 || be2) return;
                            fe2(!0), ge2([]);
                            const e5 = [];
                            let t3 = !1;
                            try {
                              const n3 = ie2.historyErrorCount || 0;
                              if (n3 === 0) return void ve2(!0);
                              const r3 = 7,
                                l3 = Math.ceil(n3 / r3);
                              for (let a3 = 1; a3 <= l3 && !t3; a3++) {
                                const l4 = (a3 - 1) * r3 + 1,
                                  i3 = Math.min(a3 * r3, n3),
                                  s3 = 165,
                                  c3 = 3,
                                  d3 = new Uint8Array([
                                    255 & l4,
                                    (l4 >> 8) & 255,
                                    255 & i3,
                                    (i3 >> 8) & 255,
                                  ]),
                                  u3 = new Uint8Array([s3, c3, 4, ...d3]),
                                  p3 = Hh.calculateCRC8(u3),
                                  m3 = new Uint8Array([...u3, p3]),
                                  f3 = Array.from(m3)
                                    .map((e6) => e6.toString(16).padStart(2, "0"))
                                    .join("")
                                    .toUpperCase();
                                let h3 = 0,
                                  g3 = !1;
                                for (; h3 < 3 && !g3 && !t3; ) {
                                  h3++;
                                  try {
                                    const e6 = new Promise((e7, t4) => {
                                      const o3 = setTimeout(() => {
                                        Le2.current &&
                                          ((Le2.current = null),
                                          t4(
                                            new Error(
                                              `\u6279\u6B21 ${a3} \u8BF7\u6C42\u8D85\u65F6 (2s)`,
                                            ),
                                          ));
                                      }, 2e3);
                                      Le2.current = {
                                        resolve: (t5) => {
                                          clearTimeout(o3), e7(t5);
                                        },
                                        reject: (e8) => {
                                          clearTimeout(o3), t4(e8);
                                        },
                                      };
                                    });
                                    await Ue2(f3),
                                      await e6,
                                      (g3 = !0),
                                      await new Promise((e7) => setTimeout(e7, 200));
                                  } catch (o3) {
                                    if (
                                      o3.message ===
                                      "\u8BBE\u5907\u5DF2\u65AD\u5F00\uFF0C\u53D6\u6D88\u8BF7\u6C42"
                                    ) {
                                      t3 = !0;
                                      break;
                                    }
                                    if (h3 >= 3) e5.push(a3);
                                    else {
                                      const e6 = 500 * Math.pow(2, h3 - 1);
                                      await new Promise((t4) => setTimeout(t4, e6));
                                    }
                                  }
                                }
                              }
                              !t3 && e5.length;
                            } catch {
                            } finally {
                              fe2(!1), ve2(!0);
                            }
                          })());
                      },
                      children: [
                        kt.jsx(
                          Xh,
                          {
                            tab: K2("panel_tab_details"),
                            children: kt.jsxs("div", {
                              className: "bg-[#F9FAFB] rounded-3xl p-8 space-y-10",
                              children: [
                                kt.jsxs("div", {
                                  className: "flex flex-col md:flex-row items-start",
                                  children: [
                                    kt.jsx("div", {
                                      className: "w-full md:w-32 mb-4 md:mb-0 flex items-center",
                                      children: kt.jsx("h3", {
                                        className: "text-sm font-bold text-gray-900 mr-2",
                                        children: K2("panel_basic_info"),
                                      }),
                                    }),
                                    kt.jsxs("div", {
                                      className: "flex-1 space-y-5 w-full",
                                      children: [
                                        kt.jsxs("div", {
                                          className: "flex flex-col sm:flex-row text-sm",
                                          children: [
                                            kt.jsx("span", {
                                              className: "text-gray-500 w-40 shrink-0",
                                              children: K2("panel_product_name"),
                                            }),
                                            kt.jsx("span", {
                                              className: "text-gray-900",
                                              children:
                                                (W2 === "en"
                                                  ? (r2 =
                                                      (n2 =
                                                        (o2 = ce2["0x10"]) == null
                                                          ? void 0
                                                          : o2.data) == null
                                                        ? void 0
                                                        : n2.deviceModelInfo) == null
                                                    ? void 0
                                                    : r2.nameEn
                                                  : (a2 =
                                                        (l2 = ce2["0x10"]) == null
                                                          ? void 0
                                                          : l2.data) == null
                                                    ? void 0
                                                    : a2.name) || le2.productName,
                                            }),
                                          ],
                                        }),
                                        kt.jsxs("div", {
                                          className: "flex flex-col sm:flex-row text-sm",
                                          children: [
                                            kt.jsx("span", {
                                              className: "text-gray-500 w-40 shrink-0",
                                              children: K2("panel_product_model"),
                                            }),
                                            kt.jsx("span", {
                                              className: "text-gray-900",
                                              children:
                                                ((s2 =
                                                  (i2 = ce2["0x10"]) == null ? void 0 : i2.data) ==
                                                null
                                                  ? void 0
                                                  : s2.deviceModel) || "--",
                                            }),
                                          ],
                                        }),
                                        ((u2 =
                                          (d2 = (c2 = ce2["0x10"]) == null ? void 0 : c2.data) ==
                                          null
                                            ? void 0
                                            : d2.deviceModelInfo) == null
                                          ? void 0
                                          : u2.model) !== "WPB1007ZX" &&
                                          kt.jsxs("div", {
                                            className: "flex flex-col sm:flex-row text-sm",
                                            children: [
                                              kt.jsx("span", {
                                                className: "text-gray-500 w-40 shrink-0",
                                                children: K2("panel_device_sn"),
                                              }),
                                              kt.jsx("span", {
                                                className: "text-gray-900",
                                                children:
                                                  ((m2 =
                                                    (p2 = ce2["0x10"]) == null
                                                      ? void 0
                                                      : p2.data) == null
                                                    ? void 0
                                                    : m2.sn) || le2.serialNumber,
                                              }),
                                            ],
                                          }),
                                        kt.jsxs("div", {
                                          className: "flex flex-col sm:flex-row text-sm",
                                          children: [
                                            kt.jsx("span", {
                                              className: "text-gray-500 w-40 shrink-0",
                                              children: K2("panel_battery_level"),
                                            }),
                                            kt.jsx("span", {
                                              className: "text-gray-900",
                                              children:
                                                (h2 =
                                                  (f2 = ce2["0x11"]) == null ? void 0 : f2.data) !=
                                                  null && h2.batteryLevel
                                                  ? `${(b2 = (g2 = ce2["0x11"]) == null ? void 0 : g2.data) == null ? void 0 : b2.batteryLevel}%`
                                                  : le2.batteryLevel,
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                kt.jsx("div", { className: "h-px bg-gray-200 w-full" }),
                                kt.jsxs("div", {
                                  className: "flex flex-col md:flex-row items-start",
                                  children: [
                                    kt.jsx("div", {
                                      className: "w-full md:w-32 mb-4 md:mb-0",
                                      children: kt.jsx("h3", {
                                        className: "text-sm font-bold text-gray-900",
                                        children: K2("panel_battery_info"),
                                      }),
                                    }),
                                    kt.jsxs("div", {
                                      className: "flex-1 space-y-5 w-full",
                                      children: [
                                        (($2 =
                                          (y2 = (v2 = ce2["0x10"]) == null ? void 0 : v2.data) ==
                                          null
                                            ? void 0
                                            : y2.deviceModelInfo) == null
                                          ? void 0
                                          : $2.id) !== 9 &&
                                          kt.jsxs(kt.Fragment, {
                                            children: [
                                              kt.jsxs("div", {
                                                className: "flex flex-col sm:flex-row text-sm",
                                                children: [
                                                  kt.jsx("span", {
                                                    className: "text-gray-500 w-40 shrink-0",
                                                    children: K2("panel_battery_health"),
                                                  }),
                                                  kt.jsx("span", {
                                                    className: "text-gray-900",
                                                    children:
                                                      (C2 =
                                                        (x2 = ce2["0x11"]) == null
                                                          ? void 0
                                                          : x2.data) != null && C2.batteryHealth
                                                        ? `${(S2 = (w2 = ce2["0x11"]) == null ? void 0 : w2.data) == null ? void 0 : S2.batteryHealth}%`
                                                        : le2.batteryHealth,
                                                  }),
                                                ],
                                              }),
                                              kt.jsxs("div", {
                                                className: "flex flex-col sm:flex-row text-sm",
                                                children: [
                                                  kt.jsx("span", {
                                                    className: "text-gray-500 w-40 shrink-0",
                                                    children: K2("panel_cycle_count"),
                                                  }),
                                                  kt.jsxs("span", {
                                                    className: "text-gray-900",
                                                    children: [
                                                      ((k2 =
                                                        (E2 = ce2["0x11"]) == null
                                                          ? void 0
                                                          : E2.data) == null
                                                        ? void 0
                                                        : k2.cycleCount) ?? le2.cycleCount,
                                                      K2("panel_cycle_unit"),
                                                    ],
                                                  }),
                                                ],
                                              }),
                                            ],
                                          }),
                                        kt.jsxs("div", {
                                          className: "flex flex-col sm:flex-row text-sm",
                                          children: [
                                            kt.jsx("span", {
                                              className: "text-gray-500 w-40 shrink-0",
                                              children: K2("panel_battery_model"),
                                            }),
                                            kt.jsx("span", {
                                              className: "text-gray-900",
                                              children:
                                                Ne2?.batteryModel ||
                                                ((R2 =
                                                  (B2 =
                                                    (I2 =
                                                      (N2 = ce2["0x14"]) == null
                                                        ? void 0
                                                        : N2.data) == null
                                                      ? void 0
                                                      : I2.batteryIdParsed) == null
                                                    ? void 0
                                                    : B2.miCodeInfo) == null
                                                  ? void 0
                                                  : R2.cellModel) ||
                                                "--",
                                            }),
                                          ],
                                        }),
                                        kt.jsxs("div", {
                                          className: "flex flex-col sm:flex-row text-sm",
                                          children: [
                                            kt.jsx("span", {
                                              className: "text-gray-500 w-40 shrink-0",
                                              children: K2("panel_battery_manufacturer"),
                                            }),
                                            kt.jsx("span", {
                                              className: "text-gray-900",
                                              children:
                                                (W2 === "en"
                                                  ? (A2 =
                                                      (P2 =
                                                        (M2 =
                                                          (T2 = ce2["0x14"]) == null
                                                            ? void 0
                                                            : T2.data) == null
                                                          ? void 0
                                                          : M2.batteryIdParsed) == null
                                                        ? void 0
                                                        : P2.fixed) == null
                                                    ? void 0
                                                    : A2.assemblyFactoryEn
                                                  : (z2 =
                                                        (D2 =
                                                          (O2 =
                                                            (L2 = ce2["0x14"]) == null
                                                              ? void 0
                                                              : L2.data) == null
                                                            ? void 0
                                                            : O2.batteryIdParsed) == null
                                                          ? void 0
                                                          : D2.fixed) == null
                                                    ? void 0
                                                    : z2.assemblyFactory) || "--",
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                kt.jsx("div", { className: "h-px bg-gray-200 w-full" }),
                                kt.jsxs("div", {
                                  className: "flex flex-col md:flex-row items-start",
                                  children: [
                                    kt.jsxs("div", {
                                      className:
                                        "w-full md:w-32 mb-4 md:mb-0 shrink-0 self-start " +
                                        (W2 === "zh-rCN"
                                          ? "whitespace-nowrap flex items-center"
                                          : ""),
                                      children: [
                                        kt.jsx("h3", {
                                          className:
                                            "text-sm font-bold text-gray-900 " +
                                            (W2 === "zh-rCN" ? "mr-2" : ""),
                                          children: K2("panel_battery_temperature"),
                                        }),
                                        kt.jsx("button", {
                                          onClick: () => Je2(),
                                          disabled: we2,
                                          className:
                                            "text-blue-500 hover:text-blue-600 text-sm font-medium transition-colors p-0 border-0 bg-transparent min-w-0 min-h-0 h-auto leading-normal",
                                          style: { lineHeight: "inherit" },
                                          children: K2("panel_refresh"),
                                        }),
                                      ],
                                    }),
                                    kt.jsxs("div", {
                                      className: "flex-1 w-full",
                                      children: [
                                        kt.jsx("div", {
                                          className: "space-y-5 mb-6",
                                          children:
                                            xe2 && xe2.cells
                                              ? xe2.cells
                                                  .filter((e4) => {
                                                    var t3, o3, n3;
                                                    return ((n3 =
                                                      (o3 =
                                                        (t3 = ce2["0x10"]) == null
                                                          ? void 0
                                                          : t3.data) == null
                                                        ? void 0
                                                        : o3.deviceModelInfo) == null
                                                      ? void 0
                                                      : n3.model) === "WPB1007ZX"
                                                      ? e4.index === 1
                                                      : e4.temperature.value !== -127;
                                                  })
                                                  .map((e4, t3) => {
                                                    const o3 = `${K2("panel_temp_sensor")} ${t3 + 1}`;
                                                    return kt.jsxs(
                                                      "div",
                                                      {
                                                        className:
                                                          "flex flex-col sm:flex-row text-sm",
                                                        children: [
                                                          kt.jsx("span", {
                                                            className:
                                                              "text-gray-500 w-40 shrink-0",
                                                            children: o3,
                                                          }),
                                                          kt.jsxs("span", {
                                                            className: "text-gray-900",
                                                            children: [
                                                              e4.temperature.value,
                                                              "\xB0C",
                                                            ],
                                                          }),
                                                        ],
                                                      },
                                                      e4.index,
                                                    );
                                                  })
                                              : kt.jsx("div", {
                                                  className: "text-sm text-gray-400",
                                                  children: K2("panel_no_temp_data"),
                                                }),
                                        }),
                                        ((nt2 =
                                          (ot2 = (tt2 = ce2["0x10"]) == null ? void 0 : tt2.data) ==
                                          null
                                            ? void 0
                                            : ot2.deviceModelInfo) == null
                                          ? void 0
                                          : nt2.id) >= 16
                                          ? Ne2?.highTempThreshold == null ||
                                            Ne2?.lowTempThreshold == null
                                            ? null
                                            : kt.jsxs("div", {
                                                className:
                                                  "text-xs text-gray-400 leading-relaxed flex items-start",
                                                children: [
                                                  kt.jsx("img", {
                                                    src: Fh,
                                                    alt: "tips",
                                                    className:
                                                      "w-3.5 h-3.5 mr-1.5 mt-0.5 opacity-60",
                                                  }),
                                                  kt.jsxs("span", {
                                                    children: [
                                                      F2("panel_temp_range_tip", {
                                                        tempRange: Ne2.tempRange,
                                                      }),
                                                      kt.jsx("br", {}),
                                                      K2("panel_temp_protect_tip"),
                                                    ],
                                                  }),
                                                ],
                                              })
                                          : kt.jsxs("div", {
                                              className:
                                                "text-xs text-gray-400 leading-relaxed flex items-start",
                                              children: [
                                                kt.jsx("img", {
                                                  src: Fh,
                                                  alt: "tips",
                                                  className: "w-3.5 h-3.5 mr-1.5 mt-0.5 opacity-60",
                                                }),
                                                kt.jsxs("span", {
                                                  children: [
                                                    F2("panel_temp_range_tip", {
                                                      tempRange:
                                                        ((at2 =
                                                          (lt2 =
                                                            (rt2 = ce2["0x10"]) == null
                                                              ? void 0
                                                              : rt2.data) == null
                                                            ? void 0
                                                            : lt2.deviceModelInfo) == null
                                                          ? void 0
                                                          : at2.tempRange) || "-20\u2103~60\u2103",
                                                    }),
                                                    kt.jsx("br", {}),
                                                    K2("panel_temp_protect_tip"),
                                                  ],
                                                }),
                                              ],
                                            }),
                                      ],
                                    }),
                                  ],
                                }),
                                kt.jsx("div", { className: "h-px bg-gray-200 w-full" }),
                                kt.jsxs("div", {
                                  className: "flex flex-col md:flex-row items-start",
                                  children: [
                                    kt.jsxs("div", {
                                      className:
                                        "w-full md:w-32 mb-4 md:mb-0 flex items-center shrink-0 whitespace-nowrap self-start",
                                      children: [
                                        kt.jsx("h3", {
                                          className: "text-sm font-bold text-gray-900 mr-2",
                                          children: K2("panel_cell_info"),
                                        }),
                                        kt.jsx("button", {
                                          onClick: () => {
                                            Je2();
                                          },
                                          disabled: we2,
                                          className:
                                            "text-blue-500 hover:text-blue-600 text-sm font-medium transition-colors p-0 border-0 bg-transparent min-w-0 min-h-0 h-auto leading-normal",
                                          style: { lineHeight: "inherit" },
                                          children: K2("panel_refresh"),
                                        }),
                                      ],
                                    }),
                                    kt.jsxs("div", {
                                      className: "flex-1 w-full overflow-x-auto",
                                      children: [
                                        kt.jsxs("table", {
                                          className: "w-full text-left text-sm",
                                          children: [
                                            kt.jsx("thead", {
                                              children: kt.jsxs("tr", {
                                                className:
                                                  "text-gray-500 border-b border-transparent",
                                                children: [
                                                  kt.jsx("th", {
                                                    className: "pb-4 font-normal w-24",
                                                    children: K2("panel_cell"),
                                                  }),
                                                  kt.jsx("th", {
                                                    className: "pb-4 font-normal w-24",
                                                    children: K2("panel_voltage"),
                                                  }),
                                                  kt.jsx("th", {
                                                    className: "pb-4 font-normal w-32",
                                                    children: K2("panel_production_date"),
                                                  }),
                                                  ((_2 =
                                                    (j2 =
                                                      (H2 = ce2["0x10"]) == null
                                                        ? void 0
                                                        : H2.data) == null
                                                      ? void 0
                                                      : j2.deviceModelInfo) == null
                                                    ? void 0
                                                    : _2.model) !== "WPB1007ZX" &&
                                                    kt.jsx("th", {
                                                      className: "pb-4 font-normal",
                                                      children: K2("panel_cell_sn"),
                                                    }),
                                                ],
                                              }),
                                            }),
                                            kt.jsx("tbody", {
                                              className: "text-gray-900",
                                              children: Array.from({
                                                length: ie2.cellCount || 0,
                                              }).map((e4, t3) => {
                                                var o3, n3, r3, l3, a3;
                                                const i3 = t3 + 1,
                                                  s3 =
                                                    (o3 = xe2?.cells) == null
                                                      ? void 0
                                                      : o3.find((e5) => e5.index === i3),
                                                  c3 = ye2[i3],
                                                  d3 = c3 ? Ke2.parseBatteryId(c3) : null,
                                                  u3 =
                                                    ((n3 = d3?.fixed) == null
                                                      ? void 0
                                                      : n3.productionDate) || "--",
                                                  p3 = s3
                                                    ? `${(s3.voltage.value / 1e3).toFixed(2)}V`
                                                    : "--";
                                                return kt.jsxs(
                                                  "tr",
                                                  {
                                                    className: "",
                                                    children: [
                                                      kt.jsxs("td", {
                                                        className: "py-4 font-bold",
                                                        children: [K2("panel_cell"), i3],
                                                      }),
                                                      kt.jsx("td", {
                                                        className: "py-4",
                                                        children: p3,
                                                      }),
                                                      kt.jsx("td", {
                                                        className: "py-4",
                                                        children: u3,
                                                      }),
                                                      ((a3 =
                                                        (l3 =
                                                          (r3 = ce2["0x10"]) == null
                                                            ? void 0
                                                            : r3.data) == null
                                                          ? void 0
                                                          : l3.deviceModelInfo) == null
                                                        ? void 0
                                                        : a3.model) !== "WPB1007ZX" &&
                                                        kt.jsx("td", {
                                                          className:
                                                            "py-4 font-mono text-xs text-gray-600 break-all",
                                                          children: c3 || "--",
                                                        }),
                                                    ],
                                                  },
                                                  i3,
                                                );
                                              }),
                                            }),
                                          ],
                                        }),
                                        !ie2.cellCount &&
                                          kt.jsx("div", {
                                            className: "text-sm text-gray-400 py-4",
                                            children: K2("panel_no_cell_data"),
                                          }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          },
                          "1",
                        ),
                        kt.jsx(
                          Xh,
                          {
                            tab: K2("panel_tab_exceptions"),
                            children: kt.jsx("div", {
                              className: "gray-bg-section p-6",
                              children: kt.jsx("div", {
                                className: "mt-4",
                                children: (() => {
                                  const e4 = [
                                    {
                                      title: K2("panel_col_time"),
                                      dataIndex: "time",
                                      key: "time",
                                      width: 150,
                                    },
                                    {
                                      title: K2("panel_col_type"),
                                      dataIndex: "type",
                                      key: "type",
                                      width: 100,
                                    },
                                    {
                                      title: K2("panel_col_value"),
                                      dataIndex: "value",
                                      key: "value",
                                      width: 100,
                                    },
                                  ];
                                  let t3 = [];
                                  const o3 = 7 * (ue2 - 1),
                                    n3 = o3 + 7;
                                  return (
                                    (t3 = he2.slice(o3, n3).map((e5, t4) => {
                                      var n4;
                                      let r3 = "--";
                                      if (e5.timestamp && e5.timestamp.value)
                                        try {
                                          const o4 = e5.timestamp.value,
                                            n5 = new Date(1e3 * (o4 - 3600 * 8));
                                          isNaN(n5.getTime()) ||
                                            (r3 = n5.toLocaleString("zh-CN", {
                                              year: "numeric",
                                              month: "2-digit",
                                              day: "2-digit",
                                              hour: "2-digit",
                                              minute: "2-digit",
                                            }));
                                        } catch {}
                                      let l3 = "--";
                                      e5.errorType && e5.errorType.nameKey
                                        ? ((l3 = K2(e5.errorType.nameKey)),
                                          e5.errorType.nameParams &&
                                            Object.entries(e5.errorType.nameParams).forEach(
                                              ([e6, t5]) => {
                                                l3 = l3.replace(`{${e6}}`, t5);
                                              },
                                            ))
                                        : e5.errorType && e5.errorType.description
                                          ? (l3 = e5.errorType.description)
                                          : e5.errorType &&
                                            e5.errorType.code &&
                                            (l3 = `\u5F02\u5E38\u4EE3\u7801: ${e5.errorType.code}`);
                                      let a3 = "--";
                                      if (e5.val && e5.val.value !== void 0) {
                                        let t5 = e5.val.value;
                                        const o4 = (n4 = e5.errorType) == null ? void 0 : n4.code,
                                          r4 = o4 === 1 || o4 === 2,
                                          i3 = o4 >= 3 && o4 <= 6;
                                        r4
                                          ? ((t5 /= 1e3), (t5 = t5.toFixed(2)))
                                          : i3 && (t5 = Number(t5).toFixed(1)),
                                          (a3 = t5.toString()),
                                          i3
                                            ? (a3 += "\xB0C")
                                            : r4
                                              ? (a3 += "V")
                                              : l3.includes("\u6D41") && (a3 += "A");
                                      }
                                      return {
                                        key: (o3 + t4 + 1).toString(),
                                        time: r3,
                                        type: l3,
                                        value: a3,
                                      };
                                    })),
                                    kt.jsx(Dh, {
                                      columns: e4,
                                      dataSource: t3,
                                      locale: {
                                        emptyText: kt.jsx(yt, {
                                          image: yt.PRESENTED_IMAGE_SIMPLE,
                                          description: K2("panel_no_data"),
                                        }),
                                      },
                                      pagination: {
                                        placement: ["bottom"],
                                        total: he2.length,
                                        pageSize: 7,
                                        current: ue2,
                                        onChange: Ze2,
                                        showSizeChanger: !1,
                                        showQuickJumper: !0,
                                      },
                                      loading: me2,
                                      size: "small",
                                      className: "w-full",
                                    })
                                  );
                                })(),
                              }),
                            }),
                          },
                          "2",
                        ),
                      ],
                    }),
                  ],
                }),
              })
            : kt.jsx("div", {
                className: "bg-white rounded-sm shadow-sm overflow-hidden",
                children: kt.jsxs("div", {
                  className: "p-8",
                  children: [
                    kt.jsx("h2", {
                      className: "text-lg font-medium text-gray-900 mb-6",
                      children: K2("panel_not_connected_title"),
                    }),
                    kt.jsxs(yc, {
                      defaultActiveKey: "1",
                      className: "w-full",
                      children: [
                        kt.jsx(
                          Xh,
                          {
                            tab: K2("panel_tab_details"),
                            children: kt.jsx("div", {
                              className: "h-64 flex items-center justify-center",
                              children: kt.jsx("span", {
                                className: "text-sm text-gray-400",
                                children: K2("panel_no_details"),
                              }),
                            }),
                          },
                          "1",
                        ),
                        kt.jsx(
                          Xh,
                          {
                            tab: K2("panel_tab_exceptions"),
                            children: kt.jsx("div", {
                              className: "h-64 flex items-center justify-center",
                              children: kt.jsx("span", {
                                className: "text-sm text-gray-400",
                                children: K2("panel_no_exceptions"),
                              }),
                            }),
                          },
                          "2",
                        ),
                      ],
                    }),
                  ],
                }),
              }),
          Z2 && (_qtest || !_qi2Model(De2.current))
            ? kt.jsxs("div", {
                className: "card p-8",
                children: [
                  kt.jsxs("div", {
                    className: "flex justify-between items-center",
                    children: [
                      kt.jsxs("div", {
                        children: [
                          kt.jsx("h2", {
                            className: "text-base font-bold text-gray-900 mb-1",
                            children: "\u5C1D\u8BD5\u5F00\u542F\uFF08\u6D4B\u8BD5\uFF09",
                          }),
                          kt.jsx("p", {
                            className: "text-xs text-gray-500",
                            children:
                              "\u4E0D\u9650\u578B\u53F7\uFF0C\u53EA\u8981\u8BBE\u5907\u5DF2\u8FDE\u63A5\u5373\u53EF\u5C1D\u8BD5\u3002\u8FC7\u7A0B\u4E2D\u4F1A\u8BB0\u5F55\u53D1\u9001\u4E0E\u63A5\u6536\u7684\u539F\u59CB\u6570\u636E\u5E27\uFF0C\u53EF\u5728\u4E0A\u65B9\u300C\u5F00\u53D1\u8005\u9009\u9879\u300D\u67E5\u770B\u6216\u4E0B\u8F7D\u3002",
                          }),
                          kt.jsx("p", {
                            className: "text-xs text-amber-600 mt-1",
                            children:
                              "\u8BE5\u529F\u80FD\u4E3A\u672A\u77E5\u578B\u53F7\u7684\u5C1D\u8BD5\u5165\u53E3\uFF0C\u53EF\u80FD\u5BF9\u8BBE\u5907\u65E0\u6548\u3002",
                          }),
                        ],
                      }),
                      kt.jsx("button", {
                        disabled: _qi2Busy,
                        onClick: (e4) => {
                          (e4 && (!e4.isTrusted || e4.clientX === 0 || e4.clientY === 0)) || _qi2Trial();
                        },
                        className: "bg-amber-500 text-white px-6 py-1.5 rounded text-sm font-medium border-none",
                        style: { borderRadius: "16px" },
                        children: _qi2Busy
                          ? kt.jsxs("span", {
                              className: "flex items-center",
                              children: [
                                kt.jsx("i", { className: "fas fa-circle-notch fa-spin mr-1" }),
                                "\u6B63\u5728\u5C1D\u8BD5",
                              ],
                            })
                          : "\u5C1D\u8BD5\u5F00\u542F",
                      }),
                    ],
                  }),
                ],
              })
            : null,
        ],
      })
    );
    var tt2, ot2, nt2, rt2, lt2, at2;
  };
export { Uh as default };
