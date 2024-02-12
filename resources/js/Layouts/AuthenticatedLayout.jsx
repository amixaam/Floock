import { useState } from "react";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";

import "../../css/nav.css";

import glowTop from "../../../public//Images/glow-top.png";
import glowBottom from "../../../public//Images/glow-bottom.png";

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const [showingNav, setShowingNav] = useState(true);

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
                    </div>
                    <div>{/* new timer */}</div>
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
