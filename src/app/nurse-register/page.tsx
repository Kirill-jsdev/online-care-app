"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import React from "react";

export default function NurseRegisterPage() {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert("Form submitted");
  };
  return (
    <div className="p-2">
      <h1>Nurse Register Page</h1>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 max-w-sm">
        <Input type="text" name="first_name" placeholder="First Name" required />
        <Input type="text" name="last_name" placeholder="Last Name" required />
        <Input type="date" name="experience_since" placeholder="Experience Since" required />
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
}
