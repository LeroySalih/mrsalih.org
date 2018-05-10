export interface Module {
    title: string;
    subtitle: string;
    thumbnailUrl: string;
    bodyText: string;
    order: number;
    category: string;
    softwareIcons: string[];
  }

export interface ModuleId extends Module { id: string; }
