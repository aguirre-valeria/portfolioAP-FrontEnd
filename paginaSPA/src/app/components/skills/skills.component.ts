import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  public skills : User["skills"] = [];
  
  constructor(private userService: UserService) { }
  
  ngOnInit(): void {
    this.getSkill();
  }

  public getSkill(): void {
    this.userService.getUser().subscribe({
      next: (response: User) => {
        this.skills = Object.values(response.skills);
      },
      error: (error: HttpErrorResponse) => {
        console.log('error');
      },
    });
  }

}
