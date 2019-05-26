import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { TabsPage } from './tabs.page'
import { AuthGuard } from 'src/app/guards/auth.guard'

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: '../home/home.module#HomePageModule'
      },
      {
        path: 'explore',
        loadChildren: '../explore/explore.module#ExplorePageModule'
      },
      {
        path: 'market',
        loadChildren: '../market/market.module#MarketPageModule'
      },
      {
        path: 'notification',
        // canActivate: [AuthGuard],
        loadChildren: '../notification/notification.module#NotificationPageModule'
      },
      {
        path: 'more',

        loadChildren: '../more/more.module#MorePageModule'
      },
      {
        path: 'login',
        loadChildren: '../login/login.module#LoginPageModule'
      },
      {
        path: 'register',
        loadChildren: '../register/register.module#RegisterPageModule'
      },
      {
        path: 'login-guide',
        loadChildren: '../login-guide/login-guide.module#LoginGuidePageModule'
      },
      {
        path: 'user-center',
        loadChildren: '../user-center/user-center.module#UserCenterPageModule'
      },
      {
        path: 'change-avatar',
        loadChildren: '../change-avatar/change-avatar.module#ChangeAvatarPageModule'
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
