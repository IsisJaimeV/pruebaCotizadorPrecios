import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'analiticaPrecios';

  constructor(){}

  // ngOnInit(): void{
  //   this.MsalService.instance.handleRedirectPromise().then(
  //     res => {
  //       if ( res != null && res.account != null){
  //         this.MsalService.instance.setActiveAccount(res.account)
  //       }
  //     }
  //   )
  //  // this.login();
  // }
  // isLoggedIn(): boolean {
  //   return this.MsalService.instance.getActiveAccount() != null
  // }

  // login(){
  //  this.MsalService.loginRedirect();
  // }

  // logout(){
  //   this.MsalService.logout();
  // }
}
