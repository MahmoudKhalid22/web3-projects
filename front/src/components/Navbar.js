import React from "react";
import useTodo from "../hooks/useTodo";

function Navbar() {
  const { currentAccount } = useTodo();
  console.log(currentAccount);
  return (
    <div className="flex justify-between p-4 bg-[#444] text-white">
      <div>Todo DApp</div>
      <div>{currentAccount}</div>
    </div>
  );
}

export default Navbar;
