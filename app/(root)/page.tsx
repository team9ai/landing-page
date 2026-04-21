import { setRequestLocale } from "next-intl/server";
import HomePage from "@/components/HomePage";

export default async function RootPage() {
  setRequestLocale("en");
  return <HomePage />;
}
