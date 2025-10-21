"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";

type NurseRegisterFormData = {
  first_name: string;
  last_name: string;
  experience_since: string;
};

const NurseRegisterPage = () => {
  const { register, handleSubmit } = useForm<NurseRegisterFormData>();

  const onSubmit = (data: NurseRegisterFormData) => {
    console.log(data.experience_since);
  };

  return (
    <div className="p-2">
      <h1>Nurse Register Page</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4 max-w-sm">
        <Input type="text" {...register("first_name")} placeholder="First Name" required />
        <Input type="text" {...register("last_name")} placeholder="Last Name" required />
        <Input type="date" {...register("experience_since")} placeholder="Experience Since" required />
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
};

export default NurseRegisterPage;
