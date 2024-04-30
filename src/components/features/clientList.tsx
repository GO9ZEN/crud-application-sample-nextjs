"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { getClientList } from "./clientActions";
import { useRouter } from "next/navigation";

export default function ClientList() {
  const [clientData, setClientData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchSt = async () => {
      const res = await getClientList();
      console.log(res);
      setClientData(res.data);
    };

    fetchSt();
  }, []);

  const handleGetId = (id: number) => {
    console.log("id is", id);

    router.push("/client-list/" + id);
  };

  return (
    <div className="md:ml-[50px] ml-[30px] md:mr-[50px] mr-[30px] mt-6 mb-6">
      <Table>
        <TableCaption>SAVED DATA</TableCaption>
        <TableHeader className="bg-red-400">
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Nationality</TableHead>
            <TableHead>Job Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-blue-400">
          {clientData.map((row: any) => (
            <TableRow
              key={row.id}
              className="cursor-pointer"
              onClick={() => handleGetId(row.id)}
            >
              <TableCell className="font-medium">{row.id}</TableCell>
              <TableCell>{row.firstName}</TableCell>
              <TableCell>{row.lastName}</TableCell>
              <TableCell className="text-right">{row.email}</TableCell>
              <TableCell className="text-right">{row.nationality}</TableCell>
              <TableCell className="text-right">{row.jobRole}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
