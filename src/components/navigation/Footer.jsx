import { CiMail } from "react-icons/ci";
import { CgWebsite } from "react-icons/cg";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import "../../css/navigation.css";

function Footer() {
  return (
    <footer>
      <a href="mailto:germilagger@gmail.com">
        <CiMail />
      </a>
      <a
        href="https://www.linkedin.com/in/germanlagger/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaLinkedin />
      </a>
      <a
        href="https://github.com/Gherex"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaGithub />
      </a>
      <a
        href="https://germanlagger.dev.ar/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <CgWebsite />
      </a>
    </footer>
  );
}
export default Footer;
