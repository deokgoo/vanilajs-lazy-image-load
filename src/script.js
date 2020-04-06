const API_URL = 'https://movie-nodejs.herokuapp.com';
const API_ID = 'deok';

const sendApi = (method, url, token = null) => {
  let xhr = new XMLHttpRequest();

  return new Promise((resolve, reject) => {
    xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
        resolve(this.responseText);
      }

    });
    xhr.open(method, url);
    xhr.setRequestHeader("Authorization", token?`Bearer ${token}`:"Basic ZGVvazpkZW9r");
    xhr.send();
  })
}

const getToken = async () => {
  const url = `${API_URL}/auth/login`;
  try {
    const res = await sendApi('POST', url);
    return res;
  }catch(e) {
    console.log(e);
  }
}

const getMovieRanking = async (token) => {
  const url = `${API_URL}/api/rank`;
  try {
    const res = await sendApi('GET', url, token);
    return res;
  }catch(e) {
    console.log(e);
  }
}

const io = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(!entry.isIntersecting) return;

    const target = entry.target;
    const { img_uri } = target.querySelector('.info').dataset;
    target.querySelector('.info').style.backgroundImage = `url(${img_uri})`;

    observer.unobserve(target);
  
  })
})