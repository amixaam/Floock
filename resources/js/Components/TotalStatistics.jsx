import React from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export default function TotalStatistics({ data }) {
    const startTime = dayjs(data[0].start_time);
    const endTime = dayjs(data[0].end_time);

    const time = endTime.diff(startTime);
    const formattedTime = dayjs.duration(time).format("HH:mm:ss");
    console.log(formattedTime);
    const durationObject = dayjs
        .duration(
            data.reduce((acc, floock) => acc + floock.length, 0),
            "minutes"
        )
        .format("HH:mm:ss");
    return (
        <div className="total-statistics ui-bg-above">
            <h2>Time Spent</h2>
            <div className="data-wrapper">
                <div className="data">
                    <p>Total Time</p>
                    <h2>{durationObject}</h2>
                </div>
                <div className="data">
                    <p>Average Daily</p>
                    <h2></h2>
                </div>
                <div className="data">
                    <p>Average per Floock</p>
                    <h2></h2>
                </div>
            </div>
        </div>
    );
}
