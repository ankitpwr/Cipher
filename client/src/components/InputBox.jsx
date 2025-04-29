import React from "react";

export default function InputBox(props) {
  const variant = {
    primary:
      " border-1  md:w-86 lg:96 xl:h-14 w-64 px-2.5 py-2 border-gray-300 focus:border-black rounded-md",

    Secondary:
      "border-1 md:w-68 sm:w-72  w-64 border-gray-300 focus:border-black rounded-md px-3 py-2 dark:border-gray-400",
  };

  return (
    <div>
      <input
        placeholder={props.place}
        type={props.type}
        className={variant[props.variant]}
        ref={props.refer}
        readOnly={props.readOnly}
        defaultValue={props.defaultValue}
      />
    </div>
  );
}
