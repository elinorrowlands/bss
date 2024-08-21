document.querySelector('#main__title').classList.add('nav__back')
let baseURL = 'https://elinorrowlands.github.io/bss/';

let elements = {
    'bridge': {
        folder: 'elements/bridge',
        qr:null
    },
    'text': {
        folder: 'elements/text',
        qr:null
    },
    'mix': {
        folder: 'elements/crossing',
        qr:null
    },
    'ripples': {
        folder: 'elements/ripples',
        qr:null
    },
    'rusty_can': {
        folder: 'elements/rusty_can',
        qr:null
    },
    'school': {
        folder: 'elements/school',
        qr:null
    },
}

window.addEventListener('load',()=>{

    Object.entries(elements).forEach(([key, value],i) => {
        elements[key].card = document.createElement('li');
        elements[key].card.classList.add('qr__card', 'allowDefault', `elements__${key}`);
        elements[key].card.setAttribute('role', 'button');
        elements[key].card.id = `qr__card__${key}`;

        elements[key].number = document.createElement('div');
        elements[key].number.classList.add('qr__number');
        elements[key].number.innerHTML = `- ${i+1} -`;
        elements[key].number.setAttribute('aria-hidden', 'true');

        elements[key].url = baseURL + value.folder;

        elements[key].text = document.createElement('div');
        elements[key].text.classList.add('qr__text');
        elements[key].text.innerHTML = key.replace('_',' ')
            .replace('text', "edge")
            .replace('heart', 'school')
            .replace('mix', 'crossing')

        elements[key].qr = generateQR(elements[key].url, `qr__${key}`);
        elements[key].qr.classList.add('qr__svg');
        elements[key].qr.classList.add(`elements__${key}`);
        const clickEvent = (e)=>{
            if(e.shiftKey){
                elements[key].card.innerHTML = '';
                new QRCode(elements[key].card, elements[key].url);
            } else {
                window.location.href = elements[key].url;
            } 
        }
        elements[key].card.addEventListener('click', clickEvent);
        elements[key].card.addEventListener('touchend', clickEvent);

        elements[key].qr.querySelector('rect').remove();

        elements[key].card.appendChild(elements[key].number);
        elements[key].card.appendChild(elements[key].qr);
        document.querySelector('.bar.qr__container').appendChild(elements[key].card);
        elements[key].card.appendChild(elements[key].text);
    })

    // document.querySelectorAll('.qr__svg').forEach((qr, i)=>{
    //     qr.querySelectorAll('rect:not(.anchor)').forEach((x,i)=>{

    //         let number = Math.sin(i)*255;

    //         if (number < 0) {
    //             number = 0;
    //         } else if (number >160){
    //             number = 160;
    //         }

    //         x.style.fill=`rgba(0,0,${number},1)`;
    //         x.style.stroke = 'black';
    //         // x.style.strokeWidth = '2px';
    //     })

    //     qr.querySelectorAll('rect.anchor').forEach((x,i)=>{
    //         x.style.strokeWidth = '3px';
    //         x.style.stroke='black';
    //         x.style.display='none';
    //     })
    // })

    document.querySelectorAll('.qr__svg').forEach((qr, i)=>{
        qr.querySelectorAll('rect:not(.anchor)').forEach((x,i)=>{

            let number = Math.sin(i)*255;

            if (number < 0) {
                number = 0;
            } else if (number >200){
                number = 200;
            }

            x.style.fill=`rgba(${number},255,255,1)`;
            x.style.stroke = 'black';
        })

        qr.querySelectorAll('rect.anchor').forEach((x,i)=>{
            x.style.strokeWidth = '3px';
            x.style.stroke='black';
            x.style.display='none';
        })
    })
    
})