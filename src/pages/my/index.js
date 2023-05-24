import React, {useState} from 'react';
import {Link, navigate} from "gatsby";
import {StaticImage} from "gatsby-plugin-image"
import '../../styles/global.css';
import {DownloaderAlternate} from "../../components/Alternate";

const YouTubeDownloader = () => {
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState("test");
  const [selectedLanguage, setSelectedLanguage] = useState("my");
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
                <Link to="/my/" className="md:inline-flex flex items-center">
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
                  to="/my/">
                  YouTube Downloader
                </Link>
                <Link
                  className="text-sm py-[23px] px-[15px] hover:text-primary"
                  to="/my/youtube-to-mp4/">
                  YouTube to MP4 Converter
                </Link>
                <Link
                  className="text-sm py-[23px] px-[15px] hover:text-primary"
                  to="/my/youtube-to-mp3/">
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
                        to="/my/">
                        YouTube Downloader
                      </Link>
                      <Link
                        className="-m-3 p-3 flex items-center hover:text-primary transition duration-300"
                        to="/my/youtube-to-mp4/">
                        YouTube to MP4 Converter
                      </Link>
                      <Link
                        className="-m-3 p-3 flex items-center hover:text-primary transition duration-300"
                        to="/my/youtube-to-mp3/">
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
            <h1 className="mb-2.5 md:text-[34px] leading-snug text-2xl font-medium">Y2mate - အွန်လိုင်း YouTube
              ဒေါင်းလုဒ်လုပ်သူ</h1>
            <div className="relative m-auto my-[24px]	md:my-[43px] md:w-[600px]">
              <input
                type="text"
                className="block md:text-base	text-sm w-full px-4 font-[revert] h-[60px] border-[5px] !outline-none border-solid rounded border-[#ff0068]"
                placeholder="ဤနေရာတွင် ရှာရန် သို့မဟုတ် လင့်ခ်ကို ကူးထည့်ပါ..."
                onChange={handleInputChange}
                onKeyDown={handleClickEnter}
              />
              <button
                className="md:px-4 rounded-r absolute top-0 right-0 font-[arial] text-sm md:w-[120px] w-[60px] h-[60px] -ml-1 text-white bg-button"
                onClick={handleClickConvert}>
                <span className="hidden md:contents">စတင်ပါ။</span>
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
                ကျွန်ုပ်တို့၏ဝန်ဆောင်မှုကိုအသုံးပြုခြင်းဖြင့် သင်သည် ကျွန်ုပ်တို့၏
                <Link className="text-[#c10841]" to="/terms-condition/">&nbsp;အသုံးပြုမှုစည်းမျဉ်းများကို
                  လက်ခံပါသည်။</Link>
              </p>
            </div>
          </div>
        </section>
        <section className="py-[25px] md:py-[30px] text-center leading-snug">
          <h2 className="text-[26px] font-bold py-2.5">အကောင်းဆုံး Youtube MP3 နှင့် MP4 Downloader</h2>
          <h4 className="my-2.5 text-lg leading-snug">
            Y2Mate သည် ကြော်ငြာမပါဘဲ YouTube၊ Facebook၊ Vimeo၊ Youku၊ Twitch၊ Dailymotion စသည်တို့မှ သင်နှစ်သက်သော
            ဗီဒီယိုများကို အလွယ်တကူ convert & ဒေါင်းလုဒ်လုပ်ရန် ကူညီပေးသည့် အကောင်းဆုံး မြန်ဆန်ပြီး အခမဲ့ Youtube
            Downloader ကိရိယာဖြစ်သည်။ ဤ Y2mate converter ကို အသုံးပြု၍ သင်သည် အကန့်အသတ်မရှိ mp3 နှင့် mp4 ကို youtube
            မှဒေါင်းလုဒ်လုပ်နိုင်ပါသည်။ ၎င်းသည် Android မိုဘိုင်းလ်၊ iOS၊ iPhone၊ ကွန်ပျူတာနှင့် တက်ဘလက်ကဲ့သို့သော
            စက်ပစ္စည်းအားလုံးနှင့် တွဲဖက်အသုံးပြုနိုင်ပြီး လွယ်ကူစွာ အသုံးပြုနိုင်သည်။
          </h4>
          <h4 className="my-2.5 text-lg leading-snug">
            သင်သည် အက်ပ်များနှင့် ဆော့ဖ်ဝဲလ်ကို ထည့်သွင်းရန် မလိုအပ်ပါ။ Y2mate သည် MP3, M4V, MP4, FLV, 3GP, AVI, WEBM,
            WMV အစရှိသည့် HD အရည်အသွေးရှိသော အသံနှင့် ဗီဒီယိုဖော်မတ်များကို ပံ့ပိုးပေးပါသည်။ ၎င်းသည်
            ရိုးရှင်းသောအဆင့်များဖြင့် YouTube သို့မဟုတ် အခြားဗီဒီယိုမျှဝေသည့်ပလပ်ဖောင်းမှ ဗီဒီယိုများကို လုံခြုံပြီး
            မြန်ဆန်သောနည်းလမ်းတစ်ခုဖြစ်သည်။ .
          </h4>
        </section>
        <hr className="md: w-5/6 h-px mx-auto bg-gray-200 border-0 rounded dark:bg-gray-700"/>
        <section className="py-[30px] md:flex block justify-between">
          <div className="md:w-[60%] md:px-[15px]">
            <h5 className="text-lg my-1.5 font-normal"><strong>ညွှန်ကြားချက်များ</strong></h5>
            <ol className="m-0 pl-4 list-decimal">
              <li className="mb-2.5 text-[17px]">
                အဝင်အကွက်တွင် အဓိကစကားလုံးကို ထည့်ပါ သို့မဟုတ် သင်ပြောင်းလိုသော ဗီဒီယို url ကို ကူးထည့်ပါ။
              </li>
              <li className="mb-2.5 text-[17px]">ရိုးရှင်းစွာ "Start"
                ခလုတ်ကိုကလစ်နှိပ်ပါနှင့်ပြောင်းလဲခြင်းစတင်ပါလိမ့်မယ်။
              </li>
              <li className="mb-2.5 text-[17px]">
                ဖော်မတ် (ဗီဒီယို၊ အသံ) နှင့် ဒေါင်းလုဒ်အတွက် အရည်အသွေးကို ရွေးပါ၊ ထို့နောက် "ဒေါင်းလုဒ်" ခလုတ်ကို
                နှိပ်ပါ။
              </li>
            </ol>
          </div>
          <div className="md:w-[40%] md:px-[15px]">
            <h5 className="text-lg my-1.5 font-normal"><strong>Y2mate အားသာချက်</strong></h5>
            <ol className="m-0 pl-4 list-disc">
              <li className="mb-2.5 text-[17px]">
                အခမဲ့ဒေါင်းလုဒ်လုပ်ထားသော ဗီဒီယိုအရေအတွက် အကန့်အသတ်မရှိ ခံစားလိုက်ပါ။
              </li>
              <li className="mb-2.5 text-[17px]">အကောင့်တစ်ခု မှတ်ပုံတင်ရန် သို့မဟုတ် အကောင့်ဝင်ရန် မလိုအပ်ပါ။</li>
              <li className="mb-2.5 text-[17px]">ဖော်မတ်များနှင့် အရည်အသွေးအားလုံးဖြင့် ဒေါင်းလုဒ်လုပ်ခြင်းကို
                ပံ့ပိုးပါ။
              </li>
              <li className="mb-2.5 text-[17px]">အလွန်မြန်ဆန်သော ဒေါင်းလုဒ်နှင့် ပြောင်းလဲခြင်းမြန်နှုန်း</li>
              <li className="mb-2.5 text-[17px]">100% ဘေးကင်းလုံခြုံသော converter</li>
            </ol>
          </div>
        </section>
        <hr className="md: w-5/6 h-px mx-auto bg-gray-200 border-0 rounded dark:bg-gray-700"/>
        <section className="py-[25px] md:py-[30px] md:flex">
          <div className="md:w-1/3 text-center">
            <StaticImage src="../../images/gift.svg" placeholder="none" alt="y2mateGift" quality={50}/>
            <h3 className="text-primary text-[22px] font-bold mb-2 mt-[22px]">အခမဲ့နှင့် အကန့်အသတ်မရှိ
              ဒေါင်းလုဒ်လုပ်ပါ။</h3>
            <p className="mb-2.5">အကန့်အသတ်မရှိ Youtube ဗီဒီယိုများ ပြောင်းလဲခြင်းနှင့် အခမဲ့ဒေါင်းလုဒ်လုပ်ခြင်း။</p>
          </div>
          <div className="md:w-1/3 text-center">
            <StaticImage src="../../images/download.svg" placeholder="none" alt="y2mateDownload" quality={50}/>
            <h3 className="text-primary text-[22px] font-bold mb-2 mt-[22px]">လွယ်ကူမြန်ဆန်စွာဒေါင်းလုဒ်လုပ်ပါ။</h3>
            <p className="mb-2.5">ဘရောက်ဆာများနှင့် စက်များအားလုံးနှင့် လုံးဝလိုက်ဖက်ပါသည်။</p>
          </div>
          <div className="md:w-1/3 text-center">
            <StaticImage src="../../images/video.svg" placeholder="none" alt="y2mateSupport" quality={50}/>
            <h3 className="text-primary text-[22px] font-bold mb-2 mt-[22px]">အရည်အသွေးမြင့် ဗီဒီယိုနှင့် အသံ</h3>
            <p className="mb-2.5">အရည်အသွေးမြင့် အသံနှင့် ဗီဒီယိုများကို မူရင်းဖော်မတ်အဖြစ် ဒေါင်းလုဒ်လုပ်ရန်
              ပံ့ပိုးပါ။</p>
          </div>
        </section>
        <hr className="md: w-5/6 h-px mx-auto bg-gray-200 border-0 rounded dark:bg-gray-700"/>
        <section className="py-[30px]">
          <p className="max-w-full mb-2.5"><b>အကြံပြုချက်- </b>www ကို URL မှဖယ်ရှားပြီး
            add <b>“Y2mate”</b> ပိုမိုမြန်ဆန်သောဖြေရှင်းချက်အဖြစ် YouTube မှ ဗီဒီယိုများ(MP4) နှင့် အသံ(MP3)
            ဖိုင်များကို ဒေါင်းလုဒ်လုပ်ရန် URL ရှိ "youtube.com" မတိုင်မီ။
          </p>
          <p className="max-w-full mb-0.5">သင့်စက်ပစ္စည်းသို့ ဗီဒီယိုကို ဒေါင်းလုဒ်လုပ်၍မရပါက၊ ကျေးဇူးပြု၍
            ဤညွှန်ကြားချက်များကို လိုက်နာပါ-</p>
          <p className="max-w-full"><b>အဆင့် 1: </b>သင်နှစ်သက်ရာပုံစံကိုရွေးချယ်ပြီး "ဒေါင်းလုဒ်" ခလုတ်ကိုနှိပ်ပါ။</p>
          <p className="max-w-full mb-2.5"><b>အဆင့် 2: </b>ဝင်းဒိုးအသစ်တွင်၊ ဗီဒီယိုကိုသိမ်းဆည်းရန် "CTRL + S"
            ကိုနှိပ်ပါ သို့မဟုတ် ဗီဒီယိုသို့ ညာဖက်ကလစ်နှိပ်ပါ၊ ထို့နောက် "ဗီဒီယိုအဖြစ်သိမ်းဆည်းရန်" ကိုရွေးချယ်ပါ။</p>
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

export default YouTubeDownloader;

export const Head = () => (
  <>
    <html lang="my"/>
    <title>Y2mate - Youtube Downloader | Youtube ဗီဒီယိုကို HD ဖြင့် အခမဲ့ဒေါင်းလုဒ်လုပ်ပါ။</title>
    <meta
      name="description"
      content="Y2mate သည် အသုံးပြုရလွယ်ကူပြီး အစွမ်းထက်သော Youtube downloader သည် သင့်စိတ်ကြိုက် Youtube ဗီဒီယိုများကို အလွယ်တကူ သိမ်းဆည်းနိုင်ပြီး ၎င်းတို့ကို mp3 ဂီတနှင့် mp4 ဖိုင်များအဖြစ် အခမဲ့ ဒေါင်းလုဒ်လုပ်ရန် ခွင့်ပြုသည်။"/>
    <meta name="robots" content="index,follow"/>
    <meta property="og:type" content="website"/>
    <meta property="og:site_name" content="y2mate"/>
    <meta property="og:locale" content="my"/>
    <meta property="og:title"
          content="Y2mate - Youtube Downloader | Youtube ဗီဒီယိုကို HD ဖြင့် အခမဲ့ဒေါင်းလုဒ်လုပ်ပါ။"/>
    <meta
      property="og:description"
      content="Y2mate သည် အသုံးပြုရလွယ်ကူပြီး အစွမ်းထက်သော Youtube downloader သည် သင့်စိတ်ကြိုက် Youtube ဗီဒီယိုများကို အလွယ်တကူ သိမ်းဆည်းနိုင်ပြီး ၎င်းတို့ကို mp3 ဂီတနှင့် mp4 ဖိုင်များအဖြစ် အခမဲ့ ဒေါင်းလုဒ်လုပ်ရန် ခွင့်ပြုသည်။"/>
    <meta property="og:image" content="https://y2mate.mobi/icons/icon-256x256.png"/>
    <meta property="og:url" content="https://y2mate.mobi/my/"/>
    <link rel="icon" href="https://y2mate.mobi/icons/icon-256x256.png"/>
    <link rel="canonical" href="https://y2mate.mobi/my/"/>
    <DownloaderAlternate/>
  </>
)
