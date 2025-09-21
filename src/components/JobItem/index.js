import { Card, Tag } from "antd";
import { Link } from "react-router-dom";

function JobItem(props) {
  const { item, infoCompany } = props;
  return (
    <>
      <Card
        title={<Link to={`/job/${item._id}`}>{item.name}</Link>}
        size="small"
      >
        <div className="mb-10">
          <span>Ngôn ngữ: </span>
          {item.tags.map((item, index) => (
            <Tag color="blue" className="mb-5" key={index}>
              {item}
            </Tag>
          ))}
        </div>
        <div className="mb-10">
          <span>Thành phố: </span>
          {item.city.map((item, index) => (
            <Tag color="orange" className="mb-5" key={index}>
              {item}
            </Tag>
          ))}
        </div>
        <div className="mb-10">
          Lương: <strong>{item.salary}$</strong>
        </div>
        <div className="mb-10">
          Công ty:{" "}
          <strong>
            {infoCompany?.companyName ||
              infoCompany?.name ||
              item?.infoCompany?.companyName ||
              item?.infoCompany?.name ||
              "Chưa cập nhật"}
          </strong>
        </div>
        <div className="mb-10">
          Ngày tạo: <strong>{item.createAt}</strong>
        </div>
      </Card>
    </>
  );
}

export default JobItem;
