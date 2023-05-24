import React, {useState} from 'react';
import {Link, navigate} from "gatsby";
import {StaticImage} from "gatsby-plugin-image"
import '../../styles/global.css';
import {MP4Alternate} from "../../components/Alternate";

const YouTubeToMP4 = () => {
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
        {lang: "en", label: "English", path: "/youtube-to-mp4/"},
        {lang: "de", label: "Deutsch", path: "/de/youtube-to-mp4/"},
        {lang: "es", label: "Español", path: "/es/youtube-to-mp4/"},
        {lang: "fr", label: "Français", path: "/fr/youtube-to-mp4/"},
        {lang: "hi", label: "हिन्दी / Hindi", path: "/hi/youtube-to-mp4/"},
        {lang: "id", label: "Indonesian", path: "/id/youtube-to-mp4/"},
        {lang: "it", label: "Italiano", path: "/it/youtube-to-mp4/"},
        {lang: "ja", label: "ह日本語", path: "/ja/youtube-to-mp4/"},
        {lang: "ko", label: "한국어", path: "/ko/youtube-to-mp4/"},
        {lang: "my", label: "Myanmar (မြန်မာ)", path: "/my/youtube-to-mp4/"},
        {lang: "ms", label: "Malay", path: "/ms/youtube-to-mp4/"},
        {lang: "ph", label: "Filipino", path: "/tl-ph/youtube-to-mp4/"},
        {lang: "pt", label: "Português", path: "/pt/youtube-to-mp4/"},
        {lang: "ru", label: "Русский", path: "/ru/youtube-to-mp4/"},
        {lang: "th", label: "ไทย", path: "/th/youtube-to-mp4/"},
        {lang: "tr", label: "Türkçe", path: "/tr/youtube-to-mp4/"},
        {lang: "vi", label: "Tiếng Việt", path: "/vi/youtube-to-mp4/"},
        {lang: "zh-cn", label: "简体中文", path: "/zh-cn/youtube-to-mp4/"},
        {lang: "zh-tw", label: "繁體中文", path: "/zh-tw/youtube-to-mp4/"},
        {lang: "ar", label: "عربي", path: "/ar/youtube-to-mp4/"},
        {lang: "bn", label: "বাঙালি", path: "/bn/youtube-to-mp4/"},
    ];

    return (
        <>
            <div className="mx-auto md:max-w-[890px] px-3 md:px-0">
                <header className="h-[66px] flex items-center top-0">
                    <div className="container mx-auto">
                        <div className="flex justify-between items-center">
                            <div className="md:flex lg:w-0 lg:flex-1">
                                <Link to="/hi/" className="md:inline-flex flex items-center">
                                    <StaticImage src="../../images/logo.png" placeholder="none" alt="y2mate" width={46}
                                                 quality={80}/>
                                    <h1 className="text-2xl font-semibold w-auto z-50 pl-2 hover:text-primary">y2mate.mobi</h1>
                                </Link>
                            </div>
                            <div className="md:hidden">
                                <button
                                    onClick={() => setOpen(!open)}
                                    aria-label="Toggle Menu"
                                    type="button"
                                    className="inline-flex border-primary items-center justify-center border border-solid py-1 px-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                                >
                                    <StaticImage src="../../images/mobile.svg" placeholder="none" alt="menu" width={25}
                                                 quality={80}/>
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
                                                    <div
                                                        className="absolute mt-2 py-2 w-40 bg-white rounded-md shadow-lg">
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
                        <h1 className="mb-2.5 md:text-[34px] leading-snug text-2xl font-medium">YouTube से MP4 कन्वर्टर
                            - Y2mate</h1>
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
                                <StaticImage className="mt-1" src="../../images/left-arrow.svg" placeholder="none"
                                             alt="y2mate"/>
                            </button>
                            {suggestions?.length ?
                                <ul
                                    className="absolute w-full bg-white text-black text-left z-50 border border-[#d3e0e9] shadow py-1.5">
                                    {suggestions.map((suggestion, index) => (
                                        <li aria-hidden="true"
                                            className="cursor-pointer px-2.5 hover:font-bold hover:bg-[#f0f0f0]"
                                            key={index}
                                            onClick={handleSuggestionClick}>{suggestion}</li>
                                    ))}
                                </ul> : ''
                            }
                            <p className="text-xs md:text-sm text-[#666] leading-snug p-1.5">
                                हमारी सेवा का उपयोग करके आप हमारी
                                <Link className="text-[#c10841]" to="/terms-condition/">&nbsp;उपयोग की शर्तों को स्वीकार
                                    कर रहे हैं।</Link>
                            </p>
                        </div>
                    </div>
                </section>
                <section className="py-[25px] md:py-[30px] text-center leading-snug">
                    <h2 className="text-[26px] font-bold py-2.5">सर्वश्रेष्ठ YouTube से MP4 कन्वर्टर</h2>
                    <h4 className="my-2.5 text-lg leading-snug">
                        Y2mate एक लोकप्रिय ऑनलाइन YouTube से mp4 कन्वर्टर है जो आपको आसानी से YouTube वीडियो को MP4 में
                        बदलने और किसी भी सॉफ़्टवेयर को इंस्टॉल किए बिना उच्च गुणवत्ता वाले प्रारूप में डाउनलोड करने की
                        अनुमति देता है। आप सबसे तेज़ और लोकप्रिय YouTube डाउनलोडर के साथ YouTube से मुफ्त में वीडियो
                        डाउनलोड कर सकते हैं। YouTube से mp4 कनवर्टर का उपयोग करना तेज़ और आसान है।
                    </h4>
                    <h4 className="my-2.5 text-lg leading-snug">
                        320p, 480p, 720p, 1080p, 4K सहित पूर्ण HD गुणवत्ता में YouTube वीडियो डाउनलोड करने का यह सबसे
                        अच्छा तरीका है। तो आप ऑफ़लाइन वीडियो देख और आनंद ले सकते हैं। यह सबसे सुविधाजनक प्लेटफॉर्म है जो
                        मैक, पीसी, एंड्रॉइड और आईओएस जैसे सभी उपकरणों पर काम करता है।
                    </h4>
                </section>
                <hr className="md: w-5/6 h-px mx-auto bg-gray-200 border-0 rounded dark:bg-gray-700"/>
                <section className="py-[30px] md:flex block justify-between">
                    <div className="md:w-[60%] md:px-[15px]">
                        <h5 className="text-lg my-1.5 font-normal"><strong>Y2mate के साथ Youtube को mp4 में कैसे
                            बदलें</strong></h5>
                        <ol className="m-0 pl-4 list-decimal">
                            <li className="mb-2.5 text-[17px]">YouTube पर जाएं और वह वीडियो खोलें जिसे आप डाउनलोड करना
                                चाहते हैं
                            </li>
                            <li className="mb-2.5 text-[17px]">YouTube वीडियो का URL कॉपी करें</li>
                            <li className="mb-2.5 text-[17px]">YouTube वीडियो url को इनपुट बॉक्स में पेस्ट करें और "खोज"
                                बटन पर क्लिक करेंं
                            </li>
                            <li className="mb-2.5 text-[17px]">वह वीडियो प्रारूप चुनें जिसे आप youtube से डाउनलोड करना
                                चाहते हैं
                            </li>
                            <li className="mb-2.5 text-[17px]">रूपांतरण पूरा होने तक प्रतीक्षा करें और "डाउनलोड करें"
                                बटन पर क्लिक करें
                            </li>
                        </ol>
                    </div>
                    <div className="md:w-[40%] md:px-[15px]">
                        <h5 className="text-lg my-1.5 font-normal"><strong>Y2mate फ़ीचर</strong></h5>
                        <ol className="m-0 pl-4 list-disc">
                            <li className="mb-2.5 text-[17px]">आपके डिवाइस में सॉफ़्टवेयर और प्रोग्राम इंस्टॉल करने की
                                आवश्यकता नहीं है
                            </li>
                            <li className="mb-2.5 text-[17px]">पूरी तरह से सुरक्षित और सुरक्षित वेब आधारित अनुप्रयोग
                            </li>
                            <li className="mb-2.5 text-[17px]">बिना किसी सीमा के YouTube से Mp4 वीडियो डाउनलोड करें</li>
                            <li className="mb-2.5 text-[17px]">उपयोगकर्ता के अनुकूल और सरल डिज़ाइन इस YouTube डाउनलोड को
                                उपयोग में आसान बनाता है
                            </li>
                            <li className="mb-2.5 text-[17px]">YouTube वीडियो को mp4 में बदलने के लिए आपको लॉगिन या
                                पंजीकरण करने की आवश्यकता नहीं है
                            </li>
                        </ol>
                    </div>
                </section>
                <hr className="md: w-5/6 h-px mx-auto bg-gray-200 border-0 rounded dark:bg-gray-700"/>
                <section className="py-[25px] md:py-[30px] md:flex">
                    <div className="md:w-1/3 text-center">
                        <StaticImage src="../../images/gift.svg" placeholder="none" alt="y2mateGift" quality={50}/>
                        <h3 className="text-primary text-[22px] font-bold mb-2 mt-[22px]">तेज और आसान रूपांतरण</h3>
                        <p className="mb-2.5">Y2mate एक उपयोग में आसान उपकरण है जो YouTube को mp4 में बदलने की प्रक्रिया
                            को सरल करता है। तो आप आसानी से YouTube से MP4 वीडियो डाउनलोड कर सकते हैं और उन्हें ऑफलाइन
                            देख सकते हैं।</p>
                    </div>
                    <div className="md:w-1/3 text-center">
                        <StaticImage src="../../images/video.svg" placeholder="none" alt="y2mateSupport" quality={50}/>
                        <h3 className="text-primary text-[22px] font-bold mb-2 mt-[22px]">एकाधिक प्रारूप का समर्थन
                            करें</h3>
                        <p className="mb-2.5">हमारी वेबसाइट MP4, MOV, M4A, AVI, WebM, 3GP और अन्य सहित कई अलग-अलग प्रकार
                            के वीडियो प्रारूप प्रदान करती है। बेहतरीन क्वालिटी में वीडियो डाउनलोड करें जैसे 720p, 1080p,
                            2k, 4k और 8k तक</p>
                    </div>
                    <div className="md:w-1/3 text-center">
                        <StaticImage src="../../images/download.svg" placeholder="none" alt="y2mateDownload"
                                     quality={50}/>
                        <h3 className="text-primary text-[22px] font-bold mb-2 mt-[22px]">सभी उपकरणों के साथ संगत</h3>
                        <p className="mb-2.5">हमारा YouTube से MP4 वेब ब्राउज़र पर काम करता है, इसलिए यह Android,
                            Windows, Mac, iOS और iPhone सहित सभी उपकरणों और OS पर उपलब्ध है</p>
                    </div>
                </section>
                <hr className="md: w-5/6 h-px mx-auto bg-gray-200 border-0 rounded dark:bg-gray-700"/>
                <section className="py-[30px]">
                    <p className="max-w-full mb-2.5">इस YouTube से Mp4 कन्वर्टर के साथ आप इस विधि का उपयोग करके तेजी से
                        डाउनलोड कर सकते हैं। बस Youtube URL से पहले <b>“Y2mate”</b> टाइप करें और एंटर बटन दबाएं</p>
                    <p className="max-w-full mb-0.5">यहाँ उदाहरण है - youtube.com/watch?v=abc75hj =>
                        y2mateyoutube.com/watch?v=abc75hj वह प्रारूप चुनें जिसे आप डाउनलोड करना चाहते हैं और डाउनलोड बटन
                        दबाएं</p>
                </section>
            </div>
            <footer>
                <div className="py-[20px] text-sm text-center border-solid border-y border-inherit">
                    <p className="mb-5 text-center max-w-full">@2023 y2mate.mobi</p>
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

export default YouTubeToMP4;

export const Head = () => (
    <>
        <html lang="hi"/>
        <title>YouTube से MP4 कन्वर्टर - Y2mate</title>
        <meta
            name="description"
            content="सरल चरणों में Y2mate कन्वर्टर का उपयोग करके YouTube को MP4 में बदलें। यह तेज़, सुरक्षित, उपयोग में आसान है"/>
        <meta name="robots" content="index,follow"/>
        <meta property="og:type" content="website"/>
        <meta property="og:site_name" content="y2mate"/>
        <meta property="og:locale" content="hi"/>
        <meta property="og:title" content="YouTube से MP4 कन्वर्टर - Y2mate"/>
        <meta
            property="og:description"
            content="सरल चरणों में Y2mate कन्वर्टर का उपयोग करके YouTube को MP4 में बदलें। यह तेज़, सुरक्षित, उपयोग में आसान है"/>
        <meta property="og:image" content="https://y2mate.mobi/icons/icon-256x256.png"/>
        <meta property="og:url" content="https://y2mate.mobi/hi/youtube-to-mp4/"/>
        <link rel="icon" href="https://y2mate.mobi/icons/icon-256x256.png"/>
        <link rel="canonical" href="https://y2mate.mobi/hi/youtube-to-mp4/"/>
        <MP4Alternate/>
    </>
)
