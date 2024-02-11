import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Table from "@/Components/Table";

export default function View({ auth, project }) {
    return (
        <AuthenticatedLayout user={auth.user} header={project.name}>
            <Head title={project.name} />
        </AuthenticatedLayout>
    );
}
