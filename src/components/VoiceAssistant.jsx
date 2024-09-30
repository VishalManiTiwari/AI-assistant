import React, { useState, useEffect } from "react";
import Button from "./Button";
import VoiceLogo from "./VoiceLogo";

const VoiceAssistant = () => {
  const [content, setContent] = useState("Click here to talk to me");
  const [isListening, setIsListening] = useState(false);
  const [speechRate, setSpeechRate] = useState(1);
  const [speechVolume, setSpeechVolume] = useState(1);
  const [recognition, setRecognition] = useState(null); 

  const speak = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.rate = speechRate;
    speech.pitch = 1;
    speech.volume = speechVolume;
    window.speechSynthesis.speak(speech);
  };

  const wishMe = () => {
    const hours = new Date().getHours();
    if (hours < 12) {
      speak("Good Morning Sir");
    } else if (hours < 16) {
      speak("Good Afternoon Sir");
    } else {
      speak("Good Evening Sir");
    }
  };

  useEffect(() => {
    wishMe();

    // Initialize SpeechRecognition inside useEffect
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setContent(transcript);
        takeCommand(transcript.toLowerCase());
      };

      setRecognition(recognitionInstance);
    } else {
      speak("Sorry, your browser doesn't support Speech Recognition.");
    }

    return () => {
      if (recognition) {
        recognition.stop(); 
      }
    };
  }, []); 

  const handleMicClick = () => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
    } else {
      speak("Sorry, Speech Recognition is not available.");
    }
  };

  const takeCommand = (message) => {
    setIsListening(false);

    if (message.includes("hello") || message.includes("hey")) {
      speak("Hello sir, what can I help you with?");
    } else if (message.includes("who are you") || message.includes("hu r u")) {
      speak("I Am Virtual Assistant Created By Vishal Mani Tiwari");
    } else if (
      message.includes("what can you do") ||
      message.includes("hu r u")
    ) {
      speak(
        "I can answer questions, assist with coding, suggest learning resources, provide project ideas, help with writing, offer tech support, and give personalized recommendations etc."
      );
    } else if (message.includes("weather in")) {
      const city = message.split("in")[1].trim();
      speak(`Fetching weather details for ${city}.`);
      getWeather(city);
    } 
    else if(message.includes("open whatsapp")){
      speak("Opening whatsapp..")
      window.open("whatsapp://")
     }
     else if(message.includes("open telegram")){
      speak("Opening telegram..")
      window.open("telegram://")
     }
    else if(message.includes("open calculator")){
      speak("Opening calculator....")
      window.open("calculator://")
     }
    else if (message.includes("what is your name") || message.includes("what's your name")) {
      speak("I am Kabira created by Vishal Mani Tiwari");
    }
    // New added commands
    else if (message.includes("motivate me") || message.includes("give me motivation")) {
      getMotivationalQuote();
    } else if (message.includes("math")) {
      calculateMath(message);
    } else if (message.includes("how are you")) {
      speak("I am just a program, but thanks for asking! How can I assist you?");
    } else if (message.includes("what is the time")) {
      const time = new Date().toLocaleString(undefined, {
        hour: "numeric",
        minute: "numeric",
      });
      speak(time);
    } else if (message.includes("day")) {
      const day = new Date().toLocaleString(undefined, {
        day: "numeric",
        month: "short",
      });
      speak(day);
    } else if (message.includes("set timer for")) {
      const minutes = parseInt(message.split("for")[1].trim());
      setTimer(minutes);
    } else if (message.includes("open youtube")) {
      speak("Opening YouTube");
      window.open("https://www.youtube.com/");
    } else if (message.includes("open google")) {
      speak("Opening Google");
      window.open("https://www.google.co.in/");
    } else if (message.includes("open chatgpt") || message.includes("open GPT")) {
      speak("Opening ChatGPT");
      window.open("https://chatgpt.com/");
    } else if (message.includes("open github")) {
      speak("Opening GitHub");
      window.open("https://github.com/VishalManiTiwari");
    } else if (message.includes("tell me a joke")) {
      speak("Let me think of a good one...");
      tellJoke();
    } else if (message.includes("news") || message.includes("headlines")) {
      speak("Fetching the latest news for you.");
      getNews();
    } else {
      speak(`Searching for ${message} on Google.`);
      window.open(`https://www.google.co.in/search?q=${message}`);
    }
  };

  const setTimer = (minutes) => {
    speak(`Setting a timer for ${minutes} minutes.`);
    setTimeout(() => {
      speak(`Your ${minutes} minutes timer is up.`);
    }, minutes * 60000);
  };

  // Weather
  const getWeather = async (city) => {
    const apiKey = "e556bf87dde9220b7411726454a0a195";
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      const data = await response.json();
      
      if (data.main) {
        const temp = data.main.temp;
        const weatherDescription = data.weather[0].description;
        const windSpeed = data.wind.speed;
        const cloudiness = data.clouds.all;
        const isRaining = data.weather.some(weather => weather.main.toLowerCase() === "rain");
  
        let weatherReport = `Current temperature in ${city} is ${temp} degree Celsius with ${weatherDescription}. `;
        weatherReport += `The wind speed is ${windSpeed} meters per second. `;
        weatherReport += `It is ${cloudiness}% cloudy. `;
        
        if (isRaining) {
          weatherReport += "It is currently raining.";
        } else {
          weatherReport += "There is no rain at the moment.";
        }
  
        speak(weatherReport);
      } else {
        speak("Sorry, I couldn't find the weather information.");
      }
    } catch (error) {
      speak("Sorry, I couldn't fetch the weather for you.");
    }
  };

  // Jokes
  const tellJoke = async () => {
    try {
      const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );
      const data = await response.json();
      speak(`${data.setup} ... ${data.punchline}`);
    } catch (error) {
      speak("I couldn't fetch a joke for you at the moment.");
    }
  };

  // Fetch motivational quote
  const getMotivationalQuote = async () => {
    try {
      const response = await fetch("https://type.fit/api/quotes");
      const data = await response.json();
      const randomQuote = data[Math.floor(Math.random() * data.length)];
      speak(randomQuote.text);
    } catch (error) {
      speak("I couldn't fetch a motivational quote for you at the moment.");
    }
  };

  // Perform basic math calculations
  const calculateMath = (message) => {
    try {
      const equation = message.replace("math", "").trim();
      const result = eval(equation);
      speak(`The result of ${equation} is ${result}`);
    } catch (error) {
      speak("Sorry, I couldn't calculate that.");
    }
  };

  // News
  const getNews = async () => {
    const apiKey = "f321b7d25a924932a5f95d3c597cdfd6";
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.articles && data.articles.length > 0) {
        const headlines = data.articles
          .slice(0, 5)
          .map((article) => article.title)
          .join(". ");
        speak(`Here are the top 5 news headlines: ${headlines}`);
      } else {
        speak("Sorry, I couldn't find any news articles.");
      }
    } catch (error) {
      console.error("Error fetching the news:", error);
      speak("Sorry, I couldn't fetch the news for you.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      {isListening ? (
        <VoiceLogo />
      ) : (
        <Button
          content={content}
          handleClick={handleMicClick}
          isListening={isListening}
        />
      )}
      
    </div>
  );
};

export default VoiceAssistant;
