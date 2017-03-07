import { Component, ViewChild } from '@angular/core';
import { SceneComponent } from '../../components/scene/scene.component';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('scene') scene: SceneComponent; 

  constructor(public navCtrl: NavController) {
    
  }

  ionViewDidEnter() {
    this.scene.startAnimation();
  }

  ionViewDidLeave() {
    this.scene.stopAnimation();
  }

}
