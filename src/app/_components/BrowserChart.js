import React from "react";
import {Bar} from "react-chartjs-2";

import {Chart as ChartJS, CategoryScale, LinearScale, BarElement} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement);

const BrowserChart = ({analyticsDa}) => {
    const analyticsData = [
        {browser: "Chrome"},
        {browser: "Firefox"},
        {browser: "Safari"},
        {browser: "Chrome"},
        {browser: "Edge"},
        {browser: "Chrome"},
        {browser: "Chrome"},
        {browser: "Opera"},
        {browser: "Safari"},
    ];

    const browserCounts = {};
    analyticsData.forEach((entry) => {
        const browser = entry.browser || "Other";
        if (browserCounts[browser]) {
            browserCounts[browser]++;
        } else {
            browserCounts[browser] = 1;
        }
    });

    // Sort browsers by count in descending order
    const sortedBrowsers = Object.keys(browserCounts).sort((a, b) => browserCounts[b] - browserCounts[a]);

    // Extract top 4 browsers or all if less than 4
    const topBrowsers = sortedBrowsers.slice(0, 4);
    const otherBrowsers = sortedBrowsers.slice(4);

    // Calculate count for "Other" category
    const otherCount = otherBrowsers.reduce((sum, browser) => sum + browserCounts[browser], 0);

    // Prepare final list including "Other" if applicable
    const finalBrowsers = otherBrowsers.length > 0 ? [...topBrowsers, "Other"] : topBrowsers;

    // Calculate counts for Bar chart data
    const dataCounts = finalBrowsers.map((browser) => (browser === "Other" ? otherCount : browserCounts[browser]));

    const chartData = {
        labels: finalBrowsers,
        datasets: [
            {
                label: "Count",
                data: dataCounts,
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#E7E9ED"], // Add more colors as needed
                borderColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#E7E9ED"],
                borderWidth: 0,
            },
        ],
    };

    // Bar chart options
    const chartOptions = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                        precision: 0,
                    },
                },
            ],
        },
    };

    return (
        <>
            <div>Loading...</div>
            <>
                <div className="">
                    <Bar data={chartData} options={chartOptions} className="font-Outfit" />
                </div>
            </>
        </>
    );
};

export default BrowserChart;
