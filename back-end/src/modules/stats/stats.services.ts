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

  const paymentCounts = await prisma.payment.groupBy({
    by: ['status'],
    _count: {
      status: true,
    },
  });

  console.log(paymentCounts);
  const paymentData = paymentCounts.map((p) => {
    let color = '';
    if (p.status === 'succeeded') color = '#16a34a'; // green
    else if (p.status === 'failed') color = '#f59e0b'; // amber
    else if (p.status === 'canceled') color = '#dc2626'; // red
    else if (p.status === 'pending') color = '#3b82f6'; // blue (Tailwind: blue-500)

    return {
      name:
        p.status === 'succeeded'
          ? 'Success'
          : p.status === 'failed'
          ? 'Failed'
          : p.status === 'canceled'
          ? 'Canceled'
          : 'Pending',
      value: p._count.status,
      color,
    };
  });

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
    totalRevenue: totalRevenue._sum.amount || 0,
    recentProperties,
    chartData,
    paymentData,
  };
};

const getUserStats = async (userId: number) => {
  const totalMyBookings = await prisma.booking.count({
    where: {
      userId,
    },
  });

  const totalMyBookingsCompleted = await prisma.booking.count({
    where: {
      userId,
      status: 'paid',
    },
  });

  const totalMyBookingsPending = await prisma.booking.count({
    where: {
      userId,
      status: 'pending',
    },
  });

  const totalSpent = await prisma.payment.aggregate({
    where: {
      userId,
      status: 'succeeded',
    },
    _sum: {
      amount: true,
    },
  });

  const recentBookings = await prisma.booking.findMany({
    where: {
      userId,
    },
    orderBy: {
      updatedAt: 'desc',
    },
    take: 3,
    include: {
      property: true,
    },
  });

  const recentsPayments = await prisma.payment.findMany({
    where: {
      userId,
    },
    orderBy: {
      updatedAt: 'desc',
    },
    take: 3,
  });

  const getMe = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      name: true,
      email: true,
      role: true,
    },
  });

  return {
    totalMyBookings,
    totalMyBookingsCompleted,
    totalMyBookingsPending,
    totalSpent: totalSpent._sum.amount || 0,
    recentBookings,
    recentsPayments,
    user: getMe,
  };
};

const getHomeStats = async () => {
  const totalProperties = await prisma.property.count();
  const totalUsers = await prisma.user.count();
  const totalBookings = await prisma.booking.count({
    where: {
      status: 'pending',
    },
  });

  const totalValue = await prisma.property.aggregate({
    _sum: {
      price: true,
    },
  });
  return {
    totalProperties,
    totalUsers,
    totalBookings,
    totalValue: totalValue._sum.price || 0,
  };
};

export const statsServices = {
  getAdminStats,
  getUserStats,
  getHomeStats,
};
