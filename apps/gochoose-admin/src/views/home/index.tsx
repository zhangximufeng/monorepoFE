import type { DatePickerProps, RangePickerProps } from "antd/es/date-picker";
import { DatePicker } from "antd";
import welcome from "@/assets/images/welcome.png";
import "./index.less";
const { RangePicker } = DatePicker;
const Dashboard: React.FC = () => {
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
      <img src={welcome} className="dashboard-bg" alt="welcome" />
    </div>
  );
};

export default Dashboard;
