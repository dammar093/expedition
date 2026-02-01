import { CircularProgress } from "react-loader-spinner";

interface ILoaderProps {
  color?: string;
  size?: number;
}
export const Loader = ({ color = "white", size = 90 }: ILoaderProps) => {
  return (
    <CircularProgress
      height={size}
      width={size}
      color={color}
      ariaLabel="three-dots-loading"
      wrapperStyle={{ margin: "20px" }}
      wrapperClass="custom-loader"
      visible={true}
    />
  );
};
