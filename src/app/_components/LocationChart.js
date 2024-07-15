import React from "react";
import {Doughnut} from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    ArcElement,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, ArcElement, Legend);

const LocationChart = ({analyticsData}) => {
    const analyticsDataExample = [
        {city: "New York"},
        {city: "Los Angeles"},

        {city: "New York"},
        {city: "San Francisco"},
        {city: "Los Angeles"},
    ];
    const cityCounts = {};

    // Using forEach to count city occurrences
    analyticsDataExample.forEach((entry) => {
        const city = entry.city !== undefined ? entry.city : "Other";
        if (cityCounts[city]) {
            cityCounts[city]++;
        } else {
            cityCounts[city] = 1;
        }
    });

    console.log("((((");
    console.log(cityCounts);

    // Sort cities by count in descending order
    const sortedCities = Object.keys(cityCounts).sort((a, b) => cityCounts[b] - cityCounts[a]);

    // Extract top 4 cities or all if less than 4
    const topCities = sortedCities.slice(0, 4);
    const otherCities = sortedCities.slice(4);

    // Calculate count for "Other" category
    const otherCount = otherCities.reduce((sum, city) => sum + cityCounts[city], 0);

    // Prepare final list including "Other" if applicable
    const finalCities = otherCities.length > 0 ? [...topCities, "Other"] : topCities;

    console.log("!!!!!!!!");
    console.log(finalCities);

    // Calculate counts for Doughnut chart data
    const dataCounts = finalCities.map((city) => (city === "Other" ? otherCount : cityCounts[city]));

    // Prepare data for Chart.js
    const chartData = {
        labels: finalCities,
        datasets: [
            {
                data: dataCounts,
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#E7E9ED"], // Add more colors as needed
                hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#E7E9ED"],
                borderWidth: 0, // Add this line to remove the border
            },
        ],
    };

    return (
        <>
            <div>Loading...</div>
            <>
                <div className="w-60 h-auto">
                    <Doughnut data={chartData} />
                </div>
            </>
        </>
    );
};

export default LocationChart;
