import "./About.css";
import AboutProfilePic from "../../images/about-profile.png";

function About() {
  return (
    <section className="about">
      <div className="about-content">
        <img src={AboutProfilePic} alt="About" className="about-pic" />
        <div className="about-description">
          <h2 className="about-description__header">Tentang penulis</h2>
          <p className="about-description__detail">
            Blok ini mendeskripsikan penulis proyek. Di sini kamu harus
            menuliskan namamu, pekerjaanmu, dan teknologi pengembangan apa yang
            kamu ketahui.
          </p>
          <p className="about-description__detail">
            Kamu juga bisa menuliskan pengalamanmu di TripleTen, apa saja yang
            kamu pelajari di sana, dan bagaimana kamu bisa membantu calon
            pelanggan.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
