import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-cp-embed-local-video',
  templateUrl: './cp-embed-local-video.component.html',
  styleUrls: ['./cp-embed-local-video.component.css']
})
export class CpEmbedLocalVideoComponent implements OnInit {

  safeUrl: SafeUrl;

  @Input()
  myVideoId: string;

  constructor(private sanitizer: DomSanitizer) {
   // console.log(this.myVideoId);
  }


  ngOnInit() {
   //  console.log(this.myVideoId);
    const url = `http://localhost:3000/video/${this.myVideoId}`;
    this.safeUrl = this
    .sanitizer
    .bypassSecurityTrustResourceUrl(url);

  }

}
