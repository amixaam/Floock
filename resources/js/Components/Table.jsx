import React from "react";

export default function Table({ cols, data, action }) {
    return (
        <div classNameName="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table classNameName="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {cols.map((col) => (
                            <th key={col} scope="col" className="px-6 py-3">
                                {col}
                            </th>
                        ))}
                        <th scope="col" className="px-6 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr
                            key={item.id}
                            className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                        >
                            {cols.map((col) => (
                                <td
                                    key={col}
                                    scope="col"
                                    className="px-6 py-3 dark:text-white"
                                >
                                    {item[col]}
                                </td>
                            ))}
                            <td className="px-6 py-4 dark:text-white">
                                <a href={route(action, item.id)}>view</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
