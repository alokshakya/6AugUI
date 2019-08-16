import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MocktestReasoningComponent } from './mocktest-reasoning.component';

describe('MocktestReasoningComponent', () => {
  let component: MocktestReasoningComponent;
  let fixture: ComponentFixture<MocktestReasoningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MocktestReasoningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MocktestReasoningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
