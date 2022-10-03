function func() {
  try {
    if (1 !== 1) {
      console.log(1);

      return 'a';
    }

    console.log(2);
  } finally {
    return 'water';
  }
}

console.log(func());
