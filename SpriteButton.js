function SpriteButton(name,x,y,width,height,sheet){
	inherit(this,new Sprite(name,x,y,width,height));
	
	this.pressed = false;
	this.mousePressed = false;
	this.clicked = false;
	
	for(var i=0;i<(sheet.width/this.width)*(sheet.height/this.height);i++){
		this.addAnimation(new Animation("state"+i,sheet,0,0,width,height,i,1,1000));
	}
	
	this.startAnimation("state0");
	
	this.updateMouse = function(x,y,mouseDown){
		this.clicked = false;
		if(mouseDown){
			if(!this.mousePressed){
				this.mousePressed = true;
				if(this.hitsPoint(x-this.width/2,y-this.height/2)){
					this.pressed = true;
				}
			}
		}else{
			if(this.pressed){
				if(this.hitsPoint(x-this.width/2,y-this.height/2)){
					this.clicked = true;
					var nextState = "state"+(parseInt(this.animation.name.substr(5,1))+1);
					if(this.animations[nextState]){
						this.startAnimation(nextState);
					}else{
						this.startAnimation("state0");
					}
				}
			}
			this.pressed = false;
			this.mousePressed = false;
		}
	}
	
	this.serialize = function(output){
		output = output.concat("\n<SpriteButton name='"+this.name+
			(this.x?"' x='"+this.x:"")+
			(this.y?"' y='"+this.y:"")+
			"' width='"+this.width+
			"' height='"+this.height+
			"' sheet='"+this.animation.sheet.name+
			"' />");
		return output;
	}
}