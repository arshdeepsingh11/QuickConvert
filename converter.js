function createConverter(fromUnit, toUnit) {
    // Define conversion functions between units
    const conversions = {
      kg: { lb: v => v * 2.2046 }, // Convert kg to lb
      lb: { kg: v => v / 2.2046 }, // Convert lb to kg
      km: { mi: v => v / 1.60934 }, // Convert km to mi
      mi: { km: v => v * 1.60934 }, // Convert mi to km
      "°C": { "°F": v => (v * 9/5) + 32 }, // Convert Celsius to Fahrenheit
      "°F": { "°C": v => (v - 32) * 5/9 } // Convert Fahrenheit to Celsius
    };
    // Return conversion function or an invalid conversion handler
    return conversions[fromUnit]?.[toUnit] || (() => "Invalid conversion");
}
  
function parseInput(input) {
    // Check if input contains a comma (indicating multiple values)
    return input.includes(",") ? input.split(",").map(Number) : parseFloat(input);
}
  
function handleConversion(event, formId, valueId, unitId, resultId) {
    event.preventDefault(); // Prevent form submission default behavior
    
    // Parse input value (single or multiple numbers)
    const value = parseInput(document.getElementById(valueId).value);
    
    // Determine target unit based on selected input unit
    const fromUnit = document.getElementById(unitId).value;
    const toUnit = fromUnit === "kg" ? "lb" : fromUnit === "lb" ? "kg" :
                   fromUnit === "km" ? "mi" : fromUnit === "mi" ? "km" :
                   fromUnit === "°C" ? "°F" : "°C";
    
    // Get the appropriate conversion function
    const converter = createConverter(fromUnit, toUnit);
    
    // Perform conversion (supports both single and multiple values)
    const result = Array.isArray(value) ? value.map(converter) : converter(value);
    
    // Round result to 3 decimal places
    const roundedResult = Array.isArray(result) ? result.map(num => Math.ceil(num * 1000) / 1000).join(', ') : Math.ceil(result * 1000) / 1000; 
  
    // Update the result element with converted value
    const resultElement = document.getElementById(resultId);
    resultElement.classList.add('ml-4'); // Add margin for styling
    resultElement.innerText = `Result: ${roundedResult} ${toUnit}`;
}
  
// Add event listeners when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("weightForm")?.addEventListener("submit", e => handleConversion(e, "weightForm", "weightValue", "weightUnit", "weightResult"));
    document.getElementById("distanceForm")?.addEventListener("submit", e => handleConversion(e, "distanceForm", "distanceValue", "distanceUnit", "distanceResult"));
    document.getElementById("temperatureForm")?.addEventListener("submit", e => handleConversion(e, "temperatureForm", "temperatureValue", "temperatureUnit", "temperatureResult"));
});
  
function showTab(tab) {
    // Hide all tabs
    document.querySelectorAll('.tab').forEach(el => el.classList.add('hidden'));
    // Show the selected tab
    document.getElementById(tab).classList.remove('hidden');
}
