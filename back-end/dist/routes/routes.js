"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_routes_1 = require("../modules/user/user.routes");
const auth_routes_1 = require("../modules/auth/auth.routes");
const property_routes_1 = require("../modules/property/property.routes");
const booking_routes_1 = require("../modules/booking/booking.routes");
const payment_routes_1 = require("../modules/payment/payment.routes");
const stats_routes_1 = require("../modules/stats/stats.routes");
const blog_routes_1 = require("../modules/blog/blog.routes");
const promo_routes_1 = require("../modules/promo/promo.routes");
exports.router = (0, express_1.Router)();
const routes = [
    {
        path: '/user',
        route: user_routes_1.userRoutes,
    },
    {
        path: '/auth',
        route: auth_routes_1.authRoutes,
    },
    {
        path: '/property',
        route: property_routes_1.propertyRoutes,
    },
    {
        path: '/booking',
        route: booking_routes_1.bookingRoutes,
    },
    {
        path: '/payment',
        route: payment_routes_1.paymentRoutes,
    },
    {
        path: '/stats',
        route: stats_routes_1.statsRoutes,
    },
    {
        path: '/blog',
        route: blog_routes_1.blogRoutes,
    },
    {
        path: '/promo',
        route: promo_routes_1.promoRoutes,
    },
];
routes.forEach((route) => {
    exports.router.use(route.path, route.route);
});
