"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/config/supabaseClient";

type NurseRegisterFormData = {
  first_name: string;
  last_name: string;
  experience_since: string;
};

const NurseRegisterPage = () => {
  const { register, handleSubmit } = useForm<NurseRegisterFormData>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const onSubmit = async (data: NurseRegisterFormData) => {
    setLoading(true);
    setMessage(null);
    try {
      const { data: inserted, error } = await supabase()
        .from("nurse")
        .insert([
          {
            first_name: data.first_name,
            last_name: data.last_name,
            experience_since: data.experience_since,
          },
        ])
        .select();

      if (error) {
        console.error("Supabase insert error:", error);
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage("Nurse registered successfully.");
        console.log("Inserted:", inserted);
      }
    } catch (err) {
      console.error(err);
      setMessage("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-2">
      <h1>Nurse Register Page</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4 max-w-sm">
        <Input type="text" {...register("first_name")} placeholder="First Name" required />
        <Input type="text" {...register("last_name")} placeholder="Last Name" required />
        <Input type="date" {...register("experience_since")} placeholder="Experience Since" required />
        <Button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>
        {message && <p className="text-sm">{message}</p>}
      </form>
    </div>
  );
};

export default NurseRegisterPage;
