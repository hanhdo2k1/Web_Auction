import React, { useEffect, useState } from 'react'
import moment from 'moment';

const Countdown = (props) => {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    // Function to format datetime
    const formatDateTime = (countdown) => {
      // Implement your logic to format datetime here
      return moment(countdown, "YYYY-MM-DDTHH:mm:ss.SSSZ");
    };

    // Function to calculate countdown
    const calculateCountdown = (end) => {
      const now = moment();
      const diff = end.diff(now);
      if (diff <= 0) {
        return 'Đã hết thời gian!';
      }

      const duration = moment.duration(diff);
      const days = Math.floor(duration.asDays());
      const hours = duration.hours();
      const minutes = duration.minutes();
      const seconds = duration.seconds();

      return `${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`;
    };

    if (props.countdown) {
      // Parse start time and end time from props
      const startDate = formatDateTime(props.countdown);
      const start = moment(startDate, "DD/MM/YYYY HH:mm");
      const end = start.clone().add(3, 'days');

      setStartTime(start);
      setEndTime(end);

      // Initial countdown calculation
      const initialCountdown = calculateCountdown(end);
      setCountdown(initialCountdown);

      // Automatic countdown update every second
      const intervalId = setInterval(() => {
        const remaining = calculateCountdown(end);
        setCountdown(remaining);

        // Check if time has expired, stop countdown
        if (remaining === 'Đã hết thời gian!') {
          clearInterval(intervalId);
        }
      }, 1000);

      // Clear interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, [props.countdown]); // Add props.countdown to the dependency array

  return (
    <div>
      <p>Ngày bắt đầu: {startTime && startTime.format("DD/MM/YYYY HH:mm:ss")}</p>
      <p>Ngày kết thúc: {endTime && endTime.format("DD/MM/YYYY HH:mm:ss")}</p>
      <p>Kết thúc sau: {countdown}</p>
    </div>
  );
};

export default Countdown