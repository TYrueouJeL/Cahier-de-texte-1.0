import 'bootstrap/js/src/tab'
import 'bootstrap/js/src/dropdown'

import "../scss/style.scss";

var btnNavbar = document.querySelectorAll('ul[name="navbar"] li a');
var section = document.querySelectorAll('section');

for (let i = 0; i < btnNavbar.length; i++) {
    btnNavbar[i].addEventListener('click', () => {
        document.querySelector('a.active').classList.remove('active');
        btnNavbar[i].classList.add('active');
        document.querySelector('section.active').classList.remove('active');
        section[i].classList.add('active');
    })
}

var addWorkBtn = document.querySelector('button[name="addWorkBtn"]');

var supAllWorkBtn = document.querySelector('button[name="supAllWorkBtn"]');

var workTitle = document.querySelector('textarea#devoirsTitre');
var workDescription = document.querySelector('textarea#devoirDescription');
var workMatiere = document.querySelector('select#selectMatiere');
var workDate = document.querySelector('textarea#devoirsDate');

function addDevoir(devoir) {
    let card = document.createElement('div');

    card.classList.add('col-12', 'col-md-6', 'col-lg-4', 'col-xl-3', 'mb-3');
    card.innerHTML = `
    <div class="card text-white border-info mb-3" style="max-width: 20rem;">
        <div class="card-header">${devoir.matiere}</div>
        <div class="card-body">
            <h4 class="card-title">${devoir.titre}</h4>
            <p class="card-text">${devoir.description}</p>
            <p class="card-text">Pour le ${devoir.date}</p>
            <button type="button" name="modifyWorkBtn" class="btn btn-success">Modifier</button>
            <button type="button" name="supWorkBtn" class="btn btn-warning">Supprimer</button>
        </div>
    </div>`;

    document.querySelector('#devoirs-content').appendChild(card);
    const removeBtn = card.querySelector('button[name="supWorkBtn"]');
    removeBtn.addEventListener('click', (event) => {
        let devoirs = JSON.parse(localStorage.getItem('devoirs')) || [];
        devoirs = devoirs.filter(d => d.id != devoir.id);
        localStorage.setItem('devoirs', JSON.stringify(devoirs));
    
        event.currentTarget.closest('.card').parentNode.remove();
    });

    const modifyBtn = card.querySelector('button[name="modifyWorkBtn"]');
    modifyBtn.addEventListener('click', (event) => {
        let devoirs = JSON.parse(localStorage.getItem('devoirs')) || [];
        workTitle.value = devoir.titre;
        workDescription.value = devoir.description;
        workMatiere.value = devoir.matiere;
        workDate.value = devoir.date;

        devoirs = devoirs.filter(d => d.id != devoir.id);
        localStorage.setItem('devoirs', JSON.stringify(devoirs));

        event.currentTarget.closest('.card').parentNode.remove();
    })
}

addWorkBtn.addEventListener('click', () => {
    let date = new Date();
    let idDefine = date.getFullYear() + '' + date.getMonth() + '' + date.getDate() + '' + date.getHours() + '' + date.getMinutes() + '' + date.getSeconds() + '' + date.getMilliseconds();

    const devoir = {
        matiere: workMatiere.value,
        titre: workTitle.value,
        description: workDescription.value,
        date: workDate.value,
        id: idDefine,
    }

    let devoirs = JSON.parse(localStorage.getItem('devoirs')) || [];
    devoirs.push(devoir);
    localStorage.setItem('devoirs', JSON.stringify(devoirs));

    addDevoir(devoir);

    workTitle.value = '';
    workDescription.value = '';
    workDate.value = '';
});

supAllWorkBtn.addEventListener('click', () => {
    if (confirm('Voulez-vous vraiment supprimer tous les devoirs ?')) {
        localStorage.clear();
        document.querySelector('#devoirs-content').innerHTML = '';
    }
});

// Display devoirs from localStorage
let devoirs = JSON.parse(localStorage.getItem('devoirs')) || [];

for (let i = 0; i < devoirs.length; i++) {
    addDevoir(devoirs[i]);
}

var addLessonBtn = document.querySelector('button[name="addLessonBtn"]');

var supAllLessonBtn = document.querySelector('button[name="supAllLessonBtn"]');

var lessonTitle = document.querySelector('textarea#lessonTitle');
var lessonContent = document.querySelector('textarea#lessonContent');
var lessonMatiere = document.querySelector('select#selectLessonMatiere');

function addLesson(lesson) {
    let card = document.createElement('div');

    card.classList.add('col-12', 'col-md-6', 'col-lg-4', 'col-xl-3', 'mb-3');
    card.innerHTML = `
    <div class="cour card text-white border-info mb-3" style="max-width: 20rem;">
        <div class="card-header">${lesson.titre}</div>
        <div class="card-body">
            <h4 class="card-title">${lesson.matiere}</h4>
            <p class="card-text">${lesson.content}</p>
            <button type="button" name="modifyLessonBtn" class="btn btn-success">Modifier</button>
            <button type="button" name="supLessonBtn" class="btn btn-warning">Supprimer</button>
        </div>
    </div>`;

    document.querySelector('#cours-content').appendChild(card);
    const removeLessonBtn = card.querySelector('button[name="supLessonBtn"]');
    removeLessonBtn.addEventListener('click', (event) => {
        let cours = JSON.parse(localStorage.getItem('cours')) || [];
        cours = cours.filter(d => d.id != lesson.id);
        localStorage.setItem('cours', JSON.stringify(cours));
    
        event.currentTarget.closest('.cour').parentNode.remove();
    });

    const modifyLessonBtn = card.querySelector('button[name="modifyLessonBtn"]');
    modifyLessonBtn.addEventListener('click', (event) => {
        /**var form = document.querySelectorAll('form[name="modif"]');

        for (let i = 0; i < form.length; i++) {
            form[i].addEventListener('click', () => {
                document.querySelector('form[name="modif"].active').classList.remove('active');
                form[i].classList.add('active');
            })
        }**/

        lessonContent.value = lesson.content;
        lessonTitle.value = lesson.titre;
        lessonMatiere.value = lesson.matiere;
    })
}

addLessonBtn.addEventListener('click', () => {
    let date = new Date();
    let idDefine = date.getFullYear() + '' + date.getMonth() + '' + date.getDate() + '' + date.getHours() + '' + date.getMinutes() + '' + date.getSeconds() + '' + date.getMilliseconds();

    const lesson = {
        matiere: lessonMatiere.value,
        titre: lessonTitle.value,
        content: lessonContent.value,
        id: idDefine,
    }

    let cours = JSON.parse(localStorage.getItem('cours')) || [];
    cours.push(lesson);
    localStorage.setItem('cours', JSON.stringify(cours));

    addLesson(lesson);

    lessonTitle.value = '';
    lessonContent.value = '';
})

supAllLessonBtn.addEventListener('click', () => {
    if (confirm('Voulez-vous vraiment supprimer tous les cours ?')) {
        localStorage.clear();
        document.querySelector('#cours-content').innerHTML = '';
    }
});

let cours = JSON.parse(localStorage.getItem('cours')) || [];

for (let i = 0; i < cours.length; i++) {
    addLesson(cours[i]);
}