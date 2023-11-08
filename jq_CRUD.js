$(function(){
    loadRecipies();
    $("#recipes").on("click",".btn-danger", handleDelete);
    $("#recipes").on("click",".btn-warning", handleUpdate);
    $("#addBtn").click(addRecipies);
    $("#updateSave").click(function(){
        var id = $("#UpdateID").val();
        var title = $("#UpdateTitle").val();
        var body = $("#Updatebody").val();
        $.ajax({
            url:"https://usman-fake-api.herokuapp.com/api/recipes/" + id,
            data:{title, body},
            method:"PUT",
            success:function(response){
                console.log(response);
                loadRecipies();
                $("#UpdateModal").modal("hide");
            }
        });
    });
});

function loadRecipies(){
    $.ajax({
        url:"https://usman-fake-api.herokuapp.com/api/recipes",
        method:"GET",
        error:function(response){
            var recipes = $("#recipes");
            recipes.html("An error has occured");
        },
        success:function(response){
            console.log(response);
            var recipes = $("#recipes");
            recipes.empty();
            for(var i=0; i<response.length; i++){
                var rec = response[i];
                recipes.append(`<div class="recdiv" dumy-id=${rec._id}><h3>${rec.title} <button class="btn btn-danger btn-sm float-end">Delete</button><button class="btn btn-warning btn-sm float-end">Edit</button></h3><p>${rec.body}</p></div>`);
            }
        }
    });
}

function handleDelete(){
    let btn = $(this);
    let parentDiv = btn.closest(".recdiv");
    let id = parentDiv.attr("dumy-id");

    $.ajax({
        url:"https://usman-fake-api.herokuapp.com/api/recipes/" + id,
        method:"DELETE",
        success:function(){
            loadRecipies();
        }
    })
}

function addRecipies(){
    var title = $("#title").val();
    var body = $("#body").val();
    $.ajax({
        url:"https://usman-fake-api.herokuapp.com/api/recipes/",
        method:"POST",
        data:{title, body},
        success:function(response){
            console.log(response);
            $("#title").val("");
            $("#body").val("");
            loadRecipies();
            $("#addModal").modal("hide");
        }
    })
}

function handleUpdate(){
    let btn = $(this);
    let parentDiv = btn.closest(".recdiv");
    let id = parentDiv.attr("dumy-id");
    $.get("https://usman-fake-api.herokuapp.com/api/recipes/" + id, function(response){
        $("#UpdateID").val(response._id);
        $("#UpdateTitle").val(response.title);
        $("#Updatebody").val(response.body);
        $("#UpdateModal").modal("show");
    })
}