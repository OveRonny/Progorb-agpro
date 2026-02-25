export function CustomerDropdown({ customers, value = "", onChange }) {
  const wrapper = document.createElement("div");
  const label = document.createElement("label");
  label.textContent = "Kunde";
  wrapper.appendChild(label);

  const select = document.createElement("select");
  select.value = value;

  customers.forEach(c => {
    const option = document.createElement("option");
    option.value = c.id;
    option.textContent = c.name;
    select.appendChild(option);
  });

  select.addEventListener("change", e => onChange && onChange(e.target.value));
  wrapper.appendChild(select);

  return wrapper;
}