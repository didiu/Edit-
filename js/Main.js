$(document).ready(function () {
    $("#div-code").removeClass("col-md-6");
    $("#div-code").removeClass("column");
    $("#viewO").removeClass("col-md-6");
    $("#viewO").removeClass("column");
    $("#viewO").hide();
    $("#div-code").addClass("col-md-12");
    $("#div-code").addClass("column");
});

function showview() {
    var str = document.getElementById("showV");
    if (str.checked == true) {
        $("#div-code").removeClass("col-md-12");
        $("#div-code").removeClass("column");
        $("#viewO").addClass("col-md-6");
        $("#viewO").addClass("column");
        $("#viewO").show();
        $("#div-code").addClass("col-md-6");
        $("#div-code").addClass("column");
    }
    if (str.checked == false) {
        $("#div-code").removeClass("col-md-6");
        $("#div-code").removeClass("column");
        $("#viewO").removeClass("col-md-6");
        $("#viewO").removeClass("column");
        $("#viewO").hide();
        $("#div-code").addClass("col-md-12");
        $("#div-code").addClass("column");
    }
}

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
    "Ctrl":"autocomplete",
});

function enterFullScreen() {
    editor.setOption("fullScreen", true);
}

//function showResult() {
//    $("#view").html(editor.getValue());
//}

function selectlanguage(str) {
    switch (str) {
        case "html":
            var str =
            '<!DOCTYPE html>' + '\n'
            + '<html>' + '\n'
            + '<head>' + '\n'
            + '    <title></title>' + '\n'
            + '	  <meta charset="utf-8" />' + '\n'
            + '</head>' + '\n'
            + '<body>' + '\n'
            + '\n'
            + '</body>' + '\n'
            + '</html>';
            editor.setOption("mode", "htmlmixed");
            editor.setValue(str);
            break;
        case "javascript":
            var str = '//javascript界面' + '\n';
            editor.setOption("mode", "text/javascript");
            editor.setValue(str);
            break;
        case "c++":
            editor.setOption("mode", "text/x-c++src");
            editor.setValue('/**********************' + '\n'
                 + 'C++界面' + '\n'
                 + '***************/' + '\n');
            break;
        case "c#":
            editor.setOption("mode", "text/x-csharp");
            editor.setValue("/*" + '\n' + "C#界面" + '\n' + "*/" + '\n');
            break;
        case "objective-c":
            editor.setOption("mode", "text/x-objectivec");
            editor.setValue("/**" + '\n' + "*Objective-C界面" + "\n" + "*/" + '\n');
            break;
        case "java":
            editor.setOption("mode", "text/x-java");
            editor.setValue("/*" + '\n' + "Java界面" + '\n' + "*/" + '\n');
            break;
        case "python":
            editor.setOption("mode", "python");
            editor.setValue('"""' + '\n' + 'Python界面' + '\n' + '"""');
            break;
        case "HTML":
            editor.toTextArea();
            search();
            //alert("我是一个提示符");
            break;
        default:
            break;
    }
}

function selectTheme() {
    var str = document.getElementById("selectTheme");
    //alert(str);
    var theme = str.options[str.selectedIndex].textContent;
    //alert(theme);
    if (theme == "3024-day") {
        editor.setOption("theme", "3024-day");
    } else if (theme == "3024-night") {
        editor.setOption("theme", "3024-night");
        //$("body").css("background-color", "black");
        //$(".CodeMirror")
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
    if (auturun == true)
    {
    clearTimeout(delay);
    delay = setTimeout(updateview, 300);
    }
});

function updateview() {
    var viewdiv = document.getElementById('view');
    var view = viewdiv.contentDocument || viewdiv.contentWindow.document;
    view.open();
    view.write(editor.getValue());
    view.close();
    var str = document.getElementById("showV");
    if (str.checked == false) {
        str.checked = true;
        showview();
    }
}
if (auturun == true)
{
    setTimeout(updateview, 300);
}

var auturun;
function autuupdata() {
    var str = document.getElementById("autudata");
    if (str.checked==true) {
        auturun = true;
    }
    else {
        auturun = false;
    }
}

$(function () {
    $(".dropdown").mouseover(function () {
        $(this).addClass("open");
    });

    $(".dropdown").mouseleave(function () {
        $(this).removeClass("open");
    })
})

function islineNumber() {  
    var linenumber = document.getElementById("lineNum");
    editor.setOption("lineNumbers", linenumber.checked);
    //if (linenumber.checked==true) {
    //    editor.setOption("lineNumbers", true);
    //}
    //if (linenumber.checked==false) {
    //    editor.setOption("lineNumbers", false);
    //}
}

function foldgutter() {
    var matchstr = document.getElementById("foldgutt");
    editor.setOption("foldGutter", matchstr);
    //if (matchstr.checked == true) {
    //    editor.setOption("foldGutter", true);
    //}
    //if (matchstr.checked == false) {
    //    editor.setOption("foldGutter", false);
    //}
}

function insertjs(str) {
    switch (str) {
        case "jquery3-2-1":
            insertjslibrary('\n\t\t'+'<script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>');
            //alert("跳到这里了-3-2-1");
            break;
        case "jquery3-2-0":
            insertjslibrary('\n\t\t' + '<script src="https://cdn.bootcss.com/jquery/3.2.0/jquery.min.js"></script>');
            //alert("跳到这里了-3-2-0");
            break;
        case "jquery3-1-1":
            insertjslibrary('\n\t\t' + '<script src="https://cdn.bootcss.com/jquery/3.1.1/jquery.min.js"></script>');
            //alert("跳到这里了-3-1-1");
            break;
        case "jquery3-1-0":
            insertjslibrary('\n\t\t' + '<script src="https://cdn.bootcss.com/jquery/3.1.0/jquery.min.js"></script>');
            //alert("跳到这里了-3-1-0");
            break;
        case "jquery3-0-0":
            insertjslibrary('\n\t\t' + '<script src="https://cdn.bootcss.com/jquery/3.0.0/jquery.min.js"></script>');
            //alert("跳到这里了-3-0-0");
            break;
        case "jquery2-2-4":
            insertjslibrary('\n\t\t' + '<script src="https://cdn.bootcss.com/jquery/2.2.4/jquery.min.js"></script>');
            //alert("跳到这里了-2-2-4");
            break;
        default:
            //alert("跳到这里了-default");
            break;
    }
}

function insertjslibrary(str) {
    var reg = /<head>/i;
    var regbody = /<body>/i
    var jslib;
    var txt;
    var editorvalue = editor.getValue();
    if (reg.test(editorvalue))
    {
        //alert("匹配到<head>");
        if (editorvalue.indexOf(str) >= 0)
        {
            alert("已添加");
        }
        else
        {
            txt = editorvalue.replace(/<head>/i, "<head>" + str);
        }
    }
    else if (regbody.test(editorvalue))
    {
        //alert("匹配到<body>");
        if (editorvalue.indexOf(str)>=0)
        {
            alert("已添加");
        }
        else
        {
            txt = editorvalue.replace(/<body>/i, "<body>" + str);
        }
    }
    else
    {
        //alert("!---匹配到<body>")
    }
    //editorvalue += str;
    editor.setValue(txt);
}

function search() {
    var obj = document.getElementById("textdiv");
    var str = '<|>|!|/|"';
    var strone = "";
    var hlwords = "/<[a-zA-z]>/";
    MarkHighLight(obj, str, "blue");
    MarkHighLight(obj, strone, "red");
    MarkHighLight(obj, hlwords, "yellow");
}

function MarkHighLight(obj, hlWords, bgColor) {
    //var htmlvalue = document.getElementById("code");
    //htmlvalue.innerHTML = htmlvalue.innerHTML.replace(/html/ig,"<span style=\"color:red\">html</span>");
    //var oFont = document.createElement("FONT");
    //var tex = "变色";
    //var oText = document.createTextNode(tex);
    //oFont.style.color = "#00ee00";
    //oFont.appendChild(oText);
    //document.getElementById("code").appendChild(oFont);
    hlWords = AnalyzeHighLightWords(hlWords);
    if (obj == null || hlWords.length == 0)
        return;
    if (bgColor == null || bgColor == "") {
        bgColor = "red";
    }
    MarkHighLightCore(obj, hlWords);

    function MarkHighLightCore(obj, keyWords) {
        var re = new RegExp(keyWords, "i");
        var style = ' style="color:' + bgColor + ';" '
        for (var i = 0; i < obj.childNodes.length; i++) {

            var childObj = obj.childNodes[i];
            if (childObj.nodeType == 3) {
                if (childObj.data.search(re) == -1) continue;
                var reResult = new RegExp("(" + keyWords + ")", "gi");
                var objResult = document.createElement("span");
                objResult.innerHTML = childObj.data.replace(reResult, "<span" + style + ">$1</span>");
                if (childObj.data == objResult.childNodes[0].innerHTML) continue;
                obj.replaceChild(objResult, childObj);
            } else if (childObj.nodeType == 1) {
                MarkHighLightCore(childObj, keyWords);
            }
        }
    }

    function AnalyzeHighLightWords(hlWords) {
        if (hlWords == null) return "";
        hlWords = hlWords.replace(/\s+/g, "|").replace(/\|+/g, "|");
        hlWords = hlWords.replace(/(^\|*)|(\|*$)/g, "");

        if (hlWords.length == 0) return "";
        var wordsArr = hlWords.split("|");

        if (wordsArr.length > 1) {
            var resultArr = BubbleSort(wordsArr);
            var resultArr = wordsArr;
            var result = "";
            for (var i = 0; i < resultArr.length; i++) {
                result = result + "|" + resultArr[i];
            }
            return result.replace(/(^\|*)|(\|*$)/g, "");

        } else {
            return hlWords;
        }
    }

    function BubbleSort(arr) {
        var temp, exchange;
        for (var i = 0; i < arr.length; i++) {
            exchange = false;
            for (var j = arr.length - 2; j >= i; j--) {
                if ((arr[j + 1].length) > (arr[j]).length) {
                    temp = arr[j + 1]; arr[j + 1] = arr[j]; arr[j] = temp;
                    exchange = true;
                }
            }
            if (!exchange) break;
        }
        return arr;
    }
    ////setTimeout(htmlchangecolor, 300);
}