import { Component, OnInit } from '@angular/core';
import { ResponseI } from 'src/app/models/response.interface';
import { PrecioPisoDAOService } from 'src/app/services/DAO/precio-piso-dao.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  user: ResponseI[] = [];
  constructor(private router: Router, private precioPiso: PrecioPisoDAOService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loader();
    this.authUser();
  }

  loader() {
    //ACTIVA LOADER
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }

  authUser() {
    var path = document.URL;

    var correoTemp = path.split('?correo=')[1];

    var correo = correoTemp.split('&token=')[0];
    var token = path.split('&token=')[1];


    var pathJSON = {
      correo: decodeURIComponent(correo),
      token: decodeURIComponent(token),
      sourceId: 1
    }

    localStorage.setItem("user", "")
    this.precioPiso.getAuth(pathJSON).subscribe(res => {
      if (res.resultado == true) {
        localStorage.setItem("user", res.correo)
        this.router.navigate(['dashboard']);
      } else {
        this.router.navigate(['not-found']);
      }
    }, (error) => {
      this.router.navigate(['not-found']);
    })
    
    return this.user;
  }
}
