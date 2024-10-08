"use client"


import CategoriesChart from "./components/CategoriesChart";
import DebitCreditChart from "./components/DebitCreditChart";

export default function Home() {
  
  return (
    <div className="flex">
      <div className="flex flex-col md:flex-row space-y-6 min-w-full min-h-screen space-x-6 items-center justify-center ">
        <CategoriesChart />
        <DebitCreditChart />
      </div>
    </div>
  );
}
