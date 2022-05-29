
//get input
let input = document.querySelector("#inputTexr");
//get buttom add
let btnAdd = document.querySelector(".add");
//get buttom remove
let btnRemove = document.querySelector(".remove-all");
//get buttom save
let savetaskbtn = document.getElementById("savetaskbtn");
//get div
let tableContaiber = document.querySelector(".container-table");
showtask()

btnAdd.addEventListener("click", function () {
  let inputValue = input.value;
      if (inputValue.trim() != 0) {
          let webtask = localStorage.getItem("localtask");
          console.log(webtask);
      if (webtask == null) {
          taskObj = [];
          console.log(taskObj);
       } else {
          taskObj = JSON.parse(webtask);
          console.log(taskObj);
       }
          taskObj.push({ task_name: inputValue, completeStatus: false });
          localStorage.setItem("localtask", JSON.stringify(taskObj));
          input.value="";
       }
    showtask();
});


// showtask
function showtask(){
    let webtask = localStorage.getItem("localtask");
    if(webtask == null){
        taskObj = [];
    }
    else{
        taskObj = JSON.parse(webtask);
    }
    let html = '';
    taskObj.forEach((item, index) => {

        if(item.completeStatus==true){
            taskCompleteValue = `<td class="completed">${item.task_name}</td>`;
        }else{
            taskCompleteValue = `<td>${item.task_name}</td>`;
        }
        html += `<tr>
                    <th scope="row">${index+1}</th>
                    ${taskCompleteValue}
                    <td><button type="button" onclick="edittask(${index})" 
                    class="text-primary"><i class="fa fa-edit"></i>Edit</button></td>
                    <td><button type="button" class="text-success" id=${index}><i class="fa fa-check-square-o"></i>Complete</button></td>
                    <td><button type="button" onclick="deleteitem(${index})" class="text-danger"><i class="fa fa-trash"></i>Delete</button></td>
                </tr>`;console.log(index);
    });

    tableContaiber.innerHTML = html;
}

function edittask(index){
    //get input hiddan
    let saveindex = document.getElementById("saveindex");
    //get buttom save
    let savetaskbtn = document.getElementById("savetaskbtn");
    saveindex.value = index;
    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask); 
    
    input.value = taskObj[index]['task_name'];
    btnAdd.style.display="none";
    savetaskbtn.style.display="block";
}

// savetask
savetaskbtn.addEventListener("click", function(){
    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask); 
    let saveindex = document.getElementById("saveindex").value;
    
    for (keys in taskObj[saveindex]) {
        if(keys == 'task_name'){
            taskObj[saveindex].task_name = input.value;
        }
      }
    savetaskbtn.style.display="none";
    btnAdd.style.display="block";
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    input.value='';
    showtask();
})
 
function deleteitem(index){
    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask);
    taskObj.splice(index, 1);
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    showtask();
}