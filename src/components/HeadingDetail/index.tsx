import { Breadcrumb, Input } from "antd";
import { useSearchParams } from "react-router-dom";
import { MouseEvent, useEffect, useState } from "react";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";

// icons
import searchGreyIcon from "@/assets/logo/search/search_grey.svg";
import plusCircleIcon from "@/assets/logo/plus/plus_circle.svg";
import arrowBlueDarkIcon from "@/assets/logo/arrow/arrow_blue_dark.svg";
// hook
import useDebounce from "@/hooks/useDebound";

import "./index.css";

interface IProps {
  breadcrumbRoutes: ItemType[];
  onButtonClick: (e: MouseEvent<any>) => void;
}

const HeadingDetail = ({ breadcrumbRoutes, onButtonClick }: IProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const debouncedInput = useDebounce(inputValue, 800);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (debouncedInput) {
      searchParams.set("q", inputValue);
      setSearchParams(searchParams);
    } else {
      searchParams.delete("q");
      setSearchParams(searchParams);
    }
  }, [debouncedInput]);

  return (
    <div className="bg-white -mx-8 px-8 py-[14px]">
      <Breadcrumb
        separator={
          <img
            src={arrowBlueDarkIcon}
            alt="arrowBlueDarkIcon"
            width={24}
            height={24}
          />
        }
        items={breadcrumbRoutes}
      />
      <p className="text-xs leading-5 text-[#64748B] mt-1 mb-4">
        Detailed information about the area you need to check
      </p>

      {/* controller */}
      <div className="flex items-center justify-between h-[48px]">
        <div className="w-[380px] h-full">
          <Input
            value={inputValue}
            placeholder="Search tenant"
            className="h-full text-sm"
            onChange={(e) => setInputValue(e.target.value)}
            prefix={
              <img
                src={searchGreyIcon}
                alt="searchGreyIcon"
                width={20}
                height={20}
              />
            }
          />
        </div>

        <div
          className="p-3 bg-[#f0edff] hover:bg-[#d5d1eb] transition-colors rounded-lg flex_center gap-2 cursor-pointer"
          onClick={onButtonClick}
        >
          <button className="text-[#493CE7] text-[14px] font-semibold leading-[22.4px]">
            Add tenant
          </button>
          <img
            src={plusCircleIcon}
            alt="plusCircleIcon"
            width={26}
            height={26}
          />
        </div>
      </div>
    </div>
  );
};

export default HeadingDetail;
