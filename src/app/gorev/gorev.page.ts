import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Gorev } from '../models/Gorev';
import { Sonuc } from '../models/Sonuc';
import { FbservisService } from '../servisler/fbservis.service';

@Component({
  selector: 'app-gorev',
  templateUrl: './gorev.page.html',
  styleUrls: ['./gorev.page.scss'],
})
export class GorevPage implements OnInit {
  isModalOpen = false;
  mevcutGorevler: Gorev[] = [];
  tamamlanmisGorev: Gorev[] = [];
  addTask: FormGroup = new FormGroup({
    baslik: new FormControl(),
    aciklama: new FormControl(),
    tamam: new FormControl()
  });
  constructor(
    public servis : FbservisService,
  ) { }

  ngOnInit() {
    this.GorevListele();
  }
  GorevListele() {
    this.servis.GorevListele().subscribe(d => {
      this.mevcutGorevler = d.filter(s => s.tamam == false || s.tamam == null);
      this.tamamlanmisGorev = d.filter(s => s.tamam == true);
    });
  }

  Kaydet() {
    console.log(this.addTask.value);
    this.servis.GorevEkle(this.addTask.value).then(() => {
      var s: Sonuc = new Sonuc();
      s.islem = true;
      s.mesaj = "Görev Eklendi";
      console.log(s);  // ! toast ekle
    });
  }

  Sil(gorev: Gorev) {
    this.servis.GorevSil(gorev).then(() => {
      var s: Sonuc = new Sonuc();
      s.islem = true;
      s.mesaj = "Görev Silindi";
      console.log(s);  // ! toast ekle
    });
  }

  TamamIptal(gorev: Gorev, d: boolean) {
    gorev.tamam = d;
    this.servis.GorevDuzenle(gorev).then(() => {
      var s: Sonuc = new Sonuc();
      s.islem = true;
      s.mesaj = "Görev Güncellendi";
      console.log(s);  // ! toast ekle
    });
  }
  
  Console(){
    console.log("deneme");
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}
