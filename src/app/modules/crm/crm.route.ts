import { CompanyComponent } from './components/company/company.component';
import { ProjectEnquiryComponent } from './components/project-enquiry/project-enquiry.component';
import { EnquiryForComponent } from './components/enquiry-for/enquiry-for.component';
import { EnquiryModeComponent } from './components/enquiry-mode/enquiry-mode.component';
import { EnquiryStatusComponent } from './components/enquiry-status/enquiry-status.component';
import { FollowUpComponent } from './components/follow-up/follow-up.component';
import { ApproveLevelComponent } from './components/approve-level/approve-level.component';
import { AssignBlockFloorComponent } from './components/assign-block-floor/assign-block-floor.component';
import { ConsultancyWorkComponent } from './components/consultancy-work/consultancy-work.component';
import { UserComponent } from './components/user/user.component';
import { ProjectComponent } from './components/project/project.component';
import { ProjectBookingComponent } from './components/project-booking/project-booking.component';
import { UserGroupComponent } from './components/user-group/user-group.component';
import { TeamComponent } from './components/team/team.component';
import { ProjectBlockRegistrationComponent } from './components/project-block-registration/project-block-registration.component';
import { ProjectFloorRegistrationComponent } from './components/project-floor-registration/project-floor-registration.component';

export const CRMmoduleRoutes = [
    { path: 'company', component: CompanyComponent },
    { path: 'enquiry', component: ProjectEnquiryComponent },
    { path: 'enquirymode', component: EnquiryModeComponent },
    { path: 'enquirystatus', component: EnquiryStatusComponent },
    { path: 'enquiryfor', component: EnquiryForComponent },
    { path: 'approvelevel', component: ApproveLevelComponent },
    { path: 'user', component: UserComponent },
    { path: 'usergroup', component: UserGroupComponent },
    { path: 'followup', component: FollowUpComponent },
    { path: 'project', component: ProjectComponent },
    { path: 'projectbooking', component: ProjectBookingComponent },
    { path: 'team', component: TeamComponent },
    { path: 'consultancywork', component: ConsultancyWorkComponent },
    { path: 'floor', component: ProjectFloorRegistrationComponent },
    { path: 'block', component: ProjectBlockRegistrationComponent },
    { path: 'assignblockfloors', component: AssignBlockFloorComponent },
]