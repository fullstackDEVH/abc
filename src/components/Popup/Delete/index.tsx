import "./index.css";
import { Button } from "antd";
import { MouseEvent } from "react";
import { twMerge } from "tailwind-merge";

interface IProps {
  stylesWrapper?: string;
  titleProps?: {
    text?: string;
    styles?: string;
  };
  descProps?: {
    text?: string;
    styles?: string;
  };
  propButtonCancel?: {
    text?: string;
    styles?: string;
    onClick?: (e: MouseEvent) => void;
  };
  propButtonOK?: {
    text?: string;
    styles?: string;
    onClick?: (e: MouseEvent) => void;
  };
}

const PopupDelete = ({
  stylesWrapper,
  titleProps,
  descProps,
  propButtonCancel,
  propButtonOK,
}: IProps) => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex_center z-[9999]">
      <div className="absolute w-full h-full bg-[#52565e] opacity-95 z-[100]"></div>
      <div
        className={twMerge(
          "absolute w-[400px] h-[176px] rounded-[20px] shadow-[0px_20px_24px_-4px_#10182814] p-6 bg-white z-[101]",
          stylesWrapper
        )}
      >
        <h6
          className={twMerge(
            "text-[#101828] text-[18px] leading-[28px] font-semibold",
            titleProps?.styles
          )}
        >
          {titleProps?.text ? titleProps.text : "Delete record"}
        </h6>
        <p className={twMerge("text-[#475467] text-sm", descProps?.styles)}>
          {descProps?.text
            ? descProps.text
            : " Are you sure you want to delete this record?"}
        </p>

        <div className="pt-8 flex_center gap-3">
          <Button
            className={twMerge(
              "border border-[#D0D5DD] text-[#344054] btn_styles w-full h-[44px]",
              propButtonCancel?.styles
            )}
            onClick={propButtonCancel?.onClick}
          >
            {propButtonCancel?.text ? propButtonCancel.text : "Cancel"}
          </Button>
          <Button
            className={twMerge(
              "text-white bg-[#D92D20] hover:!border-[#D92D20] hover:!text-[#D92D20] hover:!bg-transparent transition-all btn_styles w-full h-[44px]",
              propButtonOK?.styles
            )}
            onClick={propButtonOK?.onClick}
          >
            {propButtonOK?.text ? propButtonOK.text : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PopupDelete;
