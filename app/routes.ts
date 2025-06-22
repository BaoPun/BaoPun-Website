import { type RouteConfig, index, route } from "@react-router/dev/routes";

// Set up routing here
export default [
    index("routes/home.tsx"),
    route('MarioKart', 'Pages/MarioKart.tsx'),
    route('ScoreTracker', 'Pages/ScoreTracker.tsx'),
] satisfies RouteConfig;
