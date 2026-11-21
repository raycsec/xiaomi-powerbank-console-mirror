import { bc as e, bd as s } from "./index.js";
import "./react-vendor.js";
import { S as l } from "./ModelData.js";
const t = () => {
  const { t: t, lang: a } = e(),
    d = l.filter((e) => e.isShow); /* @__PURE__ */
  return s.jsx("div", {
    className: "min-h-screen flex justify-center items-start pb-20",
    children: /* @__PURE__ */ s.jsx("div", {
      className: "w-full bg-white shadow-sm min-h-[1200px]",
      children: /* @__PURE__ */ s.jsxs("div", {
        className: "px-12 py-10",
        children: [
          /* @__PURE__ */ s.jsx("h2", {
            className: "text-[20px] font-medium text-gray-900 mb-6",
            children: t("models_supported_title"),
          }),
          /* @__PURE__ */ s.jsx("div", {
            className: "bg-[#f9f9f9] rounded-2xl p-8",
            children: /* @__PURE__ */ s.jsxs("table", {
              className: "w-full text-left border-collapse",
              children: [
                /* @__PURE__ */ s.jsx("thead", {
                  children: /* @__PURE__ */ s.jsxs("tr", {
                    className: "text-[14px] text-gray-800 font-medium",
                    children: [
                      /* @__PURE__ */ s.jsx("th", {
                        className: "pb-8 w-24 font-medium",
                        children: t("models_col_id"),
                      }),
                      /* @__PURE__ */ s.jsx("th", {
                        className: "pb-8 font-medium",
                        children: t("models_col_name"),
                      }),
                      /* @__PURE__ */ s.jsx("th", {
                        className: "pb-8 w-33 font-medium",
                        children: t("models_col_model"),
                      }),
                      /* @__PURE__ */ s.jsx("th", {
                        className: "pb-8 w-33 font-medium",
                        children: t("models_col_port"),
                      }),
                    ],
                  }),
                }),
                /* @__PURE__ */ s.jsx("tbody", {
                  className: "text-[14px] text-gray-500",
                  children: d.map((e, l) =>
                    /* @__PURE__ */ s.jsxs(
                      "tr",
                      {
                        children: [
                          /* @__PURE__ */ s.jsx("td", { className: "py-4", children: l + 1 }),
                          /* @__PURE__ */ s.jsx("td", {
                            className: "py-4",
                            children: "en" === a ? e.nameEn : e.name,
                          }),
                          /* @__PURE__ */ s.jsx("td", { className: "py-4", children: e.model }),
                          /* @__PURE__ */ s.jsx("td", {
                            className: "py-4",
                            children: e.connection,
                          }),
                        ],
                      },
                      e.id,
                    ),
                  ),
                }),
              ],
            }),
          }),
        ],
      }),
    }),
  });
};
export { t as default };
