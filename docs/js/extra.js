function setupExpansionGroups() {
    var expansiongroups = document.querySelectorAll('.expansiongroup + p + h2');
    expansiongroups.forEach((node) => {
        node.addEventListener("click",onClickExpansionGroup);
        node.dataset.expanded = false;
    });
    var expandall = document.querySelectorAll('.expand-all');
    expandall.forEach((node) => {
        node.addEventListener("click",ExpandAll);
    });
    var collapseall = document.querySelectorAll('.collapse-all');
    collapseall.forEach((node) => {
        node.addEventListener("click",CollapseAll);
    });

    //Expansion group pages don't have an edit button (auto generated)
    if(CollapseAll.length || expandall.length) {
        var editLink = document.querySelector('a[title="Edit this page"]')
        if(editLink) {
            editLink.style.display = "none";
        }
    }
};

function setupScreenshotHover() {
    var screenshotLinks = document.querySelectorAll('a[data-screenshot]');
    var mainElement = document.querySelector('.md-main');
    var hoverBox = null;
    
    screenshotLinks.forEach((link) => {
        link.addEventListener('mouseenter', (e) => {
            var screenshotUrl = e.target.dataset.screenshot;
            
            // Create hover box if it doesn't exist
            if (!hoverBox) {
                hoverBox = document.createElement('div');
                hoverBox.style.position = 'absolute';
                hoverBox.style.zIndex = '9999';
                hoverBox.style.padding = '8px';
                hoverBox.style.backgroundColor = 'white';
                hoverBox.style.border = '1px solid #ccc';
                hoverBox.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                hoverBox.style.borderRadius = '8px';
                hoverBox.style.pointerEvents = 'none';
                hoverBox.style.maxWidth = '400px';
                mainElement.style.position = 'relative';
                mainElement.appendChild(hoverBox);
            }
            
            // Create and add image
            var img = document.createElement('img');
            img.src = screenshotUrl;
            img.style.maxWidth = '100%';
            img.style.maxHeight = '300px';
            img.style.display = 'block';
            img.onload = () => {
              // Position the box above the link
              var rect = e.target.getBoundingClientRect();
              hoverBox.style.left = rect.left + window.scrollX + 'px';
              hoverBox.style.bottom = (mainElement.clientHeight - link.offsetTop - 20) + 'px';
              hoverBox.style.display = 'block';
            };
            img.onerror = () => {
              // Use fallback image if screenshot fails to load
              img.src = 'https://raw.githubusercontent.com/pnp/List-Formatting/refs/heads/master/docs/img/screenshotnotfound.png';
            };
            hoverBox.innerHTML = '';
            hoverBox.appendChild(img);
        });
        
        link.addEventListener('mouseleave', () => {
            if (hoverBox) {
                hoverBox.style.display = 'none';
            }
        });
    });
};

function ExpandAll() {
    var expansiongroups = document.querySelectorAll('.expansiongroup + p + h2');
    expansiongroups.forEach((node) => {
        node.dataset.expanded = true;
    });
}

function CollapseAll() {
    var expansiongroups = document.querySelectorAll('.expansiongroup + p + h2');
    expansiongroups.forEach((node) => {
        node.dataset.expanded = false;
    });
}

function onClickExpansionGroup(e) {
    var expanded = e.target.dataset.expanded == "true";
    e.target.dataset.expanded = !expanded;
}

setupExpansionGroups();
setupScreenshotHover();