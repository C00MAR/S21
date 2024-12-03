if (window.location.href === window.location.origin + '/') {
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
        document.querySelector('.setp1').remove();
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
    document.querySelector('.js-buttonGlitch').addEventListener('click', function() {
        window.location.href = 'glitch.html';
    });
}

if (window.location.href.includes('step3.html')) {
    document.querySelector('.js-inputStep3').addEventListener('input', function() {
        if (this.value === '000') {
            document.querySelector('.step3').remove();
            const newText = document.createElement('p');
            newText.classList.add('newText');
            newText.textContent = 'New text has been added!';
            document.body.appendChild(newText);
        }
    })
}

if (window.location.href.includes('step4.html')) {
    document.querySelector('.js-inputStep4').addEventListener('input', function() {
        if (this.value === '000') {
            document.querySelector('.step4').remove();
            const newText = document.createElement('p');
            newText.classList.add('newText');
            newText.textContent = 'TROUVE MOT TEUF';
            const inputTextTeuf = document.createElement('input');
            inputTextTeuf.type = 'text';
            inputTextTeuf.placeholder = 'MOT TEUF';
            inputTextTeuf.classList.add('js-inputTeuf');
            document.body.appendChild(newText);
            document.body.appendChild(inputTextTeuf);
            document.querySelector('.js-inputTeuf').addEventListener('input', function() {
                if (this.value === 'teuf') {7
                    document.querySelector('.newText').remove();
                    document.querySelector('.js-inputTeuf').remove();
                    const imgTeuf = document.createElement('img');
                    imgTeuf.src = 'image.png';
                    imgTeuf.alt = 'mot teuf';
                    document.body.appendChild(imgTeuf);
                    setTimeout(function() {
                        document.querySelector('img').remove();
                        const newText = document.createElement('p');
                        newText.classList.add('newText');
                        newText.textContent = 'Rendez-vous le 10 !';
                        document.body.appendChild(newText);
                    }, 3000);
                    
                }
            })
        }
    })
}