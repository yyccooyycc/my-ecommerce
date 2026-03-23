import theme from '../assets/styles/theme';
import avatar from '../assets/images/profile/Oimage.png';

const t = theme.homePage;

function AboutMe() {
  const socialLinks = [
    { icon: 'ri-github-fill', label: 'GitHub' },
    { icon: 'ri-linkedin-box-fill', label: 'LinkedIn' },
    { icon: 'ri-instagram-line', label: 'Instagram' },
    { icon: 'ri-twitter-x-line', label: 'X (Twitter)' },
  ];

  return (
    <main className={t.root}>
      <section className={theme.homePage.card}>
        {/* Avatar */}
        <div className={t.avatarWrapper}>
          <img src={avatar} alt="Profile of Olivia Huang" className={t.avatar} />
        </div>

        {/* Name + role */}
        <div>
          <h1 className={t.name}>Olivia Huang</h1>
          <p className={t.role}>Front End Engineer</p>
        </div>

        {/* Bio */}
        <p className={t.bio}>
          Powered by coffee, React, and TypeScript — building scalable UIs and surviving legacy
          Angular along the way.
        </p>

        {/* CTA Button */}
        <button type="button" className={t.ctaButton}>
          Contact me
        </button>

        {/* Social icons */}
        <nav aria-label="Social media" className={t.socialNav}>
          {socialLinks.map((item) => (
            <a
              key={item.label}
              href="https://www.linkedin.com/in/yulhuang/"
              aria-label={item.label}
              className={t.socialLink}
            >
              <i className={item.icon} />
            </a>
          ))}
        </nav>
      </section>
    </main>
  );
}

export default AboutMe;
