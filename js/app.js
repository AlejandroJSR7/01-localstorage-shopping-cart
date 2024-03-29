// Vars
const cart = document.querySelector('#carrito');
const courses = document.querySelector('#lista-cursos');
const listCourses = document.querySelector('#lista-carrito tbody');
const emptyCart = document.querySelector('#vaciar-carrito');

// Listeners
loadEventListeners();
function loadEventListeners() {
  // Add course to Cart
  courses.addEventListener('click', addCourse);
  // Remove course of Cart
  listCourses.addEventListener('click', removeCourseOfCart);
  // Empty cart
  emptyCart.addEventListener('click', removeAllOfCart);
  // Load Courses when DOM is Ready
  document.addEventListener('DOMContentLoaded', loaddAllCoursesFromLS)
}

// Functions
function addCourse(e) {
  e.preventDefault();
  // Delegation to agregar-carrito
  if (e.target.classList.contains('agregar-carrito')) {
    const curso = e.target.closest('.card');
    readCourseInfo(curso);
  }
}
function readCourseInfo(course) {
  const infoCourse = {
    image: course.querySelector('img').src,
    title: course.querySelector('h4').textContent,
    price: course.querySelector('.precio span').textContent,
    id: course.querySelector('a').getAttribute('data-id')
  }
  printCourseInCart(infoCourse);
  saveInLocalStorage(infoCourse);
}

function printCourseInCart(course) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>
      <img src="${course.image}" width="100"/>
      <td>${course.title}</td>
      <td>${course.price}</td>
      <td>
        <a href="#" class="borrar-curso" data-id="${course.id}">X</a>
      </td>
    </td>
  `;
  listCourses.appendChild(row);
}
function removeCourseOfCart(e) {
  e.preventDefault();
  if (e.target.classList.contains('borrar-curso')) {
    e.target.closest('tr').remove();
    removeFromLS(e.target.getAttribute('data-id'));
  }
}
function removeAllOfCart(e) {
  e.preventDefault();
  // e.target.closest('#carrito').querySelector('table tbody').innerHTML = '';
  while (listCourses.firstChild) { // This way is more fast that innerHTML 
    listCourses.removeChild(listCourses.firstChild);
  }
  removeAllFromLLS();
  return true;
}


function saveInLocalStorage(course) {
  let courses;
  courses = getFromLocalStorage();

  courses.push(course);
  localStorage.setItem('courses', JSON.stringify(courses));
}
function getFromLocalStorage() {
  let coursesLS;
  if (localStorage.getItem('courses') === null) {
    coursesLS = [];
  } else {
    coursesLS = JSON.parse(localStorage.getItem('courses'));
  }
  return coursesLS;
}
function loaddAllCoursesFromLS() {
  let coursesLS;
  coursesLS = getFromLocalStorage();
  coursesLS.forEach(course => {
    printCourseInCart(course);
  });
}
function removeFromLS(course_id) {
  let coursesLS = getFromLocalStorage();
  coursesLS.forEach((course, index) => {
    if (course_id === course.id) {
      coursesLS.splice(index, 1);
      localStorage.setItem('courses', JSON.stringify(coursesLS));
    }
  });
}
function removeAllFromLLS() {
  localStorage.clear();
}