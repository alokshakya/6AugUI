import { Component, Input, OnInit, EventEmitter, ViewChild, trigger, state, transition, style, animate, Inject, forwardRef } from '@angular/core';
import { Location } from '@angular/common';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/primeng';
import { AccountMainComponent } from './main.component';

@Component({
    selector: 'app-menu',
    styleUrls: ['./main.component.scss'],
    template: `<ul app-submenu [item]="model" root="true" class="layout-menu clearfix" [reset]="reset" visible="true"></ul>`
})
export class AppMenuComponent implements OnInit {

    @Input() reset: boolean;

    menuTabs: any;

    model: MenuItem[];

    //temporary

    constructor(
        @Inject(forwardRef(() => AccountMainComponent))
        public app: AccountMainComponent,
    ) {

        this.model = [
            { label: 'Dashboard', icon: 'fa fa-home', routerLink: ['dashboard'] },
            { label: 'Subscribe', icon: 'fa fa-pencil-square-o', routerLink: ['subscribe'] },
            {
                label: 'Reasoning', icon: 'icon-reasoning',
                items: [{
                    label: 'Demo Test',
                    icon: 'fa fa-circle-o',
                    routerLink: ['reasoning/demotest']
                },
                {
                    label: 'Chapterwise Test',
                    icon: 'fa fa-circle-o',
                    routerLink: ['reasoning/chapterwisetest']
                },
                {
                    label: 'Sample Test',
                    icon: 'fa fa-circle-o',
                    routerLink: ['reasoning/sampletest']
                },
                {
                    label: 'Mock Test',
                    icon: 'fa fa-circle-o',
                    routerLink: ['reasoning/mocktest']
                },
                {
                    label: 'Result',
                    icon: 'fa fa-circle-o',
                    routerLink: ['reasoning/result']
                }
                ]
            },
            {
                label: 'Mathematics', icon: 'icon-maths',
                items: [{
                    label: 'Demo Test',
                    icon: 'fa fa-circle-o',
                    routerLink: ['math/demotest']
                },
                {
                    label: 'Chapterwise Test',
                    icon: 'fa fa-circle-o',
                    routerLink: ['math/chapterwisetest']
                },
                {
                    label: 'Sample Test',
                    icon: 'fa fa-circle-o',
                    routerLink: ['math/sampletest']
                },
                {
                    label: 'Mock Test',
                    icon: 'fa fa-circle-o',
                    routerLink: ['math/mocktest']
                },
                {
                    label: 'Result',
                    icon: 'fa fa-circle-o',
                    routerLink: ['math/result']
                },
                ]
            },
            
            {
                label: 'Science', icon: 'icon-science',
                items: [{
                    label: 'Demo Test',
                    icon: 'fa fa-circle-o',
                    routerLink: ['science/demotest']
                },
                {
                    label: 'Chapterwise Test',
                    icon: 'fa fa-circle-o',
                    routerLink: ['science/chapterwisetest']
                },
                {
                    label: 'Sample Test',
                    icon: 'fa fa-circle-o',
                    routerLink: ['science/sampletest']
                },
                {
                    label: 'Mock Test',
                    icon: 'fa fa-circle-o',
                    routerLink: ['science/mocktest']
                },
                {
                    label: 'Result',
                    icon: 'fa fa-circle-o',
                    routerLink: ['science/result']
                },
                ]
            },
            
            {
                label: 'General-Knowledge', icon: 'icon-gk',
                items: [{
                    label: 'Demo Test',
                    icon: 'fa fa-circle-o',
                    routerLink: ['gk/demotest']
                },
                {
                    label: 'Chapterwise Test',
                    icon: 'fa fa-circle-o',
                    routerLink: ['gk/chapterwisetest']
                },
                {
                    label: 'Sample Test',
                    icon: 'fa fa-circle-o',
                    routerLink: ['gk/sampletest']
                },
                {
                    label: 'Mock Test',
                    icon: 'fa fa-circle-o',
                    routerLink: ['gk/mocktest']
                },
                {
                    label: 'Result',
                    icon: 'fa fa-circle-o',
                    routerLink: ['gk/result']
                },
                ]
            },
            {
                label: 'English', icon: 'icon-english',
                items: [{
                    label: 'Demo Test',
                    icon: 'fa fa-circle-o',
                    routerLink: ['english/demotest']
                },
                {
                    label: 'Chapterwise Test',
                    icon: 'fa fa-circle-o',
                    routerLink: ['english/chapterwisetest']
                },
                {
                    label: 'Sample Test',
                    icon: 'fa fa-circle-o',
                    routerLink: ['english/sampletest']
                },
                {
                    label: 'Mock Test',
                    icon: 'fa fa-circle-o',
                    routerLink: ['english/mocktest']
                },
                {
                    label: 'Result',
                    icon: 'fa fa-circle-o',
                    routerLink: ['english/result']
                },
                ]
            },
            {
                label: 'Computers', icon: 'icon-cyber',
                items: [{
                    label: 'Demo Test',
                    icon: 'fa fa-circle-o',
                    routerLink: ['computers/demotest']
                },
                {
                    label: 'Chapterwise Test',
                    icon: 'fa fa-circle-o',
                    routerLink: ['computers/chapterwisetest']
                },
                {
                    label: 'Sample Test',
                    icon: 'fa fa-circle-o',
                    routerLink: ['computers/sampletest']
                },
                {
                    label: 'Mock Test',
                    icon: 'fa fa-circle-o',
                    routerLink: ['computers/mocktest']
                },
                {
                    label: 'Result',
                    icon: 'fa fa-circle-o',
                    routerLink: ['computers/result']
                }
                ]
            },
            
            { 
                label: 'Support',
                icon: 'fa fa-question-circle',
                items:[{
                    label:'Create Ticket',
                    icon: 'fa fa-sticky-note-o',
                    routerLink:['support/createticket']
                },
                {
                    label:'View Tickets',
                    icon:'fa fa-table',
                    routerLink:['support/viewticket']
                }]
            }
        ]
    }


    ngOnInit() {}

}


@Component({
    selector: '[app-submenu]',
    template: `
        <ng-template ngFor let-child let-i="index" [ngForOf]="(root ? item : item.items)">
            <li [ngClass]="{'active-menuitem': isActive(i)}" *ngIf="child.visible === false ? false : true">
                <a [href]="child.url||'#'" (click)="itemClick($event,child,i)" *ngIf="!child.routerLink" [attr.tabindex]="!visible ? '-1' : null">
                    <i [ngClass]="child.icon"></i>
                    <span>{{child.label}}</span>
                    <i class="fa fa-fw fa-angle-down" *ngIf="child.items"></i>
                </a>
                <a (click)="itemClick($event,child,i)" class="ripplelink" *ngIf="child.routerLink"
                    [routerLink]="child.routerLink" routerLinkActive="active-menuitem-routerlink" [routerLinkActiveOptions]="{exact: true}">
                    <i [ngClass]="child.icon"></i>
                    <span>{{child.label}}</span>
                    <i class="fa fa-fw fa-angle-down" *ngIf="child.items"></i>
                </a>
                <ul app-submenu [item]="child" *ngIf="child.items" [@children]="isActive(i) ? 'visible' : 'hidden'" [visible]="isActive(i)" [reset]="reset"></ul>
            </li>
        </ng-template>
    `,
    animations: [
        trigger('children', [
            state('hidden', style({
                height: '0px'
            })),
            state('visible', style({
                height: '*'
            })),
            transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AppSubMenu {

    @Input() item: MenuItem;

    @Input() root: boolean;

    @Input() visible: boolean;

    _reset: boolean;

    activeIndex: number;

    constructor( @Inject(forwardRef(() => AccountMainComponent)) public app: AccountMainComponent, public router: Router, public location: Location) { }

    itemClick(event: Event, item: MenuItem, index: number) {
        //avoid processing disabled items
        if (item.disabled) {
            event.preventDefault();
            return true;
        }

        //activate current item and deactivate active sibling if any
        this.activeIndex = (this.activeIndex === index) ? null : index;

        //execute command
        if (item.command) {
            item.command({
                originalEvent: event,
                item: item
            });
        }

        //prevent hash change
        if (item.items || (!item.url && !item.routerLink)) {
            event.preventDefault();
        }

        //hide menu
        if (!item.items) {
            if (this.app.isHorizontal())
                this.app.resetMenu = true;
            else
                this.app.resetMenu = false;

            this.app.overlayMenuActive = false;
            this.app.staticMenuMobileActive = false;
        }
    }

    isActive(index: number): boolean {
        return this.activeIndex === index;
    }

    @Input() get reset(): boolean {
        return this._reset;
    }

    set reset(val: boolean) {
        this._reset = val;

        if (this._reset && this.app.isHorizontal()) {
            this.activeIndex = null;
        }
    }
}
