import { Gorev } from './../models/Gorev';
import { Component, OnInit } from '@angular/core';
import { FbservisService } from '../servisler/fbservis.service';
import { Sonuc } from '../models/Sonuc';

@Component({
  selector: 'app-tamamlananlar',
  templateUrl: './tamamlananlar.page.html',
  styleUrls: ['./tamamlananlar.page.scss'],
})
export class TamamlananlarPage implements OnInit {
  mevcutGorevler: Gorev[] = [];
  tamamlanmisGorev: Gorev[] = [];
  constructor(
    public servis : FbservisService
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

}
