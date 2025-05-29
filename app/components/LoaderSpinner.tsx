import { ThreeDots } from "react-loader-spinner";
function LoaderSpinner() {
  return (
    <div className="flex gap-1">
      <span>Loading </span>
      <ThreeDots
        visible={true}
        height="30"
        width="30"
        color="#ff00ff"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}

export default LoaderSpinner;
