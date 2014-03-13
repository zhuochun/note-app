/* jshint jquery:true, devel:true */

var notes = [
    {
        title: "SimpleNote Intro",
        content: "SimpleNote is built with ChocolateChip-UI<br>Version 3.5.2"
    },
    {
        title: "My Favorite Quotes",
        content: "It takes a great man to be a good listener."
    }
];

(function() {
    var i;
    for (i = 0; i < notes.length; i++) {
        listNode(i);
    }
})();

$("#home-note-list").on("singletap", "li", function() {
    var id = $(this).data("id");
    viewNote(id);
});

$("#goto-home").on("singletap", function() {
    $.UIGoToArticle("#home");
});

$("#goto-new-note").on("singletap", function() {
    editNode("New Note");
});

$("#goto-edit-note").on("singletap", function() {
    var id = $("#note-view").data("id");
    editNode("Edit Note", id);
});

$("#note-edit-save").on("singletap", function() {
    var id = $("#note-edit").data("id");
    var title = $("#note-edit-title").val();
    var content = $("#note-edit-content").val();

    if (title.length <= 0) {
        title = "New Note";
    }

    if (content.length <= 0) {
        $.UIPopup({
            id: "note-edit-warning",
            title: 'Content is empty!',
            message: 'Do you want to save it as an empty note?',
            cancelButton: 'Cancel',
            continueButton: 'Yes',
            callback: function() {
                content = "";

                var noteId = addNote(id, title, content);

                if (id < -1) {
                    listNode(noteId);
                }

                viewNote(noteId);
            }
        });
    } else {
        var noteId = addNote(id, title, content);

        if (id < -1) {
            listNode(noteId);
        }

        viewNote(noteId);
    }
});

function listNode(id) {
    $("#home-note-list").append("<li class='nav' data-id='" + id + "'>" +
                                "<h3>" + notes[id].title + "<h3>" +
                                "<h4>" + notes[id].content.substr(0, 30) + "...</h4>" +
                                "</li>");
}

function addNote(id, title, content) {
    if (id < 0) {
        notes.push({title: title, content: content});
        return notes.length - 1;
    }

    notes[id].title = title;
    notes[id].content = content;
    return id;
}

function viewNote(id) {
    $("#note-view").data("id", id);

    $("#note-view .note-title").text(notes[id].title);
    $("#note-view .note-content").text(notes[id].content);

    $.UIGoToArticle("#note-view");
}

function editNode(pageTitle, id) {
    $("#note-edit-page-title").text(pageTitle);

    if (id >= 0) {
        $("#note-edit").data("id", id);

        $("#note-edit-title").val(notes[id].title);
        $("#note-edit-content").val(notes[id].content);
    } else {
        $("#note-edit").data("id", -1);

        $("#note-edit-title").val("");
        $("#note-edit-content").val("");
    }

    $.UIGoToArticle("#note-edit");
}
