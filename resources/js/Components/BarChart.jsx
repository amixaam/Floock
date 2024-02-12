import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

const ChartComponent = ({ data }) => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: "Time Spent",
                data: [],
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
            },
        ],
    });
    const [filterOption, setFilterOption] = useState("allTime");

    useEffect(() => {
        const formattedData = processData(data, filterOption);
        setChartData(formattedData);
    }, [data, filterOption]);

    // Data processing function that handles different time ranges
    const processData = (data, filterOption) => {
        const labels = [];
        const values = [];

        switch (filterOption) {
            case "allTime":
                data.forEach((item) => {
                    labels.push(item.name);
                    values.push(item.length);
                });
                break;
            case "thisYear":
                const currentYear = new Date().getFullYear();
                data.forEach((item) => {
                    const itemDate = new Date(item.start_time);
                    if (itemDate.getFullYear() === currentYear) {
                        labels.push(item.name);
                        values.push(item.length);
                    }
                });
                break;
            case "thisMonth":
                const currentYear = new Date().getFullYear();
                const currentMonth = new Date().getMonth();
                data.forEach((item) => {
                    const itemDate = new Date(item.start_time);
                    if (
                        itemDate.getFullYear() === currentYear &&
                        itemDate.getMonth() === currentMonth
                    ) {
                        labels.push(item.name);
                        values.push(item.length);
                    }
                });
                break;
            case "thisWeek":
                const currentYear = new Date().getFullYear();
                const currentWeek = getWeekNumber(new Date());
                data.forEach((item) => {
                    const itemDate = new Date(item.start_time);
                    if (
                        itemDate.getFullYear() === currentYear &&
                        getWeekNumber(itemDate) === currentWeek
                    ) {
                        labels.push(item.name);
                        values.push(item.length);
                    }
                });
                break;
            case "today":
                const today = new Date().toISOString().slice(0, 10);
                data.forEach((item) => {
                    const itemDate = new Date(item.start_time)
                        .toISOString()
                        .slice(0, 10);
                    if (itemDate === today) {
                        labels.push(item.name);
                        values.push(item.length);
                    }
                });
                break;
            default:
                // Handle invalid filterOption
                break;
        }

        return { labels, datasets: [{ label: "Time Spent", data: values }] };
    };

    // Helper function to get the week number using Moment.js (alternative implementation)
    const getWeekNumber = (date) => {
        import moment from "moment";
        return moment(date).isoWeek();
    };

    const handleFilterChange = (event) => {
        setFilterOption(event.target.value);
    };

    return (
        <div>
            <select value={filterOption} onChange={handleFilterChange}>
                <option value="allTime">All Time</option>
                <option value="thisYear">This Year</option>
                <option value="thisMonth">This Month</option>
                <option value="thisWeek">This Week</option>
                <option value="today">Today</option>
            </select>
            <Bar data={chartData} />
        </div>
    );
};

export default ChartComponent;
