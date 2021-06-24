import { SpecificationRegistrationComponent } from './components/specification-registration/specification-registration.component';
import { WorkTypeComponent } from './components/work-type/work-type.component';
import { SpecificationRegistrationEditComponent } from './components/specification-registration/edit/specification-registration-edit.component';
import { TemplateRegistrationComponent } from './components/template-registration/template-registration.component';
import { TemplateRegistrationEditComponent } from './components/template-registration/edit/template-registration-edit.component';
import { ProjectSpecificationComponent } from './components/project-specification/project-specification.component';
import { ProjectSpecificationEditComponent } from './components/project-specification/edit/project-specification-edit.component';
import { RateEvaluationComponent } from './components/rate-evaluation/rate-evaluation.component';
import { RateComparisonComponent } from './components/rate-comparison/rate-comparison.component';
import { ManualBoqComponent } from './components/manual-boq/manual-boq.component';
import { ManualBoqApprovalComponent } from './components/manual-boq-approval/manual-boq-approval.component';

export const PrebudgetModuleRoutes = [
    { path: 'worktype', component: WorkTypeComponent },
    { path: 'specification', component: SpecificationRegistrationComponent },
    { path: 'addspecification', component: SpecificationRegistrationEditComponent },
    { path: 'template', component: TemplateRegistrationComponent },
    { path: 'addtemplate', component: TemplateRegistrationEditComponent },
    { path: 'projectspecification', component: ProjectSpecificationComponent },
    { path: 'addprojectspecification', component: ProjectSpecificationEditComponent },
    { path: 'rateevaluation', component: RateEvaluationComponent },
    { path: 'ratecomparison', component: RateComparisonComponent },
    { path: 'manualboq', component: ManualBoqComponent },
    { path: 'manualboqapproval', component: ManualBoqApprovalComponent }
]