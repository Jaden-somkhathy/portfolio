let menuIcons=document.querySelector('#menu-icon');
let navbar=document.querySelector('.navbar');
let sections=document.querySelector('section');
let navlinks=document.querySelector('header nav a');

window.onscroll =()=>{
    sections.forEach(sec =>{
        let top=window.scrolly;
        let offset=sec.offsetTop-150;
        let height=sec.offsetHeight;
        let id=sec.getAttribute(id);

        if(top >=offset && top<offset + height){
            navlinks.forEach(links=>{
                links.classlist.remove(áctive);
                document.querySelector('header nav a [href*=' + id  ).classlist.add
                ('active')
            })
        }
    })
}
menuIcons.onclick=()=>{
    menuIcons.classList.toggle('bx-x')
    navbar.classList.toogle('active')
}