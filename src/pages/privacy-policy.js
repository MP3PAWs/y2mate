import React, {useState} from 'react';
import {Link} from "gatsby";
import {StaticImage} from "gatsby-plugin-image"
import '../styles/global.css';

const PrivacyPolicy = () => {
  const [open, setOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [openLanguage, setOpenLanguage] = useState(false);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setOpenLanguage(!openLanguage)
  };

  const languageOptions = [
    {lang: "en", label: "English", path: "/about-us/"}
  ];

  return (
    <>
      <div className="mx-auto md:max-w-[890px] px-3 md:px-0">
        <header className="h-[66px] flex items-center top-0">
          <div className="container mx-auto">
            <div className="flex justify-between items-center">
              <div className="md:flex lg:w-0 lg:flex-1">
                <Link to="/" className="md:inline-flex flex items-center">
                  <StaticImage src="../images/logo.png" placeholder="none" alt="y2mate" width={46} quality={80}/>
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
                  <StaticImage src="../images/mobile.svg" placeholder="none" alt="menu" width={25} quality={80}/>
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
            style={{display: open ? "block" : "none"}}>
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
          <h1 className="text-center text-2xl font-bold my-3.5">Privacy Policy</h1>
            <p className="mb-2.5"><a className="text-[#0000EE]" href="https://y2mate.mobi/">https://y2mate.mobi/</a>, accessible from y2mate@gamil.com, one of our main
              priorities is the privacy of our visitors. This Privacy Policy document contains types of information that
              is collected and recorded by https://y2mate.mobi/ and how we use it.</p>
            <p className="mb-2.5">If you have additional questions or require more information about our Privacy Policy, do not hesitate to
              contact us.</p>
            <p className="mb-2.5">This Privacy Policy applies only to our online activities and is valid for visitors to our website with
              regards to the information that they shared and/or collect in https://y2mate.mobi/. This policy is not
              applicable to any information collected offline or via channels other than this website. Our Privacy
              Policy was created with the help of the TermsFeed Free Privacy Policy Generator.</p>
            <h2 className="my-2.5 font-normal text-2xl"> Consent</h2>
            <p className="mb-2.5">By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>
            <h3 className="my-2.5 font-semibold text-xl">Information we collect</h3>
            <p className="mb-2.5">
              The personal information that you are asked to provide, and the reasons why you are asked to provide it,
              will be made clear to you at the point we ask you to provide your personal information.
            </p>
            <p className="mb-2.5">If you contact us directly, we may receive additional information about you such as your name, email
              address, phone number, the contents of the message and/or attachments you may send us, and any other
              information you may choose to provide.</p>
            <p className="mb-2.5">When you register for an Account, we may ask for your contact information, including items such as name,
              company name, address, email address, and telephone number.</p>
            <h2 className="my-2.5 font-normal text-2xl">How we use your information</h2>
            <p className="mb-2.5">We use the information we collect in various ways, including:</p>
            <ul className="m-0 pl-4 list-disc">
              <li>Provide, operate, and maintain our website</li>
              <li>Improve, personalize, and expand our website</li>
              <li>Understand and analyze how you use our website</li>
              <li>Develop new products, services, features, and functionality</li>
              <li>Communicate with you, either directly or through one of our partners, including for customer service,
                to provide you with updates and other information relating to the website, and for marketing and
                promotional purposes
              </li>
              <li>Send you emails</li>
              <li>Find and prevent fraud</li>
            </ul>
            <h2 className="my-2.5 font-normal text-2xl">Log Files</h2>
            <p className="mb-2.5">https://y2mate.mobi/ follows a standard procedure of using log files. These files log visitors when they visit
              websites. All hosting companies do this and are a part of hosting services' analytics. The information
              collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider
              (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked
              to any information that is personally identifiable. The purpose of the information is for analyzing
              trends, administering the site, tracking users' movement on the website, and gathering demographic
              information.</p>
            <h3 className="my-2.5 font-semibold text-xl">Cookies and Web Beacons</h3>
            <p className="mb-2.5">Like any other website, https://y2mate.mobi/ uses 'cookies'. These cookies are used to store information
              including visitors' preferences, and the pages on the website that the visitor accessed or visited. The
              information is used to optimize the users' experience by customizing our web page content based on
              visitors' browser type and/or other information.</p>
            <h3 className="my-2.5 font-semibold text-xl">Our Advertising Partners</h3>
            <p className="mb-2.5">Some the advertisers on our site may use cookies and web beacons. Our advertising partners are listed
              below. Each of our advertising partners has its own Privacy Policy for its policies on user data. For
              easier access, we hyperlinked to their Privacy Policies below.</p>
            <ul className="m-0 pl-4 list-disc">
              <li>Google</li>
            </ul>
            <p className="mb-2.5">https://policies.google.com/technologies/ads</p>
            <h2 className="my-2.5 font-normal text-2xl">Advertising Partners Privacy Policies</h2>
            <p className="mb-2.5">You may consult this list to find the Privacy Policy for each of the advertising partners of
              https://y2mate.mobi/</p>
            <p className="mb-2.5">Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are
              used in their respective advertisements and links that appear on https://y2mate.mobi/, which are sent
              directly to users' browser. They automatically receive your IP address when this occurs. These
              technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize
              the advertising content that you see on websites that you visit.</p>
            <p className="mb-2.5">Note that https://y2mate.mobi/ has no access to or control over these cookies that are used by third-party
              advertisers.</p>
            <h2 className="my-2.5 font-normal text-2xl">Third-Party Privacy Policies</h2>
            <p className="mb-2.5">https://y2mate.mobi Privacy Policy does not apply to other advertisers or websites. Thus, we are advising
              you to consult the respective Privacy Policies of these third-party ad servers for more detailed
              information. It may include their practices and instructions about how to opt-out of certain options.</p>
            <p className="mb-2.5">You can choose to disable cookies through your individual browser options. To know more detailed
              information about cookie management with specific web browsers, it can be found at the browsers'
              respective websites.</p>
            <h2 className="my-2.5 font-normal text-2xl">CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>
            <p className="mb-2.5">Under the CCPA, among other rights, California consumers have the right to:</p>
            <p className="mb-2.5">Request that a business that collects a consumer's personal data disclose the categories and specific
              pieces of personal data that a business has collected about consumers.</p>
            <p className="mb-2.5">Request that a business deletes any personal data about the consumer that a business has collected.</p>
            <p className="mb-2.5">Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</p>
            <p className="mb-2.5">If you make a request, we have one month to respond to you. If you would like to exercise any of these
              rights, please contact us.</p>
            <h2 className="my-2.5 font-normal text-2xl">GDPR Data Protection Rights</h2>
            <p className="mb-2.5">We would like to make sure you are fully aware of all of your data protection rights. Every user is
              entitled to the following:</p>
            <p className="mb-2.5">The right to access – You have the right to request copies of your personal data. We may charge you a
              small fee for this service.</p>
            <p className="mb-2.5">The right to rectification – You have the right to request that we correct any information you believe is
              inaccurate. You also have the right to request that we complete the information you believe is
              incomplete.</p>
            <p className="mb-2.5">The right to erasure – You have the right to request that we erase your personal data, under certain
              conditions.</p>
            <p className="mb-2.5">The right to restrict processing – You have the right to request that we restrict the processing of your
              personal data, under certain conditions.</p>
            <p className="mb-2.5">The right to object to processing – You have the right to object to our processing of your personal data,
              under certain conditions.</p>
            <p className="mb-2.5">The right to data portability – You have the right to request that we transfer the data that we have
              collected to another organization, or directly to you, under certain conditions.</p>
            <p className="mb-2.5">If you make a request, we have one month to respond to you. If you would like to exercise any of these
              rights, please contact us.</p>
            <h2 className="my-2.5 font-normal text-2xl">Children's Information</h2>
            <p className="mb-2.5">Another part of our priority is adding protection for children while using the internet. We encourage
              parents and guardians to observe, participate in, and/or monitor and guide their online activity.</p>
            <p className="mb-2.5">https://y2mate.mobi does not knowingly collect any Personal Identifiable Information from children under the
              age of 13. If you think that your child provided this kind of information on our website, we strongly
              encourage you to contact us immediately and we will do our best efforts to promptly remove such
              information from our records.</p>
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

export default PrivacyPolicy;

export const Head = () => (
  <>
    <html lang="en"/>
    <title>Y2mate - Privacy Policy | Download Youtube Video Free</title>
    <meta
      name="description"
      content="y2mate is popular Free YouTube Downloader allow to Download YouTube video for Free with high quality in 1080p, 2160p, 2k, 4k, 8k without install software."/>
    <meta name="robots" content="index,follow"/>
    <meta property="og:type" content="website"/>
    <meta property="og:site_name" content="y2mate"/>
    <meta property="og:locale" content="en"/>
    <meta property="og:title" content="y2mate - YouTube Downloader | Download YouTube Video Free"/>
    <meta
      property="og:description"
      content="y2mate is popular Free YouTube Downloader allow to Download YouTube video for Free with high quality in 1080p, 2160p, 2k, 4k, 8k without install software."/>
    <meta property="og:image" content="https://y2mate.mobi/icons/icon-256x256.png"/>
    <meta property="og:url" content="https://y2mate.mobi/privacy-policy/"/>
    <meta itemProp="name" content="Y2mate About us | Download Youtube Video Free"/>
    <meta itemProp="description"
          content="Y2mate is Best Youtube Downloader which Allows you to download videos and audio from youtube Free and Easy. It's Fastest Youtube Video Downloader to save MP3, MP4 "/>
    <meta itemProp="image" content="https://y2mate.mobi/icons/icon-256x256.png"/>
    <link rel="icon" href="https://y2mate.mobi/icons/icon-256x256.png"/>
    <link rel="canonical" href="https://y2mate.mobi/privacy-policy/"/>
  </>
)