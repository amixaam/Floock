import AuthMainLayout from "@/Layouts/AuthMainLayout";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import Creatable, { useCreatable } from "react-select/creatable";

import duration from "dayjs/plugin/duration";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

import "../../../css/visual.css";
import TextInput from "@/Components/TextInput";
import Modal from "@/Components/Modal";
import CreateFloockForm from "../Projects/Partials/CreateFloockForm";

export default function Visual({ auth, ongoing, options }) {
    const [showingNav, setShowingNav] = useState(false);
    const [newTimerPopup, setNewTimerPopup] = useState(false);

    if (ongoing.length <= 0) {
        return (
            <AuthMainLayout user={auth}>
                <Modal show={newTimerPopup} onClose={setNewTimerPopup}>
                    <CreateFloockForm
                        options={options}
                        user={auth.user}
                        onClose={setNewTimerPopup}
                    />
                </Modal>
                <div className="min-h-screen flex flex-col w-full items-center justify-center gap-4">
                    <h1 className="timer">00:00:00</h1>
                    <button
                        className="white-button"
                        onClick={() => {
                            setNewTimerPopup(true);
                        }}
                    >
                        Create Timer
                    </button>
                </div>
            </AuthMainLayout>
        );
    }
    const data = ongoing[0];

    const [formattedTime, setFormattedTime] = useState("");
    const start_time = dayjs.utc(data.start_time);

    const handleStop = (e) => {
        e.preventDefault();
        router.get(route("floocks.finish"));
        ongoing = null;
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
    }, [data.start_time]);

    // TODO: add quick-edit on select
    return (
        <AuthMainLayout user={auth}>
            <div className="min-h-screen flex flex-col w-full items-center justify-center gap-4">
                <div className="timer-data">
                    <TextInput value={data.name} />
                    <Creatable
                        options={options.tags}
                        defaultValue={data.tag}
                        placeholder={"Tag"}
                        className={"creatable"}
                        classNamePrefix="creatable"
                    />
                </div>
                <h1 className="timer">{formattedTime}</h1>
                <button className="white-button" onClick={handleStop}>
                    Stop Timer
                </button>
            </div>
        </AuthMainLayout>
    );
}
