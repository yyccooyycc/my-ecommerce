import theme from '../assets/styles/theme';
import avatar from '../assets/images/profile/profile.png';

const t = theme.homePage;

function HomePage() {
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
          <img src={avatar} alt="Profile of Sarah Dole" className={t.avatar} />
        </div>

        {/* Name + role */}
        <div>
          <h1 className={t.name}>Sarah Dole</h1>
          <p className={t.role}>Front End Engineer @ Microsoft</p>
        </div>

        {/* Bio */}
        <p className={t.bio}>
          I turn coffee into bugs which are fixed by someone else. Certified Stack Overflow and
          ChatGPT developer.
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
              href="https://www.greatfrontend.com/projects/challenges/profile-card"
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

export default HomePage;
