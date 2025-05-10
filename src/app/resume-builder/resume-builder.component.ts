import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-resume-builder',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './resume-builder.component.html',
  styleUrls: ['./resume-builder.component.css']
})
export class ResumeBuilderComponent {
  selectedTheme: string = 'modern';

  resumeData = {
    name: 'John Doe',
    title: 'Software Engineer',
    email: 'john.doe@example.com',
    phone: '+1 (123) 456-7890',
    location: 'San Francisco, CA',
    summary: 'Experienced software engineer with a passion for building scalable web applications.',
    experience: [
      {
        title: 'Senior Developer',
        company: 'Tech Corp',
        duration: 'Jan 2020 - Present',
        description: 'Led a team to develop a cloud-based application.'
      },
      {
        title: 'Junior Developer',
        company: 'StartUp Inc',
        duration: 'Jun 2017 - Dec 2019',
        description: 'Contributed to front-end development using Angular.'
      }
    ],
    education: [
      {
        degree: 'B.S. Computer Science',
        institution: 'University of California',
        year: '2017'
      }
    ],
    skills: ['Angular', 'TypeScript', 'JavaScript', 'CSS', 'HTML']
  };

  onThemeChange() {
    // Logic to handle theme change if needed
    console.log(`Theme changed to: ${this.selectedTheme}`);
  }
}