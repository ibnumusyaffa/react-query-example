import React from "react";
import clx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

function TabItemLink({ href, children }) {
  let router = useRouter();
  let active = router.pathname == href;
  let className = clx(
    "flex justify-center items-center px-5 text-sm text-gray-600  hover:bg-gray-100 cursor-pointer",
    {
      "border-b-4 border-primary text-gray-800": active,
    }
  );
  return (
    <Link href={href} passHref={true}>
      <div className={className}>
        <div>{children}</div>
      </div>
    </Link>
  );
}

TabItemLink.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
};

export default TabItemLink;
