import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampletestReasoningComponent } from './sampletest-reasoning.component';

describe('SampletestReasoningComponent', () => {
  let component: SampletestReasoningComponent;
  let fixture: ComponentFixture<SampletestReasoningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampletestReasoningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampletestReasoningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
