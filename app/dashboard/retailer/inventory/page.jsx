import { AppBreadcrumb } from "@/components/app-breadcrumb";
import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function page() {
  const medicines = [
    { id: "1", name: "Panadol 10mg", price: "$25.00", company: "GSK" },
    { id: "2", name: "Aspirin 100mg", price: "$15.00", company: "Bayer" },
    { id: "3", name: "Amoxicillin 500mg", price: "$30.00", company: "Pfizer" },
    { id: "4", name: "Ibuprofen 200mg", price: "$10.00", company: "Advil" },
    { id: "5", name: "Cetirizine 10mg", price: "$8.00", company: "Zyrtec" },
    { id: "6", name: "Metformin 500mg", price: "$20.00", company: "Teva" },
    { id: "7", name: "Paracetamol 500mg", price: "$12.00", company: "Tylenol" },
    { id: "8", name: "Simvastatin 20mg", price: "$40.00", company: "Merck" },
    { id: "9", name: "Lisinopril 10mg", price: "$22.00", company: "Aurobindo" },
    {
      id: "10",
      name: "Omeprazole 20mg",
      price: "$18.00",
      company: "AstraZeneca",
    },
  ];

  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold">Your Inventory</h2>
      <AppBreadcrumb />
      <div className="py-5">
        <Table>
          <TableCaption>A list of your Products in Inventory.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">#ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Organization</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {medicines.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell className="text-right">{item.company}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default page;
