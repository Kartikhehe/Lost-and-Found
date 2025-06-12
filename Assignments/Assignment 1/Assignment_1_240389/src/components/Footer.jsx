function Footer(){
    return(
        <footer className="bg-dark text-white pt-4 pb-3 mt-5">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <h5>Lost & Found</h5>
                <p>Helping you reconnect with your lost belongings.</p>
              </div>
              <div id="contact" className="col-md-4">
                <h5>Contact Us</h5>
                <ul className="list-unstyled text-white">
                  <li>
                    📍 <strong>Address:</strong><br />
                    Room No. XYZ, Hall of Residence,<br />
                    IIT Kanpur, Uttar Pradesh, India
                  </li>
                  <li className="mt-3">
                    📞 <strong>Phone:</strong><br />
                    <a href="tel:+919847487751" className="text-white text-decoration-none">
                      +91 9847487751
                    </a>
                  </li>
                  <li className="mt-3">
                    📧 <strong>Email:</strong><br />
                    <a href="mailto:farhanr24@iitk.ac.in" className="text-white text-decoration-none">
                      farhanr24@iitk.ac.in
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-md-4">
                <h5>Follow Us</h5>
                <a href="https://wa.me/919847487751" target="_blank" className="text-white me-3"><i className="bi bi-whatsapp"></i></a>
                <a href="https://x.com/FarhanAkther174" target="_blank" className="text-white me-3"><i className="bi bi-twitter"></i></a>
                <a href="https://www.instagram.com/farhanakther174" target="_blank" className="text-white"><i className="bi bi-instagram"></i></a>
              </div>
            </div>
            <hr className="bg-light" />
            <p className="text-center mb-0">&copy; {new Date().getFullYear()} Lost & Found. All rights reserved.</p>
          </div>
        </footer>
    )
}

export default Footer;