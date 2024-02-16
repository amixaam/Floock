import React from "react";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";

export default function AuthMainLayout({ user, children }) {
    return (
        <div className="min-h-screen screen relative">
            <nav className="absolute w-full flex flex-row justify-between px-16 py-6 backdrop-blur-md">
                <ResponsiveNavLink href="/">Floock</ResponsiveNavLink>
                <ResponsiveNavLink href={route("dashboard")}>
                    Dashboard
                </ResponsiveNavLink>
            </nav>
            <main>{children}</main>
        </div>
    );
}
