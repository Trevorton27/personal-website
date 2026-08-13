import { Header } from '@/components/public/Header';
import { Footer } from '@/components/public/Footer';

export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Trevor Mearns\' personal website.',
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-12 prose dark:prose-invert">
        <h1>Privacy Policy</h1>
        <p><strong>Last updated: August 2026</strong></p>
        <p>Welcome to my privacy policy—the page everyone definitely reads before clicking "Accept."</p>
        <p>Fortunately, this one is relatively painless.</p>

        <h2>The Short Version</h2>
        <p>I'm not particularly interested in your data.</p>
        <p>This website exists to show you who I am, what I build, and what I work on. It is not an elaborate scheme to determine which brand of toothpaste you're thinking about buying.</p>
        <p>I don't sell your personal information. I don't maintain a shadowy data brokerage operation. I don't have a secret underground analytics bunker.</p>

        <h2>Information You Give Me</h2>
        <p>If you contact me through this website, you may voluntarily provide things such as:</p>
        <ul>
          <li>Your name</li>
          <li>Your email address</li>
          <li>Whatever you decide to write in the message box</li>
        </ul>
        <p>I use this information for the shocking purpose of <strong>responding to you</strong>.</p>
        <p>I will not immediately add you to seventeen mailing lists, sell your email address to someone selling cryptocurrency courses, or have a salesperson named Chad call you during dinner.</p>

        <h2>Information Collected Automatically</h2>
        <p>Like most websites, some basic technical information may be collected automatically, including things like:</p>
        <ul>
          <li>Browser and device information</li>
          <li>Approximate location</li>
          <li>Pages visited</li>
          <li>Referring websites</li>
          <li>General usage and performance information</li>
        </ul>
        <p>This information may be used to understand whether the site works properly and whether anyone besides me actually visits it.</p>

        <h2>Cookies</h2>
        <p>This site may use cookies or similar technologies where necessary for functionality, authentication, analytics, or other site features.</p>
        <p>Sadly, these are not chocolate chip.</p>
        <p>You can generally control cookies through your browser settings. Blocking certain cookies may cause parts of the site to behave strangely, at which point we can both blame the browser.</p>

        <h2>Third-Party Services</h2>
        <p>The site may rely on third-party services for things such as hosting, analytics, authentication, forms, scheduling, or other functionality.</p>
        <p>Those services may process limited information according to their own privacy policies.</p>
        <p>I choose reputable providers, but I do not personally control every server on the Internet. My infrastructure budget has limits.</p>

        <h2>How I Use Your Information</h2>
        <p>Information collected through this site may be used to:</p>
        <ul>
          <li>Operate and maintain the website</li>
          <li>Respond to messages</li>
          <li>Diagnose technical problems</li>
          <li>Improve the site's functionality and usability</li>
          <li>Prevent abuse or security problems</li>
        </ul>
        <p>In other words: normal website things.</p>

        <h2>Selling Your Information</h2>
        <p>I do <strong>not</strong> sell your personal information.</p>
        <p>Apparently this needs its own section on the modern Internet, which tells you something about the modern Internet.</p>

        <h2>Data Security</h2>
        <p>Reasonable technical measures are used to protect information handled by this website.</p>
        <p>No Internet-connected system, however, can guarantee absolute security. Anyone promising otherwise is either lying or has somehow invented an Internet I haven't heard about.</p>

        <h2>Data Retention</h2>
        <p>I keep personal information only for as long as reasonably necessary for the purpose for which it was collected or where retention is otherwise required.</p>
        <p>I have no desire to preserve your 2026 contact-form submission for archaeologists to discover in the year 2473.</p>

        <h2>Your Choices</h2>
        <p>Depending on where you live, you may have rights concerning your personal information, including requesting access, correction, or deletion.</p>
        <p>If you have contacted me and would like your information deleted, contact me and I'll handle the request where applicable.</p>
        <p>No ceremonial paperwork or carrier pigeon required.</p>

        <h2>Changes to This Policy</h2>
        <p>I may occasionally update this policy as the website changes.</p>
        <p>If anything significant changes, I'll update this page and the date above.</p>
        <p>I will resist the temptation to send everyone a 6,000-word email announcing that paragraph 7.3(b) has been modified.</p>

        <h2>Contact</h2>
        <p>Questions about this privacy policy?</p>
        <p>You can contact me using the contact information provided on this website.</p>
        <p>Actual privacy questions are welcome.</p>
        <p>Complaints about the cookie joke will be carefully documented and then ignored.</p>
      </main>
      <Footer />
    </>
  );
}
