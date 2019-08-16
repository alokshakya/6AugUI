import { AppRoutes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { MatButtonModule } from '@angular/material';

// import { MathJax } from 'mathjax';
import { AccordionModule } from 'primeng/primeng';
import { AutoCompleteModule } from 'primeng/primeng';
import { BreadcrumbModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { BlockUIModule } from 'primeng/primeng';
import { CalendarModule } from 'primeng/primeng';
import { CaptchaModule } from 'primeng/primeng';
import { CarouselModule } from 'primeng/primeng';
import { ChartModule } from 'primeng/primeng';
import { CheckboxModule } from 'primeng/primeng';
import { ChipsModule } from 'primeng/primeng';
import { CodeHighlighterModule } from 'primeng/primeng';
import { ConfirmDialogModule } from 'primeng/primeng';
import { SharedModule } from 'primeng/primeng';
import { ContextMenuModule } from 'primeng/primeng';
import { DataGridModule } from 'primeng/primeng';
import { DataListModule } from 'primeng/primeng';
import { DataScrollerModule } from 'primeng/primeng';
import { DataTableModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/primeng';
import { DragDropModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/primeng';
import { EditorModule } from 'primeng/primeng';
import { FieldsetModule } from 'primeng/primeng';
import { FileUploadModule } from 'primeng/primeng';
import { GalleriaModule } from 'primeng/primeng';
import { GMapModule } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';
import { InputMaskModule } from 'primeng/primeng';
import { InputSwitchModule } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';
import { InputTextareaModule } from 'primeng/primeng';
import { LightboxModule } from 'primeng/primeng';
import { ListboxModule } from 'primeng/primeng';
import { MegaMenuModule } from 'primeng/primeng';
import { MenuModule } from 'primeng/primeng';
import { MenubarModule } from 'primeng/primeng';
import { MessagesModule } from 'primeng/primeng';
import { MultiSelectModule } from 'primeng/primeng';
import { OrderListModule } from 'primeng/primeng';
import { OverlayPanelModule } from 'primeng/primeng';
import { PaginatorModule } from 'primeng/primeng';
import { PanelModule } from 'primeng/primeng';
import { PanelMenuModule } from 'primeng/primeng';
import { PasswordModule } from 'primeng/primeng';
import { PickListModule } from 'primeng/primeng';
import { ProgressBarModule } from 'primeng/primeng';
import { ProgressSpinnerModule } from 'primeng/primeng';
import { RadioButtonModule } from 'primeng/primeng';
import { RatingModule } from 'primeng/primeng';
import { ScheduleModule } from 'primeng/primeng';
import { SelectButtonModule } from 'primeng/primeng';
import { SidebarModule } from 'primeng/primeng';
import { SlideMenuModule } from 'primeng/primeng';
import { SliderModule } from 'primeng/primeng';
import { SpinnerModule } from 'primeng/primeng';
import { SplitButtonModule } from 'primeng/primeng';
import { StepsModule } from 'primeng/primeng';
import { TabMenuModule } from 'primeng/primeng';
import { TabViewModule } from 'primeng/primeng';
import { TerminalModule } from 'primeng/primeng';
import { TieredMenuModule } from 'primeng/primeng';
import { ToggleButtonModule } from 'primeng/primeng';
import { ToolbarModule } from 'primeng/primeng';
import { TooltipModule } from 'primeng/primeng';
import { TreeModule } from 'primeng/primeng';
import { TreeTableModule } from 'primeng/primeng';

//Default theme Components
import { AppComponent } from './app.component';
import { AppMenuComponent, AppSubMenu } from './components/account/main/main.menu.component';
import { AppTopBar } from './components/account/apptopbar/app.topbar.component';
import { AppFooter } from './components/account/appfooter/app.footer.component';
import { InlineProfileComponent } from './components/account/appProfile/app.profile.component';


//Added Components
import { AccountMainComponent } from "./components/account/main/main.component";
import { DashboardComponent } from './components/account/dashboard/dashboard.component';
import { SubscribeComponent } from './components/account/subscribe/subscribe.component';
import { DemotestComputersComponent } from './components/account/computers/demotest/demotest-computers.component';
import { ChapterwisetestComputersComponent } from './components/account/computers/chapterwisetest/chapterwisetest-computers.component';
import { SampletestComputersComponent } from './components/account/computers/sampletest/sampletest-computers.component';
import { MocktestComputersComponent } from './components/account/computers/mocktest/mocktest-computers.component';
import { ResultComputersComponent } from './components/account/computers/result/result-computers.component';
import { ProfileComponent } from './components/account/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { TestComponent } from './components/test/test.component';

//services
import { ConfirmationService } from 'primeng/primeng';
import { LoginRegisterService } from './services/loginRegister.service';
import { EventService } from './services/event.service';
import { MasterHttpService } from './services/masterhttp.service';
import { PersonalInfo, SubjectInfo, Result, Misc, chapterwiseTest } from './services/data.service';
import { AccountGuard, TestAccountGuard, TestDeactivate, verifiedGuard } from './components/account/account.guard';

//Moment
// import * as moment from 'moment';
// import { MomentModule } from 'angular2-moment';

//pipes
import { KeysPipe } from './pipes/keys.pipe';
import { CssIdPipe } from './pipes/css-id.pipe';
import { LoadoutComponent } from './components/account/loadout/loadout.component';

import { DemotestEnglishComponent } from './components/account/english/demotest/demotest-english.component';
import { ChapterwisetestEnglishComponent } from './components/account/english/chapterwisetest/chapterwisetest-english.component';
import { SampletestEnglishComponent } from './components/account/english/sampletest/sampletest-english.component';
import { MocktestEnglishComponent } from './components/account/english/mocktest/mocktest-english.component';
import { ResultEnglishComponent } from './components/account/english/result/result-english.component';


import { ChapterwisetestScienceComponent } from './components/account/science/chapterwisetest/chapterwisetest-science.component';
import { DemotestScienceComponent } from './components/account/science/demotest/demotest-science.component';
import { MocktestScienceComponent } from './components/account/science/mocktest/mocktest-science.component';
import { SampletestScienceComponent } from './components/account/science/sampletest/sampletest-science.component';
import { ResultScienceComponent } from './components/account/science/result/result-science.component';

import { ChapterwisetestMathComponent } from './components/account/mathematics/chapterwisetest/chapterwisetest-math.component';
import { DemotestMathComponent } from './components/account/mathematics/demotest/demotest-math.component';
import { MocktestMathComponent } from './components/account/mathematics/mocktest/mocktest-math.component';
import { ResultMathComponent } from './components/account/mathematics/result/result-math.component';
import { SampletestMathComponent } from './components/account/mathematics/sampletest/sampletest-math.component';

import { ChapterwisetestGkComponent } from './components/account/gk/chapterwisetest/chapterwisetest-gk.component';
import { SampletestGkComponent } from './components/account/gk/sampletest/sampletest-gk.component';
import { MocktestGkComponent } from './components/account/gk/mocktest/mocktest-gk.component';
import { DemotestGkComponent } from './components/account/gk/demotest/demotest-gk.component';
import { ResultGkComponent } from './components/account/gk/result/result-gk.component';


import { ChapterwisetestReasoningComponent } from './components/account/reasoning/chapterwisetest/chapterwisetest-reasoning.component';
import { SampletestReasoningComponent } from './components/account/reasoning/sampletest/sampletest-reasoning.component';
import { MocktestReasoningComponent } from './components/account/reasoning/mocktest/mocktest-reasoning.component';
import { DemotestReasoningComponent } from './components/account/reasoning/demotest/demotest-reasoning.component';
import { ResultReasoningComponent } from './components/account/reasoning/result/result-reasoning.component';


import { SubscriptionComponent } from './components/subscription/subscription.component';

import { CreateticketComponent } from './components/support/createticket/createticket.component';
import { ViewticketComponent } from './components/support/viewticket/viewticket.component';

import {MathJaxDirective} from './directives/mathjax.directive';
import { RoundPipe } from './pipes/round.pipe';
@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule, //new
        FormsModule,
        AppRoutes,
        HttpModule,
        AccordionModule,
        AutoCompleteModule,
        BreadcrumbModule,
        ButtonModule,
        BlockUIModule,
        CalendarModule,
        CaptchaModule,
        CarouselModule,
        ChartModule,
        CheckboxModule,
        ChipsModule,
        CodeHighlighterModule,
        ConfirmDialogModule,
        SharedModule,
        ContextMenuModule,
        DataGridModule,
        DataListModule,
        DataScrollerModule,
        DataTableModule,
        DialogModule,
        DragDropModule,
        DropdownModule,
        EditorModule,
        FieldsetModule,
        FileUploadModule,
        GalleriaModule,
        GMapModule,
        GrowlModule,
        InputMaskModule,
        InputSwitchModule,
        InputTextModule,
        InputTextareaModule,
        LightboxModule,
        ListboxModule,
        MegaMenuModule,
        MenuModule,
        MenubarModule,
        MessagesModule,
        MultiSelectModule,
        OrderListModule,
        OverlayPanelModule,
        PaginatorModule,
        PanelModule,
        PanelMenuModule,
        PasswordModule,
        PickListModule,
        ProgressBarModule,
        ProgressSpinnerModule,
        RadioButtonModule,
        RatingModule,
        ScheduleModule,
        SelectButtonModule,
        SidebarModule,
        SlideMenuModule,
        SliderModule,
        SpinnerModule,
        SplitButtonModule,
        StepsModule,
        TabMenuModule,
        TabViewModule,
        TableModule,
        TerminalModule,
        TieredMenuModule,
        ToggleButtonModule,
        ToolbarModule,
        TooltipModule,
        TreeModule,
        MatButtonModule,
        TreeTableModule,
        //MomentModule //Moment

    ],
    declarations: [
        AppComponent,
        AppMenuComponent,
        AppSubMenu,
        AppTopBar,
        AppFooter,
        InlineProfileComponent,
        AccountMainComponent,
        DashboardComponent,
        SubscribeComponent,
        DemotestComputersComponent,
        ChapterwisetestComputersComponent,
        SampletestComputersComponent,
        MocktestComputersComponent,
        ResultComputersComponent,
        ProfileComponent,
        LoginComponent,
        TestComponent,
        KeysPipe,
        CssIdPipe,
        LoadoutComponent,
        DemotestEnglishComponent,
        ChapterwisetestEnglishComponent,
        SampletestEnglishComponent,
        MocktestEnglishComponent,
        ResultEnglishComponent,
        ChapterwisetestScienceComponent,
        DemotestScienceComponent,
        MocktestScienceComponent,
        SampletestScienceComponent,
        ResultScienceComponent,
        ChapterwisetestMathComponent,
        DemotestMathComponent,
        MocktestMathComponent,
        ResultMathComponent,
        SampletestMathComponent,
        ChapterwisetestGkComponent,
        SampletestGkComponent,
        MocktestGkComponent,
        DemotestGkComponent,
        ResultGkComponent,
        ChapterwisetestReasoningComponent,
        DemotestReasoningComponent,
        ResultReasoningComponent,
        SampletestReasoningComponent,
        MocktestReasoningComponent,
        MathJaxDirective,
        RoundPipe,
        SubscriptionComponent,
        CreateticketComponent,
        ViewticketComponent
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        LoginRegisterService,
        MasterHttpService,
        ConfirmationService,
        PersonalInfo, SubjectInfo, Result, Misc, chapterwiseTest, 
        AccountGuard, TestAccountGuard, TestDeactivate, verifiedGuard,
        EventService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
