function Footer(){
    return(
        <footer className="bg-dark text-white pt-4 pb-3 mt-5">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <h5>Lost & Found</h5>
                <p>Helping you reconnect with your lost belongings.</p>
              </div>
              <div className="col-md-4">
                <h5>Project Info</h5>
                <p className="mb-1">ACA Project: <em>Lost and Found Web Application</em></p>
                <p className="mb-1">Developed by <strong>Farhan Akther R</strong></p>
                <p className="mb-0">Mentored by:</p>
                <ul className="list-unstyled mb-0">
                  <li>Kartik Raj</li>
                  <li>Bhukya Vaishnavi</li>
                  <li>Muskan Kumari</li>
                  <li>Prakriti Prasad</li>
                  <li>Stuti Shukla</li>
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