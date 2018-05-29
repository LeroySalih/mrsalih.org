import {Question} from './question';
import { Injectable } from '@angular/core';
import {sprintf } from 'sprintf-js';

export interface QuestionSpec {
    answerLabel: string;
    units: string;
    questionLabel: string;
    inputParams: () => number[];
}

export class TimeConvertHrsMinsToMins implements QuestionSpec {
    public answerLabel = '%1d minutes';
    public units = 'mins';
    public questionLabel = 'Convert \\space %1$d:%2$d \\space to \\space minutes';
    inputParams(): number[] {
        return [
            Math.floor(Math.random() * 12),
            Math.floor(10 + (Math.random() * 49))
            ];
    }
}

export class QuestionFactory {

    public static questionSpecs: {[id: string]: QuestionSpec} = {};

    static TIME_CONVERT_HRS_MINS_TO_MINS = 'time-convert-hrs-mins-to-mins';

    public static initialise (): void {
        QuestionFactory.questionSpecs[QuestionFactory.TIME_CONVERT_HRS_MINS_TO_MINS] = new TimeConvertHrsMinsToMins();
    }

    public static getQuestionSpec (tag: string): QuestionSpec {

        console.log(QuestionFactory.questionSpecs);
        if (Object.entries(QuestionFactory.questionSpecs).length === 0) {
            this.initialise();
        }

        const spec = QuestionFactory.questionSpecs[tag];
        return spec;
    }

    getLabel(spec: QuestionSpec): string { return sprintf(spec.questionLabel, ...spec.inputParams()); }

    createQuestions (tag, count): Question[] {
        console.log(`[createQuestions]`);

        const spec: QuestionSpec = QuestionFactory.getQuestionSpec(tag);

        const questions: Question[] = [];

        for (let i = 0; i < count; i ++) {
        questions.push({
            order: i,
            questionLabel: this.getLabel(spec),
            units: spec.units
        });
        }

        return questions;
    }

}
