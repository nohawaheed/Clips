import { Routes } from '@angular/router';
import { Home } from './views/home/home';
import { About } from './views/about/about';
import { Manage } from './views/manage/manage';
import { Upload } from './views/upload/upload';
import { Clip } from './views/clip/clip';
import { NotFound } from './views/not-found/not-found';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToHome = () => redirectUnauthorizedTo('/');
export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'about',
    component: About,
  },
  {
    path: 'manage',
    component: Manage,
    data: {
      authOnly: true,
      authGuardPipe: redirectUnauthorizedToHome,
    },
    canActivate: [AuthGuard],

  },
  {
    path: 'upload',
    component: Upload,
    data: {
      authOnly: true,
      authGuardPipe: redirectUnauthorizedToHome,
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'clip/:id',
    component: Clip,
  },
  {
    path: '**',
    component: NotFound
  }
];
