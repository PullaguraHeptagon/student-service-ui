import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateStudentComponent } from './create-student/create-student.component';

import { HomeComponent } from './home';
import { OtpComponent } from './otp/otp.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentListComponent } from './student-list/student-list.component';
import { UpdateStudentComponent } from './update-student/update-student.component';
import { AuthGuard } from './_helpers';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },
    { path: 'getStudents', component: StudentListComponent, canActivate: [AuthGuard]},
    {path: 'createStudent', component: CreateStudentComponent, canActivate: [AuthGuard]},
    {path: 'updateStudent/:id', component: UpdateStudentComponent, canActivate: [AuthGuard]},
    {path: 'getStudent/:id', component: StudentDetailsComponent, canActivate: [AuthGuard]},
    { path: 'otp', component: OtpComponent, canActivate: [AuthGuard]},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
