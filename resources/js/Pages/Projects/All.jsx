import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Table from "@/Components/Table";

export default function All({ auth, projects }) {
    return (
        <AuthenticatedLayout user={auth.user} header="Projects">
            <Head title="Projects" />

            <Table
                data={projects}
                cols={["name", "status", "formatted_date", "total_time"]}
                prettyCols={{
                    formatted_date: "created at",
                    total_time: "time commitment",
                }}
                action="projects.view"
            />
        </AuthenticatedLayout>
    );
}
