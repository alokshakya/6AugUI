import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

import { SelectItem, Message } from 'primeng/primeng';
import { PersonalInfo, SubjectInfo, Misc, chapterwiseTest } from '../../../../services/data.service';
import { MasterHttpService } from '../../../../services/masterhttp.service';

import * as language from '../../../../../config/language';
@Component({
  selector: 'app-sampletest-reasoning',
  templateUrl: './sampletest-reasoning.component.html',
  styleUrls: ['./sampletest-reasoning.component.scss']
})
export class SampletestReasoningComponent implements OnInit {
    dummyChapters: Array<any>;
    dummyTopics: Array<any>;
    examPattern: SelectItem[];
    generateMsg:Message[];
    lang:any;
    sampleTestData: any;
    spinner2;
    testData: any;
    patternArray:Array<any>;
    patternCols:any;

    constructor(
        private router: Router,
        private misc: Misc,
        private masterhttp:MasterHttpService,
        public subjectInfo: SubjectInfo,
        public test:chapterwiseTest,
        public personalInfo:PersonalInfo) {
        this.lang = language; 
        this.testData = {
            "Sample Test 1": "35/50",
            "Sample Test 2": "Start",
            "Sample Test 3": "Start",
            "Sample Test 4": "Resume",
            "Sample Test 5": "45/50",
            "Sample Test 6": "20/50",
            "Sample Test 7": "Start",
            "Sample Test 8": "30/50",
            "Sample Test 9": "23/50",
            "Sample Test 10": "Start"
        }
        this.examPattern = [];
        this.examPattern.push({ label: "SOF", value: "null" }, { label: "SELECT EXAM", value: "null" })
        this.patternCols = [{header:'Section',field:'pattern'},{header:'No. Of Questions',field:'no_of_questions'},{header:'Marks/Ques.',field:'marks_per_question'},{header:'Total Marks',field:'total_marks'}]
    }

    shade(index){
        if(index%2==0){
            return 'dark';
        }
        return 'light';
    }

    ngOnInit() {
        this.misc.setCurrentRoute(["Reasoning","Sample Test"]);
        this.misc.setLocalRoute('account/reasoning/sampletest');
        this.makeGraph();
        this.setSofPattern();
    }

    setSofPattern(){
        this.patternArray = this.subjectInfo.patternObject['Reasoning'];
    }

    makeGraph(){
        this.sampleTestData = {
            labels: ['Completed', 'Remaining'],
            datasets: [{
                data:[0,10],
                backgroundColor: ["#5CB85C", "#D9534F"],
                hoverBackgroundColor: ["#5CB85C", "#D9534F"]
            }]
        };
        if(this.test.reasoning.hasOwnProperty('sample_test')){
            let completed = parseInt(this.test.reasoning['sample_test']['total_completed']);
            this.sampleTestData.datasets[0]['data'] = [completed,10-completed];
        }
    }

    startTest(testId, chapterId, attempted, completed, chapter, index) {
    this.spinner2 = testId;
    let wrapper = {
        "student_id": this.personalInfo.studentInfo['student_id'],
        "chapter_id": chapterId,
        "test_id": testId,
        "attempt":attempted,
        "completed":completed.toString()
    };
    this.test.setTestIndex(index+1);
    this.test.activateTestRoute();
    this.test.setSubject('Reasoning',chapter);
    this.masterhttp.beginTest(wrapper)
    .subscribe((data) => {
            if (data['status'] == 200){
                this.test.setQuesAnswerSet(data['message']);
                this.router.navigate(['test']);
            }else{
                this.generateMsg = [];
                this.generateMsg.push({ severity: 'info', summary: 'Could Not Start Test', detail: 'Please Try Again'});
            }
            this.spinner2 = null;

        },
        err => {
                this.generateMsg = [];
                this.generateMsg.push({ severity: 'info', summary: 'Could Not Start Test', detail: 'Please Try Again'});
                this.spinner2 = null;
        });
    }

    redirect() {
        this.misc.selectedSub = "Reasoning";
        this.router.navigate(['account/subscribe']);
    }

}
