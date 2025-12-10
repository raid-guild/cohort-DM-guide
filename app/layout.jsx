import 'nextra-theme-docs/style.css';
import '../styles.css';

export const dynamic = 'force-static';
export const revalidate = false;

import { Banner, Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import { Footer, Layout, Navbar } from 'nextra-theme-docs';

import brandTheme, { logo } from '../theme.config';

const navbar = (
  <Navbar
    logo={logo}
    projectLink="https://github.com/raid-guild/cohort-DM-guide"
    chatLink="https://discord.gg/rejAwfnJKk"
  />
);

const footer = <Footer>{brandTheme.footerText}</Footer>;

export const metadata = {
  title: 'RaidGuild Cohort DM Guide',
  description: 'A RaidGuild-branded Nextra docs site for hosting monthly cohorts.'
};

export default async function RootLayout({ children }) {
  const pageMap = await getPageMap();

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head>
        <meta name="theme-color" content="#bd482d" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <body>
        <Layout
          banner={
            <Banner storageKey="rg-cohort-dmg-banner">
              Looking to join the cohort as a participant? Go to{' '}
              <a href="https://www.raidguild.org/join" target="_blank" rel="noreferrer">
                raidguild.org/join
              </a>
              .
            </Banner>
          }
          navbar={navbar}
          footer={footer}
          pageMap={pageMap}
          docsRepositoryBase={brandTheme.docsRepositoryBase}
          feedback={{ content: null }}
          sidebar={{ toggleButton: true, defaultMenuCollapseLevel: 6, defaultOpen: true, autoCollapse: false }}
          toc={{ float: true }}
          darkMode
          nextThemes={{ attribute: 'class', defaultTheme: 'system', storageKey: 'rg-theme' }}
          themeSwitch={{ dark: 'Dark', light: 'Light', system: 'System' }}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
