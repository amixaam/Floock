import { Link } from "@inertiajs/react";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link {...props}>
            <h2 className={active ? "nav-active" : ""}>{children}</h2>
        </Link>
    );
}
