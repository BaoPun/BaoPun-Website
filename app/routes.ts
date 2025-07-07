import { type RouteConfig, index, route } from "@react-router/dev/routes";

// Set up routing here
export default [
    index("routes/home.tsx"),
    route('MarioKart', 'Pages/MarioKart.tsx'),
    route('ScoreTracker', 'Pages/ScoreTracker.tsx'),

    // Any other permutation of uri will redirect to 404
    route('*', 'Pages/404Page.tsx'),
] satisfies RouteConfig;
