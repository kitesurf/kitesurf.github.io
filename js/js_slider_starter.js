console.clear();
const response = fetch('https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.2/min/tiny-slider.js');
response.then((result) => result.text()).then(text => {
  
  const script = document.createElement('script');
  script.innerHTML = text;
  document.body.append(script);
  
tns({
    container: '#js_slider',
    items: 1,
    autoplay: true,
    autoWidth: true
    lazyload: false,
    nav: false,
  });
  
});
