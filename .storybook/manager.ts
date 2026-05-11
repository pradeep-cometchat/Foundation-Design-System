import { addons } from "@storybook/manager-api";
import { foundationTheme } from "./theme";

addons.setConfig({
  theme: foundationTheme,
  sidebar: {
    showRoots: true,
  },
});
