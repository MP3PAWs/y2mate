import React, { useState } from 'react';
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image"
import '../styles/global.css';

const AboutUs = () => {
  const [open, setOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [openLanguage, setOpenLanguage] = useState(false);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setOpenLanguage(!openLanguage)
  };

  const languageOptions = [
    { lang: "en", label: "English", path: "/about-us/" }
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
        <section>
          <h1 className="text-center text-2xl font-bold my-3.5">About US</h1>
          <p className="mb-2.5">A wonderful tool for downloading YouTube videos and audio is Y2Mate, which also offers free HD video services. You are able to immediately search for music and video on YouTube by use of the Y2Mate conversion tool. Using a tool, convert MP4 and MP3 files from YouTube quickly and easily. You may automatically convert a maximum of videos. Our Y2Mate downloader is completely safe and free.</p>
        </section>
      </div>
      <footer className="absolute bottom-0 w-full">
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

export default AboutUs;

export const Head = () => (
  <>
    <html lang="en" />
    <title>Y2mate - About Us | Download Youtube Video Free</title>
    <meta
      name="description"
      content="y2mate is popular Free YouTube Downloader allow to Download YouTube video for Free with high quality in 1080p, 2160p, 2k, 4k, 8k without install software." />
    <meta name="robots" content="index,follow" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="y2mate" />
    <meta property="og:locale" content="en" />
    <meta property="og:title" content="y2mate - YouTube Downloader | Download YouTube Video Free" />
    <meta
      property="og:description"
      content="y2mate is popular Free YouTube Downloader allow to Download YouTube video for Free with high quality in 1080p, 2160p, 2k, 4k, 8k without install software." />
    <meta property="og:image" content="https://y2mate.mobi/icons/icon-256x256.png" />
    <meta property="og:url" content="https://y2mate.mobi/about-us/" />
    <meta itemProp="name" content="Y2mate About us | Download Youtube Video Free" />
    <meta itemProp="description"
      content="Y2mate is Best Youtube Downloader which Allows you to download videos and audio from youtube Free and Easy. It's Fastest Youtube Video Downloader to save MP3, MP4 " />
    <meta itemProp="image" content="https://y2mate.mobi/icons/icon-256x256.png" />
    <link rel="icon" href="https://y2mate.mobi/icons/icon-256x256.png" />
    <link rel="canonical" href="https://y2mate.mobi/about-us/" />
  </>
)
