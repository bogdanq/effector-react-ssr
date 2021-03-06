import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";

import { root } from "effector-root";
import { fork, serialize } from "effector/fork";

import { App } from "./App";

let assets: any;

const syncLoadAssets = () => {
  assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);
};

syncLoadAssets();

function htmlEnd(storesValues: Record<string, unknown>): string {
  return `
        <script>
          window.INITIAL_STATE = ${JSON.stringify(storesValues)}
        </script>
    </body>
</html>`;
}

const server = express()
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
  .get("/*", (req: express.Request, res: express.Response) => {
    const scope = fork(root);

    const storesValues = serialize(scope);

    const context = {};
    const markup = renderToString(
      <StaticRouter context={context} location={req.url}>
        <App root={scope} />
      </StaticRouter>
    );

    res.send(
      `<!doctype html>
        <html lang="">
        <head>
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta charSet='utf-8' />
            <title>Razzle TypeScript</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            ${
              assets.client.css
                ? `<link rel="stylesheet" href="${assets.client.css}">`
                : ""
            }
              ${
                process.env.NODE_ENV === "production"
                  ? `<script src="${assets.client.js}" defer></script>`
                  : `<script src="${assets.client.js}" defer crossorigin></script>`
              }
        </head>
        <body>
          <div id="root">${markup}</div>
        ${htmlEnd(storesValues)}
      `
    );
  });

export default server;
