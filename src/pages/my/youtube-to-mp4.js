import React, {useState} from 'react';
import {Link, navigate} from "gatsby";
import {StaticImage} from "gatsby-plugin-image"
import '../../styles/global.css';
import {MP4Alternate} from "../../components/Alternate";

const YouTubeToMP4 = () => {
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
            <h1 className="mb-2.5 md:text-[34px] leading-snug text-2xl font-medium">YouTube သို့ MP4 Converter -
              Y2mate</h1>
            <div className="relative m-auto my-[24px]	md:my-[43px] md:w-[600px]">
              <input
                type="text"
                className="block md:text-base	text-sm w-full px-4 font-[revert] h-[60px] border-[5px] !outline-none border-solid rounded border-[#ff0068]"
                placeholder="လင့်ခ်ကို ဤနေရာတွင် ရှာဖွေပါ သို့မဟုတ် ကူးထည့်ပါ..."
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
          <h2 className="text-[26px] font-bold py-2.5">အကောင်းဆုံး YouTube သို့ MP4 Converter</h2>
          <h4 className="my-2.5 text-lg leading-snug">
            Y2mate သည် လူကြိုက်များသော အွန်လိုင်း youtube မှ mp4 converter ဖြစ်ပြီး youtube ဗီဒီယိုများကို MP4 သို့
            အလွယ်တကူ ပြောင်းနိုင်ပြီး ဆော့ဖ်ဝဲလ်ကို ထည့်သွင်းစရာမလိုဘဲ အရည်အသွေးမြင့် ဖော်မတ်များဖြင့် ဒေါင်းလုဒ်လုပ်ရန်
            ခွင့်ပြုပေးပါသည်။ အမြန်ဆုံးနှင့် လူကြိုက်များသော YouTube Downloader ဖြင့် YouTube မှ ဗီဒီယိုများကို အခမဲ့
            ဒေါင်းလုဒ်လုပ်နိုင်ပါသည်။ YouTube မှ mp4 converter ကိုအသုံးပြုရန် မြန်ဆန်ပြီး လွယ်ကူပါသည်။
          </h4>
          <h4 className="my-2.5 text-lg leading-snug">
            ၎င်းသည် 320p၊ 480p၊ 720p၊ 1080p၊ 4K အပါအဝင် full HD အရည်အသွေးဖြင့် YouTube ဗီဒီယိုများကို ဒေါင်းလုဒ်လုပ်ရန်
            အကောင်းဆုံးနည်းလမ်းဖြစ်သည်။ ထို့ကြောင့် သင်သည် ဗီဒီယိုများကို အော့ဖ်လိုင်းတွင် ကြည့်ရှုခံစားနိုင်မည်ဖြစ်သည်။
            ၎င်းသည် Mac၊ PC၊ Android နှင့် iOS ကဲ့သို့သော စက်ပစ္စည်းများအားလုံးတွင် အဆင်ပြေဆုံးသော ပလပ်ဖောင်းဖြစ်သည်။
          </h4>
        </section>
        <hr className="md: w-5/6 h-px mx-auto bg-gray-200 border-0 rounded dark:bg-gray-700"/>
        <section className="py-[30px] md:flex block justify-between">
          <div className="md:w-[60%] md:px-[15px]">
            <h5 className="text-lg my-1.5 font-normal"><strong>Y2mate ဖြင့် Youtube ကို mp4 သို့ပြောင်းနည်း</strong>
            </h5>
            <ol className="m-0 pl-4 list-decimal">
              <li className="mb-2.5 text-[17px]">YouTube သို့သွား၍ သင်ဒေါင်းလုဒ်လုပ်လိုသော ဗီဒီယိုကိုဖွင့်ပါ။</li>
              <li className="mb-2.5 text-[17px]">YouTube ဗီဒီယို၏ URL ကို ကူးယူပါ။</li>
              <li className="mb-2.5 text-[17px]">YouTube Video url ကို ထည့်သွင်းသည့်အကွက်ထဲသို့ ကူးထည့်ကာ “ရှာဖွေရန်”
                ခလုတ်ကို နှိပ်ပါ။
              </li>
              <li className="mb-2.5 text-[17px]">youtube မှ ဒေါင်းလုဒ်လုပ်လိုသော ဗီဒီယိုပုံစံကို ရွေးပါ။</li>
              <li className="mb-2.5 text-[17px]">ပြောင်းလဲခြင်းပြီးမြောက်သည်အထိစောင့်ပြီး "ဒေါင်းလုဒ်"
                ခလုတ်ကိုနှိပ်ပါ။
              </li>
            </ol>
          </div>
          <div className="md:w-[40%] md:px-[15px]">
            <h5 className="text-lg my-1.5 font-normal"><strong>Y2mate ၏အင်္ဂါရပ်</strong></h5>
            <ol className="m-0 pl-4 list-disc">
              <li className="mb-2.5 text-[17px]">သင့်စက်တွင် ဆော့ဖ်ဝဲလ်နှင့် ပရိုဂရမ်များကို ထည့်သွင်းရန် မလိုအပ်ပါ။
              </li>
              <li className="mb-2.5 text-[17px]">လုံးဝ ဘေးကင်းပြီး လုံခြုံသော ဝဘ်အခြေခံ အက်ပ်</li>
              <li className="mb-2.5 text-[17px]">အကန့်အသတ်မရှိ YouTube မှ Mp4 ဗီဒီယိုကို ဒေါင်းလုဒ်လုပ်ပါ။</li>
              <li className="mb-2.5 text-[17px]">အသုံးပြုရလွယ်ကူပြီး ရိုးရှင်းသောဒီဇိုင်းကြောင့် ဤ YouTube ဒေါင်းလုဒ်ကို
                အသုံးပြုရလွယ်ကူစေသည်။
              </li>
              <li className="mb-2.5 text-[17px]">YouTube ဗီဒီယိုကို mp4 အဖြစ်ပြောင်းရန် အကောင့်ဝင်ရန် သို့မဟုတ်
                မှတ်ပုံတင်ရန် မလိုအပ်ပါ။
              </li>
            </ol>
          </div>
        </section>
        <hr className="md: w-5/6 h-px mx-auto bg-gray-200 border-0 rounded dark:bg-gray-700"/>
        <section className="py-[25px] md:py-[30px] md:flex">
          <div className="md:w-1/3 text-center">
            <StaticImage src="../../images/gift.svg" placeholder="none" alt="y2mateGift" quality={50}/>
            <h3 className="text-primary text-[22px] font-bold mb-2 mt-[22px]">မြန်ဆန်လွယ်ကူသောကူးပြောင်းခြင်း။</h3>
            <p className="mb-2.5">Y2mate သည် YouTube ကို mp4 အဖြစ်ပြောင်းရန် လုပ်ငန်းစဉ်ကို ရိုးရှင်းစေသော
              အသုံးပြုရလွယ်ကူသောကိရိယာတစ်ခုဖြစ်သည်။ ထို့ကြောင့် သင်သည် YouTube မှ MP4 ဗီဒီယိုများကို အလွယ်တကူ
              ဒေါင်းလုဒ်လုပ်ပြီး အော့ဖ်လိုင်းကြည့်ရှုနိုင်ပါသည်။</p>
          </div>
          <div className="md:w-1/3 text-center">
            <StaticImage src="../../images/video.svg" placeholder="none" alt="y2mateSupport" quality={50}/>
            <h3 className="text-primary text-[22px] font-bold mb-2 mt-[22px]">Multiple ဖော်မတ်ကို ပံ့ပိုးပါ။</h3>
            <p className="mb-2.5">ကျွန်ုပ်တို့၏ဝဘ်ဆိုက်တွင် MP4၊ MOV၊ M4A၊ AVI၊ WebM၊ 3GP နှင့် အခြားအရာများအပါအဝင်
              မတူညီသောဗီဒီယိုအမျိုးအစားများစွာကို ပံ့ပိုးပေးပါသည်။ ဗီဒီယိုကို 720p၊ 1080p၊ 2k၊ 4k နှင့် 8k အထိ
              အကောင်းဆုံး အရည်အသွေးဖြင့် ဒေါင်းလုဒ်လုပ်ပါ</p>
          </div>
          <div className="md:w-1/3 text-center">
            <StaticImage src="../../images/download.svg" placeholder="none" alt="y2mateDownload" quality={50}/>
            <h3 className="text-primary text-[22px] font-bold mb-2 mt-[22px]">စက်အားလုံးနှင့်
              တွဲဖက်အသုံးပြုနိုင်သည်။</h3>
            <p className="mb-2.5">ကျွန်ုပ်တို့၏ YouTube မှ MP4 သည် ဝဘ်ဘရောက်ဆာများတွင် အလုပ်လုပ်သည်၊ ထို့ကြောင့် ၎င်းကို
              Android၊ Windows၊ Mac၊ iOS နှင့် iPhone အပါအဝင် စက်များနှင့် OS အားလုံးတွင် အသုံးပြုနိုင်သည်။</p>
          </div>
        </section>
        <hr className="md: w-5/6 h-px mx-auto bg-gray-200 border-0 rounded dark:bg-gray-700"/>
        <section className="py-[30px]">
          <p className="max-w-full mb-2.5">ဤ YouTube မှ Mp4 Converter ဖြင့် ဤနည်းလမ်းကို အသုံးပြု၍ လျှင်မြန်စွာ
            ဒေါင်းလုဒ်လုပ်နိုင်ပါသည်။ Youtube URL ရှေ့မှ <b>“Y2mate”</b> ကို ရိုက်ထည့် ပြီး Enter ခလုတ်ကို နှိပ်လိုက်ပါ။
          </p>
          <p className="max-w-full mb-0.5">ဥပမာ - youtube.com/watch?v=abc75hj => y2mateyoutube.com/watch?v=abc75hj
            သင်ဒေါင်းလုဒ်လုပ်လိုသောပုံစံကို ရွေးပြီး ဒေါင်းလုဒ်ခလုတ်ကိုနှိပ်ပါ။</p>
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
    <html lang="my"/>
    <title>YouTube သို့ MP4 Converter - Y2mate</title>
    <meta
      name="description"
      content="Y2mate converter ကို အသုံးပြု၍ ရိုးရှင်းသော အဆင့်များဖြင့် YouTube ကို MP4 သို့ ပြောင်းပါ။ ၎င်းသည် မြန်ဆန်၊ လုံခြုံသည်၊ အသုံးပြုရလွယ်ကူသည်။"/>
    <meta name="robots" content="index,follow"/>
    <meta property="og:type" content="website"/>
    <meta property="og:site_name" content="y2mate"/>
    <meta property="og:locale" content="my"/>
    <meta property="og:title" content="YouTube သို့ MP4 Converter - Y2mate"/>
    <meta
      property="og:description"
      content="Y2mate converter ကို အသုံးပြု၍ ရိုးရှင်းသော အဆင့်များဖြင့် YouTube ကို MP4 သို့ ပြောင်းပါ။ ၎င်းသည် မြန်ဆန်၊ လုံခြုံသည်၊ အသုံးပြုရလွယ်ကူသည်။"/>
    <meta property="og:image" content="https://y2mate.mobi/icons/icon-256x256.png"/>
    <meta property="og:url" content="https://y2mate.mobi/my/youtube-to-mp4/"/>
    <link rel="icon" href="https://y2mate.mobi/icons/icon-256x256.png"/>
    <link rel="canonical" href="https://y2mate.mobi/my/youtube-to-mp4/"/>
    <MP4Alternate/>
  </>
)
