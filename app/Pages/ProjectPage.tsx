import styles from '../Styles/style.module.css';
import { Link } from 'react-router';
import  Navigation  from '../Components/Navigation';
import type { Route } from "./+types/home";
import { useState, useEffect } from 'react';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Projects" },
    { name: "description", content: "List of Projects" },
  ];
}

export default function ProjectPage(){
    // Create an object containing details of each project
    class Project{
        // Static id: set to 0
        static id = 1;

        // Private properties
        #id: number;
        #name: string;
        #description: string;
        #url: string;
        #languages: string[];
        #frameworks: string[];
        #tools: string[];
        #databases: string[];

        // Constructor to initialize properties
        constructor(name: string, description: string, url: string, languages: string[], frameworks: string[], tools: string[], databases: string[]){
            this.#id = Project.id++;
            this.#name = name;
            this.#description = description;
            this.#url = url;
            this.#languages = languages;
            this.#frameworks = frameworks;
            this.#tools = tools;
            this.#databases = databases;
        }

        // Getters
        getProjectId() : number {
            return this.#id;
        }

        getProjectName() : string {
            return this.#name;
        }

        getProjectDescription() : string {
            return this.#description;
        }

        getProjectUrl() : string {
            return this.#url;
        }

        getLanguagesUsed() : string[] {
            return this.#languages;
        }

        getFrameworksUsed() : string[] {
            return this.#frameworks;
        }

        getToolsUsed() : string[] {
            return this.#tools;
        }

        getDatabasesUsed() : string[] {
            return this.#databases;
        }
    }

    let projects : Project[] = [];

    projects.push(new Project(
        "Personal Website", 
        "This website is written using the React Router web framework.  It was deployed using docker for containerization, pulumi for automated infrastructure configuration via creating a new AWS EC2 instance, and ansible for automated task management - which includes setting up nginx as the web server.", 
        "https://www.github.com/BaoPun/BaoPun-Website", 
        ['typescript', 'javascript', 'css', 'html', 'dockerfile'], ['reactjs', 'vitest', 'nodejs', 'nginx'], ['vs code', 'docker', 'pulumi', 'ansible'], []
    ));
        
    projects.push(new Project(
        "League of Legends Profile Lookup", 
        "This desktop application lets users search for a player and retrieves information about their most played champions, \
            their solo queue ranks, and their win rates.\
            Data is fetched from the Riot Games API, with some static data stored into a Postgres database for faster data fetching.", 
        "https://www.github.com/BaoPun/LeagueProfileFetcher", 
        ['c++'], ['qmake', 'qt'], ['qt creator', 'qt designer'], ['postgres']
    ));
    projects.push(new Project(
        "Mario Kart Team Score Tracker", 
        "This desktop application lets competitive Mario Kart players assign teams based on a format and allocates score tracking for each team during a 12 race event.", 
        "https://www.github.com/BaoPun/MarioKartLoungeScoreTracker", 
        ['c++'], ['cmake', 'qt'], ['qt creator', 'qt designer'], []
    ));
    projects.push(new Project(
        "Pokemon Simulator", 
        "This personal project of mine was a small desktop application that allows you to play as one Pokemon (Treecko in this case) and battle against different wild pokemon. The setting is similar to the beginning of any mainline pokemon game.", 
        "https://www.github.com/BaoPun/PokemonSimulator", 
        ['c++'], ['cmake', 'qt'], ['qt creator', 'qt designer'], ['postgres']
    ));
    projects.push(new Project(
        "Undergraduate Capstone: Software Innovation for Dual Screen Notebook", 
        "For my senior capstone, I built a software application that takes advantage of the Asus Zenbook Pro Duo's built-in second screen.  This application loads other applications onto it, which can be registered & activated by triggering certain any hotkeys.", 
        "https://www.github.com/BaoPun/capstone", 
        ['c#'], ['wpf', 'winforms', '.net core'], ['visual studio'], ['']
    ));
    projects.push(new Project(
        "Recursive Descent Parser", 
        "A recursive descent parser was made in C++ for a specific grammar.", 
        "https://www.github.com/BaoPun/RegexParser", 
        ['c++'], ['cmake', 'vcpkg'], ['visual studio'], ['']
    ));
    projects.push(new Project(
        "Multithreaded Pokemon Data Fetch", 
        "To practice multithreading, this console program was created using C.  Pokemon data up to generation 6 was stored in a text file, and we would search through all pokemon by type.  We can also choose to save the results of our search into a text file.  The multithreaded portion comes from the fact that each search and save process will be happening in the background and not disrupt the main menu.", 
        "https://www.onlinegdb.com/n84l9G5Uvi", 
        ['c'], [], ['vs code'], []
    ));


    // Setting projects by hand above, but the rest is now reactable
    // Toggle a specific project's additional details to be visible or not.  By default, not visible
    const [detailsVisible, setDetailsVisible] = useState<boolean[]>(Array(projects.length).fill(false));
    function toggleProjectDetailHandler(idx : number){
        // Create a shallow copy
        const detailsVisibleCopy = [...detailsVisible];

        // Modify at index
        detailsVisibleCopy[idx] = !detailsVisibleCopy[idx];

        // Update original array
        setDetailsVisible(detailsVisibleCopy);
    }

    
    
    return (
        <div className={styles.projectContainer}>
            {/* Add title at the top  */}
            <div className={styles.title}>
                <h1 id={styles.projectTitle}>Projects</h1>
                <p><Link to="/" style={{'color': 'cyan', 'fontSize': '20px'}}>Click Here</Link> to return to the home page.</p><br/>
            </div>


            {/* Add a container to display all projects */}
            <div className={styles.projectList}>
                <h1 style={{ textAlign: 'center'}}>Click on each project section to expand/collapse additional details.</h1><br/>
                
                {/* TODO: filter projects based on text (in both name and description), by language(s)/frameworks/tools used */}
                <h1 style={{ textAlign: 'center', color: 'red' }}>CURRENTLY WORKING ON A FILTER FEATURE</h1><br/>

                {
                    projects.map((project, index) => (
                        <div className={styles.projects} key={project.getProjectId()} onClick={() => toggleProjectDetailHandler(project.getProjectId() - 1)} >
                            <h1>{project.getProjectName()}</h1>  
                            {
                                detailsVisible[index] &&
                                <div className={styles.hiddenProjectDetails} style={{ textAlign: 'center' }} >
                                    <p><Link to={project.getProjectUrl()} style={{'color': 'cyan', 'fontSize': '20px'}}>{project.getProjectUrl()}</Link></p>
                                    <p>{project.getProjectDescription()}</p><br/>
                                </div>
                            }
                        </div>
                    ))
                }
            </div>

            {/* Creating side bar content, which will be styled with css content later */}
            <Navigation />
        </div>
    );
}