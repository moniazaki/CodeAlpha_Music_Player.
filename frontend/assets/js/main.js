document.addEventListener('DOMContentLoaded', function () {
    const audio = document.querySelector('audio');
    const playButton = document.querySelector('.play');
    const rangeInput = document.getElementById('range');

    // Function to update play button icon based on audio state
    function updatePlayButtonIcon() {
        if (audio.paused) {
            playButton.innerHTML = '<i class="fa-solid fa-play" style="color: white;"></i>';
        } else {
            playButton.innerHTML = '<i class="fa-solid fa-pause" style="color: white;"></i>';
        }
    }

    playButton.addEventListener('click', () => {
        if (audio) {
            if (audio.paused) {
                audio.play().catch(error => {
                    console.error('Error playing audio:', error);
                });
            } else {
                audio.pause();
            }
            updatePlayButtonIcon();
        } else {
            console.warn('Audio element is not found.');
        }
    });

    rangeInput.addEventListener('input', () => {
        if (!isNaN(audio.duration) && audio.duration > 0) {
            const seekTime = (rangeInput.value / 100) * audio.duration;
            audio.currentTime = seekTime;
        }
    });

    // Update the range input as the audio plays
    audio.addEventListener('timeupdate', () => {
        if (!isNaN(audio.duration) && audio.duration > 0) {
            rangeInput.value = (audio.currentTime / audio.duration) * 100;
        }
    });
});


