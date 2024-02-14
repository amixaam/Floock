import React from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export default function TotalStatistics({ data }) {
    const durationObject = dayjs
        .duration(
            data.reduce((acc, floock) => acc + floock.length, 0),
            "seconds"
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
            </div>
        </div>
    );
}
