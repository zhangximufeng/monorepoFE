import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { HOME_URL } from "@/config";
import "./index.less";

const NotAuth = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary" onClick={() => navigate(HOME_URL)}>
          Back Home
        </Button>
      }
    />
  );
};

export default NotAuth;
