import {Component, OnInit, Inject} from '@angular/core';
import {AppService} from '../../app.service';
import {UserRecommendationService} from '../_shared/services/user-recommendations.service';
import {isUndefined} from 'util';
import {Recommendation} from '../_shared/interface/recommendation.interface';
import {ExplodePipe} from '../_shared/pipes/explode.pipe';
import {AuthService} from '../_shared/services/auth.service';
import {RolesAndSkillsService} from '../_shared/services/roles-and-skills.service';
import {ProjectsService} from '../_shared/services/projects.service';
import {WorkPreferenceService} from '../_shared/services/work-preference.service';
import {PageScrollService, PageScrollInstance} from 'ng2-page-scroll';
import {DOCUMENT} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'profile-builder',
  templateUrl: 'profile-builder.html'
})


export class ProfileBuilderComponent implements OnInit {
  recommendations: Recommendation[] = [];
  rolesAndSkills: Object[] = [];
  frameworks: String[] = [];
  tools: String[] = [];
  roles: Object[] = [];
  maxRoles: number = 3;
  languages: Object[] = [];
  projects: Object[] = [];
  preferredRoles: Object[] = [];
  workPreference: Object = {};

  submittingRolesAndSkills: Boolean = false;
  submittingProjects: Boolean = false;
  submittingWorkPreference: Boolean = false;
  submittingRecommendation: Boolean = false;

  constructor(private _appService: AppService, private _userRecommendationService: UserRecommendationService,
              private _explodePipe: ExplodePipe, private _authService: AuthService,
              private _rolesAndSkillsService: RolesAndSkillsService,
              private _projectsService: ProjectsService, private _workPreferenceService: WorkPreferenceService,
              private pageScrollService: PageScrollService, @Inject(DOCUMENT) private document: any,
              private router: Router) {
  }

  ngOnInit() {
    this.getProfile();
    this.projects = [{delete_enabled: false}];
    this.preferredRoles = [{delete_enabled: false}];
    this._appService.setUser();
  }

  sendRecommendation(form) {
    this.submittingRecommendation = true;
    this._userRecommendationService.send_recommendation(JSON.stringify(form.value), () => {
      this.submittingRecommendation = false;
    }).subscribe(response => {
      if (response.status !== isUndefined) {
        if (response.status === 200) {
          this._appService.setNotification(response);
          this.recommendations = response.extras.recommendations;
          this._appService.userUncompletedRecommendation = response.extras.recommendations.filter(
            recommendation => recommendation.completed === 0
          );
          this._appService.user = response.extras.user;
        }
      }
    }, (err) => {
      this._appService.setNotification(JSON.parse(err._body));
    });
    return;
  }

  saveRolesAndSkills(form) {
    this.submittingRolesAndSkills = true;
    form.value.roles_and_skills_frameworks = this.frameworks;
    form.value.roles_and_skills_tools = this.tools;
    form.value.roles_and_skills_roles = this.roles;
    form.value.roles_and_skills_languages = this.languages;

    this._rolesAndSkillsService.save(JSON.stringify(form.value), () => {
      this.submittingRolesAndSkills = false;
    }).subscribe(response => {
      if (response.status != isUndefined) {
        if (response.status == 200) {
          this._appService.setNotification(response);
          this.rolesAndSkills = response.extras.roles_and_skills;
          if (this._appService.user['completed_level'] === 0) {
            this.scrollToNext('projects');
          }
          this._appService.user = response.extras.user;
        }
      }
    }, (err) => {
      this._appService.setNotification(JSON.parse(err._body));
    });
    return;
  }

  saveProjects() {
    this.submittingProjects = true;
    this._projectsService.save(JSON.stringify(this.projects), () => {
      this.submittingProjects = false;
    }).subscribe(response => {
      if (response.status != isUndefined) {
        if (response.status == 200) {
          this._appService.setNotification(response);
          this.projects = response.extras.projects;
          if (this._appService.user['completed_level'] === 1) {
            this.scrollToNext('work-preference');
          }
          this._appService.user = response.extras.user;
        }
      }
    }, (err) => {
      this._appService.setNotification(JSON.parse(err._body));
    });
    return;
  }

  saveWorkPreference(form) {
    this.submittingWorkPreference = true;
    form.value.work_preference_preferred_roles = this.preferredRoles;
    this._workPreferenceService.save(JSON.stringify(form.value), () => {
      this.submittingWorkPreference = false;
    }).subscribe(response => {
      if (response.status !== isUndefined) {
        if (response.status === 200) {
          this._appService.setNotification(response);
          this.workPreference = response.extras.work_preference;
          if (this._appService.user['completed_level'] === 2) {
            this.scrollToNext('recommendation');
          }
          this._appService.user = response.extras.user;
        }
      }
    }, (err) => {
      this._appService.setNotification(JSON.parse(err._body));
    });
    return;
  }

  getProfile() {
    this._authService.getUserProfile()
      .subscribe(response => {
        if (response.status !== isUndefined) {
          if (response.status === 200) {
            this.recommendations = response.extras.recommendations;
            this.rolesAndSkills = response.extras.roles_and_skills;
            this.roles = (response.extras.roles_and_skills === null || response.extras.roles_and_skills.roles === null || response.extras.roles_and_skills.roles.length === 0) ? [{delete_enabled: false}] : response.extras.roles_and_skills.roles;
            this.languages = (response.extras.roles_and_skills == null || response.extras.roles_and_skills.languages == null || response.extras.roles_and_skills.languages.length == 0) ? [{delete_enabled: false}] : response.extras.roles_and_skills.languages;
            this.frameworks = response.extras.roles_and_skills.frameworks;
            this.tools = response.extras.roles_and_skills.tools;
            this.projects = (response.extras.projects == null || response.extras.projects.length == 0) ? [{delete_enabled: false}] : response.extras.projects;
            this.workPreference = response.extras.work_preference;
            this.preferredRoles = (response.extras.work_preference == null || response.extras.work_preference.preferred_roles == null || response.extras.work_preference.preferred_roles.length == 0) ? [{delete_enabled: false}] : response.extras.work_preference.preferred_roles;
          }
        }
      }, (err) => {
        // TODO: Catch Error Here
      });
    return;
  }

  explodeProjectFrameworks(event: string, index: number) {
    this.projects[index]['technology'] = this._explodePipe.transform(event, ',');
  }

  updateProject(event: string, index: number, key: string) {
    this.projects[index][key] = event;
  }

  updatePreferredRoles(event: string, index: number, key: string) {
    this.preferredRoles[index][key] = event;
  }

  explodeFrameworks(event: string) {
    this.frameworks = this._explodePipe.transform(event, ',');
  }

  explodeTools(event: string) {
    this.tools = this._explodePipe.transform(event, ',');
  }

  addRole() {
    if (this.roles.length < this.maxRoles) {
      this.roles.push({
        delete_enabled: true
      });
    }
  }

  removeRole(index) {
    this.roles.splice(index, 1);
  }

  updateRoles(event: string, index: number, key: string) {
    this.roles[index][key] = event;
  }

  addLanguage() {
    this.languages.push({
      delete_enabled: true
    })
  }

  removeLanguage(index) {
    this.languages.splice(index, 1);
  }

  updateLanguages(event: string, index: number, key: string) {
    this.languages[index][key] = event;
  }

  addProject() {
    this.projects.push({
      delete_enabled: true
    })
  }

  removeProject(index) {
    this.projects.splice(index, 1);
  }

  addPreferredRole() {
    this.preferredRoles.push({
      delete_enabled: true
    });
  }

  removePreferredRole(index) {
    this.preferredRoles.splice(index, 1);
  }

  scrollToNext(target) {
    setTimeout(() => {
      const pageScrollInstance: PageScrollInstance = PageScrollInstance.newInstance({
        document: this.document,
        scrollTarget: '#' + target,
        verticalScrolling: true,
        pageScrollDuration: 500
      });
      this.pageScrollService.start(pageScrollInstance);
    }, 500);
  }

  deleteTag(index, arrayObject: any[], element, setDefault?) {
    arrayObject.splice(index, 1);

    if (setDefault) {
      if(arrayObject.length == 0) {
        if (setDefault == 'preferredRoles') {
          this.preferredRoles = [{delete_enabled: false}];
        }
      }
    } else {
      element.value = arrayObject;
    }
  }
}
