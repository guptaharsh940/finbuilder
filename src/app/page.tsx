"use client"

import Image from "next/image";
import Navbar from "./components/Navbar/page";
import { Button } from "@/components/ui/button";
import { PrismaClient, TransactionType } from '@prisma/client';
import CategoriesChart from "./components/CategoriesChart";
import DebitCreditChart from "./components/DebitCreditChart";

export default function Home() {
  const handleAddData = async () => {
    try {
      const response = await fetch('/api/adddata', {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Data added:', data);
      } else {
        console.error('Failed to add data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div className="flex">
      <div className="flex min-w-full min-h-screen space-x-6 items-center justify-center">
      <CategoriesChart/>
      <DebitCreditChart/>
      </div>
    </div>
  );
}
