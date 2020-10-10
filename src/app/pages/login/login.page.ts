import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConstants } from '../../config/auth-constants';
import { AuthService } from './../../services/auth.service';
import { StorageService } from './../../services/storage.service';
import { ToasterService } from './../../services/toaster.service';

@Component({
selector: 'app-login',
templateUrl: './login.page.html',
styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  public postData = {
    username: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    private toastService: ToasterService
  ) {}

  ngOnInit() {}

  validateInputs() {
    let username = this.postData.username.trim();
    let password = this.postData.password.trim();
    
    return (
      this.postData.username && 
      this.postData.password && 
      username.length > 0 && 
      password.length > 0
      );
  }

  loginAction() {
    if (this.validateInputs()) {

    this.authService.login(this.postData).subscribe(
      (res: any) => {
        if (res.userData) {
        // Storing the User data.
          this.storageService.store(AuthConstants.AUTH, res.userData);
          this.router.navigate(['home/calendar']);
        } else {
          this.toastService.presentToast('incorrect password.');
        }
      },
      (error: any) => {
        this.toastService.presentToast('Network Connection Error.');
      }   
      );
    } else {
      this.toastService.presentToast('Please enter email/username or password.');
    }
  }
}