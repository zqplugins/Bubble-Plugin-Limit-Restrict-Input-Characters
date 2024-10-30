function(instance, properties) {

    let div = $('<div style="text-align: center;"></div>');
    instance.canvas.append(div);
    div.css('background-image', 'url(//meta-l.cdn.bubble.io/f1698436997910x273568100246928800/82014-200kopie.png');
    
    div.css('background-repeat', 'repeat');
    div.css('background-size', '30px');
    div.css('background-color','#ebebeb');
    div.css('opacity',0.35);
    div.css('position','absolute');
    div.css('height',properties.bubble.height);
    div.css('width',properties.bubble.width);
 
   	if (instance.isResponsive) {     
    	instance.setHeight(properties.bubble.width)
    }
}