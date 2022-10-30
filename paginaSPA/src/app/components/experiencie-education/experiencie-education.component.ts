import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-experiencie-education',
  templateUrl: './experiencie-education.component.html',
  styleUrls: ['./experiencie-education.component.css']
})
export class ExperiencieEducationComponent implements OnInit {
  public experiencies : User["experiencies"] = [];
  public educations : User["educations"] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getExperiencie();
    this.getEducation();
  }

  public getExperiencie(): void {
    this.userService.getUser().subscribe({
      next: (response: User) => {
        this.experiencies = Object.values(response.experiencies);
      },
      error: (error: HttpErrorResponse) => {
        console.log('error');
      },
    });
  }

  public getEducation(): void {
    this.userService.getUser().subscribe({
      next: (response: User) => {
        this.educations = Object.values(response.educations);
      },
      error: (error: HttpErrorResponse) => {
        console.log('error');
      },
    });
  }

}
