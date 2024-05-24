let myLeads = [];

const inputEl = document.querySelector("#input-el")

const button = document.querySelector("#input-btn");

const ulEl = document.querySelector("#ul-el");

const deleteBtn = document.querySelector("#delete-btn")

const saveBtn = document.querySelector("#save-btn")

const leadsfromLS = JSON.parse( localStorage.getItem("myLeads") );


if (leadsfromLS) {
    myLeads = leadsfromLS
    render(myLeads)
}

function render(leads) {
    
    let listItems = ""
    for (let i=0; i < leads.length; i++){
        
        listItems += `
        <li>
            <a target="_blank" href = https://${leads[i]}>
                ${leads[i]}
            </a>
        </li>`
    }
    ulEl.innerHTML = listItems;
}


saveBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})

deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear();
    myLeads = [];
    render(myLeads);
} )

button.addEventListener("click", function(){
    myLeads.push(inputEl.value);
    inputEl.value="";
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)

    // console.log(localStorage.getItem("myLeads"))
})



    
