
// a slideshow of images
export default class Slideshow {

    // summary of properties and methods
    /*
    << PROPERTIES >>----------------------------------------------------------------
    >> this.list >------------- array of images (by their src attributes) 
    >> this.length >----------- no. of images
    >> this.index >------------ index of the current image shown 

    DOM ELEMENTS
    >> this.mainDiv >---------- div containing this slideshow
    >> this.imageDOM >--------- current image
    >> this.slidesDiv >-------- flexbox with arrows and image

    
    

    NAVIGATION PROPERTIES
    >> this.navDots >---------- array of DOM dots for navigation
    >> this.navDiv >----------- DOM element of div for the navigation

    << METHODS >>--------------------------------------------------------------------

    >> constructor >----------- 
        >> array >------------- an array of images by their src
        >> imageId >----------- ID of HTML element


    >> navigate >-------------- changes this.index (the index of the current image)
        >> direction >--------- >> +1 - Next Image
                                >> -1 - Previous Image
                                >> 0 -  Go to a specific index
        >> goTo >--------------- (optional) index of the image you want to go to. Set direction=0

        */
    
    // constructs and calls createGallery, createNav, and navigate(0,0)
    constructor(array, divID) {
        this.list = array;
        this.length = array.length;
        this.index = 0;
        

        /* ------------------------------ DOM elements ------------------------------ */

        this.mainDiv = document.getElementById(divID);

        // create DOM elements - divs
        this.slidesDiv = document.createElement("div");
        this.imageDiv = document.createElement("div");
        this.leftDiv = document.createElement("div");
        this.rightDiv = document.createElement("div");
        this.navDiv = document.createElement("div");

        // create DOM elements - non-div elements
        this.imageDOM = document.createElement("img");
        this.leftArrow = document.createElement("i");
        this.rightArrow = document.createElement("i");

        // append DOM elements 
        this.mainDiv.append(this.slidesDiv, this.navDiv);
        this.slidesDiv.append(this.leftDiv, this.imageDiv, this.rightDiv);
        this.leftDiv.append(this.leftArrow);
        this.imageDiv.append(this.imageDOM);
        this.rightDiv.append(this.rightArrow);


        // DOM classes - divs
        this.slidesDiv.classList.add("flexy");
        this.imageDiv.classList.add("image-div");
        this.leftDiv.classList.add("arrow-div");
        this.rightDiv.classList.add("arrow-div");
        this.navDiv.classList.add("nav-div");
        // DOM classes - non-divs 
        this.imageDOM.classList.add("slide-image");
        this.leftArrow.classList.add("fa-solid", "fa-chevron-left")
        this.rightArrow.classList.add("fa-solid", "fa-chevron-right");
        
        // arrow clicks
        const previous = () => this.navigate(-1);
        const next = () => this.navigate(1);
        this.leftArrow.addEventListener("click", previous);
        this.rightArrow.addEventListener("click", next);


        /* ------------------------- create navigation dots ------------------------- */ 
        this.navDots = [];
    
        // for each image, create dots and add to div
        for (let i=0; i<this.length; i++) {    

            // create dots and add to div 
            var dot = document.createElement("i");
            dot.classList.add("fa-solid",  "fa-circle");
            this.navDots.push(dot);
            this.navDiv.appendChild(dot);            
        }
        // add click event to each dot 
        for (let i=0; i<this.length; i++) {
            const go = () => this.navigate(0,i);
            this.navDots[i].addEventListener("click", go);
        }


        this.navigate(0, 0);

    }



    // changes the image
    changeImage() {
        this.imageDOM.setAttribute("src", this.list[this.index]);
    }

    // navigate to a different image --> then calls changeImage
    navigate(direction, goTo) {

        // direction = {1 - Next image  |  -1 - Previous image  |  0 - go to image goTo}

        // goTo (optional par) >    set direction to 0 to go to a specific image goTo

        // change the index 
        if (direction === 1) {
            if (this.index === this.length-1) {
                this.index = 0;
            } else {
                this.index ++;
            }
        } else if (direction === -1) {
            if (this.index === 0) {
                this.index = this.length-1;
            } else {
                this.index --;
            }
        } else if (direction === 0) {
            this.index = goTo;
        }
    
        
        // highlight the navDot
        // dot has class current if currently shown
        for (let i=0;i<this.length;i++) {
            if (i===this.index) {
                this.navDots[i].classList.add("current")
            } else {
                this.navDots[i].classList.remove("current");
            }
        }

        this.changeImage();
    }

   
}

// new Slideshow(["https://images.unsplash.com/photo-1682547094948-1d764fc412ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
// "https://images.unsplash.com/photo-1683002379511-2a8dda1970cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=378&q=80",
// "https://images.unsplash.com/photo-1682672412664-bf9740c7ebf1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
// "https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80",
// "https://images.unsplash.com/photo-1682685797828-d3b2561deef4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"], "gallery")

