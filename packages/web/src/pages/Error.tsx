import { BiError } from "react-icons/bi";

const Error = () => {
  return (
    <div
      className="flex h-screen w-screen flex-col items-center justify-center gap-4 bg-red-200 text-red-700"
      data-testid="error-page"
    >
      <BiError className="h-40 w-40" data-testid="error-icon" />
      <h1
        className="text-center text-4xl font-semibold"
        data-testid="error-text"
      >
        There is something wrong, Please refresh.
      </h1>
    </div>
  );
};

export default Error;
