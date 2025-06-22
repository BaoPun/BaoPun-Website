import type { Route } from "./+types/home";
//import { Welcome } from "../welcome/welcome";
import HomePage from "../Pages/HomePage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bao Phung's Website" },
    { name: "description", content: "Bao Phung Homepage" },
  ];
}

export default function Home() {
  return <HomePage />;
}
