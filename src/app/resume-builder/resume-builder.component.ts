import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators, FormsModule } from '@angular/forms';
import { Resume } from './resume.model';

declare const html2pdf: any;
@Component({
  selector: 'app-resume-builder',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './resume-builder.component.html',
  styleUrls: ['./resume-builder.component.css']
})
export class ResumeBuilderComponent implements OnInit {
  selectedTheme: string = 'modern';
  resumeForm: FormGroup;
  @ViewChild('resumePreview', { static: false }) resumePreview!: ElementRef;


  constructor(private fb: FormBuilder) {
    this.resumeForm = this.fb.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      location: ['', Validators.required],
      summary: ['', Validators.required],
      experience: this.fb.array([]),
      education: this.fb.array([]),
      skills: this.fb.array([])
    });
  }

  ngOnInit() {
    // Initialize with sample data
    this.addExperience();
    this.addEducation();
    this.addSkill();
    this.resumeForm.patchValue({
      name: 'John Doe',
      title: 'Software Engineer',
      email: 'john.doe@example.com',
      phone: '+1 (123) 456-7890',
      location: 'San Francisco, CA',
      summary: 'Experienced software engineer with a passion for building scalable web applications.'
    });
    this.experience.push(this.createExperience({
      title: 'Senior Developer',
      company: 'Tech Corp',
      duration: 'Jan 2020 - Present',
      description: 'Led a team to develop a cloud-based application.'
    }));
    this.experience.push(this.createExperience({
      title: 'Junior Developer',
      company: 'StartUp Inc',
      duration: 'Jun 2017 - Dec 2019',
      description: 'Contributed to front-end development using Angular.'
    }));
    this.education.push(this.createEducation({
      degree: 'B.S. Computer Science',
      institution: 'University of California',
      year: '2017'
    }));
    this.skills.push(this.createSkill('Angular'));
    this.skills.push(this.createSkill('TypeScript'));
    this.skills.push(this.createSkill('JavaScript'));
  }

  // Getters for FormArray
  get experience(): FormArray {
    return this.resumeForm.get('experience') as FormArray;
  }

  get education(): FormArray {
    return this.resumeForm.get('education') as FormArray;
  }

  get skills(): FormArray {
    return this.resumeForm.get('skills') as FormArray;
  }

  // Create form group for experience
  createExperience(data: any = {}): FormGroup {
    return this.fb.group({
      title: [data.title || '', Validators.required],
      company: [data.company || '', Validators.required],
      duration: [data.duration || '', Validators.required],
      description: [data.description || '', Validators.required]
    });
  }

  // Create form group for education
  createEducation(data: any = {}): FormGroup {
    return this.fb.group({
      degree: [data.degree || '', Validators.required],
      institution: [data.institution || '', Validators.required],
      year: [data.year || '', Validators.required]
    });
  }

  // Create form control for skill
  createSkill(skill: string = ''): FormGroup {
    return this.fb.group({
      name: [skill, Validators.required]
    });
  }

  // Add new entries
  addExperience() {
    this.experience.push(this.createExperience());
  }

  addEducation() {
    this.education.push(this.createEducation());
  }

  addSkill() {
    this.skills.push(this.createSkill());
  }

  // Remove entries
  removeExperience(index: number) {
    this.experience.removeAt(index);
  }

  removeEducation(index: number) {
    this.education.removeAt(index);
  }

  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  onThemeChange() {
    console.log(`Theme changed to: ${this.selectedTheme}`);
  }

  onSubmit() {
    if (this.resumeForm.valid) {
      const resumeData: Resume = this.resumeForm.value;
      console.log('Resume Data:', resumeData);
      // Optionally, save to a service or backend
    } else {
      this.resumeForm.markAllAsTouched();
    }
  }
  // Add this to your component method
  exportAsPDF(): void {
    import('html2pdf.js').then((module) => {
      const html2pdf = module.default;
      console.log('html2pdf loaded:', html2pdf); // Add this line
      const element = document.getElementById('pdfContent');
      if (element) {
        console.log('pdfContent element found:', element); // Add this line
        const opt = {
          margin: 0.5,
          filename: 'resume.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        // Convert HTML to PDF
        html2pdf().set(opt).from(element).save();
        console.log('PDF save initiated.'); // Add this line
      } else {
        console.error('Could not find the element with id "pdfContent"');
      }
    });
  }

}