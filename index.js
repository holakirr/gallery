function Gallery(data){// photos, size, current, container
    // Data from init
    this.data = data;
    this.photos = data.photos;
    this.size = data.size ? data.size : 3;
    this.currentId = data.current && data.current > 0 ? data.current - 1 : 1;
    this.container = data.container ? data.container : document.querySelector('#gallery');
    // Main elements
    this.galleryRow = null;
    this.photoArr = null;
    this.activePhoto = null;

    this.init();
}

Gallery.prototype.init = function () {
    this.printGallery();
    this.stylePhotos();
    this.toggleActiveImg();
    this.addEventListeners();
};

Gallery.prototype.addEventListeners = function(){
    const self = this;
    const prevButton = this.container.querySelector('.gallery-switch_prev');
    const nextButton = this.container.querySelector('.gallery-switch_next');
    prevButton.addEventListener('click', function(){
        if(self.currentId > 0){
            self.currentId--;
            self.toggleActiveImg();
        }
    });
    nextButton.addEventListener('click', function(){
        if(self.currentId < self.photos.length - 1){
            self.currentId++;
            self.toggleActiveImg();
        }
    });
    document.addEventListener('keydown', function(e){
        if(e.code === 'ArrowLeft'){
            if(self.currentId > 0){
                self.currentId--;
                self.toggleActiveImg();
            }
        }
        if(e.code === 'ArrowRight'){
            if(self.currentId < self.photos.length - 1){
                self.currentId++;
                self.toggleActiveImg();
            }
        }
    })
};

// Initial markup for gallery
Gallery.prototype.printGallery = function(){
    // Template
    const galleryMarkup = '<div class="gallery"><div class="gallery-switch gallery-switch_prev"></div><div class="gallery-container"><div class="gallery-row">' +
    '{{#photos}}<img class="gallery-row__item" src={{src}} id={{id}}>{{/photos}}' +
    '</div></div><div class="gallery-switch gallery-switch_next"></div></div>';

    const output = Mustache.render(galleryMarkup, this.data);
    this.container.innerHTML = output;

    // Re-entering base elements
    this.galleryRow = this.container.querySelector('.gallery-row');
    this.photoArr = Array.prototype.slice.call(this.galleryRow.querySelectorAll('.gallery-row__item'));
};

Gallery.prototype.stylePhotos = function(){
    const self = this;
    // Calculating size of photos
    let photoSize = (this.container.clientWidth - 100) / this.size - 10 + 'px';
    this.photoArr.forEach(function(photo){
        // Adding styles
        photo.style.width = photoSize;
        photo.style.height = photoSize;

        // Adding functional for photos
        photo.addEventListener('click', function(){
            self.currentId = photo.id;
            self.toggleActiveImg();
        });
    });
};

Gallery.prototype.toggleActiveImg = function(){
    // Inactivating active photo
    if(this.activePhoto !== null){
        this.activePhoto.classList.remove('active');
    }
    // Activating photo
    this.activePhoto = this.photoArr[this.currentId];
    this.activePhoto.classList.add('active');
    this.centeringActiveImg();
};

Gallery.prototype.centeringActiveImg = function() {
    let activeOffset = this.activePhoto.offsetLeft;
    let activeWidth = this.activePhoto.offsetWidth;
    let allPhotosWidth = this.photoArr[this.photos.length - 1].offsetLeft + this.photoArr[this.photos.length - 1].offsetWidth + 10;
    let offset = activeOffset - activeWidth * (this.size / 2 - 0.5);
    if(activeOffset < this.galleryRow.offsetWidth / 2){
        offset = 0;
    }
    if(activeOffset + activeWidth > allPhotosWidth - this.galleryRow.offsetWidth / 2){
        offset = allPhotosWidth - this.galleryRow.offsetWidth;
    }
    if(offset < 0){
        return;
    }
    this.galleryRow.style.left = - offset + 'px';
}