import {AppType} from "@/app/api/[[...route]]/route";
import {hc} from "hono/client";

console.log(`Initialising client with NEXT_PUBLIC_APP_URL: ${process.env.NEXT_PUBLIC_APP_URL}`)

export const client = hc<AppType>(process.env.NEXT_PUBLIC_APP_URL!);
