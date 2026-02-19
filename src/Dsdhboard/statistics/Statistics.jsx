import { useQuery } from "@tanstack/react-query";
import {
  Users,
  Package,
  DollarSign,
  CheckCircle,
  Box,
} from "lucide-react";

import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import OrderChart from "../../components/chart/orderChart";
import ChartCalendar from "../../components/Shared/ChartCalendar";




const Statistics = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/admin-stats');
      return data;
      
    },
    
  });
console.log(stats)

  if (isLoading) return <LoadingSpinner />;

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers || 0,
      icon: <Users size={28} />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders || 0,
      icon: <Package size={28} />,
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      title: "Total Products",
      value: stats.totalProducts || 0,
      icon: <Box size={22} />,
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      title: "Total Revenue",
      value: stats.totalRevenue || 0,
      icon: <DollarSign size={28} />,
      color: "bg-green-100 text-green-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-100 p-6">
      <div className="max-w-7xl mx-auto space-y-10">

        <h1 className="text-3xl font-extrabold">
          Dashboard Overview
        </h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card, index) => (
            <div
              key={index}
              className="bg-base-100 rounded-3xl shadow-xl p-6 border border-base-300 hover:shadow-2xl transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-base-content/60">
                    {card.title}
                  </p>
                  <h2 className="text-2xl font-bold mt-1">
                    {card.value}
                  </h2>
                </div>

                <div
                  className={`p-3 rounded-2xl ${card.color}`}
                >
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
               <div className=" flex gap-5 ">
               <OrderChart barChartData={stats.barChartData}></OrderChart>
               <ChartCalendar barChartData={stats.barChartData}></ChartCalendar>
               </div>
      </div>
    </div>
  );
};

export default Statistics;
