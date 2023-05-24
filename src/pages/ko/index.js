import React, {useState} from 'react';
import {Link, navigate} from "gatsby";
import {StaticImage} from "gatsby-plugin-image"
import '../../styles/global.css';
import {DownloaderAlternate} from "../../components/Alternate";

const YouTubeDownloader = () => {
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState("test");
  const [selectedLanguage, setSelectedLanguage] = useState("ko");
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
                <Link to="/ko/" className="md:inline-flex flex items-center">
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
                  to="/ko/">
                  YouTube Downloader
                </Link>
                <Link
                  className="text-sm py-[23px] px-[15px] hover:text-primary"
                  to="/ko/youtube-to-mp4/">
                  YouTube to MP4 Converter
                </Link>
                <Link
                  className="text-sm py-[23px] px-[15px] hover:text-primary"
                  to="/ko/youtube-to-mp3/">
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
                        to="/ko/">
                        YouTube Downloader
                      </Link>
                      <Link
                        className="-m-3 p-3 flex items-center hover:text-primary transition duration-300"
                        to="/ko/youtube-to-mp4/">
                        YouTube to MP4 Converter
                      </Link>
                      <Link
                        className="-m-3 p-3 flex items-center hover:text-primary transition duration-300"
                        to="/ko/youtube-to-mp3/">
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
            <h1 className="mb-2.5 md:text-[34px] leading-snug text-2xl font-medium">Y2mate - 온라인 YouTube 다운로더</h1>
            <div className="relative m-auto my-[24px]	md:my-[43px] md:w-[600px]">
              <input
                type="text"
                className="block md:text-base	text-sm w-full px-4 font-[revert] h-[60px] border-[5px] !outline-none border-solid rounded border-[#ff0068]"
                placeholder="여기에 링크를 검색하거나 붙여넣기..."
                onChange={handleInputChange}
                onKeyDown={handleClickEnter}
              />
              <button
                className="md:px-4 rounded-r absolute top-0 right-0 font-[arial] text-sm md:w-[120px] w-[60px] h-[60px] -ml-1 text-white bg-button"
                onClick={handleClickConvert}>
                <span className="hidden md:contents">시작</span>
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
                당사 서비스를 사용함으로써 귀하는 당사의
                <Link className="text-[#c10841]" to="/terms-condition/">&nbsp;이용 약관에 동의하는 것입니다.</Link>
              </p>
            </div>
          </div>
        </section>
        <section className="py-[25px] md:py-[30px] text-center leading-snug">
          <h2 className="text-[26px] font-bold py-2.5">최고의 Youtube MP3 및 MP4 다운로더</h2>
          <h4 className="my-2.5 text-lg leading-snug">
            Y2Mate는 광고 없이 YouTube, Facebook, Vimeo, Youku, Twitch, Dailymotion 등에서 좋아하는 동영상을 쉽게 변환하고 다운로드할 수 있도록 도와주는
            최고의 빠르고 무료인 Youtube 다운로더 도구입니다. 이 Y2mate 변환기를 사용하면 제한 없이 YouTube에서 mp3 및 mp4를 다운로드할 수 있습니다. 이것은 Android
            Mobiles, iOS, iPhone, 컴퓨터 및 태블릿과 같은 모든 장치와 호환되고 사용하기 쉽습니다.
          </h4>
          <h4 className="my-2.5 text-lg leading-snug">
            앱과 소프트웨어를 설치할 필요가 없습니다. Y2mate는 MP3, M4V, MP4, FLV, 3GP, AVI, WEBM, WMV 등과 같은 다양한 HD 품질의 오디오 및 비디오 형식을
            제공합니다. 간단한 단계로 YouTube 또는 기타 비디오 공유 플랫폼에서 비디오를 안전하고 빠르게 저장할 수 있습니다. .
          </h4>
        </section>
        <hr className="md: w-5/6 h-px mx-auto bg-gray-200 border-0 rounded dark:bg-gray-700"/>
        <section className="py-[30px] md:flex block justify-between">
          <div className="md:w-[60%] md:px-[15px]">
            <h5 className="text-lg my-1.5 font-normal"><strong>지침</strong></h5>
            <ol className="m-0 pl-4 list-decimal">
              <li className="mb-2.5 text-[17px]">
                입력란에 키워드를 입력하거나 변환하려는 동영상 URL을 붙여넣습니다.
              </li>
              <li className="mb-2.5 text-[17px]">"시작" 버튼을 클릭하기만 하면 변환이 시작됩니다.</li>
              <li className="mb-2.5 text-[17px]">
                다운로드 형식(비디오, 오디오) 및 품질을 선택한 다음 "다운로드" 버튼을 클릭합니다.
              </li>
            </ol>
          </div>
          <div className="md:w-[40%] md:px-[15px]">
            <h5 className="text-lg my-1.5 font-normal"><strong>Y2mate의 장점</strong></h5>
            <ol className="m-0 pl-4 list-disc">
              <li className="mb-2.5 text-[17px]">무료로 다운로드할 수 있는 동영상을 무제한으로 즐기세요</li>
              <li className="mb-2.5 text-[17px]">계정을 등록하거나 로그인할 필요가 없습니다.</li>
              <li className="mb-2.5 text-[17px]">모든 형식과 품질로 다운로드 지원</li>
              <li className="mb-2.5 text-[17px]">초고속 다운로드 및 변환 속도</li>
              <li className="mb-2.5 text-[17px]">100% 안전하고 안전한 변환기</li>
            </ol>
          </div>
        </section>
        <hr className="md: w-5/6 h-px mx-auto bg-gray-200 border-0 rounded dark:bg-gray-700"/>
        <section className="py-[25px] md:py-[30px] md:flex">
          <div className="md:w-1/3 text-center">
            <StaticImage src="../../images/gift.svg" placeholder="none" alt="y2mateGift" quality={50}/>
            <h3 className="text-primary text-[22px] font-bold mb-2 mt-[22px]">무료 및 무제한 다운로드</h3>
            <p className="mb-2.5">무제한 Youtube 비디오 변환 및 무료 다운로드</p>
          </div>
          <div className="md:w-1/3 text-center">
            <StaticImage src="../../images/download.svg" placeholder="none" alt="y2mateDownload" quality={50}/>
            <h3 className="text-primary text-[22px] font-bold mb-2 mt-[22px]">쉽고 빠른 다운로드</h3>
            <p className="mb-2.5">모든 브라우저 및 장치와 완벽하게 호환</p>
          </div>
          <div className="md:w-1/3 text-center">
            <StaticImage src="../../images/video.svg" placeholder="none" alt="y2mateSupport" quality={50}/>
            <h3 className="text-primary text-[22px] font-bold mb-2 mt-[22px]">고품질 비디오 및 오디오</h3>
            <p className="mb-2.5">원본 형식으로 고품질 오디오 및 비디오 다운로드 지원</p>
          </div>
        </section>
        <hr className="md: w-5/6 h-px mx-auto bg-gray-200 border-0 rounded dark:bg-gray-700"/>
        <section className="py-[30px]">
          <p className="max-w-full mb-2.5"><b>팁: </b>URL에서 www를 제거하고 추가 <b>“Y2mate”</b> URL의 "youtube.com" 앞에 더 빠른 솔루션으로
            YouTube에서 비디오( MP4 ) 및 오디오( MP3 ) 파일을 다운로드할 수 있습니다.
          </p>
          <p className="max-w-full mb-0.5">장치에 비디오를 다운로드할 수 없는 경우 다음 지침을 따르십시오.</p>
          <p className="max-w-full"><b>1단계: </b>원하는 형식을 선택하고 "다운로드" 버튼을 클릭합니다.</p>
          <p className="max-w-full mb-2.5"><b>2단계: </b>새 창에서 "CTRL + S"를 클릭하여 비디오를 저장하거나 비디오를 마우스 오른쪽 버튼으로 클릭한 다음 "비디오로
            저장"을 선택합니다.</p>
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
    <html lang="ko"/>
    <title>Y2mate - 유튜브 다운로더 | HD로 Youtube 비디오 무료 다운로드</title>
    <meta
      name="description"
      content="Y2mate는 사용하기 쉽고 강력한 Youtube 다운로더로 좋아하는 Youtube 비디오를 쉽게 저장하고 mp3 음악 및 mp4 파일로 무료로 다운로드할 수 있습니다."/>
    <meta name="robots" content="index,follow"/>
    <meta property="og:type" content="website"/>
    <meta property="og:site_name" content="y2mate"/>
    <meta property="og:locale" content="ko"/>
    <meta property="og:title" content="Y2mate - 유튜브 다운로더 | HD로 Youtube 비디오 무료 다운로드"/>
    <meta
      property="og:description"
      content="Y2mate는 사용하기 쉽고 강력한 Youtube 다운로더로 좋아하는 Youtube 비디오를 쉽게 저장하고 mp3 음악 및 mp4 파일로 무료로 다운로드할 수 있습니다."/>
    <meta property="og:image" content="https://y2mate.mobi/icons/icon-256x256.png"/>
    <meta property="og:url" content="https://y2mate.mobi/ko/"/>
    <link rel="icon" href="https://y2mate.mobi/icons/icon-256x256.png"/>
    <link rel="canonical" href="https://y2mate.mobi/ko/"/>
    <DownloaderAlternate/>
  </>
)
