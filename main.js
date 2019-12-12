
//Style block
const floatContainers = document.querySelectorAll('.float-container');
const FloatLabel = (() => {

  const handleFocus = (e) => {
    const target = e.target;
    target.parentNode.classList.add('active');
    target.setAttribute('placeholder', target.getAttribute('data-placeholder'));
  };

  const handleBlur = (e) => {
    const target = e.target;
    if (!target.value) {
      target.parentNode.classList.remove('active');
    }
    target.removeAttribute('placeholder');
  };


  const bindEvents = (element) => {
    const floatField = element.querySelector('input');
    floatField.addEventListener('focus', handleFocus);
    floatField.addEventListener('blur', handleBlur);
  };

  const init = () => {

    floatContainers.forEach((element) => {
      if (element.querySelector('input').value) {
        element.classList.add('active');
      }

      bindEvents(element);
    });
  };

  return {
    init: init
  };
})();

FloatLabel.init();



let registationForm = document.forms['registration']

const forms = document.querySelectorAll('form');
const form = forms[0];

[...form.elements].forEach(function (input, index, array) {

  input.addEventListener('focus', function () {
    floatContainers[index].classList.add('active-box')
  })
  input.addEventListener('blur', function () {
    floatContainers[index].classList.remove('active-box')
  })
});


//Check valid input block
let checkFirstName = /^[a-zA-Z\s]{1,20}$/;
let checkLastName = /^[a-zA-Z\s]{1,20}$/;
let checkEmail = /^([a-zA-Z0-9_\-\.]+)@([a-z0-9_\-\.]+).([a-z])$/;
let checkPasword = /^([a-zA-Z0-9]){8,20}$/
let checkArr = [checkFirstName, checkLastName, checkEmail, checkPasword]

const checkValidInput = (index) => {

  if (checkArr[index].test(registationForm[index].value) !== true) {
    floatContainers[index].classList.add('error')
    document.querySelectorAll('.warning')[index].style.display = 'block'

  } if (checkArr[index].test(registationForm[index].value) == true || registationForm[index].value == "") {
    floatContainers[index].classList.remove('error')
    document.querySelectorAll('.warning')[index].style.display = 'none'
  }

}


//Push user to locatStorage
class User {
  constructor(name, sname, email, passw) {
    this.firstName = name;
    this.secondName = sname;
    this.login = email;
    this.password = passw
  }
}

let users = []
let user = ""

const getId = id => document.getElementById(id);

getId('singInBtn').onclick = function () {
  if (checkArr[0].test(registationForm[0].value) == true && checkArr[1].test(registationForm[1].value) == true && checkArr[2].test(registationForm[2].value) == true && checkArr[3].test(registationForm[3].value) == true) {
    let checkUser = users.some(user => user.login == registationForm[2].value)
    if (checkUser == false) {
      user = new User(registationForm[0].value,
        registationForm[1].value,
        registationForm[2].value,
        registationForm[3].value);

      floatContainers.forEach((element) => {
        element.querySelector('input').value = ""
        element.classList.remove('active')

      })
      if (localStorage.length > 0 && localStorage.getItem('user')) {
        users = JSON.parse(localStorage.getItem('user'))
        users.push(user)
      }
      else {
        users.push(user)
      }
      localStorage.setItem('users', JSON.stringify(users));
      console.log(users)
    }
    else {
      floatContainers[2].classList.add('error')
      document.querySelectorAll('.warning')[2].style.display = 'block'
      document.querySelectorAll('.warning')[2].innerHTML = 'User with this login already exists'
     }
  }
  else {
    floatContainers.forEach((element) => {
      if (element.querySelector('input').value == "") {
        [...form.elements].forEach(function (input, index, array) {
          if (input.value == "") {
            floatContainers[index].classList.add('error')
          }
        });
      }
    })
  }
}

getId('singInSrc').addEventListener('click',function(){
  getId('registration-block').style.display = 'none'
  getId('sing-in-block').style.display = 'block'
})

getId('singUpSrc').addEventListener('click',function(){
  getId('registration-block').style.display = 'block'
  getId('sing-in-block').style.display = 'none'
  document.querySelectorAll('.warning')[4].style.display = 'none'
  floatContainers.forEach((element) => {
    element.classList.remove('error')
  })
})

let singIn = document.forms['singIn']
getId('singUpBtn').onclick = function(){
  if(localStorage.length <= 0){
    document.querySelectorAll('.warning')[4].style.display = 'block'
    document.querySelectorAll('.warning')[4].innerHTML = 'Local storage is empty'
  }
  else{
    usersArr = JSON.parse(localStorage.getItem('users'))
    let checkUser = users.some(user=>user.login === singIn[0].value && user.password ===singIn[1].value)
    
    if(checkUser==true){
      let userIndex = usersArr.map(function(ind){return ind.login;}).indexOf(singIn[0].value)
      getId('sing-in-block').style.display = 'none'
      getId('user-block').style.display = 'flex'
      document.querySelectorAll('.name')[0].innerHTML = usersArr[userIndex].firstName
      document.querySelectorAll('.name')[1].innerHTML = usersArr[userIndex].secondName
      getId('user-email').innerHTML = usersArr[userIndex].login
     
    
      console.log(userIndex)
    }
   else{
    document.querySelectorAll('.warning')[4].style.display = 'block' 
    document.querySelectorAll('.warning')[4].innerHTML = 'Incorect login or password'
   }
    
  }
}

getId('singUpBtn2').onclick = function(){
  getId('user-block').style.display = 'none'
  getId('sing-in-block').style.display = 'block'
  singIn[0].value= ''
  singIn[1].value= ''
  document.querySelectorAll('.warning')[4].style.display = 'none'
  floatContainers.forEach((element) => {
    element.querySelector('input').value = ""
    element.classList.remove('active')

  })
  }



