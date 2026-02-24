import { AppController } from './controllers/appController.js';
import { Header } from './components/header.js';
import { Footer } from './components/footer.js';

document.addEventListener('DOMContentLoaded', () => {
    
    document.getElementById('header').innerHTML = Header.render();
    
    Header.setup();
    
    document.getElementById('footer').innerHTML = Footer.render();

    
    AppController.start();
});
