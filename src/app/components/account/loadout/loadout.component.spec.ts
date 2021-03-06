/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LoadoutComponent } from './loadout.component';

describe('LoadoutComponent', () => {
    let component: LoadoutComponent;
    let fixture: ComponentFixture<LoadoutComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LoadoutComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoadoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
