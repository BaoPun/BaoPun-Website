# Source Code for Bao Phung's website
This repository contains all the source code for my website.  [Click here](https://www.baopunny.studio) to view the website.

# Website Initial Features
- Initial home page and Mario Kart pages are set up.
- About Me and Projects pages are not set up yet.  Clicking on them will redirect to a 404 page.
- Score Tracker page within Mario Kart page is set up via clicking on 6 possible formats.

# Website Upcoming Features
- Writing more robust test cases for filtering.  Need to test filtering via selecting checkboxes.
- In Score Tracker page, implement feature to copy current team standings after inputting all teams
- Mobile support for competitive Mario Kart score tracking and the entire website in general

# Website Updates (will chronologically update with added features)
- Deployed website to https://www.baopunny.studio with SSL certificate for HTTPS support.
- About Me Page is now complete.  Navigation bar can now be hidden by clicking anywhere (except for the contents themselves).
- Testing of About Me page done.  
- Initial contents of Projects have been populated.  Clicking on a project will expand/collapse additional details.
- Initial testing of Projects pre-filter have passed.
- Filtering implemented and initial test cases written.  Next test cases will be via filtering with checkboxes.

# Deployment Details
### Frameworks
The framework used for this website was **React Router.**  The main advantage of React is that we can build parts of a website as "components", which can be combined together to form dynamic websites. 

### Testing
**Vitest** was the framework of choice.  While **Jest** was considered, **Vitest's** ease of setup and built-in support for React made it the preferred option.  Testing follows the DAMP (descriptive and meaningful phrases) principle using testing suites organized in a Feature-First scheme. 

### Containerization
**Docker** was used to containerize the React application.  Within the container, we install dependencies specified within package.json, build the project, and then run the application.  This way, the container contains a running instance of the application, which is eventually passed to the Ansible playbook to be run within the EC2 instance.

### Infrastructure
To automate the setup of creating an AWS EC2 instance with AWS credentials, security groups, key pairs, subnets, a load balancer, and http/https listeners, **Pulumi** was used as an "infrastructure as code", or IaC for short.  The main benefit of Pulumi is that we can automate the infrastructure using a programming of our choice, which is something **Terraform** does not provide.  

### Configuration
After provisioning the infrastructure with Pulumi, we then run an **Ansible** playbook that will automate the remaining processes within the EC2 instance that was provisioned in the previous step.  Ansible will be responsible for installing Docker and running the Docker container within the EC2 instance, restarting **Nginx** - a web server that supports reverse proxying - and copying configuration files to EC2 instance, cloning the source code onto the EC2 instance, and setting up SSL certificates to secure the custom domain.  

### CI/CD
Due to **Github Actions** being naturally integrated within GitHub's platform, it was the clear choice for performing CI/CD workflows.  You can find the yaml files under .github/workflows.  
All of the workflows are triggered by any changes to the main branch, as well as the individual branches of each feature (at this time, this is applicable for deployment and httpsConfiguration branches).  

