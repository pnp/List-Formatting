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