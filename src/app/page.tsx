import Content from "./Content";
import { usImgs } from "@/lib/imgs";

export default function Home() {
  return <Content imgs={{us: usImgs}} />;
}