import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth }) {
    // TODO: Add calendar, add new Floock in the past, view floocks
    return (
        <AuthenticatedLayout user={auth.user} header="Dashboard">
            <Head title="Dashboard" />
            <p>You're logged in!</p>
        </AuthenticatedLayout>
    );
}
