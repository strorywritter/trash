import React, { useState } from "react";
import "../App.css";
import "./loader.css";

export function NotFound({ children }) {
  const [loader, setLoader] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);

  setTimeout(() => {
    setLoader(false);
    setErrorMessage(true);
  }, 2000);

  return (
    <div className="container pt-20">
      <div className="row">
        <div className="col-12">
          <div className="pt-20 text-center">
            <div>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
