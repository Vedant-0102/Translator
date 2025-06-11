import React, { useState, useEffect } from 'react';
import { Volume2, Copy, ArrowLeftRight, Languages, Sparkles } from 'lucide-react';
import './App.css';

const countries = {
  "am-ET": "Amharic",
  "ar-SA": "Arabic",
  "be-BY": "Bielarus",
  "bem-ZM": "Bemba",
  "bi-VU": "Bislama",
  "bjs-BB": "Bajan",
  "bn-IN": "Bengali",
  "bo-CN": "Tibetan",
  "br-FR": "Breton",
  "bs-BA": "Bosnian",
  "ca-ES": "Catalan",
  "cop-EG": "Coptic",
  "cs-CZ": "Czech",
  "cy-GB": "Welsh",
  "da-DK": "Danish",
  "dz-BT": "Dzongkha",
  "de-DE": "German",
  "dv-MV": "Maldivian",
  "el-GR": "Greek",
  "en-GB": "English",
  "es-ES": "Spanish",
  "et-EE": "Estonian",
  "eu-ES": "Basque",
  "fa-IR": "Persian",
  "fi-FI": "Finnish",
  "fn-FNG": "Fanagalo",
  "fo-FO": "Faroese",
  "fr-FR": "French",
  "gl-ES": "Galician",
  "gu-IN": "Gujarati",
  "ha-NE": "Hausa",
  "he-IL": "Hebrew",
  "hi-IN": "Hindi",
  "hr-HR": "Croatian",
  "hu-HU": "Hungarian",
  "id-ID": "Indonesian",
  "is-IS": "Icelandic",
  "it-IT": "Italian",
  "ja-JP": "Japanese",
  "kk-KZ": "Kazakh",
  "km-KM": "Khmer",
  "kn-IN": "Kannada",
  "ko-KR": "Korean",
  "ku-TR": "Kurdish",
  "ky-KG": "Kyrgyz",
  "la-VA": "Latin",
  "lo-LA": "Lao",
  "lv-LV": "Latvian",
  "men-SL": "Mende",
  "mg-MG": "Malagasy",
  "mi-NZ": "Maori",
  "ms-MY": "Malay",
  "mt-MT": "Maltese",
  "my-MM": "Burmese",
  "ne-NP": "Nepali",
  "niu-NU": "Niuean",
  "nl-NL": "Dutch",
  "no-NO": "Norwegian",
  "ny-MW": "Nyanja",
  "ur-PK": "Pakistani",
  "pau-PW": "Palauan",
  "pa-IN": "Panjabi",
  "ps-PK": "Pashto",
  "pis-SB": "Pijin",
  "pl-PL": "Polish",
  "pt-PT": "Portuguese",
  "rn-BI": "Kirundi",
  "ro-RO": "Romanian",
  "ru-RU": "Russian",
  "sg-CF": "Sango",
  "si-LK": "Sinhala",
  "sk-SK": "Slovak",
  "sm-WS": "Samoan",
  "sn-ZW": "Shona",
  "so-SO": "Somali",
  "sq-AL": "Albanian",
  "sr-RS": "Serbian",
  "sv-SE": "Swedish",
  "sw-SZ": "Swahili",
  "ta-LK": "Tamil",
  "te-IN": "Telugu",
  "tet-TL": "Tetum",
  "tg-TJ": "Tajik",
  "th-TH": "Thai",
  "ti-TI": "Tigrinya",
  "tk-TM": "Turkmen",
  "tl-PH": "Tagalog",
  "tn-BW": "Tswana",
  "to-TO": "Tongan",
  "tr-TR": "Turkish",
  "uk-UA": "Ukrainian",
  "uz-UZ": "Uzbek",
  "vi-VN": "Vietnamese",
  "wo-SN": "Wolof",
  "xh-ZA": "Xhosa",
  "yi-YD": "Yiddish",
  "zu-ZA": "Zulu"
};

function App() {
  const [fromText, setFromText] = useState('');
  const [toText, setToText] = useState('');
  const [fromLang, setFromLang] = useState('en-GB');
  const [toLang, setToLang] = useState('de-DE');
  const [isTranslating, setIsTranslating] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState('');

  useEffect(() => {
    if (!fromText.trim()) {
      setToText('');
    }
  }, [fromText]);

  const handleExchange = () => {
    const tempText = fromText;
    const tempLang = fromLang;
    
    setFromText(toText);
    setToText(tempText);
    setFromLang(toLang);
    setToLang(tempLang);
  };

  const handleTranslate = async () => {
    const text = fromText.trim();
    if (!text) return;

    setIsTranslating(true);
    try {
      const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${fromLang}|${toLang}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      let translatedText = data.responseData.translatedText;
            
      if (data.matches && data.matches.length > 0) {
        const bestMatch = data.matches.find(match => match.id === 0);
        if (bestMatch) {
          translatedText = bestMatch.translation;
        }
      }
      
      setToText(translatedText);
    } catch (error) {
      console.error('Translation error:', error);
      setToText('Translation failed. Please try again.');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleCopy = async (text, type) => {
    if (!text) return;
    
    try {
      await navigator.clipboard.writeText(text);
      setCopyFeedback(`${type} copied!`);
      setTimeout(() => setCopyFeedback(''), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  const handleSpeak = (text, lang) => {
    if (!text) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="app">
      <div className="background-gradient"></div>
      <div className="container">
        <div className="header">
          <div className="logo">
            <Languages className="logo-icon" />
            <h1>Translator</h1>
          </div>
        </div>

        <div className="translator-wrapper">
          <div className="text-areas">
            <div className="text-section from-section">
              <div className="section-header">
                <select 
                  value={fromLang} 
                  onChange={(e) => setFromLang(e.target.value)}
                  className="language-select"
                >
                  {Object.entries(countries).map(([code, name]) => (
                    <option key={code} value={code}>{name}</option>
                  ))}
                </select>
                <div className="action-buttons">
                  <button 
                    onClick={() => handleSpeak(fromText, fromLang)}
                    className="action-btn"
                    disabled={!fromText}
                  >
                    <Volume2 size={18} />
                  </button>
                  <button 
                    onClick={() => handleCopy(fromText, 'Source text')}
                    className="action-btn"
                    disabled={!fromText}
                  >
                    <Copy size={18} />
                  </button>
                </div>
              </div>
              <textarea
                value={fromText}
                onChange={(e) => setFromText(e.target.value)}
                placeholder="Enter text to translate..."
                className="text-input"
                rows="8"
              />
            </div>

            <div className="exchange-container">
              <button onClick={handleExchange} className="exchange-btn">
                <ArrowLeftRight size={24} />
              </button>
            </div>

            <div className="text-section to-section">
              <div className="section-header">
                <select 
                  value={toLang} 
                  onChange={(e) => setToLang(e.target.value)}
                  className="language-select"
                >
                  {Object.entries(countries).map(([code, name]) => (
                    <option key={code} value={code}>{name}</option>
                  ))}
                </select>
                <div className="action-buttons">
                  <button 
                    onClick={() => handleSpeak(toText, toLang)}
                    className="action-btn"
                    disabled={!toText}
                  >
                    <Volume2 size={18} />
                  </button>
                  <button 
                    onClick={() => handleCopy(toText, 'Translation')}
                    className="action-btn"
                    disabled={!toText}
                  >
                    <Copy size={18} />
                  </button>
                </div>
              </div>
              <textarea
                value={toText}
                readOnly
                placeholder={isTranslating ? "Translating..." : "Translation will appear here..."}
                className="text-input translation-output"
                rows="8"
              />
            </div>
          </div>

          <button 
            onClick={handleTranslate}
            disabled={!fromText.trim() || isTranslating}
            className="translate-btn"
          >
            {isTranslating ? (
              <div className="loading-spinner"></div>
            ) : (
              <Languages size={20} />
            )}
            {isTranslating ? 'Translating...' : 'Translate Text'}
          </button>
        </div>

        {copyFeedback && (
          <div className="copy-feedback">
            {copyFeedback}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
