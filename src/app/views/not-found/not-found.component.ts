import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseI } from 'src/app/models/response.interface';
import { PrecioPisoDAOService } from 'src/app/services/DAO/precio-piso-dao.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  user: ResponseI[] = [];
  constructor(private router: Router, private precioPiso: PrecioPisoDAOService) { }

  ngOnInit(): void {
    this.authUser();
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
        console.log("undefined")
        this.router.navigate(['not-found']);
      }
    }, (error) => {
      this.router.navigate(['not-found']);
    })
    
    return this.user;
  }
}
