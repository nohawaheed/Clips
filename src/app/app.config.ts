import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { routes } from './app.routes';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyArs6ER5R_T1JMgcmYYAs5atqzIleyOwXM",
      authDomain: "clips-6786e.firebaseapp.com",
      projectId: "clips-6786e",
      storageBucket: "clips-6786e.firebasestorage.app",
      messagingSenderId: "1028335369289",
      appId: "1:1028335369289:web:72f9b7657a7d1121b01398"
    })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ]
};
