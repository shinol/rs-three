import { Component, Input, ElementRef, HostListener } from '@angular/core';

// Get three.js and the typescript typings using:
//      npm i -S three @types/three
import * as THREE from 'three';

// Get OrbitControls npm from 
// npm install --save three-orbitcontrols-ts
import { OrbitControls } from 'three-orbitcontrols-ts';


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
  controls;
  light1;
  l1gSphere;
  l2gSphere;
  l3gSphere;
  light2;
  light3;

  constructor(private sceneGraphElement: ElementRef) {
  }

  ngAfterViewInit() {
    this.scene = new THREE.Scene();
 
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);
    this.camera.position.z = 7;

    // let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    //this.scene.add(ambientLight);

    let geometry = new THREE.CubeGeometry(2,2,2);
    let cubeMat = [
        new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('assets/img/1.png'), side: THREE.DoubleSide}), // right
        new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('assets/img/2.png'), side: THREE.DoubleSide}), //left
        new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('assets/img/3.png'), side: THREE.DoubleSide}), //top
        new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('assets/img/4.png'), side: THREE.DoubleSide}), // bottom
        new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('assets/img/5.png'), side: THREE.DoubleSide}), //front
        new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('assets/img/6.png'), side: THREE.DoubleSide})  // back
    ];

    let material = new THREE.MeshFaceMaterial(cubeMat);
 
    this.mesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.mesh);

    		// Floor
		var floorGeometry = new THREE.CubeGeometry( 10, 1, 10 );
		var floorMaterial = new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader( ).load( 'assets/img/Ground.jpg' ), side: THREE.DoubleSide } );
		var floorCube = new THREE.Mesh( floorGeometry, floorMaterial );
		floorCube.position.y = -5;
    this.scene.add(floorCube);
		// Ceiling
		var ceilingGeometry = new THREE.CubeGeometry( 12, 1, 10 );
		var ceilingMaterial = new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader( ).load( 'assets/img/Ceiling.jpg' ), side: THREE.DoubleSide } );
		var ceilingCube = new THREE.Mesh( ceilingGeometry, ceilingMaterial );
		ceilingCube.position.y = 5;
    this.scene.add(ceilingCube);
		// Left Wall
		var leftWallGeometry = new THREE.CubeGeometry( 1, 10, 10 );
		var leftWallMaterial = new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader( ).load( 'assets/img/Wall.jpg' ), side: THREE.DoubleSide } );
		var leftWallCube = new THREE.Mesh( leftWallGeometry, leftWallMaterial );
		leftWallCube.position.x = -5;
		this.scene.add( leftWallCube );
		// Right Wall
		var rightWallGeometry = new THREE.CubeGeometry( 1, 10, 10 );
		var rightWallMaterial = new THREE.MeshLambertMaterial( { map: new THREE.TextureLoader( ).load( 'assets/img/Wall.jpg' ), side: THREE.DoubleSide } );
		var rightWallCube = new THREE.Mesh( rightWallGeometry, rightWallMaterial );
		rightWallCube.position.x = 5;
		this.scene.add( rightWallCube );
 
    this.light1 = new THREE.PointLight(0xff0404, 4, 50);
    this.scene.add(this.light1);
    var light1Globe = new THREE.SphereGeometry(2,8,6,0,Math.PI*2,0,Math.PI);
    let l1gMat = new THREE.MeshBasicMaterial({color: 0xff0404, side: THREE.DoubleSide});
    this.l1gSphere = new THREE.Mesh(light1Globe, l1gMat);
    this.scene.add(this.l1gSphere);
    this.light3 = new THREE.PointLight(0x0004ff, 3, 50);
    this.scene.add(this.light3);
    var light3Globe = new THREE.SphereGeometry(1,8,6,0,Math.PI*2,0,Math.PI);
    let l3gMat = new THREE.MeshBasicMaterial({color: 0x0004ff, side: THREE.DoubleSide});
    this.l3gSphere = new THREE.Mesh(light3Globe, l3gMat);
    this.scene.add(this.l3gSphere);
    this.light2 = new THREE.PointLight(0x00ff04, 4, 50);
    this.scene.add(this.light2);
    var light2Globe = new THREE.SphereGeometry(1,8,6,0,Math.PI*2,0,Math.PI);
    let l2gMat = new THREE.MeshBasicMaterial({color: 0x00ff04, side: THREE.DoubleSide});
    this.l2gSphere = new THREE.Mesh(light2Globe, l2gMat);
    this.scene.add(this.l2gSphere);
 
    let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1,1,0);
    this.scene.add(directionalLight);

    let spot = new THREE.SpotLight(0xff45f6, 25);
    spot.position.set(0,3,0);
    this.scene.add(spot);

    this.renderer = new THREE.WebGLRenderer();
    this.sceneGraphElement.nativeElement.childNodes[0].appendChild(this.renderer.domElement);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

  }

  // capture resize events ...
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
    // this.mesh.rotation.x += 0.005;
    // this.mesh.rotation.y += 0.005;
    var time = Date.now( ) * 0.0005;
		this.light1.position.x = Math.sin( time * 0.7 ) * 30;
		this.light1.position.y = Math.cos( time * 0.5 ) * 40;
		this.light1.position.z = Math.cos( time * 0.3 ) * 30;
		this.l1gSphere.position.x = Math.sin( time * 0.7 ) * 30;
		this.l1gSphere.position.y = Math.cos( time * 0.5 ) * 40;
		this.l1gSphere.position.z = Math.cos( time * 0.3 ) * 30;
		this.light2.position.x = Math.cos( time * 0.3 ) * 30;
		this.light2.position.y = Math.sin( time * 0.5 ) * 40;
		this.light2.position.z = Math.sin( time * 0.7 ) * 30;
		this.l2gSphere.position.x = Math.cos( time * 0.7 ) * 30;
		this.l2gSphere.position.y = Math.sin( time * 0.5 ) * 40;
		this.l2gSphere.position.z = Math.sin( time * 0.3 ) * 30;
		this.light3.position.x = Math.sin( time * 0.7 ) * 30;
		this.light3.position.y = Math.cos( time * 0.3 ) * 40;
		this.light3.position.z = Math.sin( time * 0.5 ) * 30;
		this.l3gSphere.position.x = Math.sin( time * 0.7 ) * 30;
		this.l3gSphere.position.y = Math.cos( time * 0.5 ) * 40;
		this.l3gSphere.position.z = Math.sin( time * 0.3 ) * 30;
    this.renderer.render(this.scene, this.camera);
    if (this.animating) { this.id = requestAnimationFrame(() => { this.render() }); };
  }
  
}
