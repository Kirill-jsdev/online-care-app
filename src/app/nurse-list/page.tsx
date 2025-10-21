"use client";

import { supabase } from "@/config/supabaseClient";
import React, { useEffect, useState } from "react";

interface Nurse {
  id: number;
  first_name: string;
  last_name: string;
  // Add other nurse fields as needed
}

export default function NurseListPage() {
  const [nurses, setNurses] = useState<Nurse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNurses() {
      try {
        const { data, error } = await supabase().from("nurse").select("*");

        console.log("Fetched nurses:", data);

        if (error) throw error;

        setNurses(data || []);
      } catch (e) {
        console.error("Error fetching nurses:", e);
        setError(e instanceof Error ? e.message : "Failed to fetch nurses");
      } finally {
        setIsLoading(false);
      }
    }

    fetchNurses();
  }, []);

  if (isLoading) return <div>Loading nurses...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-2">
      <h1>Nurse List Page</h1>
      <ul>
        {nurses.map((nurse) => (
          <li key={nurse.id}>
            {nurse.first_name} {nurse.last_name}
          </li>
        ))}
      </ul>
    </div>
  );
}
