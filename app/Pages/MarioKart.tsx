import styles from '../Styles/style.module.css';
import { Link } from 'react-router';
import { useNavigate } from 'react-router';

import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Mario Kart" },
    { name: "description", content: "Bao Phung Homepage" },
  ];
}

type FormatButtonProps = {
    format: string;
    onClick: () => void;
};

function FormatButton({ format, onClick }: FormatButtonProps) {
    return (
        <button className={styles.formatButton} onClick={onClick}>
            {format}
        </button>
    );
}

function FormatSelectorPage(){
    const navigate = useNavigate();

    // Helper function to handle button clicks
    function FormatButtonClick(format: string){
        //alert(`${format}v${format} selected.  Redirecting to ${format}v${format} score tracker page...`);

        // No matter the format, redirect to a new page (create new component called ScoreTracker for this)
        navigate(`/ScoreTracker`, {state: { format: format }});
    }

    return (
        <>
            {/* This section allows you to choose which format to play. */}
            <div id={styles.marioKartFormatLabel}>
                <p>This is the Mario Kart page, mainly for setting up scores for a competitive match.</p>
                <p>Click on one of the formats below to set up teams.</p>
                <p>Note that the 8v8 and 12v12 formats will have 24 players, while the others will have 12 players by default.</p>
            </div>

            {/* Set up format buttons (2v2, 3v3, 4v4, 6v6, 8v8, 12v12) */}
            <div className={styles.formatSelector}>
                <FormatButton format="2v2" onClick={() => FormatButtonClick('2')} />
                <FormatButton format="3v3" onClick={() => FormatButtonClick('3')} />      
                <FormatButton format="4v4" onClick={() => FormatButtonClick('4')} />
                <FormatButton format="6v6" onClick={() => FormatButtonClick('6')} />
                <FormatButton format="8v8" onClick={() => FormatButtonClick('8')} />
                <FormatButton format="12v12" onClick={() => FormatButtonClick('12')} />
            </div>
        </>
    )
}

export default function MarioKartPage(){
    return (
        <div className={styles.marioKartContainer}>
            {/* Add title at the top  */}
            <div className={styles.title}>
                <h1 id={styles.marioKartTitle}>Mario Kart</h1>
                <p><Link to="/" style={{'color': 'cyan', 'fontSize': '20px'}}>Click Here</Link> to return to the home page.</p><br/>
            </div>

            {/* Provide information about competitive Mario Kart */}
            <div id={styles.marioKartCompDescription}>
                <h1 style={{'fontSize': '30px'}}>About Competitive Mario Kart</h1>
                <p>Mario Kart can be played competitively, believe it or not.  With the advent of Mario Kart World and its groundbreaking mechanics, it comes as no surprise that players want to become the best at the game.</p>
                <p>In fact, competitive Mario Kart has existed for a long time, with support for older classics such as Mario Kart Wii that still runs tournaments to this day. </p>
                <p>If you want to participate in competitive Mario Kart matches, please sign up on Mario Kart Central first.</p><br/>
                <p> 
                    <ul>Link to the Mario Kart Central page below (click on 'Mario Kart Central'):
                        <li><Link to='https://mkcentral.com/en-us' target='_blank' style={{'color': 'cyan'}}>Mario Kart Central</Link></li>
                    </ul>
                </p>
                <br/>
                <p>
                    Then, you want to join a discord server for the Mario Kart game you wish to participate in.<br/>
                    Note that you will need to be verified on whichever server you join, which is done via creating an account at Mario Kart Central.<br/>
                    You can find more information about the verification process once you join your desired discord server.<br/><br/>
                    <ul>List of competitive Mario Kart discords (click on one to join the discord server): 
                        <li><Link to='https://discord.gg/WR6JKPn2v9' target='_blank' style={{'color': 'cyan'}}>Mario Kart World</Link></li>
                        <li><Link to='https://discord.gg/revmGkE' target='_blank' style={{'color': 'cyan'}}>Mario Kart 8 Deluxe 150cc</Link></li>
                        <li><Link to='https://discord.gg/dfdRkFu' target='_blank' style={{'color': 'cyan'}}>Mario Kart 8 Deluxe 200cc</Link></li>
                        <li><Link to='https://discord.gg/vYr3bQQHFY' target='_blank' style={{'color': 'cyan'}}>Mario Kart Tour</Link></li>
                        <li><Link to='https://discord.gg/cZZp9DdQ5e' target='_blank' style={{'color': 'cyan'}}>Mario Kart 7</Link></li>
                        <li><Link to='https://discord.gg/mkw' target='_blank' style={{'color': 'cyan'}}>Mario Kart Wii</Link></li>
                    </ul>
                </p>
            </div>

            {/* Format selector page component */}
            <FormatSelectorPage />

        </div>
    );
}