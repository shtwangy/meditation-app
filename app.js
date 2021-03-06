const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.video-container video');

    // Sounds
    const sounds = document.querySelectorAll('.sound-picker button');
    // Time Display
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-selector button');
    // Get the length of the outline
    const outlineLength = outline.getTotalLength();
    // Duration (default 10 minutes)
    let duration = 600;
    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    // Pick different sounds
    sounds.forEach(sound => {
        sound.addEventListener('click', function() {
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlaying(song);
        });
    });

    // play sounds
    play.addEventListener('click', () => {
        checkPlaying(song);
    });

    // select time
    timeSelect.forEach(option => {
        option.addEventListener('click', function () {
            song.currentTime = 0;
            duration = this.getAttribute('data-time');
            timeDisplay.textContent = createDisplayTimeString(duration);
        })
    });

    // Create a function specific to step and play the sounds
    const checkPlaying = song => {
        if( song.paused ) {
            song.play();
            video.play();
            play.src = './svg/pause.svg';
        } else {
            song.pause();
            video.pause();
            play.src = './svg/play.svg';
        }
    };

    // Circle Animation
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = duration - currentTime;

        // Animate circle
        let progress = outlineLength - (currentTime / duration) * outlineLength;
        outline.style.strokeDashoffset = progress;
        // Animate the text
        timeDisplay.textContent = createDisplayTimeString(elapsed);

        if(currentTime >= duration) {
            song.pause();
            song.currentTime = 0;
            play.src = './svg/play.svg';
            video.pause();
        }
    };

    function getDoubleDigitNumber(number) {
        return ("0" + number).slice(-2)
    };

    function createDisplayTimeString(time) {
        return `${getDoubleDigitNumber(Math.floor(time / 60))}:${getDoubleDigitNumber(Math.floor(time % 60))}`;
    }
};

app();
