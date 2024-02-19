function getCarousel(images) {
    const imagesHTML = images.map(image => `<div class="carousel-item"><img class="d-block w-100" src="${image}" alt="Slide"></div>`).join("");

    return `
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner"> ${imagesHTML} </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
    `;
}

function getProjectVideoAsHTML(project) {
    return `
        <a href="#" class="row project-video">
            <iframe class="image fit" src="${project.video}" alt="" allow="fullscreen;" style="max-width:700px; height: 400px;"></iframe>
        </a>
    `;
}
function getProjectAsHTML(project) {
    
    const projectTitle = `
        ${project.link? `<a href="${project.link}">` : ""}
            <h3>${project.title}</h3>
        ${project.link? `</a>` : ""}
    `;
    
    let paragraphs = "";
    for (let paragraph of project.description) {
        paragraphs += `<p>${paragraph}</p>`;
    }
    
    return `
        ${projectTitle}
        <div class = "row">
            <div class = col-12>
                ${project.video ? getProjectVideoAsHTML(project) : ""}
            </div>
            <div class="inner">${paragraphs}</div>
        </div>
    `
}

function constructProjectList(projectList) {
    let projectsAsHTML = "";
    for (let project of projectList) {
        projectsAsHTML  += `<div>${getProjectAsHTML(project)}</div>`;
    }
    document.getElementById("project-list").innerHTML += projectsAsHTML;
}

function build_about_me(about_me) {
    document.getElementById("resume").href = about_me.resume;
    document.getElementById("job-title").innerHTML = about_me.job_title;
    document.getElementById("job-description").innerHTML = about_me.job_description ? about_me.job_description : "";
    document.getElementById("about-me").innerHTML= about_me.description.map(description => `<p>${description}</p>`).join("");
}

function main() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const isWeb = urlParams.has('web');

    constructProjectList(isWeb ? web_projects : game_dev_projects);

    build_about_me(isWeb ? about_me_web : about_me_game_dev);
}

main();