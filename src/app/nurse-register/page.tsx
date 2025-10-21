"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/config/supabaseClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type NurseRegisterFormData = {
  first_name: string;
  last_name: string;
  experience_since: string;
};

const NurseRegisterPage = () => {
  const { register, handleSubmit, reset } = useForm<NurseRegisterFormData>();
  const queryClient = useQueryClient();

  const {
    mutate,
    status,
    error: mutationError,
  } = useMutation({
    mutationFn: createNurse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["nurses"] });
      reset();
    },
  });

  const isLoading = status === "pending";
  const isError = status === "error";
  const isSuccess = status === "success";

  const onSubmit = (data: NurseRegisterFormData) => {
    mutate(data);
  };

  return (
    <div className="p-2">
      <h1>Nurse Register Page</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4 max-w-sm">
        <Input type="text" {...register("first_name")} placeholder="First Name" required />
        <Input type="text" {...register("last_name")} placeholder="Last Name" required />
        <Input type="date" {...register("experience_since")} placeholder="Experience Since" required />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </Button>

        {isError && <p className="text-sm text-red-600">Error: {(mutationError as any)?.message ?? "Failed to register"}</p>}

        {isSuccess && <p className="text-sm text-green-600">Nurse registered successfully.</p>}
      </form>
    </div>
  );
};

export default NurseRegisterPage;

//Supabase function to create a nurse
const createNurse = async (payload: NurseRegisterFormData) => {
  const { data, error } = await supabase
    .from("nurse")
    .insert([
      {
        first_name: payload.first_name,
        last_name: payload.last_name,
        experience_since: payload.experience_since,
      },
    ])
    .select();

  if (error) throw error;
  return data;
};
