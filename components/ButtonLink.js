import React from "react";
import Link from "next/link";
import Button from "./Button";
import PropTypes from "prop-types";
function ButtonLink({ href, as, children, disabled, ...props }) {
  if (disabled) {
    return (
      <Button disabled={disabled} {...props}>
        {children}
      </Button>
    );
  }
  return (
    <Link prefetch={false} href={href} as={as}>
      <a>
        <Button disabled={disabled} {...props}>
          {children}
        </Button>
      </a>
    </Link>
  );
}

ButtonLink.propTypes = {
  as: PropTypes.any,
  children: PropTypes.any,
  disabled: PropTypes.any,
  href: PropTypes.any,
};

export default ButtonLink;
