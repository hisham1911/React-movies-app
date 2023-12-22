import React from 'react';
import { BsFacebook } from 'react-icons/bs';
import { AiFillGithub } from 'react-icons/ai';
import { BsTwitter } from 'react-icons/bs';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { AiFillInstagram } from 'react-icons/ai';
import { AiFillLinkedin } from 'react-icons/ai';

function Footer() {
  return (
    <footer className="bg-dark text-center text-white">
      <div className="container p-4 pb-0">
        <section className="mb-4">
          <a className="mx-3" href="#!" role="button">
            <BsFacebook />
          </a>

          <a className="mx-3" href="#!" role="button">
            <BsTwitter />
          </a>

          <a className="mx-3" href="#!" role="button">
            <AiFillGoogleCircle />
          </a>

          <a className="mx-3" href="#!" role="button">
            <AiFillInstagram />
          </a>

          <a className="mx-3" href="#!" role="button">
            <AiFillLinkedin />
          </a>

          <a className="mx-3" href="#!" role="button">
            <AiFillGithub />
          </a>
        </section>
      </div>

      <div
        className="text-center p-3"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
      >
        © 2020 Copyright:
        <a className="text-white ms-2" href="#">
          Fady Shenoda &copy;
        </a>
      </div>
    </footer>
  );
}

export default Footer;
