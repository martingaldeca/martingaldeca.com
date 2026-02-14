import {
  beforeMount,
  afterMount,
} from "@playwright/experimental-ct-react/hooks";
import "../src/app/globals.css";

export type HooksConfig = Record<string, unknown>;

beforeMount(async () => {});

afterMount(async () => {});
