const req = new XMLHttpRequest();
req.open('GET', 'https://restcountries.com/v3.1/all');
req.send();
req.onload = () => {
  if ((req.status = 200)) {
    let res = JSON.parse(req.response);
    res.map((data) => {
      console.log(data);
    });
  } else {
    console.log('ERR');
  }
};
