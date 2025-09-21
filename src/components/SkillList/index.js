import { getListTag } from "../../services/tagService";
import { Tag } from "antd";
import { Link } from "react-router-dom";
import { useApi } from "../../hooks/useApi";
import LoadingSpinner from "../LoadingSpinner";
import ErrorDisplay from "../ErrorDisplay";

function SkillList() {
  const { data: tags, loading, error, refetch } = useApi(getListTag);

  if (loading) {
    return <LoadingSpinner size="small" message="Loading tags..." />;
  }

  if (error) {
    return (
      <ErrorDisplay
        message="Error loading tags"
        description={error}
        onRetry={refetch}
      />
    );
  }

  return (
    <>
      <div className="mb-20">
        {Array.isArray(tags) &&
          tags.map((item) => (
            <Link to={`/search?keyword=${item.value || ""}`} key={item.key}>
              <Tag color="blue" className="mb-5">
                {item.value}
              </Tag>
            </Link>
          ))}
      </div>
    </>
  );
}

export default SkillList;
