class douban {
	constructor() {
		this.$songList = document.querySelector('.main-list');
		this.$songTitle = document.querySelector('.title');
		this.$play = document.querySelector('.fun-operate-start');
		this.$pause = document.querySelector('.fun-operate-pause');
		this.$next = document.querySelector('.fun-operate-next');
		this.$time = document.querySelector('.pro-song-time');
		this.$sound = document.querySelector('.sound-volume-slider');
		this.$progress = document.querySelector('.pro-pro');
		this.audio = new Audio();
		this.playList = this.$songList.getElementsByTagName('li');//歌曲列表
		this.songIndex = 0;//当前播放的歌曲
		this.init();
	}

	init() {
		this.$songList.addEventListener('click', this.createSong.bind(this));
		this.$play.addEventListener('click', this.play.bind(this));
		this.$pause.addEventListener('click', this.pause.bind(this));
		this.$next.addEventListener('click', this.next.bind(this));
		this.$sound.addEventListener('click', this.setSound.bind(this));
		this.$progress.addEventListener('click', this.setProgress.bind(this));
		this.audio.addEventListener('ended', this.next.bind(this));
		this.audio.addEventListener('timeupdate', this.update.bind(this));
		this.load(0);
	}

	createSong() { 
		let index = parseInt(event.target.innerHTML.split('. ')[0]);//获取点击的歌曲
			index--;
		this.load(index);
	}

	play() {
		this.audio.play();
		this.$pause.style.display = 'inline-block';
		this.$play.style.display = 'none';
	}

	pause() {
    	this.audio.pause();
    	this.$play.style.display = 'inline-block';
    	this.$pause.style.display = 'none';
  	}

	next() {
		let index;
	  	if (this.songIndex == this.playList.length - 1) {
	  		index = 0;
	  		this.load(index);
	  	} else {
	  		this.songIndex++;
	  		index = this.songIndex;
	  		this.songIndex--;
	  		this.load(index);
	  	}
	  }

  	setSound(event) {
  		const rect = this.$sound.getBoundingClientRect();
  		let controlVolu = this.$sound.querySelector('.sound-volume-value');
  		let volume = (event.x - rect.left) / rect.width;
  		controlVolu.style.width = volume * 100 + '%';
  		this.audio.volume = volume; 
  	}

  	setProgress(event) {
  		this.audio.currentTime = event.offsetX / this.$progress.clientWidth * this.audio.duration;	
  	}

  	update() {
 		let controlPro = this.$progress.querySelector('.pro-song-pro');
  		const time = parseInt(this.audio.currentTime);
  		let minute = parseInt(time / 60);
  		let second = time % 60;
  		if (second < 10) {
  			second = '0' + second;
  		}
  		if (minute < 10) {
  			if (minute <= 0) {
  				minute = '00';
  			} else {
  				minute = '0' + minute;
  			}
  		}
  		this.$time.textContent = minute + ':' + second;
  		controlPro.style.width = (this.audio.currentTime / this.audio.duration * 100) + '%';
  	}

  	load(index) {
  		this.playList[this.songIndex].classList.remove('active');
  		this.songIndex = index;
  		this.playList[this.songIndex].classList.add('active');
  		let songDetail = this.playList[this.songIndex].innerHTML.split('. ')[1].split(' - ');
		let temp = this.$songTitle.getElementsByTagName('a');
		temp[0].innerHTML = songDetail[1];
		temp[1].innerHTML = songDetail[0];
		this.audio.src = this.playList[this.songIndex].dataset.url;
		this.play();
  	}
}

const app = new douban();