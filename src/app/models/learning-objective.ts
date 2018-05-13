export interface LearningObjectiveBase {
    order: number;
    title: string;
    lessonId: string;
}

export interface LearningObjective extends LearningObjectiveBase {
    id: string;
}

