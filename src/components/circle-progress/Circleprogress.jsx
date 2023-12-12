import { useState, useEffect } from "react";
import { Progress } from "antd";
import PropTypes from "prop-types";
import { CheckOutlined } from "@ant-design/icons";

const Circleprogress = ({ project }) => {
  const [percent, setPercent] = useState(0);
  const conicColors = {
    "0%": "#108ee9",
    "100%": "#87d068",
  };

  useEffect(() => {
    const calculateProgress = () => {
      const currentDate = new Date();
      const startDate = new Date(project.startDate);
      const endDate = new Date(project.endDate);

      if (project.status === "done") {
        // Nếu trạng thái là "done", thiết lập percent là 100
        setPercent(100);
      } else if (currentDate >= startDate && currentDate <= endDate) {
        const totalTime = endDate - startDate;
        const elapsedTime = currentDate - startDate;
        const progress = (elapsedTime / totalTime) * 100;
        setPercent(progress > 100 ? 100 : progress);
      } else if (currentDate > endDate) {
        setPercent(100);
      } else {
        setPercent(0);
      }
    };

    calculateProgress();

    const interval = setInterval(calculateProgress, 60000);

    return () => clearInterval(interval);
  }, [project.startDate, project.endDate, project.status]);

  return (
    <div>
      <Progress
        type="circle"
        percent={percent}
        size="small"
        strokeColor={percent !== 100 ? conicColors : undefined}
        format={() => {
          if (percent === 100) {
            return <CheckOutlined style={{ fontSize: 16, color: "#87d068" }} />;
          }
          return `${percent.toFixed(2)}%`;
        }}
      />
    </div>
  );
};

Circleprogress.propTypes = {
  project: PropTypes.shape({
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default Circleprogress;
