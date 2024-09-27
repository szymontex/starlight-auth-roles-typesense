/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="@astrojs/starlight/virtual" />

declare namespace Astro {
  interface Locals {
    userRole?: string;
  }
}

declare module 'virtual:starlight/project-context' {
  const ProjectContext: {
    root: string;
    srcDir: string;
    trailingSlash: 'always' | 'never' | 'ignore';
    build: {
      format: 'file' | 'directory';
    };
  };
  export default ProjectContext;
}
