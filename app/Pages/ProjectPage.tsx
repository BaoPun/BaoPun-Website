import styles from '../Styles/style.module.css';
import { Link } from 'react-router';
import  Navigation  from '../Components/Navigation';
import type { Route } from "./+types/home";
import { useState, useEffect, useRef, type FormEvent } from 'react';

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
    const filterEnabledText = useRef<string>('Show Filters');

    // Function to toggle on/off the filter container
    function toggleFilter(){
        setFilterEnabled(!filterEnabled);
    }

    // Useeffect that triggers on filterEnabled state
    // Here, we change the text
    useEffect(() => {
        if(filterEnabled){
            filterEnabledText.current = 'Show Filters';
        }
        else{
            filterEnabledText.current = 'Hide Filters';
        }
    }, [filterEnabled]);
    

    // Create a separate project list for the filtering
    // Update: also include the filters from the checkboxes
    const filteredProjects = projects.filter(project => {
        const lowerFilter = filterText.toLowerCase();
        const containsProject = project.getProjectName().toLowerCase().includes(lowerFilter);
        const containsDescription = project.getProjectDescription().toLowerCase().includes(lowerFilter);
        
        // Language checkboxes: true if all checked languages are in the project (default setting).  False otherwise
        let containsLanguage : boolean = true;
        if(checkedLanguageFilters.size > 0){
            for(const language of checkedLanguageFilters){
                if(!project.getLanguagesUsed().includes(language)){
                    containsLanguage = false;
                    break;
                }
            }
        }

        // Framework checkboxes: true if all checked frameworks are in the project (default setting).  False otherwise
        let containsFramework : boolean = true;
        if(checkedFrameworkFilters.size > 0){
            for(const framework of checkedFrameworkFilters){
                if(!project.getFrameworksUsed().includes(framework)){
                    containsFramework = false;
                    break;
                }
            }
        }

        // Tool checkboxes: true if all checked tools are in the project (default setting).  False otherwise
        let containsTool : boolean = true;
        if(checkedToolFilters.size > 0){
            for(const tool of checkedToolFilters){
                if(!project.getToolsUsed().includes(tool)){
                    containsTool = false;
                    break;
                }
            }
        }

        // Database checkboxes: true if all checked databases are in the project (default setting).  False otherwise
        let containsDatabase : boolean = true;
        if(checkedDatabaseFilters.size > 0){
            for(const database of checkedDatabaseFilters){
                if(!project.getDatabasesUsed().includes(database)){
                    containsDatabase = false;
                    break;
                }
            }
        }

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
            project.getLanguagesUsed().forEach((language) => (
                languagesFilterList.add(language)
            ));
            project.getFrameworksUsed().forEach((framework) => (
                frameworksFilterList.add(framework)
            ));
            project.getToolsUsed().forEach((tool) => (
                toolsFilterList.add(tool)
            ));
            project.getDatabasesUsed().forEach((database) => (
                databasesFilterList.add(database)
            ))
        });

        // Function to deal with each framework checkbox change
        function checkboxLanguageHandler(event){
            // Grab the specific checkbox
            const value = event.target.value;

            // Checked or unchecked?
            if(event.target.checked){
                setCheckedLanguageFilters((filters) => new Set(filters).add(value));
            }
            else{
                setCheckedLanguageFilters((filters) => {
                    const newFilters = new Set(filters);
                    newFilters.delete(value);
                    return newFilters;
                })
            }
        }

        // Function to determine if language filter contains the checked language
        function languageIsChecked(language : string) : boolean {
            return checkedLanguageFilters.has(language);
        }

        // Function to deal with each framework checkbox change
        function checkboxFrameworkHandler(event){
            // Grab the specific checkbox
            const value = event.target.value;

            // Checked or unchecked?
            if(event.target.checked){
                setCheckedFrameworkFilters((filters) => new Set(filters).add(value));
            }
            else{
                setCheckedFrameworkFilters((filters) => {
                    const newFilters = new Set(filters);
                    newFilters.delete(value);
                    return newFilters;
                })
            }
        }

        // Function to determine if framework filter contains the checked framework
        function frameworkIsChecked(framework : string) : boolean {
            return checkedFrameworkFilters.has(framework);
        }

        // Function to deal with each tool checkbox change
        function checkboxToolHandler(event){
            // Grab the specific checkbox
            const value = event.target.value;

            // Checked or unchecked?
            if(event.target.checked){
                setCheckedToolFilters((filters) => new Set(filters).add(value));
            }
            else{
                setCheckedToolFilters((filters) => {
                    const newFilters = new Set(filters);
                    newFilters.delete(value);
                    return newFilters;
                })
            }
        }

        // Function to determine if tool filter contains the checked tool
        function toolIsChecked(tool : string) : boolean {
            return checkedToolFilters.has(tool);
        }

        // Function to deal with each database checkbox change
        function checkboxDatabaseHandler(event){
            // Grab the specific checkbox
            const value = event.target.value;

            // Checked or unchecked?
            if(event.target.checked){
                setCheckedDatabaseFilters((filters) => new Set(filters).add(value));
            }
            else{
                setCheckedDatabaseFilters((filters) => {
                    const newFilters = new Set(filters);
                    newFilters.delete(value);
                    return newFilters;
                })
            }
        }

        // Function to determine if tool filter contains the checked tool
        function databaseIsChecked(database : string) : boolean {
            return checkedDatabaseFilters.has(database);
        }

        return (
            <form onSubmit={SubmitFilterForm} id={styles.filterForm}>
                {/* These are for the filter text.  Matching project names and descriptions will be filtered based on the input */}
                <label htmlFor="filterTextInput" style={{ marginRight: '20px' }}>Filter by name or description:</label>
                <input type="text" id='filterTextInput' name="filterTextInput" value={filterText} onChange={e => setFilterText(e.target.value)} ref={filterTextRef} style={{ backgroundColor: 'white', color: 'black', marginRight: '20px' }} placeholder='Filter in real time'  required />
                <br/><br/><br/>

                {/* Add checkboxes for languages, frameworks, tools, databases */}
                <h1>Filter by languages:</h1>
                <div className={styles.projectLanguageFilter}>
                    {   /* Convert set back to array and then map out the languages */
                        Array.from(languagesFilterList).map((language, index) => (
                            <span key={index} style={{ marginRight: '1.2%' }}>  
                                <input /*key={index}*/ type="checkbox" name={language} value={language} style={{ marginRight: '5px' }} onChange={checkboxLanguageHandler} checked={languageIsChecked(language)} />
                                <label /*key={index + projects.length}*/ htmlFor={language}>{language}</label>
                            </span> 
                        ))
                    }
                    <br/><br/>
                </div>

                <h1>Filter by frameworks:</h1>
                <div className={styles.projectFrameworkFilter}>
                    {   /* Convert set back to array and then map out the languages */
                        Array.from(frameworksFilterList).map((framework, index) => (
                            <span key={index} style={{ marginRight: '1.2%' }}>  
                                <input type="checkbox" name={framework} value={framework} style={{ marginRight: '5px' }} onChange={checkboxFrameworkHandler} checked={frameworkIsChecked(framework)} />
                                <label htmlFor={framework}>{framework}</label>
                            </span> 
                        ))
                    }
                    <br/><br/><br/>
                </div>

                <h1>Filter by tools:</h1>
                <div className={styles.projectToolFilter}>
                    {   /* Convert set back to array and then map out the languages */
                        Array.from(toolsFilterList).map((tool, index) => (
                            <span key={index} style={{ marginRight: '1.2%' }}>  
                                <input type="checkbox" name={tool} value={tool} style={{ marginRight: '5px' }} onChange={checkboxToolHandler} checked={toolIsChecked(tool)} />
                                <label htmlFor={tool}>{tool}</label>
                            </span> 
                        ))
                    }
                    <br/><br/>
                </div>

                {   databasesFilterList.size > 0 &&
                    <>
                        <h1>Filter by databases:</h1>
                        <div className={styles.projectToolFilter}>
                            {   /* Convert set back to array and then map out the languages */
                                Array.from(databasesFilterList).map((database, index) => (
                                    <span key={index} style={{ marginRight: '1.2%' }}>  
                                        <input type="checkbox" name={database} value={database} style={{ marginRight: '5px' }} onChange={checkboxDatabaseHandler} checked={databaseIsChecked(database)} />
                                        <label htmlFor={database}>{database}</label>
                                    </span> 
                                ))
                            }
                            <br/><br/>
                        </div>
                    </>
                }

            </form>
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

            <div className={styles.projectChooseToFilter} onClick={() => toggleFilter()}>
                <h1 style={{ textAlign: 'center', color: 'red' }}>{filterEnabledText.current}</h1><br/>
            </div><br/><br/>

            

            {/* Add a container to display all projects */}
            <div className={styles.projectList}>
                {/* Filter projects based on text (in both name and description), by language(s)/frameworks/tools used */}
                {filterEnabled &&
                    <div className={styles.projectFilterContainer}>
                        <FilterForm />
                    </div>
                }
                <h1 style={{ textAlign: 'center'}}>Click on each project section to expand/collapse additional details.</h1><br/>
                {/* Create a list of projects. By default, additional details are hidden */}
                {
                    filteredProjects.map((project, index) => (
                        <div className={styles.projects} key={project.getProjectId()} onClick={() => toggleProjectDetailHandler(project.getProjectId() - 1)} >
                            <h1>{project.getProjectName()}</h1>  
                            {
                                detailsVisible[project.getProjectId() - 1] &&
                                <div className={styles.hiddenProjectDetails} style={{ textAlign: 'center' }} >
                                    <p>{project.getProjectDescription()}</p><br/>
                                    <p><Link to={project.getProjectUrl()} style={{'color': 'cyan', 'fontSize': '20px'}} target='_blank' onClick={() => urlHandler(project.getProjectId() - 1)} >{project.getProjectUrl()}</Link></p><br/>
                                    
                                    {/* Display languages used */}
                                    <div className={styles.hiddenLanguages}>
                                        <p>Languages used:</p>
                                        {
                                            project.getLanguagesUsed().map((language, jndex) => (
                                                <p key={jndex} style={{ display: 'inline'}}>{language}{jndex < project.getLanguagesUsed().length - 1 && " | "}</p>
                                            ))
                                        }
                                    </div>
                                    <br/>
                                    {/* Display frameworks used */}
                                    <div className={styles.hiddenFrameworks}>
                                        <p>Frameworks used:</p>
                                        {
                                            project.getFrameworksUsed().map((framework, jndex) => (
                                                <p key={jndex} style={{ display: 'inline'}}>{framework}{jndex < project.getFrameworksUsed().length - 1 && " | "}</p>
                                            ))
                                        }
                                    </div>
                                    <br/>
                                    {/* Display tools used */}
                                    <div className={styles.hiddenTools}>
                                        <p>Tools used:</p>
                                        {
                                            project.getToolsUsed().map((tool, jndex) => (
                                                <p key={jndex} style={{ display: 'inline'}}>{tool}{jndex < project.getToolsUsed().length - 1 && " | "}</p>
                                            ))
                                        }
                                    </div>
                                    {/* Display databases used */}
                                    <div className={styles.hiddenDatabases}>
                                        {project.getDatabasesUsed().length > 0 && <><br/><p>Databases used:</p></>}
                                        {
                                            project.getDatabasesUsed().map((database, jndex) => (
                                                <p key={jndex} style={{ display: 'inline'}}>{database}{jndex < project.getDatabasesUsed().length - 1 && " | "}</p>
                                            ))
                                        }
                                    </div>
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