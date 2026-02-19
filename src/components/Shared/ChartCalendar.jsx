import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const ChartCalendar = ({ barChartData, setFilteredData }) => {
  const [value, setValue] = useState(new Date());

  const handleDateChange = (date) => {
    setValue(date);

    const formattedDate = date.toISOString().split("T")[0];

    const filtered = barChartData.filter(
      (item) => item.date === formattedDate
    );

    setFilteredData(filtered);
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <Calendar onChange={handleDateChange} value={value} />
    </div>
  );
};

export default ChartCalendar;
