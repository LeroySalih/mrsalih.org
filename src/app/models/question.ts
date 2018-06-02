import { QuestionTypes } from '../enums/question-types';

export interface Question {
    questionLabel: string;
    inputParams: number[];
    units: string;
    order: number;
    type: QuestionTypes;
    getLabel(): string;
    getAnswers(): any[];
    correctAnswer(): number;
    displayAnswers(): any[];

}
