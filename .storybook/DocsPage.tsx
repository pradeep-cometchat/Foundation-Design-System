import React from "react";
import { Title, Subtitle, Description, Stories } from "@storybook/blocks";

/**
 * Custom autodocs page layout.
 *
 * The default Storybook autodocs page renders Title → Subtitle → Description →
 * Primary (first story preview) → Controls (argTypes table) → Stories.
 *
 * We hide the Playground story from docs (it's still in the sidebar), so the
 * "Primary" block becomes noise and the Controls table sits empty. This layout
 * drops both and goes straight from description into the curated Stories.
 */
export const FoundationDocsPage: React.FC = () => (
  <>
    <Title />
    <Subtitle />
    <Description />
    <Stories />
  </>
);
