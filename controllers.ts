import { Client } from "https://deno.land/x/postgres/mod.ts";
import nanoid from "https://deno.land/x/nanoid/mod.ts";
import { dbCreds } from "./config.ts";

const client = new Client(dbCreds);

const shortenUrl = async (
  { request, response }: { request: any; response: any },
) => {
  try {
    const data: any = await request.body();
    const url: string = data.value.url;
    const rnd = Math.floor(Math.random() * 7 + 1);
    const slug = nanoid(rnd);
    console.log(url + " - " + slug);

    await client.connect();
    const result = await client.query(
      "INSERT INTO urls(url, slug) VALUES($1, $2)",
      url,
      slug,
    );
    console.log(result);

    response.status = 201;
    response.body = {
      success: true,
      newUrl: "fmb.io" + "/" + slug,
    };
  } catch (error) {
    console.log(error.message);
    response.status = 500;
    response.body = {
      success: false,
      message: "counld not shrten url",
    };
  } finally {
    await client.end();
  }
};

const redirectUrl = async (
  { response, params }: { response: any; params: any },
) => {
  try {
    await client.connect();
    const result = await client.query(
      "SELECT url FROM urls WHERE slug=$1",
      params.slug,
    );

    const url: string = result.rows[0][0];

    response.redirect(url);
  } catch (error) {
    console.log(error.message);
    response.status = 500;
    response.body = {
      success: false,
      message: "counld not redirect",
    };
  } finally {
    await client.end();
  }
};

export { shortenUrl, redirectUrl };
