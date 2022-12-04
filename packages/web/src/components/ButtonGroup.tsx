type ButtonGroupProps = {
  isDefault: boolean;
  setIsDefault: (isDefault: boolean) => void;
};

const ButtonGroup = ({ isDefault, setIsDefault }: ButtonGroupProps) => {
  return (
    <div className="flex gap-4" data-testid="button-group">
      <p
        className={
          "relative cursor-pointer font-medium text-indigo-600 before:absolute before:-bottom-1 before:h-0.5 before:w-full before:scale-x-0 before:bg-indigo-600 before:transition hover:before:scale-x-100" +
          (isDefault ? " before:scale-x-100" : "")
        }
        onClick={() => {
          setIsDefault(true);
          window.scrollTo(0, 0);
        }}
      >
        ทั้งหมด
      </p>
      <p
        className={
          "relative cursor-pointer font-medium text-indigo-600 before:absolute before:-bottom-1 before:h-0.5 before:w-full before:scale-x-0 before:bg-indigo-600 before:transition hover:before:scale-x-100" +
          (!isDefault ? " before:scale-x-100" : "")
        }
        onClick={() => {
          setIsDefault(false);
          window.scrollTo(0, 0);
        }}
      >
        ส่วนลด
      </p>
    </div>
  );
};

export default ButtonGroup;
