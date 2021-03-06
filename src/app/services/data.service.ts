import { Injectable, OnChanges, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { EventService } from './event.service';

@Injectable()
export class PersonalInfo {
    // userInfoEvent: EventEmitter<boolean> = new EventEmitter();
    // schoolEvent: EventEmitter<boolean> = new EventEmitter();
    userInfo: any;
    classInfo: any;
    studentInfo: any;
    schoolInfo = { 'name': null, 'contact_person': null, 'contact_mobile': null };
    couponCode: string;
    userTestimonials:any;
    ticketDetails= [];
    dummySchoolInfo = { 'school_id': null };

    getUserTestimonials():Observable<any>{
        return this.userTestimonials;
    }

    constructor(private event:EventService) { }

    setUserTestimonials(data){
        this.userTestimonials = data;

    }

    setTickets(data){
        this.ticketDetails = data;
        this.event.emitDataEvent();
    }

    setInfo(data) {
        this.userInfo = data['user_info'];
        this.classInfo = data['class_info'];
        this.studentInfo = data['student_info'];
        if (data['school_info'] != null) {
            for (let key in data['school_info']) {
                this.schoolInfo[key] = data['school_info'][key];
                this.dummySchoolInfo[key] = data['school_info'][key];
            }
        }
        // this.userInfoEvent.emit(true);
        this.event.emitUserInfoEvent();
        this.event.emitDataEvent();
    }

    setSchoolInfo(data) {
        for (let key in data['school_info']) {
            this.schoolInfo[key] = data['school_info'][key];
        }
        for (let key in data['complete_school_info']) {
            this.schoolInfo[key] = data['complete_school_info'][key]
        }
        // this.schoolEvent.emit(true);
        this.event.emitSchoolEvent();
    }


}


@Injectable()
export class SubjectInfo {

    subjectList: Array<string>;

    computerSyllabus: Array<string>;
    computerTopics: Array<string>;

    computerChapters: Array<any>;
    englishChapters: Array<any>;
    reasoningChapters: Array<any>;
    scienceChapters: Array<any>;
    gkChapters: Array<any>;
    mathChapters: Array<any>;
    patternObject:object;

    subscribedSubjects = {};
    attemptedDemo = { "Computers": false, "Science": false, "Mathematics": false, "English": false, "General-Knowledge": false, "Reasoning": false }

    constructor(private event: EventService) { }

    setSyllabus(data) {
        this.subjectList = [];
        for (let i in data) {
            this.subjectList.push(data[i]['name']);
            // this.subscribedSubjects[data[i]['name']]=false;
            switch (data[i]['name']) {
                case "Computers":
                    this.computerChapters = data[i];
                    break;

                case "Science":
                    this.scienceChapters = data[i];
                    break;


                case "Mathematics":
                    this.mathChapters = data[i];
                    break;


                case "English":
                    this.englishChapters = data[i];
                    break;

                case "Reasoning":
                    this.reasoningChapters = data[i];
                    break;


                case "General-Knowledge":
                    this.gkChapters = data[i];
                    break;
            }

        }
        this.event.emitDataEvent();
    }

    setPattern(data){
        this.patternObject = {};
        for(let i in data){
            this.patternObject[data[i]['subject']] = data[i]['pattern'];
        }
        this.event.emitDataEvent();
    }

    setComputerChapters(data) {
        this.computerSyllabus = []
        for (let i in data) {
            this.computerSyllabus.push(data[i][1])
        }
    }

    setComputerTopics(data) {
        this.computerTopics = [];
        for (let i in data) {
            this.computerTopics.push(data[i][1])
        }
    }


}

@Injectable()
export class chapterwiseTest {
    testDetails: any;
    subject:string;
    computers: any;
    reasoning: any;
    math: any;
    gk: any;
    science: any;
    english: any;
    // testEvent: EventEmitter<boolean> = new EventEmitter();
    qaSet: any;
    testHistory: any;
    attemptDetails: any;
    activateRoute:boolean;
    completeTestDetails;
    chapter:string;
    testIndex;

    constructor(private event:EventService){}

    setSubject(subject,chapter){
        this.subject = subject;
        this.chapter = chapter;
    }

    activateTestRoute(){
        this.activateRoute = true;
    }

    setTestIndex(index){
        this.testIndex = index;
    }

    setTestDetails(data) {
        this.completeTestDetails = data;
        for (let i in data['generated']['subjects']) {
            switch (data['generated']['subjects'][i]['name']) {
                case "Computers":
                    this.computers = data['generated']['subjects'][i];
                    break;

                case "Science":
                    this.science = data['generated']['subjects'][i];
                    break;

                case "General-Knowledge":
                    this.gk = data['generated']['subjects'][i];
                    break;

                case "Mathematics":
                    this.math = data['generated']['subjects'][i];
                    break;

                case "English":
                    this.english = data['generated']['subjects'][i];
                    break;

                case "Reasoning":
                    this.reasoning = data['generated']['subjects'][i];
                    break;
            }
        }
        // this.testEvent.emit(true);
        this.event.emitTestEvent();
        this.event.emitDataEvent()
    }

     setQuesAnswerSet(data) {
        this.qaSet = data['attempt']['question_answer_set']
        if (data.hasOwnProperty('test_history')) {
            this.testHistory = data['test_history'];
        }
        this.attemptDetails = {
            'test_id': data['attempt']['id'],
            'name': data['attempt']['name'],
            'chapter_id': data['attempt']['chapter_id'],
            'total_no_questions': data['attempt']['total_no_question'],
            'total_marks': data['attempt']['total_marks'],
            'last_question': data['attempt']['last_question'],
            'students_test_id': data['attempt']['students_test_id'],
        }
    }



    beginTest(data) {

    }
}

@Injectable()
export class Misc {
    testimonial: any;
    notice: Array<any>;
    fee: Array<any>;
    syllabus: Array<any>;
    testDetails: any;
    login:boolean;
    paymentData:any;
    profileTabIndex:number = 0;
    selectedSub;
    // currentRoute: EventEmitter<[string]> = new EventEmitter();

    constructor(private event:EventService, private subjectInfo:SubjectInfo, private PersonalInfo:PersonalInfo){}

    setCurrentRoute(component){
        // this.currentRoute.emit(component);
        this.event.emitCurrentRouteEvent(component);
    }

    userTestimonial = [
        "Lorem 11111111 Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
        "Lorem 22222222 Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
        "Lorem 33333333 Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy"
    ]

    
    setLocalRoute(route){
        sessionStorage.setItem('route',route);
    }

    logIn(){
        this.login = true;
    }

    setTestimonial(data) {
        this.testimonial = data;
        this.PersonalInfo.userTestimonials = data;
        this.event.emitDataEvent();
    }

    setNotice(data) {
        this.notice = [];
        for (let i in data) {
            this.notice.push(data[i])
        }
        this.event.emitDataEvent();
    }

    setFee(data) {
        this.fee = data;
        this.event.emitFeeEvent();
        this.event.emitDataEvent();
    }

    setTestDetails(data) {
        this.testDetails = data;
        this.event.emitDataEvent();

    }

    setPaymentDetails(data){
        let buffer = [];
        let paymentDetails = [];
        for(let i in data){
            this.subjectInfo.subscribedSubjects[data[i]['subject']]=true;
            for(let k in this.fee){
                    if(data[i]['fee_id']==this.fee[k]['fee_id']){
                        this.fee.splice(parseInt(k),1);
                    }
                }
            if(i=='0'){
                buffer = data[i];
                paymentDetails.push(data[i]);
            }
            else if(buffer['gateway_order_id']==data[i]['gateway_order_id']){
                continue;
            }
            else{
                buffer = data[i];
                paymentDetails.push(data[i]);
            }
        }
        this.paymentData = paymentDetails;
        this.event.emitDataEvent();
    }

}

@Injectable()
export class Result {
    computers;
    science;
    gk;
    math;
    english;
    reasoning;
    completeResult;
    computers2;
    chapterwiseObject:any;
    sampleMockDemoResult = {
        sample_test:{
            totalCorrect:0,
            totalIncorrect:0,
            totalMarked:0
        },
        demo_test:{
            totalCorrect:0,
            totalIncorrect:0,
            totalMarked:0
        },
        mock_test:{
            totalCorrect:0,
            totalIncorrect:0,
            totalMarked:0
        },
    }

    constructor(private event:EventService){}

    filteredResult(){
        var chapterObject = {
            selectiveChapters:(chapterArray)=>{
                let chapters = [];
                let labels = [];
                let datasets = [];
                for(let i in chapterArray){
                    if(chapterArray[i].hasOwnProperty('tests')){
                        
                        for(let k in chapterArray[i]['tests']){
                            if(chapterArray[i]['tests'][k]['attempted']>0){
                                chapters.push(chapterArray[i]);
                                chapters[chapters.length-1]['chapter_index'] = parseInt(i);
                                chapters[chapters.length-1]['test_index'] = parseInt(k);
                                labels.push(`CH- ${parseInt(i)+1}`);
                                datasets.push(chapterArray[i]['total_correct']);
                                break;
                            }
                        }
                    }
                }
                return {chapters,labels,datasets}
            }
        }
        this.chapterwiseObject = chapterObject;
    }

    setDemoMockSampleResult(subject,test){
        if(subject.hasOwnProperty(test)){
            this.sampleMockDemoResult[test]['totalCorrect'] += subject[test]['total_correct'];
            this.sampleMockDemoResult[test]['totalIncorrect'] += subject[test]['total_incorrect'];
            this.sampleMockDemoResult[test]['totalMarked'] += subject[test]['total_marked'];
        }
    }

    setResult(data) {
        this.completeResult = data;
        for (let i=0; i<data['generated']['subjects'].length; i++) {
            this.setDemoMockSampleResult(data['generated']['subjects'][i],'sample_test');
            this.setDemoMockSampleResult(data['generated']['subjects'][i],'demo_test');
            this.setDemoMockSampleResult(data['generated']['subjects'][i],'mock_test');

            switch (data['generated']['subjects'][i]['name']) {
                case "Computers":
                    this.computers = data['generated']['subjects'][i];
                    break;

                case "Science":
                    this.science = data['generated']['subjects'][i];
                    break;

                case "General-Knowledge":
                    this.gk = data['generated']['subjects'][i];
                    break;

                case "Mathematics":
                    this.math = data['generated']['subjects'][i];
                    break;

                case "English":
                    this.english = data['generated']['subjects'][i];
                    break;

                case "Reasoning":
                    this.reasoning = data['generated']['subjects'][i];
                    break;
            }
        }
        this.filteredResult();
        this.event.emitResultEvent();
        this.event.emitDataEvent();
    }
}