import { async, TestBed } from '@angular/core/testing';
import { ChapterwisetestReasoningComponent } from './chapterwisetest-reasoning.component';
describe('ChapterwisetestReasoningComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [ChapterwisetestReasoningComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ChapterwisetestReasoningComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should be created', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=C:/Users/Gaurav/Desktop/ob-development/fronty/src/app/account/reasoning/chapterwisetest-reasoning/chapterwisetest-reasoning.component.spec.js.map