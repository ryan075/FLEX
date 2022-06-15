const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const message = document.getElementById("message");
const output = document.getElementById("result");
const image1 = document.getElementById("image1");

startRecognition = () => {
  if (SpeechRecognition !== undefined) { // test if speechrecognitio is supported
    let recognition = new SpeechRecognition();
    recognition.lang = 'nl-NL'; // which language is used?
    recognition.interimResults = false; // https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/interimResults
    recognition.continuous = false; // https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/continuous
   
    recognition.onstart = () => {
      message.innerHTML = `Starting listening, speak in the microphone please<br>Say "help me" for help`;
      output.classList.add("hide"); // hide the output
    };

    recognition.onspeechend = () => {
      message.innerHTML = `I stopped listening `;
      recognition.stop();
    };

    recognition.onresult = (result) => {
      let transcript = result.results[0][0].transcript;
      let confidenceTranscript= Math.floor(result.results[0][0].confidence * 100); // calc. 'confidence'
      output.classList.remove("hide"); // show the output
      output.innerHTML = `I'm ${confidenceTranscript}% certain you just said: <b>${transcript}</b>`;
      actionSpeech(transcript);
    };

    recognition.start();
  } 
  else {  // speechrecognition is not supported
    message.innerHTML = "sorry speech to text is not supported in this browser";
  }
};

// process speech results
actionSpeech = (speechText) => {
  speechText = speechText.toLowerCase().trim(); // trim spaces + to lower case
  console.log(speechText); // debug 
  switch(speechText){ 
    // switch evaluates using stric comparison, ===
    case "zwart":
      document.body.style.background = "#000000";
      document.body.style.color="#FFFFFF";
      break;
    case  "herstel":
      document.body.style.background = "#ffe6ab";
      document.body.style.color="#000000";
      image1.classList.add("hide"); // hide image (if any)
      break;
    case "Volgende pagina":
      window.open("https://www.ma-web.nl/", "_self");
      break;
    case "help me":
      alert("Valid speech commands: zwart, ryan, oculus, quest, herstel, Volgende pagina");
      break;
    case "kelvin":
      window.open("https://www.linkedin.com/in/calvin-heeres-797951240/", "_self");
      break;
    case "oculus":
      window.open("https://store.facebook.com/nl/quest/products/quest-2/", "_self");
      break;
    case "image": // let op, "fall-through"
    case "quest": // let op, "fall-through"
      image1.src = "./img/Quest.webp";
      image1.classList.remove("hide") // show image
      break;
    default:
      // do nothing yet
  }
}