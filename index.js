// require all the external modules needed for the project

const $ = require("jquery");
const electron = require("electron");
const fs = require("fs") ;
const dialog = require("electron").remote.dialog ;


$(document).ready(
    function () {
        let db ;
        $("#grid .cell").on("click", function () {
            let rid = Number($(this).attr("ri"));
            let cid = Number($(this).attr("ci"));
            let ciAdrr = String.fromCharCode(cid + 64);
            $("#address-container1").val(ciAdrr +rid);
        })
        $(".menu-items").on("click",function(){
            $(".menu-options-item").removeClass("selected");
            let id= $(this).attr("id");
            $(`#${id}-options`).addClass("selected");
        })
        $("#New").on("click",function(){
            db=[];
            $("#grid").find(".row").each(function(){
                let row = [];
                $(this).find(".cell").each(function(){
                    let cell=false;
                    $(this).html("false");
                    row.push(cell);
                })
                db.push(row);
            })
        })
  
        $("#grid .cell").on("keyup",function(){
            //update db
           let rowId =  $(this).attr("ri");
           let colId = $(this).attr("ci");
           db[rowId][colId]=$(this).html();
           console.log(db);
        })

        $("#Save").on("click", async function () {
            console.log("Save is clicked");
            let sdb = await dialog.showOpenDialog();
            console.log(sdb);
            let jsonData = JSON.stringify(db);
            fs.writeFileSync(sdb.filePaths[0], jsonData);
        })
        // JS  alternative to show dialogBox
        let fileSaver = document.querySelector("#File-saver");
        fileSaver.addEventListener("change", function () {
            let fpath = fileSaver.files[0].path;
            let jsonData = JSON.stringify(db);
            fs.writeFileSync(fpath, jsonData);
            console.log("written file to disk");
        })
        
        // Open
        $("#Open").on("click", async function () {
            let odb = await dialog.showOpenDialog();
            let fp = odb.filePaths[0];
            let content = await  fs.promises.readFile(fp);
            db = JSON.parse(content);
            // loop 
            let rows = $("#grid").find(".row");
            for (let i = 0; i < rows.length; i++) {
                let cRowCells = $(rows[i]).find(".cell");
                for (let j = 0; j < cRowCells.length; j++) {
                    // DB
                    
                    $(cRowCells[j]).html(db[i][j]);
                }
            }
        })


        function init(){
            $("#File").trigger("click");
            $("#New").click() ;
        }
        init();
    }
);