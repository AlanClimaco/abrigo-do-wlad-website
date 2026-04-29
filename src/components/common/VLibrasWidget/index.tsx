import React from "react";

export const VLibrasWidget = () => {
  return React.createElement(
    "div",
    { vw: "", className: "enabled" } as React.HTMLAttributes<HTMLDivElement>,
    React.createElement("div", { "vw-access-button": "", className: "active" } as React.HTMLAttributes<HTMLDivElement>),
    React.createElement(
      "div",
      { "vw-plugin-wrapper": "" } as React.HTMLAttributes<HTMLDivElement>,
      React.createElement("div", { className: "vw-plugin-top-wrapper" })
    )
  );
};
