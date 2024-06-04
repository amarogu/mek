import { getGifts } from "@/lib/actions/getGifts";
import { connectDb } from "@/lib/connect";
import Content from "./Content";

export default async function Home() {
  const models = await connectDb();

  if (models) {
    const { Gift } = models;
    const gifts = await getGifts({ Gift });
    if (gifts) {
      return <Content gifts={gifts} />;
    }
  }

  return null;
}