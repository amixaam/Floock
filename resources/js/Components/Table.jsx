import React from "react";
import ResponsiveNavLink from "./ResponsiveNavLink";

export default function Table({ cols, prettyCols, data, action }) {
    if (data.length === 0) {
        return (
            <div className="text-center">
                <h6>No data found</h6>
            </div>
        );
    }

    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right">
                <thead className="text-xs">
                    <tr>
                        {cols.map((col) => (
                            <th key={col} scope="col" className="py-3">
                                <p>{prettyCols[col] ? prettyCols[col] : col}</p>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id} className="">
                            {cols.map((col) => (
                                <td key={col} scope="col" className="py-3">
                                    <ResponsiveNavLink
                                        href={route(action, item.id)}
                                    >
                                        <p>{item[col]}</p>
                                    </ResponsiveNavLink>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
