(() => {
  window.Page = {};

  for (const file of [
      './src/screens/books',
      './src/screens/home',
      './src/screens/aboutMe',
      './src/common/utils',
      './src/common/services',
      './src/common/general',
      './src/common/filters',
      './components/header',
    ]) {
      const script = document.createElement("script");
      script.setAttribute("src", `./${file}.js`);
      document.head.appendChild(script);
    }

    window.addEventListener('load', () => {
      Header();   
      window.main = document.createElement('main');
      document.body.appendChild(main);
      window.Page.home.Body();
      utils.CallLink('stylesheet','./src/styles/style.css');
      utils.CallLink('shortcut icon','./src/assets/book.ico');
    }
  )
})();