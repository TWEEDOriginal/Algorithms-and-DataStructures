/**
 * Given two strings, a and b, determine 
 * if it's possible to make a equal to b
 * 
 */


function abbreviation(a, b, cache = {}) {
  if (a === b || (b == "" && a.toLowerCase() === a)) return "YES";

  if (a === "") return "NO";

  if (cache[a] && cache[a][b]) return cache[a][b];

  if (!cache[a]) {
    cache[a] = {};
  }

  //check if first letter of `a` is small
  if (a[0].toLowerCase() === a[0]) {
    //capitalize first letter
    cache[a][b] = abbreviation(a[0].toUpperCase() + a.substring(1), b, cache);

    if (cache[a][b] === "NO") {
      //remove and recurse
      cache[a][b] = abbreviation(a.substring(1), b, cache);
    }
    return cache[a][b];
  }

  //if both are capital
  if (a[0] !== b[0]) {
    cache[a][b] = "NO";
  } else {
    cache[a][b] = abbreviation(a.substring(1), b.substring(1), cache);
  }
  return cache[a][b];
}

console.log(
  abbreviation(
    "BFZZVHdQYHQEMNEFFRFJTQmNWHFVXRXlGTFNBqWQmyOWYWSTDSTMJRYHjBNTEWADLgHVgGIRGKFQSeCXNFNaIFAXOiQORUDROaNoJPXWZXIAABZKSZYFTDDTRGZXVZZNWNRHMvSTGEQCYAJSFvbqivjuqvuzafvwwifnrlcxgbjmigkms",
    "BFZZVHQYHQEMNEFFRFJTQNWHFVXRXGTFNBWQOWYWSTDSTMJRYHBNTEWADLHVGIRGKFQSCXNFNIFAXOQORUDRONJPXWZXIAABZKSZYFTDDTRGZXVZZNWNRHMSTGEQCYAJSF"
  )
);
