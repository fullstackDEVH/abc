import "./index.css";
import { twMerge } from "tailwind-merge";
import { MouseEvent, useState } from "react";
import { Link, useLocation } from "react-router-dom";

// icons
import arrowBottomBlueIcon from "@/assets/logo/arrow/arrow_bottom_blue.svg";
import arrowBottomGreyIcon from "@/assets/logo/arrow/arrow_bottom_grey.svg";

interface IStylesIcon {
  readonly visible?: boolean;
  readonly iconEnter?: string;
  readonly iconLeave?: string;
}

interface IDataVisible {
  name: string;
  icon?: string;
  path?: string;
}

interface IProps {
  readonly title: string;
  readonly icon?: IStylesIcon;
  readonly titleStyles?: string;
  readonly popupStyles?: string;
  readonly dataVisible: IDataVisible[];
  readonly itemPopupStyles?: string;
}

interface IPropsPopupItem extends IDataVisible {
  itemPopupStyles: string;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}

const PopupItem = ({
  name,
  icon,
  path,
  itemPopupStyles,
  onClick,
}: IPropsPopupItem) => {
  const pathName = useLocation().pathname;

  return path ? (
    <Link to={path} className="p-3 block group/item">
      <div
        className={twMerge(
          `text_dropdow_css ${path === pathName ? "text-[#058DF4]" : ""}`,
          itemPopupStyles
        )}
      >
        {name}
      </div>
      {icon ? <img width={20} height={20} src={icon} alt="icon item" /> : null}
    </Link>
  ) : (
    <div className="p-3 block group/item" onClick={onClick}>
      <div className={twMerge("text_dropdow_css", itemPopupStyles)}>{name}</div>
      {icon ? <img width={20} height={20} src={icon} alt="icon item" /> : null}
    </div>
  );
};

const Dropdown = ({
  title,
  dataVisible,
  titleStyles,
  popupStyles,
  itemPopupStyles,
}: IProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative flex_center group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex_center gap-2">
        <h4 className={twMerge("text_title_css", titleStyles)}>{title}</h4>
        <img
          width={20}
          height={20}
          src={isHovered ? arrowBottomBlueIcon : arrowBottomGreyIcon}
          className={`group-hover:-rotate-90 transition-transform`}
        />
      </div>

      {/* This is list show after when hover title */}
      <div
        className={twMerge(
          "absolute top-full right-0 w-[328px] h-[152px] invisible group-hover:visible opacity-0 group-hover:opacity-100",
          popupStyles
        )}
      >
        <div className="w-full h-full bg-white rounded-xl border border-[#EAECF0] overflow-y-auto">
          <div className="p-6">
            {dataVisible.map((item) => (
              <PopupItem
                key={item.name}
                name={item.name}
                path={item.path}
                icon={item.icon}
                itemPopupStyles={itemPopupStyles ?? ""}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
