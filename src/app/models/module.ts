export interface Module {
    title: string;
    subtitle: string;
    thumbnailUrl: string;
    bodyText: string;
    order: number;
    category: string;
  }

export interface ModuleId extends Module { id: string; }
