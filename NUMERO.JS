const randomNumbers = () => {
    let numbers = {};
    for (let i = 0; i < 10000; i++) {
      let randomNumber = Math.floor(Math.random() * 20 + 1);
      if (!numbers[randomNumber]) {
        numbers[randomNumber] = 1;
      } else {
        numbers[randomNumber]++;
      }
    }
    console.log(numbers);
  };
  
  randomNumbers();

