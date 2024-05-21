import WrapperFilter from "../WrapperFilter";
import iconSearch from "@/assets/logo/search/search_grey.svg";
import arrowSearch from "@/assets/logo/arrow/arrow_bottom_grey.svg";

import closeGreyIcon from "@/assets/logo/close/close_grey.svg";

export interface IItemFilterType<T> {
  key: keyof T;
  render?: (
    // column: IItemFilterType<T>,
    item: T,
    indexRow: number
  ) => React.ReactNode;
}

interface IProps<T> {
  title: string;
  records: T[];
  itemChoose: IItemFilterType<T>;
  selectedRecords: T[];
  handleChooseRecord: (item: T) => void;
  handleRemoveChoose: () => void;
}

export default function MultipleSelect<T>({
  title,
  records,
  selectedRecords,
  itemChoose,
  handleChooseRecord,
  handleRemoveChoose,
}: IProps<T>) {
  return (
    <WrapperFilter
      iconClick={handleRemoveChoose}
      wrapperStyles="absolute top-full right-0"
      titleProps={{ text: title }}
    >
      <div
        className={`relative group/parent-select w-full px-[14px] py-[6px] rounded-lg border border-[#D0D5DD] bg-white shadow-[0px_1px_2px_0px_#1018280D] hover:border-[#6941C6]`}
      >
        <div className="flex_center gap-2">
          <img src={iconSearch} alt={"iconSearch"} width={20} height={20} />
          <div className="flex-1 flex items-center min-h-[24px]">
            <div className="flex items-center flex-wrap gap-2">
              {selectedRecords.length ? (
                selectedRecords.map((selectedRecord, index) => {
                  /**
                   * notes: valueByKey cannot be an object or array.
                   * This mean, key of T to be displayed must be different from the object or array
                   */
                  const valueByKey = selectedRecord[itemChoose.key];

                  return (
                    <div key={index}>
                      {itemChoose.render ? (
                        itemChoose.render(selectedRecord, index)
                      ) : (
                        <div className="rounded-md border border-[#D0D5DD] py-[3px] px-1 flex_center gap-[5px]">
                          <p className="text-[#344054] text-[12px] leading-[18px] font-medium">
                            {String(valueByKey)}
                          </p>
                          <img
                            src={closeGreyIcon}
                            alt="closeGreyIcon"
                            width={14}
                            height={14}
                            onClick={() => {
                              handleChooseRecord(selectedRecord);
                            }}
                            className="cursor-pointer hover:scale-[1.2] transition-transform"
                          />
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <p className="text-sm font-medium">No select</p>
              )}
            </div>
          </div>
          <img
            src={arrowSearch}
            alt={"arrowSearch"}
            width={20}
            height={20}
            className="group-hover/parent-select:rotate-90 transition-transform"
          />
        </div>

        <div className="absolute top-full right-0 w-full bg-white border border-[#D0D5DD] z-50 invisible opacity-0 group-hover/parent-select:opacity-100 group-hover/parent-select:visible transition-all shadow-lg rounded-md">
          <div className="h-[112px] overflow-y-auto">
            {records.length ? (
              records.map((record, index) => {
                /**
                 * notes: valueByKey cannot be an object or array.
                 * This mean, key of T to be displayed must be different from the object or array
                 */
                const valueByKey = record[itemChoose.key];
                const isChoose = selectedRecords.includes(record);
                return (
                  <div
                    key={index}
                    className={`p-2 h-[36px] flex justify-between items-center transition-colors cursor-pointer ${
                      isChoose ? "bg-[#F0EDFF]" : ""
                    }`}
                    onClick={() => {
                      handleChooseRecord(record);
                    }}
                  >
                    <p
                      className={`transition-all text-sm ${
                        isChoose ? "text-[#0E2259] font-medium" : ""
                      }`}
                    >
                      {String(valueByKey)}
                    </p>

                    <img
                      src={closeGreyIcon}
                      alt="closeGreyIcon"
                      width={10}
                      height={10}
                      className={`transition-all ${
                        isChoose ? "visible opacity-100" : "opacity-0 invisible"
                      }`}
                    />
                  </div>
                );
              })
            ) : (
              <div className="flex_center w-full h-full text-lg font-semibold text-[#475467]">
                No data visible
              </div>
            )}
          </div>
        </div>
      </div>
    </WrapperFilter>
  );
}
