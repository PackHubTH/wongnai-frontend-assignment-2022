import { BiError } from "react-icons/bi";

const Error = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 bg-red-200 text-red-700">
      <BiError className="h-40 w-40" />
      <h1 className="text-center text-4xl font-semibold">
        There is something wrong, Please refresh.
      </h1>
    </div>
  );
};

export default Error;
