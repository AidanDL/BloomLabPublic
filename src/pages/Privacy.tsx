import type { ReactNode } from 'react'
import { Page } from '../components/SiteChrome'
import { PLACEHOLDER, site } from '../site.config'
import { policySections } from './policySections'

/** Shows [value], or a highlighted reminder while it is still a placeholder. */
function Fill({ value, label }: { value: string; label: string }) {
  if (value === PLACEHOLDER) return <span className="placeholder">[{label}]</span>
  return <>{value}</>
}

function ContactLink(): ReactNode {
  if (site.contactEmail === PLACEHOLDER) return <Fill value={site.contactEmail} label="contact email" />
  return <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
}

function Ext({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} rel="noopener">
      {children}
    </a>
  )
}

const links = {
  googlePrivacy: 'https://policies.google.com/privacy',
  partnerSites: 'https://policies.google.com/technologies/partner-sites',
  googleAds: 'https://policies.google.com/technologies/ads',
  firebase: 'https://firebase.google.com/support/privacy',
}

/** The Bloom Lab privacy policy. */
export function Privacy() {
  const [
    summary,
    who,
    collect,
    progress,
    ads,
    consent,
    firebase,
    notifications,
    purchases,
    permissions,
    device,
    use,
    children,
    rights,
    retention,
    security,
    transfers,
    changes,
    contact,
  ] = policySections
  return (
    <Page onHome={false}>
      <article className="policy">
        <div className="container">
          <h1>Privacy policy</h1>
          <p className="updated">Last updated: {site.privacyLastUpdated}</p>

          <h2>{summary}</h2>
          <div className="summary">
            <p>
              {site.gameName} has no accounts of its own, and we never ask for your name or email address. Your
              greenhouse is saved on your device and, if you sign in to Google Play Games, backed up to your Play Games
              Saved Games. The game uses Google services to show ads (Google AdMob), to understand how the game is
              played and fix crashes (Firebase), and to handle purchases (Google Play). We do not sell your personal
              data.
            </p>
          </div>

          <h2>{who}</h2>
          <p>
            {site.gameName} (Android package <code>{site.androidPackage}</code>) is developed and published by{' '}
            <Fill value={site.developerName} label="developer name" /> (“we”, “us”). This policy explains what
            information is collected when you play {site.gameName}, why, and the choices you have.
          </p>

          <h2>{collect}</h2>
          <p>
            <strong>We do not ask you for personal information.</strong> There is no {site.gameName} account to
            create, and the game does not request your name, email address, contacts, photos, camera, microphone or
            location.
          </p>
          <p>
            The game uses services provided by Google, which collect some information from your device as described
            in the sections below: Google Play Games, Google AdMob, Firebase (Analytics, Crashlytics, Remote Config and
            Cloud Messaging) and Google Play Billing.
          </p>

          <h2>{progress}</h2>
          <p>Your game progress is saved on your device.</p>
          <p>
            If you are signed in to <strong>Google Play Games</strong>, {site.gameName} also backs up your progress
            to Play Games <strong>Saved Games</strong>. That backup is stored by Google and tied to your Play Games
            profile. The game shows your Play Games player name
            in Settings. If we add Play Games achievements or leaderboards, Google Play Games may also record your
            achievement and leaderboard data.
          </p>
          <p>
            Google Play Games is provided by Google under the <Ext href={links.googlePrivacy}>Google Privacy Policy</Ext>
            . If you do not sign in to Play Games, your progress stays on your device only.
          </p>

          <h2>{ads}</h2>
          <p>
            {site.gameName} is free to play and shows ads through the Google Mobile Ads SDK (Google AdMob): optional
            rewarded ads that you choose to watch in exchange for an in-game reward, and occasional full-screen
            (interstitial) ads. To show and measure ads, limit how often you see them (frequency capping) and prevent
            fraud, Google may collect and process information such as:
          </p>
          <ul>
            <li>your device’s Android advertising ID;</li>
            <li>your IP address, which can be used to estimate your general location;</li>
            <li>device and app information, such as device model, operating system version and app version;</li>
            <li>ad interactions and usage information, such as which ads were shown or tapped.</li>
          </ul>
          <p>
            Ads are personalised only if you consent (see below). Google’s use of this information is governed by the{' '}
            <Ext href={links.googlePrivacy}>Google Privacy Policy</Ext>. You can read more in{' '}
            <Ext href={links.partnerSites}>How Google uses information from sites or apps that use our services</Ext>{' '}
            and <Ext href={links.googleAds}>How Google uses advertising</Ext>.
          </p>

          <h2>{consent}</h2>
          <p>
            Where the law requires it – for example in the European Economic Area and the UK (GDPR), and in US states
            with privacy laws – the game asks for your choices using Google’s User Messaging Platform (UMP). You can
            choose whether Google may use your data for personalised ads. If you decline, you may still see
            non-personalised ads, which use more limited data.
          </p>
          <p>
            Where this applies, you can change your choices at any time from <strong>Settings → Ad privacy choices</strong>{' '}
            inside the game.
          </p>

          <h2>{firebase}</h2>
          <p>{site.gameName} uses Firebase, a set of services provided by Google:</p>
          <ul>
            <li>
              <strong>Firebase Analytics</strong> records gameplay events – such as planting, breeding, filling orders,
              buying upgrades, watching ads and making purchases – together with a pseudonymous app-instance ID and
              device information. Google may derive an approximate location from your IP address. We use these
              reports to understand how the game is played and to improve it.
            </li>
            <li>
              <strong>Firebase Crashlytics</strong> sends a crash report if the game crashes, including device and
              operating system information and technical details of the error (a stack trace), so we can fix bugs.
            </li>
            <li>
              <strong>Firebase Remote Config</strong> fetches game settings from Firebase. This uses a Firebase installation ID.
            </li>
            <li>
              <strong>Firebase Cloud Messaging</strong> is used only if you turn on reminders. It gives your device a
              push token so we can send announcements, such as in-game events.
            </li>
          </ul>
          <p>
            None of this includes your name or email address. Firebase’s handling of data is described on the{' '}
            <Ext href={links.firebase}>Privacy and Security in Firebase</Ext> page and in the{' '}
            <Ext href={links.googlePrivacy}>Google Privacy Policy</Ext>.
          </p>

          <h2>{notifications}</h2>
          <p>
            Notifications are optional. The game asks for permission in context, when a reminder would be useful.
            Reminders are scheduled on your device. You can turn notifications off
            at any time in the game’s Settings or in your Android settings.
          </p>

          <h2>{purchases}</h2>
          <p>
            Optional in-app purchases are processed entirely by Google Play Billing. We never see your payment card or
            billing details – the game only receives a purchase confirmation from Google Play so it can deliver your
            item. Google’s handling of payment information is described in the{' '}
            <Ext href={links.googlePrivacy}>Google Privacy Policy</Ext>.
          </p>

          <h2>{permissions}</h2>
          <p>{site.gameName} requests only these Android permissions:</p>
          <ul>
            <li>
              <strong>Internet and network state</strong> – to load ads, back up progress to Play Games, fetch game
              settings and send analytics and crash reports.
            </li>
            <li>
              <strong>Notifications</strong> (Android 13 and later) – optional, only if you allow reminders.
            </li>
            <li>
              <strong>Run at start-up</strong> (boot completed) – to reschedule your reminders after your device
              restarts.
            </li>
            <li>
              <strong>Advertising ID</strong> – added by the Google Mobile Ads SDK so ads can work as described above.
            </li>
            <li>
              <strong>Billing</strong> – so Google Play can handle in-app purchases.
            </li>
          </ul>
          <p>The game does not request location, camera, microphone, contacts or storage permissions.</p>

          <h2>{device}</h2>
          <p>The game saves the following on your device, so you can pick up where you left off:</p>
          <ul>
            <li>game progress, such as your plants, discoveries, orders and upgrades;</li>
            <li>settings, such as sound, haptics and reminders.</li>
          </ul>
          <p>
            Sound and haptics do not collect any data. The <strong>Share</strong> button opens Android’s share sheet
            with a short text message; the game itself does not send anything – you choose where, or whether, to
            share it.
          </p>

          <h2>{use}</h2>
          <ul>
            <li>to save and back up your progress;</li>
            <li>to show ads, including personalised ads only where you have agreed;</li>
            <li>to understand how the game is played, balance it and fix crashes;</li>
            <li>to deliver purchases and send reminders you have turned on.</li>
          </ul>
          <p>
            <strong>We do not sell your personal data.</strong>
          </p>

          <h2>{children}</h2>
          <p>
            {site.gameName} is not directed at children under the age of 13, and we do not knowingly collect personal
            information from children. If you believe a child has provided information through the game, please
            contact us and we will help.
          </p>

          <h2>{rights}</h2>
          <ul>
            <li>
              <strong>Personalised ads:</strong> where shown, change your choice in Settings → Ad privacy choices, or
              turn off ad personalisation in your Android settings.
            </li>
            <li>
              <strong>Advertising ID:</strong> you can reset or delete your advertising ID in your Android settings at
              any time.
            </li>
            <li>
              <strong>Notifications:</strong> turn reminders off in the game’s Settings or your Android settings.
            </li>
            <li>
              <strong>Play Games:</strong> you can play without signing in to Google Play Games, and manage or remove
              your Play Games data from your Google Play Games settings.
            </li>
            <li>
              <strong>Your legal rights:</strong> depending on where you live (for example under the UK or EU GDPR, or
              US state laws such as the CCPA), you may have rights to access, correct, delete or obtain a copy of your
              personal data, to object to or restrict its use, and to complain to your local data protection
              authority. Contact us at <ContactLink /> and we will help with anything we can access.
            </li>
          </ul>

          <h2>{retention}</h2>
          <p>
            Data stored on your device remains until you clear the app’s data or uninstall the game – deleting the
            app removes it. Your Play Games Saved Games backup can be removed from your Google Play Games settings.
            Information collected by Google’s services (Play Games, AdMob and Firebase) is kept according to Google’s
            own policies; see the <Ext href={links.googlePrivacy}>Google Privacy Policy</Ext> and{' '}
            <Ext href={links.firebase}>Privacy and Security in Firebase</Ext>.
          </p>
          <p>
            You can email <ContactLink /> with any questions, or to ask us to delete any information about you that we
            can access.
          </p>

          <h2>{security}</h2>
          <p>
            Game data is stored in the app’s private storage, which Android keeps separate from other apps.
            Connections made by the game and by Google’s services use encryption in transit.
          </p>

          <h2>{transfers}</h2>
          <p>
            Google may process information in countries other than your own, including the United States, using the
            safeguards described in the <Ext href={links.googlePrivacy}>Google Privacy Policy</Ext>.
          </p>

          <h2>{changes}</h2>
          <p>
            We may update this policy, for example if the game adds new features. We will change the “Last updated”
            date above, and for significant changes we will let players know in the game or on this page.
          </p>

          <h2>{contact}</h2>
          <p>
            Questions about this policy or your privacy? Contact <Fill value={site.developerName} label="developer name" />{' '}
            at <ContactLink />.
          </p>
        </div>
      </article>
    </Page>
  )
}
