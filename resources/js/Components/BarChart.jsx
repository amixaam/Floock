import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, BarElement, BarController } from "chart.js/auto";
import dayjs from "dayjs";
Chart.register(BarController, BarElement);

const BarChart = ({ data, filterOption }) => {
    // Get all possible labels for the selected filter option
    const labels = getAllLabels(filterOption);

    // Filter data based on the selected option
    const filteredData = data.filter((entry) => {
        const startTime = dayjs(entry.start_time);
        switch (filterOption) {
            case "last year":
                return (
                    startTime >= dayjs().subtract(1, "year").startOf("year") &&
                    startTime < dayjs().startOf("year")
                );
            case "this year":
                return startTime >= dayjs().startOf("year");
            case "this month":
                return startTime >= dayjs().startOf("month");
            case "this week":
                return startTime.isSame(dayjs(), "week");
            case "yesterday":
                return startTime.isSame(dayjs().subtract(1, "day"), "day");
            case "today":
                return startTime.isSame(dayjs(), "day");
            default:
                return true;
        }
    });

    // Grouping data by labels and calculating total length
    const groupedData = filteredData.reduce((acc, entry) => {
        const label = getLabel(entry.start_time, filterOption);
        acc[label] = (acc[label] || 0) + Math.fround(entry.length / 3600);
        return acc;
    }, {});

    // Map the data to corresponding labels, filling in zeros for labels with no data
    const lengths = labels.map((label) => groupedData[label] || 0);

    // Define the dataset
    const dataset = {
        labels: labels,
        datasets: [
            {
                label: "Hours",
                backgroundColor: "#e4f287",
                borderRadius: 7,
                data: lengths,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                ticks: {
                    color: "white",
                },
                grid: {
                    lineWidth: 1,
                },
            },
            y: {
                position: "right",
                stacked: true,
                beginAtZero: true,
                ticks: {
                    color: "white",
                    callback: function (value, index, values) {
                        return value + " hours";
                    },
                    stepSize: 10,
                },
                grid: {
                    lineWidth: 4,
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return <Bar data={dataset} options={options} />;
};

// Function to get all possible labels for the selected filter option
const getAllLabels = (filterOption) => {
    const today = dayjs();
    switch (filterOption) {
        case "last year":
            const lastYear = dayjs().subtract(1, "year").startOf();
            return Array.from({ length: 12 }, (_, i) => {
                return lastYear.add(i - 1, "month").format("MMM YYYY");
            });
        case "this year":
            const thisYear = dayjs().startOf("year");
            return Array.from({ length: 12 }, (_, i) =>
                thisYear.add(i, "month").format("MMM YYYY")
            );
        case "this month":
            const thisMonth = dayjs().startOf("month");
            return Array.from(
                { length: Math.ceil((thisMonth.daysInMonth() - 1) / 7) },
                (_, i) =>
                    thisMonth.add(i, "w").format("DD MMM") +
                    " - " +
                    thisMonth.add(i + 1, "w").format("DD MMM")
            );
        case "this week":
            const thisWeek = dayjs().startOf("week");
            return Array.from({ length: 7 }, (_, i) =>
                thisWeek.add(i + 1, "d").format("ddd DD")
            );
        case "yesterday":
        case "today":
            return Array.from({ length: 24 }, (_, i) =>
                today.startOf("day").add(i, "hour").format("h A")
            );
        default:
            return [];
    }
};

// Function to get label based on start_time and filter option
const getLabel = (start_time, filterOption) => {
    const startTime = dayjs.utc(start_time).local();
    switch (filterOption) {
        case "last year":
            return startTime.format("MMM YYYY");
        case "this year":
            return startTime.format("MMM YYYY");
        case "this month":
            const month = startTime.startOf("month");
            const startOfWeek = month;
            const endOfWeek = month.add(1, "week");
            for (let i = 0; i < 5; i += 1) {
                if (
                    startTime >= startOfWeek.add(i, "week") &&
                    startTime <= endOfWeek.add(i, "week")
                ) {
                    return (
                        startOfWeek.format("DD MMM") +
                        " - " +
                        endOfWeek.format("DD MMM")
                    );
                }
            }
            return "";
        case "this week":
            return startTime.format("ddd DD");
        case "yesterday":
        case "today":
            return startTime.format("h A");
        default:
            return "";
    }
};

export default BarChart;
