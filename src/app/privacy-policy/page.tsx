import Link from "next/link";
import Image from "next/image";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#F5F5F3]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#F5F5F3] px-6 pt-10 pb-5 md:px-10 lg:px-12">
        <nav className="flex items-center justify-between">
          <Link href="/" className="block">
            <Image
              src="/logo.jpg"
              alt="NM Group"
              width={140}
              height={44}
              className="h-11 w-auto"
            />
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-[#493425] hover:text-[#8D7660] transition-colors flex items-center gap-2"
          >
            <span>←</span> Back to Home
          </Link>
        </nav>
      </header>

      {/* Content */}
      <div
        className="pt-32 pb-20"
        style={{
          paddingLeft: "48px",
          paddingRight: "48px",
        }}
      >
        <div className="max-w-3xl">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-normal text-[#493425] tracking-tight leading-tight mb-16"
            style={{ letterSpacing: "-0.02em" }}
          >
            Privacy Policy
          </h1>

          {/* Who we are */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-[#493425] mb-4">
              Who we are
            </h2>
            <p className="text-sm font-medium text-[#8D7660] leading-[170%]">
              Our website address is:{" "}
              <a
                href="https://thenmgroup.com"
                className="text-[#493425] hover:text-[#8D7660] transition-colors underline"
              >
                https://thenmgroup.com
              </a>
            </p>
          </section>

          {/* Comments */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-[#493425] mb-4">
              Comments
            </h2>
            <p className="text-sm font-medium text-[#8D7660] leading-[170%] mb-4">
              When visitors leave comments on the site we collect the data shown in the comments form, and also the visitor&apos;s IP address and browser user agent string to help spam detection.
            </p>
            <p className="text-sm font-medium text-[#8D7660] leading-[170%]">
              An anonymized string created from your email address (also called a hash) may be provided to the Gravatar service to see if you are using it. The Gravatar service privacy policy is available here:{" "}
              <a
                href="https://automattic.com/privacy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#493425] hover:text-[#8D7660] transition-colors underline"
              >
                https://automattic.com/privacy/
              </a>
              . After approval of your comment, your profile picture is visible to the public in the context of your comment.
            </p>
          </section>

          {/* Media */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-[#493425] mb-4">
              Media
            </h2>
            <p className="text-sm font-medium text-[#8D7660] leading-[170%]">
              If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS) included. Visitors to the website can download and extract any location data from images on the website.
            </p>
          </section>

          {/* Cookies */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-[#493425] mb-4">
              Cookies
            </h2>
            <p className="text-sm font-medium text-[#8D7660] leading-[170%] mb-4">
              If you leave a comment on our site you may opt-in to saving your name, email address and website in cookies. These are for your convenience so that you do not have to fill in your details again when you leave another comment. These cookies will last for one year.
            </p>
            <p className="text-sm font-medium text-[#8D7660] leading-[170%] mb-4">
              If you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser.
            </p>
            <p className="text-sm font-medium text-[#8D7660] leading-[170%] mb-4">
              When you log in, we will also set up several cookies to save your login information and your screen display choices. Login cookies last for two days, and screen options cookies last for a year. If you select &quot;Remember Me&quot;, your login will persist for two weeks. If you log out of your account, the login cookies will be removed.
            </p>
            <p className="text-sm font-medium text-[#8D7660] leading-[170%]">
              If you edit or publish an article, an additional cookie will be saved in your browser. This cookie includes no personal data and simply indicates the post ID of the article you just edited. It expires after 1 day.
            </p>
          </section>

          {/* Embedded content from other websites */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-[#493425] mb-4">
              Embedded content from other websites
            </h2>
            <p className="text-sm font-medium text-[#8D7660] leading-[170%] mb-4">
              Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website.
            </p>
            <p className="text-sm font-medium text-[#8D7660] leading-[170%]">
              These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracking your interaction with the embedded content if you have an account and are logged in to that website.
            </p>
          </section>

          {/* Who we share your data with */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-[#493425] mb-4">
              Who we share your data with
            </h2>
            <p className="text-sm font-medium text-[#8D7660] leading-[170%]">
              If you request a password reset, your IP address will be included in the reset email.
            </p>
          </section>

          {/* How long we retain your data */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-[#493425] mb-4">
              How long we retain your data
            </h2>
            <p className="text-sm font-medium text-[#8D7660] leading-[170%] mb-4">
              If you leave a comment, the comment and its metadata are retained indefinitely. This is so we can recognize and approve any follow-up comments automatically instead of holding them in a moderation queue.
            </p>
            <p className="text-sm font-medium text-[#8D7660] leading-[170%]">
              For users that register on our website (if any), we also store the personal information they provide in their user profile. All users can see, edit, or delete their personal information at any time (except they cannot change their username). Website administrators can also see and edit that information.
            </p>
          </section>

          {/* What rights you have over your data */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-[#493425] mb-4">
              What rights you have over your data
            </h2>
            <p className="text-sm font-medium text-[#8D7660] leading-[170%]">
              If you have an account on this site, or have left comments, you can request to receive an exported file of the personal data we hold about you, including any data you have provided to us. You can also request that we erase any personal data we hold about you. This does not include any data we are obliged to keep for administrative, legal, or security purposes.
            </p>
          </section>

          {/* Where your data is sent */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-medium text-[#493425] mb-4">
              Where your data is sent
            </h2>
            <p className="text-sm font-medium text-[#8D7660] leading-[170%]">
              Visitor comments may be checked through an automated spam detection service.
            </p>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer
        className="bg-[#241B14] text-white"
        style={{
          paddingLeft: "48px",
          paddingRight: "48px",
          paddingTop: "6vh",
          paddingBottom: "6vh",
        }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-medium text-white/60">
            © {new Date().getFullYear()} NM Group. All rights reserved.
          </p>
          <Link
            href="/"
            className="text-xs font-medium text-white/60 hover:text-white transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </footer>
    </main>
  );
}
