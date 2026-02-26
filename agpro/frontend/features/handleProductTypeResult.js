function handleProductTypeResult(result, selectNode) {
    if (result.status === "success" || result.status === "alreadyExists") {
        
        const existingOption = selectNode.querySelector(`option[value="${result.value.id}"]`);
        if (!existingOption) {
            const option = document.createElement("option");
            option.value = result.value.id;
            option.textContent = result.value.name;
            selectNode.appendChild(option);
        }

        selectNode.value = result.value.id;

        if (result.status === "alreadyExists") {
            alert("ProduktType finnes allerede – valgte eksisterende");
        }

    } else if (result.status === "failure") {
        alert("Noe gikk galt: " + result.message);
    }
}