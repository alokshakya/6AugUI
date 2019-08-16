import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import { AccountMainComponent } from '../main/main.component';
import { Router } from '@angular/router';
import { PersonalInfo, Misc } from '../../../services/data.service';
import { MasterHttpService } from '../../../services/masterhttp.service';
import { EventService } from '../../../services/event.service';
import { Observable } from 'rxjs/Rx';
import * as constants from '../../../../config/constants';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styleUrls:['./app.topbar.component.scss']
})
export class AppTopBar implements OnInit {

    currentPage: Array<string>;
    imgTimeStamp;
    imgPath:string;
    menuFlag:boolean
    constructor( @Inject(forwardRef(() => AccountMainComponent)) public app: AccountMainComponent,
        public router: Router,
        public misc: Misc,
        public personalInfo: PersonalInfo,
        public masterhttp: MasterHttpService,
        private event:EventService) { }

    currentComponent:string;

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

    activeComponent(){
        // this.misc.currentRoute.subscribe((data)=>{
        //     this.currentComponent = data;
        // })
        this.event.currentRoute.subscribe((data)=>{
            this.currentComponent = data;
        })
    }

    ngOnInit() {
        this.imgPath = constants.OLYMPIADBOX_IMG_URL;
        this.activeComponent();
        this.event.userInfoEvent.subscribe((data)=>{
            if(data){
                this.getDate();
            }
        });

        /*this.router.events.subscribe(event => {
            let a = event['url'];
            this.currentPage = a.split('/');
            this.currentPage.shift();
            this.currentPage.shift();
        });*/
    }

    getDate(){
        this.imgTimeStamp = new Date().getTime();
    }

    redirect(target) {
        this.router.navigate([target]);
    }

    menuEvent(){
        if(!this.menuFlag){
            this.event.emitMenuEvent(1);
        }
        else this.event.emitMenuEvent(0);
        this.menuFlag =! this.menuFlag;
    }

}


