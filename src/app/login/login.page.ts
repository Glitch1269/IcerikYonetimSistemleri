import { Sonuc } from './../models/Sonuc';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { switchMap } from 'rxjs';
import { Uye } from '../models/Uye';
import { FbservisService } from '../servisler/fbservis.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isModalOpen = false;
  uye = this.servis.AktifUyeBilgi;
  adsoyad!: any;
  mail!: any;
  parola!: any;
  uyeOl: FormGroup = new FormGroup({
    mail: new FormControl(),
    adsoyad: new FormControl(),
    parola: new FormControl(),
  });
  sonuc: Sonuc = new Sonuc();

  constructor(
    public servis: FbservisService,
    public router : Router
  ) { }

  ngOnInit() {
  }

  OturumAc(mail: string, parola: string) {
    this.servis.OturumAc(mail, parola)
    
      .subscribe(() => {
        this.router.navigate(['']);
      });
  }

  OturumKapat() {
    this.servis.OturumKapat().subscribe(() => {
      this.router.navigate(['login']);
    });
  }
 
  UyeOl(adsoyad: string, mail: string, parola: string) {
    this.servis.KayitOl(mail, parola).pipe(
        switchMap(({ user: { uid } }) =>
          this.servis.UyeEkle({ uid, mail, adsoyad: adsoyad })
        )).subscribe(() => {
        this.router.navigate(['']);
      });
  }

  
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  Console(){
    console.log("deneme");
  }

  
}
