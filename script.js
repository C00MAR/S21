if (window.location.href.includes('index.html')) {
    const codeVideo = '000';
    const codeLampadaire = '111';

    setTimeout(function() {
        const element = document.getElementsByClassName('js-videoStart')[0];
        element.style.transition = 'opacity 1s';
        element.style.opacity = '0';
        setTimeout(function() {
            element.remove();
        }, 1000);
    }, 1000);
    // 96000
    document.querySelector('.js-inputStep1').addEventListener('input', function() {
        if (this.value === codeVideo) {
            console.log('ok');
            step1();
        }
    });

    function step1() {
        const popUp = document.createElement('div');
        popUp.classList.add('popUp');
        popUp.innerHTML = '<p>Code lampadaire !</p>';
        const inputText = document.createElement('input');
        inputText.type = 'text';
        inputText.placeholder = 'CODE';
        inputText.classList.add('js-inputStep2');
        popUp.appendChild(inputText);
        document.body.appendChild(popUp);
        document.querySelector('.js-inputStep2').addEventListener('input', function() {
            if (this.value === codeLampadaire) {
                // window.open('step2.html', '_blank');
                // window.location.href = 'about:blank';
                window.location.href = 'step2.html';
            }
        });
    }
}

if (window.location.href.includes('step2.html')) {
    window.addEventListener('scroll', function() {
        if (window.scrollY >= window.innerHeight) {
            setTimeout(function() {
                window.location.href = 'glitch.html';
            }, 5000);
        }
    });
}

if (window.location.href.includes('glitch.html')) {

}