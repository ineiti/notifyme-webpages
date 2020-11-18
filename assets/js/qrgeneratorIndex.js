import 'materialize-css/js/cash.js';
import 'materialize-css/js/global.js';
import 'materialize-css/js/anime.min.js';
import 'materialize-css/js/dropdown.js';
import 'materialize-css/js/forms.js';
import 'materialize-css/js/select.js';
import 'materialize-css/js/buttons.js';
import 'materialize-css/js/waves.js';
import { initializeQrGenerator } from "./qrgenerator/qrgenerator";

const ready = (fn) => {
    if (document.readyState != 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

ready(() => {
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
});

ready(initializeQrGenerator);