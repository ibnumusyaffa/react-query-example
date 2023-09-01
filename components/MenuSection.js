import React from "react";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
function MenuSection({ children, title, isExpanded }) {
  return (
    <div>
      <div className="uppercase text-gray-300 text-xs px-5 mt-4 mb-2">
        {isExpanded ? title : <DotsHorizontalIcon />}
      </div>
      {children}
    </div>
  );
}

export default MenuSection;
