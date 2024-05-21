import { twMerge } from "tailwind-merge";
import closeGreyIcon from "@/assets/logo/close/close_grey.svg";
import { MouseEvent } from "react";

interface IProps {
  titleProps: {
    text: string;
    styles?: string;
  };
  wrapperStyles?: string;
  children: React.ReactNode;
  iconClick: (e: MouseEvent<any>) => void;
}

const WrapperFilter = ({
  titleProps,
  children,
  wrapperStyles,
  iconClick,
}: IProps) => {
  return (
    <div
      className={twMerge(
        "w-[510px] min-h-[100px] py-2 px-4 rounded-md bg-white border",
        wrapperStyles
      )}
    >
      <div className="flex items-center gap-3">
        <h4
          className={twMerge(
            "text-[#475467] text-base font-bold",
            titleProps?.styles
          )}
        >
          {titleProps.text}
        </h4>
        <img
          src={closeGreyIcon}
          alt="closeGreyIcon"
          width={20}
          height={20}
          onClick={iconClick}
        />
      </div>

      <div className="mt-2">{children}</div>
    </div>
  );
};

export default WrapperFilter;
