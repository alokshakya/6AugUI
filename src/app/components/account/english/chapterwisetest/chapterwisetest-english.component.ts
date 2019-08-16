import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

import { Message } from 'primeng/primeng';

import { SubjectInfo, PersonalInfo, Result, Misc, chapterwiseTest } from '../../../../services/data.service';
import { MasterHttpService } from '../../../../services/masterhttp.service';
import { EventService } from '../../../../services/event.service';

import * as language from '../../../../../config/language';

@Component({
  selector: 'app-chapterwisetest-english',
  templateUrl: './chapterwisetest-english.component.html',
  styleUrls: ['./chapterwisetest-english.component.scss']
})
export class ChapterwisetestEnglishComponent implements OnInit {
    chapterwiseTestData: any;  //chart data
    currentTabIndex;
    generatedFlag = true;
    generateMsg: Message[] = [];
    generatedChapters;
    generatedChapterIds;
    generatedTest: any;
    lang:any;
    selectedChapter: string;
    subscribed = false;
    spinner:boolean;
    spinner2:string;
    wrapper: any;
    constructor(
        public router: Router,
        public subjectInfo: SubjectInfo,
        public result: Result,
        public misc: Misc,
        public chapterwiseTest: chapterwiseTest,
        public personalInfo: PersonalInfo,
        public masterhttp: MasterHttpService,
        private event:EventService)
        {
            this.lang = language;
        }

    redirect() {
        this.misc.selectedSub = "English";
        this.router.navigate(['account/subscribe']);
    }

    ngOnInit() {
        this.misc.setCurrentRoute(["English","Chapterwise Test"]);
        this.misc.setLocalRoute('account/english/chapterwisetest');

        this.chapterwiseTestData = {
            labels: ['Remaining', 'Completed', 'Generated'],
            datasets: [{
                data: [0, 0, 0],
                backgroundColor: ["#D9534F", "#5CB85C", "#F0AD4E"],
                hoverBackgroundColor: ["#D9534F", "#5CB85C", "#F0AD4E"]
            }]
        };
        this.wrapper = {
            'chapter_id': null,
            'student_id': this.personalInfo.studentInfo['student_id'],
            'class_id': this.personalInfo.studentInfo['class_id'],
            'topic_id': null
        }

        this.generatedPanel();
    }

    
    shade(index){
        if(index==0||index==2||index==4){
            return 'dark';
        }
        return 'light';
    }

    makeGraph(){
        this.chapterwiseTestData = {
            labels: ['Remaining', 'Completed', 'Generated'],
            datasets: [{
                data: [
                        this.chapterwiseTest.english['total_tests']-this.chapterwiseTest.english['total_generated'], 
                        this.chapterwiseTest.english['total_completed'], 
                        this.chapterwiseTest.english['total_generated']
                        ],
                
                backgroundColor: ["#D9534F", "#5CB85C", "#F0AD4E"],
                hoverBackgroundColor: ["#D9534F", "#5CB85C", "#F0AD4E"]
            }]
        };
    }

    onTabOpen(e){
        //generated chapters tab event
        this.currentTabIndex = e.index; 
    }
 
    generatedPanel() {
        this.generatedChapters = [];
        this.generatedChapterIds = [];
        for (let i in this.chapterwiseTest.english['chapters']) {
            if (this.chapterwiseTest.english['chapters'][i].hasOwnProperty('tests')) {
                this.generatedChapters.push(this.chapterwiseTest.english['chapters'][i]);
                this.generatedChapterIds.push(this.chapterwiseTest.english['chapters'][i]['id'])
                // this.generatedChapters[i]['resultIndex'] = i;
            }
        }
        this.makeGraph();
    }

    tabOpen(e) {
        if (this.check(e)) {
            this.selectedChapter = this.subjectInfo.englishChapters['chapters'][e.index]['id'];
            this.wrapper['chapter_id'] = this.selectedChapter;
            this.wrapper['topic_id'] = this.subjectInfo.englishChapters['chapters'][0]['topics'][0]['id'];

            this.generatedFlag = false;
            this.generateMsg = []
            if(!this.subjectInfo.subscribedSubjects['English']){
                this.generateMsg.push({ severity: 'warn', summary: 'Please Subscribe', detail: 'To Generate Test'});
            } else {
                this.generateMsg.push({ severity: 'info', summary: 'Instruction', detail: 'Click Generate To Create ' + this.subjectInfo.englishChapters['chapters'][e.index]['name'] + ' Test' });
            }
        }
        else {
            this.generatedFlag = true;
            this.generateMsg = []
            this.generateMsg.push({ severity: 'info', summary: 'Instruction', detail: this.subjectInfo.englishChapters['chapters'][e.index]['name'] + ' Test Is Already Generated' });
        }
    }


    check(e) {
        if (this.generatedChapterIds.indexOf(this.subjectInfo.englishChapters['chapters'][e.index]['id']) == -1) {
            return true;
        }
        return false;
    }
    checkGenerated(e) {
        if (this.generatedChapterIds.indexOf(this.subjectInfo.englishChapters['chapters'][e]['id']) == -1) {
            return true;
        }
        return false;
    }

    tabClose(e) {
        this.generatedFlag = true;
        this.generateMsg = [];
        this.selectedChapter = null;
    }

    updatePanel() {
        this.generateMsg = []
        this.masterhttp.getTestDetails()
        this.event.testEvent.subscribe((data)=>{
            if(data){
                this.generatedPanel();
                this.generatedFlag = false;
                this.selectedChapter = null;
                this.spinner = false;
            }
        })
    }

    generate() {
        this.spinner = true;
        this.masterhttp.generateTest(this.wrapper)
            .subscribe((data) => {
                if (data['status'] == 200) {
                    this.chapterwiseTestData['datasets'][0]['data'][2] = this.chapterwiseTestData['datasets'][0]['data'][2]+5;
                    this.chapterwiseTestData['datasets'][0]['data'][0] = this.chapterwiseTestData['datasets'][0]['data'][0]-5;
                    this.updatePanel();
                    this.generatedFlag = false;
                }else{
                    this.generateMsg=[];
                    this.generateMsg.push({ severity: 'info', summary: 'Could Not Generate Test', detail: 'Please Try Again'});
                    this.spinner = false;
                }
            },
            err => {
                    this.generateMsg=[];
                    this.generateMsg.push({ severity: 'info', summary: 'Could Not Generate Test', detail: 'Please Try Again'});
                    this.spinner = false;
            })
    }

    startTest(testId, chapterId, attempted, completed, chapter, index) {
        this.spinner2 = testId;
        let wrapper = {
            "student_id": this.personalInfo.studentInfo['student_id'],
            "chapter_id": chapterId,
            "test_id": testId,
            "attempt":attempted,
            "completed":completed.toString()
        }
        this.chapterwiseTest.setTestIndex(index+1);
        this.chapterwiseTest.activateTestRoute();
        this.chapterwiseTest.setSubject('English',chapter);
        this.masterhttp.beginTest(wrapper)
        .subscribe((data) => {
                if (data['status'] == 200){
                    this.chapterwiseTest.setQuesAnswerSet(data['message']);
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

    checkGeneratedTest() {
        if (this.chapterwiseTest.qaSet.length == 15) {
            return true;
        }
        return false;
    }
}
