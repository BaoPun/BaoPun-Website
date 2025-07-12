import styles from '../Styles/style.module.css';
import { Link } from 'react-router';
import  Navigation  from '../Components/Navigation';
import type { Route } from "./+types/home";
import React, { useState, useEffect, useRef, type FormEvent, type ChangeEventHandler } from 'react';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Projects" },
    { name: "description", content: "List of Projects" },
  ];
}

export default function ProjectPage(){
    // Create an object containing details of each project
    class Project{
        // Static id: set to 0 for pre-increment or set to 1 for post-increment
        static id: number = 0;

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
            this.#id = ++Project.id;
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
        ['typescript', 'javascript', 'css', 'html', 'dockerfile'], ['reactjs', 'vitest', 'nodejs', 'nginx'], ['vs code', 'docker', 'pulumi', 'ansible', 'GitHub Actions', 'aws ec2'], []
    ));
    projects.push(new Project(
        "League of Legends Profile Lookup", 
        "This desktop application lets users search for a player and retrieves information about their most played champions, \
            their solo queue ranks, and their win rates.\
            Data is fetched from the Riot Games API, with some static data stored into a Postgres database for faster data fetching.", 
        "https://www.github.com/BaoPun/LeagueProfileFetcher", 
        ['c++'], ['qmake', 'qt'], ['qt creator', 'qt designer', 'postman'], ['postgres']
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
        ['c++'], ['cmake', 'qt'], ['qt creator', 'qt designer', 'postman', 'aws rds', 'pgAdmin'], ['postgres']
    ));
    projects.push(new Project(
        'Chinese Characters Prediction Model',
        'This data analysis project utilizes machine learning to create a neural network model that is trained over 15000 samples of select hand-drawn Chinese characters.  The objective is to use the model to predict what chinese characters are being drawn.',
        'https://www.github.com/BaoPun/ChineseCharactersPredictorModel',
        ['python'], ['pandas', 'numpy', 'keras'], ['anaconda'], []
    ));
    projects.push(new Project(
        "Undergraduate Capstone: Software Innovation for Dual Screen Notebook", 
        "For my senior capstone, I built a software application that takes advantage of the Asus Zenbook Pro Duo's built-in second screen.  This application loads other applications onto it, which can be registered & activated by triggering certain any hotkeys.", 
        "https://www.github.com/BaoPun/capstone", 
        ['c#'], ['wpf', 'winforms', '.net core'], ['visual studio'], []
    ));
    projects.push(new Project(
        "Recursive Descent Parser", 
        "A recursive descent parser was made in C++ for a specific grammar.", 
        "https://www.github.com/BaoPun/RegexParser", 
        ['c++'], ['cmake', 'vcpkg'], ['visual studio'], []
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

    // Get the text field from the filter
    const [filterText, setFilterText] = useState<string>('');
    const filterTextRef = useRef<HTMLInputElement>(null);
    const focusFilterTextInput = () => {
        if (filterTextRef.current) {
            filterTextRef.current.focus();
        }
    }

    // Create a state that detects if a url was clicked.
    const clickedOnUrl = useRef<boolean>(false);

    // Get all of the dynamically set filters
    const [checkedLanguageFilters, setCheckedLanguageFilters] = useState<Set<string>>(new Set());
    const [checkedFrameworkFilters, setCheckedFrameworkFilters] = useState<Set<string>>(new Set());
    const [checkedToolFilters, setCheckedToolFilters] = useState<Set<string>>(new Set());
    const [checkedDatabaseFilters, setCheckedDatabaseFilters] = useState<Set<string>>(new Set());

    // Flag to indicate whether or not we clicked on the "filter button"
    const [filterEnabled, setFilterEnabled] = useState<boolean>(false);
    const [filterEnabledText, setFilterEnabledText] = useState<string>('Show Filters');

    // Function to toggle on/off the filter container
    function toggleFilter(){
        setFilterEnabled(!filterEnabled);
        setFilterEnabledText(filterEnabled ? 'Show Filters' : 'Hide Filters');
    }

    // Function that checks if all filters in a specific category are within the project
    // If there are no filters, return true anyways. 
    function filterContains(filterList : Set<string>, projectList : string[]) : boolean {
        // Only perform a check if there is at least 1 enabled filter
        if(filterList.size > 0){
            for(const filter of filterList){
                if(!projectList.includes(filter)){
                    return false;
                }
            }
        }

        return true;
    }

    // Create a separate project list for the filtering
    // Update: also include the filters from the checkboxes
    const filteredProjects = projects.filter(project => {
        const lowerFilter = filterText.toLowerCase();
        const containsProject = project.getProjectName().toLowerCase().includes(lowerFilter);
        const containsDescription = project.getProjectDescription().toLowerCase().includes(lowerFilter);
        
        // Checkboxes: true if all checked filters (on each category) are in the project (default) or if there are no filters.  False otherwise
        const containsLanguage : boolean = filterContains(checkedLanguageFilters, project.getLanguagesUsed());
        const containsFramework : boolean = filterContains(checkedFrameworkFilters, project.getFrameworksUsed());
        const containsTool : boolean = filterContains(checkedToolFilters, project.getToolsUsed());
        const containsDatabase : boolean = filterContains(checkedDatabaseFilters, project.getDatabasesUsed());

        return (filterText.length === 0 || containsProject || containsDescription) && containsLanguage && containsFramework && containsTool && containsDatabase;
    });


    // If url was clicked on, set it to true
    function urlHandler(idx: number) : void {
        // But only do this if the associated project already has its details open
        if(detailsVisible[idx]){
            clickedOnUrl.current = true;
        }
    }

    function toggleProjectDetailHandler(idx : number){
        // Was the url clicked on and is the project details already visible?
        // If so, accept the event, but return early so that we do not hide the form
        if(detailsVisible[idx] && clickedOnUrl.current){
            clickedOnUrl.current = false;
            return;
        }

        // Create a shallow copy
        const detailsVisibleCopy = [...detailsVisible];

        // Modify at index
        detailsVisibleCopy[idx] = !detailsVisibleCopy[idx];

        // Update original array
        setDetailsVisible(detailsVisibleCopy);
    }

    function SubmitFilterForm(event : FormEvent<HTMLFormElement>){
        // Prevent the form from being submitted automatically.  We handle events ourselves
        event.preventDefault();
        alert('Clearing input field.')
        setFilterText('');
    }

    function FilterForm(){
        // Create a unique listing of languages, frameworks, tools, databases
        let languagesFilterList : Set<string> = new Set();
        let frameworksFilterList : Set<string> = new Set();
        let toolsFilterList : Set<string> = new Set();
        let databasesFilterList : Set<string> = new Set();
        projects.forEach((project) => {
            project.getLanguagesUsed().forEach( (language) => ( languagesFilterList.add(language) ) );
            project.getFrameworksUsed().forEach( (framework) => ( frameworksFilterList.add(framework) ) );
            project.getToolsUsed().forEach( (tool) => ( toolsFilterList.add(tool) ) );
            project.getDatabasesUsed().forEach( (database) => ( databasesFilterList.add(database) ) )
        });

        // Function that deals with clicking on the label
        // If specific filter already in the filter list, remove it (uncheck)
        // Otherwise, add it to the specific filter list (check)
        function labelClickHandler(checkedFilterList: Set<string>, setCheckedFilterList : React.Dispatch<React.SetStateAction<Set<string>>>, filter : string){
            if(checkedFilterList.has(filter)){
                setCheckedFilterList((filters) => {
                    const newFilters = new Set(filters);
                    newFilters.delete(filter);
                    return newFilters;
                })
            }
            else{
                setCheckedFilterList((filters) => new Set(filters).add(filter));
            }
        }

        // Function that sets the checked filters and changes state based on the checkbox
        // Directly deals with checking/unchecking the checkbox
        function checkboxHandler(event, setCheckedFilterList : React.Dispatch<React.SetStateAction<Set<string>>>){
            // Grab the specific checkbox
            const value = event.target.value;

            if(event.target.checked){
                setCheckedFilterList((filters) => new Set(filters).add(value));
            }
            else{
                setCheckedFilterList((filters) => {
                    const newFilters = new Set(filters);
                    newFilters.delete(value);
                    return newFilters;
                });
            }
        }

        // Function that simplified the "isChecked" functions
        function isChecked(filterType: Set<string>, element: string) : boolean {
            return filterType.has(element);
        }

        // Functional component for all 4 filters
        function FilterBy({ filterList, filterType, checkedFilterList, onChangeFilterList, onLabelClickHandler  } : { filterList: Set<string>, filterType: string, checkedFilterList: Set<string>, onChangeFilterList: React.Dispatch<React.SetStateAction<Set<string>>>, onLabelClickHandler: (element: string) => void }){
            return (  
                filterList.size > 0 &&
                <>
                    <h1>Filter by {filterType}:</h1>
                    <div className={styles.projectFilter}>
                        {   /* Convert set back to array and then map out the languages */
                            Array.from(filterList).map((element, index) => (
                                <span key={index} style={{ marginRight: '1.2%' }}>  
                                    <input type="checkbox" name={element} value={element} style={{ marginRight: '5px' }} onChange={(e) => checkboxHandler(e, onChangeFilterList)} checked={isChecked(checkedFilterList, element)} />
                                    <label htmlFor={element} onClick={() => onLabelClickHandler(element)} >{element}</label>
                                </span> 
                            ))
                        }
                        <br/><br/>
                    </div>
                </>
            );
        }

        return (
            <form onSubmit={SubmitFilterForm} id={styles.filterForm}>
                {/* These are for the filter text.  Matching project names and descriptions will be filtered based on the input */}
                <label htmlFor="filterTextInput" style={{ marginRight: '20px' }}>Filter by name or description:</label>
                <input type="text" id='filterTextInput' name="filterTextInput" value={filterText} onChange={e => setFilterText(e.target.value)} ref={filterTextRef} style={{ backgroundColor: 'white', color: 'black', marginRight: '20px' }} placeholder='Filter in real time'  required />
                <br/><br/><br/>

                {/* Add checkboxes for languages, frameworks, tools, databases */}
                <FilterBy filterList={languagesFilterList} filterType='languages' checkedFilterList={checkedLanguageFilters} onChangeFilterList={setCheckedLanguageFilters} onLabelClickHandler={(language : string) => labelClickHandler(checkedLanguageFilters, setCheckedLanguageFilters, language)} />
                <FilterBy filterList={frameworksFilterList} filterType='frameworks' checkedFilterList={checkedFrameworkFilters} onChangeFilterList={setCheckedFrameworkFilters} onLabelClickHandler={(framework : string) => labelClickHandler(checkedFrameworkFilters, setCheckedFrameworkFilters, framework)} />
                <FilterBy filterList={toolsFilterList} filterType='tools' checkedFilterList={checkedToolFilters} onChangeFilterList={setCheckedToolFilters} onLabelClickHandler={(tool : string) => labelClickHandler(checkedToolFilters, setCheckedToolFilters, tool)} />
                <FilterBy filterList={databasesFilterList} filterType='databases' checkedFilterList={checkedDatabaseFilters} onChangeFilterList={setCheckedDatabaseFilters} onLabelClickHandler={(database : string) => labelClickHandler(checkedDatabaseFilters, setCheckedDatabaseFilters, database)} />
            </form>
        );
    }

    // Functional component that shows a single project with its additional details omitted
    function ShowProjectDetails(){
        return (
            filteredProjects.map((project) => (
                <div className={styles.projects} key={project.getProjectId()} onClick={() => toggleProjectDetailHandler(project.getProjectId() - 1)} >
                    <h1>{project.getProjectName()}</h1>  
                    {
                        detailsVisible[project.getProjectId() - 1] &&
                        <div className={styles.hiddenProjectDetails} style={{ textAlign: 'center' }} >
                            <p>{project.getProjectDescription()}</p><br/>
                            <p><Link to={project.getProjectUrl()} style={{'color': 'cyan', 'fontSize': '20px'}} target='_blank' onClick={() => urlHandler(project.getProjectId() - 1)} >{project.getProjectUrl()}</Link></p>
                            <br/>
                            {/* Display languages, frameworks, tools, databases used */}
                            <DisplayHiddenDetails array={project.getLanguagesUsed()} projectText='Languages' />
                            <DisplayHiddenDetails array={project.getFrameworksUsed()} projectText='Frameworks' />
                            <DisplayHiddenDetails array={project.getToolsUsed()} projectText='Tools' />
                            <DisplayHiddenDetails array={project.getDatabasesUsed()} projectText='Databases' />
                        </div>
                    }
                </div>
            ))
        );
    }

    // Functional component that maps out the specific filtered display
    function DisplayHiddenDetails({ array, projectText } : { array: string[], projectText: string }){
        return (
            <div className={styles.hiddenDetails}>
                {array.length > 0 && <><br/><p>{projectText} used:</p></>}
                {
                    array.map((element, i) => (
                        <p key={i} style={{ display: 'inline'}}>{element}{i < array.length - 1 && " | "}</p>
                    ))
                }
            </div>
        );
    }

    // Keep the text box in focus whenever we change the input
    useEffect(() => {
        focusFilterTextInput();
    }, [filterText]);
    
    return (
        <div className={styles.projectContainer}>
            {/* Add title at the top  */}
            <div className={styles.title}>
                <h1 id={styles.projectTitle}>Projects</h1>
                <p><Link to="/" style={{'color': 'cyan', 'fontSize': '20px'}}>Click Here</Link> to return to the home page.</p><br/>
            </div>

            <div className={styles.projectChooseToFilter} onClick={toggleFilter}>
                <br/>
                <h1 style={{ textAlign: 'center', color: 'red' }}>{filterEnabledText}</h1>
                <br/>
            </div>
            <br/><br/>

            {/* Add a container to display all projects */}
            <div className={styles.projectList}>
                {/* Filter projects based on text (in both name and description), by language(s)/frameworks/tools used */}
                {   filterEnabled &&
                    <div className={styles.projectFilterContainer}>
                        <FilterForm />
                    </div>
                }
                <h1 style={{ textAlign: 'center'}}>Click on each project section to expand/collapse additional details.</h1><br/>

                {/* Create a list of projects. By default, additional details are hidden */}
                <ShowProjectDetails />
            </div>

            {/* Creating side bar content, which will be styled with css content later */}
            <Navigation />
        </div>
    );
}