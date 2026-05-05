import { Component, inject, signal } from '@angular/core';
import { EventBlocker } from '../../shared/directives/event-blocker';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Input } from "../../shared/input/input";
import { ref, Storage, uploadBytesResumable, fromTask, getDownloadURL } from '@angular/fire/storage';
import { v4 as uuidv4 } from 'uuid';
import { Alert } from '../../shared/alert/alert';
import { PercentPipe } from '@angular/common';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-upload',
  imports: [EventBlocker, ReactiveFormsModule, Input, Alert, PercentPipe],
  templateUrl: './upload.html',
  styleUrl: './upload.css',
})
export class Upload {
  isDragOver = signal(false);
  file = signal<File | null>(null);
  nextStep = signal(false);
  fb = inject(FormBuilder);
  showAlert = signal(false);
  alertColor = signal('blue');
  alertMsg = signal('Please wait! Your clip is being uploaded.');
  inSubmission = signal(false);
  percentage = signal(0);
  showPercentage = signal(false);
  #storage = inject(Storage);
  #auth = inject(Auth);
  form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.min(3)]],
  })

  storeFile($event: Event) {
    this.isDragOver.set(false);
    this.file.set(($event as DragEvent).dataTransfer?.files.item(0) ?? null);
    if (this.file()?.type !== 'video/mp4') return;
    this.form.controls.title.setValue(this.file()?.name.replace(/\.[^/.]+$/, '') ?? ''); //replace the file extension with an empty string
    this.nextStep.set(true);
  }

  uploadFile() {
    // generate unique file name to store in firebase
    this.showAlert.set(true);
    this.alertColor.set('blue');
    this.alertMsg.set('Please wait! Your clip is being uploaded.');
    this.inSubmission.set(true);
    this.showPercentage.set(true);
    const clipFileName = uuidv4();
    const clipPath = `clips/${clipFileName}.mp4`;
    const clipRef = ref(this.#storage, clipPath);
    const clipTask = uploadBytesResumable(clipRef, this.file() as File);
    fromTask(clipTask).subscribe({
      next: (snapshot: any) => {
        const progress = snapshot.bytesTransferred / snapshot.totalBytes;
        this.percentage.set(progress);
      },
      error: (error: any) => {
        this.alertColor.set('red');
        this.alertMsg.set('Upload failed! Please try again later.');
        this.inSubmission.set(false);
        this.showPercentage.set(false);
      },
      complete: async () => {
        const clipURL = await getDownloadURL(clipRef);
        const clip = {
          uid: this.#auth.currentUser?.uid as string,
          displayName: this.#auth.currentUser?.displayName as string,
          title: this.form.controls.title.value,
          fileName: `${clipFileName}.mp4`,
          clipURL
        }
        this.alertColor.set('green');
        this.alertMsg.set('Success! Your clip is now ready to share with the world.');
        this.showPercentage.set(false);
      }
    }
    )
  }
}
