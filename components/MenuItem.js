import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import cx from "clsx";

function MenuItem({
  href,
  as = null,
  isExpanded,
  children,
  title,
  includeActiveLink = [],
}) {
  let router = useRouter();
  let currentParentRoute = `/${router.pathname.split("/")[1]}`;
  let parentHref = `/${href.split("/")[1]}`;

  let active = false;
  if (includeActiveLink.length > 0) {
    active = [parentHref, ...includeActiveLink].includes(currentParentRoute);
  } else {
    active = currentParentRoute === parentHref;
  }

  let classNames = cx(
    "text-sm flex items-center  hover:bg-secondary hover:text-gray-900 cursor-pointer h-11 relative",
    {
      //active
      "text-gray-900 bg-secondary": active,
      "text-gray-200": !active,

      //isExpanded
      "justify-center": isExpanded,
      "px-5": !isExpanded,
    }
  );

  return (
    <Link href={href ?? "/"} as={as}>
      <a className={classNames}>
        <div>{children}</div>

        {!isExpanded && <div className="ml-3 capitalize">{title}</div>}
      </a>
    </Link>
  );
}

export default MenuItem;
