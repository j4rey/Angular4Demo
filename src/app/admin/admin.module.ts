import { RoleService } from './roles/roles.service';
import { FormsModule } from '@angular/forms';
import { UserService } from './users/users.service';
import { UserlistComponent } from './users/userlist/userlist.component';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule, Component } from '@angular/core';
import { UseraddComponent } from './users/useradd/useradd.component';
import { RolelistComponent } from './roles/rolelist/rolelist.component';
import { RoleaddComponent } from './roles/roleadd/roleadd.component';
import { UserroleComponent } from './users/userrole/userrole.component';

const adminRoutes: Routes = [
    {path:'admin',component:AdminComponent, children:[
        {path:'users', component:UserlistComponent},
        {path:'roles', component:RolelistComponent},
        {path:'users/add', component:UseraddComponent},
        {path:'users/addrole', component:UserroleComponent},
        {path:'roles/add', component:RoleaddComponent}
        
    ]}
  ];

@NgModule({
    declarations: [
        AdminComponent,
        UserlistComponent,
        UseraddComponent,
        RolelistComponent,
        RoleaddComponent,
        UserroleComponent
      ],
      imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forChild(adminRoutes)
        //,UsersModule
      ],
      providers: [UserService,RoleService]
})
export class AdminModule {

}