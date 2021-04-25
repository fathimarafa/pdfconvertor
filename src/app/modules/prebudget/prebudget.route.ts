import { SpecificationRegistrationComponent } from './components/specification-registration/specification-registration.component';
import { WorkTypeComponent } from './components/work-type/work-type.component';
import { SpecificationRegistrationEditComponent } from './components/specification-registration/edit/specification-registration-edit.component';

export const PrebudgetModuleRoutes = [
    { path: 'worktype', component: WorkTypeComponent },
    { path: 'specification', component: SpecificationRegistrationComponent },
    { path: 'addspecification', component: SpecificationRegistrationEditComponent }
]