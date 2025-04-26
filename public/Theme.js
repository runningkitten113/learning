document.addEventListener("DOMContentLoaded", () => {
    const themeBtn = document.querySelector(".theme-box");

    // Create the popup
    const popup = document.createElement("div");
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.backgroundColor = "white";
    popup.style.border = "2px solid black";
    popup.style.padding = "20px";
    popup.style.zIndex = "1000";
    popup.style.display = "none";
    popup.style.boxShadow = "0px 0px 10px rgba(0,0,0,0.5)";
    popup.style.borderRadius = "10px";

    popup.innerHTML = `
        <h3>Customize Theme</h3>
        <label>
            <input type="radio" name="target" value="background" checked />
            Background
        </label>
        <label style="margin-left: 10px;">
            <input type="radio" name="target" value="elements" />
            Elements
        </label>
        <br><br>
        <input type="text" id="hexInput" placeholder="#6bbaf1" />
        <div id="colorPreview" style="width: 50px; height: 50px; margin-top: 10px; border: 1px solid black;"></div>
        <br>
        <button id="applyColor">Apply</button>
        <button id="closePopup">Close</button>
    `;

    document.body.appendChild(popup);

    themeBtn.addEventListener("click", () => {
        popup.style.display = "block";
    });

    document.getElementById("closePopup").addEventListener("click", () => {
        themeBtn.id = "Cancel"
        popup.style.display = "none";
    });

    const hexInput = document.getElementById("hexInput");
    const preview = document.getElementById("colorPreview");

    hexInput.addEventListener("input", () => {
        const hex = hexInput.value;
        if (/^#([0-9A-F]{3}){1,2}$/i.test(hex)) {
            preview.style.backgroundColor = hex;
        }
    });

    document.getElementById("applyColor").addEventListener("click", () => {
        const target = document.querySelector('input[name="target"]:checked').value;
        const color = hexInput.value;
        if (/^#([0-9A-F]{3}){1,2}$/i.test(color)) {
            if (target === "background") {
                document.body.style.backgroundColor = color;
                themeBtn.id = "Sec " + color;
                console.log(themeBtn)
            } else {
                document.querySelectorAll(".layout, .home-box, .theme-box").forEach(el => {
                    el.style.backgroundColor = color;
                });
                themeBtn.id = "Prim " + color;
                console.log(themeBtn)
            }
        } else{
            themeBtn.id = "Cancel"
        }
        popup.style.display = "none";
    });

});
