function b() {
  let a = true;

  setTimeout(() => {
    a = false;
  }, 1000);

  return a;
}

console.log(b());
