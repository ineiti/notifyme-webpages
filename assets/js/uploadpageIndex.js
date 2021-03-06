import "materialize-css/js/cash.js";
import "materialize-css/js/global.js";
import "materialize-css/js/anime.min.js";
import "materialize-css/js/forms.js";
import "materialize-css/js/buttons.js";
import "materialize-css/js/waves.js";
import "materialize-css/js/toasts.js";
import { disableButton, enableButton, ready } from "./utils/utils";
import { rangePicker } from "./utils/rangePicker";

ready(() => console.log(`Commit: ${GIT_INFO}`));

const uploadData = async (button) => {
    if (button.classList.contains("disabled")) return;

    disableButton(button);

    const formData = new FormData(document.getElementById("upload-form"));
    const data = {
        from: formData.get("from"),
        to: formData.get("to"),
        note: formData.get("note"),
    };

    if (!formData.get("from") || !formData.get("to")) {
        if (!formData.get("from")) {
            document.querySelector("#from + input").classList.add("invalid");
        }
        if (!formData.get("to")) {
            document.querySelector("#to + input").classList.add("invalid");
        }
        enableButton(button);
        return;
    }

    data.from = Date.parse(data.from.trim().replace(" ", "T"));
    data.to = Date.parse(data.to.trim().replace(" ", "T"));

    const payload = window.location.hash.slice(1);
    if (!payload) {
        M.toast({
            html: window.currentLanguage.uploadMissingPayloadMessage,
            classes: "red lighten-2",
        });
        enableButton(button);
        return;
    }

    const postFormData = new FormData();
    postFormData.append("ctx", payload);
    postFormData.append("startTime", data.from);
    postFormData.append("endTime", data.to);
    postFormData.append("message", data.note);

    const response = await fetch(`${POST_URL}`, {
        method: "POST",
        body: postFormData,
    });
    console.log(response);

    if (response.ok) {
        M.toast({
            html: window.currentLanguage.uploadSuccessMessage,
            classes: "green lighten-2",
        });
        disableButton(button, false);
    } else {
        M.toast({
            html: window.currentLanguage.uploadErrorMessage,
            classes: "red lighten-2",
        });
        enableButton(button);
    }
};

ready(() => {
    const uploadButton = document.getElementById("upload-btn");
    uploadButton.onclick = () => {
        uploadData(uploadButton);
    };

    const fromInput = document.getElementById("from");
    const toInput = document.getElementById("to");

    rangePicker(fromInput, toInput, {
        prohibitFuture: true,
        maxRangeInHr: 24,
    });
});
