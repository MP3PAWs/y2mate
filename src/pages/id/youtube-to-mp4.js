import React, {useState} from 'react';
import {Link, navigate} from "gatsby";
import {StaticImage} from "gatsby-plugin-image"
import '../../styles/global.css';
import {MP4Alternate} from "../../components/Alternate";

const YouTubeToMP4 = () => {
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState("test");
  const [selectedLanguage, setSelectedLanguage] = useState("id");
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
                <Link to="/id/" className="md:inline-flex flex items-center">
                  <StaticImage src="../../images/logo.png" placeholder="none" alt="y2mate" width={46}
                               quality={80}/>
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
                  <StaticImage src="../../images/mobile.svg" placeholder="none" alt="menu" width={25}
                               quality={80}/>
                </button>
              </div>
              <nav className="hidden md:flex">
                <Link
                  className="text-sm py-[23px] px-[15px] hover:text-primary"
                  to="/id/">
                  YouTube Downloader
                </Link>
                <Link
                  className="text-sm py-[23px] px-[15px] hover:text-primary"
                  to="/id/youtube-to-mp4/">
                  YouTube to MP4 Converter
                </Link>
                <Link
                  className="text-sm py-[23px] px-[15px] hover:text-primary"
                  to="/id/youtube-to-mp3/">
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
                        to="/id/">
                        YouTube Downloader
                      </Link>
                      <Link
                        className="-m-3 p-3 flex items-center hover:text-primary transition duration-300"
                        to="/id/youtube-to-mp4/">
                        YouTube to MP4 Converter
                      </Link>
                      <Link
                        className="-m-3 p-3 flex items-center hover:text-primary transition duration-300"
                        to="/id/youtube-to-mp3/">
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
            <h1 className="mb-2.5 md:text-[34px] leading-snug text-2xl font-medium">Konverter YouTube ke MP4
              - Y2mate</h1>
            <div className="relative m-auto my-[24px]	md:my-[43px] md:w-[600px]">
              <input
                type="text"
                className="block md:text-base	text-sm w-full px-4 font-[revert] h-[60px] border-[5px] !outline-none border-solid rounded border-[#ff0068]"
                placeholder="Cari atau tempel tautan di sini..."
                onChange={handleInputChange}
                onKeyDown={handleClickEnter}
              />
              <button
                className="md:px-4 rounded-r absolute top-0 right-0 font-[arial] text-sm md:w-[120px] w-[60px] h-[60px] -ml-1 text-white bg-button"
                onClick={handleClickConvert}>
                <span className="hidden md:contents">Awal</span>
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
                Dengan menggunakan layanan kami, Anda menerima
                <Link className="text-[#c10841]" to="/terms-condition/">&nbsp;Ketentuan Penggunaan
                  kami.</Link>
              </p>
            </div>
          </div>
        </section>
        <section className="py-[25px] md:py-[30px] text-center leading-snug">
          <h2 className="text-[26px] font-bold py-2.5">Konverter YouTube ke MP4 Terbaik</h2>
          <h4 className="my-2.5 text-lg leading-snug">
            Y2mate adalah pengonversi youtube ke mp4 online populer yang memungkinkan Anda dengan mudah
            mengonversi video youtube ke MP4 dan mengunduh dalam format berkualitas tinggi tanpa menginstal
            perangkat lunak apa pun. Anda dapat mengunduh video dari YouTube secara gratis dengan Pengunduh
            YouTube tercepat dan populer. Pengonversi YouTube ke mp4 cepat dan mudah digunakan.
          </h4>
          <h4 className="my-2.5 text-lg leading-snug">
            Ini adalah cara terbaik untuk mengunduh video YouTube dalam kualitas full HD termasuk 320p,
            480p, 720p, 1080p, 4K. Jadi Anda dapat menonton dan menikmati video secara offline. Ini adalah
            platform paling nyaman yang berfungsi di semua perangkat seperti Mac, PC, Android, dan iOS.
          </h4>
        </section>
        <hr className="md: w-5/6 h-px mx-auto bg-gray-200 border-0 rounded dark:bg-gray-700"/>
        <section className="py-[30px] md:flex block justify-between">
          <div className="md:w-[60%] md:px-[15px]">
            <h5 className="text-lg my-1.5 font-normal"><strong>Cara mengubah Youtube ke mp4 dengan
              Y2mate</strong></h5>
            <ol className="m-0 pl-4 list-decimal">
              <li className="mb-2.5 text-[17px]">Buka YouTube dan buka video yang ingin Anda unduh</li>
              <li className="mb-2.5 text-[17px]">Salin URL video YouTube</li>
              <li className="mb-2.5 text-[17px]">Rekatkan url Video YouTube ke dalam kotak input dan klik
                tombol "Cari".
              </li>
              <li className="mb-2.5 text-[17px]">Pilih format video yang ingin Anda unduh dari youtube
              </li>
              <li className="mb-2.5 text-[17px]">Tunggu hingga konversi selesai dan klik tombol "Unduh".
              </li>
            </ol>
          </div>
          <div className="md:w-[40%] md:px-[15px]">
            <h5 className="text-lg my-1.5 font-normal"><strong>Fitur Y2mate</strong></h5>
            <ol className="m-0 pl-4 list-disc">
              <li className="mb-2.5 text-[17px]">Tidak perlu menginstal perangkat lunak dan program ke
                perangkat Anda
              </li>
              <li className="mb-2.5 text-[17px]">Aplikasi berbasis web yang benar-benar aman dan aman</li>
              <li className="mb-2.5 text-[17px]">Unduh Video Mp4 dari YouTube tanpa batasan</li>
              <li className="mb-2.5 text-[17px]">Desain yang ramah pengguna dan sederhana membuat Unduhan
                YouTube ini mudah digunakan
              </li>
              <li className="mb-2.5 text-[17px]">Anda tidak perlu masuk atau mendaftar untuk mengonversi
                video YouTube ke mp4
              </li>
            </ol>
          </div>
        </section>
        <hr className="md: w-5/6 h-px mx-auto bg-gray-200 border-0 rounded dark:bg-gray-700"/>
        <section className="py-[25px] md:py-[30px] md:flex">
          <div className="md:w-1/3 text-center">
            <StaticImage src="../../images/gift.svg" placeholder="none" alt="y2mateGift" quality={50}/>
            <h3 className="text-primary text-[22px] font-bold mb-2 mt-[22px]">Konversi Cepat dan Mudah</h3>
            <p className="mb-2.5">Y2mate adalah alat yang mudah digunakan yang menyederhanakan proses
              konversi YouTube ke mp4. Jadi Anda dapat dengan mudah mengunduh video MP4 dari YouTube dan
              menontonnya secara offline.</p>
          </div>
          <div className="md:w-1/3 text-center">
            <StaticImage src="../../images/video.svg" placeholder="none" alt="y2mateSupport" quality={50}/>
            <h3 className="text-primary text-[22px] font-bold mb-2 mt-[22px]">Mendukung Banyak format</h3>
            <p className="mb-2.5">Situs web kami menyediakan berbagai jenis format video, termasuk MP4, MOV,
              M4A, AVI, WebM, 3GP, dan banyak lagi. Unduh Video dengan kualitas terbaik seperti 720p,
              1080p, 2k, 4k, dan hingga 8k</p>
          </div>
          <div className="md:w-1/3 text-center">
            <StaticImage src="../../images/download.svg" placeholder="none" alt="y2mateDownload"
                         quality={50}/>
            <h3 className="text-primary text-[22px] font-bold mb-2 mt-[22px]">Kompatibel dengan semua
              perangkat</h3>
            <p className="mb-2.5">YouTube ke MP4 kami berfungsi di browser web, jadi ini dapat diakses di
              semua perangkat dan OS termasuk Android, Windows, Mac, iOS, dan iPhone</p>
          </div>
        </section>
        <hr className="md: w-5/6 h-px mx-auto bg-gray-200 border-0 rounded dark:bg-gray-700"/>
        <section className="py-[30px]">
          <p className="max-w-full mb-2.5">Dengan Konverter YouTube ke Mp4 ini Anda dapat mengunduh dengan
            cepat menggunakan metode ini. Cukup ketik <b>“Y2mate”</b> sebelum URL Youtube dan tekan tombol
            Enter</p>
          <p className="max-w-full mb-0.5">Ini contohnya - youtube.com/watch?v=abc75hj =>
            y2mateyoutube.com/watch?v=abc75hj Pilih format yang ingin Anda unduh dan tekan tombol unduh</p>
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

export default YouTubeToMP4;

export const Head = () => (
  <>
    <html lang="id"/>
    <title>Konverter YouTube ke MP4 - Y2mate</title>
    <meta
      name="description"
      content="Konversikan YouTube ke MP4 menggunakan konverter Y2mate dalam langkah sederhana. cepat, aman, mudah digunakan"/>
    <meta name="robots" content="index,follow"/>
    <meta property="og:type" content="website"/>
    <meta property="og:site_name" content="y2mate"/>
    <meta property="og:locale" content="id"/>
    <meta property="og:title" content="Konverter YouTube ke MP4 - Y2mate"/>
    <meta
      property="og:description"
      content="Konversikan YouTube ke MP4 menggunakan konverter Y2mate dalam langkah sederhana. cepat, aman, mudah digunakan"/>
    <meta property="og:image" content="https://y2mate.mobi/icons/icon-256x256.png"/>
    <meta property="og:url" content="https://y2mate.mobi/id/youtube-to-mp4/"/>
    <link rel="icon" href="https://y2mate.mobi/icons/icon-256x256.png"/>
    <link rel="canonical" href="https://y2mate.mobi/id/youtube-to-mp4/"/>
    <MP4Alternate/>
  </>
)
