import { Component, Input, ElementRef, HostListener } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'scene',
  template: '<div style="width:100%; height:100%"></div>'
})
export class SceneComponent {

  @Input()
  geometry: string;

  renderer: THREE.Renderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  mesh: THREE.Mesh;
  id: number;
  animating: boolean;

  constructor(private sceneGraphElement: ElementRef) {
  }

  ngAfterViewInit() {
    this.scene = new THREE.Scene();
 
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    this.camera.position.z = 1000;
 
    let geometry = new THREE.SphereGeometry(400);
    let material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
 
    this.mesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.mesh);
 
    this.renderer = new THREE.WebGLRenderer();
    this.sceneGraphElement.nativeElement.childNodes[0].appendChild(this.renderer.domElement);
  }

  @HostListener('window:resize', ['$event'])
    onResize(event) {
        let width = this.sceneGraphElement.nativeElement.childNodes[0].clientWidth;
        let height = this.sceneGraphElement.nativeElement.childNodes[0].clientHeight;
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

  startAnimation() {
    let width = this.sceneGraphElement.nativeElement.childNodes[0].clientWidth;
    let height = this.sceneGraphElement.nativeElement.childNodes[0].clientHeight;
    this.renderer.setSize(width, height);
    this.animating = true;
    this.render();
  }

  stopAnimation() {
      this.mesh.rotation.x = 0.0;
      this.mesh.rotation.y = 0.0;
      this.animating = false;
  }

  render() {
    this.mesh.rotation.x += 0.005;
    this.mesh.rotation.y += 0.005;
    this.renderer.render(this.scene, this.camera);
    if (this.animating) { this.id = requestAnimationFrame(() => { this.render() }); };
  }
  
}
