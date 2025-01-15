import { AppBreadcrumb } from "@/components/app-breadcrumb";
import { AppBarChart } from "@/components/charts/app-barchart";
import React from "react";

function page() {
  const Data = {
    name: "D Watson Meds",
    email: "irtazaghaffar@gmail.com",
    license: "7832983902342",
    retailer: "M. Irtaza Ghaffar",
    address: "CUST Islamabad",
    phone: "+923331234567",
  };
  const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
  ];
  const totalInventory = 1430;
  const totalProducts = 57;
  const totalSales = 50640;
  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold">Dashboard Retailer</h2>
      <AppBreadcrumb />
      <div className="py-10 space-y-3">
        <div className="flex items-center justify-between gap-10">
          <span className="text-sm font-bold">Name</span>
          <span>{Data.name}</span>
        </div>
        <hr />
        <div className="flex items-center justify-between gap-10">
          <span className="text-sm font-bold">Email</span>
          <span>{Data.email}</span>
        </div>
        <hr />
        <div className="flex items-center justify-between gap-10">
          <span className="text-sm font-bold">Retailer</span>
          <span>{Data.retailer}</span>
        </div>
        <hr />
        <div className="flex items-center justify-between gap-10">
          <span className="text-sm font-bold">License</span>
          <span>{Data.license}</span>
        </div>
        <hr />
        <div className="flex items-center justify-between gap-10">
          <span className="text-sm font-bold">Phone</span>
          <span>{Data.phone}</span>
        </div>
        <hr />
        <div className="flex items-center justify-between gap-10">
          <span className="text-sm font-bold">Address</span>
          <span>{Data.address}</span>
        </div>
      </div>
      <div className="flex justify-between gap-5">
        <AppBarChart chartData={chartData} />
        <div className="flex flex-col justify-between w-[35vw]">
          <div className="shadow-xl p-9 rounded-xl flex flex-row justify-between items-center h-fit border-[1px] w-full">
            <span className="font-bold">Total Inventory</span>
            <span className="text-5xl">{totalInventory}</span>
          </div>
          <div className="shadow-xl p-9 rounded-xl flex flex-row justify-between items-center h-fit border-[1px] w-full">
            <span className="font-bold">Total Products</span>
            <span className="text-5xl">{totalProducts}</span>
          </div>
          <div className="shadow-xl p-9 rounded-xl flex flex-row justify-between items-center h-fit border-[1px] w-full">
            <span className="font-bold">Total Sales</span>
            <span className="text-5xl">{totalSales}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
