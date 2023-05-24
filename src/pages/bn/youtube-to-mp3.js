import React, {useState} from 'react';
import {Link, navigate} from "gatsby";
import {StaticImage} from "gatsby-plugin-image"
import '../../styles/global.css';
import {MP3Alternate} from "../../components/Alternate";

const YouTubeToMP3 = () => {
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
                <Link to="/bn/" className="md:inline-flex flex items-center">
                  <StaticImage src="../../images/logo.png" placeholder="none" alt="y2mate" width={46} quality={80}/>
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
            <h1 className="mb-2.5 md:text-[34px] leading-snug text-2xl font-medium">YouTube থেকে MP3 কনভার্টার</h1>
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
          <h2 className="text-[26px] font-bold py-2.5">YouTube কে MP3 তে রূপান্তর করুন</h2>
          <h4 className="my-2.5 text-lg leading-snug">
            Y2mate হল সেরা এবং দ্রুততম Youtube থেকে mp3 রূপান্তরকারী টুল। আমাদের YouTube to mp3 টুল আপনাকে কোনো
            সফটওয়্যার ইন্সটল না করেই ইউটিউব থেকে উচ্চ মানের ইউটিউব ভিডিও কনভার্ট এবং ডাউনলোড করতে দেয়। Y2mate
            ট্যাবলেট, ডেস্কটপ এবং মোবাইল ডিভাইসে অনায়াসে কাজ করে।
          </h4>
          <h4 className="my-2.5 text-lg leading-snug">
            এই YouTube থেকে Mp3 রূপান্তরকারীর সাহায্যে, Youtube থেকে বিভিন্ন মানের এবং বিটরেটের MP3 ডাউনলোড করা সহজ,
            যেমন 64kbps, 128kbps, 192kbps এবং 320kbps পর্যন্ত, যাতে আপনি অফলাইনে থাকাকালীনও যখন খুশি mp3 সঙ্গীত শুনতে
            পারেন৷
          </h4>
        </section>
        <hr className="md: w-5/6 h-px mx-auto bg-gray-200 border-0 rounded dark:bg-gray-700"/>
        <section className="py-[30px] md:flex block justify-between">
          <div className="md:w-[60%] md:px-[15px]">
            <h5 className="text-lg my-1.5 font-normal"><strong>কিভাবে Y2mate দিয়ে YouTube ভিডিওগুলিকে MP3 তে রূপান্তর
              করবেন</strong></h5>
            <ol className="m-0 pl-4 list-decimal">
              <li className="mb-2.5 text-[17px]">ইউটিউব খুলুন এবং ইউটিউব ভিডিও ইউআরএলটি কপি করুন যা আপনি রূপান্তর করতে
                চান
              </li>
              <li className="mb-2.5 text-[17px]">সার্চ বক্সে YouTube Url প্যাট করুন</li>
              <li className="mb-2.5 text-[17px]">MP3 গুণমান নির্বাচন করুন এবং "ডাউনলোড" বোতামে ক্লিক করুন</li>
              <li className="mb-2.5 text-[17px]">রূপান্তর প্রক্রিয়া সম্পূর্ণ না হওয়া পর্যন্ত অপেক্ষা করুন এবং অডিও
                ফাইল ডাউনলোড করুন।
              </li>
            </ol>
          </div>
          <div className="md:w-[40%] md:px-[15px]">
            <h5 className="text-lg my-1.5 font-normal"><strong>Y2mate বৈশিষ্ট্য</strong></h5>
            <ol className="m-0 pl-4 list-disc">
              <li className="mb-2.5 text-[17px]">সম্পূর্ণ বিনামূল্যে এবং সীমাহীন ব্যবহার</li>
              <li className="mb-2.5 text-[17px]">কোন অ্যাপ্লিকেশন নিবন্ধন বা ইনস্টল করার প্রয়োজন নেই</li>
              <li className="mb-2.5 text-[17px]">সম্পূর্ণ নিরাপদ এবং সুরক্ষিত রূপান্তরকারী</li>
              <li className="mb-2.5 text-[17px]">সমর্থিত একাধিক উচ্চ মানের অডিও যেমন 64kbps, 128kbps, 192kbps, 256kbps
                এবং 320kbps।
              </li>
            </ol>
          </div>
        </section>
        <hr className="md: w-5/6 h-px mx-auto bg-gray-200 border-0 rounded dark:bg-gray-700"/>
        <section className="py-[25px] md:py-[30px] md:flex">
          <div className="md:w-1/3 text-center">
            <StaticImage src="../../images/gift.svg" placeholder="none" alt="y2mateGift" quality={50}/>
            <h3 className="text-primary text-[22px] font-bold mb-2 mt-[22px]">বিনামূল্যে এবং ব্যবহার করা সহজ</h3>
            <p className="mb-2.5">কয়েক ক্লিকে YouTube ভিডিওগুলিকে mp3 বিনামূল্যে রূপান্তর করুন এবং সংরক্ষণ করুন, শুধু
              YouTube url পেস্ট করুন এবং 'স্টার্ট' বোতামে ক্লিক করুন।</p>
          </div>
          <div className="md:w-1/3 text-center">
            <StaticImage src="../../images/video.svg" placeholder="none" alt="y2mateSupport" quality={50}/>
            <h3 className="text-primary text-[22px] font-bold mb-2 mt-[22px]">সমস্ত ডিভাইস সামঞ্জস্য</h3>
            <p className="mb-2.5">Y2mate রূপান্তরকারী সমস্ত ধরণের ডিভাইসের জন্য প্রতিক্রিয়াশীল এবং সামঞ্জস্যপূর্ণ
              যেগুলি মোবাইল, পিসি, অ্যান্ড্রয়েড এবং iOS-এ পুরোপুরি চলে৷ এছাড়াও সমস্ত ব্রাউজারে কাজ করে।</p>
          </div>
          <div className="md:w-1/3 text-center">
            <StaticImage src="../../images/download.svg" placeholder="none" alt="y2mateDownload" quality={50}/>
            <h3 className="text-primary text-[22px] font-bold mb-2 mt-[22px]">সীমাবদ্ধতা ছাড়াই দ্রুত ডাউনলোড করুন</h3>
            <p className="mb-2.5">আপনি যতটা চান সীমাবদ্ধতা ছাড়াই YouTube কে Mp3 তে রূপান্তর করুন এবং ডাউনলোড করুন। কোন
              বৈশিষ্ট্য সীমাবদ্ধতা প্রযোজ্য.</p>
          </div>
        </section>
        <hr className="md: w-5/6 h-px mx-auto bg-gray-200 border-0 rounded dark:bg-gray-700"/>
        <section className="py-[30px]">
          <p className="max-w-full mb-2.5">Youtube.com url এর আগে <b>“Y2mate”</b> কীওয়ার্ড প্রবেশ করান এবং এন্টার বোতাম
            টিপুন - এটি আপনাকে YouTube থেকে দ্রুত mp3 ডাউনলোড করতে দেবে৷</p>
          <p className="max-w-full mb-0.5">এখানে একটি উদাহরণ - youtube.com/watch?v=abc75hj =>
            y2mateyoutube.com/watch?v=abc75hj আপনি যে ফর্ম্যাটটি ডাউনলোড করতে চান তা চয়ন করুন এবং তারপরে ডাউনলোড বোতামে
            ক্লিক করুন</p>
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

export default YouTubeToMP3;

export const Head = () => (
  <>
    <html lang="bn"/>
    <title>YouTube থেকে MP3 কনভার্টার</title>
    <meta
      name="description"
      content="Y2meta হল সেরা এবং দ্রুততম অনলাইন ইউটিউব থেকে Mp3 কনভার্টার বিনামূল্যে ইউটিউব থেকে MP3 সঙ্গীত ডাউনলোড করতে"/>
    <meta name="robots" content="index,follow"/>
    <meta property="og:type" content="website"/>
    <meta property="og:site_name" content="y2mate"/>
    <meta property="og:locale" content="bn"/>
    <meta property="og:title" content="YouTube থেকে MP3 কনভার্টার"/>
    <meta
      property="og:description"
      content="Y2meta হল সেরা এবং দ্রুততম অনলাইন ইউটিউব থেকে Mp3 কনভার্টার বিনামূল্যে ইউটিউব থেকে MP3 সঙ্গীত ডাউনলোড করতে"/>
    <meta property="og:image" content="https://y2mate.mobi/icons/icon-256x256.png"/>
    <meta property="og:url" content="https://y2mate.mobi/bn/youtube-to-mp3/"/>
    <link rel="icon" href="https://y2mate.mobi/icons/icon-256x256.png"/>
    <link rel="canonical" href="https://y2mate.mobi/bn/youtube-to-mp3/"/>
    <MP3Alternate/>
  </>
)
