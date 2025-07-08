import styles from '../Styles/style.module.css';
import { Link } from 'react-router';
import  Navigation  from '../Components/Navigation';
import type { Route } from "./+types/home";
import { useState, useEffect } from 'react';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About Me" },
    { name: "description", content: "About Me Page" },
  ];
}

export default function AboutMePage(){
    const [displayDate, setDisplayDate] = useState(new Date());

    // Update the displayed time only once.
    useEffect(() => {
        // Set a 1 second interval
        const interval = setInterval(() => {
            setDisplayDate(new Date());
        }, 1000);

        // Clean up on unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.aboutContainer}>
            {/* Add title at the top  */}
            <div className={styles.title}>
                <h1 id={styles.aboutTitle}>About Bao Phung</h1>
                <p><Link to="/" style={{'color': 'cyan', 'fontSize': '20px'}}>Click Here</Link> to return to the home page.</p><br/>
            </div>

            {/* Short introduction.  Basic demographics, followed by education, and personal hobbies, etc. */}
            <div className={styles['aboutDescription']}>
                <h1>Introduction</h1>
                <p>My name is Bao Phung.  I was born on February 26, 1997 in Portland, Oregon <br/>and have largely remained there for most of my lifetime so far.</p><br/>
                <p>I enjoy video games, primarily League of Legends.  I recently developed an interest in competitive Mario Kart.</p>
                <p>If you want to add me in League of Legends, it's <strong>Nindoge#KEKW</strong> on the NA server.</p><br/>
                <p>As for competitive Mario Kart, there actually exists a Competitive Mario Kart community.<br/>You can learn more by clicking on the Mario Kart section on the left.</p>
            </div>
            <br/><br/>
            {/* Thinking of adding a timeline of my career so far */}
            <div className={styles['aboutCareer']}>
                <h1>Career Timeline</h1>
                <p>I graduated from Oregon State University on December 20th, 2020 with a Bachelor's of Science (BS) in Computer Science.<br/>I also minored in Mathematics.</p><br/>
                <p>As of right now ({displayDate.toLocaleString()}), I am currently pursuing my Master's Degree (specifically, Master's of Engineering, or MEng for short) at Oregon State University.</p><br/>
                <p>After my graduation, I joined Revature - a coding bootcamp that helps place software engineers with another company.</p>
                <p>Via Revature, I joined Infosys for 2 years from May 2021 to May 2023.<br/>This required me to travel to South Carolina for 2 years.</p><br/>
                <p>I was initially working as WCS support for Adidas DC1 and DC2, but I got promoted to WMS support after my first year.</p>
                <p>Note: WCS = Warehouse Control Systems, WMS = Warehouse Management Systems</p><br/>
                <p>As WCS support, I help ensure that the physical conveyor systems across DC1 & DC2 are operating normally.<br/>Any issues with the conveyor systems are redirected to me for troubleshooting.</p><br/>
                <p>As WMS support, I ensure that WMS operations and tasks are properly maintained.  Any troubles with warehouse tasks via WMS are redirected to me.<br/>Since most of WCS messaging comes from WMS, one of my responsibilities was to monitor messaging flow to and from WCS.</p><br/>
                <p>After my time with Infosys, I returned back home to Portland, Oregon.  A month later, I began freelancing as a software engineering tutor on Wyzant.</p>
                <p>To this day, I still remain as a freelancing tutor.  However, I have also developed multiple projects during this time.  See the "Projects" section.</p>
                <p>If you are interested in seeing my tutoring profile, <Link to='https://www.wyzant.com/tutors/baop80' target='_blank' style={{'color': 'cyan'}}>Click here.</Link></p>
            </div>
            <br/><br/><br/>
            {/* Then, looking to add some future aspirations */}


            


            {/* Creating side bar content*/}
            <Navigation />
        </div>
    );
}