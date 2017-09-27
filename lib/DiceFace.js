export default class DiceFace  {
    constructor(face) {
        if(typeof face === "object"){
            this.value = face.value || face.val;
            this.label = face.label ||face.value;
            this.data = face.data || {};
        }
        else{
            this.value = face;
            this.label = face;
            this.data = {}; 
        }

    }

};