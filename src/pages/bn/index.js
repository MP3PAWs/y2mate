import React, {useState} from 'react';
import {Link, navigate} from "gatsby";
import {StaticImage} from "gatsby-plugin-image"
import '../../styles/global.css';
import {DownloaderAlternate} from "../../components/Alternate";

const YouTubeDownloader = () => {
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState("test");
  const [selectedLanguage, setSelectedLanguage] = useState("bn");
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
                <Link to="/bn/" className="md:inline-flex flex items-center">
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
                  to="/bn/">
                  YouTube Downloader
                </Link>
                <Link
                  className="text-sm py-[23px] px-[15px] hover:text-primary"
                  to="/bn/youtube-to-mp4/">
                  YouTube to MP4 Converter
                </Link>
                <Link
                  className="text-sm py-[23px] px-[15px] hover:text-primary"
                  to="/bn/youtube-to-mp3/">
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
                        to="/bn/">
                        YouTube Downloader
                      </Link>
                      <Link
                        className="-m-3 p-3 flex items-center hover:text-primary transition duration-300"
                        to="/bn/youtube-to-mp4/">
                        YouTube to MP4 Converter
                      </Link>
                      <Link
                        className="-m-3 p-3 flex items-center hover:text-primary transition duration-300"
                        to="/bn/youtube-to-mp3/">
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
            <h1 className="mb-2.5 md:text-[34px] leading-snug text-2xl font-medium">Y2mate - অনলাইন ইউটিউব
              ডাউনলোডার</h1>
            <div className="relative m-auto my-[24px]	md:my-[43px] md:w-[600px]">
              <input
                type="text"
                className="block md:text-base	text-sm w-full px-4 font-[revert] h-[60px] border-[5px] !outline-none border-solid rounded border-[#ff0068]"
                placeholder="এখানে লিঙ্ক অনুসন্ধান বা পেস্ট করুন..."
                onChange={handleInputChange}
                onKeyDown={handleClickEnter}
              />
              <button
                className="md:px-4 rounded-r absolute top-0 right-0 font-[arial] text-sm md:w-[120px] w-[60px] h-[60px] -ml-1 text-white bg-button"
                onClick={handleClickConvert}>
                <span className="hidden md:contents">শুরু করুন</span>
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
                আমাদের পরিষেবা ব্যবহার করে আপনি আমাদের
                <Link className="text-[#c10841]" to="/terms-condition/">&nbsp;ব্যবহারের শর্তাবলী স্বীকার করছেন।</Link>
              </p>
            </div>
          </div>
        </section>
        <section className="py-[25px] md:py-[30px] text-center leading-snug">
          <h2 className="text-[26px] font-bold py-2.5">সেরা ইউটিউব MP3 এবং MP4 ডাউনলোডার</h2>
          <h4 className="my-2.5 text-lg leading-snug">
            Y2Mate হল সেরা দ্রুত এবং বিনামূল্যের Youtube ডাউনলোডার টুল যা আপনাকে বিজ্ঞাপন ছাড়াই YouTube, Facebook,
            Vimeo, Youku, Twitch, Dailymotion, ইত্যাদি থেকে আপনার পছন্দের ভিডিওগুলিকে সহজেই রূপান্তর ও ডাউনলোড করতে
            সাহায্য করে। এই Y2mate কনভার্টার ব্যবহার করে আপনি সীমাবদ্ধতা ছাড়াই YouTube থেকে mp3 এবং mp4 ডাউনলোড করতে
            পারেন। অ্যান্ড্রয়েড মোবাইল, iOS, আইফোন, কম্পিউটার এবং ট্যাবলেটের মতো সমস্ত ডিভাইসের সাথে এটি সামঞ্জস্যপূর্ণ
            এবং ব্যবহার করা সহজ।
          </h4>
          <h4 className="my-2.5 text-lg leading-snug">
            আপনাকে অ্যাপ এবং সফ্টওয়্যার ইনস্টল করতে হবে না। Y2mate বিভিন্ন এইচডি মানের অডিও এবং ভিডিও ফরম্যাট যেমন MP3,
            M4V, MP4, FLV, 3GP, AVI, WEBM, WMV ইত্যাদি প্রদান করে। এটি YouTube বা অন্য যেকোনো ভিডিও শেয়ারিং প্ল্যাটফর্ম
            থেকে সহজ ধাপে ভিডিও সংরক্ষণ করার একটি নিরাপদ এবং দ্রুত উপায়। .
          </h4>
        </section>
        <hr className="md: w-5/6 h-px mx-auto bg-gray-200 border-0 rounded dark:bg-gray-700"/>
        <section className="py-[30px] md:flex block justify-between">
          <div className="md:w-[60%] md:px-[15px]">
            <h5 className="text-lg my-1.5 font-normal"><strong>নির্দেশনা</strong></h5>
            <ol className="m-0 pl-4 list-decimal">
              <li className="mb-2.5 text-[17px]">
                ইনপুট বক্সে একটি কীওয়ার্ড ঢোকান বা ভিডিও ইউআরএল পেস্ট করুন যা আপনি রূপান্তর করতে চান
              </li>
              <li className="mb-2.5 text-[17px]">শুধু "স্টার্ট" বোতামে ক্লিক করুন এবং রূপান্তর শুরু হবে</li>
              <li className="mb-2.5 text-[17px]">
                ডাউনলোডের জন্য বিন্যাস (ভিডিও, অডিও) এবং গুণমান নির্বাচন করুন, তারপর "ডাউনলোড" বোতামে ক্লিক করুন
              </li>
            </ol>
          </div>
          <div className="md:w-[40%] md:px-[15px]">
            <h5 className="text-lg my-1.5 font-normal"><strong>Y2mate সুবিধা</strong></h5>
            <ol className="m-0 pl-4 list-disc">
              <li className="mb-2.5 text-[17px]">
                বিনামূল্যে ডাউনলোড করে সীমাহীন সংখ্যক ভিডিও উপভোগ করুন
              </li>
              <li className="mb-2.5 text-[17px]">একটি অ্যাকাউন্ট নিবন্ধন বা লগইন করার প্রয়োজন নেই</li>
              <li className="mb-2.5 text-[17px]">সমস্ত বিন্যাস এবং গুণাবলী সহ ডাউনলোড সমর্থন</li>
              <li className="mb-2.5 text-[17px]">সুপার ফাস্ট ডাউনলোড এবং রূপান্তর গতি</li>
              <li className="mb-2.5 text-[17px]">100% নিরাপদ এবং সুরক্ষিত রূপান্তরকারী</li>
            </ol>
          </div>
        </section>
        <hr className="md: w-5/6 h-px mx-auto bg-gray-200 border-0 rounded dark:bg-gray-700"/>
        <section className="py-[25px] md:py-[30px] md:flex">
          <div className="md:w-1/3 text-center">
            <StaticImage src="../../images/gift.svg" placeholder="none" alt="y2mateGift" quality={50}/>
            <h3 className="text-primary text-[22px] font-bold mb-2 mt-[22px]">বিনামূল্যে এবং সীমাহীন ডাউনলোড</h3>
            <p className="mb-2.5">আনলিমিটেড ইউটিউব ভিডিও রূপান্তর এবং বিনামূল্যে ডাউনলোড</p>
          </div>
          <div className="md:w-1/3 text-center">
            <StaticImage src="../../images/download.svg" placeholder="none" alt="y2mateDownload" quality={50}/>
            <h3 className="text-primary text-[22px] font-bold mb-2 mt-[22px]">সহজ এবং দ্রুত ডাউনলোড</h3>
            <p className="mb-2.5">সমস্ত ব্রাউজার এবং ডিভাইসের সাথে সম্পূর্ণরূপে সামঞ্জস্যপূর্ণ</p>
          </div>
          <div className="md:w-1/3 text-center">
            <StaticImage src="../../images/video.svg" placeholder="none" alt="y2mateSupport" quality={50}/>
            <h3 className="text-primary text-[22px] font-bold mb-2 mt-[22px]">উচ্চ মানের ভিডিও এবং অডিও</h3>
            <p className="mb-2.5">মূল বিন্যাস হিসাবে উচ্চ মানের অডিও এবং ভিডিও ডাউনলোড সমর্থন করে</p>
          </div>
        </section>
        <hr className="md: w-5/6 h-px mx-auto bg-gray-200 border-0 rounded dark:bg-gray-700"/>
        <section className="py-[30px]">
          <p className="max-w-full mb-2.5"><b>পরামর্শ: </b>URL থেকে www সরান এবং যোগ করুন <b>“Y2mate”</b> দ্রুত সমাধান
            হিসেবে YouTube থেকে ভিডিও (MP4) এবং অডিও (MP3) ফাইল ডাউনলোড করতে URL-এ "youtube.com"-এর আগে।
          </p>
          <p className="max-w-full mb-0.5">আপনি আপনার ডিভাইসে ভিডিও ডাউনলোড করতে সক্ষম না হলে, অনুগ্রহ করে এই
            নির্দেশাবলী অনুসরণ করুন:</p>
          <p className="max-w-full"><b>ধাপ 1: </b>আপনার পছন্দের বিন্যাসটি চয়ন করুন এবং "ডাউনলোড" বোতামে ক্লিক করুন</p>
          <p className="max-w-full mb-2.5"><b>ধাপ 2: </b>নতুন উইন্ডোতে, ভিডিও সংরক্ষণ করতে "CTRL + S" ক্লিক করুন বা
            ভিডিওতে রাইট ক্লিক করুন, তারপর "ভিডিও হিসাবে সংরক্ষণ করুন" নির্বাচন করুন।</p>
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
    <html lang="bn"/>
    <title>Y2mate - ইউটিউব ডাউনলোডার | ইউটিউব ভিডিও বিনামূল্যে HD এ ডাউনলোড করুন</title>
    <meta
      name="description"
      content="Y2mate ব্যবহার করা সহজ এবং শক্তিশালী ইউটিউব ডাউনলোডার যা আপনাকে সহজেই আপনার প্রিয় ইউটিউব ভিডিও সংরক্ষণ করতে এবং বিনামূল্যে mp3 সঙ্গীত এবং mp4 ফাইল হিসাবে ডাউনলোড করতে দেয়"/>
    <meta name="robots" content="index,follow"/>
    <meta property="og:type" content="website"/>
    <meta property="og:site_name" content="y2mate"/>
    <meta property="og:locale" content="bn"/>
    <meta property="og:title" content="Y2mate - ইউটিউব ডাউনলোডার | ইউটিউব ভিডিও বিনামূল্যে HD এ ডাউনলোড করুন"/>
    <meta
      property="og:description"
      content="Y2mate ব্যবহার করা সহজ এবং শক্তিশালী ইউটিউব ডাউনলোডার যা আপনাকে সহজেই আপনার প্রিয় ইউটিউব ভিডিও সংরক্ষণ করতে এবং বিনামূল্যে mp3 সঙ্গীত এবং mp4 ফাইল হিসাবে ডাউনলোড করতে দেয়"/>
    <meta property="og:image" content="https://y2mate.mobi/icons/icon-256x256.png"/>
    <meta property="og:url" content="https://y2mate.mobi/bn/"/>
    <link rel="icon" href="https://y2mate.mobi/icons/icon-256x256.png"/>
    <link rel="canonical" href="https://y2mate.mobi/bn/"/>
    <DownloaderAlternate/>
  </>
)
