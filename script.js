let mode="text";

const textBtn = document.getElementById("TextBtn");
const speechBtn = document.getElementById("SpeechBtn");
const convertBtn = document.getElementById("ConvertBtn");
const textarea = document.getElementById("textInput");


/* ---------- MODE SWITCH ---------- */

textBtn.addEventListener("click", () => {
    mode="text";
    textBtn.classList.add("active");
    speechBtn.classList.remove("active");
});

speechBtn.addEventListener("click", () => {
    mode = "speech";
    speechBtn.classList.add("active");
    textBtn.classList.remove("active");
});

/* ---------- CONVERT BUTTON ---------- */

convertBtn.addEventListener("click", () => {

    if (mode === "text") {
        // TEXT → SPEECH
        if (textarea.value.trim() === "") {
            alert("Please enter text");
            return;
        }

        const utterance = new SpeechSynthesisUtterance(textarea.value);
        speechSynthesis.speak(utterance);

    } else {
        // SPEECH → TEXT
        startSpeechRecognition();
    }
});

/* ---------- SPEECH TO TEXT ---------- */

function startSpeechRecognition() {

    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Speech Recognition not supported in this browser");
        return;
    }

    const recognition = new SpeechRecognition(); 
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = (event) => {
        textarea.value = event.results[0][0].transcript;
    };
}