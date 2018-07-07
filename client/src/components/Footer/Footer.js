import React from "react";
import "./Footer.css";
const Footer = props => {
  return (
    <div class="row">
      <div class="col-md-12" id="footer">
        <h1>Connect with us</h1>
        <a
          href="https://github.com/bijansemnani"
          target="_blank"
          class="badge badge-secondary"
        >
          Bijan
        </a>
        <a
          href="https://github.com/kevinthomaskane"
          target="_blank"
          class="badge badge-secondary"
        >
          Kevin
        </a>
        <a
          href="https://github.com/edo92"
          target="_blank"
          class="badge badge-secondary"
        >
          Eduard
        </a>
        <a
          href="https://github.com/guswilliams1"
          target="_blank"
          class="badge badge-secondary"
        >
          Gus
        </a>
      </div>
    </div>
  );
};

export default Footer;
