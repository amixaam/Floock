import React from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

export default function TotalStatistics({ data }) {
    return (
        <div className="total-statistics ui-bg-above">
            <h2>Time Spent</h2>
            <div className="data-wrapper">
                <div className="data">
                    <p>Total Time</p>
                    <h2>{dayjs().toISOString()}</h2>
                </div>
                <div className="data">
                    <p>Average Daily</p>
                    <h2>
                        {data.reduce((acc, floock) => acc + floock.length, 0)}
                    </h2>
                </div>
                <div className="data">
                    <p>Average per Floock</p>
                    <h2>
                        {data.reduce((acc, floock) => acc + floock.length, 0)}
                    </h2>
                </div>
            </div>
        </div>
    );
}
