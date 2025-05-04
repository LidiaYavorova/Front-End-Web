document.getElementById("button-check-region").addEventListener("click", function() {
    const selectedRegion = document.querySelector('input[name="region"]:checked');
    if (selectedRegion) {
        const regionValue = selectedRegion.value;
        window.location.href = `region.html?region=${regionValue}`;
    } else {
        alert("Please select a region.");
    }
});

