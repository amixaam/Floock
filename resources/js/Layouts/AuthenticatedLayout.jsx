import { useState } from "react";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";

import "../../css/nav.css";

import glowTop from "../../../public//Images/glow-top.png";
import glowBottom from "../../../public//Images/glow-bottom.png";
import Modal from "@/Components/Modal";
import CreateFloockForm from "@/Pages/Projects/Partials/CreateFloockForm";
import Ongoing from "@/Components/Ongoing";

export default function Authenticated({ user, header, children }) {
    const [showingNav, setShowingNav] = useState(true);
    const [newTimerPopup, setNewTimerPopup] = useState(false);
    const { options, ongoing } = usePage().props;

    console.log(ongoing);
    return (
        <div className="min-h-screen screen">
            <img
                src={glowBottom}
                alt=""
                className="absolute max-h-screen w-full"
            />
            <img
                src={glowTop}
                alt=""
                className="absolute max-h-screen w-full"
            />

            <Modal show={newTimerPopup} onClose={setNewTimerPopup}>
                <CreateFloockForm options={options} user={user} />
            </Modal>

            <div className="min-h-screen flex flex-row p-4 gap-4">
                <nav className="flex flex-col nav-sidebar ui-bg px-4 py-2 z-10">
                    <Link href="/">
                        <h1>Floock</h1>
                    </Link>
                    <div className="links flex flex-col">
                        <div className="section">
                            <h6>track</h6>
                            <ol className="flex flex-col gap-4">
                                <li>
                                    <ResponsiveNavLink
                                        href={route("dashboard")}
                                        active={route().current("dashboard")}
                                    >
                                        Calendar
                                    </ResponsiveNavLink>
                                </li>
                            </ol>
                        </div>
                        <div className="section">
                            <h6>Analyze</h6>
                            <ol className="flex flex-col gap-4">
                                <li>
                                    <ResponsiveNavLink
                                        href={route("projects.index")}
                                        active={route().current("projects.*")}
                                    >
                                        Projects
                                    </ResponsiveNavLink>
                                </li>
                                <li>
                                    <ResponsiveNavLink
                                        href={route("projects.index")}
                                    >
                                        Summary
                                    </ResponsiveNavLink>
                                </li>
                            </ol>
                        </div>
                        <div className="section">
                            <h6>profile</h6>
                            <ol className="flex flex-col gap-4">
                                <li>
                                    <ResponsiveNavLink
                                        href={route("projects.index")}
                                    >
                                        Your data
                                    </ResponsiveNavLink>
                                </li>
                                <li>
                                    <ResponsiveNavLink
                                        href={route("projects.index")}
                                    >
                                        theme
                                    </ResponsiveNavLink>
                                </li>
                                <li>
                                    <ResponsiveNavLink
                                        href={route("logout")}
                                        method="post"
                                    >
                                        log out
                                    </ResponsiveNavLink>
                                </li>
                            </ol>
                        </div>
                        {ongoing ? (
                            <Ongoing ongoing={ongoing} />
                        ) : (
                            <button
                                onClick={() => setNewTimerPopup(true)}
                                className="flex gap-2 items-center hover:brightness-90"
                                disabled={ongoing ? true : false}
                            >
                                <i className="bi bi-plus-circle-fill l-green-i"></i>
                                <h6>new timer</h6>
                            </button>
                        )}
                    </div>
                </nav>

                <main className="content flex flex-col gap-4 z-10">
                    {header && <h1 className="ui-bg">{header}</h1>}
                    <div className="flex flex-col gap-4 ui-bg h-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
