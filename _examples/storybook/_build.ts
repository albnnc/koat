#!/usr/bin/env -S deno run -A
import {
  BuildPlugin,
  CleanPlugin,
  HtmlTemplatePlugin,
  Project,
  StorybookPlugin,
} from "../../mod.ts";

await using project = new Project(
  {
    plugins: [
      new CleanPlugin(),
      new StorybookPlugin({
        globUrl: "./stories/**/*.{ts,tsx}",
        getPlugins: (entryPoint) => [
          new BuildPlugin({ entryPoint }),
          new HtmlTemplatePlugin({
            entryPoint: import.meta.resolve("./index.html"),
          }),
        ],
      }),
    ],
    rootUrl: import.meta.resolve("./"),
    destUrl: "./dest/",
    importMapUrl: "./import_map.json",
    dev: Deno.args[0] === "dev",
  },
);

await project.bootstrap();
