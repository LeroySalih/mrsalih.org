export interface LearningObjectiveBase {
    order: number;
    title: string;
}

export interface LearningObjective extends LearningObjectiveBase {
    id: string;
}

