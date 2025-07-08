import styles from '../Styles/style.module.css';
import { Link } from 'react-router';
import Navigation from '../Components/Navigation';

export default function HomePage(){
  return (
      <>
        {/* Add title at the top  */}
        <div className={styles.title}>
          <h1 id='HomeTitle'>Information about Bao Phung</h1>
        </div>

        <div className={styles.page}>
          <main className={styles.main}>
            {/*<Image className={styles.logo} src="/next.svg" alt="Next.js logo" width={180} height={38} priority/>*/}
            {/* &apos; is the same as ' */}
            <p>
              Hi everyone, this is the home page.  For those viewing this website, 
              this is just a page about me going over some of the work I&apos;ve done and all that good stuff.<br/>
              You can find specific sections on the navigation bar at the left side.<br/><br/>
            </p>
            {/*<ol>
              <li>Get started by editing this page: <code>src/app/page.js</code>.</li>
              <li>Please put some content in here instead of dicking around bruv.</li>
            </ol>*/}

            <p>
              I am planning on adding more content to this home page, as well as the other pages.  However,
              this is currently a work in progress (WIP).<br/>However, if you are interested in competitive Mario Kart,
              I have a dedicated Mario Kart page that helps keep track of team scores for various team formats. <br/>
              I also plan on adding a performance tracker for Mario Kart World, although this is currently a work in progress.
            </p>
          </main>
        </div>

        {/* Creating side bar content, which will be styled with css content later */}
        <Navigation />

        {/*<footer>
          <Link href="/About">About Me</Link>
        </footer>*/}


      </>
  );
}