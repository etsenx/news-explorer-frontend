import './About.css';
import AboutProfilePic from '../../images/profile.jpg';

function About() {
  return (
    <section className='about'>
      <div className='about-content'>
        <img src={AboutProfilePic} alt='About' className='about-pic' />
        <div className='about-description'>
          <h2 className='about-description__header'>Tentang penulis</h2>
          <p className='about-description__detail'>
            Nama saya Steven. Saya bekerja di PT. Capella Medan Daihatsu sebagai IT Implementer. Saya berasal
            dari Indonesia. Teknologi-teknologi yang saya kuasai adalah: MERN
            (MongoDB, Express.js, React, Node.js), PHP, SQL, Python (Flask),
            DaisyUI, Bootstrap, dan Next.js
            <br />
            <br />
            Saya mulai mempelajari web development semenjak usia 16 tahun.
            Awalnya berminat untuk mempelajari game development, namun setelah
            menelusuri lebih dalam, ketemulah dengan website development. Saya
            pernah mengikuti kursus: <br />
            <br />-{' '}
            <i>
              <b>CS50: Introduction to Computer Science </b>
            </i>
            namun tidak sampai selesai. Disana saya mempelajari
            algoritma-algoritma dan memperkuat logika pemrograman saya. <br />
            <br />-{' '}
            <i>
              <b>Udemy: 100 Days Of Python by Angela Yu </b>
            </i>
            Ini adalah kursus dimana pertama kali saya mengenal tentang web
            development dari sisi frontend maupun backend. Kursus ini sebenarnya
            tidak fokus ke web development, namun penggunaan python secara
            menyeluruh. Saya mempelajari banyak hal disini seperti web scraping,
            automation, hosting project, game, aplikasi desktop, dan analisis
            data.
            <br />
            <br />-{' '}
            <i>
              <b>Udemy: Web Development Bootcamp by Angela Yu </b>
            </i>
            Disini saya mempelajari MERN stack. Kursus ini yang pertama kali
            mengenalkan saya dengan MongoDB, Express.js, React, dan Node.js
            dengan baik. Sebelum menggunakan React, kursus ini juga mengajarkan
            memakai EJS sebagai templating language.
            <br />
            <br />-{' '}
            <i>
              <b>TripleTen Bootcamp </b>
            </i>
            Saat mengikuti bootcamp Tripleten, banyak pelajaran yang sudah saya
            kuasai namun ada beberapa ilmu tambahan dari Tripleten yaitu:
            Hosting website menggunakan Google Cloud Platform, Cors, cara agar
            supaya website lebih secure, dan lain-lain. Menurut saya, bootcamp
            Tripleten dapat menambah wawasan karena materi yang diajarkan sangat
            detail.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
