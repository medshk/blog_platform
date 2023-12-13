import React, { useRef } from "react";
import { useEffect, useState } from "react";

const Loader = () => {
  const ref = useRef(null);
  const [style, setStyle] = useState("fixed");
  useEffect(() => {
    setTimeout(() => {
      setStyle("none");
    }, 3000);
  }, []);

  useEffect(() => {
    ref.current.style.display = style;
  }, [style]);

  return (
    <div className="loader-modal" ref={ref}>
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
