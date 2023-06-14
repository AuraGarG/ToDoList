$(document).ready(function(){
  taskList();
});

  $('#add-button').click(function() {addTask();});

  $('#listContainer').on("click","li",function(){
      $(this).addClass("checked");
      checkTask($(this).attr('id'));
      taskList();
  });

  $('#listContainer').on("click","span",function(){
    $(this).parent("li").remove();
    delTask($(this).attr()); 
    taskList();
  });

  //metodo carga todas las listas
  function showTasks(response) {
    $("#listContainer").empty();
    var data = response;
    console.log(data)
    $.each(data,function(i,item) {
      let elemento;
      if (item.update) {
        elemento = "<li id='"+ item.id + "' class='checked'>"+ item.tareas + " <span>\u00d7</span></li>";
      } else {
        elemento = "<li id='"+ item.id + "'>"+ item.tareas + " <span>\u00d7</span></li>";
      }
      $("#listContainer").append(elemento);
    })

  };

  function showError(message) {
    console.log(message);
  };

  function taskList() {
    $.ajax({
      type:"GET",
      url:"http://localhost:8080/task/",
      dataType:"json",
      async: true,
      success:showTasks,
      error:showError
    })
  };

 //eventos del input
  function addTask() {
      let inputBox = $("#input-box").val();
      if (inputBox == '') {
        alert("Debes escribir una tarea");
      } else {
        crearTarea(inputBox);
      }
      $("#input-box").val('');
  };

  //metodo Post envia la tarea a BD

  function crearTarea(inputBox) {
    const task = {
      tareas: inputBox,
      update: false
    }
    const taskItem=JSON.stringify(task);
  
    $.ajax({
      type:"POST",                    
      url:"http://localhost:8080/task/", 
      dataType:"json",
      data:taskItem,
      contentType : 'application/json',
      success: taskList,
      error:showError,
    })
    
    taskList();
  };
  //metodo Put cambia el valor a true
  function checkTask(id) {
    const ctask = {
      id: id,
      update: true
    } 
    const tItem=JSON.stringify(ctask);
    $.ajax({
      type:"PUT",                    
      url:"http://localhost:8080/task/", 
      dataType:"json",
      data:tItem,
      contentType : 'application/json',
      success: taskList,
      error:showError,
    })
  };

    //metodo delete para borrar
    function delTask(id) {
      $.ajax({
        type:"DELETE",                    
        url:"http://localhost:8080/task/" + id, 
        success:function(){
          alert("tarea borrada");
          taskList();
        },
        error:showError
      });
  };

