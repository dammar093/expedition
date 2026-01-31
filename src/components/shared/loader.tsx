import React from "react";
import { ThreeDots } from "react-loader-spinner";

export const Loader = () => {
  return (
    <ThreeDots
      height="90"
      width="0"
      radius="9"
      color="black"
      ariaLabel="three-dots-loading"
      wrapperStyle={{ margin: "20px" }}
      wrapperClass="custom-loader"
      visible={true}
    />
  );
};
