import { Experiencie } from './experiencie.model';
import { Education } from './education.model';
import { Project } from './project.model';
import { Skill } from './skill.model';

export interface User {
    id: number;
    username: string;
    password: string;
    name: string;
    surname: string;
    email: String;
    titleProfession: string;
    description: string;
    urlPhoto: string;
    urlBanner: string;
    urlGitHub: string;
    urlLinkedIn: string;
    experiencies: Array<Experiencie>;
    educations: Array<Education>;
    skills: Array<Skill>;
    projects: Array<Project>;
    userLogin: number;
}