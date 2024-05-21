import { getGifts } from "@/lib/serverHelpers";
import Content from "./Content";

export default async function Home() {

  const gifts = await getGifts();

  return <Content gifts={gifts} />;
}