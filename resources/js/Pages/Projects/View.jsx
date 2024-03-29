import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Table from "@/Components/Table";
import BarChart from "@/Components/BarChart";
import dayjs from "dayjs";

import "../../../css/view.css";
import TotalStatistics from "@/Components/TotalStatistics";

export default function View({ auth, project, floocks }) {
    // TODO: Add filtering for tags, name and reset filters functionality

    const [filterOption, setFilterOption] = useState("today");
    const handleFilterChange = (event) => {
        setFilterOption(event.target.value);
    };

    // format interval to local time
    floocks.forEach((floock) => {
        const formattedDate = dayjs
            .utc(floock.start_time)
            .local()
            .format("YYYY-MM-DD");
        const interval =
            dayjs.utc(floock.start_time).local().format("HH:mm:ss") +
            " - " +
            dayjs.utc(floock.end_time).local().format("HH:mm:ss");
        const formatted_interval = formattedDate + " " + interval;

        floock["formatted_interval"] = formatted_interval;
    });

    return (
        <AuthenticatedLayout user={auth.user} header={project.name}>
            <Head title={project.name} />

            <div className="filter-wrapper flex flex-row gap-2">
                <div className="filter flex flex-row items-center">
                    <i className="bi bi-calendar2-range-fill secondary-i"></i>
                    <select
                        className="input focus:ring-0"
                        name="filterOption"
                        value={filterOption}
                        onChange={handleFilterChange}
                    >
                        <option value="last year">Last year</option>
                        <option value="this year">This year</option>
                        <option value="this month">This month</option>
                        <option value="this week">This week</option>
                        <option value="yesterday">Yesterday</option>
                        <option value="today">Today</option>
                    </select>
                </div>
                <div className="filter flex flex-row items-center">
                    <i className="bi bi-tags-fill secondary-i"></i>
                    <select className="input focus:ring-0" name="filterOption">
                        <option value="">All</option>
                        <option value="">Nichijou</option>
                    </select>
                </div>
            </div>
            <div className="total-statistics-wrapper">
                <TotalStatistics data={floocks} />
            </div>
            <div className="graph ui-bg-above">
                <BarChart data={floocks} filterOption={filterOption} />
            </div>
            <Table
                data={floocks}
                cols={["name", "formatted_interval", "formatted_time"]}
                prettyCols={{
                    formatted_interval: "time interval",
                    formatted_time: "length",
                }}
                action="projects.view"
            />
        </AuthenticatedLayout>
    );
}
