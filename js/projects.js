const projects_list_container = document.querySelector(".projects-list-container");
const buttons = document.querySelectorAll(".projects-btn");

window.addEventListener("load", () => {
    setActiveButton(buttons[0]);
    displayProjects("All");
})

// Projects list change code for projects page
buttons.forEach(button => {
    button.addEventListener("click", (event) => {
        let projectType = event.target.innerHTML;

        setActiveButton(button);
        displayProjects(projectType);
    });
});

function setActiveButton(activeButton) {
    buttons.forEach(button => {
        button.classList.remove("active");
    });

    activeButton.classList.add("active");
}

function displayProjects(type="All") {

    // Load JSON file 
    fetch("../assets/data/project-list.json")
    .then(response => response.json())
    .then(data => {
        if(type == "All") {
            projects_list_container.replaceChildren();
            data.forEach(project => {
                buildContainers(project);
            });

        } else if(type == "Machine Learning") {
            projects_list_container.replaceChildren();
            data.forEach(project => {
                if(project.type == "Machine Learning") {
                    buildContainers(project);
                }
            })

        } else if(type == "Computer Vision") {
            projects_list_container.replaceChildren();
            data.forEach(project => {
                if(project.type == "Computer Vision") {
                    buildContainers(project);
                }
            })

        } else if(type == "LLMs/NLP") {
            projects_list_container.replaceChildren();
            data.forEach(project => {
                if(project.type == "LLMs/NLP") {
                    buildContainers(project);
                }
            })

        } else if(type == "Other") {
            projects_list_container.replaceChildren();
            data.forEach(project => {
                if(project.type == "Other") {
                    buildContainers(project);
                }
            })
        }
    })
    .catch(error => console.error("Error loading JSON: ", error))
}

function getBackground(type) {

    if(type == "Computer Vision") {
        return "#1b68e3"
    } else if(type == "Machine Learning") {
        return "#2e3cb3"
    } else if(type == "LLMs/NLP") {
        return "#1a7d21"
    } else if(type == "Other") {
        return "#ad6123"
    }

}

function buildContainers(project) {
    
    const projectDiv = document.createElement("div");
    const imageDiv = document.createElement("div");
    const textDiv = document.createElement("div");

    const projectTitleBox = document.createElement("div");
    const projectDescription = document.createElement("div");
    const skillsTags = document.createElement("div");
    const linksContainer = document.createElement("div");

    projectDiv.className = "project-container";
    imageDiv.className = "image-container";
    textDiv.className = "text-container";
    projectTitleBox.className = "project-title-container";
    projectDescription.className = "project-description-container";
    skillsTags.className = "skills-tags-container";
    linksContainer.className = "links-container";

                
    const typeTag = document.createElement("span");
    const title = document.createElement("h3");
    title.innerText = project.title;
    typeTag.innerText = project.type;
    typeTag.style.backgroundColor = getBackground(project.type);
                
    projectTitleBox.appendChild(title);
    projectTitleBox.appendChild(typeTag);

    projectDescription.innerText = project.description;
    project.skills.forEach(skill => {
        const skillTag = document.createElement("span");
        skillTag.classList.add("skill-tag"); // Optional CSS class
        skillTag.innerText = skill;

        skillsTags.appendChild(skillTag);
    });

    if(project.github) {
        const githubLink = document.createElement("a");
        githubLink.href = project.github;
        githubLink.target = "_blank";

        githubLink.innerHTML = `<i class="fa-brands fa-github"></i> <span>GitHub</span>`;

        linksContainer.appendChild(githubLink);
    }

    if(project.try_out_link) {
        const tryOutLink = document.createElement("a");
        tryOutLink.href = project.try_out_link;
        tryOutLink.target = "_blank";

        tryOutLink.innerHTML = ` <i class="fa-solid fa-arrow-up-right-from-square"></i> <span>Live Demo</span>`;

        linksContainer.appendChild(tryOutLink);
    }

    if(project.demo_video) {
        const demoLink = document.createElement("a");
        demoLink.href = project.demo_video;
        demoLink.target = "_blank";
                    
        demoLink.innerHTML = `<i class="fa-solid fa-circle-play"></i> <span>Video</span>`
                    
        linksContainer.appendChild(demoLink);
    }

    const projectImage = document.createElement("img");
    if (project.image != null) {
        projectImage.src = project.image;
        imageDiv.appendChild(projectImage);
    }

                
    textDiv.appendChild(projectTitleBox)
    textDiv.appendChild(projectDescription);
    textDiv.appendChild(skillsTags);
    textDiv.appendChild(linksContainer);

    projectDiv.appendChild(imageDiv);
    projectDiv.appendChild(textDiv);

    
    projects_list_container.appendChild(projectDiv);

}