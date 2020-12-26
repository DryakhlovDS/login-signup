const isToken = 'myLoginToken';

function getToken(res){
  const isLogin = res.config.url.includes('login');
  if (isLogin){
    const token = res.data.token;
    localStorage.setItem(isToken, token);
  }
  
return res;
}

function clearResponse(res){
return res.data;
}

function onError(error){
  return Promise.reject(error);
}

function setToken(req){
  const isAuth = req.url.includes('auth');
  if (isAuth) return req; 
  const token = localStorage.getItem(isToken);
  req.headers['x-access-token'] = token;
  return req;
}


export default function(axios){
  axios.interceptors.request.use(setToken);
  axios.interceptors.response.use(getToken);
  axios.interceptors.response.use(clearResponse, onError);
}