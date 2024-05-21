import { MouseEvent } from "react";

import logoCustomer from "@/assets/logo_customer.svg";
import plusCircleIcon from "@/assets/logo/plus/plus_circle.svg";

interface IButtonProps {
  text: string;
  onClick: (e: MouseEvent<any>) => void;
}

interface IProps {
  title: string;
  desc: string;
  buttonProps?: IButtonProps;
}

const Heading = ({ title, desc, buttonProps }: IProps) => {
  return (
    <div className={"bg-white py-[14px] mt-2 px-8"}>
      <div>
        <h4 className="text-[#64748B] font-semibold text-[16px] leading-[20px] tracking-[0.2px]">
          {desc}
        </h4>
        <div className="mt-4">
          <div className="flex justify-between items-center">
            {/* logo */}
            <div className="flex_center gap-[14px]">
              <img
                src={logoCustomer}
                alt={logoCustomer}
                width={38}
                height={39}
              />
              <h6 className="text-[#0F172A] font-extrabold text-[23.2px] leading-[29px] tracking-[-0.29px]">
                {title}
              </h6>
            </div>

            {/* button */}
            {buttonProps ? (
              <div
                className="p-3 bg-[#f0edff] hover:bg-[#d5d1eb] transition-colors rounded-lg flex_center gap-2 cursor-pointer"
                onClick={buttonProps.onClick}
              >
                <button className="text-[#493CE7] text-[14px] font-semibold leading-[22.4px]">
                  {buttonProps.text}
                </button>
                <img
                  src={plusCircleIcon}
                  alt="plusCircleIcon"
                  width={24}
                  height={24}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Heading;
