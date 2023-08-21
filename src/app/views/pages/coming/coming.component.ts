import { Component, OnInit } from '@angular/core';
import $ from 'jquery'
import { LogsService } from 'src/app/logs.service';
 
@Component({
  selector: 'app-coming',
  templateUrl: './coming.component.html',
  styleUrls: ['./coming.component.scss']
})
export class ComingComponent implements OnInit {

  constructor(public logsService: LogsService) { }

  ngOnInit(): void {
    $(document).ready(function(){
      $("#flip").click(function(){
        $("#panel").slideToggle("fast");
      });
    });
  }
}
