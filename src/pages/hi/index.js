import React, {useState} from 'react';
import {Link, navigate} from "gatsby";
import {StaticImage} from "gatsby-plugin-image"
import '../../styles/global.css';
import {DownloaderAlternate} from "../../components/Alternate";

const YouTubeDownloader = () => {
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
    {lang: "en", label: "English", path: "/"},
    {lang: "de", label: "Deutsch", path: "/de/"},
    {lang: "es", label: "Español", path: "/es/"},
    {lang: "fr", label: "Français", path: "/fr/"},
    {lang: "hi", label: "हिन्दी / Hindi", path: "/hi/"},
    {lang: "id", label: "Indonesian", path: "/id/"},
    {lang: "it", label: "Italiano", path: "/it/"},
    {lang: "ja", label: "ह日本語", path: "/ja/"},
    {lang: "ko", label: "한국어", path: "/ko/"},
    {lang: "my", label: "Myanmar (မြန်မာ)", path: "/my/"},
    {lang: "ms", label: "Malay", path: "/ms/"},
    {lang: "ph", label: "Filipino", path: "/tl-ph/"},
    {lang: "pt", label: "Português", path: "/pt/"},
    {lang: "ru", label: "Русский", path: "/ru/"},
    {lang: "th", label: "ไทย", path: "/th/"},
    {lang: "tr", label: "Türkçe", path: "/tr/"},
    {lang: "vi", label: "Tiếng Việt", path: "/vi/"},
    {lang: "zh-cn", label: "简体中文", path: "/zh-cn/"},
    {lang: "zh-tw", label: "繁體中文", path: "/zh-tw/"},
    {lang: "ar", label: "عربي", path: "/ar/"},
    {lang: "bn", label: "বাঙালি", path: "/bn/"},
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
            <h1 className="mb-2.5 md:text-[34px] leading-snug text-2xl font-medium">Y2mate - ऑनलाइन YouTube
              डाउनलोडर</h1>
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
          <h2 className="text-[26px] font-bold py-2.5">सर्वश्रेष्ठ यूट्यूब एमपी3 और एमपी4 डाउनलोडर</h2>
          <h4 className="my-2.5 text-lg leading-snug">
            Y2Mate सबसे तेज और मुफ्त यूट्यूब डाउनलोडर टूल है जो बिना विज्ञापन के यूट्यूब, फेसबुक, वीमियो, यूकू, ट्विच,
            डेलीमोशन आदि से अपने पसंदीदा वीडियो को आसानी से बदलने और डाउनलोड करने में आपकी मदद करता है। इस Y2mate
            कन्वर्टर का उपयोग करके आप बिना किसी सीमा के youtube से mp3 और mp4 डाउनलोड कर सकते हैं। यह एंड्रॉइड मोबाइल,
            आईओएस, आईफोन, कंप्यूटर और टैबलेट जैसे सभी उपकरणों के साथ संगत और उपयोग में आसान है।
          </h4>
          <h4 className="my-2.5 text-lg leading-snug">
            आपको ऐप्स और सॉफ़्टवेयर इंस्टॉल करने की आवश्यकता नहीं है। Y2mate MP3, M4V, MP4, FLV, 3GP, AVI, WEBM, WMV आदि
            जैसे विभिन्न प्रकार के HD गुणवत्ता वाले ऑडियो और वीडियो प्रारूप प्रदान करता है। यह सरल चरणों के साथ YouTube
            या किसी अन्य वीडियो साझाकरण प्लेटफ़ॉर्म से वीडियो को सहेजने का एक सुरक्षित और तेज़ तरीका है। .
          </h4>
        </section>
        <hr className="md: w-5/6 h-px mx-auto bg-gray-200 border-0 rounded dark:bg-gray-700"/>
        <section className="py-[30px] md:flex block justify-between">
          <div className="md:w-[60%] md:px-[15px]">
            <h5 className="text-lg my-1.5 font-normal"><strong>निर्देश</strong></h5>
            <ol className="m-0 pl-4 list-decimal">
              <li className="mb-2.5 text-[17px]">
                इनपुट बॉक्स में एक कीवर्ड डालें या उस वीडियो url को पेस्ट करें जिसे आप कनवर्ट करना चाहते हैं
              </li>
              <li className="mb-2.5 text-[17px]">बस "प्रारंभ" बटन पर क्लिक करें और रूपांतरण प्रारंभ हो जाएगा</li>
              <li className="mb-2.5 text-[17px]">
                डाउनलोड के लिए प्रारूप (वीडियो, ऑडियो) और गुणवत्ता का चयन करें, फिर "डाउनलोड" बटन पर क्लिक करें
              </li>
            </ol>
          </div>
          <div className="md:w-[40%] md:px-[15px]">
            <h5 className="text-lg my-1.5 font-normal"><strong>Y2mate एडवांटेज</strong></h5>
            <ol className="m-0 pl-4 list-disc">
              <li className="mb-2.5 text-[17px]">
                नि:शुल्क डाउनलोड किए जाने वाले असीमित वीडियो का आनंद लें
              </li>
              <li className="mb-2.5 text-[17px]">किसी खाते को पंजीकृत या लॉगिन करने की आवश्यकता नहीं है</li>
              <li className="mb-2.5 text-[17px]">सभी प्रारूपों और गुणों के साथ डाउनलोडिंग का समर्थन करें</li>
              <li className="mb-2.5 text-[17px]">सुपर फास्ट डाउनलोड और रूपांतरण की गति</li>
              <li className="mb-2.5 text-[17px]">100% सुरक्षित और सुरक्षित कनवर्टर</li>
            </ol>
          </div>
        </section>
        <hr className="md: w-5/6 h-px mx-auto bg-gray-200 border-0 rounded dark:bg-gray-700"/>
        <section className="py-[25px] md:py-[30px] md:flex">
          <div className="md:w-1/3 text-center">
            <StaticImage src="../../images/gift.svg" placeholder="none" alt="y2mateGift" quality={50}/>
            <h3 className="text-primary text-[22px] font-bold mb-2 mt-[22px]">मुफ्त और असीमित डाउनलोड</h3>
            <p className="mb-2.5">असीमित यूट्यूब वीडियो रूपांतरण और मुफ्त डाउनलोड</p>
          </div>
          <div className="md:w-1/3 text-center">
            <StaticImage src="../../images/download.svg" placeholder="none" alt="y2mateDownload" quality={50}/>
            <h3 className="text-primary text-[22px] font-bold mb-2 mt-[22px]">आसान और तेज़ डाउनलोड</h3>
            <p className="mb-2.5">सभी ब्राउज़रों और उपकरणों के साथ पूरी तरह से संगत</p>
          </div>
          <div className="md:w-1/3 text-center">
            <StaticImage src="../../images/video.svg" placeholder="none" alt="y2mateSupport" quality={50}/>
            <h3 className="text-primary text-[22px] font-bold mb-2 mt-[22px]">उच्च गुणवत्ता वाले वीडियो और ऑडियो</h3>
            <p className="mb-2.5">मूल प्रारूप के रूप में उच्च गुणवत्ता वाले ऑडियो और वीडियो डाउनलोड का समर्थन करें</p>
          </div>
        </section>
        <hr className="md: w-5/6 h-px mx-auto bg-gray-200 border-0 rounded dark:bg-gray-700"/>
        <section className="py-[30px]">
          <p className="max-w-full mb-2.5"><b>युक्ति: </b>www को URL से निकालें और जोड़ें <b>“Y2mate”</b> YouTube से
            तेज़ समाधान के रूप में वीडियो (MP4) और ऑडियो (MP3) फ़ाइलें डाउनलोड करने के लिए URL में "youtube.com" से
            पहले।
          </p>
          <p className="max-w-full mb-0.5">यदि आप अपने डिवाइस पर वीडियो डाउनलोड करने में सक्षम नहीं हैं, तो कृपया इन
            निर्देशों का पालन करें:</p>
          <p className="max-w-full"><b>Step1: </b>अपनी पसंद का प्रारूप चुनें और "डाउनलोड" बटन पर क्लिक करें</p>
          <p className="max-w-full mb-2.5"><b>Step2: </b> नई विंडो में, वीडियो को बचाने के लिए "CTRL + S" पर क्लिक करें
            या वीडियो पर राइट क्लिक करें, फिर "वीडियो के रूप में सहेजें" चुनें।</p>
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

export default YouTubeDownloader;

export const Head = () => (
  <>
    <html lang="hi"/>
    <title>Y2mate - यूट्यूब डाउनलोडर | एचडी में यूट्यूब वीडियो मुफ्त में डाउनलोड करें</title>
    <meta
      name="description"
      content="Y2mate उपयोग करने में आसान और शक्तिशाली Youtube डाउनलोडर है जो आपको अपने पसंदीदा Youtube वीडियो को आसानी से सहेजने और उन्हें mp3 संगीत और mp4 फ़ाइलों के रूप में मुफ्त में डाउनलोड करने की अनुमति देता है"/>
    <meta name="robots" content="index,follow"/>
    <meta property="og:type" content="website"/>
    <meta property="og:site_name" content="y2mate"/>
    <meta property="og:locale" content="hi"/>
    <meta property="og:title" content="Y2mate - यूट्यूब डाउनलोडर | एचडी में यूट्यूब वीडियो मुफ्त में डाउनलोड करें"/>
    <meta
      property="og:description"
      content="Y2mate उपयोग करने में आसान और शक्तिशाली Youtube डाउनलोडर है जो आपको अपने पसंदीदा Youtube वीडियो को आसानी से सहेजने और उन्हें mp3 संगीत और mp4 फ़ाइलों के रूप में मुफ्त में डाउनलोड करने की अनुमति देता है"/>
    <meta property="og:image" content="https://y2mate.mobi/icons/icon-256x256.png"/>
    <meta property="og:url" content="https://y2mate.mobi/hi/"/>
    <link rel="icon" href="https://y2mate.mobi/icons/icon-256x256.png"/>
    <link rel="canonical" href="https://y2mate.mobi/hi/"/>
    <DownloaderAlternate/>
  </>
)
