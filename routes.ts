import { Router } from "https://deno.land/x/oak/mod.ts";
const { cwd } = Deno;
import { renderFile } from "https://deno.land/x/dejs/mod.ts";
import { shortenUrl, redirectUrl } from "./controllers.ts";

const router = new Router();

router
  .get("/", async (ctx) => {
    ctx.response.body = await renderFile(`${cwd()}/public/index.ejs`, {
      title: "fmb.io | URL Shortener",
    });
  })
  .post("/url", shortenUrl)
  .get("/:slug", redirectUrl);

export default router;
