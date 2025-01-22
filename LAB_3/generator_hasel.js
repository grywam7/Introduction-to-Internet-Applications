document.getElementById("generateBtn").addEventListener("click", function () {
  const minLength = parseInt(document.getElementById("minLength").value);
  const maxLength = parseInt(document.getElementById("maxLength").value);
  const includeUppercase = document.getElementById("includeUppercase").checked;
  const includeSpecialChars = document.getElementById(
    "includeSpecialChars"
  ).checked;

  if (
    isNaN(minLength) ||
    isNaN(maxLength) ||
    minLength < 1 ||
    maxLength < minLength
  ) {
    alert("Proszę podać poprawne wartości długości hasła.");
    return;
  }

  const usingChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const specialChars = "!@#$%^&*()_+[]{}|;:,.<>?";

  if (includeUppercase) {
    usingChars += uppercaseChars;
  }
  if (includeSpecialChars) {
    usingChars += specialChars;
  }

  const passwordLength =
    Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

  let password = "";
  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * usingChars.length);
    password += usingChars[randomIndex];
  }

  alert("Wygenerowane hasło: " + password);
});
