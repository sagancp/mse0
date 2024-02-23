import { BarChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import Container from "@mui/material/Container";

import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const columns: GridColDef[] = [
    // { field: "id", headerName: "№", width: 70 },
    { field: "ticker", headerName: "Хувьцаа", width: 120 },
    { field: "company_name", headerName: "Компанийн нэр", width: 240 },
    {
        field: "industry",
        headerName: "Үйл ажиллагааны чиглэл",
        width: 200,
        align: "center",
    },
    {
        field: "price",
        headerName: "Хувьцааны үнэ /MNT/",
        width: 180,
        align: "right",
    },
    {
        field: "market_cap",

        headerName: "Зах зээлийн үнэлгээ /mln MNT/",
        width: 240,
        align: "right",
    },
    {
        field: "trailing_pe_2023_4Q",
        headerName: "PE харьцаа",
        width: 120,
        align: "center",
    },
    {
        field: "pb_2023_4Q",
        headerName: "PB харьцаа",
        width: 120,
        align: "center",
    },
    { field: "roe_2023_4Q", headerName: "ROE", width: 130, align: "center" },
    { field: "roa_2023_4Q", headerName: "ROA", width: 130, align: "center" },
    //   {
    //     field: 'age',
    //     headerName: 'Age',
    //     type: 'number',
    //     width: 90,
    //   },
    //   {
    //     field: 'fullName',
    //     headerName: 'Full name',
    //     description: 'This column has a value getter and is not sortable.',
    //     sortable: false,
    //     width: 160,
    //     valueGetter: (params: GridValueGetterParams) =>
    //       `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    //   },
];

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

export default function Home() {
    const [data, setData] = useState<any>(null);

    const numberFormatter = new Intl.NumberFormat("en-US", {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    useEffect(() => {
        getGoogleSheetsData("process_data!A1:z99").then((res) => {
            const keys = res.shift(); // Remove and store keys

            const result = res.map((entry: any) => {
                const obj: any = {};
                keys.forEach((key: any, index: number) => {
                    if (["trailing_pe_2023_4Q"].includes(key)) {
                        obj[key] = parseFloat(entry[index]); // Parse to float
                    } else {
                        obj[key] = entry[index];
                    }
                });
                return obj;
            });
            // "roe_2023_4Q","roa_2023_4Q"
            // ,parseFloat(str.replaceAll(',', ''));
            console.log(result);
            let processed: any[] = [];
            result?.map((e: any) => {
                if (![NaN].includes(e?.trailing_pe_2023_4Q)) {
                    processed.push(e);
                    console.log(e.no);
                }

                processed.sort((b, a) => {
                    return a.trailing_pe_2023_4Q - b.trailing_pe_2023_4Q;
                });

                setData(processed);
            });
        });
    }, []);
    console.log(data);

    return (
        <Container maxWidth="xl" className="flex justify-center align-middle">
            <main className="container m-auto">
                <h1 className="text-center font-sans text-3xl font-bold my-5">
                    Монголын хөрөнгийн биржид бүртгэлтэй компаниуд
                </h1>
               <div className="flex justify-between flex-wrap">

              
                {data && (
                    <div className="flex justify-center">
                        <BarChart
                            xAxis={[
                                {
                                    id: "barCategories",
                                    data: data
                                        ?.filter(
                                            (e: any) =>
                                                e.trailing_pe_2023_4Q > 0
                                        ).sort((a: any, b: any) => b.trailing_pe_2023_4Q - a.trailing_pe_2023_4Q)
                                        .map((e: any) => e.ticker),
                                    scaleType: "band",
                                },
                            ]}
                            series={[
                                {
                                    data: data
                                        ?.filter(
                                            (e: any) =>
                                                e.trailing_pe_2023_4Q > 0
                                        ).sort((a: any, b: any) => b.trailing_pe_2023_4Q - a.trailing_pe_2023_4Q)
                                        .map((e: any) => e.trailing_pe_2023_4Q),
                                        label:"PE ratio / Үнэ ашгийн харьцаа"
                                },
                            ]}
                            width={720}
                            height={400}
                        />
                    </div>
                )}
                 {data && (
                    <div className="flex justify-center">
                        <BarChart
                            xAxis={[
                                {
                                    id: "barCategories",
                                    data: data?.sort((a: any, b: any) => b.pb_2023_4Q - a.pb_2023_4Q).map((e: any) => e.ticker),
                                    scaleType: "band",
                                },
                            ]}
                            series={[
                                {
                                    data: data?.sort((a: any, b: any) => b.pb_2023_4Q - a.pb_2023_4Q).map((e: any) => e.pb_2023_4Q),
                                        label:"PB ratio / Үнэ өөрийн хөрөнгийн харьцаа"
                                },
                            ]}
                            width={720}
                            height={400}
                        />
                    </div>
                )}
                 </div>
                 <div className="flex justify-between flex-wrap">
                    
                 {data && (
                    <div className="flex justify-center">
                        <BarChart
                            xAxis={[
                                {
                                    id: "barCategories",
                                    data: data?.sort((a: any, b: any) => parseFloat(b.roe_2023_4Q) - parseFloat(a.roe_2023_4Q)).map((e: any) => e.ticker),
                                    scaleType: "band",
                                },
                            ]}
                            series={[
                                {
                                    data: data?.sort((a: any, b: any) => parseFloat(b.roe_2023_4Q) - parseFloat(a.roe_2023_4Q)).map((e: any) => parseFloat(e.roe_2023_4Q)),
                                        label:"%Return on Equity / Өөрийн хөрөнгийн өгөөжийн хувь"
                                },
                            ]}
                            width={720}
                            height={400}
                        />
                    </div>
                )}
                {data && (
                    <div className="flex justify-center">
                        <BarChart
                            xAxis={[
                                {
                                    id: "barCategories",
                                    data: data?.sort((a: any, b: any) => parseFloat(b.roa_2023_4Q) - parseFloat(a.roa_2023_4Q)).map((e: any) => e.ticker),
                                    scaleType: "band",
                                },
                            ]}
                            series={[
                                {
                                    data: data?.sort((a: any, b: any) => parseFloat(b.roa_2023_4Q) - parseFloat(a.roa_2023_4Q)).map((e: any) => parseFloat(e.roa_2023_4Q)),
                                        label:"%Return on Assets / Нийт хөрөнгийн өгөөжийн хувь"
                                },
                            ]}
                            width={720}
                            height={400}
                        />
                    </div>
                )}
                
                </div>
                {data && (
                    <div style={{ height: 800, width: "100%" }}>
                        <DataGrid
                            rows={data}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 40 },
                                },
                            }}
                            pageSizeOptions={[5, 10]}
                        />
                    </div>
                )}

                {/* <h2 className="text-center mt-5 font-bold">Price to earning / Үнэ ашгийн харьцаа</h2> */}

                
            </main>
        </Container>
    );
}
