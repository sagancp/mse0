import { BarChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { Skeleton } from "@/components/ui/skeleton"
import {
  useReactTable,
  flexRender,
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Link from "next/link";
// import Navbar from "@/components/Navbar";

const columnsa: GridColDef[] = [
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

type Stock = {
    ticker: string;
    company_name: string;
    industry: string;
    price: number;
    market_cap: number;
    trailing_pe_2023_4Q: number;
    pb_2023_4Q: number;
    roe_2023_4Q: number;
    roa_2023_4Q: number;
  };
  
  // Create a columns definition
  const columns: ColumnDef<Stock>[] = [
    {
      accessorKey: 'ticker',
      header: 'Хувьцаа',
      cell: info => info.getValue(),
      size: 120,
      enableSorting:true
    },
    {
      accessorKey: 'company_name',
      header: 'Компанийн нэр',
      cell: info => info.getValue(),
      size: 240,
      enableSorting:true
    },
    {
      accessorKey: 'industry',
      header: 'Үйл ажиллагааны чиглэл',
      cell: info => info.getValue(),
      size: 200,
      enableSorting:true
    },
    {
      accessorKey: 'price',
      header: 'Хувьцааны үнэ /MNT/',
      cell: info => `${info.getValue()} MNT`,
      size: 180,
      enableSorting:true
    },
    {
      accessorKey: 'market_cap',
      header: 'Зах зээлийн үнэлгээ /mln MNT/',
      cell: info => `${info.getValue()} mln MNT`,
      size: 240,
      enableSorting:true
    },
    {
      accessorKey: 'trailing_pe_2023_4Q',
      header: 'PE харьцаа',
      cell: info => info.getValue(),
      size: 120,
      enableSorting:true
    },
    {
      accessorKey: 'pb_2023_4Q',
      header: 'PB харьцаа',
      cell: info => info.getValue(),
      size: 120,
      enableSorting:true
    },
    {
      accessorKey: 'roe_2023_4Q',
      header: 'ROE',
      cell: info => info.getValue(),
      size: 130,
      enableSorting:true
    },
    {
      accessorKey: 'roa_2023_4Q',
      header: 'ROA',
      cell: info => info.getValue(),
      size: 130,
      enableSorting:true
    },
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
    const [sorting, setSorting] = React.useState<any>([])
    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            sorting
          },
      });
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
    if(!data){
        return(
            <div className="max-w-7xl mx-auto bg-zinc-50 font-sans grid grid-cols-2 mt-10 p-10">

            <div className="space-y-2 mx-auto mt-5 w-[500px]">
              <Skeleton className="bg-zinc-200 h-5 w-full" />
              <Skeleton className="bg-zinc-200 h-5 w-full" />
              <Skeleton className="bg-zinc-200 h-5 w-full" />
              <Skeleton className="bg-zinc-200 h-5 w-full" />
              <Skeleton className="bg-zinc-200 h-5 w-full" />
              <Skeleton className="bg-zinc-200 h-5 w-full" />
              <Skeleton className="bg-zinc-200 h-5 w-full" />
            </div>
            <div className="space-y-2 mx-auto mt-5 w-[500px]">
              <Skeleton className="bg-zinc-200 h-5 w-full" />
              <Skeleton className="bg-zinc-200 h-5 w-full" />
              <Skeleton className="bg-zinc-200 h-5 w-full" />
              <Skeleton className="bg-zinc-200 h-5 w-full" />
              <Skeleton className="bg-zinc-200 h-5 w-full" />
              <Skeleton className="bg-zinc-200 h-5 w-full" />
              <Skeleton className="bg-zinc-200 h-5 w-full" />
            </div>
            <div className="space-y-2 mx-auto mt-5 w-[500px]">
              <Skeleton className="bg-zinc-200 h-5 w-full" />
              <Skeleton className="bg-zinc-200 h-5 w-full" />
              <Skeleton className="bg-zinc-200 h-5 w-full" />
              <Skeleton className="bg-zinc-200 h-5 w-full" />
              <Skeleton className="bg-zinc-200 h-5 w-full" />
              <Skeleton className="bg-zinc-200 h-5 w-full" />
              <Skeleton className="bg-zinc-200 h-5 w-full" />
            </div>
            <div className="space-y-2 mx-auto mt-5 w-[500px]">
              <Skeleton className="bg-zinc-200 h-5 w-full" />
              <Skeleton className="bg-zinc-200 h-5 w-full" />
              <Skeleton className="bg-zinc-200 h-5 w-full" />
              <Skeleton className="bg-zinc-200 h-5 w-full" />
              <Skeleton className="bg-zinc-200 h-5 w-full" />
              <Skeleton className="bg-zinc-200 h-5 w-full" />
              <Skeleton className="bg-zinc-200 h-5 w-full" />
            </div>
          
          </div>
          
        )
    }
    return (
        <Container maxWidth="xl" className="bg-zinc-50 font-sans flex justify-center align-middle">
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
                                        ).slice().sort((a: any, b: any) => b.trailing_pe_2023_4Q - a.trailing_pe_2023_4Q)
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
                                        ).slice().sort((a: any, b: any) => b.trailing_pe_2023_4Q - a.trailing_pe_2023_4Q)
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
                                    data: data?.slice().sort((a: any, b: any) => b.pb_2023_4Q - a.pb_2023_4Q).map((e: any) => e.ticker),
                                    scaleType: "band",
                                },
                            ]}
                            series={[
                                {
                                    data: data?.slice().sort((a: any, b: any) => b.pb_2023_4Q - a.pb_2023_4Q).map((e: any) => e.pb_2023_4Q),
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
                                    data: data?.slice().sort((a: any, b: any) => parseFloat(b.roe_2023_4Q) - parseFloat(a.roe_2023_4Q)).map((e: any) => e.ticker),
                                    scaleType: "band",
                                },
                            ]}
                            series={[
                                {
                                    data: data?.slice().sort((a: any, b: any) => parseFloat(b.roe_2023_4Q) - parseFloat(a.roe_2023_4Q)).map((e: any) => parseFloat(e.roe_2023_4Q)),
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
                                    data: data?.slice().sort((a: any, b: any) => parseFloat(b.roa_2023_4Q) - parseFloat(a.roa_2023_4Q)).map((e: any) => e.ticker),
                                    scaleType: "band",
                                },
                            ]}
                            series={[
                                {
                                    data: data?.slice().sort((a: any, b: any) => parseFloat(b.roa_2023_4Q) - parseFloat(a.roa_2023_4Q)).map((e: any) => parseFloat(e.roa_2023_4Q)),
                                        label:"%Return on Assets / Нийт хөрөнгийн өгөөжийн хувь"
                                },
                            ]}
                            width={720}
                            height={400}
                        />
                    </div>
                )}
                
                </div>
                {/* {data && (
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
                )} */}

<Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                      <TableHead key={headerGroup.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                  ))}
                  </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

                {/* <h2 className="text-center mt-5 font-bold">Price to earning / Үнэ ашгийн харьцаа</h2> */}

                
            </main>
        </Container>
    );
}
