import { Component, OnInit, OnDestroy,Output, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Response } from '@angular/http';

import { SelectItem } from 'primeng/primeng';
import { Message } from 'primeng/primeng';
import { ConfirmationService } from 'primeng/primeng';

import { PersonalInfo, Misc } from '../../../services/data.service';
import { MasterHttpService } from '../../../services/masterhttp.service';
import { ComponentCanDeactivate } from '../account.guard';
import * as constants from '../../../../config/states'

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, ComponentCanDeactivate {

    //otp verification
    otpDialog: boolean;
    dummyOtpSection: boolean;
    dummyIncorrectOtp: boolean;
    actualOTP = 123456;
    dummyOtp: number;
    examCity:string;
    rollNo:string;



    //basic info tab
    editBasic: boolean;
    dummyBasicInfo: any;
    schoolId: number;
    city: SelectItem[] = [];
    state: SelectItem[] = [];
    country: SelectItem[] = [];
    maxDate: Date;
    //userBasicInfo:any;
    //newBasicInfo:any;

    //school info tab
    editSchool: boolean;
    dummySchoolInfo: any;
    dummyEditSchoolInfo: any;
    school: string;
    newSchool: string;

    //change password tab
    editPassword: boolean;
    storedPwd = 'qwe123'
    newPassword: string;
    confirmNewPassword: string;
    oldPassword: string;

    //add testimonial tab
    editTestimonial: boolean
    testimonial: string;
    index: number;
    rating: number;
    currentTestimonial: string;

    //add achievement tab
    classList: SelectItem[] = [];
    selectedClass: string;
    exam: SelectItem[] = [];
    selectedExam: string;
    rollNumber: string;
    dec: Array<string>;

    //misc
    growlmsg: Message[];
    date: Date;
    test: any;
    deactivate: boolean;
    spinner:boolean;
    spinner2:boolean;

    couponCode: string;
    achievement;
    isHuman:boolean;
    @ViewChild('captcha') captcha;
    constructor(
        public confirmservice: ConfirmationService,
        public personalInfo: PersonalInfo,
        public misc: Misc,
        public masterhtttp: MasterHttpService
    ) { }

    setStates(){
        let states = Object.keys(constants.states);
        for(let i in states){
            this.state.push({label:states[i],value:states[i]});
        }
        this.country.push({label:'India',value:'India'})
    }

    onStateSelect(e){
        let state;
        if(e==null){
            state = this.personalInfo.userInfo.state;
        }
        else state = e.value;
        this.city = [];
        if(state!=null){
            for(let i in constants.states[state]){
                this.city.push({label:constants.states[state][i],value:constants.states[state][i]})
            }
        }
    }


    ngOnInit() {
        // this.decode();
        this.setStates();
        this.misc.setCurrentRoute(["Profile"]);
        this.misc.setLocalRoute('account/profile');
        this.onStateSelect(null);
        this.rating = parseInt(this.personalInfo.userInfo['user_rating']);
        this.dec = [];
        this.exam.push(
            { label: "Select Exam", value: "null" }, { label: "NCO 2016-17 - Level 2", value: "NCO-16-17" },
            { label: "NSO-16-17 - Level 2", value: "NSO-16-17" }, { label: "IMO 2016-17 - Level 2", value: "NTSE" },
            { label: "IMO 2016-17 - Level 2", value: "IMO 2016-17 - Level 2" },
            { label: "ISKO 2016", value: "ISKO 2016" },
            { label: "NCO 2016", value: "NCO 2016" },
            { label: "NCO 2016 - Level 1", value: "NCO 2016 - Level 1" },
            { label: "NSO 2016 - Level 1", value: "NSO 2016 - Level 1" },
            { label: "IMO 2016 - Level 1", value: "IMO 2016 - Level 1" },
            { label: "IEO 2016 - Level 1", value: "IEO 2016 - Level 1" },
            { label: "IIO 2016 - Level 1", value: "IIO 2016 - Level 1" },
            { label: "IOM 2016 - Level 1", value: "IOM 2016 - Level 1" },
            { label: "IOS 2016 - Level 1", value: "IOS 2016 - Level 1" },
            { label: "IOEL 2016 - Level 1", value: "IOEL 2016 - Level 1" },
        )

        this.classList.push(
            { label: "Select Class", value: null },
            { label: "I", value: "I" },
            { label: "II", value: "II" },
            { label: "III", value: "III" },
            { label: "IV", value: "IV" },
            { label: "V", value: "V" },
            { label: "VI", value: "VI" },
            { label: "VII", value: "VII" },
            { label: "VIII", value: "VIII" },
            { label: "IX", value: "IX" },
            { label: "X", value: "X" },
        )

        this.dummySchoolInfo = {
            code: "OBU232",
            schoolname: "St Thomas School",
            contactperson: "Dave",
            email: "dap@stschool.com",
            landline: 3543542,
            address: "pqr xyz, abc",
            state: "Uttar Pradesh",
            city: "Ghaziabad",
            country: "India",
            pincode: "21012",
            mobile: 9324567322
        }

        this.dummyEditSchoolInfo = {
            code: "OBU232",
            schoolname: "St Thomas School",
            contactperson: "Dave",
            email: "dap@stschool.com",
            landline: 3543452,
            address: "pqr xyz, abc",
            state: "Uttar Pradesh",
            city: "Ghaziabad",
            country: "India",
            pincode: "21012",
            mobile: 9324567322
        }

        this.maxDate = new Date();
        this.maxDate.setFullYear(2013, 0, 1);
        if(this.personalInfo.userInfo['address']==''){
        }
    }

    editBasicInfo() {
        this.dummyBasicInfo = JSON.parse(JSON.stringify(this.personalInfo.userInfo));
        this.editBasic = true;
    }

    cancelBasicInfo() {
        this.dummyBasicInfo = JSON.parse(JSON.stringify(this.personalInfo.userInfo));
        this.editBasic = false;
    }

    saveBasicInfo() {
        this.spinner = true;
        let wrapper = {
            'firstname': this.dummyBasicInfo['firstname'].toLowerCase(),
            'lastname': this.dummyBasicInfo['lastname'].toLowerCase(),
            'country': this.dummyBasicInfo['country'],
            'address': this.dummyBasicInfo['address'].toLowerCase(),
            'state': this.dummyBasicInfo['state'],
            'city': this.dummyBasicInfo['city'],
            'birthdate': this.dummyBasicInfo['birthdate'],
            'pincode': this.dummyBasicInfo['pincode'],
            // 'mobile': this.dummyBasicInfo['mobile'],
            'gender': this.dummyBasicInfo['gender'], 
            'school_id': this.personalInfo.studentInfo['school_id']
        }
        this.masterhtttp.updateProfile(wrapper)
            .subscribe((data: Response) => {
                if (data['status'] == 200) {
                    this.dummyBasicInfo.mobile = this.personalInfo.userInfo.mobile;
                    this.changeTheme(wrapper['gender']);
                    // this.masterhtttp.getPersonalInfo();
                    this.dummyBasicInfo['firstname'] = this.dummyBasicInfo['firstname'].charAt(0).toUpperCase()+this.dummyBasicInfo['firstname'].slice(1);
                    this.dummyBasicInfo['lastname'] = this.dummyBasicInfo['lastname'].charAt(0).toUpperCase()+this.dummyBasicInfo['lastname'].slice(1);

                    this.personalInfo.userInfo = this.dummyBasicInfo;
                    this.editBasic = false;
                    this.generateMsg('success','Success','Profile Updated Successfully');
                }
                else{
                    this.generateMsg('error','Could Not Update Profile','Please Try Again');
                }
            }, 
            err=>{
                this.generateMsg('error','Server Error', 'Please Try Again');
            })
    }

    editSchoolInfo() {
        this.couponCode = this.personalInfo.schoolInfo['school_code'];
        this.editSchool = true;
    }

    cancelSchoolInfo() {
        this.couponCode = this.personalInfo.schoolInfo['school_code'];
        // if (this.personalInfo.schoolInfo == null) {
        //     this.personalInfo.schoolInfo = JSON.parse(JSON.stringify(this.personalInfo.dummySchoolInfo));
        // }
        this.editSchool = false;
    }

    updateSchool() {
            let wrapper = {'school_id':this.personalInfo.schoolInfo['school_id']};
            this.masterhtttp.updateProfile(wrapper).subscribe((data)=>{
                if(data['status'] == 200){
                    this.masterhtttp.getPersonalInfo();
                }
            });
    }

    saveSchoolInfo() {
        this.spinner=true;
        let wrapper = { 'school_code': this.couponCode };
        this.masterhtttp.getSchool(wrapper)
            .subscribe((data: Response) => {
                if (data['status'] == 200) {
                    this.personalInfo.setSchoolInfo(data['message'])
                    this.generateMsg('success','Success','School Info Saved');
                    this.editSchool = false;
                    this.updateSchool();
                } else {
                    this.generateMsg('info','Invalid School Code','Please Try Again');
                }
                this.spinner = false;
            },
            err=>{
                this.generateMsg('error','Server Error','Please Try Again');
            })
    }

    changePassword() {
        this.spinner = true;
        let requestbody = { 'old_password': this.oldPassword, 'new_password': this.confirmNewPassword, 'user_info_id': this.personalInfo.userInfo['user_info_id'] }
        if (this.confirmNewPassword != this.newPassword) {
            this.generateMsg('error','New Password doesn\'t match','Please try again');
        }
        else {
            this.masterhtttp.updatePassword(requestbody)
                .subscribe((data: Response) => {
                    if (data['status'] == 200) {
                        this.cancelPassword();
                        this.generateMsg('success','Success','Password Updated Successfully')
                    } else {
                        this.generateMsg('info','Incorrect Old Password','Please Try Again');
                    }
                },
                err=>{
                    this.generateMsg('error','Server Error','Please Try Again');
                })
        }
    }


    cancelPassword() {
        this.newPassword = null;
        this.confirmNewPassword = null;
        this.oldPassword = null;
        this.editPassword = false
    }

    addTestimonial() {
        this.spinner = true;
        let requestBody = { 'text': this.testimonial, 'student_id': this.personalInfo.studentInfo['student_id'] }
        this.masterhtttp.addTestimonial(requestBody)
            .subscribe((data: Response) => {
                if (data['status'] == 200) {
                    this.masterhtttp.getTestimonials();
                    this.generateMsg('success','Success','Testimonial Added Successfully');
                    this.testimonial = null;
                }
                else if(data['status'] == 713){
                    this.generateMsg('error','Limit Reached','You Cannot Add More Than 3 Testimonials');
                }
                else{
                    this.generateMsg('error','Unable To Add Testimonial','Please Try Again')
                }
            },
            err=>{
                this.generateMsg('error','Server Error','Please Try Again');
            })
    }

    cancelTestimonial() {
        this.testimonial = null;
    }

    addAchievement() {
        if(!this.isHuman){
            return false;
        }
        this.spinner = true;
        if(this.dec[0]!='dec1'||this.dec[1]!='dec2'){
            this.spinner = false
            return false
        }
        let requestBody = { 
            'text': this.achievement, 
            'student_id': this.personalInfo.studentInfo['student_id'],
            'exam_city':this.examCity, 
            'exam':this.selectedExam,
            'exam_roll_no':this.rollNo,
            'class':this.selectedClass,
            'declaration_authenticity':0,
            'declaration_share_info':0
        }

        if(this.dec[0]==='dec1'){
            requestBody['declaration_authenticity']=1;
        }
        if(this.dec[1]==='dec2'){
            requestBody['declaration_share_info']=1;
        }
        this.masterhtttp.addAchievement(requestBody)
            .subscribe((data: Response) => {
                if (data['status'] == 200) {
                    this.achievement = null;
                    this.generateMsg('success','Success','Achievement Added Successfully');
                    this.cancelAchievement();
                    this.spinner = false;
                }
                else if(data['status']==777){
                    this.generateMsg('error','Limit Reached','You Cannot Add More Than 3 Achievements');
                    this.dec = [];
                    this.spinner = false;
                    this.cancelAchievement();
                }
                else{
                    this.generateMsg('error','Error','Unable To Add Testimonial');
                    
                    this.spinner = false;
                    this.cancelAchievement();
                }
                this.captcha.reset();
            },
            err=>{
                this.generateMsg('error','Server Error','Please Try Again');
                this.captcha.reset();
                
            })
    }

    changeTheme(gender) {
        let theme = {
            Male:'ob',
            Female:'ob'
            //comment by Anoop Female:'pink'
        }
        let themeLink: HTMLLinkElement = <HTMLLinkElement> document.getElementById('theme-css');
        let layoutLink: HTMLLinkElement = <HTMLLinkElement> document.getElementById('layout-css');
        
        themeLink.href = 'assets/theme/theme-' + theme[gender] +'.css';
        layoutLink.href = 'assets/layout/css/layout-' + theme[gender] +'.css';
    }

    invalidName(){
        let arr = [false,false,false];
        let pattern = new RegExp("^[a-zA-Z]+$");
        let dobPattern = new RegExp("^[0-9]{4}-[0-9]{2}-[0-9]{2}$");
        let zipPattern = new RegExp("^[0-9]{6}");
        let addressPattern = new RegExp("^[0-9A-Za-z]{1,}[a-zA-Z0-9]+$");
        if(this.editBasic){
            if(!pattern.test(this.dummyBasicInfo.firstname)){
                arr[0] = true;
            }
            if(!pattern.test(this.dummyBasicInfo.lastname)){
                arr[1] = true;
            }
            if(!dobPattern.test(this.dummyBasicInfo.birthdate)){
                arr[2] = true;
            }
            if(this.dummyBasicInfo.address==null||this.dummyBasicInfo.address==''){
            // if(!addressPattern.test(this.dummyBasicInfo.address||this.dummyBasicInfo.address=='')){
                arr[3] = true;
            }
            if(!zipPattern.test(this.dummyBasicInfo.pincode)){
                arr[4] = true;
            }
        }
        return arr;
    }

    cancelAchievement() {
        this.achievement = null;
        this.dec = [];
        this.selectedClass = null;
        this.selectedExam = null,
        this.rollNo = null;
        this.examCity = null;
        this.isHuman = false;
    }

    updateMobile(){
        let wrapper = {mobile:this.dummyBasicInfo['mobile']};
        this.masterhtttp.updateProfile(wrapper).subscribe((data)=>{
            if(data['status']==200){
                this.generateMsg('success','Success','Mobile Number Updated Successfully');
                this.otpDialog = false;
                this.personalInfo.userInfo['mobile'] = this.dummyBasicInfo['mobile'];
                this.personalInfo.userInfo['mobile_verified'] = 1;
            }
            else {
                this.generateMsg('error','Server Error','Please Try Again');
            }
        }, err=>{
                this.generateMsg('error','Server Error','Please Try Again');

        })

    }


    dummyVerify() {
    //otp verification
        this.spinner = true;
        let wrapper = {verify_mobile:true,verify_email:false,otp:this.dummyOtp, email:this.personalInfo.userInfo['email']};
        this.masterhtttp.verifyOtp(wrapper).subscribe((data)=>{
            if(data['status']==200){
                this.updateMobile();
                this.spinner = false;
            }
            else if(data['status']==721){
                this.spinner = false;
                this.generateMsg('error','Incorrect Otp','Please Try Again');
            }
        },err=>{
            this.spinner = false;
            this.generateMsg('error','Incorrect Otp','Please Try Again');
        })
    }

    maxLength(){
        if(this.confirmNewPassword.length<6||this.newPassword.length<6||this.oldPassword.length<6){
            return true;
        }
        return false;
    }

    edit(a) {
        this.index = a
        this.currentTestimonial = this.personalInfo.userTestimonials[a]['text'];
        this.editTestimonial = true;
    }

    saveTestimonial() {
        this.spinner = true
        var wrapper = {'text':this.currentTestimonial,'testimonial_id':this.personalInfo.userTestimonials[this.index]['testimonial_id']};
        this.masterhtttp.updateTestimoial(wrapper).subscribe((data)=>{
            if(data['status']==200){
                this.personalInfo.userTestimonials[this.index]['text'] = this.currentTestimonial;
                this.spinner = false;
                this.editTestimonial = false;
                this.generateMsg('success','Success','Testimonial Updated Successfully')
            }
            else {
                this.spinner = false;
                this.generateMsg('error','Error','Unable To Update Testimonial')
            }
        },err=>{
            this.spinner = false;
            this.generateMsg('error','Server Error','Please Try Again')
        })

    }

    cancel() {
        this.currentTestimonial = this.misc.userTestimonial[this.index];
        this.editTestimonial = false;
    }



    //tab change event
    onChange() {
        if (this.editBasic) {
            this.confirmservice.confirm({
                message: 'Save changes in Basic info ?',
                accept: () => {
                    this.editBasic = false;

                },
                reject: () => {
                    this.editBasic = false;
                }
            });
        }
        else if (this.editSchool) {
            this.confirmservice.confirm({
                message: 'Save changes in School Info ?',
                accept: () => {
                    this.editSchool = false;
                },
                reject: () => {
                    this.editSchool = false;
                }
            })
        }
        else if (this.editPassword) {
            this.confirmservice.confirm({
                message: 'Save changes ?',
                accept: () => {
                    this.editPassword = false;
                },
                reject: () => {
                    this.editPassword = false;
                }
            })
        }
    }

    quit(){
        if(this.editBasic||this.editPassword||this.editTestimonial||this.editSchool){
            this.confirmservice.confirm({
            message: 'Please save changes before leaving',
            accept: () => {return false},
            reject: () => {return false}
            })            
        }
        else return true;
    }

    checkMobile(view=false){
        let pattern = new RegExp("^[7-9]{1}[0-9]{9}$");
        let mobile = this.dummyBasicInfo['mobile'];
        if(mobile==this.personalInfo.userInfo['mobile']&&!view&&this.personalInfo.userInfo['mobile_verified']==1){
            return true;
        }
        if(!pattern.test(mobile)){
            return true;
        }
        return false;
    }

    generateMsg(sev,sum,det){
        this.growlmsg = [];
        this.growlmsg.push({severity:sev,summary:sum, detail:det});
        this.spinner = false;
    }

    verify(){
        //send otp to new mobile number 
        this.spinner2 = true;
        let wrapper = {verify_mobile:true,verify_email:false,email:this.personalInfo.userInfo['email']}
        wrapper['mobile'] = this.dummyBasicInfo['mobile'].toString();
        this.masterhtttp.sendOtp(wrapper).subscribe((data)=>{
            if(data['status']==200){
                this.otpDialog = true;
                this.spinner2 = false;
                this.dummyOtp = null;
            }
            else{
                this.spinner2 = false;
                this.generateMsg('error','Server Error','Please Try Again');
            }
        }, err=>{
            this.spinner2 = false;
            this.generateMsg('error','Server Error','Please Try Again')

        })
    }
    
    canDeactivate():Observable<boolean> | boolean{
        return this.quit();
    }

    ngOnDestroy(){
        this.editBasic = false;
        this.editSchool = false;
        this.editPassword = false;
        this.editTestimonial = false;
        this.updateRating();
    }

    updateRating(){
        var wrapper = {rating:this.rating};
        this.masterhtttp.updateRating(wrapper).subscribe((data)=>{
            if(data['status']==200){
                this.personalInfo.userInfo['user_rating'] = this.rating;
            }
            else{
                this.rating = this.personalInfo.userInfo['user_rating'];
            }
        },err =>{
                this.rating = this.personalInfo.userInfo['user_rating'];
            
        })
    }

    showResponse(event){
        let wrapper = {response:event.response};
        this.masterhtttp.validateCaptcha(wrapper).subscribe((data)=>{
            if(data['status']==200){
                let status = JSON.parse(data['message']);
                if(status.success){
                    this.isHuman = true;
                }
                else this.isHuman = false;
            }
        })
    }

}
