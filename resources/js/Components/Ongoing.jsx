import React, { useEffect, useState } from "react";
import "../../css/ongoing.css";
import { router } from "@inertiajs/react";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(duration);

dayjs.extend(utc);
dayjs.extend(timezone);

export default function Ongoing({ ongoing }) {
    const [formattedTime, setFormattedTime] = useState("");
    const start_time = dayjs.utc(ongoing.start_time);

    const handleStop = (e) => {
        e.preventDefault();
        router.get(route("floocks.finish"));
        ongoing = null;
    };

    const handleRedirect = () => {
        router.get(route("timer.visual"));
    };

    useEffect(() => {
        // update timer
        const updateTimer = () => {
            const utcTime = dayjs.utc();
            const diff = utcTime.diff(start_time);
            const formattedTime = dayjs.utc(diff).format("HH:mm:ss");
            setFormattedTime(formattedTime);
        };

        updateTimer();

        const intervalId = setInterval(updateTimer, 1000);

        return () => clearInterval(intervalId);
    }, [ongoing.start_time]);

    return (
        <div className="ongoing-wrapper" onClick={handleRedirect}>
            <p>{ongoing.name}</p>
            <div className="flex flex-row justify-between">
                <h2>{formattedTime}</h2>
                <button onClick={handleStop} className="stop-button">
                    <i className="bi bi-stop-circle-fill"></i>
                </button>
            </div>
        </div>
    );
}
