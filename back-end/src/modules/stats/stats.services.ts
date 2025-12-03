import { prisma } from '../../config/prisma.configs';

const getAdminStats = async () => {
  const totalProperties = await prisma.property.count();
  const totalUsers = await prisma.user.count();
  const totalBookings = await prisma.booking.count({
    where: {
      status: 'pending',
    },
  });
  const totalRevenue = await prisma.payment.aggregate({
    where: {
      status: 'succeeded',
    },
    _sum: {
      amount: true,
    },
  });

  const today = new Date();
  const last7days = new Date();
  last7days.setDate(today.getDate() - 6);

  const dailyRevenue = await prisma.payment.groupBy({
    by: ['createdAt'],
    where: {
      status: 'succeeded',
      createdAt: {
        gte: last7days,
        lt: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 1
        ),
      },
    },
    _sum: {
      amount: true,
    },
  });

  const chartData = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date();
    date.setDate(today.getDate() - (6 - i));

    const formatted = date.toISOString().split('T')[0];

    const found = dailyRevenue.find(
      (d) => d.createdAt.toISOString().split('T')[0] === formatted
    );

    return {
      date: formatted,
      revenue: found?._sum.amount || 0,
    };
  });

  console.log(chartData);

  const recentProperties = await prisma.property.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    take: 5,
  });
  return {
    totalProperties,
    totalUsers,
    totalBookings,
    totalRevenue,
    recentProperties,
    chartData,
  };
};
