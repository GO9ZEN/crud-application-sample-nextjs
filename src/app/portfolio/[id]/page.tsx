"use client";

import { getClient } from "@/components/features/client/client-actions";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: number } }) {
  const [getId, setGetId] = useState<any[]>([]);

  useEffect(() => {
    const fetchSt = async () => {
      const res = await getClient(params.id);
      console.log(res);
      // console.log(res.data);
      setGetId([res.data]);
    };

    fetchSt();
  }, []);

  return (
    <div className="flex bg-blue-100 w-full md:h-[100vh] h-full">
      {getId.map((idClient: any) => (
        <div key={idClient.id}>
          <h1>{idClient.firstName}</h1>
          <h1>{idClient.lastName}</h1>
        </div>
      ))}
    </div>
  );
}
