const inputbox = document.getElementById("input-box");
const listcontainer = document.getElementById("list-container");

function addTask()
{ 

     if(inputbox.value == '')
        {
            alert("you must write something!");
        }
        else
        {
            let li = document.createElement("li");
             li.innerHTML =  inputbox.value;
            listcontainer.appendChild(li); //display the task

            let span = document.createElement("span");
            span.innerHTML = "\u00d7"; //cross icon 
            li.appendChild(span); //display 



        }
        //value will be empty after adding 
         inputbox.value = "";
         saveData(); //update the data and save the data


}

//for click event

listcontainer.addEventListener("click",function(e)
{ 
    if(e.target.tagName === "LI")
        {
            e.target.classList.toggle("checked");
            saveData();
        }
        else if(e.target.tagName === "SPAN")
        {
            e.target.parentElement.remove();
            saveData();

       }


},false)


//for save task function

function saveData()
{
    localStorage.setItem("data",listcontainer.innerHTML);


}

//show the data

function showTask()
{
    listcontainer.innerHTML = localStorage.getItem("data");

}
showTask();

