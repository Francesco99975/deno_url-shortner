import { Application } from "https://deno.land/x/oak/mod.ts";
import router from "./routes.ts";

const PORT: string = Deno.env.get("PORT") || "5000";

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server Running on port: ${PORT}`);

await app.listen({ port: +PORT });
