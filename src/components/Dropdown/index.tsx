import "./index.css";
import { twMerge } from "tailwind-merge";
import { MouseEvent, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

// icons
import arrow_bottom_blue_fill from "@/assets/logo/arrow/arrow_bottom_blue_fill.svg";

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
    <Link
      to={path}
      className={`py-[6px] px-1 block group/item rounded ${
        path === pathName ? "bg-[#f0edff]" : ""
      }`}
    >
      <div
        className={twMerge(
          ` ${path === pathName ? "text_dropdow_css_active" : ""}`,
          itemPopupStyles
        )}
      >
        {name}
      </div>
      {icon ? <img width={20} height={20} src={icon} alt="icon item" /> : null}
    </Link>
  ) : (
    <div className="py-[6px] px-1 block group/item" onClick={onClick}>
      <div className={twMerge(itemPopupStyles)}>{name}</div>
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
  const pathName = useLocation().pathname;
  const titleActive = useMemo(() => {
    for (const menuItem of dataVisible) {
      if (menuItem?.path && menuItem?.path === pathName) return true;
    }
    return false;
  }, [pathName, dataVisible]);

  return (
    <div className="relative flex_center group cursor-pointer">
      <div className="flex_center gap-[6px]">
        <h4
          className={twMerge(
            `common_text_css text_title_css ${
              titleActive ? "text_title_css_active" : ""
            }`,
            titleStyles
          )}
        >
          {title}
        </h4>
        <img
          width={20}
          height={20}
          src={arrow_bottom_blue_fill}
          className={`group-hover:-rotate-90 transition-transform`}
        />
      </div>

      {/* This is list show after when hover title */}
      <div
        className={twMerge(
          "absolute top-full right-0 w-[204px] h-[101px] invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all",
          popupStyles
        )}
      >
        <div className="w-full h-full bg-white rounded-xl border border-[#EAECF0] overflow-y-auto">
          <div className="px-2 py-3">
            {dataVisible.map((item) => (
              <PopupItem
                key={item.name}
                name={item.name}
                path={item.path}
                icon={item.icon}
                itemPopupStyles={
                  "common_text_css text_dropdow_css " + itemPopupStyles
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
