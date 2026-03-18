import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { codeInput } from "@sanity/code-input";
import "./styles/style.css";

export default defineConfig({
  name: 'default',
  title: 'agenticblog',

  projectId: 'iycl5m0q',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), codeInput(),],

  schema: {
    types: schemaTypes,
  },
})
