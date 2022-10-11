class Gallery {
	constructor({ photos, size = 3, current, container }) {
		this.photos = photos;
		this.size = size;
		this.currentId = current && current > 0 ? current - 1 : 1;
		this.container = container ? container : document.querySelector('#gallery');

		this.init();
	}

	galleryRow = null;
	photoArr = null;
	activePhoto = null;

	init() {
		this.print();
		this.stylePhotos();
		this.toggleActiveImg();
		this.addEventListeners();
	}

	addEventListeners() {
		const prevButton = this.container.querySelector('.gallery-switch_prev');
		const nextButton = this.container.querySelector('.gallery-switch_next');
		prevButton.addEventListener('click', () => {
			if (this.currentId > 0) {
				this.currentId--;
				this.toggleActiveImg();
			}
		});
		nextButton.addEventListener('click', () => {
			if (this.currentId < this.photos.length - 1) {
				this.currentId++;
				this.toggleActiveImg();
			}
		});
		document.addEventListener('keydown', e => {
			if (e.code === 'ArrowLeft') {
				if (this.currentId > 0) {
					this.currentId--;
					this.toggleActiveImg();
				}
			}
			if (e.code === 'ArrowRight') {
				if (this.currentId < this.photos.length - 1) {
					this.currentId++;
					this.toggleActiveImg();
				}
			}
		});
	}

	print() {
		const markup =
			'<div class="gallery"><div class="gallery-switch gallery-switch_prev"></div><div class="gallery-container"><div class="gallery-row">' +
			'{{#photos}}<img class="gallery-row__item" src={{src}} id={{id}}>{{/photos}}' +
			'</div></div><div class="gallery-switch gallery-switch_next"></div></div>';

		const output = Mustache.render(markup, this);
		this.container.innerHTML = output;

		this.galleryRow = this.container.querySelector('.gallery-row');
		this.photoArr = Array.prototype.slice.call(this.galleryRow.querySelectorAll('.gallery-row__item'));
	}

	stylePhotos() {
		// Calculating size of photos
		const photoSize = (this.container.clientWidth - 100) / this.size - 10 + 'px';
		this.photoArr.forEach(photo => {
			// Adding styles
			photo.style.width = photoSize;
			photo.style.height = photoSize;

			// Adding functional for photos
			photo.addEventListener('click', () => {
				this.currentId = photo.id;
				this.toggleActiveImg();
			});
		});
	}

	toggleActiveImg() {
		if (!this.activePhoto) {
			this.activePhoto = this.photoArr[this.currentId];
		}
		// Deactivating active photo
		this.activePhoto.classList.remove('active');
		// Activating photo
		this.activePhoto = this.photoArr[this.currentId];
		this.activePhoto.classList.add('active');
		this.centerActive();
	}

	centerActive() {
		let activeOffset = this.activePhoto.offsetLeft;
		let activeWidth = this.activePhoto.offsetWidth;
		let allPhotosWidth =
			this.photoArr[this.photos.length - 1].offsetLeft + this.photoArr[this.photos.length - 1].offsetWidth + 10;
		let offset = activeOffset - activeWidth * (this.size / 2 - 0.5);
		if (activeOffset < this.galleryRow.offsetWidth / 2) {
			offset = 0;
		}
		if (activeOffset + activeWidth > allPhotosWidth - this.galleryRow.offsetWidth / 2) {
			offset = allPhotosWidth - this.galleryRow.offsetWidth;
		}
		if (offset < 0) {
			return;
		}
		this.galleryRow.style.left = -offset + 'px';
	}
}
