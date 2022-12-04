import { BiLoader } from "react-icons/bi";

const Loading = () => {
  return (
    <div
      className="flex h-screen w-screen flex-col items-center justify-center gap-4 bg-gray-200 text-gray-700"
      data-testid="loading-page"
    >
      <BiLoader className="h-20 w-20 animate-spin" data-testid="loading-icon" />
      <h1
        className="text-center text-4xl font-semibold"
        data-testid="loading-text"
      >
        LOADING
      </h1>
    </div>
  );
};

export default Loading;
