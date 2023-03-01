import React from "react";

function Content({ children }) {
  return (
    <div style={{ padding: "10px" }}>
      <div>{children}</div>
    </div>
  );
}

export default Content;
