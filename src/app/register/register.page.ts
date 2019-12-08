import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'
import { Router } from '@angular/router'      
import { AlertController } from '@ionic/angular'
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  check: boolean
  email: string = ""
  password: string = ""
  cpassword: string = ""

  constructor(
    public afAuth: AngularFireAuth,
    public alert: AlertController,
    public router: Router,
    public user: UserService
    ) { }

  ngOnInit() {
  }

  async register() {
    const {email, password, cpassword} = this
    if(password !== cpassword) {
      this.showAlert("Error","Password doesn't match")
      return console.error("oh boy!")
    }
    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(email,password)
      console.log(res)
      this.showAlert("Success","Welcome Aboard!")
      this.router.navigate(['/login']) //redirect page if condition fulfilled
    } catch(err) {
      console.dir(err)
    // if(err.code === "auth/invalid-email") {
    //   return console.log("Invalid Email")
    // }
      this.showAlert("Error",err.message)
    }
  }

  async showAlert(header: string,message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["Ok"]
    })
    await alert.present()
  }
}

// try {
//   const res = await this.afAuth.auth.createUserWithEmailAndPassword(username+'@gmail.com',password)
//   this.afStore.doc(`users/${res.user.uid}`).set({ //note
//     username
//   })
//   this.user.setUser({
//     username,
//     uid: res.user.uid
//   })
//   this.showAlert("Success","Welcome Aboard!")
//   this.router.navigate(['/tabs'])
  
// } catch(err) {
//   console.dir(err)
//   this.showAlert("Error",err.message)
// }
// }