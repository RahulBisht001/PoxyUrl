import React from "react";
import {Pie} from "react-chartjs-2";
import {Chart as ChartJS, Title, Tooltip, Legend} from "chart.js";

// Register required components
ChartJS.register(Title, Tooltip, Legend);

const OsChart = () => {
    // Dummy analytics data for OS usage
    const analyticsData = [
        {os: "Windows"},
        {os: "MacOS"},
        {os: "Linux"},
        {os: "Windows"},
        {os: "Windows"},
        {os: "MacOS"},
        {os: "Linux"},
        {os: "Windows"},
        {os: "MacOS"},
        {os: "Linux"},
        {os: "Windows"},
    ];

    // Count occurrences of each OS
    const osCounts = {};
    analyticsData.forEach((entry) => {
        const os = entry.os || "Other";
        if (osCounts[os]) {
            osCounts[os]++;
        } else {
            osCounts[os] = 1;
        }
    });

    // Sort OS by count in descending order
    const sortedOS = Object.keys(osCounts).sort((a, b) => osCounts[b] - osCounts[a]);

    // Extract top 4 OS or all if less than 4
    const topOS = sortedOS.slice(0, 4);
    const otherOS = sortedOS.slice(4);

    // Calculate count for "Other" category
    const otherCount = otherOS.reduce((sum, os) => sum + osCounts[os], 0);

    // Prepare final list including "Other" if applicable
    const finalOS = otherOS.length > 0 ? [...topOS, "Other"] : topOS;

    // Prepare data for Chart.js
    const chartData = {
        labels: finalOS,
        datasets: [
            {
                label: "OS Usage",
                data: finalOS.map((os) => (os === "Other" ? otherCount : osCounts[os])),
                backgroundColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    // Pie chart options
    const chartOptions = {
        plugins: {
            legend: {
                position: "right", // Adjust legend position as needed
            },
        },
    };

    return (
        <>
            <div>Loading...</div>
            <>
                <div className="w-72 h-auto">
                    <Pie data={chartData} options={chartOptions} />
                </div>
            </>
        </>
    );
};

export default OsChart;
