export class LessonSection {
    title: string;
    order: number;
    lessonId: string;
    content: string;
}

export class LessonSectionId extends LessonSection {
    id: string;
}
