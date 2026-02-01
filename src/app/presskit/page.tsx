import React from "react";
import Link from "next/link";

const PressKit: React.FC = async () => {
  return (
    <div className={"presskit-container bg-gray-950 h-screen w-screen p-15"}>
      <h1 className={"text-white font-mono font-bold text-3xl "}>
        spencer raymond
      </h1>
      <Link
        href={"../"}
        className={"cursor-pointer social-link mb-24 text-white font-mono"}
      >
        back
      </Link>
      <div className={"text-white font-mono text-sm font-light break-after"}>
        <p> spencer raymond . . . </p>
      </div>
    </div>
  );
};

export default PressKit;
