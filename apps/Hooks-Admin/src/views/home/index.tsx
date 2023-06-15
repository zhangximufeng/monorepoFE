import { useNavigate } from "react-router-dom";
import type { DatePickerProps, RangePickerProps } from "antd/es/date-picker";
import { DatePicker, Button } from "antd";
import { useTranslation } from "react-i18next";
const { RangePicker } = DatePicker;
import "./index.less";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  const onChange1 = (value: DatePickerProps["value"] | RangePickerProps["value"], dateString: [string, string] | string) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  };

  return (
    <div className="dashboard card">
      <DatePicker onChange={onChange} />
      <RangePicker showTime={{ format: "HH:mm" }} format="YYYY-MM-DD HH:mm" onChange={onChange1} />
      <div>{t("home.Liam")}</div>
      <div>
        <Button type="primary" onClick={() => navigate("/proTable/useProTable")}>
          To ProTable
        </Button>
        <Button type="primary" onClick={() => navigate("/system/accountManage")}>
          To accountManage
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
