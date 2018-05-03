export class LessonSection {
    title: string;
    order: number;
    lessonId: string;
    content: string;
    type: string;
    options: any;
}

export class LessonSectionId extends LessonSection {
    id: string;
}
