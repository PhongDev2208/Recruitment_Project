import { Button, Popconfirm, Tooltip } from "antd";
import { deleteJob } from "../../services/jobService";
import { DeleteOutlined } from "@ant-design/icons";
import { useAsyncOperation } from "../../hooks/useApi";

function DeleteJob(props) {
  const { record, onReload } = props;
  const { execute: deleteJobAsync, loading: deleting } = useAsyncOperation();

  const handleDelete = async () => {
    try {
      await deleteJobAsync(() => deleteJob(record._id));
      onReload();
    } catch (error) {
      console.error("Delete job failed:", error);
    }
  };

  return (
    <>
      <Tooltip title="Xóa bản ghi">
        <Popconfirm title="Bạn có chắc muốn xóa?" onConfirm={handleDelete}>
          <Button
            className="ml-5"
            danger
            ghost
            loading={deleting}
            icon={<DeleteOutlined />}
          ></Button>
        </Popconfirm>
      </Tooltip>
    </>
  );
}

export default DeleteJob;
