import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-site',
  templateUrl: './site.page.html',
  styleUrls: ['./site.page.scss'],
})

export class SitePage implements OnInit {

  iframeSource: any;

  constructor(private router: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.iframeSource = this.sanitizer.bypassSecurityTrustResourceUrl('https://github.com/');
    console.log(this.iframeSource);
  }

}
