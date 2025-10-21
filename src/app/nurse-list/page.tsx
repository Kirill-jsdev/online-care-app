"use client";

import { supabase } from "@/config/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface Nurse {
  id: number;
  first_name: string;
  last_name: string;
}

// Separate API function for better organization
const getNurses = async () => {
  const { data, error } = await supabase.from("nurse").select("*");
  if (error) throw error;
  return data as Nurse[];
};

const NurseListPage = () => {
  const {
    data: nurses,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["nurses"],
    queryFn: getNurses,
  });

  if (isLoading) {
    return (
      <div className="p-4 flex justify-center">
        <div>Loading nurses...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="text-red-500">Error: {error.message}</div>
        <button onClick={() => refetch()} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Nurse List</h1>
        <button onClick={() => refetch()} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Refresh
        </button>
      </div>

      <ul className="space-y-2">
        {nurses?.map((nurse) => (
          <li key={nurse.id} className="p-3 bg-white rounded shadow hover:shadow-md transition-shadow">
            {nurse.first_name} {nurse.last_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NurseListPage;
