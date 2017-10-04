var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
    //mode: "htmlmixed",

    mode: { name: "htmlmixed", globalVars: true },
    lineNumbers: true,
    indentUnit: 4,
    styleActiveLine: true,
   
    width: "100%",
    height: "100%",
    lineWrapping: true,
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    matchBrackets: true,
    autoCloseTags: true,
    autoCloseBrackets: true,
    matchTags: { bothTags: true },
    tabSize:2,
});
editor.setSize("100%", "700");

editor.setOption("extraKeys", {
    // Tab键换成4个空格
    Tab: function (cm) {
        var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
        cm.replaceSelection(spaces);
    },
    // F11键切换全屏
    "F11": function (cm) {
        cm.setOption("fullScreen", !cm.getOption("fullScreen"));
    },
    "F9": function (cm) {
        updateview();
    },
    "Ctrl": "autocomplete",
    "Ctrl-J": "toMatchingTag",
    "Ctrl-Q": function (cm) {
        cm.foldCode(cm.getCursor());
    },
});

function enterFullScreen() {
    editor.setOption("fullScreen", true);
}

//function showResult() {
//    $("#view").html(editor.getValue());
//}

function selectLanguage() {
    var str = 
'<!DOCTYPE html>'+'\n'
+ '<html>' + '\n'
+ '<head>' + '\n'
+ '    <title></title>' + '\n'
+ '	  <meta charset="utf-8" />' + '\n'
+ '</head>' + '\n'
+ '<body>' + '\n'
+ '\n'
+ '</body>' + '\n'
+'</html>';
    var lang = $("#selectLanguage").val();
    if (lang == "Html") {
        editor.setOption("mode", "htmlmixed");
        editor.setValue("1");
    }else if(lang=="JavaScript"){
        editor.setOption("mode", "text/javascript");
        editor.setValue("12");
    }else if (lang == "C++") {
        editor.setOption("mode", "text/x-c++src");
        editor.setValue("2");
    }else if (lang == "C#") {
        editor.setOption("mode", "text/x-csharp");
        editor.setValue("3");
    } else if (lang == "Objective-C") {
        editor.setOption("mode", "text/x-objectivec");
        editor.setValue("4");
    } else if (lang == "Java") {
        editor.setOption("mode", "text/x-java");
        editor.setValue("5");
    } else if (lang == "python") {
        editor.setOption("mode", "python");
        editor.setValue("6");
    }
}

function selectTheme() {
    var input = document.getElementById("selectTheme");
    var theme = input.options[input.selectedIndex].textContent;

    if (theme == "3024-day") {
        editor.setOption("theme", "3024-day");
    } else if (theme == "3024-night") {
        editor.setOption("theme", "3024-night");
    }
}

function selectKeyboard() {
    var input = document.getElementById("selectkey");
    var keybord = input.options[input.selectedIndex].textContent;
    if (keybord=="Defult") {
        editor.setOption("keyMap", "default");
    } else if (keybord=="Vim") {
        editor.setOption("keyMap", "vim");
    } else if (keybord=="Sublime") {
        editor.setOption("keyMap", "sublime");
    } else if (keybord="Emacs") {
        editor.setOption("keyMap","emacs")
    }
}

var delay;
editor.on("change", function () {
    clearTimeout(delay);
    delay = setTimeout(updateview, 300);
});
function updateview() {
    var viewdiv = document.getElementById('view');
    var view = viewdiv.contentDocument || viewdiv.contentWindow.document;
    view.open();
    view.write(editor.getValue());
    view.close();
}
setTimeout(updateview, 300);