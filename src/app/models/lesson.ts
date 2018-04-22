export interface Lesson {
    title: string;
    subtitle: string;
    moduleId: string;
    order: number;
  }

export interface LessonId extends Lesson { id: string; }
