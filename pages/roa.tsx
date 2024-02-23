import { BarChart } from "@mui/x-charts";
import Container from '@mui/material/Container';
import { useEffect, useState } from "react";
import React from 'react'

export async function getGoogleSheetsData(range: string) {
    const apiKey = "AIzaSyAPYf2hp4fgLj5fXbY6G8w00m1_qgxoqNE";
    const spreadsheetId = "1_NM0doJX5qSx0Hp9RbUlCx4uX22IlTmUP5iWw2NGpc4";
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        return data.values;
    } catch (error) {
        console.error("Error fetching Google Sheets data:", error);
        return null;
    }
}

export default function roa() {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        getGoogleSheetsData("process_data!A1:z99").then((res) => {
            const keys = res.shift(); // Remove and store keys

            const result = res.map((entry: any) => {
                const obj: any = {};
                keys.forEach((key: any, index: number) => {
                    if (key === "roa_2023_4Q") {
                        obj[key] = parseFloat(entry[index]); // Parse to float
                    } else {
                        obj[key] = entry[index];
                    }
                });
                return obj;
            });

            console.log(result);
            let processed: any[] = [];
            result?.map((e: any) => {
                if (
                    ![NaN].includes(e?.roa_2023_4Q) &&
                    e?.roa_2023_4Q > 0
                ) {
                    processed.push(e);
                    console.log(e.no);
                }

                processed.sort((b, a) => {
                    return a.roa_2023_4Q - b.roa_2023_4Q;
                });

                setData(processed);
            });
        });
    }, []);
    console.log(data);
    return (
        <Container maxWidth="lg" className="flex justify-center align-middle">
            <h1 className="text-center font-sans text-2xl font-bold mt-5">
            %Return on Assets / Нийт хөрөнгийн өгөөжийн хувь
            </h1>
          


            {data && (
                    <div className="flex justify-center mb-8">
                        <BarChart
                            xAxis={[
                                {
                                    id: "barCategories",
                                    data: data
                                        ?.filter(
                                            (e: any) =>
                                                e.roa_2023_4Q > 0
                                        ).sort((a: any, b: any) => b.roa_2023_4Q - a.roa_2023_4Q)
                                        .map((e: any) => e.ticker),
                                    scaleType: "band",
                                },
                            ]}
                            series={[
                                {
                                    data: data
                                        ?.filter(
                                            (e: any) =>
                                                e.roa_2023_4Q > 0
                                        ).sort((a: any, b: any) => b.roa_2023_4Q - a.roa_2023_4Q)
                                        .map((e: any) => e.roa_2023_4Q),
                                        // label:"roa ratio / Үнэ өөрийн хөрөнгийн харьцаа"
                                },
                            ]}
                            width={1200}
                            height={300}
                        />
                    </div>
                )}
                  <div className="flex flex-wrap mx-auto pl-10 mb-20">
                {data?.sort((a: any, b: any) => b.roa_2023_4Q - a.roa_2023_4Q).map((v: any, i: number) => (
                    <div
                        className={`flex justify-between  w-32  p-5 m-3 rounded ${
                            v.roa_2023_4Q < 5.0
                                ? "bg-red-300"
                                : v.roa_2023_4Q<10.0 ?"bg-gray-400" :"bg-teal-400"
                        }`}
                        key={i}>
                        {/* <h1>{v.no}</h1> */}
                        {/* <h4 className="text-xs align-middle">{v.ticker}</h4> */}
                        <span className="font-bold text-white">
                            {v.ticker}
                        </span>
                        <span className="text-white">
                            {v.roa_2023_4Q}
                        </span>
                        {/* <h1>{v.no}</h1> */}
                    </div>
                ))}
            </div>
        </Container>
    );
}
