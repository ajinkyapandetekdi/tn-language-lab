import { OwlOptions } from 'ngx-owl-carousel-o';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import $ from 'jquery'
import { LogsService } from 'src/app/logs.service';
import { AuthService } from 'src/app/auth.service';
import { TelemetryService } from 'src/app/telemetry.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isUserActive = false;

  customOptions: OwlOptions = {
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }


  customOptions78: OwlOptions = {
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    navSpeed: 700,

    navText: ['<i class="bi bi-chevron-compact-left"></i>', '<i class="bi bi-chevron-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1,
        nav: false,
        dots: true,
      },
      740: {
        items: 1
      },
      940: {
        items: 1,
        nav: true,
        dots: false,
      }
    },

  }

  constructor(public telemetryService: TelemetryService, private router:Router, public logsService: LogsService, public authService: AuthService) { }

  ngOnInit(): void {
    this.isUserActive = this.authService.isLoggedIn();
    $('.moreless-button').click(function() {
      $('.moretext').slideToggle();
      if ($('.moreless-button').text() == "Read more") {
      $(this).text("Read less")
      } else {
      $(this).text("Read more")
      }
       });

       $(document).ready(function(){
        $("#eng").click(function(){
          localStorage.setItem('lang','en');
          document.location.reload();
        });
        $("#de").click(function(){
          localStorage.setItem('lang','ta');
          document.location.reload();
        });
        });
        $(document).ready(function(){
          $("#flip").click(function(){
            $("#panel").slideToggle("fast");
          });
        });
  }

  goToLevelAndRouting()
  {
    this.router.navigate(["level"])
  }
  scrolltoDiv(id)
  {
    document.getElementById(id).scrollIntoView()
  }

  logOut(){
    this.authService.logout()
  }
}
