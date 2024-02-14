import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Table from "@/Components/Table";
import BarChart from "@/Components/BarChart";

import "../../../css/view.css";
import TotalStatistics from "@/Components/TotalStatistics";

export default function View({ auth, project, floocks }) {
    const [filterOption, setFilterOption] = useState("today");
    const handleFilterChange = (event) => {
        setFilterOption(event.target.value);
    };


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
