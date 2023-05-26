import React, { useEffect, useState } from 'react';
import { Link, navigate } from "gatsby";
import { StaticImage } from "gatsby-plugin-image"
import Spinner from "../images/loading.gif"
import '../styles/global.css';

const Search = (props) => {
  const url = props?.location?.state?.url
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(url || "test");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [openLanguage, setOpenLanguage] = useState(false);
  const [searchList, setSearchList] = useState();

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setOpenLanguage(!openLanguage)
  };

  useEffect(() => {
    handleApiCall()
  }, [url])

  const handleApiCall = async () => {
    try {
      const response = await fetch(`https://me0xn4hy3i.execute-api.us-east-1.amazonaws.com/staging/api/resolve/resolveYoutubeSearch?search=${inputValue}`);
      const json = await response.json();
      setSearchList(json.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const isYtUrl = (url) => {
    const ytRegex = new RegExp(
      /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\\-]+\?v=|embed\/|v\/)?)([\w\\-]+)(\S+)?$/g
    );
    return ytRegex.test(url)
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  };

  const handleClickEnter = (e) => {
    if (e.keyCode === 13) {
      if (isYtUrl(inputValue)) {
        navigate("/download", { state: { url: inputValue } });
      } else {
        navigate("/search", { state: { url: inputValue } });
      }
    }
  };

  const handleClickConvert = () => {
    if (isYtUrl(inputValue)) {
      navigate("/download", { state: { url: inputValue } });
    } else {
      navigate("/search", { state: { url: inputValue } });
    }
  };

  const languageOptions = [
    { lang: "en", label: "English", path: "/search/" }
  ];

  return (
    <>
      <div className="mx-auto md:max-w-[890px] px-3 md:px-0">
        <header className="h-[66px] flex items-center top-0">
          <div className="container mx-auto">
            <div className="flex justify-between items-center">
              <div className="md:flex lg:w-0 lg:flex-1">
                <Link to="/" className="md:inline-flex flex items-center">
                  <StaticImage src="../images/logo.png" placeholder="none" alt="y2mate" width={46} quality={80} />
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
                  <StaticImage src="../images/mobile.svg" placeholder="none" alt="menu" width={25} quality={80} />
                </button>
              </div>
              <nav className="hidden md:flex">
                <Link
                  className="text-sm py-[23px] px-[15px] hover:text-primary"
                  to="/">
                  YouTube Downloader
                </Link>
                <Link
                  className="text-sm py-[23px] px-[15px] hover:text-primary"
                  to="/youtube-to-mp3/">
                  YouTube to MP4 Converter
                </Link>
                <Link
                  className="text-sm py-[23px] px-[15px] hover:text-primary"
                  to="/youtube-to-mp4/">
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
            style={{ display: open ? "block" : "none" }}>
            <div className="shadow-lg">
              <div className="shadow-xs bg-white divide-y-2 divide-gray-50">
                <div className="pt-5 pb-6 px-5 space-y-6">
                  <div>
                    <nav className="grid gap-y-4">
                      <Link
                        className="-m-3 p-3 flex items-center hover:text-primary transition duration-300"
                        to="/">
                        YouTube Downloader
                      </Link>
                      <Link
                        className="-m-3 p-3 flex items-center hover:text-primary transition duration-300"
                        to="/youtube-to-mp3/">
                        YouTube to MP4 Converter
                      </Link>
                      <Link
                        className="-m-3 p-3 flex items-center hover:text-primary transition duration-300"
                        to="/youtube-to-mp4/">
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
            <h1 className="mb-2.5 md:text-[34px] leading-snug text-2xl font-medium">Y2mate - Youtube Downloader</h1>
            <div className="relative m-auto my-[24px]	md:my-[43px] md:w-[600px]">
              <input
                type="text"
                value={inputValue || ''}
                className="block md:text-base	text-sm w-full px-4 font-[revert] h-[60px] border-[5px] !outline-none border-solid rounded border-[#ff0068]"
                placeholder="Search or paste link here..."
                onChange={handleInputChange}
                onKeyDown={handleClickEnter}
              />
              <button
                className="md:px-4 rounded-r absolute top-0 right-0 font-[arial] text-sm md:w-[120px] w-[60px] h-[60px] -ml-1 text-white bg-button"
                onClick={handleClickConvert}>
                <span className="hidden md:contents">Start</span>
                <StaticImage className="mt-1" src="../images/left-arrow.svg" placeholder="none" alt="y2mate" />
              </button>
              <p className="text-xs md:text-sm text-[#666] leading-snug p-1.5">
                By using our service you are accepting our
                <Link className="text-[#c10841]" to="/terms-condition/">&nbsp;Terms of Use.</Link>
              </p>
            </div>
            <div className="max-w-[800px] m-auto m-6">
              {searchList ?
                <div className="grid md:grid-cols-4 grid-cols-2 gap-8">
                  {searchList?.map((item) => (
                    <Link
                      to={`/download`}
                      state={{ url: item?.videoId }}>
                      <img src={item?.imgSrc} alt={item?.title} />
                      <h3 className="text-sm hover:text-red-500 font-bold text-left mt-2">{item?.title}</h3>
                    </Link>
                  ))}
                </div> :
                <div className="flex justify-around">
                  <img
                    src={Spinner}
                    alt="spinner"
                  />
                </div>
              }
            </div>
          </div>
        </section>
        <section className="py-[25px] md:py-[30px] text-center leading-snug">
          <h2 className="text-[26px] font-bold py-2.5">Download Video and Audio from YouTube</h2>
          <h4 className="my-2.5 text-lg leading-snug">Y2mate Free and Popular Youtube Downloader using this tool you can
            convert & save videos from YouTube, Facebook, Youku, Dailymotion and etc. Y2mate offer choosing audio and
            video in various formats such as MP3, MP4, M4V, 3GP, WMV, FLV, MO, WEBM, etc. You can download videos
            quickly and easily from YouTube or any other video sharing website within a few clicks.</h4>
        </section>
        <hr className="md: w-5/6 h-px mx-auto bg-gray-200 border-0 rounded dark:bg-gray-700" />
        <section className="py-[30px] md:flex block justify-between">
          <div className="md:w-[60%] md:px-[15px]">
            <h5 className="text-lg my-1.5 font-normal"><strong>Instructions</strong></h5>
            <ol className="m-0 pl-4 list-decimal">
              <li className="mb-2.5 text-[17px]">Enter a keyword in the search box or paste the video link that you want
                to convert and download
              </li>
              <li className="mb-2.5 text-[17px]">Press the "Start" button and converting process start</li>
              <li className="mb-2.5 text-[17px]">Choose the Audio and Video format would you like to download then click
                on the Download button.
              </li>
            </ol>
          </div>
          <div className="md:w-[40%] md:px-[15px]">
            <h5 className="text-lg my-1.5 font-normal"><strong>Y2mate Advantage</strong></h5>
            <ol className="m-0 pl-4 list-disc">
              <li className="mb-2.5 text-[17px]">Convert and Download Absolutely free and Unlimited use As many as you
                want
              </li>
              <li className="mb-2.5 text-[17px]">We use Latest Technology so you can</li>
              <li className="mb-2.5 text-[17px]">No Need to register and login required</li>
              <li className="mb-2.5 text-[17px]">We support All video and audio formats conversion</li>
              <li className="mb-2.5 text-[17px]">You will not need to install third-party applications and software</li>
            </ol>
          </div>
        </section>
        <hr className="md: w-5/6 h-px mx-auto bg-gray-200 border-0 rounded dark:bg-gray-700" />
        <section className="py-[25px] md:py-[30px] md:flex">
          <div className="md:w-1/3 text-center">
            <StaticImage src="../images/gift.svg" placeholder="none" alt="y2mateGift" quality={50} />
            <h3 className="text-primary text-[22px] font-bold mb-2 mt-[22px]">Free Youtube Downloader</h3>
            <p className="mb-2.5">Unlimited and Free Youtube Conversion and Download.</p>
          </div>
          <div className="md:w-1/3 text-center">
            <StaticImage src="../images/video.svg" placeholder="none" alt="y2mateSupport" quality={50} />
            <h3 className="text-primary text-[22px] font-bold mb-2 mt-[22px]">Y2mate Support Multiple Audio and Video
              Format</h3>
            <p className="mb-2.5">Y2Mate offers various MP3 and MP4 Formats such as MP3, 3GP, MP4, WMA, M4A, FLV, WEBM
              and MO formats, etc.</p>
          </div>
          <div className="md:w-1/3 text-center">
            <StaticImage src="../images/download.svg" placeholder="none" alt="y2mateDownload" quality={50} />
            <h3 className="text-primary text-[22px] font-bold mb-2 mt-[22px]">Easy to use and Download</h3>
            <p className="mb-2.5">Y2mate is Easy to use and Fully Compatible with All Devices and Browsers</p>
          </div>
        </section>
        <hr className="md: w-5/6 h-px mx-auto bg-gray-200 border-0 rounded dark:bg-gray-700" />
        <section className="py-[30px]">
          <p className="max-w-full mb-2.5"><b>Tip: </b>Add the <b>“Y2mate”</b> word before Youtube and click Enter
            button this is a faster way to download video and audio from youtube.</p>
          <p className="max-w-full mb-2.5">For Example: youtube.com/watch?v=8KvjkdhuLk =
            y2mateyoutube.com/watch?v=8KvjkdhuLk</p>
          <p className="max-w-full mb-2.5">Then Choose the Format you want to download and press the Download button</p>
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

export default Search;

export const Head = () => (
  <>
    <html lang="en" />
    <title>Y2mate - Download Youtube Video Free</title>
    <meta
      name="description"
      content="y2mate is popular Free YouTube Downloader allow to Download YouTube video for Free with high quality in 1080p, 2160p, 2k, 4k, 8k without install software." />
    <meta name="robots" content="noindex,nofollow" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="y2mate" />
    <meta property="og:locale" content="en" />
    <meta property="og:title" content="y2mate - YouTube Downloader | Download YouTube Video Free" />
    <meta
      property="og:description"
      content="y2mate is popular Free YouTube Downloader allow to Download YouTube video for Free with high quality in 1080p, 2160p, 2k, 4k, 8k without install software." />
    <meta property="og:image" content="https://y2mate.mobi/icons/icon-256x256.png" />
    <meta property="og:url" content="https://y2mate.mobi/search/" />
    <meta itemProp="name" content="Y2mate About us | Download Youtube Video Free" />
    <meta itemProp="description"
      content="Y2mate is Best Youtube Downloader which Allows you to download videos and audio from youtube Free and Easy. It's Fastest Youtube Video Downloader to save MP3, MP4 " />
    <meta itemProp="image" content="https://y2mate.mobi/icons/icon-256x256.png" />
    <link rel="icon" href="https://y2mate.mobi/icons/icon-256x256.png" />
    <link rel="canonical" href="https://y2mate.mobi/search/" />
  </>
)
