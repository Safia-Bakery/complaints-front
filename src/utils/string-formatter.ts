export function formatString(input: string) {
  // Remove any non-digit characters from the string
  let cleaned = input.replace(/\D/g, '');

  // Reverse the cleaned string
  let reversed = cleaned.split('').reverse().join('');

  // Format the reversed string by inserting a space after every 2nd or 3rd digit
  let formattedReversed = '';
  let i = 0;

  // Grouping logic: start with 2 digits, then switch to 3 digits after that
  while (i < reversed.length) {
    if (i < 4) {
      formattedReversed += reversed.substring(i, i + 2) + ' ';
      i += 2;
    } else {
      formattedReversed += reversed.substring(i, i + 3) + ' ';
      i += 3;
    }
  }

  // Reverse it back to get the final result, and trim any extra spaces
  let formatted = formattedReversed.split('').reverse().join('').trim();

  return formatted;
}
