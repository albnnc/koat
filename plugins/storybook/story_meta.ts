import { cyrb53 } from "../../_utils/cyrb53.ts";
import { Plugin } from "../../plugin.ts";
import { relativiseUrl } from "../../_utils/relativise_url.ts";

export interface StoryMeta {
  id: string;
  entryPoint: string;
}

export function getStoryMeta(entryPoint: string, rootUrl: string): StoryMeta {
  const relativeEntryPoint = relativiseUrl(entryPoint as string, rootUrl);
  const id = cyrb53(relativeEntryPoint).toString();
  return {
    id,
    entryPoint: relativeEntryPoint,
  };
}

export function storyMeta(entryPoint: string): Plugin {
  return ({ config: { rootUrl }, bundle, onStage }) => {
    onStage("BOOTSTRAP", () => {
      const meta = getStoryMeta(entryPoint, rootUrl);
      const encoder = new TextEncoder();
      bundle.set("./meta.json", {
        data: encoder.encode(JSON.stringify(meta, null, 2)),
      });
    });
  };
}
