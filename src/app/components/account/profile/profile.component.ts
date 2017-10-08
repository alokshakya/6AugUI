import { Component, OnInit, OnDestroy,Output, ViewChild, ElementRef } from '@angular/core';
import { Response } from '@angular/http';
import { SelectItem } from 'primeng/primeng';
import { Message } from 'primeng/primeng';
import { ConfirmationService } from 'primeng/primeng';
import { PersonalInfo, Misc } from '../../../services/data.service';
import { MasterHttpService } from '../../../services/masterhttp.service';
import { ComponentCanDeactivate } from '../account.guard';
import { Observable } from 'rxjs/Rx';

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
    rating: number = 2;
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
    constructor(
        public confirmservice: ConfirmationService,
        public personalInfo: PersonalInfo,
        public misc: Misc,
        public masterhtttp: MasterHttpService
    ) { }


    ngOnInit() {
        this.misc.setCurrentRoute(["Profile"]);
        this.misc.setLocalRoute('account/profile');

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

        this.city.push(
            { label: "Select City", value: null},
            { label: "Ghaziabad", value: "Ghaziabad" },
            { label: "Delhi", value: "Delhi" },
            { label: "Gurgaon", value: "Gurgaon" },
            { label: "Bombay", value: "Bombay" },
            { label: "Kolkata", value: "Kolkata" },
        )

        this.state.push(
            { label: "Select State", value: null},
            { label: "Uttar Pradesh", value: "Uttar Pradesh" },
            { label: "West Bengal", value: "West Bengal" },
            { label: "Maharashtra", value: "Maharashtra" },
            { label: "Haryana", value: "Haryana" }
        )

        this.country.push(
            { label: "Select Country", value:null },
            { label: "India", value: "India" },
            { label: "Sri Lanka", value: "Sri Lanka" },
            { label: "Indonesia", value: "Indonesia" },
            { label: "Nepal", value: "Nepal" }
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

        // this.date = new Date();
        this.maxDate = new Date();
        this.maxDate.setFullYear(2013, 0, 1);
        // this.date.setFullYear(1998, 5, 14);
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
            'firstname': this.dummyBasicInfo['firstname'],
            'lastname': this.dummyBasicInfo['lastname'],
            'country': this.dummyBasicInfo['country'],
            'address': this.dummyBasicInfo['address'],
            'state': this.dummyBasicInfo['state'],
            'city': this.dummyBasicInfo['city'],
            'birthdate': this.dummyBasicInfo['birthdate'],
            'pincode': this.dummyBasicInfo['pincode'],
            'mobile': this.dummyBasicInfo['mobile'],
            'gender': this.dummyBasicInfo['gender'], 
            'school_id': this.personalInfo.studentInfo['school_id']
        }
        this.masterhtttp.updateProfile(wrapper)
            .subscribe((data: Response) => {
                if (data['status'] == 200) {
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
        this.couponCode = this.personalInfo.schoolInfo['coupon_code'];
        this.editSchool = true;
    }

    cancelSchoolInfo() {
        this.couponCode = this.personalInfo.schoolInfo['coupon_code'];
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
        let wrapper = { 'coupon_code': this.couponCode };
        this.masterhtttp.getSchool(wrapper)
            .subscribe((data: Response) => {
                if (data['status'] == 200) {
                    this.personalInfo.setSchoolInfo(data['message'])
                    this.generateMsg('success','Success','School Info Saved');
                    this.editSchool = false;
                } else {
                    this.generateMsg('info','Invalid Coupon Code','Please Try Again');
                }
                this.updateSchool();
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
                    this.masterhtttp.getUserTestimonials(this.personalInfo.studentInfo['student_id']);
                    this.generateMsg('success','Success','Testimonial Added Successfully');
                    this.testimonial = null;
                }
                else if(data['status'] == 713){
                    this.generateMsg('warning','Limit Reached','You Cannot Add More Than 3 Testimonials');
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
        this.testimonial = "Enter Your Testimonial Here..."
    }

    addAchievement() {
        this.spinner = true;
        let requestBody = { 'text': this.achievement, 'student_id': this.personalInfo.studentInfo['student_id'] }
        this.masterhtttp.addAchievement(requestBody)
            .subscribe((data: Response) => {
                if (data['status'] == 200) {
                    this.achievement = null;
                    this.generateMsg('success','Success','Achievement Added Successfully')
                }
                else{
                    this.generateMsg('error','Error','Unable To Add Testimonial');
                }
            },
            err=>{
                this.generateMsg('error','Server Error','Please');
            })
    }

    cancelAchievement() {
        this.achievement = null;
        this.dec = [];
    }

    updateMobile(){
        let wrapper = {mobile:this.dummyBasicInfo['mobile']};
        this.masterhtttp.updateProfile(wrapper).subscribe((data)=>{
            if(data['status']==200){
                this.generateMsg('success','Success','Mobile Number Updated Successfully');
                this.otpDialog = false;
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
                this.personalInfo.userInfo['mobile'] = this.dummyBasicInfo['mobile'];
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

    edit(a) {
        this.index = a
        this.currentTestimonial = this.personalInfo.userTestimonials[a]['text'];
        this.editTestimonial = true;
    }

    saveTestimonial() {
        this.misc.userTestimonial[this.index] = this.currentTestimonial;
        this.editTestimonial = false;
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

    checkMobile(){
        let pattern = new RegExp("^[7-9]{1}[0-9]{9}$");
        let mobile = this.dummyBasicInfo['mobile'];
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
    }

}