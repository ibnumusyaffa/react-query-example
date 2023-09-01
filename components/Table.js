import React from "react";
import Loading from "./Loading";
import clx from "clsx";

// import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/outline";
import { useTransition, animated } from "react-spring";
import PropTypes from "prop-types";

function DownIcon() {
  return (
    <svg
      viewBox="0 0 1024 1024"
      focusable="false"
      data-icon="caret-down"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path>
    </svg>
  );
}

function UpIcon() {
  return (
    <svg
      viewBox="0 0 1024 1024"
      focusable="false"
      data-icon="caret-up"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"></path>
    </svg>
  );
}
export function Table({
  loading = false,
  fetching = false,
  children,
  error = false,
  empty = true,
}) {
  const fetchTransitions = useTransition(
    fetching && !loading && !empty ? true : false,
    null,
    {
      from: { opacity: 0 },
      enter: { opacity: 0.9 },
      leave: { opacity: 0 },
    }
  );

  return (
    <div className="relative">
      <table className="w-full">{children}</table>

      {fetchTransitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div
              key={key}
              style={props}
              className="absolute top-0 bottom-0 flex items-center justify-center w-full h-full bg-white"
            >
              <div className="w-10 h-10 opacity-100 text-primary">
                <Loading></Loading>
              </div>
            </animated.div>
          )
      )}

      {(loading && empty) || (fetching && empty) ? (
        <div className="flex items-center justify-center w-full h-32">
          <div className="w-10 h-10  text-primary">
            <Loading></Loading>
          </div>
        </div>
      ) : null}

      {error && (
        <div className="flex items-center justify-center w-full h-32">
          <div className="text-lg text-gray-500">Ada kesalahan</div>
        </div>
      )}
      {empty && !loading && !fetching && !error ? (
        <div className="flex items-center justify-center w-full h-32">
          <div className="text-lg text-gray-500">Data tidak ditemukan</div>
        </div>
      ) : null}
    </div>
  );
}

Table.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.bool,
  loading: PropTypes.bool,
  fetching: PropTypes.bool,
  empty: PropTypes.bool,
};

function Sorter({ order, active, onClick }) {
  let upClass = clx("", {
    "text-sky-500": order == "asc" && active,
  });

  let downClass = clx("-mt-1", {
    "text-sky-500": order == "desc" && active,
  });
  return (
    <div className="text-gray-200" onClick={onClick}>
      <div className={upClass}>
        <UpIcon></UpIcon>
      </div>
      <div className={downClass}>
        <DownIcon></DownIcon>
      </div>
    </div>
  );
}

Sorter.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]),
};

export function Th({ sort, columnKey, onToggleSort, children }) {
  let isSortActive = sort && columnKey && onToggleSort ? true : false;
  return (
    <th
      onClick={() => isSortActive && onToggleSort(columnKey)}
      className="text-xs h-auto font-normal uppercase text-gray-600 text-left px-3 cursor-pointer hover:bg-sky-50 
      "
    >
      <div className="flex justify-between w-full items-center">
        <div className="flex items-center">{children}</div>
        {isSortActive && (
          <Sorter active={sort.column == columnKey} order={sort.order}></Sorter>
        )}
      </div>
    </th>
  );
}

Th.propTypes = {
  children: PropTypes.node,
  columnKey: PropTypes.string,
  onToggleSort: PropTypes.func,
  className: PropTypes.string,
  textClassName: PropTypes.string,
  flexDisplay: PropTypes.bool,
  sort: PropTypes.shape({
    column: PropTypes.string,
    order: PropTypes.oneOf(["asc", "desc"]),
  }),
};

export function Td({ children }) {
  return <td className="px-3 py-3 text-sm text-gray-600  align-top">{children}</td>;
}

Td.propTypes = {
  children: PropTypes.node,
  dangerouslySetInnerHTML: PropTypes.any,
  additionalClass: PropTypes.string,
};
export default Table;
