import { Router } from '@angular/router';
import { Component, AfterViewInit, OnInit, ElementRef, Renderer, ViewChild, OnDestroy, OnChanges } from '@angular/core';
import { PersonalInfo } from '../../../services/data.service';
import { MasterHttpService } from '../../../services/masterhttp.service';
import { EventService } from '../../../services/event.service';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Misc } from '../../../services/data.service';
import * as constants from '../../../../config/constants';
import { Message } from 'primeng/primeng';

enum MenuOrientation {
    STATIC,
    OVERLAY,
    HORIZONTAL
};

declare var jQuery: any;

@Component({
    selector: 'main-account',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class AccountMainComponent implements AfterViewInit {


    //student info to be displayed above menubar
    unVerified:boolean;

    spinner:boolean;
    spinner2:boolean;
    spinner3:boolean;
    spinner4:boolean;

    mobileVerified:boolean;
    emailVerified:boolean;

    modeStr:string;

    verifyContact:string;

    changeImg: boolean;

    layoutCompact: boolean = false;

    layoutMode: MenuOrientation = MenuOrientation.STATIC;

    darkMenu: boolean = false;

    profileMode: string = 'inline';

    rotateMenuButton: boolean;

    topbarMenuActive: boolean;

    overlayMenuActive: boolean;

    staticMenuDesktopInactive: boolean;

    staticMenuMobileActive: boolean;

    layoutContainer: HTMLDivElement;

    layoutMenuScroller: HTMLDivElement;

    modal: HTMLDivElement;

    menuClick: boolean;

    topbarItemClick: boolean;

    activeTopbarItem: any;

    documentClickListener: Function;

    resetMenu: boolean;

    userEvent: any;
    imgUploadUrl:string;
    imgPath:string;

    userObject:any;

    //profile data
    shownEmail: string;
    email: string;
    class: string;
    name: string;
    xhr:any;
    growlMsg:Message[];
    imgTimeStamp;
    @ViewChild('layoutWrapper') layourContainerViewChild: ElementRef;

    @ViewChild('layoutMenuScroller') layoutMenuScrollerViewChild: ElementRef;

    loader: boolean;
    constructor(
        public renderer: Renderer,
        public router: Router,
        public personalInfo: PersonalInfo,
        public misc: Misc,
        public masterhttp: MasterHttpService,
        public uEvent: EventService
    )
    { }

    ngOnInit() {
        this.imgUploadUrl = constants.OLYMPIADBOX_INSTANCE_URL+'/profilepicture/upload';
        this.imgPath = constants.OLYMPIADBOX_IMG_URL;
        this.email = this.personalInfo.userInfo.email;
        this.shownEmail = this.email;
        this.class = this.personalInfo.classInfo.abbreviation;
        // this.setWrapper();
    }

    // setWrapper(mode=null){
    //     let wrapper;
    //     if(mode==null){
    //         let status = {'0':false,'1':true}
    //         this.userObject = {
    //             email:this.email,
    //             'mobile_verified':status[this.personalInfo.userInfo.mobile_verified], 
    //             'email_verified':status[this.personalInfo.userInfo.email_verified],
    //             'mobile_otp':null,
    //             'email_otp':null,
    //         };
    //         if(!this.userObject.mobile_verified||!this.userObject.email_verified){
    //             this.unVerified = true 
    //         }
    //         if(this.userObject.email_verified){
    //             this.emailVerified = true;
    //             this.uEvent.emitVerifiedUserEvent();
    //         }
    //         if(this.userObject.mobile_verified){
    //             this.mobileVerified = true;
    //             this.uEvent.emitVerifiedUserEvent();
    //         }
    //         if(this.uEvent.user>=2){
    //             return false
    //         }
    //         wrapper = {email:this.userObject.email,verify_email:!this.userObject.email_verified, verify_mobile:!this.userObject.mobile_verified};
    //     }
    //     else{
    //         this.modeStr = mode;
    //         if(mode=='mobile'){
    //             wrapper = {email:this.userObject.email,verify_email:false, verify_mobile:true};
    //             this.spinner2 = true;
    //         }
    //         if(mode=='email'){
    //             wrapper = {email:this.userObject.email,verify_email:true, verify_mobile:false};
    //             this.spinner = true;
    //         }
    //     }
    //     this.sendOtp(wrapper)
    // }

    // check(mode){
    //     if(mode=='mobile'){
    //         this.personalInfo.userInfo.mobile_verified=1;
    //         this.mobileVerified = true;
    //     }
    //     if(mode=='email'){
    //         this.emailVerified = true;
    //         this.personalInfo.userInfo.email_verified=1;

    //     }
    //     if(this.mobileVerified&&this.emailVerified){
    //         this.unVerified = false;
    //         this.messageDisplay('success','Verification Successful','')
    //     }
    // }

    // verify(mode){
    //     this.modeStr = 'verify'+mode;
    //     let wrapper = {email:this.userObject.email,otp:null,verify_email:false,verify_mobile:false};
    //     if(mode=='email'){
    //         wrapper['otp'] = this.userObject['email_otp'];
    //         wrapper['verify_email'] = true
    //         this.spinner3 = true
    //     }

    //     if(mode=='mobile'){
    //         wrapper['otp'] = this.userObject['mobile_otp'];
    //         wrapper['verify_mobile'] = true
    //         this.spinner4 = true
    //     }
    //     this.masterhttp.verifyOtp(wrapper).subscribe((data)=>{
    //         if(data['status']==200){
    //             this.spinner3=false;
    //             this.spinner4=false;
    //             this.modeStr=null;
    //             this.uEvent.emitVerifiedUserEvent();
    //             this.check(mode)
    //         }
    //         else{
    //             this.messageDisplay('error','Incorrect Otp','Please Try Again')
    //             this.spinner3=false;
    //             this.spinner4=false;
    //             this.modeStr=null; 
    //         }
    //     },err=>{
    //         this.messageDisplay('error','Incorrect Otp','Please Try Again')
    //         this.spinner3=false;
    //         this.spinner4=false;
    //         this.modeStr=null;
    //     })
    // }

    // sendOtp(wrapper){
    //     this.masterhttp.sendOtp(wrapper).subscribe((data)=>{
    //         if(data['status']!=200){
    //             this.messageDisplay('info','Warning','Click Resend To Receive Otp');
    //             this.spinner = false
    //             this.spinner2 = false
    //             this.modeStr = null
    //         }
    //         else{
    //             this.spinner = false
    //             this.spinner2 = false
    //             this.modeStr = null
    //         }

    //     },err=>{
    //         this.messageDisplay('info','Warning','Click Resend To Receive Otp');
    //         this.spinner = false
    //         this.spinner2 = false
    //         this.modeStr = null
    //     })
    // }

    getDate(){
        this.imgTimeStamp = new Date().getTime();
    }

    messageDisplay(severity,summary,detail){
        this.growlMsg = [];
        this.growlMsg.push({severity:severity,summary:summary,detail:detail});
    }

    ngAfterViewInit() {
        this.layoutContainer = <HTMLDivElement>this.layourContainerViewChild.nativeElement;
        this.layoutMenuScroller = <HTMLDivElement>this.layoutMenuScrollerViewChild.nativeElement;

        //hides the horizontal submenus or top menu if outside is clicked
        this.documentClickListener = this.renderer.listenGlobal('body', 'click', (event) => {
            if (!this.topbarItemClick) {
                this.activeTopbarItem = null;
                this.topbarMenuActive = false;
            }

            if (!this.menuClick && this.isHorizontal()) {
                this.resetMenu = true;
            }

            this.topbarItemClick = false;
            this.menuClick = false;
        });


        setTimeout(() => {
            jQuery(this.layoutMenuScroller).nanoScroller({ flash: true });
        }, 10);
    }

    logout() {
        localStorage.removeItem('session_token');
        sessionStorage.removeItem('route');
        let wrapper = {'user_info_id':this.personalInfo.userInfo['user_info_id']};
        this.masterhttp.logout(wrapper)
            .subscribe((data: Response) => {
                if (data['status'] == 200) {
                    localStorage.removeItem('session_token');
                    sessionStorage.removeItem('route');
                }
            })
    };

    onMenuButtonClick(event) {
        this.rotateMenuButton = !this.rotateMenuButton;
        this.topbarMenuActive = false;

        if (this.layoutMode === MenuOrientation.OVERLAY) {
            this.overlayMenuActive = !this.overlayMenuActive;
        }
        else {
            if (this.isDesktop()) {
                this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
            }
            else {
                if (this.staticMenuMobileActive) {
                    this.staticMenuMobileActive = false;
                }
                else {
                    this.staticMenuMobileActive = true;
                }
            }
        }

        event.preventDefault();
    }

    onMenuClick($event) {
        this.menuClick = true;
        this.resetMenu = false;

        if (!this.isHorizontal()) {
            setTimeout(() => {
                jQuery(this.layoutMenuScroller).nanoScroller();
            }, 500);
        }
    }



    onBeforeSend(e){
        e.xhr.setRequestHeader('session_token',localStorage.getItem('session_token'))
        e.xhr.setRequestHeader('Olympiadbox-Api-Key',constants.OLYMPIADBOX_API_KEY)
        this.uEvent.userInfoEvent.subscribe((data)=>{
            if(data){
                this.getDate();
            }
        })
    }



    onUpload(e){
        e.files = [];
        let a = JSON.parse(e.xhr.response);
        if(a['status']==200){
            this.masterhttp.getPersonalInfo();
            this.changeImg = false;
            this.messageDisplay('success','Success','Profile Updated Successfully');
        }
        else{
            this.messageDisplay('error','Error','Could Not Update Image');
        }
    }

    onTopbarMenuButtonClick(event) {
        this.topbarItemClick = true;
        this.topbarMenuActive = !this.topbarMenuActive;

        if (this.overlayMenuActive || this.staticMenuMobileActive) {
            this.rotateMenuButton = false;
            this.overlayMenuActive = false;
            this.staticMenuMobileActive = false;
        }

        event.preventDefault();
    }

    onTopbarItemClick(event, item) {
        this.topbarItemClick = true;

        if (this.activeTopbarItem === item)
            this.activeTopbarItem = null;
        else
            this.activeTopbarItem = item;

        event.preventDefault();
    }

    isTablet() {
        let width = window.innerWidth;
        return width <= 1024 && width > 640;
    }

    isDesktop() {
        return window.innerWidth > 1024;
    }

    isMobile() {
        return window.innerWidth <= 640;
    }

    isOverlay() {
        return this.layoutMode === MenuOrientation.OVERLAY;
    }

    isHorizontal() {
        return this.layoutMode === MenuOrientation.HORIZONTAL;
    }

    changeToStaticMenu() {
        this.layoutMode = MenuOrientation.STATIC;
    }

    changeToOverlayMenu() {
        this.layoutMode = MenuOrientation.OVERLAY;
    }

    changeToHorizontalMenu() {
        this.layoutMode = MenuOrientation.HORIZONTAL;
    }

    ngOnDestroy() {
        if (this.documentClickListener) {
            this.documentClickListener();
        }
        jQuery(this.layoutMenuScroller).nanoScroller({ flash: true });
        this.masterhttp.updated = 0;
    }
}
