let touchHoverOn = true;

let getTarget = (node)=>{
	if(!node || !(node instanceof Element)) return null;
	if(node.dataset.hover !== undefined) {
		return node;
	} else if(node.parentNode !== null){
		return getTarget(node.parentNode);
	}
}

let inHover = false, node = null;
let touchstart = function(e){
	if(e.touches.length > 1 || inHover || !touchHoverOn) {
		return ;
	}
	node = getTarget(e.touches.item(0).target);
	if(node == null) return ;
	inHover = true;
	
	node.dataset.hover && node.classList.add(node.dataset.hover);
};
let touchend = function(){
	if(inHover) {
		inHover = false;
		node.dataset.hover && node.classList.remove(node.dataset.hover);
	}
};

let doc = document.documentElement;
doc.addEventListener('touchstart', touchstart);
doc.addEventListener('touchend', touchend);
doc.addEventListener('touchcancel', touchend);

export let touchHover = {
	on(){
		touchHoverOn = true;
	},
	off(){
		touchHoverOn = false;
	}
};