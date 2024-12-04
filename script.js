if (window.location.href.includes('step2.html')) {
    document.querySelector('.js-buttonGlitch').addEventListener('click', function() {
        window.location.href = 'glitch.html';
    });
}

if (window.location.href.includes('step3.html')) {
    document.querySelector('.js-inputStep3').addEventListener('input', function() {
        if (this.value === 'Les lumières de la nuit') {
            document.querySelector('.step3').remove();
            window.location.href = 'step35.html';
        }
    })
}

if (window.location.href.includes('step35.html')) {
    document.querySelector('.js-inputStep35').addEventListener('input', function() {
        if (this.value === '21') {
            window.location.href = 'step41.html';
        }
    })
}

if (window.location.href.includes('step37.html')) {
    document.querySelector('.js-inputStep37').addEventListener('input', function() {
        if (this.files.length > 0) {
            window.location.href = 'step4.html';
        }
    })
}

if (window.location.href.includes('step4.html')) {

document.querySelector('.js-buttonGlitch').addEventListener('click', function() {
    const allContent = document.querySelectorAll('body > *:not(.wrap.glitch)');
    allContent.forEach(element => {
        element.style.transition = 'transform 0.5s';
        element.style.transform = 'translateY(100vh)';
    });

    const wrapGlitch = document.querySelector('.wrap.glitch');
    wrapGlitch.style.transition = 'translate 0.5s';
    wrapGlitch.style.translate = '0 0';
});
    // document.querySelector('.js-inputStep4').addEventListener('input', function() {
    //     if (this.value === '000') {
    //         document.querySelector('.step4').remove();
    //         const newText = document.createElement('p');
    //         newText.classList.add('newText');
    //         newText.textContent = 'TROUVE MOT TEUF';
    //         const inputTextTeuf = document.createElement('input');
    //         inputTextTeuf.type = 'text';
    //         inputTextTeuf.placeholder = 'MOT TEUF';
    //         inputTextTeuf.classList.add('js-inputTeuf');
    //         document.body.appendChild(newText);
    //         document.body.appendChild(inputTextTeuf);
    //         document.querySelector('.js-inputTeuf').addEventListener('input', function() {
    //             if (this.value === 'teuf') {7
    //                 document.querySelector('.newText').remove();
    //                 document.querySelector('.js-inputTeuf').remove();
    //                 const imgTeuf = document.createElement('img');
    //                 imgTeuf.src = 'image.png';
    //                 imgTeuf.alt = 'mot teuf';
    //                 document.body.appendChild(imgTeuf);
    //                 setTimeout(function() {
    //                     document.querySelector('img').remove();
    //                     const newText = document.createElement('p');
    //                     newText.classList.add('newText');
    //                     newText.textContent = 'Rendez-vous le 10 !';
    //                     document.body.appendChild(newText);
    //                 }, 3000);
                    
    //             }
    //         })
    //     }
    // })
}

if (window.location.href.includes('step15.html')) {
    document.querySelector('.js-inputStep15').addEventListener('input', function() {
        if (this.value === '0400') {
            window.location.href = 'step2.html';
        }
    })
}