import React, {useState} from 'react';
import {Link} from "gatsby";
import {StaticImage} from "gatsby-plugin-image"
import '../styles/global.css';

const Terms = () => {
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
          <h1 className="text-center text-2xl font-bold my-3.5">Terms and conditions</h1>
            <p className="mb-2.5">Welcome to Y2mate!</p>
            <p className="mb-2.5">These terms and conditions outline the rules and regulations for the use of Y2Mate's Website, located
              at <a className="text-[#0000EE]" href="https://y2mate.mobi/">https://y2mate.mobi/</a>.</p>
            <p className="mb-2.5">By accessing this website we assume you accept these terms and conditions. Do not continue to use Y2mate
              if you do not agree to take all of the terms and conditions stated on this page.</p>
            <p className="mb-2.5">The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice,
              and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and is
              compliant to the Company’s terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers
              to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to
              the offer, acceptance, and consideration of payment necessary to undertake the process of our assistance
              to the Client in the most appropriate manner for the express purpose of meeting the Client’s needs in
              respect of the provision of the Company’s stated services, in accordance with and subject to, prevailing
              law of Netherlands. Any use of the above terminology or other words in the singular, plural,
              capitalization, and/or he/she or they, are taken as interchangeable and therefore as referring to
              same.</p>
            <h2 className="my-2.5 font-normal text-2xl">Cookies</h2>
            <p className="mb-2.5">We employ the use of cookies. By accessing Y2mate, you agreed to use cookies in agreement with Y2Mate's
              Privacy Policy.</p>
            <p className="mb-2.5">Most interactive websites use cookies to let us retrieve the user’s details for each visit. Cookies are
              used by our website to enable the functionality of certain areas to make it easier for people visiting our
              website. Some of our affiliate/advertising partners may also use cookies.</p>
            <h2 className="my-2.5 font-normal text-2xl">License</h2>
            <p className="mb-2.5">Unless otherwise stated, Y2Mate and/or its licensors own the intellectual property rights for all
              material on Y2mate. All intellectual property rights are reserved. You may access this from Y2mate for
              your own personal use subjected to restrictions set in these terms and conditions.</p>
            <p className="mb-2.5">You must not:</p>
            <ul className="m-0 pl-4 list-disc">
              <li>Republish material from Y2mate</li>
              <li>Sell, rent or sub-license material from Y2mate</li>
              <li>Reproduce, duplicate or copy material from Y2mate</li>
              <li>Redistribute content from Y2mate</li>
            </ul>
            <p className="mb-2.5">This Agreement shall begin on the date hereof. Our Terms and Conditions were created with the help of the
              TermsFeed Free Terms and Conditions Generator.</p>
            <p className="mb-2.5">Parts of this website offer an opportunity for users to post and exchange opinions and information in
              certain areas of the website. Y2Mate does not filter, edit, publish or review Comments prior to their
              presence on the website. Comments do not reflect the views and opinions of Y2Mate, its agents, and/or
              affiliates. Comments reflect the views and opinions of the person who posts their views and opinions. To
              the extent permitted by applicable laws, Y2Mate shall not be liable for the Comments or for any liability,
              damages, or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance
              of the Comments on this website.</p>
            <p className="mb-2.5">Y2Mate reserves the right to monitor all Comments and to remove any Comments which can be considered
              inappropriate, offensive, or causes a breach of these Terms and Conditions.</p>
            <p className="mb-2.5">You warrant and represent that:</p>
            <ul className="m-0 pl-4 list-disc">
              <li>You are entitled to post the Comments on our website and have all necessary licenses and consents to
                do so;
              </li>
              <li>The Comments do not invade any intellectual property right, including without limitation copyright,
                patent, or trademark of any third party;
              </li>
              <li>The Comments do not contain any defamatory, libelous, offensive, indecent, or otherwise unlawful
                material which is an invasion of privacy
              </li>
              <li>The Comments will not be used to solicit or promote business or custom or present commercial
                activities or unlawful activity.
              </li>
            </ul>
            <p className="mb-2.5">You hereby grant Y2Mate a non-exclusive license to use, reproduce, edit and authorize others to use,
              reproduce and edit any of your Comments in any and all forms, formats, or media.</p>
            <h2 className="my-2.5 font-normal text-2xl">Hyperlinking to our Content</h2>
            <p className="mb-2.5">The following organizations may link to our Website without prior written approval:</p>
            <ul className="m-0 pl-4 list-disc">
              <li>Government agencies;</li>
              <li>Search engines;</li>
              <li>News organizations;</li>
              <li>Online directory distributors may link to our Website in the same manner as they hyperlink to the
                Websites of other listed businesses; and
              </li>
              <li>System-wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls,
                and charity fundraising groups which may not hyperlink to our Web site.
              </li>
            </ul>
            <p className="mb-2.5">These organizations may link to our home page, to publications or to other Website information so long as
              the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement, or
              approval of the linking party and its products and/or services; and (c) fits within the context of the
              linking party’s site.</p>
            <p className="mb-2.5">We may consider and approve other link requests from the following types of organizations:</p>
            <ul className="m-0 pl-4 list-disc">
              <li>commonly-known consumer and/or business information sources;</li>
              <li>dot.com community sites;</li>
              <li>associations or other groups representing charities;</li>
              <li>online directory distributors;</li>
              <li>internet portals;</li>
              <li>accounting, law, and consulting firms; and</li>
              <li>educational institutions and trade associations.</li>
            </ul>
            <p className="mb-2.5">We will approve link requests from these organizations if we decide that: (a) the link would not make us
              look unfavorably to ourselves or to our accredited businesses; (b) the organization does not have any
              negative records with us; (c) the benefit to us from the visibility of the hyperlink compensates the
              absence of Y2Mate, and (d) the link is in the context of general resource information.</p>
            <p className="mb-2.5">These organizations may link to our home page so long as the link: (a) is not in any way deceptive; (b)
              does not falsely imply sponsorship, endorsement or approval of the linking party and its products or
              services; and (c) fits within the context of the linking party’s site.</p>
            <p className="mb-2.5">If you are one of the organizations listed in paragraph 2 above and are interested in linking to our
              website, you must inform us by sending an e-mail to Y2Mate. Please include your name, your organization
              name, contact information as well as the URL of your site, a list of any URLs from which you intend to
              link to our Website, and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks
              for a response.</p>
            <p className="mb-2.5">Approved organizations may hyperlink to our Website as follows:</p>
            <ul className="m-0 pl-4 list-disc">
              <li>By use of our corporate name; or</li>
              <li>By use of the uniform resource locator being linked to; or</li>
              <li>By use of any other description of our Website being linked to that makes sense within the context and
                format of content on the linking party’s site.
              </li>
            </ul>
            <p className="mb-2.5">No use of Y2Mate's logo or other artwork will be allowed for linking absent a trademark license
              agreement.</p>
            <h2 className="my-2.5 font-normal text-2xl">iFrames</h2>
            <p className="mb-2.5">Without prior approval and written permission, you may not create frames around our Webpages that alter
              in any way the visual presentation or appearance of our Website.</p>
            <h2 className="my-2.5 font-normal text-2xl">Content Liability</h2>
            <p className="mb-2.5">We shall not be held responsible for any content that appears on your Website. You agree to protect and
              defend us against all claims that are rising on your Website. No link(s) should appear on any Website that
              may be interpreted as libelous, obscene, or criminal, or which infringes, otherwise violates, or advocates
              the infringement or other violation of, any third party rights.</p>
            <h2>Your Privacy</h2>
            <p className="mb-2.5">Please read Privacy Policy</p>
            <h2 className="my-2.5 font-normal text-2xl">Reservation of Rights</h2>
            <p className="mb-2.5">We reserve the right to request that you remove all links or any particular link to our Website. You
              approve to immediately remove all links to our Website upon request. We also reserve the right to amend
              these terms and conditions and its linking policy at any time. By continuously linking to our Website, you
              agree to be bound to and follow these linking terms and conditions.</p>
            <h2 className="my-2.5 font-normal text-2xl">Removal of links from our website</h2>
            <p className="mb-2.5">If you find any link on our Website that is offensive for any reason, you are free to contact and inform
              us at any moment. We will consider requests to remove links but we are not obligated to or so or to
              respond to you directly.</p>
            <p className="mb-2.5">We do not ensure that the information on this website is correct, we do not warrant its completeness or
              accuracy; nor do we promise to ensure that the website remains available or that the material on the
              website is kept up to date.</p>
            <h2 className="my-2.5 font-normal text-2xl">Disclaimer</h2>
            <p className="mb-2.5">To the maximum extent permitted by applicable law, we exclude all representations, warranties, and
              conditions relating to our website and the use of this website. Nothing in this disclaimer will:</p>
            <ul className="m-0 pl-4 list-disc">
              <li>limit or exclude our or your liability for death or personal injury;</li>
              <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
              <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
              <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
            </ul>
            <p className="mb-2.5">The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a)
              are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer,
              including liabilities arising in contract, in tort, and for breach of statutory duty.</p>
            <p className="mb-2.5">As long as the website and the information and services on the website are provided free of charge, we
              will not be liable for any loss or damage of any nature.</p>
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

export default Terms;

export const Head = () => (
  <>
    <html lang="en"/>
    <title>Y2mate - Terms & Condition | Download Youtube Video Free</title>
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
    <meta property="og:url" content="https://y2mate.mobi/terms-condition/"/>
    <meta itemProp="name" content="Y2mate About us | Download Youtube Video Free"/>
    <meta itemProp="description"
          content="Y2mate is Best Youtube Downloader which Allows you to download videos and audio from youtube Free and Easy. It's Fastest Youtube Video Downloader to save MP3, MP4 "/>
    <meta itemProp="image" content="https://y2mate.mobi/icons/icon-256x256.png"/>
    <link rel="icon" href="https://y2mate.mobi/icons/icon-256x256.png"/>
    <link rel="canonical" href="https://y2mate.mobi/terms-condition/"/>
  </>
)