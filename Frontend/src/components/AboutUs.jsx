import React from 'react';

const AboutUs = () => {
  const styles = {
    container: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundImage: "url('./college.png')", // Make sure the image is placed in 'public' folder
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
      minHeight: '100vh',
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      backgroundBlendMode: 'lighten',
      color: '#000',
    },
    heading: {
      textAlign: 'center',
      marginBottom: '20px',
      fontSize: '32px',
      fontWeight: 'bold',
    },
    contentWrapper: {
      display: 'flex',
      gap: '20px',
      flexWrap: 'wrap',
    },
    column: {
      flex: 1,
      minWidth: '300px',
    },
    paragraph: {
      marginBottom: '15px',
      lineHeight: '1.6',
      textAlign: 'justify',
    },
    courseSection: {
      marginTop: '50px',
      textAlign: 'center',
    },
    courseCardsWrapper: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '20px',
      marginTop: '30px',
    },
    courseCard: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      width: '250px',
      textAlign: 'center',
    },
    courseNumber: {
      fontSize: '36px',
      fontWeight: 'bold',
      color: '#007BFF',
    },
    courseTitle: {
      marginTop: '10px',
      fontSize: '18px',
      fontWeight: '600',
      color: '#333',
    },
    courseDescription: {
      marginTop: '10px',
      fontSize: '14px',
      color: '#666',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>About Us</h1>
      <div style={styles.contentWrapper}>
        <div style={styles.column}>
          {/* Existing About Us Content */}
          <p style={styles.paragraph}>
            Chintamanrao Institute of Management Development and Research, Sangli (CIMDR) was established in 1996 as a constituent unit of the Deccan Education Society.
            It took over the MBA programme, which was started in 1984 at Chintamanrao College of Commerce, Sangli.
          </p>
          <p style={styles.paragraph}>
            The institute conducts Master of Business Administration (M.B.A.) Programme of Shivaji University, Kolhapur from June, 1984 and it is approved by All India Council for Technical Education (AICTE) New Delhi since 1994 and accredited by NAAC in 2018-19.
          </p>
          <p style={styles.paragraph}>
            CIMDR is a community of students, staff and faculty striving to be vibrant with learning processes.
          </p>
          <p style={styles.paragraph}>
            Today it is one of the leading Management Institutes in the Shivaji University.
          </p>
          <p style={styles.paragraph}>
            Offering four courses, viz : Master of Business Administration, Diploma in Business Management, Bachelor of Computer Application, Bachelor of Business Administration.
          </p>
        </div>

        <div style={styles.column}>
          <p style={styles.paragraph}>
            Deccan Education Society’s Sangli campus is spread in 125 acres.
            The institute is located in a prime area of Vishrambag which happens to be an educational, administrative and commercial hub of Sangli.
          </p>
          <p style={styles.paragraph}>
            Renowned engineering, science, commerce and arts colleges are sited nearby which creates a healthy teaching-learning environment.
          </p>
          <p style={styles.paragraph}>
            Institute has a strong team of experienced and qualified teachers who strive for the development of student community.
          </p>
          <p style={styles.paragraph}>
            Over the years MBA programme has attracted talented students from various states of India.
            2003-2004 passed out batch represented almost 10 states of India.
          </p>
        </div>
      </div>

      {/* 📚 Courses Section */}
      <div style={styles.courseSection}>
        <h2>Our Courses</h2>
        <div style={styles.courseCardsWrapper}>
          <div style={styles.courseCard}>
            <div style={styles.courseNumber}>60</div>
            <div style={styles.courseTitle}>MBA</div>
            <div style={styles.courseDescription}>
              Master of Business Administration (2 Years Full-Time Post-Graduation)
            </div>
          </div>

          <div style={styles.courseCard}>
            <div style={styles.courseNumber}>60</div>
            <div style={styles.courseTitle}>MCA</div>
            <div style={styles.courseDescription}>
              Master of Computer Applications (2 Years Full-Time Post-Graduation)
            </div>
          </div>

          <div style={styles.courseCard}>
            <div style={styles.courseNumber}>120</div>
            <div style={styles.courseTitle}>BBA</div>
            <div style={styles.courseDescription}>
              Bachelor of Business Administration (3 Years Degree)
            </div>
          </div>

          <div style={styles.courseCard}>
            <div style={styles.courseNumber}>120</div>
            <div style={styles.courseTitle}>BCA</div>
            <div style={styles.courseDescription}>
              Bachelor of Computer Applications (3 Years Degree)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;