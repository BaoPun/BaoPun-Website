import styles from '../Styles/style.module.css';
import React, { useState, useEffect, useRef, type FormEvent, type ChangeEventHandler } from 'react';
import { Link } from 'react-router';

import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Mario Kart World Randomizer" },
    { name: "description", content: "Mario Kart World" },
  ];
}

export default function WorldRandomizerPage(){
    // Map integer to shorthanded track names
    const tracksToId : string[] = [
        'DKS', 'KTB', 'RR', 'CC', 'WS', 
        'rDH', 'MBC', 'PS', 'rCM', 'FO', 
        'rDDJ', 'GBR', 'rPB', 'SSS', 'CCF', 
        'rMMM', 'rTF', 'rWS', 'rSGB', 'rWSh', 
        'rDKP', 'DD', 'rMC', 'rSHS', 'SP', 
        'BCi', 'AH', 'DBB', 'BC', 'rAF',
    ];

    // Set up the names of all 30 tracks in Mario Kart World
    const tracksList : {[key: string]: string}  = {
        'DKS': 'DK Spaceport', 
        'KTB': 'Koopa Troopa Beach', 
        'RR': 'Rainbow Road', 
        'CC': 'Crown City',
        'WS': 'Whistlestop Summit', 
        'rDH': 'Desert Hills', 
        'MBC': 'Mario Bros. Circuit', 
        'PS': 'Peach Stadium',
        'rCM': 'Choco Mountain', 
        'FO': 'Faraway Oasis', 
        'rDDJ': 'Dino Dino Jungle', 
        'GBR': 'Great ? Block Ruins',
        'rPB': 'Peach Beach', 
        'SSS': 'Salty Salty Speedway', 
        'CCF': 'Cheep Cheep Falls', 
        'rMMM': 'Moo Moo Meadows',
        'rTF': 'Toad\'s Factory', 
        'rWS': 'Wario Stadium', 
        'rSGB': 'Shy Guy Bazaar', 
        'rWSh': 'Wario Shipyard',
        'rDKP': 'DK Pass', 
        'DD': 'Dandelion Depths', 
        'rMC': 'Mario Circuit', 
        'rSHS': 'Sky-High Sundae',
        'SP': 'Starview Peak', 
        'BCi': 'Boo Cinema', 
        'AH': 'Acorn Heights', 
        'DBB': 'Dry Bones Burnout',
        'BC': 'Bowser\'s Castle', 
        'rAF': 'Airship Fortress'
    };


    // Variables to continously randomize images 
    const [isRandomizing, setIsRandomizing] = useState<boolean>(true);
    const [track, setTrack] = useState<string>("");
    const trackRef = useRef(null);
    const [trackPool, setTrackPool] = useState<string[]>(tracksToId);//useState<{[key: string]: string}>(tracksList);
    const [isRemovePoolChecked, setIsRemovePoolChecked] = useState<boolean>(true);

    // Get a random image
    const getRandomTrack = () => {
        /*let trackId = Math.floor(Math.random() * tracksToId.length);
        while(!(tracksToId[trackId] in trackPool)){
            trackId = Math.floor(Math.random() * tracksToId.length);
        }
        setTrack(tracksToId[trackId]);*/
        const trackId = Math.floor(Math.random() * trackPool.length);
        setTrack(trackPool[trackId]);
    };

    // Remove track from the pool
    const removeTrackFromPool = () => {
        let trackPoolCopy = trackPool;
        //delete trackPoolCopy[track];
        trackPoolCopy = trackPoolCopy.filter(t => t !== track);
        setTrackPool(trackPoolCopy);
    };

    // When the stop button is clicked, switch the flags
    function randomButtonOnClick(){
        setIsRandomizing(!isRandomizing);
    }

    // When the checkbox is triggered, either include or exclude from the pool
    function removePoolCheckboxOnHandler(e){
        // Checked or unchecked
        setIsRemovePoolChecked(!isRemovePoolChecked);
    }

    function resetTrackPool(){
        setTrackPool(tracksToId);
        //setTrackPool(tracksList);
        alert('Track pool has been reset.');
    }

    // As long as the flag is triggered, continuously display the randomized tracks
    // However, once the button is clicked, remove the track from the pool on future randomizations.
    useEffect(() => {
        if(isRandomizing){
            trackRef.current = setInterval(getRandomTrack, 50); // every 50 ms, generate a random track if the randomizing flag is active
        }
        else{
            // Remove from the pool, but only if the checkbox is checked
            if(isRemovePoolChecked){
                removeTrackFromPool();
            }

            // If the track pool becomes empty after doing this, reset the pool
            if(/*Object.keys(trackPool).length*/trackPool.length <= 1 && isRemovePoolChecked){
                resetTrackPool();
            }
        }

        

        return () => {
            if(trackRef.current){
                clearInterval(trackRef.current);
            }
        }
    }, [isRandomizing/*, trackPool*/]);

    // Render the html content
    return (
        <div className={styles.randomizerContainer}>
            {/* Add title at the top  */}
            <div className={styles.title}>
                <h1 id={styles.aboutTitle}>Mario Kart World Track Randomizer</h1>
                <p><Link to="/MarioKart" style={{'color': 'cyan', 'fontSize': '20px'}}>Click Here</Link> to return to the Mario Kart page.</p><br/>
            </div>

            {/* Randomization content, including how many tracks are in the pool */}
            <h1>{trackPool.length} tracks currently in the pool</h1><br/>
            <h1>Click on the icon to {isRandomizing ? 'stop' : 'start'} the track wheel.</h1><br/>
            {track !== '' && <img id={styles.stopRandomButton} src={`/${track}.jpg`} width={250} height={250} alt={tracksList[track]} onClick={randomButtonOnClick} />}
            <br/>
            <form>
                <input type='checkbox' id='removeFromPool' name='removeFromPool' onChange={(e) => removePoolCheckboxOnHandler(e)} checked={isRemovePoolChecked} />
                <label htmlFor='removeFromPool' style={{fontSize: '20px', marginLeft: '5px'}}>Remove from Pool</label><br/>
                <input type='button' value='Click to restore the pool' onClick={() => resetTrackPool()}  style={{fontSize: '20px', marginTop: '35px'}} />
            </form>
        </div>
    );
}