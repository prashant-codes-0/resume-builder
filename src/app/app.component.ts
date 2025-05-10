import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ResumeBuilderComponent } from "./resume-builder/resume-builder.component";

@Component({
  selector: 'app-root',
  imports: [ResumeBuilderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'resume-builder';
}
