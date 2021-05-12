import { SpecificationRegistrationComponent } from './components/specification-registration/specification-registration.component';
import { WorkTypeComponent } from './components/work-type/work-type.component';
import { SpecificationRegistrationEditComponent } from './components/specification-registration/edit/specification-registration-edit.component';
import { TemplateRegistrationComponent } from './components/template-registration/template-registration.component';
import { TemplateRegistrationEditComponent } from './components/template-registration/edit/template-registration-edit.component';
import { ProjectSpecificationComponent } from './components/project-specification/project-specification.component';
import { ProjectSpecificationEditComponent } from './components/project-specification/edit/project-specification-edit.component';

export const PrebudgetModuleRoutes = [
    { path: 'worktype', component: WorkTypeComponent },
    { path: 'specification', component: SpecificationRegistrationComponent },
    { path: 'addspecification', component: SpecificationRegistrationEditComponent },
    { path: 'template', component: TemplateRegistrationComponent },
    { path: 'addtemplate', component: TemplateRegistrationEditComponent },
    { path: 'projectspecification', component: ProjectSpecificationComponent },
    { path: 'addprojectspecification', component: ProjectSpecificationEditComponent }
]