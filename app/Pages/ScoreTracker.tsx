import styles from '../Styles/style.module.css';
import { useState, useEffect, useRef, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
//import { useState, useEffect } from 'react'

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Score Tracker" },
    { name: "description", content: "Bao Phung Homepage" },
  ];
}

export default function ScoreTrackerPage(){
    // Receive the format from the navigation state from MarioKart page
    const location = useLocation();
    const { format } = location.state || { format: null };
    const navigate = useNavigate();

    // Keep track of an input value for the team name
    const [ teamName, setTeamName ] = useState<string>('');
    const [ allowTeamInput, setAllowTeamInput ] = useState<boolean>(true);

    // Keep track of the focused input
    const teamInputRef = useRef<HTMLInputElement>(null);
    const focusTeamInput = () => {
        if (teamInputRef.current) {
            teamInputRef.current.focus();
        }
    }
    const scoreInputRef = useRef<HTMLInputElement>(null);
    const focusScoreInput = () => {
        if (scoreInputRef.current) {
            scoreInputRef.current.focus();
        }
    }

    // Keep track of the current race (out of 12)
    const [ currentRace, setCurrentRace ] = useState<number>(1);

    // Keep track of the current placement (out of 12 or 24)
    const [ currentPlacement, setCurrentPlacement ] = useState<number>(1);

    // Keep track of the maximum # of players
    const maxPlayers : number = (format === '8' || format === '12') ? 24 : 12;

    // Set up the teams and scores based on the format
    const [ teams, setTeams ] = useState<Team[]>([]);
    const [ teamsCopy, setTeamsCopy ] = useState<Team[]>([]);

    // Set the visibility of the form
    const [ addFormVisible, setAddFormVisible ] = useState(true);
    const [ scoreFormVisible, setScoreFormVisible ] = useState(false);

    // Create a class containing the team and score
    class Team{
        // Private properties for team name and score
        #name: string;
        #score: number;

        // Private property for number of available placement entries
        // Corresponds to the format # (if team format is 2v2, then there are 2 entries per team)
        #entries: number;

        // Constructor to initialize the team name and score
        constructor(name: string){
            this.#name = name;
            this.#score = 0;
            this.#entries = parseInt(format);
        }

        // Getter for team name
        getName() : string {
            return this.#name;
        }

        // Getter for team score
        getScore() : number {
            return this.#score;
        }

        // Getter for the number of entries
        getEntries() : number {
            return this.#entries;
        }

        // Decrement the # of entries
        setEntry(placement: number) : boolean {
            if(this.#entries > 0){
                this.#addPoints(placement);
                this.#entries--;
                return true;
            }
            alert(`No more entries available for ${this.#name}.`);
            return false;
        }

        // If we need to reset the # of entries for the next race
        resetEntries() : void {
            if(this.#entries === 0){
                this.#entries = parseInt(format);
            }
        }

        // Method to add placement points to the team score (basically the setter for the score)
        #addPoints(placement: number) : void {
            let pointPlacements: number[];

            // Based on the # of players, set the point placements
            if(maxPlayers === 12){
                pointPlacements = [15, 12, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
            } else if(maxPlayers === 24){
                pointPlacements = [15, 12, 10, 9, 9, 8, 8, 7, 7, 6, 6, 6, 5, 5, 5, 4, 4, 4, 3, 3, 3, 2, 2, 1];
            } else{
                return;
            }

            // Then, allocate that many points to the team score, based on the placement
            this.#score += pointPlacements[placement - 1];
        }
    }

    // Form component to add teams
    function AddTeamForm(){
        return(
            <form onSubmit={handleAddTeam} id={styles.scoreTrackerTeamSubmitForm}>
                <label htmlFor="teamNameInput">Enter Team Name:</label>
                <input type="text" id='teamNameInput' name="teamNameInput" value={teamName} onChange={e => setTeamName(e.target.value)} ref={teamInputRef} style={{ backgroundColor: 'white', color: 'black' }} required autoFocus  />
            </form>
        );
    }

    // Form component to add scores
    function AddScoreForm(){
        // For placement strings: st, nd, rd, th.
        let placementString: string;
        if(currentPlacement === 1 || currentPlacement === 21){
            placementString = 'st';
        }
        else if(currentPlacement === 2 || currentPlacement === 22){
            placementString = 'nd'; 
        }
        else if(currentPlacement === 3 || currentPlacement === 23){
            placementString = 'rd';
        }
        else{
            placementString = 'th';
        }

        return(
            <form onSubmit={handleAddScore} id={styles.scoreTrackerScoreSubmitForm}>
                <label htmlFor="teamScoreInput">Enter team for {currentPlacement}{placementString} place: </label>
                <input type="text" id='teamScoreInput' name="score" value={teamName} onChange={e => setTeamName(e.target.value)} ref={scoreInputRef} readOnly={!allowTeamInput} style={{ backgroundColor: 'white', color: 'black' }} required autoFocus />
            </form>
        );
    }

    // Function to handle form submission
    function handleAddTeam(event: FormEvent<HTMLFormElement>){
        // React form, so do not submit the form.
        event.preventDefault();
        
        // Check to see if the team was added successfully
        // Update: with MKW, 8v8 and 12v12 formats will have a maximum of 24 players
        addTeam();

        // Reset the team name input field afterwards
        setTeamName('');
    }

    // Function to handle adding scores
    function handleAddScore(event: FormEvent<HTMLFormElement>){
        // React form, so do not submit the form.
        event.preventDefault();

        // Check to see if the team exists (first letter must match)
        if(teamName === '' || teamName === null || teamName === undefined){
            alert('Please enter a team.');
            return;
        }

        // Find the team in the teams array
        const teamIndex = teams.findIndex(team => team.getName().at(0)?.toUpperCase() === teamName.at(0).toUpperCase());
        const teamCopyIndex = teamsCopy.findIndex(team => team.getName().at(0).toUpperCase() === teamName.at(0)?.toUpperCase());

        // If not found, reject the input
        if(teamIndex === -1){
            alert(`Team ${teamName} not found. Please enter an existing team.`);
            setTeamName('');
            return;
        }

        // If the found team has no more entries, then also reject the input
        if(teams[teamIndex].getEntries() === 0){
            alert(`Team ${teamName} has no more entries.`);
            setTeamName('');
            return;
        }

        // Otherwise, add the score to the team based on the placement
        teams[teamIndex].setEntry(currentPlacement);
        teamsCopy[teamCopyIndex].setEntry(currentPlacement);

        // Increment the placement, and do the same for the race if we reach the max # of players
        setCurrentPlacement(currentPlacement + 1);
        if(currentPlacement === maxPlayers){
            setCurrentPlacement(1);
            setCurrentRace(currentRace + 1);

            // Reset the entries for each team
            for(let i = 0; i < teams.length; i++){
                teams.at(i).resetEntries();
                teamsCopy.at(i).resetEntries();
            }
        }

        // Reset the team name input field
        setTeamName('');

        // Also sort the array of teams by score
        teams.sort((a, b) => b.getScore() - a.getScore());
    }

    // Function that adds a team to the teams array, using the react teamName state
    function addTeam() : void{
        // Each team cannot have more than 10 characters
        if(teamName.trim().length > 10){
            alert('The desired team cannot have more than 10 characters.');
            return;
        }

        // Accounting for white space, make sure that trimming does not give us an empty string
        if(teamName.trim().length === 0){
            alert('Please enter a team (white space is not counted).');
            return;
        }

        // Check to see if the team already exists.
        // If so, do not add it.
        for(let i = 0; i < teams.length; i++){
            if(teams.at(i).getName().charAt(0).toUpperCase() === teamName.charAt(0).toUpperCase()){
                alert(`A team with that tag (${teamName.charAt(0).toUpperCase()}) already exists.`);
                return;
            }
        }

        // Assuming team does not exist yet, add it to the teams array
        setTeams([...teams, new Team(teamName.trim())]);
    }

    // Initial check to see if the format provided is invalid.
    // Do this only once upon loading the page.
    useEffect(() => {
        const setFormat = async () => {
            //console.log(`Format is: ${format}`);
            if(format === undefined || format === null || (format !== '2' && format !== '3' && format !== '4' && format !== '6' && format !== '8' && format !== '12')){
                alert('No/Invalid format selected. Please go back and select a format.');
                navigate('/MarioKart');
                return;
            }
        };
        setFormat();
    }, []);

    // Create another useEffect to detect whether all teams have been added
    useEffect(() => {
        if(addFormVisible && maxPlayers / parseInt(format) === teams.length){
            alert('Maximum number of teams reached');
            setAddFormVisible(false);
            setScoreFormVisible(true);

            // Here, set the teamsCopy so that we can display the entries w/o sorting
            // Do this via deep copying
            let temp : Team[] = [];
            for(let i = 0; i < teams.length; i++){
                temp.push(new Team(teams[i].getName()));
            }
            setTeamsCopy(temp);
        }    
    }, [teams]);

    // Create another useEffect to detect whether the mogi is finished
    useEffect(() => {
        // If the mogi is over, then disable the input field (make it read-only)
        if(currentRace === 13){
            alert('The mogi is over!');
            setAllowTeamInput(false);
        }
    }, [currentRace]);

    // Render the score tracker page based on the format
    return (
        (format === undefined || format === null || (format !== '2' && format !== '3' && format !== '4' && format !== '6' && format !== '8' && format !== '12'))
        ?
        // If the format is not valid, display an error message
        <div className={styles.scoreTrackerContainer}>
            <div className={styles.title}>
                <h1 id={styles.scoreTrackerTitle}>Score Tracker</h1>
            </div>

            <div id={styles.scoreTrackerContent}>
                <p>No/Invalid format selected. Please <Link to="/MarioKart">Click Here</Link> to go back and select a format.</p>
            </div>
        </div>
        :
        // If the format is valid, display the score tracker
        <div className={styles.scoreTrackerContainer}>
            <div className={styles.title}>
                <h1 id={styles.scoreTrackerTitle}>{format}v{format} Score Tracker</h1>
            </div>

            <div id={styles.scoreTrackerContent}>
                <p>This is a page about the score tracker for the {format}v{format} format.</p>
                <p><Link to="/MarioKart">Click Here</Link> to return to the Mario Kart page.</p>

                {/* Dynamically display added teams and their current scores */}
                <div className={styles.scoreTrackerTeamsContainer}>
                    <div className={styles.teamNameDisplay}>
                        {/* After all teams have been added, this will display either the current race # or if the mogi is over. */}
                        {currentRace <= 12 && maxPlayers / parseInt(format) === teams.length && <p>Race #{currentRace}</p>}
                        {currentRace > 12 && <p>Mogi is over!</p>}
                        <br/>

                        {/* This will dynamically display the teams and their current scores */}
                        {teams.map((team, index) => (
                            <span key={team.getName()}>
                                {team.getName()} ({team.getScore()}) {index < teams.length - 1 ? ' | ' : ''}
                            </span>
                        ))}
                        <br/><br/>  

                        {/* This will show the # of possible entries for each team per race.  Resets at the start of a new race. */}
                        {teamsCopy !== undefined && teamsCopy !== null &&
                            <> 
                                {maxPlayers / parseInt(format) === teams.length && <><p>Number of entries: </p><br/></>}
                                {teamsCopy.map((team, index) => (
                                    <span key={index+teams.length}>
                                        {team.getName()} ({team.getEntries()}) {index < teams.length - 1 ? ' | ' : ''}
                                    </span>
                                ))}
                            </>
                        }
                    </div>
                </div>

                {/* Form to add teams */}
                <div className={styles.scoreTrackerFormContainer}>
                    {addFormVisible && <AddTeamForm />}
                    {scoreFormVisible && <AddScoreForm />}
                </div>
            </div>
        </div>
    );

}