import React from 'react';
import clsx from 'clsx';

function variantStyles({ variant, color }) {
  switch (variant) {
    case 'filled':
      return {
        'bg-sky-500 text-white': color === 'sky',
        'bg-red-500 text-white': color === 'red',
        'bg-green-500 text-white': color === 'green',
      };
    case 'light':
      return {
        'bg-sky-50 text-sky-600': color === 'sky',
        'bg-red-50 text-red-600': color === 'red',
        'bg-green-50 text-green-600': color === 'green',
      };
    case 'outline':
      return {
        'text-sky-600 border border-sky-600': color === 'sky',
        'text-red-600 border border-red-600': color === 'red',
        'text-green-600 border border-green-600': color === 'green',
      };
    default:
      return null;
  }
}

function Badge({
  size = 'sm',
  variant = 'light',
  color = 'green',
  rounded = 'none',
  children,
  fullWidth = false,
  leftIcon,
  rightIcon,
  ...props
}) {
  let style = clsx(
    `transition-all duration-200 ease-out focus:outline-none font-semibold px-3 flex items-center justify-center space-x-1.5`,
    variantStyles({ variant, color }),
    {
      'rounded-none': rounded === 'none',
      'rounded': rounded === 'sm',
      'rounded-md': rounded === 'md',
      'rounded-lg': rounded === 'lg',
      'rounded-xl': rounded === 'xl',
      'rounded-full': rounded === 'full',
    },
    {
      'h-5 text-[11px]': size === 'xs',
      'h-6 text-[12px]': size === 'sm',
      'h-7 text-[13px]': size === 'md',
      'h-8 text-[14px]': size === 'lg',
      'h-10 text-[16px]': size === 'xl',
    },
    {
      'w-full': fullWidth,
    },
  );

  return (
    <span className={style} {...props}>
      {leftIcon ? (
        <div
          className={clsx({
            'h-[13px] w-[13px]': size === 'xs',
            'h-[14px] w-[14px]': size === 'sm',
            'h-[15px] w-[15px]': size === 'md',
            'h-[17px] w-[17px]': size === 'lg',
            'h-[19px] w-[19px]': size === 'xl',
          })}
        >
          {leftIcon}
        </div>
      ) : null}
      <div>{children}</div>
      {rightIcon ? (
        <div
          className={clsx({
            'h-[13px] w-[13px]': size === 'xs',
            'h-[14px] w-[14px]': size === 'sm',
            'h-[15px] w-[15px]': size === 'md',
            'h-[17px] w-[17px]': size === 'lg',
            'h-[19px] w-[19px]': size === 'xl',
          })}
        >
          {rightIcon}
        </div>
      ) : null}
    </span>
  );
}

export default Badge;
