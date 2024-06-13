// WebSpeechAPI.ts

let recognition: SpeechRecognition | null = null;
let lastResult: SpeechRecognitionResult | null = null;

// Function to synthesize speech from text
function Synth(): void {
    const synth = window.speechSynthesis;
    const textField = document.getElementById('text-field') as HTMLParagraphElement;
    const utterance = new SpeechSynthesisUtterance(textField.innerText);

    synth.speak(utterance);
}

// Function to recognize speech
function Recognize(): void {
    if (!recognition) {
        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event) => {
            console.log("onresult triggered");
            console.log(event);
            const transcript = event.results[0][0].transcript;
            console.log(transcript);
            const recognizedText = document.getElementById('recognized-text') as HTMLParagraphElement;
            console.log(recognizedText);
            recognizedText.innerText = transcript;

            lastResult = event.results[0]; // Store the last result
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
        };

        recognition.onspeechend = () => {
            console.log('Speech has stopped being detected.');
            recognition!.stop();
        };

        recognition.onend = () => {
            console.log('Recognition service disconnected.');
            if (lastResult) {
                // Ensure the last recognized text is displayed
                const transcript = lastResult[0].transcript;
                const recognizedText = document.getElementById('recognized-text') as HTMLParagraphElement;
                recognizedText.innerText = transcript;
            }
            recognition = null;
        };
    }

    recognition.start();
}

// Function to stop recognizing speech
function StopRecognize(): void {
    if (recognition) {
        recognition.stop();
    }
}

// Adding event listeners to buttons
window.onload = () => {
    const synthesizeBtn = document.getElementById('synthesize-btn') as HTMLButtonElement;
    const recognizeBtn = document.getElementById('recognize-btn') as HTMLButtonElement;
    const stopRecognizeBtn = document.getElementById('stop-recognition-btn') as HTMLButtonElement;

    synthesizeBtn.onclick = Synth;
    recognizeBtn.onclick = Recognize;
    stopRecognizeBtn.onclick = StopRecognize;
};
