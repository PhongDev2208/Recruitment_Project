/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllJob } from "../../services/jobService";
import { Tag, Spin, Alert } from "antd";
import SearchList from "./SearchList";
import { useApi } from "../../hooks/useApi";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredData, setFilteredData] = useState([]);
  const citySearch = searchParams.get("city") || "";
  const keywordSearch = searchParams.get("keyword") || "";

  const { data, loading, error } = useApi(getAllJob);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const newData = data.filter((item) => {
        const city = citySearch ? item.city?.includes(citySearch) : true;
        const keyword = keywordSearch
          ? item.tags?.includes(keywordSearch)
          : true;
        const status = item.status;
        return city && keyword && status;
      });
      setFilteredData(newData.reverse());
    }
  }, [data, citySearch, keywordSearch]);

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <Alert message="Error loading jobs" type="error" showIcon />;
  }

  return (
    <>
      <div>
        <strong>Kết quả tìm kiếm: </strong>
        {citySearch && <Tag>{citySearch}</Tag>}
        {keywordSearch && <Tag>{keywordSearch}</Tag>}
      </div>
      {filteredData && <SearchList data={filteredData} />}
    </>
  );
}

export default Search;
