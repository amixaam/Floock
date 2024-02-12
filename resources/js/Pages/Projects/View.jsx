import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Table from "@/Components/Table";
import { Bar, Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

export default function View({ auth, project, floocks }) {
    const filterTime = ["All", "This year", "This month", "This week", "Today"];
    const data = {
        labels: ["A", "B", "C"],
        datasets: [
            {
                data: [1, 2, 3],
                borderColor: "#e4f287",
                borderWidth: 2,
            },
        ],
    };
    const options = {};
    return (
        <AuthenticatedLayout user={auth.user} header={project.name}>
            <Head title={project.name} />

            <p>{JSON.stringify(floocks)}</p>
            <div className="graph h-full">
                <Line data={data} options={options} />
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
