import React, {useState} from 'react';
import {Link, navigate} from "gatsby";
import {StaticImage} from "gatsby-plugin-image"
import '../../styles/global.css';
import {MP3Alternate} from "../../components/Alternate";

const YouTubeToMP3 = () => {
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState("test");
  const [selectedLanguage, setSelectedLanguage] = useState("hi");
  const [openLanguage, setOpenLanguage] = useState(false);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setOpenLanguage(!openLanguage)
  };

  const isYtUrl = (url) => {
    const ytRegex = new RegExp(
      /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\\-]+\?v=|embed\/|v\/)?)([\w\\-]+)(\S+)?$/g
    );
    return ytRegex.test(url)
  };

  const handleSuggestion = async (value) => {
    try {
      const response = await fetch(`https://corsproxy.io/?https://suggestqueries.google.com/complete/search?hl=en&ds=yt&client=youtube&hjson=t&cp=1&&q=${value}`);
      const json = await response.json();
      const beautifiedArray = json.map(item => {
        if (typeof item === 'string') {
          return item;
        } else if (Array.isArray(item)) {
          const characterValues = item.map(subItem => subItem[0]);
          return characterValues;
        } else {
          return Object.values(item);
        }
      });
      setSuggestions(beautifiedArray[1])
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
    handleSuggestion(e.target.value)
  };

  const handleSuggestionClick = (e) => {
    const value = e?.target?.textContent
    navigate("/search", {state: {url: value}});
  }

  const handleClickEnter = (e) => {
    if (e.keyCode === 13) {
      if (isYtUrl(inputValue)) {
        navigate("/download", {state: {url: inputValue}});
      } else {
        navigate("/search", {state: {url: inputValue}});
      }
    }
  };

  const handleClickConvert = () => {
    if (isYtUrl(inputValue)) {
      navigate("/download", {state: {url: inputValue}});
    } else {
      navigate("/search", {state: {url: inputValue}});
    }
  };

  const languageOptions = [
    {lang: "en", label: "English", path: "/youtube-to-mp3/"},
    {lang: "de", label: "Deutsch", path: "/de/youtube-to-mp3/"},
    {lang: "es", label: "Español", path: "/es/youtube-to-mp3/"},
    {lang: "fr", label: "Français", path: "/fr/youtube-to-mp3/"},
    {lang: "hi", label: "हिन्दी / Hindi", path: "/hi/youtube-to-mp3/"},
    {lang: "id", label: "Indonesian", path: "/id/youtube-to-mp3/"},
    {lang: "it", label: "Italiano", path: "/it/youtube-to-mp3/"},
    {lang: "ja", label: "ह日本語", path: "/ja/youtube-to-mp3/"},
    {lang: "ko", label: "한국어", path: "/ko/youtube-to-mp3/"},
    {lang: "my", label: "Myanmar (မြန်မာ)", path: "/my/youtube-to-mp3/"},
    {lang: "ms", label: "Malay", path: "/ms/youtube-to-mp3/"},
    {lang: "ph", label: "Filipino", path: "/tl-ph/youtube-to-mp3/"},
    {lang: "pt", label: "Português", path: "/pt/youtube-to-mp3/"},
    {lang: "ru", label: "Русский", path: "/ru/youtube-to-mp3/"},
    {lang: "th", label: "ไทย", path: "/th/youtube-to-mp3/"},
    {lang: "tr", label: "Türkçe", path: "/tr/youtube-to-mp3/"},
    {lang: "vi", label: "Tiếng Việt", path: "/vi/youtube-to-mp3/"},
    {lang: "zh-cn", label: "简体中文", path: "/zh-cn/youtube-to-mp3/"},
    {lang: "zh-tw", label: "繁體中文", path: "/zh-tw/youtube-to-mp3/"},
    {lang: "ar", label: "عربي", path: "/ar/youtube-to-mp3/"},
    {lang: "bn", label: "বাঙালি", path: "/bn/youtube-to-mp3/"},
  ];

  return (
    <>
      <div className="mx-auto md:max-w-[890px] px-3 md:px-0">
        <header className="h-[66px] flex items-center top-0">
          <div className="container mx-auto">
            <div className="flex justify-between items-center">
              <div className="md:flex lg:w-0 lg:flex-1">
                <Link to="/hi/" className="md:inline-flex flex items-center">
                  <StaticImage src="../../images/logo.png" placeholder="none" alt="y2mate" width={46} quality={80}/>
                  <h1 className="text-2xl font-semibold w-auto z-50 pl-2 hover:text-primary">Y2mate</h1>
                </Link>
              </div>
              <div className="md:hidden">
                <button
                  onClick={() => setOpen(!open)}
                  aria-label="Toggle Menu"
                  type="button"
                  className="inline-flex border-primary items-center justify-center border border-solid py-1 px-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                >
                  <StaticImage src="../../images/mobile.svg" placeholder="none" alt="menu" width={25} quality={80}/>
                </button>
              </div>
              <nav className="hidden md:flex">
                <Link
                  className="text-sm py-[23px] px-[15px] hover:text-primary"
                  to="/hi/">
                  YouTube Downloader
                </Link>
                <Link
                  className="text-sm py-[23px] px-[15px] hover:text-primary"
                  to="/hi/youtube-to-mp4/">
                  YouTube to MP4 Converter
                </Link>
                <Link
                  className="text-sm py-[23px] px-[15px] hover:text-primary"
                  to="/hi/youtube-to-mp3/">
                  YouTube to MP3 Converter
                </Link>
                <button onClick={() => setOpenLanguage(!openLanguage)}
                        className="relative text-sm py-[23px] px-[15px] hover:text-primary">
                  {languageOptions.find((option) => option.lang === selectedLanguage)?.label || "Language"}
                  <span className="lang-border"></span>
                  {openLanguage &&
                    <div
                      className="absolute right-0 mt-6 py-2 z-10 w-40 bg-white rounded-md border-[#00000026] border border-solid shadow-lg">
                      {languageOptions.map((option) => (
                        <Link
                          key={option.lang}
                          to={option.path}
                          className="block px-4 py-1 text-start text-gray-800 hover:bg-gray-200"
                          onClick={() => handleLanguageChange(option.lang)}
                        >
                          {option.label}
                        </Link>
                      ))}
                    </div>
                  }
                </button>
              </nav>
            </div>
          </div>
          <div
            className="absolute top-16 inset-x-0 transition transform origin-top-right md:!hidden z-20"
            style={{display: open ? "block" : "none"}}>
            <div className="shadow-lg">
              <div className="shadow-xs bg-white divide-y-2 divide-gray-50">
                <div className="pt-5 pb-6 px-5 space-y-6">
                  <div>
                    <nav className="grid gap-y-4">
                      <Link
                        className="-m-3 p-3 flex items-center hover:text-primary transition duration-300"
                        to="/hi/">
                        YouTube Downloader
                      </Link>
                      <Link
                        className="-m-3 p-3 flex items-center hover:text-primary transition duration-300"
                        to="/hi/youtube-to-mp4/">
                        YouTube to MP4 Converter
                      </Link>
                      <Link
                        className="-m-3 p-3 flex items-center hover:text-primary transition duration-300"
                        to="/hi/youtube-to-mp3/">
                        YouTube to MP3 Converter
                      </Link>
                      <div className="relative">
                        <button
                          className="-m-3 p-3 flex items-center hover:text-primary transition duration-300"
                          onClick={() => setOpenLanguage(!openLanguage)}>
                          {languageOptions.find((option) => option.lang === selectedLanguage)?.label || "Language"}
                          <span className="lang-border"></span>
                        </button>
                        {openLanguage &&
                          <div className="absolute mt-2 py-2 w-40 bg-white rounded-md shadow-lg">
                            {languageOptions.map((option) => (
                              <Link
                                key={option.lang}
                                to={option.path}
                                className="block px-4 py-0.5 text-gray-800 hover:bg-gray-200"
                                onClick={() => handleLanguageChange(option.lang)}
                              >
                                {option.label}
                              </Link>
                            ))}
                          </div>
                        }
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <section
          className="bg-white p-[15px] border border-solid rounded border-current !border-[#dddddd] container mx-auto">
          <div className="md:py-[30px] py-7 text-center">
            <h1 className="mb-2.5 md:text-[34px] leading-snug text-2xl font-medium">YouTube से MP3 कन्वर्टर</h1>
            <div className="relative m-auto my-[24px]	md:my-[43px] md:w-[600px]">
              <input
                type="text"
                className="block md:text-base	text-sm w-full px-4 font-[revert] h-[60px] border-[5px] !outline-none border-solid rounded border-[#ff0068]"
                placeholder="लिंक यहां खोजें या पेस्ट करें..."
                onChange={handleInputChange}
                onKeyDown={handleClickEnter}
              />
              <button
                className="md:px-4 rounded-r absolute top-0 right-0 font-[arial] text-sm md:w-[120px] w-[60px] h-[60px] -ml-1 text-white bg-button"
                onClick={handleClickConvert}>
                <span className="hidden md:contents">शुरू</span>
                <StaticImage className="mt-1" src="../../images/left-arrow.svg" placeholder="none" alt="y2mate"/>
              </button>
              {suggestions?.length ?
                <ul
                  className="absolute w-full bg-white text-black text-left z-50 border border-[#d3e0e9] shadow py-1.5">
                  {suggestions.map((suggestion, index) => (
                    <li aria-hidden="true" className="cursor-pointer px-2.5 hover:font-bold hover:bg-[#f0f0f0]"
                        key={index}
                        onClick={handleSuggestionClick}>{suggestion}</li>
                  ))}
                </ul> : ''
              }
              <p className="text-xs md:text-sm text-[#666] leading-snug p-1.5">
                हमारी सेवा का उपयोग करके आप हमारी
                <Link className="text-[#c10841]" to="/terms-condition/">&nbsp;उपयोग की शर्तों को स्वीकार कर रहे
                  हैं।</Link>
              </p>
            </div>
          </div>
        </section>
        <section className="py-[25px] md:py-[30px] text-center leading-snug">
          <h2 className="text-[26px] font-bold py-2.5">YouTube को MP3 में बदलें</h2>
          <h4 className="my-2.5 text-lg leading-snug">
            Y2mate सबसे अच्छा और सबसे तेज़ Youtube to mp3 कन्वर्टर टूल है। हमारा YouTube to mp3 टूल आपको किसी भी
            सॉफ़्टवेयर को इंस्टॉल किए बिना youtube वीडियो को youtube से उच्च गुणवत्ता में बदलने और डाउनलोड करने की
            अनुमति देता है। Y2mate टैबलेट, डेस्कटॉप और मोबाइल उपकरणों पर आसानी से काम करता है।
          </h4>
          <h4 className="my-2.5 text-lg leading-snug">
            इस YouTube से Mp3 कनवर्टर के साथ, अलग-अलग गुणवत्ता और बिटरेट जैसे 64kbps, 128kbps, 192kbps, और 320kbps तक के
            Youtube से MP3 डाउनलोड करना आसान है, इसलिए आप ऑफ़लाइन रहते हुए भी जब चाहें एमपी3 संगीत सुन सकते हैं।
          </h4>
        </section>
        <hr className="md: w-5/6 h-px mx-auto bg-gray-200 border-0 rounded dark:bg-gray-700"/>
        <section className="py-[30px] md:flex block justify-between">
          <div className="md:w-[60%] md:px-[15px]">
            <h5 className="text-lg my-1.5 font-normal"><strong>Y2mate के साथ YouTube वीडियो को MP3 में कैसे
              बदलें</strong></h5>
            <ol className="m-0 pl-4 list-decimal">
              <li className="mb-2.5 text-[17px]">YouTube खोलें और उस YouTube वीडियो url को कॉपी करें जिसे आप कनवर्ट करना
                चाहते हैं
              </li>
              <li className="mb-2.5 text-[17px]">YouTube url को खोज बॉक्स में डालें</li>
              <li className="mb-2.5 text-[17px]">MP3 गुणवत्ता का चयन करें और "डाउनलोड" बटन पर क्लिक करें</li>
              <li className="mb-2.5 text-[17px]">रूपांतरण प्रक्रिया पूरी होने तक प्रतीक्षा करें और ऑडियो फ़ाइल डाउनलोड
                करें।
              </li>
            </ol>
          </div>
          <div className="md:w-[40%] md:px-[15px]">
            <h5 className="text-lg my-1.5 font-normal"><strong>Y2mate फ़ीचर</strong></h5>
            <ol className="m-0 pl-4 list-disc">
              <li className="mb-2.5 text-[17px]">पूरी तरह से नि: शुल्क और असीमित उपयोग</li>
              <li className="mb-2.5 text-[17px]">कोई पंजीकरण या कोई एप्लिकेशन इंस्टॉल करने की आवश्यकता नहीं है</li>
              <li className="mb-2.5 text-[17px]">पूरी तरह से सुरक्षित और सुरक्षित कनवर्टर</li>
              <li className="mb-2.5 text-[17px]">64kbps, 128kbps, 192kbps, 256kbps और 320kbps जैसे कई उच्च गुणवत्ता वाले
                ऑडियो का समर्थन किया।
              </li>
            </ol>
          </div>
        </section>
        <hr className="md: w-5/6 h-px mx-auto bg-gray-200 border-0 rounded dark:bg-gray-700"/>
        <section className="py-[25px] md:py-[30px] md:flex">
          <div className="md:w-1/3 text-center">
            <StaticImage src="../../images/gift.svg" placeholder="none" alt="y2mateGift" quality={50}/>
            <h3 className="text-primary text-[22px] font-bold mb-2 mt-[22px]">नि: शुल्क और प्रयोग करने में आसान</h3>
            <p className="mb-2.5">कुछ ही क्लिक के साथ यूट्यूब वीडियो को मुफ्त में एमपी3 में कनवर्ट करें और सेव करें, बस
              यूट्यूब यूआरएल पेस्ट करें और 'स्टार्ट' बटन पर क्लिक करें।</p>
          </div>
          <div className="md:w-1/3 text-center">
            <StaticImage src="../../images/video.svg" placeholder="none" alt="y2mateSupport" quality={50}/>
            <h3 className="text-primary text-[22px] font-bold mb-2 mt-[22px]">सभी डिवाइस अनुकूलता</h3>
            <p className="mb-2.5">Y2mate कनवर्टर मोबाइल, पीसी, एंड्रॉइड और आईओएस पर पूरी तरह से चलने वाले सभी प्रकार के
              उपकरणों के लिए उत्तरदायी और संगत है। सभी ब्राउज़रों के साथ भी काम करता है।</p>
          </div>
          <div className="md:w-1/3 text-center">
            <StaticImage src="../../images/download.svg" placeholder="none" alt="y2mateDownload" quality={50}/>
            <h3 className="text-primary text-[22px] font-bold mb-2 mt-[22px]">तेजी से डाउनलोड बिना किसी सीमा के</h3>
            <p className="mb-2.5">YouTube को Mp3 में बिना किसी सीमा के कन्वर्ट और डाउनलोड करें जितना आप चाहते हैं। कोई
              सुविधा प्रतिबंध लागू नहीं होता है।</p>
          </div>
        </section>
        <hr className="md: w-5/6 h-px mx-auto bg-gray-200 border-0 rounded dark:bg-gray-700"/>
        <section className="py-[30px]">
          <p className="max-w-full mb-2.5">Youtube.com url से पहले कीवर्ड <b>“Y2mate”</b> डालें और एंटर बटन दबाएं - यह
            आपको YouTube से एमपी3 तेजी से डाउनलोड करने की अनुमति देगा।</p>
          <p className="max-w-full mb-0.5">यहाँ एक उदाहरण है - youtube.com/watch?v=abc75hj =>
            y2mateyoutube.com/watch?v=abc75hj वह प्रारूप चुनें जिसे आप डाउनलोड करना चाहते हैं और फिर डाउनलोड बटन पर
            क्लिक करें</p>
        </section>
      </div>
      <footer>
        <div className="py-[20px] text-sm text-center border-solid border-y border-inherit">
          <p className="mb-5 text-center max-w-full">@2023 Y2mate</p>
          <ul className="flex justify-center">
            <li><Link className="mx-2" to="/about-us/">About</Link></li>
            <li><Link className="mx-2" to="/contact/">Contact</Link></li>
            <li><Link className="mx-2" to="/terms-condition/">Terms of Service</Link></li>
            <li><Link className="mx-2" to="/privacy-policy/">Privacy Policy</Link></li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default YouTubeToMP3;

export const Head = () => (
  <>
    <html lang="hi"/>
    <title>YouTube से MP3 कन्वर्टर</title>
    <meta
      name="description"
      content="Y2meta मुफ्त में यूट्यूब से एमपी3 म्यूजिक डाउनलोड करने के लिए सबसे अच्छा और सबसे तेज ऑनलाइन यूट्यूब टू एमपी कन्वर्टर है"/>
    <meta name="robots" content="index,follow"/>
    <meta property="og:type" content="website"/>
    <meta property="og:site_name" content="y2mate"/>
    <meta property="og:locale" content="hi"/>
    <meta property="og:title" content="YouTube से MP3 कन्वर्टर"/>
    <meta
      property="og:description"
      content="Y2meta मुफ्त में यूट्यूब से एमपी3 म्यूजिक डाउनलोड करने के लिए सबसे अच्छा और सबसे तेज ऑनलाइन यूट्यूब टू एमपी कन्वर्टर है"/>
    <meta property="og:image" content="https://y2mate.mobi/icons/icon-256x256.png"/>
    <meta property="og:url" content="https://y2mate.mobi/hi/youtube-to-mp3/"/>
    <link rel="icon" href="https://y2mate.mobi/icons/icon-256x256.png"/>
    <link rel="canonical" href="https://y2mate.mobi/hi/youtube-to-mp3/"/>
    <MP3Alternate/>
  </>
)
