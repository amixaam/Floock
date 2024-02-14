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

    useEffect(() => {
        // Function to update the timer
        const updateTimer = () => {
            const utcTime = dayjs.utc();
            const diff = utcTime.diff(start_time);
            const formattedTime = dayjs.utc(diff).format("HH:mm:ss");
            setFormattedTime(formattedTime); // Update the state with the new formatted time
        };

        // Call the updateTimer function initially
        updateTimer();

        // Set up an interval to update the timer every second
        const intervalId = setInterval(updateTimer, 1000);

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [ongoing.start_time]);

    return (
        <div className="ongoing-wrapper flex flex-row justify-between">
            <div className="flex flex-col">
                <p>{ongoing.name}</p>
                <p>{formattedTime}</p>
            </div>
            <button onClick={handleStop}>
                <i className="bi bi-stop-circle-fill"></i>
            </button>
        </div>
    );
}
