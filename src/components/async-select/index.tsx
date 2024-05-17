import useDebounce from "@/hooks/useDebound";
import { useGetListArea } from "@/services/area/useGetListArea";
import { Select } from "antd";
import { useState } from "react";

const AsyncSelect = () => {
  // const [page, setPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const searchValDebounce = useDebounce(searchVal, 500);
  const listArea = useGetListArea({
    page: 1,
    pagesize: 10,
    searchVal: searchValDebounce,
  });

  console.log(listArea.data?.data)
  return (
    <Select
      className="w-1/5 h-full truncate"
      size="middle"
      mode="multiple"
      allowClear
      onSearch={(val) => setSearchVal(val)}
      filterOption={false}
      options={listArea.data?.data?.map((area) => ({
        label: area.name,
        value: area.id,
      }))}
      maxTagCount="responsive"
      placeholder="Areas ..."
      onChange={(value) => console.log(value)}
    />
  );
};

export default AsyncSelect;
