const generateBtn = document.getElementById("generate-btn")
const colorContainer = document.getElementById("color-el-cont")
let colorsHtml = ''
let colorsExist = false

generateBtn.addEventListener("click", ()=>{
    colorsHtml = ''
    const seedColor = document.getElementById("seed-color-el").value.replace('#', '')
    const mode = document.getElementById("mode-el").value
    const count = document.getElementById("count-slider-el").value
    colorsExist = true
    colorContainer.classList.remove("hidden")
    
    fetch(`https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${mode}&count=${count}&format=json`)
        .then(res => res.json())
        .then(data => {
            for (let color of data.colors){
                colorsHtml += `
                <div class="color-el">
                    <div 
                        class="generated-color" 
                        style="background:${color.hex.value}"
                        data-color="${color.hex.value}">
                    </div>
                    <p>${color.hex.value}</p>
                </div>`
            }
            renderColors()
        })
        
})

// Slider Label
document.getElementById("count-slider-el").addEventListener("input", ()=>{
    document.getElementById("slider-label-el").textContent = 
    document.getElementById("count-slider-el").value
})

// Copy Color to Clipboard
colorContainer.addEventListener("click", (e)=>{
    if (e.target.dataset.color){
        navigator.clipboard.writeText(e.target.dataset.color)
        e.target.innerHTML = `<p style="text-shadow: 0 0 4px black">Copied!</p>`
        setTimeout(()=>{
            e.target.innerHTML = ""
        }, 1500)
    }
})

function renderColors() {
    colorContainer.innerHTML = colorsHtml
}
